-- Give each pilot hotel its own supplier organization before inviting users.
DO $tenant_split$
DECLARE h record; v_org uuid;
BEGIN
  FOR h IN SELECT id,pilot_code,name FROM public.hotel_properties
    WHERE pilot_code IN ('KS01','KS02','KS03','KS04','KS05','KS06') ORDER BY pilot_code LOOP
    SELECT id INTO v_org FROM public.hotel_partner_orgs WHERE name='Pilot Hotel · '||h.pilot_code||' · '||h.name LIMIT 1;
    IF v_org IS NULL THEN
      INSERT INTO public.hotel_partner_orgs(name,kind) VALUES('Pilot Hotel · '||h.pilot_code||' · '||h.name,'hotel_supplier')
      RETURNING id INTO v_org;
    END IF;
    UPDATE public.hotel_properties SET org_id=v_org WHERE id=h.id;
  END LOOP;
END $tenant_split$;