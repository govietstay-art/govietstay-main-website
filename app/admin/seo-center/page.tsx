import UnifiedSeoCenter from "../../../components/admin-v5/UnifiedSeoCenter";
import "../../../components/admin-v5/admin-brand.css";

export const metadata = {
  title: "SEO Center | GoVietStay Admin",
  robots: { index: false, follow: false },
};

export default function SeoCenterPage() {
  return <UnifiedSeoCenter />;
}
