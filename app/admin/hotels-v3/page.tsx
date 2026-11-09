import type { Metadata } from "next";
import HotelPartnerV3 from "../../../components/hotel-partners/HotelPartnerV3";

const title = "GoVietStay Hotel Partner | Đăng ký và đăng nhập đối tác";
const description = "Đăng ký tài khoản đối tác GoVietStay để cập nhật khách sạn, hạng phòng, hình ảnh, giá hợp tác và gửi hồ sơ phê duyệt.";
const image = "https://partners.govietstay.com/hotel-partners/opengraph-image";

export const metadata: Metadata = {
  metadataBase: new URL("https://partners.govietstay.com"),
  title: { absolute: title },
  description,
  applicationName: "GoVietStay Hotel Partner",
  alternates: { canonical: "https://partners.govietstay.com/admin/hotels-v3" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://partners.govietstay.com/admin/hotels-v3",
    siteName: "GoVietStay Hotel Partner",
    title,
    description,
    images: [{url:image,width:1200,height:630,alt:"GoVietStay Hotel Partner – Đăng ký và quản lý khách sạn"}],
  },
  twitter: {card:"summary_large_image",title,description,images:[image]},
  robots: { index: false, follow: false },
};

export default function HotelManagementPage() {
  return <HotelPartnerV3/>;
}
