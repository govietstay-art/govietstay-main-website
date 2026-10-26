import type { Metadata } from "next";
import HotelsClient from "./HotelsClient";

export const metadata: Metadata = {
  title: "Find Hotels in Vietnam | GoVietStay",
  description: "Looking for a hotel in Da Nang, Hoi An, Hue or Phu Quoc? Send your dates and preferences to GoVietStay for personal local hotel assistance.",
  alternates: { canonical: "https://www.govietstay.com/hotels" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hotels in Vietnam | GoVietStay Local Travel Support",
    description: "Tell us where you want to stay in Vietnam. A local GoVietStay team member can help you explore suitable accommodation options.",
    url: "https://www.govietstay.com/hotels",
    type: "website",
    images: [{ url: "https://www.govietstay.com/hero-hoian-new.png", alt: "Hoi An Vietnam by GoVietStay" }],
  },
};

export default function Page() {
  return <HotelsClient />;
}
