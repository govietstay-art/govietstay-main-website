import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import RussianSeoLandingPage from "../../../components/RussianSeoLandingPage";
import {
  getRussianSeoLanding,
  russianSeoLandingSlugs,
} from "../../../lib/russian-seo-landings";

const BASE_URL = "https://www.govietstay.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return russianSeoLandingSlugs.map((landing) => ({ landing }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ landing: string }>;
}): Promise<Metadata> {
  const { landing: slug } = await params;
  const landing = getRussianSeoLanding(slug);
  if (!landing) return {};

  const canonical = `${BASE_URL}/ru/${landing.slug}`;
  const image = `${BASE_URL}${landing.image}`;

  return {
    title: landing.metaTitle,
    description: landing.description,
    keywords: landing.keywords,
    alternates: {
      canonical,
      languages: { ru: canonical },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: canonical,
      siteName: "GoVietStay",
      title: `${landing.metaTitle} | GoVietStay`,
      description: landing.description,
      images: [{ url: image, alt: landing.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${landing.metaTitle} | GoVietStay`,
      description: landing.description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ landing: string }>;
}) {
  const { landing: slug } = await params;
  const landing = getRussianSeoLanding(slug);
  if (!landing) notFound();

  const canonical = `${BASE_URL}/ru/${landing.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "GoVietStay на русском",
            item: `${BASE_URL}/ru`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: landing.shortTitle,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: landing.shortTitle,
        description: landing.description,
        url: canonical,
        image: `${BASE_URL}${landing.image}`,
        inLanguage: "ru",
        areaServed: {
          "@type": "Country",
          name: "Vietnam",
        },
        provider: {
          "@id": `${BASE_URL}/#organization`,
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: canonical,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: "+84 937 762 607",
            availableLanguage: ["ru", "en", "vi"],
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: landing.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      <RussianSeoLandingPage landing={landing} />
    </>
  );
}
