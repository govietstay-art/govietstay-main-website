import styles from "./JapaneseLanding.module.css";

export type JapaneseLandingConfig = {
  canonicalPath: string;
  eyebrow: string;
  title: string;
  lead: string;
  highlights: string[];
  sections: Array<{
    kicker: string;
    title: string;
    body: string;
    bullets?: string[];
    note?: string;
  }>;
  faqs: Array<{ q: string; a: string }>;
  related: Array<{ href: string; title: string; text: string }>;
  ctaTitle: string;
  ctaText: string;
  whatsappText: string;
};

const WA = "https://wa.me/84937762607";

export default function JapaneseLanding({ config }: { config: JapaneseLandingConfig }) {
  const url = `https://www.govietstay.com${config.canonicalPath}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    url,
    inLanguage: "ja-JP",
    isPartOf: {
      "@type": "WebSite",
      name: "GoVietStay",
      url: "https://www.govietstay.com",
    },
    about: {
      "@type": "TravelAgency",
      name: "GoVietStay",
      areaServed: ["Da Nang", "Hoi An", "Hue", "Phu Quoc"],
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
  const wa = `${WA}?text=${encodeURIComponent(config.whatsappText)}`;

  return (
    <main className={styles.page} lang="ja-JP">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className={styles.topbar}>
        <span>GoVietStay · ベトナム現地サポート</span>
        <span>ダナン · ホイアン · フエ · フーコック</span>
      </div>

      <header className={styles.nav}>
        <a href="/ja" className={styles.brand} aria-label="GoVietStay 日本語">
          <img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>日本語トラベルガイド</small></span>
        </a>
        <nav>
          <a href="/ja/da-nang">ダナン</a>
          <a href="/ja/hoi-an">ホイアン</a>
          <a href="/ja/hue">フエ</a>
          <a href="/ja/phu-quoc">フーコック</a>
          <a className={styles.navCta} href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p>{config.eyebrow}</p>
          <h1>{config.title}</h1>
          <h2>{config.lead}</h2>
          <div className={styles.actions}>
            <a href="#guide">旅のポイントを見る</a>
            <a href={wa} target="_blank" rel="noreferrer">旅程を相談する</a>
          </div>
          <div className={styles.chips}>
            {config.highlights.map((x) => <span key={x}>✓ {x}</span>)}
          </div>
        </div>
        <aside className={styles.trust}>
          <small>TRUSTED LOCAL SUPPORT</small>
          <h2>予約の前に、まず旅程を整理します。</h2>
          <p>フライト、ホテル、人数、子どもの年齢、行きたい場所を送ってください。移動時間と天候を考え、無理のない順番を一緒に確認します。</p>
          <a href={wa} target="_blank" rel="noreferrer">WhatsAppで相談 →</a>
        </aside>
      </section>

      <section className={styles.quick}>
        <a href="/ja/da-nang"><small>DA NANG</small><b>ダナン</b><span>海・街・中部観光の拠点 →</span></a>
        <a href="/ja/hoi-an"><small>HOI AN</small><b>ホイアン</b><span>旧市街・食・夜の散策 →</span></a>
        <a href="/ja/hue"><small>HUE</small><b>フエ</b><span>王宮・歴史・ハイヴァン峠 →</span></a>
        <a href="/ja/phu-quoc"><small>PHU QUOC</small><b>フーコック</b><span>海・島・リゾート滞在 →</span></a>
      </section>

      <section className={styles.content} id="guide">
        {config.sections.map((s, i) => (
          <article className={styles.section} key={s.title}>
            <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <p className={styles.kicker}>{s.kicker}</p>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              {s.note && <div className={styles.note}>{s.note}</div>}
            </div>
          </article>
        ))}
      </section>

      <section className={styles.faq}>
        <div className={styles.heading}>
          <p>よくある質問</p>
          <h2>日本からベトナム旅行を計画するときに確認したいこと</h2>
        </div>
        <div className={styles.faqGrid}>
          {config.faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </section>

      <section className={styles.related}>
        <div className={styles.heading}><p>次に見る</p><h2>目的地をつなげて考える</h2></div>
        <div className={styles.relatedGrid}>
          {config.related.map((r) => <a href={r.href} key={r.href}><h3>{r.title}</h3><p>{r.text}</p><b>詳しく見る →</b></a>)}
        </div>
      </section>

      <section className={styles.final}>
        <div>
          <p>GOVIETSTAY · LOCAL TEAM IN VIETNAM</p>
          <h2>{config.ctaTitle}</h2>
          <span>{config.ctaText}</span>
        </div>
        <a href={wa} target="_blank" rel="noreferrer">WhatsAppで相談する</a>
      </section>

      <div className={styles.mobile}>
        <a href={wa} target="_blank" rel="noreferrer">旅程相談</a>
        <a href="/ja">日本語トップ</a>
      </div>
    </main>
  );
}
