import type { Metadata } from "next";
import HoiAnLandingPage from "../../../../components/HoiAnLandingPage";

export const metadata: Metadata = {
  title: "Кокосовый лес и вечерний Хойан",
  description: "Лодка-корзина, ужин в Хойане, прогулка по реке Хоай, запуск фонарика и ночной рынок.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/tours/hoi-an-coconut-forest",
    languages: {
      en: "https://www.govietstay.com/tours/hoi-an-coconut-forest",
      ru: "https://www.govietstay.com/ru/tours/hoi-an-coconut-forest",
      "x-default": "https://www.govietstay.com/tours/hoi-an-coconut-forest",
    },
  },
  openGraph: {
    title: "Кокосовый лес и вечерний Хойан | GoVietStay",
    description:
      "Лодка-корзина, вечерний Хойан и поддержка GoVietStay на русском языке.",
    url: "https://www.govietstay.com/ru/tours/hoi-an-coconut-forest",
    locale: "ru_RU",
    images: [{ url: "/tour/coconut.jpg", alt: "Кокосовый лес и Хойан" }],
  },
};

export default function Page() {
  return <HoiAnLandingPage language="ru" />;
}
