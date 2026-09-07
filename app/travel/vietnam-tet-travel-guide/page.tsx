import type { Metadata } from "next";
import TravelSupportPage, {
  type TravelSupportPageData,
} from "../../../components/travel-support/TravelSupportPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vietnam Tet 2027 Travel Guide: Dates, Closures & Transport | GoVietStay",
  },
  description:
    "Planning Vietnam during Tet 2027? Check the current holiday status, transport, banks, restaurants, attractions, etiquette and practical travel advice.",
  keywords: [
    "Vietnam Tet 2027",
    "Tet 2027 dates Vietnam",
    "Vietnam Lunar New Year 2027 travel",
    "Vietnam Tet closures",
    "Vietnam Tet transport",
    "Vietnam Tet restaurants open",
    "Vietnam Tet travel guide",
  ],
  alternates: {
    canonical: "https://www.govietstay.com/travel/vietnam-tet-travel-guide",
    languages: {
      en: "https://www.govietstay.com/travel/vietnam-tet-travel-guide",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "https://www.govietstay.com/travel/vietnam-tet-travel-guide",
    siteName: "GoVietStay",
    title: "Vietnam Tet Travel Guide 2027",
    description:
      "A help-first guide to Tet 2027 dates, holiday status, transport, banks, restaurants, attractions and etiquette.",
    images: [
      {
        url: "/brand/govietstay-official-logo.jpg",
        alt: "GoVietStay Trusted Local Support",
      },
    ],
  },
};

const data: TravelSupportPageData = {
  slug: "vietnam-tet-travel-guide",
  eyebrow: "VIETNAM TET 2027 · PRACTICAL TRAVEL HELP",
  title: "Traveling in Vietnam during Tet?",
  titleAccent: "Know what changes before you arrive.",
  lead:
    "Tet is a wonderful time to be in Vietnam, but transport demand, family-business opening hours and public-office schedules change. This guide separates confirmed information from proposals so you can plan without guessing.",
  statusLabel: "LAST VERIFIED",
  statusText: "7 SEPTEMBER 2026 · Government holiday schedule still proposed, not final",
  chips: [
    "6 February 2027",
    "Holiday status",
    "Transport",
    "Banks & cash",
    "Restaurants",
    "Tet etiquette",
  ],
  quickTitle: "Tet 2027: what is confirmed, and what is not yet final?",
  quickIntro:
    "Lunar New Year's Day falls on 6 February 2027. As of the verification date, the Ministry of Home Affairs has proposed two civil-service holiday options; the final government schedule has not yet been confirmed.",
  quickCards: [
    {
      badge: "Calendar",
      title: "Tet Day 1 · 6 February 2027",
      text:
        "The proposed government schedules identify 5 February as the 29th day of the final lunar month, making 6 February the first day of the Year of the Goat.",
    },
    {
      badge: "Proposal 1 · preferred",
      title: "4–10 February 2027",
      text:
        "Seven consecutive days for civil servants in the Ministry's preferred proposal: five statutory Tet days plus two compensatory weekly-rest days.",
    },
    {
      badge: "Proposal 2",
      title: "5–14 February 2027",
      text:
        "Ten consecutive days in the alternative proposal, using a workday swap in addition to Tet and weekly-rest days.",
    },
  ],
  safetyNote:
    "Do not treat either proposed holiday option as the final nationwide operating schedule. Airlines, hotels, restaurants, attractions, banks and private employers can follow their own operating plans. Re-check close to your travel date.",
  sections: [
    {
      id: "what-is-tet",
      eyebrow: "CONTEXT",
      title: "What Tet means for a traveler",
      intro:
        "Tet Nguyen Dan is Vietnam's Lunar New Year and the country's most important family holiday. Many Vietnamese travel home, visit relatives and spend the first days of the year with family. Tourism continues, but the rhythm is different from an ordinary week.",
      bullets: [
        "Expect very high domestic travel demand around the days before and after Tet.",
        "Some family-run businesses close for several days, while hotels, airports and major tourist services may continue operating.",
        "Opening hours can change at short notice, so 'normally open' is not the same as 'open during Tet'.",
        "Tet is not a reason to avoid Vietnam; it is a reason to plan the essential parts earlier.",
      ],
    },
    {
      id: "dates-status",
      eyebrow: "DATES & STATUS",
      title: "Read Tet dates with a status label, not as a rumor",
      table: {
        headers: ["Item", "Current status · 7 Sep 2026"],
        rows: [
          ["Lunar New Year's Day", "6 February 2027"],
          ["Civil-service holiday option 1", "PROPOSED · 4–10 February 2027 · Ministry preferred"],
          ["Civil-service holiday option 2", "PROPOSED · 5–14 February 2027"],
          ["Final government holiday schedule", "NOT YET FINAL on this page's verification date"],
        ],
      },
      note:
        "GoVietStay will update the status when the responsible authority publishes a final schedule.",
    },
    {
      id: "is-vietnam-closed",
      eyebrow: "OPENING HOURS",
      title: "Does Vietnam close during Tet?",
      intro:
        "Vietnam does not simply 'shut down'. Different sectors follow different schedules, and the biggest variation is usually among public offices and small family businesses.",
      table: {
        headers: ["Service", "Practical expectation"],
        rows: [
          ["Government offices", "Holiday schedule applies; handle time-sensitive paperwork before the holiday where possible"],
          ["Banks", "Branches may close on official holidays; cards / ATMs continue but cash planning matters"],
          ["Hotels", "Generally operate, but staffing and services can vary"],
          ["Airports", "Operate; passenger volume can be very high"],
          ["Restaurants", "Mixed — large venues may open while family businesses may close"],
          ["Attractions", "Many operate, but special holiday hours / ticket rules can apply"],
          ["Emergency services", "Emergency contacts remain essential; see the Local Help guide"],
        ],
      },
    },
    {
      id: "flights",
      eyebrow: "AIR TRAVEL",
      title: "Flights during Tet",
      bullets: [
        "Book important domestic sectors early when your dates are fixed.",
        "Allow more time for busy airports and ground transport.",
        "Check the airline directly for schedule changes; social posts are not a substitute for your booking status.",
        "If your international flight connects to a domestic sector, avoid an unnecessarily tight connection during a peak travel period.",
      ],
    },
    {
      id: "train-bus",
      eyebrow: "INTERCITY TRANSPORT",
      title: "Trains and intercity buses",
      bullets: [
        "Demand rises sharply because many people travel to their home provinces before Tet and return afterward.",
        "Use official or established booking channels and keep the ticket / booking reference.",
        "Confirm departure station, pickup point and reporting time because holiday traffic can slow local transfers.",
        "Do not build a same-day critical connection around an unverified bus arrival time.",
      ],
    },
    {
      id: "local-transport",
      eyebrow: "TAXI · GRAB · PRIVATE CAR",
      title: "Local transport can still work — but availability and timing can change",
      bullets: [
        "Airport and hotel transport should be confirmed before a critical arrival or departure.",
        "Ride-hailing supply can vary by time and location; do not assume an ordinary weekday wait time.",
        "Confirm any holiday surcharge before the ride when using a private service.",
        "Save the vehicle plate and driver's contact when a transfer is important.",
      ],
    },
    {
      id: "banks-cash",
      eyebrow: "MONEY",
      title: "Banks, ATMs, cards and cash",
      bullets: [
        "Handle branch-dependent banking before the public holiday period when possible.",
        "Carry a reasonable cash backup without carrying more than you can secure safely.",
        "Use ATMs in well-lit, established locations and save the bank / machine details if a card is retained.",
        "Do not rely on one card, one wallet or one payment method for the entire trip.",
      ],
    },
    {
      id: "food-restaurants",
      eyebrow: "FOOD",
      title: "Restaurants: expect a mix of open, closed and holiday schedules",
      intro:
        "The most common planning mistake is assuming a restaurant's normal online opening hours automatically apply during Tet.",
      bullets: [
        "For an important dinner, message or call the venue close to the date.",
        "Hotels can be a useful backup for meals when small local restaurants close.",
        "Ask about Tet menus or surcharges before ordering when a venue is operating on a holiday schedule.",
        "Keep one flexible meal plan rather than locking every meal weeks in advance.",
      ],
    },
    {
      id: "attractions",
      eyebrow: "THINGS TO DO",
      title: "Attractions and tours",
      bullets: [
        "Major attractions may operate during Tet but can use special hours, capacity controls or holiday prices.",
        "For sea tours, weather and authority decisions still matter even when the attraction is scheduled to operate.",
        "A private guide, driver or activity should be reconfirmed because staff availability can differ during the family holiday.",
        "Do not plan every day at maximum intensity; Tet traffic and crowds can make transfers slower.",
      ],
    },
    {
      id: "health-help",
      eyebrow: "HEALTH & SUPPORT",
      title: "Keep emergency and local-help information saved offline",
      intro:
        "Pharmacies, clinics and hospitals do not all follow the same holiday hours. If the situation is urgent, use the official emergency service rather than waiting for a tourism contact to answer.",
      cards: [
        {
          title: "Emergency",
          text:
            "Call 112 for a national emergency request, 113 for police, 114 for fire / rescue or 115 for urgent medical assistance.",
        },
        {
          title: "Local travel problem",
          text:
            "Use the Vietnam Local Help page for lost property, passports, transport problems and official destination hotlines.",
        },
      ],
      note:
        "Open /travel/vietnam-local-help and save the page before a busy holiday travel day.",
    },
    {
      id: "surcharges",
      eyebrow: "PRICES",
      title: "Tet surcharges: ask before you confirm",
      intro:
        "It is inaccurate to say that 'everything doubles' during Tet. Some services may apply a holiday surcharge because of staffing and demand; others keep normal pricing.",
      bullets: [
        "Ask whether the quoted total already includes any Tet / public-holiday surcharge.",
        "Get the amount in writing for a private car, guide or special service.",
        "For metered / app transport, use the platform's displayed fare where applicable.",
        "Do not accept a vague 'holiday fee' after the service if it was never disclosed and you had a confirmed price.",
      ],
    },
    {
      id: "etiquette",
      eyebrow: "CULTURE",
      title: "Simple Tet etiquette for visitors",
      bullets: [
        "Use a friendly 'Chuc Mung Nam Moi' (Happy New Year) greeting.",
        "If invited to a home, follow the host's lead and keep the first visit respectful and relaxed.",
        "Lucky money is a cultural gesture, especially for children; it is not a payment for hospitality.",
        "Dress respectfully at pagodas and religious sites.",
        "Ask before photographing private family moments or ceremonies.",
        "Avoid turning superstitions or first-visitor customs into jokes; practices vary by family.",
      ],
    },
    {
      id: "families",
      eyebrow: "TRAVEL WITH CHILDREN",
      title: "Tet with children: reduce transfer risk, not the experience",
      bullets: [
        "Avoid stacking a long flight, long road transfer and evening activity into the same day.",
        "Keep snacks, water, basic child essentials and one payment backup with you on transport days.",
        "Confirm child ticket rules and heights for attractions before you arrive.",
        "Choose one must-do experience per peak day and leave room for crowds or slower traffic.",
      ],
    },
    {
      id: "book-early",
      eyebrow: "PRIORITY ORDER",
      title: "What should be secured early?",
      table: {
        headers: ["Priority", "What to confirm"],
        rows: [
          ["Highest", "International / domestic flights and critical intercity transport"],
          ["High", "Accommodation for fixed destinations"],
          ["High", "Airport / station transfers for important arrival and departure times"],
          ["Medium", "Must-do attraction or private service with limited holiday staffing"],
          ["Flexible", "Non-essential local activities that can move with weather and opening hours"],
        ],
      },
    },
    {
      id: "destinations",
      eyebrow: "BY DESTINATION",
      title: "How to think about Tet in key Vietnam destinations",
      cards: [
        {
          title: "Hanoi",
          text:
            "Strong Tet atmosphere and family travel. Expect busy pre-Tet movement and check small-business hours carefully.",
        },
        {
          title: "Ho Chi Minh City",
          text:
            "A major transport hub that continues operating, while some local businesses close as residents travel home.",
        },
        {
          title: "Da Nang · Hoi An · Hue",
          text:
            "Tourism continues, but confirm attraction, restaurant, guide and intercity transfer schedules around the core holiday days.",
        },
        {
          title: "Phu Quoc",
          text:
            "Resort and tourism operations remain important; confirm airport transfers, sea activities and holiday dining plans.",
        },
      ],
    },
  ],
  whatsappKeyword: "TET 2027 HELP",
  whatsappIntro:
    "I am planning Vietnam during Tet 2027 and want help checking practical travel arrangements.",
  whatsappFields: [
    "Travel dates",
    "Destinations",
    "Adults + children",
    "Hotel / area",
    "What I need checked (transport / opening hours / itinerary / local help)",
  ],
  whatsappLabel: "Want help checking what is actually practical for your Tet dates?",
  sourceTitle: "Official status source for Tet 2027",
  sources: [
    {
      label: "Government of Vietnam — Ministry proposal for Tet 2027",
      href:
        "https://xaydungchinhsach.chinhphu.vn/de-xuat-2-phuong-an-nghi-tet-nguyen-dan-2027-tet-dinh-mui-11926080513033257.htm",
      note:
        "Published 8 August 2026. It lists the two proposed civil-service holiday options and states the Ministry's preferred option.",
    },
    {
      label: "Vietnam Local Help — GoVietStay",
      href: "https://www.govietstay.com/travel/vietnam-local-help",
      note:
        "Emergency numbers, lost property, passports and official tourist assistance contacts.",
    },
  ],
  relatedTitle: "Useful pages to save before a holiday trip",
  related: [
    {
      label: "Vietnam Local Help",
      href: "/travel/vietnam-local-help",
      text:
        "Emergency numbers, lost passport / property steps and official tourist support contacts.",
    },
    {
      label: "Vietnam Travel Guides",
      href: "/travel",
      text:
        "Practical GoVietStay English guides for Da Nang, Hoi An, Hue and Phu Quoc.",
    },
  ],
};

export default function Page() {
  return <TravelSupportPage data={data} />;
}
