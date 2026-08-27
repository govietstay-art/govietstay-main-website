import type {Metadata} from "next";
import {philippinesSeoPages} from "../../lib/philippinesSeoPages";
import {philippinesMarketConfig} from "../../lib/philippinesMarketConfig";
import {philippinesHubVisuals,philippinesGuestPhotos,getPhilippinesVisual} from "../../lib/philippinesVisuals";
import styles from "./PhilippinesHub.module.css";

export const metadata:Metadata={
  title:{absolute:"Vietnam DIY & Private Tours for Filipinos 2026 | Da Nang · Hoi An · Phu Quoc | GoVietStay"},
  description:"GoVietStay Philippines: DIY-friendly Vietnam local support, private tours, airport transfer, Ba Na Hills, Hoi An, Cham Island and Phu Quoc with clear from-prices and WhatsApp help.",
  alternates:{canonical:"https://www.govietstay.com/ph",languages:{"en-PH":"https://www.govietstay.com/ph","en":"https://www.govietstay.com/travel","x-default":"https://www.govietstay.com"}},
  robots:{index:true,follow:true},
  openGraph:{type:"website",url:"https://www.govietstay.com/ph",title:"GoVietStay for Filipino Travelers | DIY + Private Vietnam",description:"Book your flight and hotel yourself. We handle the part that gets complicated once you arrive.",locale:"en_PH",siteName:"GoVietStay"}
};

const bySlug=(slug:string)=>philippinesSeoPages.find(p=>p.slug===slug);
const featured=["ba-na-hills-private-flex","hoi-an-coconut-lantern","cham-island-tour","phu-quoc-3-islands","phu-quoc-4-islands-hon-thom"];

function price(slug:string){
  const p=bySlug(slug); if(!p?.priceKey)return "Get a quote";
  const x=philippinesMarketConfig.prices[p.priceKey]; if(!x)return "Get a quote";
  return `From ₱${new Intl.NumberFormat("en-PH").format(x.approxPhp)} · ${new Intl.NumberFormat("vi-VN").format(x.fromVnd)} VND`;
}

export default function PhilippinesHub(){
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"GoVietStay Philippines",url:"https://www.govietstay.com/ph",inLanguage:"en-PH"};
  return <main className={styles.page} lang="en-PH">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>

    <div className={styles.top}><span>PHILIPPINES → VIETNAM</span><b>Da Nang · Hoi An · Hue · Phu Quoc</b><a href="/travel">Global English →</a></div>
    <header className={styles.nav}>
      <a href="/ph" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>FOR FILIPINO TRAVELERS</small></span></a>
      <nav><a href="#danang">Da Nang</a><a href="#private">Private</a><a href="#phuquoc">Phu Quoc</a><a href="#prices">Prices</a><a className={styles.cta} href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroMain}>
        <img src={philippinesHubVisuals.hero} alt="Hoi An lantern evening for Filipino travelers" fetchPriority="high"/>
        <div className={styles.shade}/>
        <div className={styles.heroCopy}>
          <p>DIY TRAVEL · PRIVATE WHEN IT MATTERS · LOCAL HELP WHEN PLANS CHANGE</p>
          <h1>Book the flight and hotel yourself. <em>We handle the complicated part after you land.</em></h1>
          <h2>For couples, families and barkadas who want Vietnam without joining a package-tour bus: airport transfer, Ba Na Hills, Hoi An, private cars, island tours and real local support.</h2>
          <div className={styles.actions}><a href="#danang">Explore Da Nang</a><a href="#phuquoc">Explore Phu Quoc</a><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>
          <div className={styles.proof}><span>✓ 21-day visa-free for ordinary PH passport*</span><span>✓ Real local photos</span><span>✓ Private options for your own group</span></div>
        </div>
      </div>
      <aside className={styles.answer}>
        <small>START WITH 5 DETAILS</small><h2>No need to choose a tour yet.</h2>
        {["Travel date","How many people","Kids / seniors?","Hotel or resort","What you actually enjoy"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}
        <a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">Send it on WhatsApp</a>
        <p>No payment until the price and inclusions are confirmed.</p>
      </aside>
    </section>

    <section className={styles.quick}>
      <a href="/ph/vietnam-visa-free-for-filipinos"><small>VISA</small><b>21 days visa-free*</b><span>Official rule →</span></a>
      <a href="/ph/manila-to-danang"><small>FLIGHT</small><b>Manila → Da Nang</b><span>Arrival plan →</span></a>
      <a href="/ph/da-nang-family-travel"><small>FAMILY</small><b>Slow it down</b><span>Kids + parents →</span></a>
      <a href="/ph/da-nang-barkada-trip"><small>BARKADA</small><b>Split a private van</b><span>Your own schedule →</span></a>
    </section>

    <section className={styles.section} id="danang">
      <div className={styles.head}><div><p>01 · DA NANG / HOI AN</p><h2>What Filipino DIY travelers actually need after landing.</h2></div><span>Klook is excellent at instant booking. GoVietStay's job is different: flexible local support, private routing and somebody to message when weather, pickup or family plans change.</span></div>
      <div className={styles.cards}>{featured.slice(0,3).map(slug=>{const p=bySlug(slug)!;const v=getPhilippinesVisual(p.slug,p.destination);return <a href={`/ph/${slug}`} key={slug}><div className={styles.photo}><img src={v.hero} alt={p.h1} loading="lazy"/><span>{p.destination}</span></div><div className={styles.body}><h3>{p.h1}</h3><p>{p.hook}</p><div><strong>{price(slug)}</strong><b>See details →</b></div></div></a>})}</div>
    </section>

    <section className={styles.priceZone} id="prices">
      <div className={styles.priceIntro}><p>02 · PHILIPPINES LAUNCH RATES</p><h2>Competitive enough to get the click. Clear enough to keep the trust.</h2><span>Major OTAs set the benchmark, but we do not need fake ₱0 hooks. These are real selected-date 'from' rates. VND is the official booking currency; PHP is a live-market estimate captured when this pack was built.</span></div>
      <div className={styles.priceGrid}>{featured.map(slug=>{const p=bySlug(slug)!;const x=p.priceKey?philippinesMarketConfig.prices[p.priceKey]:null;return <a href={`/ph/${slug}`} key={slug}><small>{p.destination}</small><h3>{p.h1}</h3><strong>{x?`From ₱${new Intl.NumberFormat("en-PH").format(x.approxPhp)}`:"Quote"}</strong><b>{x?`${new Intl.NumberFormat("vi-VN").format(x.fromVnd)} VND`:""}</b><span>Confirm date + inclusions →</span></a>})}</div>
      <p className={styles.disclaimer}>{philippinesMarketConfig.priceDisclaimer}</p>
    </section>

    <section className={styles.privateZone} id="private">
      <div className={styles.privatePhoto}><img src="/happy-travelers/02462467f09771c928865.jpg" alt="GoVietStay private family travel" loading="lazy"/></div>
      <div className={styles.privateCopy}><p>03 · PRIVATE / FAMILY / BARKADA</p><h2>Private does not have to mean luxury. Sometimes it simply means nobody else controls your clock.</h2><div>{["Your group only","Flexible pickup","Kids & senior pace","Food/photo stops","No useless shopping stops"].map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div><a href="/ph/da-nang-private-tour">Build a private day →</a></div>
    </section>

    <section className={styles.phu} id="phuquoc">
      <div className={styles.phuText}><p>04 · PHU QUOC</p><h2>Resort first. Island days second.</h2><span>Phu Quoc is a separate market, not a side page under Da Nang. For Filipino families and couples, the strongest products are resort-based planning, 3 islands, 4 islands + Hon Thom, Safari, VinWonders and private transport.</span><div><a href="/ph/phu-quoc-free-travel">DIY guide</a><a href="/ph/phu-quoc-family-travel">Family</a><a href="/ph/phu-quoc-private-car">Private car</a></div></div>
      <div className={styles.phuCards}>{featured.slice(3).concat(["sunset-town-phu-quoc"]).map(slug=>{const p=bySlug(slug)!;const v=getPhilippinesVisual(p.slug,p.destination);return <a href={`/ph/${slug}`} key={slug}><img src={v.hero} alt={p.h1} loading="lazy"/><div><small>{p.destination}</small><h3>{p.h1}</h3><b>{price(slug)}</b><span>View →</span></div></a>})}</div>
    </section>

    <section className={styles.why}>
      <div className={styles.head}><div><p>05 · WHY DIRECT LOCAL?</p><h2>We are not trying to replace your favorite booking app.</h2></div></div>
      <div className={styles.whyGrid}>
        <div><b>01</b><h3>When plans change</h3><p>Weather, sea conditions, a delayed flight or a tired child are exactly when local support matters.</p></div>
        <div><b>02</b><h3>Private that is actually private</h3><p>If the booking says private car/tour, you do not get random strangers added to that confirmed private component.</p></div>
        <div><b>03</b><h3>Pricing you can compare</h3><p>VND official price + PHP estimate, with the actual inclusions confirmed before payment.</p></div>
        <div><b>04</b><h3>Real trip photos</h3><p>We use real GoVietStay route and guest assets instead of creating a fake perfect holiday with AI.</p></div>
      </div>
    </section>

    <section className={styles.guests}>
      <div className={styles.head}><div><p>06 · REAL GUESTS</p><h2>See real trips before you buy another promise.</h2></div><span>The Philippines market should eventually build its own review flywheel: Google, Klook/Ctrip where relevant, Facebook/TikTok UGC and direct WhatsApp referrals.</span></div>
      <div className={styles.guestStrip}>{philippinesGuestPhotos.map((src,i)=><figure key={src}><img src={src} alt={`GoVietStay guest ${i+1}`} loading="lazy"/></figure>)}</div>
    </section>

    <section className={styles.intent}>
      <div className={styles.head}><div><p>07 · 30 SEARCH INTENTS</p><h2>Not another generic “things to do in Vietnam” blog.</h2></div><span>Each page answers one reason a Filipino DIY traveler would search, compare or ask before buying.</span></div>
      <div className={styles.intentGrid}>{philippinesSeoPages.map(p=><a href={`/ph/${p.slug}`} key={p.slug}><small>{p.destination}</small><h3>{p.h1}</h3><p>{p.hook}</p><b>Open →</b></a>)}</div>
    </section>

    <section className={styles.final}><img src="/tour/cham-island/guest-pickup.jpg" alt="GoVietStay local pickup" loading="lazy"/><div><p>YOUR LOCAL TEAM IN VIETNAM</p><h2>Already booked the flight and hotel? Send the date, people and hotel. We can start from there.</h2><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp GoVietStay</a></div></section>
    <div className={styles.mobile}><a href={philippinesMarketConfig.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="/ph/ba-na-hills-private-flex">🔥 Da Nang</a><a href="/ph/phu-quoc-free-travel">🏝 Phu Quoc</a></div>
  </main>
}
