import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../../components/JsonLd";
import RussianPhuQuocGuidePage from "../../../../components/RussianPhuQuocGuidePage";
import { getRussianPhuQuocPage, russianPhuQuocGuideSlugs } from "../../../../lib/russian-phu-quoc-cluster";

const BASE_URL = "https://www.govietstay.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return russianPhuQuocGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getRussianPhuQuocPage(slug);
  if (!page) return {};
  const canonical = `${BASE_URL}${page.path}`;
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical, languages: { ru: canonical } },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: canonical,
      siteName: "GoVietStay",
      title: page.metaTitle,
      description: page.description,
      images: [{ url: `${BASE_URL}${page.image}`, alt: page.shortTitle }],
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.description, images: [`${BASE_URL}${page.image}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getRussianPhuQuocPage(slug);
  if (!page || page.slug === "index") notFound();

  const canonical = `${BASE_URL}${page.path}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "GoVietStay на русском", item: `${BASE_URL}/ru` },
          { "@type": "ListItem", position: 2, name: "Фукуок", item: `${BASE_URL}/ru/phu-quoc` },
          { "@type": "ListItem", position: 3, name: page.shortTitle, item: canonical },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        url: canonical,
        headline: page.title,
        description: page.description,
        inLanguage: "ru",
        dateModified: "2026-09-10",
        image: `${BASE_URL}${page.image}`,
        about: { "@type": "Place", name: "Phu Quoc, Vietnam" },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <RussianPhuQuocGuidePage page={page} />
    </>
  );
}
