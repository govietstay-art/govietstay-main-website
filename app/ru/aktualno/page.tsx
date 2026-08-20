import type { Metadata } from "next";
import AktualnoPage from "../../../components/AktualnoPage";
import { aktualnoArticles } from "../../../lib/aktualnoArticles";

const canonical = "https://www.govietstay.com/ru/aktualno";

export const metadata: Metadata = {
  title: "Актуально во Вьетнаме — Дананг, Хойан и Хюэ",
  description: "Живые обновления, советы местной команды, реальные истории и маршруты по Данангу, Хойану и Хюэ для русскоговорящих гостей.",
  alternates: { canonical },
  keywords: [
    "Дананг на русском",
    "экскурсии Дананг",
    "туры из Дананга",
    "Хойан экскурсия на русском",
    "Бана Хиллс экскурсия",
    "остров Чам экскурсия",
    "Вьетнам для туристов из Казахстана",
    "GoVietStay",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical,
    siteName: "GoVietStay",
    title: "Актуально во Вьетнаме | GoVietStay",
    description: "Vietnam Radar, маршруты за 30 секунд и проверенная местная информация для русскоговорящих гостей.",
    images: [{ url: "https://www.govietstay.com/hero-hoian-new.png", alt: "Актуально во Вьетнаме — GoVietStay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Актуально во Вьетнаме | GoVietStay",
    description: "Живые сигналы из Дананга, Хойана и Хюэ.",
    images: ["https://www.govietstay.com/hero-hoian-new.png"],
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Актуально во Вьетнаме",
    url: canonical,
    inLanguage: "ru",
    description: metadata.description,
    publisher: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com/ru", logo: { "@type": "ImageObject", url: "https://www.govietstay.com/logo.png" } },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: aktualnoArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${canonical}/${article.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AktualnoPage articles={aktualnoArticles} />
    </>
  );
}
