import type { Metadata } from "next";
import PhuQuocJohnsCatalog from "../../../../components/PhuQuocJohnsCatalog";
import JsonLd from "../../../../components/JsonLd";

const canonical = "https://www.govietstay.com/ru/tours/phu-quoc";
const english = "https://www.govietstay.com/tours/phu-quoc";
const seoTitle = "Экскурсии на Фукуоке 2026: цены, 3–4 острова и туры на русском";
const seoDescription =
  "Сравните туры на 3 острова, 4 острова + Хон Тхом, снорклинг и частные экскурсии. Актуальные цены, помощь на русском и бронирование GoVietStay.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: {
    canonical,
    languages: { en: english, ru: canonical, "x-default": english },
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: canonical,
    locale: "ru_RU",
    images: [
      {
        url: "/tour/phuquoc/johns/trip3-may-rut-trong.jpg",
        alt: "Экскурсии на Фукуоке: 3 острова, 4 острова и Хон Тхом",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: ["/tour/phuquoc/johns/trip3-may-rut-trong.jpg"],
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
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "GoVietStay на русском",
                  item: "https://www.govietstay.com/ru",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Экскурсии на Фукуоке",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "CollectionPage",
              name: "Экскурсии на Фукуоке 2026",
              description: seoDescription,
              url: canonical,
              image:
                "https://www.govietstay.com/tour/phuquoc/johns/trip3-may-rut-trong.jpg",
              inLanguage: "ru",
              about: { "@type": "Place", name: "Phu Quoc, Vietnam" },
              provider: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <PhuQuocJohnsCatalog language="ru" />
    </>
  );
}