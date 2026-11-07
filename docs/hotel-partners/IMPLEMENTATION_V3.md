# GoVietStay Hotel Partner Management V3 — implementation status

## Deployment isolation
- Feature branch: `feature/hotel-partner-v3-workflow`, not merged with `main`.
- Next.js route: `/admin/hotels-v3` (client-side Supabase Auth; sign-in is required).
- Preview deployment can be shared independently; production Admin/Bookings code is unchanged.
- Pilot source imports: 6 private draft hotels, 47 draft room types. Each hotel has a different supplier tenant.

## What is implemented
- Supabase SQL migration `20261106_hotel_partner_v3.sql` applied to project `vscffgnxaexestnayvae`.
- Eight dedicated tables: orgs, members, properties, room types, media, NET rates, changes, audit.
- Supabase RLS: hotel partners read their assigned organization; only GoVietStay owner/admin can publish changes and read approved NET rate records.
- Supabase private Storage bucket `hotel-partner-private`; WebP only, <= 2 MB for each object.
- Browser-side compression generally targets <= 300 KB. Gallery: six total hotel images, one room image.
- Partner workflow: hotel profile, room template dropdown, room duplication, amenities selection, preview, optional saved draft, submit for review, rate-period proposals and photo upload.
- Admin workflow: onboarding a new hotel + supplier organization, linking an existing Auth user by email, review/approve/reject requests.
- Approved photos are retrieved using expiring signed links; raw image URLs or contractual NET rates are not embedded in client source.
- Room rate validation rejects overlapping date periods; rate period must have start and end dates.
- No direct booking / real-time inventory / vouchers / retail markup / customer-facing prices.

## Pilot test evidence
- 6 draft hotel records and 47 draft room types verified in Supabase.
- Anonymous role query returns 0 hotel records, 0 room records, 0 rate records, 0 review requests.
- Simulated owner authenticated context reads 6 hotels and 47 rooms.
- Vercel Next.js preview build has succeeded (check the latest feature branch commit for exact current status).

## Required before production merge
1. Test with at least one actual non-admin hotel account: scope, create draft, submit, approve/reject, edit after approval.
2. Test signed private images and Safari/iPhone compression; handle HEIC conversion fallback where unsupported.
3. Confirm role boundaries with multiple organizations (hotel A must not read hotel B).
4. Validate rate periods, holiday exclusions, contract originals and VAT/breakfast with real hotel contacts before loading NET amounts.
5. Consider grouping all five steps into a single atomic submission to avoid approving new room types separately before photo/rate upload.
6. Add safe user invitation process and per-organization audit activity in Admin.
7. Review limits, billing, backups, migration rollback and monitoring before activating for external suppliers.

## Current limitations
- New hotel room proposals must be approved before the room exists as a foreign-key target for photos and rates.
- Storage uploaded objects for rejected/unsubmitted media are not automatically garbage collected.
- The approval action does not yet require at least one property photo or other minimum completeness checks.
- No actual partner account has been enrolled/tested end-to-end.
- A previous static V2 demo is separate from this authenticated V3 portal.
