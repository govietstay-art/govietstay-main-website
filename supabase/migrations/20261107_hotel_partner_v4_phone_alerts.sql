-- GoVietStay Hotel Partner push alerts, reusing existing private ntfy outbox.
-- The original booking notification URL and behavior are preserved for booking events.
-- Hotel changes never include names, contact details, or NET prices in the push payload.

ALTER TABLE public.gvs_booking_push_outbox
  DROP CONSTRAINT IF EXISTS gvs_booking_push_outbox_source_kind_check;
ALTER TABLE public.gvs_booking_push_outbox
  ADD CONSTRAINT gvs_booking_push_outbox_source_kind_check
  CHECK (source_kind = ANY (ARRAY[
    'staff_intake','partner_booking','staff_direct_booking',
    'direct_booking','public_inquiry','system_test',
    'hotel_partner_review','hotel_partner_access'
  ]::text[]));

-- Keep all existing booking deliveries using their current production endpoint.
-- Route only hotel-partner events to the dedicated partner-domain handler.
CREATE OR REPLACE FUNCTION public.gvs_booking_push_dispatch(p_event_id uuid)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp
AS $hotel_dispatch$
DECLARE
  v_event record;
  v_endpoint text;
BEGIN
  SELECT id,event_token,source_kind INTO v_event
    FROM public.gvs_booking_push_outbox
   WHERE id=p_event_id AND status='queued' AND attempts<9
     AND next_attempt_at<=now()
     AND (lease_until IS NULL OR lease_until<now())
   FOR UPDATE;
  IF NOT FOUND THEN RETURN false; END IF;

  v_endpoint := CASE WHEN v_event.source_kind IN ('hotel_partner_review','hotel_partner_access')
    THEN 'https://partners.govietstay.com/api/hotel-partner-notifications/deliver'
    ELSE 'https://www.govietstay.com/api/booking-notifications/deliver' END;

  BEGIN
    PERFORM net.http_post(
      url:=v_endpoint,
      body:=jsonb_build_object('event_id',v_event.id,'event_token',v_event.event_token),
      headers:='{"Content-Type":"application/json"}'::jsonb,
      timeout_milliseconds:=12000
    );
    UPDATE public.gvs_booking_push_outbox
       SET attempts=attempts+1,next_attempt_at=now()+interval '2 minutes'
     WHERE id=v_event.id;
    RETURN true;
  EXCEPTION WHEN OTHERS THEN
    -- Failure to enqueue a push must never prevent a hotel submission.
    RAISE WARNING 'GoVietStay push enqueue failed; event remains queued';
    UPDATE public.gvs_booking_push_outbox
       SET next_attempt_at=now()+interval '2 minutes'
     WHERE id=v_event.id;
    RETURN false;
  END;
END;
$hotel_dispatch$;

-- Only previously unseen submitted requests produce one push, including
-- the transition from a locally saved draft to a submitted request.
CREATE OR REPLACE FUNCTION public.hotel_partner_notify_review_submission()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp
AS $hotel_notify$
DECLARE
  v_kind text;
  v_event_id uuid;
BEGIN
  IF TG_TABLE_NAME='hotel_change_requests' THEN
    IF NEW.status<>'submitted' THEN RETURN NEW; END IF;
    IF TG_OP='UPDATE' THEN
      IF OLD.status='submitted' THEN RETURN NEW; END IF;
    END IF;
    v_kind:='hotel_partner_review';
  ELSIF TG_TABLE_NAME='hotel_partner_access_requests' THEN
    IF NEW.status<>'pending' THEN RETURN NEW; END IF;
    IF TG_OP='UPDATE' THEN
      IF OLD.status='pending' THEN RETURN NEW; END IF;
    END IF;
    v_kind:='hotel_partner_access';
  ELSE RETURN NEW;
  END IF;

  BEGIN
    INSERT INTO public.gvs_booking_push_outbox(source_kind,source_id)
      VALUES(v_kind,NEW.id)
      ON CONFLICT(source_kind,source_id) DO NOTHING
      RETURNING id INTO v_event_id;
    IF v_event_id IS NOT NULL THEN
      PERFORM public.gvs_booking_push_dispatch(v_event_id);
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'GoVietStay hotel alert unavailable; form was still submitted';
  END;
  RETURN NEW;
END;
$hotel_notify$;

REVOKE ALL ON FUNCTION public.hotel_partner_notify_review_submission() FROM PUBLIC,anon,authenticated;

DROP TRIGGER IF EXISTS hotel_partner_push_review_submission ON public.hotel_change_requests;
CREATE TRIGGER hotel_partner_push_review_submission
AFTER INSERT OR UPDATE OF status ON public.hotel_change_requests
FOR EACH ROW EXECUTE FUNCTION public.hotel_partner_notify_review_submission();

DROP TRIGGER IF EXISTS hotel_partner_push_access_submission ON public.hotel_partner_access_requests;
CREATE TRIGGER hotel_partner_push_access_submission
AFTER INSERT OR UPDATE OF status ON public.hotel_partner_access_requests
FOR EACH ROW EXECUTE FUNCTION public.hotel_partner_notify_review_submission();
