import type { Metadata } from "next";
import HotelAllianceClient from "./HotelAllianceClient";

export const metadata: Metadata = {
  title: "Independent Hotel Alliance | GoVietStay",
  description: "Join GoVietStay's independent hotel alliance for small and mid-sized quality hotels in Vietnam. Grow together through room enquiries, local experiences and two-way referrals.",
  alternates: { canonical: "https://www.govietstay.com/hotel-alliance" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GoVietStay Independent Hotel Alliance",
    description: "Independent hotels. Shared growth. Stronger together. Apply for GoVietStay's founding hotel partner pilot.",
    url: "https://www.govietstay.com/hotel-alliance",
    type: "website",
    images: [{ url: "https://www.govietstay.com/hero-hoian-new.png", alt: "Hoi An Vietnam | GoVietStay" }],
  },
};

export default function Page() {
  return <HotelAllianceClient />;
}
