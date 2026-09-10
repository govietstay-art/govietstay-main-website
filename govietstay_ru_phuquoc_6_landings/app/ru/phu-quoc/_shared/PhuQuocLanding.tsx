import styles from "./landing.module.css";

export type Fact = { label: string; value: string };
export type Section = {
  kicker?: string;
  title: string;
  body?: string;
  bullets?: string[];
  note?: string;
};
export type Faq = { q: string; a: string };
export type Related = { href: string; title: string; text: string };

export type LandingConfig = {
  eyebrow: string;
  title: string;
  lead: string;
  chips: string[];
  facts: Fact[];
  sections: Section[];
  faqs: Faq[];
  related: Related[];
  ctaTitle?: string;
  ctaText?: string;
  whatsappText?: string;
};

const SITE = "https://www.govietstay.com";
const WHATSAPP = "84937762607";

export default function PhuQuocLanding({ config }: { config: LandingConfig }) {
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    config.whatsappText ||
      "Здравствуйте! Планирую поездку на Фукуок. Даты поездки: ____. Отель: ____. Гостей: ____. Помогите, пожалуйста, составить план отдыха."
  )}`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <a className={styles.back} href="/ru/phu-quoc">← Фукуок на русском</a>
          <div className={styles.eyebrow}>{config.eyebrow}</div>
          <h1>{config.title}</h1>
          <p className={styles.lead}>{config.lead}</p>

          <div className={styles.chips}>
            {config.chips.map((chip) => <span key={chip}>{chip}</span>)}
          </div>

          <div className={styles.heroActions}>
            <a className={styles.primary} href={whatsapp} target="_blank" rel="noreferrer">
              Получить бесплатный план в WhatsApp
            </a>
            <a className={styles.secondary} href="/ru/tours/phu-quoc">
              Посмотреть экскурсии
            </a>
          </div>

          <p className={styles.microcopy}>
            Отправьте даты поездки, отель, количество гостей и возраст детей — GoVietStay подскажет подходящий маршрут без обязательства бронировать.
          </p>

          <div className={styles.facts}>
            {config.facts.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.updated}>Обновлено: сентябрь 2026 · GoVietStay Phu Quoc</div>

          {config.sections.map((section, i) => (
            <article className={styles.section} key={`${section.title}-${i}`}>
              {section.kicker && <div className={styles.kicker}>{section.kicker}</div>}
              <h2>{section.title}</h2>
              {section.body && <p>{section.body}</p>}
              {section.bullets && (
                <ul>
                  {section.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
              {section.note && <div className={styles.note}>{section.note}</div>}
            </article>
          ))}

          <section className={styles.cta}>
            <div>
              <div className={styles.kicker}>Бесплатная помощь до поездки</div>
              <h2>{config.ctaTitle || "Не знаете, как собрать дни на Фукуоке?"}</h2>
              <p>
                {config.ctaText ||
                  "Напишите даты поездки и название отеля — мы бесплатно поможем составить план отдыха на Фукуоке."}
              </p>
            </div>
            <a className={styles.primary} href={whatsapp} target="_blank" rel="noreferrer">
              Написать GoVietStay
            </a>
          </section>

          <section className={styles.relatedWrap}>
            <div className={styles.kicker}>Продолжить планирование</div>
            <h2>Полезные страницы по Фукуоку</h2>
            <div className={styles.relatedGrid}>
              {config.related.map((item) => (
                <a className={styles.related} href={item.href} key={item.href}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <b>Открыть →</b>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.faq}>
            <div className={styles.kicker}>FAQ</div>
            <h2>Частые вопросы</h2>
            <div className={styles.faqList}>
              {config.faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <footer className={styles.footer}>
            <strong>GoVietStay · Trusted Local Support</strong>
            <span>Фукуок · Дананг · Хойан · Хюэ</span>
            <a href={SITE}>GoVietStay.com</a>
          </footer>
        </div>
      </section>

      <a className={styles.mobileCta} href={whatsapp} target="_blank" rel="noreferrer">
        План поездки в WhatsApp
      </a>
    </main>
  );
}
