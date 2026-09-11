import type { Metadata } from "next";
import PhuQuocGuidePage from "../../../components/phu-quoc-guide/PhuQuocGuidePage";
import { guidePages } from "../../../components/phu-quoc-guide/data";

const data = guidePages["phu-quoc-itinerary-3d2n-4d3n"];
const seoTitle = "Phu Quoc 3D2N & 4D3N Itinerary: Best First-Trip Plan";
const seoDescription =
  "Choose a realistic Phu Quoc 3D2N or 4D3N itinerary with south islands, Hon Thom, Safari/VinWonders, Duong Dong, airport timing and weather backup.";
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