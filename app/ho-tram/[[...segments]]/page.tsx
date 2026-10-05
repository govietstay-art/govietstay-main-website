import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";\nimport { notFound } from "next/navigation";
import styles from "./HoTram.module.css";
import {
  HOTRAM_BASE,
  LAST_REVIEWED,
  MAIN_SITE,
  faqs,
  localeConfig,
  publicUrl,
  tours,
  type HotramLocale,
  ui,
  whatsappUrl,
} from "../../../lib/hotram/site";

type PageProps = {
  params: Promise<{ segments?: string[] }>;
};

function resolveRoute(raw: string[] | undefined) {
  const segments = raw ?? [];
  let locale: HotramLocale = "en";
  let rest = segments;

  if (segments[0] === "ru" || segments[0] === "it") {
    locale = segments[0];
    rest = segments.slice(1);
  }

  if (rest.length > 1) return null;
  const slug = rest[0];
  const tour = slug ? tours.find((item) => item.slug === slug) : undefined;
  if (slug && !tour) return null;

  return { locale, slug, tour };
}

function hreflang(slug?: string) {
  const languages: Record<string, string> = {
    "x-default": publicUrl("en", slug),
  };
  (Object.keys(localeConfig) as HotramLocale[])
    .filter((locale) => localeConfig[locale].indexable)
    .forEach((locale) => {
      languages[localeConfig[locale].html] = publicUrl(locale, slug);
    });
  return languages;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const route = resolveRoute((await params).segments);
  if (!route) return { robots: { index: false, follow: false } };

  const { locale, tour } = route;
  const canonical = publicUrl(locale, tour?.slug);
  const isIndexable = localeConfig[locale].indexable;

  const hubTitle: Record<HotramLocale, string> = {
    en: "Private Ho Tram Tours from Long Thanh & HCMC | GoVietStay",
    ru: "Индивидуальные экскурсии Хочам из Лонгтханя и Хошимина | GoVietStay",
    it: "Tour privati a Ho Tram da Long Thanh e Ho Chi Minh City | GoVietStay",
  };
  const hubDescription: Record<HotramLocale, string> = {
    en: "Six focused private Ho Tram experiences for international travelers, with pickup from Ho Tram resorts, Long Thanh Airport or Ho Chi Minh City.",
    ru: "Шесть индивидуальных маршрутов по Хочаму с трансфером из отелей, аэропорта Лонгтхань или Хошимина.",
    it: "Sei esperienze private a Ho Tram con pickup dal resort, dall'aeroporto Long Thanh o da Ho Chi Minh City.",
  };

  const title = tour
    ? `${tour.name} | Private Ho Tram Experience | GoVietStay`
    : hubTitle[locale];
  const description = tour ? tour.promise : hubDescription[locale];

  return {
    metadataBase: new URL(HOTRAM_BASE),
    title: { absolute: title },
    description,
    keywords: tour
      ? [
          tour.name,
          `${tour.name} Ho Tram`,
          "Ho Tram private tour",
          "Ho Tram local experience",
          "private Ho Tram tour from Long Thanh",
        ]
      : [
          "Ho Tram private tours",
          "Ho Tram local experiences",
          "Long Thanh Airport to Ho Tram",
          "Ho Tram tours from Ho Chi Minh City",
          "Ho Tram private car",
        ],
    alternates: { canonical, languages: hreflang(tour?.slug) },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: { index: isIndexable, follow: true },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "GoVietStay Ho Tram",
      title,
      description,
      images: [
        {
          url: `${HOTRAM_BASE}/govietstay-logo.jpg`,
          alt: "GoVietStay Ho Tram private travel support",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${HOTRAM_BASE}/govietstay-logo.jpg`],
    },
  };
}

function LanguageLinks({ slug }: { slug?: string }) {
  return (
    <nav className={styles.languages} aria-label="Languages">
      {(Object.keys(localeConfig) as HotramLocale[])
        .filter((locale) => localeConfig[locale].indexable)
        .map((locale) => (
          <a key={locale} href={publicUrl(locale, slug)} hrefLang={localeConfig[locale].html}>
            {localeConfig[locale].label}
          </a>
        ))}
    </nav>
  );
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function Hub({ locale }: { locale: HotramLocale }) {
  const copy = ui[locale];
  const canonical = publicUrl(locale);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${HOTRAM_BASE}/#website`,
        url: HOTRAM_BASE,
        name: "GoVietStay Ho Tram",
        inLanguage: localeConfig[locale].html,
        publisher: { "@id": `${MAIN_SITE}/#organization` },
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#page`,
        url: canonical,
        name: "GoVietStay Ho Tram Private Experiences",
        description: copy.intro,
        inLanguage: localeConfig[locale].html,
        isPartOf: { "@id": `${HOTRAM_BASE}/#website` },
        about: {
          "@type": "Place",
          name: "Ho Tram",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Ho Chi Minh City, Vietnam",
          },
        },
        mainEntity: { "@id": `${canonical}#six-experiences` },
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#six-experiences`,
        name: "Six core private Ho Tram experiences",
        numberOfItems: tours.length,
        itemListElement: tours.map((tour, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: publicUrl(locale, tour.slug),
          name: tour.name,
        })),
      },
    ],
  };

  return (
    <main className={styles.page} lang={localeConfig[locale].html}>
      <JsonLd data={schema} />
      <header className={styles.header}>
        <a className={styles.brand} href={MAIN_SITE}>
          <span>GoVietStay</span>
          <small>Trusted Local Support</small>
        </a>
        <LanguageLinks />
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.h1}</h1>
          <p className={styles.lead}>{copy.intro}</p>
          <div className={styles.heroActions}>
            <a
              className={styles.primary}
              href={whatsappUrl("Hello GoVietStay, I am planning a private Ho Tram trip.")}
              target="_blank"
              rel="noreferrer"
            >
              {copy.contact}
            </a>
            <a className={styles.secondary} href="#six-experiences">
              {copy.toursTitle}
            </a>
          </div>
        </div>
        <aside className={styles.promise}>
          <strong>6</strong>
          <span>core experiences</span>
          <hr />
          <strong>Private</strong>
          <span>couples · families · small groups</span>
          <hr />
          <strong>3</strong>
          <span>starting points: Ho Tram · Long Thanh · HCMC</span>
        </aside>
      </section>

      <section className={styles.three}>
        <article>
          <span>01</span>
          <h2>{copy.principleTitle}</h2>
          <p>{copy.principle}</p>
        </article>
        <article>
          <span>02</span>
          <h2>{copy.pickupTitle}</h2>
          <p>{copy.pickup}</p>
        </article>
        <article>
          <span>03</span>
          <h2>{copy.localTitle}</h2>
          <p>{copy.local}</p>
        </article>
      </section>

      <section className={styles.tours} id="six-experiences">
        <div className={styles.sectionHead}>
          <p>GO VIET STAY · HO TRAM</p>
          <h2>{copy.toursTitle}</h2>
        </div>
        <div className={styles.grid}>
          {tours.map((tour, index) => (
            <a className={styles.card} href={publicUrl(locale, tour.slug)} key={tour.slug}>
              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{tour.duration}</small>
              </div>
              <h3>{tour.name}</h3>
              <p>{tour.promise}</p>
              <div className={styles.tags}>
                {tour.bestFor.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
              </div>
              <b>{copy.view} →</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHead}>
          <p>ANSWER-FIRST CONTENT</p>
          <h2>{copy.faqTitle}</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trust}>
        <div>
          <p>LOCAL SOURCE DISCIPLINE</p>
          <h2>What we publish must still be true on the day we operate it.</h2>
        </div>
        <p>{copy.sourceNote}</p>
      </section>

      <footer className={styles.footer}>
        <div>
          <b>GoVietStay Ho Tram</b>
          <span>Part of GoVietStay Vietnam</span>
        </div>
        <div>
          <a href={MAIN_SITE}>GoVietStay.com</a>
          <a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" target="_blank" rel="noreferrer">
            Google reviews
          </a>
          <a href={whatsappUrl("Hello GoVietStay, I would like help with Ho Tram.")} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>
    </main>
  );
}

function TourPage({ locale, slug }: { locale: HotramLocale; slug: string }) {
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) notFound();
  const copy = ui[locale];
  const canonical = publicUrl(locale, tour.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${canonical}#trip`,
        name: tour.name,
        description: tour.promise,
        url: canonical,
        provider: { "@id": `${MAIN_SITE}/#organization` },
        touristType: tour.bestFor,
        itinerary: {
          "@type": "ItemList",
          itemListElement: tour.itinerary.map((name, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "GoVietStay Ho Tram",
            item: publicUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tour.name,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} lang={localeConfig[locale].html}>
      <JsonLd data={schema} />
      <header className={styles.header}>
        <a className={styles.brand} href={publicUrl(locale)}>
          <span>GoVietStay</span>
          <small>Ho Tram</small>
        </a>
        <LanguageLinks slug={tour.slug} />
      </header>

      <section className={styles.detailHero}>
        <div>
          <a className={styles.back} href={publicUrl(locale)}>← {copy.back}</a>
          <p className={styles.eyebrow}>PRIVATE · HO TRAM</p>
          <h1>{tour.name}</h1>
          <p className={styles.lead}>{tour.promise}</p>
          <div className={styles.tags}>
            {tour.bestFor.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <aside className={styles.factBox}>
          <div><small>Duration</small><b>{tour.duration}</b></div>
          <div><small>Format</small><b>Private</b></div>
          <div><small>Pickup</small><b>{tour.pickup.join(" · ")}</b></div>
          <p>{copy.bookingNote}</p>
        </aside>
      </section>

      {tour.visuals?.length ? (
        <section className={styles.visualStory} aria-label={`${tour.name} visual story`}>
          {tour.visuals.map((visual, index) => (
            <figure className={styles.visualCard} key={visual.src}>
              <div className={styles.visualFrame}>
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  priority={index === 0}
                  quality={index === 0 ? 78 : 72}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 390px"
                  className={styles.visualImage}
                />
                <span>{String(index + 1).padStart(2, "0")} · {visual.label}</span>
              </div>
              <figcaption>
                <b>{visual.label}</b>
                <a href={visual.sourceUrl} target="_blank" rel="noreferrer">{visual.credit}</a>
              </figcaption>
            </figure>
          ))}
        </section>
      ) : null}

      <section className={styles.detailGrid}>
        <article>
          <p className={styles.kicker}>WHY THIS EXPERIENCE</p>
          <h2>Designed around one clear reason to spend time in Ho Tram.</h2>
          <ul>
            {tour.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article>
          <p className={styles.kicker}>HOW THE DAY FLOWS</p>
          <h2>A route, not a rigid bus timetable.</h2>
          <ol>
            {tour.itinerary.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </article>
      </section>

      {tour.pilotPricing?.length ? (
        <section className={styles.priceSection}>
          <div>
            <p className={styles.kicker}>2026 PILOT PRIVATE RATE</p>
            <h2>One private day. Full mineral-bath ticket included.</h2>
            <p className={styles.priceIntro}>
              Resort-origin pricing for the first operating version. Weekend/holiday supplier changes are rechecked before payment.
            </p>
          </div>
          <div className={styles.priceTable}>
            {tour.pilotPricing.map((row) => (
              <div key={row.guests}>
                <span>{row.guests}</span>
                <b>{new Intl.NumberFormat("en-US").format(row.perPersonVnd)} VND / person</b>
              </div>
            ))}
            <small>
              Includes private vehicle from Ho Tram resort area, English-speaking guide, forest admission allowance,
              local lunch allowance and Minera mineral-bath ticket. HCMC / Long Thanh pickup is quoted separately.
            </small>
          </div>
        </section>
      ) : null}

      <section className={styles.pickup}>
        <div>
          <p className={styles.kicker}>PICKUP LOGIC</p>
          <h2>Ho Tram resort, Long Thanh Airport or Ho Chi Minh City — only where the day still makes sense.</h2>
        </div>
        <div className={styles.pickupList}>
          {tour.pickup.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className={styles.notes}>
        <div>
          <p className={styles.kicker}>OPERATING NOTES</p>
          <h2>We confirm changing conditions before taking payment.</h2>
        </div>
        <ul>
          {tour.notes.map((item) => <li key={item}>{item}</li>)}
          <li>{copy.sourceNote}</li>
        </ul>
      </section>

      <section className={styles.confirm}>
        <div>
          <p className={styles.kicker}>CONFIRM BEFORE PAYMENT</p>
          <h2>One booking should answer the operational questions once.</h2>
        </div>
        <div className={styles.confirmGrid}>
          {[
            "Exact pickup point and pickup time",
            "Private vehicle scope and route",
            "Guide language and availability",
            "Entrance / activity fees included or excluded",
            "Meal, drinks and dietary requests",
            "Children ages, child seat or mobility needs",
            "Cancellation terms and weather fallback",
          ].map((item) => <span key={item}>✓ {item}</span>)}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <p>PRIVATE REQUEST</p>
          <h2>Send the date, number of guests, hotel or flight, and preferred language.</h2>
        </div>
        <a
          href={whatsappUrl(`Hello GoVietStay, I am interested in ${tour.name} in Ho Tram.`)}
          target="_blank"
          rel="noreferrer"
        >
          {copy.contact}
        </a>
      </section>

      <footer className={styles.footer}>
        <div>
          <b>GoVietStay Ho Tram</b>
          <span>Last content review: {LAST_REVIEWED}</span>
        </div>
        <div>
          <a href={publicUrl(locale)}>{copy.back}</a>
          <a href={MAIN_SITE}>GoVietStay.com</a>
        </div>
      </footer>
    </main>
  );
}

export default async function HoTramPage({ params }: PageProps) {
  const route = resolveRoute((await params).segments);
  if (!route) notFound();
  return route.tour
    ? <TourPage locale={route.locale} slug={route.tour.slug} />
    : <Hub locale={route.locale} />;
}
