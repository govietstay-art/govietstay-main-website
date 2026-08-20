import type { Metadata } from "next";
import BaNaHillsRussianPage from "../../../../components/BaNaHillsRussianPage";
import "./ba-na-hills.css";

export const metadata: Metadata = {
  title: "Ba Na Hills утром или вечером",
  description:
    "Утренняя или дневная-вечерняя экскурсия в Ba Na Hills с англоговорящим гидом, Золотым мостом и поддержкой GoVietStay.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/tours/ba-na-hills",
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
  return <BaNaHillsRussianPage />;
}
