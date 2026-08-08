import type { Metadata } from "next";
import LocalPointLandingPage from "../../../components/LocalPointLandingPage";
import "../../../components/LocalPointLandingPage.css";

export const metadata: Metadata = {
  title: "GoVietStay Local Point | Вьетнам на русском",
  description: "ИИ-маршруты, подарки, курсы валют и русскоязычная поддержка GoVietStay 24/7 во Вьетнаме.",
};

export default function RussianLocalPointPage() {
  return <LocalPointLandingPage />;
}
