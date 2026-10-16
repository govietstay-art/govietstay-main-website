import type { Metadata } from "next";
import FreeEsimLanding from "../../../components/free-esim/FreeEsimLanding";
const base="https://www.govietstay.com";
export const metadata:Metadata={
 title:"Бесплатная eSIM во Вьетнаме для туристов | GoVietStay",description:"Впервые во Вьетнаме? Запросите подарочную eSIM через WhatsApp GoVietStay. Уточните условия, совместимость телефона и активацию.",
 alternates:{canonical:base+"/ru/free-vietnam-esim",languages:{en:base+"/en/free-vietnam-esim",ru:base+"/ru/free-vietnam-esim",it:base+"/it/free-vietnam-esim","x-default":base+"/en/free-vietnam-esim"}},
 robots:{index:true,follow:true},
 openGraph:{type:"website",title:"Бесплатная eSIM во Вьетнаме для туристов | GoVietStay",description:"Впервые во Вьетнаме? Запросите подарочную eSIM через WhatsApp GoVietStay. Уточните условия, совместимость телефона и активацию.",url:base+"/ru/free-vietnam-esim",siteName:"GoVietStay"}
};
export default function Page(){return <FreeEsimLanding locale="ru"/>;}
