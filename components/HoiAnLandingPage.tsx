"use client";

import { useMemo, useState } from "react";
import "./HoiAnLandingPage.css";

type Language = "en" | "ru";
const PHONE = "84937762607";

const content = {
  en: {
    nav: "Check availability",
    eyebrow: "Hoi An Coconut Forest & Lantern Night",
    titleA: "From coconut palms",
    titleB: "to lantern lights.",
    lead: "One memorable afternoon: a basket boat adventure, Hoi An local food, a lantern-lit river and the ancient town at night.",
    chips: ["English-speaking guide", "Pickup from Da Nang", "Afternoon & evening"],
    highlights: "One tour. Four Hoi An experiences.",
    highlightLead: "Travel from the green waterways of Cam Thanh to the warm lantern glow of Hoi An Ancient Town.",
    highlightsList: [
      ["Basket boat", "Glide through Bay Mau Coconut Forest and meet the culture of local fishermen."],
      ["Local dinner", "Enjoy selected Hoi An specialties according to the confirmed tour package."],
      ["Lantern boat", "Take a short boat ride on the Hoai River and release a traditional lantern."],
      ["Hoi An by night", "Walk through the ancient streets, lantern quarter and night market."],
    ],
    itineraryLabel: "Suggested itinerary",
    itineraryTitle: "An afternoon that changes with the light.",
    itinerary: [
      ["14:00–14:30", "Hotel pickup", "Pickup from selected hotels in Da Nang."],
      ["15:15–16:30", "Coconut forest & basket boat", "Visit Bay Mau Coconut Forest and enjoy the traditional basket boat experience."],
      ["16:30–17:15", "Transfer to Hoi An", "Travel to Hoi An Ancient Town and prepare for the evening program."],
      ["17:30–18:20", "Local dinner", "Taste selected local dishes included in the confirmed package."],
      ["18:30–19:00", "Boat ride & lantern release", "Cruise briefly on the Hoai River and release a lantern."],
      ["19:00–19:30", "Ancient Town & night market", "Walk through the lantern streets, ancient quarter and night market."],
      ["19:30", "Return to Da Nang", "Depart Hoi An. Estimated hotel arrival is around 20:30."],
    ],
    warningTitle: "Important information before booking",
    warning: "Hoi An is often very crowded in the evening, especially on weekends, public holidays, festival nights and in peak season. GoVietStay cannot guarantee visitor numbers, traffic, waiting times, weather, river conditions or the operation of local activities. Timing and order may be adjusted according to actual conditions. Guests should follow the guide and return to the agreed meeting point on time.",
    cancellationTitle: "Cancellation policy",
    cancellationTerms: [
      "Cancellation at least 24 hours before departure is free of charge.",
      "Cancellation 12–24 hours before departure is charged at 50% of the total booking price.",
      "Cancellation less than 12 hours before departure, last-minute cancellation or no-show is charged at 100% of the total booking price.",
    ],
    included: "Included",
    includedList: ["Hotel pickup and return in the confirmed area", "English-speaking guide", "Basket boat experience", "Hoi An entrance ticket when required", "Confirmed local dinner", "Hoai River boat ride and lantern", "Bottled water", "VAT"],
    excluded: "Not included",
    excludedList: ["Basket boat spinning show and personal tips", "Additional food and drinks", "Personal shopping and expenses", "Services not stated above"],
    priceLabel: "Tour price",
    priceTitle: "Simple booking. Real local support.",
    adult: "Adult",
    child: "Child",
    childPrice: "Please ask",
    priceNote: "Adult reference price: 1,250,000 VND/person. Child price depends on the operator’s current height policy. Private tours can be requested separately.",
    date: "Tour date", adults: "Adults", children: "Children", childInfo: "Children’s age & height", hotel: "Hotel name",
    placeholderChild: "Example: 7 years, 125 cm", placeholderHotel: "Hotel in Da Nang",
    whatsapp: "Check availability on WhatsApp", free: "Checking availability is free. Booking is confirmed only after GoVietStay replies.",
    reviewLabel: "Verified guest reviews", reviewTitle: "Real guests. Real Hoi An memories.", reviewLead: "Original Google review screenshots are available for verification.",
    open: "Open original", faq: "Helpful to know", faqTitle: "Questions before your trip",
    faqs: [
      ["Is Hoi An crowded at night?", "It can be very crowded, especially on weekends, holidays and festival evenings. The tour cannot promise an uncrowded experience."],
      ["What language does the guide speak?", "The standard tour includes an English-speaking guide."],
      ["Can the itinerary change?", "Yes. Traffic, weather, river conditions, crowds and local operating rules may affect timing and order."],
    ],
    finalTitle: "Coconut palms in the afternoon. Lanterns after sunset.",
    finalText: "English-speaking guide · WhatsApp support · Details confirmed before payment",
    messageHello: "Hello GoVietStay! I would like to check availability for the Hoi An Coconut Forest & Lantern Night tour.",
  },
  ru: {
    nav: "Проверить места",
    eyebrow: "Кокосовый лес и вечерний Хойан",
    titleA: "От кокосовых пальм",
    titleB: "к огням фонарей.",
    lead: "Один незабываемый день: лодка-корзина, местная кухня Хойана, фонарики на реке и вечерняя прогулка по Старому городу.",
    chips: ["Англоговорящий гид", "Трансфер из Дананга", "Днём и вечером"],
    highlights: "Одна экскурсия. Четыре впечатления.",
    highlightLead: "От зелёных каналов Камтханя до тёплого света фонарей в Старом городе Хойана.",
    highlightsList: [
      ["Лодка-корзина", "Прогулка по кокосовому лесу Бэй Мау и знакомство с культурой рыбаков."],
      ["Местный ужин", "Блюда Хойана согласно подтверждённому пакету экскурсии."],
      ["Лодка и фонарик", "Короткая прогулка по реке Хоай и запуск традиционного фонарика."],
      ["Вечерний Хойан", "Старинные улицы, квартал фонарей и ночной рынок."],
    ],
    itineraryLabel: "Примерная программа",
    itineraryTitle: "День, который меняется вместе со светом.",
    itinerary: [
      ["14:00–14:30", "Встреча в отеле", "Трансфер из выбранных отелей Дананга."],
      ["15:15–16:30", "Кокосовый лес и лодка-корзина", "Посещение кокосового леса Бэй Мау и традиционная прогулка на лодке-корзине."],
      ["16:30–17:15", "Переезд в Хойан", "Переезд в Старый город и подготовка к вечерней программе."],
      ["17:30–18:20", "Местный ужин", "Выбранные блюда, включённые в подтверждённый пакет."],
      ["18:30–19:00", "Прогулка на лодке и фонарик", "Короткая прогулка по реке Хоай и запуск фонарика."],
      ["19:00–19:30", "Старый город и ночной рынок", "Прогулка по улицам фонарей, Старому городу и ночному рынку."],
      ["19:30", "Возвращение в Дананг", "Отправление из Хойана. Прибытие в отель ориентировочно в 20:30."],
    ],
    warningTitle: "Важная информация перед бронированием",
    warning: "Вечером в Хойане часто бывает многолюдно, особенно в выходные, праздничные дни, во время фестивалей и в высокий сезон. GoVietStay не может гарантировать количество посетителей, дорожную ситуацию, время ожидания, погоду, состояние реки или работу местных развлечений. Время и порядок программы могут быть изменены с учётом фактической ситуации. Гости должны соблюдать инструкции гида и вовремя возвращаться к месту встречи.",
    cancellationTitle: "Условия отмены",
    cancellationTerms: [
      "Отмена не позднее чем за 24 часа до отправления — бесплатно.",
      "При отмене за 12–24 часа до отправления взимается 50% полной стоимости бронирования.",
      "При отмене менее чем за 12 часов, отмене непосредственно перед отправлением или неявке взимается 100% полной стоимости бронирования.",
    ],
    included: "Включено",
    includedList: ["Трансфер из отеля и обратно", "Англоговорящий гид", "Прогулка на лодке-корзине", "Билет в Старый город, если требуется", "Подтверждённый местный ужин", "Прогулка по реке Хоай и фонарик", "Бутилированная вода", "НДС"],
    excluded: "Не включено",
    excludedList: ["Шоу с вращением лодки и личные чаевые", "Дополнительная еда и напитки", "Покупки и личные расходы", "Услуги, не указанные выше"],
    priceLabel: "Стоимость экскурсии",
    priceTitle: "Простое бронирование. Надёжная местная поддержка.",
    adult: "Взрослый",
    child: "Ребёнок",
    childPrice: "Уточните",
    priceNote: "Ориентировочная цена для взрослого: 1 250 000 VND/человек. Детский тариф зависит от действующих правил оператора по росту. Индивидуальную экскурсию можно запросить отдельно.",
    date: "Дата поездки", adults: "Взрослые", children: "Дети", childInfo: "Возраст и рост детей", hotel: "Название отеля",
    placeholderChild: "Например: 7 лет, 125 см", placeholderHotel: "Отель в Дананге",
    whatsapp: "Проверить места в WhatsApp", free: "Проверка мест бесплатна. Бронирование подтверждается после ответа GoVietStay.",
    reviewLabel: "Проверенные отзывы гостей", reviewTitle: "Настоящие гости. Настоящие впечатления.", reviewLead: "Оригинальные скриншоты отзывов Google доступны для проверки.",
    open: "Открыть оригинал", faq: "Полезно знать", faqTitle: "Вопросы перед поездкой",
    faqs: [
      ["В Хойане многолюдно вечером?", "Да, особенно в выходные, праздники и фестивальные вечера. Экскурсия не может гарантировать отсутствие большого количества посетителей."],
      ["На каком языке говорит гид?", "В стандартную программу включён англоговорящий гид."],
      ["Может ли программа измениться?", "Да. На время и порядок могут повлиять пробки, погода, состояние реки, количество посетителей и местные правила."],
    ],
    finalTitle: "Кокосовые пальмы днём. Фонарики после заката.",
    finalText: "Англоговорящий гид · Поддержка в WhatsApp · Все детали до оплаты",
    messageHello: "Здравствуйте, GoVietStay! Я хочу проверить наличие мест на экскурсию «Кокосовый лес и вечерний Хойан».",
  },
} as const;

const reviews = {
  en: [
    ["W B", "I really enjoyed my trip to Hoi An and took the opportunity to enjoy a short boat ride. Thank you to the agency for recommending it.", "wb-hoi-an.png"],
    ["Russian guest", "Thank you to Anna and David for selecting and organizing such interesting tours. We especially enjoyed Hoi An, the guide and the comfortable service.", "russian-guest.png"],
    ["Ryan", "An amazing trip! Our first visit to Da Nang with GoVietStay. Great service and very helpful support. Highly recommended!", "ryan.png"],
  ],
  ru: [
    ["W B", "Мне очень понравилась поездка в Хойан. Я также воспользовался возможностью совершить небольшую прогулку на лодке. Спасибо агентству за рекомендацию.", "wb-hoi-an.png"],
    ["Гость GoVietStay", "Спасибо Анне и Дэвиду за подбор и организацию интересных экскурсий. Очень понравился Хойан, гид и комфортное обслуживание.", "russian-guest.png"],
    ["Ryan", "Потрясающая поездка! Наше первое путешествие в Дананг с GoVietStay. Отличный сервис и очень полезная поддержка. Рекомендуем!", "ryan.png"],
  ],
} as const;

export default function HoiAnLandingPage({ language }: { language: Language }) {
  const t = content[language];
  const [booking, setBooking] = useState({ date: "", adults: "2", children: "0", childInfo: "", hotel: "" });
  const message = useMemo(() => encodeURIComponent(`${t.messageHello}\n\n${t.date}: ${booking.date || "-"}\n${t.adults}: ${booking.adults}\n${t.children}: ${booking.children}\n${t.childInfo}: ${booking.childInfo || "-"}\n${t.hotel}: ${booking.hotel || "-"}`), [booking, t]);

  return <main id="top">
    <section className="hero">
      <div className="heroGlow" />
      <header><a className="brand" href="#top"><b>G</b><span>GoVietStay</span></a><a className="navCta" href="#booking">{t.nav}</a></header>
      <div className="heroVisuals" aria-label={language === "ru" ? "Фотографии гостей GoVietStay" : "GoVietStay guest photos"}>
        <img className="heroMainPhoto" src="/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp" alt={language === "ru" ? "Гости на лодке-корзине в кокосовом лесу" : "Guests enjoying a basket boat in the coconut forest"} />
        <img className="heroOldTownPhoto" src="/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp" alt={language === "ru" ? "Гость в старинном доме Хойана" : "Guest visiting a Hoi An ancient house"} />
        <img className="heroLanternPhoto" src="/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp" alt={language === "ru" ? "Гости на лодке с фонариками в Хойане" : "Guests on a lantern boat in Hoi An"} />
      </div>
      <div className="heroCopy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.titleA}<br/><em>{t.titleB}</em></h1><p className="lead">{t.lead}</p><div className="chips">{t.chips.map(x=><span key={x}>{x}</span>)}</div></div>
    </section>

    <section className="intro section"><div><p className="label">GoVietStay experience</p><h2>{t.highlights}</h2></div><p>{t.highlightLead}</p></section>
    <section className="highlightGrid">{t.highlightsList.map((x,i)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</section>

    <section className="section schedule"><p className="label">{t.itineraryLabel}</p><h2>{t.itineraryTitle}</h2><div className="timeline">{t.itinerary.map((x,i)=><article key={x[0]}><time>{x[0]}</time><i>{i+1}</i><div><h3>{x[1]}</h3><p>{x[2]}</p></div></article>)}</div></section>

    <section className="warning"><div>!</div><section><h3>{t.warningTitle}</h3><p>{t.warning}</p></section></section>
    <section className="cancellationPolicy"><div>↺</div><section><h3>{t.cancellationTitle}</h3><ul>{t.cancellationTerms.map(x=><li key={x}>{x}</li>)}</ul></section></section>

    <section className="splitLists"><div className="included"><p className="label">{t.included}</p><h2>{t.included}</h2><ul>{t.includedList.map(x=><li key={x}>✓ <span>{x}</span></li>)}</ul></div><div className="excluded"><p className="label">{t.excluded}</p><h2>{t.excluded}</h2><ul>{t.excludedList.map(x=><li key={x}>— <span>{x}</span></li>)}</ul></div></section>

    <section className="section priceBooking" id="booking"><div><p className="label">{t.priceLabel}</p><h2>{t.priceTitle}</h2><div className="prices"><article><span>{t.adult}</span><strong>1,250,000</strong><small>VND / person</small></article><article><span>{t.child}</span><strong>{t.childPrice}</strong></article></div><p className="muted">{t.priceNote}</p></div><div className="formCard">
      <label>{t.date}<input type="date" value={booking.date} onChange={e=>setBooking({...booking,date:e.target.value})}/></label>
      <div className="formRow"><label>{t.adults}<input value={booking.adults} onChange={e=>setBooking({...booking,adults:e.target.value})}/></label><label>{t.children}<input value={booking.children} onChange={e=>setBooking({...booking,children:e.target.value})}/></label></div>
      <label>{t.childInfo}<input placeholder={t.placeholderChild} value={booking.childInfo} onChange={e=>setBooking({...booking,childInfo:e.target.value})}/></label>
      <label>{t.hotel}<input placeholder={t.placeholderHotel} value={booking.hotel} onChange={e=>setBooking({...booking,hotel:e.target.value})}/></label>
      <a href={`https://wa.me/${PHONE}?text=${message}`}>{t.whatsapp}</a><small>{t.free}</small>
    </div></section>

    <section className="reviews"><div className="section"><p className="label">{t.reviewLabel}</p><h2>{t.reviewTitle}</h2><p className="muted">{t.reviewLead}</p><div className="reviewGrid">{reviews[language].map(r=><article key={r[0]}><div className="stars">★★★★★</div><blockquote>“{r[1]}”</blockquote><footer><strong>{r[0]}</strong><a href={`/tour/hoi-an-coconut-forest/reviews/${r[2]}`}>{t.open}</a></footer></article>)}</div></div></section>

    <section className="section faq"><p className="label">{t.faq}</p><h2>{t.faqTitle}</h2>{t.faqs.map(x=><details key={x[0]}><summary>{x[0]}<span>+</span></summary><p>{x[1]}</p></details>)}</section>
    <section className="final"><p>GoVietStay · Da Nang · Hoi An</p><h2>{t.finalTitle}</h2><p>{t.finalText}</p><a href="#booking">{t.nav}</a></section>
  </main>;
}
