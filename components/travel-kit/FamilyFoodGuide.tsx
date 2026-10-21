"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOOD_LISTINGS, foodMapUrl, mealFor, tr, type FamilyCity, type FoodDiet, type FoodListing, type FoodStyle } from "@/lib/travel-kit/family-planner-data";
import type { Lang, CityId } from "@/lib/travel-kit/types";
import { whatsAppHref } from "@/lib/travel-kit/config";
import { track } from "@/lib/travel-kit/analytics";
import styles from "./family-planner.module.css";

const cities:FamilyCity[]=["Da Nang","Hoi An","Hue","Phu Quoc"];
type Copy={title:string;subtitle:string;city:string;style:string;diet:string;styles:Record<FoodStyle,string>;diets:Record<FoodDiet,string>;
 editorial:string;cityIntro:string;dish:string;restaurants:string;noListing:string;disclaimer:string;map:string;fromSource:string;
 original:string;plan:string;partner:string;partnerBody:string;partnerMessage:string;sponsored:string;street:string;
};
const copy:Record<Lang,Copy>={
 en:{
  title:"Food & local flavors",subtitle:"An independent guide to family meals in Vietnam, connected to your Travel Kit and Family Planner.",
  city:"Explore a city",style:"Cuisine",diet:"Dietary preference",
  styles:{local:"Vietnamese local food",mixed:"Local + international",international:"International dining"},
  diets:{any:"Flexible",vegetarian:"Vegetarian (verify ingredients)","no-seafood":"Avoid seafood (verify ingredients)"},
  editorial:"Editorial recommendations, not paid listings. No sponsored venues are currently active.",
  cityIntro:"Find food to try while planning your family day. Venues are examples from our existing Da Nang and Hoi An guide; they are not booked or confirmed in real time.",
  dish:"Local food worth discovering",restaurants:"Places in our guide",
  noListing:"No restaurant names verified for this choice yet. Ask GoVietStay for current local options rather than relying on an invented listing.",
  disclaimer:"Addresses are reference information from an existing guide. Check opening hours, location, hygiene, menu, allergens, child-friendliness and availability independently.",
  map:"Open Google Maps",fromSource:"Originally listed in GoVietStay Local Food",original:"See full Da Nang & Hoi An Food Guide",
  plan:"Create a family itinerary",partner:"For restaurant partners",partnerBody:"We are building a useful local-food discovery guide. If you operate a restaurant, you can contact GoVietStay about future, clearly labeled sponsored placements. No advertising is active on this page.",
  partnerMessage:"Hello GoVietStay. I manage a restaurant and would like to discuss a future clearly marked Food Guide partnership.",
  sponsored:"Sponsored",street:"Address"
 },
 ru:{
  title:"Местная кухня и гастрогид",subtitle:"Независимый путеводитель по семейным обедам во Вьетнаме внутри Travel Kit.",
  city:"Город",style:"Кухня",diet:"Питание",
  styles:{local:"Вьетнамская",mixed:"Местная + международная",international:"Международная"},
  diets:{any:"Без ограничений",vegetarian:"Вегетарианское (уточнять состав)","no-seafood":"Без морепродуктов (уточнять состав)"},
  editorial:"Независимые рекомендации, а не оплаченные позиции. Активных спонсоров пока нет.",
  cityIntro:"Ищите местные блюда для семейного отдыха. Заведения взяты из нашего существующего справочника Дананга и Хойана; столики не забронированы.",
  dish:"Местные блюда",restaurants:"Заведения из справочника",
  noListing:"Для этого выбора пока нет проверенных названий ресторанов. Уточните актуальные варианты у GoVietStay.",
  disclaimer:"Адреса приведены из прежнего справочника. Уточняйте часы, меню, аллергены, условия для детей и наличие мест.",
  map:"Открыть Google Карты",fromSource:"Из гастрогида GoVietStay",original:"Полный гастрогид Дананга и Хойана",
  plan:"Составить семейный маршрут",partner:"Для ресторанов",partnerBody:"Мы развиваем полезный справочник местной кухни. Владельцы ресторанов могут обсудить будущие рекламные размещения с заметной маркировкой. Сейчас рекламы нет.",
  partnerMessage:"Здравствуйте, GoVietStay! Я представляю ресторан и хочу обсудить будущее открыто отмеченное партнёрство в гастрогиде.",
  sponsored:"Реклама",street:"Адрес"
 },
 it:{
  title:"Cucina e sapori locali",subtitle:"Una guida indipendente ai pasti in famiglia in Vietnam, collegata al Travel Kit.",
  city:"Città",style:"Cucina",diet:"Alimentazione",
  styles:{local:"Vietnamita",mixed:"Locale + internazionale",international:"Internazionale"},
  diets:{any:"Flessibile",vegetarian:"Vegetariano (verificare ingredienti)","no-seafood":"Senza frutti di mare (verificare ingredienti)"},
  editorial:"Suggerimenti editoriali non a pagamento. Nessun ristorante sponsorizzato attivo al momento.",
  cityIntro:"Scopri cosa assaggiare con la famiglia. I locali provengono dalla guida esistente di Da Nang e Hoi An, senza prenotazioni né disponibilità in tempo reale.",
  dish:"Sapori da provare",restaurants:"Locali nella nostra guida",
  noListing:"Non abbiamo ancora nomi verificati per questa scelta. Chiedi opzioni aggiornate a GoVietStay.",
  disclaimer:"Gli indirizzi sono indicativi e ripresi dalla guida esistente. Verifica orari, menù, allergeni, igiene e accessibilità.",
  map:"Apri Google Maps",fromSource:"Dalla guida gastronomica GoVietStay",original:"Guida completa di Da Nang e Hoi An",
  plan:"Crea un viaggio di famiglia",partner:"Per i ristoratori",partnerBody:"Stiamo creando una guida gastronomica utile. I ristoratori possono parlare con GoVietStay di future sponsorizzazioni chiaramente segnalate. Attualmente non ci sono annunci.",
  partnerMessage:"Ciao GoVietStay, gestisco un ristorante e vorrei discutere di una futura collaborazione pubblicitaria chiaramente segnalata nella guida.",
  sponsored:"Sponsorizzato",street:"Indirizzo"
 }
};
function initialCity(city:CityId):FamilyCity{
 if(city==="hoian")return "Hoi An";if(city==="hue")return "Hue";if(city==="phuquoc")return "Phu Quoc";
 return "Da Nang";
}
export function FamilyFoodGuide({lang,city}:{lang:Lang;city:CityId}){
 const c=copy[lang];
 const [selected,setSelected]=useState<FamilyCity>(initialCity(city));
 const [style,setStyle]=useState<FoodStyle>("mixed");
 const [diet,setDiet]=useState<FoodDiet>("any");
 const meal=mealFor(selected,lang,diet,style);
 const hero=selected==="Da Nang"?"/local-food/hero-food.jpg":selected==="Hoi An"?"/local-food/hoi-an-food.jpg":selected==="Hue"?"/travel-kit/opt/hue-ngo-mon-640.webp":"/travel-kit/opt/phu-quoc-beach-640.webp";
 // Do not imply vegetarian or seafood-free compatibility for unverified restaurants.
 const listings=diet==="any"?FOOD_LISTINGS.filter(p=>p.city===selected&&(style==="mixed"||style===p.category)):[];
 const sponsoredActive=FOOD_LISTINGS.some(p=>p.sponsorship?.active);
 const options=(["local","mixed","international"] as const);
 return <article className={styles.planner}>
  <p className={styles.kicker}>GOVIETSTAY · TRAVEL KIT</p>
  <h1 className={styles.title}>{c.title}</h1>
  <p className={styles.intro}>{c.subtitle}</p>
  <div className={styles.foodHero}><Image alt={selected+" destination guide"} src={hero} width={960} height={440} sizes="(max-width: 600px) 100vw, 440px"/></div>
  {!sponsoredActive&&<div className={styles.chip}>{c.editorial}</div>}
  <div className={styles.form}>
   <label className={styles.field}><span>{c.city}</span>
    <select value={selected} onChange={e=>setSelected(e.target.value as FamilyCity)}>{cities.map(city=><option key={city} value={city}>{city}</option>)}</select>
   </label>
   <div className={styles.two}>
    <label className={styles.field}><span>{c.style}</span>
     <select value={style} onChange={e=>setStyle(e.target.value as FoodStyle)}>
      {options.map(v=><option value={v} key={v}>{c.styles[v]}</option>)}
     </select>
    </label>
    <label className={styles.field}><span>{c.diet}</span>
     <select value={diet} onChange={e=>setDiet(e.target.value as FoodDiet)}>
      {(["any","vegetarian","no-seafood"] as const).map(v=><option value={v} key={v}>{c.diets[v]}</option>)}
     </select>
    </label>
   </div>
  </div>
  <section className={styles.results}>
   <div className={styles.foodBridge}>
    <p className={styles.kicker}>{c.dish} · {selected}</p>
    <h2>{meal.dish}</h2>
    <p>{meal.detail}</p>
   </div>
   <p className={styles.intro}>{c.cityIntro}</p>
   <p className={styles.kicker}>{c.restaurants}</p>
   {listings.length>0?listings.map((p:FoodListing)=><div className={styles.day} key={p.id}>
    <div className={styles.dayTop}><span>{p.category==="local"?c.styles.local:c.styles.international}</span>
     {p.sponsorship?.active&&<strong className={styles.sponsor}>{c.sponsored}</strong>}
    </div>
    <h2>{p.name}</h2>
    <p className={styles.overview}>{tr(p.description,lang)}</p>
    <dl><div><dt>{c.street}</dt><dd>{p.address}</dd></div></dl>
    <a href={foodMapUrl(p)} target="_blank" rel="noopener noreferrer" className={styles.secondary}
     onClick={()=>{track("food_listing_click",{language:lang,city,tool:"food",listingId:p.id});if(p.sponsorship?.active)track("sponsored_food_click",{language:lang,city,tool:"food",listingId:p.id});}}>{c.map} ↗</a>
    <p className={styles.hint}>{c.fromSource}</p>
   </div>):<p className={styles.warning}>{c.noListing}</p>}
   <p className={styles.warning}>{c.disclaimer}</p>
   <Link className={styles.secondary} href="/local-food">{c.original} →</Link>
   <Link className={styles.primary} href={"/"+lang+"/travel-kit/family-planner"}>{c.plan} →</Link>
   <div className={styles.foodBridge}>
    <p className={styles.kicker}>{c.partner}</p>
    <p>{c.partnerBody}</p>
    <a className={styles.secondary} href={whatsAppHref(c.partnerMessage)} target="_blank" rel="noopener noreferrer"
      onClick={()=>track("whatsapp_click",{language:lang,city,tool:"food"})}>WhatsApp ↗</a>
   </div>
  </section>
 </article>;
}
