import type { Metadata } from "next";
import PhuQuocJohnsCatalog from "../../../../components/PhuQuocJohnsCatalog";
import JsonLd from "../../../../components/JsonLd";

const canonical = "https://www.govietstay.com/ru/tours/phu-quoc";
const english = "https://www.govietstay.com/tours/phu-quoc";

export const metadata: Metadata = {
  title: "Экскурсии на Фукуоке — цены, бронирование и депозит",
  description:
    "Групповые и частные экскурсии на Фукуоке: официальные опубликованные цены, форма бронирования GoVietStay, поддержка на русском и безопасный депозит после подтверждения.",
  alternates: {
    canonical,
    languages: { en: english, ru: canonical, "x-default": english },
  },
  openGraph: {
    title: "Экскурсии на Фукуоке | GoVietStay",
    description:
      "Выберите экскурсию на Фукуоке, отправьте заявку и получите подтверждение и ссылку на депозит.",
    url: canonical,
    locale: "ru_RU",
    images: [
      {
        url: "/tour/phuquoc/johns/trip3-may-rut-trong.jpg",
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
              name: "Экскурсии на Фукуоке",
              description: metadata.description,
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
