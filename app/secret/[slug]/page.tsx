import { notFound } from "next/navigation";
import { secretGems } from "../data";
import SecretGemClient from "./SecretGemClient";

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