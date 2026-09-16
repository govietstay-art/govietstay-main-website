\set ON_ERROR_STOP on
-- Only synthetic data in disposable PostgreSQL. None of these tests reach Supabase.

-- Direct client table access must remain denied (all access via checked RPCs).
do $$ begin
 if has_table_privilege('anon', 'public.crm_contact_preferences', 'SELECT') or
    has_table_privilege('authenticated', 'public.crm_contact_preferences', 'SELECT') or
    has_table_privilege('anon', 'public.crm_followup_actions', 'SELECT') then
   raise exception 'CRM tables must not be directly readable'; end if;
 if has_function_privilege('anon','public.company_booking_overview(date,date)','EXECUTE') then
   raise exception 'Anonymous company overview incorrectly executable'; end if;
 if not has_function_privilege('anon','public.company_booking_overview_sales(uuid,date,date)','EXECUTE') then
   raise exception 'PIN session RPC not available to anonymous sales portal'; end if;
end $$;

set role anon;
select set_config('request.jwt.claim.sub','',false);
do $$ declare v jsonb; rejected boolean := false; begin
  v := public.company_booking_overview_sales(
    '40000000-0000-4000-8000-000000000001',current_date - 366,current_date);
  if (v->>'bookings')::integer <> 3 or (v->>'pax')::integer <> 5 then
    raise exception 'Valid sales session aggregation incorrect: %',v; end if;
  if v::text like '%Synthetic%' or v ? 'email' or v ? 'revenue' or v ? 'phone' then
    raise exception 'Sales overview contains PII or financial data'; end if;
  begin
    perform public.company_booking_overview_sales(
      '40000000-0000-4000-8000-000000000002', current_date,current_date);
  exception when others then
    if sqlerrm <> 'Valid sales session required' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'Revoked session was accepted'; end if;
  rejected := false;
  begin
    perform public.company_booking_overview_sales(
      '40000000-0000-4000-8000-000000000003', current_date,current_date);
  exception when others then
    if sqlerrm <> 'Valid sales session required' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'Expired session was accepted'; end if;
end $$;
reset role;

set role authenticated;
select set_config('request.jwt.claim.sub','90000000-0000-4000-8000-000000000001',false);
do $$ declare rejected boolean := false; begin
  begin perform public.company_booking_overview(current_date,current_date);
  exception when others then
    if sqlerrm <> 'Company staff access required' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'Unknown auth user allowed company overview'; end if;
end $$;

-- Desk: overview yes, CRM no; no leakage by UI-only gating.
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000004',false);
do $$ declare v jsonb; rejected boolean := false; begin
  v := public.company_booking_overview(current_date,current_date);
  if (v->>'bookings')::integer <> 2 then raise exception 'Desk aggregate incorrect'; end if;
  begin perform public.crm_customer_directory('',50);
  exception when others then
    if sqlerrm <> 'CRM access required' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'Desk can read full CRM'; end if;
end $$;

-- Sales sees only assigned customer and only own booking count/history.
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',false);
do $$ declare v jsonb; h jsonb; begin
  v := public.crm_customer_directory('',50);
  if jsonb_array_length(v) <> 1 or (v->0->>'booking_count')::integer <> 1 then
    raise exception 'Assigned sales scope leaked other booking count: %',v; end if;
  h := public.crm_customer_history('20000000-0000-4000-8000-000000000001');
  if jsonb_array_length(h->'history') <> 1 then
    raise exception 'Assigned sales history exceeded own bookings'; end if;
end $$;

-- Owner records consent, sees due anniversary, then opts out; no auto-send.
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',false);
do $$ declare q jsonb; rejected boolean := false; begin
  begin
    perform public.crm_save_consent('20000000-0000-4000-8000-000000000001',true,'','');
  exception when others then
    if sqlerrm <> 'Explicit consent source and evidence required' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'Consent without evidence was accepted'; end if;
  q := public.crm_anniversary_queue(30);
  if jsonb_array_length(q) <> 0 then raise exception 'No-consent customer in follow-up queue'; end if;
  perform public.crm_save_consent('20000000-0000-4000-8000-000000000001',true,'WhatsApp','Synthetic explicit consent at test');
  q := public.crm_anniversary_queue(30);
  if jsonb_array_length(q) <> 1 then raise exception 'Consented completed booking missing: %',q; end if;
  perform public.crm_record_followup('30000000-0000-4000-8000-000000000001','contacted','Synthetic test');
  q := public.crm_anniversary_queue(30);
  if jsonb_array_length(q) <> 0 then raise exception 'Completed follow-up still in queue'; end if;
  perform public.crm_save_consent('20000000-0000-4000-8000-000000000001',false,null,null);
  if (select count(*) from public.crm_contact_preferences where marketing_opt_in) <> 0 then
    raise exception 'Opt-out not respected'; end if;
end $$;
reset role;
\echo 'PASS: disposable schema, scoped overview, session expiry/revocation, CRM access and consent tests'
