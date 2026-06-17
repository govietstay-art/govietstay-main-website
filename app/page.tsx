"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";

const EXCHANGE_RATE = 26000;

const formatVND = (value: number) => value.toLocaleString("en-US") + " VND";
const formatUSD = (value: number) => "$" + Math.round(value / EXCHANGE_RATE);

const DAO_WHATSAPP_LINK =
  "https://wa.me/84937762607?text=" +
  encodeURIComponent(
    "Hello GoVietStay, I would like to ask Đào for local travel help in Da Nang, Hoi An or Hue.",
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

type BookingForm = {
  fullName: string;
  whatsapp: string;
  email: string;
  travelDate: string;
  adults: string;
  children: string;
  hotel: string;
  pickupLocation: string;
  specialRequest: string;
};

const emptyBookingForm: BookingForm = {
  fullName: "",
  whatsapp: "",
  email: "",
  travelDate: "",
  adults: "",
  children: "",
  hotel: "",
  pickupLocation: "",
  specialRequest: "",
};

type Traveler = {
  country: string;
  image: string;
  caption: string;
};

type HappyTraveler = {
  image: string;
  country: string;
  flag: string;
  tour: string;
  location: string;
  date: string;
  note: string;
  featured?: boolean;
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
    note: "Send us your flight time, hotel name and number of guests. GoVietStay will suggest the right car option.",
  },
  {
    icon: "📱",
    title: "SIM & eSIM",
    description: "Stay connected from the moment you arrive in Vietnam.",
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
    note: "Popular option: 5GB/day for 30 days, depending on current carrier availability.",
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
    note: "Send your route, date, pickup location and number of guests for a suitable quote.",
  },
  {
    icon: "💬",
    title: "Travel Support 24/7",
    description: "Fast local assistance before and during your journey.",
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
    note: "GoVietStay focuses on helping first, recommending second and selling later.",
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
    description:
      "Official ticket price reference and GoVietStay local support update.",
  },
  {
    image: "/updates/car-price.jpg",
    title: "Da Nang Transport Price",
    description:
      "Airport transfer, Da Nang, Hoi An and local route price reference.",
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
    title: "Full Day Ba Na Hills & Golden Bridge",
    image: "/tour/bana.jpg",
    duration: "08:00 – 17:00 / 11:30 – 19:00",
    category: "Mountain • Iconic Landmark • Family Favorite",
    price: {
      adult: 1770000,
      child: 1450000,
      note: "Morning tour: Adult 1,770,000 VND, Child 1,450,000 VND. Afternoon tour: Adult 1,700,000 VND, Child 1,350,000 VND. Includes tour fee, cable car ticket and Ba Na buffet meal according to selected option.",
    },
    description:
      "Ride the world-famous cable car, walk the Golden Bridge, explore French Village and enjoy a complete Ba Na Hills day trip.",
    overview:
      "One of Central Vietnam’s most iconic experiences. This tour is designed for first-time visitors, families and couples who want a smooth day at Ba Na Hills with clear timing, hotel transfer, Golden Bridge photo time, French Village, Fantasy Park and buffet meal support.",
    highlights: [
      "Golden Bridge photo experience",
      "Ba Na Hills cable car",
      "French Village walking route",
      "Le Jardin D’Amour Garden and Linh Ung Pagoda",
      "Fantasy Park free time",
      "Buffet lunch or dinner depending on selected option",
    ],
    itinerary: [
      "08:00 – 09:00 / 11:30 – 12:30: Hotel pickup and transfer to Sun World Ba Na Hills.",
      "09:00 – 09:30 / 12:30 – 13:00: Take the cable car and enjoy panoramic mountain views.",
      "09:30 – 11:30 / 13:00 – 16:30: Check in at Golden Bridge, Le Jardin D’Amour Garden and Linh Ung Pagoda.",
      "11:30 – 13:00: Morning option enjoys buffet lunch at Ba Na Hills restaurant.",
      "13:00 – 15:30: Explore French Village and enjoy free time at Fantasy Park.",
      "15:30 – 16:00 / 17:30 – 18:00: Take the cable car down the mountain.",
      "16:00 – 17:00 / 18:00 – 19:00: Transfer back and drop off at your hotel.",
    ],
    included: [
      "Door-to-door hotel transfer",
      "Professional English-speaking guide",
      "Round-trip Ba Na cable car",
      "Golden Bridge ticket",
      "Meal according to selected itinerary",
      "Bottled water",
    ],
    notIncluded: [
      "Wax Museum and Wine Cellar entrance tickets",
      "Prize-winning games",
      "Alpine Coaster and climbing fees",
      "Personal expenses",
    ],
    childPolicy: [
      "Under 1m: free of charge",
      "1m – 1.3m: child rate applies",
      "Above 1.3m: adult rate applies depending on Sun World seasonal policy",
    ],
    bestFor: ["Families", "Couples", "First-time visitors", "Photo lovers"],
    localTips: [
      "Go in the morning for better Golden Bridge photos and lighter crowds.",
      "Bring a light jacket because Ba Na Hills can be cool and misty.",
      "Buffet option is convenient for families and groups.",
    ],
  },
  {
    title: "Hoi An By Night & Flower Lantern Release Experience",
    image: "/tour/hoian.jpg",
    duration: "15:15 – 19:30",
    category: "Heritage • Lantern Night • Joined Tour",
    price: {
      adult: 1250000,
      child: 950000,
      note: "Joined tour price. Private tour price available on request based on pickup location and group size.",
    },
    description:
      "Walk through Hoi An Ancient Town at dusk, ride a wooden boat on the Hoai River and release a flower lantern for good luck.",
    overview:
      "A romantic and cultural evening in Hoi An designed for travelers who want the best lantern atmosphere without rushing. The experience combines ancient streets, riverside scenery, a traditional wooden boat ride, flower lantern release and local dinner specialties.",
    highlights: [
      "Hoi An Ancient Town walking tour",
      "Lantern streets at dusk",
      "Traditional wooden boat on the Hoai River",
      "Flower lantern release experience",
      "Local dinner specialties",
    ],
    itinerary: [
      "14:00 – 15:00: Pickup and transfer to the center of Hoi An Ancient Town.",
      "15:00 – 17:30: Walking tour through UNESCO World Heritage streets at dusk.",
      "17:30 – 18:00: Take a traditional wooden boat ride on the poetic Hoai River.",
      "18:00 – 18:30: Release flower lanterns by hand for good luck.",
      "18:30 – 19:30: Enjoy local dinner specialties and end the tour.",
    ],
    included: [
      "Door-to-door transfer",
      "Entrance tickets to heritage sites",
      "English-speaking guide",
      "Traditional boat ride on the Hoai River",
      "Flower lantern release experience",
      "Dinner at a local restaurant",
    ],
    notIncluded: ["Personal expenses", "Additional drinks"],
    childPolicy: [
      "Child price applies according to joined tour policy.",
      "Please share child age before booking for confirmation.",
    ],
    bestFor: ["Couples", "Families", "Culture lovers", "Photographers"],
    localTips: [
      "Best photo time is from late afternoon to after sunset.",
      "Hoi An is best enjoyed slowly, not rushed.",
      "Good option for guests who want a gentle evening after a day in Da Nang.",
    ],
  },
  {
    title: "Hue Imperial City Heritage Journey",
    image: "/tour/hue.jpg",
    duration: "07:30 – 18:30",
    category: "Heritage • Full Day By Car • Joined Tour",
    price: {
      adult: 2750000,
      child: 2100000,
      note: "Joined tour price. Free upgrade to private tour for groups of 4 or more when available.",
    },
    description:
      "Travel from Da Nang to Hue to explore the Imperial City, royal tombs, Thien Mu Pagoda and traditional Hue cuisine.",
    overview:
      "A full-day heritage journey into Vietnam’s former imperial capital. This route is designed for travelers who want history, architecture, royal culture, spiritual sites and a scenic transfer through Lang Co Bay or Hai Van route depending on conditions.",
    highlights: [
      "Imperial City and The Citadel",
      "Lang Co Bay scenic stop",
      "Tu Duc Tomb",
      "Khai Dinh Tomb",
      "Thien Mu Pagoda",
      "Traditional royal-flavored lunch",
    ],
    itinerary: [
      "07:30 – 08:00: Pickup in Da Nang and depart for Hue via Hai Van Tunnel or scenic Hai Van Pass.",
      "09:00 – 09:15: Short break at Lang Co Bay.",
      "10:30 – 12:00: Explore the Imperial City, including Ngo Mon Gate, Thai Hoa Palace and Forbidden Purple City area.",
      "12:15 – 13:15: Enjoy traditional Hue lunch at a local restaurant.",
      "13:30 – 14:30: Visit Tu Duc Tomb and admire poetic royal architecture.",
      "14:45 – 15:45: Discover Khai Dinh Tomb with Asian-European design details.",
      "16:00 – 16:45: Visit Thien Mu Pagoda by the Perfume River.",
      "16:45 – 18:30: Return to Da Nang. Tour ends.",
    ],
    included: [
      "Round-trip transfer",
      "English/Vietnamese-speaking guide",
      "All entrance fees",
      "Specialty Hue lunch",
      "Bottled water",
    ],
    notIncluded: ["Personal expenses", "Additional drinks", "Tips for guide"],
    childPolicy: [
      "Child price applies according to joined tour policy.",
      "Please share child age and height before booking.",
    ],
    bestFor: [
      "History lovers",
      "Culture travelers",
      "Families",
      "Slow travelers",
    ],
    localTips: [
      "This is a long day, so start early and wear comfortable shoes.",
      "Bring sun protection for Citadel and tomb visits.",
      "Hue food is a highlight, especially for culture-focused travelers.",
    ],
  },
  {
    title: "Marble Mountains & Monkey Mountain Discovery",
    image: "/tour/marble.jpg",
    duration: "08:00 – 14:00 / 14:00 – 18:30",
    category: "Nature • Culture • Half Day",
    price: {
      adult: 850000,
      child: 650000,
      note: "Morning tour: Adult 850,000 VND, Child 650,000 VND. Afternoon tour: Adult 800,000 VND, Child 600,000 VND.",
    },
    description:
      "Explore Marble Mountains, pagodas, caves, Non Nuoc Stone Village and Son Tra Peninsula with Lady Buddha ocean views.",
    overview:
      "A compact but rich half-day experience combining natural caves, Buddhist pagodas, stone carving village, Son Tra coastal scenery and the famous Lady Buddha at Linh Ung Pagoda.",
    highlights: [
      "Marble Mountains caves and pagodas",
      "Non Nuoc Stone Carving Village",
      "Son Tra Peninsula scenic views",
      "Linh Ung Pagoda and Lady Buddha",
      "Local lunch for morning option",
    ],
    itinerary: [
      "08:00 – 09:00: Pickup and depart for Marble Mountains.",
      "09:00 – 11:30: Explore caves and visit Tam Thai and Linh Ung Pagodas on the mountain.",
      "11:30 – 12:30: Visit Non Nuoc Stone Carving Village.",
      "12:30 – 13:00: Enjoy traditional Vietnamese lunch with a local family near Marble Mountains. Morning tour only.",
      "13:00 – 13:30: Transfer to Son Tra Peninsula.",
      "13:30 – 14:00: Visit Linh Ung Pagoda and enjoy panoramic ocean views.",
      "Afternoon option follows a shorter route from 14:00 to 18:30 without dinner.",
    ],
    included: [
      "Door-to-door transfer",
      "English-speaking guide",
      "Entrance fees",
      "Bottled water",
      "Lunch for morning tour only",
    ],
    notIncluded: ["Personal expenses", "Additional drinks"],
    childPolicy: [
      "Under 4 years old: free",
      "5 – 9 years old: 75% of adult price",
      "From 10 years old: adult price",
    ],
    bestFor: [
      "Families",
      "Nature lovers",
      "Culture travelers",
      "Easy adventure",
    ],
    localTips: [
      "Wear comfortable shoes because Marble Mountains has stairs and caves.",
      "Morning and late afternoon are better for light and temperature.",
      "Dress respectfully for pagoda areas.",
    ],
  },
  {
    title: "Hoi An Cooking Class & Basket Boat",
    image: "/tour/coconut.jpg",
    duration: "08:00 – 13:00 / 14:00 – 19:00",
    category: "Cooking Class • Basket Boat • Local Cuisine",
    price: {
      adult: 900000,
      child: 650000,
      note: "Morning tour: Adult 900,000 VND, Child 650,000 VND. Afternoon tour: Adult 1,000,000 VND, Child 750,000 VND.",
    },
    description:
      "Visit a local market, ride a bamboo basket boat in Cam Thanh Coconut Forest and cook traditional Hoi An dishes.",
    overview:
      "A hands-on Hoi An countryside experience combining market culture, coconut forest, basket boat, fishing demonstrations and cooking class. A strong family-friendly tour for guests who want both fun and local food.",
    highlights: [
      "Bamboo basket boat experience",
      "Cam Thanh Coconut Forest",
      "Local market visit",
      "Hands-on cooking class",
      "Lunch or dinner with your own dishes",
    ],
    itinerary: [
      "08:00 / 14:00: Pickup at your hotel in Hoi An center.",
      "09:00 / 14:30: Visit a local market and hand-pick fresh ingredients.",
      "10:00 / 15:30: Explore Cam Thanh Coconut Forest by bamboo basket boat and watch local fishing techniques.",
      "11:00 / 16:30: Start cooking class with dishes such as papaya salad, braised fish in clay pot, fried spring rolls, stir-fried water spinach and Vietnamese crispy pancake.",
      "12:15 / 17:45: Enjoy your creations for lunch or dinner.",
      "13:00 / 19:00: End of program and drop-off.",
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
      "5 – 9 years old: 75% of adult price",
      "From 10 years old: charged as adult",
    ],
    bestFor: ["Families", "Kids", "Food lovers", "Groups"],
    localTips: [
      "Tell us early if you are vegetarian or avoid seafood, pork or spicy food.",
      "This tour pairs well with Hoi An Ancient Town in the evening.",
      "Good choice for families who want an easy and interactive activity.",
    ],
  },
  {
    title: "Cham Island & Snorkeling By Large Wooden Boat",
    image: "/tour/cham.jpg",
    duration: "08:00 – 17:00",
    category: "Island • Snorkeling • Wooden Boat",
    price: {
      adult: 1550000,
      child: 1200000,
      note: "Joined tour by large wooden boat, capacity around 40–50 guests.",
    },
    description:
      "Sail to Cham Island by large wooden boat, snorkel at two spots, enjoy seafood lunch and relax on the beach.",
    overview:
      "A full-day sea escape from Hoi An/Da Nang for guests who want clear water, coral areas, a relaxed wooden boat journey, seafood lunch and island beach time. Sea conditions are checked before confirmation.",
    highlights: [
      "Large wooden boat round trip",
      "Snorkeling at 2 spots",
      "Seafood lunch",
      "Beach free time",
      "Cham Island scenery",
    ],
    itinerary: [
      "08:00 – 08:45: Pickup and transfer to Cua Dai Port.",
      "08:45 – 09:30: Board the wooden boat to Cham Island.",
      "09:30 – 11:00: First snorkeling session.",
      "11:00 – 11:30: Move to the marine protected area for the second snorkeling session.",
      "11:30 – 12:30: Enjoy seafood lunch on the island.",
      "12:30 – 15:00: Free time for resting and sunbathing on the beach.",
      "15:00 – 16:00: Board the wooden boat back to mainland.",
      "16:00 – 17:00: Transfer back and drop-off at your hotel.",
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
      "Child price applies according to joined tour policy.",
      "Please share child age before booking.",
    ],
    bestFor: [
      "Beach lovers",
      "Groups",
      "Families",
      "Relaxed adventure travelers",
    ],
    localTips: [
      "This tour depends strongly on weather and sea conditions.",
      "Bring swimwear, towel, sunscreen and a change of clothes.",
      "Best during calm sea season from Hoi An.",
    ],
  },
  {
    title: "Hai Van Pass Off-Road Motorbike Adventure & Lang Co Seafood",
    image: "/tour/haivan.jpg",
    duration: "08:30 – 16:30",
    category: "Luxury Adventure • Scenic Ride • Seafood",
    price: {
      adult: 2700000,
      child: null,
      note: "Private tour reference price: 2,700,000 VND/adult. Best private tour rate available on request.",
    },
    description:
      "Ride along one of Vietnam’s most spectacular coastal roads, conquer Hai Van Pass and enjoy Lang Co seafood.",
    overview:
      "A premium scenic adventure for travelers who want something more exciting than a normal city tour. The route combines coastal roads, Hai Van Pass viewpoints, mountain scenery, photo stops and a fresh seafood lunch in Lang Co.",
    highlights: [
      "Off-road motorbike adventure style",
      "Hai Van Pass panoramic views",
      "Lang Co fishing village",
      "Premium seafood lunch",
      "Coastal photo stops",
    ],
    itinerary: [
      "08:30 – 09:30: Pickup and receive motorbikes, either self-driving or riding pillion with a safe driver.",
      "09:30 – 12:00: Ride along the coastal road, conquer Hai Van Pass and stop for photos.",
      "12:00 – 14:00: Stop at Lang Co fishing village for a premium seafood lunch.",
      "14:00 – 16:30: Leisurely ride back to the city center and drop-off at your hotel.",
    ],
    included: [
      "Motorbike with safe driver or self-driving option",
      "Enthusiastic English-speaking guide",
      "Fresh seafood lunch",
      "Bottled water",
      "Entrance fees",
    ],
    notIncluded: ["Personal expenses", "Additional drinks"],
    childPolicy: [
      "Adventure route suitability depends on age, height and safety conditions.",
      "Please contact GoVietStay before booking for family or child participation.",
    ],
    bestFor: [
      "Adventure travelers",
      "Couples",
      "Photographers",
      "Small groups",
    ],
    localTips: [
      "Best on clear-weather days for ocean views.",
      "Bring sunglasses, sunscreen and comfortable clothes.",
      "Choose pillion rider option if you want to relax and enjoy the scenery safely.",
    ],
  },
  {
    title: "Da Nang Food Tour & Dragon Bridge Fire Show Cruise",
    image: "/tour/food.jpg",
    duration: "15:30 – 21:30",
    category: "Food • Han River Cruise • Weekend Fire Show",
    price: {
      adult: 1300000,
      child: 1000000,
      note: "Joined tour price. Private tour price available on request.",
    },
    description:
      "Taste more than 6 local dishes, cruise the Han River and enjoy Dragon Bridge fire show on weekend nights.",
    overview:
      "A strong evening experience for Da Nang visitors. This tour combines local food stops with traveler-friendly hygiene selection, Han River cruise, night city views and Dragon Bridge fire and water show on Friday, Saturday and Sunday nights.",
    highlights: [
      "6+ authentic local dishes",
      "Mi Quang, Banh Xeo, Nem Lui and local specialties",
      "Han River cruise ticket",
      "Dragon Bridge fire and water show on weekends",
      "Da Nang night city views",
    ],
    itinerary: [
      "15:30 – 16:00: Hotel pickup.",
      "16:00 – 19:00: Explore selected local eateries and enjoy over 6 authentic specialties.",
      "19:00 – 20:00: Board the Han River Cruise and enjoy the cool breeze and city lights.",
      "20:00 – 21:15: Watch Dragon Bridge fire and water show on Friday, Saturday or Sunday. On weekdays, enjoy a relaxing cruise view of Da Nang by night.",
      "21:15 – 21:30: Transfer back to your hotel.",
    ],
    included: [
      "Door-to-door transfer",
      "Local English-speaking guide",
      "Culinary experience with more than 6 dishes",
      "Entrance fees",
      "Han River cruise ticket",
    ],
    notIncluded: ["Personal drinks", "Tips for guide"],
    childPolicy: [
      "Child price applies according to joined tour policy.",
      "Please tell us if children need lighter food options.",
    ],
    bestFor: ["Food lovers", "Couples", "Small groups", "First-time visitors"],
    localTips: [
      "Tell us if you avoid pork, seafood or spicy food.",
      "Weekend nights are best for the Dragon Bridge fire show.",
      "Good choice for travelers who want both food and evening sightseeing.",
    ],
  },
  {
    title: "Aphrodite Cruise – Stunning Sunset Escape",
    image: "/tour/cruise.jpg",
    duration: "17:30 – 21:30",
    category: "Premium Cruise • Sunset • Fine Dining",
    price: {
      adult: 2400000,
      child: 1950000,
      note: "Premium Aphrodite S16 cruise package. Private tour available on request.",
    },
    description:
      "Enjoy a premium sunset cruise aboard Aphrodite S16 with fine dining, drinks and romantic evening views.",
    overview:
      "A premium cruise experience designed for couples, families and VIP travelers who want a beautiful sunset, spacious luxury setting, fine dining and relaxing evening atmosphere aboard Aphrodite S16.",
    highlights: [
      "Premium cruise aboard Aphrodite S16",
      "Stunning sunset views",
      "Fine dining experience",
      "Water, soft drinks and welcome drink",
      "Romantic and memorable moments",
    ],
    itinerary: [
      "17:30 – 18:00: Hotel pickup and transfer to the cruise dock.",
      "18:00 – 19:00: Welcome aboard Aphrodite S16, enjoy drinks and admire the sunset.",
      "19:00 – 21:00: Enjoy a premium fine dining dinner with live music between courses.",
      "21:00 – 21:30: Return to the dock and transfer back to your hotel.",
    ],
    included: [
      "Hotel pickup and drop-off",
      "Cruise onboard Aphrodite",
      "Premium fine dining",
      "Water, soft drinks and welcome drink",
    ],
    notIncluded: [
      "Additional drinks or cocktails",
      "Personal expenses",
      "Tips for crew",
      "VAT",
    ],
    childPolicy: [
      "Child rate applies for 4–9 years old according to cruise policy.",
      "Please confirm child age before booking.",
    ],
    bestFor: ["Couples", "Luxury travelers", "Families", "Special occasions"],
    localTips: [
      "Book early for better seating and sunset timing.",
      "Best for romantic photos and special celebrations.",
      "Private cruise options can be arranged with advance notice.",
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
    title: "Jungle ATV Adventure & BBQ Party",
    image: "/tour/ATV.jpg",
    duration: "07:00 – 12:45 / 11:30 – 17:15",
    category: "Adventure • Half Day • BBQ Party",
    price: {
      adult: 2650000,
      child: null,
      note: "Tandem rider: 2,650,000 VND/guest, total 5,300,000 VND/bike. Single rider: 3,500,000 VND/guest.",
    },
    description:
      "Drive an ATV through rice fields, village trails and jungle terrain, then enjoy a BBQ farm feast.",
    overview:
      "A high-energy half-day adventure for guests who want adrenaline, countryside scenery and a BBQ finish. This tour is suitable for adventurous travelers and groups who want something different from classic sightseeing.",
    highlights: [
      "ATV ride through villages, jungles and muddy terrains",
      "Rice fields and village trails",
      "1.5 – 2 hours of self-driving ATV adventure",
      "Organic farm BBQ party",
      "Morning and afternoon schedule options",
    ],
    itinerary: [
      "07:00 / 11:30: Hotel pickup in Da Nang and transfer about 75 minutes to the farm in Duy Xuyen.",
      "08:30 / 13:00: Arrive at the farm for safety briefing, ATV training and liability waiver signing.",
      "09:00 – 11:00 / 13:30 – 15:30: Enjoy 1.5 – 2 hours of ATV driving through traditional villages, rice fields and jungle trails.",
      "11:00 / 15:30: Enjoy a hot BBQ party with fresh local ingredients. Vegetarian and vegan options available.",
      "11:30 / 16:00: Transfer back to Da Nang.",
      "12:45 / 17:15: Drop off at your hotel. Tour ends.",
    ],
    included: [
      "ATV rental and helmet",
      "Professional guide",
      "Refreshments and BBQ meal",
      "Round-trip hotel transfer",
    ],
    notIncluded: ["Tips", "Personal drinks"],
    childPolicy: [
      "Children from 14 years old can join as tandem riders.",
      "Under 16 years old are not allowed to drive solo.",
      "Safety rules depend on operator confirmation.",
    ],
    bestFor: [
      "Adventure travelers",
      "Groups of friends",
      "Couples",
      "Young travelers",
    ],
    localTips: [
      "Wear comfortable clothes and closed shoes.",
      "Bring sunglasses, sunscreen and a change of clothes.",
      "This tour is best on clear-weather days and may get muddy.",
    ],
  },
  {
    title: "Nui Than Tai Hot Springs Park",
    image: "/tour/Nui Than Tai.jpg",
    duration: "08:30 – 16:30",
    category: "Hot Springs • Water Park • Family Day",
    price: {
      adult: 2500000,
      child: 2050000,
      note: "Joined tour price including transfer, guide, entrance ticket, basic hot spring bath package, premium buffet lunch and bottled water.",
    },
    description:
      "Relax in natural hot springs, enjoy jacuzzi pools, premium buffet lunch and water park fun in the mountains near Da Nang.",
    overview:
      "A comfortable full-day nature and relaxation experience for families, couples and groups. Nui Than Tai combines hot springs, jacuzzi, buffet lunch, water park and mountain scenery in an easy day trip from Da Nang.",
    highlights: [
      "Natural hot springs and jacuzzi",
      "Premium buffet lunch",
      "Water park and wave pool",
      "Round-trip transfer",
      "Mountain resort scenery",
    ],
    itinerary: [
      "08:30 – 09:30: Pickup and depart for Nui Than Tai Hot Springs Park.",
      "09:30 – 12:00: Relax in natural hot spring pools and modern jacuzzis.",
      "12:00 – 13:30: Enjoy a diverse premium buffet lunch at the resort restaurant.",
      "13:30 – 15:30: Have fun at the Water Park with slides and wave pool.",
      "15:30 – 16:30: Gather at the vehicle and transfer back to the original pickup point.",
    ],
    included: [
      "Round-trip transfer",
      "English/Vietnamese-speaking guide",
      "Entrance ticket and basic hot spring bath package",
      "Premium buffet lunch",
      "Bottled water",
    ],
    notIncluded: [
      "Personal expenses",
      "Special bath packages such as mud bath, wine bath or tea bath",
      "Additional drinks",
    ],
    childPolicy: [
      "Child price depends on park policy and package rules.",
      "Please share child age and height before booking.",
    ],
    bestFor: [
      "Families",
      "Couples",
      "Relaxation travelers",
      "Rainy-day backup plan",
    ],
    localTips: [
      "Bring swimwear, towel and dry clothes.",
      "Good option for families with children.",
      "Check ticket policy and weather before departure.",
    ],
  },
];

export default function Home() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>(emptyBookingForm);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTip, setSelectedTip] = useState<LocalTip | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [happyTravelers, setHappyTravelers] = useState<string[]>([]);
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

  const openBookingForm = () => {
    setBookingForm(emptyBookingForm);
    setBookingOpen(true);
  };

  const handleBookingChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendBookingRequest = (tour: Tour) => {
    const message =
      `BOOKING REQUEST - GoVietStay\n\n` +
      `Tour: ${tour.title}\n` +
      `Price note: ${tour.price.note}\n\n` +
      `Guest name: ${bookingForm.fullName || "Not provided"}\n` +
      `WhatsApp / Phone: ${bookingForm.whatsapp || "Not provided"}\n` +
      `Email: ${bookingForm.email || "Not provided"}\n` +
      `Travel date: ${bookingForm.travelDate || "Not specified"}\n` +
      `Adults: ${bookingForm.adults || "Not specified"}\n` +
      `Children: ${bookingForm.children || "None / Not specified"}\n` +
      `Hotel: ${bookingForm.hotel || "Not specified"}\n` +
      `Pickup location: ${bookingForm.pickupLocation || "Not specified"}\n` +
      `Special request: ${bookingForm.specialRequest || "None"}\n\n` +
      `Please confirm availability and send the best booking details. Thank you.\n` +
      `Website: GoVietStay.com`;

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    fetch("/api/happy-travelers")
      .then((res) => res.json())
      .then((files) => {
        if (!Array.isArray(files)) return;

        setHappyTravelers(
          files.map((file: string) => `/happy-travelers/${file}`),
        );
      })
      .catch(() => {
        setHappyTravelers([]);
      });
  }, []);

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

        @keyframes memoryFloatIn {
          from {
            opacity: 0;
            transform: translateY(28px) rotate(-1deg) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes memoryKenBurns {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes memoryMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .memory-card {
          animation: memoryFloatIn 700ms ease-out both;
        }

        .memory-card-image {
          animation: memoryKenBurns 18s ease-in-out infinite;
        }

        .memory-marquee-track {
          width: max-content;
          animation: memoryMarquee 30s linear infinite;
        }

        .memory-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cinematic-image,
          .travel-board-track,
          .memory-card,
          .memory-card-image,
          .memory-marquee-track,
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
                <h3 className="mt-5 text-lg md:text-xl font-bold">
                  {item.title}
                </h3>
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
                <h3 className="font-bold text-lg">
                  More Than Tours — Your Local Friend In Central Vietnam
                </h3>
                <p className="mt-1 text-[#06251b]/70">
                  From airport arrival to your last day, GoVietStay is here to
                  help you travel with confidence.
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

      <section
        id="founder"
        className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 pb-24"
      >
        <div className="max-w-7xl mx-auto w-full rounded-[2rem] overflow-hidden border border-[#0b6b4f]/15 bg-white/75 shadow-xl shadow-[#06251b]/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[520px] lg:min-h-[720px] bg-[#d8c7a1]">
              <Image
                src="/founder/david-founder.png"
                alt="David Tran founder of GoVietStay"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#0b6b4f]/90 text-white p-4 shadow-xl backdrop-blur-sm">
                <div className="text-sm uppercase tracking-[3px] text-yellow-300 font-semibold">
                  Based in Central Vietnam
                </div>
                <div className="mt-1 text-lg font-bold">
                  Da Nang • Hoi An • Hue • Phu Quoc
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-green-800 uppercase tracking-[4px] text-xs md:text-sm font-semibold">
                Meet The Founder
              </p>

              <h2 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
                David Tran
              </h2>

              <p className="mt-3 text-xl md:text-2xl text-green-800 font-semibold">
                Founder of GoVietStay
              </p>

              <p className="mt-7 text-lg md:text-xl font-bold leading-relaxed">
                Local knowledge. Real experience. Trusted support.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: "🏨",
                    title: "15+ Years In Hospitality & Tourism",
                    text: "Experience in guest services, luxury hospitality and real travel operations across Vietnam.",
                  },
                  {
                    icon: "⭐",
                    title: "Luxury Service Background",
                    text: "Worked across service environments connected with MGM Grand, Nikko, Amara, InterContinental and Novaland.",
                  },
                  {
                    icon: "📍",
                    title: "Real Local Experience",
                    text: "On-the-ground knowledge in Da Nang, Hoi An, Hue and Phu Quoc — not just online travel information.",
                  },
                  {
                    icon: "🤝",
                    title: "Human Support Before & During Your Trip",
                    text: "GoVietStay is built to help travelers feel safe, supported and confident throughout the journey.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b6b4f]/10 text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="mt-1 text-[#06251b]/70 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 rounded-3xl border border-[#0b6b4f]/20 bg-[#f7f1df] p-5 md:p-6">
                <p className="text-xl md:text-2xl font-bold leading-relaxed">
                  “We don&apos;t sell tours. We create experiences and build
                  trust.”
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/84937762607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-600 px-7 py-4 font-semibold text-white hover:bg-green-700 transition"
                >
                  Chat with David on WhatsApp
                </a>

                <button
                  onClick={() => setDaoOpen(true)}
                  className="rounded-full border border-[#06251b]/30 px-7 py-4 font-semibold hover:bg-[#06251b] hover:text-white transition"
                >
                  Ask Đào First
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experiences"
        className="bg-[#071f17] text-white px-4 md:px-20 py-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-yellow-400 uppercase tracking-[4px] text-sm font-semibold">
            Featured Experiences
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Curated Local Tours
          </h2>

          <p className="mt-6 text-white/70 max-w-2xl text-lg">
            Handpicked private experiences across Da Nang, Hoi An and Hue —
            designed for travelers who want comfort, trust and authentic local
            support.
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

                <h3 className="text-xl md:text-2xl font-bold leading-tight">
                  {tour.title}
                </h3>

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
                  View details / Book Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="travelers"
        className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 py-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
            International Travelers
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Guests From Around The World
          </h2>

          <p className="mt-6 text-[#06251b]/70 max-w-3xl text-lg">
            Travelers from India, Russia, Kazakhstan, Germany, Australia and
            many other countries have explored Central Vietnam with GoVietStay
            local support.
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

      <section
        id="happy-travelers"
        className="relative bg-[#f7f1df] text-[#06251b] px-4 md:px-20 py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top_left,rgba(11,107,79,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,196,0,0.20),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
              Real Travel Moments
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Happy Travelers Gallery
            </h2>

            <p className="mt-6 text-[#06251b]/70 max-w-3xl text-lg leading-relaxed">
              A simple wall of real guest photos from GoVietStay journeys. No
              staged advertising — just real travelers and real memories.
            </p>
          </div>

          <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
            {happyTravelers.map((photo, index) => (
              <button
                key={photo}
                onClick={() => setSelectedMemory(photo)}
                className="memory-card group relative mb-4 md:mb-5 w-full break-inside-avoid overflow-hidden rounded-[1.7rem] bg-white shadow-xl shadow-[#06251b]/10 border border-[#06251b]/10 text-left hover:-translate-y-1 hover:rotate-[0.35deg] hover:shadow-2xl hover:shadow-[#06251b]/20 transition duration-500"
                style={{ animationDelay: `${(index % 10) * 55}ms` }}
                aria-label="Open GoVietStay traveler photo"
              >
                <div className="relative overflow-hidden bg-[#d8c7a1]/30">
                  <img
                    src={photo}
                    alt="GoVietStay happy traveler"
                    loading="lazy"
                    className="block w-full h-auto object-cover transition duration-700 group-hover:scale-105"
                    onError={(event) => {
                      const card = event.currentTarget.closest("button");
                      if (card) card.classList.add("hidden");
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-black/25 via-transparent to-white/10" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition duration-500 p-3">
                    <div className="rounded-full bg-black/55 px-4 py-2 text-center text-xs md:text-sm font-semibold text-white backdrop-blur-md">
                      View photo
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-white/70 border border-[#06251b]/10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl shadow-[#06251b]/5">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">
                Real photos. Real travelers. Real trust.
              </h3>
              <p className="mt-2 text-[#06251b]/65">
                GoVietStay keeps this gallery alive with guest photos from real
                tour days.
              </p>
            </div>

            <a
              href="https://wa.me/84937762607"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
            >
              Plan on WhatsApp
            </a>
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
                <h3 className="text-xl md:text-2xl font-bold">
                  {service.title}
                </h3>
                <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
                  {service.description}
                </p>
                <p className="mt-5 text-yellow-400 font-semibold">
                  View service →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="local-tips"
        className="bg-[#f7f1df] text-[#06251b] px-4 md:px-20 py-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-green-800 uppercase tracking-[4px] text-sm font-semibold">
            Local Tips
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold">
            Travel Like A Local
          </h2>

          <p className="mt-6 text-[#06251b]/70 max-w-3xl text-lg">
            Simple local guidance to help you enjoy Da Nang, Hoi An and Hue with
            more confidence.
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
                <p className="mt-4 text-[#06251b]/70 text-base md:text-lg leading-relaxed">
                  {tip.description}
                </p>
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
            Tip: hover on desktop to pause the board. On mobile, you can swipe
            horizontally.
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
            Real travelers choose GoVietStay for private tours, local support
            and smooth travel experiences across Central Vietnam.
          </p>

          <div className="mt-12 rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12">
            <div className="text-5xl">⭐⭐⭐⭐⭐</div>

            <h3 className="mt-6 text-3xl md:text-4xl font-bold">
              Share Your Experience On Google
            </h3>

            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Your review helps other international travelers discover trusted
              local support in Da Nang, Hoi An and Hue.
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

      <section
        id="contact"
        className="relative bg-[#071f17] text-white px-4 md:px-20 py-32 overflow-hidden"
      >
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
              <p className="mt-4 text-white/60 leading-relaxed">
                Private Tours • Local Guide • Travel Support
                <br />
                Da Nang • Hoi An • Hue • Phu Quoc
                <br />
                WhatsApp +84 937 762 607
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Destinations</h4>
              <ul className="space-y-2 text-white/60">
                <li>Da Nang</li>
                <li>Hoi An</li>
                <li>Hue</li>
                <li>Phu Quoc</li>
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

              <div className="space-y-3 text-white/60">
                <a
                  href="https://wa.me/84937762607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-yellow-400 transition"
                >
                  WhatsApp
                </a>

                <a
                  href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-yellow-400 transition"
                >
                  Google Maps
                </a>

                <a
                  href="https://t.me/govietstay_travel_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-yellow-400 transition"
                >
                  Telegram
                </a>

                <a
                  href="https://x.com/thangtran267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-yellow-400 transition"
                >
                  X / Twitter
                </a>

                <a
                  href="mailto:govietstay@gmail.com"
                  className="block hover:text-yellow-400 transition"
                >
                  govietstay@gmail.com
                </a>

                <div className="pt-3 text-sm text-white/40 leading-relaxed">
                  WhatsApp +84 937 762 607
                  <br />
                  Available 24/7
                </div>
              </div>
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
                  "Hello GoVietStay, I would like help planning my trip with Đào.",
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

      {selectedMemory && (
        <div
          className="gvs-overlay fixed inset-0 z-[998] bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="gvs-panel relative w-full max-w-6xl max-h-[92svh] rounded-[2rem] overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-3xl leading-none text-white backdrop-blur-md hover:bg-white hover:text-black transition"
              aria-label="Close photo"
            >
              ×
            </button>

            <div className="relative h-[82svh] bg-black">
              <img
                src={selectedMemory}
                alt="GoVietStay happy traveler"
                className="h-full w-full object-contain"
              />
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
                  <h3 className="text-xl md:text-2xl font-bold">
                    Service Details
                  </h3>
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
                    `Hello GoVietStay, I would like to ask about ${selectedService.title}.`,
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
                  <h3 className="text-xl md:text-2xl font-bold">
                    Local Guidance
                  </h3>
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
                    `Hello GoVietStay, I would like to ask about local tips: ${selectedTip.title}.`,
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
          onClick={() => {
            setSelectedTour(null);
            setBookingOpen(false);
          }}
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
                  onClick={() => {
                    setSelectedTour(null);
                    setBookingOpen(false);
                  }}
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
                <h3 className="text-xl md:text-2xl font-bold">
                  Detailed Itinerary
                </h3>
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
                    <h3 className="text-xl md:text-2xl font-bold">
                      {title as string}
                    </h3>
                    <ul className="mt-4 space-y-2 text-[#06251b]/75">
                      {(items as string[]).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={openBookingForm}
                  className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 transition shadow-lg shadow-green-900/20"
                >
                  Book Now
                </button>

                <button
                  onClick={() => {
                    setSelectedTour(null);
                    setBookingOpen(false);
                  }}
                  className="rounded-full border border-[#06251b]/30 px-8 py-4 font-semibold hover:bg-[#06251b] hover:text-white transition"
                >
                  Close
                </button>
              </div>

              {bookingOpen && (
                <div className="mt-8 rounded-[2rem] bg-white border border-[#06251b]/10 p-5 md:p-8 shadow-xl shadow-[#06251b]/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-green-800 uppercase tracking-[3px] text-xs font-semibold">
                        Secure Booking Request
                      </p>
                      <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                        Book This Tour
                      </h3>
                      <p className="mt-2 text-[#06251b]/65 leading-relaxed">
                        Fill in your details. When you tap Send Booking Request,
                        WhatsApp will open with the full booking information
                        ready to send to GoVietStay.
                      </p>
                    </div>

                    <button
                      onClick={() => setBookingOpen(false)}
                      className="text-2xl font-bold leading-none hover:opacity-60"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["fullName", "Full Name *", "Your full name"],
                      ["whatsapp", "WhatsApp / Phone *", "+84 / +7 / +82 ..."],
                      ["email", "Email", "Your email address"],
                      ["travelDate", "Travel Date", "dd/mm/yyyy"],
                      ["adults", "Adults *", "e.g. 2"],
                      ["children", "Children", "e.g. 1 child, 6 years old"],
                      ["hotel", "Hotel Name", "Your hotel name"],
                      [
                        "pickupLocation",
                        "Pickup Location",
                        "Hotel / address / airport",
                      ],
                    ].map(([name, label, placeholder]) => (
                      <label key={name} className="block">
                        <span className="text-sm font-semibold text-[#06251b]/80">
                          {label}
                        </span>
                        <input
                          name={name}
                          value={bookingForm[name as keyof BookingForm]}
                          onChange={handleBookingChange}
                          placeholder={placeholder}
                          className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-[#f7f1df]/40 px-4 py-3 text-[#06251b] outline-none focus:border-green-700 focus:bg-white"
                        />
                      </label>
                    ))}

                    <label className="block md:col-span-2">
                      <span className="text-sm font-semibold text-[#06251b]/80">
                        Special Requests
                      </span>
                      <textarea
                        name="specialRequest"
                        value={bookingForm.specialRequest}
                        onChange={handleBookingChange}
                        placeholder="Dietary requirements, private tour request, Russian/English guide, mobility needs, etc."
                        rows={4}
                        className="mt-2 w-full rounded-2xl border border-[#06251b]/15 bg-[#f7f1df]/40 px-4 py-3 text-[#06251b] outline-none focus:border-green-700 focus:bg-white"
                      />
                    </label>
                  </div>

                  <div className="mt-5 rounded-2xl bg-green-50 border border-green-700/15 p-4 text-green-900">
                    <p className="font-bold">WhatsApp booking preview</p>
                    <p className="mt-1 text-sm leading-relaxed">
                      Tour name, price note, guest details, travel date, hotel,
                      pickup location and special requests will be sent to +84
                      937 762 607.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={() => sendBookingRequest(selectedTour)}
                      className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700 transition"
                    >
                      Send Booking Request
                    </button>

                    <button
                      onClick={() => setBookingOpen(false)}
                      className="rounded-full border border-[#06251b]/30 px-8 py-4 font-semibold hover:bg-[#06251b] hover:text-white transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
