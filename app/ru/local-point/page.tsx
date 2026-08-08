import type { Metadata } from "next";
import "./local-point.css";
import LocalPointClient from "./LocalPointClient";

export const metadata: Metadata = {
  title: "GoVietStay Local Point | Вьетнам на русском",
  description: "GoVietStay Local Point — AI-маршруты, подарки и русскоязычная поддержка во Вьетнаме.",
};

export default function LocalPointPage() {
  return <LocalPointClient />;
}
