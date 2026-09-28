import { NextRequest,NextResponse } from "next/server";
import { POST as relay } from "../deliver/route";

// One-time Preview-only synthetic notification check; delete before merge.
// The synthetic record is not related to a real customer or booking.
export async function GET(req:NextRequest){
  if(process.env.VERCEL_ENV!=="preview")return NextResponse.json({error:"not found"},{status:404});
  const res=await relay(new NextRequest(new URL("/api/booking-notifications/deliver",req.url),{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({event_id:"23cca2a6-7d0a-43c8-a077-ec3b411e6acc",event_token:"7c9448ce-1642-454d-9740-6990a5103b70"})
  }));
  const result=await res.json();
  return NextResponse.json(result,{status:res.status,headers:{"Cache-Control":"no-store"}});
}
