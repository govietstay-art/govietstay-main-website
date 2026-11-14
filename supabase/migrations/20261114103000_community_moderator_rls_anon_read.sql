-- Public posts check moderator membership in an RLS expression.
-- PostgreSQL plans the referenced SELECT even for anonymous readers.
-- Grant SELECT to anon, while moderator-membership RLS intentionally returns
-- zero rows to anon (the only SELECT policy is TO authenticated and owner-scoped).
grant select on public.gvs_community_moderators to anon;
