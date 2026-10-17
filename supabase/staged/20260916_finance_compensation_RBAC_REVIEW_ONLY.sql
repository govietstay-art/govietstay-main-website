-- REVIEW ONLY. Run after 20260916_legacy_access_hardening_REVIEW_ONLY.sql on a disposable database.
-- Exact rule: salary/commission configuration readable ONLY by Owner or individually
-- Owner-approved Finance staff; only Owner may edit. No finance grant to all Admins.
CREATE FUNCTION public.gvs_is_owner()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (SELECT 1 FROM public.staff_profiles s
    WHERE s.auth_user_id = auth.uid() AND s.active AND s.role = 'owner');
$$;
REVOKE ALL ON FUNCTION public.gvs_is_owner() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.gvs_is_owner() TO authenticated;

DROP POLICY gvs_salary_admin_only ON public.partner_salary_tiers;
DROP POLICY gvs_commission_admin_only ON public.partner_commission_matrix;
CREATE POLICY gvs_salary_finance_select ON public.partner_salary_tiers
  FOR SELECT TO authenticated USING (public.gvs_can_view_finance());
CREATE POLICY gvs_salary_owner_insert ON public.partner_salary_tiers
  FOR INSERT TO authenticated WITH CHECK (public.gvs_is_owner());
CREATE POLICY gvs_salary_owner_update ON public.partner_salary_tiers
  FOR UPDATE TO authenticated USING (public.gvs_is_owner()) WITH CHECK (public.gvs_is_owner());
CREATE POLICY gvs_salary_owner_delete ON public.partner_salary_tiers
  FOR DELETE TO authenticated USING (public.gvs_is_owner());
CREATE POLICY gvs_commission_finance_select ON public.partner_commission_matrix
  FOR SELECT TO authenticated USING (public.gvs_can_view_finance());
CREATE POLICY gvs_commission_owner_insert ON public.partner_commission_matrix
  FOR INSERT TO authenticated WITH CHECK (public.gvs_is_owner());
CREATE POLICY gvs_commission_owner_update ON public.partner_commission_matrix
  FOR UPDATE TO authenticated USING (public.gvs_is_owner()) WITH CHECK (public.gvs_is_owner());
CREATE POLICY gvs_commission_owner_delete ON public.partner_commission_matrix
  FOR DELETE TO authenticated USING (public.gvs_is_owner());
-- Do NOT change existing Finance RPC guards here. All legacy finance routes require
-- a coordinated SQL + existing-admin UI migration and a tested, restorable backup.
