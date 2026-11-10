
-- Dispatch requirements are optional for existing bookings: preserve legacy guide-language behavior.
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS requires_guide boolean,
  ADD COLUMN IF NOT EXISTS requires_transport boolean;

COMMENT ON COLUMN public.bookings.requires_guide IS 'NULL uses legacy guide_language inference; TRUE/FALSE explicitly controls guide dispatch.';
COMMENT ON COLUMN public.bookings.requires_transport IS 'NULL means no transport requirement for legacy bookings; TRUE requires a linked transport payable before READY.';

-- Restore INSERT/UPDATE by authenticated admin: the trigger calls this function with invoker rights,
-- so booking_financials RLS still enforces owner/admin access, including for direct RPC calls.
ALTER FUNCTION public.sync_booking_supplier_cost(uuid) SECURITY INVOKER;
GRANT EXECUTE ON FUNCTION public.sync_booking_supplier_cost(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.ops_set_booking_status(p_booking_id uuid, p_status text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_staff public.staff_profiles%rowtype;
  v_booking public.bookings%rowtype;
  v_has_guide boolean;
  v_has_transport boolean;
begin
  if p_status not in ('pending','confirmed','ready','completed','closed','cancelled') then
    raise exception 'invalid status';
  end if;

  select * into v_staff
  from public.staff_profiles
  where auth_user_id = auth.uid() and active = true
  limit 1;
  if v_staff.id is null or v_staff.role not in ('owner','admin','desk','sales') then
    raise exception 'not authorized';
  end if;

  select * into v_booking from public.bookings where id = p_booking_id for update;
  if v_booking.id is null then raise exception 'booking not found'; end if;

  if v_staff.role = 'sales' then
    if v_booking.staff_id is distinct from v_staff.id then raise exception 'not authorized for this booking'; end if;
    if not (v_booking.status = 'pending' and p_status = 'confirmed') then
      raise exception 'sales can only confirm own draft booking';
    end if;
  elsif v_staff.role = 'desk' then
    if p_status in ('closed','cancelled') then raise exception 'desk cannot close or cancel booking'; end if;
  end if;

  if p_status = 'ready' then
    if coalesce(trim(v_booking.hotel),'') = '' then raise exception 'hotel is required before READY'; end if;
    if v_booking.pickup_time is null and v_booking.start_time is null then raise exception 'pickup time is required before READY'; end if;
    if coalesce(v_booking.requires_guide, coalesce(trim(v_booking.guide_language),'') <> '') then
      select exists(
        select 1 from public.booking_guides bg
        where bg.booking_id = p_booking_id and bg.status in ('confirmed','completed')
      ) into v_has_guide;
      if not v_has_guide then raise exception 'guide is required before READY'; end if;
    end if;
    if coalesce(v_booking.requires_transport,false) then
      select exists(
        select 1 from public.booking_supplier_payables bsp
        where bsp.booking_id = p_booking_id
          and bsp.source = 'transport_operations' and bsp.status in ('open','paid')
      ) into v_has_transport;
      if not v_has_transport then raise exception 'transport is required before READY'; end if;
    end if;
  end if;

  if p_status = 'completed' and v_staff.role not in ('owner','admin','desk') then
    raise exception 'not authorized to complete booking';
  end if;
  if p_status = 'closed' and v_staff.role not in ('owner','admin') then
    raise exception 'only admin can close booking';
  end if;

  update public.bookings set status = p_status, updated_at = now() where id = p_booking_id;
  return jsonb_build_object('booking_id',p_booking_id,'status',p_status);
end;
$function$;
