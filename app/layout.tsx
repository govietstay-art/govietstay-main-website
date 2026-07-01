import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

  title: "GoVietStay | Trusted Local Support",

  description:
    "Private tours, local guides and WhatsApp support 24/7 in Da Nang, Hoi An and Hue.",

  applicationName: "GoVietStay",

  alternates: {
    canonical: "https://www.govietstay.com",
  },

  openGraph: {
    title: "GoVietStay | Trusted Local Support",
    description:
      "Private tours, local guides and WhatsApp support 24/7 in Da Nang, Hoi An and Hue.",
    url: "https://www.govietstay.com",
    siteName: "GoVietStay",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GoVietStay",
              alternateName: "GoVietStay.com",
              url: "https://www.govietstay.com",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}