import type { Metadata } from "next";
import PartnerLandingPage from "../../../components/PartnerLandingPage";

export const metadata: Metadata = {
  title: "Партнёрская программа GoVietStay — зарплата и комиссия во Вьетнаме",
  description: "Приводите туристов GoVietStay онлайн или лично. Все туры считаются вместе: базовая зарплата зависит от количества туров за месяц, а комиссия — от тура, гостя и языка сопровождения.",
  alternates: { canonical: "https://www.govietstay.com/ru/partner" },
  openGraph: {
    title: "GoVietStay Partner Network — приводите туристов и получайте доход",
    description: "Один прозрачный принцип для online и offline: базовая зарплата по количеству туров в месяц плюс комиссия за каждого гостя.",
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
