-- GoVietStay Hotel Partner V4: self-service access application + controlled admin approval.
-- Additive only. Existing property, room, media, rate and booking data remain untouched.

CREATE TABLE IF NOT EXISTS public.hotel_partner_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  applicant_email text NOT NULL,
  company_name text NOT NULL CHECK (length(btrim(company_name)) BETWEEN 2 AND 200),
  hotel_name text CHECK (hotel_name IS NULL OR length(hotel_name) <= 200),
  contact_phone text CHECK (contact_phone IS NULL OR length(contact_phone) <= 40),
  note text CHECK (note IS NULL OR length(note) <= 1000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  assigned_org_id uuid REFERENCES public.hotel_partner_orgs(id),
  assigned_role text CHECK (assigned_role IS NULL OR assigned_role IN ('owner','manager','editor','viewer')),
  review_note text CHECK (review_note IS NULL OR length(review_note) <= 1000),
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT hotel_access_review_consistency CHECK (
    (status='pending' AND reviewed_by IS NULL AND reviewed_at IS NULL AND assigned_org_id IS NULL)
    OR (status='rejected' AND reviewed_by IS NOT NULL AND reviewed_at IS NOT NULL AND assigned_org_id IS NULL)
    OR (status='approved' AND reviewed_by IS NOT NULL AND reviewed_at IS NOT NULL AND assigned_org_id IS NOT NULL)
  )
);
CREATE UNIQUE INDEX IF NOT EXISTS hotel_access_one_pending_per_user
  ON public.hotel_partner_access_requests(user_id) WHERE status='pending';
CREATE INDEX IF NOT EXISTS hotel_access_queue_idx
  ON public.hotel_partner_access_requests(status,created_at DESC);

ALTER TABLE public.hotel_partner_access_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.hotel_partner_access_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.hotel_partner_access_requests TO authenticated;

CREATE POLICY hotel_access_self_or_admin_read
  ON public.hotel_partner_access_requests FOR SELECT TO authenticated
  USING (user_id=auth.uid() OR public.is_govietstay_admin());
-- All creation, approval and rejection go through limited SECURITY DEFINER functions.
-- No direct INSERT/UPDATE/DELETE grants or policies for browser users.

CREATE OR REPLACE FUNCTION public.hotel_partner_request_access(
  p_company_name text,
  p_hotel_name text DEFAULT NULL,
  p_contact_phone text DEFAULT NULL,
  p_note text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER
SET search_path=public,auth,pg_catalog
AS $hotel_apply$
DECLARE
  v_id uuid;
  v_email text;
  v_company text := btrim(coalesce(p_company_name,''));
  v_hotel text := nullif(btrim(coalesce(p_hotel_name,'')),'');
  v_phone text := nullif(btrim(coalesce(p_contact_phone,'')),'');
  v_note text := nullif(btrim(coalesce(p_note,'')),'');
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must sign in to apply' USING ERRCODE='42501';
  END IF;
  SELECT email INTO v_email FROM auth.users
    WHERE id=auth.uid() AND email_confirmed_at IS NOT NULL;
  IF v_email IS NULL THEN
    RAISE EXCEPTION 'Please confirm your email before applying';
  END IF;
  IF length(v_company) NOT BETWEEN 2 AND 200
    OR length(coalesce(v_hotel,''))>200 OR length(coalesce(v_phone,''))>40
    OR length(coalesce(v_note,''))>1000 THEN
    RAISE EXCEPTION 'Please check the company, hotel and contact information';
  END IF;
  IF EXISTS (SELECT 1 FROM public.hotel_partner_members
     WHERE user_id=auth.uid() AND active) THEN
    RAISE EXCEPTION 'Your account has already been assigned to an organization';
  END IF;
  SELECT id INTO v_id FROM public.hotel_partner_access_requests
    WHERE user_id=auth.uid() AND status='pending' FOR UPDATE;
  IF FOUND THEN RETURN v_id; END IF;
  IF (SELECT count(*) FROM public.hotel_partner_access_requests
    WHERE user_id=auth.uid() AND created_at>=now()-interval '1 day')>=3 THEN
    RAISE EXCEPTION 'Too many requests. Please try again tomorrow';
  END IF;
  INSERT INTO public.hotel_partner_access_requests
    (user_id,applicant_email,company_name,hotel_name,contact_phone,note)
  VALUES (auth.uid(),v_email,v_company,v_hotel,v_phone,v_note)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$hotel_apply$;
REVOKE ALL ON FUNCTION public.hotel_partner_request_access(text,text,text,text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.hotel_partner_request_access(text,text,text,text)
  TO authenticated;

CREATE OR REPLACE FUNCTION public.hotel_admin_resolve_access_request(
  p_request_id uuid,
  p_decision text,
  p_org_id uuid DEFAULT NULL,
  p_role text DEFAULT 'editor',
  p_note text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER
SET search_path=public,auth,pg_catalog
AS $hotel_decide$
DECLARE
  v_request public.hotel_partner_access_requests%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_govietstay_admin() THEN
    RAISE EXCEPTION 'GoVietStay administrator required' USING ERRCODE='42501';
  END IF;
  IF p_decision NOT IN ('approved','rejected') THEN
    RAISE EXCEPTION 'Invalid access decision';
  END IF;
  IF p_role NOT IN ('owner','manager','editor','viewer') THEN
    RAISE EXCEPTION 'Invalid partner role';
  END IF;
  IF length(coalesce(p_note,''))>1000 THEN
    RAISE EXCEPTION 'Review note is too long';
  END IF;
  SELECT * INTO v_request FROM public.hotel_partner_access_requests
    WHERE id=p_request_id AND status='pending' FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'This access request has already been processed';
  END IF;
  IF p_decision='approved' THEN
    IF p_org_id IS NULL OR NOT EXISTS (
      SELECT 1 FROM public.hotel_partner_orgs
      WHERE id=p_org_id AND active
    ) THEN RAISE EXCEPTION 'Select an active partner organization'; END IF;
    INSERT INTO public.hotel_partner_members (org_id,user_id,role,active)
    VALUES (p_org_id,v_request.user_id,p_role,true)
    ON CONFLICT (org_id,user_id)
      DO UPDATE SET role=excluded.role,active=true;
  END IF;
  UPDATE public.hotel_partner_access_requests SET
    status=p_decision,
    assigned_org_id=CASE WHEN p_decision='approved' THEN p_org_id ELSE NULL END,
    assigned_role=CASE WHEN p_decision='approved' THEN p_role ELSE NULL END,
    review_note=nullif(btrim(coalesce(p_note,'')),''),
    reviewed_by=auth.uid(),
    reviewed_at=now()
  WHERE id=v_request.id;
  RETURN v_request.id;
END;
$hotel_decide$;
REVOKE ALL ON FUNCTION public.hotel_admin_resolve_access_request(uuid,text,uuid,text,text)
  FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.hotel_admin_resolve_access_request(uuid,text,uuid,text,text)
  TO authenticated;
