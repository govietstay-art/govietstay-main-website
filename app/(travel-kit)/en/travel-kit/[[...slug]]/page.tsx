import type { Metadata } from "next";
import { TravelKitRoute, travelKitPageMetadata } from "@/components/travel-kit/TravelKitRoute";

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  return travelKitPageMetadata("en", params);
}

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ city?: string | string[] }>;
}) {
  return <TravelKitRoute lang="en" params={params} searchParams={searchParams} />;
}
