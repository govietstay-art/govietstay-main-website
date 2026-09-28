import type { Metadata } from "next";
import RussianInternalLinks from "../../components/RussianInternalLinks";

export const metadata: Metadata = {
  title: "Экскурсии во Вьетнаме с поддержкой на русском",
  description:
    "Туры в Дананге, Хойане, Хюэ и на Фукуоке с понятной программой, подтверждённой ценой и поддержкой GoVietStay на русском языке.",
  keywords: [
    "экскурсии во Вьетнаме на русском",
    "туры в Дананге",
    "экскурсии из Дананга",
    "Бана Хиллс",
    "остров Чам",
    "Хойан экскурсия",
    "Фукуок экскурсии",
    "Вьетнам для туристов из Казахстана",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "GoVietStay",
    title: "Экскурсии во Вьетнаме с поддержкой на русском",
    description:
      "Туры, трансферы и местная поддержка GoVietStay для русскоговорящих гостей во Вьетнаме.",
    images: [
      {
        url: "https://www.govietstay.com/hero-hoian-new.png",
        alt: "GoVietStay — туры во Вьетнаме на русском",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Экскурсии во Вьетнаме с поддержкой на русском",
    description:
      "Туры в Дананге, Хойане, Хюэ и на Фукуоке с поддержкой GoVietStay на русском языке.",
    images: ["https://www.govietstay.com/hero-hoian-new.png"],
  },
};

export default function RussianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="ru" data-locale="ru">
      {children}
      <RussianInternalLinks />
    </div>
  );
}
