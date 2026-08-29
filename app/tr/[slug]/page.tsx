import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {turkeySeoPages,getTurkeyPage,getTurkeyRelated} from "../../../lib/turkeySeoPages";
import TurkeyPage from "../_seo/TurkeyPage";

export function generateStaticParams(){return turkeySeoPages.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const page=getTurkeyPage(slug);if(!page)return{};
  const canonical=`https://www.govietstay.com/tr/${page.slug}`;
  return{
    title:{absolute:page.title},
    description:page.desc,
    alternates:{canonical,languages:{"tr-TR":canonical}},
    robots:{index:true,follow:true},
    openGraph:{type:"article",url:canonical,title:page.title,description:page.desc,locale:"tr_TR",siteName:"GoVietStay"},
    other:{"content-language":"tr-TR","applicable-device":"pc,mobile"}
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const page=getTurkeyPage(slug);if(!page)notFound();
  return <TurkeyPage page={page} related={getTurkeyRelated(page)}/>;
}
