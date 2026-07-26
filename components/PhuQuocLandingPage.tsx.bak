"use client";

import { useMemo, useState } from "react";
import "./PhuQuocLandingPage.css";

type Language = "en" | "ru";
type Tour = {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  adult: string;
  child: string;
  description: string;
  itinerary: string[];
  included: string[];
  excluded: string[];
  notes: string[];
};

const PHONE = "84937762607";

const content = {
  en: {
    navTours: "All tours",
    navCheck: "Check availability",
    eyebrow: "Three ways to discover Vietnam’s Pearl Island",
    title: "Choose your",
    titleAccent: "Phu Quoc day.",
    lead: "Compare an easy island discovery, a northern wooden-boat adventure and the complete four-island cable-car experience.",
    chips: ["Clear reference prices", "Local WhatsApp support", "EN & RU assistance"],
    collectionLabel: "GoVietStay Phu Quoc collection",
    collectionTitle: "One island. Three different travel styles.",
    collectionText: "Select the experience that fits your pace. Each card opens its complete program without leaving this page.",
    from: "Adult",
    child: "Child",
    details: "View full program",
    close: "Close program",
    itinerary: "Program",
    included: "Included",
    excluded: "Not included",
    notes: "Please note",
    ask: "Ask about this tour",
    compareLabel: "Choose with confidence",
    compareTitle: "Which Phu Quoc experience is right for you?",
    compare: [
      ["Easy sightseeing", "Choose Island Discovery for culture, landmarks and a comfortable daytime route."],
      ["Slower sea day", "Choose the northern wooden boat for fishing, beginner snorkeling and a local meal."],
      ["Complete first visit", "Choose 4 Islands + Hon Thom for snorkeling, cable car, water park and Kiss Bridge."],
    ],
    warningTitle: "Real conditions come first",
    warning: "Sea routes, snorkeling locations, island order, cable-car operations and activity timing may change because of weather, sea conditions, operator instructions, queues or safety requirements. GoVietStay cannot guarantee visibility, visitor numbers, animal shows, catches while fishing or uninterrupted attraction operations. The final pickup area, availability and total price are reconfirmed before payment.",
    cancelTitle: "Cancellation policy",
    cancel: [
      "Cancellation at least 24 hours before departure is free of charge.",
      "Cancellation 12–24 hours before departure is charged at 50% of the total booking price.",
      "Cancellation less than 12 hours before departure, last-minute cancellation or no-show is charged at 100% of the total booking price.",
    ],
    supportTitle: "Need help choosing?",
    supportText: "Tell GoVietStay your date, hotel, group size, children’s ages and preferred language. We will check the most suitable available option.",
    supportButton: "Chat with GoVietStay",
    otherTours: "Explore all GoVietStay tours",
    hello: "Hello GoVietStay! I would like to check availability for Phu Quoc tours.",
  },
  ru: {
    navTours: "Все экскурсии",
    navCheck: "Проверить места",
    eyebrow: "Три способа открыть Жемчужный остров Вьетнама",
    title: "Выберите свой",
    titleAccent: "день на Фукуоке.",
    lead: "Сравните обзорную экскурсию по острову, путешествие на деревянной лодке на севере и насыщенную программу «4 острова + канатная дорога».",
    chips: ["Понятные ориентировочные цены", "Поддержка в WhatsApp", "Поддержка EN & RU"],
    collectionLabel: "Коллекция GoVietStay на Фукуоке",
    collectionTitle: "Один остров. Три формата отдыха.",
    collectionText: "Выберите подходящий темп. Полная программа каждой экскурсии открывается прямо на этой странице.",
    from: "Взрослый",
    child: "Ребёнок",
    details: "Открыть программу",
    close: "Закрыть программу",
    itinerary: "Программа",
    included: "Включено",
    excluded: "Не включено",
    notes: "Важная информация",
    ask: "Узнать об этой экскурсии",
    compareLabel: "Выбирайте уверенно",
    compareTitle: "Какой формат Фукуока подходит именно вам?",
    compare: [
      ["Спокойное знакомство", "Island Discovery — культура, достопримечательности и комфортный дневной маршрут."],
      ["Неспешный морской день", "Деревянная лодка — рыбалка, снорклинг для начинающих и местный обед."],
      ["Максимум за один день", "4 острова + Хон Тхом — снорклинг, канатная дорога, аквапарк и Мост Поцелуев."],
    ],
    warningTitle: "Фактические условия важнее расписания",
    warning: "Морской маршрут, места для снорклинга, порядок посещения островов, работа канатной дороги и время активностей могут меняться из-за погоды, состояния моря, указаний оператора, очередей или требований безопасности. GoVietStay не может гарантировать видимость под водой, количество посетителей, проведение шоу с животными, улов во время рыбалки или бесперебойную работу объектов. Зона трансфера, наличие мест и итоговая стоимость подтверждаются до оплаты.",
    cancelTitle: "Условия отмены",
    cancel: [
      "Отмена не позднее чем за 24 часа до отправления — бесплатно.",
      "При отмене за 12–24 часа до отправления взимается 50% полной стоимости бронирования.",
      "При отмене менее чем за 12 часов, отмене непосредственно перед отправлением или неявке взимается 100% полной стоимости бронирования.",
    ],
    supportTitle: "Нужна помощь с выбором?",
    supportText: "Сообщите GoVietStay дату, отель, количество гостей, возраст детей и желаемый язык. Мы проверим наиболее подходящий доступный вариант.",
    supportButton: "Написать GoVietStay",
    otherTours: "Посмотреть все экскурсии GoVietStay",
    hello: "Здравствуйте, GoVietStay! Я хочу проверить места на экскурсии на Фукуоке.",
  },
} as const;

const tours: Record<Language, Tour[]> = {
  en: [
    {
      id: "island-discovery",
      title: "Phu Quoc Island Discovery Tour",
      category: "Sightseeing · Local culture · Easy day",
      duration: "08:30–15:00",
      image: "/tour/phuquoc/phuquoc-01.png",
      adult: "520,000 VND",
      child: "260,000 VND",
      description: "A relaxed introduction to Dinh Cau, Phu Quoc Ridgeback dogs, pearl farming and local specialties—ideal for guests who prefer sightseeing to a sea tour.",
      itinerary: ["08:30–09:00: Hotel pickup.", "Visit Dinh Cau.", "Visit the Phu Quoc Ridgeback Dog Farm and watch the racing show.", "Visit the Pearl Farm.", "Lunch at a local restaurant.", "Visit Dong Tam Snake Farm, the Silk Center and a local specialty village.", "15:00: Return to the hotel."],
      included: ["Shuttle bus", "Tour guide", "Lunch", "One bottle of water", "Entrance fees", "Travel insurance"],
      excluded: ["Personal expenses", "Additional drinks", "Optional shopping"],
      notes: ["Reference price: 20 USD/adult and 10 USD/child.", "Shopping stops are optional; guests are not required to purchase.", "Final route, price and availability are reconfirmed before booking."],
    },
    {
      id: "north-snorkeling",
      title: "North Phu Quoc Snorkeling & Fishing",
      category: "Wooden boat · Fishing · Beginner snorkeling",
      duration: "09:00 or 12:30",
      image: "/tour/phuquoc/phuquoc-02.png",
      adult: "1,300,000 VND",
      child: "910,000 VND",
      description: "Fish near Hon Bang Island, snorkel at a northern coral reef and enjoy a slower-paced wooden-boat journey with a local meal.",
      itinerary: ["Hotel pickup; the afternoon option starts at 12:30.", "Safety briefing and life-jacket fitting at Sunset Story.", "Fishing near Hon Bang Island.", "Snorkeling at a northern Phu Quoc coral reef.", "Freshwater shower and local meal.", "Transfer back to the hotel."],
      included: ["Shuttle bus", "Lunch or dinner", "One bottle of water", "Wooden boat", "Fishing and snorkeling equipment", "Travel insurance"],
      excluded: ["Tour guide in the base package", "Underwater photos unless requested", "Personal expenses", "Additional drinks"],
      notes: ["Reference price: 50 USD/adult and 35 USD/child.", "The base package has no tour guide. A private Russian- or Mongolian-speaking guide is available at extra cost.", "Child participation and the snorkeling location depend on age, health and sea conditions."],
    },
    {
      id: "four-islands",
      title: "4 Islands, Hon Thom Cable Car & Aquatopia",
      category: "Most popular · Islands · Cable car · Water park",
      duration: "07:00–17:30",
      image: "/tour/phuquoc/phuquoc-06.png",
      adult: "1,690,000 VND",
      child: "Confirm before booking",
      description: "The complete first-time Phu Quoc day: southern islands, snorkeling, Hon Thom Cable Car, lunch, Aquatopia Water Park and Kiss Bridge.",
      itinerary: ["07:00–07:30: Hotel pickup and meeting at the Pearl Farm.", "09:30: Begin the southern-island speedboat route.", "Optional Sea Walking at your own expense.", "Swimming, flycam photos and lunch at Mong Tay Island.", "Snorkeling at Gam Ghi or Buom Island and swimming at May Rut Island.", "Ride the Hon Thom sea-crossing cable car.", "Enjoy lunch and Aquatopia Water Park.", "16:30: Visit Kiss Bridge.", "17:30: Return to the hotel."],
      included: ["Shuttle bus", "Premium speedboat", "Hon Thom Cable Car ticket", "Tour guide", "Lunch", "Flycam photography", "Water", "Travel insurance"],
      excluded: ["Sea Walking", "Personal expenses", "Additional drinks", "Optional water sports"],
      notes: ["Reference price: 65 USD/guest.", "Share every child’s age and height for current operator pricing.", "The island order and activities may change according to sea, weather and operator conditions."],
    },
  ],
  ru: [
    {
      id: "island-discovery",
      title: "Обзорная экскурсия по острову Фукуок",
      category: "Достопримечательности · Культура · Спокойный день",
      duration: "08:30–15:00",
      image: "/tour/phuquoc/phuquoc-01.png",
      adult: "520 000 VND",
      child: "260 000 VND",
      description: "Спокойное знакомство с храмом Динь Кау, фукуокскими риджбеками, жемчужной фермой и местными продуктами — без морской прогулки.",
      itinerary: ["08:30–09:00: Встреча в отеле.", "Посещение Динь Кау.", "Питомник фукуокских риджбеков и шоу собачьих бегов.", "Посещение жемчужной фермы.", "Обед в местном ресторане.", "Змеиная ферма Dong Tam, шёлковый центр и деревня местных специалитетов.", "15:00: Возвращение в отель."],
      included: ["Трансфер", "Экскурсовод", "Обед", "Одна бутылка воды", "Входные билеты", "Туристическая страховка"],
      excluded: ["Личные расходы", "Дополнительные напитки", "Покупки по желанию"],
      notes: ["Ориентировочная цена: 20 USD/взрослый и 10 USD/ребёнок.", "Остановки для покупок необязательны — приобретать товары не требуется.", "Маршрут, цена и наличие мест подтверждаются до бронирования."],
    },
    {
      id: "north-snorkeling",
      title: "Снорклинг и рыбалка на севере Фукуока",
      category: "Деревянная лодка · Рыбалка · Снорклинг",
      duration: "09:00 или 12:30",
      image: "/tour/phuquoc/phuquoc-02.png",
      adult: "1 300 000 VND",
      child: "910 000 VND",
      description: "Рыбалка у острова Хон Банг, снорклинг у северного рифа и неспешное путешествие на деревянной лодке с местным обедом.",
      itinerary: ["Встреча в отеле; дневной вариант начинается в 12:30.", "Инструктаж и подбор спасательного жилета в Sunset Story.", "Рыбалка возле острова Хон Банг.", "Снорклинг у северного кораллового рифа.", "Пресный душ и местная еда.", "Возвращение в отель."],
      included: ["Трансфер", "Обед или ужин", "Одна бутылка воды", "Деревянная лодка", "Снаряжение для рыбалки и снорклинга", "Туристическая страховка"],
      excluded: ["Экскурсовод в базовом пакете", "Подводные фотографии без предварительного запроса", "Личные расходы", "Дополнительные напитки"],
      notes: ["Ориентировочная цена: 50 USD/взрослый и 35 USD/ребёнок.", "В базовый пакет гид не включён. Частный русскоговорящий или монголоязычный гид доступен за дополнительную плату.", "Участие детей и место снорклинга зависят от возраста, здоровья и состояния моря."],
    },
    {
      id: "four-islands",
      title: "4 острова, канатная дорога Хон Тхом и Aquatopia",
      category: "Хит · Острова · Канатная дорога · Аквапарк",
      duration: "07:00–17:30",
      image: "/tour/phuquoc/phuquoc-06.png",
      adult: "1 690 000 VND",
      child: "Уточняется до бронирования",
      description: "Полный день для первого знакомства с Фукуоком: южные острова, снорклинг, канатная дорога Хон Тхом, обед, Aquatopia и Мост Поцелуев.",
      itinerary: ["07:00–07:30: Встреча в отеле и сбор у жемчужной фермы.", "09:30: Начало маршрута по южным островам на скоростном катере.", "Sea Walking по желанию и за дополнительную плату.", "Купание, съёмка с дрона и обед на острове Монг Тай.", "Снорклинг у Гам Ги или Буом и купание у Май Рут.", "Поездка по морской канатной дороге Хон Тхом.", "Обед и аквапарк Aquatopia.", "16:30: Мост Поцелуев.", "17:30: Возвращение в отель."],
      included: ["Трансфер", "Скоростной катер", "Билет на канатную дорогу Хон Тхом", "Экскурсовод", "Обед", "Съёмка с дрона", "Вода", "Туристическая страховка"],
      excluded: ["Sea Walking", "Личные расходы", "Дополнительные напитки", "Дополнительные водные развлечения"],
      notes: ["Ориентировочная цена: 65 USD/гость.", "Для расчёта детского тарифа сообщите возраст и рост каждого ребёнка.", "Порядок островов и активности могут меняться из-за моря, погоды и условий оператора."],
    },
  ],
};

export default function PhuQuocLandingPage({ language }: { language: Language }) {
  const t = content[language];
  const items = tours[language];
  const [openTour, setOpenTour] = useState(items[0].id);
  const message = useMemo(() => encodeURIComponent(t.hello), [t.hello]);
  const whatsapp = `https://wa.me/${PHONE}?text=${message}`;
  const allTours = language === "ru" ? "/ru/tours" : "/tours";
  const otherLanguage = language === "ru" ? "/tours/phu-quoc" : "/ru/tours/phu-quoc";

  return (
    <main>
      <section className="pqHero">
        <header className="pqHeader">
          <a className="pqBrand" href={language === "ru" ? "/ru" : "/"}><b>G</b><span>GoVietStay</span></a>
          <nav><a href={allTours}>← {t.navTours}</a><a href={otherLanguage}>{language === "ru" ? "EN" : "RU"}</a><a className="pqPrimary" href="#tours">{t.navCheck}</a></nav>
        </header>
        <div className="pqHeroGrid">
          <div className="pqHeroCopy">
            <p className="pqEyebrow">{t.eyebrow}</p>
            <h1>{t.title}<em>{t.titleAccent}</em></h1>
            <p className="pqLead">{t.lead}</p>
            <div className="pqChips">{t.chips.map(x=><span key={x}>{x}</span>)}</div>
          </div>
          <div className="pqHeroImages" aria-label="Phu Quoc tour collection">
            <figure className="pqImageMain"><img src="/tour/phuquoc/phuquoc-06.png" alt={items[2].title}/><figcaption>4 Islands · Hon Thom</figcaption></figure>
            <figure><img src="/tour/phuquoc/phuquoc-01.png" alt={items[0].title}/></figure>
            <figure><img src="/tour/phuquoc/phuquoc-02.png" alt={items[1].title}/></figure>
          </div>
        </div>
      </section>

      <section className="pqSection pqIntro" id="tours">
        <div><p className="pqLabel">{t.collectionLabel}</p><h2>{t.collectionTitle}</h2></div>
        <p>{t.collectionText}</p>
      </section>

      <section className="pqTourList">
        {items.map((tour, index) => {
          const open = openTour === tour.id;
          const tourMessage = encodeURIComponent(`${t.hello}\n\n${tour.title}`);
          return <article className={`pqTour ${open ? "isOpen" : ""}`} id={tour.id} key={tour.id}>
            <div className="pqTourTop">
              <img src={tour.image} alt={tour.title}/>
              <div className="pqTourSummary">
                <div className="pqTourNumber">0{index + 1}</div>
                <p className="pqCategory">{tour.category}</p>
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <div className="pqMeta"><span>⏱ {tour.duration}</span><span>{t.from}: <strong>{tour.adult}</strong></span><span>{t.child}: <strong>{tour.child}</strong></span></div>
                <button type="button" onClick={()=>setOpenTour(open ? "" : tour.id)} aria-expanded={open}>{open ? t.close : t.details}<span>{open ? "−" : "+"}</span></button>
              </div>
            </div>
            {open && <div className="pqTourDetails">
              <div className="pqProgram"><h4>{t.itinerary}</h4><ol>{tour.itinerary.map((x,i)=><li key={x}><b>{i+1}</b><span>{x}</span></li>)}</ol></div>
              <div className="pqDetailColumns"><section><h4>{t.included}</h4><ul>{tour.included.map(x=><li key={x}>✓ <span>{x}</span></li>)}</ul></section><section><h4>{t.excluded}</h4><ul>{tour.excluded.map(x=><li key={x}>— <span>{x}</span></li>)}</ul></section><section className="pqNotes"><h4>{t.notes}</h4><ul>{tour.notes.map(x=><li key={x}>• <span>{x}</span></li>)}</ul></section></div>
              <a className="pqTourAsk" href={`https://wa.me/${PHONE}?text=${tourMessage}`} target="_blank" rel="noreferrer">{t.ask} →</a>
            </div>}
          </article>;
        })}
      </section>

      <section className="pqCompare">
        <div className="pqSection"><p className="pqLabel">{t.compareLabel}</p><h2>{t.compareTitle}</h2><div className="pqCompareGrid">{t.compare.map(([title,text],i)=><article key={title}><b>0{i+1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="pqNotice pqWarning"><b>!</b><div><h2>{t.warningTitle}</h2><p>{t.warning}</p></div></section>
      <section className="pqNotice pqCancellation"><b>↺</b><div><h2>{t.cancelTitle}</h2><ul>{t.cancel.map(x=><li key={x}>{x}</li>)}</ul></div></section>

      <section className="pqSupport"><p className="pqLabel">GoVietStay · Phu Quoc</p><h2>{t.supportTitle}</h2><p>{t.supportText}</p><div><a href={whatsapp} target="_blank" rel="noreferrer">{t.supportButton}</a><a className="pqSecondary" href={allTours}>{t.otherTours}</a></div></section>
      <footer><strong>GoVietStay</strong><span>Trusted Local Support</span><a href="https://GoVietStay.com">GoVietStay.com</a><span>WhatsApp: +84 937 762 607</span></footer>
    </main>
  );
}
