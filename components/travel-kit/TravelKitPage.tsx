import { travelKitJsonLd } from "@/lib/travel-kit/metadata";
import type { Lang } from "@/lib/travel-kit/types";
import { TravelKitHome } from "./TravelKitHome";

export function TravelKitPage({ lang, city, day }: { lang: Lang; city?: string; day?: string }) {
  const json = JSON.stringify(travelKitJsonLd(lang)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <TravelKitHome lang={lang} initialCity={city} initialDay={day} />
    </>
  );
}
