import type { Metadata } from "next";
import PublicInquiryForm from "../../../components/PublicInquiryForm";

export const metadata: Metadata = {
 title: "จองทัวร์ส่วนตัวดานัง ฮอยอัน เว้ | GoVietStay",
 description: "ส่งคำขอทัวร์ส่วนตัว แพ็กเกจ 4 วัน 3 คืน หรือคอมโบทัวร์กับ GoVietStay รับใบเสนอราคาก่อนจอง",
 alternates: { canonical: "https://www.govietstay.com/th/request-tour" },
 robots: { index: true, follow: true }
};

export default function ThaiTourRequestPage(){
 return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
  <nav className="mb-6 text-sm text-slate-600"><a href="/th" className="underline">GoVietStay Thailand</a> / ขอใบเสนอราคา</nav>
  <header className="mb-8">
   <p className="text-sm font-semibold uppercase tracking-wider text-emerald-800">GoVietStay · Trusted Local Support</p>
   <h1 className="mt-2 text-3xl font-bold">จองทัวร์ส่วนตัวและแพ็กเกจเที่ยวเวียดนาม</h1>
   <p className="mt-3 leading-7 text-slate-700">เลือกทัวร์ส่วนตัว แพ็กเกจ 4 วัน 3 คืน หรือคอมโบทัวร์ดานัง ฮอยอัน เว้ และฟูก๊วก แจ้งวันที่ จำนวนผู้เดินทาง และความต้องการของคุณ ทีมงานจะตรวจสอบบริการและเสนอราคาก่อนยืนยันการจอง</p>
  </header>
  <PublicInquiryForm productCode="TH-TOUR-REQUEST" productName="Da Nang / Hoi An / Hue / Phu Quoc private tour or combo" sourcePage="/th/request-tour" locale="th"/>
  <p className="mt-6 text-sm text-slate-600">แบบฟอร์มนี้เป็นคำขอใบเสนอราคา ไม่ใช่การชำระเงินหรือการจองที่ได้รับการยืนยัน</p>
 </main>;
}
