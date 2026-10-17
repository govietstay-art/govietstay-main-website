-- Disposable PostgreSQL fixture ONLY; never use real customer or partner data.
CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE SCHEMA auth;
GRANT USAGE ON SCHEMA auth TO anon, authenticated;
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid;
$$;
GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated;
CREATE TABLE public.staff_profiles (
  id uuid PRIMARY KEY, auth_user_id uuid, role text NOT NULL, active boolean NOT NULL
);
INSERT INTO public.staff_profiles VALUES
 ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','owner',true),
 ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','admin',true),
 ('cccccccc-cccc-cccc-cccc-cccccccccccc','33333333-3333-3333-3333-333333333333','sales',true),
 ('dddddddd-dddd-dddd-dddd-dddddddddddd','44444444-4444-4444-4444-444444444444','sales',false),
 ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',null,'sales',true);
CREATE FUNCTION public.is_govietstay_admin() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
 SELECT EXISTS (SELECT 1 FROM public.staff_profiles s WHERE s.auth_user_id=auth.uid()
  AND s.active AND s.role IN ('owner','admin'));
$$;
REVOKE ALL ON FUNCTION public.is_govietstay_admin() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.is_govietstay_admin() TO authenticated;
CREATE TABLE public.marketing_channels (channel text PRIMARY KEY, is_active boolean NOT NULL);
CREATE TABLE public.partner_salary_tiers (id bigint PRIMARY KEY, salary_vnd bigint);
CREATE TABLE public.partner_commission_matrix (id bigint PRIMARY KEY, commission_per_pax_vnd bigint);
CREATE TABLE public.partner_terms_versions (version text PRIMARY KEY,active boolean NOT NULL);
CREATE VIEW public.admin_marketing_funnel AS SELECT 1 as sample;
CREATE VIEW public.admin_traffic_source_daily AS SELECT 1 as sample;
CREATE VIEW public.admin_traffic_source_summary AS SELECT 1 as sample;
CREATE VIEW public.supplier_payables_v AS SELECT 1 as sample;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon,authenticated;
INSERT INTO public.marketing_channels VALUES ('public',true),('hidden',false);
INSERT INTO public.partner_salary_tiers VALUES(1,999000);
INSERT INTO public.partner_commission_matrix VALUES(1,65000);
INSERT INTO public.partner_terms_versions VALUES('current',true),('old',false);
