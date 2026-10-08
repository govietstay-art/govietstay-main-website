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
const LINE_ADD = "https://line.me/ti/p/VWxCn8-3Tz";
const LINE_PHONE = "+84 937 762 607";
const EMAIL = "mailto:govietstay@gmail.com";

const heroByPath: Record<string, string> = {
  "/ja": "/hero-hoian-new.png",
  "/ja/da-nang": "/tour/bana.jpg",
  "/ja/hoi-an": "/hero-hoian-new.png",
  "/ja/hue": "/happy-travelers/02462467f09771c928865.jpg",
  "/ja/phu-quoc": "/tour/cham.jpg",
};

const toursByPath: Record<string, Array<{ title: string; meta: string; price: string; href: string }>> = {
  "/ja": [
    { title: "バーナーヒルズ＆ゴールデンブリッジ", meta: "ダナン · 1日", price: "1,550,000 VND〜 / 大人", href: "/tours/ba-na-hills" },
    { title: "ホイアン旧市街＋ココナッツ村", meta: "ホイアン · 午後〜夜", price: "1,250,000 VND〜 / 大人", href: "/tours/hoi-an-coconut-forest" },
    { title: "フエ王宮・歴史ツアー", meta: "フエ · 1日", price: "1,450,000 VND〜 / 大人", href: "/travel/hue-day-trip-from-da-nang" },
    { title: "チャム島スピードボート＆シュノーケリング", meta: "ダナン / ホイアン · 海", price: "950,000 VND〜 / 大人", href: "/travel/cham-island-snorkeling-guide" },
    { title: "マーブルマウンテン＆ソンチャ", meta: "ダナン · 半日", price: "850,000 VND〜 / 大人", href: "/" },
    { title: "フーコック 3島ボート", meta: "フーコック · 1日", price: "820,000 VND〜 / 大人", href: "/tours/phu-quoc" },
  ],
  "/ja/da-nang": [
    { title: "バーナーヒルズ＆ゴールデンブリッジ", meta: "1日", price: "1,550,000 VND〜 / 大人", href: "/tours/ba-na-hills" },
    { title: "マーブルマウンテン＆ソンチャ", meta: "半日", price: "850,000 VND〜 / 大人", href: "/" },
    { title: "チャム島スピードボート＆シュノーケリング", meta: "海の1日", price: "950,000 VND〜 / 大人", href: "/travel/cham-island-snorkeling-guide" },
    { title: "ホイアン旧市街＋ココナッツ村", meta: "午後〜夜", price: "1,250,000 VND〜 / 大人", href: "/tours/hoi-an-coconut-forest" },
  ],
  "/ja/hoi-an": [
    { title: "ホイアン旧市街＋ココナッツ村", meta: "午後〜夜", price: "1,250,000 VND〜 / 大人", href: "/tours/hoi-an-coconut-forest" },
    { title: "バスケットボート＋クッキングクラス", meta: "ローカル体験", price: "900,000 VND〜 / 大人", href: "/" },
    { title: "チャム島スピードボート＆シュノーケリング", meta: "海の1日", price: "950,000 VND〜 / 大人", href: "/travel/cham-island-snorkeling-guide" },
    { title: "ホイアン・メモリーズショー", meta: "夜の文化体験", price: "2,400,000 VND〜 / 大人", href: "/" },
  ],
  "/ja/hue": [
    { title: "フエ王宮・歴史ツアー", meta: "車 · 1日", price: "1,450,000 VND〜 / 大人", href: "/travel/hue-day-trip-from-da-nang" },
    { title: "フエ王宮＋景観列車", meta: "列車＋観光", price: "1,500,000 VND〜 / 大人", href: "/travel/hue-day-trip-from-da-nang" },
  ],
  "/ja/phu-quoc": [
    { title: "南部フィッシング＆シュノーケリング", meta: "ボート", price: "650,000 VND〜 / 大人", href: "/tours/phu-quoc" },
    { title: "3島ボート", meta: "島巡り＋シュノーケリング", price: "820,000 VND〜 / 大人", href: "/tours/phu-quoc" },
    { title: "3島＋ホントム・ケーブルカー", meta: "島巡り＋ケーブルカー", price: "1,600,000 VND〜 / 大人", href: "/tours/phu-quoc" },
    { title: "4島＋ホントム・ケーブルカー", meta: "人気の1日コース", price: "1,700,000 VND〜 / 大人", href: "/tours/phu-quoc" },
    { title: "2島＋サンセットBBQ", meta: "午後〜夜", price: "1,550,000 VND〜 / 大人", href: "/tours/phu-quoc" },
  ],
};

const gallery = [
  "/happy-travelers/3df6b28f-2fa4-448f-9259-8c9d670ca59c.jpg",
  "/happy-travelers/02462467f09771c928865.jpg",
  "/happy-travelers/02e412c4c634476a1e258.jpg",
  "/happy-travelers/069ebea8-ccc5-4d79-9db3-9f9f8d52e490.jpg",
  "/happy-travelers/34290908ddf85ca605e97.jpg",
  "/happy-travelers/phaohoa%20(1).jpg",
];

export default function JapaneseLanding({ config }: { config: JapaneseLandingConfig }) {
  const url = `https://www.govietstay.com${config.canonicalPath}`;
  const heroImage = heroByPath[config.canonicalPath] ?? "/hero-hoian-new.png";
  const tours = toursByPath[config.canonicalPath] ?? toursByPath["/ja"];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    url,
    inLanguage: "ja-JP",
    isPartOf: { "@type": "WebSite", name: "GoVietStay", url: "https://www.govietstay.com" },
    about: { "@type": "TravelAgency", name: "GoVietStay", areaServed: ["Da Nang", "Hoi An", "Hue", "Phu Quoc"] },
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
          <a className={styles.lineNav} href={LINE_ADD} target="_blank" rel="noreferrer">LINE</a>
          <a className={styles.navCta} href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={heroImage} alt={config.title} fetchPriority="high" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroCopy}>
          <p>{config.eyebrow}</p>
          <h1>{config.title}</h1>
          <h2>{config.lead}</h2>
          <div className={styles.actions}>
            <a href="#guide">旅のポイントを見る</a>
            <a href={LINE_ADD} target="_blank" rel="noreferrer">LINEで相談</a>
            <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div className={styles.chips}>
            {config.highlights.map((x) => <span key={x}>✓ {x}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.contactStrip} aria-label="Contact options">
        <div><b>LINE</b><span>電話番号検索: {LINE_PHONE}</span><a href={LINE_ADD} target="_blank" rel="noreferrer">LINEを開く →</a></div>
        <div><b>WhatsApp</b><span>+84 937 762 607</span><a href={wa} target="_blank" rel="noreferrer">メッセージ →</a></div>
        <div><b>Email</b><span>govietstay@gmail.com</span><a href={EMAIL}>メール →</a></div>
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

      <section className={styles.tours}>
        <div className={styles.heading}>
          <p>TOURS & PRICES</p>
          <h2>人気ツアーと参考料金</h2>
          <span>表示料金は現在の公開「〜」料金です。子ども料金、ホテル送迎、空き状況、祝日追加料金、ガイド言語、含まれるサービスは予約前に確認します。</span>
        </div>
        <div className={styles.tourGrid}>
          {tours.map((tour) => (
            <a className={styles.tourCard} href={tour.href} key={tour.title}>
              <small>{tour.meta}</small>
              <h3>{tour.title}</h3>
              <strong>{tour.price}</strong>
              <span>詳細を見る →</span>
            </a>
          ))}
        </div>
        <div className={styles.priceActions}>
          <a href={LINE_ADD} target="_blank" rel="noreferrer">LINEで料金確認</a>
          <a href={wa} target="_blank" rel="noreferrer">WhatsAppで空き確認</a>
        </div>
      </section>

      <section className={styles.travelers}>
        <div className={styles.heading}>
          <p>HAPPY TRAVELLERS</p>
          <h2>旅先の雰囲気は、実際の写真で見るのがいちばん早い。</h2>
        </div>
        <div className={styles.photoGrid}>
          {gallery.map((src, i) => <img key={src} src={src} alt={`ベトナム旅行の様子 ${i + 1}`} loading="lazy" />)}
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.heading}>
          <p>よくある質問</p>
          <h2>出発前に確認しておきたいこと</h2>
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
        <div><h2>{config.ctaTitle}</h2><span>{config.ctaText}</span></div>
        <div className={styles.finalActions}>
          <a href={LINE_ADD} target="_blank" rel="noreferrer">LINEで相談</a>
          <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </section>

      <div className={styles.mobile}>
        <a href={LINE_ADD} target="_blank" rel="noreferrer">LINE</a>
        <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={EMAIL}>Email</a>
      </div>
    </main>
  );
}
