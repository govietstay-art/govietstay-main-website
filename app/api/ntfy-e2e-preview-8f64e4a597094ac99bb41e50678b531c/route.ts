import { NextRequest, NextResponse } from "next/server";

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
  const res = await fetch(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tourCode: "TRIP 2",
      fullName: "GOVIETSTAY INTERNAL TEST ONLY",
      whatsapp: "000000125799",
      email: "",
      tourDate: "2026-12-15",
      adults: 1,
      children: 0,
      infants: 0,
      hotel: "",
      pickup: "",
      language: "English",
      request: "AUTOMATED E2E TEST - DO NOT CONTACT OR APPROVE",
      website: ""
    }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store"
  });
  const data = await res.json().catch(() => null);
  return NextResponse.json(
    { test: true, booking_endpoint_status: res.status,
      booking_code: typeof data?.booking_code === "string" ? data.booking_code : null,
      saved: res.ok && data?.status === "pending" },
    { status: res.ok ? 200 : 502, headers: { "Cache-Control": "no-store" } }
  );
}
