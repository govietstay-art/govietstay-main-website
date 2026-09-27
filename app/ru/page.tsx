import type {Metadata} from "next";
import RussianHomeClient from "./RussianHomeClient";
export const metadata:Metadata={
 title:{absolute:"Экскурсии во Вьетнаме на русском | GoVietStay"},
 description:"Экскурсии, трансферы и поддержка на русском в Дананге, Хойане, Хюэ и на Фукуоке.",
 alternates:{canonical:"https://www.govietstay.com/ru",languages:{en:"https://www.govietstay.com",ru:"https://www.govietstay.com/ru","it-IT":"https://www.govietstay.com/it","x-default":"https://www.govietstay.com"}},
 openGraph:{type:"website",locale:"ru_RU",url:"https://www.govietstay.com/ru",siteName:"GoVietStay",
  title:"Экскурсии на русском языке | GoVietStay",
  description:"Путешествия по Вьетнаму с местной поддержкой на русском языке.",
  images:[{url:"https://www.govietstay.com/hero-hoian-new.png",alt:"Экскурсии GoVietStay"}]},
 twitter:{card:"summary_large_image",images:["https://www.govietstay.com/hero-hoian-new.png"]},
};
export default function Page(){return <RussianHomeClient/>;}
