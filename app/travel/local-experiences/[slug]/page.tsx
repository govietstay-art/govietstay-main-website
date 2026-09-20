import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalExperienceDraftPage, { buildExperienceMetadata } from '../../../../components/LocalExperienceDraftPage';
import { experienceSlugs, getExperience } from '../../../../lib/localExperienceDrafts';

export const dynamicParams = false;
export function generateStaticParams() { return experienceSlugs.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildExperienceMetadata('en', slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();
  return <LocalExperienceDraftPage locale="en" experience={experience} />;
}
