import type { Metadata } from "next";
import KoreanChamIslandLandingPage from "./KoreanChamIslandLandingPage";

const canonicalUrl = "https://www.govietstay.com/ko/cham-island-tour";

export const metadata: Metadata = {
  title: "다낭 참섬 투어 + 마사지 30분 무료 | 스노클링 | GoVietStay",
  description:
    "다낭 출발 참섬(꾸라오참) 스노클링 투어 950,000 VND. 한국인 여행객 특별 혜택: 예약 확정 시 쿠폰 코드 없이 30분 마사지 바우처 1인 1장. 실제 여행객 사진과 현지 GoVietStay 지원을 확인하세요.",
  keywords: [
    "다낭 참섬 투어",
    "참섬 투어",
    "꾸라오참",
    "다낭 스노클링",
    "참섬 스노클링",
    "다낭 마사지",
    "마사지",
    "다낭 무료 마사지",
    "다낭 프로모션",
    "다낭 투어",
    "베트남 다낭 여행",
    "Cham Island tour Da Nang",
    "GoVietStay",
  ],
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "ko-KR": canonicalUrl,
      ru: "https://www.govietstay.com/ru/tours/cham-island",
      "x-default": canonicalUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: canonicalUrl,
    siteName: "GoVietStay",
    title: "다낭 참섬 스노클링 + 마사지 30분 무료",
    description:
      "참섬 투어 950,000 VND. 예약 확정 시 한국인 여행객에게 30분 마사지 바우처 1인 1장. 쿠폰 코드 없이 혜택 적용.",
    images: [{
      url: "https://www.govietstay.com/ko/cham-island-tour/cham-island-hero-og.png",
      width: 1200,
      height: 630,
      alt: "다낭 참섬 스노클링 투어와 무료 마사지 혜택 - GoVietStay",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "다낭 참섬 투어 + 마사지 30분 무료 | GoVietStay",
    description: "다낭 출발 참섬 스노클링. 한국인 여행객 특별 무료 마사지 바우처 혜택.",
    images: ["https://www.govietstay.com/ko/cham-island-tour/cham-island-hero-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function Page() {
  return <KoreanChamIslandLandingPage />;
}
