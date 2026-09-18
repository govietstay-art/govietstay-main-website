# GoVietStay existing Admin: security and permissions rollout (2026-09-16)

## Verified current state
- `/admin` is existing AdminV5: Owner and Admin access the full dashboard, bookings, Finance, Partners, payroll and SEO. Sales and Desk cannot enter this full console; Sales uses its existing separate code/PIN portal. Hiding a menu does not protect database records.
- Production has one active auth-linked Owner, three unlinked Sales staff and one unlinked Desk; no designated Finance account yet. The existing role constraint has no `finance` role. Use explicit Owner-granted Finance entitlement for an active, authenticated staff member rather than changing existing roles, codes or PINs.
- Supabase security advisor reports four public tables with RLS disabled (`marketing_channels`, `partner_salary_tiers`, `partner_commission_matrix`, `partner_terms_versions`) and four SECURITY DEFINER views (`admin_traffic_source_daily`, `admin_traffic_source_summary`, `admin_marketing_funnel`, `supplier_payables_v`). Live inspection confirmed anonymous and authenticated direct access. `staff_profiles` self-SELECT exposes a row with sensitive salary/PIN-hash fields. Many SECURITY DEFINER functions are anonymously executable, but some MUST remain token-gated for legacy partners and Sales; do not bulk revoke.
- Verified, restorable production database backup is **not available/confirmed** in this workflow. No paid Supabase branch/project may be created.

## Intended permissions — must be enforced by database/RPC and UI
| Capability | Owner | Operations | Sales | Designated Finance | Existing Partner |
|---|---|---|---|---|---|
| Booking operations | All | Company-wide, permitted operational edits | Assigned bookings / existing portal | Minimal reconciliation read | Own legacy token/link |
| Company booking/PAX overview | All | Aggregate all | Aggregate all after PIN-session authentication | Aggregate all | No |
| CRM/customer data | All | Fulfillment needs only | Assigned customers only | Minimum needed for payment | Own token-scoped bookings only |
| Revenue, P&L, salary, settlement | All | No unless explicitly granted | No unless explicitly granted | Yes, explicitly Owner-designated | Own contractual commission via existing token only |
| Finance grant/revoke | Owner only, audited | No | No | No | No |
| Booking Master, Operations, Payments, Finance, Partners, SEO | Preserve all legacy modules; show and execute only what role is authorized to use. |

**Critical outstanding issue:** all legacy functions gated by `is_govietstay_admin()` still admit Owner **and every Admin**, including Finance RPCs such as `admin_monthly_pl`, `admin_staff_payroll`, `admin_operator_payables` and other payment/settlement calls. Simply adding the new Finance helper or hiding Finance tabs DOES NOT remove this legacy access. No promise of complete Finance isolation until all old RPCs/RLS/direct client access are cut over and tested.

## Staged changes (never deployed to production)
1. `supabase/staged/20260916_legacy_access_hardening_REVIEW_ONLY.sql`: explicit four-table RLS, public active reference metadata, revoke direct grants to four raw admin/finance views, add new Owner-granted Finance access and an audit table. Initial compensation policies are transitional and must NOT be deployed without stage 2.
2. `supabase/staged/20260916_finance_compensation_RBAC_REVIEW_ONLY.sql`: immediately replaces transitional compensation policies. Only Owner or individually Owner-designated authenticated Finance can SELECT partner salary tiers and commission matrix; only Owner can edit. It does NOT update legacy Finance RPCs.
3. `.github/workflows/legacy-access-isolated-checks.yml` applies both scripts, in order, to a disposable PostgreSQL 17 schema with synthetic identities/data. Tests assert anonymous boundary, Sales/Admin denied by default, Owner-grant only, Finance-read, revocation and audit. **Passing synthetic tests do not prove existing production partner or payment flows work.**

Files intentionally live under `supabase/staged/`, not auto-deployed migrations. All legacy partner codes, QR, booking records, login sessions, and finance functions remain untouched. To roll back a future migration safely, restore the prior grants/RLS and test dependent RPCs; a tested recovery plan is required before any deployment.

## Mandatory release gates
1. Obtain and **restore-test** a production database backup in a no-cost isolated Postgres environment without committing any customer data or secrets to the public repository.
2. Replay both SQL scripts against a faithful copy of production schema and run actual PostgREST authorization tests as anon, unrelated authenticated user, Owner, Admin, Sales, Desk, assigned Finance, disabled Finance and old partner token. Exercise existing QR, partner catalog, terms, booking creation, compensation and link tracking; preserve all current partner token/code/session values.
3. Inventory and cut over **all** direct Finance tables, SECURITY DEFINER functions, payments, supplier cost, payroll, P&L, approvals and settlements at the database layer, then adjust the existing `/admin` interface without deleting modules. Check `staff_profiles` self-read of PIN hash/payroll and anonymous booking entrypoints separately.
4. Onboard individual Ops/Finance users with auth identities; retain legacy Sales/partner PIN and token access as-is. Owner explicitly designates and revokes each Finance user; verify immediate revoke and disabled-staff access.
5. Retest baseline real bookings/payments/partners safely; compare counts and critical flows after rollout. Halt/revert on regression.

**Current status:** logo merged and production-deployed to existing `/admin` in PR #6. Security/RBAC design and synthetic CI remain in unmerged draft PR #7. **No production security migration or staff permission change executed. No paid service created.**
