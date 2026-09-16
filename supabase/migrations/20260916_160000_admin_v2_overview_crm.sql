-- STAGED ONLY: review and test on a non-production database before applying.
-- Additive migration. Does not modify existing partner IDs, ref codes, dashboard tokens,
-- bookings, contacts, existing RLS policies or legacy RPC functions.

create table if not exists public.crm_contact_preferences (
  contact_id uuid primary key references public.contacts(id) on delete cascade,
  marketing_opt_in boolean not null default false,
  consent_source text,
  consent_evidence text,
  consented_at timestamptz,
  opted_out_at timestamptz,
  updated_by_staff_id uuid references public.staff_profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint crm_consent_evidence_required check (
    marketing_opt_in = false or (
      consented_at is not null and length(btrim(coalesce(consent_source, ''))) > 0
      and length(btrim(coalesce(consent_evidence, ''))) > 0
      and opted_out_at is null
    )
  )
);

create table if not exists public.crm_followup_actions (
  booking_id uuid primary key references public.bookings(id) on delete cascade,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  followup_on date not null,
  outcome text not null check (outcome in ('contacted', 'skipped')),
  notes text,
  acted_by_staff_id uuid references public.staff_profiles(id) on delete set null,
  acted_at timestamptz not null default now()
);
create index if not exists crm_followup_contact_idx on public.crm_followup_actions(contact_id, followup_on);

alter table public.crm_contact_preferences enable row level security;
alter table public.crm_followup_actions enable row level security;
revoke all on public.crm_contact_preferences from public, anon, authenticated;
revoke all on public.crm_followup_actions from public, anon, authenticated;
-- No direct table policies or grants: only role-checked RPCs below expose scoped data.

create or replace function public.company_booking_overview(
  p_from date default (current_date - 6), p_to date default current_date
) returns jsonb language plpgsql stable security definer
set search_path = public, pg_temp
as $$
declare v_result jsonb;
begin
  if auth.uid() is null or not exists (
    select 1 from public.staff_profiles s
    where s.auth_user_id = auth.uid() and s.active = true
  ) then raise exception 'Company staff access required'; end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 366 then
    raise exception 'Invalid date range';
  end if;
  with daily as (
    select b.tour_date as day,
      count(*)::bigint as bookings,
      count(*) filter (where b.status = 'cancelled')::bigint as cancelled,
      count(*) filter (where b.status in ('pending'))::bigint as pending,
      count(*) filter (where b.status in ('completed','closed'))::bigint as completed,
      coalesce(sum(coalesce(b.pax, b.adults + b.children, 0))
        filter (where b.status <> 'cancelled'), 0)::bigint as pax
    from public.bookings b
    where b.tour_date between p_from and p_to
    group by b.tour_date
  )
  select jsonb_build_object(
    'from', p_from, 'to', p_to,
    'bookings', coalesce(sum(bookings), 0),
    'cancelled', coalesce(sum(cancelled), 0),
    'pending', coalesce(sum(pending), 0),
    'completed', coalesce(sum(completed), 0),
    'pax', coalesce(sum(pax), 0),
    'daily', coalesce(jsonb_agg(jsonb_build_object(
      'date', day, 'bookings', bookings, 'cancelled', cancelled,
      'pending', pending, 'completed', completed, 'pax', pax
    ) order by day), '[]'::jsonb)
  ) into v_result from daily;
  return v_result;
end;
$$;
revoke all on function public.company_booking_overview(date,date) from public, anon;
grant execute on function public.company_booking_overview(date,date) to authenticated;

-- CRM is restricted to Owner/Admin and Sales staff assigned to at least one
-- booking of that customer. Operations' all-booking visibility does not imply
-- access to the full historic customer CRM or marketing preferences.
create or replace function public.crm_customer_directory(
  p_search text default '', p_limit integer default 50
) returns jsonb language plpgsql stable security definer
set search_path = public, pg_temp
as $$
declare v_staff public.staff_profiles%rowtype; v_result jsonb;
begin
  select * into v_staff from public.staff_profiles
  where auth_user_id = auth.uid() and active = true limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','sales') then
    raise exception 'CRM access required'; end if;
  select coalesce(jsonb_agg(row_data order by last_tour desc nulls last, full_name), '[]'::jsonb)
    into v_result from (
    select c.full_name,
      (select max(b.tour_date) from public.bookings b where b.contact_id = c.id) last_tour,
      jsonb_build_object(
        'id', c.id, 'name', c.full_name, 'whatsapp', c.whatsapp,
        'phone', c.phone, 'email', c.email, 'country', c.country,
        'language', c.preferred_language,
        'booking_count', (select count(*) from public.bookings b where b.contact_id = c.id),
        'last_tour', (select max(b.tour_date) from public.bookings b where b.contact_id = c.id),
        'marketing_opt_in', coalesce(p.marketing_opt_in, false)
      ) row_data
    from public.contacts c
    left join public.crm_contact_preferences p on p.contact_id = c.id
    where (v_staff.role in ('owner','admin') or exists (
      select 1 from public.bookings b where b.contact_id = c.id and b.staff_id = v_staff.id
    ))
    and (btrim(coalesce(p_search, '')) = '' or
      coalesce(c.full_name,'') ilike '%' || left(btrim(p_search),80) || '%' or
      coalesce(c.whatsapp,'') ilike '%' || left(btrim(p_search),80) || '%' or
      coalesce(c.phone,'') ilike '%' || left(btrim(p_search),80) || '%')
    order by last_tour desc nulls last, c.full_name
    limit greatest(1, least(coalesce(p_limit,50),100))
  ) x;
  return v_result;
end;
$$;
revoke all on function public.crm_customer_directory(text,integer) from public, anon;
grant execute on function public.crm_customer_directory(text,integer) to authenticated;

create or replace function public.crm_customer_history(p_contact_id uuid)
returns jsonb language plpgsql stable security definer
set search_path = public, pg_temp
as $$
declare v_staff public.staff_profiles%rowtype; v_result jsonb;
begin
  select * into v_staff from public.staff_profiles
  where auth_user_id = auth.uid() and active = true limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','sales') or
    (v_staff.role = 'sales' and not exists (
      select 1 from public.bookings b
      where b.contact_id = p_contact_id and b.staff_id = v_staff.id
    )) then raise exception 'CRM access required'; end if;
  select jsonb_build_object(
    'id', c.id, 'name', c.full_name, 'whatsapp', c.whatsapp,
    'phone', c.phone, 'email', c.email, 'country', c.country,
    'language', c.preferred_language, 'notes', c.notes,
    'marketing_opt_in', coalesce(p.marketing_opt_in,false),
    'consent_source', p.consent_source, 'consented_at', p.consented_at,
    'history', coalesce((select jsonb_agg(jsonb_build_object(
      'id', b.id, 'code', b.booking_code, 'tour_date', b.tour_date,
      'tour_name', coalesce(nullif(b.custom_tour_name,''),t.name,'Custom tour'),
      'status', b.status, 'pax', coalesce(b.pax, b.adults+b.children, 0)
    ) order by b.tour_date desc) from public.bookings b
      left join public.tours t on t.id = b.tour_id
      where b.contact_id = c.id and
        (v_staff.role in ('owner','admin') or b.staff_id = v_staff.id)), '[]'::jsonb)
  ) into v_result
  from public.contacts c left join public.crm_contact_preferences p on p.contact_id=c.id
  where c.id=p_contact_id;
  return v_result;
end;
$$;
revoke all on function public.crm_customer_history(uuid) from public, anon;
grant execute on function public.crm_customer_history(uuid) to authenticated;

create or replace function public.crm_save_consent(
  p_contact_id uuid, p_opt_in boolean, p_source text default null, p_evidence text default null
) returns boolean language plpgsql security definer
set search_path = public, pg_temp
as $$
declare v_staff public.staff_profiles%rowtype;
begin
  select * into v_staff from public.staff_profiles
  where auth_user_id = auth.uid() and active=true limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','sales') or
    (v_staff.role = 'sales' and not exists (
      select 1 from public.bookings b where b.contact_id=p_contact_id and b.staff_id=v_staff.id
    )) then raise exception 'CRM access required'; end if;
  if not exists (select 1 from public.contacts where id=p_contact_id) then
    raise exception 'Customer not found'; end if;
  if p_opt_in is true and (
    length(btrim(coalesce(p_source,''))) < 2 or
    length(btrim(coalesce(p_evidence,''))) < 5
  ) then raise exception 'Explicit consent source and evidence required'; end if;
  insert into public.crm_contact_preferences(
    contact_id,marketing_opt_in,consent_source,consent_evidence,
    consented_at,opted_out_at,updated_by_staff_id,updated_at
  ) values (
    p_contact_id,coalesce(p_opt_in,false),nullif(btrim(coalesce(p_source,'')),''),
    nullif(btrim(coalesce(p_evidence,'')),''),
    case when p_opt_in is true then now() else null end,
    case when p_opt_in is true then null else now() end,v_staff.id,now()
  ) on conflict(contact_id) do update set
    marketing_opt_in=excluded.marketing_opt_in, consent_source=excluded.consent_source,
    consent_evidence=excluded.consent_evidence, consented_at=excluded.consented_at,
    opted_out_at=excluded.opted_out_at,updated_by_staff_id=excluded.updated_by_staff_id,
    updated_at=now();
  return true;
end;
$$;
revoke all on function public.crm_save_consent(uuid,boolean,text,text) from public, anon;
grant execute on function public.crm_save_consent(uuid,boolean,text,text) to authenticated;

create or replace function public.crm_anniversary_queue(p_days integer default 30)
returns jsonb language plpgsql stable security definer
set search_path = public, pg_temp
as $$
declare v_staff public.staff_profiles%rowtype; v_result jsonb;
begin
  select * into v_staff from public.staff_profiles
  where auth_user_id = auth.uid() and active=true limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','sales') then
    raise exception 'CRM access required'; end if;
  select coalesce(jsonb_agg(obj order by due_date), '[]'::jsonb) into v_result from (
    select (b.tour_date + interval '1 year')::date due_date,
      jsonb_build_object('booking_id',b.id,'contact_id',c.id,
        'name',c.full_name,'whatsapp',coalesce(c.whatsapp,c.phone),
        'language',c.preferred_language,'tour_date',b.tour_date,
        'tour_name',coalesce(nullif(b.custom_tour_name,''), t.name,'Custom tour'),
        'due_on',(b.tour_date + interval '1 year')::date) obj
    from public.bookings b
    join public.contacts c on c.id=b.contact_id
    join public.crm_contact_preferences p on p.contact_id=c.id and p.marketing_opt_in=true
      and p.consented_at is not null and p.opted_out_at is null
    left join public.tours t on t.id=b.tour_id
    where b.status in ('completed','closed')
      and (b.tour_date + interval '1 year')::date between current_date and
        current_date+greatest(0,least(coalesce(p_days,30),90))
      and (v_staff.role in ('owner','admin') or b.staff_id=v_staff.id)
      and not exists (select 1 from public.crm_followup_actions a where a.booking_id=b.id)
    order by due_date, c.full_name limit 100
  ) q;
  return v_result;
end;
$$;
revoke all on function public.crm_anniversary_queue(integer) from public, anon;
grant execute on function public.crm_anniversary_queue(integer) to authenticated;

create or replace function public.crm_record_followup(
  p_booking_id uuid, p_outcome text, p_notes text default null
) returns boolean language plpgsql security definer
set search_path = public, pg_temp
as $$
declare v_staff public.staff_profiles%rowtype; v_booking public.bookings%rowtype;
begin
  select * into v_staff from public.staff_profiles
  where auth_user_id=auth.uid() and active=true limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','sales') then
    raise exception 'CRM access required'; end if;
  if p_outcome not in ('contacted','skipped') then raise exception 'Invalid outcome'; end if;
  select * into v_booking from public.bookings where id=p_booking_id;
  if v_booking.id is null or v_booking.contact_id is null or
    (v_staff.role='sales' and v_booking.staff_id is distinct from v_staff.id) then
    raise exception 'Booking not found or not assigned'; end if;
  if v_booking.status not in ('completed','closed') or v_booking.tour_date is null or
    (v_booking.tour_date + interval '1 year')::date > current_date then
    raise exception 'Anniversary not due'; end if;
  if p_outcome='contacted' and not exists (
    select 1 from public.crm_contact_preferences p
    where p.contact_id=v_booking.contact_id and p.marketing_opt_in=true
      and p.consented_at is not null and p.opted_out_at is null
  ) then raise exception 'Marketing consent required'; end if;
  insert into public.crm_followup_actions(
    booking_id,contact_id,followup_on,outcome,notes,acted_by_staff_id
  ) values (
    v_booking.id,v_booking.contact_id,(v_booking.tour_date + interval '1 year')::date,
    p_outcome,left(p_notes,2000),v_staff.id
  ) on conflict(booking_id) do update set
    outcome=excluded.outcome,notes=excluded.notes,
    acted_by_staff_id=excluded.acted_by_staff_id,acted_at=now();
  return true;
end;
$$;
revoke all on function public.crm_record_followup(uuid,text,text) from public, anon;
grant execute on function public.crm_record_followup(uuid,text,text) to authenticated;
