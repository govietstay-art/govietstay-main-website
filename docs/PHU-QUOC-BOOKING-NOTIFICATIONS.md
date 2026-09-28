# GoVietStay: AI-free Phu Quoc booking intake and phone alerts

## Production workflow
1. Guest chooses a join-in tour at `/tours/phu-quoc` (English) or `/ru/tours/phu-quoc` (Russian) and submits the GoVietStay booking form.
2. The Next.js server checks the published tour code, guest count and required fields. It calls the JWT-verified Supabase Edge Function `phu-quoc-pilot-intake` using a public anon JWT. No Vercel service-role credential or AI API is needed.
3. The Edge Function invokes the restricted, rate-limited `submit_phu_quoc_pilot_intake` RPC with its server-side Supabase credential. New requests are stored as **pending** in `public.staff_booking_intake`, not in confirmed bookings.
4. Once the Edge Function has returned a successful pending result, Next.js uses `after()` to POST a **generic, non-PII** phone alert to ntfy from Vercel. The Edge response includes a topic identifier only for the Next.js server; the public website response does not expose it.
5. The owner reviews each request under **GoVietStay Admin → Sales Team / Payroll → Staff Booking Requests**. Only the owner decides approval. Approval moves it into Booking Master; no automated confirmation or payment commitment is sent.

## Verified (2026-09-28)
- The Preview form saved multiple requests successfully; the owner observed pending requests in Admin.
- The owner's iPhone subscribed to ntfy and successfully received a stand-alone notification.
- One real handler-driven synthetic Preview submission `GVS-PQ-20260928-GWDQZ` saved as pending, but Supabase shared outbound egress received ntfy HTTP 429. That direct Edge notification was then **removed**.
- A second handler-driven synthetic Preview submission `GVS-PQ-20260928-OAE41` saved as pending; Vercel runtime logs explicitly showed `GoVietStay pending booking notification accepted`.
- Both synthetic E2E requests have since been marked **rejected**, and the temporary test endpoint has been deleted. The three earlier owner-initiated test requests remain pending and should not be approved as real travel bookings.
- Final code moves the topic identifier from the public GitHub source into the successful Supabase Edge server response. The last full-flow test exercised the same Vercel publisher with a temporary literal topic; this final source-location change should be confirmed with the next genuine notification.

## Operational and security limits
- The Supabase RPC caps intake at 40 requests/hour globally, 3/hour per hashed IP, and 5/day per hashed phone. Anonymous users have no direct access to the privileged RPC or its rate-limit table.
- The ntfy channel is **anonymous and not access controlled**; it is a convenience signal only and must never include names, numbers, dates, amounts, codes or payment details. The current topic identifier is discoverable by a determined person who directly submits a valid intake request to the Edge API. Do not treat a push alone as proof of a genuine booking.
- Next.js `after()` alerts are **best effort**, not durable delivery. Failed ntfy sends do not roll back successful booking inserts. Staff should check Admin as the source of truth, particularly until a durable retry/outbox or secondary alert channel is added.
- The Supabase Edge Function is deployed on the shared live Supabase project. Only the Next.js booking route change is pending publication to `main`.
- Do not re-enable Letta for automatic booking handling: the booking workflow runs without paid AI credits.
