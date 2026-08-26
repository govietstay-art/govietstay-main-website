import type { Metadata } from "next";
import { englishSeoGuides } from "../../lib/englishSeoGuides";
import styles from "./EnglishTravelHub.module.css";

const WA = "https://wa.me/84937762607?text=" + encodeURIComponent(
  "Hello GoVietStay. I am planning a Vietnam trip. My dates / guests / hotel are:"
);

export const metadata: Metadata = {
  title: { absolute: "Vietnam Travel Guides 2026 | Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay" },
  description:
    "Practical English travel guides for Da Nang, Hoi An, Hue and Phu Quoc: itineraries, things to do, transfers, private cars, e-Visa and local planning.",
  alternates: {
    canonical: "https://www.govietstay.com/travel",
    languages: { en: "https://www.govietstay.com/travel" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.govietstay.com/travel",
    title: "Vietnam Travel Guides | GoVietStay",
    description: "Local-first English travel planning for Da Nang, Hoi An, Hue and Phu Quoc.",
    siteName: "GoVietStay",
  },
};

export default function EnglishTravelHub() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GoVietStay Vietnam Travel Guides",
    url: "https://www.govietstay.com/travel",
    inLanguage: "en",
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: englishSeoGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.h1,
      url: `https://www.govietstay.com/travel/${guide.slug}`,
    })),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className={styles.topbar}>GOVIETSTAY · ENGLISH TRAVEL INTELLIGENCE · UPDATED 2026</div>

      <header className={styles.nav}>
        <a href="/" className={styles.brand}>
          <img src="/govietstay-logo.jpg" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>VIETNAM TRAVEL GUIDES</small></span>
        </a>
        <nav>
          <a href="#guides">Guides</a>
          <a href="/tours/ba-na-hills">Ba Na Hills</a>
          <a href="/tours/hoi-an-coconut-forest">Hoi An</a>
          <a href="/tours/phu-quoc">Phu Quoc</a>
          <a className={styles.navCta} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>VIETNAM, PLANNED LIKE A LOCAL</p>
            <h1>Travel guides that help you <span>make a decision.</span></h1>
            <p className={styles.lead}>
              Da Nang, Hoi An, Hue and Phu Quoc — practical English guides for the questions travellers search before they book.
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#guides">Explore 17 guides</a>
              <a className={styles.secondary} href={WA} target="_blank" rel="noopener noreferrer">Ask a local team</a>
            </div>
          </div>

          <aside className={styles.answer}>
            <small>THE FASTEST WAY TO PLAN</small>
            <h2>Send four details.</h2>
            {["Travel dates","Adults + children","Hotel / destination","Two must-do experiences"].map((item,index)=>(
              <div key={item}><b>{String(index+1).padStart(2,"0")}</b><span>{item}</span></div>
            ))}
            <p>We then check current pickup, operating conditions and a realistic route.</p>
          </aside>
        </div>
      </section>

      <section className={styles.signal}>
        <div><small>CORE BASE</small><b>Da Nang</b></div>
        <div><small>CULTURE</small><b>Hoi An · Hue</b></div>
        <div><small>ISLANDS</small><b>Cham Island · Phu Quoc</b></div>
        <div><small>LANGUAGE</small><b>Global English</b></div>
      </section>

      <section className={styles.section} id="guides">
        <div className={styles.sectionHead}>
          <div>
            <p>GLOBAL ENGLISH SEARCH CLUSTER</p>
            <h2>17 distinct travel decisions. One connected authority hub.</h2>
          </div>
          <span>
            Each guide answers one search intent, links to related planning pages, and directs booking-ready travellers to a real GoVietStay product or WhatsApp.
          </span>
        </div>

        <div className={styles.grid}>
          {englishSeoGuides.map((guide,index)=>(
            <a className={styles.card} key={guide.slug} href={`/travel/${guide.slug}`}>
              <div className={styles.number}>{String(index+1).padStart(2,"0")}</div>
              <small>{guide.eyebrow}</small>
              <h3>{guide.h1}</h3>
              <p>{guide.description}</p>
              <b>Read practical guide →</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.final}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>Research globally. Confirm locally.</h2>
        <span>Dates + guests + hotel are enough to start.</span>
        <a href={WA} target="_blank" rel="noopener noreferrer">Plan on WhatsApp</a>
      </section>
    
      <a
        className={styles.mobileCta}
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ask GoVietStay on WhatsApp"
      >
        <span>Local English support</span>
        <b>WhatsApp GoVietStay</b>
      </a>
</main>
  );
}
