import type { Metadata } from "next";
import PhuQuocLandingPage from "../../../components/PhuQuocLandingPage";

export const metadata: Metadata = {
  title: "Phu Quoc Tours",
  description: "Compare three carefully selected Phu Quoc tours with clear prices, itineraries and local support.",
  alternates: {
    canonical: "https://www.govietstay.com/tours/phu-quoc",
    languages: {
      en: "https://www.govietstay.com/tours/phu-quoc",
      ru: "https://www.govietstay.com/ru/tours/phu-quoc",
      "x-default": "https://www.govietstay.com/tours/phu-quoc",
    },
  },
};

export default function Page() {
  return <PhuQuocLandingPage language="en" />;
}
