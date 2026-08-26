import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KoreanSeoGuidePage from "../_seo/KoreanSeoGuidePage";
import {
  getKoreanSeoGuide,
  koreanSeoGuides,
  getRelatedKoreanSeoGuides,
} from "../../../lib/koreanSeoGuides";

export function generateStaticParams() {
  return koreanSeoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getKoreanSeoGuide(slug);
  if (!guide) return {};

  const canonical = `https://www.govietstay.com/ko/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical,
      languages: {
        "ko-KR": canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: canonical,
      siteName: "GoVietStay",
      title: guide.title,
      description: guide.description,
      images: [
        {
          url: "https://www.govietstay.com/tour/cham-island/guest-on-island.jpg",
          width: 1200,
          height: 630,
          alt: `${guide.h1} - GoVietStay`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["https://www.govietstay.com/tour/cham-island/guest-on-island.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getKoreanSeoGuide(slug);
  if (!guide) notFound();

  return (
    <KoreanSeoGuidePage
      guide={guide}
      related={getRelatedKoreanSeoGuides(guide)}
    />
  );
}
