import type {Metadata} from "next";
import HomeClient from "./HomeClient";
export const metadata:Metadata={
 title:{absolute:"Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay"},
 description:"GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",
 alternates:{canonical:"https://www.govietstay.com",languages:{en:"https://www.govietstay.com",ru:"https://www.govietstay.com/ru","it-IT":"https://www.govietstay.com/it","x-default":"https://www.govietstay.com"}},
 openGraph:{type:"website",locale:"en_US",url:"https://www.govietstay.com",siteName:"GoVietStay",
  title:"Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",
  description:"GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",
  images:[{url:"https://www.govietstay.com/hero-hoian-new.png",alt:"GoVietStay Vietnam tours"}]},
 twitter:{card:"summary_large_image",title:"Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",description:"Private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc.",images:["https://www.govietstay.com/hero-hoian-new.png"]},
};
export default function Page(){return <HomeClient/>;}
