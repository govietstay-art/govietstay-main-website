import type { ReactNode } from "react";

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://www.govietstay.com/#travel-agency",
  name: "GoVietStay",
  url: "https://www.govietstay.com/ko",
  logo: "https://www.govietstay.com/logo.png",
  telephone: "+84 937 762 607",
  areaServed: ["Da Nang", "Hoi An", "Hue", "Phu Quoc"],
  availableLanguage: ["ko", "en", "ru", "vi"],
  sameAs: ["https://blog.naver.com/govietstay"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.govietstay.com/#website",
  url: "https://www.govietstay.com/",
  name: "GoVietStay",
  inLanguage: "ko-KR",
  publisher: {
    "@id": "https://www.govietstay.com/#travel-agency",
  },
};

export default function KoreanLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {children}
    </>
  );
}
