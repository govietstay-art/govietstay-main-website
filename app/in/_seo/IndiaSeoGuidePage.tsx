import type { IndiaSeoGuide } from "../../../lib/indiaSeoGuides";
import styles from "./IndiaSeoGuidePage.module.css";

const WA =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent(
    "Hi GoVietStay. I am travelling from India to Da Nang. My travel dates / guests / hotel are:"
  );

export default function IndiaSeoGuidePage({
  guide,
  related,
}: {
  guide: IndiaSeoGuide;
  related: IndiaSeoGuide[];
}) {
  const canonical = `https://www.govietstay.com/in/${guide.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    datePublished: "2026-08-26",
    dateModified: guide.updated,
    inLanguage: "en-IN",
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com/in",
    },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      logo: {
        "@type": "ImageObject",
        url: "https://www.govietstay.com/logo.png",
      },
    },
    about: guide.keywords,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay", item: "https://www.govietstay.com/" },
      { "@type": "ListItem", position: 2, name: "India Travel Hub", item: "https://www.govietstay.com/in" },
      { "@type": "ListItem", position: 3, name: guide.h1, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className={styles.nav}>
        <a href="/in" className={styles.brand}>
          <img src="/logo.png" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>INDIA TRAVEL HUB</small></span>
        </a>
        <nav>
          <a href="/in">India Home</a>
          <a href="/in/danang-tour-from-india">Da Nang</a>
          <a href="/in/vietnam-visa-for-indians">Visa guide</a>
          <a className={styles.navCta} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>{guide.eyebrow}</p>
            <h1>{guide.h1}</h1>
            <p className={styles.lead}>{guide.description}</p>
            <div className={styles.meta}>
              <span>Updated {guide.updated}</span>
              <span>For Indian travellers</span>
              <span>GoVietStay Da Nang local team</span>
            </div>
          </div>
          <aside className={styles.answer}>
            <small>30-SECOND ANSWER</small>
            <p>{guide.summary}</p>
          </aside>
        </div>
      </section>

      <section className={styles.quick}>
        {guide.quick.map((item, i) => (
          <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>
        ))}
      </section>

      <div className={styles.layout}>
        <article>
          <div className={styles.editorNote}>
            <b>Local planning note:</b> prices, operating times, weather-sensitive tours and visa conditions can change.
            Confirm the current condition before making a non-refundable booking.
          </div>

          {guide.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.body.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}

          {guide.officialLinks && guide.officialLinks.length > 0 && (
            <section className={styles.official}>
              <p className={styles.kicker}>OFFICIAL LINKS</p>
              <h2>Use primary sources for changing rules.</h2>
              <div>
                {guide.officialLinks.map((link) => (
                  <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className={`${styles.section} ${styles.check}`}>
            <p className={styles.kicker}>SAVE THIS CHECKLIST</p>
            <h2>Before you confirm the trip</h2>
            <div>
              {guide.checklist.map((item) => <span key={item}>✓ {item}</span>)}
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>FAQ</p>
            <h2>Questions Indian travellers ask</h2>
            <div className={styles.faqs}>
              {guide.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}<span>＋</span></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside>
          <div className={styles.sticky}>
            <p className={styles.kicker}>LOCAL DA NANG SUPPORT</p>
            <h3>Send four details.</h3>
            <ul>
              <li>Travel dates</li>
              <li>Adults + children</li>
              <li>Hotel</li>
              <li>Food needs if important</li>
            </ul>
            <a className={styles.whatsapp} href={WA} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
            <a className={styles.internal} href={guide.primaryHref}>{guide.primaryLabel} →</a>
            <p className={styles.small}>Guide language and exact inclusions are confirmed by product before booking.</p>
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <div className={styles.relatedHead}>
          <p className={styles.kicker}>NEXT DECISION</p>
          <h2>Continue planning your India → Da Nang trip</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <a key={item.slug} href={`/in/${item.slug}`}>
              <small>INDIA TRAVEL GUIDE</small>
              <strong>{item.h1}</strong>
              <span>Read next →</span>
            </a>
          ))}
          <a className={styles.featured} href="/in">
            <small>GOVIETSTAY INDIA HUB</small>
            <strong>See all 10 India travel guides</strong>
            <span>Open hub →</span>
          </a>
        </div>
      </section>

      <section className={styles.final}>
        <p>GOVIETSTAY · DA NANG LOCAL TEAM</p>
        <h2>Stop comparing generic packages.<br />Check what fits your actual trip.</h2>
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp GoVietStay</a>
      </section>

      <footer className={styles.footer}>
        <a href="/in">India Travel Hub</a>
        <a href="/">GoVietStay Main</a>
        <span>Da Nang · Hoi An · Hue · Phu Quoc</span>
        <span>Updated {guide.updated}</span>
      </footer>
    </main>
  );
}
