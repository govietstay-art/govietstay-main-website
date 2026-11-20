-- GoVietStay Hotel Partner Portal: REVIEW-ONLY schema draft (NOT applied to Supabase)
-- This file deliberately does NOT seed confidential prices or grant access to the public roles.
-- All hotel tables have RLS enabled and NO allow policies until the API and tenancy tests are ready.
-- Pilot: KS01..KS06; future: many businesses with completely isolated commercial contracts.

create table if not exists public.hotel_tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 1),
  kind text not null check (kind in ('travel_agency','hotel_supplier')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.hotel_tenant_members (
  tenant_id uuid not null references public.hotel_tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','manager','editor','viewer')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create table if not exists public.hotel_properties (
  id uuid primary key default gen_random_uuid(),
  supplier_tenant_id uuid not null references public.hotel_tenants(id),
  pilot_code text unique,
  name text not null,
  address text,
  area text,
  google_maps_url text,
  description text,
  stars smallint check (stars between 1 and 5),
  checkin_time time,
  checkout_time time,
  published_version integer not null default 0 check (published_version >= 0),
  status text not null default 'draft' check (status in ('draft','published','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hotel_room_types (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  pilot_code text unique,
  name text not null,
  size_sqm numeric(7,2) check (size_sqm > 0),
  bed_details text,
  max_adults smallint check (max_adults >= 0),
  max_children smallint check (max_children >= 0),
  view_details text,
  breakfast_included boolean,
  amenities jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  published_version integer not null default 0 check (published_version >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.hotel_media (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  room_id uuid references public.hotel_room_types(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  verified boolean not null default false,
  submitted_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
-- Application constraint: room_id must belong to property_id, checked on server before write.
-- Storage bucket MUST be private; signed URLs only after authorization; never use public Google Drive image URLs.

create table if not exists public.hotel_agency_listings (
  id uuid primary key default gen_random_uuid(),
  agency_tenant_id uuid not null references public.hotel_tenants(id),
  property_id uuid not null references public.hotel_properties(id),
  status text not null default 'review' check (status in ('review','active','suspended')),
  created_at timestamptz not null default now(),
  unique (agency_tenant_id, property_id)
);

create table if not exists public.hotel_net_contracts (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.hotel_agency_listings(id) on delete cascade,
  currency text not null default 'VND' check (currency='VND'),
  model text not null check (model in ('direct_net','discount_from_supplier_rate')),
  discount_percent numeric(5,2) not null default 0 check (discount_percent >= 0 and discount_percent <= 100),
  valid_from date,
  valid_until date,
  notes text,
  active boolean not null default false,
  check (valid_until is null or valid_from is null or valid_until >= valid_from)
);

create table if not exists public.hotel_net_rate_periods (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.hotel_net_contracts(id) on delete cascade,
  room_id uuid not null references public.hotel_room_types(id) on delete cascade,
  start_date date,
  end_date date,
  supplier_rate_vnd bigint not null check (supplier_rate_vnd >= 0),
  pricing_model text not null check (pricing_model in ('direct_net','discount_from_supplier_rate')),
  discount_percent numeric(5,2) not null default 0 check (discount_percent >= 0 and discount_percent <= 100),
  net_rate_vnd bigint generated always as (
    case when pricing_model='discount_from_supplier_rate'
      then round(supplier_rate_vnd * (1 - discount_percent / 100.0))::bigint
      else supplier_rate_vnd end
  ) stored,
  applicability jsonb not null default '{}'::jsonb,
  verification_status text not null default 'pending' check (verification_status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);
-- Contracts are agency-specific (future SaaS isolation). Rate periods preserve discounts as snapshots.
-- Naraco KS06: discount_percent = 10 for its five test rates; other hotels use actual NET terms.
-- Do not auto-publish incomplete/ambiguous seasons or overlapping rate periods.

create table if not exists public.hotel_change_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.hotel_properties(id) on delete cascade,
  submitted_by uuid not null references auth.users(id),
  request_type text not null check (request_type in ('property','room','photo','rate','policy')),
  proposed_data jsonb not null,
  base_version integer not null check (base_version >= 0),
  status text not null default 'draft' check (status in ('draft','submitted','approved','rejected','withdrawn')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  review_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.hotel_audit_events (
  id bigint generated always as identity primary key,
  property_id uuid references public.hotel_properties(id),
  actor_user_id uuid references auth.users(id),
  action text not null,
  record_type text not null,
  record_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists hotel_room_types_property_idx on public.hotel_room_types(property_id);
create index if not exists hotel_media_property_idx on public.hotel_media(property_id, room_id);
create index if not exists hotel_properties_supplier_idx on public.hotel_properties(supplier_tenant_id);
create index if not exists hotel_members_user_idx on public.hotel_tenant_members(user_id);
create index if not exists hotel_listings_agency_idx on public.hotel_agency_listings(agency_tenant_id);
create index if not exists hotel_rates_contract_idx on public.hotel_net_rate_periods(contract_id, room_id);
create index if not exists hotel_change_queue_idx on public.hotel_change_requests(property_id, status, created_at);

alter table public.hotel_tenants enable row level security;
alter table public.hotel_tenant_members enable row level security;
alter table public.hotel_properties enable row level security;
alter table public.hotel_room_types enable row level security;
alter table public.hotel_media enable row level security;
alter table public.hotel_agency_listings enable row level security;
alter table public.hotel_net_contracts enable row level security;
alter table public.hotel_net_rate_periods enable row level security;
alter table public.hotel_change_requests enable row level security;
alter table public.hotel_audit_events enable row level security;

-- Security gate before any production migration:
-- 1. Design and TEST agency/supplier membership RLS, using separate users for company A/B.
-- 2. All edits to published data MUST enter hotel_change_requests; only reviewed data can be published.
-- 3. Test rate-period overlap and cross-property room/contract consistency constraints.
-- 4. Add private Supabase Storage bucket, signed images and file validations.
-- 5. Complete backup/rollback, import validation and non-production acceptance tests.
