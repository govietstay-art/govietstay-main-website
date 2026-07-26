import type { Metadata } from "next";
import HoiAnLandingPage from "../../../components/HoiAnLandingPage";

export const metadata: Metadata = {
  title: "Hoi An Coconut Forest & Lantern Night | GoVietStay",
  description: "Basket boat, Hoi An local dinner, Hoai River lantern boat and night market with GoVietStay.",
};

export default function Page() {
  return <HoiAnLandingPage language="en" />;
}
