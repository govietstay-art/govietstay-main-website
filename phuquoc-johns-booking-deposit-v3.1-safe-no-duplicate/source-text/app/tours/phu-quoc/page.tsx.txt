import type { Metadata } from "next";
import PhuQuocJohnsCatalog from "../../../components/PhuQuocJohnsCatalog";

const canonical = "https://www.govietstay.com/tours/phu-quoc";
const russian = "https://www.govietstay.com/ru/tours/phu-quoc";

export const metadata: Metadata = {
  title: "Phu Quoc Tours — Prices, Booking & Secure Deposit",
  description:
    "Join-in and private Phu Quoc tours with published prices, a GoVietStay booking form, local support and a secure deposit link after confirmation.",
  alternates: {
    canonical,
    languages: { en: canonical, ru: russian, "x-default": canonical },
  },
  openGraph: {
    title: "Phu Quoc Tours | GoVietStay",
    description:
      "Choose a Phu Quoc tour, send one booking request and receive confirmation plus a secure deposit link.",
    url: canonical,
    images: [
      {
        url: "/tour/phuquoc/johns/trip3-may-rut-trong.jpg",
        alt: "Phu Quoc tours",
      },
    ],
  },
};

export default function Page() {
  return <PhuQuocJohnsCatalog language="en" />;
}
