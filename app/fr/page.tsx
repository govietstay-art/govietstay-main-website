import type { Metadata } from "next";
import { frenchSeoGuides } from "../../lib/frenchSeoGuides";
import styles from "../ko/_seo/KoreanSeoGuidePage.module.css";

const canonical = "https://www.govietstay.com/fr";
const image = "https://www.govietstay.com/hero-hoian-new.png";
const whatsapp =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent(
    "Bonjour, je prépare un voyage au Vietnam. Mes dates / le nombre de voyageurs / les régions prévues sont :",
  );

export const metadata: Metadata = {
  title: "Voyage Vietnam 2027 | Phu Quoc, Da Nang, Hoi An & Hué",
  description:
    "Guide Vietnam 2027 en français par GoVietStay : Phu Quoc, Da Nang, Hoi An, Hué, voyage en famille, circuit privé, guide francophone sur demande et conseils locaux.",
  keywords: [
    "voyage vietnam",
    "voyage vietnam 2027",
    "voyage vietnam sur mesure",
    "voyage vietnam en famille",
    "guide francophone vietnam",
    "phu quoc que faire",
    "da nang que faire",
    "centre vietnam",
  ],
  alternates: {
    canonical,
    languages: {
      "fr-FR": canonical,
      "x-default": "https://www.govietstay.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: canonical,
    siteName: "GoVietStay",
    title: "Voyage Vietnam 2027 | GoVietStay en français",
    description:
      "Phu Quoc, Da Nang, Hoi An et Hué : des guides pratiques en français pour préparer un voyage plus simple et plus flexible.",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Voyage au Vietnam 2027 avec GoVietStay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyage Vietnam 2027 | GoVietStay",
    description:
      "Guides en français pour Phu Quoc, Da Nang, Hoi An, Hué et les voyages privés au Vietnam.",
    images: [image],
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

const faq = [
  {
    q: "Par où commencer pour un premier voyage au Vietnam ?",
    a: "Commencez par la durée, puis choisissez deux ou trois régions cohérentes. Ensuite seulement, réservez les transferts et les grandes excursions qui ont besoin d'être confirmés à l'avance.",
  },
  {
    q: "Phu Quoc ou le Centre du Vietnam pour un voyage en hiver ?",
    a: "Phu Quoc est particulièrement adapté au séjour balnéaire pendant sa période plus sèche. Da Nang, Hoi An et Hué apportent davantage de patrimoine et de variété, avec une météo à vérifier selon le mois.",
  },
  {
    q: "Peut-on organiser seulement quelques journées privées ?",
    a: "Oui. Vous pouvez réserver vos vols et hôtels vous-même puis utiliser une voiture, un bateau ou un guide privé uniquement pour les journées où cela apporte un vrai avantage.",
  },
  {
    q: "Un guide francophone est-il garanti ?",
    a: "Non. Il doit être demandé et confirmé pour la date et la destination exactes. GoVietStay vérifie la disponibilité avant confirmation.",
  },
];

export default function FrenchHub() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Voyage Vietnam 2027 en français",
    description:
      "Guides GoVietStay en français pour préparer Phu Quoc, Da Nang, Hoi An, Hué, un voyage en famille ou un circuit privé.",
    url: canonical,
    inLanguage: "fr-FR",
    isPartOf: {
      "@type": "WebSite",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: frenchSeoGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.h1,
        url: `${canonical}/${guide.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "GoVietStay",
        item: "https://www.govietstay.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Voyage Vietnam en français",
        item: canonical,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className={styles.page} lang="fr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className={styles.nav}>
        <a href="/fr" className={styles.brand}>
          <img src="/logo.png" alt="GoVietStay" />
          <span>
            <b>GoVietStay</b>
            <small>VIETNAM · GUIDE EN FRANÇAIS</small>
          </span>
        </a>
        <nav>
          <a href="/fr/phu-quoc-que-faire">Phu Quoc</a>
          <a href="/fr/centre-vietnam-da-nang-hoi-an-hue">Centre Vietnam</a>
          <a href="/fr/voyage-vietnam-sur-mesure">Sur mesure</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>VIETNAM · FRANCE · 2027</p>
            <h1>Voyage au Vietnam 2027 : comprendre d'abord, réserver ensuite</h1>
            <p className={styles.lead}>
              Phu Quoc, Da Nang, Hoi An et Hué. Nous avons regroupé les questions que les
              voyageurs francophones posent réellement : quand partir, où loger, que faire,
              comment voyager en famille et quand le privé apporte une vraie valeur.
            </p>
            <div className={styles.meta}>
              <span>Mis à jour 2026-09-15</span>
              <span>GoVietStay · équipe locale Vietnam</span>
              <span>Informations avant réservation</span>
            </div>
          </div>
          <aside className={styles.answerCard}>
            <small>COMMENCER ICI</small>
            <p>
              Définissez d'abord vos dates, le nombre de nuits et deux priorités. Pour un
              séjour balnéaire, commencez par Phu Quoc. Pour culture, cuisine et patrimoine,
              regardez le Centre du Vietnam. Pour un itinéraire complet, partez du guide sur mesure.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.quickWrap}>
        <div><span>01</span><b>Phu Quoc : plage et excursions</b></div>
        <div><span>02</span><b>Da Nang : base pratique</b></div>
        <div><span>03</span><b>Hoi An & Hué : patrimoine</b></div>
        <div><span>04</span><b>Privé : seulement quand utile</b></div>
      </section>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.intro}>
            <p>
              Les recherches françaises autour du Vietnam montrent un intérêt fort pour le
              voyage sur mesure, le guide francophone, le voyage en famille, ainsi que des
              questions très concrètes comme « que faire », « quand partir » et « où loger ».
              Cette section répond d'abord à ces intentions de recherche au lieu de transformer
              chaque page en catalogue de tours.
            </p>
          </div>

          <section className={styles.section}>
            <p className={styles.kicker}>PHU QUOC</p>
            <h2>Une destination à organiser par zone et par météo</h2>
            <p>
              À Phu Quoc, la position de l'hôtel, le nord ou le sud de l'île et les conditions
              de mer ont plus d'impact sur le programme qu'une longue liste d'attractions.
              Commencez par la météo et la zone où dormir, puis choisissez les activités.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>CENTRE DU VIETNAM</p>
            <h2>Da Nang, Hoi An et Hué doivent être pensées comme trois expériences différentes</h2>
            <p>
              Da Nang est pratique et balnéaire, Hoi An se vit particulièrement bien en fin de
              journée, et Hué demande davantage de temps pour l'histoire. Les regrouper est logique,
              mais les visiter au même rythme ne l'est pas.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>GUIDES 2027</p>
            <h2>Choisissez la question qui correspond à votre voyage</h2>
            <div className={styles.relatedGrid}>
              {frenchSeoGuides.map((guide) => (
                <a key={guide.slug} href={`/fr/${guide.slug}`}>
                  <small>{guide.eyebrow}</small>
                  <strong>{guide.h1}</strong>
                  <span>Lire le guide →</span>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>FAQ</p>
            <h2>Avant de commencer votre itinéraire</h2>
            <div className={styles.faqList}>
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span>＋</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className={styles.side}>
          <div className={styles.sticky}>
            <p className={styles.kicker}>ASSISTANCE LOCALE</p>
            <h3>
              Dates · voyageurs · régions
              <br />Trois informations suffisent pour commencer.
            </h3>
            <p>
              Nous pouvons vérifier les transferts, excursions privées et la disponibilité d'un
              guide demandé selon vos dates. Les conditions finales sont toujours confirmées avant paiement.
            </p>
            <a
              className={styles.whatsapp}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Écrire sur WhatsApp
            </a>
            <a className={styles.internal} href="/fr/voyage-vietnam-sur-mesure">
              Préparer un voyage sur mesure →
            </a>
          </div>
        </aside>
      </div>

      <section className={styles.finalCta}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>
          Votre voyage n'a pas besoin de plus d'étapes.
          <br />Il a besoin d'un meilleur rythme.
        </h2>
        <div>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            Parler de mon voyage
          </a>
          <a href="/fr/phu-quoc-que-faire">Découvrir Phu Quoc</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/fr">GoVietStay · Vietnam en français</a>
        <span>Da Nang · Hoi An · Hué · Phu Quoc</span>
        <span>Mis à jour 2026-09-15</span>
      </footer>
    </main>
  );
}
