import AdminLive from "../../../components/admin-v2/AdminLive";

export const metadata = {
  title: "GoVietStay · Admin V2 — Dữ liệu thật",
  description: "Owner-only read-only overview and existing customer booking history.",
  robots: { index: false, follow: false },
};

export default function AdminV2Page() {
  return <AdminLive />;
}
