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
    "Tour, combo, xe riêng và cẩm nang cho khách Việt. Ảnh khách thật, Google Reviews thật, Zalo, deposit VietQR và tour riêng gia đình.",
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
  if (!page?.priceKey) return "Nhận báo giá";
  const price = priceMap[page.priceKey];
  return price?.verified
    ? `Từ ${new Intl.NumberFormat("vi-VN").format(price.sellPrice)}đ`
    : "Kiểm tra giá hôm nay";
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
        <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Google Reviews thật ↗</a>
      </div>

      <header className={styles.nav}>
        <a className={styles.brand} href="/">
          <img src="/govietstay-logo.jpg" alt="GoVietStay" />
          <span><b>GoVietStay</b><small>VIỆT NAM LOCAL ADVANTAGE</small></span>
        </a>
        <nav>
          <a href="#tour-ban-chay">Tour bán chạy</a>
          <a href="#combo">Combo</a>
          <a href="#private">Tour riêng</a>
          <a href="#review">Khách thật</a>
          <a className={styles.zalo} href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Hỏi Zalo</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <img src={vietnamHubHero.main} alt="Bà Nà Hills - GoVietStay" fetchPriority="high" />
          <div className={styles.heroShade} />
          <div className={styles.heroCopy}>
            <p>GIÁ RÕ · REVIEW THẬT · CÓ NGƯỜI ĐỊA PHƯƠNG HỖ TRỢ</p>
            <h1>Đi Việt Nam theo cách <em>dễ quyết định hơn.</em></h1>
            <h2>
              Đừng mất hàng giờ mở tab so tour. Xem ảnh thật, quyền lợi, combo, điều kiện và cách giữ chỗ ngay trên một hệ thống.
            </h2>
            <div className={styles.heroActions}>
              <a href="#tour-ban-chay">Xem tour bán chạy</a>
              <a href="#combo">🔥 Xem combo</a>
              <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">⭐ Google Reviews</a>
            </div>
            <div className={styles.heroProof}>
              <span>✓ Giá khóa sau xác nhận</span>
              <span>✓ Deposit VietQR</span>
              <span>✓ Private không ghép khách</span>
            </div>
          </div>
        </div>

        <div className={styles.heroMosaic}>
          <a href="/vi/tour-cu-lao-cham" className={styles.visualTile}>
            <img src={vietnamHubHero.cham} alt="Khách thật tại Cù Lao Chàm" />
            <span><small>BIỂN</small><b>Cù Lao Chàm</b></span>
          </a>
          <a href="/vi/tour-hoi-an-rung-dua" className={styles.visualTile}>
            <img src={vietnamHubHero.hoiAn} alt="Khách đi thuyền đèn lồng Hội An" />
            <span><small>BUỔI TỐI</small><b>Hội An</b></span>
          </a>
          <a href="/vi/tour-3-dao-phu-quoc" className={`${styles.visualTile} ${styles.visualWide}`}>
            <img src={vietnamHubHero.phuQuoc} alt="Tour đảo Phú Quốc" />
            <span><small>ĐẢO NGỌC</small><b>Phú Quốc</b></span>
          </a>
        </div>
      </section>

      <section className={styles.quickIntent}>
        <a href="/vi/du-lich-da-nang-tu-tuc"><b>Đà Nẵng tự túc</b><span>Lịch trình · chi phí →</span></a>
        <a href="/vi/combo-da-nang-3-tour"><b>Combo Đà Nẵng</b><span>Giảm việc phải tìm 3 lần →</span></a>
        <a href="/vi/tour-rieng-da-nang-gia-dinh"><b>Gia đình đi riêng</b><span>Không ghép khách →</span></a>
        <a href="/vi/du-lich-phu-quoc-tu-tuc"><b>Phú Quốc</b><span>Tour đảo · resort · xe →</span></a>
      </section>

      <section className={styles.section} id="tour-ban-chay">
        <div className={styles.sectionHead}>
          <div><p>01 · CHỌN NHANH</p><h2>Những trải nghiệm khách Việt dễ bắt đầu nhất.</h2></div>
          <span>Ảnh đang dùng là ảnh tour/khách thật đã có trong hệ thống GoVietStay. Giá chỉ hiển thị khi chi phí đã được xác minh.</span>
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
                  <div><strong>{priceLabel(item.slug)}</strong><b>Xem tour →</b></div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className={styles.comboZone} id="combo">
        <div className={styles.comboIntro}>
          <p>02 · VŨ KHÍ CHO KHÁCH VIỆT</p>
          <h2>Combo không phải để nhồi thêm dịch vụ.</h2>
          <span>Combo tốt là khi bạn thực sự cần nhiều phần và tổng quyết định trở nên đơn giản hơn.</span>
          <a href="/vi/combo-da-nang-3-tour">Xem cách GoVietStay tính combo →</a>
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
          <div><small>PRIVATE FAMILY</small><b>Chuyến đi phải thích nghi với gia đình.</b></div>
        </div>
        <div className={styles.privateCopy}>
          <p>03 · RIÊNG TƯ THEO ĐÚNG NGHĨA</p>
          <h2>Không cần chọn tour trước. Hãy nói gia đình bạn gồm ai.</h2>
          <div className={styles.questions}>
            {[
              ["01","Bao nhiêu người?"],
              ["02","Ngày nào?"],
              ["03","Có trẻ em / người lớn tuổi?"],
              ["04","Thích ăn, biển, ảnh hay lịch sử?"],
              ["05","Điều gì tuyệt đối không muốn?"],
            ].map(([n,q]) => <div key={n}><b>{n}</b><span>{q}</span></div>)}
          </div>
          <p className={styles.privateNote}>Nếu booking được xác nhận là private: không ghép khách lạ. Giờ nghỉ, nhịp độ và điểm bỏ qua được thiết kế theo nhóm trong phạm vi vận hành thực tế.</p>
          <div className={styles.privateActions}>
            <a href="/vi/tour-rieng-da-nang-gia-dinh">Thiết kế tour riêng</a>
            <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Gửi 5 thông tin qua Zalo</a>
          </div>
        </div>
      </section>

      <section className={styles.reviewZone} id="review">
        <div className={styles.sectionHead}>
          <div><p>04 · BẰNG CHỨNG TRƯỚC QUẢNG CÁO</p><h2>Đừng chỉ nghe GoVietStay nói.</h2></div>
          <span>Xem khách thật và ảnh chụp review thật đang có trong thư viện của GoVietStay, rồi tự quyết định.</span>
        </div>

        <div className={styles.realGuestStrip}>
          {vietnamRealGuests.map((src, i) => (
            <div key={src}><img src={src} alt={`Khách thật GoVietStay ${i+1}`} loading="lazy" /></div>
          ))}
        </div>

        <div className={styles.reviewGrid}>
          <div className={styles.reviewCallout}>
            <small>GOOGLE REVIEWS</small>
            <h3>Review thật quan trọng hơn một lời hứa đẹp.</h3>
            <p>Không cần tin headline của chúng tôi. Mở Google Maps, đọc các đánh giá thật và xem cách GoVietStay trả lời khách.</p>
            <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Mở Google Reviews thật ↗</a>
          </div>
          {vietnamReviewScreenshots.map((src) => (
            <a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank" rel="noreferrer" className={styles.reviewShot} key={src}>
              <img src={src} alt="Ảnh chụp Google Review thật của GoVietStay" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.phuQuoc}>
        <div className={styles.phuImage}><img src="/tour/phuquoc/tour-06-3.jpg" alt="Phú Quốc GoVietStay" loading="lazy" /></div>
        <div className={styles.phuCopy}>
          <p>05 · PHÚ QUỐC LÀ TRỤ CỘT, KHÔNG PHẢI PHẦN PHỤ</p>
          <h2>Đảo rộng. Chọn đúng khu ở trước khi chọn danh sách điểm.</h2>
          <p>GoVietStay tách rõ tour đảo, transfer, xe riêng và combo theo thời gian thật của khách — để giảm zig-zag và thời gian ngồi xe.</p>
          <div>
            <a href="/vi/tour-3-dao-phu-quoc">3 đảo</a>
            <a href="/vi/tour-4-dao-phu-quoc-cap-treo">4 đảo + Hòn Thơm</a>
            <a href="/vi/combo-phu-quoc-4n3d">Combo 4N3Đ</a>
            <a href="/vi/tour-rieng-phu-quoc-gia-dinh">Private family</a>
          </div>
        </div>
      </section>

      <section className={styles.how}>
        <div className={styles.sectionHead}>
          <div><p>06 · ÍT BƯỚC HƠN</p><h2>Từ Google đến booking chỉ nên có 3 quyết định.</h2></div>
        </div>
        <div className={styles.howGrid}>
          <div><b>01</b><h3>Chọn kiểu chuyến đi</h3><p>Tour lẻ, combo hay private family.</p></div>
          <div><b>02</b><h3>Xác nhận giá & điều kiện</h3><p>Ngày, số người, trẻ em, quyền lợi và điều khoản trước khi trả tiền.</p></div>
          <div><b>03</b><h3>Giữ chỗ</h3><p>VietQR/deposit khi đủ điều kiện; GoVietStay kiểm tra tiền rồi xác nhận booking.</p></div>
        </div>
      </section>

      <section className={styles.directory}>
        <div className={styles.sectionHead}>
          <div><p>07 · PHỦ TOÀN HÀNH TRÌNH TÌM KIẾM</p><h2>Tour, combo, private và cẩm nang.</h2></div>
          <span>Phần này giữ hệ thống internal link mạnh cho SEO nhưng được trình bày gọn, không biến homepage thành một bức tường chữ.</span>
        </div>
        <div className={styles.directoryGrid}>
          {[
            ["Tour & xe", groups.product],
            ["Combo", groups.combo],
            ["Tour riêng", groups.private],
            ["Cẩm nang", groups.guide],
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
            <h2>Deal, review và câu chuyện chuyến đi không chỉ sống trên Google.</h2>
            <p>Facebook là kênh tạo nhu cầu; website là nơi khách kiểm tra giá, điều kiện và quyết định.</p>
          </div>
          <a href={vietnamBusinessConfig.facebookHoTramUrl} target="_blank" rel="noreferrer">Theo dõi Hồ Tràm Travel ↗</a>
        </section>
      ) : null}

      <section className={styles.final}>
        <img src="/tour/cham-island/guest-pickup.jpg" alt="GoVietStay đón khách thật" loading="lazy" />
        <div>
          <p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p>
          <h2>Bạn cho ngày đi và số người. Chúng tôi giúp phần còn lại dễ quyết định.</h2>
          <a href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Bắt đầu trên Zalo</a>
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
