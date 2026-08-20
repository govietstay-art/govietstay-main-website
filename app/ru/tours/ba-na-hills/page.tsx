import type { Metadata } from "next";
import BaNaHillsRussianPage from "../../../../components/BaNaHillsRussianPage";
import JsonLd from "../../../../components/JsonLd";
import "./ba-na-hills.css";

const canonical = "https://www.govietstay.com/ru/tours/ba-na-hills";

export const metadata: Metadata = {
  title: "Ba Na Hills утром или вечером",
  description:
    "Утренняя или дневная-вечерняя экскурсия в Ba Na Hills с англоговорящим гидом, Золотым мостом и поддержкой GoVietStay.",
  alternates: {
    canonical,
    languages: {
      en: "https://www.govietstay.com/tours/ba-na-hills",
      ru: "https://www.govietstay.com/ru/tours/ba-na-hills",
      "x-default": "https://www.govietstay.com/tours/ba-na-hills",
    },
  },
  openGraph: {
    title: "Ba Na Hills утром или вечером | GoVietStay",
    description:
      "Золотой мост, канатная дорога и поддержка GoVietStay на русском языке.",
    url: "https://www.govietstay.com/ru/tours/ba-na-hills",
    locale: "ru_RU",
    images: [{ url: "/tour/bana.jpg", alt: "Ba Na Hills и Золотой мост" }],
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
                { "@type": "ListItem", position: 2, name: "Экскурсии в Дананге", item: "https://www.govietstay.com/ru/danang" },
                { "@type": "ListItem", position: 3, name: "Ba Na Hills", item: canonical },
              ],
            },
            {
              "@type": "TouristTrip",
              name: "Экскурсия в Ba Na Hills и на Золотой мост",
              description: metadata.description,
              url: canonical,
              image: "https://www.govietstay.com/tour/bana.jpg",
              touristType: ["Families", "Couples", "Russian-speaking travelers"],
              provider: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <BaNaHillsRussianPage />
    </>
  );
}
