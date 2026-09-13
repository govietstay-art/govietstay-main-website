-- GoVietStay Partner Platform V1
-- Multi-merchant onboarding + commissionable offers + Pi marketplace.
-- Additive/idempotent migration. Existing GoVietStay/Pi Partner flows remain intact.

create extension if not exists pgcrypto;

alter table public.merchants
  add column if not exists description text,
  add column if not exists contact_name text,
  add column if not exists contact text,
  add column if not exists country text,
  add column if not exists city text,
  add column if not exists visibility text not null default 'private',
  add column if not exists visible_on_pi boolean not null default false,
  add column if not exists default_fixed_commission_vnd bigint;

create unique index if not exists merchants_merchant_code_upper_uidx
  on public.merchants (upper(merchant_code));

create unique index if not exists merchant_partners_merchant_partner_uidx
  on public.merchant_partners (merchant_id, partner_id);

create table if not exists public.merchant_offers (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  offer_code text not null,
  name text not null,
  category text,
  description text,
  image_url text,
  price_vnd bigint,
  currency text not null default 'VND',
  commission_type text,
  commission_rate numeric,
  fixed_commission_vnd bigint,
  destination_url text not null,
  attribution_days integer,
  active boolean not null default true,
  visible_on_pi boolean not null default true,
  valid_from timestamptz,
  valid_until timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (merchant_id, offer_code)
);

create index if not exists merchant_offers_merchant_active_idx
  on public.merchant_offers (merchant_id, active, visible_on_pi);

alter table public.merchant_offers enable row level security;
revoke all on table public.merchant_offers from anon, authenticated;

alter table public.tracking_events
  add column if not exists merchant_id uuid references public.merchants(id) on delete set null,
  add column if not exists merchant_campaign_id uuid references public.merchant_campaigns(id) on delete set null,
  add column if not exists merchant_offer_id uuid references public.merchant_offers(id) on delete set null;

create index if not exists tracking_events_merchant_idx
  on public.tracking_events (merchant_id, occurred_at desc);
create index if not exists tracking_events_offer_idx
  on public.tracking_events (merchant_offer_id, occurred_at desc);

alter table public.bookings
  add column if not exists merchant_id uuid references public.merchants(id) on delete set null,
  add column if not exists merchant_campaign_id uuid references public.merchant_campaigns(id) on delete set null,
  add column if not exists merchant_offer_id uuid references public.merchant_offers(id) on delete set null;

alter table public.commissions
  add column if not exists merchant_id uuid references public.merchants(id) on delete set null,
  add column if not exists merchant_offer_id uuid references public.merchant_offers(id) on delete set null;

-- Admin: create a merchant plus its first general program/campaign in one form.
create or replace function public.admin_create_merchant_full(
  p_name text,
  p_merchant_code text default null,
  p_merchant_type text default 'business',
  p_website_url text default null,
  p_logo_url text default null,
  p_contact_name text default null,
  p_contact text default null,
  p_description text default null,
  p_country text default null,
  p_city text default null,
  p_visibility text default 'private',
  p_default_attribution_days integer default 90,
  p_default_commission_type text default 'percentage',
  p_default_commission_rate numeric default 0,
  p_default_fixed_commission_vnd bigint default null,
  p_campaign_name text default 'General Partner Program',
  p_campaign_code text default null,
  p_destination_url text default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_mid uuid;
  v_cid uuid;
  v_code text;
  v_campaign text;
  v_visibility text;
  v_commission_type text;
  v_destination text;
begin
  if v_uid is null or not exists (
    select 1 from public.staff_profiles sp
    where sp.auth_user_id=v_uid and sp.active=true and sp.role in ('owner','admin')
  ) then raise exception 'Admin access required'; end if;

  if nullif(trim(p_name),'') is null then raise exception 'Merchant name is required'; end if;

  v_code := regexp_replace(upper(coalesce(nullif(trim(p_merchant_code),''), p_name)), '[^A-Z0-9]+', '', 'g');
  v_code := left(v_code, 24);
  if length(v_code) < 3 then raise exception 'Merchant code is too short'; end if;
  if exists(select 1 from public.merchants m where upper(m.merchant_code)=v_code) then
    raise exception 'Merchant code already exists: %', v_code;
  end if;

  v_visibility := case lower(coalesce(p_visibility,'private'))
    when 'public' then 'public'
    when 'invite' then 'invite'
    else 'private'
  end;

  v_commission_type := case lower(coalesce(p_default_commission_type,'percentage'))
    when 'fixed' then 'fixed'
    else 'percentage'
  end;

  v_destination := coalesce(nullif(trim(p_destination_url),''), nullif(trim(p_website_url),''));
  if v_destination is null then raise exception 'Website or destination URL is required'; end if;

  insert into public.merchants(
    merchant_code,name,merchant_type,website_url,logo_url,active,is_demo,
    default_attribution_days,default_commission_type,default_commission_rate,
    default_fixed_commission_vnd,description,contact_name,contact,country,city,
    visibility,visible_on_pi
  ) values (
    v_code,trim(p_name),coalesce(nullif(trim(p_merchant_type),''),'business'),
    nullif(trim(p_website_url),''),nullif(trim(p_logo_url),''),true,false,
    greatest(1,least(coalesce(p_default_attribution_days,90),3650)),
    v_commission_type,
    case when v_commission_type='percentage' then greatest(0,least(coalesce(p_default_commission_rate,0),1)) else 0 end,
    case when v_commission_type='fixed' then greatest(coalesce(p_default_fixed_commission_vnd,0),0) else null end,
    nullif(trim(p_description),''),nullif(trim(p_contact_name),''),nullif(trim(p_contact),''),
    nullif(trim(p_country),''),nullif(trim(p_city),''),
    v_visibility,(v_visibility='public')
  ) returning id into v_mid;

  v_campaign := regexp_replace(upper(coalesce(nullif(trim(p_campaign_code),''), p_campaign_name, 'GENERAL')), '[^A-Z0-9]+', '_', 'g');
  v_campaign := trim(both '_' from left(v_campaign,40));
  if v_campaign='' then v_campaign:='GENERAL'; end if;

  insert into public.merchant_campaigns(
    merchant_id,campaign_code,name,destination_url,active,attribution_days,
    commission_type,commission_rate,fixed_commission_vnd,is_demo
  ) values (
    v_mid,v_campaign,coalesce(nullif(trim(p_campaign_name),''),'General Partner Program'),
    v_destination,true,greatest(1,least(coalesce(p_default_attribution_days,90),3650)),
    v_commission_type,
    case when v_commission_type='percentage' then greatest(0,least(coalesce(p_default_commission_rate,0),1)) else null end,
    case when v_commission_type='fixed' then greatest(coalesce(p_default_fixed_commission_vnd,0),0) else null end,
    false
  ) returning id into v_cid;

  return jsonb_build_object(
    'ok',true,'merchant_id',v_mid,'merchant_code',v_code,
    'campaign_id',v_cid,'campaign_code',v_campaign,
    'visible_on_pi',(v_visibility='public')
  );
end;
$function$;

-- Admin: add a commissionable product/service to an existing merchant.
create or replace function public.admin_create_merchant_offer(
  p_merchant_code text,
  p_offer_code text,
  p_name text,
  p_category text default null,
  p_description text default null,
  p_image_url text default null,
  p_price_vnd bigint default null,
  p_commission_type text default null,
  p_commission_rate numeric default null,
  p_fixed_commission_vnd bigint default null,
  p_destination_url text default null,
  p_attribution_days integer default null,
  p_visible_on_pi boolean default true,
  p_valid_from timestamptz default null,
  p_valid_until timestamptz default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_merchant public.merchants%rowtype;
  v_oid uuid;
  v_code text;
  v_type text;
  v_destination text;
begin
  if v_uid is null or not exists (
    select 1 from public.staff_profiles sp
    where sp.auth_user_id=v_uid and sp.active=true and sp.role in ('owner','admin')
  ) then raise exception 'Admin access required'; end if;

  select * into v_merchant from public.merchants
   where upper(merchant_code)=upper(trim(p_merchant_code)) and active=true
   limit 1;
  if v_merchant.id is null then raise exception 'Merchant not found'; end if;

  v_code := regexp_replace(upper(coalesce(nullif(trim(p_offer_code),''),p_name)), '[^A-Z0-9]+', '_', 'g');
  v_code := trim(both '_' from left(v_code,48));
  if length(v_code)<2 then raise exception 'Offer code is too short'; end if;

  v_type := case lower(coalesce(nullif(trim(p_commission_type),''),v_merchant.default_commission_type))
    when 'fixed' then 'fixed' else 'percentage' end;

  v_destination := coalesce(nullif(trim(p_destination_url),''),v_merchant.website_url);
  if v_destination is null then raise exception 'Offer destination URL is required'; end if;

  insert into public.merchant_offers(
    merchant_id,offer_code,name,category,description,image_url,price_vnd,
    commission_type,commission_rate,fixed_commission_vnd,destination_url,
    attribution_days,active,visible_on_pi,valid_from,valid_until
  ) values (
    v_merchant.id,v_code,trim(p_name),nullif(trim(p_category),''),
    nullif(trim(p_description),''),nullif(trim(p_image_url),''),
    case when p_price_vnd is null then null else greatest(p_price_vnd,0) end,
    v_type,
    case when v_type='percentage' then greatest(0,least(coalesce(p_commission_rate,v_merchant.default_commission_rate,0),1)) else null end,
    case when v_type='fixed' then greatest(coalesce(p_fixed_commission_vnd,v_merchant.default_fixed_commission_vnd,0),0) else null end,
    v_destination,
    greatest(1,least(coalesce(p_attribution_days,v_merchant.default_attribution_days,90),3650)),
    true,coalesce(p_visible_on_pi,true),p_valid_from,p_valid_until
  ) returning id into v_oid;

  return jsonb_build_object('ok',true,'offer_id',v_oid,'offer_code',v_code,'merchant_code',v_merchant.merchant_code);
end;
$function$;

create or replace function public.admin_merchant_offer_catalog()
returns table(
  merchant_code text, merchant_name text, merchant_visibility text, merchant_visible_on_pi boolean,
  offer_id uuid, offer_code text, offer_name text, category text, price_vnd bigint,
  commission_type text, commission_rate numeric, fixed_commission_vnd bigint,
  destination_url text, attribution_days integer, visible_on_pi boolean, active boolean
)
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null or not exists (
    select 1 from public.staff_profiles sp
    where sp.auth_user_id=v_uid and sp.active=true and sp.role in ('owner','admin')
  ) then raise exception 'Admin access required'; end if;

  return query
  select m.merchant_code,m.name,m.visibility,m.visible_on_pi,
         o.id,o.offer_code,o.name,o.category,o.price_vnd,
         coalesce(o.commission_type,m.default_commission_type),
         coalesce(o.commission_rate,m.default_commission_rate),
         coalesce(o.fixed_commission_vnd,m.default_fixed_commission_vnd),
         o.destination_url,coalesce(o.attribution_days,m.default_attribution_days),
         o.visible_on_pi,o.active
  from public.merchants m
  join public.merchant_offers o on o.merchant_id=m.id
  order by m.name,o.name;
end;
$function$;

-- Public bridge resolution: only active partners already joined to an active merchant.
create or replace function public.resolve_merchant_offer_bridge(
  p_merchant_code text,
  p_offer_code text,
  p_partner_code text
)
returns table(
  merchant_id uuid, offer_id uuid, partner_id uuid,
  merchant_code text, offer_code text, partner_code text,
  destination_url text, attribution_days integer,
  commission_type text, commission_rate numeric, fixed_commission_vnd bigint,
  is_demo boolean
)
language sql
security definer
set search_path to 'public'
as $function$
  select m.id,o.id,p.id,m.merchant_code,o.offer_code,p.ref_code,
         o.destination_url,
         coalesce(o.attribution_days,m.default_attribution_days),
         coalesce(o.commission_type,mp.commission_type,m.default_commission_type),
         coalesce(o.commission_rate,mp.commission_rate,m.default_commission_rate),
         coalesce(o.fixed_commission_vnd,mp.fixed_commission_vnd,m.default_fixed_commission_vnd),
         m.is_demo
  from public.merchants m
  join public.merchant_offers o on o.merchant_id=m.id
  join public.partners p on upper(p.ref_code)=upper(trim(p_partner_code)) and p.active=true
  join public.merchant_partners mp on mp.merchant_id=m.id and mp.partner_id=p.id and mp.active=true and mp.status='active'
  where upper(m.merchant_code)=upper(trim(p_merchant_code))
    and upper(o.offer_code)=upper(trim(p_offer_code))
    and m.active=true and o.active=true
    and (o.valid_from is null or o.valid_from<=now())
    and (o.valid_until is null or o.valid_until>=now())
  limit 1;
$function$;

create or replace function public.record_merchant_offer_visit(
  p_merchant_code text,
  p_offer_code text,
  p_partner_code text,
  p_visitor_id text default null,
  p_page_url text default null,
  p_referrer text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v record;
begin
  select * into v from public.resolve_merchant_offer_bridge(p_merchant_code,p_offer_code,p_partner_code);
  if v.merchant_id is null then return false; end if;

  insert into public.tracking_events(
    event_name,visitor_id,partner_id,ref_code,page_url,referrer,
    traffic_source,utm_source,utm_medium,utm_campaign,utm_content,
    merchant_id,merchant_offer_id,metadata,is_bot
  ) values (
    'merchant_offer_visit',nullif(trim(p_visitor_id),''),v.partner_id,v.partner_code,
    p_page_url,p_referrer,'partner-platform','partner-platform','merchant-offer',
    v.merchant_code,v.offer_code,v.merchant_id,v.offer_id,coalesce(p_metadata,'{}'::jsonb),false
  );
  return true;
end;
$function$;

grant execute on function public.admin_create_merchant_full(
  text,text,text,text,text,text,text,text,text,text,text,integer,text,numeric,bigint,text,text,text
) to authenticated;
grant execute on function public.admin_create_merchant_offer(
  text,text,text,text,text,text,bigint,text,numeric,bigint,text,integer,boolean,timestamptz,timestamptz
) to authenticated;
grant execute on function public.admin_merchant_offer_catalog() to authenticated;
grant execute on function public.resolve_merchant_offer_bridge(text,text,text) to anon, authenticated;
grant execute on function public.record_merchant_offer_visit(text,text,text,text,text,text,jsonb) to anon, authenticated;

-- Turn the existing lab merchants into visible examples.
update public.merchants
set visibility='public',visible_on_pi=true,
    description=coalesce(description,'Travel services and local support in Vietnam.')
where merchant_code='GVS001';

update public.merchants
set visibility='public',visible_on_pi=true,
    description=coalesce(description,'SANDBOX merchant used only to demonstrate the Partner Marketplace.')
where merchant_code='DEMO_SPA';

-- Seed a few safe demo offers. These are idempotent and clearly marked as sandbox where applicable.
insert into public.merchant_offers(
  merchant_id,offer_code,name,category,description,price_vnd,commission_type,commission_rate,
  destination_url,attribution_days,active,visible_on_pi,metadata
)
select m.id,'PQ_PRIVATE','Phu Quoc Private Tours','Travel',
       'Private Phu Quoc experiences with GoVietStay local support.',null,'percentage',0.07,
       'https://www.govietstay.com/ru/phu-quoc/individualnye-ekskursii',90,true,true,
       '{"seed":"partner-platform-v1"}'::jsonb
from public.merchants m where m.merchant_code='GVS001'
on conflict (merchant_id,offer_code) do nothing;

insert into public.merchant_offers(
  merchant_id,offer_code,name,category,description,price_vnd,commission_type,commission_rate,
  destination_url,attribution_days,active,visible_on_pi,metadata
)
select m.id,x.offer_code,x.name,'Spa Demo',x.description,x.price_vnd,x.commission_type,x.commission_rate,
       'https://www.govietstay.com/pi-network-vietnam?merchant_demo=spa',30,true,true,
       '{"sandbox":true,"seed":"partner-platform-v1"}'::jsonb
from public.merchants m
cross join (values
  ('MASSAGE60','Massage 60 Minutes','Sandbox example offer',800000::bigint,'percentage',0.08::numeric),
  ('MASSAGE90','Massage 90 Minutes','Sandbox example offer',1200000::bigint,'percentage',0.10::numeric),
  ('COUPLE','Couple Package','Sandbox example offer',2400000::bigint,'percentage',0.12::numeric)
) as x(offer_code,name,description,price_vnd,commission_type,commission_rate)
where m.merchant_code='DEMO_SPA'
on conflict (merchant_id,offer_code) do nothing;

insert into public.merchant_offers(
  merchant_id,offer_code,name,category,description,price_vnd,commission_type,fixed_commission_vnd,
  destination_url,attribution_days,active,visible_on_pi,metadata
)
select m.id,'AIRPORT_SPA','Airport Spa Combo','Spa Demo','Sandbox fixed-commission example',
       1500000,'fixed',150000,
       'https://www.govietstay.com/pi-network-vietnam?merchant_demo=spa',30,true,true,
       '{"sandbox":true,"seed":"partner-platform-v1"}'::jsonb
from public.merchants m where m.merchant_code='DEMO_SPA'
on conflict (merchant_id,offer_code) do nothing;
