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

const more:Record<Slug,{highlights:string[];plan:string[];included:string[];check:string[];tips:string[];faq:{q:string;a:string}[]}> = {
 "ba-na-hills-private-tour":{
 highlights:["สะพานทองคำ (Golden Bridge) จุดถ่ายภาพยอดนิยมบนภูเขา","นั่งกระเช้าชมวิวขึ้นสู่บานาฮิลล์","เดินเที่ยวสวนดอกไม้และโซนหมู่บ้านฝรั่งเศส","จัดเวลาเที่ยวตามความสนใจของครอบครัวได้เมื่อจองรถส่วนตัว"],
 plan:["ช่วงเช้า: รถรับจากโรงแรมในดานัง มุ่งหน้าไปบานาฮิลล์","ขึ้นกระเช้าไปชมสะพานทองคำก่อนจุดท่องเที่ยวอื่นตามความเหมาะสม","ช่วงกลางวัน: พักทานอาหารกลางวัน เลือกแพ็กเกจรวมบุฟเฟต์ได้","ช่วงบ่าย: เที่ยวชมหมู่บ้านฝรั่งเศสและจุดถ่ายรูป ก่อนลงกระเช้า","เดินทางกลับโรงแรมในดานัง"],
 included:["โปรแกรมทัวร์ 1 วันตามตัวเลือกที่ยืนยันในใบเสนอราคา","บริการประสานงานและช่วยเหลือจากทีมงานท้องถิ่น","ตัวเลือกเสริม: รถส่วนตัว ไกด์ และบุฟเฟต์"],
 check:["กรุณาตรวจสอบว่าราคาที่เสนอรวมตั๋วกระเช้าและบุฟเฟต์หรือไม่","ค่าใช้จ่ายส่วนตัวและกิจกรรมพิเศษที่ไม่ระบุในใบเสนอราคา","ไกด์ภาษาไทยขึ้นอยู่กับวันเดินทางและการยืนยันจากทีมงาน"],
 tips:["บนภูเขาอาจมีหมอก ฝน และอากาศเย็นกว่าตัวเมือง ควรนำเสื้อคลุมไปด้วย","หากเดินทางกับผู้สูงอายุหรือเด็ก แจ้งอายุและความต้องการล่วงหน้า","อยากเที่ยวฮอยอันในวันถัดไป? ขอโปรแกรมรวมสองทัวร์ได้"],
 faq:[{q:"เที่ยวบานาฮิลล์ใช้เวลากี่ชั่วโมง?",a:"โดยทั่วไปควรเผื่อเวลาส่วนใหญ่ของวันสำหรับการเดินทาง กระเช้า และการเดินเที่ยวบนภูเขา ระยะเวลาอาจเปลี่ยนตามสภาพอากาศและจำนวนคน"},{q:"ราคานี้รวมบุฟเฟต์ไหม?",a:"โปรแกรมแต่ละแบบมีรายการรวมไม่เท่ากัน ทีมงานจะแจ้งให้ชัดเจนในใบเสนอราคาก่อนจอง"},{q:"สามารถไปรับที่ฮอยอันได้ไหม?",a:"แจ้งชื่อโรงแรมและวันเดินทางได้เลย ทีมงานจะเช็กราคาและรถรับส่งจากฮอยอันให้"}]
 },
 "hoi-an-private-tour":{
 highlights:["สัมผัสบรรยากาศร่องเรือกระด้งในป่ามะพร้าวกั๊มแทง","เดินเล่นถนนเมืองเก่า อาคารเก่าและร้านคาเฟ่ริมแม่น้ำ","ชมแสงโคมไฟยามค่ำที่ฮอยอัน","เหมาะกับคู่รัก ครอบครัว และกลุ่มเพื่อนที่อยากเที่ยวสบาย ๆ"],
 plan:["ช่วงบ่าย: รับจากโรงแรมในดานังตามเวลาที่ตกลงกัน","แวะป่ามะพร้าวกั๊มแทงและนั่งเรือกระด้ง","เดินทางเข้าเมืองเก่าฮอยอัน เดินเล่นและแวะถ่ายภาพ","ช่วงเย็น: ทานอาหารตามอัธยาศัยและชมโคมไฟริมแม่น้ำ","ช่วงค่ำ: เดินทางกลับโรงแรม"],
 included:["จัดโปรแกรมป่ามะพร้าวและฮอยอันตามบริการที่ระบุในใบเสนอราคา","การประสานงานก่อนเดินทางจากทีมงาน GoVietStay","ตัวเลือกเสริม: รถส่วนตัวและไกด์ตามภาษาที่ต้องการ"],
 check:["ค่าอาหาร ของฝาก และค่าใช้จ่ายส่วนตัว","กิจกรรมล่องเรือปล่อยโคมในแม่น้ำอาจมีค่าใช้จ่ายแยก","ตรวจสอบรายการตั๋วเรือกระด้งและบัตรเข้าเมืองเก่าในใบเสนอราคา"],
 tips:["ถ้าอยากถ่ายรูปกับโคมไฟ ควรจัดเวลาให้อยู่ถึงช่วงเย็น","ใส่รองเท้าเดินสบาย เพราะเมืองเก่าเหมาะกับการเดินเท้า","ช่วงฝนตกหนักอาจต้องเปลี่ยนลำดับกิจกรรมหรือปรับเวลาตามความปลอดภัย"],
 faq:[{q:"เรือกระด้งเหมาะกับเด็กไหม?",a:"สามารถจัดสำหรับครอบครัวได้ โดยต้องแจ้งอายุเด็กเพื่อเช็กเงื่อนไขผู้ให้บริการและอุปกรณ์ความปลอดภัย"},{q:"กลับดานังตอนกลางคืนได้ไหม?",a:"ได้ สามารถกำหนดเวลากลับตามโปรแกรมรถที่ยืนยันไว้ก่อนเดินทาง"},{q:"เลือกไปแค่ฮอยอันได้ไหม?",a:"ได้ หากไม่ต้องการล่องเรือกระด้ง แจ้งทีมงานเพื่อปรับโปรแกรมและราคา"}]
 },
 "da-nang-private-package-4d3n":{
 highlights:["เที่ยวบานาฮิลล์และสะพานทองคำ","สนุกกับเรือกระด้งและชมโคมไฟฮอยอัน","รับส่งสนามบินและจัดเส้นทางให้เหมาะกับเที่ยวบิน","สามารถปรับโปรแกรมเป็นทัวร์ส่วนตัวสำหรับกลุ่มของคุณ"],
 plan:["วันแรก: รับจากสนามบินดานัง ส่งโรงแรม พักผ่อนหรือเดินเล่นริมทะเลหมีเควตามเวลาที่มี","วันที่สอง: เดินทางไปบานาฮิลล์ ขึ้นกระเช้า ถ่ายรูปสะพานทองคำ และเที่ยวหมู่บ้านฝรั่งเศส","วันที่สาม: เที่ยวเขาหินอ่อน (หากเวลาและสภาพร่างกายเหมาะสม) ล่องเรือกระด้งที่กั๊มแทง และเดินเล่นฮอยอันยามเย็น","วันที่สี่: เที่ยวชมดานังหรือแวะซื้อของตามเวลา ก่อนส่งสนามบิน"],
 included:["แผนเดินทาง 4 วัน 3 คืน พร้อมรถตามช่วงบริการที่ตกลงกัน","ตัวเลือกโรงแรม ระดับห้องและอาหารตามงบประมาณ","เลือกเพิ่มตั๋วบานาฮิลล์ เรือกระด้ง และไกด์ตามความต้องการ"],
 check:["ราคาสุดท้ายขึ้นกับจำนวนผู้เดินทาง วันเข้าพัก ระดับโรงแรม และรายการที่รวม","ตั๋วเครื่องบินระหว่างประเทศไม่รวม เว้นแต่ระบุเป็นลายลักษณ์อักษร","อาหาร ค่าใช้จ่ายส่วนตัว และกิจกรรมที่ไม่ระบุในใบเสนอราคา"],
 tips:["แจ้งเวลาเครื่องบินขาเข้าและขาออก เพื่อจัดวันแรกและวันสุดท้ายไม่ให้เร่งรีบ","หากมาในช่วงฝนปลายปี สามารถสลับวันบานาฮิลล์และฮอยอันได้ตามสภาพอากาศ","ถ้ามีเด็ก ผู้สูงอายุ หรือต้องการห้องพักแบบครอบครัว แจ้งไว้ตั้งแต่ต้น"],
 faq:[{q:"แพ็กเกจ 4 วัน 3 คืนรวมโรงแรมไหม?",a:"จัดให้รวมโรงแรมได้ตามงบที่ต้องการ แจ้งจำนวนห้อง ประเภทห้อง และวันเดินทาง แล้วทีมงานจะเสนอรายการรวมที่ชัดเจน"},{q:"เป็นทัวร์ส่วนตัวจริงไหม?",a:"สามารถจัดรถและเส้นทางสำหรับกลุ่มของคุณได้โดยเฉพาะ ราคาจะขึ้นกับจำนวนคนและบริการที่เลือก"},{q:"ถ้าฝนตกสามารถปรับแผนได้ไหม?",a:"ทีมงานช่วยปรับลำดับการเที่ยวตามสภาพอากาศและเงื่อนไขบริการที่จองไว้"}]
 }
};

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

  <section className="my-9"><h2 className="text-2xl font-bold">จุดเด่นของทริปนี้</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{more[slug as Slug].highlights.map(x=><div key={x} className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 leading-7">{x}</div>)}</div></section>
  <section className="my-9"><h2 className="text-2xl font-bold">รายละเอียดโปรแกรม</h2><ol className="mt-4 space-y-3">{more[slug as Slug].plan.map((x,i)=><li className="flex gap-3 rounded-xl bg-slate-50 p-4 leading-7" key={x}><span className="font-bold text-emerald-800">{i+1}.</span><span>{x}</span></li>)}</ol></section>
  <section className="my-9 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-emerald-200 p-5"><h2 className="text-xl font-bold">สิ่งที่จัดให้ได้</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7">{more[slug as Slug].included.map(x=><li key={x}>{x}</li>)}</ul></div><div className="rounded-2xl border border-slate-200 p-5"><h2 className="text-xl font-bold">เรื่องที่ควรเช็กก่อนจอง</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7">{more[slug as Slug].check.map(x=><li key={x}>{x}</li>)}</ul></div></section>
  <section className="my-9"><h2 className="text-2xl font-bold">คำแนะนำจากทีมงานท้องถิ่น</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7">{more[slug as Slug].tips.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section className="my-9"><h2 className="text-2xl font-bold">คำถามที่พบบ่อย</h2><div className="mt-4 space-y-3">{more[slug as Slug].faq.map(x=><details className="rounded-xl border p-4" key={x.q}><summary className="cursor-pointer font-semibold">{x.q}</summary><p className="mt-3 leading-7 text-slate-700">{x.a}</p></details>)}</div></section>
  <section className="my-9"><h2 className="text-2xl font-bold">เที่ยวต่อที่ไหนดี?</h2><div className="mt-3 flex flex-wrap gap-3">{Object.entries(tours).filter(([key])=>key!==slug).map(([key,value])=><Link key={key} href={"/th/"+key} className="rounded-full border border-emerald-700 px-4 py-2 text-emerald-800 hover:bg-emerald-50">{value.short}</Link>)}<Link href="/th/request-tour" className="rounded-full border border-emerald-700 px-4 py-2 text-emerald-800">จัดทริปตามใจคุณ</Link></div></section>
  <PublicInquiryForm productCode={t.code} productName={t.short} sourcePage={"/th/"+slug} locale="th"/>
  <p className="mt-6"><Link href="/th" className="text-emerald-800 underline">ดูทัวร์อื่น ๆ</Link></p>
 </main>;
}
