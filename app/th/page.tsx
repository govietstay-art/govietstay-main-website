import Link from "next/link";
import Image from "next/image";
import type {Metadata} from "next";
import PublicInquiryForm from "../../components/PublicInquiryForm";

export const metadata:Metadata={
 title:"ทัวร์ส่วนตัวดานัง ฮอยอัน เว้ และฟูก๊วก | GoVietStay",
 description:"เที่ยวเวียดนามกับคนที่คุณเลือก ทัวร์ส่วนตัวดานัง บานาฮิลล์ ฮอยอัน เว้ และฟูก๊วก มีรถรับส่งและทีมท้องถิ่นช่วยดูแล ขอราคาได้ก่อนจอง",
 alternates:{canonical:"https://www.govietstay.com/th",languages:{"th-TH":"https://www.govietstay.com/th"}},
 openGraph:{title:"เที่ยวดานัง ฮอยอัน และฟูก๊วกกับ GoVietStay",description:"เลือกทัวร์วันเดียว หรือจัดทริปส่วนตัวตามวันเดินทางของคุณ",images:["https://www.govietstay.com/tour/hoian.jpg"]},
};
const cards=[
 {title:"บานาฮิลล์และสะพานมือ",detail:"ชมสะพานทองคำ เที่ยวสวนสนุกบนภูเขา เลือกวันเดินทางได้",price:"1,550,000 ดอง / คน",img:"/tour/bana.jpg",href:"/th/ba-na-hills-private-tour"},
 {title:"ฮอยอันและเรือกระด้ง",detail:"ล่องเรือกระด้ง เดินเล่นเมืองเก่า ชมโคมไฟยามเย็น",price:"1,250,000 ดอง / คน",img:"/tour/hoian.jpg",href:"/th/hoi-an-private-tour"},
 {title:"แพ็กเกจดานัง 4 วัน 3 คืน",detail:"เหมาะกับครอบครัวและกลุ่มเพื่อน ปรับแผนเที่ยวได้",price:"ขอราคาตามจำนวนคน",img:"/tour/hoian.jpg",href:"/th/da-nang-private-package-4d3n"}
];
export default function ThaiHome(){
 return <main className="mx-auto max-w-6xl px-4 py-8 text-slate-900">
 <section className="overflow-hidden rounded-3xl bg-slate-900 text-white">
  <div className="relative h-60 md:h-96"><Image src="/tour/hoian.jpg" alt="เมืองเก่าฮอยอัน เวียดนาม" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 1100px"/></div>
  <div className="p-6 md:p-9">
   <p className="text-sm text-emerald-200">GoVietStay · ดูแลโดยทีมงานท้องถิ่นในเวียดนาม</p>
   <h1 className="mt-2 text-3xl font-bold md:text-5xl">เที่ยวเวียดนามแบบส่วนตัว ในสไตล์ของคุณ</h1>
   <p className="mt-3 max-w-3xl leading-8">อยากเที่ยวดานัง ฮอยอัน เว้ หรือฟูก๊วกกับครอบครัวหรือเพื่อน ๆ? บอกเราว่าอยากไปไหนและมีเวลากี่วัน เราช่วยจัดรถและโปรแกรมให้เหมาะกับทริปของคุณ</p>
   <Link href="/th/request-tour" className="mt-5 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white">สอบถามราคาและวันเดินทาง</Link>
  </div>
 </section>
 <section className="py-10"><h2 className="mb-5 text-2xl font-bold">ทริปยอดนิยม</h2><div className="grid gap-5 md:grid-cols-3">
 {cards.map(c=><article key={c.href} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="relative h-48"><Image src={c.img} alt={c.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw"/></div><div className="p-5"><h3 className="text-xl font-bold">{c.title}</h3><p className="mt-2 text-slate-600">{c.detail}</p><p className="mt-3 font-semibold text-emerald-800">{c.price}</p><Link href={c.href} className="mt-4 inline-block font-semibold underline">ดูรายละเอียดทัวร์</Link></div></article>)}
 </div></section>
 <section className="rounded-2xl bg-emerald-50 p-6"><h2 className="text-2xl font-bold">เลือกหลายทัวร์ก็ได้</h2><p className="mt-2 leading-7">อยากไปทั้งบานาฮิลล์ ฮอยอัน และเว้? เลือกเที่ยววันไหนก่อนก็ได้ แล้วให้เราช่วยจัดเป็นโปรแกรมเดียวกัน ราคาทัวร์วันเดียวเป็นราคาเริ่มต้นสำหรับโปรแกรมภาษาอังกฤษ ส่วนรถส่วนตัวและไกด์ภาษาไทยแจ้งราคาเมื่อทราบจำนวนคนและวันเดินทาง</p><div className="mt-5"><PublicInquiryForm productCode="TH-PRIVATE-COMBO" productName="เลือกทัวร์ดานัง ฮอยอัน เว้ ฟูก๊วก" sourcePage="/th" locale="th"/></div></section>
 <footer className="py-8 text-sm text-slate-600">GoVietStay · Da Nang · Hoi An · Hue · Phu Quoc</footer>
 </main>
}