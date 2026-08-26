import type { Metadata } from "next";
import { indiaSeoGuides } from "../../lib/indiaSeoGuides";
import styles from "./IndiaHub.module.css";

const WA =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent(
    "Hi GoVietStay. I am travelling from India to Da Nang. My travel dates / number of guests / hotel are:"
  );

export const metadata: Metadata = {
  title: "Da Nang Vietnam for Indian Travellers 2026 | GoVietStay",
  description:
    "Plan Da Nang and Central Vietnam from India: visa guide, Ba Na Hills, Hoi An, Cham Island, honeymoon, vegetarian/Jain planning and airport transfers.",
  keywords: [
    "Da Nang from India",
    "Vietnam trip from India",
    "Da Nang tour from India",
    "Vietnam for Indian travellers",
    "Da Nang family tour",
    "Da Nang honeymoon",
    "Vietnam visa for Indians",
    "Indian food in Da Nang",
  ],
  alternates: {
    canonical: "https://www.govietstay.com/in",
    languages: {
      "en-IN": "https://www.govietstay.com/in",
      "ko-KR": "https://www.govietstay.com/ko",
      ru: "https://www.govietstay.com/ru",
      "x-default": "https://www.govietstay.com/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.govietstay.com/in",
    siteName: "GoVietStay",
    title: "Da Nang Vietnam for Indian Travellers | GoVietStay",
    description:
      "Local Da Nang trip planning for Indian families, couples and groups.",
    images: [
      {
        url: "https://www.govietstay.com/tour/cham-island/guest-on-island.jpg",
        width: 1200,
        height: 630,
        alt: "GoVietStay local travel support in Da Nang, Vietnam",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const tours = [
  {
    icon: "🌉",
    tag: "ICONIC DA NANG",
    title: "Ba Na Hills & Golden Bridge",
    desc: "Cable car, Golden Bridge and mountain attractions. Best treated as one full day.",
    note: "Family · Couple · Group",
    href: "/in/ba-na-hills-golden-bridge",
  },
  {
    icon: "🏮",
    tag: "AFTERNOON → EVENING",
    title: "Hoi An & Basket Boat",
    desc: "Coconut Forest in the afternoon, Ancient Town and lantern atmosphere in the evening.",
    note: "Family · Couple",
    href: "/in/hoi-an-basket-boat",
  },
  {
    icon: "🤿",
    tag: "SEA DAY",
    title: "Cham Island Snorkeling",
    desc: "Speedboat, snorkeling and island time. Marine conditions should be checked before departure.",
    note: "From 950,000 VND/adult",
    href: "/in/cham-island-tour",
  },
  {
    icon: "🚐",
    tag: "EASY ARRIVAL",
    title: "Da Nang Airport Transfer",
    desc: "Share flight number, guests, luggage and hotel. Available separately from tour packages.",
    note: "Da Nang · Hoi An",
    href: "/in/danang-airport-transfer",
  },
];

export default function IndiaHub() {
  return (
    <main className={styles.page}>
      <div className={styles.topStrip}>
        🇮🇳 INDIA TRAVEL HUB <span>•</span> ENGLISH SUPPORT <span>•</span> DA NANG LOCAL TEAM
      </div>

      <header className={styles.nav}>
        <a href="/in" className={styles.brand}>
          <img src="/logo.png" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>INDIA TRAVEL HUB</small></span>
        </a>
        <nav>
          <a href="#guides">Travel guides</a>
          <a href="#tours">Da Nang</a>
          <a href="/ko">한국어</a>
          <a href="/ru">Русский</a>
          <a className={styles.navCta} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>VIETNAM · MADE EASIER FOR INDIAN TRAVELLERS</p>
            <h1>
              Plan <span>Da Nang</span> around your family,
              <br />not around a rigid package.
            </h1>
            <p className={styles.lead}>
              Visa basics, Ba Na Hills, Hoi An, Cham Island, airport transfers,
              honeymoon planning and vegetarian/Jain travel checks — built for
              travellers coming from India.
            </p>
            <div className={styles.heroButtons}>
              <a className={styles.primaryBtn} href={WA} target="_blank" rel="noopener noreferrer">
                Send dates · guests · hotel
              </a>
              <a className={styles.ghostBtn} href="#guides">Read India travel guides</a>
            </div>
            <div className={styles.trust}>
              <span>✓ Local Da Nang team</span>
              <span>✓ English WhatsApp support</span>
              <span>✓ Family · Couple · Group</span>
              <span>✓ Clear inclusions before booking</span>
            </div>
          </div>

          <aside className={styles.answerCard}>
            <small>START HERE</small>
            <h2>Four details are enough.</h2>
            <div><b>1</b><span>Travel dates</span></div>
            <div><b>2</b><span>Adults + children</span></div>
            <div><b>3</b><span>Da Nang / Hoi An hotel</span></div>
            <div><b>4</b><span>Food preferences if important</span></div>
            <p>We check pickup, realistic timing and current tour conditions before you confirm.</p>
          </aside>
        </div>
      </section>

      <section className={styles.marketBar}>
        <div><small>INDIA SEARCH INTENT</small><b>Family · Honeymoon · Group</b></div>
        <div><small>CENTRAL VIETNAM BASE</small><b>Da Nang · Hoi An · Hue</b></div>
        <div><small>LOCAL CONTACT</small><b>WhatsApp before & during trip</b></div>
        <div><small>COUNTRY SEO</small><b>English for India · en-IN</b></div>
      </section>

      <section className={styles.section} id="tours">
        <div className={styles.sectionHead}>
          <div><p className={styles.eyebrowDark}>DA NANG ESSENTIALS</p><h2>Build the trip from strong anchor days.</h2></div>
          <p>One major experience per day gives families and couples more useful free time than a checklist with too many transfers.</p>
        </div>
        <div className={styles.tourGrid}>
          {tours.map((tour) => (
            <a key={tour.href} href={tour.href} className={styles.tourCard}>
              <div className={styles.cardTop}><span>{tour.icon}</span><small>{tour.tag}</small></div>
              <h3>{tour.title}</h3>
              <p>{tour.desc}</p>
              <b>{tour.note}</b>
              <strong>View practical guide →</strong>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          <div>
            <p className={styles.eyebrow}>WHY THIS HUB IS DIFFERENT</p>
            <h2>Indian travel needs are not just a language translation.</h2>
          </div>
          <div className={styles.reasonGrid}>
            <article><b>01</b><h3>Dietary clarity</h3><p>Vegetarian and strict Jain are not treated as the same request.</p></article>
            <article><b>02</b><h3>Family pacing</h3><p>Children, parents, luggage and meal timing change the itinerary.</p></article>
            <article><b>03</b><h3>Visa source discipline</h3><p>We point travellers to official Vietnam immigration information.</p></article>
            <article><b>04</b><h3>Local operation checks</h3><p>Sea conditions, pickup and current inclusions are confirmed locally.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="guides">
        <div className={styles.sectionHead}>
          <div><p className={styles.eyebrowDark}>INDIA → VIETNAM SEARCH GUIDES</p><h2>10 pages built around real travel decisions.</h2></div>
          <p>Start with the exact question you are searching for, then move to related guides and local support when you are ready.</p>
        </div>
        <div className={styles.guideGrid}>
          {indiaSeoGuides.map((guide, i) => (
            <a href={`/in/${guide.slug}`} key={guide.slug} className={styles.guideCard}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <small>{guide.eyebrow}</small>
              <h3>{guide.h1}</h3>
              <p>{guide.description}</p>
              <b>Read guide →</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>You do not need a perfect itinerary before you message us.</h2>
        <span>Dates + guests + hotel are enough to start.</span>
        <a href={WA} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
      </section>

      <footer className={styles.footer}>
        <a href="/">GoVietStay Main</a>
        <a href="/in">India Travel Hub</a>
        <a href="/ko">Korean</a>
        <a href="/ru">Russian</a>
        <span>Da Nang · Hoi An · Hue · Phu Quoc</span>
      </footer>
    </main>
  );
}
