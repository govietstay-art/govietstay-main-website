import type { Metadata } from "next";
import KoreanChamIslandLandingPage from "./KoreanChamIslandLandingPage";

const canonicalUrl = "https://www.govietstay.com/ko/cham-island-tour";

export const metadata: Metadata = {
  title: "다낭 참섬 투어 + 무료 마사지 30분 | 스노클링 | GoVietStay",
  description:
    "다낭 출발 참섬(꾸라오참) 스피드보트 투어. 스노클링·호핑투어, 점심과 현지 지원. 한국인 여행객 특별 혜택으로 예약 확정 시 30분 마사지 바우처를 제공합니다.",
  keywords: [
    "다낭 참섬 투어",
    "참섬 투어",
    "꾸라오참",
    "다낭 스노클링",
    "다낭 호핑투어",
    "다낭 마사지",
    "마사지",
    "다낭 투어",
    "베트남 다낭 여행",
    "Cham Island tour Da Nang",
    "GoVietStay",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: canonicalUrl,
    siteName: "GoVietStay",
    title: "다낭 참섬 투어 + 무료 마사지 30분",
    description:
      "참섬에서 스노클링을 즐기고, 다낭으로 돌아와 30분 무료 마사지 혜택까지. GoVietStay 현지 지원과 함께 편하게 예약하세요.",
    images: [
      {
        url: "https://www.govietstay.com/ko/cham-island-tour/cham-island-hero-og.png",
        width: 1200,
        height: 630,
        alt: "다낭 참섬 스노클링 투어와 무료 마사지 혜택 - GoVietStay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "다낭 참섬 투어 + 무료 마사지 30분 | GoVietStay",
    description:
      "다낭 출발 참섬 스노클링 투어. 한국인 여행객 특별 마사지 바우처 혜택.",
    images: ["https://www.govietstay.com/ko/cham-island-tour/cham-island-hero-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return <KoreanChamIslandLandingPage />;
}
