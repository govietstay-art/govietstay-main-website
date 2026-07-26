import type { Metadata } from "next";
import HoiAnLandingPage from "../../../../components/HoiAnLandingPage";

export const metadata: Metadata = {
  title: "Кокосовый лес и вечерний Хойан | GoVietStay",
  description: "Лодка-корзина, ужин в Хойане, прогулка по реке Хоай, запуск фонарика и ночной рынок.",
};

export default function Page() {
  return <HoiAnLandingPage language="ru" />;
}
