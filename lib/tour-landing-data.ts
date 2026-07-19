export type Locale = "en" | "ru";

export type TourLanding = {
  slug: string;
  image: string;
  title: string;
  eyebrow: string;
  promise: string;
  duration: string;
  location: string;
  adultPrice: number;
  childPrice: number;
  priceNote: string;
  highlights: string[];
  itinerary: string[];
  included: string[];
  excluded: string[];
  policies: string[];
  whyBook?: string[];
  faqs?: { question: string; answer: string }[];
  packing?: string[];
};

const en: Record<string, TourLanding> = {
  "ba-na-hills": {
    slug: "ba-na-hills",
    image: "/tour/bana.jpg",
    title: "Ba Na Hills & Golden Bridge Tour",
    eyebrow: "Da Nang's iconic mountain experience",
    promise: "Golden Bridge, cable car, French Village and buffet—with clear local support from booking to hotel drop-off.",
    duration: "08:00–17:00 or 11:30–19:00",
    location: "Pickup in Da Nang",
    adultPrice: 1550000,
    childPrice: 1450000,
    priceNote: "From price. Final price depends on morning/afternoon option, meal package, travel date and current Sun World policy. We confirm the exact total before payment.",
    highlights: ["Golden Bridge photo time", "Round-trip cable car", "French Village", "Le Jardin D’Amour & Linh Ung Pagoda", "Fantasy Park free time", "Buffet meal according to package"],
    itinerary: ["Hotel pickup in Da Nang", "Cable car and panoramic mountain views", "Golden Bridge, gardens and pagoda", "Buffet meal according to selected option", "French Village and Fantasy Park", "Cable car down and hotel drop-off"],
    included: ["Hotel transfer", "English-speaking guide", "Round-trip cable car", "Golden Bridge admission", "Meal according to package", "Bottled water"],
    excluded: ["Wax Museum and Wine Cellar", "Prize games and selected paid activities", "Personal expenses"],
    policies: ["Children under 1m are normally free; current operator rules apply.", "Share every child's height before booking.", "Mountain weather can change quickly; bring a light jacket.", "Cancellation and refund terms are confirmed in writing before payment."],
  },
  "cham-island": {
    slug: "cham-island",
    image: "/tour/cham.jpg",
    title: "Cham Island Speedboat & Snorkeling Tour",
    eyebrow: "Sea, coral and island life near Hoi An",
    promise: "A smooth island day with speedboat, sightseeing, snorkeling, seafood lunch and local WhatsApp support.",
    duration: "07:30–15:30",
    location: "Pickup in Da Nang or Hoi An",
    adultPrice: 950000,
    childPrice: 800000,
    priceNote: "Joined-tour reference price. Exact pickup area, child policy, availability and sea conditions are confirmed before payment.",
    highlights: ["Round-trip speedboat", "Bai Lang Village & Marine Museum", "Hai Tang Pagoda", "Snorkeling equipment", "Seafood lunch at Bai Ong", "Beach time to swim or relax"],
    itinerary: ["Hotel pickup and transfer to Cua Dai Pier", "Speedboat to Cham Island", "Bai Lang sightseeing and Hai Tang Pagoda", "Snorkeling at the coral area", "Seafood lunch and beach time", "Return to the mainland and hotel drop-off"],
    included: ["Hotel pickup and drop-off", "English-speaking guide", "Round-trip speedboat", "Entrance tickets", "Snorkeling equipment", "Seafood lunch and water"],
    excluded: ["Personal expenses", "Additional beverages", "Optional sea activities not listed"],
    policies: ["Tour operation depends on official weather and sea-safety approval.", "Share every child's age and height before booking.", "Pickup surcharge may apply outside the standard area.", "If weather prevents operation, rescheduling or refund handling follows the written booking confirmation."],
  },
};

const ru: Record<string, TourLanding> = {
  "ba-na-hills": {
    ...en["ba-na-hills"],
    title: "Экскурсия в Ba Na Hills и на Золотой мост",
    eyebrow: "Главная горная достопримечательность Дананга",
    promise: "Золотой мост, канатная дорога, Французская деревня и шведский стол — с местной поддержкой от бронирования до возвращения в отель.",
    duration: "08:00–17:00 или 11:30–19:00",
    location: "Трансфер из Дананга",
    priceNote: "Цена указана от. Итог зависит от времени экскурсии, питания, даты поездки и действующих правил Sun World. Точную сумму подтверждаем до оплаты.",
    highlights: ["Время для фото на Золотом мосту", "Канатная дорога туда и обратно", "Французская деревня", "Сады Le Jardin D’Amour и пагода Linh Ung", "Свободное время в Fantasy Park", "Шведский стол по выбранному пакету"],
    itinerary: ["Выезд из отеля в Дананге", "Подъём по канатной дороге", "Золотой мост, сады и пагода", "Питание по выбранному пакету", "Французская деревня и Fantasy Park", "Спуск и возвращение в отель"],
    included: ["Трансфер из отеля", "Англоязычный гид", "Канатная дорога", "Вход на Золотой мост", "Питание по пакету", "Питьевая вода"],
    excluded: ["Музей восковых фигур и винный погреб", "Платные игры и отдельные развлечения", "Личные расходы"],
    policies: ["Дети ростом до 1 м обычно бесплатно; применяются текущие правила оператора.", "До бронирования сообщите рост каждого ребёнка.", "В горах погода быстро меняется — возьмите лёгкую куртку.", "Условия отмены и возврата подтверждаются письменно до оплаты."],
  },
  "cham-island": {
    ...en["cham-island"],
    title: "Остров Чам: катер и снорклинг",
    eyebrow: "Море, кораллы и островная жизнь рядом с Хойаном",
    promise: "Комфортный день на острове: скоростной катер, достопримечательности, снорклинг, обед из морепродуктов и поддержка в WhatsApp.",
    duration: "07:30–15:30",
    location: "Трансфер из Дананга или Хойана",
    priceNote: "Ориентировочная цена групповой экскурсии. Район трансфера, детский тариф, наличие мест и состояние моря подтверждаются до оплаты.",
    highlights: ["Скоростной катер туда и обратно", "Деревня Bai Lang и Морской музей", "Пагода Hai Tang", "Снаряжение для снорклинга", "Обед из морепродуктов на Bai Ong", "Отдых и купание на пляже"],
    itinerary: ["Трансфер из отеля к причалу Cua Dai", "Катер до острова Чам", "Достопримечательности Bai Lang и пагода", "Снорклинг у кораллов", "Обед и отдых на пляже", "Возвращение на материк и в отель"],
    included: ["Трансфер из отеля и обратно", "Англоязычный гид", "Скоростной катер", "Входные билеты", "Снаряжение для снорклинга", "Обед и вода"],
    excluded: ["Личные расходы", "Дополнительные напитки", "Дополнительные морские развлечения"],
    policies: ["Проведение тура зависит от официального разрешения по погоде и безопасности на море.", "До бронирования сообщите возраст и рост каждого ребёнка.", "За трансфер вне стандартной зоны возможна доплата.", "При отмене из-за погоды перенос или возврат оформляется по письменному подтверждению бронирования."],
    whyBook: [
      "Поддержка на русском языке до и во время поездки",
      "Проверка погоды и состояния моря перед выездом",
      "Понятное подтверждение времени и места трансфера",
      "Точная стоимость подтверждается до оплаты",
      "Живая поддержка GoVietStay в WhatsApp, если планы изменятся",
      "Помощь с индивидуальными запросами, детьми и питанием",
    ],
    packing: [
      "Купальник, полотенце и сменная одежда",
      "Солнцезащитный крем и головной убор",
      "Небольшая водонепроницаемая сумка",
      "Личные лекарства и средство от укачивания при необходимости",
    ],
    faqs: [
      { question: "Можно участвовать, если я не умею плавать?", answer: "Да. Сообщите об этом заранее и следуйте инструкциям гида. Снорклинг не является обязательным — можно отдыхать на пляже." },
      { question: "Подходит ли экскурсия детям?", answer: "Да, но перед бронированием необходимо сообщить возраст и рост ребёнка. Возможность поездки также зависит от погоды и состояния моря." },
      { question: "Что будет, если море неспокойное?", answer: "Безопасность важнее расписания. Если официальный оператор отменит выход, GoVietStay предложит перенос или оформит решение по возврату согласно письменному подтверждению бронирования." },
      { question: "Где забирают гостей?", answer: "Стандартный трансфер доступен из определённых районов Дананга и Хойана. Отправьте название отеля — мы подтвердим точное время и возможную доплату до оплаты." },
      { question: "Есть ли русскоязычный гид?", answer: "На стандартной групповой экскурсии обычно работает англоязычный гид. Русскоязычное сопровождение предоставляется по запросу и подтверждается отдельно." },
      { question: "Можно заказать вегетарианское питание?", answer: "Сообщите о питании и аллергиях до подтверждения. Мы проверим доступный вариант меню у оператора." },
    ],
  },
};

export const tourSlugs = Object.keys(en);
export const getTour = (slug: string, locale: Locale) => (locale === "ru" ? ru : en)[slug];
