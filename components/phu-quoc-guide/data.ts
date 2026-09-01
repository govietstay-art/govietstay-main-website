export type GuideSection = {
  eyebrow?: string;
  title: string;
  intro?: string;
  bullets?: string[];
  cards?: { title: string; text: string; badge?: string }[];
  table?: { headers: string[]; rows: string[][] };
  note?: string;
};

export type GuidePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  heroImage: string;
  heroImageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  quickAnswer: string;
  chips: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  related: { href: string; label: string; text: string }[];
};

const relatedAll = [
  {
    href: "/travel/phu-quoc-travel-guide",
    label: "Phu Quoc Travel Guide 2026–2027",
    text: "Start here for areas, timing, transport, tours and a practical first-trip plan.",
  },
  {
    href: "/travel/phu-quoc-3-islands-vs-4-islands",
    label: "3 Islands vs 4 Islands",
    text: "Compare the two most requested south-island day trips before you book.",
  },
  {
    href: "/travel/phu-quoc-airport-transfer-private-car",
    label: "Airport Transfer & Private Car",
    text: "Choose the easiest arrival and point-to-point transport option for your hotel area.",
  },
  {
    href: "/travel/phu-quoc-with-family",
    label: "Phu Quoc with Family",
    text: "Build a lower-stress island plan around children, heat, ride heights and sea conditions.",
  },
  {
    href: "/travel/phu-quoc-itinerary-3d2n-4d3n",
    label: "3D2N / 4D3N Itinerary",
    text: "Use a realistic short-stay plan instead of wasting time crossing the island repeatedly.",
  },
  {
    href: "/travel/best-time-to-visit-phu-quoc",
    label: "Best Time & Weather Plan",
    text: "Know when sea tours work best and what to do when the weather changes.",
  },
];

export const guidePages: Record<string, GuidePageData> = {
  "phu-quoc-travel-guide": {
    slug: "phu-quoc-travel-guide",
    title: "Phu Quoc Travel Guide 2026–2027",
    metaTitle: "Phu Quoc Travel Guide 2026–2027 | First Trip, Tours & Itinerary",
    metaDescription:
      "Plan Phu Quoc with a practical 2026–2027 guide covering where to stay, 3 vs 4 islands, Hon Thom, family travel, weather, airport transfer and 3D2N/4D3N itineraries.",
    eyebrow: "First-trip planning • Updated for 2026–2027",
    heroTitle: "Phu Quoc,",
    heroAccent: "planned around your trip — not a checklist.",
    heroText:
      "Use one page to decide where to stay, which island day is worth your time, how to move around and what to change when the sea or weather does not cooperate.",
    heroImage: "/tour/phuquoc/tour-06-1.jpg",
    heroImageAlt: "Phu Quoc southern islands and Hon Thom experience",
    secondaryImage: "/tour/phuquoc/tour-05-1.jpg",
    secondaryImageAlt: "Phu Quoc island-hopping speedboat day",
    quickAnswer:
      "For most first-time visitors, 3–4 days works well. Use one day for the south islands/Hon Thom, one day for the north or a family attraction, and keep arrival/departure days lighter. The driest, most reliable sea-tour period is generally November to April, with December to March the busiest high-season window.",
    chips: ["First trip", "Mobile-friendly plan", "Weather backup", "Local WhatsApp support"],
    sections: [
      {
        eyebrow: "Start with the big decision",
        title: "Which part of Phu Quoc should you build your trip around?",
        intro:
          "Phu Quoc is long enough that poor planning creates unnecessary driving. Pick your base from the experiences you actually want, then group each day by area.",
        cards: [
          {
            badge: "Most convenient",
            title: "Duong Dong / Long Beach",
            text: "Best all-round base for first-time visitors who want restaurants, the night market, reasonable airport access and easy pickup for mixed day tours.",
          },
          {
            badge: "Best for south-island days",
            title: "An Thoi / Sunset Town",
            text: "A smart choice if Hon Thom, the cable car, Kiss Bridge and southern island-hopping are the main reasons for your trip.",
          },
          {
            badge: "Best for theme parks",
            title: "North island / Grand World area",
            text: "Makes sense for families prioritising VinWonders, Vinpearl Safari and Grand World, but allow more travel time for south-island activities.",
          },
        ],
      },
      {
        eyebrow: "WIIFM: choose the right day",
        title: "3 Islands or 4 Islands + Hon Thom?",
        intro:
          "The better tour is not automatically the one with more stops. Choose based on how much you want to fit into one day.",
        table: {
          headers: ["", "3 Islands", "4 Islands + Hon Thom"],
          rows: [
            ["Best for", "Snorkeling, swimming, value", "First-time visitors wanting the full south-island day"],
            ["Pace", "More focused on the sea", "Longer and busier"],
            ["Main extras", "Island hopping + lunch", "Cable car + Aquatopia + Kiss Bridge"],
            ["GoVietStay reference", "1,040,000 VND/guest", "1,690,000 VND/guest"],
          ],
        },
        note:
          "Reference prices are reconfirmed before payment. Child pricing can depend on operator rules, age and/or height.",
      },
      {
        eyebrow: "First-trip rhythm",
        title: "A simple 3–4 day structure that avoids rushing",
        cards: [
          {
            title: "Arrival day",
            text: "Check in, eat locally, walk Duong Dong/night market or enjoy a relaxed Sunset Town evening. Do not waste your first day forcing a long north-south route after a flight.",
          },
          {
            title: "Main sea day",
            text: "Choose 3 Islands for a simpler snorkeling day or 4 Islands + Hon Thom if the cable car and Aquatopia are priority experiences.",
          },
          {
            title: "North / family day",
            text: "Use a separate day for Safari, VinWonders or a north-island route. Families with young children usually enjoy the trip more when this is not stacked onto a sea tour.",
          },
          {
            title: "Departure day",
            text: "Keep the plan close to your hotel or airport. Add only an easy café, beach, market or private-car stop that still leaves a safe flight buffer.",
          },
        ],
      },
      {
        eyebrow: "Weather matters",
        title: "Do not plan Phu Quoc as if every sea day is guaranteed",
        intro:
          "Phu Quoc is warm year-round, but sea conditions change. November–April is generally the easier period for beach and boat plans; rain and rougher sea become more common in the wetter months.",
        bullets: [
          "Keep your most important sea activity on a day that can be moved if possible.",
          "Reconfirm island order, snorkeling points and cable-car operation close to departure.",
          "If the sea is unsuitable, switch to Safari/VinWonders, island sightseeing, food, culture or a private-car day instead of forcing the original plan.",
        ],
      },
      {
        eyebrow: "Arrival made easier",
        title: "Airport transfer: choose certainty when your flight day is already long",
        intro:
          "Phu Quoc International Airport is close to Duong Dong compared with many resort islands, but hotel areas can be far apart. A pre-arranged private car is most useful for families, larger luggage, late arrivals or hotels away from the centre.",
        bullets: [
          "Send flight number, landing time, hotel name, guest count and luggage before arrival.",
          "Ask in advance if you need a child seat or a larger vehicle.",
          "For multi-stop days, book a private car by route rather than improvising separate rides between distant areas.",
        ],
      },
      {
        eyebrow: "GoVietStay local support",
        title: "What we help with — and what we reconfirm before you pay",
        intro:
          "GoVietStay is most useful when you want one local contact to coordinate tours, private transport and last-minute changes rather than booking each piece separately.",
        bullets: [
          "Current availability and reference prices",
          "Pickup area and hotel details",
          "Child age/height rules where relevant",
          "Weather and sea-condition changes",
          "English and Russian-language assistance",
        ],
      },
    ],
    faq: [
      {
        q: "How many days do I need in Phu Quoc?",
        a: "Three days is enough for a short first trip, but four days gives you a much better buffer for a sea day, a north/family day and a relaxed arrival or departure day.",
      },
      {
        q: "Which is better for a first trip: 3 Islands or 4 Islands?",
        a: "Choose 3 Islands if snorkeling and value matter most. Choose 4 Islands + Hon Thom if you want the cable car, Aquatopia and a fuller all-in-one south-island day.",
      },
      {
        q: "What is the best area to stay?",
        a: "Duong Dong/Long Beach is the easiest all-round base. Sunset Town/An Thoi suits south-island priorities, while the north works best when VinWonders, Safari and Grand World dominate your plan.",
      },
      {
        q: "When is Phu Quoc high season?",
        a: "GoVietStay treats December 2026 through March 2027 as the key high-demand window for advance planning because boats, popular packages and private guides can fill up.",
      },
    ],
    related: relatedAll.filter((x) => !x.href.endsWith("phu-quoc-travel-guide")),
  },

  "phu-quoc-3-islands-vs-4-islands": {
    slug: "phu-quoc-3-islands-vs-4-islands",
    title: "Phu Quoc 3 Islands vs 4 Islands",
    metaTitle: "Phu Quoc 3 Islands vs 4 Islands: Which Tour Should You Choose?",
    metaDescription:
      "Compare Phu Quoc 3 Islands and 4 Islands + Hon Thom tours by pace, snorkeling, cable car, Aquatopia, price and who each option suits best.",
    eyebrow: "Tour comparison • South Phu Quoc",
    heroTitle: "3 Islands or 4 Islands?",
    heroAccent: "Choose by experience, not by the bigger number.",
    heroText:
      "Both cover the south-island experience. The real difference is whether you want a more focused snorkeling day or a longer all-in-one day with Hon Thom cable car and Aquatopia.",
    heroImage: "/tour/phuquoc/tour-05-1.jpg",
    heroImageAlt: "Phu Quoc 3 Islands speedboat and snorkeling",
    secondaryImage: "/tour/phuquoc/tour-06-1.jpg",
    secondaryImageAlt: "Phu Quoc 4 Islands and Hon Thom cable car experience",
    quickAnswer:
      "Choose 3 Islands if your priority is snorkeling, swimming and better value. Choose 4 Islands + Hon Thom if this is your first Phu Quoc trip and you want to combine island hopping with the famous sea-crossing cable car, Aquatopia and Kiss Bridge in one long day.",
    chips: ["3 Islands: 1,040,000 VND", "4 Islands: 1,690,000 VND", "Weather dependent", "Book early Dec–Mar"],
    sections: [
      {
        eyebrow: "Side-by-side",
        title: "The difference in one table",
        table: {
          headers: ["Question", "3 Islands", "4 Islands + Hon Thom"],
          rows: [
            ["What you mainly get", "Speedboat, islands, snorkeling, swimming, lunch", "Island route + Hon Thom cable car + Aquatopia + Kiss Bridge"],
            ["Typical GoVietStay timing", "About 07:00–16:00", "About 07:00–17:30"],
            ["Reference adult price", "1,040,000 VND", "1,690,000 VND"],
            ["Best for", "Couples, friends, snorkel-focused travelers", "First-timers, families with older children, attraction-focused travelers"],
            ["Energy level", "Moderate", "Higher — it is a fuller day"],
          ],
        },
      },
      {
        eyebrow: "Choose 3 Islands when…",
        title: "You care more about the sea than ticking off attractions",
        bullets: [
          "You want the lower-cost option.",
          "Snorkeling and swimming are the main reasons you are booking.",
          "You prefer to return earlier and keep your evening free.",
          "You do not need the cable car or water park on the same day.",
        ],
      },
      {
        eyebrow: "Choose 4 Islands when…",
        title: "You want the most complete first-time south-island day",
        bullets: [
          "Hon Thom cable car is on your must-do list.",
          "You want Aquatopia without using another separate day.",
          "You are comfortable with a longer, more structured day.",
          "You want the easiest single booking that combines islands + a major Phu Quoc attraction.",
        ],
        note:
          "Sun World states the Hon Thom cable car route is 7,899.9 metres and the ride is about 15 minutes. Operating conditions and schedules should still be reconfirmed for your travel date.",
      },
      {
        eyebrow: "Families",
        title: "The age of your children matters more than the tour name",
        intro:
          "With older children who enjoy water parks, 4 Islands can be a strong one-day choice. With toddlers or children who tire easily, the longer combined day may be too much.",
        bullets: [
          "Share every child’s age and height before booking.",
          "Ride access and ticket rules can be height-based.",
          "For young children, ask about sea conditions and boat suitability on the actual date.",
        ],
      },
      {
        eyebrow: "Real-condition policy",
        title: "The island order is not the promise — a safe day is",
        intro:
          "Snorkeling spots, island order, timing and some activities can change because of wind, sea state, operator instructions or safety rules. A good operator adapts rather than forcing a printed schedule.",
      },
    ],
    faq: [
      {
        q: "Is the 4 Islands tour always better than 3 Islands?",
        a: "No. Four Islands is better only if the Hon Thom/cable-car part is valuable to you. If you mainly want a sea day, 3 Islands is simpler and cheaper.",
      },
      {
        q: "Does the 4 Islands tour include Hon Thom cable car?",
        a: "The GoVietStay 4 Islands reference package shown on this page includes the Hon Thom cable car. Final package inclusions are reconfirmed before payment.",
      },
      {
        q: "Is Sea Walking included?",
        a: "No. In the current GoVietStay reference programs, Sea Walking is optional and self-funded.",
      },
      {
        q: "Can the route change on the day?",
        a: "Yes. Sea conditions, weather and operator instructions can change snorkeling points, island order and timing.",
      },
    ],
    related: relatedAll.filter((x) => !x.href.endsWith("phu-quoc-3-islands-vs-4-islands")),
  },

  "phu-quoc-airport-transfer-private-car": {
    slug: "phu-quoc-airport-transfer-private-car",
    title: "Phu Quoc Airport Transfer & Private Car",
    metaTitle: "Phu Quoc Airport Transfer & Private Car | GoVietStay",
    metaDescription:
      "Book Phu Quoc airport pickup or a private car with local WhatsApp support. Practical guidance for Duong Dong, Long Beach, Sunset Town, An Thoi and north-island hotels.",
    eyebrow: "PQC airport pickup • Private car",
    heroTitle: "Land in Phu Quoc.",
    heroAccent: "Know who is taking you to the hotel.",
    heroText:
      "Pre-arranged transfer is most useful when you have children, large luggage, a late flight, a remote resort or simply do not want to negotiate transport after landing.",
    heroImage: "/tour/phuquoc/phuquoc-01.png",
    heroImageAlt: "Phu Quoc island transport and travel planning",
    quickAnswer:
      "Phu Quoc International Airport (PQC) is roughly 10 km by road from central Duong Dong, so central transfers can be short. Travel time rises quickly when your hotel is in the far south or north. Send your flight number and exact hotel before arrival so the vehicle and pickup plan match the real route.",
    chips: ["Airport pickup", "Hotel transfer", "Private route", "WhatsApp confirmation"],
    sections: [
      {
        eyebrow: "Choose the right level of service",
        title: "When a private transfer is worth paying for",
        cards: [
          {
            title: "Family arrival",
            text: "You want the driver and vehicle confirmed before the flight, with enough luggage space and a child-seat request handled in advance.",
          },
          {
            title: "Late or early flight",
            text: "You do not want to arrive tired and start comparing transport options at the terminal.",
          },
          {
            title: "North or south resort",
            text: "The hotel is not in central Duong Dong, so a pre-agreed route and price reduce uncertainty.",
          },
          {
            title: "Multi-stop private day",
            text: "You want one car for several locations instead of ordering separate rides and losing time between distant areas.",
          },
        ],
      },
      {
        eyebrow: "Area guide",
        title: "Your hotel location changes the transfer plan",
        table: {
          headers: ["Hotel area", "What to know"],
          rows: [
            ["Duong Dong / Long Beach", "Closest all-round base for the airport and a practical first-trip location."],
            ["Sunset Town / An Thoi", "South-island base; useful for Hon Thom and island-hopping days."],
            ["Grand World / VinWonders / Safari area", "North-island base; allow more road time from the airport and for south-island tours."],
            ["Remote beach resorts", "Always send the exact hotel name — similar resort names and long access roads can affect vehicle planning."],
          ],
        },
      },
      {
        eyebrow: "What to send us",
        title: "Five details prevent most airport-transfer problems",
        bullets: [
          "Flight number",
          "Arrival date and scheduled landing time",
          "Exact hotel name or map pin",
          "Number of adults/children",
          "Large luggage, stroller, child seat or oversized item",
        ],
      },
      {
        eyebrow: "Private car",
        title: "Do not use a full-day car like an unlimited taxi",
        intro:
          "The best private-car plan groups places by geography. North attractions belong together; south attractions belong together. This saves road time and makes the quote clearer.",
        cards: [
          {
            title: "South route",
            text: "An Thoi, Sunset Town, Hon Thom station, Kiss Bridge and south-island departure points.",
          },
          {
            title: "North route",
            text: "Vinpearl Safari, VinWonders, Grand World and selected north-island stops.",
          },
          {
            title: "Central / local route",
            text: "Duong Dong, Dinh Cau, local food, markets, farms and easy first/last-day stops.",
          },
        ],
      },
      {
        eyebrow: "Booking principle",
        title: "Price should be confirmed from the real route, not guessed from 'Phu Quoc transfer'",
        intro:
          "GoVietStay confirms vehicle size, pickup point, destination and any unusual waiting/multi-stop requirement before quoting the final price.",
      },
    ],
    faq: [
      {
        q: "How far is Phu Quoc Airport from Duong Dong?",
        a: "The airport is about 10 km by road from central Duong Dong. Actual transfer time depends on hotel location and traffic.",
      },
      {
        q: "Can I request a child seat?",
        a: "Yes, but request it before arrival and include the child’s age/size so availability can be checked.",
      },
      {
        q: "Can I book an airport transfer and tours with the same contact?",
        a: "Yes. GoVietStay can coordinate the airport transfer and Phu Quoc tour requests through the same WhatsApp conversation.",
      },
      {
        q: "Do I need to prepay?",
        a: "Payment terms depend on the confirmed service. GoVietStay will state the final transfer arrangement and payment requirement before you accept.",
      },
    ],
    related: relatedAll.filter((x) => !x.href.endsWith("phu-quoc-airport-transfer-private-car")),
  },

  "phu-quoc-with-family": {
    slug: "phu-quoc-with-family",
    title: "Phu Quoc with Family",
    metaTitle: "Phu Quoc with Kids & Family 2026–2027 | Easy Planning Guide",
    metaDescription:
      "Plan Phu Quoc with kids: where to stay, Safari, VinWonders, Hon Thom, island tours, child-height rules, heat, transport and a lower-stress family itinerary.",
    eyebrow: "Family travel • Kids • Multi-generation trips",
    heroTitle: "Phu Quoc with kids,",
    heroAccent: "without turning every day into a marathon.",
    heroText:
      "The best family itinerary is not the one with the most attractions. It is the one that respects heat, nap time, ride height, sea conditions and how much walking your family can actually enjoy.",
    heroImage: "/tour/phuquoc/tour-07-1.jpg",
    heroImageAlt: "Phu Quoc Hon Thom family day and cable car attractions",
    secondaryImage: "/tour/phuquoc/tour-10-1.jpg",
    secondaryImageAlt: "Phu Quoc north island family-friendly day",
    quickAnswer:
      "For families, 4D3N is easier than 3D2N. Use one main attraction per day, keep the hottest hours flexible, share children’s heights before ticketed activities, and treat boat tours as weather-dependent rather than guaranteed.",
    chips: ["Kids", "Grandparents", "Height rules", "Easy transport"],
    sections: [
      {
        eyebrow: "Where to stay",
        title: "Pick your base from your children’s priority day",
        cards: [
          {
            title: "Long Beach / Duong Dong",
            text: "Best all-round family base when you want easier airport access, restaurants and a balanced mix of north and south day trips.",
          },
          {
            title: "North island",
            text: "Best when Safari and VinWonders are the main family attractions and you prefer shorter rides on those days.",
          },
          {
            title: "Sunset Town / south",
            text: "Best when Hon Thom, Aquatopia and the south islands are your priorities and you want to reduce travel time to An Thoi.",
          },
        ],
      },
      {
        eyebrow: "Family pacing",
        title: "One big day + one easy day beats two exhausting days",
        table: {
          headers: ["Day type", "Good family choice"],
          rows: [
            ["Big attraction day", "Safari + VinWonders for older children, or one of them only for younger children"],
            ["Sea day", "3 Islands for a simpler day; 4 Islands + Hon Thom for families who can handle the longer pace"],
            ["Easy day", "Beach, Duong Dong, Dinh Cau, local food, resort time or a short private-car route"],
            ["Rain/rough-sea backup", "Indoor/land attractions, sightseeing, food or north-island attractions depending on conditions"],
          ],
        },
      },
      {
        eyebrow: "Before buying tickets",
        title: "Child height is a planning detail, not a last-minute detail",
        intro:
          "Theme-park tickets and ride access can be height-based. Sea-tour child rules can also vary by operator. Share both age and height before booking so the family plan is priced and checked correctly.",
        bullets: [
          "Send each child’s age and height.",
          "Ask which water-park or theme-park rides have minimum-height restrictions.",
          "For babies/toddlers, ask specifically about boat type, shade and sea conditions.",
        ],
      },
      {
        eyebrow: "Hon Thom with children",
        title: "The cable car is easy; the full combined day is what you should judge",
        intro:
          "Sun World describes Hon Thom as suitable for family recreation, and the cable-car ride itself is about 15 minutes. The harder question is whether your children still enjoy Aquatopia, walking and the return journey after a long island day.",
      },
      {
        eyebrow: "Parent checklist",
        title: "Bring less, but bring the right things",
        bullets: [
          "Sun hats and high-SPF sunscreen",
          "Swimwear and one dry change of clothes",
          "Water and simple snacks for children",
          "Light rain layer in wet-season months",
          "Motion-sickness preparation if your child is prone to it",
          "A stroller only where the day actually suits one — not for a speedboat island route",
        ],
      },
    ],
    faq: [
      {
        q: "Is Phu Quoc good for families with young children?",
        a: "Yes. It has beaches, Safari, VinWonders, Hon Thom and resort options, but the itinerary should be slower than an adult-only trip.",
      },
      {
        q: "Should we do Safari and VinWonders on the same day?",
        a: "Older children can handle a combined day when time is short. With toddlers or grandparents, splitting the attractions usually creates a better trip if you have enough days.",
      },
      {
        q: "Is 4 Islands suitable for toddlers?",
        a: "It can be a long day. Suitability depends on the child, boat conditions and weather. Ask about the specific departure before booking rather than assuming every day is suitable.",
      },
      {
        q: "What information do you need for family bookings?",
        a: "Guest count, children’s ages and heights, hotel, travel date, preferred language and any stroller, child-seat, food or mobility requirements.",
      },
    ],
    related: relatedAll.filter((x) => !x.href.endsWith("phu-quoc-with-family")),
  },

  "phu-quoc-itinerary-3d2n-4d3n": {
    slug: "phu-quoc-itinerary-3d2n-4d3n",
    title: "Phu Quoc 3D2N / 4D3N Itinerary",
    metaTitle: "Phu Quoc Itinerary 3D2N & 4D3N | First-Time Travel Plan 2026–2027",
    metaDescription:
      "Use a realistic Phu Quoc 3D2N or 4D3N itinerary with south islands, Hon Thom, Safari/VinWonders, Duong Dong, airport timing and weather backup options.",
    eyebrow: "Short-trip planner • 3D2N / 4D3N",
    heroTitle: "A short Phu Quoc trip",
    heroAccent: "works when each day stays in one direction.",
    heroText:
      "Stop crossing the island back and forth. These short itineraries group south, north and central experiences so you spend more time enjoying Phu Quoc and less time in a car.",
    heroImage: "/tour/phuquoc/tour-09-1.jpg",
    heroImageAlt: "Phu Quoc itinerary with island and sunset experiences",
    secondaryImage: "/tour/phuquoc/tour-06-1.jpg",
    secondaryImageAlt: "Hon Thom and southern Phu Quoc itinerary day",
    quickAnswer:
      "For 3D2N, choose one major sea/south day and one lighter arrival/departure plan. For 4D3N, add a dedicated north-island or family day. Do not try to fit south islands, Safari, VinWonders and a full central sightseeing route into the same 48 hours.",
    chips: ["3D2N", "4D3N", "First trip", "No backtracking"],
    sections: [
      {
        eyebrow: "3 days / 2 nights",
        title: "3D2N: one signature day, two smart half-days",
        cards: [
          {
            badge: "Day 1",
            title: "Arrive + central Phu Quoc",
            text: "Airport transfer, check-in, rest, Dinh Cau or Duong Dong, local dinner and night market. If staying south, use Sunset Town instead of crossing back north at night.",
          },
          {
            badge: "Day 2",
            title: "Choose your main south-island day",
            text: "3 Islands for snorkeling/value or 4 Islands + Hon Thom for the fuller cable-car + Aquatopia experience. Keep the evening easy after the tour.",
          },
          {
            badge: "Day 3",
            title: "One final priority + airport",
            text: "Use a short beach/food/private-car stop near your route to the airport. If your flight is late and the family has energy, choose one north attraction — not the entire north island.",
          },
        ],
      },
      {
        eyebrow: "4 days / 3 nights",
        title: "4D3N: the best balanced first-trip version",
        cards: [
          {
            badge: "Day 1",
            title: "Arrival + local evening",
            text: "Check in and stay close to your base. Duong Dong/night market for central hotels, Sunset Town for south hotels, Grand World for north hotels.",
          },
          {
            badge: "Day 2",
            title: "South islands + Hon Thom",
            text: "Book 4 Islands + Hon Thom if this is your signature Phu Quoc day. If you prefer more snorkeling and less attraction time, choose 3 Islands instead.",
          },
          {
            badge: "Day 3",
            title: "North island / family day",
            text: "Safari and/or VinWonders, then Grand World if everyone still has energy. Families with young children can select only one major park.",
          },
          {
            badge: "Day 4",
            title: "Slow morning + departure",
            text: "Breakfast, beach, café, local shopping or a short private-car stop, then airport with a safe time buffer.",
          },
        ],
      },
      {
        eyebrow: "Weather version",
        title: "Move the sea day — do not sacrifice it to a fixed calendar",
        intro:
          "If you have four days, keep Day 2 and Day 3 swappable. When sea conditions are better on the north-attraction day, move the boat trip and shift the land attractions instead.",
      },
      {
        eyebrow: "Choose your itinerary by travel style",
        title: "Same island, different best plan",
        table: {
          headers: ["Traveler", "Best adjustment"],
          rows: [
            ["Couple", "Keep a sunset evening and avoid overloading the day after a full island tour."],
            ["Family", "4D3N, one major attraction per day, child-height checks before booking."],
            ["Friends", "3 Islands + sunset/night plan works well if the group values sea time over theme parks."],
            ["Older travelers", "Use private car, lighter sightseeing and fewer combined full-day attractions."],
          ],
        },
      },
    ],
    faq: [
      {
        q: "Is 3D2N enough for Phu Quoc?",
        a: "Yes for a short taste, but you should choose one signature full day rather than trying to see the entire island.",
      },
      {
        q: "Is 4D3N much better than 3D2N?",
        a: "For first-time visitors, yes. The extra day lets you separate the south-island experience from the north/family attractions and gives you a weather buffer.",
      },
      {
        q: "Which day should I book the island tour?",
        a: "Ideally use a middle day that can be moved if weather changes. Reconfirm sea conditions close to departure.",
      },
      {
        q: "Should I stay in one hotel or change hotels?",
        a: "For 3D2N and most 4D3N trips, one well-chosen base is usually simpler. Hotel changes cost time unless your trip is intentionally split between north and south resorts.",
      },
    ],
    related: relatedAll.filter((x) => !x.href.endsWith("phu-quoc-itinerary-3d2n-4d3n")),
  },

  "best-time-to-visit-phu-quoc": {
    slug: "best-time-to-visit-phu-quoc",
    title: "Best Time to Visit Phu Quoc & Weather Plan",
    metaTitle: "Best Time to Visit Phu Quoc 2026–2027 | Weather & Sea Tour Plan",
    metaDescription:
      "Understand Phu Quoc weather by season and plan sea tours, Hon Thom, family days and rainy-day backups. Includes high-season advice for Dec 2026–Mar 2027.",
    eyebrow: "Weather strategy • 2026–2027",
    heroTitle: "The best time for Phu Quoc",
    heroAccent: "depends on what you came to do.",
    heroText:
      "Beach and boat travelers need calmer sea more than they need a perfect weather icon. Use the seasons as a planning guide, then reconfirm real conditions close to your tour date.",
    heroImage: "/tour/phuquoc/tour-03-1.jpg",
    heroImageAlt: "Phu Quoc sunset and calm sea conditions",
    secondaryImage: "/tour/phuquoc/tour-05-1.jpg",
    secondaryImageAlt: "Phu Quoc snorkeling and island-hopping weather plan",
    quickAnswer:
      "For most beach and island-hopping visitors, November to April is the easiest period, with December to March offering strong dry-season conditions but also the highest demand. May to October is wetter, so build more flexibility into sea-tour days and keep a land-based backup plan.",
    chips: ["Nov–Apr easier sea planning", "Dec–Mar high season", "Wet-season backup", "Reconfirm conditions"],
    sections: [
      {
        eyebrow: "Season guide",
        title: "Use weather ranges, not promises",
        table: {
          headers: ["Period", "What it usually means", "How to plan"],
          rows: [
            ["Nov–Apr", "Drier season; generally easier beach and sea-tour conditions", "Prioritise islands, snorkeling, sunset and Hon Thom; still reconfirm wind/sea."],
            ["Dec–Mar", "Best-demand window and typically comfortable dry-season travel", "Book popular boats, guides and packages earlier."],
            ["May–Jun", "Transition to wetter weather", "Keep sea and land days swappable."],
            ["Jul–Sep", "Rainier period with higher chance of rough sea", "Do not build the whole holiday around non-refundable sea activities."],
            ["Oct", "Transition toward drier conditions", "Use flexible planning and check real conditions close to departure."],
          ],
        },
      },
      {
        eyebrow: "Sea-tour rule",
        title: "Rain is not the only reason a boat plan changes",
        intro:
          "Wind, waves, visibility, marine warnings and operator safety decisions can matter more than whether it is raining at your hotel. A sunny morning does not automatically guarantee every snorkeling point will operate as planned.",
        bullets: [
          "Ask for the latest operating confirmation before departure.",
          "Expect island order or snorkeling points to change when conditions require it.",
          "Never choose a provider because they promise to ignore safety restrictions.",
        ],
      },
      {
        eyebrow: "Weather backup",
        title: "What to do if the sea day is not suitable",
        cards: [
          {
            title: "Family backup",
            text: "Safari, VinWonders, selected indoor attractions, resort time or a shorter private-car route depending on rain intensity.",
          },
          {
            title: "First-time visitor backup",
            text: "Dinh Cau, central Phu Quoc, local products, food, culture and a sightseeing route that can be shortened if heavy rain returns.",
          },
          {
            title: "South-island backup",
            text: "Check whether Hon Thom cable car and land attractions are operating even if the speedboat route changes — they are separate operating decisions.",
          },
        ],
      },
      {
        eyebrow: "High season",
        title: "December 2026 – March 2027: weather is easier, availability is harder",
        intro:
          "This is the period when advance booking matters most. The trade-off for better dry-season odds is higher demand for popular tours, private guides, boats and family attraction packages.",
      },
      {
        eyebrow: "Best booking habit",
        title: "Build one movable day into a 4D3N trip",
        intro:
          "The simplest weather insurance is not an app — it is an itinerary that lets you swap the sea day with a north-island or sightseeing day when conditions change.",
      },
    ],
    faq: [
      {
        q: "What is the best month to visit Phu Quoc?",
        a: "There is no single perfect month, but December to March is a strong choice for many beach-focused travelers because it falls in the drier high-season period.",
      },
      {
        q: "Can I visit Phu Quoc in the rainy season?",
        a: "Yes. You need a more flexible itinerary and should avoid making every important activity a fixed sea tour.",
      },
      {
        q: "Will a sea tour be cancelled if it rains?",
        a: "Not necessarily. Operators consider sea state, wind, visibility and safety rules, not rain alone. Routes can also be adjusted instead of fully cancelled.",
      },
      {
        q: "When should I book for December to March?",
        a: "Earlier than usual, especially for private guides, popular island packages and fixed travel dates. Final availability and price should still be reconfirmed before payment.",
      },
    ],
    related: relatedAll.filter((x) => !x.href.endsWith("best-time-to-visit-phu-quoc")),
  },
};
