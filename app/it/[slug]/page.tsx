import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {italySeoPages,getItalyPage,getItalyRelated} from "../../../lib/italySeoPages";
import ItalyPage from "../_seo/ItalyPage";
import {getItalyVisual} from "../../../lib/italyVisuals";

export function generateStaticParams(){return italySeoPages.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const page=getItalyPage(slug);if(!page)return{};
  const canonical=`https://www.govietstay.com/it/${page.slug}`;const image=`https://www.govietstay.com${getItalyVisual(page.slug,page.destination).hero}`;
  return{
    title:{absolute:page.title},
    description:page.desc,
    alternates:{canonical,languages:{"it-IT":canonical}},
    robots:{index:true,follow:true},
    openGraph:{type:"article",url:canonical,title:page.title,description:page.desc,locale:"it_IT",siteName:"GoVietStay",images:[{url:image,alt:page.h1}]},twitter:{card:"summary_large_image",title:page.title,description:page.desc,images:[image]},
    other:{"content-language":"it-IT","applicable-device":"pc,mobile"}
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const page=getItalyPage(slug);if(!page)notFound();
  return <ItalyPage page={page} related={getItalyRelated(page)}/>;
}
