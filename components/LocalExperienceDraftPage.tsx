import Link from 'next/link';
import type { Metadata } from 'next';
import {
  experienceSlugs, experienceUi, experienceUrl, getExperience,
  type Experience, type ExperienceLocale, type ExperienceSlug,
} from '../lib/localExperienceDrafts';

const SITE = 'https://www.govietstay.com';
const LANGUAGES: ExperienceLocale[] = ['en', 'ru', 'it'];
const labels: Record<ExperienceLocale, string> = { en: 'English', ru: 'Русский', it: 'Italiano' };

export function buildExperienceMetadata(locale: ExperienceLocale, slug: string): Metadata {
  const experience = getExperience(slug);
  if (!experience) return { robots: { index: false, follow: false } };
  const copy = experience.translations[locale];
  const path = experienceUrl(locale, experience.slug);
  const url = `${SITE}${path}`;
  return {
    title: { absolute: copy.title },
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE}${experienceUrl('en', experience.slug)}`,
        ru: `${SITE}${experienceUrl('ru', experience.slug)}`,
        'it-IT': `${SITE}${experienceUrl('it', experience.slug)}`,
        'x-default': `${SITE}${experienceUrl('en', experience.slug)}`,
      },
    },
    // Draft-only: do not index incomplete/unverified bookable offers. Remove only
    // after inspection, operational signoff, original images and full build.
    robots: { index: false, follow: false },
    openGraph: {
      type: 'website', url, siteName: 'GoVietStay', title: copy.title,
      description: copy.description,
      locale: locale === 'ru' ? 'ru_RU' : locale === 'it' ? 'it_IT' : 'en_US',
    },
  };
}

function draftJsonLd(locale: ExperienceLocale, experience: Experience) {
  const copy = experience.translations[locale];
  const url = `${SITE}${experienceUrl(locale, experience.slug)}`;
  const language = locale === 'it' ? 'it-IT' : locale;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: copy.title,
        description: copy.description, inLanguage: language,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@type': 'Place', name: 'Da Nang, Vietnam' },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GoVietStay', item: SITE },
          { '@type': 'ListItem', position: 2, name: copy.name, item: url },
        ],
      },
      // We deliberately do not add Product/Offer/TouristTrip, prices or aggregate
      // ratings until the proposed experience has actually been verified.
    ],
  };
}

function AskButton({ locale, experience, className = '' }: {
  locale: ExperienceLocale; experience: Experience; className?: string;
}) {
  const ui = experienceUi[locale];
  const prefill: Record<ExperienceLocale, string> = {
    en: `Hello GoVietStay, I am interested in planning ${experience.translations.en.name}. My travel date, group size, hotel and preferred guide language are:`,
    ru: `Здравствуйте, GoVietStay! Хочу узнать о планировании ${experience.translations.ru.name}. Дата, число гостей, отель и желаемый язык гида:`,
    it: `Buongiorno GoVietStay, vorrei informazioni sulla proposta ${experience.translations.it.name}. Data, partecipanti, hotel e lingua desiderata:`,
  };
  return (
    <a className={`inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${className}`}
      href={`https://wa.me/84937762607?text=${encodeURIComponent(prefill[locale])}`}
      target="_blank" rel="noopener noreferrer">
      {ui.contact} →
    </a>
  );
}

export default function LocalExperienceDraftPage({ locale, experience }: {
  locale: ExperienceLocale; experience: Experience;
}) {
  const copy = experience.translations[locale];
  const ui = experienceUi[locale];
  const others = experienceSlugs.filter((slug) => slug !== experience.slug);
  const graph = JSON.stringify(draftJsonLd(locale, experience)).replace(/</g, '\\u003c');
  return (
    <main lang={locale === 'it' ? 'it' : locale} className="min-h-screen bg-[#f8fbf9] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
      <div className="mx-auto max-w-6xl px-5 pb-4 pt-6 sm:px-8">
        <nav aria-label="Languages" className="flex flex-wrap items-center gap-2 text-sm">
          <Link href={locale === 'en' ? '/travel' : `/${locale}`} className="mr-auto font-bold text-teal-800 hover:underline">GoVietStay</Link>
          <span className="text-slate-600">{ui.language}:</span>
          {LANGUAGES.map((language) => (
            <Link key={language} href={experienceUrl(language, experience.slug)} hrefLang={language === 'it' ? 'it-IT' : language}
              aria-current={language === locale ? 'page' : undefined}
              className={`rounded-full border px-3 py-1.5 ${language === locale ? 'border-teal-700 bg-teal-700 text-white' : 'border-teal-200 bg-white text-teal-800 hover:border-teal-600'}`}>
              {labels[language]}
            </Link>
          ))}
        </nav>
      </div>

      <header className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-600 text-white">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/20" aria-hidden="true" />
        <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-white/5" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-teal-100 uppercase">{ui.eyebrow}</p>
          <h1 className="max-w-4xl text-3xl leading-tight font-bold sm:text-5xl">{copy.title.replace(' | GoVietStay', '')}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-teal-50">{copy.intro}</p>
          <div className="mt-7 flex flex-wrap gap-2 text-sm">
            {[ui.price, ui.duration, ui.transport].map((text) => <span key={text} className="rounded-full border border-white/30 bg-white/10 px-4 py-2">{text}</span>)}
          </div>
          <div className="mt-8"><AskButton locale={locale} experience={experience} className="bg-white text-teal-900 hover:bg-teal-50" /></div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950" role="note">
          <p className="font-bold">{ui.status}</p><p className="mt-2 leading-relaxed">{ui.statusDetail}</p>
        </aside>
        <section className="mt-12" aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="text-2xl font-bold text-teal-950 sm:text-3xl">{ui.suitable}</h2>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-700">{copy.audience}</p>
        </section>
        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="route-heading">
            <h2 id="route-heading" className="text-2xl font-bold text-teal-950">{ui.route}</h2>
            <ol className="mt-5 space-y-5 pl-5 text-slate-700 list-decimal">
              {copy.route.map((item) => <li key={item} className="leading-relaxed pl-1">{item}</li>)}
            </ol>
          </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="approach-heading">
            <h2 id="approach-heading" className="text-2xl font-bold text-teal-950">{ui.approach}</h2>
            <ul className="mt-5 space-y-5 pl-5 text-slate-700 list-disc">
              {copy.approach.map((item) => <li key={item} className="leading-relaxed pl-1">{item}</li>)}
            </ul>
          </section>
        </div>
        <section className="mt-10 rounded-3xl border border-teal-200 bg-teal-50 p-6 sm:p-8" aria-labelledby="confirm-heading">
          <h2 id="confirm-heading" className="text-2xl font-bold text-teal-950">{ui.confirm}</h2>
          <ul className="mt-5 space-y-3 pl-5 list-disc text-slate-800">
            {copy.confirm.map((item) => <li key={item} className="leading-relaxed pl-1">{item}</li>)}
          </ul>
        </section>
        <section className="mt-14" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-teal-950 sm:text-3xl">{ui.faq}</h2>
          <div className="mt-5 space-y-3">
            {copy.questions.map(({ question, answer }) => (
              <details key={question} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-300">
                <summary className="cursor-pointer font-semibold text-slate-900 marker:text-teal-700">{question}</summary>
                <p className="mt-4 leading-relaxed text-slate-700">{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mt-12 rounded-3xl bg-teal-950 px-6 py-9 text-white sm:p-10">
          <h2 className="text-2xl font-bold">{ui.contact}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-teal-50">{ui.contactHint}</p>
          <div className="mt-6"><AskButton locale={locale} experience={experience} className="bg-white text-teal-900 hover:bg-teal-50" /></div>
        </section>
        <nav aria-label={ui.next} className="mt-14">
          <h2 className="text-2xl font-bold text-teal-950">{ui.next}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((slug: ExperienceSlug) => {
              const other = getExperience(slug);
              if (!other) return null;
              return <Link key={slug} href={experienceUrl(locale, slug)} className="rounded-2xl border border-teal-200 bg-white p-5 text-lg font-semibold text-teal-900 shadow-sm hover:border-teal-600 hover:shadow-md">{other.translations[locale].name} →</Link>;
            })}
          </div>
          <Link className="mt-8 inline-block font-semibold text-teal-800 underline underline-offset-4" href={locale === 'en' ? '/travel/da-nang-travel-guide' : `/${locale}`}>← {ui.back}</Link>
        </nav>
      </div>
    </main>
  );
}
