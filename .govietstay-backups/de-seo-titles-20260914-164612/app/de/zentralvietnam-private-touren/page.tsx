import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Zentralvietnam individuell: Đà Nẵng, Hội An & Huế | GoVietStay",
  description: "Zentralvietnam individuell planen: Đà Nẵng, Hội An und Huế sinnvoll verbinden, Reisetempo verstehen und erst danach eine private Route organisieren.",
  keywords: ["Zentralvietnam Reise", "Zentralvietnam Reiseroute", "Zentralvietnam Rundreise", "Da Nang Hoi An Hue", "Zentralvietnam privat", "private Tour Zentralvietnam"],
  alternates: { canonical: "https://www.govietstay.com/de/zentralvietnam-private-touren" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/zentralvietnam-private-touren",
    title: "Zentralvietnam individuell: Đà Nẵng, Hội An & Huế | GoVietStay",
    description: "Zentralvietnam individuell planen: Đà Nẵng, Hội An und Huế sinnvoll verbinden, Reisetempo verstehen und erst danach eine private Route organisieren.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentralvietnam individuell: Đà Nẵng, Hội An & Huế | GoVietStay",
    description: "Zentralvietnam individuell planen: Đà Nẵng, Hội An und Huế sinnvoll verbinden, Reisetempo verstehen und erst danach eine private Route organisieren.",
  },
};

const config = {
  "canonicalPath": "/de/zentralvietnam-private-touren",
  "eyebrow": "ZENTRALVIETNAM · REISEPLANUNG",
  "title": "Đà Nẵng, Hội An und Huế – eine Region, die besser als Route statt als Liste funktioniert.",
  "lead": "Die größten Fehler entstehen in Zentralvietnam selten durch die Wahl eines falschen Ortes, sondern durch zu viele Stopps in zu wenig Zeit. Dieser Guide zeigt, wie Sie die drei wichtigsten Ziele sinnvoll verbinden.",
  "chips": [
    "Zentralvietnam Reiseroute",
    "3–5 Tage",
    "Kultur + lokale Erlebnisse",
    "Private Umsetzung optional"
  ],
  "facts": [
    {
      "label": "Guter Rahmen",
      "value": "3–5 Tage für die Kernregion"
    },
    {
      "label": "Distanzen",
      "value": "kurz genug für flexible Tagesausflüge"
    },
    {
      "label": "Beste Stärke",
      "value": "Kultur, Essen, Landschaft, Geschichte"
    }
  ],
  "sections": [
    {
      "kicker": "Orientierung",
      "title": "Warum Đà Nẵng ein guter Ausgangspunkt ist",
      "body": "Đà Nẵng besitzt den wichtigsten Flughafen der Region und liegt zwischen Hội An und Huế. Das macht die Stadt praktisch, auch wenn der eigentliche Fokus Ihrer Reise stärker auf Altstadt, Kultur oder Landschaft liegt.",
      "bullets": [
        "Hội An liegt südlich und lässt sich gut mit Marble Mountains oder ländlichen Erlebnissen verbinden.",
        "Huế liegt nördlich; die Fahrt über den Hải-Vân-Pass kann Teil des Erlebnisses sein.",
        "Bà Nà Hills liegt westlich und sollte als eigener Schwerpunkt geplant werden."
      ]
    },
    {
      "kicker": "Tempo",
      "title": "Drei Tage und fünf Tage sind zwei verschiedene Reisen",
      "body": "Mit drei Tagen sollte jeder Tag einen klaren Schwerpunkt haben. Mit vier oder fünf Tagen können Sie Pausen, spätere Starts und kleinere Orte einbauen.",
      "bullets": [
        "3 Tage: Đà Nẵng + Hội An + ein großer Tagesausflug.",
        "4 Tage: zusätzlich Huế oder Bà Nà ohne zu viel Druck.",
        "5 Tage: Zeit für Huế und Bà Nà oder einen langsameren Familientag."
      ],
      "note": "Nicht jede Sehenswürdigkeit gehört in dieselbe Route. Weniger Stopps können zu einem deutlich besseren Tag führen."
    },
    {
      "kicker": "Für wen",
      "title": "Wann eine private Route besonders sinnvoll ist",
      "body": "Private Planung bringt vor allem dann Mehrwert, wenn unterschiedliche Interessen, Kinder, ältere Gäste oder ein enger Flugplan zusammenkommen.",
      "bullets": [
        "Startzeit am Hotel statt fester Sammelzeit.",
        "Stopps können gekürzt, verlängert oder ausgelassen werden.",
        "Bei wechselhaftem Wetter kann die Reihenfolge leichter angepasst werden."
      ]
    },
    {
      "kicker": "Vor der Buchung",
      "title": "Diese vier Angaben bestimmen die Route",
      "body": "Bevor überhaupt über eine Tour gesprochen wird, sollten vier Dinge klar sein.",
      "bullets": [
        "Ankunfts- und Abflugzeit.",
        "Hotel oder zumindest Hotelregion.",
        "Alter der Kinder beziehungsweise Mobilität älterer Gäste.",
        "Zwei bis drei Orte, die für Sie wirklich Priorität haben."
      ]
    }
  ],
  "faqs": [
    {
      "q": "Soll ich in Đà Nẵng oder Hội An übernachten?",
      "a": "Für Flughafen, moderne Infrastruktur und Ausflüge in mehrere Richtungen ist Đà Nẵng praktisch. Für Atmosphäre und Abende in der Altstadt wählen viele Reisende Hội An. Eine Kombination ist ebenfalls möglich."
    },
    {
      "q": "Kann man Huế als Tagesausflug machen?",
      "a": "Ja. Ein privater Tagesausflug ist möglich, wenn Sie einen frühen bis normalen Start akzeptieren und die wichtigsten Schwerpunkte auswählen."
    },
    {
      "q": "Ist Bà Nà Hills ein Muss?",
      "a": "Nein. Es ist ein stark inszeniertes Berg- und Freizeitgebiet. Wer vor allem Geschichte, Essen und lokale Viertel sucht, kann seine Zeit anders einsetzen."
    }
  ],
  "related": [
    {
      "href": "/de/zentralvietnam-reiseplan",
      "title": "3–5 Tage Reiseplan",
      "text": "Konkrete Reihenfolge für unterschiedliche Aufenthaltslängen."
    },
    {
      "href": "/de/da-nang",
      "title": "Đà Nẵng Guide",
      "text": "Sehenswürdigkeiten, Umgebung und Aufenthalt planen."
    },
    {
      "href": "/de/hue",
      "title": "Huế Guide",
      "text": "Kaiserstadt und Tagesausflug richtig einordnen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich plane Zentralvietnam privat. Reisedaten: ____. Hotel: ____. Gäste: ____. Prioritäten: ____. Bitte prüfen Sie zuerst eine sinnvolle Route für Đà Nẵng, Hội An und Huế."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
