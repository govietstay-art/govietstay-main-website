import type { Metadata } from "next";
import PublicInquiryForm from "../../../components/PublicInquiryForm";

export const metadata: Metadata = {
 title: "ทัวร์ส่วนตัวดานัง ฮอยอัน เว้ | ขอราคา GoVietStay",
 description: "สนใจเที่ยวดานัง ฮอยอัน เว้ หรือฟูก๊วก? บอกวันเดินทางและจำนวนคน แล้วเราช่วยจัดทริปและแจ้งราคาให้ก่อนตัดสินใจ",
 alternates: { canonical: "https://www.govietstay.com/th/request-tour" },
 robots: { index: true, follow: true }
};

export default function ThaiTourRequestPage(){
 return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
  <nav className="mb-6 text-sm text-slate-600"><a href="/th" className="underline">GoVietStay Thailand</a> / ขอใบเสนอราคา</nav>
  <header className="mb-8">
   <p className="text-sm font-semibold uppercase tracking-wider text-emerald-800">GoVietStay · Trusted Local Support</p>
   <h1 className="mt-2 text-3xl font-bold">อยากเที่ยวเวียดนามแบบไหน บอกเราได้เลย</h1>
   <p className="mt-3 leading-7 text-slate-700">เที่ยวดานัง ฮอยอัน เว้ หรือฟูก๊วกกับครอบครัวและเพื่อน ๆ จะเลือกเที่ยววันเดียวหรือให้เราช่วยจัดทริปหลายวันก็ได้ กรอกข้อมูลสั้น ๆ ด้านล่าง แล้วทีมงานจะติดต่อกลับพร้อมรายละเอียดและราคา</p>
  </header>
  <PublicInquiryForm productCode="TH-TOUR-REQUEST" productName="Da Nang / Hoi An / Hue / Phu Quoc private tour or combo" sourcePage="/th/request-tour" locale="th"/>
  <p className="mt-6 text-sm text-slate-600">ส่งข้อมูลเพื่อสอบถามก่อนได้ ยังไม่ต้องชำระเงิน และยังไม่ถือว่าเป็นการยืนยันการจอง</p>
 </main>;
}
