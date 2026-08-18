import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tommy | Официальный менеджер GoVietStay",
  description:
    "Официальная страница Tommy — русскоязычного менеджера GoVietStay во Вьетнаме.",
  alternates: {
    canonical: "https://www.govietstay.com/ru/Tommy",
  },
};

export default function TommyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
