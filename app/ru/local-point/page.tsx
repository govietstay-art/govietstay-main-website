import type { Metadata } from "next";
import LocalPointLandingPage from "../../../components/LocalPointLandingPage";

export const metadata: Metadata = {
  title: "GoVietStay Local Point | Путешествие по Вьетнаму",
  description:
    "Экскурсии, трансферы, подарки и местная поддержка GoVietStay на русском языке.",
};

export default function LocalPointPage() {
  return <LocalPointLandingPage />;
}
