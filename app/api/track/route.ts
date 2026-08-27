import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const ALLOWED_EVENTS = new Set([
  "page_view","whatsapp_click","partner_visit","partner_whatsapp_click","review_click","other",
]);

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}
function decodeHeader(value: string | null) {
  if (!value) return null;
  try { return decodeURIComponent(value).slice(0, 200); }
  catch { return value.slice(0, 200); }
}
function looksLikeBot(ua: string) {
  return /bot|crawler|spider|headless|lighthouse|pagespeed|preview|facebookexternalhit|slurp|bingpreview|google-inspectiontool/i.test(ua);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventName = clean(body?.event_name, 80);
    if (!ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ok:false,error:"invalid_event"},{status:400});
    }

    const ua = request.headers.get("user-agent") || "";
    const record = {
      event_name: eventName,
      session_id: clean(body?.session_id,120)||null,
      visitor_id: clean(body?.visitor_id,120)||null,
      ref_code: clean(body?.ref_code,80)||null,
      path: clean(body?.path,500)||"/",
      page_url: clean(body?.page_url,1500)||null,
      referrer: clean(body?.referrer,1500)||null,
      utm_source: clean(body?.utm_source,200)||null,
      utm_medium: clean(body?.utm_medium,200)||null,
      utm_campaign: clean(body?.utm_campaign,200)||null,

      utm_content: clean(body?.utm_content,200)||null,

      utm_term: clean(body?.utm_term,200)||null,
      locale: clean(body?.locale,30)||null,
      device_type: clean(body?.device_type,40)||null,
      browser: clean(body?.browser,80)||null,
      os: clean(body?.os,80)||null,
      traffic_source: clean(body?.traffic_source,120)||null,
      landing_path: clean(body?.landing_path,500)||null,
      is_returning: Boolean(body?.is_returning),
      is_bot: looksLikeBot(ua),
      country_code: clean(request.headers.get("x-vercel-ip-country"),8)||null,
      region_code: clean(request.headers.get("x-vercel-ip-country-region"),20)||null,
      city: decodeHeader(request.headers.get("x-vercel-ip-city")),
      timezone: clean(request.headers.get("x-vercel-ip-timezone"),100)||null,
      metadata: {
        ...(body?.metadata && typeof body.metadata==="object" ? body.metadata : {}),
        tracking_version:"v8"
      }
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/tracking_events`,{
      method:"POST",
      headers:{
        apikey:SUPABASE_KEY,
        Authorization:`Bearer ${SUPABASE_KEY}`,
        "Content-Type":"application/json",
        Prefer:"return=minimal"
      },
      body:JSON.stringify(record),
      cache:"no-store"
    });

    if(!response.ok){
      console.error("GoVietStay tracking insert failed",response.status,await response.text());
      return NextResponse.json({ok:false},{status:502});
    }
    return NextResponse.json({ok:true});
  } catch(error) {
    console.error("GoVietStay tracking endpoint error",error);
    return NextResponse.json({ok:false},{status:400});
  }
}
