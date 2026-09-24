import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import HtmlLanguageSync from "../components/HtmlLanguageSync";
import YandexMetrika from "../components/YandexMetrika";
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
      "fr-FR": "https://www.govietstay.com/fr",
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
  const requestedLocale = (await headers()).get("x-govietstay-locale");
  const locale = requestedLocale === "mn" ? "mn" : requestedLocale === "ru" ? "ru" : requestedLocale === "it" ? "it" : "en";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WRPCZ9X3');",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRPCZ9X3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <HtmlLanguageSync />
        <YandexMetrika />
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
                logo: "https://www.govietstay.com/govietstay-logo.jpg",
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
                  availableLanguage: ["en", "ru", "vi", "ko", "zh-TW", "fr"],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.govietstay.com/#website",
                name: "GoVietStay",
                alternateName: "GoVietStay.com",
                url: "https://www.govietstay.com",
                inLanguage: ["en", "ru", "vi", "ko", "zh-TW", "fr", "mn"],
                publisher: { "@id": "https://www.govietstay.com/#organization" },
              },
            ]),
          }}
        />
        {children}
              <script src="/govietstay-partner-tracking.js?v=20260924-wa-ga4-1" defer></script>
        <script src="/govietstay-partner-portal-v2.js?v=20260903-full-i18n" defer></script>
      </body>
    </html>
  );
}
