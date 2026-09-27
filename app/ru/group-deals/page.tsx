import type { Metadata } from "next";
import WeeklyGroupDealsLanding from "../../../components/WeeklyGroupDealsLanding";

export const metadata: Metadata = {
  title: "Групповые экскурсии в Дананге на русском — GoVietStay",
  description: "Четыре недели пробных групповых экскурсий: Бана Хиллс, Хойан и остров Чам. Отдельные группы с русскоязычным и англоязычным гидом, до 10 гостей.",
  alternates: { canonical: "https://www.govietstay.com/ru/group-deals", languages: { ru:"https://www.govietstay.com/ru/group-deals", en:"https://www.govietstay.com/group-deals" } },
  robots: { index: false, follow: true },
};
export default function Page() { return <WeeklyGroupDealsLanding locale="ru" />; }
