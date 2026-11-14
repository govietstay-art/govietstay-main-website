import type { Metadata } from "next";
import CommunityBoard from "../../components/community/CommunityBoard";

export const metadata: Metadata = {
  title: "GoVietStay Stories | Real People, Real Stories, Real Vietnam",
  description: "A friendly Vietnam travel community. Share a photo, write a travel story, ask local questions and meet people who love Vietnam.",
  alternates: { canonical: "https://www.govietstay.com/community" },
  openGraph: {
    title: "GoVietStay Stories | Vietnam Travel Community",
    description: "Real people, real stories, real Vietnam. Share, ask and connect.",
    url: "https://www.govietstay.com/community",
    type: "website",
    images: ["/hero-hoian-new.png"],
  },
};

export default function CommunityPage() {
  return <CommunityBoard />;
}
