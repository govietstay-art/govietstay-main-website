import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {chinaSeoPages,getChinaPage,getChinaRelated} from "../../../lib/chinaSeoPages";
import ChinaPage from "../_seo/ChinaPage";

export function generateStaticParams(){return chinaSeoPages.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const page=getChinaPage(slug);if(!page)return{};
  const canonical=`https://www.govietstay.com/cn/${page.slug}`;
  return{
    title:{absolute:page.title},
    description:page.desc,
    alternates:{canonical,languages:{"zh-CN":canonical}},
    robots:{index:true,follow:true},
    openGraph:{type:"article",url:canonical,title:page.title,description:page.desc,locale:"zh_CN",siteName:"GoVietStay"},
    other:{"content-language":"zh-CN","applicable-device":"pc,mobile"},
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const page=getChinaPage(slug);if(!page)notFound();
  return <ChinaPage page={page} related={getChinaRelated(page)}/>;
}
