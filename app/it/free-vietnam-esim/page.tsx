import type { Metadata } from "next";
import FreeEsimLanding from "../../../components/free-esim/FreeEsimLanding";
const base="https://www.govietstay.com";
export const metadata:Metadata={
 title:"eSIM gratuita per turisti in Vietnam | GoVietStay",description:"Prima volta in Vietnam? Richiedi una eSIM omaggio tramite WhatsApp GoVietStay. Verifica requisiti, compatibilità, dati e attivazione.",
 alternates:{canonical:base+"/it/free-vietnam-esim",languages:{en:base+"/en/free-vietnam-esim",ru:base+"/ru/free-vietnam-esim",it:base+"/it/free-vietnam-esim","x-default":base+"/en/free-vietnam-esim"}},
 robots:{index:true,follow:true},
 openGraph:{type:"website",title:"eSIM gratuita per turisti in Vietnam | GoVietStay",description:"Prima volta in Vietnam? Richiedi una eSIM omaggio tramite WhatsApp GoVietStay. Verifica requisiti, compatibilità, dati e attivazione.",url:base+"/it/free-vietnam-esim",siteName:"GoVietStay"}
};
export default function Page(){return <FreeEsimLanding locale="it"/>;}
