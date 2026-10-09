import type {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";
import PublicInquiryForm from "../../../components/PublicInquiryForm";
const tours={
 "ba-na-hills-private-tour":{title:"เที่ยวบานาฮิลล์และสะพานทองคำจากดานัง",short:"บานาฮิลล์และสะพานทองคำ",intro:"นั่งกระเช้าขึ้นบานาฮิลล์ ชมสะพานทองคำและเดินเที่ยวตามเวลาที่คุณสะดวก",image:"/tour/bana.jpg",price:"1,550,000 ดอง / คน",steps:["รับจากโรงแรมในดานัง","นั่งกระเช้าและชมสะพานทองคำ","เดินเที่ยวบานาฮิลล์ตามโปรแกรม","ส่งกลับโรงแรม"],code:"TH-BANA"},
 "hoi-an-private-tour":{title:"เที่ยวฮอยอันและล่องเรือกระด้ง",short:"ฮอยอันและเรือกระด้ง",intro:"ล่องเรือกระด้งที่ป่ามะพร้าว แล้วไปเดินเล่นเมืองเก่าฮอยอันยามเย็น",image:"/tour/hoian.jpg",price:"1,250,000 ดอง / คน",steps:["รับจากโรงแรม","ล่องเรือกระด้งที่ป่ามะพร้าว","เดินเล่นเมืองเก่าฮอยอัน","ชมโคมไฟยามเย็นและเดินทางกลับ"],code:"TH-HOIAN"},
 "da-nang-private-package-4d3n":{title:"ทริปดานังส่วนตัว 4 วัน 3 คืน",short:"ดานัง 4 วัน 3 คืน",intro:"เที่ยวดานัง บานาฮิลล์ ฮอยอันกับคนที่คุณรัก มีรถรับส่งและปรับเวลาเที่ยวให้เข้ากับเที่ยวบินได้",image:"/tour/hoian.jpg",price:"สอบถามราคาตามจำนวนผู้เดินทาง",steps:["วันที่ 1: รับที่สนามบินดานังและพักผ่อน","วันที่ 2: บานาฮิลล์และสะพานทองคำ","วันที่ 3: ป่ามะพร้าวและเมืองเก่าฮอยอัน","วันที่ 4: เที่ยวในเมืองตามเวลาและส่งสนามบิน"],code:"TH-4D3N"}
} as const;
type Slug=keyof typeof tours;
export function generateStaticParams(){return Object.keys(tours).map(slug=>({slug}));}
export const dynamicParams=false;
export function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 return params.then(({slug})=>{const tour=tours[slug as Slug];if(!tour)return {robots:{index:false}};return {
 title:tour.title+" | GoVietStay",description:tour.intro+" ติดต่อทีมงานเพื่อสอบถามวันเดินทางและราคา",
 alternates:{canonical:"https://www.govietstay.com/th/"+slug,languages:{"th-TH":"https://www.govietstay.com/th/"+slug}},
 openGraph:{title:tour.title,description:tour.intro,images:[{url:"https://www.govietstay.com"+tour.image,alt:tour.short}]}
 };});
}
export default async function ThaiTourPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const t=tours[slug as Slug];if(!t)return null;
 return <main className="mx-auto max-w-5xl px-4 py-8 text-slate-900">
  <nav className="mb-5 text-sm"><Link href="/th" className="text-emerald-800 underline">ทัวร์เวียดนาม</Link> / {t.short}</nav>
  <div className="relative h-56 overflow-hidden rounded-2xl md:h-96"><Image src={t.image} alt={t.short} fill priority sizes="(max-width: 768px) 100vw, 950px" className="object-cover"/></div>
  <h1 className="mt-6 text-3xl font-bold md:text-4xl">{t.title}</h1><p className="mt-3 text-lg leading-8">{t.intro}</p>
  <p className="mt-3 font-semibold text-emerald-800">{t.price}</p><p className="mt-1 text-sm text-slate-600">ราคาทัวร์วันเดียวอ้างอิงโปรแกรมภาษาอังกฤษ หากต้องการรถส่วนตัวหรือไกด์ภาษาไทย กรุณาสอบถามราคาตามวันเดินทางและจำนวนคน</p>
  <section className="my-8"><h2 className="text-2xl font-bold">แผนเที่ยวโดยประมาณ</h2><ol className="mt-4 grid gap-3">{t.steps.map((x,i)=><li key={x} className="rounded-lg bg-slate-50 p-3">{i+1}. {x}</li>)}</ol><p className="mt-3 text-sm text-slate-600">เวลาและสถานที่อาจปรับเปลี่ยนได้ตามสภาพอากาศและความเหมาะสม</p></section>
  <section className="mb-8 rounded-xl border p-5"><h2 className="text-xl font-bold">ก่อนจองควรรู้อะไรบ้าง?</h2><h3 className="mt-4 font-semibold">จองทัวร์ส่วนตัวได้ไหม?</h3><p>ได้ค่ะ/ครับ แจ้งจำนวนคน วันที่เดินทาง และโรงแรมเพื่อให้ทีมงานเสนอราคา</p><h3 className="mt-4 font-semibold">มีไกด์ภาษาไทยไหม?</h3><p>สามารถสอบถามได้ ทีมงานจะตรวจสอบไกด์ที่ว่างในวันเดินทางก่อนยืนยัน</p><h3 className="mt-4 font-semibold">ต้องชำระเงินทันทีไหม?</h3><p>ไม่ต้องค่ะ/ครับ ส่งรายละเอียดมาให้ทีมงานเช็กวันว่างและราคาก่อนได้</p></section>
  <PublicInquiryForm productCode={t.code} productName={t.short} sourcePage={"/th/"+slug} locale="th"/>
  <p className="mt-6"><Link href="/th" className="text-emerald-800 underline">ดูทัวร์อื่น ๆ</Link></p>
 </main>;
}
