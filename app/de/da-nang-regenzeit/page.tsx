import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Đà Nẵng Regenzeit: Wetter, Aktivitäten & Plan B | GoVietStay",
  description: "Đà Nẵng in der Regenzeit: Was von Oktober bis Januar realistisch ist, welche Aktivitäten funktionieren und wie man Hội An, Huế und Bà Nà flexibel plant.",
  keywords: ["Da Nang Regenzeit", "Da Nang Wetter November", "Da Nang Dezember Wetter", "Da Nang Oktober Wetter", "Hoi An Regenzeit", "Da Nang bei Regen"],
  alternates: { canonical: "https://www.govietstay.com/de/da-nang-regenzeit" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/da-nang-regenzeit",
    title: "Đà Nẵng Regenzeit: Wetter, Aktivitäten & Plan B | GoVietStay",
    description: "Đà Nẵng in der Regenzeit: Was von Oktober bis Januar realistisch ist, welche Aktivitäten funktionieren und wie man Hội An, Huế und Bà Nà flexibel plant.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đà Nẵng Regenzeit: Wetter, Aktivitäten & Plan B | GoVietStay",
    description: "Đà Nẵng in der Regenzeit: Was von Oktober bis Januar realistisch ist, welche Aktivitäten funktionieren und wie man Hội An, Huế und Bà Nà flexibel plant.",
  },
};

const config = {
  "canonicalPath": "/de/da-nang-regenzeit",
  "eyebrow": "ĐÀ NẴNG · OKTOBER BIS JANUAR",
  "title": "Regenzeit heißt nicht „Reise absagen“ – aber die Route muss anders gebaut werden.",
  "lead": "Zentralvietnam kann im späten Herbst und frühen Winter sehr wechselhaft sein. Wer Strandwetter verspricht, plant falsch. Wer Alternativen, kurze Wege und flexible Tage vorbereitet, kann die Region trotzdem gut erleben.",
  "chips": [
    "Da Nang Regenzeit",
    "Plan B",
    "Food & Kultur",
    "flexible private Tage"
  ],
  "facts": [
    {
      "label": "Wichtig",
      "value": "Wetter kurzfristig prüfen"
    },
    {
      "label": "Nicht ideal",
      "value": "starre reine Strandplanung"
    },
    {
      "label": "Besser",
      "value": "Kultur, Essen, flexible Routen"
    }
  ],
  "sections": [
    {
      "kicker": "Realistisch bleiben",
      "title": "Was Regen in Đà Nẵng praktisch bedeutet",
      "body": "Es kann trockene Zeitfenster geben, aber auch längere Regenphasen. Tagesplanung sollte deshalb nicht nur auf einer Wetter-App vom Vorabend beruhen.",
      "bullets": [
        "Outdoor-Schwerpunkte möglichst in das bessere Wetterfenster legen.",
        "Fahrzeiten bei starkem Regen großzügiger planen.",
        "Meer- und Inselaktivitäten nur bei geeigneten Bedingungen einplanen."
      ]
    },
    {
      "kicker": "Gute Alternativen",
      "title": "Was auch an wechselhaften Tagen funktioniert",
      "body": "Food-Touren, Cafés, Märkte, Museen und einzelne Tempel- oder Stadtstopps lassen sich leichter anpassen als ein ganzer Outdoor-Tag.",
      "bullets": [
        "Đà Nẵng: lokale Küche, Cafés, Han-Markt, Museen.",
        "Hội An: Altstadt, Essen, Handwerk – mit Regenjacke und Pausen.",
        "Huế: Teile der historischen Route, wenn Straßenbedingungen gut sind."
      ]
    },
    {
      "kicker": "Bà Nà",
      "title": "Nebel ist nicht dasselbe wie Regen",
      "body": "Bà Nà Hills liegt deutlich höher. Selbst bei trockener Stadt kann es oben neblig, kühl oder nass sein. Entscheiden Sie deshalb nicht nur nach dem Wetter am Strand."
    },
    {
      "kicker": "Private Planung",
      "title": "Warum Flexibilität in dieser Saison mehr wert ist",
      "body": "Wenn Startzeit und Reihenfolge nicht an ein starres Programm gebunden sind, kann ein trockener Morgen spontan genutzt oder ein starker Regenschauer mit einem späteren Start abgefedert werden."
    }
  ],
  "faqs": [
    {
      "q": "Ist November eine schlechte Zeit für Đà Nẵng?",
      "a": "Für einen reinen Strandurlaub ist das Risiko höher. Für eine Vietnam-Rundreise mit Kultur, Essen und flexiblen Ausflügen kann Đà Nẵng trotzdem sinnvoll sein."
    },
    {
      "q": "Regnet es im Dezember jeden Tag?",
      "a": "Nein. Wetter variiert. Entscheidend ist, nicht mit garantiertem Strandwetter zu planen und aktuelle Bedingungen kurz vor dem jeweiligen Ausflug zu prüfen."
    },
    {
      "q": "Sollte ich im Winter lieber Phú Quốc wählen?",
      "a": "Wenn der Schwerpunkt klar auf Sonne und Strand liegt, ist Phú Quốc in der trockeneren Wintersaison oft die passendere Wahl. Zentralvietnam bietet dafür mehr Kultur- und Rundreisecharakter."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc/beste-reisezeit",
      "title": "Phú Quốc beste Reisezeit",
      "text": "Winterwetter beider Regionen vergleichen."
    },
    {
      "href": "/de/da-nang",
      "title": "Đà Nẵng Guide",
      "text": "Sehenswürdigkeiten jenseits des Strandes."
    },
    {
      "href": "/de/zentralvietnam-reiseplan",
      "title": "3–5 Tage Reiseplan",
      "text": "Mit Wetterpuffer planen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich bin von ____ bis ____ in Đà Nẵng. Hotel: ____. Gäste: ____. Bitte helfen Sie mir bei einer privaten, wetterflexiblen Route."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
