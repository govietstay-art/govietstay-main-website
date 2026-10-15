"use client";

import { useMemo, useState } from "react";
import { getVisaPrice } from "./prices";

type Language = "en" | "tr" | "pl" | "nl" | "ro" | "uk";

const regionCodes = `AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW`.split(" ");

const broadExemption = new Set(["DE", "FR", "IT", "ES", "GB", "RU", "JP", "KR", "DK", "SE", "NO", "FI"]);
const tourismExemption = new Set(["BE", "BG", "HR", "CZ", "HU", "LU", "NL", "PL", "RO", "SK", "SI", "CH"]);
// Other published bilateral visa-free stays for ordinary passports. Conditions and dates still require individual verification.
const bilateralVisaFreeDays: Record<string, number> = { BY: 30, KZ: 30, KG: 30, KH: 30, LA: 30, MY: 30, ID: 30, SG: 30, TH: 30, MM: 30, MN: 30, BN: 14, PH: 21, CL: 90, PA: 90 };

const translations = {
  en: {
    eyebrow: "Check eligibility & price in seconds",
    heading: "Find your Vietnam visa option",
    intro: "Four quick choices. No passport uploads or long forms to see your estimate.",
    passport: "Passport country", placeholder: "Choose your country",
    duration: "Length of stay", entries: "Entries", speed: "Processing speed",
    options: ["30 days", "45 days", "90 days"],
    single: "Single entry", multiple: "Multiple entry",
    economy: "Standard · approx. 5–6 working days", days4: "Urgent · 4 days",
    days3: "Urgent · 3 days", days2: "Urgent · 2 days", day1: "Urgent · 1 day",
    hours4: "Urgent · 4 hours", hours2: "Urgent · 2 hours (Hanoi only)", hour1: "Urgent · 1 hour (Hanoi only)",
    travelers: "Applicants", perPerson: "Price per person", total: "Estimated total",
    includedStandard: "Includes government fee and visa assistance.", includedUrgent: "Includes government fee and urgent visa processing service.", govFee: "Government e-visa fee", serviceFee: "GoVietStay assistance", urgentFee: "Urgent request add-on",
    exemptionTitle: "Good news — you may not need an e-visa",
    exemptionBroad: "Your passport country currently has a 45-day visa exemption, subject to entry conditions and travel dates.",
    exemptionTourism: "Your passport country currently has a 45-day visa exemption for tourism, subject to eligibility and travel dates.",
    exemptionNote: "This is guidance, not a final immigration decision. If your circumstances differ, we can check before you pay.",
    checkFree: "Check my visa-free eligibility",
    action: "Continue with WhatsApp", note: "No payment until we have checked your situation and confirmed the options.",
    form: "Have complex travel details? Open the full form",
    priceNote: "Standard estimate includes government fee and GoVietStay assistance; urgent options shown use Hanoi pricing and require confirmation. Approval and timing are decided by Vietnam authorities.",
    selectFirst: "Choose your passport country to see the next step.",
  },
  tr: {
    eyebrow:"Birkaç saniyede vize durumunuzu ve fiyatı öğrenin", heading:"Vietnam vize seçeneğinizi bulun", intro:"Dört basit seçim. Uzun form doldurmanız gerekmez.",
    passport:"Pasaport ülkesi",placeholder:"Ülkenizi seçin",duration:"Kalış süresi",entries:"Giriş sayısı",speed:"İşlem hızı",options:["30 gün","45 gün","90 gün"],single:"Tek giriş",multiple:"Çok giriş",
    economy:"Standart · yaklaşık 5–6 iş günü",days4:"Acil · 4 gün",days3:"Acil · 3 gün",days2:"Acil · 2 gün",day1:"Acil · 1 gün",hours4:"Acil · 4 saat",hours2:"Acil · 2 saat (yalnız Hanoi)",hour1:"Acil · 1 saat (yalnız Hanoi)",
    travelers:"Başvuru sahibi",perPerson:"Kişi başı",total:"Tahmini toplam",includedStandard:"Resmî vize harcı ve hizmet bedeli dahildir.",includedUrgent:"Resmî vize harcı ve acil vize işlem hizmeti dahildir.",govFee:"Resmî e-vize harcı",serviceFee:"GoVietStay hizmeti",urgentFee:"Acil işlem ek ücreti",
    exemptionTitle:"Güzel haber — e-vize gerekmeyebilir",exemptionBroad:"Pasaportunuz için şu anda 45 güne kadar vize muafiyeti bulunuyor; giriş şartlarına tabidir.",exemptionTourism:"Turizm amacıyla 45 güne kadar vize muafiyeti olabilir; şartları kontrol edelim.",exemptionNote:"Seyahat tarihinize ve koşullarınıza göre doğrulama gerekir.",checkFree:"Ücretsiz giriş koşullarını kontrol et",action:"WhatsApp ile devam et",note:"Durumunuzu kontrol etmeden ödeme istemiyoruz.",form:"Detaylı başvuru formunu aç",priceNote:"Fiyata resmî harç ve hizmet dahildir. Acil fiyatlar Hanoi içindir ve teyit gerekir. Onay ve süre yetkililere bağlıdır.",selectFirst:"Önce pasaport ülkenizi seçin."
  },
  pl: {
    eyebrow:"Sprawdź wizę i cenę w kilka sekund",heading:"Sprawdź wizę do Wietnamu",intro:"Cztery proste wybory, bez długiego formularza.",passport:"Kraj paszportu",placeholder:"Wybierz kraj",duration:"Długość pobytu",entries:"Liczba wjazdów",speed:"Tryb rozpatrywania",options:["30 dni","45 dni","90 dni"],single:"Jednokrotny wjazd",multiple:"Wielokrotny wjazd",economy:"Standard · ok. 5–6 dni roboczych",days4:"Pilne · 4 dni",days3:"Pilne · 3 dni",days2:"Pilne · 2 dni",day1:"Pilne · 1 dzień",hours4:"Pilne · 4 godziny",hours2:"Pilne · 2 godziny (Hanoi)",hour1:"Pilne · 1 godzina (Hanoi)",
    travelers:"Podróżni",perPerson:"Cena za osobę",total:"Szacowana cena",includedStandard:"Cena obejmuje opłatę urzędową i pomoc wizową.",includedUrgent:"Cena obejmuje opłatę urzędową i ekspresową obsługę wizową.",govFee:"Opłata urzędowa",serviceFee:"Pomoc GoVietStay",urgentFee:"Dopłata za pilny tryb",exemptionTitle:"Dobra wiadomość — e-wiza może nie być potrzebna",exemptionBroad:"Obecnie możliwe jest 45 dni bez wizy po spełnieniu warunków wjazdu.",exemptionTourism:"Obecnie możliwe jest 45 dni bez wizy w celach turystycznych, po spełnieniu warunków.",exemptionNote:"Ostateczne warunki zależą od daty i celu podróży.",checkFree:"Sprawdź bezpłatnie zwolnienie z wizy",action:"Kontynuuj w WhatsApp",note:"Nie pobieramy opłaty przed sprawdzeniem Twojej sytuacji.",form:"Otwórz szczegółowy formularz",priceNote:"Cena obejmuje opłatę urzędową i pomoc. Dopłaty pilne dotyczą Hanoi i wymagają potwierdzenia.",selectFirst:"Najpierw wybierz kraj paszportu."
  },
  nl: {
    eyebrow:"Controleer visum en prijs in seconden",heading:"Uw visum voor Vietnam",intro:"Vier eenvoudige keuzes, zonder lang formulier.",passport:"Land van paspoort",placeholder:"Kies uw land",duration:"Verblijfsduur",entries:"Aantal binnenkomsten",speed:"Verwerkingssnelheid",options:["30 dagen","45 dagen","90 dagen"],single:"Eenmalige binnenkomst",multiple:"Meerdere binnenkomsten",economy:"Standaard · circa 5–6 werkdagen",days4:"Spoed · 4 dagen",days3:"Spoed · 3 dagen",days2:"Spoed · 2 dagen",day1:"Spoed · 1 dag",hours4:"Spoed · 4 uur",hours2:"Spoed · 2 uur (Hanoi)",hour1:"Spoed · 1 uur (Hanoi)",
    travelers:"Aanvragers",perPerson:"Prijs per persoon",total:"Geschat totaal",includedStandard:"Inclusief overheidskosten en visumhulp.",includedUrgent:"Inclusief overheidskosten en spoedservice voor het visum.",govFee:"Officiële visumkosten",serviceFee:"GoVietStay-hulp",urgentFee:"Toeslag spoed",exemptionTitle:"Goed nieuws — mogelijk heeft u geen e-visum nodig",exemptionBroad:"Uw paspoortland heeft momenteel een vrijstelling voor 45 dagen, onder voorwaarden.",exemptionTourism:"Voor toerisme geldt mogelijk een vrijstelling van 45 dagen, onder voorwaarden.",exemptionNote:"We bevestigen de voorwaarden voor uw reis vóór betaling.",checkFree:"Controleer visumvrij reizen",action:"Verder via WhatsApp",note:"Geen betaling voordat we uw situatie hebben gecontroleerd.",form:"Uitgebreid formulier openen",priceNote:"Inclusief overheidskosten en service. Spoedprijzen gelden voor Hanoi en moeten worden bevestigd.",selectFirst:"Kies eerst uw paspoortland."
  },
  ro: {
    eyebrow:"Verifică viza și prețul în câteva secunde",heading:"Găsește viza potrivită pentru Vietnam",intro:"Patru alegeri simple, fără formular lung.",passport:"Țara pașaportului",placeholder:"Alege țara",duration:"Durata șederii",entries:"Numărul de intrări",speed:"Viteza de procesare",options:["30 de zile","45 de zile","90 de zile"],single:"O singură intrare",multiple:"Intrări multiple",economy:"Standard · aproximativ 5–6 zile lucrătoare",days4:"Urgent · 4 zile",days3:"Urgent · 3 zile",days2:"Urgent · 2 zile",day1:"Urgent · 1 zi",hours4:"Urgent · 4 ore",hours2:"Urgent · 2 ore (Hanoi)",hour1:"Urgent · 1 oră (Hanoi)",
    travelers:"Solicitanți",perPerson:"Preț de persoană",total:"Total estimat",includedStandard:"Include taxa oficială și asistența pentru viză.",includedUrgent:"Include taxa oficială și serviciul de procesare urgentă.",govFee:"Taxa oficială",serviceFee:"Asistența GoVietStay",urgentFee:"Taxă suplimentară urgentă",exemptionTitle:"Veste bună — s-ar putea să nu ai nevoie de e-viză",exemptionBroad:"Poți beneficia de scutire de viză pentru 45 de zile, sub rezerva condițiilor.",exemptionTourism:"Pentru turism, poate exista o scutire de viză de 45 de zile, cu anumite condiții.",exemptionNote:"Verificăm condițiile și datele înainte de plată.",checkFree:"Verifică scutirea de viză",action:"Continuă pe WhatsApp",note:"Nu solicităm plata înainte de verificarea situației.",form:"Deschide formularul detaliat",priceNote:"Estimarea include taxa oficială și asistența. Tarifele urgente sunt pentru Hanoi și necesită confirmare.",selectFirst:"Selectează mai întâi țara pașaportului."
  },
  uk: {
    eyebrow:"Перевірте візу й ціну за кілька секунд",heading:"Оберіть візу до В’єтнаму",intro:"Чотири прості кроки без довгої анкети.",passport:"Країна паспорта",placeholder:"Оберіть країну",duration:"Тривалість перебування",entries:"Кількість в’їздів",speed:"Швидкість оформлення",options:["30 днів","45 днів","90 днів"],single:"Одноразовий в’їзд",multiple:"Багаторазовий в’їзд",economy:"Стандарт · приблизно 5–6 робочих днів",days4:"Терміново · 4 дні",days3:"Терміново · 3 дні",days2:"Терміново · 2 дні",day1:"Терміново · 1 день",hours4:"Терміново · 4 години",hours2:"Терміново · 2 години (Ханой)",hour1:"Терміново · 1 година (Ханой)",
    travelers:"Заявники",perPerson:"За особу",total:"Орієнтовна сума",includedStandard:"Включено державний збір і візову підтримку.",includedUrgent:"Включено державний збір і термінову візову підтримку.",govFee:"Державний збір",serviceFee:"Послуги GoVietStay",urgentFee:"Доплата за терміновість",exemptionTitle:"Гарна новина — електронна віза може бути не потрібна",exemptionBroad:"Можливе безвізове перебування до 45 днів за виконання умов в’їзду.",exemptionTourism:"Для туризму може діяти безвізове перебування до 45 днів за певних умов.",exemptionNote:"Перед оплатою перевіримо умови та дати поїздки.",checkFree:"Перевірити безвізовий в’їзд",action:"Продовжити у WhatsApp",note:"Оплата лише після перевірки вашої ситуації.",form:"Відкрити детальну анкету",priceNote:"Орієнтовна сума включає державний збір та послуги. Термінові тарифи — для Ханоя, потрібне підтвердження.",selectFirst:"Спочатку оберіть країну паспорта."
  },
} as const;

const speeds = [
  { id: "standard", key: "economy", days: "standard" },
  { id: "4 days", key: "days4" }, { id: "3 days", key: "days3" }, { id: "2 days", key: "days2" },
  { id: "1 day", key: "day1" }, { id: "4 hours", key: "hours4" },
  { id: "2 hours", key: "hours2" }, { id: "1 hour", key: "hour1" },
] as const;

export default function VisaQuickQuote({ language = "en", showDetailedFormLink = true }: { language?: Language; showDetailedFormLink?: boolean }) {
  const t = translations[language];
  const [country, setCountry] = useState("");
  const [stay, setStay] = useState(30);
  const [entry, setEntry] = useState<"single" | "multiple">("single");
  const [speed, setSpeed] = useState("standard");
  const [travelers, setTravelers] = useState(1);

  const countries = useMemo(() => {
    const display = new Intl.DisplayNames([language === "uk" ? "uk" : language, "en"], { type: "region" });
    return regionCodes.map(code => ({ code, name: display.of(code) || code }))
      .sort((a, b) => a.name.localeCompare(b.name, language));
  }, [language]);
  const bilateralDays = bilateralVisaFreeDays[country] || 0;
  const exemption = country && stay <= 45 && broadExemption.has(country) ? "broad" : country && stay <= 45 && tourismExemption.has(country) ? "tourism" : country && bilateralDays >= stay ? "bilateral" : null;
  // A single retail price table drives the selector, the detailed form and every language.
  const urgency = speed === "standard" ? 0 : 1;
  const each = getVisaPrice(entry, "HAN", speed);
  const total = each * travelers;
  const name = countries.find(c => c.code === country)?.name || country;

  const whatsappText = exemption
    ? `Hello GoVietStay, can you confirm whether I can enter Vietnam visa-free? Passport country: ${name} (${country}). Planned stay: ${stay} days. Entry: ${entry}. Travelers: ${travelers}. Please check conditions for my travel dates and purpose before recommending any paid visa.`
    : `Hello GoVietStay, please check my Vietnam visa options before any payment. Passport country: ${name} (${country}). Planned stay: ${stay} days. Entries: ${entry}. Processing requested: ${speed === "standard" ? "standard" : speed + " (Hanoi estimate)"}. Travelers: ${travelers}. Estimated price: US$${each} per person / US$${total} total, subject to eligibility and processing confirmation. My planned arrival date is: ____.`;

  const inputClass = "w-full appearance-none rounded-2xl border border-[#dce5e0] bg-white px-4 py-4 pr-10 text-base font-semibold text-[#092e25] shadow-sm outline-none focus:border-[#0b6b4f] focus:ring-2 focus:ring-[#0b6b4f]/20";
  const selectArrow = "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0b6b4f]";
  return (
    <section id="quick-visa-check" aria-labelledby="quick-visa-heading" className="scroll-mt-24 bg-[#f8f7f1] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#0b6b4f]/15 bg-white shadow-[0_30px_90px_rgba(6,37,27,.10)]">
        <div className="bg-[#08372a] px-6 py-8 text-white md:px-10 md:py-10">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#e8c466]">{t.eyebrow}</p>
          <h2 id="quick-visa-heading" className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{t.heading}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">{t.intro}</p>
        </div>
        <div className="grid gap-6 px-5 py-7 md:grid-cols-2 md:gap-7 md:px-10 md:py-9">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#11362d]">1. {t.passport}</span>
            <span className="relative block">
              <select value={country} onChange={e => setCountry(e.target.value)} className={inputClass} aria-label={t.passport}>
                <option value="">{t.placeholder}</option>
                {countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
              </select>
              <svg className={selectArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#11362d]">2. {t.duration}</span>
            <span className="relative block">
              <select value={stay} onChange={e => setStay(Number(e.target.value))} className={inputClass}>
                {[30, 45, 90].map((days, i) => <option value={days} key={days}>{t.options[i]}</option>)}
              </select>
              <svg className={selectArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#11362d]">3. {t.entries}</span>
            <span className="relative block">
              <select value={entry} onChange={e => setEntry(e.target.value as "single" | "multiple")} className={inputClass}>
                <option value="single">{t.single}</option><option value="multiple">{t.multiple}</option>
              </select>
              <svg className={selectArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#11362d]">4. {t.speed}</span>
            <span className="relative block">
              <select value={speed} onChange={e => setSpeed(e.target.value)} className={inputClass}>
                {speeds.map(item => <option key={item.id} value={item.id}>{t[item.key]}</option>)}
              </select>
              <svg className={selectArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </label>
        </div>
        <div className="mx-5 mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#0b6b4f]/10 bg-[#f6f8f6] px-5 py-3 md:mx-10">
          <span className="text-sm font-bold text-[#11362d]">{t.travelers}</span>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => setTravelers(v => Math.max(1,v-1))} disabled={travelers <= 1} aria-label="Remove applicant" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b6b4f]/20 bg-white text-xl font-bold disabled:opacity-40">−</button>
            <span className="w-5 text-center text-lg font-black tabular-nums">{travelers}</span>
            <button type="button" onClick={() => setTravelers(v => Math.min(20,v+1))} disabled={travelers >= 20} aria-label="Add applicant" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b6b4f]/20 bg-white text-xl font-bold disabled:opacity-40">+</button>
          </div>
        </div>
        {exemption && country ? (
          <div role="status" className="mx-5 mb-6 rounded-2xl border border-[#b0d5be] bg-[#edf8f0] px-6 py-6 text-[#0e4c2c] md:mx-10">
            <h3 className="text-xl font-black">{t.exemptionTitle}</h3>
            <p className="mt-2 leading-7">{exemption === "broad" ? t.exemptionBroad : exemption === "tourism" ? t.exemptionTourism : `${name}: ${bilateralDays} days visa-free for eligible ordinary-passport holders. Conditions and travel dates must be checked.`}</p>
            <p className="mt-2 text-sm opacity-80">{t.exemptionNote}</p>
          </div>
        ) : null}
        <div className="bg-[#0b2039] px-6 py-8 text-white md:px-10 md:py-10">
          {!country ? <p className="mb-5 text-sm text-white/70">{t.selectFirst}</p> : null}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#d1d8e2]">{exemption ? t.exemptionTitle : t.total}</p>
              <div aria-live="polite" className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-black tabular-nums text-[#e7ba42] md:text-6xl">{country && exemption ? "US$0" : `US$${total}`}</span>
                {!exemption && <span className="text-sm font-semibold text-white/60">USD</span>}
              </div>
              {!exemption && <p className="mt-2 text-sm text-white/70">US${each} / {t.perPerson.toLowerCase()}</p>}
            </div>
            {!exemption && <p className="max-w-xs text-sm leading-6 text-white/75">
              {urgency > 0 ? t.includedUrgent : t.includedStandard}
            </p>}
          </div>
          <a href={country ? `https://wa.me/84937762607?text=${encodeURIComponent(whatsappText)}` : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!country} onClick={e => { if(!country)e.preventDefault(); }} className={`mt-7 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-center text-lg font-black text-[#102a22] transition ${country ? "bg-[#e7ba42] hover:bg-[#f5cb64]" : "cursor-not-allowed bg-[#c5cbd1]"}`}>
            {exemption ? t.checkFree : t.action} <span aria-hidden="true" className="ml-2">→</span>
          </a>
          <p className="mt-3 text-center text-sm text-white/70">{t.note}</p>
          {showDetailedFormLink && <a href="#plan-visa" onClick={() => document.getElementById("plan-visa")?.setAttribute("open", "")} className="mt-3 block text-center text-sm font-bold text-[#f0c75a] underline underline-offset-4">{t.form}</a>}
          <p className="mt-5 text-xs leading-6 text-white/55">{t.priceNote}</p>
          <p className="mt-2 text-xs leading-5 text-white/55">Sources: <a href="https://evisa.gov.vn" target="_blank" rel="noreferrer" className="underline">Vietnam Immigration</a> · <a href="https://vnembassy-bruxelles.mofa.gov.vn/vi/tin-chi-tiet/chi-tiet/thong-bao-ve-nghi-quyet-cua-chinh-phu-ve-viec-mien-thi-thuc-theo-chuong-trinh-kich-cau-phat-trien-du-lich-59009-1353.html" target="_blank" rel="noreferrer" className="underline">visa exemption policy</a></p>
        </div>
      </div>
    </section>
  );
}
