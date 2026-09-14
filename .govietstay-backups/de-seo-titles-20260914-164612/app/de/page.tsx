import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "./_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Vietnam-Reise auf Deutsch: Zentralvietnam & Phú Quốc | GoVietStay",
  description: "Deutschsprachige Reiseinformationen für Đà Nẵng, Hội An, Huế und Phú Quốc. Praktische Planung zuerst, private Reiseoptionen erst danach.",
  keywords: ["Vietnam Reise deutsch", "Zentralvietnam Reise", "Da Nang Sehenswürdigkeiten", "Hoi An Sehenswürdigkeiten", "Phu Quoc Urlaub", "Vietnam private Reise"],
  alternates: { canonical: "https://www.govietstay.com/de" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de",
    title: "Vietnam-Reise auf Deutsch: Zentralvietnam & Phú Quốc | GoVietStay",
    description: "Deutschsprachige Reiseinformationen für Đà Nẵng, Hội An, Huế und Phú Quốc. Praktische Planung zuerst, private Reiseoptionen erst danach.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vietnam-Reise auf Deutsch: Zentralvietnam & Phú Quốc | GoVietStay",
    description: "Deutschsprachige Reiseinformationen für Đà Nẵng, Hội An, Huế und Phú Quốc. Praktische Planung zuerst, private Reiseoptionen erst danach.",
  },
};

const config = {
  "canonicalPath": "/de",
  "eyebrow": "VIETNAM AUF DEUTSCH",
  "title": "Vietnam sinnvoll planen – mit klaren Guides für Zentralvietnam und Phú Quốc.",
  "lead": "GoVietStay bündelt praktische Reiseinformationen für deutschsprachige Gäste: Wetter, Reiseroute, Aufenthaltsdauer, Familienplanung und die Frage, welche Orte wirklich zusammenpassen. Erst wenn der Plan steht, können wir ihn auf Wunsch privat umsetzen.",
  "chips": [
    "Đà Nẵng · Hội An · Huế",
    "Phú Quốc",
    "Reiseplanung vor Verkauf",
    "Private Reisen auf Wunsch"
  ],
  "facts": [
    {
      "label": "Zentralvietnam",
      "value": "Kultur, Geschichte, kurze Distanzen"
    },
    {
      "label": "Phú Quốc",
      "value": "Wintersonne, Strände, Inselerlebnisse"
    },
    {
      "label": "GoVietStay",
      "value": "lokale Unterstützung in Vietnam"
    }
  ],
  "sections": [
    {
      "kicker": "Zwei Reisewelten",
      "title": "Wann passt Zentralvietnam?",
      "body": "Đà Nẵng, Hội An und Huế liegen nah genug beieinander, um sie als eine zusammenhängende Region zu planen. Für viele Vietnam-Rundreisen sind drei bis fünf Tage ein sinnvoller Rahmen.",
      "bullets": [
        "Đà Nẵng als moderner Ausgangspunkt mit Flughafen und guter Straßenanbindung.",
        "Hội An für Altstadt, Essen, kleine Dörfer und langsameres Reisetempo.",
        "Huế für Kaiserstadt, Königsgräber, Geschichte und den Hải-Vân-Pass."
      ],
      "note": "Von Oktober bis Januar sollte das wechselhaftere Wetter in Zentralvietnam aktiv in die Tagesplanung einbezogen werden."
    },
    {
      "kicker": "Winterziel",
      "title": "Wann passt Phú Quốc?",
      "body": "Phú Quốc ist besonders interessant, wenn Strand, Wärme und ein ruhigerer Abschluss einer Vietnam-Reise wichtig sind. Die trockenere Saison liegt typischerweise in den Wintermonaten und reicht bis ins Frühjahr.",
      "bullets": [
        "Vor der Hotelwahl die Inselregion verstehen: Norden, Dương Đông, Ông Lang und Süden fühlen sich sehr unterschiedlich an.",
        "Nicht jede Insel- oder Schnorcheltour passt zu Familien, Paaren oder Gästen mit wenig Zeit.",
        "Bei vier bis sieben Nächten lohnt es sich, Strandtage und Ausflugstage bewusst zu trennen."
      ]
    },
    {
      "kicker": "Unsere Methode",
      "title": "Erst informieren, dann eine Route bauen",
      "body": "Unsere deutschen Guides beantworten zuerst die Fragen, die Reisende tatsächlich vor der Buchung haben: Wie viele Tage? Wo wohnen? Was bei Regen? Welche Strecke ist zu lang? Welche Aktivität passt zu Kindern?",
      "bullets": [
        "Keine künstliche Dringlichkeit.",
        "Keine pauschale Route für jeden Gast.",
        "Wenn private Organisation sinnvoll ist, passen wir Startzeit, Tempo und Stopps an Ihre Reise an."
      ]
    }
  ],
  "faqs": [
    {
      "q": "Sind die Informationen nur für Kunden von GoVietStay?",
      "a": "Nein. Die Guides sind als praktische Reisehilfe gedacht. Eine private Organisation ist optional."
    },
    {
      "q": "Kann ich Zentralvietnam und Phú Quốc in einer Reise kombinieren?",
      "a": "Ja. Häufig ist Zentralvietnam der Kultur- und Entdeckungsteil der Reise und Phú Quốc der ruhigere Strandabschluss. Flugtage und Wetter sollten dabei realistisch eingeplant werden."
    },
    {
      "q": "Organisiert GoVietStay nur private Reisen?",
      "a": "In diesem deutschen Bereich konzentrieren wir uns auf private, flexible Reiseabläufe und individuelle Tagesplanung."
    }
  ],
  "related": [
    {
      "href": "/de/zentralvietnam-private-touren",
      "title": "Zentralvietnam planen",
      "text": "Đà Nẵng, Hội An und Huế logisch verbinden."
    },
    {
      "href": "/de/phu-quoc",
      "title": "Phú Quốc Guide",
      "text": "Insel, Regionen, Reisezeit und Ausflüge verstehen."
    },
    {
      "href": "/de/zentralvietnam-reiseplan",
      "title": "3–5 Tage Zentralvietnam",
      "text": "Beispielrouten ohne unnötigen Zeitdruck."
    }
  ],
  "ctaTitle": "Sie kennen Ihre Reisedaten schon? Wir helfen beim privaten Ablauf.",
  "ctaText": "Senden Sie Reisedaten, Hotel und Gästezahl. Wir prüfen zuerst, welche Route realistisch ist, und organisieren sie auf Wunsch privat.",
  "whatsappText": "Hallo GoVietStay! Ich plane eine Vietnam-Reise. Reisedaten: ____. Orte: ____. Hotel: ____. Gäste: ____. Bitte helfen Sie mir zuerst bei einer sinnvollen privaten Reiseroute."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
