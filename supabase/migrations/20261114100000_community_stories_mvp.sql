-- GoVietStay Community v1: one-tap stories, questions and moderated discussions.
-- All submissions start pending. Read access is limited to published content,
-- the author's own submissions, and separately granted moderators.

create table if not exists public.gvs_community_moderators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.gvs_community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(btrim(author_name)) between 1 and 60),
  body text not null check (char_length(btrim(body)) between 3 and 10000),
  kind text not null default 'story' check (kind in ('story','question')),
  place text check (place is null or char_length(place) <= 80),
  language text not null default 'en' check (language ~ '^[a-z]{2}(-[A-Za-z]{2})?$'),
  image_path text check (image_path is null or char_length(image_path) <= 350),
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gvs_community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.gvs_community_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(btrim(author_name)) between 1 and 60),
  body text not null check (char_length(btrim(body)) between 2 and 2000),
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.gvs_community_likes (
  post_id uuid not null references public.gvs_community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists gvs_community_posts_public_idx on public.gvs_community_posts(status, created_at desc);
create index if not exists gvs_community_posts_author_idx on public.gvs_community_posts(author_id, created_at desc);
create index if not exists gvs_community_comments_post_idx on public.gvs_community_comments(post_id, created_at);
create index if not exists gvs_community_comments_author_idx on public.gvs_community_comments(author_id, created_at desc);
create index if not exists gvs_community_likes_post_idx on public.gvs_community_likes(post_id);

alter table public.gvs_community_moderators enable row level security;
alter table public.gvs_community_posts enable row level security;
alter table public.gvs_community_comments enable row level security;
alter table public.gvs_community_likes enable row level security;

revoke all on public.gvs_community_moderators from anon, authenticated;
grant select on public.gvs_community_moderators to authenticated;
grant select, insert, update, delete on public.gvs_community_posts to authenticated;
grant select on public.gvs_community_posts to anon;
grant select, insert, update, delete on public.gvs_community_comments to authenticated;
grant select on public.gvs_community_comments to anon;
grant select, insert, delete on public.gvs_community_likes to authenticated;
grant select on public.gvs_community_likes to anon;

create policy "moderators see own membership" on public.gvs_community_moderators
  for select to authenticated using (user_id = (select auth.uid()));

create policy "community posts readable when published, owned or moderated" on public.gvs_community_posts
  for select to anon, authenticated using (
    status = 'published'
    or author_id = (select auth.uid())
    or exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid()))
  );
create policy "authenticated users submit pending community posts" on public.gvs_community_posts
  for insert to authenticated with check (
    author_id = (select auth.uid()) and status = 'pending'
  );
create policy "authors edit pending posts; moderators manage statuses" on public.gvs_community_posts
  for update to authenticated
  using (
    (author_id = (select auth.uid()) and status = 'pending')
    or exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid()))
  )
  with check (
    (author_id = (select auth.uid()) and status = 'pending')
    or exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid()))
  );
create policy "authors or moderators may delete posts" on public.gvs_community_posts
  for delete to authenticated using (
    author_id = (select auth.uid())
    or exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid()))
  );

create policy "community comments readable when public, owned or moderated" on public.gvs_community_comments
  for select to anon, authenticated using (
    (status = 'published' and exists (
      select 1 from public.gvs_community_posts p
      where p.id = post_id and p.status = 'published'
    ))
    or author_id = (select auth.uid())
    or exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid()))
  );
create policy "authenticated users comment on published posts" on public.gvs_community_comments
  for insert to authenticated with check (
    author_id = (select auth.uid()) and status = 'pending'
    and exists (select 1 from public.gvs_community_posts p where p.id = post_id and p.status = 'published')
  );
create policy "moderators update comments" on public.gvs_community_comments
  for update to authenticated
  using (exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid())))
  with check (exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid())));
create policy "comment authors or moderators may delete" on public.gvs_community_comments
  for delete to authenticated using (
    author_id = (select auth.uid())
    or exists (select 1 from public.gvs_community_moderators m where m.user_id = (select auth.uid()))
  );

create policy "community likes visible to everyone" on public.gvs_community_likes
  for select to anon, authenticated using (
    exists (select 1 from public.gvs_community_posts p where p.id = post_id and p.status = 'published')
  );
create policy "users like published posts" on public.gvs_community_likes
  for insert to authenticated with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.gvs_community_posts p where p.id = post_id and p.status = 'published')
  );
create policy "users remove their own likes" on public.gvs_community_likes
  for delete to authenticated using (user_id = (select auth.uid()));

-- Prevent unauthenticated clients from overwhelming the moderation queue.
create schema if not exists gvs_private;
-- Reuse the existing private schema without changing its existing grants.

create or replace function gvs_private.community_rate_limit()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare recent_count bigint;
begin
  -- Ignore client-submitted timestamps so users cannot evade submission limits.
  new.created_at := now();
  if tg_table_name = 'gvs_community_posts' then
    select count(*) into recent_count from public.gvs_community_posts
     where author_id = new.author_id and created_at > now() - interval '10 minutes';
    if recent_count >= 3 then
      raise exception 'Too many posts; please try again later';
    end if;
  elsif tg_table_name = 'gvs_community_comments' then
    select count(*) into recent_count from public.gvs_community_comments
     where author_id = new.author_id and created_at > now() - interval '10 minutes';
    if recent_count >= 12 then
      raise exception 'Too many comments; please try again later';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function gvs_private.community_rate_limit() from public, anon, authenticated;
create trigger gvs_community_post_rate before insert on public.gvs_community_posts
  for each row execute function gvs_private.community_rate_limit();
create trigger gvs_community_comment_rate before insert on public.gvs_community_comments
  for each row execute function gvs_private.community_rate_limit();

-- Editing cannot alter the identity or timestamp used for ordering and rate limits.
create or replace function gvs_private.community_preserve_post_identity()
returns trigger language plpgsql set search_path = ''
as $
begin
  new.author_id := old.author_id;
  new.created_at := old.created_at;
  new.updated_at := now();
  return new;
end;
$;
revoke all on function gvs_private.community_preserve_post_identity() from public, anon, authenticated;
create trigger gvs_community_post_preserve before update on public.gvs_community_posts
  for each row execute function gvs_private.community_preserve_post_identity();

-- Small photo uploads; files are private until a moderator publishes a post.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gvs-community-images', 'gvs-community-images', false, 5242880,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "community media upload within own folder" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'gvs-community-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "community media own or published read" on storage.objects
  for select to anon, authenticated using (
    bucket_id = 'gvs-community-images'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or exists (
        select 1 from public.gvs_community_posts p
        where p.image_path = storage.objects.name and p.status = 'published'
      )
    )
  );
create policy "community media owner delete" on storage.objects
  for delete to authenticated using (
    bucket_id = 'gvs-community-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

comment on table public.gvs_community_posts is 'GoVietStay Stories community; submissions must be moderated before publication.';
