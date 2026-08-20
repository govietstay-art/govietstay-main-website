import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Da Nang & Hoi An Local Food Guide",
  description:
    "A practical local food guide for Da Nang and Hoi An with dishes, restaurants and map directions.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.govietstay.com/local-food",
  },
  openGraph: {
    title: "Da Nang & Hoi An Local Food Guide | GoVietStay",
    description:
      "Local dishes, restaurant suggestions and map directions from the GoVietStay team.",
    url: "https://www.govietstay.com/local-food",
  },
};

export default function LocalFoodLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
