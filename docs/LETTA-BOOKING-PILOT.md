# GoVietStay ↔ Letta: Phu Quoc booking intake pilot

## State
- GitHub branch: `feature/letta-booking-intake-pilot-20260928`.
- Vercel Preview variables already added by the owner:
  `LETTA_API_KEY`, `LETTA_AGENT_ID`, `LETTA_BOOKING_SYNC_ENABLED=true`.
- **No Vercel service-role key is needed.**
- The public booking request is sent from the Next.js server to a Supabase
  Edge Function `phu-quoc-pilot-intake` (`verify_jwt=true`) using the
  *public* legacy anon JWT. The Edge runtime obtains its Supabase
  service-role credential from Supabase's built-in server-only environment.
- That function calls the service-role-only
  `submit_phu_quoc_pilot_intake` RPC, which enforces a global 40/hour limit,
  3/hour per hashed IP, and 5/day per hashed phone. The sensitive RPC and
  rate-limit table do not grant `anon` or `authenticated` access.
- On a successful **pending** booking intake, Next.js asynchronously sends
  Letta only a non-PII summary: booking code, tour, date, group size, language,
  and published selling price. Letta cannot modify booking status or message
  customers. Admin approval stays manual.

## Preview acceptance
1. Confirm the latest Preview branch deployment is READY and generated after
   Vercel Preview environment variables were saved.
2. Use the **/tours/phu-quoc** page on *that exact Preview deployment*,
   choose any join-in tour, and open **Fill booking form**.
3. Use fake details only; do not click any WhatsApp fallback or approve a test.
4. Submit once. The page should show a booking request code.
5. Verify one matching `pending` row in
   `public.staff_booking_intake`, one success POST to
   `/api/phu-quoc-booking-request` in Vercel runtime logs, and one Letta
   summary with matching code. Letta should receive **no guest name, phone,
   email, hotel, notes, or payment information**.
6. If Letta fails, intake is still successful: review the Vercel log
   (status only) and Letta agent. Preview must pass before merging to main.

## Risk controls and limitations
- The Edge endpoint is available on the live Supabase project but relies on
  a valid legacy anon JWT plus constrained RPC validation and rate limits.
  Periodically review invocation volume and auth logs.
- Sending Letta messages using Next.js `after()` is **best effort**, not
  a durable queue. Implement durable retry before a high-traffic launch.
- Supabase stores a hashed network address and hashed normalized phone for
  abuse prevention (not raw data in the rate-limit ledger).
- If rolling back, disable `LETTA_BOOKING_SYNC_ENABLED` in Preview and
  redeploy; the production GoVietStay site has not been changed by this PR.
