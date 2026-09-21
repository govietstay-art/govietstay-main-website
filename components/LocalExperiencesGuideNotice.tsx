import Link from 'next/link';
import {signatureSlugs,signaturePath,findSignature,type SignatureLocale} from '../lib/daNangSignatureExperiences';

const text:Record<SignatureLocale,{title:string;body:string;more:string}>={
 en:{title:'Guide language: English is standard',body:'A Russian- or Italian-speaking guide is not included by default. Contact us in advance so we can check availability and any additional charge.',more:'Explore our other private experiences'},
 ru:{title:'Язык гида: стандартно английский',body:'Русскоязычный или италоязычный гид не включён по умолчанию. Свяжитесь с нами заранее: проверим наличие и возможную доплату.',more:'Другие индивидуальные впечатления'},
 it:{title:'Lingua della guida: inglese standard',body:'La guida in italiano o russo non è inclusa automaticamente. Contattateci in anticipo per verificare disponibilità ed eventuale supplemento.',more:'Altre esperienze private'},
};
export default function LocalExperiencesGuideNotice({locale}:{locale:SignatureLocale}){
 const t=text[locale];
 return <>
  <aside lang={locale} className="mx-auto max-w-7xl px-5 pt-5 text-slate-900 sm:px-8" role="note"><div className="rounded-2xl border-2 border-emerald-700 bg-emerald-50 px-5 py-4"><strong className="text-lg text-teal-950">{t.title}</strong><p className="mt-1 leading-relaxed text-slate-800">{t.body}</p></div></aside>
  <nav aria-label={t.more} className="mx-auto max-w-7xl px-5 py-9 sm:px-8"><h2 className="mb-4 text-2xl font-bold text-teal-950">{t.more}</h2><div className="grid gap-3 md:grid-cols-3">{signatureSlugs.map(slug=>{const p=findSignature(slug);return p?<Link className="rounded-xl border border-teal-200 bg-white p-5 font-semibold text-teal-900 hover:border-teal-700" key={slug} href={signaturePath(locale,slug)}>{p.name} →</Link>:null;})}</div></nav>
 </>;
}
