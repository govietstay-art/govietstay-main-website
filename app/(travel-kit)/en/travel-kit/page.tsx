import type { Metadata } from "next";
import { TravelKitPage } from "@/components/travel-kit/TravelKitPage";
import { travelKitMetadata } from "@/lib/travel-kit/metadata";

export const metadata: Metadata = travelKitMetadata("en");

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ city?: string | string[]; day?: string | string[] }>;
}) {
  const params = await searchParams;
  const city = Array.isArray(params.city) ? params.city[0] : params.city;
  const day = Array.isArray(params.day) ? params.day[0] : params.day;
  return <TravelKitPage lang="en" city={city} day={day} />;
}
