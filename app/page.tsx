import type {Metadata} from "next";
import HomeClient from "./HomeClient";
export const metadata:Metadata={
 title:{absolute:"Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay"},
 description:"GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",
 alternates:{canonical:"https://www.govietstay.com",languages:{en:"https://www.govietstay.com",ru:"https://www.govietstay.com/ru","it-IT":"https://www.govietstay.com/it","x-default":"https://www.govietstay.com"}},
 openGraph:{type:"website",locale:"en_US",url:"https://www.govietstay.com",siteName:"GoVietStay",
  title:"Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",
  description:"GoVietStay provides private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc. WhatsApp 24/7.",
  images:[{url:"https://www.govietstay.com/hero-hoian-new.png",alt:"GoVietStay Vietnam tours"}]},
 twitter:{card:"summary_large_image",title:"Private Tours in Da Nang, Hoi An, Hue & Phu Quoc | GoVietStay",description:"Private tours, airport transfers, attraction tickets and trusted local travel support in Da Nang, Hoi An, Hue & Phu Quoc.",images:["https://www.govietstay.com/hero-hoian-new.png"]},
};
export default function Page(){return <>
  <HomeClient/>
  <aside className="border-t border-emerald-100 bg-[#f5f8f5] px-5 py-7 text-slate-800" aria-label="Practical Vietnam travel guides in Polish">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-bold uppercase tracking-wider text-emerald-900">Vietnam travel guides in Polish · Przewodniki po polsku</p>
      <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold leading-7">
        <a className="text-emerald-800 underline underline-offset-4" href="/pl/phu-quoc-przewodnik">Phu Quoc – przewodnik</a>
        <a className="text-emerald-800 underline underline-offset-4" href="/pl/phu-quoc-wycieczki-prywatne">Phu Quoc – wycieczki prywatne</a>
        <a className="text-emerald-800 underline underline-offset-4" href="/pl/danang-hoi-an-hue">Da Nang · Hoi An · Hue</a>
      </nav>
      <div className="mt-6 border-t border-emerald-100 pt-5">
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-900">Vietnam for Belarusian travelers · Давeднікі па-беларуску</p>
        <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold leading-7">
          <a className="text-emerald-800 underline underline-offset-4" href="/be/phu-quoc">Фукуок — даведнік</a>
          <a className="text-emerald-800 underline underline-offset-4" href="/be/phu-quoc-tours">Экскурсіі Фукуок</a>
          <a className="text-emerald-800 underline underline-offset-4" href="/be/vietnam-travel">В’етнам — маршруты</a>
          <a className="text-emerald-800 underline underline-offset-4" href="/be/da-nang-hoi-an">Дананг і Хойан</a>
          <a className="text-emerald-800 underline underline-offset-4" href="/be/hue-central-vietnam">Хюэ</a>
          <a className="text-emerald-800 underline underline-offset-4" href="/ru/phu-quoc/from-minsk">Из Минска на Фукуок</a>
        </nav>
      </div>
    </div>
  </aside>
</>;}
