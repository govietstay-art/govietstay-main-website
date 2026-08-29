import type {TurkeySeoPage} from "../../../lib/turkeySeoPages";
import {turkeyMarketConfig} from "../../../lib/turkeyMarketConfig";
import {getTurkeyVisual} from "../../../lib/turkeyVisuals";
import styles from "../../it/_seo/ItalyPage.module.css";

function PriceBox({page}:{page:TurkeySeoPage}){
  if(!page.priceKey)return <div className={styles.quote}><small>ÖZEL PLAN</small><h3>Önce ihtiyaç, sonra fiyat.</h3><p>Tarih, kişi sayısı, otel, rehber dili ve görmek istediğiniz iki yeri gönderin. Sadece gerçekten gereken parçaları fiyatlandıralım.</p><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp'tan yazın</a></div>;
  const p=turkeyMarketConfig.prices[page.priceKey];if(!p)return null;
  return <div className={styles.priceBox}><small>{p.label}</small><h3>{new Intl.NumberFormat("tr-TR").format(p.vnd)} VND</h3><strong>Yetişkin referans fiyatı</strong><p>{p.note}</p><div className={styles.same}>✓ Aynı standart GoVietStay ürününde ekstra “Türkiye fiyatı” yok</div><em>{turkeyMarketConfig.priceDisclaimer}</em><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Tarih ve kapsamı teyit et</a></div>
}

export default function TurkeyPage({page,related}:{page:TurkeySeoPage;related:TurkeySeoPage[]}){
  const visual=getTurkeyVisual(page.slug,page.destination);
  const canonical=`https://www.govietstay.com/tr/${page.slug}`;
  const schema={"@context":"https://schema.org","@type":page.type==="guide"?"Article":"WebPage",headline:page.h1,description:page.desc,url:canonical,inLanguage:"tr-TR",dateModified:page.updated,author:{"@type":"Organization",name:"GoVietStay"}};
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:page.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
  const privateLike=page.type==="private";
  return <main className={styles.page} lang="tr-TR">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <header className={styles.nav}><a href="/tr" className={styles.brand}><img src="/govietstay-logo.jpg" alt="GoVietStay"/><span><b>GoVietStay</b><small>TÜRKİYE → VİETNAM</small></span></a><nav><a href="/tr">Türkçe ana sayfa</a><a href="/tr/da-nang-gezi-rehberi">Da Nang</a><a href="/tr/vietnam-ozel-tur">Özel tur</a><a href="/tr/vietnam-e-vize-turk-vatandaslari">E-vize</a><a className={styles.cta} href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav></header>

    <section className={styles.hero}><img src={visual.hero} alt={page.h1} fetchPriority="high"/><div className={styles.shade}/><div className={styles.heroInner}><div><p>{page.destination} · TÜRK GEZGİNLER İÇİN</p><h1>{page.h1}</h1><h2>{page.desc}</h2><blockquote>{page.wiifm}</blockquote><div className={styles.actions}><a href="#detay">Detayları gör</a><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div></div><aside><small>30 SANİYELİK ÖZET</small><h3>En ucuz etiketi değil, doğru kapsamı karşılaştırın.</h3><p>Standart ürünlerde mevcut GoVietStay fiyatını koruyoruz. Özel turu ise grup ekonomisine göre hesaplıyoruz.</p><div><span>Standart tur</span><b>Aynı kamu fiyatı</b></div><div><span>Türkçe rehber</span><b>Müsaitliğe göre</b></div><div><span>Özel tur</span><b>Sizin grubunuz</b></div></aside></div></section>

    <section className={styles.gallery}>{visual.gallery.map((src,i)=><figure key={src}><img src={src} alt={`${visual.label} ${i+1}`} loading="lazy"/>{i===0?<figcaption>GoVietStay gerçek seyahat görselleri</figcaption>:null}</figure>)}</section>
    <section className={styles.scan}>{page.bullets.map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b></div>)}</section>

    {privateLike?<section className={styles.private}><div><img src="/travelers/germany.jpg" alt="GoVietStay özel seyahat" loading="lazy"/></div><div><p>ÖZEL · SİZE GÖRE</p><h2>Grubunuz tura uymak zorunda değil. Tur grubunuza uymalı.</h2><span>Tarih · kişi sayısı · çocuk/senior · otel · rehber dili · ilgi alanı · istemediğiniz şeyler</span><p>{turkeyMarketConfig.guideRule}</p><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">Rotayı birlikte kuralım</a></div></section>:null}

    <div className={styles.layout}><article id="detay">
      <section className={styles.story}><p>01 · SİZE NE KAZANDIRIR?</p><h2>{page.wiifm}</h2><p>{page.desc}</p></section>
      {page.sections.map((s,i)=><section className={styles.check} key={s.title}><p>{String(i+2).padStart(2,"0")} · {s.eyebrow.replace(/^\d+\s*·\s*/,"")}</p><h2>{s.title}</h2><p>{s.body}</p>{s.points?.map(x=><div key={x}>✓ {x}</div>)}</section>)}
      <section id="prezzo" className={styles.priceSection}><p>FİYAT / PLAN</p><PriceBox page={page}/></section>
      {page.sourceLinks?.length?<section className={styles.official}><p>KAYNAKLAR</p><h2>Değişebilecek bilgiyi resmi kaynaktan doğrulayın.</h2><span>Vize ve bilet kuralları güncellenebilir. Bu yüzden kaynak bağlantısını doğrudan veriyoruz.</span>{page.sourceLinks.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</section>:null}
      <section className={styles.local}><div><p>YEREL DESTEK</p><h2>Yerel ekibin değeri, plan değiştiğinde ortaya çıkar.</h2><span>Hava, deniz, uçuş gecikmesi, çocukların yorulması veya programı değiştirme isteği: burada gerçek bir yerel temas noktası katalogdan daha değerlidir.</span><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">GoVietStay'e yazın</a></div><img src={visual.gallery[0]} alt={visual.label} loading="lazy"/></section>
      <section className={styles.faq}><p>SIK SORULAN SORULAR</p><h2>Ödeme yapmadan önce netleştirin</h2>{page.faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</section>
    </article>
    <aside><div className={styles.sticky}><img src={visual.gallery[1]} alt={visual.label} loading="lazy"/><small>UÇUŞ + OTEL HAZIR MI?</small><h3>Bize 5 bilgi gönderin.</h3><p>Tarih · kişi sayısı · otel · iki öncelik · istediğiniz rehber dili.</p><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="/tr/vietnam-ozel-tur">Özel rota →</a><a href={turkeyMarketConfig.googleMaps} target="_blank" rel="noreferrer">Google Maps →</a></div></aside>
    </div>

    <section className={styles.related}><p>BUNLAR DA İŞİNİZE YARAYABİLİR</p><h2>Bağlantılı rehberler</h2><div>{related.map(x=>{const v=getTurkeyVisual(x.slug,x.destination);return <a href={`/tr/${x.slug}`} key={x.slug}><img src={v.hero} alt={x.h1} loading="lazy"/><div><small>{x.destination}</small><b>{x.h1}</b><span>Aç →</span></div></a>})}</div></section>
    <div className={styles.mobile}><a href={turkeyMarketConfig.whatsapp} target="_blank" rel="noreferrer">💬 WhatsApp</a><a href="/tr/vietnam-ozel-tur">★ Özel tur</a><a href="/tr/vietnam-e-vize-turk-vatandaslari">🛂 E-vize</a></div>
  </main>
}
