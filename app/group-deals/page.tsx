import type { Metadata } from "next";
import WeeklyGroupDealsLanding from "../../components/WeeklyGroupDealsLanding";

export const metadata: Metadata = {
  title: "Small Group Deals in Da Nang — GoVietStay",
  description: "Four-week pilot: Ba Na Hills, Hoi An and Cham Island. Choose a separate Russian- or English-speaking guide group, up to ten guests per group.",
  alternates: { canonical: "https://www.govietstay.com/group-deals", languages: { ru:"https://www.govietstay.com/ru/group-deals", en:"https://www.govietstay.com/group-deals" } },
  robots: { index: false, follow: true },
};
export default function Page() { return <WeeklyGroupDealsLanding locale="en" />; }
