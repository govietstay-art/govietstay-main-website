import type { Metadata } from "next";
import HoiAnLandingPage from "../../../components/HoiAnLandingPage";

export const metadata: Metadata = {
  title: "Hoi An Coconut Forest & Lantern Night",
  description: "Basket boat, Hoi An local dinner, Hoai River lantern boat and night market with GoVietStay.",
  alternates: {
    canonical: "https://www.govietstay.com/tours/hoi-an-coconut-forest",
    languages: {
      en: "https://www.govietstay.com/tours/hoi-an-coconut-forest",
      ru: "https://www.govietstay.com/ru/tours/hoi-an-coconut-forest",
      "x-default": "https://www.govietstay.com/tours/hoi-an-coconut-forest",
    },
  },
};

export default function Page() {
  return <HoiAnLandingPage language="en" />;
}
