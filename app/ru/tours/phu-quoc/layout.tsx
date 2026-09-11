import type { ReactNode } from "react";
import PhuQuocPreArrivalLinks from "@/components/ru/PhuQuocPreArrivalLinks";

export default function PhuQuocSeoJourneyWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PhuQuocPreArrivalLinks />
    </>
  );
}
