import type {Metadata} from "next";
import {italySeoPages} from "../../lib/italySeoPages";
import {italyMarketConfig} from "../../lib/italyMarketConfig";
import {italyHubVisuals,italyGuestPhotos,getItalyVisual} from "../../lib/italyVisuals";
import styles from "./ItalyHub.module.css";

export const metadata:Metadata={
  title:{absolute:"Vietnam fai da te e tour privati 2026 | Da Nang, Hoi An, Hue, Phu Quoc | GoVietStay"},
  description:"GoVietStay Italia: Vietnam fai da te, tour privati, auto privata, guide nella lingua richiesta, Da Nang, Hoi An, Hue e Phu Quoc. Prezzi standard uguali al tour English.",
  alternates:{canonical:"https://www.govietstay.com/it",languages:{"it-IT":"https://www.govietstay.com/it","en":"https://www.govietstay.com/travel","x-default":"https://www.govietstay.com"}},
  robots:{index:true,follow:true},
  openGraph:{type:"website",url:"https://www.govietstay.com/it",title:"GoVietStay Italia | Vietnam fai da te e privato",description:"Volo e hotel li scegli tu. In Vietnam hai un team locale quando serve davvero.",locale:"it_IT",siteName:"GoVietStay"}
};

const bySlug=(slug:string)=>italySeoPages.find(x=>x.slug===slug);
const heroProducts=["ba-na-hills-ponte-dorato","foresta-di-cocco-hoi-an","isole-cham-snorkeling","hue-da-da-nang","tour-3-isole-phu-quoc","tour-4-isole-hon-thom"];

function displayPrice(slug:string){
  const p=bySlug(slug);if(!p?.priceKey)return "Preventivo privato";
  const x=italyMarketConfig.prices[p.priceKey];if(!x)return "Preventivo privato";
  return `da €${x.eur.toFixed(1).replace(".",",")} · ${new Intl.NumberFormat("it-IT").format(x.vnd)} VND`;
}

export default function ItalyHub(){
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"GoVietStay Italia",url:"https://www.govietstay.com/it",inLanguage:"it-IT"};
  return <main className={styles.page} lang="it-IT">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <div className={styles.top}><span>ITALIA → VIETNAM</span><b>Da Nang · Hoi An · Hue · Phu Quoc</b><a href="/travel">English →</a></div>
    <header className={styles.nav}><a href="/it" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>VIAGGIATORI ITALIANI</small></span></a><nav><a href="#privato">Privato</a><a href="#centrale">Vietnam centrale</a><a href="#phuquoc">Phu Quoc</a><a href="#prezzi">Prezzi</a><a className={styles.cta} href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav></header>

    <section className={styles.hero}>
      <div className={styles.heroMain}><img src={italyHubVisuals.hero} alt="Hoi An al tramonto" fetchPriority="high"/><div className={styles.shade}/><div className={styles.heroCopy}>
        <p>FAI DA TE QUANDO È SEMPLICE · PRIVATO QUANDO FA LA DIFFERENZA</p>
        <h1>Volo e hotel li scegli tu. <em>In Vietnam hai un team locale quando serve davvero.</em></h1>
        <h2>Per coppie, famiglie e piccoli gruppi che non vogliono un viaggio in pullman: auto privata, guida nella lingua richiesta, orari più umani e supporto locale quando il programma cambia.</h2>
        <div className={styles.actions}><a href="#privato">Scopri il privato</a><a href="#prezzi">Vedi prezzi standard</a><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div>
        <div className={styles.proof}><span>✓ Standard = stesso prezzo English</span><span>✓ Guida nella lingua richiesta*</span><span>✓ Nessun estraneo nel privato confermato</span></div>
      </div></div>
      <aside className={styles.answer}><small>WIIFM · COSA CAMBIA PER TE?</small><h2>Non compri “più tour”. Compri meno attese.</h2>
        {["Parti quando ha senso","Resti di più dove ti piace","Salti ciò che non interessa","Adatti il ritmo a bambini/senior","Hai un contatto locale quando cambia il piano"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}
        <a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Raccontaci il tuo viaggio</a>
      </aside>
    </section>

    <section className={styles.quick}>
      <a href="/it/vietnam-senza-visto-45-giorni"><small>VISTO</small><b>45 giorni senza visto*</b><span>Regola ufficiale →</span></a>
      <a href="/it/tour-su-misura-vietnam-centrale"><small>SU MISURA</small><b>Solo ciò che ti serve</b><span>Costruiamo il viaggio →</span></a>
      <a href="/it/guida-in-italiano-vietnam-centrale"><small>LINGUA</small><b>Italiano o altra lingua*</b><span>Su disponibilità →</span></a>
      <a href="/it/da-nang-o-phu-quoc"><small>SCELTA</small><b>Da Nang o Phu Quoc?</b><span>Capisci la differenza →</span></a>
    </section>

    <section className={styles.privateZone} id="privato">
      <div className={styles.privatePhoto}><img src="/travelers/germany.jpg" alt="Viaggio privato GoVietStay" loading="lazy"/></div>
      <div className={styles.privateCopy}><p>01 · IL PRODOTTO PRINCIPALE</p><h2>Privato non significa lusso. Significa che il tuo tempo appartiene a te.</h2><span>Il tour standard resta disponibile allo stesso prezzo English. Il privato lo scegli solo quando ti porta un vantaggio reale.</span>
        <div>{["Coppia","Famiglia","Piccolo gruppo","Guida richiesta","Orario flessibile","Niente shopping inutile"].map((x,i)=><b key={x}><i>0{i+1}</i>{x}</b>)}</div>
        <a href="/it/tour-privato-da-nang">Tour privato Da Nang →</a><a href="/it/tour-su-misura-vietnam-centrale">Tour su misura →</a>
      </div>
    </section>

    <section className={styles.section} id="centrale">
      <div className={styles.head}><div><p>02 · VIETNAM CENTRALE</p><h2>Tour standard per il prezzo. Privato per il tempo.</h2></div><span>Il cliente italiano non deve pagare un sovrapprezzo solo perché usa un'altra lingua. Per i prodotti standard manteniamo il prezzo pubblico/English; per il privato quotiamo ciò che cambia davvero: auto, guida, durata e biglietti.</span></div>
      <div className={styles.cards}>{heroProducts.slice(0,4).map(slug=>{const p=bySlug(slug)!;const v=getItalyVisual(p.slug,p.destination);return <a href={`/it/${slug}`} key={slug}><div className={styles.photo}><img src={v.hero} alt={p.h1} loading="lazy"/><span>{p.destination}</span></div><div className={styles.body}><h3>{p.h1}</h3><p>{p.wiifm}</p><div><strong>{displayPrice(slug)}</strong><b>Apri →</b></div></div></a>})}</div>
    </section>

    <section className={styles.priceZone} id="prezzi">
      <div className={styles.priceIntro}><p>03 · PREZZI STANDARD</p><h2>Stesso prodotto, stesso prezzo. La lingua non deve diventare una tassa.</h2><span>{italyMarketConfig.standardPriceRule} EUR è mostrato solo per orientarti; il prezzo ufficiale della prenotazione resta in VND.</span></div>
      <div className={styles.priceGrid}>{heroProducts.map(slug=>{const p=bySlug(slug)!;const x=p.priceKey?italyMarketConfig.prices[p.priceKey]:null;return <a href={`/it/${slug}`} key={slug}><small>{p.destination}</small><h3>{p.h1}</h3><strong>{x?`circa €${x.eur.toFixed(1).replace(".",",")}`:"Preventivo"}</strong><b>{x?`${new Intl.NumberFormat("it-IT").format(x.vnd)} VND`:""}</b><span>Standard / opzione privata →</span></a>})}</div>
      <p className={styles.disclaimer}>{italyMarketConfig.priceDisclaimer}</p>
    </section>

    <section className={styles.phu} id="phuquoc">
      <div className={styles.phuText}><p>04 · PHU QUOC</p><h2>Se il resort è parte della vacanza, non programmare ogni mattina alle 7.</h2><span>Phu Quoc è ideale per alternare giornate alle isole, auto privata e tempo libero. Il privato serve soprattutto per ridurre spostamenti inutili tra nord e sud.</span><div><a href="/it/phu-quoc-fai-da-te">Fai da te</a><a href="/it/phu-quoc-con-bambini">Con bambini</a><a href="/it/auto-privata-phu-quoc">Auto privata</a></div></div>
      <div className={styles.phuCards}>{heroProducts.slice(4).concat(["phu-quoc-con-bambini"]).map(slug=>{const p=bySlug(slug)!;const v=getItalyVisual(p.slug,p.destination);return <a href={`/it/${slug}`} key={slug}><img src={v.hero} alt={p.h1} loading="lazy"/><div><small>{p.destination}</small><h3>{p.h1}</h3><b>{displayPrice(slug)}</b><span>Scopri →</span></div></a>})}</div>
    </section>

    <section className={styles.why}><div className={styles.head}><div><p>05 · PERCHÉ DIRETTO LOCALE?</p><h2>Non vogliamo sostituire Booking o GetYourGuide. Vogliamo essere utili quando loro non possono esserlo.</h2></div></div><div className={styles.whyGrid}>
      <div><b>01</b><h3>Quando il programma cambia</h3><p>Meteo, mare, volo in ritardo o un bambino stanco: qui serve una persona locale, non un catalogo.</p></div>
      <div><b>02</b><h3>Privato davvero</h3><p>Se una componente è confermata privata, non aggiungiamo estranei a quella componente.</p></div>
      <div><b>03</b><h3>Guida nella lingua richiesta</h3><p>Italiano o altra lingua viene verificata in base a data e disponibilità, senza promesse finte.</p></div>
      <div><b>04</b><h3>Prezzo trasparente</h3><p>Standard al prezzo English. Privato quotato solo sulle differenze reali del servizio.</p></div>
    </div></section>

    <section className={styles.guests}><div className={styles.head}><div><p>06 · PERSONE REALI</p><h2>Prima di comprare una promessa, guarda viaggi che esistono davvero.</h2></div><span>Usiamo immagini reali di ospiti e itinerari GoVietStay. Nessuna vacanza perfetta inventata dall'AI.</span></div><div className={styles.guestStrip}>{italyGuestPhotos.map((src,i)=><figure key={src}><img src={src} alt={`Ospiti GoVietStay ${i+1}`} loading="lazy"/></figure>)}</div><a className={styles.reviews} href={italyMarketConfig.googleMaps} target="_blank" rel="noreferrer">Vedi GoVietStay su Google Maps →</a></section>

    <section className={styles.intent}><div className={styles.head}><div><p>07 · 30 INTENTI DI RICERCA</p><h2>URL e contenuti scritti per come cerca un italiano, non tradotti da un sito inglese.</h2></div></div><div className={styles.intentGrid}>{italySeoPages.map(p=><a href={`/it/${p.slug}`} key={p.slug}><small>{p.destination}</small><h3>{p.h1}</h3><p>{p.wiifm}</p><b>Apri →</b></a>)}</div></section>

    <section className={styles.final}><img src="/tour/cham.jpg" alt="Supporto locale GoVietStay" loading="lazy"/><div><p>IL TUO TEAM LOCALE IN VIETNAM</p><h2>Hai già volo e hotel? Mandaci data, persone e hotel. Da lì possiamo iniziare.</h2><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Scrivi su WhatsApp</a></div></section>
    <div className={styles.mobile}><a href={italyMarketConfig.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="/it/tour-privato-da-nang">★ Privato</a><a href="/it/phu-quoc-fai-da-te">🏝 Phu Quoc</a></div>
  </main>
}
