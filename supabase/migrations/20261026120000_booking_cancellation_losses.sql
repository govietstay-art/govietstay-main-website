-- Cancellation losses belong to the month of cancellation, not the tour month.
create table if not exists public.booking_cancellations (
  booking_id uuid primary key references public.bookings(id) on delete restrict,
  cancelled_at timestamptz not null default now(),
  reason text not null,
  supplier_fee_vnd bigint not null default 0 check (supplier_fee_vnd >= 0),
  customer_recovery_vnd bigint not null default 0 check (customer_recovery_vnd >= 0),
  fee_paid_vnd bigint not null default 0 check (fee_paid_vnd >= 0 and fee_paid_vnd <= supplier_fee_vnd),
  updated_at timestamptz not null default now()
);
create index if not exists booking_cancellations_date_idx on public.booking_cancellations(cancelled_at);
alter table public.booking_cancellations enable row level security;
create policy "admin_read_cancellations" on public.booking_cancellations for select to authenticated using ((select public.is_govietstay_admin()));
revoke all on public.booking_cancellations from anon, authenticated;
grant select on public.booking_cancellations to authenticated;

create or replace function public.admin_cancel_booking(
 p_booking_id uuid, p_reason text, p_supplier_fee_vnd bigint,
 p_customer_recovery_vnd bigint default 0, p_fee_paid_vnd bigint default 0
) returns jsonb language plpgsql security definer set search_path = public as $$
declare v_status text; v_received bigint;
begin
 if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;
 if nullif(trim(p_reason),'') is null then raise exception 'Cancellation reason is required'; end if;
 if p_supplier_fee_vnd < 0 or p_customer_recovery_vnd < 0 or p_fee_paid_vnd < 0 or p_fee_paid_vnd > p_supplier_fee_vnd then raise exception 'Invalid fee amount'; end if;
 select b.status,coalesce(f.amount_received_vnd,0) into v_status,v_received
 from public.bookings b left join public.booking_financials f on f.booking_id=b.id
 where b.id=p_booking_id for update of b;
 if not found then raise exception 'Booking not found'; end if;
 if lower(coalesce(v_status,'')) in ('completed','closed') then raise exception 'Completed booking cannot be cancelled'; end if;
 if lower(coalesce(v_status,'')) in ('cancelled','canceled') then raise exception 'Booking already cancelled'; end if;
 if v_received > 0 and p_customer_recovery_vnd > v_received then raise exception 'Recovery cannot exceed recorded received amount'; end if;
 insert into public.booking_cancellations(booking_id,reason,supplier_fee_vnd,customer_recovery_vnd,fee_paid_vnd)
 values(p_booking_id,trim(p_reason),p_supplier_fee_vnd,p_customer_recovery_vnd,p_fee_paid_vnd);
 update public.bookings set status='cancelled',payment_status=case when v_received=0 then 'unpaid' else payment_status end where id=p_booking_id;
 return jsonb_build_object('booking_id',p_booking_id,'loss_vnd',p_supplier_fee_vnd-p_customer_recovery_vnd);
end $$;
revoke all on function public.admin_cancel_booking(uuid,text,bigint,bigint,bigint) from public,anon;
grant execute on function public.admin_cancel_booking(uuid,text,bigint,bigint,bigint) to authenticated;

create or replace function public.admin_monthly_cancellation_summary(p_month date)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_start timestamptz:=date_trunc('month',coalesce(p_month,current_date))::timestamptz;
declare v_end timestamptz:=v_start+interval '1 month';
declare v_data jsonb;
begin
 if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;
 select jsonb_build_object(
  'count',count(*),'supplier_fees_vnd',coalesce(sum(supplier_fee_vnd),0),
  'recovered_vnd',coalesce(sum(customer_recovery_vnd),0),
  'net_loss_vnd',coalesce(sum(supplier_fee_vnd-customer_recovery_vnd),0),
  'paid_vnd',coalesce(sum(fee_paid_vnd),0),
  'payable_vnd',coalesce(sum(supplier_fee_vnd-fee_paid_vnd),0)
 ) into v_data from public.booking_cancellations where cancelled_at>=v_start and cancelled_at<v_end;
 return v_data;
end $$;
revoke all on function public.admin_monthly_cancellation_summary(date) from public,anon;
grant execute on function public.admin_monthly_cancellation_summary(date) to authenticated;

create or replace function public.admin_update_cancellation_payment(p_booking_id uuid,p_fee_paid_vnd bigint)
returns void language plpgsql security definer set search_path=public as $$
begin
 if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;
 update public.booking_cancellations
 set fee_paid_vnd=p_fee_paid_vnd,updated_at=now()
 where booking_id=p_booking_id and p_fee_paid_vnd>=0 and p_fee_paid_vnd<=supplier_fee_vnd;
 if not found then raise exception 'Invalid cancellation payment or booking'; end if;
end $$;
revoke all on function public.admin_update_cancellation_payment(uuid,bigint) from public,anon;
grant execute on function public.admin_update_cancellation_payment(uuid,bigint) to authenticated;
