import type { Metadata } from "next";
import PhuQuocGuidePage from "../../../components/phu-quoc-guide/PhuQuocGuidePage";
import { guidePages } from "../../../components/phu-quoc-guide/data";

const data = guidePages["phu-quoc-travel-guide"];
const seoTitle = "Phu Quoc Travel Guide 2026â€“2027: Stay, Tours & Itinerary";
const seoDescription =
  "Planning your first Phu Quoc trip? Compare where to stay, 3 vs 4 islands, Hon Thom, weather, airport transfer and a realistic 3â€“4 day itinerary.";
const seoData = { ...data, metaTitle: seoTitle, metaDescription: seoDescription };

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: `https://www.govietstay.com/travel/${data.slug}` },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: `https://www.govietstay.com/travel/${data.slug}`,
    siteName: "GoVietStay",
    type: "article",
    images: [{ url: data.heroImage, alt: data.heroImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [data.heroImage],
  },
};

export default function Page() {
  return <PhuQuocGuidePage data={seoData} />;
}