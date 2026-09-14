import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Individuelle Ausflüge Phú Quốc: private Route nach Ihrem Tempo | GoVietStay",
  description: "Individuelle Ausflüge auf Phú Quốc: private Route für Paare, Familien und kleine Reisegruppen – mit Hotelabholung, flexiblem Tempo und klarer Planung.",
  keywords: ["Phu Quoc private Tour", "Phu Quoc individuelle Ausflüge", "Phu Quoc privat Tour", "private Tour Phu Quoc", "Phu Quoc private Ausflüge"],
  alternates: { canonical: "https://www.govietstay.com/de/phu-quoc/individuelle-ausfluege" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/phu-quoc/individuelle-ausfluege",
    title: "Individuelle Ausflüge Phú Quốc: private Route nach Ihrem Tempo | GoVietStay",
    description: "Individuelle Ausflüge auf Phú Quốc: private Route für Paare, Familien und kleine Reisegruppen – mit Hotelabholung, flexiblem Tempo und klarer Planung.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Individuelle Ausflüge Phú Quốc: private Route nach Ihrem Tempo | GoVietStay",
    description: "Individuelle Ausflüge auf Phú Quốc: private Route für Paare, Familien und kleine Reisegruppen – mit Hotelabholung, flexiblem Tempo und klarer Planung.",
  },
};

const config = {
  "canonicalPath": "/de/phu-quoc/individuelle-ausfluege",
  "eyebrow": "PHÚ QUỐC · PRIVAT & FLEXIBEL",
  "title": "Ein privater Tag auf Phú Quốc sollte nicht einfach ein Standardprogramm mit eigenem Auto sein.",
  "lead": "Der Mehrwert entsteht erst, wenn Route, Startzeit und Stopps zu Ihrem Hotel, Ihren Interessen und Ihrem Tempo passen. Deshalb beginnt die Planung mit Ihren Prioritäten – nicht mit einer fertigen Verkaufsliste.",
  "chips": [
    "private Route",
    "Hotelabholung",
    "flexibles Tempo",
    "Paare · Familien"
  ],
  "facts": [
    {
      "label": "Planung",
      "value": "Hotel + Interessen zuerst"
    },
    {
      "label": "Format",
      "value": "privates Fahrzeug / Boot je nach Route"
    },
    {
      "label": "Tempo",
      "value": "an Gäste angepasst"
    }
  ],
  "sections": [
    {
      "kicker": "Vorbereitung",
      "title": "Was wir vor einer privaten Route wissen müssen",
      "body": "Vier Informationen reichen für einen ersten sinnvollen Vorschlag.",
      "bullets": [
        "Reisedatum und Hotel.",
        "Anzahl der Gäste und Kinderalter.",
        "Was Sie bereits auf Phú Quốc gesehen haben.",
        "Zwei oder drei Prioritäten für den Tag."
      ]
    },
    {
      "kicker": "Nordroute",
      "title": "Natur und ruhigere Inselteile",
      "body": "Eine Nordroute kann Rạch Vẹm, Strände, Natur und ausgewählte lokale Stopps verbinden. Je nach Hotel sollte die Fahrzeit realistisch eingeplant werden."
    },
    {
      "kicker": "Südroute",
      "title": "Inseln, Hon Thom und Sunset Town",
      "body": "Im Süden liegen viele bekannte Attraktionen nah beieinander, aber nicht alles gehört in denselben Tag. Boot, Seilbahn und Abendshow können zusammen sehr lang werden."
    },
    {
      "kicker": "Familien & Paare",
      "title": "Dasselbe Ziel, anderes Tempo",
      "body": "Paare wünschen oft mehr Zeit für Fotostopps, Essen oder ruhige Strände. Familien brauchen eher Pausen, planbare Essenszeiten und kürzere Transferblöcke. Eine private Route sollte diesen Unterschied sichtbar machen."
    }
  ],
  "faqs": [
    {
      "q": "Kann ich nur ein privates Fahrzeug buchen?",
      "a": "Je nach Route ist ein privates Fahrzeug mit Fahrer möglich. Bei erklärungsintensiven Kultur- oder Ausflugstagen kann zusätzlich ein Guide sinnvoll sein."
    },
    {
      "q": "Kann die Startzeit angepasst werden?",
      "a": "Ja, sofern Öffnungszeiten, Bootszeiten oder feste Eintrittsfenster es erlauben."
    },
    {
      "q": "Gibt es eine feste Route?",
      "a": "Nein. Wir nutzen bewährte Strecken als Grundlage, passen sie aber an Hotel, Gäste, Wetter und Prioritäten an."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc",
      "title": "Phú Quốc Guide",
      "text": "Erst die Insel und Regionen verstehen."
    },
    {
      "href": "/de/phu-quoc/3-oder-4-inseln",
      "title": "3 oder 4 Inseln?",
      "text": "Private Bootplanung vorbereiten."
    },
    {
      "href": "/de/phu-quoc/wo-uebernachten",
      "title": "Wo übernachten?",
      "text": "Hotelregion und Ausflüge zusammen denken."
    }
  ],
  "ctaKicker": "PRIVATE REISEPLANUNG",
  "ctaTitle": "Senden Sie uns Ihre Eckdaten – wir bauen zuerst den sinnvollen Tag.",
  "ctaText": "Keine überladene Standardliste. Wir prüfen Hotel, Distanzen, Wetter und Ihre Prioritäten und schlagen dann einen privaten Ablauf vor.",
  "whatsappText": "Hallo GoVietStay! Ich möchte einen individuellen privaten Ausflug auf Phú Quốc. Datum: ____. Hotel: ____. Gäste: ____. Kinder: ____. Prioritäten: ____. Bitte schlagen Sie zuerst eine passende Route vor."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
