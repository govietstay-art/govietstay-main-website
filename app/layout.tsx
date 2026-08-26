import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import HtmlLanguageSync from "../components/HtmlLanguageSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.govietstay.com"),

  title: {
    default: "GoVietStay | Da Nang Tours, Hoi An, Hue & Phu Quoc Travel",
    template: "%s | GoVietStay",
  },

  description:
    "Plan Da Nang, Hoi An, Hue and Phu Quoc with local tours, airport transfers, private cars, tickets and 24/7 WhatsApp support from GoVietStay.",

  applicationName: "GoVietStay",

  keywords: [
    "GoVietStay",
    "Da Nang Tours",
    "Da Nang Travel Guide",
    "Things to Do in Da Nang",
    "Hoi An Tours",
    "Hue Tours",
    "Phu Quoc Tours",
    "Vietnam Travel",
    "Airport Transfer",
    "Private Tours",
    "Local Travel Support",
  ],

  alternates: {
    canonical: "https://www.govietstay.com",
    languages: {
      en: "https://www.govietstay.com",
      ru: "https://www.govietstay.com/ru",
      "x-default": "https://www.govietstay.com",
    },
  },

  openGraph: {
    title: "GoVietStay | Da Nang Tours, Hoi An, Hue & Phu Quoc Travel",
    description:
      "Plan Da Nang, Hoi An, Hue and Phu Quoc with local tours, airport transfers, private cars, tickets and 24/7 WhatsApp support from GoVietStay.",
    url: "https://www.govietstay.com",
    siteName: "GoVietStay",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GoVietStay | Vietnam Tours & Trusted Local Support",
    description:
      "Plan Da Nang, Hoi An, Hue and Phu Quoc with local tours, airport transfers, private cars, tickets and 24/7 WhatsApp support from GoVietStay.",
  },
};

const serviceAreas = [
  { "@type": "City", name: "Da Nang" },
  { "@type": "City", name: "Hoi An" },
  { "@type": "City", name: "Hue" },
  { "@type": "Place", name: "Phu Quoc" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-govietstay-locale") === "ru" ? "ru" : "en";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HtmlLanguageSync />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": ["Organization", "TravelAgency"],
                "@id": "https://www.govietstay.com/#organization",
                name: "GoVietStay",
                alternateName: "GoVietStay.com",
                url: "https://www.govietstay.com",
                logo: "https://www.govietstay.com/logo.png",
                image: "https://www.govietstay.com/hero-hoian-new.png",
                telephone: "+84937762607",
                areaServed: serviceAreas,
                slogan: "Trusted Local Support",
                sameAs: [
                  "https://t.me/GoVietStay",
                  "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic",
                  "https://x.com/thangtran267",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+84937762607",
                  contactType: "customer service",
                  availableLanguage: ["en", "ru", "vi", "ko", "zh-TW"],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "GoVietStay",
                alternateName: "GoVietStay.com",
                url: "https://www.govietstay.com",
                inLanguage: ["en", "ru", "ko", "zh-TW"],
                publisher: { "@id": "https://www.govietstay.com/#organization" },
              },
            ]),
          }}
        />
        {children}
              <script src="/govietstay-partner-tracking.js" defer></script>
      </body>
    </html>
  );
}
