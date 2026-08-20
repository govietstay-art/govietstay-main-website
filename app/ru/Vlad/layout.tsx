import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Влад — официальный менеджер",
  description:
    "Официальная страница Влада — русскоязычного менеджера GoVietStay во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/Vlad",
  },
  robots: { index: false, follow: false },
};

export default function VladLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
