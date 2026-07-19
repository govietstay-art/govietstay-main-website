import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourLandingPage from "../../../../components/TourLandingPage";
import { getTour, tourSlugs } from "../../../../lib/tour-landing-data";

export const dynamicParams = false;
export function generateStaticParams() { return tourSlugs.map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug, "ru");
  if (!tour) return {};
  const url = `https://govietstay.com/ru/tours/${slug}`;
  return { title: `${tour.title} | GoVietStay`, description: tour.promise, alternates: { canonical: url, languages: { en: `https://govietstay.com/tours/${slug}`, ru: url } }, openGraph: { title: tour.title, description: tour.promise, url, locale: "ru_RU", images: [{ url: tour.image }] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const tour = getTour((await params).slug, "ru");
  if (!tour) notFound();
  return <TourLandingPage tour={tour} locale="ru" />;
}

