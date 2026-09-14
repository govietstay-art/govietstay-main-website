import type { Metadata } from "next";
import GermanLanding, { type GermanLandingConfig } from "../_shared/GermanLanding";

export const metadata: Metadata = {
  title: "Huế Vietnam: Sehenswürdigkeiten, Dauer & Tagesausflug | GoVietStay",
  description: "Huế Vietnam auf Deutsch: Kaiserstadt, Königsgräber, Pagoden, Aufenthaltsdauer und privater Tagesausflug ab Đà Nẵng oder Hội An.",
  keywords: ["Hue Vietnam", "Hue Vietnam Sehenswürdigkeiten", "Hue Vietnam wie lange", "Hue Vietnam lohnt es sich", "Hue Tagesausflug Da Nang", "Hue Kaiserstadt"],
  alternates: { canonical: "https://www.govietstay.com/de/hue" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: "https://www.govietstay.com/de/hue",
    title: "Huế Vietnam: Sehenswürdigkeiten, Dauer & Tagesausflug | GoVietStay",
    description: "Huế Vietnam auf Deutsch: Kaiserstadt, Königsgräber, Pagoden, Aufenthaltsdauer und privater Tagesausflug ab Đà Nẵng oder Hội An.",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huế Vietnam: Sehenswürdigkeiten, Dauer & Tagesausflug | GoVietStay",
    description: "Huế Vietnam auf Deutsch: Kaiserstadt, Königsgräber, Pagoden, Aufenthaltsdauer und privater Tagesausflug ab Đà Nẵng oder Hội An.",
  },
};

const config = {
  "canonicalPath": "/de/hue",
  "eyebrow": "HUẾ · KAISERLICHES VIETNAM",
  "title": "Huế lohnt sich für Reisende, die verstehen wollen, wie Geschichte, Architektur und Landschaft zusammengehören.",
  "lead": "Die ehemalige Kaiserstadt ist kein schneller Foto-Stopp. Zitadelle, Königsgräber und Pagoden liegen verteilt – eine gute Route entscheidet deshalb stärker über den Tag als die reine Anzahl der Sehenswürdigkeiten.",
  "chips": [
    "Hue Vietnam Sehenswürdigkeiten",
    "Kaiserstadt",
    "Königsgräber",
    "Ab Đà Nẵng privat erreichbar"
  ],
  "facts": [
    {
      "label": "Ideal für",
      "value": "Geschichte & Kultur"
    },
    {
      "label": "Als Tagesausflug",
      "value": "möglich mit klarer Auswahl"
    },
    {
      "label": "Route",
      "value": "Hải-Vân-Pass kann Teil des Tages sein"
    }
  ],
  "sections": [
    {
      "kicker": "Kern",
      "title": "Die Kaiserstadt als historischer Mittelpunkt",
      "body": "Die Zitadelle und die Kaiserliche Stadt vermitteln den besten Einstieg in Huế. Planen Sie genug Zeit ein, statt direkt zum nächsten Grab weiterzufahren."
    },
    {
      "kicker": "Außerhalb",
      "title": "Königsgräber sind nicht austauschbar",
      "body": "Die Anlagen unterscheiden sich deutlich in Architektur und Landschaft. Für einen Tagesausflug ist meist eine bewusste Auswahl besser als der Versuch, mehrere große Gräber nacheinander zu besuchen.",
      "bullets": [
        "Khai-Dinh-Grab: kompakter, dekorativ und architektonisch markant.",
        "Minh-Mang-Grab: weitläufiger, landschaftlicher und ruhiger.",
        "Thiên-Mụ-Pagode lässt sich gut mit dem Parfümfluss verbinden."
      ]
    },
    {
      "kicker": "Ab Đà Nẵng",
      "title": "Tagesausflug oder Übernachtung?",
      "body": "Ein privater Tagesausflug funktioniert, wenn Ihr Fokus auf zwei bis drei Hauptpunkten liegt. Eine Übernachtung lohnt sich, wenn Sie Huế langsamer erleben oder am nächsten Tag weiter nach Norden reisen."
    },
    {
      "kicker": "Fahrt",
      "title": "Der Weg kann Teil der Reise sein",
      "body": "Statt nur die schnellste Strecke zu nehmen, kann der Hải-Vân-Pass bei gutem Wetter bewusst in die Route integriert werden. Das erhöht die Fahrzeit, macht aber den Transfer selbst zum Erlebnis."
    }
  ],
  "faqs": [
    {
      "q": "Wie viele Tage braucht man für Huế?",
      "a": "Ein voller Tag reicht für die wichtigsten Schwerpunkte. Zwei Tage ermöglichen mehr Gräber, lokale Küche und ein deutlich ruhigeres Tempo."
    },
    {
      "q": "Lohnt sich Huế als Tagesausflug ab Đà Nẵng?",
      "a": "Ja, besonders privat. Entscheidend ist, nicht zu viele große Sehenswürdigkeiten in einen Tag zu pressen."
    },
    {
      "q": "Ist Huế auch für Familien geeignet?",
      "a": "Ja, wenn Gehstrecken und Hitze beziehungsweise Regen berücksichtigt werden. Ein flexibler privater Ablauf hilft besonders mit kleinen Kindern oder älteren Gästen."
    }
  ],
  "related": [
    {
      "href": "/de/zentralvietnam-private-touren",
      "title": "Zentralvietnam individuell",
      "text": "Huế in die Gesamtstrecke einordnen."
    },
    {
      "href": "/de/zentralvietnam-reiseplan",
      "title": "3–5 Tage Reiseplan",
      "text": "Wann Huế in den Ablauf passt."
    },
    {
      "href": "/de/da-nang",
      "title": "Đà Nẵng Guide",
      "text": "Ausgangspunkt und Fahrt nach Norden planen."
    }
  ],
  "whatsappText": "Hallo GoVietStay! Ich plane Huế privat. Datum: ____. Start-Hotel: ____. Gäste: ____. Interessen: ____. Bitte prüfen Sie einen realistischen Tagesablauf."
} satisfies GermanLandingConfig;

export default function Page() {
  return <GermanLanding config={config} />;
}
