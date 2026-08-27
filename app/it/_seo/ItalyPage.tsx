import type {ItalySeoPage} from "../../../lib/italySeoPages";
import {italyMarketConfig} from "../../../lib/italyMarketConfig";
import {getItalyVisual} from "../../../lib/italyVisuals";
import styles from "./ItalyPage.module.css";

function PriceBox({page}:{page:ItalySeoPage}){
  if(!page.priceKey)return <div className={styles.quote}><small>PREVENTIVO PRIVATO</small><h3>Prima il vantaggio, poi il prezzo.</h3><p>Mandaci data, persone, hotel e lingua della guida desiderata. Quotiamo solo le componenti che servono davvero.</p><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Chiedi su WhatsApp</a></div>;
  const p=italyMarketConfig.prices[page.priceKey];if(!p)return null;
  return <div className={styles.priceBox}><small>{p.label}</small><h3>circa €{p.eur.toFixed(1).replace(".",",")}</h3><strong>{new Intl.NumberFormat("it-IT").format(p.vnd)} VND</strong><p>{p.note}</p><div className={styles.same}>✓ Stesso prezzo standard del tour English/pubblico</div><em>{italyMarketConfig.priceDisclaimer}</em><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Conferma data e inclusioni</a></div>
}

export default function ItalyPage({page,related}:{page:ItalySeoPage;related:ItalySeoPage[]}){
  const visual=getItalyVisual(page.slug,page.destination);
  const canonical=`https://www.govietstay.com/it/${page.slug}`;
  const schema={"@context":"https://schema.org","@type":page.type==="guide"?"Article":"WebPage",headline:page.h1,description:page.desc,url:canonical,inLanguage:"it-IT",dateModified:page.updated,author:{"@type":"Organization",name:"GoVietStay"}};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:page.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  const privateLike=page.type==="private"||page.slug.includes("bambini")||page.slug.includes("coppia");
  return <main className={styles.page} lang="it-IT">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <header className={styles.nav}><a href="/it" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>ITALIA → VIETNAM</small></span></a><nav><a href="/it">Home Italia</a><a href="/it/tour-privato-da-nang">Privato</a><a href="/it/vietnam-centrale-fai-da-te">Centro</a><a href="/it/phu-quoc-fai-da-te">Phu Quoc</a><a className={styles.cta} href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav></header>

    <section className={styles.hero}><img src={visual.hero} alt={page.h1} fetchPriority="high"/><div className={styles.shade}/><div className={styles.heroInner}><div><p>{page.destination} · VIAGGIATORI ITALIANI</p><h1>{page.h1}</h1><h2>{page.desc}</h2><blockquote>{page.wiifm}</blockquote><div className={styles.actions}><a href="#prezzo">Prezzo / opzioni</a><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></div><aside><small>IL PUNTO IN 30 SECONDI</small><h3>Standard per risparmiare. Privato per controllare il tempo.</h3><p>Il tour standard costa come il prodotto English. Il privato viene costruito sul gruppo.</p><div><span>Guida</span><b>Lingua richiesta*</b></div><div><span>Prezzo standard</span><b>Nessun sovrapprezzo Italia</b></div><div><span>Privato</span><b>Il tuo gruppo</b></div></aside></div></section>

    <section className={styles.gallery}>{visual.gallery.map((src,i)=><figure key={src}><img src={src} alt={`${visual.label} ${i+1}`} loading="lazy"/>{i===0?<figcaption>Foto reali GoVietStay</figcaption>:null}</figure>)}</section>
    <section className={styles.scan}>{page.bullets.map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b></div>)}</section>

    {privateLike?<section className={styles.private}><div><img src="/happy-travelers/02462467f09771c928865.jpg" alt="Tour privato GoVietStay" loading="lazy"/></div><div><p>PRIVATE · SU MISURA</p><h2>Il tuo gruppo non deve adattarsi al tour. È il tour che deve adattarsi al gruppo.</h2><span>Data · persone · bambini/senior · hotel · lingua guida · interessi · cose da evitare</span><p>{italyMarketConfig.guideRule}</p><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Costruiamo il giorno</a></div></section>:null}

    <div className={styles.layout}><article>
      <section className={styles.story}><p>01 · COSA CI GUADAGNI TU</p><h2>{page.wiifm}</h2><p>{page.desc}</p></section>
      <section className={styles.check}><p>02 · PRIMA DI PRENOTARE</p><h2>Tre dettagli che cambiano davvero l'esperienza</h2>{page.bullets.map(x=><div key={x}>✓ {x}</div>)}</section>
      <section id="prezzo" className={styles.priceSection}><p>03 · PREZZO</p><PriceBox page={page}/></section>
      {page.officialUrl?<section className={styles.official}><p>FONTE UFFICIALE</p><h2>Questa informazione può cambiare.</h2><span>Per visto o regole di ingresso mettiamo la fonte ufficiale direttamente nella pagina.</span><a href={page.officialUrl} target="_blank" rel="noreferrer">Apri la fonte ufficiale ↗</a></section>:null}
      <section className={styles.local}><div><p>04 · SUPPORTO LOCALE</p><h2>Il valore del team locale si vede quando il programma non va come previsto.</h2><span>Meteo, mare, volo in ritardo, bambini stanchi o voglia di cambiare giornata: qui il contatto diretto conta più di un catalogo.</span><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Parla con GoVietStay</a></div><img src={visual.gallery[0]} alt={visual.label} loading="lazy"/></section>
      <section className={styles.faq}><p>05 · DOMANDE FREQUENTI</p><h2>Le cose da capire prima di pagare</h2>{page.faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</section>
    </article>
    <aside><div className={styles.sticky}><img src={visual.gallery[1]} alt={visual.label} loading="lazy"/><small>HAI GIÀ VOLO + HOTEL?</small><h3>Mandaci 5 cose.</h3><p>Data · persone · hotel · interessi · lingua guida desiderata.</p><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="/it/tour-su-misura-vietnam-centrale">Tour su misura →</a><a href={italyMarketConfig.googleMaps} target="_blank" rel="noreferrer">Google Maps →</a></div></aside>
    </div>

    <section className={styles.related}><p>POTREBBE SERVIRTI ANCHE</p><h2>Pagine collegate</h2><div>{related.map(x=>{const v=getItalyVisual(x.slug,x.destination);return <a href={`/it/${x.slug}`} key={x.slug}><img src={v.hero} alt={x.h1} loading="lazy"/><div><small>{x.destination}</small><b>{x.h1}</b><span>Apri →</span></div></a>})}</div></section>
    <div className={styles.mobile}><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="/it/tour-privato-da-nang">★ Privato</a><a href="/it/phu-quoc-fai-da-te">🏝 Phu Quoc</a></div>
  </main>
}
