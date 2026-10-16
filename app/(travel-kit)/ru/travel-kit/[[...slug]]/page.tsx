import type { Metadata } from "next";
import { TravelKitRoute, travelKitPageMetadata } from "@/components/travel-kit/TravelKitRoute";

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  return travelKitPageMetadata("ru", params);
}

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ city?: string | string[] }>;
}) {
  return <TravelKitRoute lang="ru" params={params} searchParams={searchParams} />;
}
