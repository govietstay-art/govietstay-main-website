import type { ReactNode } from 'react';

/** Route-scoped readability improvement; does not change shared site styles. */
export default function WinkSpaLayout({ children }: { children: ReactNode }) {
  return <div id="wink-spa-readable">
    {children}
    <style>{`
      #wink-spa-readable main { font-size: 16px; }
      #wink-spa-readable main h1 { font-size: clamp(52px, 5.9vw, 88px); }
      #wink-spa-readable main h2 { font-size: clamp(43px, 4.6vw, 68px); }
      #wink-spa-readable main p:not(.unused) { line-height: 1.75; }
      #wink-spa-readable main section p, #wink-spa-readable main aside p { font-size: 16px; }
      #wink-spa-readable main section p:first-child:is([class*="eyebrow"]) { font-size: 12px; }
      #wink-spa-readable main section p[class*="lead"] { font-size: clamp(24px, 2.4vw, 31px) !important; line-height: 1.35; }
      #wink-spa-readable main header nav a { font-size: 14px; }
      #wink-spa-readable main a[class*="primary"], #wink-spa-readable main a[class*="outline"], #wink-spa-readable main a[class*="headerCta"] { font-size: 14px; }
      #wink-spa-readable main [class*="grid"] p, #wink-spa-readable main [class*="bookGrid"] p { font-size: 15px; }
      #wink-spa-readable main [class*="offer"] p { font-size: 15px; }
      #wink-spa-readable main [class*="priceNotice"], #wink-spa-readable main [class*="small"] { font-size: 13px; }
      @media (max-width: 850px) {
        #wink-spa-readable main h1 { font-size: clamp(48px, 8.2vw, 67px); }
        #wink-spa-readable main h2 { font-size: clamp(40px, 7vw, 55px); }
      }
      @media (max-width: 560px) {
        #wink-spa-readable main h1 { font-size: clamp(42px, 10vw, 52px); }
        #wink-spa-readable main h2 { font-size: 40px; }
        #wink-spa-readable main section p, #wink-spa-readable main aside p { font-size: 16px; }
      }
    `}</style>
  </div>;
}
