-- STAGED ONLY. This migration adds a new, read-only RPC for existing sales PIN sessions.
-- It does not change staff_sales_login, staff_submit_booking_request, any old
-- employee account, booking, payment, partner token, legacy function or policy.
-- Apply only to an isolated test database until the release gate is met.

create or replace function public.company_booking_overview_sales(
  p_token uuid,
  p_from date,
  p_to date
) returns jsonb
language plpgsql stable security definer
set search_path = public, pg_temp
as $$
declare
  v_staff_id uuid;
  v_result jsonb;
begin
  -- Existing staff_sales_login issues this unguessable token after verifying
  -- a sales code AND its PIN. A bare sales code is never sufficient.
  select s.id into v_staff_id
  from public.staff_sales_sessions sess
  join public.staff_profiles s on s.id = sess.staff_id
  where sess.token = p_token
    and sess.revoked = false
    and sess.expires_at > now()
    and s.active = true
    and s.allow_booking_portal = true
    and s.role = 'sales'
  limit 1;

  if v_staff_id is null then
    raise exception 'Valid sales session required';
  end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 366 then
    raise exception 'Invalid date range';
  end if;

  -- Aggregate only; never return customer identifiers, money or staff details.
  with daily as (
    select b.tour_date as day,
      count(*)::bigint as bookings,
      count(*) filter (where b.status = 'cancelled')::bigint as cancelled,
      count(*) filter (where b.status = 'pending')::bigint as pending,
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

revoke all on function public.company_booking_overview_sales(uuid,date,date)
  from public, anon, authenticated;
grant execute on function public.company_booking_overview_sales(uuid,date,date)
  to anon, authenticated;
