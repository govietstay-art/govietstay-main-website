import type { Metadata } from "next";
import MnLanding from "./_shared/MnLanding";
import { mnPageBySlug, mnUrl } from "./content";

const page = mnPageBySlug[""];
const url = `https://www.govietstay.com${mnUrl("")}`;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: url, languages: { "mn-MN": url } },
  robots: { index: true, follow: true },
  openGraph: { title: page.title, description: page.description, url, locale: "mn_MN", siteName: "GoVietStay", type: "website" },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
};

export default function MongoliaHome() {
  return <MnLanding page={page} />;
}
