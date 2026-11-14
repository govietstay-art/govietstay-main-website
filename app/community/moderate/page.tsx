import type { Metadata } from "next";
import CommunityBoard from "../../../components/community/CommunityBoard";

export const metadata: Metadata = {
  title: "Community review | GoVietStay Stories",
  robots: { index: false, follow: false },
};

export default function CommunityModerationPage() {
  return <CommunityBoard moderation />;
}
