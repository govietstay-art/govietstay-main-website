import { NextRequest, NextResponse } from "next/server";

const PARTNER_COOKIE = "gvs_partner_ref_v1";
const ATTRIBUTION_SECONDS = 60 * 60 * 24 * 90;
const CORE_HOME = "https://www.govietstay.com";

function normalizePartnerCode(value?: string | null): string {
  const code = String(value || "").trim().toUpperCase().slice(0, 80);
  return /^[A-Z0-9_-]{2,80}$/.test(code) ? code : "";
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
