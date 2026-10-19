import type { Metadata } from "next";
import Image from "next/image";
import { italyMarketConfig } from "../../lib/italyMarketConfig";
import { italyGuestPhotos } from "../../lib/italyVisuals";
import styles from "../it/ItalyHub.module.css";
import local from "./IndonesiaHub.module.css";

const url = "https://www.govietstay.com/id";
const title = "Paket Wisata Vietnam & Tur Privat Da Nang | GoVietStay";
const description = "Rencanakan liburan Vietnam dari Indonesia: Da Nang, Hoi An, Ba Na Hills, Hue dan Phu Quoc. Tur privat, antar-jemput bandara, kebutuhan makanan dan bantuan lokal.";
const whatsapp = (topic = "liburan Vietnam") => "https://wa.me/84937762607?text=" + encodeURIComponent(`Halo GoVietStay, saya ingin bertanya tentang ${topic}. Tanggal perjalanan: …\nDewasa / anak (usia): …\nHotel / tujuan: …\nKebutuhan makanan / bahasa pemandu: …\nSaya menemukan halaman Indonesia /id.`);

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url, languages: { "id-ID": url } },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url, title, description, locale: "id_ID", siteName: "GoVietStay", images: [{ url: "https://www.govietstay.com/hero-hoian-new.png", alt: "Suasana malam di Hoi An, Vietnam" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.govietstay.com/hero-hoian-new.png"] },
  other: { "content-language": "id-ID" },
};

const tours = [
  { key: "bana", name: "Ba Na Hills & Golden Bridge", destination: "Da Nang", image: "/tour/bana.jpg", text: "Satu hari untuk jembatan ikonik, kereta gantung dan suasana pegunungan. Pilih paket setelah mengecek tiket, makan dan penjemputan.", note: "Tiket, buffet, transfer dan pemandu mengikuti paket yang dikonfirmasi." },
  { key: "hoian", name: "Hoi An & Coconut Forest", destination: "Hoi An", image: "/tour/coconut.jpg", text: "Naik perahu keranjang di sore hari, lalu berjalan di kota tua saat lampion menyala. Cocok untuk pasangan, keluarga dan teman-teman.", note: "Konfirmasikan perahu, tiket kota tua, makan dan waktu kembali." },
  { key: "cham", name: "Cham Island & Snorkeling", destination: "Hoi An", image: "/tour/cham.jpg", text: "Hari untuk laut dan snorkeling. Keberangkatan menyesuaikan kondisi laut; siapkan rencana darat jika perjalanan tidak dapat beroperasi.", note: "Cek kondisi laut, perlengkapan dan kebutuhan makan sebelum membayar." },
  { key: "hue", name: "Wisata Budaya ke Hue", destination: "Hue", image: "/tour/hue.jpg", text: "Jelajahi warisan kekaisaran dengan waktu yang cukup. Rute privat dapat disesuaikan dengan anak, orang tua dan titik penjemputan.", note: "Konfirmasikan monumen, tiket, makan, bahasa pemandu dan durasi." },
  { key: "pq3", name: "Phu Quoc: Tur 3 Pulau", destination: "Phu Quoc", image: "/tour/phuquoc/tour-05-1.jpg", text: "Program kapal TRIP 3 dari John’s Tours untuk menikmati pulau dan snorkeling. Sesuaikan rencana dengan lokasi hotel dan kondisi laut.", note: "Harga untuk TRIP 3; bukan sewa kapal privat. Cek transfer dan ketentuan anak." },
  { key: "pq4", name: "Phu Quoc: 4 Pulau & Hon Thom", destination: "Phu Quoc", image: "/tour/phuquoc/tour-06-1.jpg", text: "Program CABLE CAR TRIP dari John’s Tours untuk laut dan kereta gantung Hon Thom. Sisihkan satu hari penuh untuk perjalanan ini.", note: "Harga untuk CABLE CAR TRIP; konfirmasikan transfer, tiket dan ketentuan anak." },
] as const;
const price = (key: string) => new Intl.NumberFormat("id-ID").format(italyMarketConfig.prices[key].vnd) + " VND";
const itinerary = [
  ["Hari 1 · Tiba & bersantai", "Antar-jemput bandara, check-in dan waktu santai di sekitar hotel atau Pantai My Khe. Sesuaikan dengan jam penerbangan."],
  ["Hari 2 · Ba Na Hills", "Luangkan satu hari untuk Golden Bridge dan area pegunungan. Cek cuaca serta paket tiket sebelum menentukan jam berangkat."],
  ["Hari 3 · Hoi An sore–malam", "Pagi bebas. Sore ke Coconut Forest, lalu kota tua Hoi An untuk menikmati lampion. Waktu makan dan pulang disepakati sebelumnya."],
  ["Hari 4 · Pilih sesuai energi", "Bersantai, belanja di Han Market atau kunjungan singkat jika waktu cukup. Hue atau Cham Island lebih cocok saat tersedia satu hari tambahan penuh."],
];
const faqs = [
  ["Apakah ada pemandu berbahasa Indonesia?", "Pemandu berbahasa Indonesia harus diminta dan dikonfirmasi untuk tanggal perjalanan. Jangan menganggapnya sudah termasuk. Bahasa pemandu dan biaya akan dijelaskan sebelum pembayaran."],
  ["Bisakah mengatur kebutuhan makanan halal?", "Sampaikan kebutuhan halal, alergi dan preferensi makanan saat bertanya. Kami akan mengecek pilihan tempat makan dan ketentuan paket. Menu tanpa babi tidak otomatis berarti bersertifikat halal; tanyakan sertifikasi jika itu penting bagi Anda."],
  ["Apakah harus membeli paket lengkap?", "Tidak. Anda bisa memesan antar-jemput bandara, mobil dengan sopir, tiket atau tur tertentu saja. Jika penerbangan dan hotel sudah dipesan, kirim detailnya agar rute menyesuaikan."],
  ["Apakah harga yang ditampilkan untuk tur privat?", "Harga mulai yang ditampilkan adalah untuk produk standar yang disebutkan, per orang dewasa. Tur privat dihitung terpisah berdasarkan jumlah tamu, mobil, pemandu, durasi dan tiket. Harga akhir, biaya anak dan layanan yang termasuk dikonfirmasi sebelum pembayaran."],
  ["Bagaimana jika cuaca berubah?", "Sampaikan tanggal dan prioritas perjalanan. Kegiatan laut mengikuti kondisi operasional; kegiatan gunung juga perlu mempertimbangkan cuaca. Pilihan perubahan, pembatalan dan pengembalian dana mengikuti ketentuan pemesanan yang dikonfirmasi."],
  ["Di mana mengecek informasi masuk Vietnam?", "Periksa informasi terbaru melalui sumber resmi imigrasi Vietnam sesuai paspor, durasi tinggal dan tujuan perjalanan Anda. Jangan menggunakan aturan untuk negara lain; hubungi kami jika perlu bantuan menemukan informasi resmi."],
];

export default function IndonesiaHub() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url, inLanguage: "id-ID", isPartOf: { "@id": "https://www.govietstay.com/#website" } };
  return <main className={`${styles.page} ${local.page}`} lang="id-ID">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div className={styles.top}><span>INDONESIA → VIETNAM</span><b>Da Nang · Hoi An · Hue · Phu Quoc</b><a href="/travel" lang="en">English →</a></div>
    <header className={styles.nav}>
      <a href="/id" className={styles.brand}><Image src="/govietstay-logo.jpg" width={48} height={48} alt="GoVietStay" /><span><b>GoVietStay</b><small>UNTUK WISATAWAN INDONESIA</small></span></a>
      <nav aria-label="Navigasi utama"><a href="#privat">Tur privat</a><a href="#wisata">Destinasi</a><a href="#itinerary">Itinerary</a><a href="#harga">Harga</a><a className={styles.cta} href={whatsapp()} target="_blank" rel="noopener noreferrer">WhatsApp</a></nav>
    </header>
    <section className={styles.hero}>
      <div className={`${styles.heroMain} ${local.hero}`}>
        <Image src="/hero-hoian-new.png" alt="Lampion dan perahu di Hoi An saat malam" fill sizes="(max-width: 900px) 100vw, 70vw" preload />
        <div className={styles.shade} />
        <div className={`${styles.heroCopy} ${local.heroCopy}`}>
          <p>LIBURAN SESUAI CARA ANDA · BANTUAN LOKAL DI VIETNAM</p>
          <h1>Vietnam, tanpa ribet. <em>Rencana perjalanan sesuai Anda.</em></h1>
          <h2>Sudah punya tiket pesawat dan hotel? Kami bantu tur, mobil dengan sopir dan antar-jemput bandara — untuk pasangan, keluarga atau grup kecil Anda.</h2>
          <div className={styles.actions}><a href="#wisata">Jelajahi wisata</a><a href="#itinerary">Rencana 4 hari</a><a href={whatsapp()} target="_blank" rel="noopener noreferrer">Tanya di WhatsApp</a></div>
          <div className={styles.proof}><span>✓ Tim lokal di Vietnam</span><span>✓ Rincian sebelum bayar</span><span>✓ Pilihan tur privat</span></div>
        </div>
      </div>
      <aside className={styles.answer}><small>MULAI DARI SINI</small><h2>Kirim 5 detail. Kita susun bersama.</h2>
        {["Tanggal perjalanan", "Jumlah dewasa & usia anak", "Hotel atau kota tujuan", "Tempat yang ingin dikunjungi", "Kebutuhan makan & bahasa pemandu"].map((item, i) => <div key={item}><b>0{i + 1}</b><span>{item}</span></div>)}
        <a href={whatsapp()} target="_blank" rel="noopener noreferrer">Kirim rencana saya</a><p>Program, harga akhir dan layanan yang termasuk dikonfirmasi sebelum pembayaran.</p>
      </aside>
    </section>
    <section className={styles.quick} aria-label="Pilih kebutuhan perjalanan">
      <a href="#itinerary"><small>WAKTU</small><b>Da Nang 3–4 hari</b><span>Rute yang realistis →</span></a>
      <a href="#kebutuhan"><small>MAKANAN</small><b>Ada kebutuhan halal?</b><span>Beritahu kami dahulu →</span></a>
      <a href={whatsapp("antar-jemput bandara Da Nang")} target="_blank" rel="noopener noreferrer"><small>KEDATANGAN</small><b>Bandara → hotel</b><span>Kirim nomor penerbangan →</span></a>
      <a href="#phuquoc"><small>PULAU</small><b>Liburan Phu Quoc</b><span>Rencanakan dari hotel →</span></a>
    </section>
    <section className={styles.privateZone} id="privat">
      <div className={`${styles.privatePhoto} ${local.privatePhoto}`}><Image src="/travelers/germany.jpg" alt="Tamu GoVietStay menikmati perjalanan di Vietnam" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
      <div className={styles.privateCopy}><p>01 · WAKTU MILIK GRUP ANDA</p><h2>Tur privat yang mengikuti ritme liburan Anda.</h2><span>Pilih mobil, rute dan waktu yang cocok untuk grup sendiri. Tur standar tetap tersedia; kami jelaskan pilihan yang paling sesuai sebelum Anda memutuskan.</span>
        <div>{["Pasangan", "Keluarga & anak", "Teman-teman", "Jadwal fleksibel", "Pilihan bahasa*", "Kebutuhan makan*"].map((item, i) => <b key={item}><i>0{i + 1}</i>{item}</b>)}</div>
        <p>*Bahasa pemandu dan kebutuhan khusus mengikuti ketersediaan serta konfirmasi.</p><a href={whatsapp("tur privat dan mobil dengan sopir")} target="_blank" rel="noopener noreferrer">Minta penawaran privat →</a>
      </div>
    </section>
    <section className={styles.section} id="wisata">
      <div className={styles.head}><div><p>02 · DA NANG · HOI AN · HUE</p><h2>Satu pengalaman utama setiap hari.</h2></div><span>Pilih tempat yang benar-benar ingin Anda nikmati. Sisakan waktu untuk pantai, makan dan istirahat; jangan habiskan liburan hanya di jalan.</span></div>
      <div className={styles.cards}>{tours.slice(0, 4).map(tour => <a href={whatsapp(tour.name)} key={tour.key} target="_blank" rel="noopener noreferrer"><div className={styles.photo}><Image src={tour.image} alt={tour.name} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw" /><span>{tour.destination}</span></div><div className={styles.body}><h3>{tour.name}</h3><p>{tour.text}</p><div><strong>Mulai {price(tour.key)}</strong><b>Tanya →</b></div></div></a>)}</div>
    </section>
    <section className={styles.priceZone} id="harga"><div className={styles.priceIntro}><p>03 · HARGA YANG JELAS</p><h2>Bandingkan isi paket sebelum memilih.</h2><span>Harga mulai untuk produk standar, per orang dewasa, dalam VND. Tur privat, pemandu bahasa tertentu dan kebutuhan khusus dikonfirmasi serta dihitung terpisah.</span></div>
      <div className={styles.priceGrid}>{tours.map(tour => <a key={tour.key} href={whatsapp(`harga dan rincian paket ${tour.name}`)} target="_blank" rel="noopener noreferrer"><small>{tour.destination}</small><h3>{tour.name}</h3><strong>Mulai {price(tour.key)}</strong><b>Per orang dewasa · paket standar</b><span>{tour.note}</span><span>Cek tanggal & rincian →</span></a>)}</div>
      <p className={styles.disclaimer}>Harga anak, penjemputan, makan, tiket, biaya tambahan dan ketersediaan perlu dikonfirmasi untuk tanggal Anda. Produk Phu Quoc dijalankan oleh operator lokal sesuai paket, termasuk John’s Tours. GoVietStay membantu pemesanan dan komunikasi.</p>
    </section>
    <section className={styles.section} id="itinerary"><div className={styles.head}><div><p>04 · CONTOH ITINERARY</p><h2>Empat hari di Da Nang, tanpa terburu-buru.</h2></div><span>Ini contoh rencana, bukan paket dengan semua layanan sudah termasuk. Untuk tiga hari, sesuaikan hari kedatangan dan keberangkatan; jangan memaksakan semua tempat.</span></div>
      <div className={styles.whyGrid}>{itinerary.map(([heading, body]) => <div key={heading}><h3>{heading}</h3><p>{body}</p></div>)}</div><a className={styles.reviews} href={whatsapp("itinerary Da Nang 3–4 hari")} target="_blank" rel="noopener noreferrer">Sesuaikan dengan penerbangan saya →</a>
    </section>
    <section className={styles.why} id="kebutuhan"><div className={styles.head}><div><p>05 · NYAMAN UNTUK ANDA</p><h2>Kebutuhan setiap tamu berbeda.</h2></div><span>Beri tahu apa yang penting bagi Anda. Kami mengecek detail sebelum menjanjikan layanan.</span></div>
      <div className={styles.whyGrid}>
        <div><b>01</b><h3>Makanan halal jika diperlukan</h3><p>Kirim kebutuhan halal dan alergi. Pilihan restoran serta menu tur diperiksa per layanan; sertifikasi perlu dikonfirmasi bila Anda mensyaratkannya.</p></div>
        <div><b>02</b><h3>Waktu ibadah</h3><p>Jika diperlukan, sampaikan waktu dan kebutuhan tempat ibadah sejak awal agar dapat dipertimbangkan dalam rute privat.</p></div>
        <div><b>03</b><h3>Anak & orang tua</h3><p>Usia anak, mobilitas dan jeda istirahat membantu kami menyusun pilihan transportasi serta durasi perjalanan.</p></div>
        <div><b>04</b><h3>Bahasa pemandu</h3><p>Pemandu berbahasa Indonesia tidak otomatis tersedia. Bahasa, ketersediaan dan biaya dikonfirmasi sebelum pemesanan.</p></div>
      </div>
    </section>
    <section className={styles.phu} id="phuquoc"><div className={styles.phuText}><p>06 · PHU QUOC</p><h2>Pilih area hotel, baru susun hari wisata.</h2><span>Pulau, pantai dan waktu santai di resort tidak perlu dipadatkan dalam satu hari. Kirim lokasi hotel agar perjalanan ke utara dan selatan pulau lebih masuk akal.</span><div><a href={whatsapp("liburan keluarga di Phu Quoc")} target="_blank" rel="noopener noreferrer">Liburan keluarga →</a><a href={whatsapp("mobil privat di Phu Quoc")} target="_blank" rel="noopener noreferrer">Mobil privat →</a></div></div>
      <div className={`${styles.phuCards} ${local.phuCards}`}>{tours.slice(4).map(tour => <a key={tour.key} href={whatsapp(tour.name)} target="_blank" rel="noopener noreferrer"><Image src={tour.image} alt={tour.name} fill sizes="(max-width: 560px) 85vw, 35vw" /><div><small>{tour.destination}</small><h3>{tour.name}</h3><b>Mulai {price(tour.key)}</b><span>Tanya paket →</span></div></a>)}</div>
    </section>
    <section className={styles.guests}><div className={styles.head}><div><p>07 · PERJALANAN BERSAMA GOVIETSTAY</p><h2>Lihat pengalaman tamu kami.</h2></div><span>Foto tamu GoVietStay dari berbagai negara. Lihat profil dan ulasan di Google Maps sebelum merencanakan perjalanan Anda.</span></div><div className={styles.guestStrip}>{italyGuestPhotos.slice(0, 5).map((src, i) => <figure key={src}><Image src={src} alt={`Tamu GoVietStay dalam perjalanan di Vietnam, foto ${i + 1}`} width={320} height={240} sizes="(max-width: 560px) 45vw, 20vw" /></figure>)}</div><a className={styles.reviews} href={italyMarketConfig.googleMaps} target="_blank" rel="noopener noreferrer">Lihat GoVietStay di Google Maps →</a></section>
    <section className={`${styles.section} ${local.faq}`} id="pertanyaan"><div className={styles.head}><div><p>08 · SEBELUM MEMESAN</p><h2>Pertanyaan yang sering ditanyakan.</h2></div></div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<p>Informasi resmi: <a href="https://evisa.gov.vn" target="_blank" rel="noopener noreferrer">Portal e-Visa Vietnam ↗</a></p><p><a href="/travel" lang="en">Baca panduan perjalanan dalam bahasa Inggris →</a></p></section>
    <section className={styles.final}><Image src="/tour/cham.jpg" alt="Wisata pulau di Vietnam" fill sizes="100vw" /><div><p>TIM LOKAL ANDA DI VIETNAM</p><h2>Mulai dari tanggal, jumlah tamu dan hotel. Kami bantu susun langkah berikutnya.</h2><a href={whatsapp()} target="_blank" rel="noopener noreferrer">Hubungi GoVietStay di WhatsApp</a><p>WhatsApp +84 937 762 607 · Da Nang · Hoi An · Hue · Phu Quoc</p></div></section>
    <nav className={styles.mobile} aria-label="Akses cepat"><a href={whatsapp()} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="#harga">Lihat harga</a><a href="#itinerary">Rencana 4 hari</a></nav>
  </main>;
}
