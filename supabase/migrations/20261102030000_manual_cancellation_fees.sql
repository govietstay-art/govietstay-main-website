-- Keep cancellation charges due separate from money actually recovered.
alter table public.booking_cancellations
  add column if not exists customer_fee_due_vnd bigint not null default 0
  check (customer_fee_due_vnd >= 0);

create or replace function public.admin_save_cancellation_details(
  p_booking_id uuid, p_reason text, p_supplier_fee_vnd bigint,
  p_customer_fee_due_vnd bigint, p_fee_paid_vnd bigint default 0
) returns jsonb language plpgsql security definer set search_path=public as $$
declare v_status text;
begin
  if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;
  if nullif(trim(p_reason),'') is null then raise exception 'Cancellation reason is required'; end if;
  if p_supplier_fee_vnd < 0 or p_customer_fee_due_vnd < 0 or p_fee_paid_vnd < 0
     or p_fee_paid_vnd > p_supplier_fee_vnd then raise exception 'Invalid cancellation amount'; end if;
  select status into v_status from public.bookings where id=p_booking_id for update;
  if not found then raise exception 'Booking not found'; end if;
  if v_status in ('completed','closed','refunded') then raise exception 'Booking cannot be cancelled'; end if;
  if exists (select 1 from public.booking_cancellations
    where booking_id=p_booking_id and customer_recovery_vnd>p_customer_fee_due_vnd)
  then raise exception 'Fee due cannot be less than amount already collected'; end if;
  if v_status <> 'cancelled' then
    perform public.admin_cancel_booking(p_booking_id,p_reason,p_supplier_fee_vnd,0,p_fee_paid_vnd);
  end if;
  insert into public.booking_cancellations
    (booking_id,reason,supplier_fee_vnd,customer_fee_due_vnd,fee_paid_vnd)
  values (p_booking_id,trim(p_reason),p_supplier_fee_vnd,p_customer_fee_due_vnd,p_fee_paid_vnd)
  on conflict (booking_id) do update set
    reason=excluded.reason,supplier_fee_vnd=excluded.supplier_fee_vnd,
    customer_fee_due_vnd=excluded.customer_fee_due_vnd,fee_paid_vnd=excluded.fee_paid_vnd,
    updated_at=now();
  return jsonb_build_object('booking_id',p_booking_id,'status','cancelled',
    'customer_fee_due_vnd',p_customer_fee_due_vnd);
end $$;
revoke all on function public.admin_save_cancellation_details(uuid,text,bigint,bigint,bigint) from public,anon;
grant execute on function public.admin_save_cancellation_details(uuid,text,bigint,bigint,bigint) to authenticated;

create or replace function public.admin_record_cancellation_recovery(
  p_booking_id uuid, p_received_total_vnd bigint
) returns void language plpgsql security definer set search_path=public as $$
begin
  if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;
  update public.booking_cancellations
  set customer_recovery_vnd=p_received_total_vnd,updated_at=now()
  where booking_id=p_booking_id and p_received_total_vnd>=0
    and p_received_total_vnd<=customer_fee_due_vnd;
  if not found then raise exception 'Received amount must be between zero and fee due'; end if;
end $$;
revoke all on function public.admin_record_cancellation_recovery(uuid,bigint) from public,anon;
grant execute on function public.admin_record_cancellation_recovery(uuid,bigint) to authenticated;
