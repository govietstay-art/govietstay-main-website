import Image from "next/image";
import type { Metadata } from "next";
import PublicInquiryForm from "../../../../components/PublicInquiryForm";

const BASE="https://www.govietstay.com";
const path="/ru/phu-quoc/from-minsk";
const canonical=BASE+path;
const title="Из Минска на Фукуок в 2026–2027: рейсы, виза, отели, трансферы и экскурсии";
const description="Честный путеводитель для гостей из Беларуси: рейсы Минск — Фукуок, виза, сезон, пляжи, районы отелей, трансферы, реальные фотографии и экскурсии с местной поддержкой.";
const wa="https://wa.me/84937762607?text="+encodeURIComponent("Здравствуйте! Я лечу из Минска на Фукуок. Даты: ____. Рейс: ____. Отель: ____. Взрослые/дети: ____. Нужен трансфер или экскурсии.");

export const metadata:Metadata={
  title:{absolute:"Минск — Фукуок 2026–2027: рейсы, виза и отдых | GoVietStay"},
  description,
  keywords:["Минск Фукуок 2026","Белавиа Фукуок Минск","Беларусь Фукуок без визы","трансфер Фукуок аэропорт","Фукуок экскурсии на русском","Фукуок для белорусов"],
  alternates:{canonical,languages:{"ru-BY":canonical}},
  robots:{index:true,follow:true},
  openGraph:{type:"article",locale:"ru_RU",siteName:"GoVietStay",title,description,url:canonical,images:[{url:BASE+"/tour/phuquoc/partner-2026/pq-06.jpg",alt:"Канатная дорога Хон Тхом и море Фукуока"}]},
  twitter:{card:"summary_large_image",title,description,images:[BASE+"/tour/phuquoc/partner-2026/pq-06.jpg"]}
};

const sections=[
{id:"rejsy",kicker:"01 · АВИАРЕЙСЫ",h:"Какие рейсы из Минска на Фукуок доступны в сезоне 2026–2027?",
p:[
"Belavia запустила чартерную программу Минск — Фукуок в октябре 2025 года. В опубликованных агрегаторами сезонных расписаниях на 2026–2027 годы указаны даты с 13 октября 2026 года до 27 марта 2027 года. Это информация о планируемых рейсах, а не гарантия наличия мест или выполнения каждого конкретного вылета.",
"Перед покупкой путёвки или билетов проверьте актуальное расписание у Belavia и вашего туроператора. Уточните, продаётся ли перелёт отдельно от проживания, какой багаж включён и в каком терминале прибытие. При изменениях программы возможны варианты с пересадкой через другие азиатские аэропорты.",
"Фукуок обслуживает международный аэропорт PQC. После долгого перелёта особенно полезно заранее согласовать трансфер: водитель должен знать номер рейса, количество пассажиров и полный адрес отеля."
],bullets:["Минск — MSQ; Фукуок — PQC.","Опубликованный сезонный график не заменяет подтверждение авиакомпании.","Запас времени на паспортный контроль и багаж обязателен.","Указывайте фактический номер рейса, а не только дату прилёта."]},
{id:"visa",kicker:"02 · ВЪЕЗД",h:"Нужна ли гражданам Беларуси виза во Вьетнам?",
p:[
"По соглашению между Беларусью и Вьетнамом для владельцев обычных паспортов действует безвизовый въезд на срок до 30 дней за одно посещение, при соблюдении требований. Суммарное пребывание ограничено 90 днями в течение календарного года.",
"Если хотите провести во Вьетнаме больше 30 дней подряд, следует оформить соответствующую визу заранее. Для электронных виз используется государственный портал evisa.gov.vn. Отдельно проверьте требования к сроку действия паспорта, транзиту через другие страны и поездкам с детьми.",
"Это общая информация, которая не гарантирует пересечение границы. Перед вылетом уточните условия у официальных государственных источников и перевозчика."
],bullets:["До 30 дней за один въезд без визы; всего не более 90 дней в календарном году.","Для более длительного визита оформляйте визу до поездки.","Официальные источники: МИД Вьетнама и evisa.gov.vn."]},
{id:"season",kicker:"03 · СЕЗОН",h:"Погода на Фукуоке: когда лучше лететь из Беларуси?",
p:[
"Зима — популярное время для поездки на Фукуок: с декабря по март часто бывает благоприятная погода для пляжного отдыха и лодочных экскурсий. В ноябре могут сохраняться переходные погодные условия, а в апреле — быть жарче.",
"С мая по октябрь дожди и ветра чаще мешают прогулкам на море. Даже в сухой сезон безопасность зависит от волн и предупреждений — выход катера нельзя гарантировать заранее.",
"Не сравнивайте погоду на Фукуоке с погодой в Дананге: центральный и южный регионы имеют разные сезонные особенности."
],bullets:["Декабрь–март — обычно наиболее удобный период для пляжей.","В сезон дождей бронируйте море с возможностью переноса.","Для семьи оставьте 1–2 свободных дня на отдых."]},
{id:"hotels",kicker:"04 · РАЙОНЫ",h:"Где остановиться: Лонг-Бич, Онг-Ланг, Гранд-Уорлд или Сансет-Таун?",
p:[
"Лонг-Бич (Бай Чыонг) — удобный выбор для первого отдыха благодаря разнообразию отелей, ресторанов и мест для прогулок. Онг-Ланг подойдёт тем, кому хочется более спокойной атмосферы.",
"Гранд-Уорлд находится на севере острова и привлекает вечерней жизнью. Сансет-Таун — на юге: его выбирают ради архитектуры, шоу и близости к канатной дороге Хон Тхом. Учтите, что север и юг находятся далеко друг от друга, а вид из номера не гарантирует прямой доступ к пляжу.",
"GoVietStay работает с местным размещением в том числе в районе Бай Чыонг, Гранд-Уорлд и южных апартаментов. Наличие номеров и цены нужно подтверждать на конкретные даты."
],bullets:["Семье: уточняйте удобство пляжа, лифт, тень и детское питание.","Паре: выбирайте между спокойствием и вечерними развлечениями.","Для морских экскурсий: учитывайте расстояние до порта Ан Тхой.","Перед оплатой проверьте положение отеля на карте."]},
{id:"transfer",kicker:"05 · ВСТРЕЧА",h:"Трансфер из аэропорта Фукуока: как всё проходит",
p:[
"После прилёта вам нужно пройти контроль и получить багаж. Если заранее заказана машина, водитель встречает в согласованной зоне с вашим именем или связывается через WhatsApp. Точное место встречи лучше сообщить до перелёта.",
"Цена зависит от района отеля, времени и типа автомобиля. При поездке с большим количеством чемоданов укажите их число: не всякий семиместный автомобиль одинаково удобен для группы с багажом.",
"Можно заказать только трансфер без экскурсий. Если ребёнку требуется автокресло, сообщите его возраст заранее; доступность кресла подтверждается отдельно."
],bullets:["Сообщите номер рейса и название отеля.","Уточните ожидание при задержке и ночную доплату.","Не передавайте деньги водителю сверх согласованной стоимости без причины."]},
{id:"excursions",kicker:"06 · ЧЕМ ЗАНЯТЬСЯ",h:"Экскурсии на русском: 3 острова, 4 острова, Хон Тхом и частные поездки",
p:[
"На юге Фукуока популярны поездки по архипелагу Ан Тхой, снорклинг, пляжные остановки и канатная дорога на Хон Тхом. На севере — Гранд-Уорлд и развлекательные парки. Если отель расположен на другом конце острова, закладывайте дополнительное время на автомобиль.",
"Программы «3 острова» и «4 острова» отличаются у разных организаторов. Важнее заранее выяснить, какие именно остановки предусмотрены, сколько времени будет в воде, какой тип лодки используется и что входит в стоимость.",
"Частный трансфер и частная лодка — разные услуги. Можно выбрать групповой тур ради экономии или частный маршрут для комфорта семьи. Русскоязычный гид возможен по запросу после подтверждения его доступности и квалификации."
],bullets:["Проверьте обед, оборудование, билеты и трансфер.","При сильных волнах прогулки на море могут отменяться.","Для маленьких детей заранее уточняйте возрастные ограничения.","Частный автомобиль не означает автоматически частную лодку."]},
{id:"budget",kicker:"07 · РАСХОДЫ",h:"Как избежать лишних трат во время отдыха",
p:[
"Основная валюта Вьетнама — донг (VND). Кроме проживания и авиабилетов отдельно учитывайте питание, передвижения, входные билеты и экскурсии. Карты принимаются не везде, поэтому небольшая сумма наличных удобна для рынков и местных кафе.",
"Если сравниваете цены на экскурсии, смотрите не только на итоговую цифру. Обязательно уточните: цена за человека или всю семью, частная ли лодка, включены ли еда, билеты, детские тарифы, страховка и трансфер.",
"GoVietStay может подготовить расчёт на конкретную дату и число участников, но сообщение с запросом не является подтверждённой бронью."
],bullets:["Уточняйте полный список включённых и исключённых услуг.","Сверяйте условия отмены до оплаты.","Не переходите по подозрительным платёжным ссылкам."]},
{id:"families",kicker:"08 · СЕМЬЯ",h:"Что предусмотреть при отдыхе с детьми или родителями",
p:[
"После ночного перелёта не стоит сразу ехать на продолжительный тур. Лучше оставить день на сон, море и знакомство с районом. Для детей младшего возраста предусмотрите перерывы, воду, защиту от солнца и тень.",
"Перед прогулкой на лодке сообщите возраст детей, наличие проблем с укачиванием и ограничения по передвижению. Не все морские программы подходят для младенцев или пожилых путешественников."
],bullets:["Детское кресло и коляску согласуйте заранее.","Если море неспокойное, выбирайте наземный маршрут.","Оставьте свободный день перед обратным вылетом."]},
{id:"rest",kicker:"09 · ЕЩЁ ОДИН РЕГИОН",h:"Стоит ли после Фукуока ехать в Дананг, Хойан и Хюэ?",
p:[
"Если ваш отпуск длится всего семь дней, обычно лучше посвятить их Фукуоку. Путешествие в центральный Вьетнам требует отдельного авиаперелёта или сложной наземной комбинации. На 12–14 дней можно рассмотреть два региона.",
"В Дананге удобно сочетать море, горы Ба На и вечерний Хойан, а в Хюэ — увидеть императорскую архитектуру. Но зимой в центральной части Вьетнама условия для пляжа могут быть хуже, чем на Фукуоке.",
"Сначала выберите реальные рейсы, затем составляйте маршрут: нельзя считать, что между каждым островом и городом ежедневно есть прямой самолёт."
],bullets:["На 7 дней — один регион.","На 12–14 дней — возможно два региона с учётом логистики.","Не делайте короткую незащищённую пересадку перед международным вылетом."]}
];
const itinerary=[
{title:"7 дней: пляж и самые интересные места",items:[
["День 1","Прилёт, трансфер, отдых."],["День 2","Пляж и район отеля."],["День 3","Канатная дорога Хон Тхом и юг острова."],["День 4","Свободный день."],["День 5","Острова или снорклинг при спокойном море."],["День 6","Гранд-Уорлд либо местная кухня и прогулки."],["День 7","Трансфер и возвращение домой."]]},
{title:"14 дней: размеренный отпуск",items:[
["Дни 1–3","Прилёт, пляж и местные прогулки."],["Дни 4–6","Юг острова, канатная дорога и отдых."],["Дни 7–9","Морская экскурсия и свободные дни."],["Дни 10–12","Север, Гранд-Уорлд, спокойный вечер."],["Дни 13–14","Резерв и вылет."]]}
];
const faq=[
["Нужна ли белорусам виза на Фукуок?","По действующему соглашению для владельцев обычных паспортов — до 30 дней без визы за посещение и максимум 90 дней в календарном году при соблюдении условий."],
["Можно ли прилететь из Минска без пересадки?","Belavia запускала чартеры, а на сезон 2026–2027 опубликованы рейсы. Наличие билетов и выполнение конкретного рейса проверьте у авиакомпании."],
["Когда лучше ехать на Фукуок?","Для пляжного отдыха часто выбирают декабрь–март. Море и ветер нужно проверять перед лодочными экскурсиями."],
["Подходит ли Гранд-Уорлд для всей поездки?","Это зависит от ваших интересов. На севере удобно для вечерних развлечений, но многие морские экскурсии отправляются с юга."],
["Можно ли заказать только встречу в аэропорту?","Да, трансфер можно заказать отдельно без пакета экскурсий."],
["Есть ли русскоязычный гид?","По предварительному запросу и после подтверждения его доступности."],
["Что лучше: групповой или частный тур?","Групповой дешевле на человека; частный удобнее для собственного темпа. Уточните, является ли лодка частной."],
["Если на море волны, экскурсию перенесут?","Перенос или возврат зависит от условий конкретного предложения; согласуйте их до оплаты."]
];
const refs=[
{href:"https://mofa.gov.vn/vi/tin-chi-tiet/chi-tiet/uy-vien-bo-chinh-tri-bo-truong-ngoai-giao-le-hoai-trung-hoi-dam-voi-bo-truong-ngoai-giao-belarus-63103-1073.html",name:"МИД Вьетнама: переговоры Вьетнама и Беларуси 28 октября 2026 года"},
{href:"https://lanhsuvietnam.gov.vn/Lists/BaiViet/B%C3%A0i%20vi%E1%BA%BFt/DispForm.aspx?ID=1176&List=dc7c7d75-6a32-4215-afeb-47d4bee70eee",name:"МИД Вьетнама: соглашение о безвизовых поездках граждан Беларуси"},
{href:"https://evisa.gov.vn",name:"Официальный портал электронной визы"},
{href:"https://www.belavia.by",name:"Belavia: действующее расписание и билеты"},
{href:"https://www.govietstay.com/be/phu-quoc",name:"Подробный справочник о Фукуоке на белорусском"}
];

export default function Page(){
const schema={"@context":"https://schema.org","@graph":[
{"@type":"Article",headline:title,description,mainEntityOfPage:canonical,inLanguage:"ru-BY",
 datePublished:"2026-10-11",dateModified:"2026-10-29",
 author:{"@type":"Organization",name:"GoVietStay",url:BASE},
 publisher:{"@id":BASE+"/#organization"},
 image:[BASE+"/tour/phuquoc/partner-2026/pq-06.jpg"]},
{"@type":"BreadcrumbList",itemListElement:[
 {"@type":"ListItem",position:1,name:"GoVietStay",item:BASE},
 {"@type":"ListItem",position:2,name:"Фукуок на русском",item:BASE+"/ru/phu-quoc"},
 {"@type":"ListItem",position:3,name:"Из Минска на Фукуок",item:canonical}]},
{"@type":"FAQPage",mainEntity:faq.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}
]};
return <div className="min-h-screen bg-[#f5f8f7] text-slate-900">
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
 <div className="bg-emerald-950 px-5 py-2.5 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">МЕСТНАЯ КОМАНДА ВО ВЬЕТНАМЕ · РУССКОЯЗЫЧНАЯ КОНСУЛЬТАЦИЯ ПО ЗАПРОСУ · СВЯЗЬ 24/7</div>
 <header className="border-b border-emerald-100 bg-white">
  <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
   <a href="/" className="text-2xl font-extrabold text-emerald-950">GoVietStay<span className="block text-xs font-medium text-slate-500">Trusted Local Support</span></a>
   <nav className="flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold">
    <a href="/ru/phu-quoc" className="text-emerald-800">Фукуок</a>
    <a href="/be/phu-quoc" className="text-emerald-800">Беларуская версія</a>
    <a href="/be/phu-quoc-tours" className="text-emerald-800">Экскурсии</a>
    <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-900 px-5 py-2.5 text-white">WhatsApp</a>
   </nav>
  </div>
 </header>
 <main>
 <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
   <Image fill priority src="/tour/phuquoc/partner-2026/pq-06.jpg" alt="Канатная дорога Хон Тхом над бирюзовым морем Фукуока" sizes="100vw" className="-z-20 object-cover object-center"/>
   <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-950/75 to-emerald-950/15"/>
   <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950/55 via-transparent to-transparent"/>
   <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pt-32">
    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-sm">🇧🇾 ДЛЯ ПУТЕШЕСТВЕННИКОВ ИЗ БЕЛАРУСИ</div>
    <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-emerald-100">МИНСК → ФУКУОК · ЗИМА 2026–2027</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.12] sm:text-5xl lg:text-[4.2rem]">Из Минска на Фукуок: <span className="text-emerald-200">от первого вопроса до тёплого моря</span></h1>
    <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">Рейсы, правила въезда, лучшие районы, честные советы по расходам и идеи отдыха. Бесплатный путеводитель от местной команды GoVietStay — даже если вы всё бронируете самостоятельно.</p>
    <div className="mt-9 flex flex-wrap gap-3"><a href="#guide" className="rounded-full bg-white px-6 py-3.5 font-bold text-emerald-950 transition hover:bg-emerald-50">Изучить путеводитель ↓</a><a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/80 bg-emerald-950/30 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-900">Спросить местного эксперта ↗</a></div>
    <p className="mt-6 text-sm font-medium text-white/80">Без обязательной покупки тура · Помощь на русском по запросу</p>
   </div>
  </section>
  <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
   <div className="relative -mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[
    ["Маршрут","Минск (MSQ) — Фукуок (PQC); сезонные рейсы уточняйте"],
    ["Виза","До 30 дней за один въезд; максимум 90 дней за календарный год"],
    ["Погода","Для пляжного отдыха обычно выбирают декабрь–март"],
    ["Местная помощь","Трансферы, частные экскурсии и поддержка по-русски"]
   ].map(([a,b])=><div key={a} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold text-emerald-900">{a}</h2><p className="mt-2 text-base leading-7 text-slate-700">{b}</p></div>)}</div>
   <p className="mt-9 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base leading-8 text-amber-950"><strong>Перед поездкой:</strong> сезонные рейсы и цены зависят от авиакомпании и туроператора, а правила въезда могут меняться. Проверьте актуальные условия на дату вылета. Путеводитель обновлён 29 октября 2026 года.</p>
   <section className="mt-12 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_-35px_rgba(6,78,59,0.28)] lg:grid lg:grid-cols-2">
    <div className="relative min-h-[320px] lg:min-h-[480px]"><Image src="/tour/phuquoc/partner-2026/pq-07.jpg" alt="Закат над районом Сансет-Таун на Фукуоке" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/></div>
    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
     <p className="text-xs font-extrabold uppercase tracking-[0.19em] text-emerald-700">ПУТЕШЕСТВУЙТЕ СВОИМ ТЕМПОМ</p>
     <h2 className="mt-4 text-3xl font-extrabold leading-tight text-emerald-950 sm:text-4xl">Не нужно покупать большой пакет, чтобы получить помощь на месте.</h2>
     <p className="mt-5 text-lg leading-8 text-slate-700">У вас уже есть перелёт и отель? Отлично. Мы подскажем, где удобнее жить, как добраться после долгого рейса и какие экскурсии действительно подходят вашей семье.</p>
     <div className="mt-7 grid gap-3 text-base font-semibold text-slate-800 sm:grid-cols-2"><span>✓ Советы без обязательств</span><span>✓ Маршрут под ваши даты</span><span>✓ Прозрачная стоимость</span><span>✓ Поддержка во Вьетнаме</span></div>
     <a href="#plans" className="mt-8 inline-flex self-start border-b-2 border-emerald-700 pb-1 font-extrabold text-emerald-800">Посмотреть примеры маршрутов →</a>
    </div>
   </section>
   <section className="mt-12 rounded-3xl border border-sky-100 bg-sky-50 p-6 sm:p-8">
    <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-sky-800">НОВОСТИ · 28 ОКТЯБРЯ 2026</p>
    <h2 className="mt-3 text-2xl font-extrabold text-slate-900">Вьетнам и Беларусь обсудили развитие авиасообщения и туризма</h2>
    <p className="mt-3 text-base leading-8 text-slate-700">Министры иностранных дел двух стран обсудили сотрудничество, в том числе туристические связи. Маршруты из Минска в Камрань и на Фукуок уже были открыты ранее. Это позитивный сигнал для путешественников, но не подтверждение новых дат или дополнительных рейсов.</p>
    <a href="https://mofa.gov.vn/vi/tin-chi-tiet/chi-tiet/uy-vien-bo-chinh-tri-bo-truong-ngoai-giao-le-hoai-trung-hoi-dam-voi-bo-truong-ngoai-giao-belarus-63103-1073.html" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-sky-900 underline underline-offset-4">Официальное сообщение МИД Вьетнама ↗</a>
   </section>
   <div id="guide" className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
    <aside className="self-start lg:sticky lg:top-7"><nav aria-label="Содержание" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">Содержание</h2><div className="mt-4 flex flex-col gap-3">{sections.map((s,i)=><a className="text-sm leading-6 text-emerald-900 hover:underline" href={"#"+s.id} key={s.id}>{i+1}. {s.h}</a>)}<a href="#plans" className="font-semibold text-emerald-900">Планы поездки</a><a href="#faq" className="font-semibold text-emerald-900">Частые вопросы</a></div></nav></aside>
    <article className="min-w-0 space-y-8">{sections.map(s=><section id={s.id} key={s.id} className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
     <p className="text-sm font-bold tracking-wider text-emerald-800">{s.kicker}</p><h2 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">{s.h}</h2>
     {s.p.map((paragraph,i)=><p key={i} className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{paragraph}</p>)}
     <ul className="mt-5 space-y-3 border-l-4 border-emerald-100 pl-6 text-base leading-8 text-slate-700 sm:text-lg">{s.bullets.map(b=><li key={b} className="list-disc">{b}</li>)}</ul>
    </section>)}</article>
   </div>
   <section id="plans" className="mt-16 scroll-mt-8"><h2 className="text-3xl font-extrabold sm:text-4xl">Примеры маршрутов на 7 и 14 дней</h2><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">Примеры можно адаптировать под погоду, отель и возраст детей. Это не жёсткий график и не оплаченная программа.</p>
    <div className="mt-7 grid gap-6 lg:grid-cols-2">{itinerary.map(it=><section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white" key={it.title}><h3 className="bg-emerald-900 p-6 text-2xl font-extrabold text-white">{it.title}</h3><ol className="divide-y divide-slate-100 px-6 py-2">{it.items.map(([when,activity])=><li key={when} className="grid gap-2 py-4 text-base leading-7 sm:grid-cols-[115px_1fr]"><strong className="text-emerald-900">{when}</strong><span>{activity}</span></li>)}</ol></section>)}</div>
   </section>
   <section className="mt-20">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">ФУКУОК В КАДРЕ</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Остров, который стоит увидеть самому</h2><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Фотографии из материалов местных партнёров и снимки гостей GoVietStay. Море, закаты и живые впечатления — без обещаний идеальной погоды каждый день.</p></div><a href="/ru/tours/phu-quoc" className="rounded-full border border-emerald-700 px-5 py-3 font-bold text-emerald-900 hover:bg-emerald-50">Посмотреть экскурсии →</a></div>
    <div className="mt-7 grid gap-4 md:grid-cols-12">
     <figure className="overflow-hidden rounded-3xl bg-white shadow-sm md:col-span-7"><div className="relative h-72 sm:h-96"><Image src="/tour/phuquoc/partner-2026/pq-05.jpg" alt="Пара путешественников на солнечном пляже Фукуока" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover"/></div><figcaption className="p-5 text-base font-semibold">Пляжи и тихие острова · юг Фукуока</figcaption></figure>
     <figure className="overflow-hidden rounded-3xl bg-white shadow-sm md:col-span-5"><div className="relative h-72 sm:h-96"><Image src="/tour/phuquoc/partner-2026/pq-14.jpg" alt="Морская прогулка среди островов Ан Тхой" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover"/></div><figcaption className="p-5 text-base font-semibold">Морские прогулки и снорклинг · Ан Тхой</figcaption></figure>
     <figure className="overflow-hidden rounded-3xl bg-white shadow-sm md:col-span-4"><Image src="/guest-photos/belarus-grand-world-original.avif" alt="Гранд-Уорлд вечером, снимок гостя" width={512} height={288} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-video w-full object-cover"/><figcaption className="p-5 text-sm font-semibold">Гранд-Уорлд · фото гостя</figcaption></figure>
     <figure className="overflow-hidden rounded-3xl bg-white shadow-sm md:col-span-4"><Image src="/guest-photos/belarus-hon-thom-original.avif" alt="Канатная дорога Хон Тхом, снимок гостя" width={512} height={288} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-video w-full object-cover"/><figcaption className="p-5 text-sm font-semibold">Хон Тхом · фото гостя</figcaption></figure>
     <figure className="overflow-hidden rounded-3xl bg-white shadow-sm md:col-span-4"><Image src="/tour/phuquoc/partner-2026/pq-13.jpg" alt="Поездка на джипе через лес Фукуока" width={720} height={405} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-video w-full object-cover"/><figcaption className="p-5 text-sm font-semibold">Природа острова · поездка на джипе</figcaption></figure>
    </div>
   </section>
   <section id="faq" className="mt-16 scroll-mt-8 rounded-3xl bg-white p-6 sm:p-9"><h2 className="text-3xl font-extrabold">Частые вопросы</h2><div className="mt-6 divide-y divide-slate-200">{faq.map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer text-lg font-bold text-emerald-950">{q}</summary><p className="mt-3 text-base leading-8 text-slate-700">{a}</p></details>)}</div></section>
   <section id="contact" className="relative mt-16 scroll-mt-8 overflow-hidden rounded-[2rem] bg-emerald-950 p-8 text-white sm:p-12 lg:p-16"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[50px] border-white/5"/><div className="relative max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">GO VIET STAY · TRUSTED LOCAL SUPPORT</p><h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">Есть вопросы о Фукуоке? Спросите человека, который работает здесь.</h2><p className="mt-5 text-lg leading-8 text-emerald-50">Напишите даты, отель, количество взрослых и возраст детей. Мы поможем подобрать трансфер, отдельную экскурсию или спокойный маршрут для всей семьи. Можно задать один вопрос — покупать ничего не обязательно.</p><div className="mt-8 flex flex-wrap gap-3"><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-white px-6 py-3.5 font-extrabold text-emerald-950 hover:bg-emerald-50">Написать в WhatsApp →</a><a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-white/60 px-6 py-3.5 font-bold text-white hover:bg-white/10">Посмотреть отзывы гостей ↗</a></div><p className="mt-5 text-sm text-emerald-100">WhatsApp: +84 937 762 607 · Ответ по-русски — по возможности или с переводом</p></div></section>
   <section className="mt-10 grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 lg:grid-cols-2"><div><h2 className="text-2xl font-extrabold">Отправьте запрос команде GoVietStay</h2><p className="mt-4 text-base leading-8 text-slate-700">Бесплатная заявка: подтверждаем цену, расписание и доступность до оплаты. Отправка формы ещё не означает бронь.</p></div><PublicInquiryForm productCode="RU-BY-MINSK-PQ-2026" productName="Минск — Фукуок: трансфер и частные экскурсии" sourcePage={path} locale="ru" compact /></section>
   <section className="mt-14"><h2 className="text-2xl font-extrabold">Полезные страницы</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[
    ["/be/phu-quoc","Фукуок на белорусском"],
    ["/be/phu-quoc-tours","Экскурсии и острова"],
    ["/be/vietnam-travel","Вьетнам: маршруты 7–14 дней"],
    ["/ru/tours/phu-quoc","Туры GoVietStay по-русски"]
   ].map(([href,label])=><a className="rounded-2xl border border-emerald-100 bg-white p-5 font-bold text-emerald-900 hover:underline" href={href} key={href}>{label} →</a>)}</div></section>
   <section className="mt-12 border-t border-slate-200 pt-8"><h2 className="text-xl font-bold">Официальные источники</h2><ul className="mt-4 space-y-2">{refs.map(r=><li key={r.href}><a href={r.href} target="_blank" rel="noopener noreferrer" className="text-base text-emerald-800 underline">{r.name}</a></li>)}</ul></section>
  </div>
 </main>
 <a href={wa} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-emerald-800 px-5 py-4 text-center text-sm font-extrabold text-white shadow-[0_8px_30px_rgba(6,78,59,0.4)] sm:hidden">Задать вопрос о поездке · WhatsApp ↗</a>
 <footer className="bg-slate-950 p-8 text-slate-100"><div className="mx-auto max-w-7xl text-base leading-8"><strong>GoVietStay · Trusted Local Support</strong><br/>Дананг · Хойан · Хюэ · Фукуок · WhatsApp +84 937 762 607<br/><small>Сведения о рейсах, правилах въезда и погоде могут меняться. © 2026 GoVietStay.</small></div></footer>
 </div>
}
