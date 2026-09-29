-- REVIEW ONLY. DO NOT APPLY TO PRODUCTION until a restorable backup and legacy-flow regression tests are verified.
-- Existing partner IDs/ref codes/QR/dashboard tokens/sessions, bookings, payments, payroll and RPC definitions are untouched.
-- Database objects are enumerated explicitly to prevent accidental bulk privilege changes.

-- Marketing channel names are public reference data; only active rows may be read anonymously.
ALTER TABLE public.marketing_channels ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.marketing_channels FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.marketing_channels TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.marketing_channels TO authenticated;
CREATE POLICY gvs_marketing_public_read ON public.marketing_channels
  FOR SELECT TO anon USING (is_active);
CREATE POLICY gvs_marketing_staff_read ON public.marketing_channels
  FOR SELECT TO authenticated USING (is_active OR public.is_govietstay_admin());
CREATE POLICY gvs_marketing_admin_write ON public.marketing_channels
  FOR ALL TO authenticated USING (public.is_govietstay_admin())
  WITH CHECK (public.is_govietstay_admin());

-- Partner pay-rate and salary configuration must not be browsable or editable from a public key.
ALTER TABLE public.partner_salary_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_commission_matrix ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.partner_salary_tiers, public.partner_commission_matrix FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.partner_salary_tiers, public.partner_commission_matrix TO authenticated;
CREATE POLICY gvs_salary_admin_only ON public.partner_salary_tiers
  FOR ALL TO authenticated USING (public.is_govietstay_admin())
  WITH CHECK (public.is_govietstay_admin());
CREATE POLICY gvs_commission_admin_only ON public.partner_commission_matrix
  FOR ALL TO authenticated USING (public.is_govietstay_admin())
  WITH CHECK (public.is_govietstay_admin());

-- Public partners must still be able to read the currently active terms; old versions remain in DB.
ALTER TABLE public.partner_terms_versions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.partner_terms_versions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.partner_terms_versions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.partner_terms_versions TO authenticated;
CREATE POLICY gvs_terms_public_read ON public.partner_terms_versions
  FOR SELECT TO anon USING (active);
CREATE POLICY gvs_terms_staff_read ON public.partner_terms_versions
  FOR SELECT TO authenticated USING (active OR public.is_govietstay_admin());
CREATE POLICY gvs_terms_admin_write ON public.partner_terms_versions
  FOR ALL TO authenticated USING (public.is_govietstay_admin())
  WITH CHECK (public.is_govietstay_admin());

-- Existing SECURITY DEFINER RPCs read these views as their owner. Never expose the raw
-- admin/finance views directly to any arbitrary anon or authenticated client.
REVOKE ALL ON TABLE public.admin_marketing_funnel, public.admin_traffic_source_daily,
  public.admin_traffic_source_summary, public.supplier_payables_v
  FROM PUBLIC, anon, authenticated;

-- Explicit design for Owner + individually authorized Finance users. This does NOT
-- alter existing finance RPCs/RLS; those require a separate, fully tested cutover.
CREATE TABLE public.staff_finance_access (
  staff_id uuid PRIMARY KEY REFERENCES public.staff_profiles(id) ON DELETE CASCADE,
  enabled boolean NOT NULL DEFAULT false,
  granted_by uuid REFERENCES public.staff_profiles(id) ON DELETE SET NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.staff_finance_access_audit (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  staff_id uuid NOT NULL REFERENCES public.staff_profiles(id),
  enabled boolean NOT NULL,
  changed_by uuid NOT NULL REFERENCES public.staff_profiles(id),
  changed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.staff_finance_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_finance_access_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.staff_finance_access, public.staff_finance_access_audit FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SEQUENCE public.staff_finance_access_audit_id_seq FROM PUBLIC, anon, authenticated;

CREATE FUNCTION public.gvs_can_view_finance()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_profiles s
    WHERE s.auth_user_id = auth.uid() AND s.active
      AND (s.role = 'owner' OR EXISTS (
        SELECT 1 FROM public.staff_finance_access f WHERE f.staff_id = s.id AND f.enabled
      ))
  );
$$;
REVOKE ALL ON FUNCTION public.gvs_can_view_finance() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.gvs_can_view_finance() TO authenticated;

CREATE FUNCTION public.gvs_set_finance_access(p_staff_id uuid, p_enabled boolean)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $$
DECLARE v_owner uuid;
BEGIN
  SELECT id INTO v_owner FROM public.staff_profiles
  WHERE auth_user_id = auth.uid() AND active AND role = 'owner' LIMIT 1;
  IF v_owner IS NULL THEN RAISE EXCEPTION 'Owner access required'; END IF;
  IF p_enabled IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.staff_profiles WHERE id = p_staff_id AND active
    AND auth_user_id IS NOT NULL AND role <> 'owner'
  ) THEN RAISE EXCEPTION 'Active, authenticated non-owner staff member required'; END IF;
  INSERT INTO public.staff_finance_access(staff_id,enabled,granted_by,changed_at)
    VALUES (p_staff_id,p_enabled,v_owner,now())
    ON CONFLICT(staff_id) DO UPDATE SET enabled=excluded.enabled,
      granted_by=excluded.granted_by,changed_at=excluded.changed_at;
  INSERT INTO public.staff_finance_access_audit(staff_id,enabled,changed_by)
    VALUES(p_staff_id,p_enabled,v_owner);
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.gvs_set_finance_access(uuid,boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.gvs_set_finance_access(uuid,boolean) TO authenticated;
