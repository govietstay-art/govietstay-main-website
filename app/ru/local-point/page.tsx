import type { Metadata } from "next";
import LocalPointLandingPage from "../../../components/LocalPointLandingPage";
import "../../../components/LocalPointLandingPage.css";

export const metadata: Metadata = {
  title: "Local Point — Вьетнам на русском",
  description: "ИИ-маршруты, подарки, курсы валют и русскоязычная поддержка GoVietStay 24/7 во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/local-point",
  },
  openGraph: {
    title: "GoVietStay Local Point | Вьетнам на русском",
    description:
      "Маршруты, подарки и местная поддержка для русскоговорящих гостей во Вьетнаме.",
    url: "https://www.govietstay.com/ru/local-point",
    locale: "ru_RU",
  },
};

export default function RussianLocalPointPage() {
  return <LocalPointLandingPage />;
}
