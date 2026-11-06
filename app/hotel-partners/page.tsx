import Link from "next/link";
import "./hotel-partners.css";

export const metadata = {
  title: "Hotel Partners | GoVietStay — Đăng ký & quản lý khách sạn",
  description: "Cổng đối tác khách sạn GoVietStay. Một tài khoản quản lý nhiều khách sạn, cập nhật hạng phòng, ảnh và giá, gửi GoVietStay kiểm duyệt.",
  robots: { index: false, follow: false },
};

const FEATURES = [
  { icon:"▦", title:"Một tài khoản · Nhiều khách sạn", description:"Tự thêm từng khách sạn vào danh mục của công ty. Không cần gửi yêu cầu tạo tài khoản mới cho mỗi khách sạn." },
  { icon:"▤", title:"Nhập hạng phòng thật nhanh", description:"Chọn Standard, Superior, Deluxe, Family, Suite… rồi nhân bản hạng phòng tương tự để tiết kiệm thời gian." },
  { icon:"▧", title:"Hình ảnh được tối ưu", description:"Tối đa 6 ảnh tổng quan khách sạn và 1 ảnh đại diện mỗi hạng phòng. Hệ thống tự tối ưu ảnh WebP." },
  { icon:"✓", title:"Phê duyệt rõ ràng", description:"Thông tin mới được lưu ở trạng thái bản nháp hoặc chờ duyệt trước khi GoVietStay đưa vào sử dụng." },
];
const STEPS = [
  {num:"01",title:"Đăng ký bằng email",description:"Nhân viên đại diện công ty tự tạo tài khoản và xác nhận email."},
  {num:"02",title:"GoVietStay cấp quyền cho công ty",description:"Chúng tôi liên kết email với đơn vị đối tác, chỉ thực hiện một lần."},
  {num:"03",title:"Thêm từng khách sạn",description:"Đăng nhập và bấm “+ Thêm khách sạn”. Có thể thêm nhiều khách sạn trong cùng một danh mục."},
  {num:"04",title:"Nhập thông tin & gửi duyệt",description:"Điền phòng, chính sách, hình ảnh và giá; theo dõi tình trạng phê duyệt ngay trên hệ thống."},
];
const faq=[
  ["Tôi có 20 khách sạn, có cần 20 tài khoản?","Không. Một tài khoản được cấp quyền cho công ty có thể tự thêm và quản lý toàn bộ khách sạn trong cùng danh mục."],
  ["Nhiều nhân viên trong công ty có cùng làm việc được không?","Có. Mỗi nhân viên đăng ký bằng email riêng; GoVietStay gắn các email vào cùng đơn vị đối tác theo vai trò được cấp."],
  ["Tôi có thể chỉnh sửa sau khi gửi không?","Có. Bạn có thể cập nhật thông tin và gửi yêu cầu kiểm duyệt mới. Nội dung đã duyệt không bị tự động thay đổi trước khi được phê duyệt."],
  ["Mật khẩu do ai quản lý?","Bạn tự tạo và tự giữ mật khẩu. GoVietStay chỉ liên kết quyền truy cập, không yêu cầu đối tác gửi mật khẩu."],
];
export default function HotelPartnersLanding(){
  return <main className="hp-landing">
    <div className="hp-glow hp-glow-a" aria-hidden="true"/><div className="hp-glow hp-glow-b" aria-hidden="true"/>
    <div className="hp-inner">
      <header className="hp-nav">
        <a className="hp-brand" href="https://www.govietstay.com" aria-label="GoVietStay Home"><span className="hp-mark">GVS</span><span><b>GoVietStay</b><small>TRUSTED LOCAL SUPPORT</small></span></a>
        <nav aria-label="Điều hướng trang đối tác">
          <a href="#how-it-works">Quy trình</a><a href="#faq">Câu hỏi thường gặp</a>
          <Link className="hp-nav-login" href="/admin/hotels-v3">Đăng nhập <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>
      <section className="hp-hero">
        <div className="hp-hero-content">
          <span className="hp-eyebrow"><i/> HOTEL PARTNER PLATFORM</span>
          <h1>Một tài khoản.<br/><em>Cả danh mục khách sạn.</em></h1>
          <p className="hp-lead">Dành cho đơn vị cung cấp phòng, công ty quản lý khách sạn và đối tác GoVietStay. Tự thêm khách sạn, nhập hạng phòng, tối ưu hình ảnh và gửi thông tin kiểm duyệt — tất cả tại một nơi.</p>
          <div className="hp-hero-actions">
            <Link className="hp-button hp-primary" href="/admin/hotels-v3?signup=1">Đăng ký tài khoản <span>→</span></Link>
            <Link className="hp-button hp-outline" href="/admin/hotels-v3">Đã có tài khoản? Đăng nhập</Link>
          </div>
          <p className="hp-trust"><span>✦</span> Chỉ cần đăng ký một lần · GoVietStay xác nhận quyền truy cập trước khi bắt đầu</p>
        </div>
        <div className="hp-art" aria-label="Minh họa bảng quản lý nhiều khách sạn">
          <div className="hp-dashboard">
            <div className="hp-dash-top"><span className="hp-dash-brand">GVS <small>Partner Portal</small></span><span className="hp-dash-avatar">PT</span></div>
            <div className="hp-dash-heading"><div><small>DANH MỤC CỦA CÔNG TY</small><strong>Khách sạn của tôi</strong></div><span className="hp-dash-add">＋ Thêm khách sạn</span></div>
            <div className="hp-dash-stats"><div><small>TỔNG KHÁCH SẠN</small><strong>12</strong></div><div><small>HẠNG PHÒNG</small><strong>68</strong></div><div><small>ĐANG CHỜ DUYỆT</small><strong>03</strong></div></div>
            <div className="hp-dash-list">
              <div><span className="hp-dash-hotel">⌂</span><div><strong>Khách sạn A</strong><small>Đà Nẵng · 12 hạng phòng</small></div><b className="hp-approved">Đã duyệt</b></div>
              <div><span className="hp-dash-hotel">⌂</span><div><strong>Khách sạn B</strong><small>Hội An · 8 hạng phòng</small></div><b className="hp-pending">Chờ duyệt</b></div>
              <div><span className="hp-dash-hotel">⌂</span><div><strong>Khách sạn C</strong><small>Phú Quốc · Đang bổ sung</small></div><b className="hp-draft">Bản nháp</b></div>
            </div>
            <small className="hp-demo-label">Minh họa giao diện, không phải dữ liệu thực tế</small>
          </div>
          <div className="hp-floating"><span>✓</span><div><b>Đơn giản cho đội ngũ của bạn</b><small>Không cần biết kỹ thuật</small></div></div>
        </div>
      </section>

      <section className="hp-benefits" id="features">
        <div className="hp-section-intro"><span className="hp-kicker">LÀM VIỆC NHANH HƠN</span><h2>Mọi thứ cần thiết để đối tác tự quản lý</h2><p>Đủ linh hoạt cho một khách sạn hoặc cả công ty với nhiều cơ sở lưu trú.</p></div>
        <div className="hp-feature-grid">{FEATURES.map(f=><article className="hp-feature" key={f.title}><span className="hp-feature-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.description}</p></article>)}</div>
      </section>

      <section className="hp-flow" id="how-it-works"><div className="hp-flow-top"><div><span className="hp-kicker">BẮT ĐẦU CHỈ VỚI EMAIL</span><h2>4 bước để bắt đầu hợp tác</h2></div><p>Không cần tạo tài khoản mới cho mỗi khách sạn. Không cần gửi mật khẩu cho GoVietStay.</p></div><div className="hp-steps">{STEPS.map(s=><div className="hp-step" key={s.num}><span>{s.num}</span><h3>{s.title}</h3><p>{s.description}</p></div>)}</div></section>
      <section className="hp-faq" id="faq"><div><span className="hp-kicker">CÂU HỎI THƯỜNG GẶP</span><h2>Dễ dàng ngay từ ngày đầu</h2><p>Nếu chưa được cấp quyền, sau khi đăng ký bạn hãy gửi địa chỉ email của mình cho người phụ trách GoVietStay để được kích hoạt đúng đơn vị.</p></div><div className="hp-faq-list">{faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className="hp-cta"><div><span className="hp-kicker">SẴN SÀNG KẾT NỐI?</span><h2>Bắt đầu xây dựng danh mục khách sạn của bạn.</h2><p>Đăng ký bằng email công ty, sau đó GoVietStay sẽ xác nhận quyền truy cập.</p></div><div><Link className="hp-button hp-primary" href="/admin/hotels-v3?signup=1">Tạo tài khoản đối tác <span>→</span></Link><Link className="hp-cta-login" href="/admin/hotels-v3">Tôi đã có tài khoản</Link></div></section>
      <footer className="hp-footer"><span>© 2026 GoVietStay · Trusted Local Support</span><span>Partner services · Da Nang · Hoi An · Hue · Phu Quoc</span></footer>
    </div>
  </main>
}
