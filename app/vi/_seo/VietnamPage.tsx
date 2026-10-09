import type { VietnamSeoPage } from "../../../lib/vietnamSeoPages";
import { vietnamBusinessConfig } from "../../../lib/vietnamBusinessConfig";
import { getVietnamVisuals, vietnamReviewScreenshots } from "../../../lib/vietnamVisuals";
import VietnamConversion from "./VietnamConversion";
import styles from "./VietnamPage.module.css";

type PriceConfig = { sellPrice: number; verified: boolean };
const priceMap = vietnamBusinessConfig.prices as unknown as Record<string, PriceConfig>;

const typeCopy = {
  product: ["Tour / dịch vụ", "Xem lịch đi, giá và những gì đã bao gồm trước khi quyết định."],
  combo: ["Combo", "Dành cho bạn muốn đi vài nơi trong một chuyến và đặt dịch vụ cho gọn."],
  private: ["Tour riêng gia đình", "Có lịch riêng cho gia đình, không ghép với nhóm khách khác."],
  guide: ["Kinh nghiệm", "Một vài lưu ý giúp bạn lên kế hoạch trước khi đặt vé, xe hoặc tour."],
} as const;

function priceLabel(page: VietnamSeoPage) {
  if (!page.priceKey) return page.depositPercent === 0 ? "Xe tiêu chuẩn: không cần cọc" : "Báo giá theo nhóm";
  const price = priceMap[page.priceKey];
  return price?.sellPrice ? `${page.priceKey === "bana" ? "" : "Từ "}${new Intl.NumberFormat("vi-VN").format(price.sellPrice)}đ` : "Hỏi giá nhanh";
}

export default function VietnamPage({
  page,
  related,
}: {
  page: VietnamSeoPage;
  related: VietnamSeoPage[];
}) {
  const canonical = `https://www.govietstay.com/vi/${page.slug}`;
  const isBana = page.slug === "tour-ba-na-hills";
  const copy = isBana ? ["Vé tham quan", "Vé cáp treo Bà Nà Hills kèm buffet trưa, không gồm xe hoặc hướng dẫn viên."] : typeCopy[page.type];
  const visual = getVietnamVisuals(page.slug, page.destination);

  const ticketSchema = isBana ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Vé cáp treo Bà Nà Hills kèm buffet trưa",
    description: "Vé vào Sun World Bà Nà Hills bao gồm cáp treo và buffet trưa. Không bao gồm xe đưa đón và hướng dẫn viên.",
    url: canonical,
    brand: { "@type": "Brand", name: "GoVietStay" },
    offers: { "@type": "Offer", price: priceMap.bana.sellPrice, priceCurrency: "VND", url: canonical, seller: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com" } },
  } : null;

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
    ...(isBana ? [
      ["Vé Bà Nà Hills kèm buffet tại GoVietStay giá bao nhiêu?", "Vé cáp treo kèm buffet trưa đang có giá 1.200.000đ/người lớn, so với giá công bố 1.300.000đ. Bạn gửi ngày đi để bên mình kiểm tra đúng loại vé rồi báo lại trước khi thanh toán."],
      ["Vé Bà Nà 1.200.000đ có bao gồm xe đưa đón không?", "Chưa bạn nhé. Giá 1.200.000đ chỉ gồm vé cáp treo và buffet. Nếu cần xe hoặc hướng dẫn viên, bên mình báo riêng để bạn cân nhắc."],
      ["Trẻ em đi Bà Nà tính giá như thế nào?", "Bạn cho biết chiều cao hoặc tuổi từng bé trong form nhé. Bên mình sẽ kiểm tra loại vé trẻ em theo quy định ở ngày đi."],
      ["Gửi form có được xuất vé ngay không?", "Chưa. Form giúp bên mình nhận đủ thông tin để kiểm tra vé. Khi bạn đồng ý giá và thanh toán theo hướng dẫn, bên mình mới xác nhận và xuất vé."],
      ["Đặt vé Bà Nà cho hè 2027 có giữ giá 1.200.000đ không?", "Chưa thể cam kết giá 1.200.000đ cho hè 2027. Bạn gửi ngày đi dự kiến, bên mình sẽ kiểm tra giá nhà cung cấp ở thời điểm đó rồi báo lại."],
    ] as [string,string][] : []),
    ["Giá trên website đã là giá cuối cùng chưa?", "Với các tour có giá “từ”, tổng tiền còn tùy ngày đi, số khách và dịch vụ đi kèm. Bên mình sẽ báo giá cuối cùng trước khi bạn thanh toán."],
    ["Gửi form rồi có cần thanh toán ngay không?", "Không. Form mới là yêu cầu kiểm tra vé hoặc dịch vụ. Nhân viên sẽ xác nhận tình trạng, giá và hướng dẫn thanh toán trước khi chốt đơn."],
    ["Gia đình tôi có thể đi riêng không?", "Được bạn nhé. Cứ cho bên mình biết ngày đi, số người, tuổi các bé và những nơi cả nhà muốn ghé để sắp lịch phù hợp."],
    ["Tôi muốn xem đánh giá của khách cũ ở đâu?", "Bạn bấm Google Reviews trên trang để xem những đánh giá trực tiếp trên Google Maps."],
  ];

  const faqSchema = isBana ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) } : null;

  const privateLike = page.type === "private" || page.slug.includes("gia-dinh");

  const practicalAdvice = page.slug.includes("cu-lao") || page.slug.includes("cham")
    ? "Cù Lao Chàm đẹp nhất khi biển êm. Bên mình sẽ kiểm tra tình hình biển gần ngày đi rồi mới xác nhận lịch cano."
    : page.slug.includes("ba-na") || page.slug.includes("bana")
      ? "Bà Nà thường đông vào cuối tuần và ngày lễ. Nếu muốn có nhiều thời gian chụp ảnh, bạn nên tính giờ đi sớm và hỏi xe riêng nếu cần."
      : page.slug.includes("hoi-an") || page.slug.includes("rung-dua")
        ? "Nếu đi cả Rừng Dừa và phố cổ Hội An, bạn có thể đi thuyền thúng trước, rồi vào phố cổ lúc chiều mát và ở lại ngắm đèn lồng."
        : page.slug.includes("hue")
          ? "Đi Huế từ Đà Nẵng mất khá nhiều thời gian ngồi xe. Cả nhà nên chọn vài điểm thật sự muốn xem, chừa thời gian ăn trưa và nghỉ ngơi."
          : page.slug.includes("phu-quoc")
            ? "Phú Quốc rộng, nên ở bắc đảo hay nam đảo sẽ ảnh hưởng khá nhiều đến lịch trình. Bạn gửi tên resort để bên mình tính đường đi cho hợp lý."
            : page.slug.includes("san-bay") || page.slug.includes("thue-xe")
              ? "Cần xe riêng thì bạn gửi điểm đón, giờ đi, số người và số vali nhé. Có đủ thông tin, bên mình mới chọn đúng loại xe và báo giá chính xác."
              : "Mỗi gia đình có cách đi chơi khác nhau. Bạn gửi ngày, số người và những điều mình ưu tiên, bên mình sẽ gợi ý lịch phù hợp.";

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {ticketSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ticketSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

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
              <a href="#booking">Xem giá & gửi yêu cầu</a>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Xem đánh giá</a>
            </div>
          </div>

          <aside className={styles.decisionCard}>
            <small>THÔNG TIN NHANH</small>
            <h3>{copy[0]}</h3>
            <p>{copy[1]}</p>
            <strong>{priceLabel(page)}</strong>
            <div><span>Thanh toán</span><b>{isBana ? "Sau khi xác nhận còn vé và giá" : page.depositPercent === 0 ? "Transfer tiêu chuẩn: không cần cọc" : `${page.depositPercent}% sau khi xác nhận`}</b></div>
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
        <div><small>TRƯỚC KHI SO GIÁ</small><b>Nhớ so cùng loại dịch vụ nhé.</b><p>Khi so giá, bạn nhớ xem vé có buffet chưa, có xe không và giá trẻ em tính thế nào. Khác quyền lợi thì giá cũng khác.</p></div>
        <div><small>CÓ NGƯỜI HỖ TRỢ TẠI ĐIỂM ĐẾN</small><b>Có gì chưa rõ, cứ nhắn Zalo.</b><p>Giờ đón hay thời tiết thay đổi, bên mình sẽ kiểm tra thực tế và trao đổi lại để bạn chủ động sắp lịch.</p></div>
      </section>

      {["combo-da-nang-3n2d","combo-da-nang-4n3d","combo-da-nang-gia-dinh","du-lich-da-nang-tu-tuc","tour-rieng-da-nang-gia-dinh","combo-da-nang-3-tour"].includes(page.slug) && (
        <section className={styles.ticketCrosslink}>
          <h2>Muốn mua riêng vé Bà Nà Hills kèm buffet?</h2>
          <p>Vé người lớn từ 1.200.000đ, so với giá công bố 1.300.000đ. Không bắt buộc mua xe hay tour trọn gói; gia đình có thể yêu cầu báo thêm xe riêng.</p>
          <a href="/vi/tour-ba-na-hills">Xem giá vé Bà Nà và gửi yêu cầu →</a>
        </section>
      )}

      {privateLike ? (
        <section className={styles.private}>
          <div className={styles.privateImage}>
            <img src="/happy-travelers/02462467f09771c928865.jpg" alt="Khách GoVietStay" loading="lazy" />
          </div>
          <div className={styles.privateCopy}>
            <p>TOUR RIÊNG GIA ĐÌNH</p>
            <h2>Cả nhà thích đi đâu, mình sắp lịch theo đó.</h2>
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
              <h2>Những điều nên biết trước khi đặt.</h2>
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
            <p>{practicalAdvice}</p>
            <blockquote>“Chọn đúng vé và lịch đi phù hợp thì chuyến đi sẽ nhẹ nhàng hơn nhiều.”</blockquote>
          </section>

          <section className={styles.socialProof}>
            <div>
              <p>04 · XEM KHÁCH CŨ TRƯỚC KHI ĐẶT</p>
              <h2>Xem đánh giá của khách đã đi trước khi quyết định.</h2>
              <span>Bạn có thể mở Google Maps để xem đánh giá và hình ảnh do khách đã đi chia sẻ.</span>
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
              <p>05 · ĐẶT DỊCH VỤ · CÓ ZALO HỖ TRỢ</p>
              <h2>Điền ngày đi và số khách, bên mình kiểm tra rồi liên hệ xác nhận.</h2>
            </div>
            <VietnamConversion page={page} />
          </section>

          <section className={styles.terms}>
            <p>ĐIỀU KIỆN ĐẶT DỊCH VỤ · {vietnamBusinessConfig.policyVersion}</p>
            <h2>Bạn xem qua điều kiện đặt và đổi hủy trước khi chốt nhé.</h2>
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
            <h3>Trước khi đặt, bạn nhớ kiểm tra:</h3>
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
        <a href="#booking">📝 Gửi form</a>
      </div>
    </main>
  );
}
