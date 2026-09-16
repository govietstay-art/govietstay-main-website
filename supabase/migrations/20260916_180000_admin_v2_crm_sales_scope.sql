-- STAGED ONLY. Adjust only the NEW CRM directory function from the preceding
-- V2 migration. Existing booking, partner, Finance and Sales functions untouched.
-- An assigned Sales may see an assigned customer, but the booking count and
-- last-tour date must describe only that Sales employee's own bookings.

create or replace function public.crm_customer_directory(
  p_search text default '', p_limit integer default 50
) returns jsonb language plpgsql stable security definer
set search_path = public, pg_temp
as $$
declare
  v_staff public.staff_profiles%rowtype;
  v_result jsonb;
begin
  select * into v_staff
  from public.staff_profiles
  where auth_user_id = auth.uid() and active = true
  limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','sales') then
    raise exception 'CRM access required';
  end if;

  select coalesce(
    jsonb_agg(x.payload order by x.last_tour desc nulls last, x.full_name),
    '[]'::jsonb
  ) into v_result
  from (
    select c.full_name, scoped.last_tour,
      jsonb_build_object(
        'id', c.id, 'name', c.full_name,
        'whatsapp', c.whatsapp, 'phone', c.phone, 'email', c.email,
        'country', c.country, 'language', c.preferred_language,
        'booking_count', scoped.booking_count,
        'last_tour', scoped.last_tour,
        'marketing_opt_in', coalesce(p.marketing_opt_in, false)
      ) as payload
    from public.contacts c
    cross join lateral (
      select count(*)::bigint as booking_count,
        max(b.tour_date) as last_tour
      from public.bookings b
      where b.contact_id = c.id and
        (v_staff.role in ('owner','admin') or b.staff_id = v_staff.id)
    ) scoped
    left join public.crm_contact_preferences p on p.contact_id = c.id
    where (v_staff.role in ('owner','admin') or scoped.booking_count > 0)
      and (btrim(coalesce(p_search, '')) = '' or
        coalesce(c.full_name, '') ilike '%' || left(btrim(p_search),80) || '%' or
        coalesce(c.whatsapp, '') ilike '%' || left(btrim(p_search),80) || '%' or
        coalesce(c.phone, '') ilike '%' || left(btrim(p_search),80) || '%')
    order by scoped.last_tour desc nulls last, c.full_name
    limit greatest(1, least(coalesce(p_limit,50),100))
  ) x;
  return v_result;
end;
$$;
revoke all on function public.crm_customer_directory(text,integer) from public, anon;
grant execute on function public.crm_customer_directory(text,integer) to authenticated;
