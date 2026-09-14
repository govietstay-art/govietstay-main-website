import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Zentralvietnam Reiseroute: 3–5 Tage Đà Nẵng, Hội An & Huế | GoVietStay",
  description: "Zentralvietnam Reiseroute für 3, 4 oder 5 Tage: Đà Nẵng, Hội An, Huế und Bà Nà sinnvoll verteilen, ohne die Reise zu überladen.",
  keywords: ["Zentralvietnam Reiseroute", "Zentralvietnam Rundreise", "Zentralvietnam Reise", "Da Nang Hoi An Hue Reiseroute", "Zentralvietnam 3 Tage", "Zentralvietnam 5 Tage"],
  alternates: { canonical: "https://www.govietstay.com/de/zentralvietnam-reiseplan" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/zentralvietnam-reiseplan",
    title: "Zentralvietnam Reiseroute: 3–5 Tage Đà Nẵng, Hội An & Huế | GoVietStay",
    description: "Zentralvietnam Reiseroute für 3, 4 oder 5 Tage: Đà Nẵng, Hội An, Huế und Bà Nà sinnvoll verteilen, ohne die Reise zu überladen.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentralvietnam Reiseroute: 3–5 Tage Đà Nẵng, Hội An & Huế | GoVietStay",
    description: "Zentralvietnam Reiseroute für 3, 4 oder 5 Tage: Đà Nẵng, Hội An, Huế und Bà Nà sinnvoll verteilen, ohne die Reise zu überladen.",
  },
};

const config = {
  "canonicalPath": "/de/zentralvietnam-reiseplan",
  "eyebrow": "3–5 TAGE · ZENTRALVIETNAM",
  "title": "Eine gute Reiseroute lässt Luft zwischen den Höhepunkten.",
  "lead": "Diese Beispiele sind kein starres Programm. Sie zeigen, wie sich Đà Nẵng, Hội An, Huế und Bà Nà je nach Aufenthaltsdauer verteilen lassen, ohne jeden Tag mit Transfers zu überladen.",
  "chips": [
    "3 Tage",
    "4 Tage",
    "5 Tage",
    "flexibel nach Wetter"
  ],
  "facts": [
    {
      "label": "3 Tage",
      "value": "drei klare Schwerpunkte"
    },
    {
      "label": "4 Tage",
      "value": "mehr Flexibilität"
    },
    {
      "label": "5 Tage",
      "value": "Huế + Bà Nà möglich"
    }
  ],
  "sections": [
    {
      "kicker": "3 Tage",
      "title": "Kompakt, aber noch sinnvoll",
      "body": "Tag 1 sollte nach Ankunft leicht bleiben; Tag 2 bekommt den größten Ausflug; Tag 3 kombiniert einen regionalen Schwerpunkt mit einem entspannten Abend.",
      "bullets": [
        "Tag 1: Ankunft, Sơn Trà oder Stadt, ruhiger Abend.",
        "Tag 2: Bà Nà Hills ODER Huế als ganzer Schwerpunkt.",
        "Tag 3: Marble Mountains + Hội An bis zum Abend."
      ],
      "note": "Wenn der Abflug früh ist, zählt der letzte Tag nicht als voller Reisetag."
    },
    {
      "kicker": "4 Tage",
      "title": "Die angenehmste Balance für viele Erstbesucher",
      "body": "Mit vier vollen Tagen müssen Sie nicht zwischen jedem Hauptziel wählen.",
      "bullets": [
        "Tag 1: Đà Nẵng ankommen und orientieren.",
        "Tag 2: Huế über eine sinnvolle Nordroute.",
        "Tag 3: ruhiger Vormittag + Hội An am Nachmittag/Abend.",
        "Tag 4: Bà Nà oder freier Familientag."
      ]
    },
    {
      "kicker": "5 Tage",
      "title": "Mehr Tiefe statt mehr Checkpoints",
      "body": "Der zusätzliche Tag sollte nicht automatisch mit weiteren Sehenswürdigkeiten gefüllt werden.",
      "bullets": [
        "Ein langsamer Food- oder Local-Day in Đà Nẵng.",
        "Mehr Zeit in Hội An und Umgebung.",
        "Puffer für Wetter, besonders von Oktober bis Januar.",
        "Später Start nach einem langen Vortag."
      ]
    },
    {
      "kicker": "Entscheidung",
      "title": "Huế oder Bà Nà, wenn nur eines möglich ist?",
      "body": "Huế passt besser zu Geschichte, Kultur und Architektur. Bà Nà passt besser zu inszenierter Berglandschaft, Golden Bridge und Freizeitpark-Erlebnis. Die richtige Wahl hängt vom Reisestil ab, nicht von einer allgemeinen Top-10-Liste."
    }
  ],
  "faqs": [
    {
      "q": "Kann man Đà Nẵng, Hội An und Huế in drei Tagen sehen?",
      "a": "Ja, aber nur mit klaren Prioritäten. Wer zusätzlich Bà Nà einbauen möchte, sollte vier bis fünf Tage einplanen."
    },
    {
      "q": "Wo sollte ich die ganze Zeit übernachten?",
      "a": "Đà Nẵng ist logistisch sehr praktisch. Wer abends möglichst viel Altstadtatmosphäre möchte, kann einen Teil der Nächte in Hội An verbringen."
    },
    {
      "q": "Was passiert bei starkem Regen?",
      "a": "Bei privater Planung kann die Reihenfolge angepasst werden. Indoor-, Food- und kürzere Stadtstopps sind dann oft sinnvoller als ein starrer Outdoor-Tag."
    }
  ],
  "related": [
    {
      "href": "/de/da-nang-regenzeit",
      "title": "Regenzeit richtig planen",
      "text": "Besonders wichtig für Oktober bis Januar."
    },
    {
      "href": "/de/hue",
      "title": "Huế oder Tagesausflug?",
      "text": "Historische Schwerpunkte realistisch planen."
    },
    {
      "href": "/de/hoi-an",
      "title": "Hội An Guide",
      "text": "Warum Tageszeit und Tempo wichtig sind."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich habe ____ Tage in Zentralvietnam. Ankunft: ____. Abflug: ____. Hotel: ____. Gäste: ____. Bitte helfen Sie mir bei einer privaten 3–5-Tage-Route."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
