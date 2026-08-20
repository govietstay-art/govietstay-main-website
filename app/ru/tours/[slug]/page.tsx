import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../../components/JsonLd";
import TourLandingPage from "../../../../components/TourLandingPage";
import { getTour, tourSlugs } from "../../../../lib/tour-landing-data";

export const dynamicParams = false;
export function generateStaticParams() { return tourSlugs.map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug, "ru");
  if (!tour) return {};
  const url = `https://www.govietstay.com/ru/tours/${slug}`;
  return {
    title: tour.title,
    description: tour.promise,
    alternates: {
      canonical: url,
      languages: { ru: url },
    },
    openGraph: {
      title: `${tour.title} | GoVietStay`,
      description: tour.promise,
      url,
      locale: "ru_RU",
      images: [{ url: tour.image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const tour = getTour((await params).slug, "ru");
  if (!tour) notFound();
  const canonical = `https://www.govietstay.com/ru/tours/${tour.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "GoVietStay на русском", item: "https://www.govietstay.com/ru" },
                { "@type": "ListItem", position: 2, name: "Экскурсии из Дананга", item: "https://www.govietstay.com/ru/danang" },
                { "@type": "ListItem", position: 3, name: tour.title, item: canonical },
              ],
            },
            {
              "@type": "TouristTrip",
              name: tour.title,
              description: tour.promise,
              url: canonical,
              image: `https://www.govietstay.com${tour.image}`,
              touristType: ["Families", "Couples", "Russian-speaking travelers"],
              provider: { "@id": "https://www.govietstay.com/#organization" },
            },
          ],
        }}
      />
      <TourLandingPage tour={tour} locale="ru" />
    </>
  );
}
