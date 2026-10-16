import type { Metadata } from "next";
import { TravelKitRoute, travelKitPageMetadata } from "@/components/travel-kit/TravelKitRoute";

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  return travelKitPageMetadata("it", params);
}

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ city?: string | string[] }>;
}) {
  return <TravelKitRoute lang="it" params={params} searchParams={searchParams} />;
}
