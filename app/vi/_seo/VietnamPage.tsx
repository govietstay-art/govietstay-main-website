import type { VietnamSeoPage } from "../../../lib/vietnamSeoPages";
import { vietnamBusinessConfig } from "../../../lib/vietnamBusinessConfig";
import { getVietnamVisuals, vietnamReviewScreenshots } from "../../../lib/vietnamVisuals";
import VietnamConversion from "./VietnamConversion";
import styles from "./VietnamPage.module.css";

type PriceConfig = { sellPrice: number; verified: boolean };
const priceMap = vietnamBusinessConfig.prices as unknown as Record<string, PriceConfig>;

const typeCopy = {
  product: ["Tour / dịch vụ", "Giá, quyền lợi và điều kiện được đưa lên sớm để bạn quyết định nhanh hơn."],
  combo: ["Combo", "Tối ưu tổng quyết định, không dùng combo để che giá lẻ hay nhồi dịch vụ."],
  private: ["Private family", "Không ghép khách lạ khi booking private đã xác nhận; lịch bắt đầu từ người đi."],
  guide: ["Cẩm nang", "Hiểu quyết định trước, rồi mới chọn tour/xe/combo nếu thực sự cần."],
} as const;

function priceLabel(page: VietnamSeoPage) {
  if (!page.priceKey) return page.depositPercent === 0 ? "0% cọc với transfer tiêu chuẩn" : "Báo giá theo nhóm";
  const price = priceMap[page.priceKey];
  return price?.sellPrice
    ? `Từ ${new Intl.NumberFormat("vi-VN").format(price.sellPrice)}đ`
    : "Nhận báo giá";
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
    ["Giá website có phải giá cuối cùng không?", "Chỉ sau khi GoVietStay xác nhận ngày đi, số khách, đối tượng khách và cấu phần dịch vụ."],
    ["Chuyển khoản QR có tự xác nhận booking không?", "Không. Cách A được đối soát thủ công; booking chỉ confirmed khi GoVietStay kiểm tra tiền và gửi xác nhận."],
    ["Có thể đi riêng gia đình không?", "Có. Gửi số người, ngày đi, độ tuổi, sở thích và điều không muốn để nhận phương án riêng."],
    ["Google Reviews ở đâu?", "Nút Google Reviews trên trang mở trực tiếp hồ sơ đánh giá thật của GoVietStay."],
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
          <a href="/vi/tour-rieng-da-nang-gia-dinh">Tour riêng</a>
          <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Google Reviews</a>
          <a className={styles.zalo} href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Zalo</a>
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
              <a href="#booking">Xem giá / giữ chỗ</a>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Xem review thật</a>
            </div>
          </div>

          <aside className={styles.decisionCard}>
            <small>30 GIÂY ĐỂ QUYẾT ĐỊNH</small>
            <h3>{copy[0]}</h3>
            <p>{copy[1]}</p>
            <strong>{priceLabel(page)}</strong>
            <div><span>Deposit</span><b>{page.depositPercent === 0 ? "0% transfer" : `${page.depositPercent}% khi đủ điều kiện`}</b></div>
            <div><span>Hỗ trợ</span><b>Zalo + local team</b></div>
            <div><span>Private</span><b>Không ghép khách khi xác nhận private</b></div>
          </aside>
        </div>
      </section>

      <section className={styles.gallery}>
        {visual.gallery.map((src, i) => (
          <div key={src}>
            <img src={src} alt={`${visual.label} ${i + 1}`} loading="lazy" />
            {i === 0 ? <span>Ảnh thật trong hệ thống GoVietStay</span> : null}
          </div>
        ))}
      </section>

      <section className={styles.scan}>
        <div><small>WIIFM</small><b>Bạn được gì?</b><p>{page.description}</p></div>
        <div><small>ĐỪNG MUA CHỈ VÌ GIÁ THẤP</small><b>So đúng quyền lợi.</b><p>Đúng ngày, đúng đối tượng khách, đúng phần bao gồm và đúng điều kiện hoàn/hủy.</p></div>
        <div><small>LOCAL ADVANTAGE</small><b>Có người địa phương để hỏi.</b><p>Thời tiết, giờ đón, vé và tình trạng vận hành có thể đổi; một đầu mối Zalo giảm việc tự ghép thông tin.</p></div>
      </section>

      {privateLike ? (
        <section className={styles.private}>
          <div className={styles.privateImage}>
            <img src="/happy-travelers/02462467f09771c928865.jpg" alt="Khách thật GoVietStay" loading="lazy" />
          </div>
          <div className={styles.privateCopy}>
            <p>PRIVATE FAMILY · KHÔNG PHẢI TOUR MẪU</p>
            <h2>Chuyến đi phải thích nghi với gia đình bạn.</h2>
            <div>
              {[
                "Số người + ngày đi + độ tuổi",
                "Khách sạn / resort",
                "Sở thích và nhịp độ",
                "Món ăn / giờ nghỉ",
                "Điều tuyệt đối không muốn",
              ].map((x, i) => <span key={x}><b>{String(i + 1).padStart(2, "0")}</b>{x}</span>)}
            </div>
            <p className={styles.note}>Private đã xác nhận = không ghép khách lạ. Mức linh hoạt vẫn phụ thuộc giờ mở cửa, vé, thời tiết và điều kiện vận hành thực tế.</p>
            <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Gửi nhu cầu gia đình qua Zalo</a>
          </div>
        </section>
      ) : null}

      <div className={styles.layout}>
        <article>
          <section className={styles.explainer}>
            <div>
              <p>01 · PHÙ HỢP KHI</p>
              <h2>Bạn muốn một quyết định rõ hơn, không chỉ một headline giá.</h2>
              <ul>
                <li>Muốn biết quyền lợi và điều kiện trước khi trả tiền.</li>
                <li>Muốn có một đầu mối Zalo tại điểm đến.</li>
                <li>Đi gia đình và cần tư vấn trẻ em / người lớn tuổi.</li>
              </ul>
            </div>
            <div>
              <p>02 · NÊN HỎI TRƯỚC KHI ĐẶT</p>
              <h2>{page.focus}</h2>
              <ul>
                <li>Ngày đi và số khách thực tế.</li>
                <li>Phần vé / bữa ăn / xe / guide có nằm trong giá hay không.</li>
                <li>Điều kiện đổi ngày, thời tiết và nhà cung cấp.</li>
              </ul>
            </div>
          </section>

          <section className={styles.story}>
            <p>03 · CÁCH GOVIETSTAY TIẾP CẬN</p>
            <h2>{page.h1}</h2>
            <p>{page.description}</p>
            <blockquote>“Không cần mua nhiều hơn. Cần mua đúng hơn cho chuyến đi của bạn.”</blockquote>
          </section>

          <section className={styles.socialProof}>
            <div>
              <p>04 · KHÁCH THẬT, REVIEW THẬT</p>
              <h2>Tự kiểm tra trước khi tin quảng cáo.</h2>
              <span>GoVietStay đưa Google Reviews lên rất gần quyết định thanh toán để khách có thể kiểm tra độc lập.</span>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Mở Google Reviews thật ↗</a>
            </div>
            <div className={styles.reviewShots}>
              {vietnamReviewScreenshots.slice(0, 2).map((src) => (
                <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer" key={src}>
                  <img src={src} alt="Google Review thật của GoVietStay" loading="lazy" />
                </a>
              ))}
            </div>
          </section>

          <section id="booking" className={styles.booking}>
            <div className={styles.bookingTitle}>
              <p>05 · GIÁ → ĐIỀU KIỆN → GIỮ CHỖ</p>
              <h2>Đừng chuyển tiền trước khi biết booking của mình đang giữ cái gì.</h2>
            </div>
            <VietnamConversion page={page} />
          </section>

          <section className={styles.terms}>
            <p>ĐIỀU KIỆN VI-2026.08.26</p>
            <h2>Rõ trước khi trả tiền để bớt tranh luận sau chuyến đi.</h2>
            {[
              ["Giá & booking", "Giá chỉ khóa sau xác nhận ngày đi, số khách, đối tượng khách và cấu phần. Khuyến mãi không tự động cộng dồn."],
              ["Deposit & VietQR", "Khoản cọc dùng giữ chỗ/chi trả dịch vụ cần xuất. Cách A đối soát thủ công; QR hoặc chuyển khoản chưa tự xác nhận booking."],
              ["Vé và bên thứ ba", "Vé, hotel, cano hoặc dịch vụ đã xuất áp dụng điều kiện đổi-hủy của nhà cung cấp. Thay đổi ngày/số người/cấu hình có thể làm giá thay đổi."],
              ["Trẻ em & thông tin", "Khách cung cấp đúng tuổi, chiều cao, số người, hành lý. Chênh lệch do thông tin sai được xử lý theo chính sách thực tế."],
              ["Tour ghép & no-show", "Tour ghép theo giờ chung. Đến trễ vượt thời gian chờ hợp lý hoặc no-show có thể mất dịch vụ theo điều kiện booking."],
              ["Thời tiết & bất khả kháng", "Ưu tiên đổi ngày/đổi chương trình hoặc hoàn phần chưa sử dụng mà GoVietStay thực tế thu hồi được từ nhà cung cấp, tùy booking và pháp luật áp dụng."],
              ["Combo", "Giá combo áp dụng đủ cấu phần. Tự bỏ một dịch vụ không đồng nghĩa lấy tổng combo chia đều để hoàn; quà tặng không mặc nhiên quy đổi tiền."],
            ].map(([q, a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}
          </section>

          <section className={styles.faq}>
            <p>FAQ</p>
            <h2>Câu hỏi trước khi đặt</h2>
            {faq.map(([q, a]) => <details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}
          </section>
        </article>

        <aside>
          <div className={styles.sticky}>
            <div className={styles.stickyPhoto}><img src={visual.gallery[0]} alt={visual.label} loading="lazy" /></div>
            <small>TRƯỚC KHI ĐẶT</small>
            <h3>Kiểm tra 3 thứ.</h3>
            <ol>
              <li>Google Reviews thật</li>
              <li>Giá + quyền lợi đúng booking</li>
              <li>Điều kiện deposit / đổi hủy</li>
            </ol>
            <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Google Reviews</a>
            <a className={styles.zaloBtn} href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">💬 Hỏi Zalo</a>
            {vietnamBusinessConfig.facebookHoTramUrl ? (
              <a className={styles.fb} href={vietnamBusinessConfig.facebookHoTramUrl} target="_blank" rel="noreferrer">Facebook Hồ Tràm Travel</a>
            ) : null}
          </div>
        </aside>
      </div>

      <section className={styles.related}>
        <p>XEM TIẾP</p>
        <h2>Những quyết định liên quan</h2>
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
