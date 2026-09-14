import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Phú Quốc Urlaub 2026/27: Sehenswürdigkeiten & Reisetipps | GoVietStay",
  description: "Phú Quốc Urlaub auf Deutsch: Sehenswürdigkeiten, beste Regionen, Reisezeit, Inselerlebnisse und Planung für Paare und Familien.",
  keywords: ["Phu Quoc Urlaub", "Phu Quoc Sehenswürdigkeiten", "Phu Quoc Ausflüge", "Phu Quoc auf eigene Faust", "Phu Quoc Geheimtipps", "Phu Quoc deutsch"],
  alternates: { canonical: "https://www.govietstay.com/de/phu-quoc" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/phu-quoc",
    title: "Phú Quốc Urlaub 2026/27: Sehenswürdigkeiten & Reisetipps | GoVietStay",
    description: "Phú Quốc Urlaub auf Deutsch: Sehenswürdigkeiten, beste Regionen, Reisezeit, Inselerlebnisse und Planung für Paare und Familien.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phú Quốc Urlaub 2026/27: Sehenswürdigkeiten & Reisetipps | GoVietStay",
    description: "Phú Quốc Urlaub auf Deutsch: Sehenswürdigkeiten, beste Regionen, Reisezeit, Inselerlebnisse und Planung für Paare und Familien.",
  },
};

const config = {
  "canonicalPath": "/de/phu-quoc",
  "eyebrow": "PHÚ QUỐC · DEUTSCHER INSELGUIDE",
  "title": "Phú Quốc ist nicht nur ein Strand – zuerst die Insel verstehen, dann den Urlaub planen.",
  "lead": "Norden, Dương Đông, Ông Lang und der Süden bieten sehr unterschiedliche Erlebnisse. Dieser Guide hilft bei Reisezeit, Hotelregion und Ausflügen, bevor Sie irgendeine Tour buchen.",
  "chips": [
    "Phu Quoc Urlaub",
    "Phu Quoc Sehenswürdigkeiten",
    "Winter 2026/27",
    "Paare & Familien"
  ],
  "facts": [
    {
      "label": "Trockenere Saison",
      "value": "typisch November bis April"
    },
    {
      "label": "Inselstruktur",
      "value": "Norden · Zentrum · Süden"
    },
    {
      "label": "Ideal",
      "value": "Strandtage + ausgewählte Ausflugstage"
    }
  ],
  "sections": [
    {
      "kicker": "Orientierung",
      "title": "Vier Bereiche, vier verschiedene Urlaubsgefühle",
      "body": "Die Wahl der Hotelregion beeinflusst Fahrzeiten und Tagesgefühl stärker als viele Erstbesucher erwarten.",
      "bullets": [
        "Dương Đông: zentral, praktisch, Nachtmarkt und viele Restaurants.",
        "Ông Lang / Nordwesten: ruhiger, gut für Paare und entspannte Strandtage.",
        "Norden: Natur, Rạch Vẹm und große Freizeitattraktionen.",
        "Süden: Sunset Town, Khem Beach, An-Thới-Inselwelt und Hon-Thom-Seilbahn."
      ]
    },
    {
      "kicker": "Sehenswürdigkeiten",
      "title": "Was lohnt sich wirklich?",
      "body": "Phú Quốc bietet Natur, Strand und stark entwickelte Freizeitbereiche. Sie müssen nicht alles mögen – wählen Sie nach Reisestil.",
      "bullets": [
        "Rạch Vẹm und der Norden für Natur und ruhigeres Inselgefühl.",
        "Süden für Hon Thom, Inseln, Schnorcheln und Sunset Town.",
        "Dương Đông für Nachtmarkt, Alltag und zentrale Lage."
      ]
    },
    {
      "kicker": "Tempo",
      "title": "Wie viele Tage sind sinnvoll?",
      "body": "Vier Nächte reichen für einen ersten Eindruck. Fünf bis sieben Nächte erlauben echte Strandtage zwischen Ausflügen.",
      "bullets": [
        "4 Nächte: zwei Ausflugsschwerpunkte + Strand.",
        "5–6 Nächte: Nord und Süd getrennt planen.",
        "7 Nächte: mehr Wetterpuffer und bewusst freie Tage."
      ]
    },
    {
      "kicker": "Privat statt vollgepackt",
      "title": "Wann eine individuelle Route sinnvoll ist",
      "body": "Private Organisation ist besonders hilfreich, wenn Sie nicht jeden Stopp einer Standardroute wollen, mit Kindern reisen oder Nord und Süd nicht am selben Tag überladen möchten."
    }
  ],
  "faqs": [
    {
      "q": "Wie viele Tage braucht man auf Phú Quốc?",
      "a": "Für die meisten Erstbesucher sind vier bis sieben Nächte sinnvoll, je nachdem wie wichtig reine Strandtage sind."
    },
    {
      "q": "Ist Phú Quốc im Dezember gut?",
      "a": "Dezember liegt typischerweise in der trockeneren Saison und ist deshalb besonders attraktiv für Strand- und Inseltage."
    },
    {
      "q": "Ist Phú Quốc sehr touristisch?",
      "a": "Einige Bereiche sind stark entwickelt, besonders im Süden und bei großen Freizeitkomplexen. Andere Regionen wirken deutlich ruhiger. Die richtige Hotelregion ist deshalb entscheidend."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc/beste-reisezeit",
      "title": "Beste Reisezeit",
      "text": "Monate, Regenzeit und Winterplanung."
    },
    {
      "href": "/de/phu-quoc/wo-uebernachten",
      "title": "Wo übernachten?",
      "text": "Hotelregion nach Reisestil auswählen."
    },
    {
      "href": "/de/phu-quoc/individuelle-ausfluege",
      "title": "Individuelle Ausflüge",
      "text": "Private Tage statt überladener Programme."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich plane Phú Quốc. Reisedaten: ____. Hotel/Region: ____. Gäste: ____. Interessen: ____. Bitte helfen Sie mir zuerst bei einem sinnvollen privaten Reiseplan."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
