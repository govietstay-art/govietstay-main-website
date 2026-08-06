import type { Metadata } from "next";
import PartnerLandingPage from "../../../components/PartnerLandingPage";

export const metadata: Metadata = {
  title: "Партнёрская программа GoVietStay | Работа онлайн во Вьетнаме",
  description:
    "Консультируйте русскоязычных туристов, оформляйте бронирования и получайте комиссию за каждого гостя. Бесплатная партнёрская программа GoVietStay во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/partner",
  },
  openGraph: {
    title: "GoVietStay Partner Network — зарабатывайте на экскурсиях во Вьетнаме",
    description:
      "Работайте онлайн, консультируйте туристов на русском языке и получайте комиссию за завершённые туры.",
    url: "https://www.govietstay.com/ru/partner",
    siteName: "GoVietStay",
    images: [
      {
        url: "https://www.govietstay.com/partner/cham.jpg",
        width: 1200,
        height: 800,
        alt: "GoVietStay Partner Network — Cham Island",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RussianPartnerPage() {
  return <PartnerLandingPage />;
}
