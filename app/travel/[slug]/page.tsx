import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EnglishSeoGuidePage from "../_seo/EnglishSeoGuidePage";
import {
  getEnglishSeoGuide,
  englishSeoGuides,
  getRelatedEnglishSeoGuides,
} from "../../../lib/englishSeoGuides";

export function generateStaticParams() {
  return englishSeoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getEnglishSeoGuide(slug);
  if (!guide) return {};

  const canonical = `https://www.govietstay.com/travel/${guide.slug}`;

  return {
    title: { absolute: guide.title },
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical,
      languages: { en: canonical },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      title: guide.title,
      description: guide.description,
      siteName: "GoVietStay",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getEnglishSeoGuide(slug);
  if (!guide) notFound();

  return (
    <EnglishSeoGuidePage
      guide={guide}
      related={getRelatedEnglishSeoGuides(guide)}
    />
  );
}
