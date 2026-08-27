export type PhilippinesSeoPage = {
  slug:string;
  type:"product"|"private"|"transfer"|"guide"|"arrival";
  destination:string;
  priceKey:string|null;
  title:string;
  h1:string;
  desc:string;
  hook:string;
  bullets:string[];
  faqs:[string,string][];
  officialUrl:string|null;
  updated:string;
};

export const philippinesSeoPages: PhilippinesSeoPage[] = [
  {
    "slug": "vietnam-visa-free-for-filipinos",
    "type": "guide",
    "destination": "Philippines → Vietnam",
    "priceKey": null,
    "title": "Vietnam Visa-Free for Filipinos 2026 | 21 Days | GoVietStay",
    "h1": "Filipino passport holders can visit Vietnam visa-free for up to 21 days",
    "desc": "For an ordinary Philippine passport, Vietnam's official visa-exemption list currently states a 21-day visa-free stay. Recheck the rule before flying, especially for longer stays or unusual itineraries.",
    "hook": "One less form to worry about before your Vietnam trip.",
    "bullets": [
      "Ordinary Philippine passport: up to 21 days visa-free under the current official list.",
      "For a stay beyond the exemption, check the appropriate Vietnam visa route before travel.",
      "Immigration rules can change, so use the official source before your flight."
    ],
    "faqs": [
      [
        "Do Filipinos need a visa for a 5-day Vietnam trip?",
        "Under the current official exemption list, ordinary Philippine passports can stay visa-free for up to 21 days, subject to entry conditions."
      ],
      [
        "What if I stay longer than 21 days?",
        "Check the correct visa option before travel; do not assume the visa-free period can simply be extended on arrival."
      ],
      [
        "Does this also cover Phu Quoc?",
        "Phu Quoc has an additional special visa policy for eligible foreign passport holders, but most Filipino leisure trips are already within the ordinary 21-day exemption."
      ],
      [
        "Where should I verify the rule?",
        "Use an official Vietnam Ministry of Foreign Affairs or Vietnamese embassy source before departure."
      ]
    ],
    "officialUrl": "https://vnembassy-roma.mofa.gov.vn/vi/web/guest/tin-chi-tiet/chi-tiet/viet-nam-39-s-visa-exemption-list-57163-172.html",
    "updated": "2026-08-27"
  },
  {
    "slug": "manila-to-danang",
    "type": "arrival",
    "destination": "Manila → Da Nang",
    "priceKey": null,
    "title": "Manila to Da Nang 2026 | Direct Flight + Arrival Guide | GoVietStay",
    "h1": "Manila to Da Nang: fly in, check in, and keep Day 1 easy",
    "desc": "Da Nang has direct air links with Manila. Once you land, the easiest plan is airport transfer, hotel check-in, food, beach or Han River — then start the big tours the next day.",
    "hook": "Your vacation should not start with a 6 AM alarm after a flight.",
    "bullets": [
      "Direct Manila–Da Nang services operate; always check your airline's live schedule.",
      "Da Nang airport is close to the main tourist zones compared with many resort cities.",
      "Book the transfer first; decide the bigger tours after you know your hotel and arrival time."
    ],
    "faqs": [
      [
        "Are there direct Manila–Da Nang flights?",
        "Yes, direct services operate on the route. Frequencies vary, so check the airline for your exact date."
      ],
      [
        "Should I visit Ba Na Hills on arrival day?",
        "Usually no. A light first day is more comfortable after an international flight."
      ],
      [
        "Can GoVietStay pick us up at the airport?",
        "Yes. Send the flight number, hotel, number of guests and luggage."
      ],
      [
        "Can we go straight to Hoi An?",
        "Yes, a private transfer from Da Nang airport to Hoi An can be arranged."
      ]
    ],
    "officialUrl": "https://danangairport.vn/news-detail-page/expanding-international-connectivity",
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-free-travel",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Da Nang DIY Travel Guide for Filipinos 2026 | GoVietStay",
    "h1": "Da Nang DIY: book the easy parts yourself, get local help for the annoying parts",
    "desc": "Filipino travelers are already good at booking flights and hotels online. GoVietStay focuses on the parts that become inconvenient on the ground: transfers, day trips, private cars and last-minute changes.",
    "hook": "You do not need another package tour. You need a local team when the trip gets complicated.",
    "bullets": [
      "Stay by My Khe Beach for resort energy, or closer to the river/city for easier urban access.",
      "Use one major activity per day instead of stacking every attraction.",
      "Hoi An is best from late afternoon into the lantern-lit evening."
    ],
    "faqs": [
      [
        "How many days in Da Nang?",
        "Four to five days is a comfortable first trip if you want Ba Na Hills and Hoi An without rushing."
      ],
      [
        "Do I need a tour every day?",
        "No. Beach, cafes and city time are part of the trip too."
      ],
      [
        "Is Grab enough?",
        "For city rides, often yes. Private car becomes useful for families, luggage and longer routes."
      ],
      [
        "How do I contact GoVietStay?",
        "WhatsApp is the main quick-contact channel."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-4d3n-itinerary",
    "type": "guide",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Da Nang 4 Days 3 Nights Itinerary for Filipinos 2026 | GoVietStay",
    "h1": "Da Nang 4D3N: enough highlights without turning your holiday into a race",
    "desc": "A practical flow is a light arrival day, one Ba Na Hills day, one Hoi An afternoon/evening, then a flexible final day based on the flight.",
    "hook": "The goal is to remember the trip, not just remember being inside a van.",
    "bullets": [
      "Keep Ba Na Hills as one full-day activity.",
      "Do Hoi An after lunch so you reach the old town near sunset.",
      "If your flight home is late, use the last day for a flexible private route plus airport drop-off."
    ],
    "faqs": [
      [
        "Can we add Hue?",
        "Yes, but 4D3N becomes much tighter. For a first trip, Da Nang + Ba Na + Hoi An is often enough."
      ],
      [
        "Can Ba Na and Hoi An be in one day?",
        "Possible, but not ideal if you want a relaxed trip."
      ],
      [
        "What if our return flight is late?",
        "A check-out day private route can turn dead time into a useful half-day."
      ],
      [
        "Can this itinerary be private?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-first-trip",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "First Time in Da Nang from the Philippines 2026 | GoVietStay",
    "h1": "First time in Da Nang? Do less on Day 1 and enjoy more from Day 2",
    "desc": "After landing: hotel, local SIM/eSIM, a good meal, beach or river walk. Save Ba Na Hills, Hoi An and longer drives for later.",
    "hook": "The easiest upgrade to your itinerary is simply not overplanning the first day.",
    "bullets": [
      "Keep some VND cash even if you use cards.",
      "Use the first evening to understand your hotel area.",
      "Confirm tour pickup times the night before, not while half asleep at 6 AM."
    ],
    "faqs": [
      [
        "What should we do on the first evening?",
        "My Khe Beach, Han River, Dragon Bridge area or a relaxed dinner are easy choices."
      ],
      [
        "Is Da Nang safe for DIY travelers?",
        "Use normal travel precautions, licensed transport and clearly confirmed bookings."
      ],
      [
        "Do locals speak English?",
        "Tourism areas are easier, but communication varies. Having WhatsApp support helps when details get confusing."
      ],
      [
        "Can GoVietStay help after we already arrive?",
        "Yes, subject to availability."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "ba-na-hills-private-flex",
    "type": "product",
    "destination": "Da Nang",
    "priceKey": "bana",
    "title": "Ba Na Hills Flexible Day Trip 2026 | Filipino Travelers | GoVietStay",
    "h1": "Ba Na Hills without feeling trapped by a giant tour bus",
    "desc": "A flexible Ba Na Hills option for independent travelers: clear inclusions, hotel pickup arrangement and the option to ask for private transport or a private day.",
    "hook": "Golden Bridge photos are better when your whole day is not built around waiting for 40 other people.",
    "bullets": [
      "Trial direct price is a real 'from' price, not a zero-price click bait.",
      "Private/flexible transport can be quoted for couples, families and barkadas.",
      "Ticket, buffet and guide options must be confirmed in the booking."
    ],
    "faqs": [
      [
        "Is the from-price valid every day?",
        "No. It applies to selected dates/configurations and must be reconfirmed before payment."
      ],
      [
        "Does the price include buffet?",
        "Only if your booking confirmation says so."
      ],
      [
        "Can we leave later than the standard early tours?",
        "A private/flexible setup gives more control, subject to park operating hours."
      ],
      [
        "Is an English guide included?",
        "Only when explicitly confirmed."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "hoi-an-coconut-lantern",
    "type": "product",
    "destination": "Hoi An",
    "priceKey": "hoian",
    "title": "Hoi An + Coconut Forest + Lantern Evening 2026 | GoVietStay Philippines",
    "h1": "Sleep in, start after lunch, and reach Hoi An when the lanterns actually light up",
    "desc": "This is one of the best-fit products for Filipino couples and families: coconut basket boat in the afternoon, then Hoi An Old Town into the evening.",
    "hook": "A good Hoi An day should get prettier as the day goes on.",
    "bullets": [
      "No need to do the aggressive basket-boat spinning unless you actually want it.",
      "Late-afternoon Hoi An is more comfortable than walking the old town under the hottest sun.",
      "Private upgrades are available for families and small groups."
    ],
    "faqs": [
      [
        "Do we have to spin in the basket boat?",
        "No. Ask for a normal, relaxed ride."
      ],
      [
        "Does the trial price include dinner?",
        "Only if stated in the final booking confirmation."
      ],
      [
        "Can we do a private car?",
        "Yes."
      ],
      [
        "What time do we get back to Da Nang?",
        "It depends on dinner, lantern boat and whether your route is private or shared."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "hoi-an-private-evening",
    "type": "private",
    "destination": "Hoi An",
    "priceKey": null,
    "title": "Private Hoi An Evening from Da Nang 2026 | Couples & Families | GoVietStay",
    "h1": "Private Hoi An evening: take your time, eat where you want, leave when you are ready",
    "desc": "For couples, families or barkadas who do not want a fixed group itinerary. Choose coconut forest, old town, dinner, lantern boat or simply more time for photos.",
    "hook": "Private does not have to mean luxury. Sometimes it just means nobody else controls your clock.",
    "bullets": [
      "No strangers in the confirmed private vehicle/tour component.",
      "Choose the stops that actually matter to your group.",
      "Restaurant and photo-stop suggestions can be adjusted to your hotel and interests."
    ],
    "faqs": [
      [
        "Can we skip Coconut Forest?",
        "Yes, for a custom private plan."
      ],
      [
        "Can we spend longer in the Old Town?",
        "Yes, subject to the agreed car/guide duration."
      ],
      [
        "Is the guide private too?",
        "Only if a private guide is included in your confirmation."
      ],
      [
        "Can couples book this?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "cham-island-tour",
    "type": "product",
    "destination": "Da Nang · Hoi An",
    "priceKey": "cham",
    "title": "Cham Island Day Tour 2026 | Snorkeling from Da Nang/Hoi An | GoVietStay Philippines",
    "h1": "Cham Island: a proper sea day — but only when the sea agrees",
    "desc": "Speedboat, island time and snorkeling. GoVietStay checks actual operating conditions instead of pretending every date is guaranteed.",
    "hook": "For island tours, the weather app is not the final authority — real sea conditions matter.",
    "bullets": [
      "Trip operation depends on actual sea conditions and local authority/operator decisions.",
      "Tell us the age of young children before confirming a speedboat day.",
      "Private speedboat or more flexible options can be checked for larger groups."
    ],
    "faqs": [
      [
        "Does rain automatically cancel the tour?",
        "Not necessarily. Sea conditions and safety decisions matter more."
      ],
      [
        "Is it suitable for toddlers?",
        "Age, health and sea conditions should be checked before booking."
      ],
      [
        "What does the from-price include?",
        "The exact transfer, lunch and equipment inclusions are confirmed for your date."
      ],
      [
        "Can we depart from Hoi An?",
        "Pickup depends on your hotel location."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "hue-day-trip",
    "type": "product",
    "destination": "Hue",
    "priceKey": "hue",
    "title": "Hue Day Trip from Da Nang 2026 | Private & Flexible | GoVietStay Philippines",
    "h1": "Hue from Da Nang: a longer day, so comfort matters more than collecting stops",
    "desc": "Imperial history, heritage and the Hai Van route. Couples and families can request a private car or a lighter schedule instead of a packed bus day.",
    "hook": "The best Hue itinerary is the one your parents and kids can still enjoy by 4 PM.",
    "bullets": [
      "Hue is a longer drive than Hoi An.",
      "Private transport is especially useful for older family members.",
      "English guide availability should be confirmed before booking."
    ],
    "faqs": [
      [
        "How long is the day?",
        "It is a full-day route and generally longer than Hoi An."
      ],
      [
        "Can seniors join?",
        "Yes, but a lighter private itinerary may be more comfortable."
      ],
      [
        "Can we book car only?",
        "Yes, ask for a private-car quote."
      ],
      [
        "Does it include Hai Van Pass?",
        "Route details depend on the confirmed itinerary and traffic."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "my-son-sanctuary",
    "type": "guide",
    "destination": "Hoi An · My Son",
    "priceKey": null,
    "title": "My Son Sanctuary from Da Nang or Hoi An 2026 | GoVietStay Philippines",
    "h1": "My Son Sanctuary: the better choice when you want culture, not another theme park",
    "desc": "A UNESCO Cham heritage site that works well as a half-day or combined private route from Hoi An.",
    "hook": "If your trip needs one historical stop, make it a real one.",
    "bullets": [
      "Best for culture/history-minded couples and families.",
      "Morning can be cooler; private timing is easier to control.",
      "Can combine with Hoi An depending on pace and starting point."
    ],
    "faqs": [
      [
        "Is My Son near Hoi An?",
        "It is outside Hoi An and requires road travel."
      ],
      [
        "Is a guide useful?",
        "Yes, especially if you want the history to make sense rather than just taking photos."
      ],
      [
        "Can we do private?",
        "Yes."
      ],
      [
        "Is it good with young kids?",
        "It depends on heat tolerance and interest; a shorter route may work better."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-airport-transfer",
    "type": "transfer",
    "destination": "Da Nang",
    "priceKey": "dadTransfer",
    "title": "Da Nang Airport Transfer for Filipino Travelers 2026 | GoVietStay",
    "h1": "Da Nang airport to hotel: send the flight, hotel and luggage — done",
    "desc": "A simple private transfer for DIY travelers. The website shows a traffic 'from' price for central Da Nang; Hoi An and special vehicle needs are quoted separately.",
    "hook": "After a flight, the cheapest ride is not useful if your suitcases do not fit.",
    "bullets": [
      "Private vehicle for your booking.",
      "Vehicle size is matched to guests + luggage.",
      "Hoi An, late-night or large-vehicle trips are priced separately."
    ],
    "faqs": [
      [
        "Is the from-price for Hoi An too?",
        "No. It is a central Da Nang traffic price; Hoi An is farther and is quoted separately."
      ],
      [
        "Does the driver speak English?",
        "Not guaranteed; GoVietStay can support via WhatsApp."
      ],
      [
        "What if the flight is delayed?",
        "Provide the flight number and keep WhatsApp reachable."
      ],
      [
        "Do we need to pay a deposit?",
        "Transfer payment terms are confirmed with the booking."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-private-car",
    "type": "private",
    "destination": "Da Nang · Hoi An · Hue",
    "priceKey": null,
    "title": "Private Car in Da Nang 2026 | Hoi An, Ba Na Hills, Hue | GoVietStay Philippines",
    "h1": "Private car in Da Nang: useful when your family has its own clock",
    "desc": "Choose private transport when you have children, parents, luggage or simply want to stop without asking a bus full of strangers.",
    "hook": "The value of a private car is time, not status.",
    "bullets": [
      "Price depends on vehicle, hours and route.",
      "Attraction tickets and guides are separate unless confirmed.",
      "Extra stops should be agreed before departure to avoid surprise repricing."
    ],
    "faqs": [
      [
        "Can we hire a car just to Hoi An?",
        "Yes."
      ],
      [
        "Does private car mean English-speaking driver?",
        "Not necessarily; language support can be handled separately."
      ],
      [
        "Can we stop for food or photos?",
        "Yes, when agreed in the route."
      ],
      [
        "Can we book a van for a barkada?",
        "Yes, based on group size and luggage."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-private-tour",
    "type": "private",
    "destination": "Da Nang · Hoi An · Hue",
    "priceKey": null,
    "title": "Private Tours in Da Nang 2026 | Families, Couples & Barkadas | GoVietStay",
    "h1": "Private tour: your people, your pace, fewer useless stops",
    "desc": "Send the date, number of guests, children's ages, hotel and what your group actually enjoys. GoVietStay builds around that instead of forcing everyone into the same template.",
    "hook": "Private is the product for travelers who value their holiday time more than a bus timetable.",
    "bullets": [
      "No strangers in the confirmed private component.",
      "Choose English guide, car-only or a custom combination.",
      "Tickets and third-party services are itemized/confirmed before payment."
    ],
    "faqs": [
      [
        "Is private much more expensive?",
        "The total is usually higher, but for families or barkadas the per-person difference can be reasonable."
      ],
      [
        "Can we start later?",
        "Often yes, subject to attraction hours."
      ],
      [
        "Can we remove shopping stops?",
        "Yes, make it part of the agreed itinerary."
      ],
      [
        "Can you plan around seniors?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-family-travel",
    "type": "guide",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Da Nang with Kids for Filipino Families 2026 | GoVietStay",
    "h1": "Da Nang with kids: one big activity a day is usually enough",
    "desc": "Ba Na Hills, Hoi An and the beach all work for families — but naps, heat, height rules and travel time matter more than adults expect.",
    "hook": "A family itinerary should protect everyone's mood, not maximize the number of attractions.",
    "bullets": [
      "Height can change child ticket pricing at attractions.",
      "Sea tours need an age/sea-condition check.",
      "Private transport makes nap time and meal stops easier."
    ],
    "faqs": [
      [
        "What is easiest with younger kids?",
        "Beach/resort time and a lighter Hoi An day can be easier than stacking long full-day tours."
      ],
      [
        "Is Ba Na Hills good for kids?",
        "Yes, but it is large and involves substantial walking."
      ],
      [
        "Is Cham Island okay for a toddler?",
        "Assess age, health and sea conditions first."
      ],
      [
        "Can you make a family-private itinerary?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-couple-trip",
    "type": "guide",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Da Nang Couple Trip 2026 | Romantic DIY Itinerary from the Philippines | GoVietStay",
    "h1": "Da Nang for couples: less rushing, more sunset, food and actual time together",
    "desc": "Use the beach for slow mornings, Ba Na for one big day, and Hoi An for your best evening.",
    "hook": "A couple trip does not improve just because you squeeze in one more attraction.",
    "bullets": [
      "Hoi An late afternoon/evening is the strongest couple experience.",
      "Private car makes restaurant and photo timing easier.",
      "A resort morning can be worth more than another 7 AM pickup."
    ],
    "faqs": [
      [
        "Where is the best evening?",
        "Hoi An is the obvious romantic choice, while Da Nang riverfront is easier for a casual night."
      ],
      [
        "Can we book private just for two?",
        "Yes."
      ],
      [
        "Should we stay in Hoi An too?",
        "Optional; Da Nang works well as one base for a short trip."
      ],
      [
        "Can you suggest proposal/anniversary-friendly routes?",
        "Yes, without promising staged services that are not confirmed."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-barkada-trip",
    "type": "guide",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Da Nang Barkada Trip 2026 | Private Van & Flexible Itinerary | GoVietStay",
    "h1": "Barkada trip to Da Nang: split a private van, not your whole day",
    "desc": "For groups of friends, private transport can be surprisingly practical once the cost is shared — and nobody waits for random strangers.",
    "hook": "The bigger the barkada, the more useful private transport becomes.",
    "bullets": [
      "One van, one group, one WhatsApp thread.",
      "Choose photo stops, food and departure times together.",
      "Private-car pricing is often easier to compare as a group total."
    ],
    "faqs": [
      [
        "How many people for a van?",
        "It depends on luggage and vehicle availability; send the exact group size."
      ],
      [
        "Can we go to Ba Na + Hoi An in one day?",
        "Possible but rushed; we normally recommend splitting them."
      ],
      [
        "Can we add nightlife?",
        "Transport can be planned around a later return if confirmed."
      ],
      [
        "Can everyone pay separately?",
        "Payment arrangements should be agreed before confirmation."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "last-day-hoi-an-airport",
    "type": "private",
    "destination": "Da Nang · Hoi An",
    "priceKey": null,
    "title": "Last-Day Hoi An + Airport Drop-Off 2026 | Late Flight from Da Nang | GoVietStay",
    "h1": "Late flight home? Turn check-out day into a private half-day instead of sitting in a lobby",
    "desc": "A useful Filipino FIT product: hotel check-out, luggage stays with the private vehicle, Hoi An/food/spa-style stops as agreed, then airport drop-off.",
    "hook": "Your final day can be a travel day and still feel like vacation.",
    "bullets": [
      "Best when your flight leaves late afternoon or evening.",
      "Route depends on your hotel, luggage and flight time.",
      "Spa/restaurant costs are only included when written into the booking."
    ],
    "faqs": [
      [
        "Can luggage stay in the car?",
        "Yes, when the vehicle setup and luggage volume are confirmed."
      ],
      [
        "Can we add Hoi An?",
        "Yes, if timing works safely with the flight."
      ],
      [
        "Can we add a massage?",
        "Possible by arrangement; treatment is separate unless included."
      ],
      [
        "How early do we reach the airport?",
        "The plan builds in a safe airport buffer based on your flight."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-food-guide",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Da Nang Food Guide for Filipino Travelers 2026 | GoVietStay",
    "h1": "What to eat in Da Nang: start with your neighborhood, not a viral list",
    "desc": "Seafood, banh xeo, mi quang, Vietnamese coffee and casual local meals are easy to explore when recommendations are matched to where you actually stay.",
    "hook": "The best restaurant is not 'best' if it takes 45 minutes from your hotel.",
    "bullets": [
      "For seafood, confirm whether pricing is per plate, 100g or kilogram.",
      "Use recent reviews, not only old viral videos.",
      "Tell GoVietStay about allergies or strong dislikes when planning a private day."
    ],
    "faqs": [
      [
        "Is Da Nang food spicy?",
        "Many dishes are adjustable, but sauces and chili can be served separately."
      ],
      [
        "Can you recommend Filipino-friendly options?",
        "We can suggest approachable local dishes based on your hotel area."
      ],
      [
        "Should we tip?",
        "Vietnam does not have one universal mandatory tipping rule; check the service context."
      ],
      [
        "Can you plan food stops in a private tour?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-massage-guide",
    "type": "guide",
    "destination": "Da Nang",
    "priceKey": null,
    "title": "Da Nang Massage & Spa Guide 2026 | Filipino Travelers | GoVietStay",
    "h1": "Da Nang massage: check hygiene, real reviews and treatment time before chasing the lowest price",
    "desc": "A spa can be excellent value, but compare the actual treatment duration, environment, transport and extra fees — not just the headline number.",
    "hook": "Cheap is only sulit when the service is actually good.",
    "bullets": [
      "Confirm net treatment time.",
      "Read recent reviews and check real photos.",
      "Ask whether transport, service charge or tip expectations are included."
    ],
    "faqs": [
      [
        "Do spas require reservations?",
        "Popular times and groups should reserve."
      ],
      [
        "Can you recommend something near our hotel?",
        "Yes, based on location and current options."
      ],
      [
        "Is tipping required?",
        "Policies and expectations differ; ask before the treatment if unsure."
      ],
      [
        "Can GoVietStay arrange transport?",
        "For selected arrangements, yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-free-travel",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Phu Quoc DIY Travel Guide for Filipinos 2026 | GoVietStay",
    "h1": "Phu Quoc DIY: pick the resort area first, then choose your island days",
    "desc": "Phu Quoc is larger than it looks on a map. South, central/Long Beach and north-island resorts create completely different transport patterns.",
    "hook": "A cheap hotel can become expensive if every activity is on the opposite side of the island.",
    "bullets": [
      "South is convenient for Hon Thom and Sunset Town.",
      "North is convenient for VinWonders and Safari.",
      "Keep at least one proper resort/rest day instead of touring every morning."
    ],
    "faqs": [
      [
        "How many days in Phu Quoc?",
        "4D3N or 5D4N works well for many first-time travelers."
      ],
      [
        "Should we stay north or south?",
        "Choose based on the attractions you care about, not only room photos."
      ],
      [
        "Do we need a private car?",
        "Useful for cross-island family travel and custom days."
      ],
      [
        "Can GoVietStay arrange island tours?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-3-islands",
    "type": "product",
    "destination": "Phu Quoc",
    "priceKey": "pq3",
    "title": "Phu Quoc 3 Islands Tour 2026 | Speedboat + Snorkeling | GoVietStay Philippines",
    "h1": "Phu Quoc 3 islands: the straightforward sea day for DIY travelers",
    "desc": "A competitive trial direct rate for selected configurations. Compare hotel pickup, lunch, speedboat and snorkeling inclusions — not just the cheapest number.",
    "hook": "We do not need to beat Klook by ₱100 if the local support is worth more than that.",
    "bullets": [
      "Trial rate is designed to stay close to major OTA entry pricing.",
      "Sea conditions can change the stop order.",
      "Child price and hotel pickup zone must be confirmed."
    ],
    "faqs": [
      [
        "Is the from-price always available?",
        "No, it depends on date, operator and pickup configuration."
      ],
      [
        "Does it include hotel pickup?",
        "Only for the zones/package stated in your booking."
      ],
      [
        "English guide included?",
        "Only if confirmed."
      ],
      [
        "Can we make it private?",
        "Ask for a private speedboat/boat quote."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-4-islands-hon-thom",
    "type": "product",
    "destination": "Phu Quoc",
    "priceKey": "pq4",
    "title": "Phu Quoc 4 Islands + Hon Thom Cable Car 2026 | GoVietStay Philippines",
    "h1": "4 islands + Hon Thom: one big activity day when you want sea + cable car together",
    "desc": "This is the higher-value Phu Quoc day. GoVietStay's trial direct rate aims to be competitive with OTA pricing while keeping inclusions clear.",
    "hook": "Do it once, do it properly, then go back to the resort the next morning.",
    "bullets": [
      "Cable-car inclusion must be written in the confirmation.",
      "Sea Walking and optional water activities are usually extra.",
      "The day is long; families with very young kids should consider pace."
    ],
    "faqs": [
      [
        "Is cable car included?",
        "Only when explicitly confirmed in your package."
      ],
      [
        "Is Sea Walking included?",
        "Usually not; treat it as an optional extra unless stated otherwise."
      ],
      [
        "Is it good for toddlers?",
        "The itinerary can be long, so check age and family pace first."
      ],
      [
        "Why is the rate competitive?",
        "Direct local acquisition can reduce OTA commission, but final pricing still depends on actual date/cost."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-airport-transfer",
    "type": "transfer",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Phu Quoc Airport Transfer 2026 | Private Resort Transfer | GoVietStay Philippines",
    "h1": "Phu Quoc airport transfer: send the exact resort name before asking for price",
    "desc": "The island is large, so one flat airport-transfer price would be misleading. GoVietStay quotes by resort zone, vehicle and luggage.",
    "hook": "On Phu Quoc, hotel location matters almost as much as passenger count.",
    "bullets": [
      "South, central and north resort distances vary significantly.",
      "Late flights and larger vehicles should be booked earlier.",
      "Driver language is not guaranteed; WhatsApp support remains available."
    ],
    "faqs": [
      [
        "Why no universal price?",
        "Because the distance from the airport varies heavily by resort zone."
      ],
      [
        "Can you pick up a family with lots of luggage?",
        "Yes, with the right vehicle."
      ],
      [
        "Does the driver wait for flight delays?",
        "Provide the flight number and stay reachable."
      ],
      [
        "Can we stop for food?",
        "Ask when confirming the route."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-private-car",
    "type": "private",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Private Car in Phu Quoc 2026 | Flexible North/South Island | GoVietStay Philippines",
    "h1": "Private car in Phu Quoc: group the stops by area so you spend less holiday inside a car",
    "desc": "Send your wishlist and hotel. GoVietStay rearranges stops by geography before quoting the car.",
    "hook": "A flexible itinerary is useless if you spend half the day crossing the island back and forth.",
    "bullets": [
      "Quote by vehicle, duration and route.",
      "Do not force north + south into one day unless your group truly wants it.",
      "Tickets are separate unless included."
    ],
    "faqs": [
      [
        "Can we book half-day?",
        "Ask with the exact route and timing."
      ],
      [
        "Does the car include attraction tickets?",
        "Not by default."
      ],
      [
        "Can we stay for sunset?",
        "Yes, plan the return time into the quote."
      ],
      [
        "Can a barkada book one van?",
        "Yes, based on passenger and luggage count."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "phu-quoc-family-travel",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Phu Quoc with Kids for Filipino Families 2026 | GoVietStay",
    "h1": "Phu Quoc with kids: resort time counts as an activity",
    "desc": "Choose two or three major outings — Safari, VinWonders, Hon Thom or an island day — and leave room for the pool and beach.",
    "hook": "You paid for the resort. Let the kids actually use it.",
    "bullets": [
      "North-island hotels are convenient for Safari/VinWonders.",
      "South-island hotels are easier for Hon Thom/Sunset Town.",
      "Speedboat trips need a child-age and sea-condition check."
    ],
    "faqs": [
      [
        "What is easiest with small kids?",
        "Resort time plus Safari/VinWonders can be easier than multiple speedboat days."
      ],
      [
        "Can children do the 3-island tour?",
        "It depends on age, sea conditions and comfort on speedboats."
      ],
      [
        "Where should a family stay?",
        "Match the resort zone to the attractions you value most."
      ],
      [
        "Can you arrange private family transport?",
        "Yes."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "vinwonders-phu-quoc",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "VinWonders Phu Quoc Guide 2026 | Filipino Families | GoVietStay",
    "h1": "VinWonders Phu Quoc: make it the main activity, not a side stop",
    "desc": "The park can take most of a day. North-island hotels are easiest; from south Phu Quoc, account for much more road time.",
    "hook": "A theme park is not a 'quick stop' when you are traveling with kids.",
    "bullets": [
      "Plan most of a day if your family enjoys rides and attractions.",
      "Compare ticket-only versus ticket + transfer.",
      "Avoid stacking too many other stops around it."
    ],
    "faqs": [
      [
        "Can we combine Safari and VinWonders?",
        "Yes, but it can be a very full day, especially for younger children."
      ],
      [
        "Can GoVietStay arrange tickets?",
        "Ask for current availability and official ticket options."
      ],
      [
        "Do we need private transport?",
        "It depends on your hotel zone and family size."
      ],
      [
        "Is it suitable for toddlers?",
        "There are family areas, but age/height restrictions apply to specific rides."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "vinpearl-safari-phu-quoc",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Vinpearl Safari Phu Quoc Guide 2026 | Family Travel | GoVietStay Philippines",
    "h1": "Vinpearl Safari: often a better family day than another speedboat",
    "desc": "A strong choice for young children, grandparents or anyone who wants a land-based day on Phu Quoc.",
    "hook": "Not every memorable island day needs to be on the water.",
    "bullets": [
      "Convenient for north-island resorts.",
      "Heat and walking still matter; plan breaks.",
      "Can combine with VinWonders, but it may be a long day."
    ],
    "faqs": [
      [
        "How long should we allow?",
        "Usually several hours; the exact pace depends on children and interest."
      ],
      [
        "Is it good for toddlers?",
        "Many families enjoy it, but plan for heat, naps and walking."
      ],
      [
        "Can you arrange transport?",
        "Yes, based on resort area."
      ],
      [
        "Should we do Safari and VinWonders together?",
        "Only if your family enjoys a full schedule."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "sunset-town-phu-quoc",
    "type": "guide",
    "destination": "Phu Quoc",
    "priceKey": null,
    "title": "Sunset Town Phu Quoc Guide 2026 | Filipino Travelers | GoVietStay",
    "h1": "Sunset Town is an afternoon-to-night plan, not a noon photo mission",
    "desc": "Go later for better light, dinner energy, Kiss Bridge and evening entertainment. South-island stays make it much easier.",
    "hook": "The clue is literally in the name: go for the sunset.",
    "bullets": [
      "Arrive in the afternoon rather than during peak midday heat.",
      "North-island guests should plan the long return.",
      "Can combine with Hon Thom, but that creates a long full day."
    ],
    "faqs": [
      [
        "What time should we go?",
        "Late afternoon is usually more pleasant; actual sunset and show times vary."
      ],
      [
        "Does Sunset Town have an entrance fee?",
        "Individual attractions/events can have separate ticket rules."
      ],
      [
        "Can we book private transport?",
        "Yes."
      ],
      [
        "Can we stay for a night show?",
        "Yes, arrange the return vehicle around the show schedule."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  },
  {
    "slug": "da-nang-vs-phu-quoc",
    "type": "guide",
    "destination": "Da Nang vs Phu Quoc",
    "priceKey": null,
    "title": "Da Nang or Phu Quoc for Filipinos 2026 | Which Vietnam Trip Fits You? | GoVietStay",
    "h1": "Da Nang or Phu Quoc? Choose by travel style, not by whichever reel you saw last",
    "desc": "Da Nang is stronger for city + culture + Hoi An + day trips. Phu Quoc is stronger for resort + islands + family attractions.",
    "hook": "They are both beach destinations, but they are not the same holiday.",
    "bullets": [
      "Choose Da Nang if you want more different day trips and Hoi An.",
      "Choose Phu Quoc if resort time and island activities are the priority.",
      "Flight options, weather and hotel value should be part of the decision."
    ],
    "faqs": [
      [
        "Which is better for couples?",
        "Da Nang/Hoi An is excellent for variety and romantic evenings; Phu Quoc is stronger for resort-focused beach time."
      ],
      [
        "Which is better with kids?",
        "Phu Quoc has strong resort/Safari/VinWonders options; Da Nang offers more varied cultural day trips."
      ],
      [
        "Which is cheaper?",
        "It depends heavily on flights and hotels, not just tour prices."
      ],
      [
        "Can we do both in one trip?",
        "Yes, but for a short holiday the extra domestic travel can reduce relaxation."
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-27"
  }
];

export const getPhilippinesPage=(slug:string)=>philippinesSeoPages.find(p=>p.slug===slug);

export const getPhilippinesRelated=(page:PhilippinesSeoPage)=>[
  ...philippinesSeoPages.filter(p=>p.slug!==page.slug && p.destination.split(" · ")[0]===page.destination.split(" · ")[0]),
  ...philippinesSeoPages.filter(p=>p.slug!==page.slug && p.type===page.type),
].filter((p,i,a)=>a.findIndex(x=>x.slug===p.slug)===i).slice(0,4);
