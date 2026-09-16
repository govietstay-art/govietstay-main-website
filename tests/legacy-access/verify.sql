\set ON_ERROR_STOP on
-- Privilege checks run as test database owner, not through the app.
DO $$ DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['marketing_channels','partner_salary_tiers','partner_commission_matrix','partner_terms_versions','staff_finance_access','staff_finance_access_audit'] LOOP
    IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid=('public.'||t)::regclass) THEN
      RAISE EXCEPTION 'RLS not enabled on %',t;
    END IF;
  END LOOP;
  FOREACH t IN ARRAY ARRAY['partner_salary_tiers','partner_commission_matrix','staff_finance_access','staff_finance_access_audit'] LOOP
    IF has_table_privilege('anon',('public.'||t)::regclass,'SELECT') OR has_table_privilege('authenticated',('public.'||t)::regclass,'SELECT') AND t LIKE 'staff_finance_%' THEN
      RAISE EXCEPTION 'Unexpected direct access on %',t;
    END IF;
  END LOOP;
  FOREACH t IN ARRAY ARRAY['admin_marketing_funnel','admin_traffic_source_daily','admin_traffic_source_summary','supplier_payables_v'] LOOP
    IF has_table_privilege('anon',('public.'||t)::regclass,'SELECT') OR has_table_privilege('authenticated',('public.'||t)::regclass,'SELECT') THEN
      RAISE EXCEPTION 'View remains exposed: %',t;
    END IF;
  END LOOP;
  IF has_function_privilege('anon','public.gvs_can_view_finance()','EXECUTE') OR
     has_function_privilege('anon','public.gvs_set_finance_access(uuid,boolean)','EXECUTE') THEN
    RAISE EXCEPTION 'Anonymous user can call Finance entitlement RPC';
  END IF;
END $$;

SET ROLE anon;
DO $$ BEGIN
  IF (SELECT count(*) FROM public.marketing_channels) <> 1 OR
     (SELECT count(*) FROM public.partner_terms_versions) <> 1 THEN
    RAISE EXCEPTION 'Public active metadata must stay readable';
  END IF;
END $$;
RESET ROLE;

SET ROLE authenticated;
SET request.jwt.claim.sub='33333333-3333-3333-3333-333333333333';
DO $$ DECLARE blocked boolean := false;
BEGIN
  IF public.gvs_can_view_finance() THEN RAISE EXCEPTION 'Sales finance access by default'; END IF;
  IF (SELECT count(*) FROM public.partner_salary_tiers) <> 0 OR
     (SELECT count(*) FROM public.partner_commission_matrix) <> 0 THEN
    RAISE EXCEPTION 'Sales can read pay-rate configuration';
  END IF;
  BEGIN PERFORM public.gvs_set_finance_access('cccccccc-cccc-cccc-cccc-cccccccccccc',true);
  EXCEPTION WHEN raise_exception THEN blocked:=true; END;
  IF NOT blocked THEN RAISE EXCEPTION 'Non-owner issued Finance grant'; END IF;
END $$;
SET request.jwt.claim.sub='22222222-2222-2222-2222-222222222222';
DO $$ BEGIN
 IF public.gvs_can_view_finance() THEN RAISE EXCEPTION 'Admin Finance access without owner grant'; END IF;
 IF (SELECT count(*) FROM public.partner_salary_tiers) <> 1 THEN
   RAISE EXCEPTION 'Legacy Admin lost pay-rate access before Finance cutover'; END IF;
END $$;
SET request.jwt.claim.sub='11111111-1111-1111-1111-111111111111';
DO $$ BEGIN
  IF NOT public.gvs_can_view_finance() THEN RAISE EXCEPTION 'Owner lost finance access'; END IF;
  IF NOT public.gvs_set_finance_access('cccccccc-cccc-cccc-cccc-cccccccccccc',true) THEN
    RAISE EXCEPTION 'Owner Finance grant failed'; END IF;
END $$;
SET request.jwt.claim.sub='33333333-3333-3333-3333-333333333333';
DO $$ BEGIN
  IF NOT public.gvs_can_view_finance() THEN RAISE EXCEPTION 'Authorized Finance staff blocked'; END IF;
END $$;
SET request.jwt.claim.sub='11111111-1111-1111-1111-111111111111';
DO $$ BEGIN
  IF NOT public.gvs_set_finance_access('cccccccc-cccc-cccc-cccc-cccccccccccc',false) THEN
    RAISE EXCEPTION 'Owner revoke failed'; END IF;
END $$;
SET request.jwt.claim.sub='33333333-3333-3333-3333-333333333333';
DO $$ BEGIN
  IF public.gvs_can_view_finance() THEN RAISE EXCEPTION 'Revoked staff still has access'; END IF;
END $$;
RESET ROLE;
DO $$ BEGIN
  IF (SELECT count(*) FROM public.staff_finance_access_audit) <> 2 THEN
    RAISE EXCEPTION 'Expected immutable grant/revoke audit records'; END IF;
END $$;
SELECT 'PASS: anonymous visibility, salary RLS, owner-only Finance grants, deny/revoke and audit' AS result;
