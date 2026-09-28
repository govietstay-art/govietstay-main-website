import { after, NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
// Legacy anonymous JWT is intentionally public and only authenticates the
// tightly rate-limited Edge intake gateway (not the privileged booking RPC).
const SUPABASE_PUBLIC_ANON_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzY2ZmZ254YWV4ZXN0bmF5dmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTM1MDcsImV4cCI6MjEwMzI4OTUwN30.FhrxtpFiodP-zxmANjNVh5Ujt_DXvNZNHJdHpZ0LxFk";
const DIRECT_SALES_CODE = "GVS-EN-DAVID-00"; // Owner / Direct Sales profile already enabled in Booking Master flow.

import { PHU_QUOC_PUBLISHED_RATES as PRICE } from "../../../lib/phuQuocPublishedRates";
import { johnsInternalForBooking } from "../../../lib/phuQuocJohnsInternal";

function count(v:unknown){ return Math.max(0,Math.min(40,Math.floor(Number(v)||0))); }
function text(v:unknown,max=500){ return String(v ?? "").trim().slice(0,max); }
function code(){ const d=new Date(); const y=d.getUTCFullYear(); const m=String(d.getUTCMonth()+1).padStart(2,"0"); const day=String(d.getUTCDate()).padStart(2,"0"); const rnd=Math.random().toString(36).slice(2,7).toUpperCase(); return `GVS-PQ-${y}${m}${day}-${rnd}`; }

export async function POST(req:NextRequest){
  try{
    const body=await req.json();
    if(text(body.website,100)) return NextResponse.json({ok:true}); // honeypot
    const item=PRICE[text(body.tourCode,40)];
    if(!item) return NextResponse.json({error:"Invalid tour"},{status:400});
    const adults=count(body.adults), children=count(body.children), infants=count(body.infants);
    if(adults+children+infants<1) return NextResponse.json({error:"At least one guest is required"},{status:400});
    const guest=text(body.fullName,160), phone=text(body.whatsapp,80), tourDate=text(body.tourDate,20);
    if(!guest || !phone || !/^\d{4}-\d{2}-\d{2}$/.test(tourDate)) return NextResponse.json({error:"Missing required booking fields"},{status:400});
    const gross=item.adult*adults+item.child*children;
    const internal=johnsInternalForBooking(text(body.tourCode,40),adults,children,gross);
    if(gross<=0) return NextResponse.json({error:"Selling price is required"},{status:400});
    const bookingCode=code();
    const notes=[
      "Source: public Phu Quoc website booking form",
      `Email: ${text(body.email,160)||"—"}`,
      `Pickup detail: ${text(body.pickup,300)||"—"}`,
      `Child ages/heights: ${text(body.childDetails,500)||"—"}`,
      `Special request: ${text(body.request,1000)||"—"}`,
      "Passport/ID details intentionally NOT collected in public form; request securely after availability confirmation if supplier requires them.",
      "Pricing model: customer selling price = John’s Tours Published Rate; no extra markup on join-in tour.",
      `Internal supplier net estimate: ${internal.supplierNet.toLocaleString("en-US")} VND`,
      `Internal agency commission estimate: ${internal.commission.toLocaleString("en-US")} VND`,
      "Deposit required: to be set only after availability/price confirmation in Payment Center; public form records 0 received."
    ].join("\n");

    const payload={
      p_sales_code:DIRECT_SALES_CODE,
      p_booking_code:bookingCode,
      p_guest_name:guest,
      p_phone:phone,
      p_tour_date:tourDate,
      p_pickup_time:"",
      p_hotel:text(body.hotel,300),
      p_region:"Phu Quoc",
      p_tour_slug:item.slug,
      p_tour_name:item.name,
      p_variant_id:text(body.tourCode,40),
      p_variant_name:"Join-in / public website",
      p_language:text(body.language,80) || (body.languageKey === "ru" ? "Russian" : "English"),
      p_adults:adults,
      p_children:children,
      p_infants:infants,
      p_gross_revenue_vnd:gross,
      p_discount_vnd:0,
      p_deposit_vnd:0,
      p_notes:notes
    };

    // Authenticated Edge gateway holds the service-role credential in
    // Supabase, not in Vercel; its SQL RPC constrains input and request rates.
    const r=await fetch(`${SUPABASE_URL}/functions/v1/phu-quoc-pilot-intake`,{
      method:"POST",
      headers:{
        apikey:SUPABASE_PUBLIC_ANON_JWT,
        Authorization:`Bearer ${SUPABASE_PUBLIC_ANON_JWT}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload),
      cache:"no-store",
      signal:AbortSignal.timeout(10_000)
    });
    const result=await r.json().catch(()=>null);
    if(!r.ok){
      // Log only upstream status/code; never log guest information or secrets.
      console.error("Supabase booking intake failed",r.status,typeof result?.code==="string"?result.code:"unknown");
      return NextResponse.json({error:"Could not create booking request"},{status:502});
    }
    // AI-independent intake. Only after the DB acknowledges a pending request,
    // publish a generic best-effort alert from Vercel: Supabase shared egress
    // was rate-limited by ntfy (HTTP 429). The authenticated Admin queue remains
    // the source of truth even if notification delivery fails.
    after(async () => {
      try {
        const push = await fetch("https://ntfy.sh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: "gvs-inbox-a3fb05701634041bb1f72e25829c20862175b24cde519272",
            title: "GoVietStay: booking moi",
            message: "Co booking moi cho duyet. Mo GoVietStay Admin de xem.",
            priority: 4,
            tags: ["bell"],
            click: "https://www.govietstay.com/admin",
            actions: [{ action: "view", label: "Mo Admin", url: "https://www.govietstay.com/admin" }]
          }),
          signal: AbortSignal.timeout(7000),
          cache: "no-store"
        });
        if (push.ok) console.info("GoVietStay pending booking notification accepted");
        else console.warn("GoVietStay pending booking notification rejected:", push.status);
      } catch {
        console.warn("GoVietStay pending booking notification transport unavailable");
      }
    });
    return NextResponse.json({ok:true,booking_code:result?.booking_code || bookingCode,status:result?.status || "pending"});
  }catch{
    return NextResponse.json({error:"Invalid request"},{status:400});
  }
}
