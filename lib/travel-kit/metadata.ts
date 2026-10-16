import type { Metadata } from "next";
import { dictionaries } from "./dictionaries";
import type { Lang } from "./types";

const BASE = "https://www.govietstay.com";

const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  ru: "ru_RU",
  it: "it_IT",
};

export function travelKitPath(lang: Lang): string {
  return `/${lang}/travel-kit`;
}

export function travelKitMetadata(lang: Lang): Metadata {
  const copy = dictionaries[lang];
  const canonical = `${BASE}${travelKitPath(lang)}`;
  return {
    title: { absolute: copy.meta.title },
    description: copy.meta.description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    alternates: {
      canonical,
      languages: {
        en: `${BASE}/en/travel-kit`,
        ru: `${BASE}/ru/travel-kit`,
        "it-IT": `${BASE}/it/travel-kit`,
        "x-default": `${BASE}/en/travel-kit`,
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: canonical,
      siteName: "GoVietStay",
      locale: OG_LOCALE[lang],
      type: "website",
      images: [{ url: "/travel-kit/hoi-an-lantern-boats.webp", alt: copy.photoAlt.hoian.evening }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: ["/travel-kit/hoi-an-lantern-boats.webp"],
    },
  };
}

export function travelKitJsonLd(lang: Lang) {
  const copy = dictionaries[lang];
  const url = `${BASE}${travelKitPath(lang)}`;
  const inLanguage = lang === "it" ? "it-IT" : lang;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: copy.productName,
      url,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      inLanguage,
      isAccessibleForFree: true,
      description: copy.meta.description,
      browserRequirements: "Requires a modern mobile browser.",
      publisher: {
        "@type": "Organization",
        name: "GoVietStay",
        url: BASE,
      },
      featureList: (Object.keys(copy.utilities) as (keyof typeof copy.utilities)[]).map(
        (key) => copy.utilities[key].title,
      ),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage,
      url,
      mainEntity: copy.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}
