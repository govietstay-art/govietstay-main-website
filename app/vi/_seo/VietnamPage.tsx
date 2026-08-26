import type { VietnamSeoPage } from "../../../lib/vietnamSeoPages";
import { vietnamBusinessConfig } from "../../../lib/vietnamBusinessConfig";
import { getVietnamVisuals, vietnamReviewScreenshots } from "../../../lib/vietnamVisuals";
import VietnamConversion from "./VietnamConversion";
import styles from "./VietnamPage.module.css";

type PriceConfig = { sellPrice: number; verified: boolean };
const priceMap = vietnamBusinessConfig.prices as unknown as Record<string, PriceConfig>;

const typeCopy = {
  product: ["Tour / dịch vụ", "Xem giá từ, phần bao gồm và những điều cần biết trước khi đặt."],
  combo: ["Combo", "Phù hợp khi bạn muốn đi nhiều dịch vụ và muốn gom chung cho dễ sắp xếp."],
  private: ["Tour riêng gia đình", "Không ghép khách khác khi đã xác nhận tour riêng; lịch được sắp theo người đi."],
  guide: ["Kinh nghiệm", "Đọc trước để biết mình cần gì, sau đó mới quyết định có nên đặt tour hay không."],
} as const;

function priceLabel(page: VietnamSeoPage) {
  if (!page.priceKey) return page.depositPercent === 0 ? "Transfer tiêu chuẩn: không cần cọc" : "Báo giá theo nhóm";
  const price = priceMap[page.priceKey];
  return price?.sellPrice ? `Từ ${new Intl.NumberFormat("vi-VN").format(price.sellPrice)}đ` : "Hỏi giá nhanh";
}

export default function VietnamPage({
  page,
  related,
}: {
  page: VietnamSeoPage;
  related: VietnamSeoPage[];
}) {
  const canonical = `https://www.govietstay.com/vi/${page.slug}`;
  const copy = typeCopy[page.type];
  const visual = getVietnamVisuals(page.slug, page.destination);

  const schema = {
    "@context": "https://schema.org",
    "@type": page.type === "guide" ? "Article" : "WebPage",
    headline: page.h1,
    description: page.description,
    url: canonical,
    inLanguage: "vi-VN",
    dateModified: page.updated,
    author: { "@type": "Organization", name: "GoVietStay" },
  };

  const faq = [
    ["Giá trên website đã là giá cuối cùng chưa?", "Chưa hẳn. Mức “từ” còn phụ thuộc ngày đi, số khách, trẻ em và quyền lợi của từng gói. GoVietStay sẽ xác nhận lại trước khi bạn đặt cọc."],
    ["Chuyển khoản bằng QR là booking đã chắc chắn chưa?", "Chưa. Ở bước hiện tại GoVietStay vẫn kiểm tra tiền thủ công và gửi xác nhận booking sau."],
    ["Gia đình tôi có thể đi riêng không?", "Có. Gửi số người, ngày đi, độ tuổi, sở thích và những điều cả nhà không muốn để GoVietStay lên phương án riêng."],
    ["Tôi muốn xem đánh giá của khách cũ ở đâu?", "Bấm nút Google Reviews trên trang để mở trực tiếp hồ sơ đánh giá của GoVietStay."],
  ];

  const privateLike = page.type === "private" || page.slug.includes("gia-dinh");

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className={styles.nav}>
        <a href="/vi" className={styles.brand}>
          <img src="/govietstay-logo.jpg" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>VIỆT NAM</small></span>
        </a>
        <nav>
          <a href="/vi">Trang Việt Nam</a>
          <a href="/vi/combo-da-nang-3-tour">Combo</a>
          <a href="/vi/tour-rieng-da-nang-gia-dinh">Đi riêng gia đình</a>
          <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Google Reviews</a>
          <a className={styles.zalo} href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Nhắn Zalo</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <img className={styles.heroPhoto} src={visual.hero} alt={page.h1} fetchPriority="high" />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p>{page.destination} · {copy[0].toUpperCase()}</p>
            <h1>{page.h1}</h1>
            <h2>{page.hero}</h2>
            <div className={styles.chips}>{page.focus.split(",").map((x) => <span key={x}>✓ {x.trim()}</span>)}</div>
            <div className={styles.heroActions}>
              <a href="#booking">Xem giá & giữ chỗ</a>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Xem đánh giá</a>
            </div>
          </div>

          <aside className={styles.decisionCard}>
            <small>THÔNG TIN NHANH</small>
            <h3>{copy[0]}</h3>
            <p>{copy[1]}</p>
            <strong>{priceLabel(page)}</strong>
            <div><span>Đặt cọc</span><b>{page.depositPercent === 0 ? "0% với transfer tiêu chuẩn" : `${page.depositPercent}% sau khi xác nhận`}</b></div>
            <div><span>Hỗ trợ</span><b>Zalo + đội ngũ tại địa phương</b></div>
            <div><span>Đi riêng</span><b>Không ghép khách nếu đã chốt tour riêng</b></div>
          </aside>
        </div>
      </section>

      <section className={styles.gallery}>
        {visual.gallery.map((src, i) => (
          <div key={src}>
            <img src={src} alt={`${visual.label} ${i + 1}`} loading="lazy" />
            {i === 0 ? <span>Ảnh thật từ hệ thống GoVietStay</span> : null}
          </div>
        ))}
      </section>

      <section className={styles.scan}>
        <div><small>BẠN NHẬN ĐƯỢC GÌ?</small><b>{copy[0]}</b><p>{page.description}</p></div>
        <div><small>TRƯỚC KHI SO GIÁ</small><b>Nhớ xem cùng một quyền lợi.</b><p>Cùng ngày đi, cùng loại vé, cùng phần ăn, xe và chính sách trẻ em thì so giá mới chính xác.</p></div>
        <div><small>CÓ NGƯỜI HỖ TRỢ TẠI ĐIỂM ĐẾN</small><b>Cần hỏi gì thì nhắn Zalo.</b><p>Thời tiết, giờ đón hoặc tình hình tour có thể thay đổi; có người kiểm tra tại chỗ sẽ đỡ mất công tự tìm nhiều nguồn.</p></div>
      </section>

      {privateLike ? (
        <section className={styles.private}>
          <div className={styles.privateImage}>
            <img src="/happy-travelers/02462467f09771c928865.jpg" alt="Khách GoVietStay" loading="lazy" />
          </div>
          <div className={styles.privateCopy}>
            <p>TOUR RIÊNG GIA ĐÌNH</p>
            <h2>Nhà mình đi thế nào thì lịch được sắp như thế.</h2>
            <div>
              {[
                "Số người, ngày đi và độ tuổi",
                "Khách sạn hoặc resort",
                "Cả nhà thích gì",
                "Giờ ăn, giờ nghỉ",
                "Có điều gì không muốn đi",
              ].map((x, i) => <span key={x}><b>{String(i + 1).padStart(2, "0")}</b>{x}</span>)}
            </div>
            <p className={styles.note}>Tour riêng đã xác nhận sẽ không ghép khách khác. Lịch vẫn cần theo giờ mở cửa, điều kiện vé, thời tiết và tình hình thực tế.</p>
            <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Gửi nhu cầu gia đình qua Zalo</a>
          </div>
        </section>
      ) : null}

      <div className={styles.layout}>
        <article>
          <section className={styles.explainer}>
            <div>
              <p>01 · TOUR NÀY HỢP VỚI AI?</p>
              <h2>Hợp nếu bạn muốn biết rõ trước khi đặt.</h2>
              <ul>
                <li>Muốn biết giá, phần bao gồm và điều kiện trước khi chuyển tiền.</li>
                <li>Muốn có người hỗ trợ qua Zalo khi đang ở điểm đến.</li>
                <li>Đi cùng gia đình và cần hỏi kỹ về trẻ em hoặc người lớn tuổi.</li>
              </ul>
            </div>
            <div>
              <p>02 · NÊN HỎI TRƯỚC</p>
              <h2>{page.focus}</h2>
              <ul>
                <li>Ngày đi và số khách chính xác.</li>
                <li>Vé, bữa ăn, xe và hướng dẫn viên đã nằm trong giá chưa.</li>
                <li>Nếu đổi ngày hoặc thời tiết xấu thì xử lý thế nào.</li>
              </ul>
            </div>
          </section>

          <section className={styles.story}>
            <p>03 · GỢI Ý TỪ GOVIETSTAY</p>
            <h2>{page.h1}</h2>
            <p>{page.description}</p>
            <blockquote>“Không cần mua nhiều. Chỉ cần chọn đúng thứ hợp với chuyến đi của mình.”</blockquote>
          </section>

          <section className={styles.socialProof}>
            <div>
              <p>04 · XEM KHÁCH CŨ TRƯỚC KHI ĐẶT</p>
              <h2>Cứ đọc Google Reviews trước cho yên tâm.</h2>
              <span>Đánh giá của khách cũ là phần bạn có thể tự kiểm tra, không cần chỉ nghe GoVietStay nói.</span>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Mở Google Reviews ↗</a>
            </div>
            <div className={styles.reviewShots}>
              {vietnamReviewScreenshots.slice(0, 2).map((src) => (
                <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer" key={src}>
                  <img src={src} alt="Google Review của GoVietStay" loading="lazy" />
                </a>
              ))}
            </div>
          </section>

          <section id="booking" className={styles.booking}>
            <div className={styles.bookingTitle}>
              <p>05 · XÁC NHẬN GIÁ RỒI MỚI ĐẶT CỌC</p>
              <h2>Chốt ngày, số người và quyền lợi trước; sau đó mới chuyển tiền.</h2>
            </div>
            <VietnamConversion page={page} />
          </section>

          <section className={styles.terms}>
            <p>ĐIỀU KIỆN ĐẶT DỊCH VỤ · VI-2026.08.26</p>
            <h2>Đọc trước vài phút để hai bên cùng rõ.</h2>
            {[
              ["Giá và xác nhận booking", "Giá chỉ được chốt sau khi GoVietStay xác nhận ngày đi, số khách và các dịch vụ đi kèm. Các ưu đãi không tự động cộng dồn nếu không ghi rõ."],
              ["Đặt cọc và VietQR", "Tiền cọc dùng để giữ chỗ hoặc thanh toán trước những dịch vụ cần xuất. Ở bước hiện tại, chuyển khoản chưa tự động xác nhận booking; GoVietStay sẽ kiểm tra tiền rồi gửi xác nhận."],
              ["Vé và dịch vụ của nhà cung cấp", "Vé, khách sạn, cano hoặc dịch vụ đã xuất sẽ theo điều kiện đổi/hủy của nhà cung cấp. Nếu đổi ngày, số người hoặc chương trình, giá có thể thay đổi."],
              ["Trẻ em và thông tin khách", "Vui lòng cung cấp đúng tuổi, chiều cao, số người và hành lý. Nếu thông tin sai làm phát sinh chênh lệch tại điểm tham quan, khách thanh toán phần chênh theo quy định thực tế."],
              ["Tour ghép và giờ đón", "Tour ghép chạy theo giờ chung. Nếu khách đến trễ quá thời gian chờ hoặc không có mặt, dịch vụ có thể bị tính theo điều kiện của booking."],
              ["Thời tiết và trường hợp bất khả kháng", "Khi tour bị ảnh hưởng bởi thời tiết hoặc tình huống ngoài khả năng kiểm soát, GoVietStay sẽ ưu tiên đổi ngày, đổi chương trình phù hợp hoặc hoàn phần dịch vụ chưa sử dụng mà thực tế có thể thu hồi từ nhà cung cấp, theo booking và quy định áp dụng."],
              ["Combo", "Giá combo áp dụng khi dùng đủ các dịch vụ đã nêu. Nếu khách tự bỏ một phần, số tiền hoàn không mặc định được tính bằng cách chia đều tổng combo. Quà tặng không sử dụng không tự đổi thành tiền."],
            ].map(([q, a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}
          </section>

          <section className={styles.faq}>
            <p>HỎI NHANH</p>
            <h2>Những câu khách thường hỏi trước khi đặt</h2>
            {faq.map(([q, a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}
          </section>
        </article>

        <aside>
          <div className={styles.sticky}>
            <div className={styles.stickyPhoto}><img src={visual.gallery[0]} alt={visual.label} loading="lazy" /></div>
            <small>TRƯỚC KHI ĐẶT</small>
            <h3>Kiểm tra ba thứ là đủ.</h3>
            <ol>
              <li>Google Reviews của khách cũ</li>
              <li>Giá và phần bao gồm của đúng ngày đi</li>
              <li>Điều kiện đặt cọc, đổi hoặc hủy</li>
            </ol>
            <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Xem Google Reviews</a>
            <a className={styles.zaloBtn} href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">💬 Hỏi trên Zalo</a>
            {vietnamBusinessConfig.facebookHoTramUrl ? (
              <a className={styles.fb} href={vietnamBusinessConfig.facebookHoTramUrl} target="_blank" rel="noreferrer">Facebook Hồ Tràm Travel</a>
            ) : null}
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <p>CÓ THỂ BẠN ĐANG TÌM</p>
        <h2>Xem thêm các trang liên quan</h2>
        <div>
          {related.map((item) => {
            const v = getVietnamVisuals(item.slug, item.destination);
            return (
              <a key={item.slug} href={`/vi/${item.slug}`}>
                <img src={v.hero} alt={item.h1} loading="lazy" />
                <div><small>{item.destination}</small><b>{item.h1}</b><span>Xem →</span></div>
              </a>
            );
          })}
        </div>
      </section>

      <div className={styles.mobile}>
        <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">💬 Zalo</a>
        <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Review</a>
        <a href="#booking">💳 Giữ chỗ</a>
      </div>
    </main>
  );
}
