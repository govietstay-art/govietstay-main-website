-- Replace one pending/confirmed guide assignment in a single transaction.
-- A failed new assignment rolls back the cancellation of the old assignment.
create or replace function public.ops_replace_booking_guide(
  p_assignment_id uuid,
  p_new_guide_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_staff public.staff_profiles%rowtype;
  v_old public.booking_guides%rowtype;
  v_booking public.bookings%rowtype;
  v_new_guide public.guides%rowtype;
  v_fee bigint := 0;
  v_hours numeric;
begin
  select * into v_staff
  from public.staff_profiles
  where auth_user_id = auth.uid() and active = true
  limit 1;
  if v_staff.id is null or v_staff.role not in ('owner', 'admin', 'desk') then
    raise exception 'not authorized';
  end if;

  select * into v_old from public.booking_guides
  where id = p_assignment_id for update;
  if v_old.id is null then raise exception 'assignment not found'; end if;
  if v_old.status not in ('pending', 'confirmed') then
    raise exception 'Only pending or confirmed guides can be replaced';
  end if;
  if v_old.guide_id = p_new_guide_id then
    raise exception 'Choose a different guide';
  end if;

  select * into v_booking from public.bookings
  where id = v_old.booking_id for update;
  if v_booking.id is null or v_booking.status in ('cancelled', 'completed', 'closed') then
    raise exception 'Booking cannot be reassigned';
  end if;

  select * into v_new_guide from public.guides
  where id = p_new_guide_id and active = true;
  if v_new_guide.id is null then raise exception 'New guide not found or inactive'; end if;
  if exists (
    select 1 from public.booking_guides
    where booking_id = v_old.booking_id
      and guide_id = p_new_guide_id
      and status <> 'cancelled'
  ) then
    raise exception 'New guide already assigned to this booking';
  end if;

  if v_booking.start_time is not null and v_booking.end_time is not null then
    v_hours := extract(epoch from (v_booking.end_time - v_booking.start_time)) / 3600.0;
  end if;
  v_fee := case
    when v_hours is not null and v_hours > 0 and v_hours <= 5
      then coalesce(v_new_guide.half_day_rate_vnd, 0)
    else coalesce(v_new_guide.full_day_rate_vnd, 0)
  end;

  update public.booking_guides
  set status = 'cancelled', updated_at = now()
  where id = v_old.id;

  insert into public.booking_guides
    (booking_id, guide_id, status, agreed_fee_vnd, assigned_by)
  values
    (v_old.booking_id, p_new_guide_id, 'confirmed', v_fee, v_staff.id)
  on conflict (booking_id, guide_id) do update set
    status = 'confirmed',
    agreed_fee_vnd = excluded.agreed_fee_vnd,
    assigned_by = excluded.assigned_by,
    updated_at = now();

  return jsonb_build_object(
    'booking_id', v_old.booking_id,
    'old_assignment_id', v_old.id,
    'old_guide_id', v_old.guide_id,
    'new_guide_id', p_new_guide_id,
    'agreed_fee_vnd', v_fee
  );
end;
$$;

revoke all on function public.ops_replace_booking_guide(uuid, uuid) from public, anon;
grant execute on function public.ops_replace_booking_guide(uuid, uuid) to authenticated;
