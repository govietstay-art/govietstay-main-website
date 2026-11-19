import type { Metadata } from "next";
import { QRCodeSVG } from "qrcode.react";
import { taiwanSeoGuides } from "../../lib/taiwanSeoGuides";
import styles from "./TaiwanHub.module.css";

const LINE = "https://line.me/ti/p/VWxCn8-3Tz";
const WA =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent("您好，我從台灣要去峴港。旅遊日期／人數／飯店是：");

export const metadata: Metadata = {
  title: "越南自由行 2026｜台灣旅客峴港・會安・富國島指南｜GoVietStay",
  description:
    "台灣旅客專屬越南自由行指南：峴港、會安、富國島、親子與包車行程。免費用繁體中文透過 LINE 諮詢在地團隊，了解行前準備及 eSIM 禮遇條件。",
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
          <a className={styles.cta} href={LINE} target="_blank" rel="noopener noreferrer">LINE 免費諮詢</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>台灣旅客專區 · 越南在地旅遊支援</p>
            <h1>第一次來越南，<br/><span>有在地朋友幫你安排。</span></h1>
            <p className={styles.lead}>從峴港、會安到富國島，免費用繁體中文聊行程、交通、在地美食與旅遊注意事項。先問清楚，再決定要不要訂服務。</p>
            <div className={styles.buttons}>
              <a className={styles.primary} href={LINE} target="_blank" rel="noopener noreferrer">加入 LINE 免費諮詢</a>
              <a className={styles.ghost} href="#planner">免費規劃行程</a>
              <a className={styles.ghost} href="#guides">看 11 篇實用攻略</a>
            </div>
            <div className={styles.trust}><span>✓ 越南在地團隊</span><span>✓ 繁體中文訊息</span><span>✓ 免費旅行建議</span><span>✓ 家庭・情侶・小團體</span></div>
          </div>
          <aside className={styles.answer}>
            <small>先傳 4 個資訊就夠</small><h2>不用先做好完整功課。</h2>
            <div><b>1</b><span>旅遊日期</span></div>
            <div><b>2</b><span>成人＋小孩</span></div>
            <div><b>3</b><span>峴港／會安飯店</span></div>
            <div><b>4</b><span>最想去的 2 個地方</span></div>
            <p>我們先幫你看看動線與實際條件，不用急著決定。</p><div className={styles.heroQr}><QRCodeSVG value={LINE} size={112} includeMargin bgColor="#ffffff" fgColor="#103b30" /><span><b>掃描加入 LINE</b><small>也可以直接點上方綠色按鈕</small></span></div>
          </aside>
        </div>
      </section>

      <section className={styles.welcome}>
        <div className={styles.welcomeVisual} role="img" aria-label="越南海岸與海島旅行風景" />
        <div>
          <p className={styles.darkEye}>TRUSTED LOCAL SUPPORT</p>
          <h2>旅行不只是打卡，<br/>更重要的是玩得舒服、安心。</h2>
          <p>如果你第一次來越南，歡迎把問題直接傳給我們。住哪一區比較方便？Grab 還是包車？下雨天怎麼安排？我們會從在地角度告訴你哪些值得去、哪些可以不用勉強。</p>
          <p className={styles.welcomeNote}>不用先買行程，也能先問旅遊問題。</p>
          <a className={styles.inlineLine} href={LINE} target="_blank" rel="noopener noreferrer">在 LINE 上問問在地朋友 →</a>
        </div>
      </section>
      <section className={styles.videoSection} id="travel-video">
        <div className={styles.videoDescription}>
          <p className={styles.darkEye}>30 秒看懂我們的在地支援 · 越南旅行靈感</p>
          <h2>先看看越南，<br/>再慢慢安排你的旅程。</h2>
          <p>在地海景、旅行節奏、行程規劃與 eSIM 資訊，都濃縮在這段繁體中文影片裡。想知道哪個區域適合你？不必等到看完才問。</p>
          <a className={styles.inlineLine} href={LINE} target="_blank" rel="noopener noreferrer">立即用 LINE 問問我們 →</a>
          <p className={styles.videoSmallPrint}>影片內容為旅遊宣傳素材，部分畫面屬示意；實際贈禮與行程安排以確認條件為準。</p>
        </div>
        <div className={styles.videoFrame}>
          <iframe src="https://drive.google.com/file/d/14l07Edp_sYP9C0f_XtMhs-oLi4P_xgsK/preview" title="GoVietStay 越南自由行繁體中文影片" loading="lazy" allow="autoplay; fullscreen; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </div>
      </section>
      <section className={styles.statbar}>
        <div><small>最常見天數</small><b>5 天 4 夜</b></div>
        <div><small>代表景點</small><b>巴拿山・會安</b></div>
        <div><small>自由行交通</small><b>Grab ＋ 包車混用</b></div>
        <div><small>SEO 語言</small><b>繁體中文・zh-TW</b></div>
      </section>

      <section className={styles.section} id="destinations">
        <div className={styles.sectionHead}><div><p className={styles.darkEye}>三個值得慢慢探索的地方</p><h2>你想在越南體驗哪一種旅行？</h2></div><p>先選喜歡的旅行風格，再決定交通和每天的路線，行程會更順。</p></div>
        <div className={styles.destinationGrid}>
          <a href="/tw/danang-free-travel" className={styles.destinationCard}><div className={styles.destinationPhoto} style={{backgroundImage:"url('/tour/cham-island/guest-on-island.jpg')"}}/><div><small>DA NANG · 峴港</small><h3>海邊城市與巴拿山</h3><p>第一次來中越、想兼顧美食、海景與熱門景點。</p><b>查看峴港攻略 →</b></div></a>
          <a href="/tw/hoi-an-basket-boat" className={styles.destinationCard}><div className={styles.destinationGradient}><span>會安 · HOI AN</span></div><div><small>HOI AN · 會安</small><h3>古城、燈籠與慢步調</h3><p>下午出發，到晚上看古城燈籠；不一定要排滿整天。</p><b>查看會安攻略 →</b></div></a>
          <a href="/tw/phu-quoc-free-travel" className={styles.destinationCard}><div className={styles.destinationGradientSea}><span>富國島 · PHU QUOC</span></div><div><small>PHU QUOC · 富國島</small><h3>海島假期與親子放鬆</h3><p>先看住宿區域與南北島路線，再決定是否需要包車。</p><b>查看富國島攻略 →</b></div></a>
        </div>
      </section>
      <section className={styles.planner} id="planner">
        <div><p className={styles.darkEye}>免費行程建議 · FREE LOCAL ADVICE</p><h2>把這 4 件事傳給我們，<br/>就能開始討論行程。</h2><p>旅遊日期、成人及小孩人數、飯店或想住的區域、最想去的地方。還沒訂飯店也沒關係，我們可以先幫你比較方向。</p><a className={styles.inlineLine} href={LINE} target="_blank" rel="noopener noreferrer">打開 LINE，傳送我的旅行計畫 →</a></div>
        <aside className={styles.plannerQr}><QRCodeSVG value={LINE} size={166} includeMargin/><strong>掃碼 LINE 免費詢問</strong><span>越南在地團隊 · 繁體中文溝通</span></aside>
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

      <section className={styles.section} id="practical">
        <div className={styles.sectionHead}><div><p className={styles.darkEye}>出發前真正用得上的資訊</p><h2>這些小事，先搞懂就少走冤枉路。</h2></div><p>不只看景點，也幫你處理自由行最常碰到的疑問。</p></div>
        <div className={styles.tipsGrid}>
          <article><b>01 · 交通</b><h3>Grab 還是包車？</h3><p>市區短程可先比較 Grab；一整天跨區跑景點、有長輩或小孩，先確認包車是否更省力。</p><a href="/tw/danang-private-car">看交通攻略 →</a></article>
          <article><b>02 · 機場</b><h3>接送怎麼安排？</h3><p>先準備航班、飯店、人數和行李件數。遇到深夜抵達，最好事先確認接送方式。</p><a href="/tw/danang-airport-transfer">看接送攻略 →</a></article>
          <article><b>03 · 海島</b><h3>海上行程看天氣</h3><p>占婆島與富國島出海活動都要以當天海況及業者安全決定為準，別把最後一天排得太緊。</p><a href="/tw/cham-island-snorkeling">看海島攻略 →</a></article>
          <article><b>04 · 簽證</b><h3>入境規定先核對官方</h3><p>申請簽證前，請依護照、入境目的與日期確認越南官方最新規定，不要只相信舊貼文。</p><a href="/tw/vietnam-evisa-taiwan">看電子簽證指南 →</a></article>
        </div>
      </section>
      <section className={styles.esim}>
        <div><p className={styles.darkEye}>首次來越南 · 旅行小禮遇</p><h2>第一次來越南？<br/>歡迎詢問 eSIM 贈禮。</h2><p>GoVietStay 為符合活動條件的首次來越南旅遊團體提供 eSIM 贈禮。適用資格、流量、有效期限及數量，請先透過 LINE 詢問並以確認內容為準。</p><a className={styles.inlineLine} href={LINE} target="_blank" rel="noopener noreferrer">透過 LINE 詢問 eSIM 活動 →</a></div>
        <div className={styles.esimBadge}>5G<small>eSIM</small><span>先確認適用條件</span></div>
      </section>
      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}><div><p className={styles.darkEye}>台灣旅客常見問題</p><h2>先回答你最可能想問的事。</h2></div><p>沒找到答案？LINE 可以直接傳問題給在地團隊。</p></div>
        <div className={styles.faqList}>
          <details><summary>第一次去越南，自由行方便嗎？</summary><p>主要觀光區通常能用叫車軟體安排交通。建議先按住宿區域、同行成員與旅行天數排好動線，不用每天塞滿景點。</p></details>
          <details><summary>峴港和富國島，應該選哪裡？</summary><p>想看巴拿山、會安古城與中越文化，可以先研究峴港；想安排海島度假與放鬆節奏，可考慮富國島。出發月份與天氣也很重要。</p></details>
          <details><summary>帶小孩或長輩，行程怎麼安排？</summary><p>建議一天先安排一個主要活動，中間保留休息時間。車型、兒童身高限制、飲食需求與景點步行距離可先告訴我們。</p></details>
          <details><summary>不會越南文，也可以問你們嗎？</summary><p>可以，歡迎用繁體中文在 LINE 留言。請提供日期、人數、飯店與想去的地方，方便我們回覆具體建議。</p></details>
          <details><summary>免費諮詢一定要訂行程嗎？</summary><p>不用。先聊旅行問題與安排方向是免費的；若需要代訂交通、導覽或其他服務，會先確認包含項目和費用。</p></details>
          <details><summary>eSIM 是所有人都免費嗎？</summary><p>不是所有旅客自動符合。這是指定活動贈禮，請透過 LINE 詢問當期條件、庫存、可用裝置與領取方式。</p></details>
        </div>
      </section>
      <section className={styles.final}>
        <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
        <h2>功課不用全部做完，<br/>先確認你的旅行條件。</h2>
        <span>日期＋人數＋飯店，就是最好的開始。</span>
        <a href={LINE} target="_blank" rel="noopener noreferrer">加入 LINE 免費詢問</a>
      </section>
      <div className={styles.mobileLine}><a href={LINE} target="_blank" rel="noopener noreferrer">LINE 免費諮詢 · 直接聯絡在地團隊</a></div>
      <footer className={styles.footer}><a href="/">GoVietStay</a><a href="/tw">台灣旅客專區</a><a href="/ko">韓國</a><a href="/in">India</a><a href="/ru">Русский</a><span>Da Nang · Hoi An · Hue · Phu Quoc</span></footer>
    </main>
  );
}
