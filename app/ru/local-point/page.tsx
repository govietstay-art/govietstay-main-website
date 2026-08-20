import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";
import LocalPointLandingPage from "../../../components/LocalPointLandingPage";
import "../../../components/LocalPointLandingPage.css";

export const metadata: Metadata = {
  title: "Local Point — Вьетнам на русском",
  description: "ИИ-маршруты, подарки, курсы валют и русскоязычная поддержка GoVietStay 24/7 во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/local-point",
  },
  openGraph: {
    title: "GoVietStay Local Point | Вьетнам на русском",
    description:
      "Маршруты, подарки и местная поддержка для русскоговорящих гостей во Вьетнаме.",
    url: "https://www.govietstay.com/ru/local-point",
    locale: "ru_RU",
  },
};

export default function RussianLocalPointPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "GoVietStay на русском", item: "https://www.govietstay.com/ru" },
                { "@type": "ListItem", position: 2, name: "Local Point", item: "https://www.govietstay.com/ru/local-point" },
              ],
            },
            {
              "@type": "WebPage",
              name: "GoVietStay Local Point",
              description: metadata.description,
              url: "https://www.govietstay.com/ru/local-point",
              inLanguage: "ru",
              about: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <LocalPointLandingPage />
    </>
  );
}
