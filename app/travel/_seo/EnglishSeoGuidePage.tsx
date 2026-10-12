import { englishSeoGuides, type EnglishSeoGuide } from "../../../lib/englishSeoGuides";
import styles from "./EnglishSeoGuidePage.module.css";

const WA = "https://wa.me/84937762607?text=" + encodeURIComponent(
  "Hello GoVietStay. I am planning a Vietnam trip. My dates / guests / hotel are:"
);

export default function EnglishSeoGuidePage({
  guide,
  related,
}: {
  guide: EnglishSeoGuide;
  related: EnglishSeoGuide[];
}) {
  const canonical = `https://www.govietstay.com/travel/${guide.slug}`;
  const isHoTram = guide.slug === "ho-tram-travel-guide";
  const waHref = isHoTram
    ? "https://wa.me/84937762607?text=" + encodeURIComponent("Hello GoVietStay, I read your Ho Tram travel guide. My travel dates, guest count and accommodation preference are:")
    : WA;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    ...(isHoTram ? { image: "https://images.pexels.com/photos/31768434/pexels-photo-31768434.jpeg?cs=srgb" } : {}),
    datePublished: isHoTram ? "2026-10-12" : "2026-08-26",
    dateModified: guide.updated,
    inLanguage: "en",
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com" },
    publisher: {
      "@type": "Organization",
      name: "GoVietStay",
      logo: { "@type": "ImageObject", url: "https://www.govietstay.com/govietstay-logo.jpg" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay", item: "https://www.govietstay.com/" },
      { "@type": "ListItem", position: 2, name: "Travel Guides", item: "https://www.govietstay.com/travel" },
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
        <a href="/" className={styles.brand}>
          <img src="/govietstay-logo.jpg" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>VIETNAM TRAVEL GUIDES</small></span>
        </a>
        <nav>
          <a href="/travel">All guides</a>
          <a href="/tours/ba-na-hills">Ba Na Hills</a>
          <a href="/tours/hoi-an-coconut-forest">Hoi An</a>
          <a className={styles.navCta} href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eye}>{guide.eyebrow}</p>
            <h1>{guide.h1}</h1>
            <p className={styles.lead}>{guide.description}</p>
            <div className={styles.meta}>
              <span>Updated {guide.updated}</span>
              <span>English travel guide</span>
              <span>GoVietStay local team</span>
            </div>
          </div>
          <aside className={styles.answer}>
            <small>30-SECOND ANSWER</small>
            <p>{guide.summary}</p>
          </aside>
        </div>
      </section>

      <section className={styles.quick}>
        {guide.quick.map((item,index)=>(
          <div key={item}><span>{String(index+1).padStart(2,"0")}</span><b>{item}</b></div>
        ))}
      </section>

      {isHoTram && (
        <section className={styles.destinationPhotos} aria-label="Photographs of the Ho Tram coast">
          <div className={styles.destinationPhotoGrid}>
            <figure>
              <img src="https://images.pexels.com/photos/31768434/pexels-photo-31768434.jpeg?cs=srgb&amp;w=1500" alt="Aerial view of the sandy coastline and seaside resorts at Ho Tram, Vietnam" loading="eager" />
              <figcaption>Ho Tram coastline · Photo: <a href="https://www.pexels.com/photo/scenic-aerial-view-of-h-tram-beach-31768434/" target="_blank" rel="noopener noreferrer">Kushie In Vietnam / Pexels</a></figcaption>
            </figure>
            <figure>
              <img src="https://images.pexels.com/photos/31768458/pexels-photo-31768458.jpeg?cs=srgb&amp;w=1100" alt="The wide beachfront at Ho Tram with the pier and coastal landscape" loading="lazy" />
              <figcaption>Ho Tram beachfront · Photo: <a href="https://www.pexels.com/photo/aerial-view-of-h-tram-beach-vietnam-31768458/" target="_blank" rel="noopener noreferrer">Kushie In Vietnam / Pexels</a></figcaption>
            </figure>
          </div>
        </section>
      )}

      <div className={styles.layout}>
        <article>
          <div className={styles.note}>
            <b>Local planning note:</b> prices, schedules, weather-sensitive operations and entry rules can change. Confirm current conditions before non-refundable decisions.
          </div>

          {guide.sections.map((section)=>(
            <section className={styles.section} key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((p)=><p key={p}>{p}</p>)}
            </section>
          ))}

          <section className={`${styles.section} ${styles.check}`}>
            <p className={styles.kicker}>SAVE THIS CHECKLIST</p>
            <h2>Before you confirm the trip</h2>
            <div>{guide.checklist.map((item)=><span key={item}>✓ {item}</span>)}</div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>FAQ</p>
            <h2>Questions travellers ask</h2>
            <div className={styles.faqs}>
              {guide.faqs.map((faq)=>(
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
            <p className={styles.kicker}>LOCAL VIETNAM SUPPORT</p>
            <h3>Send four details.</h3>
            <ul><li>Travel dates</li><li>Adults + children</li><li>Hotel / destination</li><li>Must-do experiences</li></ul>
            <a className={styles.whatsapp} href={waHref} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
            <a className={styles.internal} href={guide.primaryHref}>{guide.primaryLabel} →</a>
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <div className={styles.relatedHead}>
          <p className={styles.kicker}>KEEP PLANNING</p>
          <h2>Related Vietnam travel decisions</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item)=>(
            <a href={`/travel/${item.slug}`} key={item.slug}>
              <small>GOVIETSTAY TRAVEL GUIDE</small>
              <strong>{item.h1}</strong>
              <span>Read next →</span>
            </a>
          ))}
          <a className={styles.featured} href="/travel">
            <small>ENGLISH TRAVEL HUB</small>
            <strong>See all {englishSeoGuides.length} practical travel guides</strong>
            <span>Open hub →</span>
          </a>
        </div>
      </section>
    
      <a
        className={styles.mobileCta}
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ask GoVietStay on WhatsApp"
      >
        <span>Need local help?</span>
        <b>WhatsApp GoVietStay</b>
      </a>
</main>
  );
}
