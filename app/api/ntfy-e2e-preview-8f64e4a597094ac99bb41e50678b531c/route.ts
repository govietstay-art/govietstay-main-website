import { NextRequest, NextResponse } from "next/server";
import { POST as submitBooking } from "../phu-quoc-booking-request/route";

/**
 * One-time Preview-only smoke test; remove as soon as one test succeeds.
 * Submits exactly one fake booking through the SAME public Next.js route as
 * the website form. The shared Supabase DB retains a marked test row which
 * must be rejected after confirming ntfy and Admin.
 */
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (process.env.VERCEL_ENV !== "preview") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const target = new URL("/api/phu-quoc-booking-request", req.url);
  // Invoke the real booking route handler directly: Vercel protects Preview
  // self-HTTP requests with a 401, but this exercises the same production code.
  const res = await submitBooking(new NextRequest(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tourCode: "TRIP 3",
      fullName: "GOVIETSTAY INTERNAL TEST ONLY",
      whatsapp: "000000725801",
      email: "",
      tourDate: "2026-12-16",
      adults: 1,
      children: 0,
      infants: 0,
      hotel: "",
      pickup: "",
      language: "English",
      request: "SECOND AUTOMATED E2E TEST - DO NOT CONTACT OR APPROVE",
      website: ""
    }),
  }));
  const data = await res.json().catch(() => null);
  return NextResponse.json(
    { test: true, booking_endpoint_status: res.status,
      booking_code: typeof data?.booking_code === "string" ? data.booking_code : null,
      saved: res.ok && data?.status === "pending" },
    { status: res.ok ? 200 : 502, headers: { "Cache-Control": "no-store" } }
  );
}
