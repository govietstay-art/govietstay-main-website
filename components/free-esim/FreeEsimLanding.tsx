import Link from "next/link";

type Locale = "en" | "ru" | "it";
const copy = {
  en: {
    label:"Welcome to Vietnam", heading:"Free Vietnam eSIM for first-time visitors",
    intro:"Arriving in Vietnam for the first time? GoVietStay offers a complimentary eSIM request for eligible visitors, with friendly local guidance before your trip.",
    how:"How to request your free eSIM", steps:["Send us a WhatsApp message with your arrival date and destination.","Tell us your phone model so we can check eSIM compatibility.","Our team will confirm availability, data allowance, activation instructions and any applicable conditions before you accept."],
    details:"What is included?", detail:"A complimentary Vietnam travel eSIM may be available for eligible visitors. Exact data allowance, validity period, compatible devices and activation terms are confirmed directly via WhatsApp. Do not purchase or install anything until you receive the instructions.",
    questions:"Frequently asked questions",
    qa:[["Is the eSIM really free?","The eSIM is offered as a complimentary gift to eligible visitors when confirmed by our team. Availability and eligibility are subject to confirmation before issuance."],["Can I use it as soon as I land?","Please contact us before arrival. We will explain activation timing and when the service period starts."],["Does it work with every phone?","No. Your phone must support eSIM and be carrier-unlocked. Send your phone model so we can help check compatibility."],["Do I have to book a tour?","Ask us directly about current gift eligibility; we will explain the conditions before you decide."],["How do I get the QR code?","Contact GoVietStay on WhatsApp. Our team will confirm the applicable process and instructions."]],
    cta:"Ask for my free eSIM on WhatsApp", kit:"Explore the free Vietnam Travel Kit", note:"No automatic eSIM delivery. Please wait for confirmation before planning to rely on mobile data."
  },
  ru: {
    label:"Добро пожаловать во Вьетнам",heading:"Бесплатная eSIM для первой поездки во Вьетнам",
    intro:"Впервые собираетесь во Вьетнам? GoVietStay предлагает возможность получить eSIM в подарок. Мы подскажем, что нужно сделать перед поездкой.",
    how:"Как запросить eSIM",steps:["Напишите нам в WhatsApp дату прилёта и город.","Укажите модель телефона — мы проверим совместимость с eSIM.","Мы сообщим о наличии, объёме интернета, сроке действия, активации и условиях получения."],
    details:"Что входит в подарок?",detail:"Подарочная туристическая eSIM предоставляется при подтверждении возможности и соблюдении условий. Точный пакет интернета, срок действия и порядок активации мы сообщим лично в WhatsApp.",
    questions:"Частые вопросы",qa:[["eSIM действительно бесплатная?","Да, при подтверждении участия в программе. Условия и наличие мы уточним заранее."],["Можно использовать сразу после прилёта?","Напишите до поездки: мы объясним, когда активировать eSIM и с какого момента начинается срок действия."],["Подойдёт любой телефон?","Нет. Телефон должен поддерживать eSIM и не быть заблокирован оператором. Сообщите модель."],["Нужно бронировать экскурсию?","Уточните действующие условия подарка у нашей команды до принятия решения."],["Как получить QR-код?","Свяжитесь с GoVietStay в WhatsApp для подтверждения и инструкции."]],
    cta:"Запросить бесплатную eSIM в WhatsApp",kit:"Открыть бесплатный Travel Kit",note:"eSIM не выдаётся автоматически. Дождитесь подтверждения."
  },
  it: {
    label:"Benvenuti in Vietnam",heading:"eSIM gratuita per il tuo primo viaggio in Vietnam",
    intro:"È la tua prima volta in Vietnam? GoVietStay offre la possibilità di richiedere una eSIM in omaggio, con assistenza locale prima dell'arrivo.",
    how:"Come richiedere la eSIM",steps:["Scrivici su WhatsApp indicando data di arrivo e destinazione.","Comunicaci il modello del telefono per verificare la compatibilità.","Ti confermeremo disponibilità, traffico dati, durata, attivazione ed eventuali condizioni."],
    details:"Cosa comprende l'omaggio?",detail:"La eSIM turistica gratuita è soggetta a disponibilità e requisiti di idoneità. Traffico dati, validità e istruzioni di attivazione vengono confermati direttamente su WhatsApp.",
    questions:"Domande frequenti",qa:[["La eSIM è davvero gratuita?","È un omaggio per i visitatori idonei, previa conferma del nostro team."],["Posso usarla appena atterro?","Contattaci prima dell'arrivo: ti spiegheremo quando attivarla e quando decorre la validità."],["Funziona con qualsiasi telefono?","No. Occorre un dispositivo compatibile con eSIM e senza blocco operatore. Indicaci il modello."],["Devo prenotare un tour?","Chiedici quali condizioni si applicano attualmente al regalo."],["Come ricevo il codice QR?","Scrivi a GoVietStay su WhatsApp per la conferma e le istruzioni."]],
    cta:"Richiedi la eSIM gratuita su WhatsApp",kit:"Esplora il Travel Kit gratuito",note:"La eSIM non viene inviata automaticamente: attendi la conferma."
  }
} as const;
export default function FreeEsimLanding({locale}:{locale:Locale}) {
 const t=copy[locale]; const wa="https://wa.me/84937762607?text="+encodeURIComponent("Hello GoVietStay, I'm visiting Vietnam for the first time. I'd like to request the complimentary eSIM. Please tell me the eligibility and activation details.");
 const url="/"+locale+"/free-vietnam-esim";
 const faq=t.qa.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}));
 return <main lang={locale} style={{background:"#f7f6f1",color:"#163128",minHeight:"100vh",fontFamily:"system-ui, sans-serif",padding:"36px 20px"}}>
 <div style={{maxWidth:850,margin:"auto"}}>
 <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:56}}>
 <Link href="/" style={{color:"#163128",fontWeight:800,textDecoration:"none",fontSize:22}}>GoVietStay</Link>
 <nav aria-label="Languages" style={{display:"flex",gap:16}}>
 <Link href="/en/free-vietnam-esim" hrefLang="en">EN</Link><Link href="/ru/free-vietnam-esim" hrefLang="ru">RU</Link><Link href="/it/free-vietnam-esim" hrefLang="it">IT</Link>
 </nav></header>
 <p style={{textTransform:"uppercase",letterSpacing:2,fontSize:13}}>{t.label}</p>
 <h1 style={{fontSize:"clamp(38px,6vw,65px)",lineHeight:1.12,letterSpacing:"-0.04em",margin:"16px 0 24px"}}>{t.heading}</h1>
 <p style={{fontSize:21,lineHeight:1.7,maxWidth:710}}>{t.intro}</p>
 <p style={{margin:"32px 0"}}><a href={wa} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"17px 25px",borderRadius:9,background:"#163128",color:"white",textDecoration:"none",fontWeight:700}}>{t.cta}</a></p>
 <section style={{padding:"28px 0",borderTop:"1px solid #cbd5cc"}}><h2 style={{fontSize:30}}>{t.how}</h2><ol style={{lineHeight:2,fontSize:18,paddingLeft:25}}>{t.steps.map((s,i)=><li key={i}>{s}</li>)}</ol></section>
 <section style={{padding:"28px 0",borderTop:"1px solid #cbd5cc"}}><h2 style={{fontSize:30}}>{t.details}</h2><p style={{fontSize:18,lineHeight:1.8}}>{t.detail}</p></section>
 <section style={{padding:"28px 0",borderTop:"1px solid #cbd5cc"}}><h2 style={{fontSize:30}}>{t.questions}</h2>{t.qa.map(([q,a],i)=><details key={i} style={{padding:"16px 0",borderBottom:"1px solid #dbe2d9"}}><summary style={{fontWeight:700,cursor:"pointer",fontSize:18}}>{q}</summary><p style={{lineHeight:1.7}}>{a}</p></details>)}</section>
 <aside style={{background:"#e7eee7",borderRadius:12,padding:22,margin:"32px 0"}}>{t.note}</aside>
 <footer style={{paddingBottom:28}}><Link href={`/${locale}/travel-kit`}>{t.kit}</Link><p>GoVietStay · Da Nang · Hoi An · Hue · Phu Quoc</p></footer></div>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq}).replace(/</g,"\\u003c")}}/>
 </main>;
}
