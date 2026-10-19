import type { Metadata } from "next";
import Image from "next/image";
import { italyMarketConfig } from "../../lib/italyMarketConfig";
import { italyGuestPhotos } from "../../lib/italyVisuals";
import styles from "../it/ItalyHub.module.css";
import local from "../id/IndonesiaHub.module.css";

const url = "https://www.govietstay.com/my";
const title = "Pakej Percutian Vietnam & Lawatan Persendirian Da Nang | GoVietStay";
const description = "Rancang percutian Vietnam dari Malaysia: Da Nang, Hoi An, Ba Na Hills, Hue dan Phu Quoc. Kereta dengan pemandu, pengangkutan lapangan terbang dan bantuan tempatan.";
const whatsapp = (topic = "percutian Vietnam") => "https://wa.me/84937762607?text=" + encodeURIComponent(`Hai GoVietStay, saya dari Malaysia dan ingin bertanya tentang ${topic}.\nTarikh perjalanan: …\nBilangan dewasa / kanak-kanak (umur): …\nHotel / destinasi: …\nKeperluan makanan / bahasa pemandu pelancong: …\nSaya jumpa halaman Bahasa Melayu /my.`);

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url, languages: { "ms-MY": url } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url, title, description, locale: "ms_MY", siteName: "GoVietStay", images: [{ url: "https://www.govietstay.com/hero-hoian-new.png", alt: "Tanglung dan perahu di Hoi An, Vietnam" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.govietstay.com/hero-hoian-new.png"] },
  other: { "content-language": "ms-MY" },
};

const tours = [
  { key: "bana", name: "Ba Na Hills & Golden Bridge", destination: "Da Nang", image: "/tour/bana.jpg", text: "Luangkan satu hari untuk jambatan ikonik, kereta kabel dan suasana pergunungan. Semak tiket, makanan serta pengangkutan yang termasuk sebelum memilih pakej.", note: "Tiket, bufet, pengangkutan dan pemandu pelancong bergantung pada pakej yang disahkan." },
  { key: "hoian", name: "Hoi An & Hutan Kelapa", destination: "Hoi An", image: "/tour/coconut.jpg", text: "Naik perahu bakul pada waktu petang, kemudian nikmati bandar lama ketika tanglung dinyalakan. Sesuai untuk pasangan, keluarga dan kumpulan rakan.", note: "Sahkan perahu, tiket bandar lama, makanan dan waktu pulang sebelum menempah." },
  { key: "cham", name: "Pulau Cham & Snorkeling", destination: "Hoi An", image: "/tour/cham.jpg", text: "Nikmati laut dan snorkeling. Perjalanan tertakluk pada keadaan laut; sediakan pilihan aktiviti darat jika bot tidak dapat beroperasi.", note: "Semak keadaan laut, peralatan, pengambilan di hotel dan keperluan makanan." },
  { key: "hue", name: "Lawatan Warisan ke Hue", destination: "Hue", image: "/tour/hue.jpg", text: "Kenali warisan empayar Vietnam dengan masa yang mencukupi. Laluan persendirian boleh disesuaikan dengan kanak-kanak, warga emas dan lokasi hotel.", note: "Sahkan tempat lawatan, tiket, makanan, bahasa pemandu pelancong dan tempoh perjalanan." },
  { key: "pq3", name: "Phu Quoc: Lawatan 3 Pulau", destination: "Phu Quoc", image: "/tour/phuquoc/tour-05-1.jpg", text: "Program bot TRIP 3 oleh John’s Tours untuk menikmati pulau dan snorkeling. Sesuaikan rancangan dengan lokasi hotel dan keadaan laut.", note: "Harga untuk TRIP 3, bukan sewaan bot persendirian. Sahkan pengangkutan dan kadar kanak-kanak." },
  { key: "pq4", name: "Phu Quoc: 4 Pulau & Hon Thom", destination: "Phu Quoc", image: "/tour/phuquoc/tour-06-1.jpg", text: "Program CABLE CAR TRIP oleh John’s Tours untuk aktiviti laut dan kereta kabel Hon Thom. Peruntukkan satu hari penuh untuk perjalanan ini.", note: "Harga untuk CABLE CAR TRIP. Sahkan pengangkutan, tiket serta syarat kanak-kanak." },
] as const;
const price = (key: string) => new Intl.NumberFormat("ms-MY").format(italyMarketConfig.prices[key].vnd) + " VND";
const itinerary = [
  ["Hari 1 · Tiba & berehat", "Pengangkutan dari lapangan terbang, daftar masuk hotel dan masa santai berhampiran Pantai My Khe. Sesuaikan aktiviti dengan waktu ketibaan."],
  ["Hari 2 · Ba Na Hills", "Peruntukkan satu hari untuk Golden Bridge dan kawasan pergunungan. Semak cuaca serta jenis tiket sebelum menetapkan waktu bertolak."],
  ["Hari 3 · Hoi An petang–malam", "Pagi bebas. Ke hutan kelapa pada waktu petang, kemudian bandar lama Hoi An untuk menikmati tanglung. Waktu makan dan pulang dipersetujui terlebih dahulu."],
  ["Hari 4 · Ikut masa penerbangan", "Berehat, membeli-belah di Han Market atau singgah sebentar jika masa mengizinkan. Hue dan Pulau Cham lebih sesuai apabila ada satu hari tambahan penuh."],
];
const faqs = [
  ["Ada pemandu pelancong berbahasa Melayu?", "Pemandu pelancong berbahasa Melayu perlu diminta dan disahkan mengikut tarikh. Ia tidak termasuk secara automatik. Kami akan menjelaskan bahasa, ketersediaan dan kos sebelum pembayaran."],
  ["Boleh bantu dengan makanan halal?", "Maklumkan keperluan halal, alahan dan pilihan makanan sejak awal. Kami akan menyemak restoran serta menu yang tersedia dalam pakej. Makanan tanpa daging babi tidak semestinya bersijil halal; nyatakan jika pensijilan diperlukan."],
  ["Boleh tempah kereta dengan pemandu sahaja?", "Boleh. Anda boleh meminta pengangkutan lapangan terbang, kereta dengan pemandu, tiket atau lawatan tertentu sahaja. Hantar tarikh, jumlah penumpang, bagasi dan laluan untuk mendapatkan sebut harga."],
  ["Harga yang dipaparkan untuk lawatan persendirian?", "Harga bermula yang dipaparkan adalah bagi produk standard yang dinyatakan, untuk seorang dewasa. Lawatan persendirian dikira berasingan berdasarkan kumpulan, kenderaan, pemandu pelancong, tempoh dan tiket. Kadar akhir serta semua perkara yang termasuk disahkan sebelum pembayaran."],
  ["Perlu beli pakej lengkap dengan hotel?", "Tidak. Jika penerbangan dan hotel sudah ditempah, kami boleh mengatur perkhidmatan tempatan yang anda perlukan sahaja. Untuk pakej tersuai, hantar tarikh, destinasi, jumlah tetamu dan anggaran bajet."],
  ["Bagaimana jika cuaca berubah?", "Aktiviti laut dan pergunungan bergantung pada keadaan semasa. Kami akan menyemak pilihan yang munasabah; perubahan, pembatalan dan bayaran balik mengikut syarat tempahan yang disahkan."],
  ["Di mana hendak menyemak syarat kemasukan Vietnam?", "Rujuk sumber rasmi imigresen Vietnam mengikut pasport, tujuan dan tempoh perjalanan anda. Syarat untuk pemegang pasport negara lain tidak semestinya sama. Hubungi kami jika memerlukan bantuan mencari maklumat rasmi."],
];

export default function MalaysiaHub() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url, inLanguage: "ms-MY", isPartOf: { "@id": "https://www.govietstay.com/#website" } };
  return <main className={`${styles.page} ${local.page}`} lang="ms-MY">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div className={styles.top}><span>MALAYSIA → VIETNAM</span><b>Da Nang · Hoi An · Hue · Phu Quoc</b><a href="/travel" lang="en">English →</a></div>
    <header className={styles.nav}>
      <a href="/my" className={styles.brand}><Image src="/govietstay-logo.jpg" width={48} height={48} alt="GoVietStay" /><span><b>GoVietStay</b><small>UNTUK PELANCONG MALAYSIA</small></span></a>
      <nav aria-label="Navigasi utama"><a href="#persendirian">Persendirian</a><a href="#destinasi">Destinasi</a><a href="#jadual">Jadual</a><a href="#harga">Harga</a><a className={styles.cta} href={whatsapp()} target="_blank" rel="noopener noreferrer">WhatsApp</a></nav>
    </header>
    <section className={styles.hero}>
      <div className={`${styles.heroMain} ${local.hero}`}>
        <Image src="/hero-hoian-new.png" alt="Tanglung dan perahu di Hoi An pada waktu malam" fill sizes="(max-width: 900px) 100vw, 70vw" preload />
        <div className={styles.shade} />
        <div className={`${styles.heroCopy} ${local.heroCopy}`}>
          <p>PERCUTIAN CARA ANDA · BANTUAN TEMPATAN DI VIETNAM</p>
          <h1>Percutian Vietnam lebih mudah. <em>Rancang ikut rentak anda.</em></h1>
          <h2>Sudah tempah penerbangan dan hotel? Kami bantu urus lawatan, kereta dengan pemandu dan pengangkutan lapangan terbang untuk pasangan, keluarga serta kumpulan kecil anda.</h2>
          <div className={styles.actions}><a href="#destinasi">Terokai destinasi</a><a href="#jadual">Rancangan 4 hari</a><a href={whatsapp()} target="_blank" rel="noopener noreferrer">Tanya di WhatsApp</a></div>
          <div className={styles.proof}><span>✓ Pasukan tempatan di Vietnam</span><span>✓ Butiran sebelum bayar</span><span>✓ Pilihan persendirian</span></div>
        </div>
      </div>
      <aside className={styles.answer}><small>MULAKAN DI SINI</small><h2>Hantar 5 maklumat. Kita rancang bersama.</h2>
        {["Tarikh perjalanan", "Bilangan dewasa & umur kanak-kanak", "Hotel atau destinasi", "Tempat yang ingin dilawati", "Keperluan makanan & bahasa pemandu pelancong"].map((item, i) => <div key={item}><b>0{i + 1}</b><span>{item}</span></div>)}
        <a href={whatsapp()} target="_blank" rel="noopener noreferrer">Hantar rancangan saya</a><p>Jadual, harga akhir dan perkhidmatan yang termasuk akan disahkan sebelum pembayaran.</p>
      </aside>
    </section>
    <section className={styles.quick} aria-label="Pilih keperluan perjalanan">
      <a href="#jadual"><small>MASA</small><b>Da Nang 3–4 hari</b><span>Laluan yang realistik →</span></a>
      <a href="#keperluan"><small>MAKANAN</small><b>Perlukan makanan halal?</b><span>Maklumkan lebih awal →</span></a>
      <a href={whatsapp("pengangkutan lapangan terbang Da Nang")} target="_blank" rel="noopener noreferrer"><small>KETIBAAN</small><b>Lapangan terbang → hotel</b><span>Hantar nombor penerbangan →</span></a>
      <a href="#phuquoc"><small>PULAU</small><b>Percutian Phu Quoc</b><span>Rancang dari lokasi hotel →</span></a>
    </section>
    <section className={styles.privateZone} id="persendirian">
      <div className={`${styles.privatePhoto} ${local.privatePhoto}`}><Image src="/travelers/germany.jpg" alt="Tetamu GoVietStay menikmati perjalanan di Vietnam" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
      <div className={styles.privateCopy}><p>01 · MASA UNTUK KUMPULAN ANDA</p><h2>Lawatan persendirian mengikut rentak percutian anda.</h2><span>Pilih kenderaan, laluan dan waktu yang sesuai untuk kumpulan sendiri. Lawatan standard juga tersedia; kami jelaskan pilihan sebelum anda membuat keputusan.</span>
        <div>{["Pasangan", "Keluarga & kanak-kanak", "Kumpulan rakan", "Jadual fleksibel", "Pilihan bahasa*", "Keperluan makanan*"].map((item, i) => <b key={item}><i>0{i + 1}</i>{item}</b>)}</div>
        <p>*Bahasa pemandu pelancong dan keperluan khas tertakluk pada ketersediaan serta pengesahan.</p><a href={whatsapp("lawatan persendirian dan kereta dengan pemandu")} target="_blank" rel="noopener noreferrer">Minta sebut harga →</a>
      </div>
    </section>
    <section className={styles.section} id="destinasi">
      <div className={styles.head}><div><p>02 · DA NANG · HOI AN · HUE</p><h2>Satu pengalaman utama setiap hari.</h2></div><span>Pilih tempat yang benar-benar ingin dinikmati. Luangkan masa untuk pantai, makan dan berehat supaya percutian tidak habis di jalan raya.</span></div>
      <div className={styles.cards}>{tours.slice(0, 4).map(tour => <a href={whatsapp(tour.name)} key={tour.key} target="_blank" rel="noopener noreferrer"><div className={styles.photo}><Image src={tour.image} alt={tour.name} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw" /><span>{tour.destination}</span></div><div className={styles.body}><h3>{tour.name}</h3><p>{tour.text}</p><div><strong>Dari {price(tour.key)}</strong><b>Tanya →</b></div></div></a>)}</div>
    </section>
    <section className={styles.priceZone} id="harga"><div className={styles.priceIntro}><p>03 · HARGA YANG JELAS</p><h2>Bandingkan butiran pakej sebelum memilih.</h2><span>Harga bermula bagi produk standard, untuk seorang dewasa, dalam VND. Lawatan persendirian, bahasa pemandu pelancong tertentu dan keperluan khas dikira serta disahkan secara berasingan.</span></div>
      <div className={styles.priceGrid}>{tours.map(tour => <a key={tour.key} href={whatsapp(`harga dan butiran pakej ${tour.name}`)} target="_blank" rel="noopener noreferrer"><small>{tour.destination}</small><h3>{tour.name}</h3><strong>Dari {price(tour.key)}</strong><b>Seorang dewasa · pakej standard</b><span>{tour.note}</span><span>Semak tarikh & butiran →</span></a>)}</div>
      <p className={styles.disclaimer}>Kadar kanak-kanak, pengambilan, makanan, tiket, caj tambahan dan ketersediaan perlu disahkan untuk tarikh anda. Produk Phu Quoc dikendalikan oleh pengendali tempatan mengikut pakej, termasuk John’s Tours. GoVietStay membantu tempahan dan komunikasi.</p>
    </section>
    <section className={styles.section} id="jadual"><div className={styles.head}><div><p>04 · CONTOH JADUAL PERCUTIAN</p><h2>Empat hari di Da Nang, tanpa tergesa-gesa.</h2></div><span>Ini contoh rancangan, bukan pakej dengan semua perkhidmatan termasuk. Untuk tiga hari, sesuaikan aktiviti dengan waktu tiba dan pulang; tidak perlu memuatkan semua tempat.</span></div>
      <div className={styles.whyGrid}>{itinerary.map(([heading, body]) => <div key={heading}><h3>{heading}</h3><p>{body}</p></div>)}</div><a className={styles.reviews} href={whatsapp("jadual percutian Da Nang 3–4 hari")} target="_blank" rel="noopener noreferrer">Sesuaikan dengan penerbangan saya →</a>
    </section>
    <section className={styles.why} id="keperluan"><div className={styles.head}><div><p>05 · SELESA UNTUK ANDA</p><h2>Keperluan setiap tetamu berbeza.</h2></div><span>Beritahu perkara yang penting untuk anda. Kami menyemak butiran sebelum mengesahkan perkhidmatan.</span></div>
      <div className={styles.whyGrid}>
        <div><b>01</b><h3>Makanan halal jika diperlukan</h3><p>Maklumkan keperluan halal dan alahan. Restoran serta menu disemak mengikut perkhidmatan; pensijilan perlu disahkan jika diwajibkan oleh anda.</p></div>
        <div><b>02</b><h3>Waktu solat</h3><p>Jika diperlukan, maklumkan waktu dan keperluan tempat solat sejak awal supaya dapat dipertimbangkan dalam laluan persendirian.</p></div>
        <div><b>03</b><h3>Kanak-kanak & warga emas</h3><p>Umur, keperluan pergerakan dan waktu rehat membantu kami mencadangkan pengangkutan serta tempoh lawatan yang sesuai.</p></div>
        <div><b>04</b><h3>Bahasa pemandu pelancong</h3><p>Pemandu pelancong berbahasa Melayu tidak tersedia secara automatik. Bahasa, ketersediaan dan kos disahkan sebelum tempahan.</p></div>
      </div>
    </section>
    <section className={styles.phu} id="phuquoc"><div className={styles.phuText}><p>06 · PHU QUOC</p><h2>Pilih kawasan hotel, kemudian rancang hari lawatan.</h2><span>Aktiviti pulau, pantai dan masa santai di resort tidak perlu dipadatkan dalam sehari. Hantar lokasi hotel supaya perjalanan antara utara dan selatan pulau lebih teratur.</span><div><a href={whatsapp("percutian keluarga di Phu Quoc")} target="_blank" rel="noopener noreferrer">Percutian keluarga →</a><a href={whatsapp("kereta persendirian di Phu Quoc")} target="_blank" rel="noopener noreferrer">Kereta dengan pemandu →</a></div></div>
      <div className={`${styles.phuCards} ${local.phuCards}`}>{tours.slice(4).map(tour => <a key={tour.key} href={whatsapp(tour.name)} target="_blank" rel="noopener noreferrer"><Image src={tour.image} alt={tour.name} fill sizes="(max-width: 560px) 85vw, 35vw" /><div><small>{tour.destination}</small><h3>{tour.name}</h3><b>Dari {price(tour.key)}</b><span>Tanya pakej →</span></div></a>)}</div>
    </section>
    <section className={styles.guests}><div className={styles.head}><div><p>07 · PENGALAMAN BERSAMA GOVIETSTAY</p><h2>Lihat perjalanan tetamu kami.</h2></div><span>Foto tetamu GoVietStay dari pelbagai negara. Lihat profil dan ulasan di Google Maps sebelum merancang perjalanan anda.</span></div><div className={styles.guestStrip}>{italyGuestPhotos.slice(0, 5).map((src, i) => <figure key={src}><Image src={src} alt={`Tetamu GoVietStay dalam perjalanan di Vietnam, foto ${i + 1}`} width={320} height={240} sizes="(max-width: 560px) 45vw, 20vw" /></figure>)}</div><a className={styles.reviews} href={italyMarketConfig.googleMaps} target="_blank" rel="noopener noreferrer">Lihat GoVietStay di Google Maps →</a></section>
    <section className={`${styles.section} ${local.faq}`} id="soalan"><div className={styles.head}><div><p>08 · SEBELUM MENEMPAH</p><h2>Soalan lazim.</h2></div></div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<p>Maklumat rasmi: <a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer">Portal e-Visa Vietnam ↗</a></p><p><a href="/travel" lang="en">Baca panduan perjalanan dalam bahasa Inggeris →</a></p><p><a href="/id" lang="id-ID">Bahasa Indonesia →</a></p></section>
    <section className={styles.final}><Image src="/tour/cham.jpg" alt="Percutian pulau di Vietnam" fill sizes="100vw" /><div><p>PASUKAN TEMPATAN ANDA DI VIETNAM</p><h2>Mulakan dengan tarikh, jumlah tetamu dan hotel. Kami bantu rancang langkah seterusnya.</h2><a href={whatsapp()} target="_blank" rel="noopener noreferrer">Hubungi GoVietStay di WhatsApp</a><p>WhatsApp +84 937 762 607 · Da Nang · Hoi An · Hue · Phu Quoc</p></div></section>
    <nav className={styles.mobile} aria-label="Akses pantas"><a href={whatsapp()} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="#harga">Lihat harga</a><a href="#jadual">Rancangan 4 hari</a></nav>
  </main>;
}
