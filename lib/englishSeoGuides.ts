export type EnglishSeoGuide = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  eyebrow: string;
  summary: string;
  quick: string[];
  sections: { title: string; body: string[] }[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  primaryHref: string;
  primaryLabel: string;
  updated: string;
};

const RAW_GUIDES = [
  {
    "slug": "da-nang-travel-guide",
    "title": "Da Nang Travel Guide 2026 | Things to Do, Stay & Day Trips | GoVietStay",
    "h1": "Da Nang Travel Guide 2026: plan Central Vietnam without rushing",
    "description": "Practical Da Nang travel planning for first-time visitors: where to stay, how many days, transport, Ba Na Hills, Hoi An, Hue, Cham Island and local support.",
    "keywords": [
      "Da Nang travel guide",
      "Da Nang Vietnam",
      "visit Da Nang",
      "Central Vietnam travel"
    ],
    "eyebrow": "DA NANG TRAVEL GUIDE · 2026",
    "summary": "Three to five nights is a strong first-trip range. Use Da Nang as the base, give major day trips their own time, and keep sea activities flexible around real conditions.",
    "quick": [
      "3–5 nights works well",
      "Use Da Nang as a base",
      "One major trip per day",
      "Keep sea days flexible"
    ],
    "sections": [
      {
        "title": "Why Da Nang is a strong base",
        "body": [
          "Da Nang combines an international airport, beaches and a modern city with easy access to Hoi An, Ba Na Hills and Hue.",
          "That lets you experience Central Vietnam without changing hotels every night."
        ]
      },
      {
        "title": "How many days to stay",
        "body": [
          "Three nights covers the essentials; four or five nights gives you room for Hoi An, Ba Na Hills and a slower city or sea day.",
          "The best itinerary protects time at the places you actually care about."
        ]
      },
      {
        "title": "Use different transport for different days",
        "body": [
          "Grab is useful for short city rides, joined tours can be efficient for fixed itineraries, and private cars help on multi-stop or family days.",
          "You do not need one transport model for the whole trip."
        ]
      },
      {
        "title": "How GoVietStay helps",
        "body": [
          "GoVietStay supports tours, transfers, private cars, tickets and WhatsApp trip planning in Da Nang, Hoi An, Hue and Phu Quoc.",
          "Send dates, guest count and hotel before booking so current pickup and operating conditions can be checked."
        ]
      }
    ],
    "checklist": [
      "3–5 nights works well",
      "Use Da Nang as a base",
      "One major trip per day",
      "Keep sea days flexible",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "How many days do I need in Da Nang?",
        "a": "Three to five nights is a useful range for most first-time visitors."
      },
      {
        "q": "Is Da Nang a good base for Hoi An?",
        "a": "Yes. Hoi An works very well as an afternoon-to-evening trip from Da Nang."
      },
      {
        "q": "Do I need a private car?",
        "a": "Not every day. It is most useful for multi-stop, family or cross-city routes."
      },
      {
        "q": "Can I combine Da Nang and Phu Quoc?",
        "a": "Yes by flight, but they are separate destinations and short trips can feel rushed."
      }
    ],
    "related": [
      "things-to-do-in-da-nang",
      "da-nang-itinerary-4-days",
      "where-to-stay-in-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "things-to-do-in-da-nang",
    "title": "Best Things to Do in Da Nang 2026 | Local Planning Guide | GoVietStay",
    "h1": "Things to do in Da Nang: choose experiences, not just a checklist",
    "description": "Discover the best things to do in Da Nang: My Khe Beach, Dragon Bridge, Ba Na Hills, Hoi An, Marble Mountains, Hue and Cham Island.",
    "keywords": [
      "things to do in Da Nang",
      "Da Nang attractions",
      "best things to do Da Nang"
    ],
    "eyebrow": "THINGS TO DO IN DA NANG · 2026",
    "summary": "A balanced trip mixes city and beach time with one mountain day, one cultural evening and an optional sea or heritage day.",
    "quick": [
      "My Khe + city",
      "Ba Na Hills",
      "Hoi An evening",
      "Cham Island or Hue"
    ],
    "sections": [
      {
        "title": "Start with Da Nang itself",
        "body": [
          "My Khe Beach, Son Tra Peninsula, Dragon Bridge, Marble Mountains and the Han River fit naturally around arrival and lighter days.",
          "These stops are flexible and reduce unnecessary transfers."
        ]
      },
      {
        "title": "Give Ba Na Hills real time",
        "body": [
          "The Golden Bridge is only one part of a large mountain complex with cable cars and multiple zones.",
          "Treat it as a major day instead of a quick photo stop."
        ]
      },
      {
        "title": "See Hoi An into the evening",
        "body": [
          "A practical route is Coconut Forest first and Hoi An Ancient Town through sunset and lantern time.",
          "If basket boats are not your style, skip them and keep more Old Town free time."
        ]
      },
      {
        "title": "Choose one extra based on your interests",
        "body": [
          "Pick Cham Island for sea and snorkeling, Hue for history, or Hai Van Pass for scenery.",
          "Short trips do not need every famous attraction."
        ]
      }
    ],
    "checklist": [
      "My Khe + city",
      "Ba Na Hills",
      "Hoi An evening",
      "Cham Island or Hue",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "What are the must-do attractions in Da Nang?",
        "a": "My Khe Beach, Ba Na Hills/Golden Bridge, Hoi An and the river/bridge area are common first-trip priorities."
      },
      {
        "q": "Is Hoi An a day trip from Da Nang?",
        "a": "Yes, especially from afternoon through evening."
      },
      {
        "q": "Is Cham Island worth it?",
        "a": "It is a strong choice if you genuinely want a sea and snorkeling day."
      },
      {
        "q": "What should I do on departure day?",
        "a": "Keep it flexible with cafés, shopping, massage, beach or a short city stop."
      }
    ],
    "related": [
      "da-nang-travel-guide",
      "ba-na-hills-golden-bridge-guide",
      "hoi-an-day-trip-from-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "da-nang-itinerary-4-days",
    "title": "Da Nang 4 Day Itinerary 2026 | Hoi An, Ba Na Hills & Beach | GoVietStay",
    "h1": "Da Nang 4-day itinerary: the highlights without four rushed days",
    "description": "A practical four-day Da Nang itinerary with Ba Na Hills, Hoi An, city time, beach time and an optional sea day.",
    "keywords": [
      "Da Nang itinerary 4 days",
      "Da Nang 4 day itinerary",
      "Da Nang Hoi An itinerary"
    ],
    "eyebrow": "4 DAYS IN DA NANG · 2026",
    "summary": "Day 1 arrival + city, Day 2 Ba Na Hills, Day 3 Hoi An afternoon/evening, Day 4 flexible city time + airport is a reliable first-trip structure.",
    "quick": [
      "D1 arrival + city",
      "D2 Ba Na Hills",
      "D3 Hoi An",
      "D4 flexible + airport"
    ],
    "sections": [
      {
        "title": "Day 1 — keep arrival simple",
        "body": [
          "Flight delays, immigration and baggage can move your schedule.",
          "Use the remaining time for beach, river, food or massage instead of a major prepaid attraction."
        ]
      },
      {
        "title": "Day 2 — Ba Na Hills",
        "body": [
          "Give the mountain enough time for cable cars, Golden Bridge and the main zones.",
          "Keep the evening easy after returning to Da Nang."
        ]
      },
      {
        "title": "Day 3 — Hoi An",
        "body": [
          "Leave after lunch, optionally include Coconut Forest, then continue into Hoi An for sunset, dinner and lanterns.",
          "This is more efficient than making two separate trips south."
        ]
      },
      {
        "title": "Day 4 — protect the flight",
        "body": [
          "Use cafés, shopping, massage or a short city stop and keep a generous airport buffer.",
          "Do not put a long-distance attraction right before departure unless timing is very safe."
        ]
      }
    ],
    "checklist": [
      "D1 arrival + city",
      "D2 Ba Na Hills",
      "D3 Hoi An",
      "D4 flexible + airport",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Can I see Da Nang and Hoi An in four days?",
        "a": "Yes. Da Nang works well as the base."
      },
      {
        "q": "Can I add Cham Island?",
        "a": "Yes, but reduce another activity or add a night to avoid rushing."
      },
      {
        "q": "Should I sleep in Hoi An?",
        "a": "Optional. A Da Nang base is simpler for a short trip."
      },
      {
        "q": "Should Ba Na Hills be on departure day?",
        "a": "Usually no; a flexible final day is safer."
      }
    ],
    "related": [
      "da-nang-travel-guide",
      "hoi-an-day-trip-from-da-nang",
      "cham-island-snorkeling-guide"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "best-time-to-visit-da-nang",
    "title": "Best Time to Visit Da Nang 2026 | Weather & Trip Planning | GoVietStay",
    "h1": "Best time to visit Da Nang: plan around the experience you care about",
    "description": "Understand Da Nang weather, mountain conditions, rainy periods and sea-trip flexibility before building your itinerary.",
    "keywords": [
      "best time to visit Da Nang",
      "Da Nang weather",
      "Da Nang rainy season"
    ],
    "eyebrow": "WHEN TO VISIT DA NANG · 2026",
    "summary": "There is no single perfect month for every traveller. Beach, mountain and marine activities respond differently to weather.",
    "quick": [
      "Match weather to priorities",
      "Mountain weather differs",
      "Sea trips need flexibility",
      "Re-check close to travel"
    ],
    "sections": [
      {
        "title": "Plan for your priority",
        "body": [
          "A beach holiday, a Golden Bridge photo trip and a food-focused city break do not require the same weather.",
          "Protect the activity that matters most and keep flexible alternatives."
        ]
      },
      {
        "title": "Ba Na Hills has mountain weather",
        "body": [
          "Cloud, wind and visibility can differ significantly from Da Nang city.",
          "No operator can guarantee a clear Golden Bridge."
        ]
      },
      {
        "title": "Cham Island is more weather-sensitive",
        "body": [
          "Marine operation depends on wind, waves and local authority decisions, not only rain.",
          "Keep another possible day if the island is a priority."
        ]
      },
      {
        "title": "Use city experiences as flexible blocks",
        "body": [
          "Food, shopping, cafés and massage can move around weather-sensitive activities.",
          "Current local confirmation is often more useful than a forecast saved weeks earlier."
        ]
      }
    ],
    "checklist": [
      "Match weather to priorities",
      "Mountain weather differs",
      "Sea trips need flexibility",
      "Re-check close to travel",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "What is the best season for Da Nang?",
        "a": "Drier periods are generally easier for beach travel, but current conditions vary."
      },
      {
        "q": "Does rain cancel Ba Na Hills?",
        "a": "Not automatically, although visibility and some operations can be affected."
      },
      {
        "q": "Can Cham Island be cancelled without rain?",
        "a": "Yes. Wind and waves can stop marine operations."
      },
      {
        "q": "Should I cancel because of a long-range rainy forecast?",
        "a": "Not based on one forecast alone; reassess closer to travel."
      }
    ],
    "related": [
      "da-nang-travel-guide",
      "cham-island-snorkeling-guide",
      "things-to-do-in-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "where-to-stay-in-da-nang",
    "title": "Where to Stay in Da Nang 2026 | My Khe, Han River & An Thuong | GoVietStay",
    "h1": "Where to stay in Da Nang: choose how you want your evenings to feel",
    "description": "Compare My Khe Beach, Han River/Hai Chau and An Thuong for a first Da Nang trip.",
    "keywords": [
      "where to stay in Da Nang",
      "best area to stay Da Nang",
      "My Khe Beach hotels"
    ],
    "eyebrow": "WHERE TO STAY IN DA NANG · 2026",
    "summary": "My Khe suits beach-first travellers, Hai Chau suits city-centre access, and An Thuong suits cafés and walkability.",
    "quick": [
      "My Khe: beach",
      "Hai Chau: city",
      "An Thuong: cafés",
      "Day trips work from all"
    ],
    "sections": [
      {
        "title": "My Khe Beach",
        "body": [
          "Good for beach mornings, sea views and resort convenience.",
          "The city centre remains a short ride away."
        ]
      },
      {
        "title": "Han River and Hai Chau",
        "body": [
          "Useful for Dragon Bridge, markets, restaurants and an urban evening.",
          "Airport and day-trip access remains practical."
        ]
      },
      {
        "title": "An Thuong",
        "body": [
          "A compact international area with cafés, restaurants and beach access.",
          "Check the exact street if quiet nights matter."
        ]
      },
      {
        "title": "Da Nang or Hoi An?",
        "body": [
          "Choose Hoi An if Old Town atmosphere is central to the trip.",
          "Choose Da Nang for beach, airport convenience and a broader day-trip base."
        ]
      }
    ],
    "checklist": [
      "My Khe: beach",
      "Hai Chau: city",
      "An Thuong: cafés",
      "Day trips work from all",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Is My Khe the best place to stay?",
        "a": "It is one of the easiest choices for beach-first travellers."
      },
      {
        "q": "Is An Thuong walkable?",
        "a": "Yes, with many cafés and restaurants in a compact area."
      },
      {
        "q": "Do tours pick up from every hotel?",
        "a": "Pickup conditions vary; confirm your exact hotel."
      },
      {
        "q": "Should I stay in Hoi An instead?",
        "a": "Choose based on whether Old Town atmosphere or beach/airport convenience matters more."
      }
    ],
    "related": [
      "da-nang-travel-guide",
      "da-nang-airport-transfer",
      "da-nang-family-travel"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "da-nang-airport-transfer",
    "title": "Da Nang Airport Transfer 2026 | DAD to Hotel & Hoi An | GoVietStay",
    "h1": "Da Nang airport transfer: send the flight, guests, luggage and hotel",
    "description": "Plan Da Nang Airport transfer to My Khe, city hotels or Hoi An with practical luggage and flight-delay advice.",
    "keywords": [
      "Da Nang airport transfer",
      "Da Nang airport pickup",
      "Da Nang airport to Hoi An"
    ],
    "eyebrow": "DA NANG AIRPORT TRANSFER · 2026",
    "summary": "A reliable pickup needs flight number, passenger count, large luggage count and hotel. Vehicle size should be based on bags as well as seats.",
    "quick": [
      "Flight number",
      "Large bags",
      "Exact hotel",
      "Working WhatsApp"
    ],
    "sections": [
      {
        "title": "Share the flight number",
        "body": [
          "Arrival times can move and baggage time varies.",
          "A flight number is more useful than only writing an expected landing time."
        ]
      },
      {
        "title": "Vehicle size depends on luggage too",
        "body": [
          "Two travellers with four large suitcases may need more space than four travellers with cabin bags.",
          "Mention strollers and oversized items."
        ]
      },
      {
        "title": "DAD to Hoi An can be direct",
        "body": [
          "If the first hotel is in Hoi An, you can travel there directly.",
          "Late arrivals are usually better kept simple."
        ]
      },
      {
        "title": "Transfer can be separate from tours",
        "body": [
          "You do not need a full package to arrange airport transport.",
          "Confirm vehicle, meeting point and price before travel."
        ]
      }
    ],
    "checklist": [
      "Flight number",
      "Large bags",
      "Exact hotel",
      "Working WhatsApp",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Can I book only an airport transfer?",
        "a": "Yes."
      },
      {
        "q": "Can I go directly from DAD to Hoi An?",
        "a": "Yes, provide the exact hotel."
      },
      {
        "q": "What if my flight is delayed?",
        "a": "Share the flight number and confirm waiting/contact conditions."
      },
      {
        "q": "How do I choose vehicle size?",
        "a": "Send people plus luggage and any oversized items."
      }
    ],
    "related": [
      "where-to-stay-in-da-nang",
      "da-nang-private-car",
      "da-nang-to-hoi-an"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "da-nang-private-car",
    "title": "Da Nang Private Car 2026 | Hoi An, Ba Na Hills & Hue | GoVietStay",
    "h1": "Da Nang private car: use flexibility where it actually saves time",
    "description": "Compare a private car with Grab and joined tours for Hoi An, Ba Na Hills, Hue and multi-stop days.",
    "keywords": [
      "Da Nang private car",
      "Da Nang car with driver",
      "Da Nang to Hoi An private car"
    ],
    "eyebrow": "PRIVATE CAR · DA NANG 2026",
    "summary": "Use Grab for simple city rides. Use a private car when the route has multiple stops, luggage, family needs or custom timing.",
    "quick": [
      "Grab for city rides",
      "Private for multi-stop",
      "Driver ≠ guide",
      "Confirm route + waiting"
    ],
    "sections": [
      {
        "title": "When private transport makes sense",
        "body": [
          "Cross-city days and multiple stops create more value from one fixed vehicle.",
          "Families and groups also benefit from predictable pickup and storage space."
        ]
      },
      {
        "title": "When Grab is simpler",
        "body": [
          "For short city rides, ride-hailing is usually easier.",
          "Joined tours can also be more economical when their schedule fits."
        ]
      },
      {
        "title": "Driver and guide are different services",
        "body": [
          "Do not assume a driver provides a guided historical tour or a specific language.",
          "Request a guide separately if needed."
        ]
      },
      {
        "title": "Send a clear route for a useful quote",
        "body": [
          "Provide date, guests, hotel, stops, approximate timing and luggage if relevant.",
          "A clear route avoids vague pricing."
        ]
      }
    ],
    "checklist": [
      "Grab for city rides",
      "Private for multi-stop",
      "Driver ≠ guide",
      "Confirm route + waiting",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Private car or Grab?",
        "a": "Private car is stronger for multi-stop/cross-city routes; Grab is simpler in the city."
      },
      {
        "q": "Does a private car include a guide?",
        "a": "Not automatically."
      },
      {
        "q": "Can I book Da Nang to Hoi An?",
        "a": "Yes, subject to current availability."
      },
      {
        "q": "Can luggage stay in the car?",
        "a": "Discuss luggage and stop conditions first."
      }
    ],
    "related": [
      "da-nang-airport-transfer",
      "da-nang-to-hoi-an",
      "hue-day-trip-from-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "ba-na-hills-golden-bridge-guide",
    "title": "Ba Na Hills & Golden Bridge 2026 | Da Nang Planning Guide | GoVietStay",
    "h1": "Ba Na Hills and Golden Bridge: plan the full mountain day",
    "description": "Plan Ba Na Hills with Golden Bridge, cable cars, French Village, mountain weather, inclusions and family tips.",
    "keywords": [
      "Ba Na Hills",
      "Golden Bridge Da Nang",
      "Ba Na Hills tour",
      "Golden Bridge Vietnam"
    ],
    "eyebrow": "BA NA HILLS · GOLDEN BRIDGE · 2026",
    "summary": "The Golden Bridge is the headline, but Ba Na Hills is a large mountain complex. Compare inclusions, timing and weather expectations—not just the lowest headline price.",
    "quick": [
      "Full mountain day",
      "Weather changes",
      "Check inclusions",
      "Comfortable shoes"
    ],
    "sections": [
      {
        "title": "The Golden Bridge is only one part",
        "body": [
          "The visit also includes cable cars and movement through multiple mountain areas.",
          "Give the attraction enough time instead of planning only one photo stop."
        ]
      },
      {
        "title": "Morning and later starts feel different",
        "body": [
          "Morning gives more daylight; a later start can create a different atmosphere.",
          "Neither option can guarantee low crowds."
        ]
      },
      {
        "title": "Mountain weather changes quickly",
        "body": [
          "Cloud, wind and visibility can differ from Da Nang city.",
          "Bring comfortable shoes and a light layer."
        ]
      },
      {
        "title": "Use the guide, then the live tour page",
        "body": [
          "GoVietStay already has a commercial Ba Na Hills page for current products.",
          "This planning page explains the decision; the tour page handles current inclusions and booking."
        ]
      }
    ],
    "checklist": [
      "Full mountain day",
      "Weather changes",
      "Check inclusions",
      "Comfortable shoes",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "How long do I need at Ba Na Hills?",
        "a": "A full day is the most comfortable first-time plan."
      },
      {
        "q": "Is afternoon always less crowded?",
        "a": "No. Crowd levels change and cannot be guaranteed."
      },
      {
        "q": "Is cable car included?",
        "a": "Confirm the exact product you are buying."
      },
      {
        "q": "Can weather affect the Golden Bridge view?",
        "a": "Yes, mountain visibility can change quickly."
      }
    ],
    "related": [
      "things-to-do-in-da-nang",
      "da-nang-itinerary-4-days",
      "best-time-to-visit-da-nang"
    ],
    "primaryHref": "/tours/ba-na-hills",
    "primaryLabel": "See GoVietStay Ba Na Hills tour"
  },
  {
    "slug": "hoi-an-day-trip-from-da-nang",
    "title": "Hoi An Day Trip from Da Nang 2026 | Basket Boat & Lanterns | GoVietStay",
    "h1": "Hoi An from Da Nang: afternoon to evening is the strongest route",
    "description": "Plan Hoi An from Da Nang with Cam Thanh Coconut Forest, basket boat, Ancient Town, dinner, lanterns and return timing.",
    "keywords": [
      "Hoi An day trip from Da Nang",
      "Da Nang to Hoi An tour",
      "Hoi An basket boat"
    ],
    "eyebrow": "HOI AN FROM DA NANG · 2026",
    "summary": "A practical route is Da Nang → Coconut Forest/basket boat → Hoi An Ancient Town → sunset, dinner and lanterns → Da Nang.",
    "quick": [
      "Leave after lunch",
      "Basket boat first",
      "Old Town at sunset",
      "Return after lanterns"
    ],
    "sections": [
      {
        "title": "Why afternoon-to-evening works",
        "body": [
          "Hoi An changes character after sunset, so this timing shows both sides of the town.",
          "It also pairs naturally with Cam Thanh Coconut Forest first."
        ]
      },
      {
        "title": "Basket boat intensity is optional",
        "body": [
          "Spinning and energetic performance are not mandatory.",
          "Ask for a calm ride if that fits your group better."
        ]
      },
      {
        "title": "Protect free time in the Old Town",
        "body": [
          "Hoi An is better with room for cafés, shops, photos and the river.",
          "Ask how much free time your chosen tour includes."
        ]
      },
      {
        "title": "Use the planning guide then the live product",
        "body": [
          "GoVietStay has a dedicated Hoi An + Coconut Forest commercial page.",
          "Use that page for current product details and booking."
        ]
      }
    ],
    "checklist": [
      "Leave after lunch",
      "Basket boat first",
      "Old Town at sunset",
      "Return after lanterns",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Can I return to Da Nang the same night?",
        "a": "Yes."
      },
      {
        "q": "Is basket boat mandatory?",
        "a": "No."
      },
      {
        "q": "Is Hoi An worth staying until night?",
        "a": "Yes if you want the lantern atmosphere."
      },
      {
        "q": "Can families do this route?",
        "a": "Yes, with adjusted walking and return time."
      }
    ],
    "related": [
      "da-nang-itinerary-4-days",
      "da-nang-to-hoi-an",
      "da-nang-private-car"
    ],
    "primaryHref": "/tours/hoi-an-coconut-forest",
    "primaryLabel": "See Hoi An + Coconut Forest tour"
  },
  {
    "slug": "cham-island-snorkeling-guide",
    "title": "Cham Island Snorkeling 2026 | Da Nang & Hoi An Guide | GoVietStay",
    "h1": "Cham Island snorkeling: choose it because you want a real sea day",
    "description": "Plan Cham Island with speedboat, snorkeling, marine conditions, lunch, what to pack and family suitability.",
    "keywords": [
      "Cham Island snorkeling",
      "Cham Island tour",
      "Cu Lao Cham",
      "Da Nang snorkeling"
    ],
    "eyebrow": "CHAM ISLAND · SNORKELING · 2026",
    "summary": "Cham Island is a speedboat and snorkeling day. It is more weather-sensitive than city tours, so keep the date flexible.",
    "quick": [
      "Weather-sensitive",
      "Speedboat + snorkeling",
      "Pack for sun/water",
      "Confirm meal + pickup"
    ],
    "sections": [
      {
        "title": "Who should choose Cham Island",
        "body": [
          "Choose it if your group genuinely wants a sea and snorkeling experience.",
          "Severe motion sickness or dislike of boats can make another trip a better fit."
        ]
      },
      {
        "title": "Marine conditions control the day",
        "body": [
          "Wind, waves and authority decisions matter beyond whether a rain icon appears.",
          "Keep another possible date if the island is a priority."
        ]
      },
      {
        "title": "What to pack",
        "body": [
          "Bring swimwear, sun protection, waterproof phone protection and dry clothes.",
          "Follow boat safety instructions and keep valuables minimal."
        ]
      },
      {
        "title": "Current GoVietStay positioning",
        "body": [
          "GoVietStay's standard English option is currently positioned from 950,000 VND per adult, subject to date and booking conditions.",
          "Private options can be checked separately."
        ]
      }
    ],
    "checklist": [
      "Weather-sensitive",
      "Speedboat + snorkeling",
      "Pack for sun/water",
      "Confirm meal + pickup",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Can weather cancel the tour?",
        "a": "Yes."
      },
      {
        "q": "Do I need to be a strong swimmer?",
        "a": "Follow operator safety rules and be realistic about your comfort in the water."
      },
      {
        "q": "Is lunch included?",
        "a": "Confirm the exact product before booking."
      },
      {
        "q": "What is GoVietStay's current public price?",
        "a": "The English option is positioned from 950,000 VND per adult, subject to conditions."
      }
    ],
    "related": [
      "best-time-to-visit-da-nang",
      "da-nang-itinerary-4-days",
      "things-to-do-in-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "hue-day-trip-from-da-nang",
    "title": "Hue Day Trip from Da Nang 2026 | Imperial City & Hai Van Pass | GoVietStay",
    "h1": "Hue from Da Nang: make it a heritage day, not a rushed photo stop",
    "description": "Plan a Hue day trip from Da Nang with Imperial City, heritage context, Hai Van Pass routing and private vs joined options.",
    "keywords": [
      "Hue day trip from Da Nang",
      "Da Nang to Hue tour",
      "Hue Imperial City"
    ],
    "eyebrow": "HUE FROM DA NANG · 2026",
    "summary": "Hue is a longer day than Hoi An. Use a joined tour for a structured heritage day or private transport if custom stops and pacing matter more.",
    "quick": [
      "Full heritage day",
      "Longer than Hoi An",
      "Guide adds context",
      "Route may include Hai Van"
    ],
    "sections": [
      {
        "title": "Give Hue a full day",
        "body": [
          "The Imperial City and other heritage stops need real visit time.",
          "Do not combine Hue with another major southbound destination on the same day."
        ]
      },
      {
        "title": "A guide can add real value",
        "body": [
          "Hue is history-heavy, so context matters.",
          "Private transport without a guide may still suit travellers focused on scenery and timing."
        ]
      },
      {
        "title": "Hai Van Pass options",
        "body": [
          "A scenic stop may be possible depending on route and timing.",
          "The fastest route and the most scenic route are not always the same."
        ]
      },
      {
        "title": "Joined vs private",
        "body": [
          "Joined tours are structured and cost-efficient; private arrangements suit custom pacing.",
          "Confirm tickets, meal and guide inclusion before booking."
        ]
      }
    ],
    "checklist": [
      "Full heritage day",
      "Longer than Hoi An",
      "Guide adds context",
      "Route may include Hai Van",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Can Hue be a day trip from Da Nang?",
        "a": "Yes, but expect a long full day."
      },
      {
        "q": "Do I need a guide?",
        "a": "Not mandatory, but useful for historical context."
      },
      {
        "q": "Can I stop at Hai Van Pass?",
        "a": "Often possible depending on the service and route."
      },
      {
        "q": "Private car or joined tour?",
        "a": "Choose based on flexibility versus cost and structure."
      }
    ],
    "related": [
      "da-nang-private-car",
      "da-nang-travel-guide",
      "things-to-do-in-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "vietnam-evisa-guide",
    "title": "Vietnam e-Visa 2026 | Official Application & Travel Guide | GoVietStay",
    "h1": "Vietnam e-Visa: use the official Immigration portal first",
    "description": "A practical Vietnam e-Visa guide covering the official portal, maximum validity, entry type and Da Nang/Phu Quoc travel planning.",
    "keywords": [
      "Vietnam eVisa",
      "Vietnam e visa 2026",
      "Vietnam eVisa official",
      "Vietnam entry requirements"
    ],
    "eyebrow": "VIETNAM E-VISA · OFFICIAL SOURCE FIRST",
    "summary": "Vietnam Immigration's official e-Visa portal currently states a maximum validity of 90 days, with single or multiple entry. Verify all changing rules on the official portal.",
    "quick": [
      "Use evisa.gov.vn",
      "Max 90 days",
      "Single or multiple entry",
      "Check approved dates"
    ],
    "sections": [
      {
        "title": "Start with the official portal",
        "body": [
          "Search results can contain agencies and ads that look official.",
          "Use Vietnam Immigration's evisa.gov.vn as the primary source."
        ]
      },
      {
        "title": "Read your approved visa carefully",
        "body": [
          "Check valid-from, valid-to and single/multiple entry status.",
          "Passport details should match the travel document you use."
        ]
      },
      {
        "title": "Entry airports",
        "body": [
          "Official Vietnam tourism guidance lists Da Nang and Phu Quoc international airports among e-Visa entry points.",
          "Re-check the current border-gate list before travel."
        ]
      },
      {
        "title": "GoVietStay's role",
        "body": [
          "GoVietStay can support travel planning and separate visa-assistance services, but immigration decisions are made by Vietnamese authorities.",
          "No travel company should replace the official approval document."
        ]
      }
    ],
    "checklist": [
      "Use evisa.gov.vn",
      "Max 90 days",
      "Single or multiple entry",
      "Check approved dates",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "How long can a Vietnam e-Visa be valid?",
        "a": "The official portal currently states a maximum of 90 days."
      },
      {
        "q": "Can it be multiple entry?",
        "a": "Yes."
      },
      {
        "q": "What is the official e-Visa site?",
        "a": "Use https://evisa.gov.vn/."
      },
      {
        "q": "Can GoVietStay guarantee visa approval?",
        "a": "No. Approval is controlled by Vietnamese authorities."
      }
    ],
    "related": [
      "da-nang-airport-transfer",
      "da-nang-travel-guide",
      "phu-quoc-travel-guide"
    ],
    "primaryHref": "/visa",
    "primaryLabel": "See GoVietStay visa assistance"
  },
  {
    "slug": "phu-quoc-travel-guide",
    "title": "Phu Quoc Travel Guide 2026 | Beaches, Island Trips & Transport | GoVietStay",
    "h1": "Phu Quoc Travel Guide 2026: choose your island zone before your hotel",
    "description": "Plan Phu Quoc with where to stay, airport transfer, north vs south island, snorkeling, family attractions and realistic day planning.",
    "keywords": [
      "Phu Quoc travel guide",
      "Phu Quoc things to do",
      "Phu Quoc itinerary",
      "Phu Quoc tours"
    ],
    "eyebrow": "PHU QUOC TRAVEL GUIDE · 2026",
    "summary": "Phu Quoc is a separate destination, not a quick add-on to Da Nang. Choose your island zone and travel style before choosing the hotel.",
    "quick": [
      "Choose island zone",
      "Plan PQC transfer",
      "Separate sea/attraction days",
      "Keep resort time"
    ],
    "sections": [
      {
        "title": "Treat Phu Quoc as its own trip",
        "body": [
          "It requires a flight connection from Central Vietnam.",
          "Four or five nights gives more room to enjoy the island instead of racing through it."
        ]
      },
      {
        "title": "Hotel zone changes daily transport",
        "body": [
          "North, central and south areas have different attraction patterns.",
          "List your priorities before choosing a hotel only by room photos."
        ]
      },
      {
        "title": "Separate sea and major attraction days",
        "body": [
          "Snorkeling/island-hopping is weather-sensitive, while major attractions also need time.",
          "Combining everything can create too much transport."
        ]
      },
      {
        "title": "GoVietStay in Phu Quoc",
        "body": [
          "Phu Quoc is an active GoVietStay target destination with a dedicated commercial tours page.",
          "Use this guide for planning, then the product page for current options."
        ]
      }
    ],
    "checklist": [
      "Choose island zone",
      "Plan PQC transfer",
      "Separate sea/attraction days",
      "Keep resort time",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "How many days do I need in Phu Quoc?",
        "a": "Four to five nights is a useful first-trip range."
      },
      {
        "q": "Can I combine Da Nang and Phu Quoc?",
        "a": "Yes by flight, but short trips can become rushed."
      },
      {
        "q": "Do I need airport transfer?",
        "a": "Not always, but it is useful for families, groups and distant resorts."
      },
      {
        "q": "Are sea trips weather-sensitive?",
        "a": "Yes."
      }
    ],
    "related": [
      "vietnam-evisa-guide",
      "da-nang-travel-guide",
      "da-nang-family-travel"
    ],
    "primaryHref": "/tours/phu-quoc",
    "primaryLabel": "See GoVietStay Phu Quoc tours"
  },
  {
    "slug": "da-nang-family-travel",
    "title": "Da Nang Family Travel 2026 | Kids, Parents & Easy Itineraries | GoVietStay",
    "h1": "Da Nang with family: plan around energy, not attraction count",
    "description": "Plan Da Nang with kids, parents or a multigenerational family, including Ba Na Hills, Hoi An, transport and sea-trip suitability.",
    "keywords": [
      "Da Nang family travel",
      "Da Nang with kids",
      "Da Nang family itinerary"
    ],
    "eyebrow": "DA NANG FAMILY TRAVEL · 2026",
    "summary": "Family trips work best with one major out-of-city activity per day, reliable transport and realistic meal and rest breaks.",
    "quick": [
      "One major trip/day",
      "Share child age/height",
      "Protect rest time",
      "Use stable transport"
    ],
    "sections": [
      {
        "title": "Plan around the least flexible traveller",
        "body": [
          "Young children and older parents change how long the group can walk, wait and return late.",
          "A better family trip often has fewer attractions and more comfort."
        ]
      },
      {
        "title": "Ba Na Hills with family",
        "body": [
          "The complex is large and mountain weather changes.",
          "Send child ages and heights because current ticket policies can depend on height."
        ]
      },
      {
        "title": "Hoi An without exhausting everyone",
        "body": [
          "Leave in the afternoon, reduce unnecessary walking and decide how late you really need to stay.",
          "Basket-boat spinning is optional."
        ]
      },
      {
        "title": "Use transport strategically",
        "body": [
          "Airport pickup and a private vehicle on complicated days can remove a lot of friction.",
          "Use Grab on simple city days."
        ]
      }
    ],
    "checklist": [
      "One major trip/day",
      "Share child age/height",
      "Protect rest time",
      "Use stable transport",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Is Da Nang good for families?",
        "a": "Yes."
      },
      {
        "q": "Can children visit Ba Na Hills?",
        "a": "Many families do; consider weather, walking and current height rules."
      },
      {
        "q": "Can families do Hoi An?",
        "a": "Yes, with adjusted walking and return time."
      },
      {
        "q": "Should families hire a private car?",
        "a": "It can be very useful on multi-stop days."
      }
    ],
    "related": [
      "where-to-stay-in-da-nang",
      "da-nang-private-car",
      "da-nang-itinerary-4-days"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "da-nang-to-hoi-an",
    "title": "Da Nang to Hoi An 2026 | Transfer, Private Car & Day Trip | GoVietStay",
    "h1": "Da Nang to Hoi An: choose transport based on what happens after you arrive",
    "description": "Compare Da Nang to Hoi An transfers, private cars, day trips and airport-to-Hoi-An options.",
    "keywords": [
      "Da Nang to Hoi An",
      "Da Nang Hoi An transfer",
      "Da Nang to Hoi An private car"
    ],
    "eyebrow": "DA NANG → HOI AN · 2026",
    "summary": "Changing hotels? Book a point-to-point transfer. Sightseeing and returning to Da Nang? Use a joined tour or private return arrangement.",
    "quick": [
      "Hotel change: transfer",
      "Sightseeing: tour/car",
      "Luggage matters",
      "Plan evening return"
    ],
    "sections": [
      {
        "title": "Hotel-to-hotel transfer",
        "body": [
          "Provide passenger count, luggage and both hotel names.",
          "You can also travel directly from Da Nang Airport to Hoi An."
        ]
      },
      {
        "title": "Day trip and return",
        "body": [
          "A structured afternoon/evening tour can include Coconut Forest and Old Town without arranging every ride separately.",
          "Confirm final return time and drop-off area."
        ]
      },
      {
        "title": "Private car",
        "body": [
          "Useful for custom stops, family timing or a different return time.",
          "Driver service does not automatically include a guide."
        ]
      },
      {
        "title": "Grab",
        "body": [
          "It can work for simple one-way rides, but late return and luggage can be less predictable.",
          "Use it when flexibility is more important than a fixed arrangement."
        ]
      }
    ],
    "checklist": [
      "Hotel change: transfer",
      "Sightseeing: tour/car",
      "Luggage matters",
      "Plan evening return",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Can I go directly from Da Nang Airport to Hoi An?",
        "a": "Yes."
      },
      {
        "q": "Grab or private car?",
        "a": "Grab is simple for one-way rides; private car is more predictable for luggage and stops."
      },
      {
        "q": "Can I stop at Marble Mountains?",
        "a": "A custom private route may allow it."
      },
      {
        "q": "Can I return after the lantern evening?",
        "a": "Yes, confirm the return arrangement in advance."
      }
    ],
    "related": [
      "hoi-an-day-trip-from-da-nang",
      "da-nang-airport-transfer",
      "da-nang-private-car"
    ],
    "primaryHref": "/tours/hoi-an-coconut-forest",
    "primaryLabel": "See Hoi An tour options"
  },
  {
    "slug": "central-vietnam-itinerary",
    "title": "Central Vietnam Itinerary 2026 | Da Nang, Hoi An & Hue | GoVietStay",
    "h1": "Central Vietnam itinerary: use Da Nang as the logistics base, then slow down",
    "description": "Plan a Central Vietnam itinerary linking Da Nang, Hoi An, Hue, Ba Na Hills and optional Cham Island without unnecessary hotel changes.",
    "keywords": [
      "Central Vietnam itinerary",
      "Da Nang Hoi An Hue itinerary",
      "Central Vietnam travel"
    ],
    "eyebrow": "CENTRAL VIETNAM ITINERARY · 2026",
    "summary": "For 5–7 days, Da Nang can handle airport and day-trip logistics, Hoi An can be a day or overnight cultural stop, and Hue deserves a full heritage day.",
    "quick": [
      "Da Nang = logistics base",
      "Hoi An = culture/evening",
      "Hue = heritage day",
      "Sea day optional"
    ],
    "sections": [
      {
        "title": "Start with Da Nang",
        "body": [
          "The airport, beaches and central location make Da Nang the easiest first base.",
          "Use it for Ba Na Hills and Hoi An access."
        ]
      },
      {
        "title": "Hoi An: day trip or overnight",
        "body": [
          "A day trip works for shorter holidays; an overnight gives you slower mornings and evenings.",
          "Do not change hotels only to collect another city name."
        ]
      },
      {
        "title": "Give Hue enough time",
        "body": [
          "Hue is farther north and history-heavy, so it benefits from a full day.",
          "An overnight can make sense on longer trips."
        ]
      },
      {
        "title": "Keep Cham Island optional",
        "body": [
          "Use it if the sea is a priority and conditions are suitable.",
          "Do not force it into a trip already full of mountain and heritage days."
        ]
      }
    ],
    "checklist": [
      "Da Nang = logistics base",
      "Hoi An = culture/evening",
      "Hue = heritage day",
      "Sea day optional",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "How many days for Central Vietnam?",
        "a": "Five to seven days gives a useful first-trip structure."
      },
      {
        "q": "Should I sleep in all three cities?",
        "a": "Not necessarily; too many hotel changes can waste time."
      },
      {
        "q": "Can Ba Na Hills fit?",
        "a": "Yes, most easily as a Da Nang-based day."
      },
      {
        "q": "Can I add Phu Quoc?",
        "a": "It is a separate flight destination and works better with additional days."
      }
    ],
    "related": [
      "da-nang-travel-guide",
      "da-nang-itinerary-4-days",
      "hue-day-trip-from-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "da-nang-massage-guide",
    "title": "Da Nang Massage Guide 2026 | Foot Massage, Spa & Timing | GoVietStay",
    "h1": "Da Nang massage: use it to make the travel day easier",
    "description": "A practical Da Nang massage guide covering foot massage, full-body spa, arrival/departure timing and what to confirm before booking.",
    "keywords": [
      "Da Nang massage",
      "best massage Da Nang",
      "Da Nang foot massage",
      "Da Nang spa"
    ],
    "eyebrow": "DA NANG MASSAGE · 2026",
    "summary": "Massage works best after a long walking day, on arrival evening or between hotel checkout and a late flight. Compare location, actual treatment time and extra charges—not only the lowest price.",
    "quick": [
      "After long tours",
      "Arrival/departure friendly",
      "Check real treatment time",
      "Confirm extra charges"
    ],
    "sections": [
      {
        "title": "Foot massage or full-body treatment",
        "body": [
          "Foot massage is an easy recovery option after a long walking day.",
          "Full-body treatment may suit broader shoulder and back fatigue."
        ]
      },
      {
        "title": "Arrival and departure days work well",
        "body": [
          "A flexible massage appointment can absorb part of the uncertainty around flight or hotel timing.",
          "On departure day, leave enough time for luggage and airport transfer."
        ]
      },
      {
        "title": "Compare more than price",
        "body": [
          "Ask what the advertised duration includes and whether there are extra service charges or tipping expectations.",
          "Groups should confirm whether everyone can start at the same time."
        ]
      },
      {
        "title": "Connect massage to the wider itinerary",
        "body": [
          "Massage should reduce travel friction, not become another stressful reservation.",
          "Some GoVietStay promotions may include massage benefits; confirm current conditions for the specific booking."
        ]
      }
    ],
    "checklist": [
      "After long tours",
      "Arrival/departure friendly",
      "Check real treatment time",
      "Confirm extra charges",
      "Confirm current inclusions before booking"
    ],
    "faqs": [
      {
        "q": "Should I book massage in advance?",
        "a": "For evenings, weekends or groups, advance booking can help."
      },
      {
        "q": "Is foot massage good after Ba Na Hills?",
        "a": "It can be a convenient low-effort recovery option."
      },
      {
        "q": "Can I have a massage before the airport?",
        "a": "Yes, with enough buffer for luggage and transfer."
      },
      {
        "q": "Does GoVietStay always include massage?",
        "a": "No. Some promotions may include benefits; check current booking conditions."
      }
    ],
    "related": [
      "da-nang-itinerary-4-days",
      "da-nang-airport-transfer",
      "things-to-do-in-da-nang"
    ],
    "primaryHref": "/",
    "primaryLabel": "Explore GoVietStay"
  },
  {
    "slug": "ho-tram-travel-guide",
    "title": "Ho Tram Travel Guide 2026–2027 | Beaches, Stay & Things to Do | GoVietStay",
    "h1": "Ho Tram Travel Guide 2026–2027: beaches, forest, hot springs and a slower escape",
    "description": "Plan a Ho Tram beach escape from Ho Chi Minh City: where to stay, Ho Coc Beach, Binh Chau hot springs, seafood, transport, weather and a realistic 2-day itinerary.",
    "keywords": [
      "Ho Tram travel guide",
      "Ho Tram Vietnam",
      "things to do in Ho Tram",
      "Ho Tram from Ho Chi Minh City",
      "Ho Tram beach",
      "Ho Coc beach",
      "Binh Chau hot springs",
      "Ho Tram itinerary 2 days"
    ],
    "eyebrow": "HO TRAM TRAVEL GUIDE · 2026–2027",
    "summary": "Ho Tram is best for a relaxed beach stay rather than a packed sightseeing schedule. Allow roughly 2.5–3.5 hours by car from central Ho Chi Minh City depending on traffic and your hotel. Choose the accommodation first, then add one outing such as Ho Coc Beach, the Binh Chau forest or hot springs.",
    "quick": [
      "Around 2.5–3.5 hours from HCMC",
      "Best for 1–3 relaxed nights",
      "Choose resort and transport together",
      "Add one nature or hot-spring outing"
    ],
    "sections": [
      {
        "title": "Where is Ho Tram—and is it worth your time?",
        "body": [
          "Ho Tram (Hồ Tràm) is a coastal resort area in southern Vietnam, in the former Ba Ria–Vung Tau region, now administratively part of Ho Chi Minh City. From central HCMC it is roughly 120–130 km by road, with journey time affected by the departure point, traffic and the exact resort.",
          "Unlike a walkable city break, a Ho Tram holiday is mostly about the property you choose, beach time, fresh seafood and a few carefully selected local outings. If you want nightlife and attractions every hour, a central city stay may suit you better."
        ]
      },
      {
        "title": "Best time to visit Ho Tram in 2026–2027",
        "body": [
          "December through April is generally the drier part of southern Vietnam's year and a useful starting window for outdoor plans. May through November is typically wetter; short showers and changing sea conditions can affect beach time.",
          "A sunny forecast does not guarantee safe swimming. Look at wind and wave conditions, follow your resort's beach flags and lifeguard instructions, and keep a flexible indoor or hot-spring option in your plan. Holiday weekends also deserve earlier accommodation checks."
        ]
      },
      {
        "title": "Ho Tram Beach versus Ho Coc Beach: which should you choose?",
        "body": [
          "Ho Tram is convenient for resort-focused stays, beach walks and relaxed meals. The exact beach experience varies significantly by property—some stretches are private-feeling while others are more accessible to day visitors.",
          "Ho Coc is another scenic coastal stretch in the same wider area, known for its combination of sand, sea and trees. Rather than switching hotels for the name alone, treat Ho Coc as a possible drive-and-explore stop after confirming local access and weather."
        ]
      },
      {
        "title": "Binh Chau–Phuoc Buu forest: the nature side of the coast",
        "body": [
          "The Binh Chau–Phuoc Buu Nature Reserve protects an important coastal forest landscape of wetlands, dunes and native vegetation. It gives the Ho Tram region a different character from a beach-only destination.",
          "This is a protected area, not an open adventure playground: use approved routes, check permitted entry and guide requirements, carry drinking water, and avoid disturbing wildlife. Choose the level of walking that actually suits your group."
        ]
      },
      {
        "title": "Binh Chau hot springs: a different kind of slow day",
        "body": [
          "Binh Chau is known for geothermal mineral-water experiences. It is a practical alternative on a day when you want time away from the beach or when the weather is unsettled.",
          "Compare the current entry packages carefully: hot-pool access, mud-bath experiences, lockers, towels, food and transport may be priced separately. Opening times, age restrictions and conditions should be checked directly with the venue before purchase."
        ]
      },
      {
        "title": "Fishing villages and seafood without the tourist rush",
        "body": [
          "Early mornings can be the most interesting time to observe fishing activity around the Binh Chau coastal area. Harbour access and landing activity change with weather and local operations, so do not assume a particular boat arrival time.",
          "For seafood, check the menu's unit of pricing (per kilogram, per dish or per portion), confirm preparation charges and ask for the final estimate before ordering. A simple local meal can be a more memorable part of the trip than adding another major attraction."
        ]
      },
      {
        "title": "Where to stay: beachfront resort, villa or smaller hotel?",
        "body": [
          "A beachfront resort suits families and couples who want pools, restaurants and the ocean within easy reach. Private villas can work well for groups who value shared space, but verify the number of usable bedrooms, pool rules and actual walking distance to the beach.",
          "Smaller hotels or homestays may offer better value for travelers who plan to explore by car. Check real map position rather than relying only on a listing labelled ‘Ho Tram’: facilities can be spread along a long stretch of coastline and taxis may not be waiting outside."
        ]
      },
      {
        "title": "Getting to Ho Tram from Ho Chi Minh City",
        "body": [
          "The most straightforward options are a pre-arranged private vehicle or a shared limousine service with a suitable drop-off location. The drive often takes around 2.5–3.5 hours, but weekends, holiday traffic and the starting point can change this considerably.",
          "Before booking, confirm the exact hotel address, pickup point, baggage allowance, child seats if needed, waiting conditions and the return schedule. For international arrivals, avoid promising a tight same-day seaside check-in immediately after immigration."
        ]
      },
      {
        "title": "A realistic Ho Tram itinerary: 2 days and 1 night",
        "body": [
          "Day 1: leave Ho Chi Minh City in the morning, arrive for lunch or hotel check-in according to the property's policy, enjoy a relaxed beach or pool afternoon, then finish with seafood and an early evening. Do not stack distant stops onto the travel day.",
          "Day 2: choose one morning highlight—Ho Coc coastal scenery, a permitted forest experience or a Binh Chau hot-spring visit. Return for luggage and head back to Ho Chi Minh City with a sensible traffic buffer. Add another night if you want both forest and hot springs without rushing."
        ]
      },
      {
        "title": "Three days and two nights: who benefits from the extra night?",
        "body": [
          "A two-night stay gives more room for a full resort day and one carefully chosen excursion, especially with children or older travelers. This usually feels better than spending half the holiday in transfers.",
          "A simple pattern is arrival and sunset on Day 1; one forest, beach or hot-spring activity on Day 2; and a slow breakfast before returning on Day 3. Leave space for rain or changes in group energy."
        ]
      },
      {
        "title": "How much should you budget?",
        "body": [
          "Your resort or villa will often be the largest expense. Compare total costs including weekend supplements, breakfast, extra beds, transport, meals and resort policies—not just the advertised nightly rate.",
          "A low-priced room far from the attractions may require more paid driving. For a group, compare one larger vehicle against multiple transfers and confirm which expenses are shared. Current prices should be checked for your travel dates instead of relying on a fixed guide estimate."
        ]
      },
      {
        "title": "Who will enjoy Ho Tram—and who might not?",
        "body": [
          "Ho Tram is a strong fit for couples, families, small friend groups and travelers who want an easy coastal break from Ho Chi Minh City. It is also a useful choice for visitors who have already seen the major city highlights and want a quieter chapter.",
          "It may be less suitable for a visitor without transport who wants to walk between many cafes, markets and sights. If it is your first and only Vietnam beach destination and island activities are the priority, compare it with Phu Quoc before deciding."
        ]
      },
      {
        "title": "GoVietStay's approach to future Ho Tram support",
        "body": [
          "GoVietStay currently focuses its established travel services on Da Nang, Hoi An, Hue and Phu Quoc. We are developing our Ho Tram destination knowledge step by step, starting with practical information that helps travelers make good decisions.",
          "For Ho Tram, contact us with your dates, guest count and intended hotel if you would like to discuss future planning options. Specific Ho Tram tour, transfer or hotel services are subject to confirmation; we will not present an unverified product as bookable."
        ]
      }
    ],
    "checklist": [
      "Confirm your hotel’s exact location and beach access",
      "Allow travel-time buffer from Ho Chi Minh City",
      "Check sea flags, wind and forecast close to departure",
      "Choose only one excursion on a 1-night stay",
      "Verify current prices, entry terms and child policies",
      "Do not assume Ho Tram services are confirmed until quoted"
    ],
    "faqs": [
      {
        "q": "Where is Ho Tram in Vietnam?",
        "a": "Ho Tram is a coastal area in southern Vietnam, in the former Ba Ria–Vung Tau region, now administratively part of Ho Chi Minh City."
      },
      {
        "q": "How far is Ho Tram from Ho Chi Minh City?",
        "a": "It is roughly 120–130 km by road from central Ho Chi Minh City. Plan around 2.5–3.5 hours by car and allow more when traffic is heavy or your hotel is farther along the coast."
      },
      {
        "q": "How many days do I need in Ho Tram?",
        "a": "Two days and one night works for a short resort break. Three days and two nights is better if you want to add Binh Chau or Ho Coc without rushing."
      },
      {
        "q": "When is the best time to visit Ho Tram?",
        "a": "December to April usually offers drier conditions. Always check local rainfall, wind, surf and beach safety before a trip."
      },
      {
        "q": "Are Ho Tram and Ho Coc the same place?",
        "a": "No. They are two coastal areas in the same wider destination. Ho Tram is a popular resort base, while Ho Coc is often visited for its beach-and-forest scenery."
      },
      {
        "q": "Can I visit Binh Chau hot springs from Ho Tram?",
        "a": "Yes, it is a popular nearby excursion. Check the current hot-spring package, transport and operating hours before visiting."
      },
      {
        "q": "Do I need a car in Ho Tram?",
        "a": "A car or pre-arranged transfer is useful because many beachfront hotels and attractions are spread out. Your choice depends on the resort location and daily plans."
      },
      {
        "q": "Does GoVietStay currently operate confirmed Ho Tram tours?",
        "a": "GoVietStay is building its Ho Tram information and future support. Do not assume a tour or transfer is available until the team confirms that specific service and price."
      }
    ],
    "related": [
      "phu-quoc-travel-guide",
      "da-nang-travel-guide",
      "central-vietnam-itinerary"
    ],
    "primaryHref": "/travel/phu-quoc-travel-guide",
    "primaryLabel": "Compare with Phu Quoc"
  }
];

export const englishSeoGuides: EnglishSeoGuide[] = RAW_GUIDES.map((guide) => ({
  ...guide,
  updated: guide.slug === "ho-tram-travel-guide" ? "2026-10-12" : "2026-08-26",
}));

export function getEnglishSeoGuide(slug: string) {
  return englishSeoGuides.find((guide) => guide.slug === slug);
}

export function getRelatedEnglishSeoGuides(guide: EnglishSeoGuide) {
  return guide.related
    .map((slug) => getEnglishSeoGuide(slug))
    .filter((item): item is EnglishSeoGuide => Boolean(item));
}
