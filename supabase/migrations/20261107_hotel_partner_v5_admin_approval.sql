-- Hotel Partner V5: single-step admin approval, with explicit create-new-org option.
-- A verified administrator must review each applicant before choosing this option.
-- Existing RPC remains available and unchanged for backwards compatibility.

CREATE OR REPLACE FUNCTION public.hotel_admin_resolve_access_request_v2(
  p_request_id uuid,
  p_decision text,
  p_org_id uuid DEFAULT NULL,
  p_create_org boolean DEFAULT false,
  p_role text DEFAULT 'editor',
  p_note text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER
SET search_path=public,auth,pg_catalog
AS $gvs_partner_admin_v2$
DECLARE
  v_request public.hotel_partner_access_requests%ROWTYPE;
  v_org_id uuid;
  v_name text;
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
    RAISE EXCEPTION 'Access request already processed or unavailable';
  END IF;

  IF p_decision='approved' THEN
    IF coalesce(p_create_org,false) THEN
      IF p_org_id IS NOT NULL THEN
        RAISE EXCEPTION 'Choose either an existing company or create a new one';
      END IF;
      v_name := btrim(v_request.company_name);
      IF length(v_name) NOT BETWEEN 2 AND 200 THEN
        RAISE EXCEPTION 'Company name requires verification';
      END IF;
      INSERT INTO public.hotel_partner_orgs(name,kind)
        VALUES(v_name,'hotel_supplier')
        RETURNING id INTO v_org_id;
    ELSE
      v_org_id := p_org_id;
      IF v_org_id IS NULL OR NOT EXISTS (
        SELECT 1 FROM public.hotel_partner_orgs WHERE id=v_org_id AND active
      ) THEN
        RAISE EXCEPTION 'Select an active and verified organization';
      END IF;
    END IF;
    INSERT INTO public.hotel_partner_members(org_id,user_id,role,active)
      VALUES(v_org_id,v_request.user_id,p_role,true)
      ON CONFLICT (org_id,user_id)
      DO UPDATE SET role=excluded.role,active=true;
  ELSE
    v_org_id := NULL;
  END IF;

  UPDATE public.hotel_partner_access_requests SET
    status=p_decision,
    assigned_org_id=v_org_id,
    assigned_role=CASE WHEN p_decision='approved' THEN p_role ELSE NULL END,
    review_note=nullif(btrim(coalesce(p_note,'')),''),
    reviewed_by=auth.uid(),
    reviewed_at=now()
  WHERE id=v_request.id;

  RETURN v_request.id;
END;
$gvs_partner_admin_v2$;

REVOKE ALL ON FUNCTION public.hotel_admin_resolve_access_request_v2(uuid,text,uuid,boolean,text,text)
  FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.hotel_admin_resolve_access_request_v2(uuid,text,uuid,boolean,text,text)
  TO authenticated;
