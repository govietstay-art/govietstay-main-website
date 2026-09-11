import type { Metadata } from "next";
import PhuQuocGuidePage from "../../../components/phu-quoc-guide/PhuQuocGuidePage";
import { guidePages } from "../../../components/phu-quoc-guide/data";

const data = guidePages["phu-quoc-3-islands-vs-4-islands"];
const seoTitle = "Phu Quoc 3 Islands vs 4 Islands: Prices, Hon Thom & Best Choice";
const seoDescription =
  "3 Islands or 4 Islands + Hon Thom? Compare price, snorkeling, cable car, Aquatopia, pace and who each Phu Quoc tour suits best before booking.";
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