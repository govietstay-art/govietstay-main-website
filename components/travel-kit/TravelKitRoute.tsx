import { notFound } from "next/navigation";
import { parseCity } from "@/lib/travel-kit/config";
import { loadRates, loadWeather } from "@/lib/travel-kit/live-fetch";
import { travelKitJsonLd, travelKitMetadata } from "@/lib/travel-kit/metadata";
import { TOOL_SLUGS, type Lang, type ToolSlug } from "@/lib/travel-kit/types";
import { TravelKitApp } from "./TravelKitApp";

function resolveTool(slug: string[] | undefined): ToolSlug | undefined | null {
  if (!slug || slug.length === 0) return undefined;
  if (slug.length !== 1) return null;
  const raw = slug[0];
  return (TOOL_SLUGS as readonly string[]).includes(raw) ? (raw as ToolSlug) : null;
}

export async function travelKitPageMetadata(lang: Lang, params: Promise<{ slug?: string[] }>) {
  const { slug } = await params;
  const tool = resolveTool(slug);
  if (tool === null) return { title: { absolute: "GoVietStay" }, robots: { index: false, follow: false } };
  return travelKitMetadata(lang, tool);
}

export async function TravelKitRoute({
  lang,
  params,
  searchParams,
}: {
  lang: Lang;
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ city?: string | string[] }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const tool = resolveTool(slug);
  if (tool === null) notFound();
  const cityValue = Array.isArray(query.city) ? query.city[0] : query.city;
  const city = parseCity(cityValue) ?? "danang";
  const weather = await loadWeather(city);
  const rates = tool === "money" ? await loadRates() : null;
  const json = JSON.stringify(travelKitJsonLd(lang, tool)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <TravelKitApp lang={lang} tool={tool} initialCity={city} weather={weather} rates={rates} />
    </>
  );
}
