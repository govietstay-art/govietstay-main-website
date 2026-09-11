import type { ReactNode } from "react";
import RuYandexPreArrivalWeapon from "@/components/ru/RuYandexPreArrivalWeapon";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <RuYandexPreArrivalWeapon />
    </>
  );
}
