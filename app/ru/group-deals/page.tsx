import type { Metadata } from "next";
import WeeklyGroupDealsLanding from "../../../components/WeeklyGroupDealsLanding";

export const metadata: Metadata = {
  title: "Групповые экскурсии в Дананге на русском — GoVietStay",
  description: "Групповые экскурсии: Бана Хиллс, Хойан и остров Чам. Отдельные группы с русскоязычным и англоязычным гидом, до 10 гостей.",
  openGraph:{type:"website",locale:"ru_RU",images:[{url:"/hero-hoian-new.png",alt:"Групповые туры GoVietStay"}]},
  twitter:{card:"summary_large_image",images:["/hero-hoian-new.png"]},
  alternates: { canonical: "https://www.govietstay.com/ru/group-deals", languages: { ru:"https://www.govietstay.com/ru/group-deals", en:"https://www.govietstay.com/group-deals" } },
};
export default function Page() { return <WeeklyGroupDealsLanding locale="ru" />; }
