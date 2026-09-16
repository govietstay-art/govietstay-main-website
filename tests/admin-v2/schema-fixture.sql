-- Synthetic schema ONLY for disposable GitHub Actions PostgreSQL.
-- Deliberately contains NO production credentials, customer data or partner tokens.
create role anon nologin;
create role authenticated nologin;
create schema auth;
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

create table public.staff_profiles (
  id uuid primary key,
  auth_user_id uuid,
  display_name text not null,
  role text not null,
  active boolean not null default true,
  allow_booking_portal boolean not null default false
);
create table public.contacts (
  id uuid primary key,
  full_name text,
  whatsapp text,
  phone text,
  email text,
  country text,
  preferred_language text,
  notes text
);
create table public.tours (id uuid primary key, name text not null);
create table public.bookings (
  id uuid primary key,
  booking_code text,
  contact_id uuid references public.contacts(id),
  tour_id uuid references public.tours(id),
  staff_id uuid references public.staff_profiles(id),
  tour_date date,
  status text not null,
  adults integer not null default 1,
  children integer not null default 0,
  pax integer,
  custom_tour_name text
);
create table public.staff_sales_sessions (
  token uuid primary key,
  staff_id uuid not null references public.staff_profiles(id),
  expires_at timestamptz not null,
  revoked boolean not null default false
);

insert into public.staff_profiles(id,auth_user_id,display_name,role,active,allow_booking_portal) values
 ('00000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','Synthetic Owner','owner',true,false),
 ('00000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002','Synthetic Sales','sales',true,true),
 ('00000000-0000-4000-8000-000000000003','10000000-0000-4000-8000-000000000003','Synthetic Unassigned Sales','sales',true,true),
 ('00000000-0000-4000-8000-000000000004','10000000-0000-4000-8000-000000000004','Synthetic Desk','desk',true,false),
 ('00000000-0000-4000-8000-000000000005','10000000-0000-4000-8000-000000000005','Inactive','sales',false,true);
insert into public.contacts(id,full_name,whatsapp,phone,preferred_language) values
 ('20000000-0000-4000-8000-000000000001','Synthetic Guest A','84000000001','84000000001','ru'),
 ('20000000-0000-4000-8000-000000000002','Synthetic Guest B','84000000002','84000000002','en');
insert into public.tours(id,name) values ('50000000-0000-4000-8000-000000000001','Synthetic Tour');
insert into public.bookings(id,booking_code,contact_id,tour_id,staff_id,tour_date,status,adults,children,pax) values
 ('30000000-0000-4000-8000-000000000001','TEST-001','20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002',current_date - interval '1 year','completed',2,0,2),
 ('30000000-0000-4000-8000-000000000002','TEST-002','20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000003',current_date,'cancelled',1,0,1),
 ('30000000-0000-4000-8000-000000000003','TEST-003','20000000-0000-4000-8000-000000000002','50000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000003',current_date,'pending',3,0,3);
insert into public.staff_sales_sessions(token,staff_id,expires_at,revoked) values
 ('40000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002',now() + interval '12 hours',false),
 ('40000000-0000-4000-8000-000000000002','00000000-0000-4000-8000-000000000002',now() + interval '12 hours',true),
 ('40000000-0000-4000-8000-000000000003','00000000-0000-4000-8000-000000000002',now() - interval '1 hour',false);
