// Public key is intentionally public. Privileged booking and inquiry writes
// happen only in the verified, rate-limited Supabase Edge gateway.
const ENDPOINT="https://vscffgnxaexestnayvae.supabase.co/functions/v1/gvs-public-inquiry";
const PUBLIC_ANON_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzY2ZmZ254YWV4ZXN0bmF5dmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTM1MDcsImV4cCI6MjEwMzI4OTUwN30.FhrxtpFiodP-zxmANjNVh5Ujt_DXvNZNHJdHpZ0LxFk";
export type PublicInquiryPayload={
 product_code:string;product_name:string;source_page:string;
 full_name:string;whatsapp:string;email?:string;tour_date?:string;
 adults:number;children:number;hotel?:string;details?:string;
 language?:string;website?:string;
};
export async function sendPublicInquiry(payload:PublicInquiryPayload):
 Promise<{inquiry_code:string;status:"pending"}>{
 const r=await fetch(ENDPOINT,{method:"POST",
  headers:{apikey:PUBLIC_ANON_JWT,Authorization:"Bearer "+PUBLIC_ANON_JWT,"Content-Type":"application/json"},
  body:JSON.stringify(payload),cache:"no-store"});
 const j=await r.json().catch(()=>null);
 if(!r.ok||!j?.inquiry_code)throw new Error("Request not saved. Please contact GoVietStay on WhatsApp.");
 return {inquiry_code:j.inquiry_code,status:"pending"};
}
