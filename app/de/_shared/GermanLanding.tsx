import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.css";

export type GermanFact = { label: string; value: string };
export type GermanSection = {
  kicker?: string;
  title: string;
  body?: string;
  bullets?: string[];
  note?: string;
};
export type GermanFaq = { q: string; a: string };
export type GermanRelated = { href: string; title: string; text: string };

export type GermanLandingConfig = {
  canonicalPath: string;
  eyebrow: string;
  title: string;
  lead: string;
  chips: string[];
  facts: GermanFact[];
  sections: GermanSection[];
  faqs: GermanFaq[];
  related: GermanRelated[];
  updated?: string;
  ctaKicker?: string;
  ctaTitle?: string;
  ctaText?: string;
  whatsappText?: string;
};

const SITE = "https://www.govietstay.com";
const OFFICIAL_LOGO = "/brand/govietstay-official-logo.jpg";
const WHATSAPP = "84937762607";

export default function GermanLanding({ config }: { config: GermanLandingConfig }) {
  const canonical = `${SITE}${config.canonicalPath}`;
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    config.whatsappText ||
      "Hallo GoVietStay! Ich plane eine Reise nach Vietnam. Reisedaten: ____. Hotel: ____. Gäste: ____. Bitte helfen Sie mir bei einer privaten Reiseroute."
  )}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.lead,
    mainEntityOfPage: canonical,
    inLanguage: "de-DE",
    author: { "@type": "Organization", name: "GoVietStay", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}${OFFICIAL_LOGO}` },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vietnam auf Deutsch", item: `${SITE}/de` },
      { "@type": "ListItem", position: 3, name: config.title, item: canonical },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={styles.topbar}>
        GOVIETSTAY · TRUSTED LOCAL SUPPORT · REISEINFORMATIONEN AUF DEUTSCH
      </div>

      <header className={styles.nav}>
        <Link className={styles.brand} href="/de" aria-label="GoVietStay Deutsch">
          <Image
            src={OFFICIAL_LOGO}
            alt="GoVietStay offizielles Logo"
            width={180}
            height={60}
            priority
          />
          <span>
            <b>GoVietStay</b>
            <small>Trusted Local Support</small>
          </span>
        </Link>
        <nav aria-label="Deutsche Reiseguides">
          <Link href="/de/zentralvietnam-private-touren">Zentralvietnam</Link>
          <Link href="/de/phu-quoc">Phú Quốc</Link>
          <Link href="/de/zentralvietnam-reiseplan">Reiseplan</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>{config.eyebrow}</p>
            <h1>{config.title}</h1>
            <p className={styles.lead}>{config.lead}</p>
            <div className={styles.chips}>
              {config.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#reiseinfo">Reiseinfos lesen</a>
              <Link className={styles.secondary} href="/de">Alle deutschen Guides</Link>
            </div>
            <p className={styles.microcopy}>
              Erst informieren, dann entscheiden: Diese Seite erklärt die Reiseplanung ohne Buchungsdruck.
            </p>
          </div>

          <aside className={styles.quickCard} aria-label="Schnellüberblick">
            <small>SCHNELLÜBERBLICK</small>
            {config.facts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className={styles.content} id="reiseinfo">
        <div className={styles.container}>
          <div className={styles.updated}>
            Aktualisiert: {config.updated || "September 2026"} · GoVietStay Vietnam
          </div>

          {config.sections.map((section, i) => (
            <article className={styles.section} key={`${section.title}-${i}`}>
              {section.kicker && <div className={styles.kicker}>{section.kicker}</div>}
              <h2>{section.title}</h2>
              {section.body && <p>{section.body}</p>}
              {section.bullets && (
                <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {section.note && <div className={styles.note}>{section.note}</div>}
            </article>
          ))}

          <section className={styles.relatedWrap}>
            <div className={styles.kicker}>Weiter planen</div>
            <h2>Passende Reiseguides</h2>
            <div className={styles.relatedGrid}>
              {config.related.map((item) => (
                <Link className={styles.related} href={item.href} key={item.href}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <b>Guide öffnen →</b>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.faq}>
            <div className={styles.kicker}>FAQ</div>
            <h2>Häufige Fragen</h2>
            <div className={styles.faqList}>
              {config.faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <div>
              <div className={styles.kicker}>{config.ctaKicker || "Erst wenn der Plan passt"}</div>
              <h2>{config.ctaTitle || "Möchten Sie die Route privat und flexibel umsetzen?"}</h2>
              <p>
                {config.ctaText ||
                  "Senden Sie uns Reisedaten, Hotel und Gästezahl. GoVietStay hilft Ihnen zuerst bei der sinnvollen Planung und organisiert anschließend auf Wunsch eine private Route mit flexiblem Ablauf."}
              </p>
              <div className={styles.privateOnly}>PRIVATE REISE · FLEXIBLER ABLAUF · LOKALE UNTERSTÜTZUNG</div>
            </div>
            <a className={styles.ctaButton} href={whatsapp} target="_blank" rel="noreferrer">
              GoVietStay auf WhatsApp
            </a>
          </section>

          <footer className={styles.footer}>
            <div className={styles.footerBrand}>
              <Image src={OFFICIAL_LOGO} alt="GoVietStay" width={110} height={52} />
              <div>
                <strong>GoVietStay · Trusted Local Support</strong>
                <span>Đà Nẵng · Hội An · Huế · Phú Quốc</span>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/de">Deutsch</Link>
              <Link href="/travel">English</Link>
              <a href={SITE}>GoVietStay.com</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
