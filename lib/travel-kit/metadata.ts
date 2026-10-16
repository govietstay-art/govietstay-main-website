import type { Metadata } from "next";
import { dictionaries } from "./dictionaries";
import type { CityGuideCopy, FaqItem, Lang, ToolSlug } from "./types";

const BASE = "https://www.govietstay.com";

const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  ru: "ru_RU",
  it: "it_IT",
};

export function travelKitPath(lang: Lang, tool?: ToolSlug): string {
  return tool ? `/${lang}/travel-kit/${tool}` : `/${lang}/travel-kit`;
}

export function travelKitMetadata(lang: Lang, tool?: ToolSlug): Metadata {
  const copy = dictionaries[lang];
  const meta = tool ? copy.pageMeta[tool] : copy.meta;
  const canonical = `${BASE}${travelKitPath(lang, tool)}`;
  const languages = {
    en: `${BASE}${travelKitPath("en", tool)}`,
    ru: `${BASE}${travelKitPath("ru", tool)}`,
    "it-IT": `${BASE}${travelKitPath("it", tool)}`,
    "x-default": `${BASE}${travelKitPath("en", tool)}`,
  };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: [copy.brand, copy.trust, "Vietnam", copy.cities.danang, copy.cities.hoian, copy.cities.hue, copy.cities.phuquoc],
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "GoVietStay",
      locale: OG_LOCALE[lang],
      type: "website",
      images: [{ url: "/travel-kit/da-nang-lady-buddha.webp", alt: copy.photoAlt.danang.evening }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/travel-kit/da-nang-lady-buddha.webp"],
    },
  };
}

function guideCopy(lang: Lang, tool?: ToolSlug): CityGuideCopy | null {
  const copy = dictionaries[lang];
  if (tool === "da-nang") return copy.danang;
  if (tool === "hoi-an") return copy.hoian;
  if (tool === "hue") return copy.hue;
  if (tool === "phu-quoc") return copy.phuquoc;
  return null;
}

function faqsFor(lang: Lang, tool?: ToolSlug): FaqItem[] {
  const copy = dictionaries[lang];
  if (tool === "esim") return copy.esim.faq;
  if (tool === "safety") return copy.safety.faq;
  const guide = guideCopy(lang, tool);
  if (guide) return guide.faq;
  if (!tool) return copy.homeFaq;
  return [];
}

export function travelKitJsonLd(lang: Lang, tool?: ToolSlug) {
  const copy = dictionaries[lang];
  const url = `${BASE}${travelKitPath(lang, tool)}`;
  const meta = tool ? copy.pageMeta[tool] : copy.meta;
  const inLanguage = lang === "it" ? "it-IT" : lang;
  const crumbs = [
    { name: copy.brand, url: `${BASE}${travelKitPath(lang)}` },
    ...(tool ? [{ name: copy.tools[tool].title, url }] : []),
  ];
  const faqs = faqsFor(lang, tool);
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta.title,
      description: meta.description,
      url,
      inLanguage,
      isPartOf: { "@type": "WebSite", name: "GoVietStay", url: BASE },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
  ];
  if (faqs.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage,
      url,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }
  const guide = guideCopy(lang, tool);
  const placeName =
    tool === "da-nang"
      ? copy.cities.danang
      : tool === "hoi-an"
        ? copy.cities.hoian
        : tool === "hue"
          ? copy.cities.hue
          : tool === "phu-quoc"
            ? copy.cities.phuquoc
            : "";
  if (guide && placeName) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: placeName,
      description: guide.lede,
      url,
      inLanguage,
    });
  }
  return graph;
}
