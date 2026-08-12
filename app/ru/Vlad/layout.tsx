import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Влад | Официальный менеджер GoVietStay",
  description:
    "Официальная страница Влада — русскоязычного менеджера GoVietStay во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/Vlad",
  },
};

export default function VladLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
