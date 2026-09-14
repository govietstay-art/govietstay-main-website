import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Phú Quốc mit Kindern: Familienurlaub, Strände & Ausflüge | GoVietStay",
  description: "Phú Quốc mit Kindern: Hotelregion, Strand, Safari, Inseln, Pausen und private Tagesplanung für Familien mit Baby oder Kleinkind.",
  keywords: ["Phu Quoc mit Kindern", "Phu Quoc mit Kleinkind", "Phu Quoc mit Baby", "Phu Quoc Familienurlaub", "Phu Quoc Familie"],
  alternates: { canonical: "https://www.govietstay.com/de/phu-quoc/mit-kindern" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/phu-quoc/mit-kindern",
    title: "Phú Quốc mit Kindern: Familienurlaub, Strände & Ausflüge | GoVietStay",
    description: "Phú Quốc mit Kindern: Hotelregion, Strand, Safari, Inseln, Pausen und private Tagesplanung für Familien mit Baby oder Kleinkind.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phú Quốc mit Kindern: Familienurlaub, Strände & Ausflüge | GoVietStay",
    description: "Phú Quốc mit Kindern: Hotelregion, Strand, Safari, Inseln, Pausen und private Tagesplanung für Familien mit Baby oder Kleinkind.",
  },
};

const config = {
  "canonicalPath": "/de/phu-quoc/mit-kindern",
  "eyebrow": "PHÚ QUỐC · FAMILIEN",
  "title": "Phú Quốc mit Kindern: weniger Transfers, mehr gute Pausen.",
  "lead": "Bei Familien entscheidet nicht die längste Attraktionsliste, sondern ob Hotelregion, Fahrzeiten, Hitze und Tagesrhythmus zusammenpassen. Ein guter Familienurlaub braucht bewusst freie Zeit.",
  "chips": [
    "Phu Quoc mit Kindern",
    "Kleinkind & Baby",
    "Familienstrände",
    "private Familientage"
  ],
  "facts": [
    {
      "label": "Priorität",
      "value": "kurze Wege & Pausen"
    },
    {
      "label": "Ausflüge",
      "value": "ein Hauptziel pro Tageshälfte"
    },
    {
      "label": "Meer",
      "value": "Sicherheit vor Programm"
    }
  ],
  "sections": [
    {
      "kicker": "Hotelregion",
      "title": "Die Lage entscheidet über jeden Ausflug",
      "body": "Mit Kindern lohnt es sich besonders, vor der Hotelbuchung zu prüfen, welche Aktivitäten wirklich geplant sind. Ein schönes Resort kann unpraktisch sein, wenn jeden Tag lange Fahrten nötig werden."
    },
    {
      "kicker": "Tagesrhythmus",
      "title": "Nicht jeden Tag früh starten",
      "body": "Ein Wechsel aus Ausflugstag und freiem Strandtag funktioniert für viele Familien besser als fünf volle Tage hintereinander.",
      "bullets": [
        "Späterer Start nach langen Tagen.",
        "Mittagshitze und Schlafzeiten berücksichtigen.",
        "Abendprogramm nur dort einbauen, wo Rückfahrt und Essen unkompliziert sind."
      ]
    },
    {
      "kicker": "Inseln",
      "title": "Bootstage mit Kindern realistisch beurteilen",
      "body": "Alter, Schwimmfähigkeit, Wellengang und Bootstyp sind wichtiger als die Anzahl der Inseln. Für kleine Kinder kann eine kürzere private Route deutlich angenehmer sein."
    },
    {
      "kicker": "Attraktionen",
      "title": "Safari, Wasserpark oder Natur?",
      "body": "Große Attraktionen können einen ganzen Tag füllen. Kombinieren Sie sie nicht automatisch mit weit entfernten Inselstopps nur weil beides auf derselben Insel liegt."
    }
  ],
  "faqs": [
    {
      "q": "Ist Phú Quốc mit Kleinkind geeignet?",
      "a": "Ja, wenn Hotelregion und Tagesplanung bewusst gewählt werden. Kurze Transfers und freie Strandtage sind besonders wertvoll."
    },
    {
      "q": "Sollte man mit Kindern 3 oder 4 Inseln machen?",
      "a": "Das hängt von Alter, Wetter und Bootserfahrung ab. Ein kürzerer privater Bootstag ist für kleine Kinder oft angenehmer."
    },
    {
      "q": "Welche Region ist familienfreundlich?",
      "a": "Das hängt vom Reisestil ab: zentral für kurze Wege und Restaurants, Süden für große Attraktionen und Strände, ruhigere Nordwestbereiche für Resort- und Strandfokus."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc/wo-uebernachten",
      "title": "Wo übernachten?",
      "text": "Familienregion nach Fahrzeiten auswählen."
    },
    {
      "href": "/de/phu-quoc/3-oder-4-inseln",
      "title": "3 oder 4 Inseln?",
      "text": "Bootstag familiengerecht entscheiden."
    },
    {
      "href": "/de/phu-quoc/beste-reisezeit",
      "title": "Beste Reisezeit",
      "text": "Wetter für Familienurlaub einordnen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Wir reisen als Familie nach Phú Quốc. Daten: ____. Kinderalter: ____. Hotel: ____. Interessen: ____. Bitte helfen Sie uns bei einer ruhigen privaten Familienroute."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
