import type { Metadata } from "next";
import FlightsSearch from "./FlightsSearch";

export const metadata: Metadata = {
  title: "Search Flights to Vietnam | GoVietStay",
  description:
    "Compare flights to Da Nang, Ho Chi Minh City, Hanoi and Phu Quoc with GoVietStay's flight search partner. Local tours and transfers remain available directly from GoVietStay.",
  alternates: { canonical: "https://www.govietstay.com/flights" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Find Flights to Vietnam | GoVietStay",
    description: "Find your flight, then plan your Vietnam experience with trusted GoVietStay local support.",
    url: "https://www.govietstay.com/flights",
    type: "website",
  },
};

export default function Page() {
  return <FlightsSearch />;
}
