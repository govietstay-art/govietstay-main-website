import Link from "next/link";
import Image from "next/image";
import type { MnPage } from "../content";
import { mnPageBySlug, mnUrl } from "../content";

const contact = (page: MnPage) =>
  "https://wa.me/84937762607?text=" + encodeURIComponent(
    `Hello GoVietStay! I read your Mongolia travel guide: ${page.heading}. My travel dates: __. Hotel: __. Adults: __. Children and ages: __. Please help me plan a suitable private itinerary and confirm the included services. English/Russian communication is OK.`
  );

export default function MnLanding({ page }: { page: MnPage }) {
  const pageUrl = `https://www.govietstay.com${mnUrl(page.slug)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: "mn-MN",
    isPartOf: { "@id": "https://www.govietstay.com/#website" },
    publisher: { "@id": "https://www.govietstay.com/#organization" },
  };
  const hubLinks = [
    { href: "/mn", label: "Вьетнам" },
    { href: "/mn/da-nang", label: "Дананг · Төв Вьетнам" },
    { href: "/mn/phu-quoc", label: "Фукуок" },
    { href: "/mn/phu-quoc/grand-world", label: "Grand World" },
    { href: "/mn/phu-quoc/sunset-town", label: "Sunset Town" },
  ];

  return (
    <main lang="mn" className="min-h-screen bg-[#f6f8f6] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/mn" aria-label="GoVietStay Монгол нүүр" className="flex items-center gap-3">
            <Image src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" width={68} height={58} className="h-12 w-14 rounded-md object-contain" />
            <span className="text-sm font-black tracking-tight text-emerald-950 sm:text-lg">GoVietStay <span className="text-emerald-700">Монгол</span><span className="block text-[10px] font-medium tracking-wide text-slate-500">Trusted Local Support · Vietnam</span></span>
          </Link>
          <nav aria-label="Хэл сонгох" className="flex items-center gap-3 text-xs font-semibold sm:text-sm">
            <Link href="/mn" hrefLang="mn-MN" className="rounded-full bg-emerald-50 px-3 py-2 text-emerald-900">Монгол</Link>
            <Link href="/travel" hrefLang="en" className="px-1 py-2 text-slate-600 hover:text-emerald-800">English guide</Link>
            <Link href="/ru" hrefLang="ru" className="px-1 py-2 text-slate-600 hover:text-emerald-800">Русский</Link>
          </nav>
        </div>
        <nav aria-label="Аяллын чиглэл" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 text-xs font-semibold sm:px-6 sm:text-sm">
          {hubLinks.map((link) => <Link key={link.href} href={link.href} aria-current={mnUrl(page.slug) === link.href ? "page" : undefined} className={`shrink-0 rounded-full px-3 py-2 ${mnUrl(page.slug) === link.href ? "bg-emerald-800 text-white" : "bg-slate-100 text-slate-700 hover:bg-emerald-100"}`}>{link.label}</Link>)}
        </nav>
      </header>

      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-sky-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-teal-200">{page.eyebrow}</p>
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{page.heading}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-teal-50 sm:text-lg">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#guide" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-950 hover:bg-emerald-50">Аяллын мэдээлэл ↓</a>
            <a href={contact(page)} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/60 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">WhatsApp · Маршрут асуух ↗</a>
          </div>
          <p className="mt-4 text-xs text-teal-100">Мэдээлэл үнэгүй. Захиалга, үнэ болон үйлчилгээний олдоцыг тусад нь баталгаажуулна.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        <nav aria-label="Зам" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/mn" className="hover:text-emerald-800">Вьетнам</Link><span aria-hidden="true">/</span><span className="text-slate-800">{page.slug ? page.eyebrow : "Нүүр"}</span>
        </nav>
        <section aria-label="Гол мэдээлэл" className="grid gap-3 sm:grid-cols-3">
          {page.facts.map((fact, i) => <div key={fact} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"><span aria-hidden="true" className="mb-3 block text-xl font-black text-emerald-600">0{i + 1}</span><p className="font-semibold leading-7 text-slate-800">{fact}</p></div>)}
        </section>

        <div id="guide" className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article className="space-y-6">
            {page.sections.map((section, i) => (
              <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700">АЯЛЛЫН ХӨТӨЧ · {String(i + 1).padStart(2, "0")}</p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{section.title}</h2>
                <p className="mt-4 leading-8 text-slate-700">{section.body}</p>
                <ul className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-700">{section.tips.map((tip) => <li key={tip} className="flex gap-3"><span aria-hidden="true" className="font-bold text-emerald-600">✓</span><span>{tip}</span></li>)}</ul>
              </section>
            ))}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Түгээмэл асуулт</h2>
              <div className="mt-4 divide-y divide-slate-200">{page.faqs.map((faq) => <details key={faq.question} className="group py-4"><summary className="cursor-pointer font-semibold leading-7 text-slate-900">{faq.question}</summary><p className="mt-3 leading-7 text-slate-700">{faq.answer}</p></details>)}</div>
            </section>
            {page.source && <p className="px-2 text-sm leading-7 text-slate-600">Албан ёсны мэдээлэл: <a className="font-semibold text-emerald-800 underline underline-offset-4" href={page.source.url} target="_blank" rel="noopener noreferrer">{page.source.label} ↗</a>. Үнэ, цагийн хуваарь өөрчлөгдөх боломжтой.</p>}
          </article>
          <aside className="space-y-5 lg:sticky lg:top-5">
            <div className="rounded-2xl bg-emerald-950 p-6 text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-200">GO VIET STAY · LOCAL HELP</p>
              <h2 className="mt-3 text-xl font-bold">Танд тохирсон хувийн маршрут хэрэгтэй юу?</h2>
              <p className="mt-3 text-sm leading-7 text-emerald-50">Огноо, буудал, насанд хүрэгчид болон хүүхдийн тоо, хүссэн газраа илгээгээрэй. Бид боломжтой маршрутыг шалгана.</p>
              <a href={contact(page)} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-emerald-950 hover:bg-emerald-50">WhatsApp-аар холбогдох ↗</a>
              <p className="mt-3 text-xs leading-5 text-emerald-100">Одоогоор харилцаа англи, орос хэлээр. Монгол хэлтэй хөтөч баталгаатай биш.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">Холбоотой хөтөч</h2>
              <ul className="mt-4 space-y-3">{page.related.map((slug) => {
                const other = mnPageBySlug[slug];
                return other ? <li key={slug}><Link href={mnUrl(slug)} className="block border-b border-slate-100 pb-3 text-sm font-semibold leading-6 text-emerald-800 hover:underline">{other.title} →</Link></li> : null;
              })}</ul>
            </div>
          </aside>
        </div>
      </div>
      <footer className="border-t border-slate-200 bg-white px-4 py-9 text-center text-sm leading-7 text-slate-600">
        <p className="font-bold text-emerald-950">GoVietStay · Trusted Local Support</p>
        <p>Дананг · Хой Ан · Хюэ · Фукуок</p>
        <p>© 2026 GoVietStay · <Link className="underline" href="/mn">Монгол хөтөч</Link> · <Link className="underline" href="/travel">English guide</Link></p>
      </footer>
    </main>
  );
}
