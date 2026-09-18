import AdminV5 from "../../components/admin-v5/AdminV5";
import OwnerPermissionsShortcut from "../../components/admin-v5/OwnerPermissionsShortcut";
import SeoDeepLink from "../../components/admin-v5/SeoDeepLink";
import "../../components/admin-v5/admin-brand.css";

export const metadata = {
  title: "GoVietStay Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <><AdminV5 /><OwnerPermissionsShortcut /><SeoDeepLink /></>;
}
