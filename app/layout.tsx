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
    default: "GoVietStay | Vietnam Tours & Trusted Local Support",
    template: "%s | GoVietStay",
  },

  description:
    "Private tours, local guides and WhatsApp support 24/7 in Da Nang, Hoi An, Hue and Phu Quoc.",

  applicationName: "GoVietStay",

  keywords: [
    "GoVietStay",
    "Da Nang Tours",
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
    title: "GoVietStay | Vietnam Tours & Trusted Local Support",
    description:
      "Private tours, local guides and WhatsApp support 24/7 in Da Nang, Hoi An, Hue and Phu Quoc.",
    url: "https://www.govietstay.com",
    siteName: "GoVietStay",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GoVietStay | Vietnam Tours & Trusted Local Support",
    description:
      "Private tours, local guides and WhatsApp support 24/7 in Da Nang, Hoi An, Hue and Phu Quoc.",
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
                  availableLanguage: ["ru", "en", "vi"],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "GoVietStay",
                alternateName: "GoVietStay.com",
                url: "https://www.govietstay.com",
                inLanguage: ["en", "ru"],
                publisher: { "@id": "https://www.govietstay.com/#organization" },
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
