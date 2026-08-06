import type { Metadata } from "next";
import { Suspense } from "react";
import PartnerChamHub from "../../../../components/PartnerChamHub";

export const metadata: Metadata = {
  title: "Cham Island Partner Hub | GoVietStay",
  description: "Инструменты партнёра GoVietStay: персональная ссылка, сценарий консультации и стандартная форма бронирования Cham Island.",
  robots: { index: false, follow: false },
};

export default function PartnerChamIslandPage() {
  return <Suspense fallback={null}><PartnerChamHub /></Suspense>;
}
