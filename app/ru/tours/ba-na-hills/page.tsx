import type { Metadata } from "next";
import BaNaHillsRussianPage from "../../../../components/BaNaHillsRussianPage";
import "./ba-na-hills.css";

export const metadata: Metadata = {
  title: "Ba Na Hills утром или вечером | GoVietStay",
  description:
    "Утренняя или дневная-вечерняя экскурсия в Ba Na Hills с англоговорящим гидом, Золотым мостом и поддержкой GoVietStay.",
};

export default function Page() {
  return <BaNaHillsRussianPage />;
}
