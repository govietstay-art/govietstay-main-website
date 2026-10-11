import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PublicInquiryForm from "../../../components/PublicInquiryForm";
import { belarusGuides, getBelarusGuide } from "../../../lib/belarus-guides";

const ORIGIN = "https://www.govietstay.com";
export const dynamicParams = false;

export function generateStaticParams() {
  return belarusGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBelarusGuide(slug);
  if (!guide) return { robots: { index: false } };
  const canonical = ORIGIN + "/be/" + guide.slug;
  return {
    title: { absolute: guide.seoTitle + " | GoVietStay" },
    description: guide.description,
    keywords: [
      "В'етнам для беларусаў", "Дананг", "Хойан", "Хюэ", "Фукуок", "Фукуок для беларусаў",
      "падарожжа па В'етнаме", "Цэнтральны В'етнам", "адпачынак у В'етнаме",
    ],
    alternates: {
      canonical,
      languages: { "be-BY": canonical },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "be_BY",
      siteName: "GoVietStay",
      url: canonical,
      title: guide.seoTitle,
      description: guide.description,
      images: [{ url: ORIGIN + guide.cover, alt: guide.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle,
      description: guide.description,
      images: [ORIGIN + guide.cover],
    },
  };
}

const wa = "https://wa.me/84937762607";
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">{children}</a>;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getBelarusGuide(slug);
  if (!guide) notFound();

  const canonical = ORIGIN + "/be/" + guide.slug;
  const whatsAppUrl = wa + "?text=" + encodeURIComponent(guide.message);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "GoVietStay", item: ORIGIN },
          { "@type": "ListItem", position: 2, name: "Даведнікі пра В’етнам", item: ORIGIN + "/be/vietnam-travel" },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
        ],
      },
      {
        "@type": "Article",
        "@id": canonical + "#article",
        mainEntityOfPage: canonical,
        headline: guide.title,
        description: guide.description,
        inLanguage: "be-BY",
        datePublished: "2026-10-11",
        dateModified: "2026-10-11",
        image: [ORIGIN + guide.cover, ...guide.gallery.map((x) => ORIGIN + x.src)],
        author: { "@type": "Organization", name: "GoVietStay Local Team", url: ORIGIN },
        publisher: { "@id": ORIGIN + "/#organization" },
        about: [
          { "@type": "Place", name: "Phu Quoc, Vietnam" },
          { "@type": "Place", name: "Da Nang, Vietnam" },
          { "@type": "Place", name: "Hoi An, Vietnam" },
          { "@type": "Place", name: "Hue, Vietnam" },
        ],
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <div lang="be" className="min-h-screen bg-[#f7f7f2] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-emerald-950 px-5 py-2.5 text-center text-sm font-medium tracking-wide text-emerald-50">
        GoVietStay · Інфармацыя пра Дананг, Хойан, Хюэ і Фукуок · Падтрымка па-руску
      </div>

      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3 text-emerald-950">
            <Image src="/govietstay-logo.jpg" width={44} height={44} alt="GoVietStay" className="h-11 w-11 rounded-xl object-contain" />
            <span><strong className="block text-xl tracking-tight">GoVietStay</strong><span className="block text-xs text-slate-600">Trusted Local Support · Vietnam</span></span>
          </a>
          <nav aria-label="Навігацыя" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-700 sm:text-base">
            <a className="hover:text-emerald-800" href="/be/da-nang-hoi-an">Дананг і Хойан</a>
            <a className="hover:text-emerald-800" href="/be/hue-central-vietnam">Хюэ і маршруты</a>
            <a className="hover:text-emerald-800" href="/be/phu-quoc">Фукуок</a>
            <a className="hover:text-emerald-800" href="/be/phu-quoc-tours">Экскурсіі</a>
            <a className="hover:text-emerald-800" href="/be/vietnam-travel">В’етнам</a>
            <a className="rounded-full bg-emerald-900 px-4 py-2.5 text-white hover:bg-emerald-800" href={whatsAppUrl} target="_blank" rel="noreferrer">Напісаць у WhatsApp</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-emerald-950">
          <Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/25" />
          <div className="mx-auto max-w-7xl px-5 py-20 text-white sm:px-8 sm:py-28 lg:py-32">
            <p className="mb-5 max-w-4xl text-sm font-semibold uppercase tracking-[0.14em] text-emerald-100">{guide.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{guide.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">{guide.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#guide" className="rounded-full bg-white px-6 py-3.5 font-bold text-emerald-950 shadow-md hover:bg-emerald-50">Чытаць даведнік ↓</a>
              <a href="#routes" className="rounded-full border border-white/70 bg-white/10 px-6 py-3.5 font-semibold text-white hover:bg-white/20">Праграмы па днях</a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="-mt-8 relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guide.quick.map((x) => (
              <div key={x.title} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-emerald-900">{x.title}</h2>
                <p className="mt-2 text-base leading-7 text-slate-700">{x.text}</p>
              </div>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-base leading-8 text-amber-950 sm:p-7" aria-label="Важнае перад паездкай">
            <strong className="text-lg">Важна перад паездкай.</strong>{" "}
            Інфармацыя аб надвор’і, правілах уезду, цэнах, працоўным часе і даступнасці месцаў можа змяняцца. Правярайце актуальныя ўмовы перад аплатай квіткоў. Даведнік абноўлены 11 кастрычніка 2026 года.
          </section>

          <div className="mt-12 grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)]" id="guide">
            <aside className="self-start lg:sticky lg:top-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-emerald-950">Змест даведніка</h2>
                <nav aria-label="Раздзелы даведніка" className="mt-4 flex flex-col gap-3">
                  {guide.sections.map((s, i) => (
                    <a key={s.id} href={"#" + s.id} className="text-sm font-medium leading-6 text-slate-600 hover:text-emerald-900">
                      <span className="mr-2 font-bold text-emerald-800">{String(i + 1).padStart(2, "0")}</span>{s.title}
                    </a>
                  ))}
                  <a href="#routes" className="pt-1 font-semibold text-emerald-800">Маршруты па днях</a>
                  <a href="#questions" className="font-semibold text-emerald-800">Частыя пытанні</a>
                </nav>
              </div>
            </aside>

            <article className="min-w-0 space-y-8">
              {guide.sections.map((section) => (
                <section id={section.id} key={section.id} className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                  <p className="text-sm font-bold tracking-[0.1em] text-emerald-800">{section.kicker}</p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-slate-950 sm:text-3xl">{section.title}</h2>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{paragraph}</p>
                  ))}
                  {section.image && (
                    <figure className="mt-6 overflow-hidden rounded-2xl bg-slate-100">
                      <Image src={section.image} width={1150} height={720} alt={section.imageAlt || section.title} sizes="(max-width: 768px) 100vw, 850px" className="max-h-[430px] w-full object-cover" />
                      <figcaption className="px-4 py-2.5 text-sm text-slate-500">{section.imageAlt}</figcaption>
                    </figure>
                  )}
                  {section.bullets && (
                    <ul className="mt-5 space-y-3 border-l-4 border-emerald-100 pl-5 text-base leading-8 text-slate-700 sm:text-lg">
                      {section.bullets.map((bullet) => <li key={bullet} className="list-disc pl-1">{bullet}</li>)}
                    </ul>
                  )}
                  {section.note && (
                    <p className="mt-6 rounded-xl bg-[#eef6f1] px-5 py-4 text-base font-medium leading-7 text-emerald-950">{section.note}</p>
                  )}
                </section>
              ))}
            </article>
          </div>

          <section id="routes" className="scroll-mt-8 mt-16">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Сплануйце свой час</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Гатовыя ідэі маршрутаў</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">Гэта прыклады для арыенціру, а не абавязковы расклад. Час у дарозе, надвор’е і ўзрост удзельнікаў могуць змяніць парадак дзён.</p>
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {guide.itineraries.map((r) => (
                <article key={r.title} className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
                  <div className="bg-emerald-900 px-6 py-5 text-2xl font-bold text-white">{r.title}</div>
                  <ol className="space-y-0 px-6 py-3">
                    {r.days.map((d) => (
                      <li key={d.label} className="grid gap-2 border-b border-slate-100 py-4 last:border-0 sm:grid-cols-[95px_1fr]">
                        <strong className="text-emerald-900">{d.label}</strong><span className="text-base leading-7 text-slate-700">{d.detail}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="m-6 rounded-xl bg-emerald-50 p-4 text-base leading-7 text-emerald-950">{r.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-label="Фотагалерэя">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Месцы, пра якія ідзе гаворка</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {guide.gallery.map((p) => (
                <figure key={p.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Image src={p.src} width={680} height={520} alt={p.alt} sizes="(max-width: 768px) 100vw, 33vw" className="h-56 w-full object-cover sm:h-64" />
                  <figcaption className="p-4 text-base font-medium leading-6 text-slate-700">{p.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="questions" className="scroll-mt-8 mt-16 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Пытанні перад паездкай</h2>
            <div className="mt-6 divide-y divide-slate-200">
              {guide.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none pr-4 text-lg font-bold leading-7 text-emerald-950 marker:hidden">{f.q}<span aria-hidden="true" className="float-right text-emerald-700 group-open:rotate-45">+</span></summary>
                  <p className="mt-3 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl bg-emerald-950 px-6 py-9 text-white sm:px-10 sm:py-12">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-200">Мясцовая дапамога без абавязковай пакупкі тура</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">Калі засталіся пытанні пра свой маршрут</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-emerald-50">Напішыце даты, колькасць дарослых і дзяцей, месца пражывання і тое, што хочаце ўбачыць. Каманда GoVietStay можа праверыць трансфер, квіткі або паездку з рускамоўным гідам. Падтрымка — на рускай мове; адказ і кошт паслуг пацвярджаюцца перад браніраваннем.</p>
            <a href={whatsAppUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-white px-6 py-3.5 text-lg font-bold text-emerald-950 hover:bg-emerald-50">Спытайце ў WhatsApp →</a>
          </section>

          <section className="mt-12 grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-extrabold text-emerald-950">Можна пакінуць запыт праз сайт</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">Форма ніжэй пакуль на рускай мове, каб ваш запыт надзейна трапіў у сістэму GoVietStay Admin. Яна не абавязвае вас браніраваць экскурсію. Адкажам пасля праверкі маршруту і наяўнасці паслуг.</p>
              <p className="mt-5 text-base leading-8 text-slate-700"><strong>Парада:</strong> пазначце, што вы з Беларусі, а таксама мову гіда, узрост дзяцей і пажаданы час выезду.</p>
            </div>
            <div>
              <PublicInquiryForm
                productCode={guide.slug === "da-nang-hoi-an" ? "BE-DANANG-HOIAN-GUIDE" : "BE-HUE-CENTRAL-GUIDE"}
                productName={guide.title}
                sourcePage={"/be/" + guide.slug}
                locale="ru"
                compact
              />
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Працягвайце планаваць</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guide.related.map((r) => (
                <a key={r.href} href={r.href} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md">
                  <h3 className="text-lg font-bold text-emerald-950">{r.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{r.text}</p>
                  <span className="mt-4 block font-semibold text-emerald-800">Адкрыць →</span>
                </a>
              ))}
            </div>
          </section>

          <section className="my-14 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold text-slate-900">Афіцыйныя крыніцы і праверка дэталяў</h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">Для гістарычных звестак выкарыстаны матэрыялы ЮНЕСКА. Правілы ўезду неабходна ўдакладняць на афіцыйных сайтах перад паездкай.</p>
            <ul className="mt-4 space-y-2 text-base leading-7">
              {guide.links.map((l) => <li key={l.href}>• <ExternalLink href={l.href}>{l.label}</ExternalLink></li>)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="bg-slate-950 px-5 py-9 text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5">
          <p className="text-base leading-7"><strong className="text-white">GoVietStay · Trusted Local Support</strong><br />Дананг · Хойан · Хюэ · Фукуок<br />WhatsApp: +84 937 762 607</p>
          <p className="max-w-xl text-sm leading-7 text-slate-300">Гэты даведнік створаны як бясплатная практычная інфармацыя. Умовы паездак, надвор’е і кошты неабходна правяраць перад прыняццем рашэння. © GoVietStay 2026.</p>
        </div>
      </footer>
    </div>
  );
}
