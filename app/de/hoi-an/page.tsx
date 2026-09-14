import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Hội An Sehenswürdigkeiten: Altstadt, Umgebung & Tipps | GoVietStay",
  description: "Hội An Sehenswürdigkeiten auf Deutsch: Altstadt, beste Tageszeit, Umgebung, Essen und sinnvolle Kombinationen ab Đà Nẵng.",
  keywords: ["Hoi An Sehenswürdigkeiten", "Hoi An Altstadt Sehenswürdigkeiten", "Hoi An Umgebung", "Hoi An Tagesausflug", "Da Nang Hoi An Sehenswürdigkeiten", "Hoi An Sightseeing"],
  alternates: { canonical: "https://www.govietstay.com/de/hoi-an" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/hoi-an",
    title: "Hội An Sehenswürdigkeiten: Altstadt, Umgebung & Tipps | GoVietStay",
    description: "Hội An Sehenswürdigkeiten auf Deutsch: Altstadt, beste Tageszeit, Umgebung, Essen und sinnvolle Kombinationen ab Đà Nẵng.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hội An Sehenswürdigkeiten: Altstadt, Umgebung & Tipps | GoVietStay",
    description: "Hội An Sehenswürdigkeiten auf Deutsch: Altstadt, beste Tageszeit, Umgebung, Essen und sinnvolle Kombinationen ab Đà Nẵng.",
  },
};

const config = {
  "canonicalPath": "/de/hoi-an",
  "eyebrow": "HỘI AN · REISEGUIDE",
  "title": "Hội An ist am besten, wenn Sie nicht versuchen, die Altstadt in Rekordzeit abzuhaken.",
  "lead": "Die UNESCO-Altstadt ist kompakt, aber das Erlebnis verändert sich je nach Tageszeit. Wer zusätzlich Dörfer, Reisfelder oder lokale Küche erleben möchte, sollte den Tag bewusst in zwei Teile teilen.",
  "chips": [
    "Hoi An Sehenswürdigkeiten",
    "UNESCO-Altstadt",
    "Nachmittag + Abend",
    "Umgebung entdecken"
  ],
  "facts": [
    {
      "label": "Stärke",
      "value": "Atmosphäre, Geschichte, Essen"
    },
    {
      "label": "Beste Planung",
      "value": "später Nachmittag bis Abend"
    },
    {
      "label": "Ab Đà Nẵng",
      "value": "leicht als privater Tagesausflug"
    }
  ],
  "sections": [
    {
      "kicker": "Altstadt",
      "title": "Was in Hội An wirklich Zeit verdient",
      "body": "Japanische Brücke, alte Handelshäuser, Versammlungshallen und Flussufer liegen nah beieinander. Der Wert liegt weniger in der Anzahl der Stopps als im langsamen Erkunden.",
      "bullets": [
        "Früher Nachmittag für Architektur und ruhigere Gassen.",
        "Später Nachmittag für Cafés, Märkte und Flussufer.",
        "Abend für Laternen, Nachtmarkt und Atmosphäre."
      ]
    },
    {
      "kicker": "Außerhalb",
      "title": "Hội An endet nicht an der Altstadtgrenze",
      "body": "Die Umgebung zeigt eine andere Seite der Region.",
      "bullets": [
        "Reisfelder und kleine Dörfer für einen ruhigeren Kontrast.",
        "Kokospalmengebiet bei Cẩm Thanh als bekannte Aktivität – touristisch, aber für viele Familien unterhaltsam.",
        "An-Bàng-Strand, wenn Wetter und Tagesablauf passen."
      ]
    },
    {
      "kicker": "Kombinieren",
      "title": "Was passt gut mit Hội An zusammen?",
      "body": "Ab Đà Nẵng lässt sich Hội An mit Marble Mountains oder einem langsamen lokalen Stopp verbinden. Zu viele weit entfernte Ziele am selben Tag nehmen der Altstadt jedoch genau das Tempo, das sie besonders macht."
    },
    {
      "kicker": "Wetter",
      "title": "Oktober bis Januar anders planen",
      "body": "In dieser Zeit sind Regentage und stärkere Niederschläge möglich. Eine private Route kann den Start verschieben oder Indoor- und Food-Stopps stärker einbauen."
    }
  ],
  "faqs": [
    {
      "q": "Reicht ein halber Tag für Hội An?",
      "a": "Für die Altstadt ja, besonders vom Nachmittag bis Abend. Wenn Sie zusätzlich Landschaft oder Dörfer sehen möchten, ist mehr Zeit sinnvoll."
    },
    {
      "q": "Ist Hội An von Đà Nẵng aus einfach erreichbar?",
      "a": "Ja. Die Fahrt ist relativ kurz und lässt sich gut mit südlich von Đà Nẵng gelegenen Stopps kombinieren."
    },
    {
      "q": "Sollte man in Hội An übernachten?",
      "a": "Wer die Altstadt früh am Morgen und spät am Abend erleben möchte, profitiert von einer Übernachtung. Für eine Zentralvietnam-Basis kann Đà Nẵng praktischer sein."
    }
  ],
  "related": [
    {
      "href": "/de/da-nang",
      "title": "Đà Nẵng Guide",
      "text": "Hội An mit der Küstenstadt sinnvoll verbinden."
    },
    {
      "href": "/de/zentralvietnam-reiseplan",
      "title": "3–5 Tage Zentralvietnam",
      "text": "Welche Tage sich für Hội An eignen."
    },
    {
      "href": "/de/da-nang-regenzeit",
      "title": "Regenzeit Guide",
      "text": "Plan B für wechselhafte Tage."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich möchte Hội An privat besuchen. Datum: ____. Hotel: ____. Gäste: ____. Interessen: Altstadt / Essen / Landschaft / Familie. Bitte schlagen Sie einen ruhigen Ablauf vor."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
