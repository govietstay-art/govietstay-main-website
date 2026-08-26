import type { TaiwanSeoGuide } from "../../../lib/taiwanSeoGuides";
import styles from "./TaiwanSeoGuidePage.module.css";

const WA = "https://wa.me/84937762607?text=" + encodeURIComponent("您好，我從台灣要去峴港。旅遊日期／人數／飯店是：");

export default function TaiwanSeoGuidePage({ guide, related }: { guide: TaiwanSeoGuide; related: TaiwanSeoGuide[] }) {
  const canonical = `https://www.govietstay.com/tw/${guide.slug}`;
  const articleSchema = {
    "@context":"https://schema.org","@type":"Article",headline:guide.h1,description:guide.description,
    datePublished:"2026-08-26",dateModified:guide.updated,inLanguage:"zh-TW",mainEntityOfPage:canonical,
    author:{"@type":"Organization",name:"GoVietStay",url:"https://www.govietstay.com/tw"},
    publisher:{"@type":"Organization",name:"GoVietStay",logo:{"@type":"ImageObject",url:"https://www.govietstay.com/logo.png"}},
    about:guide.keywords
  };
  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
    {"@type":"ListItem",position:1,name:"GoVietStay",item:"https://www.govietstay.com/"},
    {"@type":"ListItem",position:2,name:"台灣旅客峴港專區",item:"https://www.govietstay.com/tw"},
    {"@type":"ListItem",position:3,name:guide.h1,item:canonical}
  ]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:guide.faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))};

  return <main className={styles.page} lang="zh-Hant">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>

    <header className={styles.nav}>
      <a href="/tw" className={styles.brand}><img src="/logo.png" alt="GoVietStay"/><span><b>GoVietStay</b><small>TAIWAN TRAVEL HUB</small></span></a>
      <nav><a href="/tw">台灣旅客專區</a><a href="/tw/danang-5d4n-itinerary">5天4夜</a><a href="/tw/danang-private-car">峴港包車</a><a className={styles.navCta} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a></nav>
    </header>

    <section className={styles.hero}><div className={styles.heroInner}><div>
      <p className={styles.eyebrow}>{guide.eyebrow}</p><h1>{guide.h1}</h1><p className={styles.lead}>{guide.description}</p>
      <div className={styles.meta}><span>更新 {guide.updated}</span><span>繁體中文指南</span><span>GoVietStay 峴港當地團隊</span></div>
    </div><aside className={styles.answer}><small>30 秒先看重點</small><p>{guide.summary}</p></aside></div></section>

    <section className={styles.quick}>{guide.quick.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b></div>)}</section>

    <div className={styles.layout}><article>
      <div className={styles.note}><b>當地規劃提醒：</b>票價、營運時間、海況與簽證規定都有可能變動；預訂或出發前請再確認最新條件。</div>
      {guide.sections.map(s=><section className={styles.section} key={s.title}><h2>{s.title}</h2>{s.body.map(p=><p key={p}>{p}</p>)}</section>)}
      {guide.officialLinks?.length ? <section className={styles.official}><p className={styles.kicker}>官方來源</p><h2>會變動的規定，只看第一手資訊。</h2><div>{guide.officialLinks.map(l=><a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}</div></section> : null}
      <section className={`${styles.section} ${styles.check}`}><p className={styles.kicker}>儲存這份清單</p><h2>預訂前快速檢查</h2><div>{guide.checklist.map(x=><span key={x}>✓ {x}</span>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>FAQ</p><h2>台灣旅客常問</h2><div className={styles.faq}>{guide.faqs.map(f=><details key={f.q}><summary>{f.q}<span>＋</span></summary><p>{f.a}</p></details>)}</div></section>
    </article><aside><div className={styles.sticky}><p className={styles.kicker}>峴港當地支援</p><h3>先傳 4 個資訊。</h3><ul><li>旅遊日期</li><li>成人＋小孩</li><li>飯店</li><li>最想去的地方</li></ul><a className={styles.whatsapp} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp 詢問</a><a className={styles.internal} href={guide.primaryHref}>{guide.primaryLabel} →</a><p className={styles.small}>可以用繁體中文傳訊息；實際導遊語言與產品包含內容會另外確認。</p></div></aside></div>

    <section className={styles.related}><div className={styles.relatedHead}><p className={styles.kicker}>下一個旅行決策</p><h2>繼續把峴港行程排順</h2></div><div className={styles.relatedGrid}>
      {related.map(r=><a key={r.slug} href={`/tw/${r.slug}`}><small>峴港自由行攻略</small><strong>{r.h1}</strong><span>繼續閱讀 →</span></a>)}
      <a className={styles.featured} href="/tw"><small>GOVIETSTAY TAIWAN HUB</small><strong>回到 11 篇台灣旅客繁中攻略</strong><span>打開專區 →</span></a>
    </div></section>

    <section className={styles.final}><p>GOVIETSTAY · 峴港當地團隊</p><h2>少比較一點通用套裝，<br/>多確認你的實際旅行條件。</h2><a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp GoVietStay</a></section>
    <footer className={styles.footer}><a href="/tw">台灣旅客專區</a><a href="/">GoVietStay</a><span>Da Nang · Hoi An · Hue · Phu Quoc</span><span>更新 {guide.updated}</span></footer>
  </main>;
}
