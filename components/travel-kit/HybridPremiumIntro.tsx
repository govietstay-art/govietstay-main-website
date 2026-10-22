import Image from "next/image";
import Link from "next/link";
import type { CityId, Lang } from "@/lib/travel-kit/types";
import styles from "./travel-kit.module.css";

const INTRO: Record<Lang, {
  eyebrow: string;
  title: string;
  lineOne: string;
  lineTwo: string;
  overline: string;
  description: string;
  planner: string;
  esim: string;
  assurance: string;
  imageAlt: string;
  storyTop: string;
  storyBig: string;
  storyAccent: string;
  storyText: string;
  chapterTop: string;
  chapterTitle: string;
  chapterAccent: string;
  chapterText: string;
  discover: string;
  scroll: string;
  items: [string, string, string];
  artNote: string;
}> = {
  en: {
    eyebrow: "YOUR FREE VIETNAM TRAVEL COMPANION",
    title: "Vietnam, beautifully within reach.",
    lineOne: "VIETNAM",
    lineTwo: "IS CALLING.",
    overline: "LOCAL KNOW-HOW. UNFORGETTABLE DAYS.",
    description: "The best adventures start with a little local knowledge. Plan with confidence, discover more and carry Vietnam in your pocket.",
    planner: "Plan my family trip",
    esim: "Explore the eSIM gift",
    assurance: "Free travel tools · eSIM by request · Local support",
    imageAlt: "",
    storyTop: "NOT JUST ANOTHER TRAVEL GUIDE",
    storyBig: "MORE DISCOVERY.",
    storyAccent: "LESS WORRY.",
    storyText: "Real local insights, thoughtful planning tools and a human to message when you need one. Everything together, beautifully simple.",
    chapterTop: "FOUR PLACES. COUNTLESS STORIES.",
    chapterTitle: "CHOOSE YOUR",
    chapterAccent: "NEXT CHAPTER.",
    chapterText: "Mountains, lantern-lit streets, imperial history and island escapes are all waiting.",
    discover: "EXPLORE GUIDE",
    scroll: "SCROLL TO EXPLORE",
    items: ["PLAN YOUR TRIP", "STAY CONNECTED", "DISCOVER MORE"],
    artNote: "Illustrative destination artwork. Explore each guide for practical local information.",
  },
  ru: {
    eyebrow: "ВАШ БЕСПЛАТНЫЙ СПУТНИК ПО ВЬЕТНАМУ",
    title: "Вьетнам ближе, чем кажется.",
    lineOne: "ВЬЕТНАМ",
    lineTwo: "ЗОВЁТ ВАС.",
    overline: "МЕСТНЫЕ СОВЕТЫ. НЕЗАБЫВАЕМЫЕ ДНИ.",
    description: "Лучшие приключения начинаются с советов местных. Планируйте уверенно, открывайте больше и путешествуйте легко.",
    planner: "Спланировать семейный отдых",
    esim: "Узнать о подарочной eSIM",
    assurance: "Бесплатные инструменты · eSIM по запросу · Местная поддержка",
    imageAlt: "",
    storyTop: "БОЛЬШЕ, ЧЕМ ПУТЕВОДИТЕЛЬ",
    storyBig: "БОЛЬШЕ ОТКРЫТИЙ.",
    storyAccent: "МЕНЬШЕ ЗАБОТ.",
    storyText: "Местные рекомендации, удобные инструменты и реальная поддержка — всё под рукой.",
    chapterTop: "ЧЕТЫРЕ МЕСТА. МНОЖЕСТВО ИСТОРИЙ.",
    chapterTitle: "ВЫБЕРИТЕ СВОЮ",
    chapterAccent: "СЛЕДУЮЩУЮ ГЛАВУ.",
    chapterText: "Горы, фонари, императорская история и тропические острова ждут вас.",
    discover: "ПУТЕВОДИТЕЛЬ",
    scroll: "ЛИСТАЙТЕ ДАЛЬШЕ",
    items: ["ПЛАНИРУЙТЕ", "БУДЬТЕ НА СВЯЗИ", "ОТКРЫВАЙТЕ"],
    artNote: "Художественные иллюстрации. Подробности — в путеводителях по городам.",
  },
  it: {
    eyebrow: "IL TUO COMPAGNO DI VIAGGIO GRATUITO",
    title: "Il Vietnam, a portata di meraviglia.",
    lineOne: "IL VIETNAM",
    lineTwo: "TI CHIAMA.",
    overline: "CONSIGLI LOCALI. GIORNI INDIMENTICABILI.",
    description: "Le avventure migliori iniziano con i consigli di chi vive qui. Organizza, scopri e porta il Vietnam sempre con te.",
    planner: "Organizza il viaggio in famiglia",
    esim: "Scopri l'eSIM omaggio",
    assurance: "Strumenti gratuiti · eSIM su richiesta · Assistenza locale",
    imageAlt: "",
    storyTop: "MOLTO PIÙ DI UNA GUIDA",
    storyBig: "PIÙ SCOPERTE.",
    storyAccent: "MENO PENSIERI.",
    storyText: "Consigli locali, strumenti pratici e una persona vera da contattare quando serve. Tutto in un unico posto.",
    chapterTop: "QUATTRO DESTINAZIONI. MILLE STORIE.",
    chapterTitle: "SCEGLI IL TUO",
    chapterAccent: "PROSSIMO CAPITOLO.",
    chapterText: "Montagne, lanterne, storia imperiale e spiagge tropicali ti aspettano.",
    discover: "SCOPRI LA GUIDA",
    scroll: "SCORRI PER ESPLORARE",
    items: ["ORGANIZZA", "RESTA CONNESSO", "SCOPRI DI PIÙ"],
    artNote: "Illustrazioni delle destinazioni. Consulta le guide per informazioni locali.",
  },
};

const DESTINATIONS: { city: CityId; label: string; slug: string; image: string; caption: string }[] = [
  { city: "danang", label: "DA NANG", slug: "da-nang", image: "/travel-kit/hybrid-premium/destination-v2-0.webp", caption: "01 / COAST & MOUNTAINS" },
  { city: "hoian", label: "HOI AN", slug: "hoi-an", image: "/travel-kit/hybrid-premium/destination-v2-1.webp", caption: "02 / LANTERN NIGHTS" },
  { city: "hue", label: "HUE", slug: "hue", image: "/travel-kit/hybrid-premium/destination-v2-2.webp", caption: "03 / IMPERIAL HERITAGE" },
  { city: "phuquoc", label: "PHU QUOC", slug: "phu-quoc", image: "/travel-kit/hybrid-premium/destination-v2-3.webp", caption: "04 / ISLAND ESCAPE" },
];

export function HybridPremiumIntro({ lang, city }: { lang: Lang; city: CityId }) {
  const t = INTRO[lang];
  const prefix = `/${lang}/travel-kit`;

  const featureLinks = [
    `${prefix}/family-planner?city=${city}`,
    `${prefix}/esim?city=${city}`,
    `${prefix}/tools?city=${city}`,
  ];

  return (
    <div className={styles.hybridExperience}>
      <section className={styles.hybridIntro} aria-label={t.eyebrow}>
        <div className={styles.hybridBackdrop} aria-hidden="true" />
        <div className={styles.hybridGlow} aria-hidden="true" />
        <div className={styles.hybridHeroTop}>
          <span className={styles.hybridEyebrow}><span aria-hidden="true">✳</span> {t.eyebrow}</span>
          <span className={styles.hybridTopYear}>GOVIETSTAY <span aria-hidden="true">✦</span> 2026</span>
        </div>
        <div className={styles.hybridHeroGrid}>
          <div className={styles.hybridIntroCopy}>
            <p className={styles.hybridOverline}>{t.overline}</p>
            <h1 className={styles.hybridHeadline}>
              <span className={styles.hybridTitleLine}>{t.lineOne}</span>
              <span className={`${styles.hybridTitleLine} ${styles.hybridTitleAccent}`}>{t.lineTwo}</span>
            </h1>
            <p className={styles.hybridDescription}>{t.description}</p>
            <div className={styles.hybridActions}>
              <Link className={styles.hybridPrimary} href={featureLinks[0]}>{t.planner} <span aria-hidden="true">↗</span></Link>
              <Link className={styles.hybridSecondary} href={featureLinks[1]}>{t.esim} <span aria-hidden="true">↗</span></Link>
            </div>
            <p className={styles.hybridAssurance}><span aria-hidden="true">●</span> {t.assurance}</p>
          </div>
          <div className={styles.hybridArtStage} aria-hidden="true">
            <div className={styles.hybridArtHalo} />
            <div className={styles.hybridOrbit} />
            <Image className={styles.hybridArtwork} src="/travel-kit/hybrid-premium/3d-travel-companion.webp" alt={t.imageAlt} width={1200} height={800} sizes="(max-width: 767px) 96vw, 520px" priority unoptimized />
            <div className={styles.hybridFloatTicket}><span>✦  FREE TRAVEL KIT</span><small>MADE FOR YOUR ADVENTURE</small></div>
            <div className={styles.hybridFloatSeal}>✳ <small>GO<br />VIET<br />STAY</small></div>
          </div>
        </div>
        <div className={styles.hybridHeroBottom}><span>↓ {t.scroll}</span><span>✦ {t.eyebrow}</span></div>
      </section>

      <div className={styles.hybridTicker} aria-hidden="true">
        <div className={styles.hybridTickerTrack}>
          {[0, 1, 2, 3].map((group) => <span className={styles.hybridTickerGroup} key={group}>
            {t.items.map((item, i) => <span key={`${group}-${i}`}>{item} <b>✳</b></span>)}
          </span>)}
        </div>
      </div>

      <section className={styles.hybridStory} aria-labelledby="hybrid-story-title">
        <div className={styles.hybridSectionTop}><span>✳ {t.storyTop}</span><span>01 / THE EXPERIENCE</span></div>
        <h2 className={styles.hybridStatement} id="hybrid-story-title"><span>{t.storyBig}</span><em>{t.storyAccent}</em></h2>
        <p className={styles.hybridStatementBody}>{t.storyText}</p>
        <div className={styles.hybridFeatureGrid}>
          {t.items.map((item, i) => <Link className={styles.hybridFeature} href={featureLinks[i]} key={i}>
            <span className={styles.hybridFeatureTop}>0{i+1} / {item} <span aria-hidden="true">↗</span></span>
            <span className={styles.hybridFeatureGlyph} aria-hidden="true">{["✳", "◉", "✦"][i]}</span>
            <strong>{[t.planner, t.esim, t.chapterTop][i]}</strong>
            <span className={styles.hybridFeatureGo}>{lang === "ru" ? "ОТКРЫТЬ" : lang === "it" ? "SCOPRI" : "EXPLORE"} <span aria-hidden="true">→</span></span>
          </Link>)}
        </div>
      </section>

      <section className={styles.hybridDestinations} aria-labelledby="hybrid-destinations-title">
        <div className={styles.hybridDestinationIntro}>
          <div><span className={styles.hybridSectionKicker}>✳ {t.chapterTop}</span>
            <h2 className={styles.hybridDestinationHeading} id="hybrid-destinations-title"><span>{t.chapterTitle}</span><em>{t.chapterAccent}</em></h2>
          </div>
          <p>{t.chapterText}</p>
        </div>
        <div className={styles.hybridDestinationGrid}>
          {DESTINATIONS.map((place) => <Link key={place.city} className={styles.hybridDestinationCard} href={`${prefix}/${place.slug}?city=${place.city}`}>
            <Image src={place.image} alt={place.label} width={480} height={560} sizes="(max-width: 540px) 75vw, (max-width: 960px) 42vw, 21vw" unoptimized />
            <span className={styles.hybridDestinationOverlay}><small>{place.caption}</small><strong>{place.label}</strong><span>{t.discover} <span aria-hidden="true">↗</span></span></span>
          </Link>)}
        </div>
        <p className={styles.hybridArtNote}>{t.artNote}</p>
      </section>
    </div>
  );
}
