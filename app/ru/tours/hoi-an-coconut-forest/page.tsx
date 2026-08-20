import type { Metadata } from "next";
import HoiAnLandingPage from "../../../../components/HoiAnLandingPage";
import JsonLd from "../../../../components/JsonLd";

const canonical = "https://www.govietstay.com/ru/tours/hoi-an-coconut-forest";

export const metadata: Metadata = {
  title: "Кокосовый лес и вечерний Хойан",
  description: "Лодка-корзина, ужин в Хойане, прогулка по реке Хоай, запуск фонарика и ночной рынок.",
  alternates: {
    canonical,
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
                { "@type": "ListItem", position: 2, name: "Хойан", item: "https://www.govietstay.com/ru/hoi-an" },
                { "@type": "ListItem", position: 3, name: "Кокосовый лес и вечерний Хойан", item: canonical },
              ],
            },
            {
              "@type": "TouristTrip",
              name: "Кокосовый лес и вечерний Хойан",
              description: metadata.description,
              url: canonical,
              image: "https://www.govietstay.com/tour/coconut.jpg",
              touristType: ["Families", "Couples", "Russian-speaking travelers"],
              provider: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <HoiAnLandingPage language="ru" />
    </>
  );
}
