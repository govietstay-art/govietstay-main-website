import type { KitCopy } from "../types";

export const en: KitCopy = {
  meta: {
    title: "Travel kit for Vietnam | GoVietStay",
    description:
      "Trusted local support for a traveler who just arrived in Da Nang, Hoi An, Hue or Phu Quoc: weather, money, phrases, safety and a free eSIM request.",
  },
  pageMeta: {
    esim: {
      title: "Free Vietnam eSIM request | GoVietStay travel kit",
      description: "Request 5 GB a day for 10 days on WhatsApp. You send the message yourself. Nothing is installed from this page.",
    },
    arrival: {
      title: "From the airport to your hotel | GoVietStay travel kit",
      description: "What to do before you leave the terminal in Vietnam, with a checklist saved on this phone.",
    },
    money: {
      title: "Money and payments in Vietnam | GoVietStay travel kit",
      description: "A reference exchange rate with its source and time, plus the cash rules published by the UK Foreign Office.",
    },
    phrases: {
      title: "Vietnamese phrases to show | GoVietStay travel kit",
      description: "A short phrasebook in large type. It is not a translation app.",
    },
    weather: {
      title: "Weather and a rain plan | GoVietStay travel kit",
      description: "Current conditions from Open-Meteo for Da Nang, Hoi An, Hue and Phu Quoc, with a plan if it is wet.",
    },
    safety: {
      title: "Safety and emergency numbers | GoVietStay travel kit",
      description: "113, 114, 115 and 112, plus practical warnings from the UK Foreign Office advice for Vietnam.",
    },
    packing: {
      title: "Packing list for Vietnam | GoVietStay travel kit",
      description: "A checklist you can tick. It stays on this phone. No account.",
    },
    explore: {
      title: "Explore cities and situations | GoVietStay travel kit",
      description: "Da Nang, Hoi An, Hue and Phu Quoc, plus the situation you are in. No map pins until a place is verified.",
    },
    tools: {
      title: "Useful tools | GoVietStay travel kit",
      description: "Weather, money, phrases, safety, packing, the airport list and the eSIM request.",
    },
    trip: {
      title: "My trip | GoVietStay travel kit",
      description: "Dates, notes and a packing list saved on this phone. Nothing is sent to a server.",
    },
    "da-nang": {
      title: "Da Nang guide for a new arrival | GoVietStay travel kit",
      description: "Getting around, rain, money and safety in Da Nang, written for someone who just landed.",
    },
    "hoi-an": {
      title: "Hoi An guide for a new arrival | GoVietStay travel kit",
      description: "Walking the old town, rain, money and safety in Hoi An, without prices or opening hours.",
    },
    hue: {
      title: "Hue guide for a new arrival | GoVietStay travel kit",
      description: "The Imperial City gate, the ride, rain and safety in Hue. No fare and no ticket price.",
    },
    "phu-quoc": {
      title: "Phu Quoc guide for a new arrival | GoVietStay travel kit",
      description: "The first hours on the island: a connection, an address, rain, and what this page will not guess.",
    },
  },
  brand: "GoVietStay",
  logoAlt: "GoVietStay",
  mainSiteHint: "main website",
  kitHomeLabel: "Travel kit home",
  navLabel: "Travel kit sections",
  nav: { home: "Home", explore: "Explore", tools: "Tools", trip: "My trip" },
  trust: "Trusted local support",
  skip: "Skip to the next step",
  back: "Travel kit",
  homeLabel: "Right now",
  clockLabel: "ICT · this phone’s clock",
  noReply: "No reply time is promised.",
  langLabel: "Language",
  languageName: { en: "English", ru: "Russian", it: "Italian" },
  cityLabel: "City",
  cityOpen: "Choose a city",
  cityClose: "Close the city list",
  cities: { danang: "Da Nang", hoian: "Hoi An", hue: "Hue", phuquoc: "Phu Quoc" },
  portalTitle: "The next useful step, in the city you are in.",
  portalLede: "You just arrived in Vietnam. This kit gives you the airport list, a rain plan, a phrase to show, and a local person on WhatsApp. It does not sell a tour.",
  situationLabel: "Your situation",
  situations: [
    { title: "Just landed", body: "Stamp, passport, then a ride you chose.", tool: "arrival" },
    { title: "Rainy day", body: "A roof, and today's real sky.", tool: "weather" },
    { title: "This evening", body: "One phrase, large enough to show.", tool: "phrases" },
    { title: "Emergency", body: "113, 114 and 115. Call before you message anyone.", tool: "safety" },
  ],
  destinationLabel: "Destination",
  supportBlockTitle: "Local support",
  supportBlockBody: "Message a person at GoVietStay on WhatsApp. You press send. If you are in danger, call 113, 114 or 115 first.",
  supportTitle: "Message a local person",
  supportHint: "WhatsApp · you press send",
  supportMessage: "Hello GoVietStay. I am in {city} and I need local help.",
  nowKicker: "Right now",
  weatherLoading: "Weather is loading",
  weatherUnavailable: "Weather is not available right now",
  weatherSaved: "Last reading saved on this phone. Not a new update.",
  weatherSource: "Weather data by Open-Meteo.com",
  conditions: {
    clear: "Clear",
    cloud: "Cloudy",
    fog: "Fog",
    drizzle: "Drizzle",
    rain: "Rain",
    showers: "Showers",
    thunder: "Thunder",
  },
  now: {
    danang: {
      day: {
        title: "You are in Da Nang. Do the airport list before the car.",
        body: "Check the entry stamp, keep your passport, and show the driver a Vietnamese address. The list on the next screen is the order that matters.",
        cta: "Open the arrival list",
        tool: "arrival",
      },
      evening: {
        title: "Evening in Da Nang. Have one phrase ready.",
        body: "The Lady Buddha on Son Tra is the landmark for this hour. If you need a car, Dragon Bridge is a clear address to show. Agree it before the car moves.",
        cta: "Show a phrase",
        tool: "phrases",
      },
      rain: {
        title: "It is wet in Da Nang. Stay under a roof.",
        body: "The Marble Mountains caves are covered. The Cham museum is indoors. Leave My Khe until the rain eases. No opening hours are listed here.",
        cta: "Open the rain plan",
        tool: "weather",
      },
    },
    hoian: {
      day: {
        title: "Hoi An can wait one careful hour.",
        body: "The arrival list in this kit is written for Da Nang airport. Use it if that is where you landed, then put your own hotel on the driver card.",
        cta: "Open the arrival list",
        tool: "arrival",
      },
      evening: {
        title: "After dark, Hoi An is a walking town.",
        body: "Keep the driver card for the ride back. Show the Vietnamese address before you get in.",
        cta: "Show a phrase",
        tool: "phrases",
      },
      rain: {
        title: "Rain in Hoi An. Use the covered streets.",
        body: "Use the covered shophouses. The Hoi An guide names what is in the photographs, and nothing else.",
        cta: "Open the rain plan",
        tool: "weather",
      },
    },
    hue: {
      day: {
        title: "If Hue is the plan, settle the ride first.",
        body: "This kit’s step-by-step arrival is for Da Nang airport. For Hue, put your own hotel address on the driver card before the car moves.",
        cta: "Open the arrival list",
        tool: "arrival",
      },
      evening: {
        title: "A quiet evening needs a clear address.",
        body: "Ngo Mon is the gate in the photograph. Your hotel, not the gate, is what the driver should see.",
        cta: "Show a phrase",
        tool: "phrases",
      },
      rain: {
        title: "Rain in Hue. Courtyards will be slick.",
        body: "Stay out of open courtyards. Ngo Mon is the gate in the Hue guide, not a shelter and not your hotel.",
        cta: "Open the rain plan",
        tool: "weather",
      },
    },
    phuquoc: {
      day: {
        title: "On Phu Quoc, get a connection before you leave the terminal.",
        body: "Request the eSIM while the airport network is easy, then open the driver card. The island guide is the next page if you want the longer note.",
        cta: "See the eSIM gift",
        tool: "esim",
      },
      evening: {
        title: "Evening on the island. Agree the address first.",
        body: "Roads outside the towns are dark. Show the Vietnamese address before the car moves.",
        cta: "Show a phrase",
        tool: "phrases",
      },
      rain: {
        title: "Rain on Phu Quoc. The beach can wait.",
        body: "Leave the open beach until the rain eases. The island guide says what was checked, and what was left out.",
        cta: "Open the rain plan",
        tool: "weather",
      },
    },
  },
  giftKicker: "A gift, not a shop",
  giftTitle: "Free Vietnam eSIM",
  giftBody: "5 GB a day for 10 days. You request it on WhatsApp and you press send. Nothing is issued from this page.",
  giftCta: "See how to request it",
  toolsLabel: "Useful tools",
  tools: {
    esim: { title: "Free eSIM", glance: "5 GB a day · 10 days" },
    arrival: { title: "Airport to hotel", glance: "A list you can tick" },
    money: { title: "Money", glance: "A reference rate" },
    phrases: { title: "Vietnamese", glance: "Large type to show" },
    weather: { title: "Weather", glance: "Live, with a rain plan" },
    safety: { title: "Safety", glance: "113 · 114 · 115" },
    packing: { title: "Packing list", glance: "Saved on this phone" },
    "da-nang": { title: "Da Nang guide", glance: "The full city page" },
    "hoi-an": { title: "Hoi An guide", glance: "The old town, on foot" },
    hue: { title: "Hue guide", glance: "The gate, then your hotel" },
    "phu-quoc": { title: "Phu Quoc guide", glance: "Island, address first" },
    explore: { title: "Explore", glance: "City and situation" },
    tools: { title: "Tools", glance: "Weather, money, phrases" },
    trip: { title: "My trip", glance: "Saved on this phone" },
  },
  guideNote: "Each city has a guide. Weather, money, phrases and safety follow the city you pick.",
  cityGuide: "Open the {city} guide",
  explorePage: {
    title: "Where you are, and what you need.",
    lede: "Pick the city, then the situation. Each guide links to the tools. The tools link back.",
    mapTitle: "Map",
    mapBody: "No map is shown yet. A pin will be added only after its coordinates are checked against a named source. Nothing on this page is a guessed place.",
  },
  toolsPage: {
    title: "The tools, in one list.",
    lede: "Each one does a small job. The city in the header is the city they use.",
  },
  trip: {
    title: "My trip, on this phone.",
    lede: "Dates, notes and the packing ticks stay in this browser. There is no account, and this page does not upload them.",
    stored: "Stored on this device only. Clearing the browser, or the button below, removes it. Export makes a file you keep.",
    arrive: "Arrival date",
    leave: "Departure date",
    notesTitle: "Notes",
    notesPlaceholder: "A gate, a name, a reminder",
    addNote: "Add note",
    removeNote: "Remove",
    esimTitle: "eSIM note",
    esimHint: "Write this yourself. The page cannot see whether you sent the WhatsApp message.",
    esimPlaceholder: "For example: I sent the request on Tuesday",
    exportData: "Export data",
    clearData: "Clear data on this phone",
    clearConfirm: "Remove the travel kit data saved on this phone?",
    packingLink: "Packing checklist",
    addressLink: "Hotel address card",
    safetyLink: "Emergency numbers",
  },
  photoAlt: {
    danang: {
      landed: "The Golden Bridge at Ba Na Hills, held by giant stone hands, in the mist near Da Nang",
      rain: "A cavern in the Marble Mountains near Da Nang, with a stone Buddha and daylight from an opening above",
      evening: "The white Lady Buddha statue on a lotus, on the Son Tra peninsula in Da Nang",
    },
    hoian: {
      landed: "The Japanese Covered Bridge in Hoi An Ancient Town, seen from the river",
      rain: "A wood-lined tailor workshop in Hoi An, with garments on the racks and no one at the counter",
      evening: "Lantern-lit wooden boats on the river in Hoi An Ancient Town at blue hour",
    },
    hue: {
      landed: "Ngo Mon, the main gate of the Imperial City in Hue, in red and gold",
      rain: "Ngo Mon, the main gate of the Imperial City in Hue, in red and gold",
      evening: "Ngo Mon, the main gate of the Imperial City in Hue, in red and gold",
    },
    phuquoc: {
      landed: "Pale sand and wooden boats on a Phu Quoc beach",
      rain: "Pale sand and wooden boats on a Phu Quoc beach",
      evening: "Pale sand and wooden boats on a Phu Quoc beach",
    },
  },
  esim: {
    lead: "GoVietStay offers a Vietnam eSIM as a gift: 5 GB a day for 10 days. This page does not install it and does not send a message for you.",
    youGet: ["5 GB a day", "10 days", "For use in Vietnam", "You press send in WhatsApp"],
    howTitle: "How to request it",
    how: [
      "Tap the button. WhatsApp opens with a message already written.",
      "Read it. Add your dates if you want.",
      "Press send yourself. Until you do, nothing has been requested.",
      "A person at GoVietStay replies in that chat. That is also where phone compatibility and the start of the 10 days are confirmed.",
    ],
    unknown:
      "This page does not list which phones can install an eSIM, how activation works, or the exact clock time the 10 days begin. Those conditions were not published in a form that could be checked here. Ask in the WhatsApp chat before you rely on the gift.",
    button: "Request on WhatsApp",
    foot: "Nothing leaves this phone until you press send. There is no review to write and no payment on this page.",
    message: "Hello GoVietStay. I would like to request the Vietnam eSIM: 5 GB a day for 10 days. I am in {city}.",
    faq: [
      {
        q: "Does the travel kit send the eSIM request for me?",
        a: "No. The button opens WhatsApp with a draft. You send it.",
      },
      {
        q: "What does the gift include?",
        a: "5 GB a day for 10 days, for use in Vietnam, as GoVietStay describes the offer. Compatibility and activation are confirmed in the chat, not on this page.",
      },
    ],
  },
  arrival: {
    lead: "The useful problem at the airport is simple: leave with the right stamp, your passport still in your hands, and a ride you chose. The steps below follow UK Foreign Office advice checked on 16 October 2026. If your passport is not British, read your own government’s entry rules as well.",
    blocks: [
      {
        title: "Before you fly, if you hold a British citizen passport",
        paragraphs: [
          "The UK Foreign Office says a British citizen passport needs an expiry date at least six months after arrival, at least two blank pages, and no damage. You enter and leave on the same passport, and you need the entry stamp.",
          "The same advice says British citizens can visit for up to 45 days for tourism or business without a visa, and should check that the stamp shows 45 days. An e-visa for a longer stay is a different document. This is not a promise for any other passport.",
          "From 15 April 2026, a digital arrival card is encouraged for foreign nationals using Tan Son Nhat Airport in Ho Chi Minh City. The Foreign Office says it is not currently mandatory there, and that this may change or spread to other airports with little notice. Do not assume Da Nang requires it today.",
        ],
      },
      {
        title: "Money and medicine in your bag",
        paragraphs: [
          "Declare cash over 15 million dong, or over 5,000 US dollars or the same value in other currencies. That threshold is from the UK Foreign Office account of Vietnamese customs rules.",
          "Carry prescription medicine in hand luggage with a copy of the prescription. The Foreign Office says a total import value over 100 US dollars must be declared.",
          "Vapes and related products are banned. You cannot bring them in.",
        ],
      },
      {
        title: "In the terminal",
        paragraphs: [
          "Finish immigration and look at the stamp before you walk away. Collect your bags.",
          "Do not hand your passport to anyone as a deposit for a ride, a fine, or a rental.",
          "Be wary of a free bus to a hotel that you did not arrange. The Foreign Office warns that unarranged free transfers can be a scam.",
          "For a taxi, use a ride you arranged, a metered taxi from a larger firm, or an app the Foreign Office names: Grab or Xanh SM. Book the whole journey in the app, and be wary of someone who only claims to be from the company.",
        ],
      },
      {
        title: "A connection",
        paragraphs: [
          "If you want data before you leave the terminal, open the eSIM page. The gift is 5 GB a day for 10 days, and you still press send yourself. This page does not install anything.",
          "Inside Vietnam, authorities can block websites and can review what is on your devices. Do not assume every app from home will open.",
        ],
      },
      {
        title: "The address",
        paragraphs: [
          "Type your hotel in the box on this page before you sit down. The kit does not choose an address for you.",
          "The detailed airport sequence above is for a traveler using Da Nang as the arrival airport. It does not invent a fare or a drive time.",
        ],
      },
    ],
    addressTitle: "Address for the driver",
    addressHint: "Type it yourself. The box starts empty. The text stays on this phone.",
    addressPlaceholder: "Hotel name and street, in Vietnamese if you have it",
    addressShow: "Show this to the driver",
    addressEmpty: "Type an address first.",
    addressClose: "Close",
    checklistTitle: "Tick this on the phone",
    checklist: [
      "Passport stamp checked, passport back in your bag.",
      "Bags collected.",
      "eSIM requested only if you pressed send in WhatsApp.",
      "Hotel address ready in Vietnamese.",
      "Ride is one you arranged, a metered taxi, or Grab or Xanh SM booked in the app.",
      "113, 114 and 115 saved in the safety page.",
    ],
    progress: "{done} of {total}",
    storageNote: "Ticks stay on this phone. There is no account.",
  },
  money: {
    lead: "Convert for reference. This is not a rate you can pay with, and not a promise of what an ATM or a shop will give you.",
    amount: "Amount",
    from: "From",
    to: "To",
    swap: "Swap currencies",
    result: "Reference result",
    empty: "Enter an amount",
    reference: "For reference only. Not a bank rate and not for payment.",
    unavailable: "The rate service did not answer, and this phone has no saved rate yet.",
    saved: "Showing the last rate saved on this phone, not a new update.",
    refresh: "Try the rate again",
    sourceName: "Rates By Exchange Rate API",
    currencyName: { VND: "Vietnamese dong", USD: "US dollar", EUR: "Euro", RUB: "Russian ruble" },
    blocks: [
      {
        title: "Where to change money",
        paragraphs: [
          "The UK Foreign Office says you should only change money at official counters with a clear sign. Changing it elsewhere is illegal, and you risk losing the cash.",
        ],
      },
      {
        title: "Cash you must declare",
        paragraphs: [
          "Declare amounts over 15 million dong, or over 5,000 US dollars or the same value in another currency, when you carry them in or out.",
        ],
      },
    ],
  },
  phrases: {
    lead: "Tap a line. Hold the phone up so the other person can read the Vietnamese. This is a phrasebook, not a translator.",
    show: "Show large",
    close: "Close",
    honest: "These lines were written for this kit. They are not a machine translation of whatever you type.",
    items: [
      { vi: "Xin chào.", meaning: "Hello." },
      { vi: "Cảm ơn.", meaning: "Thank you." },
      { vi: "Bao nhiêu tiền?", meaning: "How much is it?" },
      { vi: "Đắt quá.", meaning: "That is too expensive." },
      { vi: "Làm ơn đưa tôi đến địa chỉ này.", meaning: "Please take me to this address." },
      { vi: "Dừng ở đây, làm ơn.", meaning: "Stop here, please." },
      { vi: "Tôi bị lạc.", meaning: "I am lost." },
      { vi: "Giúp tôi với.", meaning: "Please help me." },
      { vi: "Tôi cần bác sĩ.", meaning: "I need a doctor." },
      { vi: "Gọi cấp cứu giúp tôi.", meaning: "Please call an ambulance." },
      { vi: "Không cay, làm ơn.", meaning: "Not spicy, please." },
      { vi: "Tôi ăn chay.", meaning: "I eat vegetarian food." },
      { vi: "Nhà vệ sinh ở đâu?", meaning: "Where is the toilet?" },
      { vi: "Một chai nước suối.", meaning: "One bottle of water." },
      { vi: "Tôi không hiểu.", meaning: "I don’t understand." },
    ],
  },
  weatherPage: {
    lead: "Conditions for the area around the city you picked. Not a reading from your hotel door.",
    today: "Now",
    ahead: "The next days",
    rainTitle: "If it is wet",
    rain: {
      danang: [
        { title: "Marble Mountains caves", detail: "Covered caverns. A sound place when the beach is raining. Hours and tickets are not listed here." },
        { title: "Museum of Cham Sculpture", detail: "Indoor galleries. Go if the caves are enough walking." },
        { title: "Leave My Khe", detail: "The open beach is the wrong plan in heavy rain." },
      ],
      hoian: [
        { title: "Covered shophouses", detail: "The old town has roofs over the shops. This is a type of place, not a named store." },
        { title: "Skip the open riverbank", detail: "The Hoi An guide does not list hours. Use the covered shophouses." },
      ],
      hue: [
        { title: "Out of the courtyards", detail: "Open stone is slick in rain. The Hue guide does not list a ticket price." },
      ],
      phuquoc: [
        { title: "Off the open beach", detail: "Wait until the rain eases. No indoor hall is named, because one was not verified." },
      ],
    },
    unavailable: "Open-Meteo did not answer, and this phone has no saved reading for this city.",
    saved: "Showing the last reading saved on this phone. Not a new update.",
    refresh: "Try the forecast again",
  },
  safety: {
    lead: "National numbers. They are answered in Vietnamese. Call from any phone in Vietnam.",
    call: "Call",
    numbers: [
      { name: "Police", tel: "113", detail: "Also the number for a traffic accident." },
      { name: "Fire", tel: "114", detail: "Fire and fire rescue." },
      { name: "Ambulance", tel: "115", detail: "Medical emergency." },
      { name: "Search and rescue", tel: "112", detail: "National search and rescue. Not a substitute for 113, 114 or 115." },
      { name: "Child protection", tel: "111", detail: "Hotline published by the UK Foreign Office for child protection." },
    ],
    foot: "Numbers and the warnings below follow the UK Foreign, Commonwealth & Development Office Vietnam advice, read on 16 October 2026. If your passport is not British, also read your own government’s advice.",
    blocks: [
      {
        title: "Your bag and your passport",
        paragraphs: [
          "Theft and bag-snatching from motorbikes happen in crowded and tourist places. Hold the bag in front of you, on the side away from the traffic.",
          "Do not give your passport to a rental shop, a landlord, or a driver as a guarantee. Carry a printed and a digital copy of the photo page. The authorities accept a printed copy of the photo page and visa as photographic ID.",
        ],
      },
      {
        title: "Rides",
        paragraphs: [
          "Use a pre-arranged car, a metered taxi from a larger firm, or Grab or Xanh SM booked inside the app for the whole journey. Be wary of someone who only says they are from the company.",
          "Motorbike travel is much riskier than at home. Do not hire one unless you already ride well. A helmet is required for the driver and the passenger. To drive a car or motorbike, the Foreign Office tells British licence holders to carry the 1968 international driving permit and the UK licence, plus third-party insurance. Any alcohol is a drink-driving offence.",
        ],
      },
      {
        title: "Drinks, drugs, temples, photographs",
        paragraphs: [
          "Buy your own drink and keep it in sight. There have been methanol poisonings from alcohol sold even in licensed places. Do not buy liquor or cigarettes from street vendors.",
          "Drug penalties are severe, including for cannabis, and can include a long prison sentence. Vapes are banned.",
          "At religious sites, cover shoulders and knees. Do not photograph near military bases.",
        ],
      },
      {
        title: "Rain and storms",
        paragraphs: [
          "In central Vietnam the rainy season runs from October to December, and flooding can block roads. The eastern coast can also see tropical cyclones from May to November. Follow local instructions, including any order to leave.",
        ],
      },
    ],
    faq: [
      {
        q: "Which number do I call in an emergency?",
        a: "Police 113, fire 114, ambulance 115. Search and rescue is 112. The person who answers may speak Vietnamese. Show a phrase from this kit if you need to.",
      },
      {
        q: "Will GoVietStay replace the police?",
        a: "No. Message the WhatsApp number for ordinary local help. For danger, call 113, 114 or 115 first.",
      },
    ],
  },
  packing: {
    lead: "A suggested list for Vietnam, with the legal points marked from UK Foreign Office advice. Tick items as you pack. They stay on this phone.",
    progress: "{done} of {total}",
    storageNote: "Saved on this phone only. Clearing the browser data clears the ticks.",
    items: [
      { id: "passport", label: "Passport, with time left and blank pages", note: "For a British citizen passport: six months after arrival, and two blank pages." },
      { id: "copies", label: "Printed and digital copies of the photo page", note: "Carry them. Do not hand over the passport itself as a deposit." },
      { id: "stamp", label: "Plan to check the entry stamp before you leave the desk" },
      { id: "meds", label: "Prescription medicine in hand luggage, with the prescription", note: "Declare it if the import value is over 100 US dollars." },
      { id: "insurance", label: "Insurance details shared with someone at home" },
      { id: "rain", label: "A light rain layer", note: "Central Vietnam’s rainy season is October to December." },
      { id: "cover", label: "Clothes that cover shoulders and knees for temples" },
      { id: "cash", label: "A plan for declaring large amounts of cash", note: "Over 15 million dong, or over 5,000 US dollars." },
      { id: "vape", label: "No vapes in the bag", note: "Banned to buy or to bring in." },
      { id: "adapter", label: "A charger you already know works for your phone" },
    ],
  },
  danang: {
    kicker: "Da Nang",
    title: "The first day, without a tour.",
    lede: "Da Nang is a coastal city with an airport, a long beach, and a peninsula. This page is the practical order for someone who just arrived. It does not sell a tour and it does not invent prices or opening hours.",
    blocks: [
      {
        title: "Landing",
        paragraphs: [
          "Use the airport list before you take a car. Check the stamp, keep your passport, and decline a free transfer you did not book.",
          "Put your own hotel on the driver card. Dragon Bridge is only a sample address if you have nothing else to show.",
        ],
      },
      {
        title: "Getting around",
        paragraphs: [
          "Walk is realistic along the beach and the river. For a longer hop, use a ride you arranged, a metered taxi from a larger firm, or Grab or Xanh SM booked in the app.",
          "Hiring a motorbike is a poor first-day plan unless you already ride well. Helmets are required, and any alcohol is a drink-driving offence. No fare is quoted here because a reliable one was not checked.",
        ],
      },
      {
        title: "Money and a connection",
        paragraphs: [
          "Change cash only at an official counter. The money page has a reference rate and the name of the source.",
          "If you want data, the eSIM page explains the gift: 5 GB a day for 10 days, requested by you on WhatsApp. The kit cannot promise which phone can install it.",
          "Inside Vietnam, authorities can block websites and can review what is on your devices. Do not assume every app from home will open.",
        ],
      },
      {
        title: "If it rains",
        paragraphs: [
          "October to December is the rainy season in central Vietnam, and flooding can close roads. Today’s actual sky is on the weather page, from Open-Meteo.",
          "When it is wet, the Marble Mountains caves and the Museum of Cham Sculpture are indoor plans. My Khe beach is not. Hours and ticket prices are not shown, because they were not verified for this page.",
        ],
      },
      {
        title: "A place with a name",
        paragraphs: [
          "The Lady Buddha stands on the Son Tra peninsula. The Golden Bridge, held by stone hands, is at Ba Na Hills. Ngo Mon is in Hue, not here. The Japanese bridge is in Hoi An, not here.",
          "None of those names includes a ticket price or a show time. If a driver needs a famous address and you do not yet have the hotel, Dragon Bridge is easy to point at.",
        ],
      },
      {
        title: "What to skip",
        paragraphs: [
          "Do not leave your passport as a deposit. Do not photograph a military site. Cover shoulders and knees at a pagoda. Buy your own drink.",
          "For danger, call 113, 114 or 115 before you message anyone.",
        ],
      },
    ],
    faq: [
      {
        q: "What should I do in the first hour in Da Nang?",
        a: "Check your entry stamp, keep your passport, and take a ride you arranged or booked in Grab or Xanh SM. Show the hotel address in Vietnamese before the car moves.",
      },
      {
        q: "Where do I go if it rains?",
        a: "The Marble Mountains caves or the Museum of Cham Sculpture. This page does not list opening hours or prices.",
      },
      {
        q: "Is this a tour booking page?",
        a: "No. It is a guide for the day you arrive. Other GoVietStay pages exist, and they are linked at the bottom as other pages, not as the next required step.",
      },
    ],
    elsewhere: "Other pages on GoVietStay",
    links: [
      { href: "/en/travel-kit/arrival?city=danang", label: "Airport list" },
      { href: "/en/travel-kit/weather?city=danang", label: "Weather in Da Nang" },
      { href: "/en/travel-kit/hoi-an?city=hoian", label: "Hoi An guide" },
      { href: "/en/travel-kit/hue?city=hue", label: "Hue guide" },
      { href: "/en/travel-kit/phu-quoc?city=phuquoc", label: "Phu Quoc guide" },
      { href: "/travel/local-experiences/da-nang-night-bites-city-lights", label: "An evening food walk in Da Nang" },
      { href: "/travel/vietnam-local-help", label: "Local help, on the main site" },
    ],
  },
  hoian: {
    kicker: "Hoi An",
    title: "A walking town, once the car has stopped.",
    lede: "Hoi An Ancient Town is the river, the Japanese Covered Bridge, and the lantern boats in the photographs on this page. The order below is for someone who just arrived. It does not sell a tour, and it does not list a price or an opening hour.",
    blocks: [
      {
        title: "Getting here",
        paragraphs: [
          "The airport list in this kit is written for Da Nang airport. Use it if that is where you landed, then type your own hotel into the address box before you sit down.",
          "Show the Vietnamese address before the car moves. No fare is quoted, because a reliable one was not checked.",
        ],
      },
      {
        title: "On foot",
        paragraphs: [
          "The old town is a place you walk. The Japanese Covered Bridge is the landmark in the photograph. Your hotel, not the bridge, is what the driver should see.",
          "After dark the river has lantern boats. Hold your bag in front of you, on the side away from the traffic. The reasons are on the safety page.",
        ],
      },
      {
        title: "If it rains",
        paragraphs: [
          "October to December is the rainy season the UK Foreign Office describes for central Vietnam, and flooding can block roads. Today's sky is on the weather page, from Open-Meteo.",
          "Use the covered shophouses. The tailor workshop in the photograph is an indoor kind of place. Hours and tickets are not shown.",
        ],
      },
      {
        title: "Money and a connection",
        paragraphs: [
          "Change cash only at an official counter with a clear sign. The money page has a reference rate, the source name, and the time.",
          "The eSIM gift is 5 GB a day for 10 days. You request it on WhatsApp and you press send. Which phones can install it is confirmed in that chat, not here.",
          "Inside Vietnam, authorities can block websites and can review what is on your devices.",
        ],
      },
      {
        title: "What to skip",
        paragraphs: [
          "Do not leave your passport as a deposit. Cover shoulders and knees at a pagoda. Buy your own drink. Do not photograph a military site.",
          "For danger, call 113, 114 or 115 before you message anyone.",
        ],
      },
    ],
    faq: [
      {
        q: "What should I do in the first hour in Hoi An?",
        a: "If you landed in Da Nang, finish that airport list first. Then put your Hoi An hotel in the address box and show it before the car moves.",
      },
      {
        q: "Where do I go if it rains?",
        a: "The covered shophouses, or a tailor workshop like the one in the photograph. This page does not list opening hours.",
      },
      {
        q: "Is this a tour booking page?",
        a: "No. It is a guide for the day you arrive. Other GoVietStay pages are linked below as other pages.",
      },
    ],
    elsewhere: "Tools and the other cities",
    links: [
      { href: "/en/travel-kit/arrival?city=hoian", label: "Airport list" },
      { href: "/en/travel-kit/weather?city=hoian", label: "Weather in Hoi An" },
      { href: "/en/travel-kit/phrases?city=hoian", label: "A phrase to show" },
      { href: "/en/travel-kit/da-nang?city=danang", label: "Da Nang guide" },
      { href: "/en/travel-kit/hue?city=hue", label: "Hue guide" },
      { href: "/en/travel-kit/phu-quoc?city=phuquoc", label: "Phu Quoc guide" },
    ],
  },
  hue: {
    kicker: "Hue",
    title: "The gate is not your hotel.",
    lede: "Ngo Mon is the main gate of the Imperial City in Hue, and it is the photograph on this page. This is the practical order for a new arrival. No ticket price, no opening hour and no taxi fare is listed, because none of those was verified.",
    blocks: [
      {
        title: "The ride",
        paragraphs: [
          "The airport list in this kit is written for Da Nang airport. If Hue is where you are staying, put your own hotel in the address box before the car moves.",
          "Ngo Mon is a landmark you can point at. It is not a substitute for the hotel name. No drive time is given here.",
        ],
      },
      {
        title: "At the citadel",
        paragraphs: [
          "The red and gold gate in the photograph is Ngo Mon. Walk with your bag in front of you.",
          "Cover shoulders and knees if you enter a temple or a hall that asks for it. Do not hand over your passport as a deposit for a ticket or a rental.",
        ],
      },
      {
        title: "If it rains",
        paragraphs: [
          "October to December is the rainy season the UK Foreign Office describes for central Vietnam, and flooding can close roads. Today's conditions are on the weather page.",
          "Open stone courtyards are slick. Stay out of them, and off an open river path. This page does not name a hall with checked hours.",
        ],
      },
      {
        title: "Money and a connection",
        paragraphs: [
          "Change money only at an official counter. The reference rate is on the money page, with its source and time.",
          "For data, the eSIM page explains the gift. You still press send. Apps from home may not open: authorities can block sites and review what is on a device.",
        ],
      },
      {
        title: "What this page will not guess",
        paragraphs: [
          "The name of Hue's airport, a taxi fare, a ticket price and a show time are left out. They were not checked.",
          "For danger, call 113, 114 or 115 first.",
        ],
      },
    ],
    faq: [
      {
        q: "What should I do in the first hour if I am going to Hue?",
        a: "Keep your passport, check the stamp if you just passed immigration, and show your hotel address in Vietnamese before the car moves. Ngo Mon is only a landmark.",
      },
      {
        q: "Where do I go if it rains?",
        a: "Out of the open courtyards. This page does not list an indoor ticket or an opening hour.",
      },
      {
        q: "Is this a tour booking page?",
        a: "No. It is a guide for the day you arrive.",
      },
    ],
    elsewhere: "Tools and the other cities",
    links: [
      { href: "/en/travel-kit/arrival?city=hue", label: "Airport list" },
      { href: "/en/travel-kit/weather?city=hue", label: "Weather in Hue" },
      { href: "/en/travel-kit/safety?city=hue", label: "Emergency numbers" },
      { href: "/en/travel-kit/da-nang?city=danang", label: "Da Nang guide" },
      { href: "/en/travel-kit/hoi-an?city=hoian", label: "Hoi An guide" },
      { href: "/en/travel-kit/phu-quoc?city=phuquoc", label: "Phu Quoc guide" },
    ],
  },
  phuquoc: {
    kicker: "Phu Quoc",
    title: "The beach can wait.",
    lede: "Phu Quoc is an island. The photograph is pale sand and wooden boats. This page is the order for the first hours: a connection, an address, then the beach if the sky allows. It does not invent a fare, a boat price, or a shop hour.",
    blocks: [
      {
        title: "Before you leave the terminal",
        paragraphs: [
          "Request the eSIM while the airport network is easy to use. You press send yourself. Phone compatibility is confirmed in the WhatsApp chat.",
          "This page does not name an airport code. That detail was not checked. Put your own hotel in the address box and show it before the car moves.",
        ],
      },
      {
        title: "After dark",
        paragraphs: [
          "Roads outside the towns are dark. Agree the address before the car moves, and book the whole journey in the app if you use Grab or Xanh SM.",
          "Hold your bag in front of you. Do not give your passport to a driver or a rental shop.",
        ],
      },
      {
        title: "If it rains",
        paragraphs: [
          "Leave the open beach until the rain eases. The photograph is that beach, and it is the wrong plan in heavy rain.",
          "No indoor hall is named here, because one was not verified. Today's sky is on the weather page.",
        ],
      },
      {
        title: "Money and the rules that travel with you",
        paragraphs: [
          "Change cash only at an official counter. Declare large amounts: over 15 million dong, or over 5,000 US dollars.",
          "The east-coast cyclone season in the UK advice is May to November. The central-Vietnam flood season is October to December. Phu Quoc is an island in the south, so do not treat the central-coast flood note as a forecast for this beach. Use the weather page for today.",
          "Drug penalties are severe. Vapes are banned. Buy your own drink.",
        ],
      },
      {
        title: "What to do if something is wrong",
        paragraphs: [
          "Call 113, 114 or 115. The person who answers may speak Vietnamese. The phrasebook has a line for an ambulance.",
          "WhatsApp is for ordinary local help, after you are safe.",
        ],
      },
    ],
    faq: [
      {
        q: "What should I do in the first hour on Phu Quoc?",
        a: "Ask for the eSIM only if you press send, then show your hotel address before the car moves. The beach is not the first task.",
      },
      {
        q: "Where do I go if it rains?",
        a: "Off the open beach. This page does not name a substitute hall.",
      },
      {
        q: "Is this a tour booking page?",
        a: "No. Longer pages exist on the main site and are linked below. They are not the next required step.",
      },
    ],
    elsewhere: "Tools, other cities, and the main site",
    links: [
      { href: "/en/travel-kit/esim?city=phuquoc", label: "eSIM request" },
      { href: "/en/travel-kit/weather?city=phuquoc", label: "Weather on Phu Quoc" },
      { href: "/en/travel-kit/safety?city=phuquoc", label: "Emergency numbers" },
      { href: "/en/travel-kit/da-nang?city=danang", label: "Da Nang guide" },
      { href: "/travel/phu-quoc-travel-guide", label: "A longer Phu Quoc page on the main site" },
      { href: "/travel/best-time-to-visit-phu-quoc", label: "When to visit, on the main site" },
    ],
  },
  homeFaqTitle: "Questions people ask first",
  homeFaq: [
    {
      q: "What does this kit do for me in the first hour?",
      a: "It tells you the next useful step for the city and the sky: the airport list, a phrase to show, or a roof if it is raining. Then it keeps emergency numbers, a phrasebook, a packing list and a reference exchange rate on the phone.",
    },
    {
      q: "Is the weather and the exchange rate live?",
      a: "Yes, when the source answers. Weather is from Open-Meteo and shows the observation time. Rates are from Exchange Rate API, updated on their side about once a day, and marked for reference only. If a source fails, the page says so instead of inventing a number.",
    },
    {
      q: "How do I get the free eSIM?",
      a: "Open the eSIM page and tap WhatsApp. You send the message. The offer described here is 5 GB a day for 10 days. Phone compatibility is confirmed in the chat.",
    },
  ],
  otherCities: "Pick the city in the header. The guide, the weather and the rain plan follow that choice.",
};
