import { NextRequest, NextResponse } from "next/server";
import { createSign } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY = "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const GSC_SITE = "sc-domain:govietstay.com";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function b64url(value: string | Buffer) {
  return Buffer.from(value).toString("base64")
    .replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");
}
function isoDate(d: Date) { return d.toISOString().slice(0,10); }
function normalizePrivateKey(value: string) {
  let v = value.trim();
  if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
  return v.replace(/\\n/g,"\n");
}
async function verifyAdmin(token: string) {
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`,{
    headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`},
    cache:"no-store"
  });
  if(!userRes.ok) return {ok:false,userId:null};
  const user = await userRes.json();
  const staffRes = await fetch(
    `${SUPABASE_URL}/rest/v1/staff_profiles?select=role,active&auth_user_id=eq.${encodeURIComponent(user.id)}&active=eq.true&limit=1`,
    {headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`},cache:"no-store"}
  );
  if(!staffRes.ok) return {ok:false,userId:user.id};
  const staff = await staffRes.json();
  const role = staff?.[0]?.role;
  return {ok:role==="owner"||role==="admin",userId:user.id};
}
async function googleAccessToken() {
  const email = process.env.GSC_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GSC_PRIVATE_KEY;
  if(!email || !rawKey) throw new Error("Thiếu GSC_SERVICE_ACCOUNT_EMAIL hoặc GSC_PRIVATE_KEY trên Vercel.");

  const now = Math.floor(Date.now()/1000);
  const header = b64url(JSON.stringify({alg:"RS256",typ:"JWT"}));
  const payload = b64url(JSON.stringify({
    iss:email,
    scope:GSC_SCOPE,
    aud:"https://oauth2.googleapis.com/token",
    iat:now,
    exp:now+3600
  }));
  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(normalizePrivateKey(rawKey));
  const assertion = `${unsigned}.${b64url(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token",{
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:new URLSearchParams({
      grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    }),
    cache:"no-store"
  });
  const tokenData = await tokenRes.json();
  if(!tokenRes.ok || !tokenData.access_token) {
    throw new Error(`Google OAuth lỗi: ${tokenData?.error_description||tokenData?.error||tokenRes.status}`);
  }
  return tokenData.access_token as string;
}
async function gscRows(accessToken:string,startDate:string,endDate:string) {
  const all:any[] = [];
  let startRow = 0;
  for(let page=0;page<20;page++){
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
      {
        method:"POST",
        headers:{Authorization:`Bearer ${accessToken}`,"Content-Type":"application/json"},
        body:JSON.stringify({
          startDate,endDate,
          dimensions:["date","query","page","country","device"],
          type:"web",
          dataState:"final",
          rowLimit:25000,
          startRow
        }),
        cache:"no-store"
      }
    );
    const data = await res.json();
    if(!res.ok) throw new Error(data?.error?.message || `Search Console API lỗi ${res.status}`);
    const rows = Array.isArray(data.rows)?data.rows:[];
    all.push(...rows);
    if(rows.length<25000) break;
    startRow += rows.length;
  }
  return all;
}
async function insertRun(token:string,userId:string,startDate:string,endDate:string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/search_console_sync_runs`,{
    method:"POST",
    headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`,"Content-Type":"application/json",Prefer:"return=representation"},
    body:JSON.stringify({start_date:startDate,end_date:endDate,status:"running",created_by:userId}),
    cache:"no-store"
  });
  const data = await res.json();
  if(!res.ok) throw new Error(`Không tạo được sync run: ${data?.message||res.status}`);
  return data?.[0]?.id as string;
}
async function updateRun(token:string,id:string,patch:any) {
  if(!id) return;
  await fetch(`${SUPABASE_URL}/rest/v1/search_console_sync_runs?id=eq.${encodeURIComponent(id)}`,{
    method:"PATCH",
    headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`,"Content-Type":"application/json",Prefer:"return=minimal"},
    body:JSON.stringify(patch),
    cache:"no-store"
  });
}
async function upsertRows(token:string,records:any[]) {
  let total=0;
  for(let i=0;i<records.length;i+=500){
    const batch=records.slice(i,i+500);
    const res=await fetch(
      `${SUPABASE_URL}/rest/v1/search_console_daily?on_conflict=date,query,page,country,device`,
      {
        method:"POST",
        headers:{
          apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`,
          "Content-Type":"application/json",
          Prefer:"resolution=merge-duplicates,return=minimal"
        },
        body:JSON.stringify(batch),
        cache:"no-store"
      }
    );
    if(!res.ok){
      const detail=await res.text();
      throw new Error(`Supabase upsert lỗi ${res.status}: ${detail.slice(0,300)}`);
    }
    total+=batch.length;
  }
  return total;
}

export async function POST(request:NextRequest){
  const auth=request.headers.get("authorization")||"";
  const token=auth.startsWith("Bearer ")?auth.slice(7).trim():"";
  if(!token) return NextResponse.json({error:"Thiếu phiên đăng nhập Admin."},{status:401});

  const admin=await verifyAdmin(token);
  if(!admin.ok || !admin.userId) return NextResponse.json({error:"Chỉ Owner/Admin được đồng bộ Search Console."},{status:403});

  let runId="";
  try{
    const body=await request.json().catch(()=>({}));
    const requestedDays=Math.max(7,Math.min(Number(body?.days||90),180));
    const end=new Date(Date.now()-2*86400000);
    const start=new Date(end.getTime()-(requestedDays-1)*86400000);
    const startDate=isoDate(start),endDate=isoDate(end);

    runId=await insertRun(token,admin.userId,startDate,endDate);
    const googleToken=await googleAccessToken();
    const rows=await gscRows(googleToken,startDate,endDate);
    const syncedAt=new Date().toISOString();
    const records=rows.map((r:any)=>{
      const k=Array.isArray(r.keys)?r.keys:[];
      return {
        date:String(k[0]||startDate),
        query:String(k[1]||""),
        page:String(k[2]||""),
        country:String(k[3]||""),
        device:String(k[4]||""),
        clicks:Math.max(0,Math.round(Number(r.clicks||0))),
        impressions:Math.max(0,Math.round(Number(r.impressions||0))),
        ctr:Math.max(0,Number(r.ctr||0)),
        position:Math.max(0,Number(r.position||0)),
        synced_at:syncedAt
      };
    });
    const upserted=await upsertRows(token,records);
    await updateRun(token,runId,{
      completed_at:new Date().toISOString(),rows_received:rows.length,rows_upserted:upserted,
      status:"success",error_message:null
    });
    return NextResponse.json({ok:true,start_date:startDate,end_date:endDate,rows_received:rows.length,rows_upserted:upserted});
  }catch(error:any){
    const message=String(error?.message||"Không đồng bộ được Search Console").slice(0,1000);
    if(runId) await updateRun(token,runId,{completed_at:new Date().toISOString(),status:"failed",error_message:message});
    console.error("GSC sync failed",message);
    return NextResponse.json({error:message},{status:500});
  }
}
