-- Finalize zero-revenue service days as part of a paid multi-day package.
-- Revenue is carried only by the selected positive-revenue booking, without allocating
-- cash or rewriting costs on either booking.
alter table public.booking_financials
  add column if not exists revenue_recorded_in_booking_id uuid
  references public.bookings(id) on delete restrict;

comment on column public.booking_financials.revenue_recorded_in_booking_id is
  'When this day has zero revenue, identifies the booking that records the package revenue. Does not change cash, costs or parent payment status.';

alter table public.booking_financials
  add constraint booking_financials_revenue_source_not_self
  check (revenue_recorded_in_booking_id is null or revenue_recorded_in_booking_id <> booking_id);

create or replace function public.admin_finalize_zero_revenue_booking(
  p_booking_id uuid,
  p_revenue_booking_id uuid
) returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_booking public.bookings%rowtype;
  v_parent public.bookings%rowtype;
  v_existing public.booking_financials%rowtype;
  v_cost bigint := 0;
  v_note text;
begin
  if not public.is_govietstay_admin() then
    raise exception 'not authorized';
  end if;
  if p_booking_id is null or p_revenue_booking_id is null
     or p_booking_id = p_revenue_booking_id then
    raise exception 'select a separate revenue booking for this package day';
  end if;

  select * into v_booking
  from public.bookings
  where id = p_booking_id
  for update;
  if v_booking.id is null then raise exception 'booking not found'; end if;
  if lower(coalesce(v_booking.status,'')) in ('cancelled','refunded') then
    raise exception 'cancelled or refunded booking cannot be finalized';
  end if;
  if greatest(coalesce(v_booking.net_revenue_vnd,
    coalesce(v_booking.gross_revenue_vnd,0)-coalesce(v_booking.discount_vnd,0)),0) <> 0 then
    raise exception 'this workflow is only for a booking with zero revenue';
  end if;
  if v_booking.contact_id is null then
    raise exception 'booking must have a linked customer';
  end if;

  select * into v_parent
  from public.bookings
  where id = p_revenue_booking_id
  for key share;
  if v_parent.id is null then raise exception 'revenue booking not found'; end if;
  if v_parent.contact_id is distinct from v_booking.contact_id then
    raise exception 'revenue booking must belong to the same customer';
  end if;
  if lower(coalesce(v_parent.status,'')) in ('cancelled','refunded') then
    raise exception 'cancelled or refunded revenue booking is not eligible';
  end if;
  if greatest(coalesce(v_parent.net_revenue_vnd,
    coalesce(v_parent.gross_revenue_vnd,0)-coalesce(v_parent.discount_vnd,0)),0) <= 0 then
    raise exception 'revenue booking must contain a positive selling price';
  end if;
  if v_parent.tour_date is not null and v_booking.tour_date is not null
      and abs(v_parent.tour_date - v_booking.tour_date) > 31 then
    raise exception 'revenue booking must be within 31 days of this tour day';
  end if;

  select * into v_existing from public.booking_financials
  where booking_id = v_booking.id
  for update;
  if coalesce(v_existing.amount_received_vnd,0) <> 0 then
    raise exception 'zero-revenue day has a recorded payment: review finance before finalizing';
  end if;
  if v_existing.revenue_recorded_in_booking_id is not null
      and v_existing.revenue_recorded_in_booking_id <> v_parent.id then
    raise exception 'day already linked to a different revenue booking';
  end if;

  v_note := 'Package day - revenue recorded under booking '||
    coalesce(v_parent.booking_code,v_parent.id::text)||
    '; no separate customer payment recorded.';

  update public.bookings
  set status='completed', payment_status='paid'
  where id=v_booking.id;

  insert into public.booking_financials
    (booking_id,amount_received_vnd,finance_finalized,revenue_recorded_in_booking_id,notes)
  values (v_booking.id,0,true,v_parent.id,v_note)
  on conflict (booking_id) do update
    set amount_received_vnd=0,
        finance_finalized=true,
        revenue_recorded_in_booking_id=excluded.revenue_recorded_in_booking_id,
        notes=case
          when public.booking_financials.notes is null or public.booking_financials.notes='' then v_note
          when position(v_note in public.booking_financials.notes)>0 then public.booking_financials.notes
          else public.booking_financials.notes||E'\n'||v_note
        end,
        updated_at=now();

  perform public.admin_recalculate_staff_compensation(
    date_trunc('month',coalesce(v_booking.tour_date,current_date))::date);

  select coalesce(total_direct_cost_vnd,0)+coalesce(staff_commission_vnd,0)
    into v_cost
  from public.booking_financials where booking_id=v_booking.id;

  return jsonb_build_object(
    'booking_id',v_booking.id,
    'booking_code',v_booking.booking_code,
    'status','completed',
    'payment_status','paid',
    'amount_received_vnd',0,
    'finance_finalized',true,
    'revenue_recorded_in_booking_id',v_parent.id,
    'revenue_booking_code',v_parent.booking_code,
    'direct_cost_vnd',v_cost,
    'warning',case when coalesce(v_cost,0)=0 then 'NO_DIRECT_COST' else null end
  );
end;
$function$;

revoke all on function public.admin_finalize_zero_revenue_booking(uuid,uuid)
  from public, anon;
grant execute on function public.admin_finalize_zero_revenue_booking(uuid,uuid)
  to authenticated, service_role;
