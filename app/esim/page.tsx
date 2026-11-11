import type { Metadata } from "next";
import EsimShop from "./EsimShop";
import "./esim.css";
export const metadata: Metadata = {
 title:"Vietnam eSIM 5GB/Day from 100,000 VND | Buy Before Arrival | GoVietStay",
 description:"Buy your Vietnam travel eSIM before arrival. MobiFone 5GB daily data plans for 3–31 days, from 100,000 VND. Pay by bank transfer and receive your QR via WhatsApp after confirmation.",
 alternates:{canonical:"https://www.govietstay.com/esim"},
 openGraph:{title:"Vietnam eSIM – Stay Connected. Pay Less.",description:"Buy your Vietnam eSIM before you fly. 5GB/day plans from 100,000 VND.",url:"https://www.govietstay.com/esim",type:"website"},
 robots:{index:true,follow:true}
};
export default function Page(){
 const schema={"@context":"https://schema.org","@type":"Product",name:"Vietnam MobiFone Travel eSIM 5GB per day",description:"Pre-order Vietnam travel eSIM with 5GB daily data. QR delivered manually via WhatsApp after payment verification.",brand:{"@type":"Brand",name:"GoVietStay"},offers:{"@type":"AggregateOffer",priceCurrency:"VND",lowPrice:100000,highPrice:204000,offerCount:6,url:"https://www.govietstay.com/esim"}};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><EsimShop/></>;
}