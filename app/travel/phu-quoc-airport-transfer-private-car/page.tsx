import type { Metadata } from "next";
import PhuQuocGuidePage from "../../../components/phu-quoc-guide/PhuQuocGuidePage";
import { guidePages } from "../../../components/phu-quoc-guide/data";

const data = guidePages["phu-quoc-airport-transfer-private-car"];
const seoTitle = "Phu Quoc Airport Transfer & Private Car to Hotels | GoVietStay";
const seoDescription =
  "Need a Phu Quoc airport pickup? Compare hotel areas, private-car routes and what to send before arrival for Duong Dong, Sunset Town and the north.";
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