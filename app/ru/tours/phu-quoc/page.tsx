import type { Metadata } from "next";
import PhuQuocJohnsCatalog from "../../../../components/PhuQuocJohnsCatalog";
import JsonLd from "../../../../components/JsonLd";

const canonical = "https://www.govietstay.com/ru/tours/phu-quoc";
const english = "https://www.govietstay.com/tours/phu-quoc";
const seoTitle = "Ð­ÐºÑÐºÑƒÑ€ÑÐ¸Ð¸ Ð½Ð° Ð¤ÑƒÐºÑƒÐ¾ÐºÐµ 2026: Ñ†ÐµÐ½Ñ‹, 3â€“4 Ð¾ÑÑ‚Ñ€Ð¾Ð²Ð° Ð¸ Ñ‚ÑƒÑ€Ñ‹ Ð½Ð° Ñ€ÑƒÑÑÐºÐ¾Ð¼";
const seoDescription =
  "Ð¡Ñ€Ð°Ð²Ð½Ð¸Ñ‚Ðµ Ñ‚ÑƒÑ€Ñ‹ Ð½Ð° 3 Ð¾ÑÑ‚Ñ€Ð¾Ð²Ð°, 4 Ð¾ÑÑ‚Ñ€Ð¾Ð²Ð° + Ð¥Ð¾Ð½ Ð¢Ñ…Ð¾Ð¼, ÑÐ½Ð¾Ñ€ÐºÐ»Ð¸Ð½Ð³ Ð¸ Ñ‡Ð°ÑÑ‚Ð½Ñ‹Ðµ ÑÐºÑÐºÑƒÑ€ÑÐ¸Ð¸. ÐÐºÑ‚ÑƒÐ°Ð»ÑŒÐ½Ñ‹Ðµ Ñ†ÐµÐ½Ñ‹, Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒ Ð½Ð° Ñ€ÑƒÑÑÐºÐ¾Ð¼ Ð¸ Ð±Ñ€Ð¾Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ GoVietStay.";

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
        alt: "Ð­ÐºÑÐºÑƒÑ€ÑÐ¸Ð¸ Ð½Ð° Ð¤ÑƒÐºÑƒÐ¾ÐºÐµ: 3 Ð¾ÑÑ‚Ñ€Ð¾Ð²Ð°, 4 Ð¾ÑÑ‚Ñ€Ð¾Ð²Ð° Ð¸ Ð¥Ð¾Ð½ Ð¢Ñ…Ð¾Ð¼",
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
                  name: "GoVietStay Ð½Ð° Ñ€ÑƒÑÑÐºÐ¾Ð¼",
                  item: "https://www.govietstay.com/ru",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Ð­ÐºÑÐºÑƒÑ€ÑÐ¸Ð¸ Ð½Ð° Ð¤ÑƒÐºÑƒÐ¾ÐºÐµ",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "CollectionPage",
              name: "Ð­ÐºÑÐºÑƒÑ€ÑÐ¸Ð¸ Ð½Ð° Ð¤ÑƒÐºÑƒÐ¾ÐºÐµ 2026",
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