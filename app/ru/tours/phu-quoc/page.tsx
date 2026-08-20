import type { Metadata } from "next";
import PhuQuocLandingPage from "../../../../components/PhuQuocLandingPage";

export const metadata: Metadata = {
  title: "Экскурсии на Фукуоке",
  description: "Сравните три экскурсии на Фукуоке: цены, программа и поддержка GoVietStay.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/tours/phu-quoc",
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
  return <PhuQuocLandingPage language="ru" />;
}
