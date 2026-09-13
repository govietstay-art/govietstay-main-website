import { NextRequest, NextResponse } from "next/server";

const PARTNER_COOKIE = "gvs_partner_ref_v1";
const ATTRIBUTION_SECONDS = 60 * 60 * 24 * 90;
const CORE_HOME = "https://www.govietstay.com";

function normalizePartnerCode(value?: string | null): string {
  const code = String(value || "").trim().toUpperCase().slice(0, 80);
  return /^[A-Z0-9_-]{2,80}$/.test(code) ? code : "";
}

async function recordPartnerVisit(
  request: NextRequest,
  incoming: string,
  activePartner: string
) {
  if (!incoming) return;

  try {
    const trackUrl = new URL("/api/track", request.url);
    const headers = new Headers({ "Content-Type": "application/json" });

    for (const key of [
      "user-agent",
      "x-vercel-ip-country",
      "x-vercel-ip-country-region",
      "x-vercel-ip-city",
      "x-vercel-ip-timezone",
    ]) {
      const value = request.headers.get(key);
      if (value) headers.set(key, value);
    }

    await fetch(trackUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event_name: "partner_visit",
        ref_code: incoming,
        path: request.nextUrl.pathname,
        page_url: request.url,
        referrer: request.headers.get("referer") || null,
        utm_source:
          request.nextUrl.searchParams.get("utm_source") || "pi-community",
        utm_medium:
          request.nextUrl.searchParams.get("utm_medium") || "partner-qr",
        utm_campaign:
          request.nextUrl.searchParams.get("utm_campaign") ||
          "pi-network-vietnam",
        utm_content:
          request.nextUrl.searchParams.get("utm_content") ||
          `partner_${incoming}`,
        traffic_source: "pi_partner_qr",
        landing_path: "/",
        metadata: {
          entry: "pi_partner_qr",
          active_partner: activePartner || incoming,
          attribution_applied: !activePartner || activePartner === incoming,
        },
      }),
      cache: "no-store",
    });
  } catch {
    // Analytics must never block the customer redirect.
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ partnerCode: string }> }
) {
  const { partnerCode } = await context.params;
  const incoming = normalizePartnerCode(partnerCode);
  const existing = normalizePartnerCode(
    request.cookies.get(PARTNER_COOKIE)?.value
  );

  // First-touch attribution for 90 days.
  // A later QR will not overwrite an existing valid partner cookie.
  const activePartner = existing || incoming;

  // Record the physical QR entry separately from attribution ownership.
  await recordPartnerVisit(request, incoming, activePartner);

  const target = new URL("/", CORE_HOME);

  if (activePartner) {
    target.searchParams.set("ref", activePartner);
    target.searchParams.set("utm_source", "pi-community");
    target.searchParams.set("utm_medium", "partner-qr");
    target.searchParams.set("utm_campaign", "pi-network-vietnam");
    target.searchParams.set("utm_content", `partner_${activePartner}`);
  }

  const response = NextResponse.redirect(target, 307);
  response.headers.set("Cache-Control", "no-store");

  if (!existing && incoming) {
    response.cookies.set(PARTNER_COOKIE, incoming, {
      path: "/",
      domain: ".govietstay.com",
      maxAge: ATTRIBUTION_SECONDS,
      sameSite: "lax",
      secure: true,
      httpOnly: false,
    });
  }

  return response;
}
