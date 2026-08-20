import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ba Na Hills & Golden Bridge Tour",
  description:
    "Choose a morning or afternoon Ba Na Hills tour with Golden Bridge, cable car, buffet and local GoVietStay support.",
  alternates: {
    canonical: "https://www.govietstay.com/tours/ba-na-hills",
    languages: {
      en: "https://www.govietstay.com/tours/ba-na-hills",
      ru: "https://www.govietstay.com/ru/tours/ba-na-hills",
      "x-default": "https://www.govietstay.com/tours/ba-na-hills",
    },
  },
  openGraph: {
    title: "Ba Na Hills & Golden Bridge Tour | GoVietStay",
    description:
      "Morning or afternoon Ba Na Hills tours with clear inclusions and local support.",
    url: "https://www.govietstay.com/tours/ba-na-hills",
    images: [{ url: "/tour/bana.jpg", alt: "Ba Na Hills and Golden Bridge" }],
  },
};

export default function BaNaHillsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
