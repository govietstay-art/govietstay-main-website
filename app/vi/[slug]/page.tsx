import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getVietnamSeoPage,getVietnamRelated,vietnamSeoPages} from "../../../lib/vietnamSeoPages";
import VietnamPage from "../_seo/VietnamPage";
export const generateStaticParams=()=>vietnamSeoPages.map(p=>({slug:p.slug}));
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getVietnamSeoPage(slug);if(!p)return{};const c=`https://www.govietstay.com/vi/${p.slug}`;return{title:{absolute:p.title},description:p.description,alternates:{canonical:c,languages:{"vi-VN":c}},robots:{index:true,follow:true},openGraph:{type:"article",url:c,title:p.title,description:p.description,locale:"vi_VN",siteName:"GoVietStay"}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getVietnamSeoPage(slug);if(!p)notFound();return <VietnamPage page={p} related={getVietnamRelated(p)}/>}
