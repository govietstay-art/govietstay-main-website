import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {philippinesSeoPages,getPhilippinesPage,getPhilippinesRelated} from "../../../lib/philippinesSeoPages";
import PhilippinesPage from "../_seo/PhilippinesPage";

export function generateStaticParams(){return philippinesSeoPages.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const page=getPhilippinesPage(slug);if(!page)return{};
  const canonical=`https://www.govietstay.com/ph/${page.slug}`;
  return{
    title:{absolute:page.title},
    description:page.desc,
    alternates:{canonical,languages:{"en-PH":canonical}},
    robots:{index:true,follow:true},
    openGraph:{type:"article",url:canonical,title:page.title,description:page.desc,locale:"en_PH",siteName:"GoVietStay"},
    other:{"content-language":"en-PH","applicable-device":"pc,mobile"}
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const page=getPhilippinesPage(slug);if(!page)notFound();
  return <PhilippinesPage page={page} related={getPhilippinesRelated(page)}/>;
}
