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
  title: { absolute: "GoVietStay Việt Nam | Tour Đà Nẵng, Hội An, Huế & Phú Quốc 2026" },
  description:
    "Tour, combo, xe riêng và kinh nghiệm du lịch cho khách Việt tại Đà Nẵng, Hội An, Huế và Phú Quốc. Giá từ rõ ràng, ảnh khách thật, Google Reviews và hỗ trợ Zalo.",
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

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

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
            <h1>Đi chơi cho thoải mái. <em>Việc lặt vặt để GoVietStay lo.</em></h1>
            <h2>
              Không cần mở cả chục tab để so từng tour. Xem giá từ, ảnh thật, combo và điều kiện trước; cần hỏi gì thì nhắn Zalo luôn.
            </h2>
            <div className={styles.heroActions}>
              <a href="#tour-ban-chay">Xem tour nổi bật</a>
              <a href="#combo">🔥 Xem combo</a>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Xem đánh giá</a>
            </div>
            <div className={styles.heroProof}>
              <span>✓ Báo rõ giá trước khi chốt</span>
              <span>✓ Có đặt cọc VietQR</span>
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
        <a href="/vi/du-lich-da-nang-tu-tuc"><b>Tự túc Đà Nẵng</b><span>Xem lịch trình & chi phí →</span></a>
        <a href="/vi/combo-da-nang-3-tour"><b>Combo Đà Nẵng</b><span>Gom tour cho đỡ mất công →</span></a>
        <a href="/vi/tour-rieng-da-nang-gia-dinh"><b>Gia đình đi riêng</b><span>Không ghép khách khác →</span></a>
        <a href="/vi/du-lich-phu-quoc-tu-tuc"><b>Đi Phú Quốc</b><span>Tour đảo · resort · xe →</span></a>
      </section>

      <section className={styles.section} id="tour-ban-chay">
        <div className={styles.sectionHead}>
          <div><p>01 · TOUR NỔI BẬT</p><h2>Những tour khách Việt thường hỏi nhiều nhất.</h2></div>
          <span>Giá bên dưới là mức “từ”. Ngày đi, số khách và quyền lợi cụ thể sẽ được xác nhận lại trước khi bạn đặt cọc.</span>
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

      <section className={styles.comboZone} id="combo">
        <div className={styles.comboIntro}>
          <p>02 · ĐI NHIỀU THÌ XEM COMBO</p>
          <h2>Đã đi vài tour thì gom lại cho đỡ mất công.</h2>
          <span>Combo phù hợp khi bạn thật sự muốn đi nhiều điểm. Mình gom chung để dễ xếp lịch, dễ theo dõi và thường có tổng giá tốt hơn mua từng phần riêng.</span>
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
          <h2>Chưa cần chọn tour. Cứ nói cho GoVietStay biết nhà mình đi mấy người.</h2>
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
          <div><p>04 · KHÁCH ĐÃ ĐI NÓI GÌ?</p><h2>Anh/chị cứ xem review trước rồi hãy đặt.</h2></div>
          <span>Đây là ảnh khách thật và ảnh chụp review đang có trong hệ thống GoVietStay. Không cần chỉ nghe lời quảng cáo từ chính chúng tôi.</span>
        </div>

        <div className={styles.realGuestStrip}>
          {vietnamRealGuests.map((src, i) => (
            <div key={src}><img src={src} alt={`Khách GoVietStay ${i+1}`} loading="lazy" /></div>
          ))}
        </div>

        <div className={styles.reviewGrid}>
          <div className={styles.reviewCallout}>
            <small>GOOGLE REVIEWS</small>
            <h3>Muốn biết dịch vụ ra sao, xem khách cũ là nhanh nhất.</h3>
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
          <h2>Phú Quốc rộng, ở sai khu là mỗi ngày mất khá nhiều thời gian đi xe.</h2>
          <p>Vì vậy GoVietStay sẽ hỏi resort trước rồi mới gợi ý tour đảo, xe riêng hay combo. Đi đúng khu sẽ nhẹ hơn nhiều.</p>
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
          <div><p>06 · ĐẶT TOUR KHÔNG CẦN RẮC RỐI</p><h2>Chỉ cần ba bước là đủ.</h2></div>
        </div>
        <div className={styles.howGrid}>
          <div><b>01</b><h3>Chọn tour, combo hoặc đi riêng</h3><p>Nếu chưa biết chọn gì, cứ gửi ngày và số người trước.</p></div>
          <div><b>02</b><h3>GoVietStay xác nhận giá</h3><p>Kiểm tra ngày đi, trẻ em, phần bao gồm và điều kiện trước khi thu cọc.</p></div>
          <div><b>03</b><h3>Giữ chỗ</h3><p>Booking đủ điều kiện có thể đặt cọc bằng VietQR; sau khi kiểm tra tiền, GoVietStay gửi xác nhận.</p></div>
        </div>
      </section>

      <section className={styles.directory}>
        <div className={styles.sectionHead}>
          <div><p>07 · TÌM NHANH THEO NHU CẦU</p><h2>Tour, combo, đi riêng và kinh nghiệm tự túc.</h2></div>
          <span>Nếu đang tìm trên Google một câu hỏi cụ thể, phần dưới sẽ giúp đi thẳng đến đúng trang thay vì đọc hết cả website.</span>
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
          <h2>Bạn gửi ngày đi và số người. Phần còn lại mình cùng sắp cho gọn.</h2>
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
