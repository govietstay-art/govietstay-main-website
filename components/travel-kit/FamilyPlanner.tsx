"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsAppHref } from "@/lib/travel-kit/config";
import { track } from "@/lib/travel-kit/analytics";
import type { CityId, Lang } from "@/lib/travel-kit/types";
import {
  buildFamilyItinerary, foodMapUrl,
  type FamilyDestination, type FoodDiet, type FoodStyle, type Interest, type Pace, type PlannerChoices,
} from "@/lib/travel-kit/family-planner-data";
import styles from "./family-planner.module.css";

type Labels={
  kicker:string;title:string;intro:string;free:string;
  destination:string;destinations:Record<FamilyDestination,string>;
  length:string;arrival:string;optional:string; adults:string;children:string;seniors:string;
  pace:string;paces:Record<Pace,string>;
  interest:string;interests:Record<Interest,string>;
  style:string;styles:Record<FoodStyle,string>;
  diet:string;diets:Record<FoodDiet,string>;
  generate:string;regenerate:string;output:string;overview:string;morning:string;lunch:string;afternoon:string;evening:string;
  day:string;foodTip:string;venue:string;map:string;verified:string;important:string;transport:string;
  disclaimer:string;privacy:string;foodGuide:string;foodDetail:string;chat:string;packing:string;
  explain:string;shortTrip:string;islandNotice:string;whatsapp:string;family:string;preferences:string;
  sponsored:string;source:string;
};
const labels:Record<Lang,Labels>={
 en:{
  kicker:"YOUR FAMILY · YOUR TRIP · YOUR WAY",
  title:"Your Private-Style Family Travel Plan",
  intro:"Create a detailed, independent family journey in Da Nang, Hoi An, Hue or Phu Quoc. You choose the experiences; local help is entirely optional.",
  free:"Free itinerary builder · No account or AI charges",
  destination:"Destinations",destinations:{danang:"Da Nang only",coast:"Da Nang + Hoi An",heritage:"Da Nang + Hoi An + Hue",phuquoc:"Phu Quoc Island"},
  length:"Days",arrival:"Arrival date",optional:"optional",adults:"Adults",children:"Children",seniors:"Older family members travelling",
  pace:"Travel pace",paces:{easy:"Relaxed",balanced:"Balanced",active:"Active"},
  interest:"Main focus",interests:{culture:"Culture & heritage",food:"Local food",nature:"Nature & beaches",family:"Gentle family activities"},
  style:"Food style",styles:{local:"Vietnamese local food",mixed:"Local + international",international:"Familiar international dining"},
  diet:"Dietary preference",diets:{any:"Flexible",vegetarian:"Vegetarian (verify ingredients)", "no-seafood":"Avoid seafood (verify ingredients)"},
  generate:"Build my family itinerary",regenerate:"Regenerate from my choices",output:"Your personal family journey",
  overview:"Day at a glance",morning:"Morning · Private-style activities",lunch:"Lunch & family break",
  afternoon:"Afternoon · Explore at your pace",evening:"Evening · Free time",day:"DAY",
  foodTip:"Food suggestion",venue:"Optional venue from our food guide",map:"View on Google Maps",
  verified:"Opening hours, dietary suitability and availability have not been confirmed. You choose whether to visit.",
  important:"Family & weather notes",transport:"Transport & planning",disclaimer:"This is a suggested, flexible itinerary — not a booked private tour. No tickets, driver, restaurant reservations or prices are included. Check operating hours, weather, accessibility and availability before travelling.",
  privacy:"Your choices stay in this browser. WhatsApp opens a draft and you press Send yourself.",
  foodGuide:"Explore GoVietStay Food Guide",foodDetail:"Discover local dishes and independently listed places for your next meal.",
  chat:"Ask GoVietStay to arrange private support",packing:"Packing checklist",
  explain:"Every day includes activities, lunch, family pauses, local food and alternative plans. Update your preferences at any time.",
  shortTrip:"A trip of three days cannot comfortably cover Da Nang, Hoi An and Hue. This version prioritizes Da Nang and Hoi An; choose 5+ days to include Hue.",
  islandNotice:"Phu Quoc is a separate island plan — it is not treated as a road stop from Da Nang.",
  whatsapp:"Hello GoVietStay. Please help us arrange optional services for this self-guided family plan.",
  family:"Travellers",preferences:"Preferences",sponsored:"Sponsored",source:"Listed independently in GoVietStay Local Food Guide"
 },
 ru:{
  kicker:"ВАША СЕМЬЯ · ВАШ МАРШРУТ",title:"Ваш индивидуальный семейный маршрут",
  intro:"Подробный самостоятельный маршрут по Данангу, Хойану, Хюэ или Фукуоку. Помощь местной команды — по желанию.",
  free:"Бесплатный планировщик · Без аккаунта и оплаты ИИ",
  destination:"Направление",destinations:{danang:"Только Дананг",coast:"Дананг + Хойан",heritage:"Дананг + Хойан + Хюэ",phuquoc:"Остров Фукуок"},
  length:"Дней",arrival:"Дата приезда",optional:"необязательно",adults:"Взрослые",children:"Дети",seniors:"Едут пожилые родственники",
  pace:"Темп",paces:{easy:"Спокойный",balanced:"Сбалансированный",active:"Активный"},
  interest:"Главный интерес",interests:{culture:"Культура",food:"Местная кухня",nature:"Природа и пляжи",family:"Спокойные семейные занятия"},
  style:"Кухня",styles:{local:"Вьетнамская",mixed:"Местная + международная",international:"Знакомая международная"},
  diet:"Питание",diets:{any:"Без ограничений",vegetarian:"Вегетарианское (уточнять состав)","no-seafood":"Без морепродуктов (уточнять состав)"},
  generate:"Составить семейный маршрут",regenerate:"Обновить маршрут",output:"Ваш семейный маршрут",overview:"Обзор дня",
  morning:"Утро · Программа",lunch:"Обед и отдых",afternoon:"После обеда · В удобном темпе",evening:"Вечер · Свободное время",
  day:"ДЕНЬ",foodTip:"Что попробовать",venue:"Пример из нашего гастрогида",map:"Открыть Google Карты",
  verified:"Время работы, меню и наличие мест не проверены. Решение о посещении принимаете вы.",
  important:"Погода и советы для семьи",transport:"Транспорт и логистика",
  disclaimer:"Это примерный маршрут, а не забронированный частный тур. Билеты, водитель, столики и цены не включены. Проверяйте погоду, расписание и доступность.",
  privacy:"Данные остаются в браузере. WhatsApp открывает черновик; отправляете его только вы.",
  foodGuide:"Открыть гастрогид GoVietStay",foodDetail:"Узнайте о местной кухне и ресторанах, представленных в справочнике.",
  chat:"Попросить GoVietStay организовать частные услуги",packing:"Список вещей",
  explain:"Каждый день включает занятия, обед, отдых, еду и альтернативы на случай дождя. Варианты можно менять.",
  shortTrip:"За три дня сложно комфортно посетить Дананг, Хойан и Хюэ. Этот маршрут включает Дананг и Хойан; для Хюэ выберите от 5 дней.",
  islandNotice:"Фукуок — отдельный островной маршрут, не автомобильная остановка из Дананга.",
  whatsapp:"Здравствуйте, GoVietStay! Помогите организовать дополнительные услуги по нашему семейному маршруту.",
  family:"Гости",preferences:"Пожелания",sponsored:"Реклама",source:"Независимая запись из гастрогида GoVietStay"
 },
 it:{
  kicker:"LA TUA FAMIGLIA · IL TUO VIAGGIO",title:"Il tuo itinerario familiare in stile privato",
  intro:"Crea un itinerario dettagliato e indipendente a Da Nang, Hoi An, Hue o Phu Quoc. L'aiuto locale è facoltativo.",
  free:"Itinerario gratuito · Nessun account o costo IA",
  destination:"Destinazione",destinations:{danang:"Solo Da Nang",coast:"Da Nang + Hoi An",heritage:"Da Nang + Hoi An + Hue",phuquoc:"Isola di Phu Quoc"},
  length:"Giorni",arrival:"Data d'arrivo",optional:"facoltativa",adults:"Adulti",children:"Bambini",seniors:"Viaggiano persone anziane",
  pace:"Ritmo",paces:{easy:"Tranquillo",balanced:"Equilibrato",active:"Attivo"},
  interest:"Interesse principale",interests:{culture:"Cultura e storia",food:"Cucina locale",nature:"Natura e spiagge",family:"Attività tranquille per famiglie"},
  style:"Stile culinario",styles:{local:"Cucina vietnamita",mixed:"Locale + internazionale",international:"Cucina internazionale"},
  diet:"Alimentazione",diets:{any:"Flessibile",vegetarian:"Vegetariano (verificare ingredienti)","no-seafood":"Senza frutti di mare (verificare ingredienti)"},
  generate:"Crea il viaggio di famiglia",regenerate:"Rigenera dalle tue scelte",output:"Il tuo viaggio di famiglia",overview:"Panoramica",
  morning:"Mattina · Esperienze",lunch:"Pranzo e pausa",afternoon:"Pomeriggio · Senza fretta",evening:"Sera · Tempo libero",
  day:"GIORNO",foodTip:"Cosa assaggiare",venue:"Locale suggerito dalla guida",map:"Apri Google Maps",
  verified:"Orari, allergeni e disponibilità non sono stati verificati. Decidi tu se visitarlo.",
  important:"Famiglia e meteo",transport:"Trasporti e organizzazione",
  disclaimer:"È un itinerario suggerito, non un tour privato prenotato. Biglietti, autista, ristoranti e prezzi non sono inclusi. Verifica meteo, orari e disponibilità.",
  privacy:"Le scelte restano nel browser. WhatsApp apre solo una bozza che invii tu.",
  foodGuide:"Esplora la guida gastronomica",foodDetail:"Scopri piatti locali e indirizzi suggeriti da GoVietStay.",
  chat:"Chiedi a GoVietStay servizi privati facoltativi",packing:"Lista bagaglio",
  explain:"Ogni giorno ha attività, pranzo, pause, sapori locali e alternative in caso di pioggia. Puoi cambiare le preferenze.",
  shortTrip:"Tre giorni non bastano per visitare con calma Da Nang, Hoi An e Hue. Questa versione privilegia Da Nang e Hoi An; scegli 5+ giorni per includere Hue.",
  islandNotice:"Phu Quoc è un itinerario separato sull'isola, non una tappa in auto da Da Nang.",
  whatsapp:"Ciao GoVietStay! Vorrei aiuto con servizi facoltativi per il nostro itinerario di famiglia.",
  family:"Viaggiatori",preferences:"Preferenze",sponsored:"Sponsorizzato",source:"Segnalazione indipendente dalla guida gastronomica GoVietStay"
 }
};
const defaults:PlannerChoices={destination:"coast",duration:5,adults:2,children:2,seniors:false,pace:"easy",interest:"culture",foodStyle:"mixed",diet:"any",startDate:""};
const STORAGE_KEY="gvs-tk-family-planner-v2";
const destinations=["danang","coast","heritage","phuquoc"] as const;
const interests=["culture","food","nature","family"] as const;
const paces=["easy","balanced","active"] as const;
const foodStyles=["local","mixed","international"] as const;
const diets=["any","vegetarian","no-seafood"] as const;
function validSaved(data:unknown):data is PlannerChoices {
 if(!data||typeof data!=="object")return false;
 const x=data as Partial<PlannerChoices>;
 return destinations.some(d=>d===x.destination)&&[3,5,7,10].includes(Number(x.duration))
   &&Number.isInteger(Number(x.adults))&&Number(x.adults)>=1&&Number(x.adults)<=8
   &&Number.isInteger(Number(x.children))&&Number(x.children)>=0&&Number(x.children)<=8
   &&typeof x.seniors==="boolean"&&paces.some(d=>d===x.pace)
   &&interests.some(d=>d===x.interest)&&foodStyles.some(d=>d===x.foodStyle)
   &&diets.some(d=>d===x.diet)&&typeof x.startDate==="string"&&x.startDate.length<=10;
}
export function FamilyPlanner({lang,city}:{lang:Lang;city:CityId}){
 const copy=labels[lang];
 const [choices,setChoices]=useState<PlannerChoices>(defaults);
 const [committed,setCommitted]=useState<PlannerChoices|null>(null);
 useEffect(()=>{
  try{
   const data=JSON.parse(window.localStorage.getItem(STORAGE_KEY)||"null") as unknown;
   if(validSaved(data)){setChoices(data);setCommitted(data);}
  }catch{/* no access to storage */ }
 },[]);
 const change=<K extends keyof PlannerChoices>(key:K,value:PlannerChoices[K])=>setChoices(old=>({...old,[key]:value}));
 function generate(){
  const data={...choices};
  setCommitted(data);
  try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{/* in-memory planning still works */}
 }
 const days=committed?buildFamilyItinerary(committed,lang):[];
 const chat=committed?[
  copy.whatsapp,
  copy.destination+": "+copy.destinations[committed.destination],
  copy.length+": "+committed.duration,
  copy.family+": "+committed.adults+" + "+committed.children,
  copy.preferences+": "+copy.interests[committed.interest]+", "+copy.paces[committed.pace]+", "+copy.styles[committed.foodStyle]+", "+copy.diets[committed.diet],
  committed.startDate?copy.arrival+": "+committed.startDate:"",
  ...days.map((d,i)=>copy.day+" "+(i+1)+": "+d.city+" — "+d.dayTitle)
 ].filter(Boolean).join("\n"):"";
 return <article className={styles.planner}>
  <p className={styles.kicker}>{copy.kicker}</p>
  <h1 className={styles.title}>{copy.title}</h1>
  <p className={styles.intro}>{copy.intro}</p>
  <span className={styles.chip}>{copy.free}</span>
  <form className={styles.form} onSubmit={e=>{e.preventDefault();generate();}}>
   <label className={styles.field}><span>{copy.destination}</span><select value={choices.destination} onChange={e=>change("destination",e.target.value as FamilyDestination)}>
    {destinations.map(id=><option key={id} value={id}>{copy.destinations[id]}</option>)}
   </select></label>
   <div className={styles.two}>
    <label className={styles.field}><span>{copy.length}</span><select value={choices.duration} onChange={e=>change("duration",Number(e.target.value) as PlannerChoices["duration"])}>
     {[3,5,7,10].map(d=><option key={d} value={d}>{d}</option>)}
    </select></label>
    <label className={styles.field}><span>{copy.arrival} <small>({copy.optional})</small></span><input type="date" value={choices.startDate} onChange={e=>change("startDate",e.target.value)}/></label>
   </div>
   <div className={styles.two}>
    <label className={styles.field}><span>{copy.adults}</span><select value={choices.adults} onChange={e=>change("adults",Number(e.target.value))}>
     {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}
    </select></label>
    <label className={styles.field}><span>{copy.children}</span><select value={choices.children} onChange={e=>change("children",Number(e.target.value))}>
     {[0,1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}
    </select></label>
   </div>
   <label className={styles.checkbox}><input type="checkbox" checked={choices.seniors} onChange={e=>change("seniors",e.target.checked)}/><span>{copy.seniors}</span></label>
   <div className={styles.two}>
    <label className={styles.field}><span>{copy.pace}</span><select value={choices.pace} onChange={e=>change("pace",e.target.value as Pace)}>
     {paces.map(d=><option key={d} value={d}>{copy.paces[d]}</option>)}
    </select></label>
    <label className={styles.field}><span>{copy.interest}</span><select value={choices.interest} onChange={e=>change("interest",e.target.value as Interest)}>
     {interests.map(d=><option key={d} value={d}>{copy.interests[d]}</option>)}
    </select></label>
   </div>
   <div className={styles.two}>
    <label className={styles.field}><span>{copy.style}</span><select value={choices.foodStyle} onChange={e=>change("foodStyle",e.target.value as FoodStyle)}>
     {foodStyles.map(d=><option key={d} value={d}>{copy.styles[d]}</option>)}
    </select></label>
    <label className={styles.field}><span>{copy.diet}</span><select value={choices.diet} onChange={e=>change("diet",e.target.value as FoodDiet)}>
     {diets.map(d=><option key={d} value={d}>{copy.diets[d]}</option>)}
    </select></label>
   </div>
   <button className={styles.primary} type="submit">{committed?copy.regenerate:copy.generate}<span aria-hidden="true">→</span></button>
  </form>
  {committed&& <section className={styles.results} aria-live="polite">
   <p className={styles.kicker}>{copy.output}</p>
   <p className={styles.intro}>{copy.explain}</p>
   {committed.destination==="heritage"&&committed.duration===3&&<p className={styles.warning}>{copy.shortTrip}</p>}
   {committed.destination==="phuquoc"&&<p className={styles.hint}>{copy.islandNotice}</p>}
   {days.map((day,i)=><section className={styles.day} key={i}>
    <div className={styles.dayTop}><span>{copy.day} {i+1}</span><strong>{day.city}</strong></div>
    <h2>{day.dayTitle}</h2>
    <p className={styles.overview}>{day.overview}</p>
    <dl>
     <div><dt>{copy.morning}</dt><dd>{day.morning}</dd></div>
     <div><dt>{copy.lunch}</dt><dd>{day.lunch}</dd></div>
     <div><dt>{copy.afternoon}</dt><dd>{day.afternoon}</dd></div>
     <div><dt>{copy.evening}</dt><dd>{day.evening}</dd></div>
     <div className={styles.meal}>
      <dt>{copy.foodTip}</dt><dd>{day.food.dish}</dd>
      {day.food.venue && <div className={styles.venue}>
       <strong>{copy.venue}: {day.food.venue.name}</strong>
       {day.food.venue.sponsorship?.active&&<span className={styles.sponsor}>{copy.sponsored}</span>}
       <span>{day.food.venue.address}</span>
       <span>{copy.source}</span>
       <a target="_blank" rel="noopener noreferrer" href={foodMapUrl(day.food.venue)}>{copy.map} ↗</a>
       <small>{copy.verified}</small>
      </div>}
     </div>
     <div><dt>{copy.important}</dt><dd>{day.note}</dd></div>
     <div><dt>{copy.transport}</dt><dd>{day.transport}</dd></div>
    </dl>
   </section>)}
   <div className={styles.foodBridge}>
    <p className={styles.kicker}>{copy.foodGuide}</p>
    <p>{copy.foodDetail}</p>
    <Link href={"/"+lang+"/travel-kit/food?city="+(committed.destination==="phuquoc"?"phuquoc":"danang")}>{copy.foodGuide} →</Link>
   </div>
   <p className={styles.warning}>{copy.disclaimer}</p>
   <a className={styles.primary} target="_blank" rel="noopener noreferrer" href={whatsAppHref(chat)}
    onClick={()=>track("whatsapp_click",{language:lang,city,tool:"family-planner"})}>{copy.chat}<span aria-hidden="true">↗</span></a>
   <p className={styles.hint}>{copy.privacy}</p>
   <Link className={styles.secondary} href={"/"+lang+"/travel-kit/packing"}>{copy.packing} →</Link>
  </section>}
 </article>;
}
