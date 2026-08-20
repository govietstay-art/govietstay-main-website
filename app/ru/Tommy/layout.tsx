import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tommy — официальный менеджер",
  description:
    "Официальная страница Tommy — русскоязычного менеджера GoVietStay во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/Tommy",
  },
  robots: { index: false, follow: false },
};

export default function TommyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
