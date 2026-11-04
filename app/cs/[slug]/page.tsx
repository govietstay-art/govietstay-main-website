import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {czechGuides,getCzechGuide} from "../../../lib/czech-guides";
const BASE="https://www.govietstay.com";
export const dynamicParams=false;
export function generateStaticParams(){return czechGuides.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=getCzechGuide(slug);
 if(!p)return {robots:{index:false}};
 const url=BASE+"/cs/"+p.slug;
 return {title:{absolute:p.title+" | GoVietStay"},description:p.meta,alternates:{canonical:url,languages:{"cs-CZ":url}},robots:{index:true,follow:true},openGraph:{type:"article",locale:"cs_CZ",url,title:p.title,description:p.meta,siteName:"GoVietStay",images:[{url:BASE+p.image,alt:p.imageAlt}]},twitter:{card:"summary_large_image",title:p.title,description:p.meta,images:[BASE+p.image]}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=getCzechGuide(slug);if(!p)notFound();
 const url=BASE+"/cs/"+p.slug;
 const wa="https://wa.me/84937762607?text="+encodeURIComponent("Dobrý den, mám zájem o cestu: "+p.title+". Prosím o informace o dostupnosti, ceně a zahrnutých službách.");
 const schema={"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"GoVietStay",item:BASE},{"@type":"ListItem",position:2,name:"České průvodce Vietnamem",item:BASE+"/cs/stredni-vietnam"},{"@type":"ListItem",position:3,name:p.title,item:url}]},{"@type":"TouristDestination",name:p.title,description:p.meta,url,inLanguage:"cs-CZ"},{"@type":"FAQPage",mainEntity:p.faq.map(x=>({"@type":"Question",name:x.q,acceptedAnswer:{"@type":"Answer",text:x.a}}))}]};
 return <div lang="cs-CZ" className="min-h-screen bg-[#f5f7f4] text-slate-900">
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
 <div className="bg-emerald-950 px-5 py-3 text-center text-sm font-semibold text-white">GoVietStay · Trusted Local Support · Vietnam</div>
 <header className="bg-white border-b border-emerald-100"><div className="mx-auto max-w-6xl px-5 py-5 flex flex-wrap items-center justify-between gap-5">
 <a href="/" className="text-xl font-extrabold text-emerald-950">GoVietStay</a><nav aria-label="Průvodce oblastmi" className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-900">
 {czechGuides.map(g=><a key={g.slug} href={"/cs/"+g.slug} aria-current={g.slug===slug?"page":undefined} className="underline underline-offset-4">{g.slug==="stredni-vietnam"?"Da Nang · Hoi An · Hue":g.slug==="phu-quoc"?"Phu Quoc":"Ho Tram"}</a>)}</nav></div></header>
 <main><section className="relative isolate bg-emerald-950 text-white overflow-hidden">
 <Image src={p.image} alt={p.imageAlt} fill priority sizes="100vw" className="-z-20 object-cover"/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/40"/>
 <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28"><p className="text-emerald-100 font-semibold uppercase tracking-widest text-sm">Vietnam · Cestovní průvodce v češtině</p><h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl font-extrabold leading-tight">{p.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8">{p.intro}</p><div className="mt-8 flex flex-wrap gap-3"><a href="#pruvodce" className="rounded-full bg-white px-6 py-3.5 font-bold text-emerald-950">Prozkoumat průvodce</a><a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white px-6 py-3.5 font-bold text-white">Zeptat se na cestu · WhatsApp</a></div></div></section>
 <div className="mx-auto max-w-6xl px-5 py-12"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{p.highlights.map(h=><div key={h} className="rounded-xl bg-white border border-emerald-100 p-5 font-bold text-emerald-900">{h}</div>)}</div>
 <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7"><strong>Důležité:</strong> Ceny, otevírací doba, vstupenky a dostupnost služeb se mohou změnit. Konkrétní podmínky, jazyk průvodce a storno pravidla vždy potvrzujeme před rezervací. Český text stránky neznamená automaticky česky mluvícího průvodce.</div>
 <div id="pruvodce" className="mt-12 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]"><aside><nav aria-label="Obsah průvodce" className="lg:sticky lg:top-6 rounded-2xl bg-white p-6 border border-slate-200"><h2 className="text-xl font-bold mb-4">Obsah průvodce</h2>{p.sections.map((s,i)=><a className="block py-2 text-emerald-900 underline underline-offset-4" href={"#cast-"+i} key={s.title}>{s.title}</a>)}<a href="#plan" className="block py-2 text-emerald-900">Návrh itineráře</a><a href="#faq" className="block py-2 text-emerald-900">Časté otázky</a></nav></aside>
 <article className="space-y-6">{p.sections.map((s,i)=><section id={"cast-"+i} key={s.title} className="scroll-mt-6 rounded-2xl bg-white p-6 sm:p-9 border border-slate-200"><h2 className="text-2xl font-extrabold text-emerald-950">{s.title}</h2><p className="mt-5 leading-8 text-lg text-slate-700">{s.text}</p></section>)}
 <section id="plan" className="rounded-2xl bg-white p-6 sm:p-9 border border-slate-200"><h2 className="text-2xl font-extrabold text-emerald-950">Orientační plán cesty</h2><p className="mt-3 leading-7">Následující návrh není pevně rezervovaný zájezd. Trasu upravíme podle počasí, zájmů a dostupnosti.</p><ol className="mt-5 list-decimal pl-6 space-y-3 leading-7">{p.days.map(d=><li key={d}>{d}</li>)}</ol></section>
 <section id="faq" className="rounded-2xl bg-white p-6 sm:p-9 border border-slate-200"><h2 className="text-2xl font-extrabold text-emerald-950">Časté otázky</h2>{p.faq.map(x=><div key={x.q} className="mt-6 border-t border-slate-200 pt-5"><h3 className="font-bold text-lg">{x.q}</h3><p className="mt-2 leading-7 text-slate-700">{x.a}</p></div>)}</section>
 <section className="rounded-2xl bg-emerald-950 p-7 sm:p-10 text-white"><h2 className="text-2xl font-bold">Naplánujte cestu s místní podporou</h2><p className="mt-4 leading-7">Napište nám termín, počet cestujících a požadované zážitky. Připravíme návrh a předem vysvětlíme, co je a není v ceně. Komunikace a potvrzení služeb probíhají podle dostupných jazykových možností.</p><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 rounded-full bg-white px-6 py-3.5 text-emerald-950 font-bold">Poslat poptávku přes WhatsApp</a></section></article></div>
 <section className="mt-14"><h2 className="text-2xl font-bold text-emerald-950">Další oblasti GoVietStay</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{czechGuides.filter(g=>g.slug!==slug).map(g=><a key={g.slug} href={"/cs/"+g.slug} className="rounded-2xl border border-emerald-100 bg-white p-6 text-emerald-950 font-semibold underline underline-offset-4">{g.title}</a>)}</div></section>
 </div></main></div>;
}
