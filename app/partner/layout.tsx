import type { ReactNode } from "react";
import Script from "next/script";

// This 49 KB translation/portal bundle is only needed on /partner.
// Universal WhatsApp and GA4 tracking stays in the root layout.
export default function PartnerLayout({ children }: { children: ReactNode }) {
  return <>
    {children}
    <Script id="govietstay-partner-portal" src="/govietstay-partner-portal-v2.js?v=20260903-full-i18n" strategy="afterInteractive" />
  </>;
}
