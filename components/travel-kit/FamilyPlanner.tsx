"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsAppHref } from "@/lib/travel-kit/config";
import { track } from "@/lib/travel-kit/analytics";
import type { CityId, Lang } from "@/lib/travel-kit/types";
import styles from "./family-planner.module.css";

type Destination = "danang" | "coast" | "heritage";
type Pace = "easy" | "balanced" | "active";
type Interest = "culture" | "food" | "nature";
type PlanDay = { place: "Da Nang" | "Hoi An" | "Hue"; headline: string; afternoon: string; evening: string };
type SavedPlan = {
  destination: Destination; duration: number; adults: number; children: number;
  seniors: boolean; pace: Pace; interest: Interest; startDate: string; itinerary: PlanDay[];
};
type Copy = {
  kicker: string; title: string; intro: string; destination: string; duration: string; adults: string;
  children: string; seniors: string; pace: string; interest: string; startDate: string; optional: string;
  destinationOptions: Record<Destination,string>; paceOptions: Record<Pace,string>;
  interestOptions: Record<Interest,string>; generate: string; regenerate: string;
  result: string; day: string; morning: string; afternoon: string; evening: string;
  arrival: string; departure: string; dayArrival: string; dayDeparture: string;
  slow: string; standard: string; full: string; foodEvening: string; calmEvening: string;
  localEvening: string; dayActivity: string; rainy: string; shortTrip: string;
  note: string; saved: string; contact: string; packing: string; free: string;
  flexible: string; introWhatsapp: string; msgFamily: string; msgStyle: string;
  optionsIntro: string; privacy: string;
};
const words: Record<Lang, Copy> = {
  en: {
    kicker:"YOUR FAMILY · YOUR TRIP · YOUR WAY", title:"Build your family trip",
    intro:"Create a flexible Central Vietnam itinerary in seconds. No account, fixed tour or AI fee.",
    destination:"Where to explore", duration:"Trip length", adults:"Adults", children:"Children", seniors:"Travelling with older family members",
    pace:"Travel pace", interest:"Main interest", startDate:"Arrival date", optional:"Optional",
    destinationOptions:{danang:"Da Nang only",coast:"Da Nang + Hoi An",heritage:"Da Nang + Hoi An + Hue"},
    paceOptions:{easy:"Slow and relaxed",balanced:"A little of everything",active:"Active discovery"},
    interestOptions:{culture:"Local culture",food:"Food and local life",nature:"Nature and outdoor time"},
    generate:"Create my itinerary",regenerate:"Update itinerary",result:"Your suggested itinerary",
    day:"Day",morning:"Main experience",afternoon:"Later in the day",evening:"Evening",
    arrival:"Arrive in Da Nang and settle in",departure:"Keep the day flexible for your departure",
    dayArrival:"Check in, rest and enjoy an easy orientation walk near your stay",
    dayDeparture:"Leave a comfortable buffer for transfer and airport check-in",
    slow:"Rest time built in, with no more than one major outing",
    standard:"Explore at your own pace with time for a proper break",
    full:"Add an optional second stop only if everyone feels comfortable",
    foodEvening:"Choose a local restaurant that suits the whole family",
    calmEvening:"Have a relaxed meal near your accommodation",
    localEvening:"Enjoy an unhurried evening walk and local food",
    dayActivity:"Explore",rainy:"For rain or high heat, swap outdoor activities for a sheltered café, museum or indoor experience. Check conditions before travelling.",
    shortTrip:"Three cities in three days involves substantial transfers. A five-day trip or longer is more relaxed.",
    note:"This is a sample plan, not a reservation. Times, weather, access, pricing and availability must be checked before booking.",
    saved:"Saved on this browser only. No account and nothing is uploaded.",
    contact:"Ask GoVietStay for local help", packing:"Open packing checklist",
    free:"Free self-guided planning", flexible:"Change your choices and generate a new version.",
    introWhatsapp:"Hello GoVietStay, please help my family plan Central Vietnam.",
    msgFamily:"Family",msgStyle:"Travel style",optionsIntro:"Suggested options can be changed or skipped.",privacy:"WhatsApp only opens a drafted message. You choose whether to send it."
  },
  ru: {
    kicker:"ВАША СЕМЬЯ · ВАШ МАРШРУТ",title:"Спланируйте семейный отдых",
    intro:"Гибкий маршрут по Центральному Вьетнаму за секунды. Без аккаунта и обязательной покупки тура.",
    destination:"Куда поедем",duration:"Продолжительность",adults:"Взрослые",children:"Дети",seniors:"С нами пожилые родственники",
    pace:"Темп",interest:"Что интереснее",startDate:"Дата приезда",optional:"Необязательно",
    destinationOptions:{danang:"Только Дананг",coast:"Дананг + Хойан",heritage:"Дананг + Хойан + Хюэ"},
    paceOptions:{easy:"Спокойный",balanced:"Сбалансированный",active:"Активный"},
    interestOptions:{culture:"Культура",food:"Еда и местная жизнь",nature:"Природа и прогулки"},
    generate:"Составить маршрут",regenerate:"Обновить маршрут",result:"Ваш примерный маршрут",
    day:"День",morning:"Основное занятие",afternoon:"Позже",evening:"Вечер",
    arrival:"Приезд в Дананг и отдых",departure:"Оставьте время на отъезд",
    dayArrival:"Заселитесь, отдохните и прогуляйтесь недалеко от отеля",
    dayDeparture:"Заложите запас времени на дорогу и регистрацию в аэропорту",
    slow:"Одна основная прогулка и достаточно отдыха",standard:"Прогулка в комфортном темпе с перерывами",
    full:"Дополнительная остановка только при хорошем самочувствии всех участников",
    foodEvening:"Выберите местный ресторан для всей семьи",calmEvening:"Спокойный ужин рядом с отелем",
    localEvening:"Неспешная вечерняя прогулка и местная кухня",
    dayActivity:"Посетите",rainy:"В дождь или сильную жару замените прогулки музеем, кафе или занятием в помещении. Проверяйте погоду.",
    shortTrip:"Три города за три дня — много переездов. Для спокойного отдыха лучше пять дней или больше.",
    note:"Это пример, а не бронирование. Часы, погоду, цены и наличие мест необходимо проверить.",
    saved:"План сохранён только в этом браузере. Ничего не загружается на сервер.",
    contact:"Помощь GoVietStay",packing:"Список вещей",free:"Бесплатный самостоятельный маршрут",
    flexible:"Измените параметры, чтобы получить другой вариант.",
    introWhatsapp:"Здравствуйте, GoVietStay! Помогите организовать семейный отдых в Центральном Вьетнаме.",
    msgFamily:"Семья",msgStyle:"Стиль",optionsIntro:"Все остановки можно менять или пропускать.",privacy:"WhatsApp открывает черновик. Отправляете его только вы."
  },
  it: {
    kicker:"LA TUA FAMIGLIA · IL TUO VIAGGIO",title:"Organizza il viaggio di famiglia",
    intro:"Crea in pochi secondi un itinerario flessibile nel Vietnam centrale. Senza account o tour obbligatori.",
    destination:"Dove andare",duration:"Durata",adults:"Adulti",children:"Bambini",seniors:"Viaggiano anche persone anziane",
    pace:"Ritmo",interest:"Interesse principale",startDate:"Data di arrivo",optional:"Facoltativa",
    destinationOptions:{danang:"Solo Da Nang",coast:"Da Nang + Hoi An",heritage:"Da Nang + Hoi An + Hue"},
    paceOptions:{easy:"Con calma",balanced:"Equilibrato",active:"Attivo"},
    interestOptions:{culture:"Cultura",food:"Cibo e vita locale",nature:"Natura e passeggiate"},
    generate:"Crea il mio itinerario",regenerate:"Aggiorna itinerario",result:"Il tuo itinerario suggerito",
    day:"Giorno",morning:"Esperienza principale",afternoon:"Più tardi",evening:"Sera",
    arrival:"Arrivo a Da Nang e sistemazione",departure:"Lascia del tempo libero per la partenza",
    dayArrival:"Check-in, riposo e passeggiata vicino all'alloggio",
    dayDeparture:"Prevedi tempo sufficiente per trasferimento e aeroporto",
    slow:"Una sola attività principale con pause",standard:"Esplora con calma e con una bella pausa",
    full:"Una seconda tappa solo se tutti stanno bene",
    foodEvening:"Scegli un ristorante locale adatto alla famiglia",calmEvening:"Cena tranquilla vicino all'alloggio",
    localEvening:"Passeggiata serale rilassante e cucina locale",
    dayActivity:"Scopri",rainy:"Con pioggia o caldo intenso scegli un museo, un caffè o un'attività al coperto. Controlla le condizioni.",
    shortTrip:"Tre città in tre giorni richiedono molti trasferimenti. Cinque giorni o più sono più comodi.",
    note:"È un suggerimento, non una prenotazione. Verifica orari, meteo, prezzi e disponibilità.",
    saved:"Salvato solo in questo browser. Nessun account né caricamento sul server.",
    contact:"Chiedi aiuto a GoVietStay",packing:"Apri la lista bagaglio",
    free:"Pianificazione autonoma gratuita",flexible:"Modifica le scelte per una nuova versione.",
    introWhatsapp:"Ciao GoVietStay, vorrei assistenza per un viaggio di famiglia nel Vietnam centrale.",
    msgFamily:"Famiglia",msgStyle:"Stile",optionsIntro:"Puoi modificare o saltare ogni attività.",privacy:"WhatsApp apre solo una bozza: sarai tu a inviarla."
  }
};

const sights: Record<"Da Nang"|"Hoi An"|"Hue",Record<Interest,string[]>> = {
  "Da Nang":{
    culture:["Cham Sculpture Museum","Marble Mountains","a local neighbourhood market"],
    food:["a Vietnamese cooking experience","a local market and food walk","a family-friendly seafood meal"],
    nature:["My Khe Beach","Son Tra Peninsula viewpoints","a gentle riverside walk"]
  },
  "Hoi An":{
    culture:["Hoi An Ancient Town","the Japanese Covered Bridge area","a traditional craft workshop"],
    food:["a family cooking class","a local food walk in Hoi An","a village food experience"],
    nature:["Tra Que vegetable village","a countryside bicycle or walking route","a calm walk by the river"]
  },
  "Hue":{
    culture:["the Imperial City","a heritage walking route","a traditional Hue craft stop"],
    food:["a Hue-style food tasting","a local market visit","a family cooking experience"],
    nature:["a peaceful Perfume River stroll","a garden house visit","a gentle countryside outing"]
  }
};
function buildPlan(destination:Destination,duration:number,pace:Pace,interest:Interest,older:boolean,copy:Copy):PlanDay[] {
  const route: Array<"Da Nang"|"Hoi An"|"Hue"> = destination === "danang" ? ["Da Nang"] :
    destination === "coast" ? ["Da Nang","Hoi An"] : ["Da Nang","Hoi An","Hue"];
  const normalizedPace = older ? "easy" : pace;
  return Array.from({length:duration},(_,index)=>{
    const last = index === duration - 1;
    const place = destination === "heritage" && duration === 3
      ? route[index]
      : index === 0 || last ? "Da Nang"
      : route[Math.min(route.length-1,Math.floor((index-1)*route.length/Math.max(1,duration-2)))];
    const options = sights[place][interest];
    const highlight = options[(index+duration)%options.length];
    return {
      place,
      headline: index===0 ? copy.arrival : last ? copy.departure : copy.dayActivity+" "+highlight,
      afternoon: index===0 ? copy.dayArrival : last ? copy.dayDeparture : normalizedPace==="easy" ? copy.slow : normalizedPace==="balanced" ? copy.standard : copy.full,
      evening: index===0 || last || normalizedPace==="easy" ? copy.calmEvening : interest==="food" ? copy.foodEvening : copy.localEvening
    };
  });
}
const STORAGE_KEY = "gvs-tk-family-planner-v1";

export function FamilyPlanner({lang, city}:{lang:Lang;city:CityId}) {
  const copy = words[lang];
  const [destination,setDestination] = useState<Destination>("coast");
  const [duration,setDuration] = useState(5);
  const [adults,setAdults] = useState(2);
  const [children,setChildren] = useState(2);
  const [seniors,setSeniors] = useState(false);
  const [pace,setPace] = useState<Pace>("easy");
  const [interest,setInterest] = useState<Interest>("culture");
  const [startDate,setStartDate] = useState("");
  const [plan,setPlan] = useState<SavedPlan|null>(null);
  useEffect(()=>{
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as SavedPlan;
      if (!saved || !Array.isArray(saved.itinerary) || saved.itinerary.length>10 || saved.itinerary.length<3) return;
      setPlan(saved);
    } catch { /* Local storage may be blocked. */ }
  },[]);
  function generate() {
    const result:SavedPlan={destination,duration,adults,children,seniors,pace,interest,startDate,
      itinerary:buildPlan(destination,duration,pace,interest,seniors,copy)};
    setPlan(result);
    try { window.localStorage.setItem(STORAGE_KEY,JSON.stringify(result)); } catch { /* Still works without storage. */ }
  }
  const message=plan ? [
    copy.introWhatsapp,copy.destination+": "+copy.destinationOptions[plan.destination],
    copy.duration+": "+plan.duration,copy.msgFamily+": "+plan.adults+" + "+plan.children,
    copy.msgStyle+": "+copy.paceOptions[plan.pace]+" / "+copy.interestOptions[plan.interest],
    plan.startDate?copy.startDate+": "+plan.startDate:"",
    ...plan.itinerary.map((d,i)=>copy.day+" "+(i+1)+" · "+d.place+": "+d.headline)
  ].filter(Boolean).join("\n"):"";
  return (
    <article className={styles.planner}>
      <p className={styles.kicker}>{copy.kicker}</p>
      <h1 className={styles.title}>{copy.title}</h1>
      <p className={styles.intro}>{copy.intro}</p>
      <div className={styles.chip}>{copy.free}</div>
      <form className={styles.form} onSubmit={(event)=>{event.preventDefault();generate();}}>
        <label className={styles.field}><span>{copy.destination}</span>
          <select value={destination} onChange={e=>setDestination(e.target.value as Destination)}>
            {(["danang","coast","heritage"] as const).map(k=><option key={k} value={k}>{copy.destinationOptions[k]}</option>)}
          </select>
        </label>
        <div className={styles.two}>
          <label className={styles.field}><span>{copy.duration}</span>
            <select value={duration} onChange={e=>setDuration(Number(e.target.value))}>
              {[3,5,7,10].map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className={styles.field}><span>{copy.startDate} <small>({copy.optional})</small></span>
            <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </label>
        </div>
        <div className={styles.two}>
          <label className={styles.field}><span>{copy.adults}</span>
            <select value={adults} onChange={e=>setAdults(Number(e.target.value))}>
              {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className={styles.field}><span>{copy.children}</span>
            <select value={children} onChange={e=>setChildren(Number(e.target.value))}>
              {[0,1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <label className={styles.checkbox}><input type="checkbox" checked={seniors} onChange={e=>setSeniors(e.target.checked)}/><span>{copy.seniors}</span></label>
        <div className={styles.two}>
          <label className={styles.field}><span>{copy.pace}</span>
            <select value={pace} onChange={e=>setPace(e.target.value as Pace)}>
              {(["easy","balanced","active"] as const).map(k=><option key={k} value={k}>{copy.paceOptions[k]}</option>)}
            </select>
          </label>
          <label className={styles.field}><span>{copy.interest}</span>
            <select value={interest} onChange={e=>setInterest(e.target.value as Interest)}>
              {(["culture","food","nature"] as const).map(k=><option key={k} value={k}>{copy.interestOptions[k]}</option>)}
            </select>
          </label>
        </div>
        <button className={styles.primary} type="submit">{plan?copy.regenerate:copy.generate} <span aria-hidden="true">→</span></button>
      </form>
      {plan ? (
        <section className={styles.results} aria-live="polite">
          <p className={styles.kicker}>{copy.result}</p>
          <p className={styles.hint}>{copy.flexible} {copy.optionsIntro}</p>
          {plan.destination==="heritage" && plan.duration===3 ? <p className={styles.warning}>{copy.shortTrip}</p>:null}
          {plan.itinerary.map((day,index)=>(
            <div key={index} className={styles.day}>
              <div className={styles.dayTop}><span>{copy.day} {index+1}</span><strong>{day.place}</strong></div>
              <h2>{day.headline}</h2>
              <dl>
                <div><dt>{copy.afternoon}</dt><dd>{day.afternoon}</dd></div>
                <div><dt>{copy.evening}</dt><dd>{day.evening}</dd></div>
              </dl>
            </div>
          ))}
          <p className={styles.warning}>{copy.rainy}</p>
          <p className={styles.hint}>{copy.note}</p>
          <p className={styles.hint}>{copy.saved}</p>
          <a className={styles.primary} target="_blank" rel="noopener noreferrer" href={whatsAppHref(message)} onClick={()=>track("whatsapp_click",{language:lang,city,tool:"family-planner"})}>{copy.contact}<span aria-hidden="true">↗</span></a>
          <p className={styles.hint}>{copy.privacy}</p>
          <Link className={styles.secondary} href={"/"+lang+"/travel-kit/packing"}>{copy.packing} →</Link>
        </section>
      ):null}
    </article>
  );
}
