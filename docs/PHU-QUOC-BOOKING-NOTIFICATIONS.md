# GoVietStay Phu Quoc booking intake and phone notifications

## Intended flow (AI-independent)
- Website tour booking form POSTs to `/api/phu-quoc-booking-request`.
- The Next.js server calls the JWT-verified Supabase Edge Function `phu-quoc-pilot-intake` with a **public anon JWT**. No Vercel service-role key is needed.
- The Edge Function obtains its privileged Supabase credential only from server-side Supabase environment, then calls the **service-role-only**, rate-limited `submit_phu_quoc_pilot_intake` RPC.
- A successful booking is persisted in `public.staff_booking_intake` as **pending**, not in confirmed bookings. Admin reviews under GoVietStay Admin → Sales Team / Payroll → Staff Booking Requests.
- After saving a pending booking, the Edge Function sends a best-effort ntfy push with a generic alert and Admin URL. Neither ntfy nor Letta receives customer names, phone numbers, dates, amounts, booking IDs, or notes. The public notification topic is **not an authenticated private inbox**; never add PII.
- No Letta API is called by the booking workflow; booking works with $0 AI credit. Notification delivery errors do not roll back an otherwise successful booking.

## Verification already completed
- Multiple Preview submissions saved as pending and appeared in Staff Booking Requests.
- iPhone ntfy subscription worked: one separate non-booking test alert was published successfully and the owner confirmed receipt.
- **Pending verification:** one actual Preview booking created after the ntfy hook deployment triggers its own phone notification. Do not merge to production based only on the stand-alone notification test.
- After full end-to-end acceptance, merge reviewed code to main, verify production Vercel deployment and a single safe booking submission, and assess other booking entry points separately.

## Risk controls
- RPC enforces a global 40/hour limit, 3/hour per hashed IP, and 5/day per hashed normalized phone. `anon` and `authenticated` have no direct access to the privileged RPC or rate-limit table.
- The ntfy topic may be read or written by anyone who knows its address. Messages deliberately contain only generic alerts; the Admin data itself requires normal authentication. Treat ntfy as a convenience signal rather than an authenticated booking record.
- Push is best-effort; add monitoring and retries before promising guaranteed delivery, and rely on the Admin pending queue as the source of truth.
- The existing three test requests from 2026-09-28 are pending; do not approve them into real bookings.
- GitHub feature branch remains a Preview pilot until full acceptance. The Supabase Edge function is already deployed to the live Supabase project but only the Preview website currently uses its new booking route.
