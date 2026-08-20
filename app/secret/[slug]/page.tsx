import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { secretGems } from "../data";
import SecretGemClient from "./SecretGemClient";

export function generateStaticParams() {
  return secretGems.map((gem) => ({ slug: gem.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gem = secretGems.find((item) => item.slug === slug);
  if (!gem) return {};

  const canonical = `https://www.govietstay.com/secret/${gem.slug}`;
  return {
    title: `${gem.title} — a secret place near Da Nang`,
    description: gem.short,
    alternates: { canonical },
    openGraph: {
      title: `${gem.title} | GoVietStay Secret Explorer`,
      description: gem.short,
      url: canonical,
      images: [{ url: gem.image, alt: gem.title }],
    },
  };
}

export default async function SecretGemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const gem = secretGems.find(
    (item) => item.slug === slug
  );

  if (!gem) {
    notFound();
  }

  return <SecretGemClient gem={gem} />;
}
