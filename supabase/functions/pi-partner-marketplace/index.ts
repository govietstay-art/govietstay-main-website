import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PI_ME_URL="https://api.minepi.com/v2/me";
const PI_APP_ORIGIN="https://pi.govietstay.com";

function json(body:unknown,status=200){
  return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}
function bearer(req:Request){return (req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"").trim()}
async function verifyPi(token:string){
  const r=await fetch(PI_ME_URL,{headers:{Authorization:`Bearer ${token}`},cache:"no-store"});
  if(!r.ok)throw new Error(`Pi verification failed (${r.status})`);
  const u=await r.json();if(!u?.uid)throw new Error("Pi uid missing");return u as {uid:string;username?:string};
}
async function partnerCode(uid:string){
  const source=`govietstay:pi-community:v3:${String(uid||"").trim()}`;
  const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(source));
  return "PI"+Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,"0")).join("").slice(0,12).toUpperCase();
}
async function ensurePartner(db:any,user:{uid:string;username?:string}){
  const code=await partnerCode(user.uid);const username=String(user.username||"").trim();
  let q=await db.from("partners").select("id,ref_code,name,active").eq("ref_code",code).maybeSingle();
  if(q.error)throw q.error;
  if(!q.data){
    q=await db.from("partners").insert({
      name:username?`Pi Pioneer @${username}`:`Pi Pioneer ${code}`,ref_code:code,partner_type:"referral",
      contact_name:username?`@${username}`:null,landing_url:`${PI_APP_ORIGIN}/p/${encodeURIComponent(code)}`,
      active:true,market:"pi-community",onboarding_language:"en",onboarding_status:"active",
      notes:"Server-verified Pi Community partner identity."
    }).select("id,ref_code,name,active").single();
    if(q.error)throw q.error;
  }
  return {...q.data,partnerCode:code,username:username||null};
}

Deno.serve(async(req:Request)=>{
  if(req.method==="OPTIONS")return new Response(null,{status:204});
  if(req.method!=="GET"&&req.method!=="POST")return json({ok:false,error:"method_not_allowed"},405);
  try{
    const token=bearer(req);if(!token)return json({ok:false,error:"missing_pi_access_token"},401);
    const user=await verifyPi(token);
    const url=Deno.env.get("SUPABASE_URL"),key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if(!url||!key)return json({ok:false,error:"core_not_configured"},500);
    const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
    const partner=await ensurePartner(db,user);

    if(req.method==="POST"){
      const body=await req.json().catch(()=>({}));
      if(body?.action!=="join")return json({ok:false,error:"unknown_action"},400);
      const merchantCode=String(body?.merchantCode||"").trim().toUpperCase();
      const mq=await db.from("merchants").select("id,merchant_code,name,default_commission_type,default_commission_rate,default_fixed_commission_vnd")
        .eq("merchant_code",merchantCode).eq("active",true).eq("visible_on_pi",true).eq("visibility","public").maybeSingle();
      if(mq.error)throw mq.error;if(!mq.data)return json({ok:false,error:"merchant_not_joinable"},404);

      const join=await db.from("merchant_partners").upsert({
        merchant_id:mq.data.id,partner_id:partner.id,status:"active",active:true,
        commission_type:mq.data.default_commission_type||"percentage",
        commission_rate:mq.data.default_commission_type==="percentage"?Number(mq.data.default_commission_rate||0):null,
        fixed_commission_vnd:mq.data.default_commission_type==="fixed"?Number(mq.data.default_fixed_commission_vnd||0):null,
        metadata:{source:"pi-marketplace",joined_by:"server-verified-pioneer"}
      },{onConflict:"merchant_id,partner_id"}).select("id").single();
      if(join.error)throw join.error;
      return json({ok:true,joined:true,merchantCode,partnerCode:partner.partnerCode});
    }

    const merchantsQ=await db.from("merchants")
      .select("id,merchant_code,name,merchant_type,website_url,logo_url,description,city,country,default_attribution_days,default_commission_type,default_commission_rate,default_fixed_commission_vnd,is_demo")
      .eq("active",true).eq("visible_on_pi",true).eq("visibility","public").order("is_demo",{ascending:true}).order("name");
    if(merchantsQ.error)throw merchantsQ.error;
    const merchants=merchantsQ.data||[];
    const ids=merchants.map((m:any)=>m.id);

    let offers:any[]=[];let joins:any[]=[];
    if(ids.length){
      const oq=await db.from("merchant_offers")
        .select("id,merchant_id,offer_code,name,category,description,image_url,price_vnd,currency,commission_type,commission_rate,fixed_commission_vnd,destination_url,attribution_days,valid_from,valid_until")
        .in("merchant_id",ids).eq("active",true).eq("visible_on_pi",true).order("name");
      if(oq.error)throw oq.error;offers=oq.data||[];

      const jq=await db.from("merchant_partners").select("merchant_id,status,active")
        .eq("partner_id",partner.id).in("merchant_id",ids).eq("active",true);
      if(jq.error)throw jq.error;joins=jq.data||[];
    }
    const joined=new Set(joins.filter((j:any)=>j.status==="active").map((j:any)=>j.merchant_id));

    return json({
      ok:true,
      partner:{partnerCode:partner.partnerCode,username:partner.username},
      merchants:merchants.map((m:any)=>({
        merchantCode:m.merchant_code,name:m.name,type:m.merchant_type,websiteUrl:m.website_url,logoUrl:m.logo_url,
        description:m.description,city:m.city,country:m.country,isDemo:Boolean(m.is_demo),joined:joined.has(m.id),
        defaultAttributionDays:Number(m.default_attribution_days||90),
        defaultCommissionType:m.default_commission_type,defaultCommissionRate:Number(m.default_commission_rate||0),
        defaultFixedCommissionVnd:Number(m.default_fixed_commission_vnd||0),
        offers:offers.filter((o:any)=>o.merchant_id===m.id).map((o:any)=>({
          offerCode:o.offer_code,name:o.name,category:o.category,description:o.description,imageUrl:o.image_url,
          priceVnd:o.price_vnd===null?null:Number(o.price_vnd),currency:o.currency||"VND",
          commissionType:o.commission_type||m.default_commission_type,
          commissionRate:Number(o.commission_rate??m.default_commission_rate??0),
          fixedCommissionVnd:Number(o.fixed_commission_vnd??m.default_fixed_commission_vnd??0),
          attributionDays:Number(o.attribution_days??m.default_attribution_days??90),
          validFrom:o.valid_from,validUntil:o.valid_until
        }))
      }))
    });
  }catch(e){console.error("pi-partner-marketplace",e);return json({ok:false,error:"marketplace_failed"},500)}
});
