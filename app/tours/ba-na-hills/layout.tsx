import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Ba Na Hills Tour & Golden Bridge | GoVietStay" },
  description:
    "Ba Na Hills and Golden Bridge tour from Da Nang with clear inclusions, English-language support options and local GoVietStay booking assistance.",
  alternates: {
    canonical: "https://www.govietstay.com/tours/ba-na-hills",
  },
};

export default function BaNaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
