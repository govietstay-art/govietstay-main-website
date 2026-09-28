// The employee's PIN is checked by a Supabase server-only RPC, never in browser
// source. Only a valid, time-limited staff session can create pending requests.
const EDGE_URL = "https://vscffgnxaexestnayvae.supabase.co/functions/v1/gvs-staff-booking-portal";
const PUBLIC_ANON_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzY2ZmZ254YWV4ZXN0bmF5dmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTM1MDcsImV4cCI6MjEwMzI4OTUwN30.FhrxtpFiodP-zxmANjNVh5Ujt_DXvNZNHJdHpZ0LxFk";

export type StaffBookingRequest={
  sales_code:string;booking_code:string;guest_name:string;phone:string;tour_date:string;
  pickup_time:string;hotel:string;region:string;tour_slug:string;tour_name:string;
  variant_id:string;variant_name:string;language:string;
  adults:number;children:number;infants:number;
  gross_revenue_vnd:number;discount_vnd:number;deposit_vnd:number;notes:string;
};
async function callPortal(body:object){
  const res=await fetch(EDGE_URL,{
    method:"POST",headers:{
      apikey:PUBLIC_ANON_JWT,
      Authorization:"Bearer "+PUBLIC_ANON_JWT,
      "Content-Type":"application/json"
    },
    cache:"no-store",body:JSON.stringify(body)
  });
  const json=await res.json().catch(()=>null);
  if(!res.ok)throw new Error(typeof json?.error==="string"?json.error:"Staff booking portal unavailable");
  return json;
}
export async function staffSalesLogin(salesCode:string,pin:string):
  Promise<{token:string;sales_code:string;expires_at:string}>{
  const result=await callPortal({action:"login",sales_code:salesCode,pin});
  if(!result?.token||result?.sales_code?.toLowerCase()!==salesCode.toLowerCase()){
    throw new Error("Invalid staff session");
  }
  return {token:result.token,sales_code:result.sales_code,expires_at:result.expires_at};
}
export async function submitStaffBookingRequest(p:StaffBookingRequest,sessionToken:string):
  Promise<{ok:boolean;booking_code:string;status:"pending"}>{
  if(!sessionToken)throw new Error("Staff session missing; login again");
  const result=await callPortal({action:"booking",token:sessionToken,payload:{
    p_sales_code:p.sales_code,p_booking_code:p.booking_code,p_guest_name:p.guest_name,
    p_phone:p.phone,p_tour_date:p.tour_date,p_pickup_time:p.pickup_time,
    p_hotel:p.hotel,p_region:p.region,p_tour_slug:p.tour_slug,p_tour_name:p.tour_name,
    p_variant_id:p.variant_id,p_variant_name:p.variant_name,p_language:p.language,
    p_adults:p.adults,p_children:p.children,p_infants:p.infants,
    p_gross_revenue_vnd:p.gross_revenue_vnd,p_discount_vnd:p.discount_vnd,
    p_deposit_vnd:p.deposit_vnd,p_notes:p.notes
  }});
  if(!result?.ok||result?.status!=="pending")throw new Error("Booking was not saved to Admin");
  return result;
}
