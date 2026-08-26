import type {VietnamSeoPage} from "../../../lib/vietnamSeoPages";
import {vietnamBusinessConfig} from "../../../lib/vietnamBusinessConfig";
import VietnamConversion from "./VietnamConversion";
import styles from "./VietnamPage.module.css";

const typeCopy={
  product:["Bạn được lợi gì?","Giá, quyền lợi và điều kiện được đưa lên trước lịch trình để bạn quyết định nhanh hơn."],
  combo:["Vì sao combo?","Giảm số lần phải tìm và tối ưu tổng chi phí, không dùng combo để che giá lẻ."],
  private:["Riêng tư theo đúng nghĩa","Không ghép khách lạ khi booking private đã xác nhận. Lịch bắt đầu từ người đi, không bắt đầu từ tour mẫu."],
  guide:["Câu trả lời trước khi mua","Trang này giúp bạn hiểu quyết định trước, rồi mới chọn tour/xe/combo nếu thực sự cần."],
} as const;

export default function VietnamPage({page,related}:{page:VietnamSeoPage;related:VietnamSeoPage[]}){
 const canonical=`https://www.govietstay.com/vi/${page.slug}`; const copy=typeCopy[page.type];
 const schema={"@context":"https://schema.org","@type":page.type==="guide"?"Article":"WebPage",headline:page.h1,description:page.description,url:canonical,inLanguage:"vi-VN",dateModified:page.updated,author:{"@type":"Organization",name:"GoVietStay"}};
 const faq=[["Giá website có phải giá cuối cùng không?","Chỉ sau khi GoVietStay xác nhận ngày đi, số khách, đối tượng khách và cấu phần dịch vụ."],["Chuyển khoản QR có tự xác nhận booking không?","Không. Giai đoạn Cách A được đối soát thủ công; booking chỉ confirmed khi GoVietStay kiểm tra tiền và gửi xác nhận."],["Có thể đi riêng gia đình không?","Có. Hãy gửi số người, ngày đi, độ tuổi, sở thích và điều không muốn để nhận lịch riêng."],["Google Reviews ở đâu?","Nút Google Reviews trên trang mở trực tiếp hồ sơ đánh giá thật của GoVietStay."]];
 return <main className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <header className={styles.nav}><a href="/vi"><img src="/govietstay-logo.jpg" alt="GoVietStay"/><b>GoVietStay Việt Nam</b></a><nav><a href="/vi">Trang Việt Nam</a><a href="/vi/combo-da-nang-3-tour">Combo</a><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank">Google Reviews</a><a className={styles.zalo} href={vietnamBusinessConfig.zaloUrl} target="_blank">Zalo</a></nav></header>
  <section className={styles.hero}><div><p>{page.destination} · {page.type.toUpperCase()}</p><h1>{page.h1}</h1><h2>{page.hero}</h2><div>{page.focus.split(",").map(x=><span key={x}>✓ {x.trim()}</span>)}</div></div><aside><small>WIIFM</small><h3>{copy[0]}</h3><p>{copy[1]}</p><a href="#booking">Xem giá / giữ chỗ ↓</a></aside></section>
  <section className={styles.trust}><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank"><small>GOOGLE REVIEWS</small><b>Xem đánh giá thật →</b></a><div><small>GIÁ</small><b>Khóa sau xác nhận</b></div><div><small>DEPOSIT</small><b>{page.depositPercent===0?"0% transfer":`${page.depositPercent}% khi đủ điều kiện`}</b></div><div><small>PRIVACY</small><b>Private = không ghép khách</b></div></section>
  {(page.type==="private"||page.slug.includes("gia-dinh"))?<section className={styles.private}><div><p>PRIVATE FAMILY</p><h2>Chuyến đi chỉ dành cho gia đình bạn.</h2></div><div><span>Cho số người + ngày đi + độ tuổi.</span><span>Cho sở thích, nhịp độ, món ăn và điều không muốn.</span><span>GoVietStay thiết kế lịch quanh gia đình — không bắt gia đình chạy theo tour mẫu.</span></div></section>:null}
  <div className={styles.layout}><article>
    <section className={styles.block}><p>01 · TÂM LÝ QUYẾT ĐỊNH</p><h2>Đừng mua vì headline giá thấp.</h2><span>Hãy so đúng quyền lợi, đúng đối tượng khách, đúng ngày đi và điều kiện hoàn/hủy. GoVietStay ưu tiên tổng chi phí rõ ràng hơn một con số quảng cáo thiếu điều kiện.</span></section>
    <section className={styles.block}><p>02 · {page.destination.toUpperCase()}</p><h2>{page.h1}</h2><span>{page.description}</span><span>Trọng tâm của trang này: {page.focus}. Nếu đi gia đình, hãy nói rõ trẻ em, người lớn tuổi, giờ nghỉ và mức độ riêng tư mong muốn.</span></section>
    <section className={styles.block}><p>03 · LOCAL ADVANTAGE</p><h2>Có người địa phương để hỏi trước khi quyết định.</h2><span>Thời tiết, giờ đón, vé, lộ trình và tình trạng vận hành có thể thay đổi. Một đầu mối Zalo giúp khách không phải tự ghép thông tin từ nhiều nơi.</span></section>
    <section id="booking"><VietnamConversion page={page}/></section>
    <section className={styles.terms}><p>ĐIỀU KIỆN VI-2026.08.26</p><h2>Rõ trước khi trả tiền.</h2>
      {[
        ["Giá & booking","Giá chỉ khóa sau xác nhận ngày đi, số khách, đối tượng khách và cấu phần. Khuyến mãi không tự động cộng dồn."],
        ["Deposit & VietQR","Khoản cọc dùng giữ chỗ/chi trả dịch vụ cần xuất. Cách A đối soát thủ công; QR hoặc chuyển khoản chưa tự xác nhận booking."],
        ["Vé và bên thứ ba","Vé, hotel, cano hoặc dịch vụ đã xuất áp dụng điều kiện đổi-hủy của nhà cung cấp. Thay đổi ngày/số người/cấu hình có thể làm giá thay đổi."],
        ["Trẻ em & thông tin","Khách cung cấp đúng tuổi, chiều cao, số người, hành lý. Chênh lệch do thông tin sai được xử lý theo chính sách thực tế."],
        ["Tour ghép & no-show","Tour ghép theo giờ chung. Đến trễ vượt thời gian chờ hợp lý hoặc no-show có thể mất dịch vụ theo điều kiện booking."],
        ["Thời tiết & bất khả kháng","Ưu tiên đổi ngày/đổi chương trình hoặc hoàn phần chưa sử dụng mà GoVietStay thực tế thu hồi được từ nhà cung cấp, tùy booking và pháp luật áp dụng."],
        ["Combo","Giá combo áp dụng đủ cấu phần. Tự bỏ một dịch vụ không đồng nghĩa lấy tổng combo chia đều để hoàn; quà tặng không mặc nhiên quy đổi tiền."],
      ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </section>
    <section className={styles.faq}><p>FAQ</p><h2>Câu hỏi trước khi đặt</h2>{faq.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</section>
  </article><aside><div className={styles.sticky}><small>TRƯỚC KHI ĐẶT</small><h3>Xem khách thật nói gì.</h3><p>Review Google là bằng chứng quan trọng hơn lời quảng cáo.</p><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank">Google Reviews</a><a className={styles.zaloBtn} href={vietnamBusinessConfig.zaloUrl} target="_blank">Hỏi Zalo</a>{vietnamBusinessConfig.facebookHoTramUrl?<a className={styles.fb} href={vietnamBusinessConfig.facebookHoTramUrl} target="_blank">Facebook Hồ Tràm Travel</a>:null}</div></aside></div>
  <section className={styles.related}><p>XEM TIẾP</p><h2>Trang liên quan</h2><div>{related.map(x=><a key={x.slug} href={`/vi/${x.slug}`}><small>{x.destination}</small><b>{x.h1}</b><span>Xem →</span></a>)}</div></section>
  <div className={styles.mobile}><a href={vietnamBusinessConfig.zaloUrl} target="_blank">💬 Zalo</a><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank">⭐ Review</a><a href="#booking">💳 Giữ chỗ</a></div>
 </main>
}