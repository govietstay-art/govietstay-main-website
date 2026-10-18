import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {chinaSeoPages,getChinaPage,getChinaRelated} from "../../../lib/chinaSeoPages";
import ChinaPage from "../_seo/ChinaPage";
import ChinaVisaService from "../_seo/ChinaVisaService";

export function generateStaticParams(){return chinaSeoPages.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const page=getChinaPage(slug);if(!page)return{};
  const canonical=`https://www.govietstay.com/cn/${page.slug}`;
  if(slug==="vietnam-evisa-chinese-passport")return {
    title:{absolute:"中国公民越南电子签证申请与加急服务 | 费用、材料、申请条件 | GoVietStay"},
    description:"中国大陆护照越南电子签证申请指南。了解签证条件、材料、标准与加急办理费用（与GoVietStay英文版同步）、审核风险和官方申请入口。先核验资格，再付款。",
    alternates:{canonical,languages:{"zh-CN":canonical,en:"https://www.govietstay.com/visa","x-default":"https://www.govietstay.com/visa"}},
    robots:{index:true,follow:true},
    openGraph:{type:"website",url:canonical,title:"中国护照越南电子签证与加急服务 | GoVietStay",description:"申请条件、签证材料、透明报价与加急协助。",locale:"zh_CN",siteName:"GoVietStay",images:[{url:"https://www.govietstay.com/brand/govietstay-official-logo.jpg",alt:"GoVietStay visa assistance"}]},
  };

  return{
    title:{absolute:page.title},
    description:page.desc,
    alternates:{canonical,languages:{"zh-CN":canonical}},
    robots:{index:true,follow:true},
    openGraph:{type:"article",url:canonical,title:page.title,description:page.desc,locale:"zh_CN",siteName:"GoVietStay",images:[{url:"https://www.govietstay.com/hero-hoian-new.png",alt:"GoVietStay Vietnam travel"}]},twitter:{card:"summary_large_image",title:page.title,description:page.desc,images:["https://www.govietstay.com/hero-hoian-new.png"]},
    other:{"content-language":"zh-CN","applicable-device":"pc,mobile"},
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const page=getChinaPage(slug);if(!page)notFound();
  if(slug==="vietnam-evisa-chinese-passport")return <ChinaVisaService/>;
  return <ChinaPage page={page} related={getChinaRelated(page)}/>;
}
