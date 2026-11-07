-- V3.1 multi-hotel partner: a member of one organization can create
-- many DRAFT hotels under that SAME organization. No additional login.
-- Existing published hotels, partner tenants and booking data untouched.
ALTER TABLE public.hotel_properties
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id);

CREATE OR REPLACE FUNCTION public.hotel_partner_add_property(
  p_org_id uuid,
  p_name text,
  p_city text DEFAULT NULL,
  p_address text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public,auth,pg_catalog
AS $partner_hotel$
DECLARE
  v_id uuid;
  v_name text;
  v_city text;
  v_address text;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Please sign in before adding a hotel'
      USING ERRCODE = '42501';
  END IF;
  v_name := btrim(coalesce(p_name,''));
  v_city := nullif(btrim(coalesce(p_city,'')),'');
  v_address := nullif(btrim(coalesce(p_address,'')),'');
  IF length(v_name) NOT BETWEEN 2 AND 200 THEN
    RAISE EXCEPTION 'Hotel name must be between 2 and 200 characters';
  END IF;
  IF length(coalesce(v_city,'')) > 150 OR length(coalesce(v_address,'')) > 500 THEN
    RAISE EXCEPTION 'City or address is too long';
  END IF;
  IF NOT (
    public.is_govietstay_admin()
    OR EXISTS (
      SELECT 1 FROM public.hotel_partner_members m
      JOIN public.hotel_partner_orgs o ON o.id = m.org_id
      WHERE m.org_id = p_org_id
        AND m.user_id = auth.uid()
        AND m.active AND o.active
        AND m.role IN ('owner','manager','editor')
    )
  ) THEN
    RAISE EXCEPTION 'Account cannot add hotels to this organization'
      USING ERRCODE = '42501';
  END IF;

  -- The organization must be active even for administrators.
  IF NOT EXISTS (
    SELECT 1 FROM public.hotel_partner_orgs o
    WHERE o.id = p_org_id AND o.active
  ) THEN
    RAISE EXCEPTION 'Partner organization not found or inactive';
  END IF;

  -- Lightweight per-organization safety limit; increase deliberately later
  -- for a verified very-large supplier. A partner can still add hundreds.
  PERFORM 1 FROM public.hotel_partner_orgs WHERE id=p_org_id FOR UPDATE;
  IF (SELECT count(*) FROM public.hotel_properties WHERE org_id=p_org_id) >= 1000 THEN
    RAISE EXCEPTION 'Hotel portfolio limit reached, contact GoVietStay';
  END IF;

  INSERT INTO public.hotel_properties (
    org_id, name, city, address, status, created_by
  ) VALUES (p_org_id,v_name,v_city,v_address,'draft',auth.uid())
  RETURNING id INTO v_id;

  INSERT INTO public.hotel_audit_events(property_id,actor_id,action)
  VALUES (v_id,auth.uid(),'partner_created_draft_property');

  RETURN v_id;
END
$partner_hotel$;
REVOKE ALL ON FUNCTION public.hotel_partner_add_property(uuid,text,text,text)
  FROM public,anon;
GRANT EXECUTE ON FUNCTION public.hotel_partner_add_property(uuid,text,text,text)
  TO authenticated;
