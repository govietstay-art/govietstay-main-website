import type { ReactNode } from "react";

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://www.govietstay.com/#travel-agency",
  name: "GoVietStay",
  url: "https://www.govietstay.com/in",
  logo: "https://www.govietstay.com/logo.png",
  telephone: "+84 937 762 607",
  areaServed: ["Da Nang", "Hoi An", "Hue", "Phu Quoc"],
  availableLanguage: ["en-IN", "en", "ko", "ru", "vi"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.govietstay.com/#india-website",
  url: "https://www.govietstay.com/in",
  name: "GoVietStay India Travel Hub",
  inLanguage: "en-IN",
  publisher: { "@id": "https://www.govietstay.com/#travel-agency" },
};

export default function IndiaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      {children}
    </>
  );
}
