import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";

const canonical = "https://www.govietstay.com/ru";

export const metadata: Metadata = {
  title: {
    default: "Экскурсии во Вьетнаме с поддержкой на русском",
    template: "%s | GoVietStay",
  },
  description:
    "Туры в Дананге, Хойане, Хюэ и на Фукуоке с понятной программой, подтверждённой ценой и поддержкой GoVietStay на русском языке.",
  keywords: [
    "экскурсии во Вьетнаме на русском",
    "туры в Дананге",
    "экскурсии из Дананга",
    "Бана Хиллс",
    "остров Чам",
    "Хойан экскурсия",
    "Фукуок экскурсии",
    "Вьетнам для туристов из Казахстана",
  ],
  alternates: {
    canonical,
    languages: {
      en: "https://www.govietstay.com",
      ru: canonical,
      "x-default": "https://www.govietstay.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical,
    siteName: "GoVietStay",
    title: "Экскурсии во Вьетнаме с поддержкой на русском",
    description:
      "Туры, трансферы и местная поддержка GoVietStay для русскоговорящих гостей во Вьетнаме.",
    images: [
      {
        url: "https://www.govietstay.com/hero-hoian-new.png",
        alt: "GoVietStay — туры во Вьетнаме на русском",
      },
    ],
  },
};

export default function RussianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="ru" data-locale="ru">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["Organization", "TravelAgency"],
          "@id": "https://www.govietstay.com/#organization",
          name: "GoVietStay",
          url: "https://www.govietstay.com/ru",
          logo: "https://www.govietstay.com/logo.png",
          image: "https://www.govietstay.com/hero-hoian-new.png",
          telephone: "+84 937 762 607",
          areaServed: {
            "@type": "Country",
            name: "Vietnam",
          },
          availableLanguage: ["ru", "en", "vi"],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+84 937 762 607",
            contactType: "customer service",
            availableLanguage: ["ru", "en", "vi"],
          },
          sameAs: [
            "https://t.me/GoVietStay",
            "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic",
          ],
        }}
      />
      {children}
    </div>
  );
}
