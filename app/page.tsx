import type {Metadata} from "next";
import HomeClient from "./HomeClient";
export const metadata:Metadata={
 title:{absolute:"GoVietStay | Da Nang, Hoi An, Hue & Phu Quoc Tours"},
 description:"Local tours, private trips, transfers and trusted local travel support across Da Nang, Hoi An, Hue and Phu Quoc.",
 alternates:{canonical:"https://www.govietstay.com",languages:{en:"https://www.govietstay.com",ru:"https://www.govietstay.com/ru","it-IT":"https://www.govietstay.com/it","x-default":"https://www.govietstay.com"}},
 openGraph:{type:"website",locale:"en_US",url:"https://www.govietstay.com",siteName:"GoVietStay",
  title:"GoVietStay | Trusted Local Support in Vietnam",
  description:"Explore Da Nang, Hoi An, Hue and Phu Quoc with local support.",
  images:[{url:"https://www.govietstay.com/hero-hoian-new.png",alt:"GoVietStay Vietnam tours"}]},
 twitter:{card:"summary_large_image",images:["https://www.govietstay.com/hero-hoian-new.png"]},
};
export default function Page(){return <HomeClient/>;}
