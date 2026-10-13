import {after, NextRequest, NextResponse} from "next/server";
import {blueWavesPrice, BW_JOIN, BW_PRIVATE, BW_CHARTER, type PickupZone, type TourFormat} from "../../../lib/blueWavesRetail";
const SUPABASE_URL="https://vscffgnxaexestnayvae.supabase.co";
// Public anon JWT authenticates only the rate-limited intake gateway, not the booking RPC.
const ANON_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzY2ZmZ254YWV4ZXN0bmF5dmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTM1MDcsImV4cCI6MjEwMzI4OTUwN30.FhrxtpFiodP-zxmANjNVh5Ujt_DXvNZNHJdHpZ0LxFk";
const DIRECT_SALES_CODE="GVS-EN-DAVID-00";
const clean=(v:unknown,max=500)=>String(v??"").trim().slice(0,max);
const count=(v:unknown)=>Math.max(0,Math.min(100,Math.floor(Number(v)||0)));
export async function POST(req:NextRequest){
 try{
  const body=await req.json();
  if(clean(body.website,100))return NextResponse.json({ok:true});
  const tourCode=clean(body.tourCode,10);
  const format=clean(body.format,12) as TourFormat;
  const zone=clean(body.pickupZone,10) as PickupZone;
  const session=clean(body.session,12);
  if(!/^PQ-(0[1-9]|1[0-7])$/.test(tourCode)||!["join","private","charter"].includes(format)||!["center","north","south"].includes(zone))
    return NextResponse.json({error:"Invalid tour selection"},{status:400});
  if((format==="join"&&!BW_JOIN[tourCode])||(format==="private"&&!BW_PRIVATE[tourCode])||(format==="charter"&&!BW_CHARTER[tourCode]))
    return NextResponse.json({error:"Unsupported tour format"},{status:400});
  const adults=count(body.adults),children=count(body.children),infants=count(body.infants);
  const fullName=clean(body.fullName,160),whatsapp=clean(body.whatsapp,80),tourDate=clean(body.tourDate,20);
  const price=blueWavesPrice({code:tourCode,format,zone,adults,children,infants,session,skyLoungeGuests:count(body.skyLoungeGuests)});
  if(!price||!fullName||!whatsapp||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(tourDate))
    return NextResponse.json({error:"Missing or invalid booking details"},{status:400});
  const date=new Date(tourDate+"T00:00:00+07:00");
  if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==tourDate||date.getTime()<Date.now()-86400000)
    return NextResponse.json({error:"Invalid booking date"},{status:400});
  if(format==="join"){
    const allowed=BW_JOIN[tourCode].weekdays;
    if(allowed&&!allowed.includes(date.getUTCDay()))return NextResponse.json({error:"This tour does not depart on the selected weekday"},{status:400});
    if(BW_JOIN[tourCode].minGuests&&(adults+children+infants)<BW_JOIN[tourCode].minGuests)
      return NextResponse.json({error:"Minimum group size not reached; ask GoVietStay for a shared departure"},{status:400});
  }
  const bookingCode="GVS-BW-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+"-"+Math.random().toString(36).slice(2,8).toUpperCase();
  const notes=[
   "Source: GoVietStay RU Phu Quoc Blue Waves retail tour form",
   "Price list: Blue-Waves_Tour-Book_FINAL(2).docx · public SELLING PRICE, not supplier cost",
   "Subject to availability, marine conditions and supplier operating confirmation before deposit",
   "Format: "+format,"Pickup pricing zone: "+zone,"Session: "+session,
   "Adult unit VND: "+price.adultUnit,"Child unit VND: "+price.childUnit,
   "Children height bracket 100–139 cm; infants under 100 cm subject to tour-specific policy",
   "Email: "+clean(body.email,160),
   "Hotel: "+clean(body.hotel,300),
   "Pickup: "+clean(body.pickup,300),
   "Children ages/heights: "+clean(body.childDetails,500),
   "Sky Lounge guests: "+count(body.skyLoungeGuests),
   "Special request: "+clean(body.request,1000),
   "No payment captured. Booking Pending until admin validates availability, final price and deposit link.",
  ].join("\n");
  const payload={
    p_sales_code:DIRECT_SALES_CODE,p_booking_code:bookingCode,p_guest_name:fullName,p_phone:whatsapp,
    p_tour_date:tourDate,p_pickup_time:"",p_hotel:clean(body.hotel,300),p_region:"Phu Quoc",
    p_tour_slug:"blue-waves-"+tourCode.toLowerCase(),
    p_tour_name:"GoVietStay Phu Quoc "+tourCode,
    p_variant_id:tourCode,p_variant_name:format+" / "+zone+" / "+session,
    p_language:"Russian",p_adults:adults,p_children:children,p_infants:infants,
    p_gross_revenue_vnd:price.gross,p_discount_vnd:0,p_deposit_vnd:0,p_notes:notes
  };
  const result=await fetch(SUPABASE_URL+"/functions/v1/phu-quoc-pilot-intake",{method:"POST",headers:{
    apikey:ANON_JWT,Authorization:"Bearer "+ANON_JWT,"Content-Type":"application/json"
  },body:JSON.stringify(payload),cache:"no-store",signal:AbortSignal.timeout(10000)});
  const response=await result.json().catch(()=>null);
  if(!result.ok){console.error("Blue Waves intake failure",result.status);return NextResponse.json({error:"Could not create booking request"},{status:502});}
  const topic=typeof response?.push_topic==="string"&&/^gvs-inbox-[a-f0-9]{48}$/.test(response.push_topic)?response.push_topic:null;
  if(topic)after(async()=>{
   try{await fetch("https://ntfy.sh/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic,title:"GoVietStay: booking moi",message:"Co booking moi cho duyet. Mo GoVietStay Admin de xem.",priority:4,tags:["bell"],click:"https://www.govietstay.com/admin"}),cache:"no-store",signal:AbortSignal.timeout(7000)});}catch{console.warn("Booking alert unavailable");}
  });
  return NextResponse.json({ok:true,booking_code:response?.booking_code||bookingCode,status:response?.status||"pending",quoted_vnd:price.gross});
 }catch{return NextResponse.json({error:"Invalid booking request"},{status:400});}
}
