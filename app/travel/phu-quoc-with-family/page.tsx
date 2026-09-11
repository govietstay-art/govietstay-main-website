import type { Metadata } from "next";
import PhuQuocGuidePage from "../../../components/phu-quoc-guide/PhuQuocGuidePage";
import { guidePages } from "../../../components/phu-quoc-guide/data";

const data = guidePages["phu-quoc-with-family"];
const seoTitle = "Phu Quoc with Kids 2026â€“2027: Family Itinerary & Where to Stay";
const seoDescription =
  "Planning Phu Quoc with kids? Compare the best areas to stay, Safari, VinWonders, Hon Thom, island tours, height rules, transport and a calmer family plan.";
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