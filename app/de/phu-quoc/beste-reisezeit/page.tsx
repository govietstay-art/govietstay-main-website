import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Phú Quốc beste Reisezeit: Wetter & Regenzeit 2026/27 | GoVietStay",
  description: "Phú Quốc beste Reisezeit auf Deutsch: Trockenzeit, Regenzeit, Wetter nach Saison und Planung für Strand, Schnorcheln und Familien.",
  keywords: ["Phu Quoc beste Reisezeit", "Phu Quoc Reisezeit", "Phu Quoc Regenzeit", "Phu Quoc Wetter", "beste Reisezeit Phu Quoc Vietnam", "Phu Quoc Reiseklima"],
  alternates: { canonical: "https://www.govietstay.com/de/phu-quoc/beste-reisezeit" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/phu-quoc/beste-reisezeit",
    title: "Phú Quốc beste Reisezeit: Wetter & Regenzeit 2026/27 | GoVietStay",
    description: "Phú Quốc beste Reisezeit auf Deutsch: Trockenzeit, Regenzeit, Wetter nach Saison und Planung für Strand, Schnorcheln und Familien.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phú Quốc beste Reisezeit: Wetter & Regenzeit 2026/27 | GoVietStay",
    description: "Phú Quốc beste Reisezeit auf Deutsch: Trockenzeit, Regenzeit, Wetter nach Saison und Planung für Strand, Schnorcheln und Familien.",
  },
};

const config = {
  "canonicalPath": "/de/phu-quoc/beste-reisezeit",
  "eyebrow": "PHÚ QUỐC · WETTER & SAISON",
  "title": "Beste Reisezeit für Phú Quốc: Warum November bis April besonders gefragt ist.",
  "lead": "Für viele deutschsprachige Winterreisende passt Phú Quốc genau dann gut, wenn Zentralvietnam wechselhafter ist. Trotzdem lohnt es sich, Wetter, Meer und Ausflüge nicht pauschal für jeden Monat gleich zu behandeln.",
  "chips": [
    "Phu Quoc beste Reisezeit",
    "Trockenzeit",
    "Regenzeit",
    "Wintersonne"
  ],
  "facts": [
    {
      "label": "Trockenere Phase",
      "value": "meist November bis April"
    },
    {
      "label": "Meeraktivitäten",
      "value": "immer nach aktuellen Bedingungen"
    },
    {
      "label": "Winter",
      "value": "hohe Nachfrage früh einplanen"
    }
  ],
  "sections": [
    {
      "kicker": "Trockenzeit",
      "title": "November bis April",
      "body": "Diese Monate gelten typischerweise als die angenehmere Zeit für Phú Quốc: weniger Regen, ruhigere Wetterphasen und gute Voraussetzungen für Strandtage.",
      "bullets": [
        "Dezember bis Februar: sehr beliebt bei Winterreisenden.",
        "März bis April: weiterhin interessant, häufig wärmer.",
        "Beliebte Termine rund um Weihnachten und Neujahr früh planen."
      ]
    },
    {
      "kicker": "Regenzeit",
      "title": "Was sich in der feuchteren Saison ändert",
      "body": "Regen bedeutet nicht automatisch Dauerregen. Für Boots- und Schnorchelprogramme sind jedoch Wind, Wellen und Sicht genauso wichtig wie Niederschlag."
    },
    {
      "kicker": "Meer",
      "title": "Bootstouren niemals nur nach Kalender wählen",
      "body": "Auch in der guten Saison können einzelne Tage ungeeignet sein. Seriöse Planung berücksichtigt aktuelle Bedingungen und passt Inselroute oder Startzeit bei Bedarf an."
    },
    {
      "kicker": "Vergleich",
      "title": "Phú Quốc oder Đà Nẵng im Winter?",
      "body": "Wenn Sonne, Strand und Inselerlebnisse Priorität haben, passt Phú Quốc von November bis Januar meist besser. Wenn Kultur, Hội An und Huế wichtiger sind, bleibt Zentralvietnam interessant – nur mit flexibler Wetterplanung."
    }
  ],
  "faqs": [
    {
      "q": "Wann ist die beste Reisezeit für Phú Quốc?",
      "a": "Für viele Reisende ist November bis April die attraktivste Periode, weil diese Monate typischerweise trockener sind."
    },
    {
      "q": "Kann man Phú Quốc im Oktober besuchen?",
      "a": "Ja, aber Oktober liegt näher am Übergang aus der Regenzeit. Wetter und Meer sollten kurzfristig geprüft werden."
    },
    {
      "q": "Ist Januar gut für Familien?",
      "a": "Januar ist aufgrund der Saison grundsätzlich beliebt. Bei Familien sind zusätzlich Hotelregion, Fahrzeiten und der Anteil freier Strandtage wichtig."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc",
      "title": "Phú Quốc Gesamtguide",
      "text": "Regionen und Sehenswürdigkeiten verstehen."
    },
    {
      "href": "/de/phu-quoc/mit-kindern",
      "title": "Phú Quốc mit Kindern",
      "text": "Familienfreundliche Tagesplanung."
    },
    {
      "href": "/de/da-nang-regenzeit",
      "title": "Đà Nẵng Regenzeit",
      "text": "Wintervergleich mit Zentralvietnam."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich plane Phú Quốc von ____ bis ____. Hotel: ____. Gäste: ____. Bitte helfen Sie mir bei einer wettergerechten privaten Planung."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
