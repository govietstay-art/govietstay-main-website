import type { TurkeySeoPage } from "../../../lib/turkeySeoPages";
import { turkeyMarketConfig } from "../../../lib/turkeyMarketConfig";
import { getTurkeyVisual } from "../../../lib/turkeyVisuals";
import styles from "./TurkeyPageFinal.module.css";

function formatVnd(value:number){return `${new Intl.NumberFormat("tr-TR").format(value)} VND`}
function PriceBox({page}:{page:TurkeySeoPage}){
  if(!page.priceKey)return <div className={styles.priceBox}><div className={styles.eyebrow}>ÖZEL PLAN</div><h3>Önce ihtiyaç, sonra fiyat.</h3><p>Tarih, kişi sayısı, otel, görmek istediğiniz iki yer ve rehber dili bilgisini gönderin. Sadece gerçekten gereken parçaları fiyatlandıralım.</p></div>;
  const price=turkeyMarketConfig.prices[page.priceKey]; if(!price)return null;
  return <div className={styles.priceBox}><div className={styles.eyebrow}>{price.label}</div><h3>{formatVnd(price.vnd)}</h3><p>{price.note}</p><p>{turkeyMarketConfig.priceDisclaimer}</p></div>;
}

export default function TurkeyPage({page,related}:{page:TurkeySeoPage;related:TurkeySeoPage[]}){
  const visual=getTurkeyVisual(page.slug);
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:page.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  return <main className={styles.page} lang="tr-TR">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <div className={styles.shell}>
      <header className={styles.nav}><a className={styles.brand} href="/tr"><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><strong>GoVietStay</strong><small>TÜRKİYE → VİETNAM</small></span></a><nav className={styles.navLinks}><a href="/tr">Ana sayfa</a><a href="/tr/da-nang-gezi-rehberi">Da Nang</a><a href="/tr/vietnam-ozel-tur">Özel tur</a><a className={styles.whatsapp} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav></header>
      <section className={styles.hero}><img src={visual.hero} alt={page.h1}/><div className={styles.heroCopy}><div className={styles.eyebrow}>{page.destination}</div><h1>{page.h1}</h1><p>{page.desc}</p><div className={styles.wiifm}>{page.wiifm}</div><div className={styles.heroActions}><a className={styles.primary} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan yazın</a><a className={styles.secondary} href="/tr">Türkçe ana sayfa</a></div></div></section>
      <section className={styles.bullets}>{page.bullets.map((b,i)=><div className={styles.bullet} key={b}><small>0{i+1}</small>{b}</div>)}</section>
      <div className={styles.layout}><article className={styles.article}>
        {page.sections.map(s=><section className={styles.section} key={s.title}><div className={styles.eyebrow}>{s.eyebrow}</div><h2>{s.title}</h2><p>{s.body}</p>{s.points?.length?<div className={styles.points}>{s.points.map(p=><div className={styles.point} key={p}>✓ {p}</div>)}</div>:null}</section>)}
        <section className={styles.section}><div className={styles.eyebrow}>FİYAT / PLAN</div><h2>Karar vermeden önce toplam kapsamı görün.</h2><PriceBox page={page}/></section>
        {page.sourceLinks?.length?<section className={styles.section}><div className={styles.eyebrow}>RESMİ KAYNAKLAR</div><h2>Değişebilecek bilgiyi kaynağından doğrulayın.</h2><div className={styles.sourceLinks}>{page.sourceLinks.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div></section>:null}
        <section className={`${styles.section} ${styles.faq}`}><div className={styles.eyebrow}>SIK SORULAN SORULAR</div><h2>Ödeme yapmadan önce netleştirin.</h2>{page.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      </article><aside className={styles.sticky}><div className={styles.support}><div className={styles.eyebrow}>GO VIETSTAY LOCAL SUPPORT</div><h3>Uçuş ve otelinizi siz seçin. Yerelde yalnız kalmayın.</h3><p>Tarih, kişi sayısı, otel ve görmek istediğiniz iki yeri yazın. Size en fazla turu değil, en mantıklı ilk planı çıkaralım.</p><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan yazın</a></div><img className={styles.sideImage} src={visual.gallery[1]} alt={visual.label}/></aside></div>
      <section className={styles.related}><div className={styles.eyebrow}>BUNLAR DA İŞİNİZE YARAYABİLİR</div><h2>Bağlantılı rehberler</h2><div className={styles.relatedGrid}>{related.map(item=>{const v=getTurkeyVisual(item.slug);return <a key={item.slug} href={`/tr/${item.slug}`}><img src={v.hero} alt={item.h1}/><div className={styles.relatedBody}><small>{item.destination}</small><strong>{item.h1}</strong></div></a>})}</div></section>
    </div><div className={styles.mobileSticky}><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp’tan bize yazın</a></div>
  </main>;
}
