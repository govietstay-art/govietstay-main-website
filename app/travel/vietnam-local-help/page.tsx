import type { Metadata } from "next";
import TravelSupportPage, {
  type TravelSupportPageData,
} from "../../../components/travel-support/TravelSupportPage";

export const metadata: Metadata = {
  title: {
    absolute: "Vietnam Local Help: Emergency Numbers & Tourist Support | GoVietStay",
  },
  description:
    "Practical help for travelers in Vietnam: emergency numbers, lost passports, lost property, medical help, transport problems and official tourist contacts.",
  keywords: [
    "Vietnam emergency numbers",
    "Vietnam tourist help",
    "lost passport Vietnam",
    "lost phone Vietnam",
    "lost wallet Vietnam",
    "lost item taxi Vietnam",
    "Vietnam tourist hotline",
    "Da Nang tourist support",
    "Phu Quoc tourist hotline",
  ],
  alternates: {
    canonical: "https://www.govietstay.com/travel/vietnam-local-help",
    languages: {
      en: "https://www.govietstay.com/travel/vietnam-local-help",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "https://www.govietstay.com/travel/vietnam-local-help",
    siteName: "GoVietStay",
    title: "Vietnam Local Help: Emergency Numbers & Tourist Support",
    description:
      "A help-first reference for emergencies, lost property, passports, transport problems and official tourist support in Vietnam.",
    images: [
      {
        url: "/brand/govietstay-official-logo.jpg",
        alt: "GoVietStay Trusted Local Support",
      },
    ],
  },
};

const data: TravelSupportPageData = {
  slug: "vietnam-local-help",
  eyebrow: "VIETNAM LOCAL HELP",
  title: "Need help in Vietnam?",
  titleAccent: "Start with the right contact.",
  lead:
    "Emergency contacts, lost property, passports, medical help, transport problems and official tourist support — organized so a traveler can act quickly without guessing.",
  statusLabel: "LAST VERIFIED",
  statusText: "7 SEPTEMBER 2026 · Official sources checked",
  chips: [
    "Emergency numbers",
    "Lost passport",
    "Lost property",
    "Medical help",
    "Tourist hotlines",
  ],
  quickTitle: "If the situation is urgent, use the official emergency number first.",
  quickIntro:
    "Vietnam has nationwide emergency numbers. Use the service that matches the situation; the national 112 system can also receive urgent requests and route cases to the responsible service.",
  safetyNote:
    "If someone is in immediate danger, call emergency services first. GoVietStay WhatsApp is local travel assistance and coordination, not an emergency dispatch service.",
  quickTable: {
    headers: ["Number", "Service", "Use it for"],
    rows: [
      ["112", "National emergency", "Serious accidents, disasters, urgent situations requiring assistance"],
      ["113", "Police", "Police emergency"],
      ["114", "Fire & rescue", "Fire and rescue"],
      ["115", "Medical emergency", "Ambulance / urgent medical assistance"],
    ],
  },
  sections: [
    {
      id: "who-to-contact",
      eyebrow: "FIRST DECISION",
      title: "Who should you contact first?",
      intro:
        "The fastest solution usually comes from contacting the organization that controls the problem. Start there, then ask local support to help you coordinate if language, location or follow-up becomes difficult.",
      cards: [
        {
          badge: "Immediate danger",
          title: "Emergency service",
          text:
            "Call 112 or the relevant 113 / 114 / 115 service before messaging a travel company or hotel.",
        },
        {
          badge: "Travel property",
          title: "The operator that had the item",
          text:
            "Airline, airport, taxi app, driver, hotel or attraction should be your first operational contact.",
        },
        {
          badge: "Local coordination",
          title: "Tourist support / GoVietStay",
          text:
            "Useful when you need a local contact to help explain the next practical step, find the right office or organize transport.",
        },
      ],
    },
    {
      id: "lost-passport",
      eyebrow: "IDENTITY DOCUMENTS",
      title: "I lost my passport in Vietnam",
      intro:
        "Do not immediately assume the passport is permanently lost. Reconstruct your movements first, then move to formal reporting and consular help if it cannot be found.",
      bullets: [
        "Check your room safe, reception, last vehicle, restaurant, attraction and airport security desk.",
        "Save a photo or digital copy of the passport if you have one; it helps you provide the correct identity details.",
        "If the passport is genuinely lost or stolen, ask the local police what report or confirmation is required for your case.",
        "Contact your own embassy or consulate for the current replacement or emergency-travel-document procedure.",
        "If you have a flight soon, contact the airline as well; a police report does not automatically replace a valid travel document.",
      ],
      note:
        "Embassy procedures differ by nationality. Use the embassy or foreign ministry website of your own country rather than a third-party visa or consular website.",
    },
    {
      id: "lost-wallet-phone",
      eyebrow: "MONEY & DEVICES",
      title: "Phone, wallet or bank card is missing",
      bullets: [
        "Freeze or lock bank cards through the issuing bank if there is a risk of misuse.",
        "Use the phone maker's official find / lock feature when available.",
        "Write down the last confirmed place and time you had the item before calling multiple locations.",
        "Keep transaction alerts, ride receipts and location history; they can narrow the search.",
        "If theft is suspected, ask the local police about the appropriate report.",
      ],
    },
    {
      id: "lost-in-vehicle",
      eyebrow: "TAXI · GRAB · PRIVATE CAR",
      title: "I left something in a vehicle",
      intro:
        "Vehicle details are more useful than a long description of the item. Collect the trip record before you start calling.",
      table: {
        headers: ["Save this", "Why it matters"],
        rows: [
          ["License plate", "The fastest identifier for a vehicle"],
          ["Driver name / phone", "Lets the operator confirm the driver"],
          ["Booking or ride ID", "Connects the case to the app or dispatch record"],
          ["Pickup + drop-off", "Helps confirm the exact trip"],
          ["Approximate time", "Useful for CCTV and dispatch checks"],
          ["Screenshot / receipt", "Creates a clear record to send to support"],
        ],
      },
      note:
        "For an app-booked ride, use the in-app lost-item or support flow first because the platform already has the trip record.",
    },
    {
      id: "airport-lost-found",
      eyebrow: "AIRPORT",
      title: "Lost baggage is not always the same as lost property",
      intro:
        "A checked suitcase that did not arrive and a phone left in the terminal usually go to different teams.",
      cards: [
        {
          title: "Checked baggage did not arrive",
          text:
            "Contact the airline or its ground-handling baggage service and keep the baggage tag / report reference.",
        },
        {
          title: "Item left in the terminal",
          text:
            "Contact airport security or the airport Lost & Found function for property left in public or controlled areas.",
        },
        {
          title: "Item left on the aircraft",
          text:
            "Contact the airline first; the item may be handled through the airline or airport depending on where it was found.",
        },
      ],
    },
    {
      id: "medical-accident",
      eyebrow: "HEALTH & ACCIDENTS",
      title: "Medical problem or traffic accident",
      bullets: [
        "For a medical emergency, call 115; for a broader urgent situation, 112 can receive emergency requests.",
        "Give your location first: hotel name, street, landmark or map pin.",
        "If you are involved in a traffic accident, prioritize safety and medical care before discussing payment or blame.",
        "Keep photos, medical papers, receipts and insurance contact details.",
        "For travel insurance claims, contact the insurer as soon as practical because some policies require early notification.",
      ],
    },
    {
      id: "scams-overcharging",
      eyebrow: "PAYMENT DISPUTES",
      title: "Scams, overcharging or a service dispute",
      intro:
        "A calm evidence trail is more useful than an argument. Save the information needed to show exactly what was offered, charged and delivered.",
      bullets: [
        "Keep the menu, quoted price, booking confirmation, chat and payment receipt.",
        "Ask the business to explain the charge in writing if possible.",
        "Do not hand over your passport as security for a payment dispute.",
        "If there is a threat, coercion or immediate safety concern, contact police / emergency services.",
        "For a tourism-service complaint, the local tourist support center may help direct the case.",
      ],
    },
    {
      id: "atm-card",
      eyebrow: "BANKING",
      title: "An ATM kept my card",
      bullets: [
        "Photograph the ATM, bank name, branch / machine identifier and location.",
        "Note the exact time and amount of the attempted transaction.",
        "Call the bank that owns the ATM using its official contact information.",
        "Contact your card issuer if you need to freeze the card or discuss a replacement.",
        "Never share a PIN or one-time password with someone claiming they can recover the card.",
      ],
    },
    {
      id: "transport-weather",
      eyebrow: "DISRUPTION",
      title: "Flight, train, bus, storm or rough-sea disruption",
      intro:
        "When transport changes, confirm the operating source first. Weather posts on social media can be useful signals, but the airline, carrier, port, attraction or authority makes the operational decision.",
      bullets: [
        "Check the airline / train / bus operator directly for your specific service.",
        "For island or sea activities, wait for the current operating decision rather than relying on yesterday's weather.",
        "Keep hotel and onward transport flexible when a storm or major disruption is developing.",
        "Save cancellation or delay messages for insurance and refund questions.",
      ],
    },
    {
      id: "tourist-hotlines",
      eyebrow: "OFFICIAL LOCAL SUPPORT",
      title: "Tourist assistance contacts for key GoVietStay destinations",
      intro:
        "These contacts are listed from official destination portals and were checked on the verification date shown above.",
      table: {
        headers: ["Destination", "Official support", "Contact"],
        rows: [
          ["Da Nang", "Da Nang Visitor Support Center", "+84 236 3550 111"],
          ["Hue", "Hue Department of Tourism / Visit Hue hotline", "+84 234 382 8288"],
          ["Phu Quoc", "Official Phu Quoc tourism portal hotline", "1900 1011"],
        ],
      },
      note:
        "Contact details can change. Use the official-source links at the end of this page if a number does not connect.",
    },
    {
      id: "embassy-help",
      eyebrow: "CONSULAR HELP",
      title: "How to find the right embassy or consulate",
      bullets: [
        "Search your own government's foreign ministry or embassy website for Vietnam.",
        "Check whether your nationality is served in Hanoi, Ho Chi Minh City or by a non-resident embassy.",
        "Use official domains whenever possible; avoid paying a third party simply to obtain an embassy phone number.",
        "For a lost passport, ask specifically about an emergency passport or emergency travel document and what police paperwork is required.",
      ],
    },
    {
      id: "prepare-information",
      eyebrow: "SAVE TIME",
      title: "Prepare six facts before asking anyone for help",
      table: {
        headers: ["Information", "Example"],
        rows: [
          ["Your exact location", "Hotel name + map pin"],
          ["What happened", "One or two clear sentences"],
          ["When it happened", "Date + approximate time"],
          ["Who was involved", "Driver / airline / business name"],
          ["Reference details", "Booking ID / plate / receipt"],
          ["What result you need", "Recover item / reach police / find transport"],
        ],
      },
    },
  ],
  whatsappKeyword: "LOCAL HELP",
  whatsappIntro:
    "I need local travel help in Vietnam. This is not an emergency-service request.",
  whatsappFields: [
    "My current location",
    "What happened",
    "When it happened",
    "Booking / vehicle / business details (if any)",
    "What help I need",
  ],
  whatsappLabel: "Need a local person to help you find the next practical step?",
  sourceTitle: "Official sources checked for this guide",
  sources: [
    {
      label: "Government of Vietnam — National Emergency 112",
      href:
        "https://xaydungchinhsach.chinhphu.vn/tong-dai-so-112-tiep-nhan-24-7-cac-thong-tin-ve-su-co-thien-tai-tham-hoa-119250902150528929.htm",
      note:
        "112 operates nationwide for urgent incidents; 113 / 114 / 115 cases are routed to the responsible service.",
    },
    {
      label: "Vietnam government gazette — emergency service numbering",
      href:
        "https://congbaocdn.chinhphu.vn/CongBaoCP/VanBan/2022/3/36965/40179-1-2022289-29004-vbhn-btttt.pdf",
      note: "Official numbering for 112, 113, 114 and 115.",
    },
    {
      label: "Da Nang official tourism portal — Visitor Support Center",
      href: "https://danangfantasticity.com/lien-he/",
      note: "Official contact page lists the Da Nang Visitor Support Center.",
    },
    {
      label: "Visit Hue — Support",
      href: "https://visithue.vn/ho-tro/",
      note: "Official Hue tourism support contact.",
    },
    {
      label: "Phu Quoc official tourism portal",
      href: "https://dulich.phuquoc.gov.vn/en/",
      note: "Official portal displays the Phu Quoc tourism hotline.",
    },
  ],
  relatedTitle: "Keep these two practical pages together",
  related: [
    {
      label: "Vietnam Tet Travel Guide 2027",
      href: "/travel/vietnam-tet-travel-guide",
      text:
        "Public-holiday status, transport, banks, restaurants and practical planning during Tet.",
    },
    {
      label: "Vietnam Travel Guides",
      href: "/travel",
      text:
        "GoVietStay's English planning hub for Da Nang, Hoi An, Hue and Phu Quoc.",
    },
  ],
};

export default function Page() {
  return <TravelSupportPage data={data} />;
}
