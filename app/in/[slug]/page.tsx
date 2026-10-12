import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndiaSeoGuidePage from "../_seo/IndiaSeoGuidePage";
import {getIndiaSeoVisual} from "../../../lib/indiaSeoVisuals";
import {
  getIndiaSeoGuide,
  indiaSeoGuides,
  getRelatedIndiaSeoGuides,
} from "../../../lib/indiaSeoGuides";

export function generateStaticParams() {
  return indiaSeoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getIndiaSeoGuide(slug);
  if (!guide) return {};

  const canonical = `https://www.govietstay.com/in/${guide.slug}`;
  const image = `https://www.govietstay.com${getIndiaSeoVisual(guide.slug)}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: canonical,
      siteName: "GoVietStay",
      title: guide.title,
      description: guide.description,
      images: [
        {
          url: image,
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
  const guide = getIndiaSeoGuide(slug);
  if (!guide) notFound();

  return (
    <IndiaSeoGuidePage
      guide={guide}
      related={getRelatedIndiaSeoGuides(guide)}
    />
  );
}
