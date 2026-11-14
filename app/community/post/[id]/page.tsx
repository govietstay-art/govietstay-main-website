import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import CommunityBoard from "../../../../components/community/CommunityBoard";

type Props = { params: Promise<{ id: string }> };
type Published = { author_name: string; body: string; created_at: string; kind: string };
const postIdPattern = /^[a-f0-9-]{36}$/i;

async function getPublished(id: string): Promise<Published | null> {
  const url = process.env.NEXT_PUBLIC_GVS_COMMUNITY_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_GVS_COMMUNITY_SUPABASE_KEY;
  if (!url || !key || !postIdPattern.test(id)) return null;
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
  const { data } = await db.from("gvs_community_posts")
    .select("author_name,body,created_at,kind").eq("id", id).eq("status", "published").maybeSingle();
  return data || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublished(id);
  if (!post) return { title: "Story not found | GoVietStay", robots: { index: false } };
  const title = post.body.split("\n")[0].slice(0, 90) || "Vietnam travel story";
  const description = post.body.slice(0, 155);
  const pageUrl = "https://www.govietstay.com/community/post/" + id;
  return {
    title: title + " | GoVietStay Stories",
    description,
    alternates: { canonical: pageUrl },
    openGraph: { type: "article", title, description, url: pageUrl, publishedTime: post.created_at, authors: [post.author_name] },
  };
}

export default async function CommunityPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPublished(id);
  if (!post) notFound();
  return <CommunityBoard focusPostId={id} />;
}
