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

  title: "Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",

  description:
    "GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",

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
    title: "Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",
    description:
      "GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",
    siteName: "GoVietStay",
    type: "website",
    images:[{url:"/tour/hoian.jpg",alt:"GoVietStay Vietnam travel"}],
  },

  twitter: {
    card: "summary_large_image",
    images:["/tour/hoian.jpg"],
    title: "Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",
    description:
      "GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",
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
                description:
                  "GoVietStay is a Vietnam travel company providing private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue and Phu Quoc.",
                founder: { "@id": "https://www.govietstay.com/#founder" },
                knowsAbout: [
                  "Private tours in Vietnam",
                  "Airport transfers in Vietnam",
                  "Attraction tickets in Vietnam",
                  "Da Nang travel",
                  "Hoi An travel",
                  "Hue travel",
                  "Phu Quoc travel",
                  "Vietnam visa support",
                ],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "GoVietStay Travel Services",
                  itemListElement: [
                    {
                      "@type": "OfferCatalog",
                      name: "Private Tours",
                      url: "https://www.govietstay.com/#experiences",
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Airport Transfers & Private Cars",
                      url: "https://www.govietstay.com/travel/da-nang-airport-transfer",
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Attraction Tickets",
                      url: "https://www.govietstay.com/#tickets",
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Vietnam Visa Support",
                      url: "https://www.govietstay.com/visa",
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Phu Quoc Tours",
                      url: "https://www.govietstay.com/tours/phu-quoc",
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Small Group Deals",
                      url: "https://www.govietstay.com/group-deals",
                    },
                  ],
                },
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
                "@type": "Person",
                "@id": "https://www.govietstay.com/#founder",
                name: "David Tran",
                jobTitle: "Founder",
                worksFor: { "@id": "https://www.govietstay.com/#organization" },
                knowsAbout: [
                  "Vietnam tourism",
                  "Private tours",
                  "Local travel support",
                  "Da Nang",
                  "Hoi An",
                  "Hue",
                  "Phu Quoc",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.govietstay.com/#website",
                name: "GoVietStay",
                alternateName: "GoVietStay.com",
                url: "https://www.govietstay.com",
                inLanguage: ["en", "ru", "it-IT", "vi", "ko-KR", "zh-CN", "zh-TW", "fr-FR", "de-DE", "ja-JP", "tr-TR", "ar", "he-IL", "en-PH", "en-IN", "mn", "ru-KZ"],
                publisher: { "@id": "https://www.govietstay.com/#organization" },
              },
            ]),
          }}
        />
        {children}
        <footer
          aria-label="GoVietStay language travel guides"
          style={{
            borderTop: "1px solid #e7e1d5",
            background: "#faf8f3",
            padding: "18px 20px",
            marginTop: "24px",
          }}
        >
          <nav
            aria-label="Language guides"
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 16px",
              alignItems: "center",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "#17352e", marginRight: "4px" }}>Vietnam travel guides:</strong>
            <a href="/ru" hrefLang="ru" style={{ color: "#315c51" }}>Русский</a>
            <a href="/it" hrefLang="it-IT" style={{ color: "#315c51" }}>Italiano</a>
            <a href="/de" hrefLang="de-DE" style={{ color: "#315c51" }}>Deutsch</a>
            <a href="/fr" hrefLang="fr-FR" style={{ color: "#315c51" }}>Français</a>
            <a href="/ja" hrefLang="ja-JP" style={{ color: "#315c51" }}>日本語</a>
          </nav>
        </footer>
        <script src="/govietstay-partner-tracking.js?v=20260924-wa-ga4-3" defer></script>
      </body>
    </html>
  );
}
