import type { Metadata } from "next";
import PhuQuocLandingPage from "../../../../components/PhuQuocLandingPage";
import JsonLd from "../../../../components/JsonLd";

const canonical = "https://www.govietstay.com/ru/tours/phu-quoc";

export const metadata: Metadata = {
  title: "Экскурсии на Фукуоке",
  description: "Сравните три экскурсии на Фукуоке: цены, программа и поддержка GoVietStay.",
  alternates: {
    canonical,
    languages: {
      en: "https://www.govietstay.com/tours/phu-quoc",
      ru: "https://www.govietstay.com/ru/tours/phu-quoc",
      "x-default": "https://www.govietstay.com/tours/phu-quoc",
    },
  },
  openGraph: {
    title: "Экскурсии на Фукуоке | GoVietStay",
    description:
      "Сравните программы и цены экскурсий на Фукуоке с поддержкой на русском языке.",
    url: "https://www.govietstay.com/ru/tours/phu-quoc",
    locale: "ru_RU",
    images: [
      {
        url: "/tour/phuquoc/tour-01-1.jpg",
        alt: "Экскурсии на Фукуоке",
      },
    ],
  },
};

export default function Page() {
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
                { "@type": "ListItem", position: 2, name: "Экскурсии на Фукуоке", item: canonical },
              ],
            },
            {
              "@type": "CollectionPage",
              name: "Экскурсии на Фукуоке",
              description: metadata.description,
              url: canonical,
              image: "https://www.govietstay.com/tour/phuquoc/tour-01-1.jpg",
              inLanguage: "ru",
              about: { "@type": "Place", name: "Phu Quoc, Vietnam" },
              provider: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <PhuQuocLandingPage language="ru" />
    </>
  );
}
