-- Hotel Partner V5: automatically intake a new partner after email confirmation.
-- This is an unprivileged APPLICATION, never an automatic approval.
-- The email confirmation itself must not fail if alert delivery is unavailable.

CREATE OR REPLACE FUNCTION public.hotel_partner_intake_verified_signup()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path=public,auth,pg_catalog
AS $gvs_partner_verified$
DECLARE
  v_meta jsonb;
  v_company text;
  v_hotel text;
  v_phone text;
BEGIN
  IF NEW.email_confirmed_at IS NULL THEN RETURN NEW; END IF;
  IF TG_OP='UPDATE' THEN
    IF OLD.email_confirmed_at IS NOT NULL THEN RETURN NEW; END IF;
  END IF;

  v_meta := coalesce(NEW.raw_user_meta_data,'{}'::jsonb);
  IF coalesce(v_meta->>'hotel_partner_signup','') <> 'true' THEN RETURN NEW; END IF;
  v_company := btrim(coalesce(v_meta->>'hotel_partner_company_name',''));
  v_hotel := nullif(btrim(coalesce(v_meta->>'hotel_partner_hotel_name','')),'');
  v_phone := nullif(btrim(coalesce(v_meta->>'hotel_partner_phone','')),'');
  IF length(v_company) NOT BETWEEN 2 AND 200
      OR length(coalesce(v_hotel,'')) > 200
      OR length(coalesce(v_phone,'')) > 40 THEN
    RETURN NEW;
  END IF;

  BEGIN
    IF EXISTS (SELECT 1 FROM public.hotel_partner_members
       WHERE user_id=NEW.id AND active) THEN RETURN NEW; END IF;

    IF NOT EXISTS (SELECT 1 FROM public.hotel_partner_access_requests
       WHERE user_id=NEW.id AND status IN ('pending','approved')) THEN
      INSERT INTO public.hotel_partner_access_requests
        (user_id,applicant_email,company_name,hotel_name,contact_phone)
      VALUES (NEW.id,NEW.email,v_company,v_hotel,v_phone)
      ON CONFLICT (user_id) WHERE status='pending' DO NOTHING;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'GoVietStay partner intake not available; email confirmation remains valid';
  END;
  RETURN NEW;
END;
$gvs_partner_verified$;

REVOKE ALL ON FUNCTION public.hotel_partner_intake_verified_signup()
  FROM PUBLIC,anon,authenticated;

DROP TRIGGER IF EXISTS hotel_partner_after_email_confirmed ON auth.users;
CREATE TRIGGER hotel_partner_after_email_confirmed
AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.hotel_partner_intake_verified_signup();
