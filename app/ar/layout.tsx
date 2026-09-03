import type { Metadata } from "next";
import "./arabic.css";

export const metadata: Metadata = {
  title: "GoVietStay العربية | رحلات فيتنام الخاصة للعائلات",
  description:
    "رحلات خاصة في فيتنام للعائلات مع سيارة خاصة، فنادق مناسبة، تنسيق الطعام الحلال ودعم محلي عبر واتساب.",
  icons: {
    icon: "/ar-assets/logo.webp",
  },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <div className="arabic-shell" dir="rtl" lang="ar">{children}</div>;
}
