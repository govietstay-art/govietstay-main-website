import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
 SIGNATURE_SITE, signaturePath, signatureSlugs, findSignature,
 type SignatureLocale, type SignatureExperience, type Credit,
} from '../lib/daNangSignatureExperiences';
import {nightPath} from '../lib/nightBitesCityLights';

const locales:SignatureLocale[]=['en','ru','it'];
const languageLabels:Record<SignatureLocale,string>={en:'English',ru:'Русский',it:'Italiano'};
const general:Record<SignatureLocale,{
 price:string; confirmed:string; guideTitle:string; routeLink:string; note:string; inRoute:string; elsewhere:string;
}>={
 en:{price:'Pricing & availability',confirmed:'Request a clear, written quote',guideTitle:'Guide language — important',routeLink:'See the sample itinerary',note:'Sample program · final details agreed before booking',inRoute:'Explore this experience',elsewhere:'Night Bites & City Lights'},
 ru:{price:'Цена и доступность',confirmed:'Запросить подробный расчёт',guideTitle:'Язык гида — важная информация',routeLink:'Посмотреть пример программы',note:'Пример маршрута · детали согласуются до бронирования',inRoute:'Узнать подробнее',elsewhere:'Night Bites & City Lights · Вечерний Дананг'},
 it:{price:'Prezzo e disponibilità',confirmed:'Richiedi un preventivo completo',guideTitle:'Lingua della guida: informazioni importanti',routeLink:'Vedi il programma indicativo',note:'Programma indicativo · dettagli concordati prima della prenotazione',inRoute:'Scopri l’esperienza',elsewhere:'Night Bites & City Lights · Da Nang di sera'},
};
const imageUrl=(file:string,width:number)=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export function signatureMetadata(locale:SignatureLocale,experience:SignatureExperience):Metadata{
 const c=experience.copies[locale];
 const canonical=`${SIGNATURE_SITE}${signaturePath(locale,experience.slug)}`;
 return {
  title:{absolute:c.title},description:c.description,keywords:c.keywords,
  alternates:{canonical,languages:{
   en:`${SIGNATURE_SITE}${signaturePath('en',experience.slug)}`,
   ru:`${SIGNATURE_SITE}${signaturePath('ru',experience.slug)}`,
   'it-IT':`${SIGNATURE_SITE}${signaturePath('it',experience.slug)}`,
   'x-default':`${SIGNATURE_SITE}${signaturePath('en',experience.slug)}`,
  }},
  // These pages describe a real bespoke inquiry service. No invented availability,
  // listed price, review, reservation, or Offer/aggregateRating markup.
  robots:{index:true,follow:true},
  openGraph:{type:'website',siteName:'GoVietStay',url:canonical,title:c.title,description:c.description,
   locale:locale==='ru'?'ru_RU':locale==='it'?'it_IT':'en_US',
   images:[{url:`${SIGNATURE_SITE}/govietstay-logo.jpg`,alt:'GoVietStay official logo'}]},
 };
}
function jsonLd(locale:SignatureLocale,experience:SignatureExperience){
 const c=experience.copies[locale]; const url=`${SIGNATURE_SITE}${signaturePath(locale,experience.slug)}`;
 return {'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:c.title,description:c.description,
   inLanguage:locale==='it'?'it-IT':locale,isPartOf:{'@id':`${SIGNATURE_SITE}/#website`},
   about:{'@type':'Place',name:'Da Nang, Vietnam'}},
  {'@type':'BreadcrumbList',itemListElement:[
   {'@type':'ListItem',position:1,name:'GoVietStay',item:SIGNATURE_SITE},
   {'@type':'ListItem',position:2,name:'Da Nang',item:locale==='en'?`${SIGNATURE_SITE}/travel/da-nang-travel-guide`:`${SIGNATURE_SITE}/${locale}`},
   {'@type':'ListItem',position:3,name:c.h1,item:url},
  ]},
  {'@type':'FAQPage',mainEntity:c.faq.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
 ]};
}
function Quote({locale,experience,light=false}:{locale:SignatureLocale;experience:SignatureExperience;light?:boolean}){
 const c=experience.copies[locale];
 const messages:Record<SignatureLocale,string>={
  en:`Hello GoVietStay, please quote ${experience.name}. Travel date: ... Adults/children and ages: ... Hotel: ... English guide (standard), or please check Russian/Italian: ... Walking/vehicle preferences: ... Please confirm final inclusions, price and cancellation terms.`,
  ru:`Здравствуйте! Прошу рассчитать ${experience.name}. Дата: ... Взрослые/дети и возраст: ... Отель: ... Гид на английском (стандарт) или запрос русского/итальянского: ... Предпочтения по прогулке/машине: ... Подтвердите цену, включённые услуги и отмену.`,
  it:`Buongiorno GoVietStay, vorrei un preventivo per ${experience.name}. Data: ... Adulti/bambini ed età: ... Hotel: ... Guida in inglese (standard) oppure richiesta italiano/russo: ... Preferenze a piedi/in auto: ... Confermate prezzo, servizi inclusi e cancellazione.`,
 };
 return <a href={`https://wa.me/84937762607?text=${encodeURIComponent(messages[locale])}`} target="_blank" rel="noopener noreferrer"
  className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-bold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${light?'bg-white text-teal-950 hover:bg-teal-50':'bg-teal-700 text-white hover:bg-teal-800'}`}>
  {c.ask}<span className="ml-2" aria-hidden="true">↗</span>
 </a>;
}
function Photo({credit,alt,w=960,h=680,hero=false,caption}:{credit:Credit;alt:string;w?:number;h?:number;hero?:boolean;caption?:string}){
 return <figure className={`overflow-hidden ${hero?'absolute inset-0':'rounded-3xl bg-white shadow-sm'}`}>
  {/* Photos are credited Commons destination illustrations, not GoVietStay customer photos. */}
  <img src={imageUrl(credit.file,w)} alt={alt} width={w} height={h} loading={hero?undefined:'lazy'}
   fetchPriority={hero?'high':undefined} className={`w-full object-cover ${hero?'h-full':'aspect-[4/3]'}`}/>
  {!hero&&caption&&<figcaption className="p-3 text-xs leading-relaxed text-slate-600">{caption}</figcaption>}
 </figure>;
}
export default function DaNangSignaturePage({locale,experience}:{locale:SignatureLocale;experience:SignatureExperience}){
 const c=experience.copies[locale]; const t=general[locale];
 const ld=JSON.stringify(jsonLd(locale,experience)).replace(/</g,'\\u003c');
 const other=signatureSlugs.filter(slug=>slug!==experience.slug);
 return <main lang={locale} className="min-h-screen bg-[#f7faf8] text-slate-900">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:ld}}/>
  <nav aria-label="GoVietStay navigation and languages" className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 sm:px-8">
   <Link href={locale==='en'?'/travel':`/${locale}`} aria-label="GoVietStay" className="mr-auto flex items-center gap-3">
    <Image src="/govietstay-logo.jpg" width={64} height={64} alt="GoVietStay official logo" className="h-12 w-12 rounded-lg bg-white object-contain"/>
    <span className="leading-tight"><strong className="block text-lg text-teal-950">GoVietStay</strong><span className="text-xs tracking-widest text-teal-700">TRUSTED LOCAL SUPPORT</span></span>
   </Link>
   <span className="hidden text-sm text-slate-600 sm:inline">{c.language}</span>
   {locales.map(lang=><Link key={lang} href={signaturePath(lang,experience.slug)} hrefLang={lang==='it'?'it-IT':lang} aria-current={lang===locale?'page':undefined}
    className={`rounded-full border px-3 py-2 text-sm font-semibold ${lang===locale?'border-teal-800 bg-teal-800 text-white':'border-teal-200 bg-white text-teal-800 hover:border-teal-700'}`}>{languageLabels[lang]}</Link>)}
  </nav>
  <header className="relative isolate min-h-[580px] overflow-hidden bg-teal-950 text-white">
   <Photo hero credit={experience.photographs[0]} alt={c.photoAlt[0]} w={1600} h={840}/>
   <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30" aria-hidden="true"/>
   <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col justify-center px-5 py-16 sm:px-8">
    <p className="text-xs font-extrabold tracking-[0.22em] text-emerald-300 uppercase">{c.eyebrow}</p>
    <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-extrabold sm:text-6xl">{c.h1}</h1>
    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl">{c.hero}</p>
    <div className="mt-7 flex flex-wrap gap-3 text-sm"><span className="rounded-full border border-white/30 bg-black/30 px-4 py-2">{c.duration}</span><span className="rounded-full border border-white/30 bg-black/30 px-4 py-2">{t.note}</span></div>
    <p className="mt-5 max-w-2xl rounded-xl border border-emerald-300/40 bg-black/40 p-4 text-sm leading-relaxed text-white"><strong>{t.guideTitle}:</strong> {c.guide}</p>
    <div className="mt-8 flex flex-wrap items-center gap-5"><Quote locale={locale} experience={experience} light/><a href="#journey" className="font-semibold underline underline-offset-4">{t.routeLink} ↓</a></div>
    <p className="mt-5 max-w-xl text-xs text-slate-200">{c.sourceNote}</p>
   </div>
  </header>
  <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
   <aside role="note" className="rounded-2xl border border-teal-200 bg-teal-50 px-5 py-5 text-teal-950"><strong>{t.note}</strong><p className="mt-2 text-sm leading-relaxed">{c.notice}</p></aside>
   <section aria-labelledby="price-heading" id="price" className="mt-8 grid gap-5 rounded-3xl border border-teal-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_1fr] md:items-center sm:p-8">
    <div><p className="text-xs font-bold tracking-widest text-teal-700 uppercase">{t.price}</p><h2 id="price-heading" className="mt-2 text-3xl font-extrabold text-teal-950">{c.price}</h2><p className="mt-3 leading-relaxed text-slate-600">{c.priceDetail}</p></div>
    <div className="md:border-l md:border-slate-200 md:pl-7"><p className="mb-4 font-bold text-teal-950">{t.confirmed}</p><Quote locale={locale} experience={experience}/><p className="mt-5 text-sm leading-relaxed text-slate-700"><strong>{t.guideTitle}:</strong> {c.guide}</p></div>
   </section>
   <section className="grid gap-9 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
    <div><p className="text-xs font-bold tracking-widest text-teal-700 uppercase">01 · {c.h1}</p><h2 className="mt-3 text-3xl leading-tight font-extrabold text-teal-950 sm:text-4xl">{c.storyQuestion}</h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">{c.story}</p></div>
    <Photo credit={experience.photographs[1]} alt={c.photoAlt[1]} w={1080} h={720} caption={c.sourceNote}/>
   </section>
   <section className="rounded-3xl bg-[#e7f3ed] px-6 py-10 sm:px-10"><h2 className="text-3xl font-extrabold text-teal-950">{c.whoHeading}</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{c.who.map(point=><p key={point} className="rounded-2xl border border-teal-200 bg-white px-5 py-5 leading-relaxed text-slate-800"><span className="mr-2 text-teal-700" aria-hidden="true">✦</span>{point}</p>)}</div></section>
   <section id="journey" className="scroll-mt-8 py-16"><h2 className="text-3xl font-extrabold text-teal-950 sm:text-4xl">{c.routeHeading}</h2><p className="mt-3 max-w-4xl leading-relaxed text-slate-600">{c.routeNote}</p>
    <div className="mt-9 grid gap-9 lg:grid-cols-[1.25fr_0.75fr]"><ol className="space-y-4">{c.stops.map(stop=><li key={stop.time} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="flex h-12 w-24 shrink-0 items-center justify-center rounded-xl bg-teal-950 px-2 text-center text-xs font-bold text-white sm:text-sm">{stop.time}</span><div><h3 className="text-lg font-extrabold text-teal-950">{stop.title}</h3><p className="mt-2 leading-relaxed text-slate-700">{stop.body}</p></div></li>)}</ol>
     <div className="space-y-4"><Photo credit={experience.photographs[2]} alt={c.photoAlt[2]} w={780} h={580} caption={c.sourceNote}/><Photo credit={experience.photographs[3]} alt={c.photoAlt[3]} w={780} h={580} caption={c.sourceNote}/></div>
    </div>
   </section>
   <section className="rounded-3xl bg-teal-950 px-6 py-10 text-white sm:px-10"><h2 className="text-3xl font-extrabold">{c.designHeading}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{c.design.map((item,i)=><p key={item} className="rounded-2xl border border-teal-500/50 bg-white/5 p-5 leading-relaxed"><span className="mb-2 block font-extrabold text-emerald-300">0{i+1}</span>{item}</p>)}</div></section>
   <div className="grid gap-6 py-14 lg:grid-cols-2"><section className="rounded-3xl border border-slate-200 bg-white p-7"><h2 className="text-2xl font-extrabold text-teal-950">{c.includedTitle}</h2><ul className="mt-5 space-y-3 pl-5 list-disc leading-relaxed text-slate-700">{c.intended.map(item=><li key={item}>{item}</li>)}</ul></section><section className="rounded-3xl border border-slate-200 bg-white p-7"><h2 className="text-2xl font-extrabold text-teal-950">{c.extraTitle}</h2><ul className="mt-5 space-y-3 pl-5 list-disc leading-relaxed text-slate-700">{c.extras.map(item=><li key={item}>{item}</li>)}</ul></section></div>
   <section className="pb-16"><h2 className="text-3xl font-extrabold text-teal-950 sm:text-4xl">{c.faqTitle}</h2><div className="mt-7 space-y-3">{c.faq.map(({q,a})=><details key={q} className="rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-500"><summary className="cursor-pointer text-lg font-bold text-teal-950">{q}</summary><p className="mt-4 max-w-5xl leading-relaxed text-slate-700">{a}</p></details>)}</div></section>
   <section className="rounded-3xl bg-gradient-to-br from-teal-950 to-teal-700 p-7 text-white sm:p-12"><div className="flex flex-wrap items-center gap-3"><Image src="/govietstay-logo.jpg" width={60} height={60} alt="GoVietStay official logo" className="h-14 w-14 rounded-xl bg-white object-contain"/><span className="text-sm font-bold tracking-widest">GOVIETSTAY · TRUSTED LOCAL SUPPORT</span></div><h2 className="mt-6 max-w-3xl text-3xl font-extrabold sm:text-4xl">{c.ctaHeading}</h2><p className="mt-4 max-w-3xl leading-relaxed text-teal-50">{c.ctaDescription}</p><div className="mt-7"><Quote locale={locale} experience={experience} light/></div></section>
   <nav aria-label={c.crossHeading} className="mt-14"><h2 className="text-2xl font-extrabold text-teal-950">{c.crossHeading}</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{other.map(slug=>{const e=findSignature(slug);return e?<Link key={slug} href={signaturePath(locale,slug)} className="rounded-2xl border border-teal-200 bg-white p-5 text-lg font-bold text-teal-900 hover:border-teal-600">{e.name} →</Link>:null;})}<Link href={nightPath(locale)} className="rounded-2xl border border-teal-200 bg-white p-5 text-lg font-bold text-teal-900 hover:border-teal-600">{t.elsewhere} →</Link></div></nav>
   <footer className="mt-12 border-t border-teal-200 pt-6 pb-12 text-sm text-slate-600"><p className="font-bold text-teal-950">GoVietStay · Trusted Local Support · Da Nang</p><p className="mt-3">{c.sourceNote}</p><details className="mt-3"><summary className="cursor-pointer font-semibold text-teal-900">{c.creditsHeading}</summary><ul className="mt-3 space-y-2">{experience.photographs.map((p,i)=><li key={p.file}><a className="underline underline-offset-2" href={p.link} target="_blank" rel="noopener noreferrer">{p.file} — {p.author}</a> · <a className="underline underline-offset-2" href={p.licenseUrl} target="_blank" rel="noopener noreferrer">{p.license}</a></li>)}</ul></details><p className="mt-5"><Link href={locale==='en'?'/travel/da-nang-travel-guide':`/${locale}`} className="font-bold text-teal-800 underline underline-offset-4">← {c.back}</Link></p></footer>
  </div>
 </main>;
}
