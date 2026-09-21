import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  NIGHT_BASE, NIGHT_SLUG, nightCopy, nightPath, priceReference,
  type NightLocale,
} from '../lib/nightBitesCityLights';

const supported: NightLocale[] = ['en', 'ru', 'it'];
const languageNames: Record<NightLocale,string> = {en:'English',ru:'Русский',it:'Italiano'};
const photos = [
 {file:'Dragon Bridge at night (Danang) - DSC02093.JPG', author:'Daderot',license:'CC0 1.0',href:'https://commons.wikimedia.org/wiki/File:Dragon_Bridge_at_night_(Danang)_-_DSC02093.JPG',licenseHref:'https://creativecommons.org/publicdomain/zero/1.0/'},
 {file:'Mi Quang 1A Danang.jpg',author:'Jpatokal',license:'CC BY-SA 4.0',href:'https://commons.wikimedia.org/wiki/File:Mi_Quang_1A_Danang.jpg',licenseHref:'https://creativecommons.org/licenses/by-sa/4.0/'},
 {file:'Han River at night - Da Nang, Vietnam - DSC02111.JPG',author:'Daderot',license:'CC0 1.0',href:'https://commons.wikimedia.org/wiki/File:Han_River_at_night_-_Da_Nang,_Vietnam_-_DSC02111.JPG',licenseHref:'https://creativecommons.org/publicdomain/zero/1.0/'},
 {file:'Han River walkway at night - Da Nang, Vietnam - DSC02131.JPG',author:'Daderot',license:'CC0 1.0',href:'https://commons.wikimedia.org/wiki/File:Han_River_walkway_at_night_-_Da_Nang,_Vietnam_-_DSC02131.JPG',licenseHref:'https://creativecommons.org/publicdomain/zero/1.0/'},
] as const;

// Licensed Wikimedia Commons files. These are city illustrations, NEVER photos
// represented as GoVietStay guests or a verified tour operation.
const photoSrc = (file:string,width=1280) =>
 `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
const localizedPrice = (price:number,locale:NightLocale) =>
 `${price.toLocaleString(locale === 'ru' ? 'ru-RU' : locale === 'it' ? 'it-IT' : 'en-US')} VND`;

export function nightMetadata(locale:NightLocale):Metadata {
 const copy=nightCopy[locale];
 const canonical=`${NIGHT_BASE}${nightPath(locale)}`;
 return {
  title:{absolute:copy.title},description:copy.description,keywords:copy.keywords,
  alternates:{canonical,languages:{
   en:`${NIGHT_BASE}${nightPath('en')}`,ru:`${NIGHT_BASE}${nightPath('ru')}`,
   'it-IT':`${NIGHT_BASE}${nightPath('it')}`,'x-default':`${NIGHT_BASE}${nightPath('en')}`,
  }},
  // SUPPLIER/PRICE GATE: do not index preview, submit URL, or mark as bookable.
  robots:{index:false,follow:false},
  openGraph:{type:'website',siteName:'GoVietStay',url:canonical,
   title:copy.title,description:copy.description,
   locale:locale==='ru'?'ru_RU':locale==='it'?'it_IT':'en_US',
   images:[{url:`${NIGHT_BASE}/govietstay-logo.jpg`,alt:'GoVietStay logo'}]},
 };
}

function structuredData(locale:NightLocale){
 const copy=nightCopy[locale];const url=`${NIGHT_BASE}${nightPath(locale)}`;
 return {'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:copy.title,description:copy.description,
   inLanguage:locale==='it'?'it-IT':locale,isPartOf:{'@id':`${NIGHT_BASE}/#website`},
   about:[{'@type':'Place',name:'Da Nang, Vietnam'},{'@type':'Place',name:'Han River, Da Nang'}]},
  {'@type':'BreadcrumbList',itemListElement:[
   {'@type':'ListItem',position:1,name:'GoVietStay',item:NIGHT_BASE},
   {'@type':'ListItem',position:2,name:'Da Nang',item:locale==='en'?`${NIGHT_BASE}/travel/da-nang-travel-guide`:`${NIGHT_BASE}/${locale}`},
   {'@type':'ListItem',position:3,name:copy.h1,item:url},
  ]},
  {'@type':'FAQPage',mainEntity:copy.faq.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
  // No Product, Offer, prices in structured data, Event or AggregateRating until
  // the product is genuinely on sale with independently confirmed terms.
 ]};
}

function Quote({locale,style='filled'}:{locale:NightLocale;style?:'filled'|'light'}){
 const copy=nightCopy[locale];
 const greetings:Record<NightLocale,string>={
  en:'Hello GoVietStay, I would like a confirmed quotation for Night Bites & City Lights. Date: ... Guests: ... Hotel: ... Guide language: ... Cruise option: yes/no. Please confirm the final price, transport, included services and cancellation policy.',
  ru:'Здравствуйте! Прошу точный расчёт Night Bites & City Lights. Дата: ... Гости: ... Отель: ... Язык гида: ... Круиз: да/нет. Подтвердите итоговую цену, транспорт, включённые услуги и условия отмены.',
  it:'Buongiorno! Vorrei un preventivo confermato per Night Bites & City Lights. Data: ... Partecipanti: ... Hotel: ... Lingua guida: ... Crociera: sì/no. Confermate prezzo finale, mezzo, inclusioni e cancellazione.',
 };
 return <a href={`https://wa.me/84937762607?text=${encodeURIComponent(greetings[locale])}`}
  target="_blank" rel="noopener noreferrer"
  className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-bold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${style==='light'?'bg-white text-teal-950 hover:bg-teal-50':'bg-teal-700 text-white hover:bg-teal-800'}`}>
   {copy.ask} <span aria-hidden="true" className="ml-2">↗</span>
 </a>;
}

export default function NightBitesCityLightsPage({locale}:{locale:NightLocale}){
 const c=nightCopy[locale];
 const json=JSON.stringify(structuredData(locale)).replace(/</g,'\\u003c');
 const base=localizedPrice(priceReference.proposedWithoutCruiseVnd,locale);
 const cruise=localizedPrice(priceReference.proposedWithCruiseVnd,locale);
 return <main lang={locale} className="min-h-screen bg-[#f7faf8] text-slate-900">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:json}} />
  <nav aria-label="GoVietStay navigation and languages" className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 sm:px-8">
   <Link href={locale==='en'?'/travel':`/${locale}`} aria-label="GoVietStay" className="mr-auto flex items-center gap-3">
    <Image src="/govietstay-logo.jpg" width={64} height={64} alt="GoVietStay official logo" className="h-12 w-12 rounded-lg bg-white object-contain" />
    <span className="leading-tight"><strong className="block text-lg text-teal-950">GoVietStay</strong><span className="text-xs tracking-widest text-teal-700">TRUSTED LOCAL SUPPORT</span></span>
   </Link>
   <span className="hidden text-sm text-slate-600 sm:inline">{c.language}</span>
   {supported.map(lang=><Link key={lang} href={nightPath(lang)} hrefLang={lang==='it'?'it-IT':lang}
    aria-current={lang===locale?'page':undefined}
    className={`rounded-full border px-3 py-2 text-sm font-semibold ${locale===lang?'border-teal-800 bg-teal-800 text-white':'border-teal-200 bg-white text-teal-800 hover:border-teal-700'}`}>{languageNames[lang]}</Link>)}
  </nav>

  <header className="relative isolate min-h-[580px] overflow-hidden bg-teal-950 text-white">
   {/* This is a CC0 destination illustration, not a GoVietStay tour image. */}
   <img src={photoSrc(photos[0].file,1600)} alt={c.photoAlt[0]} width={1600} height={840} fetchPriority="high"
    className="absolute inset-0 h-full w-full object-cover" />
   <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30" aria-hidden="true" />
   <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col justify-center px-5 py-16 sm:px-8">
    <p className="text-xs font-extrabold tracking-[0.24em] text-emerald-300 uppercase">{c.kicker}</p>
    <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold sm:text-6xl">{c.h1}</h1>
    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl">{c.tagline}</p>
    <div className="mt-7 flex max-w-3xl flex-wrap gap-3 text-sm text-white">
     <span className="rounded-full border border-white/30 bg-black/30 px-4 py-2">{c.duration}</span>
     <span className="rounded-full border border-white/30 bg-black/30 px-4 py-2">{c.availability}</span>
    </div>
    <div className="mt-8 flex flex-wrap items-center gap-4"><Quote locale={locale} style="light"/><a href="#journey" className="font-semibold underline underline-offset-4">{c.explore} ↓</a></div>
    <p className="mt-5 max-w-xl text-xs text-slate-200">{c.sourcePhoto}</p>
   </div>
  </header>

  <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
   <aside className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-5 text-amber-950" role="note">
    <strong className="block text-sm">{c.ribbon}</strong><p className="mt-2 max-w-5xl text-sm leading-relaxed">{c.truth}</p>
   </aside>
   <section aria-label={c.priceLabel} className="mt-8 grid gap-4 rounded-3xl border border-teal-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_1.2fr] md:items-center sm:p-7">
    <div><p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{c.priceLabel}</p><p className="mt-2 text-sm font-semibold text-slate-700">{c.noCruise}</p><p className="mt-1 text-3xl font-extrabold text-teal-900">{base}</p></div>
    <div className="border-t border-slate-200 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6"><p className="text-sm font-semibold text-slate-700">{c.withCruise}</p><p className="mt-1 text-3xl font-extrabold text-teal-900">{cruise}</p></div>
    <p className="border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600 md:border-t-0 md:border-l md:pt-0 md:pl-6">{c.priceCondition}</p>
   </section>

   <section aria-labelledby="story-title" className="grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
    <div><p className="text-xs font-bold tracking-[0.2em] text-teal-700 uppercase">01 · {c.h1}</p><h2 id="story-title" className="mt-3 max-w-xl text-3xl leading-tight font-extrabold text-teal-950 sm:text-4xl">{c.introTitle}</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">{c.intro}</p></div>
    <figure className="overflow-hidden rounded-3xl bg-slate-100 shadow-lg"><img src={photoSrc(photos[2].file,1080)} alt={c.photoAlt[2]} width={1080} height={680} loading="lazy" className="aspect-[4/3] w-full object-cover"/><figcaption className="px-4 py-3 text-xs text-slate-600">{c.sourcePhoto}</figcaption></figure>
   </section>

   <section aria-labelledby="who-title" className="rounded-3xl bg-[#e7f3ed] px-6 py-10 sm:px-10">
    <h2 id="who-title" className="text-3xl font-extrabold text-teal-950">{c.whoTitle}</h2>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">{c.who.map((point,i)=><div key={i} className="rounded-2xl border border-teal-200 bg-white px-5 py-5 leading-relaxed text-slate-800"><span aria-hidden="true" className="mr-2 text-teal-700">✦</span>{point}</div>)}</div>
   </section>

   <section aria-labelledby="journey-title" id="journey" className="scroll-mt-8 py-16">
    <h2 id="journey-title" className="text-3xl font-extrabold text-teal-950 sm:text-4xl">{c.journeyTitle}</h2>
    <p className="mt-3 max-w-4xl leading-relaxed text-slate-600">{c.journeyIntro}</p>
    <div className="mt-9 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
     <ol className="space-y-4">{c.itinerary.map((step,i)=><li key={step.time} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex h-12 w-24 shrink-0 items-center justify-center rounded-xl bg-teal-950 px-2 text-center text-xs font-bold text-white sm:text-sm">{step.time}</span>
      <div><h3 className="text-lg font-extrabold text-teal-950">{step.title}</h3><p className="mt-2 leading-relaxed text-slate-700">{step.detail}</p></div>
     </li>)}</ol>
     <div className="space-y-4">
      <figure className="overflow-hidden rounded-2xl bg-white shadow-sm"><img src={photoSrc(photos[1].file,780)} alt={c.photoAlt[1]} width={780} height={580} loading="lazy" className="aspect-[4/3] w-full object-cover"/><figcaption className="p-3 text-xs text-slate-600">{c.sourcePhoto}</figcaption></figure>
      <figure className="overflow-hidden rounded-2xl bg-white shadow-sm"><img src={photoSrc(photos[3].file,780)} alt={c.photoAlt[3]} width={780} height={580} loading="lazy" className="aspect-[4/3] w-full object-cover"/><figcaption className="p-3 text-xs text-slate-600">{c.sourcePhoto}</figcaption></figure>
     </div>
    </div>
   </section>

   <section aria-labelledby="difference-title" className="rounded-3xl bg-teal-950 px-6 py-10 text-white sm:px-10">
    <h2 id="difference-title" className="text-3xl font-extrabold">{c.differencesTitle}</h2>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{c.differences.map((item,i)=><p key={i} className="rounded-2xl border border-teal-500/50 bg-white/5 px-5 py-5 leading-relaxed"><span className="mb-2 block text-emerald-300">0{i+1}</span>{item}</p>)}</div>
   </section>

   <section aria-labelledby="price-title" id="price" className="scroll-mt-6 py-16">
    <h2 id="price-title" className="text-3xl font-extrabold text-teal-950 sm:text-4xl">{c.priceHeading}</h2>
    <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">{c.priceCondition}</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">
     {[{name:c.baseTitle,amount:base,features:c.baseFeatures},{name:c.cruisePackageTitle,amount:cruise,features:c.cruiseFeatures}].map(pack=><div key={pack.name} className="flex flex-col rounded-3xl border border-teal-200 bg-white p-7 shadow-sm">
      <h3 className="text-xl font-extrabold text-teal-950">{pack.name}</h3><p className="mt-4 text-4xl font-extrabold text-teal-800">{pack.amount}</p><p className="mt-1 text-xs text-slate-600">{c.priceLabel} · {c.ribbon}</p>
      <ul className="mt-6 flex-1 space-y-3">{pack.features.map(f=><li key={f} className="flex gap-2 text-sm leading-relaxed text-slate-700"><span className="text-teal-700" aria-hidden="true">✓</span>{f}</li>)}</ul>
      <div className="mt-7"><Quote locale={locale}/></div>
     </div>)}
    </div>
    <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">{c.finalPrice}</p>
   </section>

   <div className="grid gap-6 pb-14 lg:grid-cols-2">
    <section className="rounded-3xl border border-slate-200 bg-white p-7"><h2 className="text-2xl font-extrabold text-teal-950">{c.inclusionsTitle}</h2><ul className="mt-5 space-y-3 pl-5 list-disc leading-relaxed text-slate-700">{c.intended.map(item=><li key={item}>{item}</li>)}</ul></section>
    <section className="rounded-3xl border border-slate-200 bg-white p-7"><h2 className="text-2xl font-extrabold text-teal-950">{c.excludedTitle}</h2><ul className="mt-5 space-y-3 pl-5 list-disc leading-relaxed text-slate-700">{c.excluded.map(item=><li key={item}>{item}</li>)}</ul></section>
   </div>
   <div className="grid gap-5 pb-14 md:grid-cols-2">
    <section className="rounded-3xl bg-[#e7f3ed] p-7"><h2 className="text-2xl font-extrabold text-teal-950">{c.cruiseTitle}</h2><p className="mt-4 leading-relaxed text-slate-700">{c.cruiseText}</p></section>
    <section className="rounded-3xl bg-[#e7f3ed] p-7"><h2 className="text-2xl font-extrabold text-teal-950">{c.safetyTitle}</h2><p className="mt-4 leading-relaxed text-slate-700">{c.safety}</p>
     <a target="_blank" rel="noopener noreferrer" href="https://danangfantasticity.com/en/travel-information/key-times-to-save-for-your-da-nang-travel-itinerary" className="mt-4 inline-block text-xs font-bold text-teal-800 underline underline-offset-4">Da Nang official tourism event schedule ↗</a>
    </section>
   </div>

   <section aria-labelledby="faq-title" className="pb-16"><h2 id="faq-title" className="text-3xl font-extrabold text-teal-950 sm:text-4xl">{c.faqTitle}</h2>
    <div className="mt-7 space-y-3">{c.faq.map(({q,a})=><details key={q} className="rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-500"><summary className="cursor-pointer text-lg font-bold text-teal-950">{q}</summary><p className="mt-4 max-w-5xl leading-relaxed text-slate-700">{a}</p></details>)}</div>
   </section>

   <section className="rounded-3xl bg-gradient-to-br from-teal-950 to-teal-700 p-7 text-white sm:p-12">
    <div className="flex flex-wrap items-center gap-3"><Image src="/govietstay-logo.jpg" width={60} height={60} alt="GoVietStay official logo" className="h-14 w-14 rounded-xl bg-white object-contain"/><span className="text-sm font-bold tracking-widest">GOVIETSTAY · TRUSTED LOCAL SUPPORT</span></div>
    <h2 className="mt-6 max-w-3xl text-3xl font-extrabold sm:text-4xl">{c.planningCTA}</h2><p className="mt-4 max-w-3xl leading-relaxed text-teal-50">{c.ctaHint}</p>
    <div className="mt-7"><Quote locale={locale} style="light"/></div>
   </section>

   <footer className="mt-12 border-t border-teal-200 pt-6 pb-12 text-sm text-slate-600">
    <p className="font-bold text-teal-950">GoVietStay · Trusted Local Support · Da Nang</p>
    <p className="mt-3">{c.sourcePhoto}</p>
    <details className="mt-3"><summary className="cursor-pointer font-semibold text-teal-900">{c.credit}</summary>
     <ul className="mt-3 space-y-2">{photos.map(p=><li key={p.file}><a className="underline underline-offset-2" href={p.href} target="_blank" rel="noopener noreferrer">{p.file} — {p.author}</a> · <a className="underline underline-offset-2" href={p.licenseHref} target="_blank" rel="noopener noreferrer">{p.license}</a></li>)}</ul>
    </details>
    <p className="mt-5"><Link className="font-semibold text-teal-800 underline underline-offset-4" href={locale==='en'?'/travel/da-nang-travel-guide':`/${locale}`}>← {c.back}</Link></p>
   </footer>
  </div>
 </main>;
}
