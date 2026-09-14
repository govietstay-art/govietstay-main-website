import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Wo auf Phú Quốc übernachten? Dương Đông, Ông Lang oder Süden | GoVietStay",
  description: "Wo auf Phú Quốc übernachten? Vergleich von Dương Đông, Ông Lang, Norden und Süden nach Strand, Restaurants, Ruhe, Familie und Ausflügen.",
  keywords: ["Phu Quoc beste Lage", "wo übernachten Phu Quoc", "Phu Quoc Unterkunft", "Ong Lang Phu Quoc", "Duong Dong Phu Quoc", "Phu Quoc Süden Hotel"],
  alternates: { canonical: "https://www.govietstay.com/de/phu-quoc/wo-uebernachten" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/phu-quoc/wo-uebernachten",
    title: "Wo auf Phú Quốc übernachten? Dương Đông, Ông Lang oder Süden | GoVietStay",
    description: "Wo auf Phú Quốc übernachten? Vergleich von Dương Đông, Ông Lang, Norden und Süden nach Strand, Restaurants, Ruhe, Familie und Ausflügen.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wo auf Phú Quốc übernachten? Dương Đông, Ông Lang oder Süden | GoVietStay",
    description: "Wo auf Phú Quốc übernachten? Vergleich von Dương Đông, Ông Lang, Norden und Süden nach Strand, Restaurants, Ruhe, Familie und Ausflügen.",
  },
};

const config = {
  "canonicalPath": "/de/phu-quoc/wo-uebernachten",
  "eyebrow": "PHÚ QUỐC · HOTELREGIONEN",
  "title": "Die beste Lage auf Phú Quốc hängt davon ab, wie Sie Ihre Tage verbringen wollen.",
  "lead": "Ein Hotel kann wunderschön sein und trotzdem schlecht zu Ihrer Reise passen. Bevor Sie buchen, vergleichen Sie Strandgefühl, Restaurants, Abendleben und die Fahrzeiten zu Nord- und Südattraktionen.",
  "chips": [
    "Phu Quoc beste Lage",
    "Dương Đông",
    "Ông Lang",
    "Süden & Norden"
  ],
  "facts": [
    {
      "label": "Dương Đông",
      "value": "zentral & praktisch"
    },
    {
      "label": "Ông Lang",
      "value": "ruhiger & resortorientiert"
    },
    {
      "label": "Süden",
      "value": "nahe Hon Thom & Sunset Town"
    }
  ],
  "sections": [
    {
      "kicker": "Dương Đông",
      "title": "Für kurze Wege und viele Essensoptionen",
      "body": "Die zentrale Lage eignet sich für Reisende, die Nachtmarkt, Restaurants und unkomplizierte Transfers schätzen. Für reine Resort-Ruhe gibt es passendere Regionen."
    },
    {
      "kicker": "Ông Lang",
      "title": "Für ruhigere Tage und Paare",
      "body": "Der Nordwesten fühlt sich vielerorts entspannter an. Wer nicht jeden Abend Programm braucht und Strandzeit priorisiert, findet hier oft eine gute Balance."
    },
    {
      "kicker": "Süden",
      "title": "Für Hon Thom, Khem Beach und Sunset Town",
      "body": "Wenn Ihre wichtigsten Aktivitäten im Süden liegen, kann ein südliches Hotel viel Fahrzeit sparen. Dafür sind Ausflüge in den Norden länger."
    },
    {
      "kicker": "Norden",
      "title": "Für Natur und große Attraktionen",
      "body": "Der Norden passt zu Gästen, die Safari, Grand World oder nördliche Strände priorisieren. Für mehrere Südinseltage ist die Distanz dagegen spürbar."
    },
    {
      "kicker": "Entscheidung",
      "title": "Hotelwahl und Ausflüge gemeinsam planen",
      "body": "Schreiben Sie zuerst drei Prioritäten auf. Wenn zwei davon im Süden liegen, ist ein südliches Hotel logischer. Wenn Sie Nachtmarkt, Restaurants und flexible Inselerkundung wollen, ist die Mitte oft praktischer."
    }
  ],
  "faqs": [
    {
      "q": "Welche Gegend ist beim ersten Phú-Quốc-Besuch am besten?",
      "a": "Für viele Erstbesucher ist eine zentrale oder nordwestliche Lage praktisch. Die beste Wahl hängt aber stark von den geplanten Ausflügen ab."
    },
    {
      "q": "Ist der Süden zu weit vom Nachtmarkt entfernt?",
      "a": "Die Fahrt ist spürbar. Wer jeden Abend nach Dương Đông möchte, sollte das vor der Hotelbuchung berücksichtigen."
    },
    {
      "q": "Wo ist es ruhiger?",
      "a": "Ông Lang und einige nördliche beziehungsweise abgelegenere Resortbereiche wirken oft ruhiger als das Zentrum oder stark entwickelte Attraktionszonen."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc",
      "title": "Phú Quốc Gesamtguide",
      "text": "Die Inselregionen im Überblick."
    },
    {
      "href": "/de/phu-quoc/mit-kindern",
      "title": "Mit Kindern",
      "text": "Hotelregion nach Familienrhythmus wählen."
    },
    {
      "href": "/de/phu-quoc/individuelle-ausfluege",
      "title": "Private Ausflüge",
      "text": "Fahrzeiten aus Ihrer Hotelregion berücksichtigen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich suche die passende Hotelregion auf Phú Quốc. Reisedaten: ____. Gäste: ____. Interessen: ____. Bevorzugt: ruhig / zentral / Familie / Süden. Bitte helfen Sie mir bei der Planung."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
