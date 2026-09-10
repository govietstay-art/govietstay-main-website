"use client";

import { FormEvent, useMemo, useState } from "react";
import { PHU_QUOC_PUBLISHED_RATES } from "../lib/phuQuocPublishedRates";

type Language = "en" | "ru";
type Tour = {
  code: string;
  slug: string;
  ru: string;
  en: string;
  categoryRu: string;
  categoryEn: string;
  adult: number;
  child: number;
  image: string;
  fallback: string;
  featureRu: string;
  featureEn: string;
  cableCar?: boolean;
};
type PrivateTour = {
  code: string;
  ru: string;
  en: string;
  time: string;
  image: string;
  fallback: string;
  bulletsRu: string[];
  bulletsEn: string[];
};
type BookingForm = {
  fullName: string;
  whatsapp: string;
  email: string;
  tourDate: string;
  adults: number;
  children: number;
  infants: number;
  childDetails: string;
  hotel: string;
  pickup: string;
  language: string;
  request: string;
  website: string;
};

const WHATSAPP_NUMBER = "84937762607";
const JOHNS_ISLAND = "/tour/phuquoc/johns/trip3-may-rut-trong.jpg";
const JOHNS_SNORKEL = "/tour/phuquoc/johns/trip3-snorkeling.jpg";
const JOHNS_LUXURY = "/tour/phuquoc/johns/luxury-speedboat.jpg";
const JOHNS_CABLE = "/tour/phuquoc/johns/cable-car-trip.jpg";
const rates = PHU_QUOC_PUBLISHED_RATES;

const tours: Tour[] = [
  { code:"TRIP 2", slug:"trip-2-fishing-snorkeling", ru:"Рыбалка и снорклинг на юге Фукуока", en:"South Island Fishing & Snorkeling", categoryRu:"Лодка · рыбалка · снорклинг", categoryEn:"Boat · fishing · snorkeling", adult:rates["TRIP 2"].adult, child:rates["TRIP 2"].child, image:JOHNS_SNORKEL, fallback:"/tour/phuquoc/tour-01-1.jpg", featureRu:"Спокойный морской день с рыбалкой и снорклингом.", featureEn:"A relaxed sea day combining fishing and snorkeling." },
  { code:"TRIP 3", slug:"trip-3-three-islands", ru:"3 острова на лодке", en:"3 Islands by Boat", categoryRu:"3 острова · снорклинг", categoryEn:"3 islands · snorkeling", adult:rates["TRIP 3"].adult, child:rates["TRIP 3"].child, image:JOHNS_ISLAND, fallback:"/tour/phuquoc/tour-02-1.jpg", featureRu:"Классический маршрут по южному архипелагу Фукуока.", featureEn:"A classic route through Phu Quoc's southern archipelago." },
  { code:"TRIP 4", slug:"trip-4-cable-car-three-islands", ru:"3 острова + канатная дорога Хон Тхом", en:"3 Islands + Hon Thom Cable Car", categoryRu:"Острова · канатная дорога", categoryEn:"Islands · cable car", adult:rates["TRIP 4"].adult, child:rates["TRIP 4"].child, image:JOHNS_CABLE, fallback:"/tour/phuquoc/tour-03-1.jpg", featureRu:"Морской маршрут и Хон Тхом в одном полном дне.", featureEn:"Island hopping and Hon Thom in one full day.", cableCar:true },
  { code:"OPTION 2", slug:"option-2-sunset-squid", ru:"Закат и ночная ловля кальмара", en:"Sunset & Night Squid Fishing", categoryRu:"Закат · кальмар", categoryEn:"Sunset · squid fishing", adult:rates["OPTION 2"].adult, child:rates["OPTION 2"].child, image:"/tour/phuquoc/tour-04-1.jpg", fallback:"/tour/phuquoc/tour-04-1.jpg", featureRu:"Вечерняя программа без раннего старта.", featureEn:"An easy evening experience with no early start." },
  { code:"CANO TRIP", slug:"cano-trip-speedboat", ru:"Южные острова на скоростном катере", en:"South Islands by Speedboat", categoryRu:"Катер · острова · снорклинг", categoryEn:"Speedboat · islands · snorkeling", adult:rates["CANO TRIP"].adult, child:rates["CANO TRIP"].child, image:JOHNS_LUXURY, fallback:"/tour/phuquoc/tour-01-2.jpg", featureRu:"Более динамичный формат островной программы на катере.", featureEn:"A faster-paced island-hopping day by speedboat." },
  { code:"CABLE CAR TRIP", slug:"cable-car-four-islands", ru:"4 острова + канатная дорога Хон Тхом", en:"4 Islands + Hon Thom Cable Car", categoryRu:"4 острова · катер · канатная дорога", categoryEn:"4 islands · speedboat · cable car", adult:rates["CABLE CAR TRIP"].adult, child:rates["CABLE CAR TRIP"].child, image:JOHNS_CABLE, fallback:"/tour/phuquoc/tour-02-2.jpg", featureRu:"Одна из самых насыщенных программ для первого визита.", featureEn:"One of the most complete first-visit experiences.", cableCar:true },
  { code:"BBQ TRIP", slug:"bbq-trip-sunset", ru:"2 острова + снорклинг + BBQ на закате", en:"2 Islands + Snorkeling + Sunset BBQ", categoryRu:"Острова · BBQ · закат", categoryEn:"Islands · BBQ · sunset", adult:rates["BBQ TRIP"].adult, child:rates["BBQ TRIP"].child, image:JOHNS_ISLAND, fallback:"/tour/phuquoc/tour-03-2.jpg", featureRu:"Морской день с атмосферным вечерним финалом.", featureEn:"An island day with an atmospheric sunset finish." },
  { code:"LUXURY TRIP", slug:"luxury-trip-speedboat", ru:"Luxury 3 острова на скоростном катере", en:"Luxury 3 Islands by Speedboat", categoryRu:"Luxury · катер · снорклинг", categoryEn:"Luxury · speedboat · snorkeling", adult:rates["LUXURY TRIP"].adult, child:rates["LUXURY TRIP"].child, image:JOHNS_LUXURY, fallback:"/tour/phuquoc/tour-04-2.jpg", featureRu:"Улучшенный формат популярной программы по островам.", featureEn:"An upgraded version of the popular island-hopping route." },
  { code:"ISLAND LIFE", slug:"island-life", ru:"День островной жизни", en:"Discover Island Life", categoryRu:"Островная жизнь · море", categoryEn:"Island life · sea", adult:rates["ISLAND LIFE"].adult, child:rates["ISLAND LIFE"].child, image:JOHNS_ISLAND, fallback:"/tour/phuquoc/tour-01-3.jpg", featureRu:"Для гостей, которым важнее атмосфера острова, чем количество точек.", featureEn:"For guests who value island atmosphere over ticking off stops." },
  { code:"CAMPING", slug:"camping-2d1n", ru:"Кемпинг 2 дня / 1 ночь на Мэй Рут Trong", en:"May Rut Trong Camping 2D1N", categoryRu:"2 дня 1 ночь · остров", categoryEn:"2 days 1 night · island", adult:rates["CAMPING"].adult, child:rates["CAMPING"].child, image:JOHNS_ISLAND, fallback:"/tour/phuquoc/tour-02-3.jpg", featureRu:"Ночная островная программа вместо стандартной однодневной поездки.", featureEn:"An overnight island experience beyond a standard day trip." },
  { code:"LAND TOUR 1", slug:"land-tour-1-south", ru:"Юг Фукуока — TOP 8 достопримечательностей", en:"South Phu Quoc — Top 8 Sightseeing", categoryRu:"Юг острова · обед", categoryEn:"South island · lunch", adult:rates["LAND TOUR 1"].adult, child:rates["LAND TOUR 1"].child, image:"/tour/phuquoc/tour-03-3.jpg", fallback:"/tour/phuquoc/tour-03-3.jpg", featureRu:"Наземный день для тех, кто не хочет проводить день на море.", featureEn:"A land-based day for guests who do not want a sea tour." },
  { code:"LAND TOUR 2", slug:"land-tour-2-north", ru:"Север Фукуока + каяк + обед", en:"North Phu Quoc + Kayaking + Lunch", categoryRu:"Север · каяк · обед", categoryEn:"North · kayaking · lunch", adult:rates["LAND TOUR 2"].adult, child:rates["LAND TOUR 2"].child, image:"/tour/phuquoc/tour-04-3.jpg", fallback:"/tour/phuquoc/tour-04-3.jpg", featureRu:"Север острова с активной частью и природными локациями.", featureEn:"A northern island route with an active outdoor element." },
  { code:"LAND TOUR 4", slug:"land-tour-4-cable-car-south", ru:"Канатная дорога + юг Фукуока", en:"Cable Car + South Phu Quoc", categoryRu:"Юг · канатная дорога · обед", categoryEn:"South · cable car · lunch", adult:rates["LAND TOUR 4"].adult, child:rates["LAND TOUR 4"].child, image:JOHNS_CABLE, fallback:"/tour/phuquoc/tour-01-1.jpg", featureRu:"Южные достопримечательности и Хон Тхом без отдельного морского дня.", featureEn:"South-island sightseeing and Hon Thom without a separate sea day.", cableCar:true },
];

const privateTours: PrivateTour[] = [
  { code:"PRIVATE TRIP 2", ru:"Частная лодка: рыбалка + 2 острова", en:"Private Boat: Fishing + 2 Islands", time:"09:30–16:30", image:JOHNS_SNORKEL, fallback:"/tour/phuquoc/tour-02-1.jpg", bulletsRu:["Частный автомобиль и частная лодка","Рыбалка, снорклинг и отдых на острове","Обед на борту","Локальный гид по программе","Цена — только по индивидуальному расчёту"], bulletsEn:["Private vehicle and private boat","Fishing, snorkeling and island relaxation","Lunch on board","Local guide under the program","Price by tailored quote only"] },
  { code:"PRIVATE TRIP 3", ru:"Частная лодка: 3 острова", en:"Private Boat: 3 Islands", time:"08:30–16:30", image:JOHNS_LUXURY, fallback:"/tour/phuquoc/tour-03-1.jpg", bulletsRu:["Частный трансфер и лодка","Две остановки для снорклинга","Отдых на острове","Обед по программе","Цена — только по индивидуальному расчёту"], bulletsEn:["Private transfer and boat","Two snorkeling stops","Island relaxation","Lunch under the program","Price by tailored quote only"] },
  { code:"PRIVATE TRIP 4", ru:"Частные 3 острова + Хон Тхом", en:"Private 3 Islands + Hon Thom", time:"08:30–18:00", image:JOHNS_CABLE, fallback:"/tour/phuquoc/tour-04-1.jpg", bulletsRu:["Частный автомобиль и лодка","Снорклинг + островной отдых","Хон Тхом и канатная дорога","Маршрут подтверждается перед оплатой","Цена рассчитывается по составу группы"], bulletsEn:["Private vehicle and boat","Snorkeling + island relaxation","Hon Thom and cable car","Itinerary reconfirmed before payment","Quote calculated for your group"] },
  { code:"PRIVATE CUSTOM", ru:"Индивидуальная программа 2D1N / 3D2N", en:"Custom 2D1N / 3D2N Program", time:"По запросу / On request", image:JOHNS_ISLAND, fallback:"/tour/phuquoc/tour-01-2.jpg", bulletsRu:["Маршрут под даты, отель и состав гостей","Трансфер, острова и наземные программы","Группы и специальные запросы","Поддержка GoVietStay на русском","Финальная программа подтверждается до оплаты"], bulletsEn:["Itinerary built around your dates, hotel and group","Transfers, island and land programs","Groups and special requests","GoVietStay multilingual support","Final program confirmed before payment"] },
];

const i18n = {
  ru: {
    eyebrow:"GoVietStay · Фукуок 2026–2027", title:"Экскурсии на Фукуоке — бронирование без лишней переписки", lead:"Выберите программу, заполните одну заявку и получите подтверждение GoVietStay. После проверки мест мы отправим отдельную защищённую ссылку для депозита.", jointTitle:"Групповые экскурсии", jointText:"Выберите подходящую программу и отправьте заявку через GoVietStay. Мы заранее показываем актуальную цену тура; детские тарифы, трансфер, праздничные доплаты и наличие мест подтверждаются до оплаты.", published:"Цена тура", adult:"Взрослый", child:"Ребёнок", book:"Заполнить заявку", privateTitle:"Частные экскурсии", privateText:"Цена не публикуется. Мы рассчитываем частный тур по дате, количеству гостей, отелю, языку и программе.", quote:"Получить частный расчёт", formEyebrow:"Бронирование GoVietStay", formTitle:"Заполните заявку один раз", formText:"После отправки заявка попадает в наш рабочий процесс как Pending. Мы проверяем места и трансфер, подтверждаем сумму, затем отправляем защищённую ссылку на депозит.", fullName:"Имя и фамилия", whatsapp:"WhatsApp / телефон", email:"Email", date:"Дата тура", adults:"Взрослые", children:"Дети", infants:"Дети до 4 лет", childDetails:"Возраст и рост детей", hotel:"Отель", pickup:"Место посадки / адрес", language:"Язык поддержки", request:"Пожелания", submit:"Отправить заявку", sending:"Отправляем...", success:"Заявка получена", bookingCode:"Код заявки", next:"Следующий шаг: GoVietStay проверит наличие мест. После подтверждения вы получите персональную ссылку /pay/... для депозита.", depositTitle:"Депозит — только после подтверждения", depositText:"Форма сама не списывает деньги. После проверки бронирования GoVietStay создаёт отдельную защищённую payment link. На ней видны код бронирования, сумма депозита, уже полученная сумма и остаток.", methods:"VietQR или международная оплата Visa / Mastercard", askDeposit:"Запросить ссылку на депозит", passportNote:"Паспортные данные не отправляются через эту публичную форму. Если оператору они нужны для окончательной резервации, мы запросим их после подтверждения наличия мест.", estimate:"Предварительная сумма", estimateNote:"Расчёт по выбранной программе. Детские правила, трансфер, праздничные даты и наличие мест подтверждаются перед оплатой.", operator:"GoVietStay отвечает за бронирование, коммуникацию и поддержку клиента. Отдельные услуги на Фукуоке фактически предоставляются лицензированными местными операторами, включая John’s Tours Phú Quốc, в соответствии с подтверждённым бронированием.",  policies:"Важные условия", pickupPolicy:"Стандартный трансфер групповых туров включён из Duong Dong, Cua Lap, Suoi May, Bai Truong, Sonasea и Marina; другие районы могут иметь доплату.", childPolicy:"Для туров без канатной дороги детский тариф обычно применяется 4–9 лет. Для туров с канатной дорогой учитываются возраст и рост; поэтому укажите возраст + рост каждого ребёнка.", cancelPolicy:"Отмена и погодные условия применяются по подтверждённому бронированию и действующей политике оператора. При запрете выхода морского тура портовыми властями применяется возврат по политике оператора.", holidayPolicy:"Праздники/Tết могут иметь дополнительную надбавку и отдельную доступность.", error:"Не удалось отправить заявку. Попробуйте ещё раз или отправьте данные через WhatsApp.", whatsappFallback:"Отправить через WhatsApp"
  },
  en: {
    eyebrow:"GoVietStay · Phu Quoc 2026–2027", title:"Phu Quoc tours — one booking form, clear next steps", lead:"Choose a program, fill one request and let GoVietStay confirm it. After availability is checked, we send a separate secure deposit link.", jointTitle:"Join-in tours", jointText:"Choose the program that fits you and book through GoVietStay. We show the current tour price upfront; child rates, pickup, holiday surcharges and availability are confirmed before payment.", published:"Tour price", adult:"Adult", child:"Child", book:"Fill booking form", privateTitle:"Private tours", privateText:"No fixed public price. We quote private tours based on date, group size, hotel, language and program.", quote:"Get a private quote", formEyebrow:"GoVietStay booking", formTitle:"Enter your details once", formText:"After submission the request enters our workflow as Pending. We verify availability and pickup, confirm the total, then send your secure deposit link.", fullName:"Full name", whatsapp:"WhatsApp / phone", email:"Email", date:"Tour date", adults:"Adults", children:"Children", infants:"Children under 4", childDetails:"Children ages & heights", hotel:"Hotel", pickup:"Pickup point / address", language:"Support language", request:"Special request", submit:"Send booking request", sending:"Sending...", success:"Request received", bookingCode:"Request code", next:"Next: GoVietStay checks availability. Once confirmed, you receive a personal /pay/... link for the deposit.", depositTitle:"Deposit only after confirmation", depositText:"This form never charges you automatically. After the booking is verified, GoVietStay creates a separate secure payment link showing the booking code, deposit amount, received amount and remaining balance.", methods:"VietQR or International Payment · Visa / Mastercard", askDeposit:"Ask for deposit link", passportNote:"Passport details are not sent through this public form. If the operator requires them for final reservation, we request them after availability is confirmed.", estimate:"Estimated total", estimateNote:"Calculated for the selected program. Child rules, pickup, holiday dates and availability are confirmed before payment.", operator:"GoVietStay is responsible for booking communication, coordination and customer support. Selected Phu Quoc services are fulfilled by licensed local operators, including John’s Tours Phú Quốc, according to the confirmed booking.",  policies:"Important conditions", pickupPolicy:"Standard join-in pickup covers Duong Dong, Cua Lap, Suoi May, Bai Truong, Sonasea and Marina; other areas may have a surcharge.", childPolicy:"For non-cable-car tours, child rates generally apply to ages 4–9. Cable-car tours also use height rules, so enter each child’s age and height.", cancelPolicy:"Cancellation and weather rules follow the confirmed booking and current operator policy. If port authorities prohibit a sea departure, refund handling follows the operator policy.", holidayPolicy:"Public holidays/Tet may have a surcharge and separate availability.", error:"We could not send the request. Please try again or send the prepared details via WhatsApp.", whatsappFallback:"Send via WhatsApp"
  }
} as const;

function money(value:number, lang:Language){ return `${new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-US").format(value)} VND`; }
function tourName(tour:Tour, lang:Language){ return lang === "ru" ? tour.ru : tour.en; }
function safeCount(value:number){ return Math.max(0, Math.min(40, Number.isFinite(value) ? value : 0)); }

function SupplierImage({src, fallback, alt, className}:{src:string; fallback:string; alt:string; className?:string}){
  const [current,setCurrent]=useState(src);
  return <img src={current} alt={alt} className={className} loading="lazy" onError={()=>{ if(current !== fallback) setCurrent(fallback); }} />;
}

function buildWhatsApp(language:Language, selected:Tour|null, form:BookingForm, code?:string){
  const label = selected ? tourName(selected,language) : "Phu Quoc private tour";
  const text = language === "ru"
    ? `Здравствуйте, GoVietStay! ${code ? `Код заявки: ${code}\n` : ""}Фукуок — ${label}\nДата: ${form.tourDate || "__"}\nИмя: ${form.fullName || "__"}\nWhatsApp: ${form.whatsapp || "__"}\nВзрослые: ${form.adults}\nДети: ${form.children}\nДо 4 лет: ${form.infants}\nВозраст/рост детей: ${form.childDetails || "__"}\nОтель: ${form.hotel || "__"}\nМесто посадки: ${form.pickup || "__"}\nЯзык: ${form.language}\nПожелания: ${form.request || "нет"}${code ? "\nПожалуйста, подтвердите бронирование и отправьте защищённую ссылку на депозит." : ""}`
    : `Hello GoVietStay! ${code ? `Request code: ${code}\n` : ""}Phu Quoc — ${label}\nDate: ${form.tourDate || "__"}\nName: ${form.fullName || "__"}\nWhatsApp: ${form.whatsapp || "__"}\nAdults: ${form.adults}\nChildren: ${form.children}\nUnder 4: ${form.infants}\nChild ages/heights: ${form.childDetails || "__"}\nHotel: ${form.hotel || "__"}\nPickup: ${form.pickup || "__"}\nLanguage: ${form.language}\nRequest: ${form.request || "none"}${code ? "\nPlease confirm the booking and send the secure deposit link." : ""}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function PhuQuocJohnsCatalog({language}:{language:Language}){
  const t=i18n[language];
  const [selected,setSelected]=useState<Tour|null>(tours[0]);
  const [bookingOpen,setBookingOpen]=useState(false);
  const [form,setForm]=useState<BookingForm>({ fullName:"", whatsapp:"", email:"", tourDate:"", adults:1, children:0, infants:0, childDetails:"", hotel:"", pickup:"", language:language === "ru" ? "Русский" : "English", request:"", website:"" });
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState<{booking_code:string;status:string}|null>(null);

  const estimate=useMemo(()=> selected ? selected.adult*safeCount(form.adults)+selected.child*safeCount(form.children) : 0,[selected,form.adults,form.children]);

  function update<K extends keyof BookingForm>(key:K,value:BookingForm[K]){ setForm(prev=>({...prev,[key]:value})); }
  function openBooking(tour:Tour){ setSelected(tour); setSuccess(null); setError(""); setBookingOpen(true); setTimeout(()=>document.getElementById("phuquoc-booking-form")?.scrollIntoView({behavior:"smooth",block:"start"}),40); }
  function privateQuote(code:string){
    const text=language === "ru" ? `Здравствуйте, GoVietStay! Хочу частный расчёт на Фукуоке — ${code}. Дата: __. Отель: __. Взрослые: __. Дети/возраст: __.` : `Hello GoVietStay! I would like a private Phu Quoc quote — ${code}. Date: __. Hotel: __. Adults: __. Children/ages: __.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,"_blank","noopener,noreferrer");
  }

  async function submit(e:FormEvent){
    e.preventDefault(); setError(""); setSuccess(null);
    if(!selected || !form.fullName.trim() || !form.whatsapp.trim() || !form.tourDate || safeCount(form.adults)+safeCount(form.children)+safeCount(form.infants)<1){ setError(t.error); return; }
    setSaving(true);
    try{
      const response=await fetch("/api/phu-quoc-booking-request",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ ...form, tourCode:selected.code, tourSlug:selected.slug, languageKey:language }) });
      const data=await response.json();
      if(!response.ok) throw new Error(data?.error || "booking request failed");
      setSuccess({booking_code:data.booking_code,status:data.status || "pending"});
    }catch(err){ console.error(err); setError(t.error); }
    finally{ setSaving(false); }
  }

  return <main className="min-h-screen bg-[#f7f1e5] text-[#082f2b]">
    <section className="relative overflow-hidden bg-[#052f2d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:py-24">
        <div><p className="text-xs font-black uppercase tracking-[.22em] text-amber-300">{t.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">{t.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{t.lead}</p><div className="mt-8 flex flex-wrap gap-3"><a href="#joint-tours" className="rounded-full bg-amber-300 px-6 py-3.5 font-black text-[#07322f]">{t.jointTitle}</a><a href="#phuquoc-booking-form" className="rounded-full border border-white/35 px-6 py-3.5 font-black text-white">{t.book}</a></div></div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl md:min-h-[480px]"><SupplierImage src={JOHNS_ISLAND} fallback="/tour/phuquoc/tour-01-1.jpg" alt={language === "ru" ? "Острова Фукуока и бирюзовое море" : "Phu Quoc islands and turquoise sea"} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#052f2d]/85 via-transparent to-transparent"/><div className="absolute bottom-0 left-0 right-0 p-6 md:p-8"><p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><p className="mt-2 text-2xl font-black">GoVietStay</p></div></div>
      </div>
    </section>

    <section id="joint-tours" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[.2em] text-emerald-800">13 programs</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{t.jointTitle}</h2><p className="mt-4 text-lg leading-8 text-[#315b56]">{t.jointText}</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{tours.map(tour=><article key={tour.code} className="overflow-hidden rounded-[1.6rem] border border-[#0b4b43]/10 bg-white shadow-[0_14px_45px_rgba(10,70,63,.08)]"><div className="relative h-52 overflow-hidden bg-[#0b5c55]"><SupplierImage src={tour.image} fallback={tour.fallback} alt={tourName(tour,language)} className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"/><div className="absolute left-4 top-4 rounded-full bg-[#052f2d]/90 px-3 py-1.5 text-xs font-black text-white">{tour.code}</div></div><div className="p-6"><p className="text-xs font-black uppercase tracking-[.13em] text-emerald-700">{language === "ru" ? tour.categoryRu : tour.categoryEn}</p><h3 className="mt-2 text-2xl font-black leading-tight">{tourName(tour,language)}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-[#496b67]">{language === "ru" ? tour.featureRu : tour.featureEn}</p><p className="mt-5 text-[10px] font-black uppercase tracking-[.12em] text-emerald-700">{t.published}</p><div className="mt-2 grid grid-cols-2 gap-2"><div className="rounded-2xl bg-[#eff8f4] p-3"><span className="block text-[10px] font-black uppercase tracking-wider text-[#6e8d88]">{t.adult}</span><strong className="mt-1 block text-sm text-emerald-800">{money(tour.adult,language)}</strong></div><div className="rounded-2xl bg-[#eff8f4] p-3"><span className="block text-[10px] font-black uppercase tracking-wider text-[#6e8d88]">{t.child}</span><strong className="mt-1 block text-sm text-emerald-800">{money(tour.child,language)}</strong></div></div><button type="button" onClick={()=>openBooking(tour)} className="mt-5 w-full rounded-2xl bg-[#1fa85b] px-5 py-3.5 text-center font-black text-white">{t.book}</button></div></article>)}</div>

    </section>

    <section id="phuquoc-booking-form" className="scroll-mt-5 bg-[#062f2c] text-white"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr]">
      <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-300">{t.formEyebrow}</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">{t.formTitle}</h2><p className="mt-4 max-w-3xl text-lg leading-8 text-white/72">{t.formText}</p>
        {bookingOpen && <form onSubmit={submit} className="mt-8 grid gap-4 rounded-[1.8rem] bg-white p-5 text-[#082f2b] md:p-7">
          <div className="rounded-2xl bg-[#eef7f3] p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-emerald-700">{selected?.code}</p><p className="mt-1 text-xl font-black">{selected ? tourName(selected,language) : "Phu Quoc"}</p></div>
          {error && <div className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</div>}
          {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><b className="text-emerald-800">✓ {t.success}</b><div className="mt-2 text-2xl font-black">{success.booking_code}</div><p className="mt-2 text-sm leading-6 text-[#45665e]">{t.next}</p><a href={buildWhatsApp(language,selected,form,success.booking_code)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full bg-[#1fa85b] px-5 py-3 font-black text-white">{t.askDeposit}</a></div>}
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>update("website",e.target.value)} className="hidden" aria-hidden="true" />
          <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-1.5 text-sm font-bold">{t.fullName}<input required value={form.fullName} onChange={e=>update("fullName",e.target.value)} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label><label className="grid gap-1.5 text-sm font-bold">{t.whatsapp}<input required value={form.whatsapp} onChange={e=>update("whatsapp",e.target.value)} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal" inputMode="tel"/></label><label className="grid gap-1.5 text-sm font-bold">{t.email}<input value={form.email} onChange={e=>update("email",e.target.value)} type="email" className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label><label className="grid gap-1.5 text-sm font-bold">{t.date}<input required value={form.tourDate} onChange={e=>update("tourDate",e.target.value)} type="date" className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label></div>
          <div className="grid gap-3 sm:grid-cols-3">{[["adults",t.adults],["children",t.children],["infants",t.infants]].map(([key,label])=><label key={key} className="grid gap-1.5 text-sm font-bold">{label}<input type="number" min="0" max="40" value={form[key as "adults"|"children"|"infants"]} onChange={e=>update(key as "adults"|"children"|"infants",safeCount(Number(e.target.value)))} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label>)}</div>
          <label className="grid gap-1.5 text-sm font-bold">{t.childDetails}<input value={form.childDetails} onChange={e=>update("childDetails",e.target.value)} placeholder={language === "ru" ? "Напр.: 6 лет — 118 см; 9 лет — 138 см" : "Example: age 6 — 118 cm; age 9 — 138 cm"} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label>
          <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-1.5 text-sm font-bold">{t.hotel}<input value={form.hotel} onChange={e=>update("hotel",e.target.value)} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label><label className="grid gap-1.5 text-sm font-bold">{t.pickup}<input value={form.pickup} onChange={e=>update("pickup",e.target.value)} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label></div>
          <label className="grid gap-1.5 text-sm font-bold">{t.language}<select value={form.language} onChange={e=>update("language",e.target.value)} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"><option>Русский</option><option>English</option><option>Vietnamese</option></select></label>
          <label className="grid gap-1.5 text-sm font-bold">{t.request}<textarea rows={4} value={form.request} onChange={e=>update("request",e.target.value)} className="rounded-xl border border-[#cbdad3] px-4 py-3 font-normal"/></label>
          <p className="rounded-xl bg-amber-50 p-3 text-xs font-semibold leading-5 text-[#6c5830]">{t.passportNote}</p>
          <div className="flex flex-col gap-3 sm:flex-row"><button disabled={saving} className="rounded-xl bg-[#1fa85b] px-6 py-3.5 font-black text-white disabled:opacity-60">{saving ? t.sending : t.submit}</button><a href={buildWhatsApp(language,selected,form)} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#cbdad3] px-6 py-3.5 text-center font-black text-[#126442]">{t.whatsappFallback}</a></div>
        </form>}
        {!bookingOpen && <button type="button" onClick={()=>openBooking(tours[0])} className="mt-8 rounded-full bg-amber-300 px-6 py-3.5 font-black text-[#07322f]">{t.book}</button>}
      </div>
      <aside className="lg:pt-8"><div className="sticky top-4 rounded-[1.8rem] bg-white p-6 text-[#082f2b] shadow-2xl"><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-700">{t.estimate}</p><div className="mt-2 text-3xl font-black">{selected ? money(estimate,language) : "—"}</div><p className="mt-2 text-xs leading-5 text-[#647a75]">{t.estimateNote}</p><div className="my-5 h-px bg-[#dfe9e4]"/><h3 className="text-xl font-black">{t.depositTitle}</h3><p className="mt-3 text-sm leading-6 text-[#496b67]">{t.depositText}</p><p className="mt-3 rounded-xl bg-[#edf7f2] p-3 text-sm font-black text-emerald-800">{t.methods}</p></div></aside>
    </div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[.2em] text-emerald-800">Private Phu Quoc</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">{t.privateTitle}</h2><p className="mt-4 text-lg leading-8 text-[#315b56]">{t.privateText}</p></div><div className="mt-9 grid gap-5 lg:grid-cols-2">{privateTours.map(tour=><article key={tour.code} className="grid overflow-hidden rounded-[1.6rem] bg-[#062f2c] text-white sm:grid-cols-[.42fr_.58fr]"><div className="min-h-64"><SupplierImage src={tour.image} fallback={tour.fallback} alt={language === "ru" ? tour.ru : tour.en} className="h-full w-full object-cover"/></div><div className="p-6"><p className="text-xs font-black uppercase tracking-[.13em] text-amber-300">{tour.code} · {tour.time}</p><h3 className="mt-2 text-2xl font-black">{language === "ru" ? tour.ru : tour.en}</h3><ul className="mt-4 space-y-2 text-sm leading-6 text-white/75">{(language === "ru" ? tour.bulletsRu : tour.bulletsEn).map(x=><li key={x}>✓ {x}</li>)}</ul><button type="button" onClick={()=>privateQuote(tour.code)} className="mt-5 rounded-full bg-amber-300 px-5 py-3 font-black text-[#07322f]">{t.quote}</button></div></article>)}</div></section>

    <section className="bg-[#efe3c8]"><div className="mx-auto max-w-7xl px-5 py-12 md:px-8"><h2 className="text-3xl font-black">{t.policies}</h2><div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[t.pickupPolicy,t.childPolicy,t.cancelPolicy,t.holidayPolicy].map((x,i)=><div key={i} className="rounded-2xl bg-white/80 p-5 text-sm leading-6 text-[#496b67]">{x}</div>)}</div></div></section>
    <section className="border-t border-[#0b4b43]/10 bg-[#f7f1e5]">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <details className="text-xs leading-5 text-[#647a75]">
          <summary className="cursor-pointer select-none font-semibold text-[#496b67]">
            {language === "ru" ? "Юридическая информация и исполнение услуг" : "Legal & service information"}
          </summary>
          <div className="mt-3 max-w-4xl space-y-2">
            <p>{t.operator}</p>
            <p>{language === "ru"
              ? "Фотографии и материалы используются GoVietStay в рамках согласованных партнёрских прав. Конкретный исполнитель и применимые условия указываются в подтверждении бронирования."
              : "Photos and media are used by GoVietStay under agreed partner-use rights. The applicable service provider and terms are identified in the confirmed booking."}</p>
          </div>
        </details>
      </div>
    </section>
  </main>;
}
