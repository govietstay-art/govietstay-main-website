// GVS-VI-UPGRADE-V1
import type { Metadata } from "next";
import { vietnamSeoPages } from "../../lib/vietnamSeoPages";
import { vietnamBusinessConfig } from "../../lib/vietnamBusinessConfig";
import {
  vietnamComboVisuals,
  vietnamFeaturedProducts,
  vietnamHubHero,
  vietnamRealGuests,
  vietnamReviewScreenshots,
} from "../../lib/vietnamVisuals";
import styles from "./VietnamHub.module.css";

export const metadata: Metadata = {
  title: { absolute: "Vé Bà Nà + buffet giá tốt | Tour Đà Nẵng, Hội An, Phú Quốc | GoVietStay" },
  description:
    "Vé Bà Nà Hills kèm buffet 1.200.000đ/người lớn, tour riêng, combo gia đình, xe và trải nghiệm Đà Nẵng – Hội An – Huế – Phú Quốc. Đặt vé qua form, nhận mã yêu cầu và hỗ trợ Zalo.",
  alternates: {
    canonical: "https://www.govietstay.com/vi",
    languages: { "vi-VN": "https://www.govietstay.com/vi" },
  },
  robots: { index: true, follow: true },
};

type PriceConfig = { sellPrice: number; verified: boolean };
const priceMap = vietnamBusinessConfig.prices as unknown as Record<string, PriceConfig>;
const bySlug = (slug: string) => vietnamSeoPages.find((page) => page.slug === slug);
const groups = {
  product: vietnamSeoPages.filter((page) => page.type === "product"),
  combo: vietnamSeoPages.filter((page) => page.type === "combo"),
  private: vietnamSeoPages.filter((page) => page.type === "private"),
  guide: vietnamSeoPages.filter((page) => page.type === "guide"),
};

function priceLabel(slug: string) {
  const page = bySlug(slug);
  if (!page?.priceKey) return "Hỏi giá nhanh";
  const price = priceMap[page.priceKey];
  return price?.sellPrice ? `Từ ${new Intl.NumberFormat("vi-VN").format(price.sellPrice)}đ` : "Hỏi giá nhanh";
}

export default function VietnamHub() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GoVietStay Việt Nam",
    url: "https://www.govietstay.com/vi",
    inLanguage: "vi-VN",
  };

  const ticketFaq = [
    ["Giá vé Bà Nà Hills kèm buffet trên GoVietStay là bao nhiêu?", "Vé cáp treo kèm buffet trưa đang được GoVietStay bán với giá 1.200.000đ/người lớn, thấp hơn giá công bố 1.300.000đ. Bạn gửi ngày đi để bên mình kiểm tra vé và xác nhận lại trước khi thanh toán."],
    ["Giá 1.200.000đ đã gồm xe và hướng dẫn viên chưa?", "Chưa bạn nhé. Giá này chỉ gồm vé cáp treo và buffet. Nếu cần xe đưa đón hoặc hướng dẫn viên, bạn có thể yêu cầu báo giá riêng."],
    ["Gia đình có trẻ em mua vé ra sao?", "Bạn cho bên mình biết chiều cao hoặc tuổi của từng bé nhé. Mình sẽ kiểm tra loại vé và giá trẻ em phù hợp trước khi xuất vé."],
    ["Vé Bà Nà cho hè 2027 có giữ giá 1.200.000đ không?", "Chưa thể giữ giá này cho hè 2027. Khi bạn có ngày đi dự kiến, bên mình sẽ kiểm tra bảng giá mới rồi báo lại trước khi bạn quyết định."],
  ];
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ticketFaq.map(([question,answer])=>({ "@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer} })) }) }} />

      <div className={styles.top}>
        <span>GOVIETSTAY VIỆT NAM</span>
        <b>Đà Nẵng · Hội An · Huế · Phú Quốc</b>
        <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Xem Google Reviews ↗</a>
      </div>

      <header className={styles.nav}>
        <a className={styles.brand} href="/">
          <img src="/govietstay-logo.jpg" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>DU LỊCH & HỖ TRỢ TẠI ĐỊA PHƯƠNG</small></span>
        </a>
        <nav>
          <a href="#tour-ban-chay">Tour nổi bật</a>
          <a href="#combo">Combo</a>
          <a href="#private">Đi riêng gia đình</a>
          <a href="#why">Vì sao GoVietStay</a>
          <a href="#review">Khách đã đi</a>
          <a className={styles.zalo} href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Nhắn Zalo</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <img src={vietnamHubHero.main} alt="Bà Nà Hills - GoVietStay" fetchPriority="high" />
          <div className={styles.heroShade} />
          <div className={styles.heroCopy}>
            <p>GIÁ TỪ RÕ RÀNG · ẢNH KHÁCH THẬT · CÓ NGƯỜI HỖ TRỢ TẠI ĐIỂM ĐẾN</p>
            <h1>Đi chơi theo cách mình thích. <em>Vé, xe hay tour, cần gì cứ hỏi GoVietStay.</em></h1>
            <h2>
              Bạn đang tìm vé tham quan, xe riêng hay tour cho cả gia đình? Xem giá và các lựa chọn ngay trên trang. Chỗ nào chưa rõ, cứ nhắn Zalo, bên mình kiểm tra giúp.
            </h2>
            <div className={styles.heroActions}>
              <a href="/vi/tour-ba-na-hills">Vé Bà Nà + buffet 1.200.000đ</a>
              <a href="#combo">🔥 Xem combo</a>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Xem đánh giá</a>
            </div>
            <div className={styles.heroProof}>
              <span>✓ Báo rõ giá trước khi chốt</span>
              <span>✓ Gửi yêu cầu trước, xác nhận rồi mới thanh toán</span>
              <span>✓ Tour riêng không ghép khách</span>
            </div>
          </div>
        </div>

        <div className={styles.heroMosaic}>
          <a href="/vi/tour-cu-lao-cham" className={styles.visualTile}>
            <img src={vietnamHubHero.cham} alt="Khách thật tại Cù Lao Chàm" />
            <span><small>ĐI BIỂN</small><b>Cù Lao Chàm</b></span>
          </a>
          <a href="/vi/tour-hoi-an-rung-dua" className={styles.visualTile}>
            <img src={vietnamHubHero.hoiAn} alt="Khách đi thuyền đèn lồng Hội An" />
            <span><small>CHIỀU & TỐI</small><b>Hội An</b></span>
          </a>
          <a href="/vi/tour-3-dao-phu-quoc" className={`${styles.visualTile} ${styles.visualWide}`}>
            <img src={vietnamHubHero.phuQuoc} alt="Tour đảo Phú Quốc" />
            <span><small>BIỂN ĐẢO</small><b>Phú Quốc</b></span>
          </a>
        </div>
      </section>

      <section className={styles.quickIntent}>
        <a href="/vi/tour-ba-na-hills"><b>Vé Bà Nà + buffet 1.200.000đ</b><span>Giá công bố 1.300.000đ · hỏi ngày còn vé →</span></a>
        
        <a href="/vi/combo-da-nang-3-tour"><b>Combo Đà Nẵng</b><span>Gom tour cho đỡ mất công →</span></a>
        <a href="/vi/tour-rieng-da-nang-gia-dinh"><b>Gia đình đi riêng</b><span>Không ghép khách khác →</span></a>
        <a href="/vi/du-lich-phu-quoc-tu-tuc"><b>Đi Phú Quốc</b><span>Tour đảo · resort · xe →</span></a>
      </section>

      <section className={styles.why} id="why">
        <div className={styles.whyIntro}>
          <p>GOVIETSTAY KHÁC Ở ĐÂU?</p>
          <h2>Đặt vé hay chọn tour, rõ ràng ngay từ đầu vẫn tốt hơn.</h2>
          <span>Trước khi đặt, bạn cần biết giá bao gồm những gì, lịch đi có phù hợp với cả nhà không, và nếu phát sinh thay đổi thì ai sẽ hỗ trợ.</span>
        </div>
        <div className={styles.whyGrid}>
          <article>
            <b>01</b>
            <h3>Nói rõ trước khi nhận cọc</h3>
            <p>Giá bao nhiêu, có xe hay không, giờ đi thế nào — bên mình nói rõ trước khi bạn quyết định.</p>
          </article>
          <article>
            <b>02</b>
            <h3>Sắp theo người đi</h3>
            <p>Có trẻ nhỏ hoặc người lớn tuổi đi cùng? Mình có thể bàn lại giờ khởi hành và những điểm nên ghé để cả nhà đỡ mệt.</p>
          </article>
          <article>
            <b>03</b>
            <h3>Có người hỗ trợ tại điểm đến</h3>
            <p>Nếu thời tiết đổi hoặc cần hỏi giờ đón, bạn có thể liên hệ trực tiếp với đội ngũ địa phương.</p>
          </article>
        </div>
      </section>

      <section className={styles.section} id="tour-ban-chay">
        <div className={styles.sectionHead}>
          <div><p>01 · VÉ THAM QUAN & TOUR</p><h2>Vé Bà Nà giá tốt, tour địa phương và combo linh hoạt.</h2></div>
          <span>Vé Bà Nà kèm buffet hiện có giá 1.200.000đ/người lớn. Với các tour khác, bên mình sẽ kiểm tra giá theo ngày, số khách và những dịch vụ bạn chọn.</span>
        </div>
        <div className={styles.productGrid}>
          {vietnamFeaturedProducts.map((item) => {
            const page = bySlug(item.slug);
            if (!page) return null;
            return (
              <a className={styles.productCard} href={`/vi/${item.slug}`} key={item.slug}>
                <div className={styles.productImage}>
                  <img src={item.image} alt={page.h1} loading="lazy" />
                  <span>{item.tag}</span>
                </div>
                <div className={styles.productBody}>
                  <small>{page.destination}</small>
                  <h3>{page.h1}</h3>
                  <p>{item.benefit}</p>
                  <div><strong>{priceLabel(item.slug)}</strong><b>Xem chi tiết →</b></div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className={styles.ticketAnswers} aria-label="Giải đáp đặt vé Bà Nà Hills và combo gia đình">
        <div><p>VÉ BÀ NÀ HILLS · ĐẶT DỄ, CÓ NGƯỜI HỖ TRỢ</p><h2>Mua vé Bà Nà kèm buffet, muốn thêm xe cũng được.</h2><span>Bạn chỉ mua vé cũng được. Nếu cần xe đưa đón hoặc tour riêng cho gia đình, bên mình sẽ báo giá thêm để bạn cân nhắc. Cứ gửi ngày đi và số người qua form, hoặc hỏi nhanh qua Zalo.</span><a href="/vi/tour-ba-na-hills#booking">Xem vé Bà Nà 1.200.000đ và gửi form →</a></div>
        <div>{ticketFaq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <section className={styles.comboZone} id="combo">
        <div className={styles.comboIntro}>
          <p>02 · ĐI NHIỀU THÌ XEM COMBO</p>
          <h2>Đi nhiều điểm? Xem thử combo cho tiện sắp lịch.</h2>
          <span>Nếu dự định đi vài nơi trong cùng chuyến, bạn có thể xem combo để đỡ phải đặt từng dịch vụ. Bên mình sẽ ghi rõ các khoản bao gồm để bạn so sánh trước khi chọn.</span>
          <a href="/vi/combo-da-nang-3-tour">Xem combo Đà Nẵng 3 tour →</a>
        </div>
        <div className={styles.comboCards}>
          {vietnamComboVisuals.map((combo) => (
            <a href={`/vi/${combo.slug}`} key={combo.slug}>
              <img src={combo.image} alt={combo.title} loading="lazy" />
              <div>
                <small>{combo.kicker}</small>
                <h3>{combo.title}</h3>
                <p>{combo.note}</p>
                <b>Xem combo →</b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.privateZone} id="private">
        <div className={styles.privatePhoto}>
          <img src="/happy-travelers/02462467f09771c928865.jpg" alt="Khách thật GoVietStay" loading="lazy" />
          <div><small>TOUR RIÊNG GIA ĐÌNH</small><b>Nhà mình đi thế nào thì lịch được sắp như thế.</b></div>
        </div>
        <div className={styles.privateCopy}>
          <p>03 · KHÔNG GHÉP KHÁCH KHÁC</p>
          <h2>Cả nhà muốn đi riêng? Bạn cứ gửi ngày và số người trước.</h2>
          <div className={styles.questions}>
            {[
              ["01","Đi bao nhiêu người?"],
              ["02","Ngày nào?"],
              ["03","Có bé nhỏ hoặc người lớn tuổi không?"],
              ["04","Thích biển, ăn uống, chụp hình hay lịch sử?"],
              ["05","Có điều gì cả nhà không thích?"],
            ].map(([n,q]) => <div key={n}><b>{n}</b><span>{q}</span></div>)}
          </div>
          <p className={styles.privateNote}>Nếu đã chốt tour riêng thì không ghép khách lạ. Giờ đi, giờ nghỉ và số điểm sẽ được sắp theo gia đình trong phạm vi giờ mở cửa, vé và điều kiện thực tế.</p>
          <div className={styles.privateActions}>
            <a href="/vi/tour-rieng-da-nang-gia-dinh">Xem tour riêng gia đình</a>
            <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Nhắn nhu cầu qua Zalo</a>
          </div>
        </div>
      </section>

      <section className={styles.reviewZone} id="review">
        <div className={styles.sectionHead}>
          <div><p>04 · KHÁCH ĐÃ ĐI NÓI GÌ?</p><h2>Xem khách cũ đánh giá thế nào rồi hãy chọn.</h2></div>
          <span>Bên dưới có ảnh những chuyến đi thực tế và đánh giá khách để lại. Bạn có thể mở Google Maps xem trực tiếp trước khi đặt.</span>
        </div>

        <div className={styles.realGuestStrip}>
          {vietnamRealGuests.map((src, i) => (
            <div key={src}><img src={src} alt={`Khách GoVietStay ${i+1}`} loading="lazy" /></div>
          ))}
        </div>

        <div className={styles.reviewGrid}>
          <div className={styles.reviewCallout}>
            <small>GOOGLE REVIEWS</small>
            <h3>Muốn yên tâm hơn, cứ đọc đánh giá của khách đã đi.</h3>
            <p>Mở Google Maps, đọc các đánh giá gần đây và xem GoVietStay xử lý phản hồi của khách như thế nào.</p>
            <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Mở Google Reviews ↗</a>
          </div>
          {vietnamReviewScreenshots.map((src) => (
            <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer" className={styles.reviewShot} key={src}>
              <img src={src} alt="Ảnh chụp Google Review của GoVietStay" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.phuQuoc}>
        <div className={styles.phuImage}><img src="/tour/phuquoc/tour-06-3.jpg" alt="Phú Quốc GoVietStay" loading="lazy" /></div>
        <div className={styles.phuCopy}>
          <p>05 · PHÚ QUỐC</p>
          <h2>Ở Phú Quốc, chọn đúng khu lưu trú sẽ tiết kiệm nhiều thời gian đi lại.</h2>
          <p>Bạn ở Bãi Trường, Grand World hay phía Nam đảo? Biết khu vực lưu trú, bên mình sẽ gợi ý lịch đi đảo, xe hoặc combo phù hợp hơn.</p>
          <div>
            <a href="/vi/tour-3-dao-phu-quoc">Tour 3 đảo</a>
            <a href="/vi/tour-4-dao-phu-quoc-cap-treo">4 đảo + Hòn Thơm</a>
            <a href="/vi/combo-phu-quoc-4n3d">Combo 4N3Đ</a>
            <a href="/vi/tour-rieng-phu-quoc-gia-dinh">Gia đình đi riêng</a>
          </div>
        </div>
      </section>

      <section className={styles.how}>
        <div className={styles.sectionHead}>
          <div><p>06 · ĐẶT TOUR KHÔNG CẦN RẮC RỐI</p><h2>Đặt dịch vụ với GoVietStay như thế nào?</h2></div>
        </div>
        <div className={styles.howGrid}>
          <div><b>01</b><h3>Chọn tour, combo hoặc đi riêng</h3><p>Nếu chưa biết chọn gì, cứ gửi ngày và số người trước.</p></div>
          <div><b>02</b><h3>GoVietStay xác nhận giá</h3><p>Kiểm tra ngày đi, trẻ em, phần bao gồm và điều kiện trước khi thu cọc.</p></div>
          <div><b>03</b><h3>Giữ chỗ</h3><p>Sau khi thống nhất chương trình và giá, bên mình hướng dẫn thanh toán rồi gửi xác nhận đặt dịch vụ.</p></div>
        </div>
      </section>

      <section className={styles.directory}>
        <div className={styles.sectionHead}>
          <div><p>07 · TÌM NHANH THEO NHU CẦU</p><h2>Tour, combo, đi riêng và kinh nghiệm tự túc.</h2></div>
          <span>Bạn có thể chọn ngay điểm đến hoặc loại dịch vụ mình cần, không phải đọc hết các trang.</span>
        </div>
        <div className={styles.directoryGrid}>
          {[
            ["Tour & xe", groups.product],
            ["Combo", groups.combo],
            ["Tour riêng", groups.private],
            ["Kinh nghiệm", groups.guide],
          ].map(([label, items]) => (
            <div key={label as string}>
              <h3>{label as string}</h3>
              {(items as typeof vietnamSeoPages).map((page) => (
                <a href={`/vi/${page.slug}`} key={page.slug}>{page.h1}<span>→</span></a>
              ))}
            </div>
          ))}
        </div>
      </section>

      {vietnamBusinessConfig.facebookHoTramUrl ? (
        <section className={styles.facebook}>
          <div>
            <small>FACEBOOK HỒ TRÀM TRAVEL</small>
            <h2>Muốn xem thêm deal và câu chuyện chuyến đi, ghé Facebook Hồ Tràm Travel.</h2>
            <p>Facebook để xem nội dung và cập nhật; website để kiểm tra tour, giá và điều kiện trước khi đặt.</p>
          </div>
          <a href={vietnamBusinessConfig.facebookHoTramUrl} target="_blank" rel="noreferrer">Mở Facebook ↗</a>
        </section>
      ) : null}

      <section className={styles.final}>
        <img src="/tour/cham-island/guest-pickup.jpg" alt="GoVietStay đón khách" loading="lazy" />
        <div>
          <p>GOVIETSTAY · HỖ TRỢ TẠI ĐỊA PHƯƠNG</p>
          <h2>Có ngày đi dự kiến rồi? Gửi bên mình số người và nơi muốn đến, mình tư vấn tiếp nhé.</h2>
          <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Nhắn Zalo cho GoVietStay</a>
        </div>
      </section>

      <div className={styles.mobile}>
        <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">💬 Zalo</a>
        <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Review</a>
        <a href="#combo">🔥 Combo</a>
      </div>
    </main>
  );
}
