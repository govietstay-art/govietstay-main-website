export const HOTRAM_BASE = "https://hotram.govietstay.com";
export const MAIN_SITE = "https://www.govietstay.com";
export const WHATSAPP_NUMBER = "84937762607";
export const LAST_REVIEWED = "2026-10-05";

export const hubVisuals = [
  {
    src: "https://images.pexels.com/photos/31768446/pexels-photo-31768446.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Aerial view of Ho Tram beach and coastline in Vietnam",
    label: "Ho Tram Coast",
    sourceUrl: "https://www.pexels.com/photo/aerial-view-of-h-tram-beach-in-vietnam-31768446/",
  },
  {
    src: "https://images.pexels.com/photos/31768451/pexels-photo-31768451.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Aerial view of resort buildings in Ho Tram, Vietnam",
    label: "Resort Coast",
    sourceUrl: "https://www.pexels.com/photo/aerial-view-of-resort-buildings-in-h-tram-vietnam-31768451/",
  },
  {
    src: "https://images.pexels.com/photos/35621426/pexels-photo-35621426.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Fish market workers in the nearby Vung Tau coastal region",
    label: "Local Coastal Life",
    sourceUrl: "https://www.pexels.com/photo/fish-processing-workers-at-vung-tau-market-35621426/",
  },
] as const;

export type HotramLocale = "en" | "ru" | "it";

export type HotramTour = {
  slug: string;
  name: string;
  shortName: string;
  promise: string;
  seoTitle?: string;
  seoDescription?: string;
  duration: string;
  bestFor: string[];
  highlights: string[];
  itinerary: string[];
  notes: string[];
  pickup: string[];
  visuals?: Array<{
    src: string;
    alt: string;
    label: string;
    credit: string;
    sourceUrl: string;
  }>;
  pilotPricing?: Array<{ guests: string; perPersonVnd: number }>;
  priceHeadline?: string;
  priceNote?: string;
  tourFaqs?: Array<{ q: string; a: string }>;
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
    h1: "Six private ways to discover Ho Tram, at your own pace.",
    intro:
      "Six private Ho Tram experiences with flexible pickup and local support for travelers staying in Ho Tram or arriving from Long Thanh Airport or Ho Chi Minh City.",
    principleTitle: "Choose your Ho Tram",
    principle:
      "Nature, local life, sunrise, hidden places, food or a short resort-friendly escape — choose the style that fits your trip.",
    pickupTitle: "Start where you are",
    pickup:
      "Pickup can be arranged from a Ho Tram resort, Long Thanh Airport or central Ho Chi Minh City. Total timing is confirmed from your real flight, hotel and traffic conditions before booking.",
    localTitle: "Private by design",
    local:
      "For couples, families and small groups. Flexible timing, no forced shopping stops, and guide language confirmed before booking.",
    toursTitle: "The six core experiences",
    faqTitle: "Quick answers",
    contact: "Ask GoVietStay",
    view: "View experience",
    back: "All six Ho Tram experiences",
    bookingNote: "Private booking · schedule confirmed before payment",
    sourceNote:
      "Opening hours, weather-sensitive activities and exact inclusions are reconfirmed for your travel date.",
  },
  ru: {
    eyebrow: "ХОЧАМ · ИНДИВИДУАЛЬНЫЕ МАРШРУТЫ",
    h1: "Шесть индивидуальных способов открыть Хочам в своем темпе.",
    intro:
      "Шесть индивидуальных маршрутов по Хочаму, частный транспорт и местная поддержка для иностранных путешественников.",
    principleTitle: "Выберите свой Хочам",
    principle:
      "Лес, местная жизнь, рассвет, скрытые места, гастрономия или короткая поездка из отеля — выбирайте формат под свой отдых.",
    pickupTitle: "Начинаем там, где вы находитесь",
    pickup:
      "Возможен трансфер из отеля в Хочаме, аэропорта Лонгтхань или центра Хошимина. Время подтверждается по вашему рейсу, отелю и дорожной ситуации.",
    localTitle: "Индивидуальный формат",
    local:
      "В первую очередь пары, семьи и небольшие группы. Без обязательных магазинов. Язык гида и включенные услуги подтверждаются до оплаты.",
    toursTitle: "Шесть основных маршрутов",
    faqTitle: "Короткие ответы",
    contact: "Написать GoVietStay",
    view: "Открыть маршрут",
    back: "Все 6 маршрутов Хочама",
    bookingNote: "Индивидуально · расписание подтверждаем до оплаты",
    sourceNote:
      "Часы работы, погодные условия и точные включения подтверждаются на вашу дату поездки.",
  },
  it: {
    eyebrow: "HO TRAM · ESPERIENZE PRIVATE",
    h1: "Sei modi privati per scoprire Ho Tram, con i tuoi ritmi.",
    intro:
      "Sei esperienze private a Ho Tram, trasporto privato e supporto locale per viaggiatori internazionali.",
    principleTitle: "Scegli il tuo Ho Tram",
    principle:
      "Foresta, vita locale, alba, luoghi nascosti, cucina o una breve uscita dal resort: scegli lo stile che si adatta al tuo viaggio.",
    pickupTitle: "Partiamo da dove sei",
    pickup:
      "Possiamo organizzare il pickup dal resort a Ho Tram, dall'aeroporto Long Thanh o dal centro di Ho Chi Minh City. Tempi e percorso vengono confermati sul tuo volo e sul traffico reale.",
    localTitle: "Privato per scelta",
    local:
      "Prima di tutto coppie, famiglie e piccoli gruppi. Nessuna sosta shopping obbligatoria. Lingua della guida e inclusioni vengono confermate prima del pagamento.",
    toursTitle: "Le sei esperienze principali",
    faqTitle: "Risposte rapide",
    contact: "Chiedi a GoVietStay",
    view: "Vedi esperienza",
    back: "Tutte le 6 esperienze di Ho Tram",
    bookingNote: "Privato · programma confermato prima del pagamento",
    sourceNote:
      "Orari, attività sensibili al meteo e inclusioni esatte vengono riconfermati per la data del viaggio.",
  },
} as const;

export const tours: HotramTour[] = [
  {
    slug: "forest-ocean-hot-spring",
    name: "Forest · Ocean · Hot Spring",
    seoTitle: "Ho Tram Nature Tour: Forest, Ho Coc & Hot Springs | GoVietStay",
    seoDescription: "Private Ho Tram nature tour combining Binh Chau–Phuoc Buu forest, Ho Coc coast and mineral bathing, with resort pickup and flexible local support.",
    shortName: "Forest · Ocean · Hot Spring",
    promise: "One private day connecting Ho Tram's three strongest landscapes: coastal forest, wild beach and natural mineral springs.",
    duration: "Full day · about 8–9 hours",
    bestFor: ["First-time Ho Tram visitors", "Couples", "Families", "Nature-focused small groups"],
    highlights: [
      "Binh Chau–Phuoc Buu coastal forest with a light walking route",
      "Ho Coc coastline with time to stop rather than rush",
      "Full mineral-bath time at Binh Chau hot springs",
    ],
    itinerary: [
      "08:00 · Private pickup from Ho Tram resort area",
      "08:30–10:00 · Binh Chau–Phuoc Buu forest experience",
      "10:15–11:15 · Ho Coc coast and beach stop",
      "11:30–12:45 · Local Vietnamese / seafood lunch",
      "13:15–16:15 · Mineral-bath and relaxation time",
      "Around 17:00 · Return to resort",
    ],
    notes: [
      "The forest route is kept light; longer trekking is a different product and is not bundled into this day.",
      "Any weekend or holiday surcharge is confirmed before booking.",
      "Long Thanh Airport same-day pickup is accepted only when the flight arrives early enough for the full route to remain comfortable.",
    ],
    pickup: ["Ho Tram resort", "Long Thanh Airport (early arrivals only)", "Central Ho Chi Minh City (full-day quote)"],
    visuals: [
      {
        src: "https://vietnamtourism.vn/imguploads/tourist/02Binhchau01.jpg",
        alt: "Binh Chau Phuoc Buu coastal forest near Ho Tram",
        label: "Forest",
        credit: "Reference image · Vietnam National Authority of Tourism",
        sourceUrl: "https://vietnamtourism.vn/en/index.php/news/items/18279",
      },
      {
        src: "https://vietnamtourism.vn/imguploads/tourist/02BaibienHococ01.jpg",
        alt: "Ho Coc beach with natural rocks near Ho Tram",
        label: "Ocean",
        credit: "Reference image · Vietnam National Authority of Tourism",
        sourceUrl: "https://vietnamtourism.vn/en/index.php/news/items/18279",
      },
      {
        src: "https://minera.vn/static/upload/images/SEO/gia-ve/Combo_Khoang_Thoa_Thich/SpringPool--5-1.jpg",
        alt: "Mineral spring pool at Minera Hot Springs Binh Chau",
        label: "Hot Spring",
        credit: "Reference image · Minera Hot Springs Binh Chau",
        sourceUrl: "https://minera.vn/gia-ve/ve-tam-khoang-110.html",
      },
    ],
    pilotPricing: [
      { guests: "2 guests", perPersonVnd: 2790000 },
      { guests: "3 guests", perPersonVnd: 2490000 },
      { guests: "4 guests", perPersonVnd: 2290000 },
      { guests: "5–6 guests", perPersonVnd: 2190000 },
    ],
    priceHeadline: "One private day. Full mineral-bath ticket included.",
    priceNote: "Price shown for pickup from the Ho Tram resort area. Includes private vehicle, English-speaking guide, forest access, local lunch and mineral-bath ticket. HCMC / Long Thanh pickup is quoted separately.",
    tourFaqs: [
      { q: "Is this a hard trekking tour?", a: "No. The standard version uses a light forest route so the day still has enough time for the coast and mineral springs." },
      { q: "Is mineral bathing included?", a: "Yes. The standard private price includes mineral bathing; the exact ticket category is confirmed for the travel date before booking." },
      { q: "Can we start directly from Long Thanh Airport?", a: "Sometimes. We only accept same-day airport pickup when the arrival time leaves enough daylight and enough time before the hot-spring facility closes." },
    ],
  },
  {
    slug: "a-day-as-a-local",
    name: "A Day As A Local",
    seoTitle: "Ho Tram Local Life Tour: Fishing Port, Market & Food | GoVietStay",
    seoDescription: "Private Ho Tram local-life tour with early fishing activity, local market, countryside and Vietnamese food, designed for couples, families and small groups.",
    shortName: "A Day As A Local",
    promise: "A private morning-to-afternoon route built around fishing life, local markets, countryside and food instead of resort sightseeing.",
    duration: "5–6 hours",
    bestFor: ["Repeat Vietnam visitors", "Food-curious travelers", "Families", "Slow travel"],
    highlights: [
      "Fishing-port life selected for the strongest morning activity",
      "Local market and everyday Xuyen Moc / Ho Tram streets",
      "Countryside or dragon-fruit stop only when local access is genuinely available",
      "Vietnamese lunch and local coffee",
    ],
    itinerary: [
      "06:00–06:30 · Resort pickup",
      "Early morning · Fishing port / fishing-life stop",
      "Morning · Local market and village streets",
      "Late morning · Countryside or seasonal farm stop with permission",
      "Lunch · Simple local Vietnamese meal",
      "Coffee stop and return to resort",
    ],
    notes: [
      "Early departure matters because fishing activity is strongest around sunrise and boat-landing time.",
      "Farm access is never staged or entered without owner permission.",
      "No compulsory shopping stops.",
    ],
    pickup: ["Ho Tram resort", "Central Ho Chi Minh City (full-day quote)"],
    visuals: [
      {
        src: "https://www.angsana.com/assets/2023-12/Phuoc%20Hai%20Fishing%20Town.jpg",
        alt: "Fishing village life near Ho Tram",
        label: "Fishing Life",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://www.angsana.com/assets/2023-12/Ho%20Tram%20night%20market.jpg",
        alt: "Local market and food atmosphere around Ho Tram",
        label: "Local Market",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://vcdn1-dulich.vnecdn.net/2026/06/14/DJI-0315-3315-1607582980-jpg-1-6014-2558-1781407186.webp?dpr=1&fit=crop&h=0&q=100&s=ESDGx0KfMGgBquTyHJkmCQ&w=0",
        alt: "Ho Tram coastal countryside seen from above",
        label: "Countryside",
        credit: "Reference image · VnExpress Travel",
        sourceUrl: "https://vnexpress.net/cam-nang-du-lich-ho-tram-5082140.html",
      },
    ],
    pilotPricing: [
      { guests: "2 guests", perPersonVnd: 1790000 },
      { guests: "3 guests", perPersonVnd: 1490000 },
      { guests: "4 guests", perPersonVnd: 1290000 },
      { guests: "5–6 guests", perPersonVnd: 1190000 },
    ],
    priceHeadline: "Private local-life route with food and coffee included.",
    priceNote: "Price shown for pickup from the Ho Tram resort area. Includes private vehicle, English-speaking guide, breakfast/coffee and local lunch. Optional boat or paid activities are quoted separately.",
    tourFaqs: [
      { q: "Why does this tour start early?", a: "Because the fishing port is most alive around sunrise and the morning landing period. Starting late changes the experience." },
      { q: "Can we buy seafood at the port?", a: "Yes, if guests want to, but purchases are separate and GoVietStay does not route guests to a shop for commission." },
      { q: "Is the dragon-fruit farm guaranteed?", a: "No. It is included only when a local host gives permission and the visit makes sense for the season." },
    ],
  },
  {
    slug: "sunrise-to-sunset",
    name: "Sunrise To Sunset",
    seoTitle: "Ho Tram Sunrise & Sunset Private Tour | GoVietStay",
    seoDescription: "A split-day private Ho Tram experience: sunrise and local breakfast, resort free time, then a second pickup for coast and sunset.",
    shortName: "Sunrise To Sunset",
    promise: "Two private coastal windows — sunrise and sunset — with the middle of the day left free for the resort instead of being filled with unnecessary stops.",
    duration: "Split day · sunrise + sunset",
    bestFor: ["Couples", "Photographers", "Slow travelers", "Guests staying 2+ nights"],
    highlights: [
      "Pre-sunrise fishing-life or coastal start",
      "Local breakfast and coffee",
      "Midday returned to the resort for pool, spa or rest",
      "Second pickup for late-afternoon coast and sunset",
    ],
    itinerary: [
      "05:00–05:30 · Resort pickup",
      "Sunrise · Fishing life / coast selected for conditions",
      "Breakfast and coffee",
      "Around 09:00 · Return to resort for free time",
      "16:00 · Second private pickup",
      "Late afternoon · Coastal walk / pier / quiet beach",
      "Sunset and return for dinner",
    ],
    notes: [
      "This is intentionally a split-day product; the driver and guide do not make guests sit in a vehicle all day.",
      "Sunrise and sunset visibility depend on cloud and sea conditions.",
      "The exact sunrise point is selected the evening before from weather, sea and local activity.",
    ],
    pickup: ["Ho Tram resort"],
    visuals: [
      {
        src: "https://www.angsana.com/assets/2023-12/Phuoc%20Hai%20Fishing%20Town.jpg",
        alt: "Fishing village atmosphere for an early coastal start",
        label: "Sunrise",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://www.angsana.com/assets/2025-09/AN%20HT%20Banner%20%284%29.png",
        alt: "Ho Tram sea view from a long coastal pier",
        label: "Coast",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://www.angsana.com/assets/2025-09/Angsana%20HT%20Destination%20banner_0.png",
        alt: "Hamptons Pier and coastal atmosphere in Ho Tram",
        label: "Sunset",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
    ],
    pilotPricing: [
      { guests: "2 guests", perPersonVnd: 2190000 },
      { guests: "3 guests", perPersonVnd: 1890000 },
      { guests: "4 guests", perPersonVnd: 1690000 },
      { guests: "5–6 guests", perPersonVnd: 1590000 },
    ],
    priceHeadline: "Two private departures in one day, with your resort time protected.",
    priceNote: "Price shown for pickup from the Ho Tram resort area. Includes two private transport windows, English-speaking guide, breakfast/coffee and bottled water. Resort lunch, spa and dinner are not included.",
    tourFaqs: [
      { q: "Do we stay outside all day?", a: "No. The key idea is sunrise, then resort time, then a second pickup for sunset." },
      { q: "What happens if sunrise is cloudy?", a: "The fishing-life and coastal experience still runs; the exact point can be adjusted based on the latest weather and sea conditions." },
      { q: "Is this good for small children?", a: "It can be, but the very early start is the main consideration. Families can request a later sunrise-season version where practical." },
    ],
  },
  {
    slug: "hidden-ho-tram-expedition",
    name: "Hidden Ho Tram Expedition",
    seoTitle: "Hidden Ho Tram Nature & Adventure Tour | GoVietStay",
    seoDescription: "Private Ho Tram nature and adventure route through forest-side countryside and lesser-known coast, with optional activities depending on date and conditions.",
    shortName: "Hidden Ho Tram Expedition",
    promise: "The more active private route: primitive forest atmosphere, lesser-known coastal corners and an optional adventure element when conditions allow.",
    duration: "6–8 hours",
    bestFor: ["Active couples", "Friends", "Adventure-focused small groups", "Repeat visitors"],
    highlights: [
      "Forest and countryside route beyond the resort strip",
      "Nature stop such as Cicada / reserve-side experience when conditions fit",
      "Hidden coast or Ho Coc stop chosen for sea and weather",
      "Optional ATV, horse riding or other activity depending on availability, weather and age requirements",
    ],
    itinerary: [
      "08:00 · Private pickup and route briefing",
      "Morning · Forest / countryside approach",
      "Late morning · Active nature experience",
      "Local lunch",
      "Afternoon · Hidden coastal stop",
      "Return via a different local road where practical",
    ],
    notes: [
      "ATV, horse riding and similar activities are optional and depend on date, weather and age requirements.",
      "Forest access follows local regulations, weather and the route available on the travel date.",
      "If weather changes, the route is adjusted toward suitable forest-edge, countryside or coastal experiences.",
    ],
    pickup: ["Ho Tram resort", "Central Ho Chi Minh City (full-day quote)"],
    visuals: [
      {
        src: "https://www.angsana.com/assets/2025-09/Ang%20HT%20Destination%20%282%29.jpg",
        alt: "Nature discovery area in primitive forest near Ho Tram",
        label: "Nature",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://www.angsana.com/assets/2025-09/Ang%20HT%20Destination%20%284%29.jpg",
        alt: "Binh Chau Phuoc Buu nature reserve near Ho Tram",
        label: "Forest Route",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://www.angsana.com/assets/2025-09/Ang%20HT%20Destination%20%283%29.jpg",
        alt: "Ho Coc coastal landscape near Ho Tram",
        label: "Hidden Coast",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
    ],
    pilotPricing: [
      { guests: "2 guests", perPersonVnd: 2190000 },
      { guests: "3 guests", perPersonVnd: 1890000 },
      { guests: "4 guests", perPersonVnd: 1690000 },
      { guests: "5–6 guests", perPersonVnd: 1590000 },
    ],
    priceHeadline: "Private nature expedition with optional adventure add-ons.",
    priceNote: "Price shown for pickup from the Ho Tram resort area. Includes private vehicle, English-speaking guide, local lunch and standard entrance fees. ATV, horse riding, boat and other paid adventure activities are quoted separately.",
    tourFaqs: [
      { q: "Is ATV or horse riding included?", a: "No. Those are optional add-ons depending on date availability, weather, age limits and activity rules." },
      { q: "Is this off-road?", a: "Not by default. The standard route uses regular roads and designated nature areas; any off-road activity is offered only when available for the date." },
      { q: "Can children join?", a: "Yes for the base route in many cases. Activity add-ons have separate age and safety restrictions." },
    ],
  },
  {
    slug: "omakase-ho-tram",
    name: "Omakase Ho Tram",
    seoTitle: "Ho Tram Private Food Tour – Omakase Local Experience | GoVietStay",
    seoDescription: "A private Ho Tram food experience curated around fresh local seafood, Vietnamese specialties, guest preferences and an included food-and-drink budget.",
    shortName: "Omakase Ho Tram",
    promise: "Tell us your appetite, budget and pace; we curate one private food-led Ho Tram experience around what is freshest and most worthwhile that day.",
    duration: "4–6 hours",
    bestFor: ["Food travelers", "Couples", "Small private groups", "Guests who dislike fixed menus"],
    highlights: [
      "Fishing port or seafood market when the timing is right",
      "Fresh seafood or local specialty selected with prices confirmed before ordering",
      "One countryside / local-food contrast instead of eating only resort seafood",
      "Coffee, dessert or coastal finish",
    ],
    itinerary: [
      "Preference check before departure: seafood, meat, spice, allergies and budget",
      "First local stop selected by landing time / market activity",
      "Main curated seafood or local meal",
      "Second tasting or countryside specialty",
      "Coffee / dessert / coastal finish",
      "Private return to resort",
    ],
    notes: [
      "Omakase here means 'leave the curation to us' — it is not a Japanese-food tour.",
      "The tour includes a food-and-drink budget; premium seafood such as large lobster is confirmed with guests before ordering.",
      "Allergies and dietary restrictions must be shared before the tour.",
    ],
    pickup: ["Ho Tram resort"],
    visuals: [
      {
        src: "https://www.angsana.com/assets/2023-12/Ho%20Tram%20night%20market.jpg",
        alt: "Local food market atmosphere around Ho Tram",
        label: "Market",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://vcdn1-dulich.vnecdn.net/2026/06/14/unnamed-56-1780942512-7727-1781407187.jpg?dpr=1&fit=crop&h=0&q=100&s=LLhP2byQoeDWi09ekATX7A&w=0",
        alt: "Local fish hotpot specialty from the Ho Tram coastal region",
        label: "Local Taste",
        credit: "Reference image · VnExpress Travel",
        sourceUrl: "https://vnexpress.net/cam-nang-du-lich-ho-tram-5082140.html",
      },
      {
        src: "https://vcdn1-dulich.vnecdn.net/2026/06/14/unnamed-1780942465-5226-1781407187.jpg?dpr=1&fit=crop&h=0&q=100&s=vIn_wN_0QfroOUNbjQEbYQ&w=0",
        alt: "Fish-based local specialty from the Ho Tram coastal region",
        label: "Second Taste",
        credit: "Reference image · VnExpress Travel",
        sourceUrl: "https://vnexpress.net/cam-nang-du-lich-ho-tram-5082140.html",
      },
    ],
    pilotPricing: [
      { guests: "2 guests", perPersonVnd: 2290000 },
      { guests: "3 guests", perPersonVnd: 1990000 },
      { guests: "4 guests", perPersonVnd: 1790000 },
      { guests: "5–6 guests", perPersonVnd: 1690000 },
    ],
    priceHeadline: "Private food curation with 500,000 VND per guest for food and drinks.",
    priceNote: "Price shown for pickup from the Ho Tram resort area. Includes private transport, English-speaking local host/guide, and 500,000 VND per guest for food and drinks. Premium seafood above this amount is ordered only with guest approval.",
    tourFaqs: [
      { q: "Is Omakase Ho Tram Japanese food?", a: "No. 'Omakase' describes the curation style: tell us your preferences and let GoVietStay build the route from what is good locally that day." },
      { q: "Is seafood price transparent?", a: "Yes. For market-priced or premium items, the price is confirmed before ordering." },
      { q: "Can the tour be non-seafood?", a: "Yes. We can build a countryside / Vietnamese-food version around the same private curation concept." },
    ],
  },
  {
    slug: "ho-tram-resort-discovery",
    name: "Ho Tram Resort Discovery",
    seoTitle: "Short Private Ho Tram Tour for Resort Guests | GoVietStay",
    seoDescription: "A flexible 3–5 hour private Ho Tram tour for resort guests, with one meaningful local experience, an easy food or coffee stop and fast return.",
    shortName: "Ho Tram Resort Discovery",
    promise: "A compact private escape for resort guests: one meaningful local stop, one easy food or coffee stop, then back before the resort day disappears.",
    duration: "3–5 hours",
    bestFor: ["Resort guests", "Families with young children", "Seniors", "Short-stay travelers"],
    highlights: [
      "Late-start and after-breakfast options",
      "One primary local stop selected from coast, fishing life or countryside",
      "Coffee / light food stop with no forced shopping",
      "Back in time for pool, spa, kids club or dinner",
    ],
    itinerary: [
      "Flexible pickup after breakfast or early afternoon",
      "One primary local experience chosen for guest profile and weather",
      "Short scenic coastal / local stop",
      "Coffee, dessert or light local food",
      "Return to resort within the agreed window",
    ],
    notes: [
      "This is intentionally not a sightseeing checklist.",
      "The exact primary stop is confirmed before payment so families, seniors and couples do not receive the same generic route.",
      "Guests who want a full nature day should choose Forest · Ocean · Hot Spring instead.",
    ],
    pickup: ["Ho Tram resort"],
    visuals: [
      {
        src: "https://www.angsana.com/assets/2025-09/AN%20HT%20Banner%20%284%29.png",
        alt: "Ho Tram coastal pier close to the resort area",
        label: "Easy Coast",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
      {
        src: "https://vcdn1-dulich.vnecdn.net/2026/06/14/DJI-0315-3315-1607582980-jpg-1-6014-2558-1781407186.webp?dpr=1&fit=crop&h=0&q=100&s=ESDGx0KfMGgBquTyHJkmCQ&w=0",
        alt: "Aerial view of the Ho Tram coastal resort area",
        label: "Ho Tram",
        credit: "Reference image · VnExpress Travel",
        sourceUrl: "https://vnexpress.net/cam-nang-du-lich-ho-tram-5082140.html",
      },
      {
        src: "https://www.angsana.com/assets/2023-12/Ho%20Tram%20night%20market.jpg",
        alt: "Local food and market atmosphere near Ho Tram resorts",
        label: "Local Stop",
        credit: "Reference image · Angsana Ho Tram",
        sourceUrl: "https://www.angsana.com/vietnam/angsana-ho-tram/experiences/local-attractions",
      },
    ],
    pilotPricing: [
      { guests: "2 guests", perPersonVnd: 1590000 },
      { guests: "3 guests", perPersonVnd: 1290000 },
      { guests: "4 guests", perPersonVnd: 1090000 },
      { guests: "5–6 guests", perPersonVnd: 990000 },
    ],
    priceHeadline: "A short private local escape without sacrificing the resort.",
    priceNote: "Price shown for pickup from the Ho Tram resort area. Includes private vehicle, English-speaking guide/host, bottled water and a light food or coffee stop. Any paid attraction is confirmed before booking.",
    tourFaqs: [
      { q: "Can we start after breakfast?", a: "Yes. This product is built around resort time and can often start later than a normal day tour." },
      { q: "Is this suitable for seniors or young children?", a: "Yes. The route is deliberately compact and the primary stop is selected for mobility, weather and family needs." },
      { q: "What if we want more sightseeing?", a: "Choose one of the longer core experiences. Resort Discovery is intentionally short." },
    ],
  },
];

export const faqs = [
  {
    q: "Where is Ho Tram in 2026?",
    a: "Ho Tram is now a coastal commune of Ho Chi Minh City. Many older travel pages still describe it as part of Ba Ria–Vung Tau, so both place names may appear in searches and maps.",
  },
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
    q: "Which Ho Tram experience should I choose?",
    a: "Choose Forest · Ocean · Hot Spring for a full nature day, A Day As A Local for local life, Sunrise To Sunset for photography and resort time, Hidden Ho Tram Expedition for a more active route, Omakase Ho Tram for food, or Resort Discovery for a short private escape.",
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
