import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import HtmlLanguageSync from "../components/HtmlLanguageSync";
import {isKnownLocale,isRtlLocale} from "../lib/seo/locales";
import YandexMetrika from "../components/YandexMetrika";
import "./globals.css";

const gtmBootstrap = String.raw`(function(w,d){
 w.dataLayer=w.dataLayer||[];
 if(w.__gvsLoadGtm)return;
 w.__gvsLoadGtm=function(){
  if(w.__gvsGtmStarted)return;
  w.__gvsGtmStarted=true;
  w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
  var tag=d.createElement('script');tag.async=true;
  tag.src='https://www.googletagmanager.com/gtm.js?id=GTM-WRPCZ9X3';
  d.head.appendChild(tag);
 };
 // Intent signals immediately start analytics for fast booking interactions.
 // Attribution/GA4 events are queued in dataLayer until GTM is ready.
 function onLead(e){
  var a=e.target&&e.target.closest&&e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp.com"],a[href*="whatsapp.com/send"]');
  if(a)w.__gvsLoadGtm();
 }
 d.addEventListener('pointerdown',onLead,true);
 d.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')onLead(e)},true);
})(window,document);`;


export const metadata: Metadata = {
  metadataBase: new URL("https://www.govietstay.com"),

  title: "GoVietStay | Da Nang Tours, Hoi An, Hue & Phu Quoc Travel",

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

  openGraph: {
    title: "GoVietStay | Da Nang Tours, Hoi An, Hue & Phu Quoc Travel",
    description:
      "Plan Da Nang, Hoi An, Hue and Phu Quoc with local tours, airport transfers, private cars, tickets and 24/7 WhatsApp support from GoVietStay.",
    siteName: "GoVietStay",
    type: "website",
    images:[{url:"/tour/hoian.jpg",alt:"GoVietStay Vietnam travel"}],
  },

  twitter: {
    card: "summary_large_image",
    images:["/tour/hoian.jpg"],
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
  const locale = isKnownLocale(requestedLocale) ? requestedLocale! : "en";

  return (
    <html
      lang={locale}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: gtmBootstrap }} />
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
        <Script id="govietstay-gtm-lazy" strategy="lazyOnload">{`window.__gvsLoadGtm && window.__gvsLoadGtm();`}</Script>
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
                  availableLanguage: ["en", "ru"],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.govietstay.com/#website",
                name: "GoVietStay",
                alternateName: "GoVietStay.com",
                url: "https://www.govietstay.com",
                inLanguage: ["en", "ru", "it", "vi", "ko-KR", "zh-CN", "zh-TW", "fr-FR", "de-DE", "tr-TR", "ar", "he-IL", "en-PH", "en-IN", "mn", "ru-KZ"],
                publisher: { "@id": "https://www.govietstay.com/#organization" },
              },
            ]),
          }}
        />
        {children}
              <script src="/govietstay-partner-tracking.js?v=20260924-wa-ga4-3" defer></script>
      </body>
    </html>
  );
}
