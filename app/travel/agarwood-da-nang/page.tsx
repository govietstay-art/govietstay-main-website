import type { Metadata } from "next";
import AgarwoodLanding from "../../../components/agarwood/AgarwoodLanding";

export const metadata: Metadata = {
  title: "Buying Agarwood in Da Nang: Price Guide, Bracelets, Incense & Travel Tips | GoVietStay",
  description:
    "Planning to buy agarwood in Da Nang? See local price references for incense, bracelets, 108-bead pieces and burning wood, plus smart buying tips and travel-home advice from GoVietStay.",
  alternates: {
    canonical: "https://www.govietstay.com/travel/agarwood-da-nang",
    languages: {
      en: "https://www.govietstay.com/travel/agarwood-da-nang",
      "zh-CN": "https://www.govietstay.com/cn/agarwood-da-nang",
    },
  },
  openGraph: {
    title: "Agarwood in Da Nang: What to Check Before You Buy | GoVietStay",
    description:
      "Know the product, price and travel-home checks before you buy agarwood in Da Nang.",
    url: "https://www.govietstay.com/travel/agarwood-da-nang",
    siteName: "GoVietStay",
    type: "article",
    images: [{
      url: "/agarwood/happy-agarwood-da-nang-price-list.png",
      alt: "Happy Agarwood Business House Da Nang price list",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buying Agarwood in Da Nang | GoVietStay",
    description: "Price reference, buyer checklist and travel-home considerations before you buy.",
    images: ["/agarwood/happy-agarwood-da-nang-price-list.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Buying Agarwood in Da Nang? Check the Price, Product Type and Travel Rules Before You Buy",
  dateModified: "2026-09-07",
  author: { "@type": "Organization", name: "GoVietStay" },
  publisher: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com" },
  mainEntityOfPage: "https://www.govietstay.com/travel/agarwood-da-nang",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AgarwoodLanding language="en" />
    </>
  );
}
