-- GoVietStay Hotel Partner V3 - isolated non-destructive schema.
-- All existing booking/admin tables remain unchanged. Private data is never exposed to anon.
create table if not exists public.hotel_partner_orgs(
  id uuid primary key default gen_random_uuid(),
  name text not null check(length(btrim(name)) between 2 and 200),
  kind text not null default 'hotel_supplier' check(kind in ('hotel_supplier','travel_agency')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.hotel_partner_members(
  org_id uuid not null references public.hotel_partner_orgs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check(role in ('owner','manager','editor','viewer')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key(org_id,user_id)
);
create table if not exists public.hotel_properties(
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.hotel_partner_orgs(id),
  pilot_code text unique,
  name text not null check(length(btrim(name)) between 2 and 200),
  address text,
  city text,
  description text,
  maps_url text,
  entrance_notes text,
  stars smallint check(stars between 1 and 5),
  checkin_time time,
  checkout_time time,
  amenities text[] not null default '{}'::text[],
  status text not null default 'draft' check(status in ('draft','published','suspended')),
  version integer not null default 0 check(version >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.hotel_room_types(
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  pilot_code text unique,
  name text not null check(length(btrim(name)) between 2 and 180),
  template text not null default 'custom',
  area_sqm numeric(7,2) check(area_sqm > 0 and area_sqm <= 2000),
  bed_details text,
  max_adults smallint check(max_adults between 1 and 30),
  max_children smallint check(max_children between 0 and 30),
  view_details text,
  breakfast_included boolean,
  extra_bed text,
  amenities text[] not null default '{}'::text[],
  notes text,
  status text not null default 'draft' check(status in ('draft','published','suspended')),
  version integer not null default 0 check(version >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.hotel_media(
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  room_id uuid references public.hotel_room_types(id) on delete cascade,
  storage_path text not null unique,
  alt_text text,
  is_cover boolean not null default false,
  sort_order smallint not null default 0,
  status text not null default 'approved' check(status in ('pending','approved')),
  created_at timestamptz not null default now()
);
create unique index if not exists hotel_main_cover_one on public.hotel_media(property_id) where(room_id is null and is_cover and status='approved');
create table if not exists public.hotel_net_rates(
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  room_id uuid not null references public.hotel_room_types(id) on delete cascade,
  valid_from date not null,
  valid_until date not null,
  supplier_price_vnd bigint not null check(supplier_price_vnd > 0 and supplier_price_vnd < 1000000000),
  discount_percent numeric(5,2) not null default 0 check(discount_percent between 0 and 100),
  net_price_vnd bigint generated always as (round(supplier_price_vnd*(1-discount_percent/100))::bigint) stored,
  includes_breakfast boolean,
  includes_tax boolean,
  conditions text,
  created_at timestamptz not null default now(),
  check(valid_until >= valid_from)
);
create table if not exists public.hotel_change_requests(
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  kind text not null check(kind in ('property','room','rate','photo')),
  target_id uuid,
  payload jsonb not null check(jsonb_typeof(payload)='object' and pg_column_size(payload)<30000),
  status text not null default 'draft' check(status in ('draft','submitted','approved','rejected')),
  review_note text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hotel_review_status_consistency check (
    (status in ('draft','submitted') and reviewed_by is null and reviewed_at is null)
    or (status in ('approved','rejected') and reviewed_by is not null and reviewed_at is not null)
  )
);
create table if not exists public.hotel_audit_events(
  id bigint generated always as identity primary key,
  property_id uuid not null references public.hotel_properties(id),
  request_id uuid references public.hotel_change_requests(id),
  actor_id uuid references auth.users(id),
  action text not null,
  created_at timestamptz not null default now()
);
create index if not exists hotel_members_user on public.hotel_partner_members(user_id);
create index if not exists hotel_properties_org on public.hotel_properties(org_id);
create index if not exists hotel_rooms_property on public.hotel_room_types(property_id);
create index if not exists hotel_photos_property on public.hotel_media(property_id,room_id);
create index if not exists hotel_net_property on public.hotel_net_rates(property_id,room_id,valid_from);
create index if not exists hotel_requests_queue on public.hotel_change_requests(status,created_at);
create index if not exists hotel_requests_property on public.hotel_change_requests(property_id,created_by);

-- Security-definer member helpers prevent recursive RLS and use the current authenticated UID.
create or replace function public.hotel_partner_can_access(p_org uuid)
returns boolean language sql stable security definer
set search_path=public,auth,pg_catalog as $$
  select public.is_govietstay_admin() or exists(
    select 1 from public.hotel_partner_members m
    join public.hotel_partner_orgs o on o.id=m.org_id
    where m.org_id=p_org and m.user_id=auth.uid() and m.active and o.active
  );
$$;
create or replace function public.hotel_partner_can_edit(p_org uuid)
returns boolean language sql stable security definer
set search_path=public,auth,pg_catalog as $$
  select public.is_govietstay_admin() or exists(
    select 1 from public.hotel_partner_members m
    join public.hotel_partner_orgs o on o.id=m.org_id
    where m.org_id=p_org and m.user_id=auth.uid()
      and m.active and o.active and m.role in ('owner','manager','editor')
  );
$$;
revoke all on function public.hotel_partner_can_access(uuid) from public,anon;
revoke all on function public.hotel_partner_can_edit(uuid) from public,anon;
grant execute on function public.hotel_partner_can_access(uuid),public.hotel_partner_can_edit(uuid) to authenticated;

alter table public.hotel_partner_orgs enable row level security;
alter table public.hotel_partner_members enable row level security;
alter table public.hotel_properties enable row level security;
alter table public.hotel_room_types enable row level security;
alter table public.hotel_media enable row level security;
alter table public.hotel_net_rates enable row level security;
alter table public.hotel_change_requests enable row level security;
alter table public.hotel_audit_events enable row level security;

create policy hotel_admin_org on public.hotel_partner_orgs for all to authenticated
 using (public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_member_org_read on public.hotel_partner_orgs for select to authenticated
 using (public.hotel_partner_can_access(id));
create policy hotel_admin_members on public.hotel_partner_members for all to authenticated
 using (public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_member_self_read on public.hotel_partner_members for select to authenticated
 using(user_id=auth.uid());
create policy hotel_admin_properties on public.hotel_properties for all to authenticated
 using(public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_member_properties_read on public.hotel_properties for select to authenticated
 using(public.hotel_partner_can_access(org_id));
create policy hotel_admin_rooms on public.hotel_room_types for all to authenticated
 using(public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_member_rooms_read on public.hotel_room_types for select to authenticated
 using(exists(select 1 from public.hotel_properties p where p.id=property_id and public.hotel_partner_can_access(p.org_id)));
create policy hotel_admin_media on public.hotel_media for all to authenticated
 using(public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_member_media_read on public.hotel_media for select to authenticated
 using(exists(select 1 from public.hotel_properties p where p.id=property_id and public.hotel_partner_can_access(p.org_id)));
-- NET is never selectable by a hotel partner or anonymous user.
create policy hotel_admin_rates on public.hotel_net_rates for all to authenticated
 using(public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_admin_changes on public.hotel_change_requests for all to authenticated
 using(public.is_govietstay_admin()) with check(public.is_govietstay_admin());
create policy hotel_partner_changes_read on public.hotel_change_requests for select to authenticated
 using(exists(select 1 from public.hotel_properties p where p.id=property_id and public.hotel_partner_can_access(p.org_id)));
create policy hotel_partner_changes_create on public.hotel_change_requests for insert to authenticated
 with check(status in ('draft','submitted') and created_by=auth.uid() and exists(
   select 1 from public.hotel_properties p where p.id=property_id and public.hotel_partner_can_edit(p.org_id)
 ));
create policy hotel_partner_changes_edit_draft on public.hotel_change_requests for update to authenticated
 using(status='draft' and created_by=auth.uid() and exists(
  select 1 from public.hotel_properties p where p.id=property_id and public.hotel_partner_can_edit(p.org_id)
 )) with check(status in ('draft','submitted') and created_by=auth.uid() and exists(
  select 1 from public.hotel_properties p where p.id=property_id and public.hotel_partner_can_edit(p.org_id)
 ));
create policy hotel_admin_audit on public.hotel_audit_events for all to authenticated
 using(public.is_govietstay_admin()) with check(public.is_govietstay_admin());

-- Consistent row limits under a property lock, including concurrent uploads.
create or replace function public.hotel_media_validate() returns trigger
language plpgsql security definer set search_path=public,pg_catalog as $$
declare v_count integer;
begin
  perform 1 from public.hotel_properties p where p.id=new.property_id for update;
  if new.room_id is not null then
    if not exists(select 1 from public.hotel_room_types r where r.id=new.room_id and r.property_id=new.property_id)
    then raise exception 'Room does not belong to selected hotel'; end if;
    select count(*) into v_count from public.hotel_media where room_id=new.room_id and id is distinct from new.id;
    if v_count>=1 then raise exception 'One representative photo per room'; end if;
  else
    select count(*) into v_count from public.hotel_media where property_id=new.property_id and room_id is null and id is distinct from new.id;
    if v_count>=6 then raise exception 'Maximum six hotel photos'; end if;
  end if;
  return new;
end; $$;
create trigger hotel_media_limit before insert or update of property_id,room_id on public.hotel_media
for each row execute function public.hotel_media_validate();

-- Hotel partner photos live in private Storage, never in public URL.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('hotel-partner-private','hotel-partner-private',false,2097152,array['image/webp'])
on conflict(id) do nothing;
create policy hotel_storage_read on storage.objects for select to authenticated
using(bucket_id='hotel-partner-private' and exists(
  select 1 from public.hotel_properties p
  where p.id::text=split_part(name,'/',2)
    and p.org_id::text=split_part(name,'/',1)
    and public.hotel_partner_can_access(p.org_id)
));
create or replace function public.hotel_storage_within_quota(p_name text)
returns boolean language sql stable security definer set search_path=storage,pg_catalog as $hotel$
  select (select count(*) from storage.objects o where o.bucket_id='hotel-partner-private'
    and o.name like split_part(p_name,'/',1)||'/'||split_part(p_name,'/',2)||'/%') < 24;
$hotel$;
revoke all on function public.hotel_storage_within_quota(text) from public,anon;
grant execute on function public.hotel_storage_within_quota(text) to authenticated;
create policy hotel_storage_upload on storage.objects for insert to authenticated
with check(bucket_id='hotel-partner-private' and name like '%.webp'
  and public.hotel_storage_within_quota(name) and exists(
  select 1 from public.hotel_properties p
  where p.id::text=split_part(name,'/',2)
    and p.org_id::text=split_part(name,'/',1)
    and public.hotel_partner_can_edit(p.org_id)
));
create policy hotel_storage_admin_delete on storage.objects for delete to authenticated
using(bucket_id='hotel-partner-private' and public.is_govietstay_admin());
-- No UPDATE storage policy; replacements use a new key, ensuring approval/history.

-- Server-side review is atomic and allowlists changes. The partner never writes published rows.
create or replace function public.hotel_review_request(p_request_id uuid,p_decision text,p_note text default null)
returns uuid language plpgsql security definer set search_path=public,auth,storage,pg_catalog as $$
declare r public.hotel_change_requests%rowtype;
  v public.hotel_properties%rowtype;
  j jsonb;
  v_room uuid;
  v_path text;
  v_arr text[];
begin
  if auth.uid() is null or not public.is_govietstay_admin() then raise exception 'Administrator required'; end if;
  if p_decision not in ('approved','rejected') then raise exception 'Invalid decision'; end if;
  select * into r from public.hotel_change_requests where id=p_request_id and status='submitted' for update;
  if not found then raise exception 'Request not found or no longer submitted'; end if;
  select * into v from public.hotel_properties where id=r.property_id for update;
  if not found then raise exception 'Hotel missing'; end if;
  j:=r.payload;
  if p_decision='approved' then
    if r.kind='property' then
      update public.hotel_properties set
        name=coalesce(nullif(btrim(j->>'name'),''),name),
        address=coalesce(j->>'address',address),
        city=coalesce(j->>'city',city),
        description=coalesce(j->>'description',description),
        maps_url=coalesce(j->>'maps_url',maps_url),
        entrance_notes=coalesce(j->>'entrance_notes',entrance_notes),
        stars=case when j ? 'stars' then nullif(j->>'stars','')::smallint else stars end,
        amenities=case when jsonb_typeof(j->'amenities')='array'
          then array(select jsonb_array_elements_text(j->'amenities')) else amenities end,
        status='published',version=version+1,updated_at=now()
      where id=r.property_id;
    elsif r.kind='room' then
      v_arr:=case when jsonb_typeof(j->'amenities')='array'
        then array(select jsonb_array_elements_text(j->'amenities')) else '{}'::text[] end;
      if r.target_id is null then
        insert into public.hotel_room_types(property_id,name,template,area_sqm,bed_details,max_adults,max_children,view_details,breakfast_included,extra_bed,amenities,notes,status)
        values(r.property_id,btrim(j->>'name'),coalesce(j->>'template','custom'),nullif(j->>'area_sqm','')::numeric,
         j->>'bed_details',nullif(j->>'max_adults','')::smallint,nullif(j->>'max_children','')::smallint,
         j->>'view_details',nullif(j->>'breakfast_included','')::boolean,j->>'extra_bed',v_arr,j->>'notes','published');
      else
        update public.hotel_room_types set
          name=coalesce(nullif(btrim(j->>'name'),''),name),
          template=coalesce(j->>'template',template),
          area_sqm=case when j ? 'area_sqm' then nullif(j->>'area_sqm','')::numeric else area_sqm end,
          bed_details=coalesce(j->>'bed_details',bed_details),
          max_adults=case when j ? 'max_adults' then nullif(j->>'max_adults','')::smallint else max_adults end,
          max_children=case when j ? 'max_children' then nullif(j->>'max_children','')::smallint else max_children end,
          view_details=coalesce(j->>'view_details',view_details),
          breakfast_included=case when j ? 'breakfast_included' then nullif(j->>'breakfast_included','')::boolean else breakfast_included end,
          extra_bed=coalesce(j->>'extra_bed',extra_bed),
          amenities=case when j ? 'amenities' then v_arr else amenities end,
          notes=coalesce(j->>'notes',notes),status='published',version=version+1,updated_at=now()
        where id=r.target_id and property_id=r.property_id;
        if not found then raise exception 'Room mismatch'; end if;
      end if;
    elsif r.kind='rate' then
      v_room=(j->>'room_id')::uuid;
      if not exists(select 1 from public.hotel_room_types where id=v_room and property_id=r.property_id)
        then raise exception 'Room mismatch'; end if;
      perform 1 from public.hotel_room_types where id=v_room for update;
      if exists(select 1 from public.hotel_net_rates n where n.room_id=v_room
        and n.valid_from <= (j->>'valid_until')::date
        and n.valid_until >= (j->>'valid_from')::date)
      then raise exception 'Rate dates overlap existing period'; end if;
      insert into public.hotel_net_rates(property_id,room_id,valid_from,valid_until,supplier_price_vnd,discount_percent,includes_breakfast,includes_tax,conditions)
      values(r.property_id,v_room,(j->>'valid_from')::date,(j->>'valid_until')::date,
        (j->>'supplier_price_vnd')::bigint,coalesce((j->>'discount_percent')::numeric,0),
        nullif(j->>'includes_breakfast','')::boolean,nullif(j->>'includes_tax','')::boolean,j->>'conditions');
    elsif r.kind='photo' then
      v_path=j->>'storage_path';
      if v_path is null or v_path not like (v.org_id::text||'/'||v.id::text||'/%.webp')
        then raise exception 'Invalid photo location'; end if;
      if not exists(select 1 from storage.objects o where o.bucket_id='hotel-partner-private' and o.name=v_path)
        then raise exception 'Photo has not been uploaded'; end if;
      v_room=nullif(j->>'room_id','')::uuid;
      insert into public.hotel_media(property_id,room_id,storage_path,alt_text,is_cover,sort_order)
        values(r.property_id,v_room,v_path,j->>'alt_text',coalesce((j->>'is_cover')::boolean,false),
          coalesce((j->>'sort_order')::smallint,0));
    else
      raise exception 'Unsupported request type';
    end if;
  end if;
  update public.hotel_change_requests set status=p_decision,review_note=p_note,
    reviewed_by=auth.uid(),reviewed_at=now(),updated_at=now() where id=r.id;
  insert into public.hotel_audit_events(property_id,request_id,actor_id,action)
    values(r.property_id,r.id,auth.uid(),p_decision);
  return r.id;
end; $$;
revoke all on function public.hotel_review_request(uuid,text,text) from public,anon;
grant execute on function public.hotel_review_request(uuid,text,text) to authenticated;

-- Admin links an EXISTING Auth user after that user signs up; no passwords or service key in browser.
create or replace function public.hotel_admin_link_partner(p_org uuid,p_email text,p_role text default 'editor')
returns uuid language plpgsql security definer set search_path=public,auth,pg_catalog as $$
declare v_user uuid;
begin
  if auth.uid() is null or not public.is_govietstay_admin() then raise exception 'Administrator required'; end if;
  if p_role not in ('owner','manager','editor','viewer') then raise exception 'Invalid role'; end if;
  if not exists(select 1 from public.hotel_partner_orgs where id=p_org) then raise exception 'Organization missing'; end if;
  select id into v_user from auth.users where lower(email)=lower(btrim(p_email)) limit 1;
  if v_user is null then raise exception 'User must register an account before linking'; end if;
  insert into public.hotel_partner_members(org_id,user_id,role) values(p_org,v_user,p_role)
    on conflict(org_id,user_id) do update set role=excluded.role,active=true;
  return v_user;
end; $$;
revoke all on function public.hotel_admin_link_partner(uuid,text,text) from public,anon;
grant execute on function public.hotel_admin_link_partner(uuid,text,text) to authenticated;
