import type { Metadata } from "next";
import PartnerLandingPage from "../../../components/PartnerLandingPage";

export const metadata: Metadata = {
  title: "Партнёрская программа — дополнительный доход во Вьетнаме",
  description: "Консультируйте русскоязычных туристов, оформляйте бронирования и получайте 150 000 VND за каждого взрослого гостя Cham Island.",
  alternates: { canonical: "https://www.govietstay.com/ru/partner" },
  openGraph: {
    title: "GoVietStay Partner Network — работа онлайн во Вьетнаме",
    description: "Бесплатная регистрация, готовый туристический продукт, реальные отзывы и комиссия за завершённые туры.",
    url: "https://www.govietstay.com/ru/partner",
    siteName: "GoVietStay",
    images: [{ url: "https://www.govietstay.com/partner/cham.jpg", width: 1200, height: 800, alt: "GoVietStay Partner Network — Cham Island" }],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RussianPartnerPage() {
  return <PartnerLandingPage />;
}
