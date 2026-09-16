import AdminDemo from "../../../../components/admin-v2/AdminDemo";

export const metadata = {
  title: "GoVietStay Admin V2 · Demo giao diện (dữ liệu giả lập)",
  description: "Bản xem thử giao diện Admin V2; không kết nối dữ liệu khách hàng hoặc database production.",
  robots: { index: false, follow: false },
};

export default function AdminV2DemoPage() {
  return <AdminDemo />;
}
