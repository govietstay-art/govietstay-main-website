import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "./phu-quoc-seo.css";

export type PqCard = {
  title: string;
  text: string;
  badge?: string;
};

export type PqTable = {
  headers: string[];
  rows: string[][];
};

export type PqSection = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  bullets?: string[];
  cards?: PqCard[];
  table?: PqTable;
  note?: string;
};

export type PqFaq = {
  q: string;
  a: string;
};

export type PqSource = {
  label: string;
  href: string;
  note?: string;
};

export type PhuQuocSeoPageData = {
  slug: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  status: string;
  chips: string[];
  quickTitle: string;
  quickIntro: string;
  quickCards: PqCard[];
  sections: PqSection[];
  faqs: PqFaq[];
  whatsappKeyword: string;
  whatsappIntro: string;
  sources?: PqSource[];
  related: { label: string; href: string; text: string }[];
};

const PHONE = "84937762607";
const LOGO = "/brand/govietstay-phu-quoc-logo.png";
const FALLBACK_LOGO = "/brand/govietstay-official-logo.jpg";

export function buildPhuQuocMetadata(data: PhuQuocSeoPageData): Metadata {
  const canonical = `https://www.govietstay.com/travel/${data.slug}`;
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    keywords: [
      data.keyword,
      `${data.keyword} 2026`,
      `${data.keyword} 2027`,
      "Phu Quoc travel guide",
      "Phu Quoc local tour operator",
      "GoVietStay Phu Quoc",
    ],
    alternates: {
      canonical,
      languages: { en: canonical },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "GoVietStay",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: LOGO, alt: "GoVietStay Phu Quoc" }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [LOGO],
    },
  };
}

function whatsappLink(data: PhuQuocSeoPageData) {
  const msg = encodeURIComponent(
    `Hello GoVietStay.\nKeyword: ${data.whatsappKeyword}\n${data.whatsappIntro}\n\nTravel date:\nAdults / children:\nHotel / area:\nWhat I want:`
  );
  return `https://wa.me/${PHONE}?text=${msg}`;
}

export default function PhuQuocSeoPage({ data }: { data: PhuQuocSeoPageData }) {
  const canonical = `https://www.govietstay.com/travel/${data.slug}`;
  const wa = whatsappLink(data);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.title} ${data.titleAccent}`.trim(),
    description: data.metaDescription,
    mainEntityOfPage: canonical,
    inLanguage: "en",
    dateModified: "2026-09-10",
    author: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay", item: "https://www.govietstay.com" },
      { "@type": "ListItem", position: 2, name: "Travel Guides", item: "https://www.govietstay.com/travel" },
      { "@type": "ListItem", position: 3, name: "Phu Quoc", item: "https://www.govietstay.com/tours/phu-quoc" },
      { "@type": "ListItem", position: 4, name: data.keyword, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="pqSeoPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pqSeoTopbar">GOVIETSTAY · PHU QUOC · TRUSTED LOCAL SUPPORT</div>

      <header className="pqSeoNav">
        <Link className="pqSeoBrand" href="/" aria-label="GoVietStay home">
          <picture>
            <source srcSet={LOGO} />
            <img src={FALLBACK_LOGO} alt="GoVietStay Phu Quoc logo" width="58" height="58" />
          </picture>
          <span><b>GoVietStay</b><small>Phu Quoc Local Support</small></span>
        </Link>
        <nav aria-label="Phu Quoc navigation">
          <Link href="/travel">Travel Guides</Link>
          <Link href="/tours/phu-quoc">Phu Quoc Tours</Link>
          <a className="pqSeoNavCta" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className="pqSeoHero">
        <div className="pqSeoHeroCopy">
          <p className="pqSeoEyebrow">{data.eyebrow}</p>
          <h1>{data.title}<em>{data.titleAccent}</em></h1>
          <p className="pqSeoLead">{data.lead}</p>
          <div className="pqSeoStatus"><span>UPDATED</span><b>{data.status}</b></div>
          <div className="pqSeoChips">{data.chips.map((x) => <span key={x}>{x}</span>)}</div>
          <div className="pqSeoHeroActions">
            <a href="#start">Read the guide</a>
            <a href={wa} target="_blank" rel="noreferrer">Ask a local on WhatsApp</a>
          </div>
        </div>
        <aside className="pqSeoHeroVisual" aria-label="GoVietStay Phu Quoc">
          <div className="pqSeoOrb"><span>PHÚ</span><b>QUỐC</b></div>
          <p>LOCAL OPERATOR · PRIVATE TOURS · ENGLISH SUPPORT</p>
          <h2>Plan the island around your day — not the other way around.</h2>
          <small>GoVietStay · Da Nang · Hoi An · Hue · Phu Quoc</small>
        </aside>
      </section>

      <section className="pqSeoQuick" id="start">
        <div className="pqSeoSectionHead">
          <p>START HERE</p>
          <h2>{data.quickTitle}</h2>
          <span>{data.quickIntro}</span>
        </div>
        <div className="pqSeoQuickCards">
          {data.quickCards.map((card) => (
            <article key={card.title}>
              {card.badge && <span>{card.badge}</span>}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="pqSeoReadingGrid">
        <aside className="pqSeoToc" aria-label="On this page">
          <p>ON THIS PAGE</p>
          {data.sections.map((section, index) => (
            <a href={`#${section.id}`} key={section.id}>
              <b>{String(index + 1).padStart(2, "0")}</b><span>{section.title}</span>
            </a>
          ))}
          <a href="#faq"><b>?</b><span>Frequently asked questions</span></a>
        </aside>

        <div className="pqSeoContent">
          {data.sections.map((section, index) => (
            <section className="pqSeoSection" id={section.id} key={section.id}>
              <p className="pqSeoSectionNumber">{String(index + 1).padStart(2, "0")}</p>
              {section.eyebrow && <p className="pqSeoLabel">{section.eyebrow}</p>}
              <h2>{section.title}</h2>
              {section.intro && <p className="pqSeoIntro">{section.intro}</p>}

              {section.cards && (
                <div className="pqSeoCards">
                  {section.cards.map((card) => (
                    <article key={card.title}>
                      {card.badge && <span>{card.badge}</span>}
                      <h3>{card.title}</h3><p>{card.text}</p>
                    </article>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="pqSeoBullets">
                  {section.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}

              {section.table && (
                <div className="pqSeoTableWrap" role="region" tabIndex={0}>
                  <table>
                    <thead><tr>{section.table.headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{section.table.rows.map((row, ri) => (
                      <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                    ))}</tbody>
                  </table>
                </div>
              )}

              {section.note && <div className="pqSeoNote"><b>Local note</b><p>{section.note}</p></div>}
            </section>
          ))}

          <section className="pqSeoCta">
            <div>
              <p className="pqSeoLabel">GOVIETSTAY · PHU QUOC</p>
              <h2>Want a route that fits your hotel, pace and travel date?</h2>
              <p>Send us your date, group size and hotel area. We will help you choose the practical option before you pay.</p>
            </div>
            <div className="pqSeoCtaActions">
              <a href={wa} target="_blank" rel="noreferrer">WhatsApp GoVietStay</a>
              <Link href="/tours/phu-quoc">See Phu Quoc tours</Link>
            </div>
          </section>

          <section className="pqSeoFaq" id="faq">
            <p className="pqSeoLabel">FAQ</p>
            <h2>Questions travelers ask before they go</h2>
            <div>
              {data.faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary><p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {data.sources && data.sources.length > 0 && (
            <section className="pqSeoSources">
              <p className="pqSeoLabel">CHECK CURRENT OPERATING INFORMATION</p>
              <h2>Useful official / operator sources</h2>
              <div>
                {data.sources.map((source) => (
                  <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                    <strong>{source.label}</strong>
                    {source.note && <span>{source.note}</span>}
                    <b>Open source ↗</b>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="pqSeoRelated">
            <p className="pqSeoLabel">KEEP PLANNING</p>
            <h2>Related Phu Quoc guides</h2>
            <div>
              {data.related.map((item) => (
                <Link href={item.href} key={item.href}>
                  <strong>{item.label}</strong><span>{item.text}</span><b>Open guide →</b>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="pqSeoFooter">
        <div><strong>GoVietStay</strong><span>Trusted Local Support · Phu Quoc</span></div>
        <span>WhatsApp +84 937 762 607</span>
        <Link href="/travel">English Travel Guides</Link>
      </footer>

      <a className="pqSeoMobileCta" href={wa} target="_blank" rel="noreferrer">
        <span>Need local help?</span><b>WhatsApp GoVietStay</b>
      </a>
    </main>
  );
}
