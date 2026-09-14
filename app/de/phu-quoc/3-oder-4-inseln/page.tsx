import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Phú Quốc 3 oder 4 Inseln? Vergleich für Schnorcheln & Hon Thom | GoVietStay",
  description: "Phú Quốc 3 oder 4 Inseln: Unterschiede bei Dauer, Schnorcheln, Hon-Thom-Seilbahn und Familien. Entscheidungshilfe vor einer privaten Inseltour.",
  keywords: ["Phu Quoc 3 Inseln", "Phu Quoc 4 Inseln", "Phu Quoc Inseltour", "Phu Quoc Schnorcheln", "Hon Thom Seilbahn", "An Thoi Inseln"],
  alternates: { canonical: "https://www.govietstay.com/de/phu-quoc/3-oder-4-inseln" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/phu-quoc/3-oder-4-inseln",
    title: "Phú Quốc 3 oder 4 Inseln? Vergleich für Schnorcheln & Hon Thom | GoVietStay",
    description: "Phú Quốc 3 oder 4 Inseln: Unterschiede bei Dauer, Schnorcheln, Hon-Thom-Seilbahn und Familien. Entscheidungshilfe vor einer privaten Inseltour.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phú Quốc 3 oder 4 Inseln? Vergleich für Schnorcheln & Hon Thom | GoVietStay",
    description: "Phú Quốc 3 oder 4 Inseln: Unterschiede bei Dauer, Schnorcheln, Hon-Thom-Seilbahn und Familien. Entscheidungshilfe vor einer privaten Inseltour.",
  },
};

const config = {
  "canonicalPath": "/de/phu-quoc/3-oder-4-inseln",
  "eyebrow": "AN THỚI · INSELPLANUNG",
  "title": "3 oder 4 Inseln auf Phú Quốc? Mehr Stopps bedeuten nicht automatisch einen besseren Tag.",
  "lead": "Entscheidend sind Meerbedingungen, Gruppenzusammensetzung, Schnorchelinteresse und ob die Hon-Thom-Seilbahn Teil des Tages sein soll. Dieser Vergleich hilft, bevor eine Route festgelegt wird.",
  "chips": [
    "3 Inseln",
    "4 Inseln + Hon Thom",
    "Schnorcheln",
    "private Route möglich"
  ],
  "facts": [
    {
      "label": "3 Inseln",
      "value": "mehr Fokus auf Boot & Meer"
    },
    {
      "label": "4 Inseln",
      "value": "oft längerer, mehr Komponenten"
    },
    {
      "label": "Familien",
      "value": "Tempo wichtiger als Stopps"
    }
  ],
  "sections": [
    {
      "kicker": "3 Inseln",
      "title": "Für wen die kompaktere Inselroute passt",
      "body": "Eine 3-Inseln-Route eignet sich oft für Gäste, die Boot, Wasser und Schnorcheln im Mittelpunkt haben wollen, ohne zusätzlich einen großen Freizeitkomplex einzuplanen."
    },
    {
      "kicker": "4 Inseln",
      "title": "Wann Hon Thom den Unterschied macht",
      "body": "Bei vielen 4-Inseln-Konzepten kommt Hon Thom beziehungsweise die Seilbahn hinzu. Das macht den Tag abwechslungsreicher, aber auch strukturierter und länger.",
      "bullets": [
        "Gut für Gäste, die die Seilbahn unbedingt erleben möchten.",
        "Weniger ideal, wenn kleine Kinder schnell müde werden.",
        "Nicht jeder Schnorchelstopp ist an jedem Tag gleich gut."
      ]
    },
    {
      "kicker": "Meerbedingungen",
      "title": "Der wichtigste Faktor steht nicht im Prospekt",
      "body": "Wind, Wellen und Sicht können beeinflussen, welche Inseln oder Buchten sinnvoll sind. Eine private Route sollte nicht starr an einer nummerierten Liste hängen."
    },
    {
      "kicker": "Familien",
      "title": "Mit Kindern lieber einen guten Stopp weniger",
      "body": "Schatten, Toiletten, Mittagspause und Transferzeit sind für Familien oft wichtiger als die maximale Zahl an Inseln."
    }
  ],
  "faqs": [
    {
      "q": "Sind 4 Inseln immer besser als 3?",
      "a": "Nein. Die bessere Wahl hängt davon ab, ob Hon Thom wichtig ist, wie lange Sie unterwegs sein möchten und wie stark der Fokus auf Schnorcheln liegt."
    },
    {
      "q": "Kann eine private Bootroute angepasst werden?",
      "a": "Je nach Boot, Wetter und lokalen Vorgaben können Stopps flexibler gewählt werden. Die endgültige Route sollte am Reisetag mit den Bedingungen abgeglichen werden."
    },
    {
      "q": "Ist die 4-Inseln-Route gut mit Kleinkind?",
      "a": "Sie kann funktionieren, ist aber häufig länger. Für kleine Kinder ist ein reduzierter, flexibler Tagesablauf oft angenehmer."
    }
  ],
  "related": [
    {
      "href": "/de/phu-quoc/mit-kindern",
      "title": "Phú Quốc mit Kindern",
      "text": "Tempo und Aktivitäten familiengerecht planen."
    },
    {
      "href": "/de/phu-quoc/beste-reisezeit",
      "title": "Beste Reisezeit",
      "text": "Meerbedingungen und Saison verstehen."
    },
    {
      "href": "/de/phu-quoc/individuelle-ausfluege",
      "title": "Private Ausflüge",
      "text": "Eine Route an Ihre Prioritäten anpassen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich vergleiche 3 oder 4 Inseln auf Phú Quốc. Datum: ____. Gäste: ____. Kinder: ____. Hon Thom wichtig: ja/nein. Bitte empfehlen Sie eine passende private Route."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
