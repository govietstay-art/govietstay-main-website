import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const FALLBACK = "https://www.govietstay.com";
const COOKIE = "gvs_multi_merchant_v1";

function clean(value:string|undefined|null,max=80){
  const v=String(value||"").trim().toUpperCase().slice(0,max);
  return /^[A-Z0-9_-]+$/.test(v)?v:"";
}

async function rpc(name:string,body:Record<string,unknown>){
  const response=await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`,{
    method:"POST",
    headers:{
      apikey:SUPABASE_KEY,
      Authorization:`Bearer ${SUPABASE_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body),
    cache:"no-store"
  });
  if(!response.ok)throw new Error(`${name} failed`);
  return response.json();
}

export async function GET(request:NextRequest,context:{params:Promise<{merchantCode:string;campaignCode:string;partnerCode:string}>}){
  const {merchantCode,campaignCode,partnerCode}=await context.params;
  const merchant=clean(merchantCode),campaign=clean(campaignCode),partner=clean(partnerCode);
  if(!merchant||!campaign||!partner)return NextResponse.redirect(new URL("/",FALLBACK),307);

  try{
    const resolved=await rpc("resolve_merchant_bridge",{
      p_merchant_code:merchant,
      p_campaign_code:campaign,
      p_partner_code:partner
    });
    const row=Array.isArray(resolved)?resolved[0]:null;
    if(!row?.destination_url)return NextResponse.redirect(new URL("/",FALLBACK),307);

    const visitor=request.cookies.get("gvs_visitor_id")?.value||request.cookies.get("gvs_vid")?.value||null;
    void rpc("record_merchant_bridge_visit",{
      p_merchant_code:merchant,
      p_campaign_code:campaign,
      p_partner_code:partner,
      p_visitor_id:visitor,
      p_page_url:request.url,
      p_referrer:request.headers.get("referer"),
      p_metadata:{user_agent:request.headers.get("user-agent")||"",is_demo:Boolean(row.is_demo)}
    }).catch(()=>null);

    const target=new URL(row.destination_url);
    target.searchParams.set("gvs_merchant",merchant);
    target.searchParams.set("gvs_campaign",campaign);
    target.searchParams.set("gvs_partner",partner);
    target.searchParams.set("utm_source","partner-platform");
    target.searchParams.set("utm_medium","merchant-qr");
    target.searchParams.set("utm_campaign",merchant);
    target.searchParams.set("utm_content",campaign);

    const response=NextResponse.redirect(target,307);
    response.headers.set("Cache-Control","no-store");

    if(target.hostname.endsWith("govietstay.com")){
      const days=Math.max(1,Math.min(Number(row.attribution_days||90),3650));
      response.cookies.set(COOKIE,`${merchant}|${campaign}|${partner}`,{
        path:"/",domain:".govietstay.com",maxAge:days*24*60*60,sameSite:"lax",secure:true,httpOnly:false
      });
    }
    return response;
  }catch{
    return NextResponse.redirect(new URL("/",FALLBACK),307);
  }
}
