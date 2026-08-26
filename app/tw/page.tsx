import type { Metadata } from "next";
import { taiwanSeoGuides } from "../../lib/taiwanSeoGuides";
import styles from "./TaiwanHub.module.css";

const WA =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent("您好，我從台灣要去峴港。旅遊日期／人數／飯店是：");

export const metadata: Metadata = {
  title: "峴港自由行 2026｜台灣旅客中越旅遊專區｜GoVietStay",
  description:
    "給台灣旅客的峴港自由行專區：5天4夜、巴拿山、會安、占婆島、機場接送、包車、親子、按摩與越南電子簽證攻略。",
  keywords: [
    "峴港自由行","峴港5天4夜","峴港旅遊","巴拿山","會安",
    "峴港包車","峴港機場接送","占婆島","富國島自由行","峴港親子","越南電子簽證"
  ],
  alternates: {
    canonical: "https://www.govietstay.com/tw",
    languages: {
      "zh-TW": "https://www.govietstay.com/tw",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.govietstay.com/tw",
    siteName: "GoVietStay",
    title: "峴港自由行｜台灣旅客中越旅遊專區｜GoVietStay",
    description: "峴港當地團隊整理的繁體中文旅行決策指南。",
    images: [{
      url: "https://www.govietstay.com/tour/cham-island/guest-on-island.jpg",
      width: 1200, height: 630, alt: "GoVietStay 峴港自由行"
    }],
  },
  robots: { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
};

const essentials = [
  { icon:"🌉", tag:"峴港代表景點", title:"巴拿山・黃金佛手橋", desc:"纜車、黃金橋與法國村，建議安排完整一天。", href:"/tw/ba-na-hills-golden-bridge" },
  { icon:"🏮", tag:"午後到夜晚", title:"會安・迦南島簸箕船", desc:"水椰林＋古城黃昏＋燈籠夜景，一條順路線完成。", href:"/tw/hoi-an-basket-boat" },
  { icon:"🤿", tag:"海上行程", title:"占婆島浮潛", desc:"快艇、海上活動與島上時間，出發前需確認海況。", href:"/tw/cham-island-snorkeling" },
  { icon:"🚐", tag:"自由行交通", title:"機場接送・峴港包車", desc:"航班、飯店與多點外圍交通先固定，旅行更輕鬆。", href:"/tw/danang-airport-transfer" },
];

export default function TaiwanHub() {
  return (
    <main className={styles.page} lang="zh-Hant">
      <div className={styles.topStrip}>🇹🇼 台灣旅客專區 <span>•</span> 繁體中文指南 <span>•</span> 峴港當地團隊</div>
      <header className={styles.nav}>
        <a href="/tw" className={styles.brand}>
          <img src="/logo.png" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>TAIWAN TRAVEL HUB</small></span>
        </a>
        <nav>
          <a href="#guides">旅遊攻略</a><a href="#essentials">熱門行程</a>
          <a href="/ko">한국어</a><a href="/in">India</a><a href="/ru">Русский</a>
          <a className={styles.cta} href={WA} target="_blank" rel="noopener noreferrer">WhatsApp 詢問</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>2026 峴港自由行 · FOR TAIWAN TRAVELLERS</p>
            <h1>不是把景點塞滿，<br/><span>是把峴港玩順。</span></h1>
            <p className={styles.lead}>5 天 4 夜、巴拿山、會安、占婆島、富國島、包車、機場接送、親子與電子簽證，一次用台灣旅客最常搜尋的方式整理。</p>
            <div className={styles.buttons}>
              <a className={styles.primary} href={WA} target="_blank" rel="noopener noreferrer">傳日期・人數・飯店</a>
              <a className={styles.ghost} href="#guides">先看 11 篇攻略</a>
            </div>
            <div className={styles.trust}><span>✓ 峴港當地團隊</span><span>✓ 可用繁體中文傳訊息</span><span>✓ 行前確認包含內容</span><span>✓ 家庭・情侶・小團體</span></div>
          </div>
          <aside className={styles.answer}>
            <small>先傳 4 個資訊就夠</small><h2>不用先做好完整功課。</h2>
            <div><b>1</b><span>旅遊日期</span></div>
            <div><b>2</b><span>成人＋小孩</span></div>
            <div><b>3</b><span>峴港／會安飯店</span></div>
            <div><b>4</b><span>最想去的 2 個地方</span></div>
            <p>我們依當日營運、接送與實際動線再幫你縮小選項。</p>
          </aside>
        </div>
      </section>

      <section className={styles.statbar}>
        <div><small>最常見天數</small><b>5 天 4 夜</b></div>
        <div><small>代表景點</small><b>巴拿山・會安</b></div>
        <div><small>自由行交通</small><b>Grab ＋ 包車混用</b></div>
        <div><small>SEO 語言</small><b>繁體中文・zh-TW</b></div>
      </section>

      <section className={styles.section} id="essentials">
        <div className={styles.sectionHead}><div><p className={styles.darkEye}>峴港四個核心決策</p><h2>先把大方向排好，再補小景點。</h2></div><p>這樣比跟著一長串必去清單走，更適合自由行、親子與帶爸媽。</p></div>
        <div className={styles.essentialGrid}>
          {essentials.map(x=><a key={x.href} href={x.href} className={styles.card}><div><span>{x.icon}</span><small>{x.tag}</small></div><h3>{x.title}</h3><p>{x.desc}</p><b>看完整攻略 →</b></a>)}
        </div>
      </section>

      <section className={styles.dark}>
        <div className={styles.darkInner}>
          <div><p className={styles.eyebrow}>不是翻譯網站</p><h2>台灣旅客的搜尋方式，本來就和韓國、印度不同。</h2></div>
          <div className={styles.reasons}>
            <article><b>01</b><h3>自由行動線</h3><p>Grab、包車、機場接送放在同一個旅行決策裡。</p></article>
            <article><b>02</b><h3>5 天 4 夜</h3><p>依台灣常見旅遊天數設計，不用套別國行程。</p></article>
            <article><b>03</b><h3>繁體中文關鍵字</h3><p>峴港、會安、簸箕船、占婆島等用台灣常見寫法。</p></article>
            <article><b>04</b><h3>官方簽證來源</h3><p>電子簽證規定只引用越南官方，避免舊資訊誤導。</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="guides">
        <div className={styles.sectionHead}><div><p className={styles.darkEye}>11 個 GOOGLE 搜尋入口</p><h2>從你正在搜尋的問題直接開始。</h2></div><p>每篇都有 30 秒重點、實際判斷方式、FAQ、相關文章與 GoVietStay 當地支援入口。</p></div>
        <div className={styles.guides}>
          {taiwanSeoGuides.map((g,i)=><a href={`/tw/${g.slug}`} key={g.slug} className={styles.guide}><span>{String(i+1).padStart(2,"0")}</span><div><small>{g.eyebrow}</small><h3>{g.h1}</h3><p>{g.description}</p><b>閱讀攻略 →</b></div></a>)}
        </div>
      </section>

      <section className={styles.final}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>功課不用全部做完，<br/>先確認你的旅行條件。</h2>
        <span>日期＋人數＋飯店，就是最好的開始。</span>
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp 詢問</a>
      </section>
      <footer className={styles.footer}><a href="/">GoVietStay</a><a href="/tw">台灣旅客專區</a><a href="/ko">韓國</a><a href="/in">India</a><a href="/ru">Русский</a><span>Da Nang · Hoi An · Hue · Phu Quoc</span></footer>
    </main>
  );
}
