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
      "Weekend, holiday and supplier ticket changes are reconfirmed before payment.",
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
    priceNote: "Resort-origin pilot rate. Includes private vehicle, English-speaking guide, forest admission allowance, local lunch allowance and mineral-bath ticket. HCMC / Long Thanh pickup is quoted separately.",
    tourFaqs: [
      { q: "Is this a hard trekking tour?", a: "No. The standard version uses a light forest route so the day still has enough time for the coast and mineral springs." },
      { q: "Is mineral bathing included?", a: "Yes in the pilot rate. The exact ticket category is rechecked for the travel date before payment." },
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
      "No compulsory shopping stop and no commission-driven seafood stop.",
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
    priceNote: "Resort-origin pilot rate. Includes private vehicle, English-speaking guide, breakfast/coffee allowance and local lunch allowance. Boat, farm or paid activity add-ons are included only when separately confirmed.",
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
    priceNote: "Resort-origin pilot rate. Includes two private transport windows, English-speaking guide for both experience blocks, breakfast/coffee allowance and bottled water. Resort lunch, spa and dinner are not included.",
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
    seoDescription: "Private Ho Tram nature and adventure route through forest-side countryside and lesser-known coast, with optional activities only after safety verification.",
    shortName: "Hidden Ho Tram Expedition",
    promise: "The more active private route: primitive forest atmosphere, lesser-known coastal corners and one verified adventure element when conditions allow.",
    duration: "6–8 hours",
    bestFor: ["Active couples", "Friends", "Adventure-focused small groups", "Repeat visitors"],
    highlights: [
      "Forest and countryside route beyond the resort strip",
      "Nature stop such as Cicada / reserve-side experience when operating conditions fit",
      "Hidden coast or Ho Coc stop chosen for sea and weather",
      "Optional ATV, horse riding or other activity only after supplier verification",
    ],
    itinerary: [
      "08:00 · Private pickup and route briefing",
      "Morning · Forest / countryside approach",
      "Late morning · Verified active nature experience",
      "Local lunch",
      "Afternoon · Hidden coastal stop",
      "Return via a different local road where practical",
    ],
    notes: [
      "ATV, horse riding and similar activities are not included in the base rate until supplier safety, age limits and insurance terms are verified.",
      "The standard tour does not enter restricted forest areas without the correct local permission or guide.",
      "Weather fallback favors safe forest-edge / countryside and coastal experiences rather than forcing an activity.",
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
    priceHeadline: "Private expedition base rate — risky add-ons stay optional.",
    priceNote: "Resort-origin pilot rate. Includes private vehicle, English-speaking guide, local lunch allowance and basic verified entrance allowance. ATV, horse riding, special forest guide, boat or paid adventure activities are quoted separately after verification.",
    tourFaqs: [
      { q: "Is ATV or horse riding included?", a: "No. Those are optional add-ons only after the local operator, safety rules, age limits and date availability are verified." },
      { q: "Is this off-road?", a: "Not by default. The base route uses legal roads and verified nature areas; any true off-road element needs a confirmed supplier." },
      { q: "Can children join?", a: "Yes for the base route in many cases. Activity add-ons have separate age and safety restrictions." },
    ],
  },
  {
    slug: "omakase-ho-tram",
    name: "Omakase Ho Tram",
    seoTitle: "Ho Tram Private Food Tour – Omakase Local Experience | GoVietStay",
    seoDescription: "A private Ho Tram food experience curated around the freshest local seafood, Vietnamese specialties, guest preferences and a clear food allowance.",
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
      "A food allowance is included; premium seafood such as large lobster or items priced far above the allowance are confirmed with guests before ordering.",
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
    priceHeadline: "Private food curation with a real food allowance — not a fixed buffet.",
    priceNote: "Resort-origin pilot rate. Includes private transport, English-speaking local host/guide, and a 500,000 VND per guest food-and-drink allowance. Premium seafood above the allowance is only ordered after guest approval.",
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
    priceNote: "Resort-origin pilot rate. Includes private vehicle, English-speaking guide/host, bottled water and a light food/coffee allowance. Paid attraction tickets are included only when the chosen route requires them and are confirmed before payment.",
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
