import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TaiwanSeoGuidePage from "../_seo/TaiwanSeoGuidePage";
import { getTaiwanSeoGuide, taiwanSeoGuides, getRelatedTaiwanSeoGuides } from "../../../lib/taiwanSeoGuides";

export function generateStaticParams() { return taiwanSeoGuides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTaiwanSeoGuide(slug);
  if (!guide) return {};
  const canonical = `https://www.govietstay.com/tw/${guide.slug}`;
  return {
    title: guide.title, description: guide.description, keywords: guide.keywords,
    alternates: { canonical, languages: { "zh-TW": canonical } },
    openGraph: { type:"article", locale:"zh_TW", url:canonical, siteName:"GoVietStay", title:guide.title, description:guide.description,
      images:[{url:"https://www.govietstay.com/tour/cham-island/guest-on-island.jpg",width:1200,height:630,alt:`${guide.h1} - GoVietStay`}] },
    twitter:{card:"summary_large_image",title:guide.title,description:guide.description,images:["https://www.govietstay.com/tour/cham-island/guest-on-island.jpg"]},
    robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}}
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getTaiwanSeoGuide(slug);
  if (!guide) notFound();
  return <TaiwanSeoGuidePage guide={guide} related={getRelatedTaiwanSeoGuides(guide)} />;
}
