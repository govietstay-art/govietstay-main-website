import Image from "next/image";
import Link from "next/link";
import type { CityId, Lang } from "@/lib/travel-kit/types";
import styles from "./travel-kit.module.css";

const INTRO: Record<Lang, {
  eyebrow: string;
  title: string;
  description: string;
  planner: string;
  esim: string;
  assurance: string;
  imageAlt: string;
}> = {
  en: {
    eyebrow: "GOVIETSTAY · THE SMART TRAVEL KIT",
    title: "Vietnam, beautifully within reach.",
    description: "An easier way to plan, explore and feel at home. Real local guidance meets your free pocket-sized travel companion.",
    planner: "Plan my family trip",
    esim: "Explore the eSIM gift",
    assurance: "Free travel tools · eSIM by request · Local support",
    imageAlt: "",
  },
  ru: {
    eyebrow: "GOVIETSTAY · УМНЫЙ НАБОР ПУТЕШЕСТВЕННИКА",
    title: "Вьетнам ближе, чем кажется.",
    description: "Планируйте поездку, открывайте новые места и чувствуйте себя уверенно — с местными советами и бесплатными инструментами.",
    planner: "Спланировать семейный отдых",
    esim: "Узнать о подарочной eSIM",
    assurance: "Бесплатные инструменты · eSIM по запросу · Местная поддержка",
    imageAlt: "",
  },
  it: {
    eyebrow: "GOVIETSTAY · SMART TRAVEL KIT",
    title: "Il Vietnam, a portata di meraviglia.",
    description: "Organizza il viaggio, scopri luoghi autentici e parti senza pensieri, con consigli locali e strumenti gratuiti.",
    planner: "Organizza il viaggio in famiglia",
    esim: "Scopri l'eSIM omaggio",
    assurance: "Strumenti gratuiti · eSIM su richiesta · Assistenza locale",
    imageAlt: "",
  },
};

export function HybridPremiumIntro({ lang, city }: { lang: Lang; city: CityId }) {
  const t = INTRO[lang];
  const prefix = `/${lang}/travel-kit`;

  return (
    <section className={styles.hybridIntro} aria-label={t.eyebrow}>
      <div className={styles.hybridIntroCopy}>
        <p className={styles.hybridEyebrow}><span aria-hidden="true">✦</span> {t.eyebrow}</p>
        <h1 className={styles.hybridHeadline}>{t.title}</h1>
        <p className={styles.hybridDescription}>{t.description}</p>
        <div className={styles.hybridActions}>
          <Link className={styles.hybridPrimary} href={`${prefix}/family-planner?city=${city}`}>
            {t.planner} <span aria-hidden="true">↗</span>
          </Link>
          <Link className={styles.hybridSecondary} href={`${prefix}/esim?city=${city}`}>
            {t.esim}
          </Link>
        </div>
        <p className={styles.hybridAssurance}><span aria-hidden="true">●</span> {t.assurance}</p>
      </div>
      <div className={styles.hybridArtwork} aria-hidden="true">
        <Image
          src="/travel-kit/hybrid-premium/3d-travel-companion.webp"
          alt={t.imageAlt}
          width={1200}
          height={800}
          sizes="(max-width: 767px) 380px, 540px"
          priority
          unoptimized
        />
      </div>
      <div className={styles.hybridOrbit} aria-hidden="true" />
    </section>
  );
}
