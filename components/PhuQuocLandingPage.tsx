"use client";

import { useMemo, useState } from "react";
import "./PhuQuocLandingPage.css";

type Language = "en" | "ru";
type Tour = {
  id: string;
  title: string;
  category: string;
  duration: string;
  images: string[];
  adult: string;
  child: string;
  description: string;
  itinerary: string[];
  included: string[];
  excluded: string[];
  notes: string[];
};
type BookingForm = {
  name: string;
  whatsapp: string;
  date: string;
  adults: string;
  children: string;
  hotel: string;
  pickup: string;
  request: string;
};

const PHONE = "84937762607";
const emptyBooking: BookingForm = {
  name: "",
  whatsapp: "",
  date: "",
  adults: "1",
  children: "",
  hotel: "",
  pickup: "",
  request: "",
};

function TourImage({ sources, alt }: { sources: string[]; alt: string }) {
  const [sourceIndex, setSourceIndex] = useState(0);

  return (
    <img
      src={sources[sourceIndex]}
      alt={alt}
      onError={() => {
        if (sourceIndex < sources.length - 1) setSourceIndex(sourceIndex + 1);
      }}
    />
  );
}

const content = {
  en: {
    navTours: "All tours",
    navCheck: "Check availability",
    eyebrow: "Ten ways to discover Vietnam’s Pearl Island",
    title: "Choose your",
    titleAccent: "Phu Quoc day.",
    lead: "Compare 10 original GoVietStay Phu Quoc experiences—from easy sightseeing and sunset cruises to island hopping, sailing, luxury yacht and northern adventures.",
    chips: ["Clear reference prices", "Local WhatsApp support", "EN & RU assistance"],
    collectionLabel: "GoVietStay Phu Quoc collection",
    collectionTitle: "One island. Ten different travel styles.",
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
    book: "Book Now",
    highSeasonTitle: "Phu Quoc high season: December 2026 – March 2027",
    highSeasonText: "Tour seats, boats, cable-car packages and private guides can sell out during this period. Please submit your booking request early so GoVietStay can secure your preferred date and reconfirm availability before payment.",
    highSeasonButton: "Choose a tour & book early",
    formEyebrow: "Advance booking request",
    formTitle: "Book your Phu Quoc tour",
    formText: "Complete this short form. WhatsApp will open with your selected tour and booking details ready to send to GoVietStay.",
    fields: {
      name: "Full name *",
      whatsapp: "WhatsApp / Phone *",
      date: "Tour date *",
      adults: "Adults *",
      children: "Children and ages",
      hotel: "Hotel name",
      pickup: "Pickup location",
      request: "Special request",
    },
    placeholders: {
      name: "Your full name",
      whatsapp: "+84 / +7 / +82 ...",
      date: "",
      adults: "",
      children: "Example: 1 child, 8 years old",
      hotel: "Your hotel in Phu Quoc",
      pickup: "Hotel, address or airport",
      request: "Preferred language, dietary needs, mobility support...",
    },
    send: "Send Booking Request",
    formClose: "Close",
    required: "Please enter your name, WhatsApp number and tour date.",
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
    eyebrow: "Десять способов открыть Жемчужный остров Вьетнама",
    title: "Выберите свой",
    titleAccent: "день на Фукуоке.",
    lead: "Сравните 10 оригинальных программ GoVietStay на Фукуоке: обзорные экскурсии, закатные круизы, острова, парусную лодку, яхту и приключения на севере.",
    chips: ["Понятные ориентировочные цены", "Поддержка в WhatsApp", "Поддержка EN & RU"],
    collectionLabel: "Коллекция GoVietStay на Фукуоке",
    collectionTitle: "Один остров. Десять форматов отдыха.",
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
    book: "Забронировать",
    highSeasonTitle: "Высокий сезон на Фукуоке: декабрь 2026 — март 2027",
    highSeasonText: "В этот период места на экскурсии, катера, пакеты с канатной дорогой и частные гиды могут быть полностью забронированы. Отправьте заявку заранее, чтобы GoVietStay проверил и подтвердил выбранную дату до оплаты.",
    highSeasonButton: "Выбрать экскурсию и забронировать",
    formEyebrow: "Заявка на раннее бронирование",
    formTitle: "Забронировать экскурсию на Фукуоке",
    formText: "Заполните короткую форму. WhatsApp откроется с выбранной экскурсией и всеми данными, готовыми к отправке в GoVietStay.",
    fields: {
      name: "Имя и фамилия *",
      whatsapp: "WhatsApp / телефон *",
      date: "Дата экскурсии *",
      adults: "Взрослые *",
      children: "Дети и возраст",
      hotel: "Название отеля",
      pickup: "Место встречи",
      request: "Особые пожелания",
    },
    placeholders: {
      name: "Ваше имя и фамилия",
      whatsapp: "+7 / +84 / +82 ...",
      date: "",
      adults: "",
      children: "Например: 1 ребёнок, 8 лет",
      hotel: "Ваш отель на Фукуоке",
      pickup: "Отель, адрес или аэропорт",
      request: "Язык гида, питание, помощь с передвижением...",
    },
    send: "Отправить заявку",
    formClose: "Закрыть",
    required: "Укажите имя, номер WhatsApp и дату экскурсии.",
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
      images: ["/tour/phuquoc/tour-01-1.jpg", "/tour/phuquoc/tour-01-2.jpg", "/tour/phuquoc/phuquoc-01.png"],
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
      images: ["/tour/phuquoc/tour-02-1.jpg", "/tour/phuquoc/tour-02-2.jpg", "/tour/phuquoc/phuquoc-02.png"],
      adult: "1,300,000 VND",
      child: "910,000 VND",
      description: "Fish near Hon Bang Island, snorkel at a northern coral reef and enjoy a slower-paced wooden-boat journey with a local meal.",
      itinerary: ["Hotel pickup; the afternoon option starts at 12:30.", "Safety briefing and life-jacket fitting at Sunset Story.", "Fishing near Hon Bang Island.", "Snorkeling at a northern Phu Quoc coral reef.", "Freshwater shower and local meal.", "Transfer back to the hotel."],
      included: ["Shuttle bus", "Lunch or dinner", "One bottle of water", "Wooden boat", "Fishing and snorkeling equipment", "Travel insurance"],
      excluded: ["Tour guide in the base package", "Underwater photos unless requested", "Personal expenses", "Additional drinks"],
      notes: ["Reference price: 50 USD/adult and 35 USD/child.", "The base package has no tour guide. A private Russian- or Mongolian-speaking guide is available at extra cost.", "Child participation and the snorkeling location depend on age, health and sea conditions."],
    },
    {
      id: "north-sunset-chill",
      title: "North Phu Quoc Sunset Chill by Wooden Boat",
      category: "Sunset · Wooden boat · Fishing · DJ music",
      duration: "16:00–18:30",
      images: ["/tour/phuquoc/tour-03-1.jpg", "/tour/phuquoc/phuquoc-03.png"],
      adult: "650,000 VND",
      child: "390,000 VND",
      description: "Cruise along Bai Dai Beach at sunset, try fishing and enjoy a cold beer, tropical fruits and music on board.",
      itinerary: ["16:00: Hotel pickup and transfer to the beach.", "16:30: Board the wooden boat.", "Cruise along Bai Dai Beach and try fishing.", "Enjoy one cold beer, tropical fruits and music.", "18:30: Return and transfer to the hotel."],
      included: ["Shuttle bus", "One beer and fruits", "One bottle of water", "Boat tour", "Fishing equipment", "Travel insurance"],
      excluded: ["Private guide unless added", "Dinner", "Personal expenses", "Additional drinks"],
      notes: ["Reference price: 25 USD/adult and 15 USD/child.", "Private guide service is available at extra cost.", "Sunset visibility depends on weather."],
    },
    {
      id: "sunset-squid-fishing",
      title: "Phu Quoc Sunset Cruise & Night Squid Fishing",
      category: "Sunset · Squid fishing · Dinner on board",
      duration: "16:00–21:00",
      images: ["/tour/phuquoc/tour-04-1.jpg", "/tour/phuquoc/phuquoc-04.png"],
      adult: "1,040,000 VND",
      child: "650,000 VND",
      description: "Watch the sunset at sea, try night squid fishing and enjoy dinner on board during a classic Phu Quoc evening cruise.",
      itinerary: ["16:00: Hotel pickup.", "17:00: Board the tourist boat.", "Enjoy sunset views at sea.", "Try squid fishing; freshly caught squid may be cooked on request.", "Enjoy dinner on board.", "21:00: Return to the hotel."],
      included: ["Shuttle bus", "Tourist boat", "Tour guide", "Dinner", "One bottle of water", "Life jacket and fishing gear", "Travel insurance"],
      excluded: ["Personal expenses", "Additional drinks", "Private language-guide surcharge when applicable"],
      notes: ["Reference price: 40 USD/adult and 25 USD/child.", "Squid catch is not guaranteed.", "Timing may change with sea conditions."],
    },
    {
      id: "three-islands",
      title: "Phu Quoc 3 Islands Speedboat & Snorkeling",
      category: "Best value · Speedboat · Snorkeling · Island hopping",
      duration: "07:00–16:00",
      images: ["/tour/phuquoc/tour-05-1.jpg", "/tour/phuquoc/phuquoc-05.png"],
      adult: "1,040,000 VND",
      child: "Confirm before booking",
      description: "Explore the southern islands by premium speedboat with snorkeling, swimming, flycam photos and lunch.",
      itinerary: ["07:00–07:30: Hotel pickup and meeting at the Pearl Farm.", "09:30: Begin the southern-island speedboat route.", "Optional Sea Walking at your own expense.", "Swimming, flycam photos and lunch at Mong Tay Island.", "Snorkeling at Gam Ghi or Buom Island.", "Swimming at May Rut Island.", "16:00: Return to the hotel."],
      included: ["Shuttle bus", "Premium speedboat", "Tour guide", "Lunch", "Flycam photography", "Water", "Travel insurance"],
      excluded: ["Sea Walking", "Personal expenses", "Additional drinks", "Other water sports"],
      notes: ["Reference price: 40 USD/guest.", "Share each child’s age and height for current pricing.", "Island order may change with weather and sea conditions."],
    },
    {
      id: "four-islands",
      title: "4 Islands, Hon Thom Cable Car & Aquatopia",
      category: "Most popular · Islands · Cable car · Water park",
      duration: "07:00–17:30",
      images: ["/tour/phuquoc/tour-05-1.jpg", "/tour/phuquoc/tour-06-1.jpg", "/tour/phuquoc/phuquoc-06.png", "/tour/phuquoc/phuquoc-05.png"],
      adult: "1,690,000 VND",
      child: "Confirm before booking",
      description: "The complete first-time Phu Quoc day: southern islands, snorkeling, Hon Thom Cable Car, lunch, Aquatopia Water Park and Kiss Bridge.",
      itinerary: ["07:00–07:30: Hotel pickup and meeting at the Pearl Farm.", "09:30: Begin the southern-island speedboat route.", "Optional Sea Walking at your own expense.", "Swimming, flycam photos and lunch at Mong Tay Island.", "Snorkeling at Gam Ghi or Buom Island and swimming at May Rut Island.", "Ride the Hon Thom sea-crossing cable car.", "Enjoy lunch and Aquatopia Water Park.", "16:30: Visit Kiss Bridge.", "17:30: Return to the hotel."],
      included: ["Shuttle bus", "Premium speedboat", "Hon Thom Cable Car ticket", "Tour guide", "Lunch", "Flycam photography", "Water", "Travel insurance"],
      excluded: ["Sea Walking", "Personal expenses", "Additional drinks", "Optional water sports"],
      notes: ["Reference price: 65 USD/guest.", "Share every child’s age and height for current operator pricing.", "The island order and activities may change according to sea, weather and operator conditions."],
    },
    {
      id: "hon-thom-kiss",
      title: "Hon Thom Cable Car, Kiss Bridge & Kiss of the Sea",
      category: "Romantic sunset · Cable car · Water park · Evening show",
      duration: "12:00–21:30",
      images: ["/tour/phuquoc/tour-07-1.jpg", "/tour/phuquoc/phuquoc-07.png"],
      adult: "2,470,000 VND",
      child: "2,080,000 VND",
      description: "Enjoy Hon Thom Cable Car and Water Park, sunset at Kiss Bridge, Vuifest Night Market and the Kiss of the Sea show.",
      itinerary: ["12:00: Pickup.", "12:30: Pearl Farm.", "13:30–14:00: Hon Thom Cable Car.", "14:00–17:00: Water park, pools and beach.", "17:30–19:30: Kiss Bridge and sunset.", "19:30–21:00: Free time and self-funded dinner at Vuifest Night Market.", "21:00–21:30: Kiss of the Sea and return."],
      included: ["Shuttle bus", "Cable car ticket", "Kiss Bridge ticket", "Kiss of the Sea ticket", "Water", "Travel insurance"],
      excluded: ["Dinner", "Personal expenses", "Additional drinks", "Optional water-park services"],
      notes: ["Reference price: 95 USD/adult and 80 USD/child.", "Dinner at Vuifest Night Market is self-funded.", "Show operation may depend on schedule and weather."],
    },
    {
      id: "private-sailing",
      title: "Private North Phu Quoc Sailing & Snorkeling",
      category: "Private experience · Sailing · Turtle Island · West coast",
      duration: "Morning sailing journey",
      images: ["/tour/phuquoc/tour-08-1.jpg", "/tour/phuquoc/phuquoc-08.png"],
      adult: "3,250,000 VND",
      child: "Confirm before booking",
      description: "Sail the west coast from Ganh Dau to Cua Can, visit floating fish farms and snorkel around Turtle Island.",
      itinerary: ["Sail from Ganh Dau toward Cua Can along about 15 km of coastline.", "Visit floating fish farms.", "Snorkel for approximately one hour at Turtle Island.", "Swim at a small rock islet.", "Pass Vung Bau Beach.", "Arrive at Cua Can Beach around 13:00."],
      included: ["Sailing", "Snorkeling gear", "English/French-speaking guide", "Coconut juice", "Fruit", "Water", "Cold cuts and bread", "Transportation"],
      excluded: ["Personal expenses", "Additional drinks", "Russian or Mongolian guide unless arranged"],
      notes: ["Reference price: 125 USD/guest.", "No separate child price was provided in the source file.", "Timing depends on wind and sea conditions."],
    },
    {
      id: "nemo-yacht",
      title: "Nemo Luxury Yacht — Sunrise or Sunset Voyage",
      category: "Premium choice · Luxury yacht · BBQ · Water activities",
      duration: "08:00–14:15 / 14:00–20:30",
      images: ["/tour/phuquoc/tour-09-1.jpg", "/tour/phuquoc/phuquoc-09.png"],
      adult: "2,340,000 VND",
      child: "Confirm before booking",
      description: "Enjoy a luxury yacht with snorkeling, SUP, water slide and BBQ, choosing either a daytime island voyage or sunset experience.",
      itinerary: ["Day option: 08:00 pickup, 09:00 departure, Hon Gam Ghi activities, Hon May Rut Trong and BBQ lunch, return around 14:15.", "Sunset option: 14:00 pickup, 15:00 departure, Hon Dam activities, Kiss Bridge sunset and BBQ dinner.", "Watch the fireworks show when operating.", "Return to the marina and hotel."],
      included: ["Shuttle bus", "Luxury yacht", "Tour guide", "BBQ lunch or dinner according to option", "Water", "Travel insurance"],
      excluded: ["Personal expenses", "Additional drinks", "Services not listed", "Fireworks when not operating"],
      notes: ["Reference price: 90 USD/guest.", "No separate child price was provided in the source file.", "Final route and fireworks schedule are reconfirmed."],
    },
    {
      id: "kayak-rach-vem",
      title: "Kayaking, Rach Vem, Ham Rong Beach & Grand World",
      category: "North island · Kayaking · Beach · Grand World",
      duration: "08:30–16:00",
      images: ["/tour/phuquoc/tour-10-1.jpg", "/tour/phuquoc/phuquoc-10.png"],
      adult: "1,092,000 VND",
      child: "702,000 VND",
      description: "Kayak on Cua Can River, visit Rach Vem, swim at Ham Rong Beach and finish with free time at Grand World.",
      itinerary: ["08:30: Hotel pickup.", "Kayak on Cua Can River.", "Visit a honey farm and Silk Factory.", "Visit Rach Vem Village for lunch and relaxation.", "Take a speedboat to Ham Rong Beach.", "Visit Grand World; paid tickets are self-funded.", "16:00: Return."],
      included: ["Shuttle bus", "Kayak", "Speedboat to Ham Rong", "Lunch when selected", "Mineral water", "Energy drink", "Travel insurance"],
      excluded: ["Grand World attraction tickets", "Lunch on the no-lunch package", "Personal expenses", "Surcharge for groups under 4"],
      notes: ["With lunch: 42 USD/adult and 27 USD/child; without lunch: 31 USD/adult and 16 USD/child.", "Base price applies to groups of 4.", "Fewer than 4 guests: 10 USD/person surcharge."],
    },
  ],
  ru: [
    {
      id: "island-discovery",
      title: "Обзорная экскурсия по острову Фукуок",
      category: "Достопримечательности · Культура · Спокойный день",
      duration: "08:30–15:00",
      images: ["/tour/phuquoc/tour-01-1.jpg", "/tour/phuquoc/tour-01-2.jpg", "/tour/phuquoc/phuquoc-01.png"],
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
      images: ["/tour/phuquoc/tour-02-1.jpg", "/tour/phuquoc/tour-02-2.jpg", "/tour/phuquoc/phuquoc-02.png"],
      adult: "1 300 000 VND",
      child: "910 000 VND",
      description: "Рыбалка у острова Хон Банг, снорклинг у северного рифа и неспешное путешествие на деревянной лодке с местным обедом.",
      itinerary: ["Встреча в отеле; дневной вариант начинается в 12:30.", "Инструктаж и подбор спасательного жилета в Sunset Story.", "Рыбалка возле острова Хон Банг.", "Снорклинг у северного кораллового рифа.", "Пресный душ и местная еда.", "Возвращение в отель."],
      included: ["Трансфер", "Обед или ужин", "Одна бутылка воды", "Деревянная лодка", "Снаряжение для рыбалки и снорклинга", "Туристическая страховка"],
      excluded: ["Экскурсовод в базовом пакете", "Подводные фотографии без предварительного запроса", "Личные расходы", "Дополнительные напитки"],
      notes: ["Ориентировочная цена: 50 USD/взрослый и 35 USD/ребёнок.", "В базовый пакет гид не включён. Частный русскоговорящий или монголоязычный гид доступен за дополнительную плату.", "Участие детей и место снорклинга зависят от возраста, здоровья и состояния моря."],
    },
    {
      id: "north-sunset-chill",
      title: "Закат на севере Фукуока на деревянной лодке",
      category: "Закат · Деревянная лодка · Рыбалка · DJ",
      duration: "16:00–18:30",
      images: ["/tour/phuquoc/tour-03-1.jpg", "/tour/phuquoc/phuquoc-03.png"],
      adult: "650 000 VND",
      child: "390 000 VND",
      description: "Закат у пляжа Бай Дай, рыбалка, холодное пиво, тропические фрукты и музыка на борту.",
      itinerary: ["16:00: Встреча в отеле.", "16:30: Посадка на деревянную лодку.", "Прогулка вдоль Бай Дай и рыбалка.", "Пиво, тропические фрукты и музыка.", "18:30: Возвращение в отель."],
      included: ["Трансфер", "Одно пиво и фрукты", "Вода", "Лодка", "Снасти", "Страховка"],
      excluded: ["Частный гид без доплаты", "Ужин", "Личные расходы", "Дополнительные напитки"],
      notes: ["Ориентировочная цена: 25 USD/взрослый и 15 USD/ребёнок.", "Частный гид предоставляется за доплату.", "Видимость заката зависит от погоды."],
    },
    {
      id: "sunset-squid-fishing",
      title: "Закатный круиз и ночная ловля кальмаров",
      category: "Закат · Ловля кальмаров · Ужин на борту",
      duration: "16:00–21:00",
      images: ["/tour/phuquoc/tour-04-1.jpg", "/tour/phuquoc/phuquoc-04.png"],
      adult: "1 040 000 VND",
      child: "650 000 VND",
      description: "Закат в море, ночная ловля кальмаров и ужин на борту во время классического вечернего круиза.",
      itinerary: ["16:00: Встреча в отеле.", "17:00: Посадка на судно.", "Закат в море.", "Ловля кальмаров; улов могут приготовить по просьбе.", "Ужин на борту.", "21:00: Возвращение."],
      included: ["Трансфер", "Туристическое судно", "Гид", "Ужин", "Вода", "Спасательный жилет и снасти", "Страховка"],
      excluded: ["Личные расходы", "Дополнительные напитки", "Доплата за частного языкового гида"],
      notes: ["Ориентировочная цена: 40 USD/взрослый и 25 USD/ребёнок.", "Улов кальмаров не гарантируется.", "Время зависит от состояния моря."],
    },
    {
      id: "three-islands",
      title: "3 острова Фукуока: катер и снорклинг",
      category: "Выгодный выбор · Катер · Снорклинг · Острова",
      duration: "07:00–16:00",
      images: ["/tour/phuquoc/tour-05-1.jpg", "/tour/phuquoc/phuquoc-05.png"],
      adult: "1 040 000 VND",
      child: "Уточняется до бронирования",
      description: "Южные острова на скоростном катере: снорклинг, купание, съёмка с дрона и обед.",
      itinerary: ["07:00–07:30: Встреча в отеле и сбор у жемчужной фермы.", "09:30: Начало маршрута.", "Sea Walking по желанию и за доплату.", "Купание, дрон и обед на Монг Тай.", "Снорклинг у Гам Ги или Буом.", "Купание у Май Рут.", "16:00: Возвращение."],
      included: ["Трансфер", "Скоростной катер", "Гид", "Обед", "Съёмка с дрона", "Вода", "Страховка"],
      excluded: ["Sea Walking", "Личные расходы", "Дополнительные напитки", "Другие водные развлечения"],
      notes: ["Ориентировочная цена: 40 USD/гость.", "Для детского тарифа сообщите возраст и рост.", "Порядок островов зависит от погоды и моря."],
    },
    {
      id: "four-islands",
      title: "4 острова, канатная дорога Хон Тхом и Aquatopia",
      category: "Хит · Острова · Канатная дорога · Аквапарк",
      duration: "07:00–17:30",
      images: ["/tour/phuquoc/tour-05-1.jpg", "/tour/phuquoc/tour-06-1.jpg", "/tour/phuquoc/phuquoc-06.png", "/tour/phuquoc/phuquoc-05.png"],
      adult: "1 690 000 VND",
      child: "Уточняется до бронирования",
      description: "Полный день для первого знакомства с Фукуоком: южные острова, снорклинг, канатная дорога Хон Тхом, обед, Aquatopia и Мост Поцелуев.",
      itinerary: ["07:00–07:30: Встреча в отеле и сбор у жемчужной фермы.", "09:30: Начало маршрута по южным островам на скоростном катере.", "Sea Walking по желанию и за дополнительную плату.", "Купание, съёмка с дрона и обед на острове Монг Тай.", "Снорклинг у Гам Ги или Буом и купание у Май Рут.", "Поездка по морской канатной дороге Хон Тхом.", "Обед и аквапарк Aquatopia.", "16:30: Мост Поцелуев.", "17:30: Возвращение в отель."],
      included: ["Трансфер", "Скоростной катер", "Билет на канатную дорогу Хон Тхом", "Экскурсовод", "Обед", "Съёмка с дрона", "Вода", "Туристическая страховка"],
      excluded: ["Sea Walking", "Личные расходы", "Дополнительные напитки", "Дополнительные водные развлечения"],
      notes: ["Ориентировочная цена: 65 USD/гость.", "Для расчёта детского тарифа сообщите возраст и рост каждого ребёнка.", "Порядок островов и активности могут меняться из-за моря, погоды и условий оператора."],
    },
    {
      id: "hon-thom-kiss",
      title: "Хон Тхом, Мост Поцелуев и шоу Kiss of the Sea",
      category: "Романтический закат · Канатная дорога · Аквапарк · Шоу",
      duration: "12:00–21:30",
      images: ["/tour/phuquoc/tour-07-1.jpg", "/tour/phuquoc/phuquoc-07.png"],
      adult: "2 470 000 VND",
      child: "2 080 000 VND",
      description: "Канатная дорога и аквапарк Хон Тхом, закат у Моста Поцелуев, Vuifest и шоу Kiss of the Sea.",
      itinerary: ["12:00: Встреча.", "12:30: Жемчужная ферма.", "13:30–14:00: Канатная дорога.", "14:00–17:00: Аквапарк, бассейны и пляж.", "17:30–19:30: Мост Поцелуев и закат.", "19:30–21:00: Свободное время и ужин за свой счёт.", "21:00–21:30: Шоу и возвращение."],
      included: ["Трансфер", "Канатная дорога", "Мост Поцелуев", "Kiss of the Sea", "Вода", "Страховка"],
      excluded: ["Ужин", "Личные расходы", "Дополнительные напитки", "Дополнительные услуги аквапарка"],
      notes: ["Ориентировочная цена: 95 USD/взрослый и 80 USD/ребёнок.", "Ужин на Vuifest оплачивается отдельно.", "Проведение шоу зависит от расписания и погоды."],
    },
    {
      id: "private-sailing",
      title: "Частный парусный тур и снорклинг на севере",
      category: "Частный тур · Парусная лодка · Черепаший остров · Запад",
      duration: "Утренняя прогулка",
      images: ["/tour/phuquoc/tour-08-1.jpg", "/tour/phuquoc/phuquoc-08.png"],
      adult: "3 250 000 VND",
      child: "Уточняется до бронирования",
      description: "Парусный маршрут от Гань Дау до Куа Кан, плавучие рыбные фермы и снорклинг у Черепашьего острова.",
      itinerary: ["Переход от Гань Дау к Куа Кан вдоль примерно 15 км побережья.", "Плавучие рыбные фермы.", "Около часа снорклинга у Черепашьего острова.", "Купание у небольшого скального островка.", "Пляж Вунг Бау.", "Прибытие в Куа Кан около 13:00."],
      included: ["Парусная прогулка", "Снаряжение", "Англо-/франкоговорящий гид", "Кокос", "Фрукты", "Вода", "Закуски и хлеб", "Транспорт"],
      excluded: ["Личные расходы", "Дополнительные напитки", "Русско- или монголоязычный гид без предварительного заказа"],
      notes: ["Ориентировочная цена: 125 USD/гость.", "Отдельная детская цена в исходном файле не указана.", "Время зависит от ветра и моря."],
    },
    {
      id: "nemo-yacht",
      title: "Роскошная яхта Nemo — дневной или закатный рейс",
      category: "Премиум · Яхта · BBQ · Водные развлечения",
      duration: "08:00–14:15 / 14:00–20:30",
      images: ["/tour/phuquoc/tour-09-1.jpg", "/tour/phuquoc/phuquoc-09.png"],
      adult: "2 340 000 VND",
      child: "Уточняется до бронирования",
      description: "Яхта со снорклингом, SUP, водной горкой и BBQ: дневной или закатный вариант.",
      itinerary: ["Дневной вариант: 08:00 трансфер, 09:00 выход, активности у Хон Гам Ги, Хон Май Рут Чонг и BBQ, возвращение около 14:15.", "Закатный вариант: 14:00 трансфер, 15:00 выход, Хон Дам, закат у Моста Поцелуев и BBQ.", "Фейерверк — если проводится.", "Возвращение в марину и отель."],
      included: ["Трансфер", "Яхта", "Гид", "BBQ-обед или ужин", "Вода", "Страховка"],
      excluded: ["Личные расходы", "Дополнительные напитки", "Неуказанные услуги", "Фейерверк, если не проводится"],
      notes: ["Ориентировочная цена: 90 USD/гость.", "Отдельная детская цена в исходном файле не указана.", "Маршрут и фейерверк подтверждаются на дату поездки."],
    },
    {
      id: "kayak-rach-vem",
      title: "Каякинг, Рать Вем, пляж Хам Ронг и Grand World",
      category: "Север острова · Каякинг · Пляж · Grand World",
      duration: "08:30–16:00",
      images: ["/tour/phuquoc/tour-10-1.jpg", "/tour/phuquoc/phuquoc-10.png"],
      adult: "1 092 000 VND",
      child: "702 000 VND",
      description: "Каякинг по реке Куа Кан, Рать Вем, купание на Хам Ронг и свободное время в Grand World.",
      itinerary: ["08:30: Встреча в отеле.", "Каякинг по реке Куа Кан.", "Медовая ферма и шёлковая фабрика.", "Рать Вем: обед и отдых.", "Катер до пляжа Хам Ронг.", "Grand World; платные билеты за свой счёт.", "16:00: Возвращение."],
      included: ["Трансфер", "Каяк", "Катер до Хам Ронг", "Обед в выбранном пакете", "Вода", "Энергетик", "Страховка"],
      excluded: ["Билеты Grand World", "Обед в пакете без обеда", "Личные расходы", "Доплата при группе менее 4"],
      notes: ["С обедом: 42 USD/взрослый и 27 USD/ребёнок; без обеда: 31 USD/взрослый и 16 USD/ребёнок.", "Базовая цена действует для группы от 4 человек.", "При группе менее 4 — доплата 10 USD/человек."],
    },
  ],
};

export default function PhuQuocLandingPage({ language }: { language: Language }) {
  const t = content[language];
  const items = tours[language];
  const [openTour, setOpenTour] = useState(items[0].id);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [booking, setBooking] = useState<BookingForm>(emptyBooking);
  const message = useMemo(() => encodeURIComponent(t.hello), [t.hello]);
  const whatsapp = `https://wa.me/${PHONE}?text=${message}`;
  const allTours = language === "ru" ? "/ru" : "/";
  const otherLanguage = language === "ru" ? "/tours/phu-quoc" : "/ru/tours/phu-quoc";
  const openBooking = (tour: Tour) => {
    setBookingTour(tour);
    setBooking(emptyBooking);
  };
  const sendBooking = () => {
    if (!bookingTour) return;
    if (!booking.name.trim() || !booking.whatsapp.trim() || !booking.date) {
      window.alert(t.required);
      return;
    }
    const message = language === "ru"
      ? `ЗАЯВКА НА БРОНИРОВАНИЕ — ФУКУОК\n\nЭкскурсия: ${bookingTour.title}\nДата: ${booking.date}\nВзрослые: ${booking.adults || "0"}\nДети: ${booking.children || "Нет"}\nИмя: ${booking.name}\nWhatsApp / телефон: ${booking.whatsapp}\nОтель: ${booking.hotel || "Не указан"}\nМесто встречи: ${booking.pickup || "Не указано"}\nПожелания: ${booking.request || "Нет"}\n\nПожалуйста, подтвердите наличие мест и актуальную стоимость.`
      : `PHU QUOC BOOKING REQUEST\n\nTour: ${bookingTour.title}\nTour date: ${booking.date}\nAdults: ${booking.adults || "0"}\nChildren: ${booking.children || "None"}\nGuest name: ${booking.name}\nWhatsApp / Phone: ${booking.whatsapp}\nHotel: ${booking.hotel || "Not provided"}\nPickup location: ${booking.pickup || "Not provided"}\nSpecial request: ${booking.request || "None"}\n\nPlease confirm availability and the latest price.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

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
            <figure className="pqImageMain"><TourImage sources={items[5].images} alt={items[5].title}/><figcaption>4 Islands · Hon Thom</figcaption></figure>
            <figure><TourImage sources={items[0].images} alt={items[0].title}/></figure>
            <figure><TourImage sources={items[8].images} alt={items[8].title}/></figure>
          </div>
        </div>
      </section>

      <section className="pqSection pqIntro" id="tours">
        <div><p className="pqLabel">{t.collectionLabel}</p><h2>{t.collectionTitle}</h2></div>
        <p>{t.collectionText}</p>
      </section>

      <section className="pqHighSeason">
        <div>
          <p className="pqLabel">{language === "ru" ? "Бронируйте заранее" : "Advance booking recommended"}</p>
          <h2>{t.highSeasonTitle}</h2>
          <p>{t.highSeasonText}</p>
        </div>
        <a href="#tour-list">{t.highSeasonButton}</a>
      </section>

      <section className="pqTourList" id="tour-list">
        {items.map((tour, index) => {
          const open = openTour === tour.id;
          const tourMessage = encodeURIComponent(`${t.hello}\n\n${tour.title}`);
          return <article className={`pqTour ${open ? "isOpen" : ""}`} id={tour.id} key={tour.id}>
            <div className="pqTourTop">
              <TourImage sources={tour.images} alt={tour.title}/>
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
              <div className="pqTourActions">
                <button type="button" className="pqBookNow" onClick={()=>openBooking(tour)}>{t.book}</button>
                <a className="pqTourAsk" href={`https://wa.me/${PHONE}?text=${tourMessage}`} target="_blank" rel="noreferrer">{t.ask} →</a>
              </div>
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

      {bookingTour && <div className="pqBookingOverlay" role="dialog" aria-modal="true" aria-labelledby="pq-booking-title" onClick={()=>setBookingTour(null)}>
        <div className="pqBookingModal" onClick={(event)=>event.stopPropagation()}>
          <button type="button" className="pqBookingX" onClick={()=>setBookingTour(null)} aria-label={t.formClose}>×</button>
          <p className="pqLabel">{t.formEyebrow}</p>
          <h2 id="pq-booking-title">{t.formTitle}</h2>
          <p>{t.formText}</p>
          <div className="pqSelectedTour"><span>{language === "ru" ? "Выбрано" : "Selected tour"}</span><strong>{bookingTour.title}</strong></div>
          <div className="pqBookingGrid">
            {(["name", "whatsapp", "date", "adults", "children", "hotel", "pickup"] as const).map((field)=><label key={field}>
              <span>{t.fields[field]}</span>
              <input
                type={field === "date" ? "date" : field === "adults" ? "number" : "text"}
                min={field === "adults" ? "1" : undefined}
                value={booking[field]}
                placeholder={field === "date" || field === "adults" ? undefined : t.placeholders[field]}
                onChange={(event)=>setBooking(current=>({...current, [field]: event.target.value}))}
              />
            </label>)}
            <label className="pqFullField"><span>{t.fields.request}</span><textarea rows={4} value={booking.request} placeholder={t.placeholders.request} onChange={(event)=>setBooking(current=>({...current, request: event.target.value}))}/></label>
          </div>
          <div className="pqBookingButtons">
            <button type="button" className="pqBookNow" onClick={sendBooking}>{t.send}</button>
            <button type="button" className="pqCancelBooking" onClick={()=>setBookingTour(null)}>{t.formClose}</button>
          </div>
        </div>
      </div>}
    </main>
  );
}
