import Link from "next/link";
import Image from "next/image";
import "./hotel-partners.css";

export const metadata = {
  title: "Đối tác khách sạn | GoVietStay — Đăng ký và quản lý danh mục",
  description: "Cổng dành cho đối tác khách sạn của GoVietStay. Một tài khoản quản lý nhiều khách sạn, cập nhật phòng, hình ảnh và bảng giá, gửi thông tin kiểm duyệt.",
  robots: { index: false, follow: false },
};

const FEATURES = [
  { icon:"▦", title:"Một tài khoản, nhiều khách sạn", description:"Đội ngũ của bạn có thể thêm từng khách sạn vào cùng một danh mục. Không cần đăng ký lại cho mỗi cơ sở." },
  { icon:"▤", title:"Cập nhật phòng nhanh gọn", description:"Chọn hạng phòng có sẵn, điền thông tin cần thiết hoặc nhân bản những phòng tương tự." },
  { icon:"▧", title:"Ảnh vừa đủ, tải nhanh", description:"Mỗi khách sạn có tối đa 6 ảnh tổng quan, mỗi hạng phòng có một ảnh đại diện. Hệ thống tự tối ưu dung lượng." },
  { icon:"✓", title:"Chủ động nhập, rõ ràng khi duyệt", description:"Bạn cập nhật trực tiếp. GoVietStay kiểm tra và phản hồi trước khi thông tin được đưa vào sử dụng." },
];
const STEPS = [
  {num:"01",title:"Tạo tài khoản",description:"Đăng ký bằng email của người phụ trách. Bạn tự đặt và giữ mật khẩu."},
  {num:"02",title:"Nhận quyền truy cập",description:"GoVietStay xác nhận và liên kết tài khoản với công ty đối tác."},
  {num:"03",title:"Thêm khách sạn",description:"Mở danh mục, chọn “+ Thêm khách sạn”, rồi nhập thông tin cho từng cơ sở."},
  {num:"04",title:"Gửi GoVietStay kiểm tra",description:"Cập nhật hạng phòng, ảnh và giá. Bạn có thể theo dõi hồ sơ đang chờ duyệt."},
];
const faq=[
  ["Công ty tôi có 20 khách sạn, có cần 20 tài khoản không?","Không. Sau khi được cấp quyền, một tài khoản có thể tự thêm và quản lý nhiều khách sạn của cùng công ty."],
  ["Nhiều nhân viên có cùng cập nhật được không?","Có. Mỗi người dùng email riêng. GoVietStay cấp quyền cho các nhân viên thuộc cùng một công ty để làm việc chung trên danh mục."],
  ["Nếu cần sửa lại thông tin thì sao?","Bạn có thể gửi thay đổi mới bất cứ khi nào cần. Nội dung đang được sử dụng vẫn được giữ nguyên trong lúc chờ kiểm tra."],
  ["Tôi có phải gửi mật khẩu cho GoVietStay không?","Không. Bạn tự tạo và quản lý mật khẩu. GoVietStay chỉ xác nhận và cấp quyền truy cập cho tài khoản."],
];
export default function HotelPartnersLanding(){
  return <main className="hp-landing">
    <div className="hp-glow hp-glow-a" aria-hidden="true"/><div className="hp-glow hp-glow-b" aria-hidden="true"/>
    <div className="hp-inner">
      <header className="hp-nav">
        <a className="hp-brand" href="https://www.govietstay.com" aria-label="Trang chủ GoVietStay"><Image className="hp-logo-img" src="/logo.png" alt="Logo chính thức GoVietStay" width={76} height={76} priority quality={75}/><span><b>GoVietStay</b><small>TRUSTED LOCAL SUPPORT</small></span></a>
        <nav aria-label="Điều hướng trang đối tác">
          <a href="#how-it-works">Quy trình</a><a href="#faq">Câu hỏi thường gặp</a>
          <Link className="hp-nav-login" href="/admin/hotels-v3">Đăng nhập <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>
      <section className="hp-hero">
        <div className="hp-hero-content">
          <span className="hp-eyebrow"><i/> CỔNG DÀNH CHO ĐỐI TÁC KHÁCH SẠN</span>
          <h1>Một tài khoản.<br/><em>Quản lý nhiều khách sạn.</em></h1>
          <p className="hp-lead">Dù công ty bạn phụ trách một hay nhiều khách sạn, mọi thông tin đều được quản lý tại đây. Bạn có thể tự thêm khách sạn, cập nhật hạng phòng, ảnh và bảng giá. GoVietStay sẽ kiểm tra trước khi đưa vào sử dụng.</p>
          <div className="hp-hero-actions">
            <Link className="hp-button hp-primary" href="/admin/hotels-v3?signup=1">Đăng ký tài khoản <span>→</span></Link>
            <Link className="hp-button hp-outline" href="/admin/hotels-v3">Tôi đã có tài khoản</Link>
          </div>
          <p className="hp-trust"><span>✓</span> Đăng ký bằng email của bạn. GoVietStay sẽ xác nhận và cấp quyền cho công ty.</p>
          <div className="hp-hero-points" aria-label="Lợi ích"><span>✓ Tự thêm khách sạn</span><span>✓ Dễ cập nhật phòng</span><span>✓ Có bước kiểm duyệt</span></div>
        </div>
        <div className="hp-art" aria-label="Minh họa bảng quản lý nhiều khách sạn">
          <div className="hp-dashboard">
            <div className="hp-dash-top"><span className="hp-dash-brand"><Image className="hp-dash-logo" src="/logo.png" alt="" width={38} height={38} quality={70}/><span>GoVietStay <small>Partner Portal</small></span></span><span className="hp-dash-avatar">PT</span></div>
            <div className="hp-dash-heading"><div><small>DANH MỤC CỦA CÔNG TY</small><strong>Khách sạn của chúng tôi</strong></div><span className="hp-dash-add">＋ Thêm khách sạn</span></div>
            <div className="hp-dash-stats"><div><small>TỔNG KHÁCH SẠN</small><strong>12</strong></div><div><small>HẠNG PHÒNG</small><strong>68</strong></div><div><small>ĐANG CHỜ DUYỆT</small><strong>03</strong></div></div>
            <div className="hp-dash-list">
              <div><span className="hp-dash-hotel">⌂</span><div><strong>Khách sạn A</strong><small>Đà Nẵng · 12 hạng phòng</small></div><b className="hp-approved">Đã duyệt</b></div>
              <div><span className="hp-dash-hotel">⌂</span><div><strong>Khách sạn B</strong><small>Hội An · 8 hạng phòng</small></div><b className="hp-pending">Chờ duyệt</b></div>
              <div><span className="hp-dash-hotel">⌂</span><div><strong>Khách sạn C</strong><small>Phú Quốc · Đang bổ sung</small></div><b className="hp-draft">Bản nháp</b></div>
            </div>
            <small className="hp-demo-label">Minh họa giao diện, không phải dữ liệu thực tế</small>
          </div>
          <div className="hp-floating"><span>✓</span><div><b>Mỗi khách sạn, một hồ sơ rõ ràng</b><small>Cập nhật trực tiếp trên hệ thống</small></div></div>
        </div>
      </section>

      <section className="hp-benefits" id="features">
        <div className="hp-section-intro"><span className="hp-kicker">DỄ DÙNG CHO CẢ ĐỘI NGŨ</span><h2>Quản lý khách sạn thuận tiện hơn mỗi ngày</h2><p>Thay vì gửi nhiều bảng tính qua lại, công ty bạn có thể cập nhật mọi thứ ngay trên một hệ thống.</p></div>
        <div className="hp-feature-grid">{FEATURES.map(f=><article className="hp-feature" key={f.title}><span className="hp-feature-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.description}</p></article>)}</div>
      </section>

      <section className="hp-flow" id="how-it-works"><div className="hp-flow-top"><div><span className="hp-kicker">CHỈ CẦN MỘT LẦN ĐĂNG KÝ</span><h2>Bắt đầu rất đơn giản</h2></div><p>Mỗi nhân viên dùng tài khoản riêng, nhưng cùng làm việc trên danh mục khách sạn của công ty.</p></div><div className="hp-steps">{STEPS.map(s=><div className="hp-step" key={s.num}><span>{s.num}</span><h3>{s.title}</h3><p>{s.description}</p></div>)}</div></section>
      <section className="hp-faq" id="faq"><div><span className="hp-kicker">CÂU HỎI THƯỜNG GẶP</span><h2>Những điều bạn cần biết</h2><p>Sau khi đăng ký, hãy gửi email đã dùng cho người phụ trách GoVietStay. Chúng tôi sẽ liên kết tài khoản với công ty của bạn.</p></div><div className="hp-faq-list">{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className="hp-cta"><div><span className="hp-kicker">HỢP TÁC CÙNG GOVIETSTAY</span><h2>Sẵn sàng quản lý danh mục khách sạn của bạn?</h2><p>Đăng ký bằng email, chúng tôi sẽ xác nhận và cấp quyền để bạn bắt đầu.</p></div><div><Link className="hp-button hp-primary" href="/admin/hotels-v3?signup=1">Tạo tài khoản đối tác <span>→</span></Link><Link className="hp-cta-login" href="/admin/hotels-v3">Tôi đã có tài khoản</Link></div></section>
      <aside className="hp-future-banner" aria-label="Thông tin dự kiến về mã đối tác du lịch">
        <div className="hp-future-heading"><span className="hp-future-pill">ĐỊNH HƯỚNG SẮP TỚI</span><span>Thêm cơ hội kết nối đối tác du lịch</span></div>
        <div className="hp-future-window" aria-label="GoVietStay dự kiến giới thiệu mã đối tác du lịch 12% trong thời gian tới">
          <div className="hp-future-track">
            <span className="hp-future-copy">✦ &nbsp; CÙNG PHÁT TRIỂN MẠNG LƯỚI ĐỐI TÁC DU LỊCH &nbsp; ✦ &nbsp; DỰ KIẾN GIỚI THIỆU MÃ ĐỐI TÁC 12% &nbsp; ✦ &nbsp; GOVIETSTAY SẼ SỚM CẬP NHẬT &nbsp; </span>
            <span className="hp-future-copy" aria-hidden="true">✦ &nbsp; CÙNG PHÁT TRIỂN MẠNG LƯỚI ĐỐI TÁC DU LỊCH &nbsp; ✦ &nbsp; DỰ KIẾN GIỚI THIỆU MÃ ĐỐI TÁC 12% &nbsp; ✦ &nbsp; GOVIETSTAY SẼ SỚM CẬP NHẬT &nbsp; </span>
          </div>
        </div>
      </aside>
      <footer className="hp-footer"><span>© 2026 GoVietStay · Trusted Local Support</span><span>Partner services · Da Nang · Hoi An · Hue · Phu Quoc</span></footer>
    </div>
  </main>
}
