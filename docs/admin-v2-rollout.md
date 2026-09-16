# GoVietStay Admin V2 — staged upgrade (2026-09-16)

**Status:** Draft feature branch only. No production migration, no merge, no partner token rotation, no change to the existing `/admin` page or its business operations. The new route `/admin/v2` requires this branch and its CRM migration to be deployed together *after* verification.

## Immutable compatibility contract

- Do not delete or alter existing bookings, contacts, leads, payments, payroll, suppliers, finance, marketing/SEO/tracking, tours, partner attribution or custom-tour capabilities.
- Existing partners: retain `id`, `ref_code`, `dashboard_token`, URL and QR; do not require new login, expire or revoke tokens, change commission or delete historical records. Existing partner RPCs and portal stay functional.
- Partner authentication redesign applies **only to partners created after its future activation**, never to historical partner records. The present branch intentionally does not change partner creation or authentication: new-only authentication is a later, separately tested phase.
- Keep `/admin`, `/admin/operations`, `/admin/payments`, existing navigation and styling unchanged. `/admin/v2` is a separate, non-indexed opt-in preview. Existing menu integration waits until the preview and database have passed acceptance tests.
- Never assume duplicated phone numbers identify the same human; no automatic merging of contacts.
- No automatic WhatsApp marketing or anniversary messages. Record verifiable opt-in first; immediately honour opt-out.

## Existing production findings (read-only database review)

- Existing `contacts`/`bookings`/`leads`/`staff_profiles` relationships are reusable; sample inventory during review: 16 contacts, 6 bookings, 22 partners and 5 staff profiles. Counts can change.
- Three phone-number collision groups require human review; no dedupe migration is included.
- Most Sales/Desk profiles do not yet have a linked Supabase Auth user; onboarding must be tested before promising they can open `/admin/v2`.
- Existing Admin limits full `/admin` to Owner/Admin, and old staff sales RPC has separate authentication concerns. This branch does **not** change either existing access path.
- Security advisors flagged four public tables without RLS; other old RPC/view grants require a separate dependency/authorization audit. The present additive migration does **not** claim to resolve these existing warnings.

## Access design

| Area | Owner | Admin | Operations | Sales | Designated Finance | Other active employee | Partner |
|---|---|---|---|---|---|---|---|
| Company overview, aggregate booking/PAX only | Yes | Yes | Yes | Yes | Yes | Yes | No |
| All booking details for dispatch | Yes | Yes | Yes | Own via existing Sales route | Only what accounting requires | No | Own via legacy partner portal |
| Customer CRM contact/history | Yes | Yes | No full CRM | Assigned bookings/customers | No full CRM | No | No |
| Finance ledger/payment verification | Yes | By future delegated authorization only | No | No | Yes, if assigned | No | No |
| Change permissions | Yes | Limited future delegation | No | No | No | No | No |

The current branch implements **new company overview + CRM RPC authorization only**; the legacy route's RBAC and Finance role designation remain work items. Never equate hiding a tab with server authorization.

## New implementation in this branch

- `company_booking_overview(from,to)`: authenticated active internal staff only, totals/daily buckets by **tour departure date**, no customer data, money or employee identifiers. Today/this week/this month use Asia/Ho_Chi_Minh calendar boundaries; cancelled bookings are counted separately and excluded from PAX.
- `crm_customer_directory` and `crm_customer_history`: reuse `contacts` and linked `bookings`; Owner/Admin all, Sales assigned customers only. No price/cost/profit in responses.
- `crm_contact_preferences`: consent defaults to **false**, explicit source and evidence required for opt-in, opt-out supported. No direct public/anon/authenticated table grants; scoped SECURITY DEFINER RPCs verify `auth.uid()`/active `staff_profiles`.
- `crm_anniversary_queue`: completed/closed bookings only, **one year after tour date** as available end-date proxy; consent required, never returns items already handled. Manual WhatsApp/open and outcomes via `crm_record_followup`. Future itinerary end-date handling can refine scheduling without changing existing booking data.
- `/admin/v2`: mobile-responsive navigation, aggregate KPI and daily table, searchable CRM/profile/history, opt-in/out form, manual anniversary tasks, shortcuts to existing applications. This is **not yet connected to production**.

## Required pre-production verification; do NOT deploy until signed off

1. Take verified database backup and reference exact production Git SHA/deployment. Confirm Vercel points to the expected repository/branch; never assume GitHub main equals current production.
2. Test SQL migration on an isolated database seeded with anonymized structural examples. Supabase branch creation may incur costs; request explicit cost confirmation before creating it.
3. Confirm the six functions compile and all argument signatures match frontend RPC calls. Run `npm run build` and TypeScript lint; review Next 16.2.9 version-specific local docs.
4. Authorization tests with **anon, unlinked authenticated user, inactive staff, Owner, Admin, Desk/Operations, assigned Sales, unassigned Sales, Finance, Partner**. Check no accidental customer PII or financial response in company RPC; no cross-customer CRM/consent updates.
5. Legacy regression: direct booking, custom tour, changes to PAX, deposit/payment ledger, Finance/P&L, staff PIN/request flow, operations dispatch, partner QR/ref links and tracking, partner booking/history, Pi/merchant offers, SEO/Yandex pages, webhook payments. Snapshot old partner `id`/`ref_code`/`dashboard_token` and verify **exact matches** after staging; never export token values to reports/logs.
6. Consent tests: absent preferences => no follow-up; opt-in requires source/evidence; opt-out removes from queue; cancelled/uncompleted bookings excluded; leap-date and date-boundary tests; no automatic messages.
7. Record actual build/authorization/regression results and get a distinct production release approval. Roll out behind the separate `/admin/v2` route, then progressively add a link to legacy navigation only after acceptance.

## Separate planned phases, not implemented by this PR

- New-partner-only verified sign-in: onboarding flag default for *new* partner records at cutover, server-enforced signed sessions for new partner RPCs without accepting legacy token alone. Old records remain on legacy path. Design and test provider and exception handling first.
- Implement designated Finance identity and granular accounting permissions without assigning Finance unrestricted Admin access. Audit old views/RPCs and remove excessive grants one-by-one with safe replacements and integration tests.
- Secure the four RLS-disabled legacy tables, existing SECURITY DEFINER views and the unauthenticated staff sales booking request after mapping callers. Preserve public tracking/booking actions via narrowly scoped safe APIs instead of blanket revokes.
- Integrate V2 navigation into the existing UI after regression tests; add pagination, follow-up scheduling based on actual tour end date, data export safeguards, audit logs and documented data-retention workflows.

**Release gate:** The owner's instruction to begin implementation authorizes work on this isolated branch, not an untested change to production. No automated merge or production deploy.
