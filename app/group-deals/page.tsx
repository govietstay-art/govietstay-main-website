import type { Metadata } from "next";
import WeeklyGroupDealsLanding from "../../components/WeeklyGroupDealsLanding";

export const metadata: Metadata = {
  title: "Small Group Deals in Da Nang — GoVietStay",
  description: "Small-group departures for Ba Na Hills, Hoi An and Cham Island. Choose a separate Russian- or English-speaking guide group, up to ten guests per group.",
  openGraph:{type:"website",images:[{url:"/hero-hoian-new.png",alt:"GoVietStay small-group tours"}]},
  twitter:{card:"summary_large_image",images:["/hero-hoian-new.png"]},
  alternates: { canonical: "https://www.govietstay.com/group-deals", languages: { ru:"https://www.govietstay.com/ru/group-deals", en:"https://www.govietstay.com/group-deals" } },
};
export default function Page() { return <WeeklyGroupDealsLanding locale="en" />; }
