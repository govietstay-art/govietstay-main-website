import type {ChinaSeoPage} from "../../../lib/chinaSeoPages";
import {chinaMarketConfig} from "../../../lib/chinaMarketConfig";
import {getChinaVisual} from "../../../lib/chinaVisuals";
import styles from "./ChinaPage.module.css";

function PriceBox({page}:{page:ChinaSeoPage}){
  if(!page.priceKey)return <div className={styles.quote}><small>微信询价</small><h3>先发日期、人数和酒店</h3><p>我们先确认路线和真实条件，再报价。不需要一打开页面就付款。</p><a href="#wechat">查看微信二维码</a></div>;
  const p=chinaMarketConfig.prices[page.priceKey];
  if(!p)return null;
  return <div className={styles.priceBox}>
    <small>{p.label}</small>
    <h3>约 ¥{p.approxCny} 起</h3>
    <strong>{new Intl.NumberFormat("vi-VN").format(p.fromVnd)} VND</strong>
    <p>{p.compare}</p>
    <em>{chinaMarketConfig.priceDisclaimer}</em>
    <a href="#wechat">微信确认这个价格</a>
  </div>;
}

export default function ChinaPage({page,related}:{page:ChinaSeoPage;related:ChinaSeoPage[]}){
  const visual=getChinaVisual(page.slug,page.destination);
  const canonical=`https://www.govietstay.com/cn/${page.slug}`;
  const schema={"@context":"https://schema.org","@type":page.type==="guide"||page.type==="arrival"?"Article":"WebPage",headline:page.h1,description:page.desc,url:canonical,inLanguage:"zh-CN",dateModified:page.updated,author:{"@type":"Organization",name:"GoVietStay"}};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:page.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  const privateLike=page.type==="private"||page.slug.includes("family");
  return <main className={styles.page} lang="zh-CN">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>

    <header className={styles.nav}><a href="/cn" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>中国游客 · 越南当地支持</small></span></a><nav><a href="/cn">中国首页</a><a href="/cn/danang-free-travel">岘港</a><a href="/cn/phu-quoc-free-travel">富国岛</a><a href="/cn/vietnam-evisa-chinese-passport">签证</a><a className={styles.navCta} href="#wechat">微信</a></nav></header>

    <section className={styles.hero}><img src={visual.hero} alt={page.h1} fetchPriority="high"/><div className={styles.shade}/><div className={styles.heroInner}><div><p>{page.destination} · 中国游客</p><h1>{page.h1}</h1><h2>{page.desc}</h2><div className={styles.chips}>{page.chips.map(x=><span key={x}>✓ {x}</span>)}</div><div className={styles.actions}><a href="#price">价格 / 条件</a><a href="#wechat">微信咨询</a></div></div><aside><small>30秒看懂</small><h3>先确认，再付款。</h3><p>GoVietStay中国市场目前采用微信确认：日期、人数、儿童、酒店和包含项目写清以后再锁价。</p><div><span>语言</span><b>简体中文</b></div><div><span>价格</span><b>VND + 人民币约数</b></div><div><span>私人团</span><b>确认后不拼陌生客</b></div></aside></div></section>

    <section className={styles.gallery}>{visual.gallery.map((src,i)=><figure key={src}><img src={src} alt={`${visual.label} ${i+1}`} loading="lazy"/>{i===0?<figcaption>GoVietStay真实路线/客人素材</figcaption>:null}</figure>)}</section>

    <section className={styles.scan}>{page.bullets.map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b></div>)}</section>

    {privateLike?<section className={styles.private}><div><img src="/happy-travelers/02462467f09771c928865.jpg" alt="GoVietStay 私人家庭团" loading="lazy"/></div><div><p>PRIVATE · FAMILY</p><h2>先告诉我们谁一起走，再排路线。</h2><span>日期 · 人数 · 孩子年龄 · 酒店 · 喜欢什么 · 不喜欢什么</span><p>私人团确认后不拼陌生客；但景区、缆车或公共设施本身不等于“包场”。</p><a href="#wechat">微信做私人方案</a></div></section>:null}

    <div className={styles.layout}><article>
      <section className={styles.story}><p>01 · 先看这个</p><h2>{page.h1}</h2><p>{page.desc}</p></section>
      <section className={styles.check}><p>02 · 订之前确认</p><h2>不要只看一个最低价</h2>{page.bullets.map(x=><div key={x}>✓ {x}</div>)}</section>
      <section id="price" className={styles.priceSection}><p>03 · 价格</p><PriceBox page={page}/></section>

      {page.officialUrl?<section className={styles.official}><p>官方信息</p><h2>这页涉及签证 / 航班 / 支付政策</h2><span>政策和航班会变化，GoVietStay把官方来源直接放出来，出发前请再核对一次。</span><a href={page.officialUrl} target="_blank" rel="noreferrer">打开官方来源 ↗</a></section>:null}

      <section className={styles.local}><div><p>04 · 当地支持</p><h2>真正需要本地团队，通常是在计划变化的时候。</h2><span>海况、天气、航班延误、孩子累了、想换一天——这些不是一个“立即购买”按钮能解决的。</span><a href="#wechat">找微信客服</a></div><img src={visual.gallery[0]} alt={visual.label} loading="lazy"/></section>

      <section className={styles.faq}><p>05 · 常见问题</p><h2>先把最容易误会的地方说清楚</h2>{page.faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</section>
    </article>

    <aside><div className={styles.sticky} id="wechat"><small>WECHAT · 微信</small><h3>Go Viet Station</h3><img src={chinaMarketConfig.wechatQr} alt="Go Viet Station 微信二维码"/><p>手机：长按保存二维码，在微信扫一扫里从相册识别。</p><b>联系二维码 · 不是付款码</b><a href="/cn">返回中国首页</a></div></aside>
    </div>

    <section className={styles.related}><p>你可能还在看</p><h2>相关页面</h2><div>{related.map(x=>{const v=getChinaVisual(x.slug,x.destination);return <a href={`/cn/${x.slug}`} key={x.slug}><img src={v.hero} alt={x.h1} loading="lazy"/><div><small>{x.destination}</small><b>{x.h1}</b><span>打开 →</span></div></a>})}</div></section>

    <div className={styles.mobile}><a href="#wechat">💬 微信</a><a href="/cn/ba-na-hills-golden-bridge">🔥 岘港</a><a href="/cn/phu-quoc-free-travel">🏝 富国岛</a></div>
  </main>
}
