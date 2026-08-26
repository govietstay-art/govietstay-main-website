import type {Metadata} from "next";
import {chinaSeoPages} from "../../lib/chinaSeoPages";
import {chinaMarketConfig} from "../../lib/chinaMarketConfig";
import {chinaHubVisuals,chinaGuestPhotos,getChinaVisual} from "../../lib/chinaVisuals";
import styles from "./ChinaHub.module.css";

export const metadata:Metadata={
  title:{absolute:"中国游客越南自由行 2026 | 岘港·会安·富国岛 | GoVietStay"},
  description:"GoVietStay 中国游客落地服务：岘港、会安、顺化、富国岛，一日游、包车、私人团、亲子、微信中文服务与试运营直客价。",
  alternates:{canonical:"https://www.govietstay.com/cn",languages:{"zh-CN":"https://www.govietstay.com/cn","zh-TW":"https://www.govietstay.com/tw","x-default":"https://www.govietstay.com"}},
  robots:{index:true,follow:true},
  openGraph:{type:"website",url:"https://www.govietstay.com/cn",title:"GoVietStay 中国游客 | 岘港·富国岛当地服务",description:"机票酒店你自己选，落地越南以后，我们在当地帮你。",locale:"zh_CN",siteName:"GoVietStay"},
};

const bySlug=(slug:string)=>chinaSeoPages.find(x=>x.slug===slug);
const money=["ba-na-hills-golden-bridge","hoi-an-coconut-forest","cham-island-tour","hue-day-trip","phu-quoc-three-islands","phu-quoc-four-islands-hon-thom"];

function price(slug:string){
  const p=bySlug(slug);
  if(!p?.priceKey)return "微信询价";
  const x=chinaMarketConfig.prices[p.priceKey];
  if(!x)return "微信询价";
  return `¥${x.approxCny}左右起 · ${new Intl.NumberFormat("vi-VN").format(x.fromVnd)} VND`;
}

export default function ChinaHub(){
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"GoVietStay 中国游客",url:"https://www.govietstay.com/cn",inLanguage:"zh-CN"};
  const featured=["ba-na-hills-golden-bridge","hoi-an-coconut-forest","phu-quoc-three-islands","phu-quoc-four-islands-hon-thom"];
  return <main className={styles.page} lang="zh-CN">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>

    <div className={styles.top}><span>中国游客 · VIỆT NAM</span><b>岘港 · 会安 · 顺化 · 富国岛</b><a href="/tw">繁體中文 / Taiwan →</a></div>
    <header className={styles.nav}>
      <a href="/cn" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>中国游客 · 越南当地支持</small></span></a>
      <nav><a href="#danang">岘港</a><a href="#phuquoc">富国岛</a><a href="#price">价格</a><a href="#wechat">微信</a><a className={styles.navCta} href="#wechat">加微信</a></nav>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroMain}>
        <img src={chinaHubVisuals.main} alt="岘港巴拿山" fetchPriority="high"/>
        <div className={styles.shade}/>
        <div className={styles.heroCopy}>
          <p>不和中国旅行社抢机票酒店 · 我们负责你落地以后</p>
          <h1>机票酒店你自己选，<em>到了越南，我们在当地帮你。</em></h1>
          <h2>岘港、会安、顺化、富国岛：接机、一日游、包车、私人团、亲子行程。价格先看清，日期和包含项目在微信确认。</h2>
          <div className={styles.actions}><a href="#danang">看岘港</a><a href="#phuquoc">看富国岛</a><a href="#wechat">微信咨询</a></div>
          <div className={styles.proof}><span>✓ 简体中文</span><span>✓ 私人团不拼陌生客</span><span>✓ 试运营直客价</span></div>
        </div>
      </div>

      <aside className={styles.wechatHero} id="wechat">
        <small>微信联系 · WECHAT</small>
        <h2>先加好友，再慢慢决定。</h2>
        <img src={chinaMarketConfig.wechatQr} alt="Go Viet Station 微信二维码"/>
        <b>{chinaMarketConfig.wechatName}</b>
        <p>手机打开此页时：长按保存二维码 → 打开微信扫一扫 → 从相册识别。</p>
        <span>这是联系二维码，不是付款码。</span>
      </aside>
    </section>

    <section className={styles.quick}>
      <a href="/cn/phu-quoc-visa-free-30-days"><small>签证</small><b>富国岛30天免签*</b><span>条件要看清 →</span></a>
      <a href="/cn/chengdu-phu-quoc-direct-flight"><small>航班</small><b>成都直飞富国岛</b><span>落地攻略 →</span></a>
      <a href="/cn/alipay-vietnam"><small>支付</small><b>支付宝 + VietQRGlobal</b><span>哪里能用 →</span></a>
      <a href="/cn/wechat-pay-vietnam"><small>支付</small><b>微信支付 + VietQRGlobal</b><span>别和联系QR混淆 →</span></a>
    </section>

    <section className={styles.section} id="danang">
      <div className={styles.head}><div><p>01 · 岘港 / 会安</p><h2>中国游客来岘港，最值得先解决的是这四件事。</h2></div><span>2026年岘港官方旅游推广明确指出，中国客群正在明显转向FIT、年轻、高消费、个性化、美食和打卡型需求；小红书、抖音、微信、Ctrip和Fliggy都是重要决策渠道。</span></div>
      <div className={styles.cards}>
        {featured.slice(0,2).concat(["cham-island-tour","hue-day-trip"]).map(slug=>{const p=bySlug(slug)!;const v=getChinaVisual(p.slug,p.destination);return <a href={`/cn/${slug}`} key={slug}><div className={styles.cardPhoto}><img src={v.hero} alt={p.h1} loading="lazy"/><span>{p.destination}</span></div><div className={styles.cardBody}><h3>{p.h1}</h3><p>{p.desc}</p><div><strong>{price(slug)}</strong><b>查看 →</b></div></div></a>})}
      </div>
    </section>

    <section className={styles.priceZone} id="price">
      <div className={styles.priceIntro}><p>02 · 中国市场试运营价格</p><h2>价格可以有吸引力，但不能玩“0元起”的假钩子。</h2><span>下面的“起价”是我们真实拿来测试中国直客市场的价格。只有微信确认日期、人数和包含项目后才锁价，未确认前不收款。</span></div>
      <div className={styles.priceGrid}>
        {money.map(slug=>{const p=bySlug(slug)!;const x=p.priceKey?chinaMarketConfig.prices[p.priceKey]:null;return <a href={`/cn/${slug}`} key={slug}><small>{p.destination}</small><h3>{p.h1}</h3><strong>{x?`约 ¥${x.approxCny} 起`:"微信询价"}</strong><b>{x?`${new Intl.NumberFormat("vi-VN").format(x.fromVnd)} VND`:""} </b><span>确认日期和包含项目 →</span></a>})}
      </div>
      <p className={styles.disclaimer}>{chinaMarketConfig.priceDisclaimer}</p>
    </section>

    <section className={styles.phu} id="phuquoc">
      <div className={styles.phuText}><p>03 · 富国岛</p><h2>对中国市场，富国岛不是岘港的附属品，是独立主战场。</h2><span>30天免签政策、成都直飞、Hon Thom、Safari、VinWonders和度假村生态，让富国岛天然适合家庭、情侣和“少折腾”的度假客。</span><div><a href="/cn/phu-quoc-free-travel">自由行攻略</a><a href="/cn/phu-quoc-visa-free-30-days">免签30天</a><a href="/cn/phu-quoc-family-travel">亲子</a></div></div>
      <div className={styles.phuCards}>
        {["phu-quoc-three-islands","phu-quoc-four-islands-hon-thom","sunset-town-phu-quoc"].map(slug=>{const p=bySlug(slug)!;const v=getChinaVisual(p.slug,p.destination);return <a href={`/cn/${slug}`} key={slug}><img src={v.hero} alt={p.h1} loading="lazy"/><div><small>{p.destination}</small><h3>{p.h1}</h3><b>{price(slug)}</b><span>查看 →</span></div></a>})}
      </div>
    </section>

    <section className={styles.why}>
      <div className={styles.head}><div><p>04 · 我们能赢在哪里？</p><h2>OTA很强，但它很难替你在越南临时改一天的计划。</h2></div></div>
      <div className={styles.whyGrid}>
        <div><b>01</b><h3>落地以后有人在</h3><p>天气、海况、航班延误、孩子累了、想换一天——这类问题本地团队比大目录更有价值。</p></div>
        <div><b>02</b><h3>私人团可以真的私人</h3><p>确认private后不拼陌生客；车、导游、船哪些部分是私人，会写清楚，不把整个景区说成“包场”。</p></div>
        <div><b>03</b><h3>价格先给你看</h3><p>用“真实可确认的起价”测试市场，不用看起来便宜但根本买不到的0元钩子。</p></div>
        <div><b>04</b><h3>真实照片</h3><p>优先使用GoVietStay已有客人和真实路线照片，不靠AI做一个不存在的完美旅行。</p></div>
      </div>
    </section>

    <section className={styles.guests}>
      <div className={styles.head}><div><p>05 · 真实客人</p><h2>先看别人真的怎么玩，再决定要不要买。</h2></div><span>中国市场后续最重要的资产不是更多广告，而是微信沟通记录、Ctrip评价、小红书真实UGC和真实客人照片。</span></div>
      <div className={styles.guestStrip}>{chinaGuestPhotos.map((src,i)=><figure key={src}><img src={src} alt={`GoVietStay 客人 ${i+1}`} loading="lazy"/></figure>)}</div>
    </section>

    <section className={styles.intent}>
      <div className={styles.head}><div><p>06 · 30个搜索意图</p><h2>不是把台湾繁体字改成简体字，而是重新做中国大陆的搜索结构。</h2></div></div>
      <div className={styles.intentGrid}>{chinaSeoPages.map(p=><a href={`/cn/${p.slug}`} key={p.slug}><small>{p.destination}</small><h3>{p.h1}</h3><p>{p.desc}</p><b>打开 →</b></a>)}</div>
    </section>

    <section className={styles.wechatFinal}>
      <img src="/tour/cham-island/guest-pickup.jpg" alt="GoVietStay 当地支持" loading="lazy"/>
      <div><p>WECHAT · 微信</p><h2>已经订好机票酒店？把日期、人数和酒店发来就够了。</h2><span>先咨询，不需要一上来就付款。</span><a href="#wechat">查看微信二维码</a></div>
    </section>

    <div className={styles.mobile}><a href="#wechat">💬 微信</a><a href="/cn/ba-na-hills-golden-bridge">🔥 岘港</a><a href="/cn/phu-quoc-free-travel">🏝 富国岛</a></div>
  </main>
}
