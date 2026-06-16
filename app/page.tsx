"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const EXCHANGE_RATE = 26000;

const formatVND = (value: number) => value.toLocaleString("en-US") + " VND";
const formatUSD = (value: number) => "$" + Math.round(value / EXCHANGE_RATE);

const DAO_WHATSAPP_LINK =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent(
    "Hello GoVietStay, I would like to ask Đào for local travel help in Da Nang, Hoi An or Hue."
  );

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const DAO_STARTER_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Xin chào, em là Đào – Local Travel Assistant của GoVietStay. Em có thể giúp anh/chị lên lịch trình Đà Nẵng, Hội An, Huế, tour riêng, xe sân bay, SIM/eSIM và local tips. Anh/chị đang cần hỗ trợ gì cho chuyến đi ạ?",
};

const buildWhatsAppLink = (message: string) =>
  "https://wa.me/84937762607?text=" + encodeURIComponent(message);

type Tour = {
  title: string;
  image: string;
  duration: string;
  category: string;
  price: {
    adult: number | null;
    child: number | null;
    note: string;
  };
  description: string;
  overview: string;
  highlights: string[];
  itinerary: string[];
  included: string[];
  notIncluded: string[];
  childPolicy: string[];
  bestFor: string[];
  localTips: string[];
};

type Service = {
  icon: string;
  title: string;
  description: string;
  price: string;
  details: string[];
  bestFor: string[];
  note: string;
};

type LocalTip = {
  icon: string;
  title: string;
  description: string;
  details: string[];
  bestFor: string[];
};

type Traveler = {
  country: string;
  image: string;
  caption: string;
};

const travelers: Traveler[] = [
  {
    country: "🇮🇳 India",
    image: "/travelers/india.jpg",
    caption: "Family trip in Central Vietnam",
  },
  {
    country: "🇷🇺 Russia",
    image: "/travelers/russia.jpg",
    caption: "Hoi An local experience",
  },
  {
    country: "🇰🇿 Kazakhstan",
    image: "/travelers/kazakhstan.jpg",
    caption: "Adventure and nature journey",
  },
  {
    country: "🇩🇪 Germany",
    image: "/travelers/germany.jpg",
    caption: "Culture walk in Hoi An",
  },
  {
    country: "🇮🇳 India",
    image: "/travelers/india-2.jpg",
    caption: "Da Nang private support",
  },
  {
    country: "🇷🇺 Russia",
    image: "/travelers/russia-2.jpg",
    caption: "Russian-speaking local support",
  },
  {
    country: "🇦🇺 Australia",
    image: "/travelers/australia.jpg",
    caption: "Imperial Hue Heritage Experience",
  },
  {
    country: "🇰🇷 Korea",
    image: "/travelers/korea.jpg",
    caption: "Sunrise SUP Adventure at Man Thai Beach",
  },
];

const services: Service[] = [
  {
    icon: "🚕",
    title: "Airport Transfer",
    description:
      "Convenient airport pickup and drop-off with trusted local drivers.",
    price: "Contact for route-based price",
    details: [
      "Da Nang Airport pickup and drop-off",
      "Hotel transfer in Da Nang, Hoi An and nearby areas",
      "Clear meeting point and WhatsApp support",
      "Private car options for couples, families and groups",
      "Flexible timing based on your flight schedule",
    ],
    bestFor: [
      "First-time visitors",
      "Families with luggage",
      "Late-night or early-morning flights",
      "Travelers who want a smooth arrival",
    ],
    note:
      "Send us your flight time, hotel name and number of guests. GoVietStay will suggest the right car option.",
  },
  {
    icon: "📱",
    title: "SIM & eSIM",
    description:
      "Stay connected from the moment you arrive in Vietnam.",
    price: "From 150,000 VND / $6",
    details: [
      "Vietnam travel SIM support",
      "High-data options for tourists",
      "Simple setup guidance",
      "Delivery or pickup support in central Da Nang when available",
      "WhatsApp help if activation support is needed",
    ],
    bestFor: [
      "International travelers",
      "Remote workers",
      "Families needing navigation",
      "Guests using WhatsApp, Grab and Google Maps",
    ],
    note:
      "Popular option: 5GB/day for 30 days, depending on current carrier availability.",
  },
  {
    icon: "🚗",
    title: "Private Car Service",
    description:
      "Flexible transportation for sightseeing, transfers and day trips.",
    price: "Contact for custom route price",
    details: [
      "Private car for Da Nang, Hoi An, Hue and nearby destinations",
      "Half-day and full-day route planning",
      "Comfortable option for families and small groups",
      "Flexible stops for photos, cafés and meals",
      "Local route advice before departure",
    ],
    bestFor: [
      "Private tours",
      "Families",
      "Small groups",
      "Travelers who dislike fixed group schedules",
    ],
    note:
      "Send your route, date, pickup location and number of guests for a suitable quote.",
  },
  {
    icon: "💬",
    title: "Travel Support 24/7",
    description:
      "Fast local assistance before and during your journey.",
    price: "Free consultation on WhatsApp",
    details: [
      "Local travel advice for Da Nang, Hoi An and Hue",
      "Help choosing tours, restaurants and timing",
      "Support during weather changes or schedule changes",
      "Recommendations for families, couples and international travelers",
      "WhatsApp-first communication for fast replies",
    ],
    bestFor: [
      "First-time Vietnam travelers",
      "Travelers needing local confidence",
      "Guests comparing tour options",
      "People who prefer human support",
    ],
    note:
      "GoVietStay focuses on helping first, recommending second and selling later.",
  },
];

const localTips: LocalTip[] = [
  {
    icon: "🏖️",
    title: "Best Time To Visit",
    description:
      "When to visit beaches, old towns, mountains and night markets.",
    details: [
      "Ba Na Hills is best in the morning for cooler weather and fewer crowds.",
      "Hoi An Ancient Town is most beautiful from late afternoon to evening.",
      "Da Nang beaches are best in the morning or near sunset.",
      "Marble Mountains and Son Tra are more comfortable early morning or late afternoon.",
      "During rainy season, keep a flexible plan and ask GoVietStay before booking sea activities.",
    ],
    bestFor: [
      "First-time visitors",
      "Families",
      "Photo lovers",
      "Travelers planning multiple destinations",
    ],
  },
  {
    icon: "🍜",
    title: "Local Food Guide",
    description:
      "What to try in Da Nang, Hoi An and Hue — from street food to local restaurants.",
    details: [
      "Da Nang: try Mi Quang, Banh Xeo, seafood and Vietnamese coffee.",
      "Hoi An: try Cao Lau, chicken rice, white rose dumplings and local cafés.",
      "Hue: try Bun Bo Hue, royal-style dishes and traditional local snacks.",
      "Tell us if you avoid pork, seafood or spicy food.",
      "For families, GoVietStay can suggest clean, comfortable and traveler-friendly food stops.",
    ],
    bestFor: [
      "Food lovers",
      "Families",
      "Couples",
      "Travelers who want authentic but safe local food",
    ],
  },
  {
    icon: "🎆",
    title: "Events & Fireworks",
    description:
      "Useful updates about festivals, fireworks, night activities and seasonal events.",
    details: [
      "Dragon Bridge fire and water show usually happens on Friday, Saturday and Sunday nights.",
      "Fireworks and festival dates can change depending on the event schedule.",
      "Han River cruise is a good option for city lights and evening views.",
      "Book early during fireworks season because good seats and boats can sell out.",
      "Ask GoVietStay for weekly updates before planning your evening schedule.",
    ],
    bestFor: [
      "Couples",
      "Families",
      "Night activity seekers",
      "Travelers visiting Da Nang on weekends",
    ],
  },
];


const travelUpdates = [
  {
    image: "/updates/bana-ticket.jpg",
    title: "Ba Na Hills 2026 Ticket Price",
    description: "Official ticket price reference and GoVietStay local support update.",
  },
  {
    image: "/updates/car-price.jpg",
    title: "Da Nang Transport Price",
    description: "Airport transfer, Da Nang, Hoi An and local route price reference.",
  },
  {
    image: "/updates/bana-ticket2.jpg",
    title: "Ba Na Hills Promotion",
    description: "Latest Ba Na Hills update from GoVietStay.",
  },
  {
    image: "/updates/car-price2.jpg",
    title: "Private Car Service",
    description: "Updated transport options and private car services.",
  },
];
const tours: Tour[] = [
  {
    title: "Ba Na Hills & Golden Bridge",
    image: "/tour/bana.jpg",
    duration: "08:00 – 17:00 / 11:30 – 19:00",
    category: "Private Experience",
    price: {
      adult: 1770000,
      child: 1450000,
      note: "Morning tour reference price. Afternoon option from 1,700,000 VND/adult.",
    },
    description:
      "Visit the iconic Golden Bridge, cable cars, French Village and breathtaking mountain views.",
    overview:
      "A full-day Ba Na Hills experience from Da Nang with the Golden Bridge, cable car, French Village, Fantasy Park and beautiful mountain scenery. This is one of the most popular day trips for first-time travelers in Central Vietnam.",
    highlights: [
      "Golden Bridge",
      "Cable Car",
      "French Village",
      "Fantasy Park",
      "Mountain views",
    ],
    itinerary: [
      "Hotel pickup and transfer to Ba Na Hills.",
      "Experience the cable car and enjoy panoramic mountain views.",
      "Check in at Golden Bridge, Le Jardin Garden and Linh Ung Pagoda.",
      "Enjoy lunch or buffet depending on selected package.",
      "Explore French Village and Fantasy Park.",
      "Return by cable car and transfer back to hotel.",
    ],
    included: [
      "Hotel pickup and drop-off",
      "English-speaking support",
      "Round-trip cable car",
      "Golden Bridge ticket",
      "Meal option depending on package",
      "Bottled water",
    ],
    notIncluded: [
      "Personal expenses",
      "Wax Museum ticket",
      "Wine Cellar ticket",
      "Prize-winning games",
    ],
    childPolicy: [
      "Under 1m: free of charge",
      "1m – 1.3m: child rate",
      "Above 1.3m: adult rate",
    ],
    bestFor: ["Families", "Couples", "First-time visitors", "Photo lovers"],
    localTips: [
      "Go early for better Golden Bridge photos.",
      "Bring a light jacket because the mountain can be cool.",
      "Buffet option is convenient for families.",
    ],
  },
  {
    title: "Hoi An Ancient Town",
    image: "/tour/hoian.jpg",
    duration: "Half Day / Evening",
    category: "Private Experience",
    price: {
      adult: 1250000,
      child: 1000000,
      note: "Estimated private experience rate. Final price depends on pickup location and inclusions.",
    },
    description:
      "Explore lantern streets, riverside cafés, local food and the charm of Vietnam’s heritage town.",
    overview:
      "A relaxing cultural trip to Hoi An Ancient Town with lantern streets, riverside atmosphere, local food, cafés, night market and optional boat experience. Best for travelers who want a slow, beautiful evening experience.",
    highlights: [
      "Lantern streets",
      "Japanese Covered Bridge area",
      "Hoi An night market",
      "Riverside walking route",
      "Local food and cafés",
    ],
    itinerary: [
      "Hotel pickup from Da Nang or Hoi An.",
      "Walk through the ancient streets and heritage houses area.",
      "Visit the Japanese Covered Bridge area and local shops.",
      "Enjoy riverside cafés, lantern streets and night market.",
      "Optional boat ride or local dinner experience.",
      "Transfer back to hotel.",
    ],
    included: [
      "Trip planning support",
      "Hotel pickup arrangement",
      "Local recommendations",
      "WhatsApp support",
    ],
    notIncluded: [
      "Entrance ticket if required",
      "Meals and drinks",
      "Boat ride fee",
      "Personal expenses",
    ],
    childPolicy: [
      "Child policy depends on final transport and activity package.",
      "Contact GoVietStay for family pricing.",
    ],
    bestFor: ["Couples", "Families", "Culture lovers", "Photographers"],
    localTips: [
      "Best time is late afternoon to evening.",
      "Lantern photos are best after sunset.",
      "Hoi An is best enjoyed slowly, not rushed.",
    ],
  },
  {
    title: "Hue Imperial City",
    image: "/tour/hue.jpg",
    duration: "07:00 – 19:00",
    category: "Private Experience",
    price: {
      adult: 2750000,
      child: 2100000,
      note: "Reference package includes two meals.",
    },
    description:
      "Discover Vietnam’s royal history through ancient citadels, pagodas and imperial tombs.",
    overview:
      "A full-day journey to Hue, Vietnam’s former imperial capital. Visit the Imperial Citadel, Khai Dinh Tomb, Thien Mu Pagoda and enjoy the poetic atmosphere of the Perfume River.",
    highlights: [
      "Imperial Citadel",
      "Khai Dinh Tomb",
      "Thien Mu Pagoda",
      "Dragon boat cruise",
      "Traditional craft village",
    ],
    itinerary: [
      "Hotel pickup and depart for Hue.",
      "Visit the Imperial Citadel and royal heritage area.",
      "Explore Khai Dinh Tomb and historical architecture.",
      "Visit Thien Mu Pagoda by the Perfume River.",
      "Enjoy a dragon boat cruise.",
      "Lunch in Hue and dinner in Tra Que depending on package.",
      "Return to Da Nang or Hoi An.",
    ],
    included: [
      "Hotel pickup and drop-off",
      "English-speaking guide",
      "Entrance tickets",
      "Boat ride",
      "Lunch in Hue",
      "Dinner in Tra Que",
    ],
    notIncluded: ["Drinks", "Tips for guide and driver", "Personal expenses"],
    childPolicy: [
      "Child price available according to package.",
      "Children under supplier height/age rules may receive discounted rate.",
    ],
    bestFor: ["History lovers", "Culture travelers", "Families", "Slow travelers"],
    localTips: [
      "Start early because this is a long full-day trip.",
      "Bring sun protection.",
      "Hue food is very special, so enjoy the local meals.",
    ],
  },
  {
    title: "Marble Mountains & Son Tra",
    image: "/tour/marble.jpg",
    duration: "08:00 – 14:00 / 14:00 – 18:30",
    category: "Private Experience",
    price: {
      adult: 850000,
      child: 650000,
      note: "Morning tour reference price. Afternoon option from 800,000 VND/adult.",
    },
    description:
      "Visit caves, temples, Lady Buddha and scenic viewpoints overlooking Da Nang coastline.",
    overview:
      "A half-day discovery of Marble Mountains and Son Tra Peninsula, combining natural caves, pagodas, ocean views, stone carving village and Linh Ung Pagoda.",
    highlights: [
      "Marble Mountains",
      "Natural caves",
      "Stone carving village",
      "Son Tra Peninsula",
      "Linh Ung Pagoda",
      "Lady Buddha",
    ],
    itinerary: [
      "Hotel pickup and depart for Marble Mountains.",
      "Explore mystical caves and ancient pagodas.",
      "Visit Non Nuoc Stone Carving Village.",
      "Enjoy lunch with local family near Marble Mountains for morning option.",
      "Transfer to Son Tra Peninsula.",
      "Visit Linh Ung Pagoda and enjoy panoramic ocean views.",
      "Return to hotel.",
    ],
    included: [
      "Door-to-door transfer",
      "English-speaking guide",
      "Entrance fees",
      "Bottled water",
      "Lunch for morning tour",
    ],
    notIncluded: ["Personal expenses", "Additional drinks"],
    childPolicy: [
      "Under 4 years old: free",
      "5 – 9 years old: 75% adult price",
      "From 10 years old: adult price",
    ],
    bestFor: ["Families", "Nature lovers", "Culture travelers", "Easy adventure"],
    localTips: [
      "Wear comfortable shoes for steps and caves.",
      "Morning or late afternoon is better for photos.",
      "Respect temple areas and dress politely.",
    ],
  },
  {
    title: "Coconut Forest Basket Boat",
    image: "/tour/coconut.jpg",
    duration: "08:00 – 13:00 / 14:00 – 19:00",
    category: "Private Experience",
    price: {
      adult: 900000,
      child: 650000,
      note: "Morning cooking class & basket boat package. Afternoon from 1,000,000 VND/adult.",
    },
    description:
      "Enjoy a fun basket boat ride through the coconut jungle and local fishing culture.",
    overview:
      "A fun Hoi An countryside experience combining Cam Thanh Coconut Forest, basket boat ride, local market visit and hands-on cooking class.",
    highlights: [
      "Basket boat experience",
      "Coconut forest",
      "Local market visit",
      "Hands-on cooking class",
      "Local cuisine",
    ],
    itinerary: [
      "Pickup at hotel in Hoi An center.",
      "Visit a local market and hand-pick fresh ingredients.",
      "Explore Cam Thanh Coconut Forest by bamboo basket boat.",
      "Watch local fishermen demonstrate traditional fishing.",
      "Join a cooking class and prepare local dishes.",
      "Enjoy lunch or dinner and return to hotel.",
    ],
    included: [
      "Round-trip transfer within Hoi An center",
      "Cam Thanh Coconut Forest entrance ticket",
      "Basket boat experience",
      "Cooking class",
      "Lunch or dinner",
      "English-speaking guide",
      "Bottled water",
    ],
    notIncluded: ["Personal expenses", "Tips for guide and driver"],
    childPolicy: [
      "Up to 4 years old: free",
      "5 – 9 years old: 75% adult price",
      "From 10 years old: adult price",
    ],
    bestFor: ["Families", "Kids", "Groups", "Food lovers"],
    localTips: [
      "Can combine with Hoi An Ancient Town.",
      "Good for families who want a relaxed activity.",
      "Tell us if you have dietary restrictions.",
    ],
  },
  {
    title: "Cham Island Snorkeling",
    image: "/tour/cham.jpg",
    duration: "08:00 – 17:00",
    category: "Private Experience",
    price: {
      adult: 1550000,
      child: 1200000,
      note: "Joined tour by large wooden boat.",
    },
    description:
      "Experience crystal-clear waters, coral reefs and tropical island relaxation.",
    overview:
      "A full-day Cham Island sea experience with wooden boat transfer, snorkeling at two spots, seafood lunch and free beach time.",
    highlights: [
      "Wooden boat round trip",
      "Snorkeling at 2 spots",
      "Seafood lunch",
      "Beach free time",
      "Island scenery",
    ],
    itinerary: [
      "Pickup and transfer to Cua Dai port.",
      "Board the wooden boat to Cham Island.",
      "First snorkeling session.",
      "Move to marine protected area for second snorkeling session.",
      "Enjoy seafood lunch on the island.",
      "Free time for resting and sunbathing on the beach.",
      "Return by wooden boat and transfer back to hotel.",
    ],
    included: [
      "Shared wooden boat",
      "All entrance tickets",
      "Snorkeling at 2 spots",
      "English-speaking guide",
      "Lunch",
    ],
    notIncluded: ["Personal drinks", "Other incurred expenses"],
    childPolicy: [
      "Child price available according to tour package.",
      "Final child policy depends on boat operator rules.",
    ],
    bestFor: ["Beach lovers", "Adventure travelers", "Groups", "Families"],
    localTips: [
      "Weather and sea conditions matter for this tour.",
      "Bring swimwear, towel and sunscreen.",
      "Best during calm sea season.",
    ],
  },
  {
    title: "Hai Van Pass OFF-ROAD Motorbike Adventure and Lang Co",
    image: "/tour/haivan.jpg",
    duration: "08:30 – 16:30",
    category: "Private Experience",
    price: {
      adult: 2700000,
      child: null,
      note: "Reference price from Hai Van Pass off-road adventure package.",
    },
    description:
      "Travel one of Vietnam’s most scenic coastal roads with unforgettable mountain views.",
    overview:
      "A scenic adventure through Hai Van Pass with mountain views, coastal roads, photo stops and Lang Co fishing village. Ideal for travelers who want a more adventurous Central Vietnam experience.",
    highlights: [
      "Hai Van Pass views",
      "Off-road adventure style",
      "Lang Co seafood",
      "Coastal road",
      "Photo viewpoints",
    ],
    itinerary: [
      "Pickup and receive vehicle or meet driver.",
      "Ride along the spectacular coastal road.",
      "Conquer Hai Van Pass and stop for scenic photos.",
      "Stop at Lang Co fishing village.",
      "Enjoy premium seafood lunch.",
      "Leisurely ride back to the city and drop-off.",
    ],
    included: [
      "Vehicle with safe driver or self-driving option",
      "English-speaking guide",
      "Fresh seafood lunch",
      "Bottled water",
      "Entrance fees",
    ],
    notIncluded: ["Personal expenses", "Additional drinks"],
    childPolicy: [
      "Contact GoVietStay for child and family pricing.",
      "Adventure route suitability depends on age and safety conditions.",
    ],
    bestFor: ["Adventure travelers", "Photographers", "Couples", "Small groups"],
    localTips: [
      "Best on clear-weather days.",
      "Bring sunglasses and sunscreen.",
      "Great for travelers who want something more unique than a standard city tour.",
    ],
  },
  {
    title: "Da Nang Food Experience",
    image: "/tour/food.jpg",
    duration: "15:30 – 21:30",
    category: "Private Experience",
    price: {
      adult: 1300000,
      child: 1000000,
      note: "Reference from Da Nang Food Tour & Dragon Bridge Fire Show Cruise.",
    },
    description:
      "Taste authentic local dishes, hidden eateries and the vibrant street food scene.",
    overview:
      "An evening food and city experience featuring local Da Nang dishes, Han River cruise, night city views and the Dragon Bridge fire show on weekends.",
    highlights: [
      "6+ authentic dishes",
      "Local food stops",
      "Han River cruise",
      "Dragon Bridge fire show",
      "Night city views",
    ],
    itinerary: [
      "Hotel pickup.",
      "Explore local eateries and enjoy 6+ authentic dishes.",
      "Try Central Vietnam specialties such as Mi Quang, Banh Xeo and local seafood options.",
      "Board the Han River Cruise.",
      "Watch the city lights and Dragon Bridge fire show on weekends.",
      "Transfer back to hotel.",
    ],
    included: [
      "Door-to-door transfer",
      "Local English-speaking guide",
      "Food experience with more than 6 dishes",
      "Entrance fees",
      "Han River cruise ticket",
    ],
    notIncluded: ["Personal drinks", "Tips for guide"],
    childPolicy: [
      "Child price available according to package.",
      "Children’s menu can be adjusted when possible.",
    ],
    bestFor: ["Food lovers", "Couples", "Small groups", "First-time visitors"],
    localTips: [
      "Tell us if you avoid pork, seafood or spicy food.",
      "Weekend nights are best for Dragon Bridge fire show.",
      "This is a strong evening experience for Da Nang.",
    ],
  },
  {
    title: "APHRODITE Cruise - Premium cruise experience",
    image: "/tour/cruise.jpg",
    duration: "17:30 – 21:30",
    category: "Private Experience",
    price: {
      adult: 2400000,
      child: 1900000,
      note: "Reference from Aphrodite S16 premium sunset cruise package.",
    },
    description:
      "Enjoy sunset views, city lights and the famous Dragon Bridge along the Han River.",
    overview:
      "A premium sunset escape aboard Aphrodite S16 with hotel pickup, welcome drinks, sunset sailing, fine dining and relaxing evening views.",
    highlights: [
      "Premium cruise",
      "Sunset views",
      "Fine dining experience",
      "Welcome drink",
      "Memorable moments",
    ],
    itinerary: [
      "Hotel pickup and transfer to cruise dock.",
      "Welcome aboard Aphrodite S16.",
      "Enjoy drinks and admire the sunset.",
      "Premium fine dining dinner between courses.",
      "Return to the dock and transfer back to hotel.",
    ],
    included: [
      "Hotel pickup and drop-off",
      "Cruise onboard Aphrodite",
      "Premium fine dining",
      "Water / soft drinks / welcome drink",
    ],
    notIncluded: [
      "Additional drinks or cocktails",
      "Personal expenses",
      "Tips for crew",
      "VAT",
    ],
    childPolicy: [
      "Child 4+ years old reference rate available.",
      "Private cruise conditions may vary by operator.",
    ],
    bestFor: ["Couples", "Families", "Luxury travelers", "Evening plans"],
    localTips: [
      "Best for sunset and romantic photos.",
      "Book early for premium seats.",
      "Private tour options can be arranged on request.",
    ],
  },
  {
    title: "Da Nang Omakase Experience",
    image: "/tour/omakase.jpg",
    duration: "Half Day / Full Day",
    category: "Signature Experience",
    price: {
      adult: null,
      child: null,
      note: "Contact for custom price",
    },
    description:
      "A personalized local journey designed around your interests, pace and travel style.",
    overview:
      "Inspired by omakase, this signature GoVietStay experience lets our local team design the day around your interests: food, cafés, culture, beaches, hidden viewpoints, wellness, photography or local lifestyle.",
    highlights: [
      "Personalized itinerary",
      "Hidden local gems",
      "Flexible schedule",
      "Food and café recommendations",
      "Private customized journey",
    ],
    itinerary: [
      "Share your interests with GoVietStay.",
      "We design a flexible route based on your travel style.",
      "Choose food, cafés, culture, beaches, wellness or hidden viewpoints.",
      "Enjoy a private local experience with real-time support.",
      "Adjust the route naturally during the day if needed.",
    ],
    included: [
      "Personalized planning",
      "Local recommendations",
      "WhatsApp consultation",
      "Flexible itinerary support",
      "GoVietStay local assistance",
    ],
    notIncluded: [
      "Meals and drinks",
      "Entrance tickets",
      "Transportation unless arranged",
      "Personal expenses",
    ],
    childPolicy: [
      "Family-friendly version can be arranged.",
      "Final price depends on route, transport and inclusions.",
    ],
    bestFor: [
      "Couples",
      "Solo travelers",
      "Returning visitors",
      "Food lovers",
      "Travelers who dislike standard tours",
    ],
    localTips: [
      "Best for travelers with an open mind.",
      "Tell us your interests and we will design the route.",
      "Perfect if you want something more personal than a normal tour.",
    ],
  },
  {
    title: "ATV Adventure Experience",
    image: "/tour/ATV.jpg",
    duration: "Half Day",
    category: "Adventure Experience",
    price: {
  adult: 1450000,
  child: 1200000,
  note: "Reference price. Final price may change by route, date and group size.",
},
    description:
      "Enjoy an exciting ATV ride through nature trails, local countryside roads and scenic outdoor landscapes.",
    overview:
      "A fun adventure experience near Da Nang for travelers who want something active, exciting and different from a normal sightseeing tour. GoVietStay helps arrange ATV booking, private transfer and local support before and during the experience.",
    highlights: [
      "ATV riding experience",
      "Outdoor adventure",
      "Nature and countryside scenery",
      "Photo stops",
      "Private transfer support",
    ],
    itinerary: [
      "Hotel pickup from Da Nang or nearby area.",
      "Transfer to the ATV experience location.",
      "Safety briefing and basic riding instructions.",
      "Enjoy ATV riding with local operator support.",
      "Take photos and relax after the ride.",
      "Return transfer to hotel.",
    ],
    included: [
      "Trip planning support",
      "ATV experience arrangement",
      "Local operator coordination",
      "WhatsApp support",
      "Private transfer can be arranged on request",
    ],
    notIncluded: [
      "Personal expenses",
      "Meals and drinks",
      "Tips",
      "Insurance unless provided by operator",
      "Transfer if not selected",
    ],
    childPolicy: [
      "Age and height rules depend on operator safety policy.",
      "Children may ride as passengers only when allowed by the operator.",
      "Please share child age and height before booking.",
    ],
    bestFor: [
      "Adventure travelers",
      "Groups of friends",
      "Couples",
      "Young travelers",
      "Travelers who want an active experience",
    ],
    localTips: [
      "Wear comfortable clothes and closed shoes.",
      "Bring sunglasses, sunscreen and a change of clothes if needed.",
      "Best on clear-weather days.",
      "GoVietStay can help check safety conditions before booking.",
    ],
  },
  {
    title: "Nui Than Tai Hot Springs Park",
    image: "/tour/Nui Than Tai.jpg",
    duration: "Full Day",
    category: "Family Experience",
    price: {
  adult: 1250000,
  child: 950000,
  note: "Reference price. Final price depends on ticket option and pickup location.",
},
    description:
      "Relax at Nui Than Tai Hot Springs Park with mineral baths, water park areas, nature scenery and family-friendly activities.",
    overview:
      "A relaxing full-day experience from Da Nang to Nui Than Tai Hot Springs Park. This is a good choice for families, couples and travelers who want a comfortable nature escape with hot springs, water activities and light entertainment.",
    highlights: [
      "Hot springs",
      "Mineral bath",
      "Water park",
      "Nature scenery",
      "Family-friendly activities",
    ],
    itinerary: [
      "Hotel pickup in Da Nang.",
      "Transfer to Nui Than Tai Hot Springs Park.",
      "Enjoy hot springs, mineral bath and water park areas.",
      "Free time for lunch and relaxing activities.",
      "Optional paid services inside the park depending on your preference.",
      "Return transfer to hotel.",
    ],
    included: [
      "Trip planning support",
      "Ticket support",
      "Transfer arrangement",
      "Local travel advice",
      "WhatsApp support",
    ],
    notIncluded: [
      "Entrance ticket if not included in selected package",
      "Meals and drinks",
      "Personal expenses",
      "Optional paid services inside the park",
      "Towels or rental items if required by operator",
    ],
    childPolicy: [
      "Child price depends on park ticket policy.",
      "Please share child age and height before booking.",
      "Family pricing can be checked before confirmation.",
    ],
    bestFor: [
      "Families",
      "Couples",
      "Relaxation travelers",
      "Rainy-day backup plan",
      "Travelers who want an easy day trip from Da Nang",
    ],
    localTips: [
      "Bring swimwear, towel and dry clothes.",
      "Good option for families with children.",
      "Check ticket policy and weather before departure.",
      "Can be combined with private transfer from Da Nang.",
    ],
  },
];

export default function Home() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTip, setSelectedTip] = useState<LocalTip | null>(null);
  const [daoOpen, setDaoOpen] = useState(false);
  const [daoInput, setDaoInput] = useState("");
  const [daoMessages, setDaoMessages] = useState<ChatMessage[]>([
    DAO_STARTER_MESSAGE,
  ]);

  const sendDaoMessage = async () => {
    const trimmed = daoInput.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };

    setDaoMessages((prev) => [...prev, userMessage]);
    setDaoInput("");

    try {
      const response = await fetch("/api/dao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();

      setDaoMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, Đào is temporarily unavailable. Please contact GoVietStay via WhatsApp +84 937 762 607.",
        },
      ]);
    } catch (error) {
      setDaoMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, Đào is temporarily unavailable. Please contact GoVietStay via WhatsApp +84 937 762 607.",
        },
      ]);
    }
  };

  useEffect(() => {
    document.title = "GoVietStay | Da Nang • Hoi An • Hue";
  }, []);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <style>{`
        @keyframes gvsFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gvsSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .gvs-overlay {
          animation: gvsFadeIn 220ms ease-out;
        }

        .gvs-panel {
          animation: gvsSlideUp 260ms ease-out;
        }

        @keyframes travelBoardScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .travel-board-track {
          width: max-content;
          animation: travelBoardScroll 34s linear infinite;
        }

        .travel-board-track:hover {
          animation-play-state: paused;
        }

        @keyframes daoPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 22px 55px rgba(255, 196, 0, 0.28);
          }
        }

        @keyframes daoRing {
          0% {
            transform: scale(0.9);
            opacity: 0.55;
          }
          70%, 100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        @keyframes daoOnlineBlink {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.55;
            transform: scale(0.86);
          }
        }

        .dao-floating-button {
          animation: daoPulse 2.2s ease-in-out infinite;
        }

        .dao-floating-avatar::before {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          background: rgba(255, 196, 0, 0.38);
          animation: daoRing 2.2s ease-out infinite;
          z-index: -1;
        }

        .dao-online-dot {
          animation: daoOnlineBlink 1.6s ease-in-out infinite;
        }

        @keyframes heroSoftZoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }

        .hero-cinematic-image {
          animation: heroSoftZoom 24s ease-in-out infinite;
          transform-origin: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cinematic-image,
          .travel-board-track,
          .dao-floating-button,
          .dao-floating-avatar::before,
          .dao-online-dot {
            animation: none;
          }
        }
      `}</style>

      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/hero-hoian-new.png"
          alt="Hoi An Ancient Town"
          fill
          priority
          className="object-cover object-center hero-cinematic-image"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-black/15" />

        <header className="absolute top-4 left-4 right-4 z-20 rounded-full bg-black/35 backdrop-blur-md border border-white/10 px-5 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="GoVietStay"
              width={54}
              height={54}
              className="rounded-full"
            />
            <div>
              <h2 className="text-white font-bold text-lg md:text-xl">
                GoVietStay
              </h2>
              <p className="text-white/70 text-xs">Trusted Local Support</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-white/90 font-medium">
            <a href="#experiences">Experiences</a>
            <a href="#travelers">International Travelers</a>
            <a href="#local-tips">Local Tips</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="relative z-10 min-h-screen flex items-center px-6 md:px-20 pt-28">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[4px] text-yellow-400 mb-5 text-xs md:text-sm font-semibold">
              Discover Central Vietnam
            </p>

            <h1 className="text-white font-bold leading-[1.05] text-5xl md:text-7xl lg:text-8xl">
              Da Nang
              <br />
              Hoi An
              <br />
              Hue
            </h1>

            <p className="mt-7 text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed">
              Private tours, local guides and WhatsApp support 24/7.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://wa.me/84937762607"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-600 px-7 py-4 font-semibold hover:bg-green-700 transition text-center"
              >
                Plan on WhatsApp
              </a>

              <button
                onClick={() => setDaoOpen(true)}
                className="rounded-full border border-white/60 px-7 py-4 font-semibold hover:bg-white hover:text-black transition text-center"
              >
                Ask Đào
              </button>

              <a
                href="#experiences"
                className="rounded-full bg-yellow-400 px-7 py-4 font-semibold text-black hover:bg-yellow-500 transition text-center"
              >
                View Experiences
              </a>
            </div>

            <div className="mt-12 hidden md:grid grid-cols-3 gap-8 text-sm text-white/80">
              <div>
                <p className="font-bold text-white">Private Tours</p>
                <p>Flexible local itineraries</p>
              </div>
              <div>
                <p className="font-bold text-white">Trusted Support</p>
                <p>Da Nang • Hoi An • Hue</p>
              </div>
              <div>
                <p className="font-bold text-white">WhatsApp 24/7</p>
                <p>Fast travel assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full rounded-[2rem] border border-[#0b6b4f]/15 bg-white/65 p-6 md:p-10 shadow-xl shadow-[#06251b]/5">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-green-800 uppercase tracking-[4px] text-xs md:text-sm font-semibold">
              Why Travelers Choose Us
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
              Why Travelers Choose GoVietStay
            </h2>

            <p className="mt-5 text-[#06251b]/70 text-base md:text-lg leading-relaxed">
              More than tours, GoVietStay gives travelers trusted local support,
              flexible planning and real help before and during the journey.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                icon: "🛡️",
                title: "Trusted Local Support",
                text: "A real local team based in Central Vietnam, ready to guide you with honest advice and full support.",
              },
              {
                icon: "💬",
                title: "WhatsApp 24/7 Assistance",
                text: "Fast help before and during your trip. One message away whenever you need local support.",
              },
              {
                icon: "🚗",
                title: "Private Tours & Transfers",
                text: "Comfortable private cars, flexible tours and airport transfers designed around your schedule.",
              },
              {
                icon: "🗓️",
                title: "Personalized Travel Planning",
                text: "We design experiences based on your interests, travel time, budget and preferred travel style.",
              },
              {
                icon: "🌿",
                title: "Real Local Knowledge",
                text: "Hidden gems, local food, best timing and helpful tips you may not find on Google.",
              },
              {
                icon: "🌏",
                title: "Trusted By Travelers Worldwide",
                text: "Supporting travelers from India, Russia, Europe, Australia, Kazakhstan and many more countries.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-[#f7f1df]/80 border border-[#06251b]/10 p-5 md:p-6 text-center hover:bg-white hover:-translate-y-1 transition duration-300"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0b6b4f]/10 text-3xl">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg md:text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm md:text-base text-[#06251b]/70 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-[#eaf5eb] border border-[#0b6b4f]/20 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌐</div>
              <div>
                <h3 className="font-bold text-lg">More Than Tours — Your Local Friend In Central Vietnam</h3>
                <p className="mt-1 text-[#06251b]/70">
                  From airport arrival to your last day, GoVietStay is here to help you travel with confidence.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/84937762607"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
            >
              WhatsApp +84 937 762 607
            </a>
          </div>
        </div>
      </section>

      <section id="experiences" className="bg-[#071f17] text-white px-4 md:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-yellow-400 uppercase tracking-[4px] text-sm font-semibold">
            Featured Experiences
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Curated Local Tours
          </h2>

          <p className="mt-6 text-white/70 max-w-2xl text-lg">
            Handpicked private experiences across Da Nang, Hoi An and Hue —
            designed for travelers who want comfort, trust and authentic local support.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 md:gap-6">
            {tours.map((tour) => (
              <div
                key={tour.title}
                onClick={() => setSelectedTour(tour)}
                className="cursor-pointer w-full rounded-3xl bg-white/10 border border-white/10 p-5 md:p-6 hover:bg-white/15 hover:-translate-y-1 transition duration-300"
              >
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={600}
                  height={400}
                  className="h-40 md:h-44 w-full object-cover rounded-2xl mb-5 md:mb-6"
                />

                <h3 className="text-xl md:text-2xl font-bold leading-tight">{tour.title}</h3>

                <div className="mt-2 text-xs text-yellow-400 uppercase tracking-wider">
                  {tour.category}
                </div>

                <p className="mt-3 text-white/65">{tour.description}</p>

                <div className="mt-5 text-sm text-white/80">
                  {tour.price.adult ? (
                    <>
                      From{" "}
                      <span className="text-yellow-400 font-bold">
                        {formatVND(tour.price.adult)}
                      </span>{" "}
                      / {formatUSD(tour.price.adult)}
                    </>
                  ) : (
                    <span className="text-yellow-400 font-bold">
                      Contact for custom price
                    </span>
                  )}
                </div>

                <button className="mt-6 text-yellow-400 font-semibold">
                  View details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="travelers" className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
            International Travelers
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Guests From Around The World
          </h2>

          <p className="mt-6 text-[#06251b]/70 max-w-3xl text-lg">
            Travelers from India, Russia, Kazakhstan, Germany, Australia and many
            other countries have explored Central Vietnam with GoVietStay local support.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {travelers.map((traveler) => (
              <div
                key={traveler.country + traveler.image}
                className="group relative overflow-hidden rounded-3xl bg-[#d8c7a1] aspect-square"
              >
                <Image
                  src={traveler.image}
                  alt={traveler.country}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-sm md:text-base font-bold">
                    {traveler.country}
                  </div>
                  <div className="mt-1 text-xs text-white/75 hidden md:block">
                    {traveler.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06251b] text-white px-4 md:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-yellow-400 uppercase tracking-[4px] text-sm font-semibold">
            Travel Services
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Everything You Need For A Smooth Trip
          </h2>

          <p className="mt-6 text-white/70 max-w-3xl text-lg">
            Beyond tours, GoVietStay helps travelers stay connected, move around
            comfortably and enjoy Central Vietnam with confidence.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 md:gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                onClick={() => setSelectedService(service)}
                className="cursor-pointer w-full rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:-translate-y-1 transition duration-300"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">{service.description}</p>
                <p className="mt-5 text-yellow-400 font-semibold">
                  View service →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="local-tips" className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
            Local Tips
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Travel Like A Local
          </h2>

          <p className="mt-6 text-[#06251b]/70 max-w-3xl text-lg">
            Simple local guidance to help you enjoy Da Nang, Hoi An and Hue with more confidence.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 md:gap-6">
            {localTips.map((tip) => (
              <div
                key={tip.title}
                onClick={() => setSelectedTip(tip)}
                className="cursor-pointer w-full rounded-3xl bg-white/60 border border-[#06251b]/10 p-6 md:p-8 hover:bg-white hover:-translate-y-1 transition duration-300"
              >
                <div className="text-5xl mb-6">{tip.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold">{tip.title}</h3>
                <p className="mt-4 text-[#06251b]/70 text-base md:text-lg leading-relaxed">{tip.description}</p>
                <button className="mt-6 text-green-800 font-semibold">
                  Read more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
            Latest Updates
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            GoVietStay Travel Board
          </h2>

          <p className="mt-6 text-[#06251b]/70 max-w-3xl text-lg">
            Fresh price boards, transport updates and useful travel information
            from GoVietStay — the same updates we share on Google Maps.
          </p>

          <div className="mt-12 overflow-hidden rounded-3xl">
            <div className="travel-board-track flex gap-6">
              {[...travelUpdates, ...travelUpdates].map((update, index) => (
                <div
                  key={update.image + index}
                  className="min-w-[330px] md:min-w-[560px] lg:min-w-[680px] rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#06251b]/10"
                >
                  <div className="relative h-[430px] md:h-[560px] lg:h-[640px] bg-[#06251b]/5">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {update.title}
                    </h3>
                    <p className="mt-2 text-[#06251b]/65">
                      {update.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-[#06251b]/60">
            Tip: hover on desktop to pause the board. On mobile, you can swipe horizontally.
          </p>
        </div>
      </section>

      <section className="bg-[#06251b] text-white px-4 md:px-20 py-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-yellow-400 uppercase tracking-[4px] text-sm font-semibold">
            Google Reviews
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Trusted By Travelers
          </h2>

          <p className="mt-6 text-white/70 max-w-3xl mx-auto text-lg">
            Real travelers choose GoVietStay for private tours, local support and smooth travel experiences across Central Vietnam.
          </p>

          <div className="mt-12 rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12">
            <div className="text-5xl">⭐⭐⭐⭐⭐</div>

            <h3 className="mt-6 text-3xl md:text-4xl font-bold">
              Share Your Experience On Google
            </h3>

            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Your review helps other international travelers discover trusted local support in Da Nang, Hoi An and Hue.
            </p>

            <a
              href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 rounded-full bg-yellow-400 px-8 py-4 font-semibold text-black hover:bg-yellow-500 transition"
            >
              Review GoVietStay
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-[#071f17] text-white px-4 md:px-20 py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="text-yellow-400 uppercase tracking-[4px] text-sm font-semibold">
            Ready To Explore Vietnam?
          </p>

          <h2 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
            Plan Your Trip
            <br />
            With GoVietStay
          </h2>

          <p className="mt-8 text-xl text-white/70 max-w-3xl mx-auto">
            Private tours, trusted local support and fast WhatsApp assistance
            for travelers visiting Da Nang, Hoi An and Hue.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/84937762607"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-8 py-4 font-semibold hover:bg-green-700 transition"
            >
              Plan on WhatsApp
            </a>

            <button
              onClick={() => setDaoOpen(true)}
              className="rounded-full border border-white/40 px-8 py-4 font-semibold hover:bg-white hover:text-black transition"
            >
              Ask Đào
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#02140f] text-white px-4 md:px-20 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">GoVietStay</h3>
              <p className="mt-4 text-white/60">
                Trusted Local Support for international travelers exploring Central Vietnam.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Destinations</h4>
              <ul className="space-y-2 text-white/60">
                <li>Da Nang</li>
                <li>Hoi An</li>
                <li>Hue</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-white/60">
                <li>Private Tours</li>
                <li>Airport Transfer</li>
                <li>SIM & eSIM</li>
                <li>Travel Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>WhatsApp</li>
                <li>Google Maps</li>
                <li>Telegram</li>
                <li>Email</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            © 2026 GoVietStay. All Rights Reserved.
          </div>
        </div>
      </footer>


      {/* ĐÀO FLOATING LOCAL TRAVEL ASSISTANT */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
        <button
          onClick={() => setDaoOpen(true)}
          aria-label="Ask Đào Local Travel Assistant"
          className="dao-floating-button group flex items-center gap-3 rounded-full bg-[#0b6b4f] p-2 md:px-4 md:py-3 shadow-2xl border border-white/10 hover:scale-105 transition-all duration-300"
        >
          <div className="dao-floating-avatar relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-yellow-400 text-2xl shadow-lg">
            <span className="relative z-10">👩🏻</span>
            <span className="dao-online-dot absolute right-0 top-0 z-20 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white shadow-md" />
          </div>

          <div className="hidden md:block pr-2 text-left">
            <div className="font-bold text-white leading-tight">Đào</div>
            <div className="text-xs text-white/75">
              Online • Local Travel Assistant
            </div>
          </div>
        </button>
      </div>

      {daoOpen && (
        <div
          className="gvs-overlay fixed inset-0 z-[999] bg-black/80 flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setDaoOpen(false)}
        >
          <div
            className="gvs-panel bg-[#f7f1df] text-[#06251b] rounded-t-3xl md:rounded-3xl w-full max-w-2xl h-[85svh] md:h-[78vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0b6b4f] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-2xl">
                  👩🏻
                </div>
                <div>
                  <div className="font-bold text-lg">Đào</div>
                  <div className="text-sm text-white/80">
                    GoVietStay Local Travel Assistant
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDaoOpen(false)}
                className="text-3xl leading-none hover:opacity-70"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f7f1df]">
              {daoMessages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.role === "assistant"
                      ? "max-w-[86%] rounded-2xl bg-white border border-[#06251b]/10 p-4 text-[#06251b]/80 leading-relaxed"
                      : "max-w-[86%] ml-auto rounded-2xl bg-[#0b6b4f] p-4 text-white leading-relaxed"
                  }
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="border-t border-[#06251b]/10 p-4 bg-white/80">
              <div className="flex gap-2">
                <input
                  value={daoInput}
                  onChange={(e) => setDaoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendDaoMessage();
                  }}
                  placeholder="Ask Đào about Da Nang, Hoi An, Hue..."
                  className="flex-1 rounded-full border border-[#06251b]/20 px-5 py-3 text-[#06251b] outline-none focus:border-[#0b6b4f]"
                />

                <button
                  onClick={sendDaoMessage}
                  className="rounded-full bg-[#0b6b4f] px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
                >
                  Send
                </button>
              </div>

              <a
                href={buildWhatsAppLink(
                  "Hello GoVietStay, I would like help planning my trip with Đào."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-full bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700 transition"
              >
                Continue on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedService && (
        <div
          className="gvs-overlay fixed inset-0 z-50 bg-black/80 flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="gvs-panel bg-[#f7f1df] text-[#06251b] rounded-t-3xl md:rounded-3xl max-w-4xl w-full max-h-[92svh] md:max-h-[90vh] overflow-y-auto overscroll-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 md:p-10">
              <div className="flex items-start justify-between gap-4 md:gap-4 md:gap-6">
                <div>
                  <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
                    Travel Service
                  </p>
                  <div className="mt-5 text-6xl">{selectedService.icon}</div>
                  <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
                    {selectedService.title}
                  </h2>
                  <p className="mt-4 text-lg text-[#06251b]/75">
                    {selectedService.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="text-3xl font-bold leading-none hover:opacity-60"
                >
                  ×
                </button>
              </div>

              <div className="mt-8 rounded-3xl bg-white/75 border border-[#06251b]/10 p-6">
                <h3 className="text-xl md:text-2xl font-bold">Price</h3>
                <p className="mt-3 text-lg font-bold text-green-800">
                  {selectedService.price}
                </p>
                <p className="mt-3 text-sm text-[#06251b]/60">
                  {selectedService.note}
                </p>
              </div>

              <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <div className="rounded-3xl bg-white/60 border border-[#06251b]/10 p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold">Service Details</h3>
                  <ul className="mt-4 space-y-2 text-[#06251b]/75">
                    {selectedService.details.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-white/60 border border-[#06251b]/10 p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold">Best For</h3>
                  <ul className="mt-4 space-y-2 text-[#06251b]/75">
                    {selectedService.bestFor.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/84937762607?text=${encodeURIComponent(
                    `Hello GoVietStay, I would like to ask about ${selectedService.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 transition"
                >
                  Ask on WhatsApp
                </a>

                <button
                  onClick={() => setSelectedService(null)}
                  className="rounded-full border border-[#06251b]/30 px-8 py-4 font-semibold hover:bg-[#06251b] hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTip && (
        <div
          className="gvs-overlay fixed inset-0 z-50 bg-black/80 flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setSelectedTip(null)}
        >
          <div
            className="gvs-panel bg-[#f7f1df] text-[#06251b] rounded-t-3xl md:rounded-3xl max-w-4xl w-full max-h-[92svh] md:max-h-[90vh] overflow-y-auto overscroll-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 md:p-10">
              <div className="flex items-start justify-between gap-4 md:gap-4 md:gap-6">
                <div>
                  <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
                    Local Tips
                  </p>
                  <div className="mt-5 text-6xl">{selectedTip.icon}</div>
                  <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
                    {selectedTip.title}
                  </h2>
                  <p className="mt-4 text-lg text-[#06251b]/75">
                    {selectedTip.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTip(null)}
                  className="text-3xl font-bold leading-none hover:opacity-60"
                >
                  ×
                </button>
              </div>

              <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <div className="rounded-3xl bg-white/60 border border-[#06251b]/10 p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold">Local Guidance</h3>
                  <ul className="mt-4 space-y-2 text-[#06251b]/75">
                    {selectedTip.details.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-white/60 border border-[#06251b]/10 p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold">Best For</h3>
                  <ul className="mt-4 space-y-2 text-[#06251b]/75">
                    {selectedTip.bestFor.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/84937762607?text=${encodeURIComponent(
                    `Hello GoVietStay, I would like to ask about local tips: ${selectedTip.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 transition"
                >
                  Ask GoVietStay on WhatsApp
                </a>

                <button
                  onClick={() => setSelectedTip(null)}
                  className="rounded-full border border-[#06251b]/30 px-8 py-4 font-semibold hover:bg-[#06251b] hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTour && (
        <div
          className="gvs-overlay fixed inset-0 z-50 bg-black/80 flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setSelectedTour(null)}
        >
          <div
            className="gvs-panel bg-[#f7f1df] text-[#06251b] rounded-t-3xl md:rounded-3xl max-w-6xl w-full max-h-[92svh] md:max-h-[90vh] overflow-y-auto overscroll-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedTour.image}
              alt={selectedTour.title}
              width={1400}
              height={800}
              className="w-full h-56 md:h-[420px] object-cover rounded-t-3xl"
            />

            <div className="p-5 md:p-10">
              <div className="flex items-start justify-between gap-4 md:gap-4 md:gap-6">
                <div>
                  <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
                    {selectedTour.category}
                  </p>

                  <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                    {selectedTour.title}
                  </h2>

                  <p className="mt-3 text-[#06251b]/70 font-semibold">
                    Duration: {selectedTour.duration}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTour(null)}
                  className="text-3xl font-bold leading-none hover:opacity-60"
                >
                  ×
                </button>
              </div>

              <div className="mt-8 rounded-3xl bg-white/75 border border-[#06251b]/10 p-6">
                <h3 className="text-xl md:text-2xl font-bold">Price</h3>

                {selectedTour.price.adult ? (
                  <>
                    <p className="mt-3 text-lg">
                      Adult:{" "}
                      <span className="font-bold text-green-800">
                        {formatVND(selectedTour.price.adult)}
                      </span>{" "}
                      / {formatUSD(selectedTour.price.adult)}
                    </p>

                    {selectedTour.price.child && (
                      <p className="mt-2 text-lg">
                        Child:{" "}
                        <span className="font-bold text-green-800">
                          {formatVND(selectedTour.price.child)}
                        </span>{" "}
                        / {formatUSD(selectedTour.price.child)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-3 text-lg font-bold text-green-800">
                    Contact for custom price
                  </p>
                )}

                <p className="mt-3 text-sm text-[#06251b]/60">
                  {selectedTour.price.note}
                </p>
              </div>

              <p className="mt-8 text-lg text-[#06251b]/75 leading-relaxed">
                {selectedTour.overview}
              </p>

              <div className="mt-10">
                <h3 className="text-xl md:text-2xl font-bold">Detailed Itinerary</h3>
                <div className="mt-5 space-y-4">
                  {selectedTour.itinerary.map((item, index) => (
                    <div key={item} className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-[#06251b]/75 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                {[
                  ["Highlights", selectedTour.highlights],
                  ["Best For", selectedTour.bestFor],
                  ["Included", selectedTour.included],
                  ["Not Included", selectedTour.notIncluded],
                  ["Child Policy", selectedTour.childPolicy],
                  ["Local Tips", selectedTour.localTips],
                ].map(([title, items]) => (
                  <div
                    key={title as string}
                    className="rounded-3xl bg-white/60 border border-[#06251b]/10 p-5 md:p-6"
                  >
                    <h3 className="text-xl md:text-2xl font-bold">{title as string}</h3>
                    <ul className="mt-4 space-y-2 text-[#06251b]/75">
                      {(items as string[]).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/84937762607?text=${encodeURIComponent(
                    `Hello GoVietStay, I would like to ask about ${selectedTour.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 transition"
                >
                  Plan This Tour on WhatsApp
                </a>

                <button
                  onClick={() => setSelectedTour(null)}
                  className="rounded-full border border-[#06251b]/30 px-8 py-4 font-semibold hover:bg-[#06251b] hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

