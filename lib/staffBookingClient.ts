import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL="https://vscffgnxaexestnayvae.supabase.co";
const SUPABASE_KEY="sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV";
const supabase=createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});

export type StaffBookingRequest={
  sales_code:string;booking_code:string;guest_name:string;phone:string;tour_date:string;pickup_time:string;hotel:string;region:string;tour_slug:string;tour_name:string;variant_id:string;variant_name:string;language:string;
  adults:number;children:number;infants:number;gross_revenue_vnd:number;discount_vnd:number;deposit_vnd:number;notes:string;
};

export async function submitStaffBookingRequest(p:StaffBookingRequest){
  const {data,error}=await supabase.rpc("staff_submit_booking_request",{
    p_sales_code:p.sales_code,p_booking_code:p.booking_code,p_guest_name:p.guest_name,p_phone:p.phone,p_tour_date:p.tour_date,p_pickup_time:p.pickup_time,p_hotel:p.hotel,p_region:p.region,p_tour_slug:p.tour_slug,p_tour_name:p.tour_name,p_variant_id:p.variant_id,p_variant_name:p.variant_name,p_language:p.language,p_adults:p.adults,p_children:p.children,p_infants:p.infants,p_gross_revenue_vnd:p.gross_revenue_vnd,p_discount_vnd:p.discount_vnd,p_deposit_vnd:p.deposit_vnd,p_notes:p.notes
  });
  if(error) throw error;
  return data;
}
