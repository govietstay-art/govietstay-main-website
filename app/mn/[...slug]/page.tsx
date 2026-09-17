import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MnLanding from "../_shared/MnLanding";
import { mnPageBySlug, mnPages, mnUrl } from "../content";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return mnPages.filter((page) => page.slug).map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = mnPageBySlug[slug.join("/")];
  if (!page) notFound();
  const url = `https://www.govietstay.com${mnUrl(page.slug)}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url, languages: { "mn-MN": url } },
    robots: { index: true, follow: true },
    openGraph: { title: page.title, description: page.description, url, locale: "mn_MN", siteName: "GoVietStay", type: "website" },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}

export default async function MongoliaGuide({ params }: Props) {
  const { slug } = await params;
  const page = mnPageBySlug[slug.join("/")];
  if (!page) notFound();
  return <MnLanding page={page} />;
}
