import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhuQuocGuidePage from "../_components/PhuQuocGuidePage";
import {
  getKoreanPhuQuocGuide,
  getRelatedKoreanPhuQuocGuides,
  koreanPhuQuocGuides,
} from "../../../../lib/koreanPhuQuocGuides";

export function generateStaticParams() {
  return koreanPhuQuocGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getKoreanPhuQuocGuide(slug);
  if (!guide) return {};

  const canonical = `https://www.govietstay.com/ko/phu-quoc/${guide.slug}`;
  const pageTitle = guide.title.replace(/\s*\|\s*GoVietStay\s*$/, "");
  const image = `https://www.govietstay.com${guide.image}`;

  return {
    title: pageTitle,
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
          url: image,
          width: 1200,
          height: 630,
          alt: guide.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [image],
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
  const guide = getKoreanPhuQuocGuide(slug);
  if (!guide) notFound();

  return (
    <PhuQuocGuidePage
      guide={guide}
      related={getRelatedKoreanPhuQuocGuides(guide)}
    />
  );
}
