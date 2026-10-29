import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  Globe2,
  Landmark,
  MapPin,
  MessageCircle,
  Mountain,
  Play,
  ShieldCheck,
  TrainFront,
  Waves,
} from "lucide-react";
import BookingPanel from "./BookingPanel";
import styles from "./page.module.css";

const URL = "https://www.govietstay.com/tours/heritage-train-da-nang-hue";
const RUSSIAN_URL = "https://www.govietstay.com/ru/tours/heritage-train-da-nang-hue";
const MEDIA = "/heritage-train";
const VIDEO = `${MEDIA}/da-nang-hue-heritage-train-journey.mp4`;

export const metadata: Metadata = {
  title: "Da Nang to Hue Heritage Train Day Tour | Hai Van Pass & Imperial City",
  description:
    "Ride the Da Nang–Hue heritage train across Hai Van Pass, explore Hue Imperial City, Thien Mu Pagoda and royal heritage, then return by private car the same day. Plan with GoVietStay.",
  keywords: [
    "Da Nang to Hue heritage train tour",
    "Hue day trip from Da Nang by train",
    "Hai Van Pass scenic train",
    "Da Nang Hue heritage train 2026",
    "Hue Imperial City day tour",
    "Central Vietnam heritage train",
    "Kết nối di sản miền Trung",
  ],
  alternates: { canonical: URL, languages: { en: URL, ru: RUSSIAN_URL, "x-default": URL } },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "GoVietStay",
    title: "The Scenic Way to Hue | Heritage Train Day Tour from Da Nang",
    description:
      "One remarkable day: travel the Hai Van coastline by heritage train, discover the UNESCO-listed Hue monuments, return to Da Nang with local support.",
    images: [
      {
        url: `${MEDIA}/heritage-train-bridge-hai-van.jpeg`,
        width: 1122,
        height: 1402,
        alt: "Scenic heritage train illustration above a green valley and the coastline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Da Nang → Hue by Heritage Train | One-Day Experience",
    description: "Scenic rail across Hai Van Pass, Hue royal monuments and a comfortable same-day return.",
    images: [`${MEDIA}/heritage-train-bridge-hai-van.jpeg`],
  },
};

const itinerary = [
  {
    time: "06:15–06:35",
    icon: CarFront,
    title: "Start in Da Nang",
    detail:
      "Optional hotel pickup and transfer to Da Nang Railway Station. Meet your local coordinator and leave time for boarding.",
    image: null,
  },
  {
    time: "Around 07:05",
    icon: TrainFront,
    title: "The heritage train, via Hai Van Pass",
    detail:
      "Board the morning heritage service toward Hue. Watch the coastline, mountain slopes and Lang Co unfold beyond the windows. The train journey itself is part of the experience.",
    image: `${MEDIA}/da-nang-hue-scenic-railway.jpeg`,
  },
  {
    time: "Around 11:03",
    icon: MapPin,
    title: "Arrive in the imperial city of Hue",
    detail:
      "Meet your arranged local driver and guide. Pause for Hue specialties such as bun bo Hue or a vegetarian lunch, depending on your preference.",
    image: null,
  },
  {
    time: "12:20–14:10",
    icon: Landmark,
    title: "Discover the Imperial Citadel",
    detail:
      "Walk into Hue's royal past at the Citadel and Imperial City, part of the UNESCO-listed Complex of Hue Monuments. The exact route depends on the day's opening conditions.",
    image: null,
  },
  {
    time: "14:30–16:40",
    icon: Waves,
    title: "Thien Mu Pagoda & a royal tomb",
    detail:
      "Continue toward the Perfume River and Thien Mu Pagoda, then choose a royal tomb such as Khai Dinh if time and operating hours allow. We adapt the pace to your group.",
    image: null,
  },
  {
    time: "Around 17:00–19:45",
    icon: CarFront,
    title: "Private-road return to Da Nang",
    detail:
      "Travel back in a pre-arranged vehicle, with a convenient hotel drop-off. Arrival is approximate and depends on traffic and your chosen stops.",
    image: null,
  },
];

const faqs = [
  {
    q: "Can I take the heritage train from Da Nang to Hue and return on the same day?",
    a: "Yes. The most practical full-day option is the morning scenic train from Da Nang to Hue, sightseeing in Hue, and a private car back to Da Nang in the evening. A train in both directions is possible, but leaves far less time for Hue's landmarks.",
  },
  {
    q: "How long is the Da Nang–Hue heritage train ride?",
    a: "Allow roughly three to four hours, including the scheduled stop at Lang Co. One published timetable shows the morning HĐ2 service leaving Da Nang around 07:05 and reaching Hue around 11:03. Actual departure, arrival and service availability must be checked for your travel date.",
  },
  {
    q: "What can we visit in Hue after arriving by train?",
    a: "Our suggested private day tour combines lunch, the Imperial Citadel, Thien Mu Pagoda and, where timing allows, one royal tomb. We prioritize a comfortable pace over trying to fit every monument into one afternoon.",
  },
  {
    q: "Can I return to Da Nang by heritage train instead of car?",
    a: "Yes, subject to confirmed tickets and the operating schedule. The afternoon Hue–Da Nang heritage train can leave around 14:30, which means you would have only a short visit in Hue. We can design a compact Imperial City-focused plan if you prefer rail both ways.",
  },
  {
    q: "Which side of the train has the sea view?",
    a: "On the Da Nang-to-Hue direction, the sea is generally on the left side along the key coastal stretch. Seat orientation can vary, and a particular seat or uninterrupted view cannot be guaranteed.",
  },
  {
    q: "Are train tickets, the tour guide, lunch and entrance fees included?",
    a: "GoVietStay prepares a clear personalized quotation. It will state exactly which train seats, transfers, guide language, meals, monument tickets and other services are included. We will not charge or confirm an itinerary until the details are agreed.",
  },
  {
    q: "Is this tour suitable for children or older travelers?",
    a: "It can be, with an adjusted pace. The heritage train has several hours of seated travel, while the Imperial City includes substantial walking and exposed outdoor areas. Please tell us children's ages and any mobility requirements before we plan your day.",
  },
  {
    q: "What happens if the train timetable or weather changes?",
    a: "Train times, seats, railway operations, road traffic and coastal visibility are outside GoVietStay's control. We reconfirm the train before booking and discuss suitable adjustments if conditions change. The visibility of Hai Van Pass is never guaranteed.",
  },
];

const baseUrl = "https://www.govietstay.com";
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "GoVietStay", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Tours", item: `${baseUrl}/#experiences` },
      { "@type": "ListItem", position: 3, name: "Da Nang to Hue Heritage Train Day Tour", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${URL}#trip`,
    name: "Da Nang to Hue Heritage Train and Imperial City Day Tour",
    description:
      "An independently arranged same-day sightseeing experience from Da Nang to Hue, with a scenic morning heritage train across Hai Van Pass, Hue's UNESCO-listed monuments, and private-car return to Da Nang.",
    url: URL,
    image: [
      `${baseUrl}${MEDIA}/heritage-train-bridge-hai-van.jpeg`,
      `${baseUrl}${MEDIA}/hai-van-heritage-train-coast.jpeg`,
    ],
    provider: { "@id": `${baseUrl}/#organization` },
    touristType: ["International visitors", "Culture travelers", "Scenic railway enthusiasts"],
    touristDestination: [
      { "@type": "City", name: "Hue", containedInPlace: { "@type": "Country", name: "Vietnam" } },
      { "@type": "TouristAttraction", name: "Complex of Hue Monuments", sameAs: "https://whc.unesco.org/en/list/678/" },
    ],
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Da Nang Railway Station" },
        { "@type": "ListItem", position: 2, name: "Hai Van Pass scenic railway" },
        { "@type": "ListItem", position: 3, name: "Hue Railway Station" },
        { "@type": "ListItem", position: 4, name: "Hue Imperial City" },
        { "@type": "ListItem", position: 5, name: "Thien Mu Pagoda and selected royal tomb" },
        { "@type": "ListItem", position: 6, name: "Private-car return to Da Nang" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "The Da Nang–Hue coastline seen from the train",
    description: "Traveler-supplied vertical footage showing coastal scenery from a train window along Central Vietnam's railway.",
    thumbnailUrl: `${baseUrl}${MEDIA}/hai-van-heritage-train-coast.jpeg`,
    contentUrl: `${baseUrl}${VIDEO}`,
    uploadDate: "2026-10-29",
    duration: "PT1M16S",
  },
];

function SectionIntro({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className={styles.sectionIntro}>
      <p className={styles.kicker}>{kicker}</p>
      <h2>{title}</h2>
      {children && <div className={styles.sectionLead}>{children}</div>}
    </div>
  );
}

export default function HeritageTrainPage() {
  const directWhatsApp =
    "https://wa.me/84937762607?text=" +
    encodeURIComponent("Hello GoVietStay, I'd like to plan a Da Nang–Hue heritage train day tour. Please help with train availability, Hue sightseeing and private-car return.");

  return (
    <main className={styles.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="GoVietStay home">
          <Image src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" width={44} height={44} />
          <span><strong>GoVietStay</strong><small>TRUSTED LOCAL SUPPORT</small></span>
        </a>
        <nav className={styles.nav} aria-label="Page navigation">
          <a href="#experience">The experience</a>
          <a href="#itinerary">Itinerary</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href={RUSSIAN_URL} className={styles.headerLang} hrefLang="ru" lang="ru" aria-label="Русская версия">RU</a>
        <a className={styles.headerCta} href="#plan">Plan my journey <ArrowUpRight size={16} /></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroEyebrow}><span className={styles.eyebrowLine} /> CENTRAL VIETNAM <span className={styles.heroDot} /> ONE REMARKABLE DAY</div>
          <h1>Da Nang to Hue <em>Heritage Train</em> Day Tour</h1>
          <p className={styles.heroTagline}>Where the mountains meet the sea, and the journey becomes the destination.</p>
          <p className={styles.heroDescription}>Ride the famous Hai Van coastline by train. Step into Hue&apos;s imperial history. Return to Da Nang comfortably on the same day.</p>
          <div className={styles.heroActions}>
            <a href="#plan" className={styles.primaryButton}>Design my day <ArrowUpRight size={18} /></a>
            <a href="#film" className={styles.textButton}><span className={styles.playCircle}><Play size={16} fill="currentColor" /></span> Watch the journey</a>
          </div>
          <div className={styles.heroFoot}><ShieldCheck size={16} /> Flexible private planning <span /> 24/7 local contact <span /> Clear quote before booking</div>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src={`${MEDIA}/heritage-train-bridge-hai-van.jpeg`}
            alt="Promotional scenic image of a blue train crossing a green bridge near the coast"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.heroImage}
          />
          <div className={styles.heroImageTint} />
          <div className={styles.heroVisualNote}><Mountain size={16} /> THE SCENIC HAI VAN COASTLINE <span>01 / 03</span></div>
          <a href="#experience" className={styles.scrollCue} aria-label="Explore the experience"><ArrowDownRight size={22} /></a>
        </div>
      </section>

      <section className={styles.factRibbon} aria-label="Tour highlights">
        <div><TrainFront /><span><strong>Scenic morning train</strong><small>Da Nang → Hue, via Hai Van Pass</small></span></div>
        <div><Landmark /><span><strong>Hue's royal heritage</strong><small>UNESCO-listed monument complex</small></span></div>
        <div><CarFront /><span><strong>Same-day return</strong><small>Private road transfer to Da Nang</small></span></div>
      </section>

      <section id="experience" className={`${styles.section} ${styles.introSection}`}>
        <div className={styles.introCopy}>
          <SectionIntro kicker="01 / THE EXPERIENCE" title="Not just a transfer. A story unfolding through the window.">
            <p>Some journeys deserve to be taken slowly. On the <strong>Connecting Central Heritage</strong> railway (<span lang="vi">Kết nối di sản miền Trung</span>), the Truong Son mountains rise above one side of the track while the East Sea opens on the other.</p>
            <p>Then Hue takes over: courtyards of the Nguyen dynasty, riverside pagodas, fragrant local food and the quiet grandeur of Vietnam&apos;s former imperial capital.</p>
          </SectionIntro>
          <a className={styles.inlineLink} href="#itinerary">Explore the full-day route <ArrowRight size={17} /></a>
          <div className={styles.introQuote}><span>“</span><p>The best part? You don&apos;t have to choose between the extraordinary train ride and a real afternoon in Hue.</p></div>
        </div>
        <div className={styles.introPhotos}>
          <div className={styles.introPhotoMain}><Image src={`${MEDIA}/hai-van-heritage-train-coast.jpeg`} alt="Promotional image of a heritage-style train travelling above green hills near the sea" fill sizes="(max-width: 800px) 75vw, 32vw" /></div>
          <div className={styles.introPhotoSmall}><Image src={`${MEDIA}/da-nang-hue-scenic-railway.jpeg`} alt="Train winding along a green headland beside the ocean, scenic illustration" fill sizes="(max-width: 800px) 48vw, 20vw" /></div>
          <span className={styles.photoCaption}>PROMOTIONAL IMAGERY <i /> CENTRAL VIETNAM</span>
        </div>
      </section>

      <section id="film" className={styles.filmSection}>
        <div className={styles.filmCopy}>
          <p className={styles.kicker}>02 / A WINDOW ON THE COAST</p>
          <h2>Take a seat.<br /><em>See the world change.</em></h2>
          <p>Look out over beaches, coves, distant fishing boats and the folds of the mountains. Here is the journey as seen from the train window.</p>
          <div className={styles.filmDetails}><span><Play size={15} /> Traveler-supplied footage</span><span><Clock3 size={15} /> 76 seconds</span></div>
        </div>
        <div className={styles.videoFrame}>
          <video controls playsInline preload="none" poster={`${MEDIA}/hai-van-heritage-train-coast.jpeg`} aria-label="Video of the scenic Da Nang to Hue train journey">
            <source src={VIDEO} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <div className={styles.videoNote}>THE VIEW FROM THE TRAIN <span>SCENIC FOOTAGE</span></div>
        </div>
      </section>

      <section id="itinerary" className={`${styles.section} ${styles.itinerarySection}`}>
        <SectionIntro kicker="03 / YOUR DAY, BEAUTIFULLY CONNECTED" title="From coastal railway to royal courtyards.">
          <p>A realistic sample itinerary for travelers who want to experience the train <strong>and</strong> explore Hue without rushing to catch an afternoon return service.</p>
        </SectionIntro>
        <div className={styles.itineraryGrid}>
          <div className={styles.timeline}>
            {itinerary.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className={styles.timelineItem} key={item.title}>
                  <div className={styles.timelineMarker}><Icon size={20} /></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineMeta}><time>{item.time}</time><span>0{index + 1}</span></div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className={styles.routeAside}>
            <div className={styles.routePhoto}><Image src={`${MEDIA}/heritage-train-bridge-hai-van.jpeg`} alt="Promotional scenic railway image in lush mountains" fill sizes="(max-width: 900px) 100vw, 32vw" /></div>
            <div className={styles.routeNote}>
              <p className={styles.kicker}>THE SMART ROUTE</p>
              <h3>Rail there.<br />Explore deeper.<br /><em>Car back.</em></h3>
              <p>Choosing a one-way train leaves more time for the Citadel and riverside sights, with the freedom to adjust your return time.</p>
              <a href="#plan">Get this itinerary <ArrowUpRight size={17} /></a>
            </div>
          </aside>
        </div>
        <div className={styles.disclaimer}><Clock3 size={18} /><p>All times are <strong>illustrative, not a confirmed booking</strong>. The heritage-train timetable published by Vietnam Railways includes a morning Da Nang → Hue HĐ2 service, but sources have displayed differing revisions. We verify train time, ticket inventory, monument hours and road transfer before confirming your trip.</p></div>
      </section>

      <section className={styles.choicesSection}>
        <div className={styles.choicesHeader}><p className={styles.kicker}>04 / CHOOSE YOUR PACE</p><h2>Two ways to travel.<br /><em>One unforgettable coastline.</em></h2></div>
        <div className={styles.choiceCards}>
          <article className={`${styles.choiceCard} ${styles.choiceRecommended}`}>
            <div className={styles.choiceTop}><span>01 / RECOMMENDED</span><span className={styles.choiceBadge}>MORE TIME IN HUE</span></div>
            <TrainFront size={32} strokeWidth={1.2} />
            <h3>Heritage Train +<br />Private Car Return</h3>
            <p>Scenic train one way, a more complete guided afternoon in Hue, and a flexible return to Da Nang by road.</p>
            <ul><li><Check size={16} /> Morning train over Hai Van</li><li><Check size={16} /> Time for Citadel & selected highlights</li><li><Check size={16} /> Hotel drop-off by private car</li></ul>
            <a href="#plan">Ask for this option <ArrowUpRight size={17} /></a>
          </article>
          <article className={styles.choiceCard}>
            <div className={styles.choiceTop}><span>02 / FOR RAIL LOVERS</span><span>SHORTER HUE VISIT</span></div>
            <TrainFront size={32} strokeWidth={1.2} />
            <h3>Heritage Train<br />Both Ways</h3>
            <p>Make the railway the star of your day. Enjoy a compact, carefully selected Hue visit before the afternoon train back.</p>
            <ul><li><Check size={16} /> Scenic rail in both directions</li><li><Check size={16} /> Around 3 hours in Hue on sample times</li><li><Check size={16} /> Depends on return train availability</li></ul>
            <a href="#plan">Ask about two-way rail <ArrowUpRight size={17} /></a>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.practicalSection}`}>
        <div>
          <SectionIntro kicker="05 / GOOD TO KNOW" title="Local advice, clear expectations.">
            <p>We build around your actual travel date, hotel, group size and preferred guide language. No generic promise can replace a confirmed railway seat.</p>
          </SectionIntro>
          <div className={styles.practicalList}>
            <div><CalendarDays /><span><strong>Train schedule</strong><small>Morning HĐ2 / afternoon HĐ3 are sample services only. Final timetable is checked for your day.</small></span></div>
            <div><Globe2 /><span><strong>Guide language</strong><small>English support; request Russian, German, Italian or other languages early, subject to availability.</small></span></div>
            <div><ShieldCheck /><span><strong>Transparent quotation</strong><small>Train fare, guide, vehicle, lunch and monument tickets are itemized in the confirmed quote.</small></span></div>
            <div><Mountain /><span><strong>Views & comfort</strong><small>Coastal visibility and precise seat position depend on conditions and allocation; bring light layers and comfortable shoes.</small></span></div>
          </div>
        </div>
        <aside className={styles.trustCard}>
          <div className={styles.trustCardIcon}><MessageCircle size={30} /></div>
          <p className={styles.kicker}>GO VIET STAY • LOCAL SUPPORT</p>
          <h3>Talk to a real local team before you book.</h3>
          <p>We&apos;ll help match the train journey, actual arrival time and a sightseeing plan that makes sense for your group.</p>
          <a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6" target="_blank" rel="noopener noreferrer" className={styles.reviewLink}>See our Google Maps reviews <ArrowUpRight size={16} /></a>
          <a href={directWhatsApp} target="_blank" rel="noopener noreferrer" className={styles.trustWhatsapp}>WhatsApp +84 937 762 607 <ArrowUpRight size={16} /></a>
        </aside>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faqSection}`}>
        <SectionIntro kicker="06 / ANSWERS BEFORE YOU GO" title="Everything you should know about the Da Nang–Hue heritage train.">
          <p>Practical answers for planning a day trip from Da Nang to Hue, including the timetable trade-off that matters most.</p>
        </SectionIntro>
        <div className={styles.faqList}>{faqs.map(({ q, a }) => <details key={q} className={styles.faqItem}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        <div className={styles.sources}><strong>Planning references</strong><a href="https://ketnoidisan.dsvn.vn/" target="_blank" rel="noopener noreferrer">Vietnam Railways — heritage-train timetable <ArrowUpRight size={14} /></a><a href="https://whc.unesco.org/en/list/678/" target="_blank" rel="noopener noreferrer">UNESCO — Complex of Hue Monuments <ArrowUpRight size={14} /></a><span>Checked 29 October 2026. Railway timings can change.</span></div>
      </section>

      <section id="plan" className={styles.bookingSection}>
        <div className={styles.bookingIntro}>
          <p className={styles.kicker}>07 / LET'S MAKE IT YOURS</p>
          <h2>A window seat.<br />An imperial afternoon.<br /><em>A day worth remembering.</em></h2>
          <p>Tell us when you want to go. We&apos;ll help you design a realistic Da Nang–Hue day tour with the heritage train, local sightseeing and a smooth return.</p>
          <div className={styles.bookingPromise}><ShieldCheck size={18} /><span>Personal itinerary and quotation before any payment. No obligation to book.</span></div>
          <div className={styles.bookingContact}><span>TRUSTED LOCAL SUPPORT</span><a href="mailto:booking@govietstay.com">booking@govietstay.com</a><a href="tel:+84937762607">+84 937 762 607</a></div>
        </div>
        <BookingPanel />
      </section>

      <footer className={styles.footer}>
        <a href="/" className={styles.footerBrand}>GoVietStay<span>Trusted Local Support</span></a>
        <p>Da Nang · Hoi An · Hue · Phu Quoc</p>
        <div><a href="/">Home</a><a href="/tours/phu-quoc">More tours</a><a href="/travel/da-nang-airport-transfer">Airport transfers</a><a href={RUSSIAN_URL} hrefLang="ru" lang="ru">Русская версия</a></div>
        <small>© 2026 GoVietStay. Independent local travel planning; not the railway operator. Timetables and services subject to confirmation.</small>
      </footer>
      <a className={styles.mobileSticky} href="#plan"><MessageCircle size={18} /> Plan my Hue train day <ArrowUpRight size={17} /></a>
    </main>
  );
}
