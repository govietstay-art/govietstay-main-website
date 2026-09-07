import type { Metadata } from "next";
import AgarwoodLanding from "../../../components/agarwood/AgarwoodLanding";

export const metadata: Metadata = {
  title: "岘港沉香购买指南：价格参考、手串、线香与出境提醒 | GoVietStay",
  description:
    "准备在岘港购买沉香？先查看线香、手串、108颗念珠和熏烧沉香的价格参考，并了解购买前提问重点与携带回国注意事项。",
  alternates: {
    canonical: "https://www.govietstay.com/cn/agarwood-da-nang",
    languages: {
      en: "https://www.govietstay.com/travel/agarwood-da-nang",
      "zh-CN": "https://www.govietstay.com/cn/agarwood-da-nang",
    },
  },
  openGraph: {
    title: "岘港沉香购买指南：购买前先看清楚 | GoVietStay",
    description: "先了解价格、种类、尺寸和出境注意事项，再去岘港购买沉香。",
    url: "https://www.govietstay.com/cn/agarwood-da-nang",
    siteName: "GoVietStay",
    type: "article",
    images: [{
      url: "/agarwood/happy-agarwood-da-nang-price-list.png",
      alt: "幸福沉香商行岘港沉香价格表",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "岘港沉香购买指南 | GoVietStay",
    description: "价格参考、购买清单和携带回国注意事项。",
    images: ["/agarwood/happy-agarwood-da-nang-price-list.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "准备在岘港买沉香？先看价格、产品类型和携带回国注意事项",
  dateModified: "2026-09-07",
  author: { "@type": "Organization", name: "GoVietStay" },
  publisher: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com" },
  mainEntityOfPage: "https://www.govietstay.com/cn/agarwood-da-nang",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AgarwoodLanding language="zh-CN" />
    </>
  );
}
