import type { Metadata } from "next";
import EsimShop from "./EsimShop";
import "./esim.css";
export const metadata: Metadata = {
 title:"Vietnam eSIM – Buy Online Easily Before Arrival | GoVietStay",
 description:"Buy your Vietnam eSIM in a few simple steps: choose a 5GB/day plan, pay by bank transfer, and send your receipt on WhatsApp. We send your QR code after payment verification. Plans from 100,000 VND.",
 alternates:{canonical:"https://www.govietstay.com/esim"},
 openGraph:{
  title:"Vietnam eSIM – Buy Easily Before You Fly | GoVietStay",
  description:"Choose a plan online, pay by bank transfer, and receive your eSIM QR code via WhatsApp after confirmation. 5GB/day, 3–31 days, from 100,000 VND.",
  url:"https://www.govietstay.com/esim",
  siteName:"GoVietStay",
  type:"website",
  images:[{url:"https://www.govietstay.com/esim-social-preview-20261111.jpg",width:1200,height:630,alt:"GoVietStay Vietnam eSIM – buy before you fly in three easy steps"}],
 },
 twitter:{
  card:"summary_large_image",
  title:"Vietnam eSIM – Buy Easily Before You Fly | GoVietStay",
  description:"Choose your plan, pay by bank transfer, then receive your eSIM QR via WhatsApp after verification. 5GB/day from 100,000 VND.",
  images:["https://www.govietstay.com/esim-social-preview-20261111.jpg"],
 },
 robots:{index:true,follow:true}
};
export default function Page(){
 const schema={"@context":"https://schema.org","@type":"Product",name:"Vietnam MobiFone Travel eSIM 5GB per day",description:"Pre-order Vietnam travel eSIM with 5GB daily data. QR delivered manually via WhatsApp after payment verification.",brand:{"@type":"Brand",name:"GoVietStay"},offers:{"@type":"AggregateOffer",priceCurrency:"VND",lowPrice:100000,highPrice:204000,offerCount:6,url:"https://www.govietstay.com/esim"}};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><EsimShop/></>;
}
