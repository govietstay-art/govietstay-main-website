# GoVietStay existing Admin: security and permissions release plan (2026-09-16)

## Scope and factual baseline (read-only live inspection)
- `/admin` currently uses `AdminV5`: Owner/Admin have the full dashboard, bookings, Finance, Partners, SEO and payroll menus. Sales and Desk cannot open that page; Sales has a separate code/PIN flow. A cosmetic menu hide is **not** data security.
- Live staff: one active auth-linked Owner, three Sales without auth links, one Desk without auth link; no designated Finance login yet. The `staff_profiles.role` CHECK does **not** include `finance`. Prefer an explicit Owner-approved Finance entitlement on an authenticated staff record, instead of changing existing roles or PINs.
- Supabase security advisor flags four public tables with RLS off (`marketing_channels`, `partner_salary_tiers`, `partner_commission_matrix`, `partner_terms_versions`) and four SECURITY DEFINER views (`admin_traffic_source_daily`, `admin_traffic_source_summary`, `admin_marketing_funnel`, `supplier_payables_v`). The live GRANT check showed anon/authenticated direct access to these objects. `staff_profiles` also has a self-SELECT policy and holds PIN hashes/payroll information. Several SECURITY DEFINER functions are anonymously executable; some are deliberately token-gated partner functions, and should NOT be blanket-revoked.
- Database backup/restore **not verified**. No new Supabase project or branch may be created if it incurs cost.

## Permission contract — must be enforced in SQL/RLS/RPC, not just in React
| Capability | Owner | Operations (Desk / explicitly authorized Ops) | Sales | Designated Finance | Legacy Partner |
|---|---|---|---|---|---|
| Existing `/admin` full console | Yes | Only after verified role-specific UI + RLS | Only their existing portal until tested | Only role-specific Finance UI after onboarding | No |
| Booking operations | All | All company bookings, authorized edits, not payment settlement | Own assigned bookings/intake | Read only as needed for reconciliation | Own existing link/token scope |
| Booking count and PAX summary | All | All | All, aggregate ONLY after PIN session validation | All, aggregate only | No company overview |
| Guest contact and CRM | All | Booking details for fulfillment, not unrestricted historic CRM | Assigned guest records only | Minimum for reconciliation | Own booking details only |
| Revenue, cost, P&L, payroll, settlement | All | No unless Owner separately grants Finance | No unless Owner separately grants Finance | Yes, explicitly assigned auth-linked active staff | Only their own contracted commissions via existing token RPC |
| Grant/revoke Finance | Owner only, audited | No | No | No | No |

**Current limitation:** Owner/Admin still have legacy Finance access through `is_govietstay_admin()` in existing RPCs and RLS. The draft entitlement helper alone does **not** remove that access. Do not present this as completed Finance isolation. Finance cutover needs a complete inventory of direct finance tables, views, RPCs, and approval/settlement paths, then a coordinated SQL and UI migration.

## Staged technical work
- `supabase/staged/20260916_legacy_access_hardening_REVIEW_ONLY.sql` implements explicit RLS for four tables, anonymous active reference metadata, owner/admin access to compensation configuration, and revokes raw admin view grants. It adds **new** owner-controlled `staff_finance_access`, an audit table, `gvs_can_view_finance()` and `gvs_set_finance_access()`; **does not** modify any old Finance RPC, booking, partner token, or staff login.
- `.github/workflows/legacy-access-isolated-checks.yml` runs PostgreSQL 17 with fabricated accounts/data and checks anonymous restrictions, existing admin visibility, owner-only grant, revoke and audit. This is a schema-contract test, not a real partner/finance end-to-end test.
- Rollback requires restoring previous grants and RLS policies / verifying dependent RPCs. SQL is deliberately under `supabase/staged/` rather than `supabase/migrations/` so no pipeline accidentally treats it as production-ready.

## Non-negotiable release gates (all open until independently verified)
1. Obtain and **restore-test** a backup of the current live Supabase Free database in a zero-cost isolated Postgres environment; verify sample counts and schema, without exporting secrets into a public repository. Do not claim a platform backup exists without verifying it.
2. Replay the migration on a faithful copy of live schema and run direct HTTP/PostgREST auth tests as anon, unrelated authenticated user, Owner, Desk/Ops, Sales and partner token. Test actual legacy QR, dashboard, terms acceptance, catalog, booking creation and discounts. Ensure existing partner credentials and QR never rotate.
3. Validate Finance boundaries for ALL direct table reads/writes and SECURITY DEFINER RPCs, including booking payment updates, supplier costs, monthly P&L, payroll, settlement and approval. A Finance-only menu is insufficient.
4. Verify Sales and Desk onboarding without changing their existing code/PIN workflow; use role-specific authenticated identity for real Ops and Finance. Require owner approval of each Finance designation; test immediate revocation, logout/session expiration and disabled staff.
5. Release backend guards first, retest real workflows with test accounts and reversible steps, then expose UI in legacy `/admin` only. Keep Booking Master, Operations, Payments, Finance, Partners and SEO intact. Confirm baseline booking/contact/partner counts after release. Stop/rollback if test fails.

Status: design and isolated testing only. **NO security migration applied to production.** Logo is tracked separately in PR #6 and is safe to release without changing the DB.
