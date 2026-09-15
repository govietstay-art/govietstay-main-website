import type { FrenchSeoGuide } from "../../../lib/frenchSeoGuides";
import styles from "../../ko/_seo/KoreanSeoGuidePage.module.css";

export default function FrenchGuidePage({
  guide,
  related,
}: {
  guide: FrenchSeoGuide;
  related: FrenchSeoGuide[];
}) {
  const canonical = `https://www.govietstay.com/fr/${guide.slug}`;
  const whatsapp =
    "https://wa.me/84937762607?text=" +
    encodeURIComponent(
      `Bonjour, je prépare un voyage au Vietnam et je consulte votre page « ${guide.h1} ». Mes dates / le nombre de voyageurs / mon hôtel sont :`,
    );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    image: [`https://www.govietstay.com${guide.image}`],
    datePublished: "2026-09-15",
    dateModified: guide.updated,
    inLanguage: "fr-FR",
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "GoVietStay",
      url: "https://www.govietstay.com/fr",
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
        item: "https://www.govietstay.com/fr",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.h1,
        item: canonical,
      },
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
    <main className={styles.page} lang="fr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <small>GUIDE LOCAL · VIETNAM</small>
          </span>
        </a>
        <nav>
          <a href="/fr">Accueil France</a>
          <a href="/fr/phu-quoc-que-faire">Phu Quoc</a>
          <a href="/fr/centre-vietnam-da-nang-hoi-an-hue">Centre Vietnam</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>{guide.eyebrow}</p>
            <h1>{guide.h1}</h1>
            <p className={styles.lead}>{guide.description}</p>
            <div className={styles.meta}>
              <span>Mis à jour {guide.updated}</span>
              <span>GoVietStay · équipe locale Vietnam</span>
              <span>Voyage privé sur demande</span>
            </div>
          </div>
          <aside className={styles.answerCard}>
            <small>EN 30 SECONDES</small>
            <p>{guide.summary}</p>
          </aside>
        </div>
      </section>

      <section className={styles.quickWrap}>
        {guide.quick.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item}</b>
          </div>
        ))}
      </section>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.intro}>
            <p>
              Ce guide privilégie les informations utiles avant la vente. Les horaires,
              tarifs, conditions météo et prestations incluses peuvent évoluer : vérifiez-les
              à nouveau pour vos dates exactes avant toute réservation.
            </p>
          </div>

          {guide.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className={`${styles.section} ${styles.checkSection}`}>
            <p className={styles.kicker}>CHECKLIST À GARDER</p>
            <h2>À vérifier avant de réserver</h2>
            <div className={styles.checkGrid}>
              {guide.checklist.map((item) => (
                <div key={item}>✓ {item}</div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.kicker}>QUESTIONS FRÉQUENTES</p>
            <h2>Ce que les voyageurs demandent souvent</h2>
            <div className={styles.faqList}>
              {guide.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>
                    {faq.q}
                    <span>＋</span>
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className={styles.side}>
          <div className={styles.sticky}>
            <p className={styles.kicker}>ASSISTANCE LOCALE AU VIETNAM</p>
            <h3>
              Dates · voyageurs · hôtel
              <br />Commencez par ces trois informations.
            </h3>
            <p>
              Nous vérifions l'itinéraire, les transferts et les prestations disponibles
              pour vos dates. Un guide francophone, lorsqu'il est demandé, reste soumis à
              disponibilité et doit être confirmé séparément.
            </p>
            <a
              className={styles.whatsapp}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Écrire sur WhatsApp
            </a>
            <a className={styles.internal} href={guide.primaryHref}>
              {guide.primaryLabel} →
            </a>
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <div className={styles.relatedHead}>
          <p className={styles.kicker}>POURSUIVRE LA PRÉPARATION</p>
          <h2>Guides complémentaires</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <a key={item.slug} href={`/fr/${item.slug}`}>
              <small>GUIDE VIETNAM · 2027</small>
              <strong>{item.h1}</strong>
              <span>Lire le guide →</span>
            </a>
          ))}
          <a href="/fr" className={styles.featuredRelated}>
            <small>COMMENCER ICI</small>
            <strong>Préparer son voyage au Vietnam : Phu Quoc, Da Nang, Hoi An et Hué</strong>
            <span>Voir le hub français →</span>
          </a>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>
          Moins de catalogue.
          <br />Plus de réponses adaptées à votre voyage.
        </h2>
        <div>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            Parler de mon voyage
          </a>
          <a href="/fr">Guides en français</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/fr">GoVietStay · Vietnam en français</a>
        <span>Da Nang · Hoi An · Hué · Phu Quoc</span>
        <span>Mis à jour {guide.updated}</span>
      </footer>
    </main>
  );
}
