import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Kit Design Preview | GoVietStay",
  description: "Private design preview of GoVietStay's free Vietnam Travel Kit. Travel essentials, complimentary eSIM request and local support.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function TravelKitPreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
