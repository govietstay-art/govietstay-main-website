# GoVietStay ↔ Letta: booking intake pilot

**Status:** Code prepared, OFF by default. A live Letta connection is **not**
established until Vercel secrets are configured and an end-to-end test passes.

## Scope

The existing public Phu Quoc booking form inserts a *pending*
`staff_booking_intake` record using the existing Supabase RPC. After a
successful insert, Next.js `after()` best-effort sends a **non-PII** event to the
specified Letta agent. The public booking request still succeeds if Letta is
offline. No price, status, payment, Admin approval or customer-facing messaging
may be changed by Letta. No additional paid orchestration service is needed.

## Vercel configuration (server-only; NEVER commit credentials)

Set these environment variables in the **existing GoVietStay website Vercel project**:

- `LETTA_API_KEY`: secret key created in the existing Letta workspace.
- `LETTA_AGENT_ID`: intended agent id in `agent-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` format.
- `LETTA_BOOKING_SYNC_ENABLED`: `true` to enable *after* testing; `false`/unset to disable.

No `NEXT_PUBLIC_` prefix. Redeploy after changing environment variables.
Never send credentials in chat, screenshots or source control. This integration
uses the official cloud API endpoint at `https://api.letta.com`; self-hosted
Letta needs a separately reviewed base-URL implementation.

## Safe acceptance test

1. Confirm the website deployment and the intended Letta agent.
2. Enable the server-only variables in a Vercel *Preview* deployment first.
3. Submit one clearly labeled test form with a non-real name and non-real
   contact details. The existing booking form requires a phone-like field;
   use a test-only value, not a real traveler's number.
4. Verify precisely one `pending` row in `staff_booking_intake` and one
   Letta intake summary with matching booking code and tour/date/group size.
5. Verify **no** traveler name, phone, email, hotel, special request or
   payment information appears in the Letta message.
6. Verify the Admin keeps the request pending; never approve test bookings.
7. Verify that with Letta disabled or unavailable, booking intake succeeds
   and a server log shows no new Letta message.
8. Remove the test intake with an authorized maintenance process after review.

## Limitations

- `after()` is *best-effort*, not a durable queue or guaranteed retry.
  Missing messages should be reviewed from server logs during pilot.
- Sending multiple events to the same Letta agent simultaneously may cause
  interleaving; restrict the pilot to low traffic and implement a serialized
  queue before production scale.
- This first integration only forwards **new Phu Quoc public booking requests**.
  It does not backfill existing customer records, sync Letta memories back to
  Admin, or authorize Letta to change bookings.
