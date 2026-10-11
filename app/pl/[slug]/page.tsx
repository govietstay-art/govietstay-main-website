import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PolishTravelInquiry from "../../../components/PolishTravelInquiry";
import { getPolishGuide, polishGuides } from "../../../lib/polish-guides";
const BASE="https://www.govietstay.com";
export const dynamicParams=false;

export function generateStaticParams(){ return polishGuides.map((p)=>({slug:p.slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params, page=getPolishGuide(slug);
  if(!page)return {robots:{index:false}};
  const canonical=BASE+"/pl/"+page.slug;
  return {
    title:{absolute:page.metaTitle+" | GoVietStay"},
    description:page.description,
    keywords:page.keywords,
    alternates:{canonical,languages:{"pl-PL":canonical}},
    robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1}},
    openGraph:{type:"article",locale:"pl_PL",url:canonical,siteName:"GoVietStay",title:page.metaTitle,description:page.description,images:[{url:BASE+page.hero,alt:page.heroAlt}]},
    twitter:{card:"summary_large_image",title:page.metaTitle,description:page.description,images:[BASE+page.hero]}
  };
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params,page=getPolishGuide(slug);
  if(!page)notFound();
  const canonical=BASE+"/pl/"+page.slug;
  const wa="https://wa.me/84937762607?text="+encodeURIComponent(page.whatsapp);
  const schema={
    "@context":"https://schema.org",
    "@graph":[
      {"@type":"BreadcrumbList",itemListElement:[
        {"@type":"ListItem",position:1,name:"GoVietStay",item:BASE},
        {"@type":"ListItem",position:2,name:"Wietnam – przewodniki po polsku",item:BASE+"/pl/phu-quoc-przewodnik"},
        {"@type":"ListItem",position:3,name:page.title,item:canonical}
      ]},
      {"@type":"Article","@id":canonical+"#article",
        headline:page.title,description:page.description,
        mainEntityOfPage:canonical, inLanguage:"pl-PL", isAccessibleForFree:true,
        datePublished:"2026-10-11",dateModified:"2026-10-11",
        image:[BASE+page.hero,...page.gallery.map(p=>BASE+p.src)],
        author:{"@type":"Organization",name:"GoVietStay Local Team",url:BASE},
        publisher:{"@id":BASE+"/#organization"},
        about:[{"@type":"Country",name:"Vietnam"},{"@type":"Place",name:"Phu Quoc"},{"@type":"Place",name:"Da Nang"},{"@type":"Place",name:"Hoi An"},{"@type":"Place",name:"Hue"}]
      },
      {"@type":"FAQPage",mainEntity:page.faq.map(x=>({"@type":"Question",name:x.q,acceptedAnswer:{"@type":"Answer",text:x.a}}))}
    ]
  };
  return <div lang="pl-PL" className="min-h-screen bg-[#f5f7f4] text-slate-950">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <div className="bg-emerald-950 px-4 py-2.5 text-center text-sm font-medium text-white">GoVietStay · Lokalna pomoc w Wietnamie · Da Nang · Hoi An · Hue · Phu Quoc</div>
    <header className="border-b border-emerald-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <Image src="/govietstay-logo.jpg" width={44} height={44} alt="GoVietStay" className="h-11 w-11 rounded-xl object-cover" />
          <span><strong className="block text-xl font-extrabold text-emerald-950">GoVietStay</strong><small className="block text-slate-500">Przewodniki dla turystów z Polski</small></span>
        </a>
        <nav aria-label="Główna nawigacja" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-slate-700 sm:text-base">
          <a href="/pl/phu-quoc-przewodnik" className="hover:text-emerald-800">Phu Quoc</a>
          <a href="/pl/phu-quoc-wycieczki-prywatne" className="hover:text-emerald-800">Wycieczki prywatne</a>
          <a href="/pl/danang-hoi-an-hue" className="hover:text-emerald-800">Da Nang · Hue</a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-900 px-5 py-3 text-white hover:bg-emerald-800">WhatsApp</a>
        </nav>
      </div>
    </header>

    <main>
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <Image priority src={page.hero} alt={page.heroAlt} fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/30" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="max-w-3xl text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 sm:text-sm">{page.kicker}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 sm:text-xl">{page.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#przewodnik" className="rounded-full bg-white px-6 py-3.5 font-bold text-emerald-950 hover:bg-emerald-50">Przeczytaj przewodnik ↓</a>
            <a href="#plany" className="rounded-full border border-white/70 bg-white/15 px-6 py-3.5 font-bold text-white hover:bg-white/25">Gotowe trasy</a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <section aria-label="Najważniejsze informacje" className="relative z-10 -mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {page.quick.map(q=><div key={q.label} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-emerald-900">{q.label}</h2><p className="mt-2 text-base leading-7 text-slate-700">{q.value}</p>
          </div>)}
        </section>

        <div className="mt-9 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-base leading-8 text-amber-950">
          <strong>Ważne przed podróżą:</strong> zasady wjazdu, rozkłady lotów, bilety i godziny atrakcji mogą ulec zmianie. Rejsy zależą od warunków na morzu. Informacje sprawdzono przy opracowaniu przewodnika 11 października 2026 r.; konkretne daty i ceny należy potwierdzić.
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[270px_minmax(0,1fr)]" id="przewodnik">
          <aside className="self-start lg:sticky lg:top-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-extrabold text-emerald-950">W tym przewodniku</h2>
              <nav aria-label="Spis treści" className="mt-5 flex flex-col gap-3">
                {page.sections.map((s,i)=><a key={s.id} href={"#"+s.id} className="text-sm font-medium leading-6 text-slate-600 hover:text-emerald-800">
                  <span className="mr-2 font-bold text-emerald-700">{String(i+1).padStart(2,"0")}</span>{s.heading}</a>)}
                <a href="#plany" className="font-bold text-emerald-800">Trasy dzień po dniu</a>
                <a href="#faq" className="font-bold text-emerald-800">Pytania i odpowiedzi</a>
                <a href="#kontakt" className="font-bold text-emerald-800">Zapytaj o własny plan</a>
              </nav>
            </div>
          </aside>
          <article className="min-w-0 space-y-8">
            {page.sections.map(s=><section id={s.id} key={s.id} className="scroll-mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-emerald-800">{s.overline}</p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((p,i)=><p key={i} className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{p}</p>)}
              {s.image&&<figure className="mt-7 overflow-hidden rounded-2xl bg-slate-100">
                <Image src={s.image} width={1250} height={720} sizes="(max-width: 768px) 100vw, 850px" alt={s.imageAlt||s.heading} className="max-h-[440px] w-full object-cover"/>
                <figcaption className="p-3 text-sm text-slate-500">{s.imageAlt}</figcaption>
              </figure>}
              {s.bullets&&<ul className="mt-6 space-y-3 border-l-4 border-emerald-100 pl-6 text-base leading-8 text-slate-700 sm:text-lg">{s.bullets.map(b=><li className="list-disc pl-1" key={b}>{b}</li>)}</ul>}
              {s.tip&&<p className="mt-6 rounded-xl bg-emerald-50 p-5 text-base font-medium leading-8 text-emerald-950"><strong>Wskazówka:</strong> {s.tip}</p>}
            </section>)}
          </article>
        </div>

        <section id="plany" className="mt-16 scroll-mt-7">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">Planowanie bez pośpiechu</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Trasy, które da się naprawdę zrealizować</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Przykładowe scenariusze — zmień kolejność według pogody, godzin lotów, lokalizacji hotelu i tempa swojej rodziny.</p>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {page.itineraries.map(it=><article key={it.name} className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
              <header className="bg-emerald-900 px-6 py-6 text-white"><h3 className="text-2xl font-extrabold">{it.name}</h3><p className="mt-2 text-base leading-7 text-emerald-50">{it.intro}</p></header>
              <ol className="divide-y divide-slate-100 px-6 py-2">{it.days.map(d=><li key={d.day} className="grid gap-2 py-4 text-base leading-7 sm:grid-cols-[145px_1fr]"><strong className="text-emerald-900">{d.day}</strong><p className="text-slate-700">{d.plan}</p></li>)}</ol>
              {it.caution&&<p className="m-6 rounded-xl bg-amber-50 p-4 text-base leading-7 text-slate-700">{it.caution}</p>}
            </article>)}
          </div>
        </section>

        <section aria-label="Zdjęcia miejsc i atrakcji" className="mt-16">
          <h2 className="text-3xl font-extrabold">Zobacz miejsca, o których piszemy</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">{page.gallery.map(p=><figure key={p.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image src={p.src} alt={p.alt} width={750} height={550} sizes="(max-width:768px) 100vw, 33vw" className="h-56 w-full object-cover sm:h-64"/>
            <figcaption className="px-4 py-4 text-base font-medium leading-7 text-slate-700">{p.alt}</figcaption>
          </figure>)}</div>
        </section>

        <section id="faq" className="mt-16 scroll-mt-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
          <h2 className="text-3xl font-extrabold tracking-tight">Najczęściej zadawane pytania</h2>
          <div className="mt-6 divide-y divide-slate-200">{page.faq.map(f=><details key={f.q} className="group py-5">
            <summary className="cursor-pointer text-lg font-bold leading-8 text-emerald-950">{f.q}</summary>
            <p className="mt-3 text-base leading-8 text-slate-700 sm:text-lg">{f.a}</p>
          </details>)}</div>
        </section>

        <section id="kontakt" className="mt-14 scroll-mt-7 overflow-hidden rounded-3xl bg-emerald-950 px-6 py-9 text-white sm:px-10 sm:py-12">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-200">GoVietStay · Trusted Local Support</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">Masz daty, ale nie masz jeszcze planu?</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50">Napisz, kiedy przyjeżdżasz, gdzie nocujesz i co naprawdę Cię interesuje. Możemy pomóc w transferze z lotniska, rejsie, bilecie albo prywatnej trasie — bez obowiązku kupowania całego pakietu. Uzgodnimy szczegóły po angielsku lub rosyjsku. Inne języki tylko po wcześniejszym potwierdzeniu.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-lg font-bold text-emerald-950 hover:bg-emerald-50">Porozmawiaj na WhatsApp →</a>
        </section>

        <section className="mt-10 grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-950">Krótki formularz, konkretna odpowiedź</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">To bezpłatne zapytanie. Trafia bezpośrednio do zespołu GoVietStay. Podaj daty, liczbę dorosłych, wiek dzieci i preferowaną trasę. Odezwiemy się po zweryfikowaniu dostępności.</p>
            <p className="mt-5 text-base leading-8 text-slate-600">Sam formularz nie pobiera płatności i nie potwierdza rezerwacji. Jeśli masz tylko jedno pytanie, możesz też skorzystać z WhatsApp.</p>
          </div>
          <PolishTravelInquiry productCode={"PL-"+page.slug.toUpperCase().replaceAll("-","_")} productName={page.leadProduct} sourcePage={"/pl/"+page.slug} />
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-extrabold tracking-tight">Czytaj dalej i porównaj trasy</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{page.related.map(r=><a key={r.href} href={r.href} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:border-emerald-400 hover:shadow-md">
            <h3 className="text-xl font-bold text-emerald-950">{r.title}</h3><p className="mt-3 text-base leading-7 text-slate-600">{r.description}</p><span className="mt-5 block font-bold text-emerald-800">Czytaj dalej →</span>
          </a>)}</div>
        </section>

        <section className="mt-14 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-extrabold">Źródła i informacje urzędowe</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">Przy opracowaniu wykorzystano źródła publiczne i informacje lokalne. Przed podróżą sprawdź aktualne warunki na stronach instytucji i operatorów.</p>
          <ul className="mt-4 space-y-2">{page.references.map(r=><li key={r.url} className="text-base leading-7"><a className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950" href={r.url} target="_blank" rel="noopener noreferrer">{r.label} ↗</a></li>)}</ul>
        </section>
      </div>
    </main>
    <footer className="bg-slate-950 px-5 py-10 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-6">
        <div><strong className="text-xl text-white">GoVietStay</strong><p className="mt-3 text-base leading-8">Trusted Local Support<br/>Da Nang · Hoi An · Hue · Phu Quoc<br/>WhatsApp: +84 937 762 607</p></div>
        <p className="max-w-lg text-sm leading-7">Informacje mają charakter praktycznego przewodnika. Ceny, rozkłady, warunki wjazdu i dostępność atrakcji mogą się zmieniać. © GoVietStay 2026.</p>
      </div>
    </footer>
  </div>;
}
