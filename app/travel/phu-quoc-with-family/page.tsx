import type { Metadata } from "next";
import PhuQuocGuidePage from "../../../components/phu-quoc-guide/PhuQuocGuidePage";
import { guidePages } from "../../../components/phu-quoc-guide/data";

const data = guidePages["phu-quoc-with-family"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `https://www.govietstay.com/travel/${data.slug}` },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `https://www.govietstay.com/travel/${data.slug}`,
    siteName: "GoVietStay",
    type: "article",
    images: [{ url: data.heroImage, alt: data.heroImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: data.metaTitle,
    description: data.metaDescription,
    images: [data.heroImage],
  },
};

export default function Page() {
  return <PhuQuocGuidePage data={data} />;
}
