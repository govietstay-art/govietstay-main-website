"use client";

import { useState } from "react";
import {
  ArrowDown, ArrowUpRight, Check, CheckCircle2, CloudRain,
  Compass, Copy, Globe2, HeartHandshake, MessageCircle,
  PlaneLanding, Smartphone, Sun,
  Wifi, X
} from "lucide-react";
import styles from "./travel-kit.module.css";

type Moment = "planning" | "arriving" | "exploring" | "help";
const wa = (message: string) =>
  "https://wa.me/84937762607?text=" + encodeURIComponent(message);

const esimMessage =
  "Hello GoVietStay! I found your Free Vietnam Travel Kit. I'd like to request the complimentary Vietnam eSIM. Could you tell me how to claim it and check if my phone is compatible?";
const localHelpMessage =
  "Hello GoVietStay! I'm using your Vietnam Travel Kit and I have a travel question. Could your local team help me?";

const moments: Record<Moment, { eyebrow: string; question: string; answer: string; items: string[] }> = {
  planning: {
    eyebrow: "01 / BEFORE YOU FLY",
    question: "Am I actually ready for Vietnam?",
    answer: "Check the essentials before leaving home so the first day feels exciting, not stressful.",
    items: ["Review visa and entry requirements for your passport", "Confirm airport-to-hotel transport", "Check eSIM compatibility before your flight"],
  },
  arriving: {
    eyebrow: "02 / JUST LANDED",
    question: "What should I do first?",
    answer: "Stay connected, get your bearings and make a confident start — even after a long flight.",
    items: ["Connect to mobile data or airport Wi-Fi", "Use an official taxi or a confirmed pickup", "Keep your hotel address ready offline"],
  },
  exploring: {
    eyebrow: "03 / OUT EXPLORING",
    question: "What if my plans change?",
    answer: "Weather shifts, unexpected closures and local questions happen. A useful backup plan makes all the difference.",
    items: ["Keep one rainy-day alternative", "Save a few everyday Vietnamese phrases", "Know how to contact local help"],
  },
  help: {
    eyebrow: "04 / NEED A HAND",
    question: "Who can I ask when I'm unsure?",
    answer: "Sometimes the most useful travel tool is a real person who knows the place.",
    items: ["Explain your situation and location clearly", "Keep emergency numbers accessible", "Contact the GoVietStay local support team"],
  },
};

const stages: { id: Moment; short: string; long: string; icon: typeof Compass }[] = [
  { id: "planning", short: "Before I fly", long: "01", icon: Compass },
  { id: "arriving", short: "Just landed", long: "02", icon: PlaneLanding },
  { id: "exploring", short: "Exploring", long: "03", icon: Sun },
  { id: "help", short: "Need help", long: "04", icon: HeartHandshake },
];

const phrases = [
  { vietnamese: "Xin chào", pronunciation: "sin chow", meaning: "Hello" },
  { vietnamese: "Cảm ơn", pronunciation: "kahm uhn", meaning: "Thank you" },
  { vietnamese: "Bao nhiêu tiền?", pronunciation: "bow nyew tee-en", meaning: "How much?" },
  { vietnamese: "Tôi cần giúp đỡ", pronunciation: "toy kun zoop duh", meaning: "I need help" },
];

function WhatsAppLink({ children, className, message }: { children: React.ReactNode; className: string; message: string }) {
  return <a className={className} href={wa(message)} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function TravelKitPreview() {
  const [moment, setMoment] = useState<Moment>("arriving");
  const [checked, setChecked] = useState<string[]>([]);
  const [rain, setRain] = useState<"sun" | "rain">("rain");
  const [copied, setCopied] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const m = moments[moment];

  const toggleChecked = (item: string) =>
    setChecked((prev) => prev.includes(item) ? prev.filter((entry) => entry !== item) : [...prev, item]);

  const copyPhrase = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
    } catch {
      setCopied("");
    }
  };

  return (
    <main className={styles.site}>
      <div className={styles.announcement}>
        <span className={styles.announcementDot} />
        A LITTLE LESS WORRY. A LOT MORE VIETNAM.
        <span className={styles.announcementRight}>FREE TRAVEL TOOLS BY LOCALS</span>
      </div>

      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="GoVietStay Travel Kit home">
          <span className={styles.brandMark}>g<span>o</span></span>
          <span className={styles.brandWords}><b>VietStay</b><small>TRUSTED LOCAL SUPPORT</small></span>
        </a>
        <nav className={styles.nav} aria-label="Travel Kit navigation">
          <a href="#why">The essentials</a><a href="#esim">Your eSIM gift</a><a href="#tools">Travel tools</a>
        </nav>
        <div className={styles.headerActions}>
          <span className={styles.language}><Globe2 size={15} /> EN</span>
          <WhatsAppLink className={styles.navCta} message={esimMessage}>Claim free eSIM <ArrowUpRight size={15}/></WhatsAppLink>
          <button className={styles.menuButton} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24}/> : <span>MENU +</span>}</button>
        </div>
        {menuOpen && <div className={styles.mobileMenu}><a href="#why" onClick={() => setMenuOpen(false)}>The essentials</a><a href="#esim" onClick={() => setMenuOpen(false)}>Your eSIM gift</a><a href="#tools" onClick={() => setMenuOpen(false)}>Travel tools</a></div>}
      </header>

      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroImage} role="img" aria-label="Beautiful Vietnamese riverside scenery in Hoi An" />
        <div className={styles.heroTint} />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrowLight}><span className={styles.sparkle}>✳</span> THE FREE VIETNAM TRAVEL KIT</p>
            <h1 id="hero-title">Come for<br />the <em>adventure.</em><br />We&apos;ve got<br />the <em>little things.</em></h1>
            <p className={styles.heroLead}>Arriving somewhere new should feel exciting. Get the travel essentials, a complimentary eSIM gift, and a real local team in your corner.</p>
            <div className={styles.heroButtons}>
              <a href="#tools" className={styles.primaryButton}>Explore my travel kit <ArrowUpRight size={18}/></a>
              <a href="#esim" className={styles.textButton}>See the free eSIM <ArrowDown size={17}/></a>
            </div>
          </div>
          <div className={styles.heroPostcard} aria-label="Travel note">
            <span className={styles.postcardHead}>A FRIEND IN VIETNAM, BEFORE YOU ARRIVE</span>
            <span className={styles.postcardHeart}>✳</span>
            <strong>Good trips<br />start connected.</strong>
            <span>Travel tools + local knowledge + genuine human help.</span>
            <span className={styles.postcardBottom}>MADE WITH CARE, IN VIETNAM <ArrowUpRight size={15}/></span>
          </div>
        </div>
        <div className={styles.heroBottom}><span>DA NANG · HOI AN · HUE · PHU QUOC</span><span>SCROLL TO EXPLORE <ArrowDown size={15}/></span></div>
      </section>

      <div className={styles.trustBar}>
        <span><CheckCircle2 size={17}/> 100% free travel tools</span>
        <span><Smartphone size={17}/> No app download</span>
        <span><MessageCircle size={17}/> Real local human support</span>
      </div>

      <section className={styles.journeySection} id="why">
        <div className={styles.sectionHeader}>
          <p className={styles.overline}>THE TRAVEL COMPANION YOU&apos;LL ACTUALLY USE</p>
          <h2>What do you need <em>right now?</em></h2>
          <p>Not another long list of travel advice. Just useful answers for the moment you&apos;re in.</p>
        </div>
        <div className={styles.stageTabs} role="group" aria-label="Choose your travel stage">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return <button key={stage.id} type="button" aria-pressed={moment === stage.id}
              className={moment === stage.id ? styles.stageActive : styles.stage}
              onClick={() => setMoment(stage.id)}>
              <span className={styles.stageNumber}>{stage.long}</span><Icon size={19}/><strong>{stage.short}</strong><ArrowUpRight className={styles.stageArrow} size={15}/>
            </button>;
          })}
        </div>
        <div className={styles.stageDetail} aria-live="polite">
          <div className={styles.stageCopy}><span className={styles.overline}>{m.eyebrow}</span><h3>{m.question}</h3><p>{m.answer}</p><WhatsAppLink className={styles.underlinedLink} message={localHelpMessage}>Ask our local team <ArrowUpRight size={17}/></WhatsAppLink></div>
          <div className={styles.stageChecklist}>{m.items.map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p><Check size={18}/></div>)}</div>
        </div>
      </section>

      <section className={styles.esimSection} id="esim">
        <div className={styles.esimDecor} aria-hidden="true">✳</div>
        <div className={styles.esimCopy}>
          <p className={styles.overline}>A SMALL GIFT. A BETTER START.</p>
          <h2>Your connection,<br /><em>on us.</em></h2>
          <p>Find your way, message your hotel, share the first photo. We&apos;d love to help you feel connected from the moment you arrive.</p>
          <div className={styles.giftFeature}><Wifi size={22}/><div><strong>Complimentary Vietnam travel eSIM</strong><span>5 GB of data per day · 10 days*</span></div></div>
          <WhatsAppLink className={styles.esimCta} message={esimMessage}>Request my free eSIM <ArrowUpRight size={18}/></WhatsAppLink>
          <small>Send us a message to request your gift. Our local team will check availability and compatibility with your phone. No purchase or review required.</small>
        </div>
        <div className={styles.esimVisual}>
          <div className={styles.stamp}>A LITTLE SOMETHING<br/><b>FOR YOUR TRIP</b></div>
          <div className={styles.esimCard}>
            <div className={styles.esimCardTop}><span>goVietStay.</span><Wifi size={24}/></div>
            <div className={styles.esimChip}>✳</div>
            <span className={styles.esimCardEyebrow}>VIETNAM TRAVEL CONNECTION</span>
            <strong>Stay connected.<br />Go explore.</strong>
            <div className={styles.esimCardBottom}><span>COMPLIMENTARY eSIM</span><span>VIETNAM ↗</span></div>
          </div>
          <span className={styles.esimCaption}>A WARM WELCOME FROM LOCALS TO YOU</span>
        </div>
      </section>

      <section className={styles.toolsSection} id="tools">
        <div className={styles.toolsHeading}>
          <div><p className={styles.overline}>YOUR LITTLE TRAVEL LIFE-SAVERS</p><h2>Less searching.<br/><em>More experiencing.</em></h2></div>
          <p>Simple, practical helpers — built around the things that matter when you&apos;re far from home.</p>
        </div>
        <div className={styles.toolsGrid}>
          <article className={styles.toolCard}>
            <div className={styles.toolTop}><span>01 / BEFORE YOU GO</span><Compass size={24}/></div>
            <h3>The first-day checklist.</h3><p>Small things that make arrival feel much easier.</p>
            <div className={styles.checklist}>
              {["Check current entry requirements", "Save your hotel address offline", "Arrange your airport arrival", "Check your phone supports eSIM"].map((item)=>{
                const done=checked.includes(item);
                return <button className={done?styles.checkDone:styles.checkItem} type="button" key={item} aria-pressed={done} onClick={()=>toggleChecked(item)}>
                  <span className={styles.checkSquare}>{done?<Check size={13}/>:null}</span>{item}</button>;
              })}
            </div>
            <span className={styles.toolFinePrint}>{checked.length} of 4 checked · Visa rules depend on nationality.</span>
          </article>
          <article className={styles.toolCard}>
            <div className={styles.toolTop}><span>02 / WEATHER, BUT MAKE IT WORK</span><CloudRain size={25}/></div>
            <h3>Rain? Change the plan.</h3><p>Good days don&apos;t have to be sunny days. Choose a scenario:</p>
            <div className={styles.weatherSwitch} role="group" aria-label="Pick weather scenario">
              <button className={rain==="rain"?styles.weatherSelected:""} type="button" aria-pressed={rain==="rain"} onClick={()=>setRain("rain")}><CloudRain size={15}/> Rainy day</button>
              <button className={rain==="sun"?styles.weatherSelected:""} type="button" aria-pressed={rain==="sun"} onClick={()=>setRain("sun")}><Sun size={15}/> Sunny day</button>
            </div>
            <div className={styles.weatherResult}>{rain==="rain"?
              <><strong>Try a slower side of Vietnam.</strong><span>Indoor cafés, local markets with covered areas, museums and a flexible food experience. Check conditions before boat trips.</span></>:
              <><strong>Make the most of the outdoors.</strong><span>Early beach walks, scenic viewpoints and open-air heritage walks. Bring water and plan shade breaks.</span></>}</div>
            <span className={styles.toolFinePrint}>Ideas, not a live weather forecast.</span>
          </article>
          <article className={styles.toolCard}>
            <div className={styles.toolTop}><span>03 / SPEAK A LITTLE VIETNAMESE</span><MessageCircle size={25}/></div>
            <h3>Words that open doors.</h3><p>Four phrases worth keeping on your phone.</p>
            <div className={styles.phrases}>{phrases.map((phrase)=><button type="button" key={phrase.vietnamese}
              aria-label={"Copy "+phrase.vietnamese} onClick={()=>copyPhrase(phrase.vietnamese)}>
              <span><strong>{phrase.vietnamese}</strong><small>{phrase.meaning} · {phrase.pronunciation}</small></span>
              {copied===phrase.vietnamese?<Check size={17}/>:<Copy size={16}/>}</button>)}</div>
            <span className={styles.toolFinePrint}>{copied?"Copied — paste it into your translator or chat.":"Tap any phrase to copy it."} </span>
          </article>
        </div>
      </section>

      <section className={styles.supportSection}>
        <div><p className={styles.overline}>SOMETIMES YOU NEED A REAL PERSON</p><h2>Not sure what to do?<br/><em>We&apos;re right here.</em></h2><p>GoVietStay is a local travel team in Vietnam. Ask a practical question, get guidance and travel with more peace of mind.</p></div>
        <WhatsAppLink className={styles.supportButton} message={localHelpMessage}><MessageCircle size={20}/> Message a local human <ArrowUpRight size={17}/></WhatsAppLink>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><strong>goVietStay.</strong><span>More than tours. Trusted local support and personalized travel experiences.</span></div>
        <div><span>TRAVEL BETTER, TOGETHER.</span><a href="https://www.govietstay.com" target="_blank" rel="noopener noreferrer">govietstay.com <ArrowUpRight size={15}/></a></div>
        <p>*The eSIM allowance shown is based on the selected supplier package; final availability, activation, device compatibility and eligibility are confirmed by our team. The Travel Kit is free to use, with no review required.</p>
      </footer>
    </main>
  );
}
