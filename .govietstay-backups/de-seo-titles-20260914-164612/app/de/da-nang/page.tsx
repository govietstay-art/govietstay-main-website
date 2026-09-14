import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Đà Nẵng Sehenswürdigkeiten & Reisetipps 2026/27 | GoVietStay",
  description: "Đà Nẵng Sehenswürdigkeiten, Ausflüge, Aufenthaltsdauer und Umgebung auf Deutsch. Praktischer Guide für eine Reise zwischen Hội An, Huế und Bà Nà Hills.",
  keywords: ["Da Nang Sehenswürdigkeiten", "Da Nang Urlaub", "Da Nang Ausflüge", "Da Nang Umgebung Sehenswürdigkeiten", "Da Nang mit Kindern", "Da Nang Sightseeing"],
  alternates: { canonical: "https://www.govietstay.com/de/da-nang" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/da-nang",
    title: "Đà Nẵng Sehenswürdigkeiten & Reisetipps 2026/27 | GoVietStay",
    description: "Đà Nẵng Sehenswürdigkeiten, Ausflüge, Aufenthaltsdauer und Umgebung auf Deutsch. Praktischer Guide für eine Reise zwischen Hội An, Huế und Bà Nà Hills.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đà Nẵng Sehenswürdigkeiten & Reisetipps 2026/27 | GoVietStay",
    description: "Đà Nẵng Sehenswürdigkeiten, Ausflüge, Aufenthaltsdauer und Umgebung auf Deutsch. Praktischer Guide für eine Reise zwischen Hội An, Huế und Bà Nà Hills.",
  },
};

const config = {
  "canonicalPath": "/de/da-nang",
  "eyebrow": "ĐÀ NẴNG · REISEGUIDE",
  "title": "Đà Nẵng: mehr als Strand – und vor allem ein sehr guter Ausgangspunkt.",
  "lead": "Wer Đà Nẵng nur als Badeort betrachtet, übersieht seine größte Stärke: Von hier erreichen Sie Meer, Berge, Hội An, Huế und Bà Nà Hills ohne ständig das Hotel zu wechseln.",
  "chips": [
    "Da Nang Sehenswürdigkeiten",
    "Ausflüge ab Đà Nẵng",
    "2–4 Nächte",
    "Familien & Paare"
  ],
  "facts": [
    {
      "label": "Ideal für",
      "value": "zentrale Basis in Mittelvietnam"
    },
    {
      "label": "Stadt + Umgebung",
      "value": "Sơn Trà, Marble Mountains, Hội An"
    },
    {
      "label": "Planung",
      "value": "Wetter und Tageszeit beachten"
    }
  ],
  "sections": [
    {
      "kicker": "Die Stadt",
      "title": "Was in Đà Nẵng selbst sehenswert ist",
      "body": "Die Stadt ist modern und weitläufig. Für die meisten Reisenden sind einzelne Viertel und Aussichtspunkte interessanter als ein ganzer Tag mit möglichst vielen Stadtstopps.",
      "bullets": [
        "Halbinsel Sơn Trà und Linh-Ứng-Pagode für Aussicht und Küstenlandschaft.",
        "My-Khe-Strand für Spaziergänge und ruhige Morgenstunden.",
        "Marble Mountains südlich der Stadt als guter Übergang Richtung Hội An.",
        "Han-Fluss und Drachenbrücke für den Abend."
      ]
    },
    {
      "kicker": "Umgebung",
      "title": "Die stärksten Ausflüge beginnen außerhalb des Zentrums",
      "body": "Đà Nẵng funktioniert besonders gut als Basis für Tagesausflüge.",
      "bullets": [
        "Hội An am Nachmittag bis Abend, wenn Laternen und Altstadt zusammenkommen.",
        "Huế über den Hải-Vân-Pass für Geschichte und Landschaft.",
        "Bà Nà Hills als eigener ganzer Schwerpunkt, nicht als kurzer Zwischenstopp."
      ]
    },
    {
      "kicker": "Aufenthaltsdauer",
      "title": "Wie viele Tage sind sinnvoll?",
      "body": "Zwei Nächte reichen für einen Überblick. Drei bis vier Nächte sind deutlich angenehmer, wenn Hội An oder Huế dazukommen.",
      "bullets": [
        "2 Nächte: Stadt + Hội An.",
        "3 Nächte: zusätzlicher großer Tagesausflug.",
        "4 Nächte: flexibler bei Wetter und später Ankunft."
      ]
    },
    {
      "kicker": "Praktisch",
      "title": "Wann private Organisation hilft",
      "body": "Eine private Route lohnt sich besonders, wenn Sie mehrere Orte an einem Tag verbinden möchten, ein kleines Kind dabeihaben oder nicht an feste Startzeiten gebunden sein wollen."
    }
  ],
  "faqs": [
    {
      "q": "Wie lange sollte man in Đà Nẵng bleiben?",
      "a": "Für die Stadt allein reichen oft ein bis zwei Tage. Als Ausgangspunkt für Hội An, Huế und Bà Nà sind drei bis vier Nächte komfortabler."
    },
    {
      "q": "Lohnt sich Đà Nẵng im Dezember?",
      "a": "Ja, aber die Reise sollte nicht als reiner Strandurlaub geplant werden. Dezember kann noch wechselhaft und regnerisch sein; Kultur, Essen und flexible Tagesausflüge sind dann wichtiger."
    },
    {
      "q": "Kann man Đà Nẵng und Hội An an einem Tag kombinieren?",
      "a": "Ja. Besonders sinnvoll ist eine Route, die tagsüber einen Ort südlich von Đà Nẵng besucht und den späteren Nachmittag sowie Abend für Hội An reserviert."
    }
  ],
  "related": [
    {
      "href": "/de/da-nang-regenzeit",
      "title": "Đà Nẵng in der Regenzeit",
      "text": "Was von Oktober bis Januar anders geplant werden sollte."
    },
    {
      "href": "/de/hoi-an",
      "title": "Hội An Sehenswürdigkeiten",
      "text": "Altstadt, Umgebung und Tageszeit richtig wählen."
    },
    {
      "href": "/de/zentralvietnam-reiseplan",
      "title": "Zentralvietnam Reiseplan",
      "text": "Đà Nẵng in eine 3–5-Tage-Route einbauen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich plane Đà Nẵng privat. Reisedaten: ____. Hotel: ____. Gäste: ____. Interessen: ____. Bitte helfen Sie mir bei einer flexiblen Route."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
