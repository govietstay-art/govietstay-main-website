import type { Metadata } from "next";
import { vietnamSeoPages } from "../../lib/vietnamSeoPages";
import { vietnamBusinessConfig } from "../../lib/vietnamBusinessConfig";
import styles from "./VietnamHub.module.css";

export const metadata: Metadata = {
  title:{absolute:"GoVietStay Việt Nam | Tour Đà Nẵng, Hội An, Huế & Phú Quốc 2026"},
  description:"Tour, combo, xe riêng và cẩm nang cho khách Việt. Giá rõ, Google Reviews thật, Zalo, deposit VietQR và tour riêng gia đình.",
  alternates:{canonical:"https://www.govietstay.com/vi",languages:{"vi-VN":"https://www.govietstay.com/vi"}},
  robots:{index:true,follow:true},
};

const group=(t:string)=>vietnamSeoPages.filter(p=>p.type===t);

export default function VietnamHub(){
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:"GoVietStay Việt Nam",url:"https://www.govietstay.com/vi",inLanguage:"vi-VN"};
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <div className={styles.top}>GOVIETSTAY VIỆT NAM · ĐÀ NẴNG · HỘI AN · HUẾ · PHÚ QUỐC</div>
    <header className={styles.nav}>
      <a className={styles.brand} href="/"><img src="/govietstay-logo.jpg" alt="GoVietStay"/><b>GoVietStay</b></a>
      <nav><a href="#combo">Combo</a><a href="#private">Tour riêng</a><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank">Google Reviews</a><a className={styles.zalo} href={vietnamBusinessConfig.zaloUrl} target="_blank">Zalo</a></nav>
    </header>
    <section className={styles.hero}><div>
      <p>ĐI ĐÚNG GIÁ · ĐI ĐÚNG CÁCH · CÓ NGƯỜI ĐỊA PHƯƠNG ĐỨNG PHÍA SAU</p>
      <h1>Bạn cứ tận hưởng chuyến đi. <span>Phần khó để GoVietStay lo.</span></h1>
      <h2>Giá rõ · Combo · Google Reviews · Deposit VietQR · Tour riêng gia đình</h2>
      <div className={styles.actions}><a href="#combo">Xem combo</a><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank">Đọc review thật</a></div>
    </div><aside><small>PRIVATE FAMILY TRIP</small><h3>Chỉ cần nói 5 điều.</h3>{["Bao nhiêu người?","Ngày nào?","Có trẻ em/người lớn tuổi?","Gia đình thích gì?","Điều gì không muốn?"].map((x,i)=><div key={x}><b>{i+1}</b>{x}</div>)}<a href="/vi/tour-rieng-da-nang-gia-dinh">Thiết kế tour riêng →</a></aside></section>
    <section className={styles.trust}><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank"><small>GOOGLE REVIEWS THẬT</small><b>Xem khách đã đi nói gì →</b></a><div><small>PAYMENT</small><b>Deposit + VietQR</b></div><div><small>SUPPORT</small><b>Zalo + Local team</b></div><div><small>PRIVACY</small><b>Không ghép khách khi private</b></div></section>
    {[
      ["tour","Tour & xe",group("product")],
      ["combo","Combo - vũ khí giá trị",group("combo")],
      ["private","Tour riêng gia đình",group("private")],
      ["guide","Cẩm nang SEO",group("guide")],
    ].map(([id,label,items]:any)=><section className={styles.section} id={id} key={id}><p>GOVIETSTAY VIỆT NAM</p><h2>{label}</h2><div className={styles.grid}>{items.map((p:any)=><a key={p.slug} href={`/vi/${p.slug}`}><small>{p.destination}</small><h3>{p.h1}</h3><span>{p.description}</span><b>Xem chi tiết →</b></a>)}</div></section>)}
    <section className={styles.review}><div><p>TRƯỚC KHI ĐẶT</p><h2>Đừng chỉ nghe chúng tôi nói.</h2><span>Mở Google Reviews và đọc trải nghiệm thật của khách GoVietStay.</span></div><a href={vietnamBusinessConfig.googleReviewsUrl} target="_blank">Xem Google Reviews →</a></section>
    {vietnamBusinessConfig.facebookHoTramUrl?<section className={styles.facebook}><div><p>FACEBOOK HỒ TRÀM TRAVEL</p><h2>Deal, review và nội dung Việt Nam tiếp tục ở đây.</h2></div><a href={vietnamBusinessConfig.facebookHoTramUrl} target="_blank">Theo dõi Facebook →</a></section>:null}
    <section className={styles.final}><p>GOVIETSTAY · TRUSTED LOCAL SUPPORT</p><h2>Bạn cho ngày đi và số người. Chúng tôi biến nó thành chuyến đi.</h2><a href={vietnamBusinessConfig.zaloUrl} target="_blank">Bắt đầu trên Zalo</a></section>
    <div className={styles.mobile}><a href={vietnamBusinessConfig.zaloUrl} target="_blank">💬 Zalo</a><a href="tel:+84937762607">☎ Gọi</a><a href="#combo">🔥 Combo</a></div>
  </main>
}
