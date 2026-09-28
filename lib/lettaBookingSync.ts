/**
 * Optional, best-effort Letta pilot for newly submitted Phu Quoc booking requests.
 * No customer names, contact details, hotel, free-text notes, or payment details
 * are transmitted. Configure only through Vercel server environment variables.
 */
export type LettaBookingSummary = {
  bookingCode: string;
  tourCode: string;
  tourName: string;
  tourDate: string;
  language: string;
  adults: number;
  children: number;
  infants: number;
  sellingPriceVnd: number;
};

export function isLettaBookingSyncConfigured(): boolean {
  return (
    process.env.LETTA_BOOKING_SYNC_ENABLED === "true" &&
    Boolean(process.env.LETTA_API_KEY?.trim()) &&
    /^agent-[0-9a-fA-F-]{36}$/.test(process.env.LETTA_AGENT_ID ?? "")
  );
}

export async function syncBookingIntakeToLetta(
  booking: LettaBookingSummary,
): Promise<boolean> {
  if (!isLettaBookingSyncConfigured()) return false;
  const agentId = process.env.LETTA_AGENT_ID!;
  const apiKey = process.env.LETTA_API_KEY!;

  // Letta is an internal drafting assistant only. Admin approves bookings.
  const content = [
    "GoVietStay internal booking-intake event. Draft only; do not contact the traveler,",
    "confirm availability, mark a booking as confirmed, or make payment commitments.",
    "This is a PENDING, UNVERIFIED public website request.",
    "Do not infer missing details; suggest questions for human review.",
    JSON.stringify({
      event: "phu_quoc_booking_request_submitted",
      booking_code: booking.bookingCode,
      tour_code: booking.tourCode,
      tour_name: booking.tourName,
      requested_date: booking.tourDate,
      preferred_language: booking.language,
      adults: booking.adults,
      children: booking.children,
      infants: booking.infants,
      published_selling_price_vnd: booking.sellingPriceVnd,
      review_status: "pending",
      pii_included: false,
    }),
    "Return an internal, concise booking-intake summary and the checks an operator",
    "should complete before approving. Never treat this event as a confirmed booking.",
  ].join("\n");

  // Letta handles each agent sequentially. A busy agent can return 409 while
  // it processes another chat. Retry boundedly only for non-approval conflicts.
  // Never automatically approve or deny tool calls on the owner's agent.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(
        `https://api.letta.com/v1/agents/${encodeURIComponent(agentId)}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content }],
            streaming: false,
          }),
          signal: AbortSignal.timeout(8_000),
          cache: "no-store",
        },
      );

      if (response.ok) {
        console.info("GoVietStay Letta intake synced:", booking.bookingCode);
        return true;
      }

      if (response.status === 409) {
        // Only the explicit, non-sensitive diagnostic code is logged.
        // API error message bodies can contain free text and are never logged.
        const result = await response.json().catch(() => null);
        const detail = result?.detail;
        const rawCode = typeof detail?.code === "string"
          ? detail.code
          : typeof result?.code === "string" ? result.code : "UNKNOWN";
        const code = /^[A-Z_]{3,48}$/.test(rawCode) ? rawCode : "UNKNOWN";
        console.warn("GoVietStay Letta conflict:", code, "attempt:", attempt);
        if (code === "PENDING_APPROVAL") {
          console.warn("GoVietStay Letta sync awaits owner approval:", booking.bookingCode);
          return false;
        }
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
          continue;
        }
      } else {
        console.error("GoVietStay Letta sync HTTP error:", response.status);
      }
      return false;
    } catch {
      // An ambiguous network timeout may occur after Letta accepts a message.
      // Do not auto-retry such cases without a durable idempotency key.
      console.error("GoVietStay Letta sync transport unavailable");
      return false;
    }
  }
  return false;
}
