import type {PhilippinesSeoPage} from "../../../lib/philippinesSeoPages";
import {philippinesMarketConfig} from "../../../lib/philippinesMarketConfig";
import {getPhilippinesVisual} from "../../../lib/philippinesVisuals";
import styles from "./PhilippinesPage.module.css";

function PriceBox({page}:{page:PhilippinesSeoPage}){
  if(!page.priceKey)return <div className={styles.quote}><small>GET A REAL QUOTE</small><h3>Send the date, people and hotel.</h3><p>We quote the actual vehicle/guide/ticket setup instead of pretending every private trip has one price.</p><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">Ask on WhatsApp</a></div>;
  const p=philippinesMarketConfig.prices[page.priceKey]; if(!p)return null;
  return <div className={styles.priceBox}><small>{p.label}</small><h3>From ₱{new Intl.NumberFormat("en-PH").format(p.approxPhp)}</h3><strong>{new Intl.NumberFormat("vi-VN").format(p.fromVnd)} VND</strong><p>{p.note}</p><em>{philippinesMarketConfig.priceDisclaimer}</em><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">Confirm this rate on WhatsApp</a></div>
}

export default function PhilippinesPage({page,related}:{page:PhilippinesSeoPage;related:PhilippinesSeoPage[]}){
  const visual=getPhilippinesVisual(page.slug,page.destination);
  const canonical=`https://www.govietstay.com/ph/${page.slug}`;
  const schema={"@context":"https://schema.org","@type":page.type==="guide"||page.type==="arrival"?"Article":"WebPage",headline:page.h1,description:page.desc,url:canonical,inLanguage:"en-PH",dateModified:page.updated,author:{"@type":"Organization",name:"GoVietStay"}};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:page.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  const privateLike=page.type==="private"||page.slug.includes("family")||page.slug.includes("barkada");
  return <main className={styles.page} lang="en-PH">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>

    <header className={styles.nav}><a href="/ph" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>PHILIPPINES → VIETNAM</small></span></a><nav><a href="/ph">PH home</a><a href="/ph/da-nang-free-travel">Da Nang</a><a href="/ph/phu-quoc-free-travel">Phu Quoc</a><a href="/ph/vietnam-visa-free-for-filipinos">Visa</a><a className={styles.cta} href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav></header>

    <section className={styles.hero}><img src={visual.hero} alt={page.h1} fetchPriority="high"/><div className={styles.shade}/><div className={styles.heroInner}><div><p>{page.destination} · FOR FILIPINO DIY TRAVELERS</p><h1>{page.h1}</h1><h2>{page.desc}</h2><blockquote>{page.hook}</blockquote><div className={styles.actions}><a href="#price">Price / conditions</a><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></div><aside><small>QUICK DECISION</small><h3>Confirm first. Pay second.</h3><p>We confirm date, people, children, hotel and inclusions before locking the booking.</p><div><span>Language</span><b>English support</b></div><div><span>Pricing</span><b>VND + PHP estimate</b></div><div><span>Private</span><b>Your own confirmed group</b></div></aside></div></section>

    <section className={styles.gallery}>{visual.gallery.map((src,i)=><figure key={src}><img src={src} alt={`${visual.label} ${i+1}`} loading="lazy"/>{i===0?<figcaption>Real GoVietStay trip/guest assets</figcaption>:null}</figure>)}</section>
    <section className={styles.scan}>{page.bullets.map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b></div>)}</section>

    {privateLike?<section className={styles.private}><div><img src="/happy-travelers/02462467f09771c928865.jpg" alt="GoVietStay private travel" loading="lazy"/></div><div><p>PRIVATE / FAMILY / BARKADA</p><h2>Your people. Your pace.</h2><span>Date · people · kids/seniors · hotel · what you enjoy · what you do not want</span><p>Private means no strangers are added to the confirmed private vehicle/tour component. Public attractions themselves are still public.</p><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">Build it on WhatsApp</a></div></section>:null}

    <div className={styles.layout}><article>
      <section className={styles.story}><p>01 · WHY THIS PAGE EXISTS</p><h2>{page.h1}</h2><p>{page.desc}</p><blockquote>“{page.hook}”</blockquote></section>
      <section className={styles.check}><p>02 · BEFORE YOU BOOK</p><h2>Three things worth checking</h2>{page.bullets.map(x=><div key={x}>✓ {x}</div>)}</section>
      <section id="price" className={styles.priceSection}><p>03 · PRICE</p><PriceBox page={page}/></section>
      {page.officialUrl?<section className={styles.official}><p>OFFICIAL SOURCE</p><h2>This page includes a rule or transport fact that can change.</h2><span>We link the source so you can verify it yourself before travel.</span><a href={page.officialUrl} target="_blank" rel="noreferrer">Open official/source page ↗</a></section>:null}
      <section className={styles.local}><div><p>04 · WHY LOCAL SUPPORT?</p><h2>Booking apps are great until the trip changes.</h2><span>Weather, sea conditions, flight delays, tired children and last-minute schedule changes are where a local team becomes useful.</span><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">Ask GoVietStay</a></div><img src={visual.gallery[0]} alt={visual.label} loading="lazy"/></section>
      <section className={styles.faq}><p>05 · FAQ</p><h2>Questions people ask before paying</h2>{page.faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</section>
    </article>
    <aside><div className={styles.sticky}><img src={visual.gallery[1]} alt={visual.label} loading="lazy"/><small>FILIPINO DIY TRAVELER?</small><h3>Already have flights + hotel?</h3><p>Send date, people and hotel. That is enough to start.</p><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="/ph/vietnam-visa-free-for-filipinos">Visa-free 21 days →</a><a href="/ph">PH travel hub →</a></div></aside>
    </div>

    <section className={styles.related}><p>YOU MAY ALSO NEED</p><h2>Related pages</h2><div>{related.map(x=>{const v=getPhilippinesVisual(x.slug,x.destination);return <a href={`/ph/${x.slug}`} key={x.slug}><img src={v.hero} alt={x.h1} loading="lazy"/><div><small>{x.destination}</small><b>{x.h1}</b><span>Open →</span></div></a>})}</div></section>
    <div className={styles.mobile}><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="/ph/ba-na-hills-private-flex">🔥 Da Nang</a><a href="/ph/phu-quoc-free-travel">🏝 Phu Quoc</a></div>
  </main>
}
