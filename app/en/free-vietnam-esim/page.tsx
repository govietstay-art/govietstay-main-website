import type { Metadata } from "next";
import FreeEsimLanding from "../../../components/free-esim/FreeEsimLanding";
const base="https://www.govietstay.com";
export const metadata:Metadata={
 title:"Free Vietnam eSIM for Tourists | First-Time Visitors | GoVietStay",description:"Request a complimentary Vietnam travel eSIM for your first visit. Contact GoVietStay on WhatsApp to confirm eligibility, data plan, device compatibility and activation.",
 alternates:{canonical:base+"/en/free-vietnam-esim",languages:{en:base+"/en/free-vietnam-esim",ru:base+"/ru/free-vietnam-esim",it:base+"/it/free-vietnam-esim","x-default":base+"/en/free-vietnam-esim"}},
 robots:{index:true,follow:true},
 openGraph:{type:"website",title:"Free Vietnam eSIM for Tourists | First-Time Visitors | GoVietStay",description:"Request a complimentary Vietnam travel eSIM for your first visit. Contact GoVietStay on WhatsApp to confirm eligibility, data plan, device compatibility and activation.",url:base+"/en/free-vietnam-esim",siteName:"GoVietStay"}
};
export default function Page(){return <FreeEsimLanding locale="en"/>;}
