export const HOTRAM_BASE = "https://hotram.govietstay.com";
export const MAIN_SITE = "https://www.govietstay.com";
export const WHATSAPP_NUMBER = "84937762607";
export const LAST_REVIEWED = "2026-10-05";

export type HotramLocale = "en" | "ru" | "it";

export type HotramTour = {
  slug: string;
  name: string;
  shortName: string;
  promise: string;
  duration: string;
  bestFor: string[];
  highlights: string[];
  itinerary: string[];
  notes: string[];
  pickup: string[];
};

export const localeConfig: Record<HotramLocale, {
  html: string;
  path: string;
  label: string;
  indexable: boolean;
}> = {
  en: { html: "en", path: "", label: "English", indexable: true },
  ru: { html: "ru", path: "/ru", label: "Русский", indexable: false },
  it: { html: "it-IT", path: "/it", label: "Italiano", indexable: false },
};

export const ui = {
  en: {
    eyebrow: "HO TRAM · PRIVATE EXPERIENCES",
    h1: "Six private ways to discover Ho Tram — no tour-bus catalog.",
    intro:
      "GoVietStay is building Ho Tram slowly: six core experiences, private transport, flexible pickup, and local support for international travelers arriving from Ho Tram resorts, Long Thanh Airport or Ho Chi Minh City.",
    principleTitle: "Why only six?",
    principle:
      "Because depth beats a long catalog. Each experience is designed around a distinct reason to visit Ho Tram: forest, local life, sunrise, hidden places, food, or resort time.",
    pickupTitle: "Start where you are",
    pickup:
      "Pickup can be arranged from a Ho Tram resort, Long Thanh Airport or central Ho Chi Minh City. Total timing is confirmed from your real flight, hotel and traffic conditions before booking.",
    localTitle: "Built for international FIT travelers",
    local:
      "Private couples, families and small groups first. No forced shopping stops. Guide language and exact inclusions are confirmed before payment.",
    toursTitle: "The six core experiences",
    faqTitle: "Quick answers",
    contact: "Ask GoVietStay",
    view: "View experience",
    back: "All six Ho Tram experiences",
    bookingNote: "Private booking · schedule confirmed before payment",
    sourceNote:
      "Local details are reviewed by GoVietStay before sale. Seasonal access, weather and supplier conditions can change.",
  },
  ru: {
    eyebrow: "ХОЧАМ · ИНДИВИДУАЛЬНЫЕ МАРШРУТЫ",
    h1: "Шесть способов открыть Хочам — без каталога из десятков одинаковых экскурсий.",
    intro:
      "GoVietStay развивает Хочам постепенно: шесть основных маршрутов, индивидуальный транспорт и поддержка для иностранных путешественников.",
    principleTitle: "Почему только шесть?",
    principle:
      "Мы делаем ставку на глубину, а не на количество. Каждый маршрут отвечает на отдельный интерес: лес, местная жизнь, рассвет, скрытые места, еда или спокойный отдых.",
    pickupTitle: "Начинаем там, где вы находитесь",
    pickup:
      "Возможен трансфер из отеля в Хочаме, аэропорта Лонгтхань или центра Хошимина. Время подтверждается по вашему рейсу, отелю и дорожной ситуации.",
    localTitle: "Для самостоятельных международных путешественников",
    local:
      "В первую очередь пары, семьи и небольшие группы. Без обязательных магазинов. Язык гида и включенные услуги подтверждаются до оплаты.",
    toursTitle: "Шесть основных маршрутов",
    faqTitle: "Короткие ответы",
    contact: "Написать GoVietStay",
    view: "Открыть маршрут",
    back: "Все 6 маршрутов Хочама",
    bookingNote: "Индивидуально · расписание подтверждаем до оплаты",
    sourceNote:
      "Условия на местах проверяются GoVietStay перед продажей. Погода, сезонность и доступ могут меняться.",
  },
  it: {
    eyebrow: "HO TRAM · ESPERIENZE PRIVATE",
    h1: "Sei modi privati per scoprire Ho Tram — non un catalogo infinito.",
    intro:
      "GoVietStay sviluppa Ho Tram con calma: sei esperienze principali, trasporto privato e supporto locale per viaggiatori internazionali.",
    principleTitle: "Perché solo sei?",
    principle:
      "Preferiamo profondità a quantità. Ogni esperienza risponde a un motivo diverso per venire a Ho Tram: foresta, vita locale, alba, luoghi nascosti, cucina o relax.",
    pickupTitle: "Partiamo da dove sei",
    pickup:
      "Possiamo organizzare il pickup dal resort a Ho Tram, dall'aeroporto Long Thanh o dal centro di Ho Chi Minh City. Tempi e percorso vengono confermati sul tuo volo e sul traffico reale.",
    localTitle: "Pensato per viaggiatori FIT internazionali",
    local:
      "Prima di tutto coppie, famiglie e piccoli gruppi. Nessuna sosta shopping obbligatoria. Lingua della guida e inclusioni vengono confermate prima del pagamento.",
    toursTitle: "Le sei esperienze principali",
    faqTitle: "Risposte rapide",
    contact: "Chiedi a GoVietStay",
    view: "Vedi esperienza",
    back: "Tutte le 6 esperienze di Ho Tram",
    bookingNote: "Privato · programma confermato prima del pagamento",
    sourceNote:
      "GoVietStay ricontrolla le condizioni locali prima della vendita. Meteo, stagionalità e accessi possono cambiare.",
  },
} as const;

export const tours: HotramTour[] = [
  {
    slug: "forest-ocean-hot-spring",
    name: "Forest · Ocean · Hot Spring",
    shortName: "Forest · Ocean · Hot Spring",
    promise: "One private day connecting Ho Tram's three strongest landscapes: forest, coast and hot-spring country.",
    duration: "Full day",
    bestFor: ["First-time Ho Tram visitors", "Couples", "Families", "Nature-focused small groups"],
    highlights: [
      "Binh Chau–Phuoc Buu forest atmosphere",
      "Quiet coastal stop around Ho Coc / Ho Tram",
      "Hot-spring time planned around the day rather than rushed between stops",
    ],
    itinerary: [
      "Private pickup from the confirmed starting point",
      "Forest-focused stop with time for nature rather than a quick photo",
      "Coastal break selected for the day's sea and weather conditions",
      "Hot-spring / wellness stop",
      "Flexible return with local meal stop if requested",
    ],
    notes: [
      "Exact forest access and hot-spring inclusions are confirmed before payment.",
      "The route is adjusted for weather, children, seniors and arrival time.",
    ],
    pickup: ["Ho Tram resort", "Long Thanh Airport", "Central Ho Chi Minh City"],
  },
  {
    slug: "a-day-as-a-local",
    name: "A Day As A Local",
    shortName: "A Day As A Local",
    promise: "A private day built around the everyday side of Xuyen Moc and Ho Tram instead of resort sightseeing.",
    duration: "Half or full day",
    bestFor: ["Repeat Vietnam visitors", "Food-curious travelers", "Families", "Slow travel"],
    highlights: [
      "Local market or fishing-life stop selected by timing",
      "Countryside roads and everyday villages",
      "Simple local food and coffee rather than a fixed tourist buffet",
    ],
    itinerary: [
      "Private pickup",
      "Local market / village life according to opening hours",
      "Countryside route with stops chosen for the day",
      "Local meal or coffee experience",
      "Return without compulsory shopping",
    ],
    notes: [
      "Market and fishing activity depend on time of day.",
      "This experience is intentionally flexible so it does not become a staged 'local' show.",
    ],
    pickup: ["Ho Tram resort", "Long Thanh Airport", "Central Ho Chi Minh City"],
  },
  {
    slug: "sunrise-to-sunset",
    name: "Sunrise To Sunset",
    shortName: "Sunrise To Sunset",
    promise: "A slow private coastal day designed around the best light, local breakfast, beach time and sunset.",
    duration: "Flexible full day",
    bestFor: ["Couples", "Photographers", "Slow travelers", "Guests staying 2+ nights"],
    highlights: [
      "Early coastal start",
      "Local breakfast / coffee",
      "Long free-time block instead of constant transfers",
      "Sunset finish when weather allows",
    ],
    itinerary: [
      "Pre-sunrise pickup",
      "Sunrise / fishing-life observation",
      "Breakfast and coffee",
      "Free-time block for beach, resort or rest",
      "Late-afternoon local stop and sunset",
    ],
    notes: [
      "Sunrise and sunset visibility is weather-dependent.",
      "The middle of the day is intentionally lighter to avoid turning a long day into a rushed one.",
    ],
    pickup: ["Ho Tram resort"],
  },
  {
    slug: "hidden-ho-tram-expedition",
    name: "Hidden Ho Tram Expedition",
    shortName: "Hidden Ho Tram Expedition",
    promise: "The more active route: forest roads, lesser-known coastal corners and local terrain beyond the resort strip.",
    duration: "Half or full day",
    bestFor: ["Active couples", "Friends", "Adventure-focused small groups", "Repeat visitors"],
    highlights: [
      "Less-visited forest / countryside routes",
      "Hidden coastal viewpoints selected by conditions",
      "Optional activity elements such as ATV or horse riding when verified available",
    ],
    itinerary: [
      "Private pickup and route briefing",
      "Countryside / forest approach",
      "Active experience selected from verified local operators",
      "Coastal stop",
      "Return via a different local route where practical",
    ],
    notes: [
      "Activity availability, safety rules and age limits are checked before booking.",
      "No off-road activity is promised until the operating supplier and weather are confirmed.",
    ],
    pickup: ["Ho Tram resort", "Long Thanh Airport", "Central Ho Chi Minh City"],
  },
  {
    slug: "omakase-ho-tram",
    name: "Omakase Ho Tram",
    shortName: "Omakase Ho Tram",
    promise: "Tell us your time, appetite and pace; we build one private food-led Ho Tram day around what is actually good that day.",
    duration: "3–6 hours",
    bestFor: ["Food travelers", "Couples", "Small private groups", "Guests who dislike fixed menus"],
    highlights: [
      "Seafood and local dishes selected by the day",
      "Market / producer stop when timing makes sense",
      "Flexible sequence rather than a fixed tasting checklist",
    ],
    itinerary: [
      "Short preference check before departure",
      "First local stop selected for timing and freshness",
      "Main food experience",
      "Coffee / dessert / coastal stop",
      "Private return",
    ],
    notes: [
      "Dietary restrictions must be shared in advance.",
      "The point of this experience is curation, so individual stops can change.",
    ],
    pickup: ["Ho Tram resort", "Central Ho Chi Minh City"],
  },
  {
    slug: "ho-tram-resort-discovery",
    name: "Ho Tram Resort Discovery",
    shortName: "Ho Tram Resort Discovery",
    promise: "For guests who want the resort to remain the center of the holiday, with one well-planned private local escape.",
    duration: "3–5 hours",
    bestFor: ["Resort guests", "Families with young children", "Seniors", "Short-stay travelers"],
    highlights: [
      "Late-start options",
      "One or two meaningful local stops",
      "Easy meal / coffee addition",
      "Return in time for pool, spa or dinner",
    ],
    itinerary: [
      "Pickup from your resort",
      "One primary local experience",
      "Optional food / coffee stop",
      "Return to resort without filling the day unnecessarily",
    ],
    notes: [
      "This is intentionally not a full sightseeing circuit.",
      "Best for travelers who value free resort time as much as local discovery.",
    ],
    pickup: ["Ho Tram resort"],
  },
];

export const faqs = [
  {
    q: "Are these group tours?",
    a: "No. The six Ho Tram experiences are designed primarily as private tours for couples, families and small groups.",
  },
  {
    q: "Can pickup start at Long Thanh Airport?",
    a: "Yes, for selected experiences. We confirm the usable schedule from the real flight time, luggage plan and road conditions before accepting the booking.",
  },
  {
    q: "Can pickup start in central Ho Chi Minh City?",
    a: "Yes. Private car pickup can be included for selected experiences. The total day is planned differently from a resort-origin tour because road time matters.",
  },
  {
    q: "Why does GoVietStay offer only six Ho Tram experiences?",
    a: "It is deliberate. We want six products that we can understand, verify and operate deeply instead of publishing a large catalog of near-duplicate tours.",
  },
  {
    q: "Are Russian- or Italian-speaking guides guaranteed?",
    a: "No language is promised until availability is checked for the exact date. GoVietStay confirms the guide language before payment.",
  },
];

export function localePrefix(locale: HotramLocale) {
  return localeConfig[locale].path;
}

export function publicUrl(locale: HotramLocale, slug?: string) {
  const prefix = localePrefix(locale);
  return `${HOTRAM_BASE}${prefix}${slug ? `/${slug}` : ""}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
