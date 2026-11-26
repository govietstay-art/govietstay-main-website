import type { Metadata } from "next";
import JsonLd from "./JsonLd";
import { chinaMarketConfig } from "../lib/chinaMarketConfig";

const base = "https://www.govietstay.com";
const paths = { cn: "/cn/cruise-port-shore-excursions", tw: "/tw/cruise-port-shore-excursions" };
const languages = { "zh-CN": base+paths.cn, "zh-TW": base+paths.tw };
const copy = {
cn: {
title:"2027 越南邮轮岸上观光｜真美港・岘港・会安・顺化｜GoVietStay",
desc:"爱达邮轮、皇家加勒比等邮轮旅客的越南岸上自由行：真美港、仙沙港、下龙湾及富美港私人包车，中文咨询，按返船时间规划。",
home:"中国游客专区",other:"繁體中文",hero:"2027 越南邮轮岸上观光",lead:"不赶景点，不盲目跟团。越南当地团队根据您的邮轮停靠时间，安排私人包车与灵活的一日游。",contact:"微信咨询",plans:"查看岸上行程",tags:["中文咨询","私人包车","不强制购物","预留返船时间"],
warning:"请以船方通知的最晚登船时间为准，而不是港口公布的离港时间。接客地点须根据当日港口规定确认，可能需要步行至指定港外集合点。",
ports:"按停靠港选择行程",cards:[["真美港（Chan May）","顺化皇城、陵姑湾、海云岭。前往顺化或岘港通常需约75–90分钟车程。"],["仙沙港（Tien Sa）","岘港市区、五行山、会安古城。前往会安通常约50–65分钟。"],["富美港（Phu My）","胡志明市私人行程，需确认实际码头与交通时间。"],["下龙湾（Ha Long）","根据实际码头和停靠时间安排当地观光或游船询价。"]],
routes:"根据可用岸上时间选择路线",routeRows:[["真美港 · 约5小时","陵姑湾＋海云岭","短暂停靠优先选择近距离景点。"],["真美港 · 约7小时","顺化精选","皇城或一座皇陵、天姥寺，视时间安排午餐。"],["真美港 · 约9小时","顺化深度私人游","皇城、启定陵、天姥寺与当地午餐，视时间调整。"],["仙沙港 · 约5小时","岘港精华","山茶半岛、美溪海滩，时间允许则游览五行山。"],["仙沙港 · 约7小时","岘港＋会安","五行山、会安古城、午餐或咖啡。"],["仙沙港 · 约9小时","会安＋椰林 或 巴拿山","两种路线择一，避免安排过多远距离景点。"]],
shipTitle:"2027 邮轮旅客服务",shipText:"欢迎爱达·花城号（Adora Flora City）、爱达·魔都号、皇家加勒比海洋光谱号，以及其他邮轮旅客咨询。船名仅用于识别行程，并不代表与邮轮公司合作或确认2027年靠港日期。",schedule:"查看港口船期",scheduleText:"2027年具体靠港日期及码头须以港口和船方最新公告为准。我们不将往年船期作为已确认的2027年船期。",
faq:[["可以在船边接客吗？","不一定。须遵守港口安保与通行规定，出发前确认集合点。"],["有中文导游吗？","可提前申请中文导游，视档期确认；也可选择仅包车。"],["如何报价？","提供船名、日期、港口、最晚登船时间及人数后，我们确认费用、包含项目和取消条件。"],["下雨怎么办？","按天气、道路和景点开放情况调整路线，优先保留返船缓冲时间。"]],
quote:"发送以下资料，获取私人行程报价",details:"船名／日期／港口／抵港时间／最晚登船时间／成人与儿童人数／语言／想去的景点",qr:"长按保存微信二维码，在微信扫一扫中从相册识别。",drive:"车程仅为规划参考，受天气、交通和港口手续影响。",review:"查看当地团队评价"
},
tw: {
title:"2027 越南郵輪岸上觀光｜真美港・峴港・會安・順化｜GoVietStay",
desc:"越南郵輪岸上自由行：真美港、仙沙港、下龍灣及富美港私人包車，繁體中文 LINE 諮詢，依返船時間安排。",
home:"台灣旅客專區",other:"简体中文",hero:"2027 越南郵輪岸上觀光",lead:"不趕景點，不盲目跟團。越南在地團隊依您的郵輪停靠時間安排私人包車與彈性一日遊。",contact:"LINE 免費諮詢",plans:"查看岸上行程",tags:["繁體中文諮詢","私人包車","不強制購物","預留返船時間"],
warning:"請以船方通知的最晚登船時間為準，而非港口公布的離港時間。接送地點依當日港口規定確認，可能需要步行至指定港外集合點。",
ports:"依停靠港選擇行程",cards:[["真美港（Chan May）","順化皇城、陵姑灣、海雲嶺。前往順化或峴港通常約75–90分鐘車程。"],["仙沙港（Tien Sa）","峴港市區、五行山、會安古城。前往會安通常約50–65分鐘。"],["富美港（Phu My）","胡志明市私人行程，須確認實際碼頭與交通時間。"],["下龍灣（Ha Long）","依實際碼頭和停靠時間安排當地觀光或遊船詢價。"]],
routes:"依可用岸上時間選擇路線",routeRows:[["真美港 · 約5小時","陵姑灣＋海雲嶺","短暫停靠優先選擇鄰近景點。"],["真美港 · 約7小時","順化精選","皇城或一座皇陵、天姥寺，視時間安排午餐。"],["真美港 · 約9小時","順化深度私人遊","皇城、啟定陵、天姥寺與當地午餐，視時間調整。"],["仙沙港 · 約5小時","峴港精華","山茶半島、美溪海灘，時間允許則遊覽五行山。"],["仙沙港 · 約7小時","峴港＋會安","五行山、會安古城、午餐或咖啡。"],["仙沙港 · 約9小時","會安＋水椰林 或 巴拿山","兩種路線擇一，避免安排過多遠距離景點。"]],
shipTitle:"2027 郵輪旅客服務",shipText:"歡迎愛達·花城號（Adora Flora City）、皇家加勒比海洋光譜號、公主遊輪及其他郵輪旅客諮詢。船名僅用於辨識行程，不代表與郵輪公司合作或確認2027年靠港日期。",schedule:"查看港口船期",scheduleText:"2027年實際靠港日期及碼頭以港口與船方最新公告為準，不將往年船期視為已確認的2027年船期。",
faq:[["可以在船邊接送嗎？","不一定。須遵守港口安保與通行規定，出發前確認集合點。"],["有中文導遊嗎？","可提前申請中文導遊，視檔期確認；也可選擇僅包車。"],["如何報價？","提供船名、日期、港口、最晚登船時間及人數後，我們確認費用、包含項目及取消條件。"],["下雨怎麼辦？","依天氣、道路和景點開放狀況調整路線，優先保留返船緩衝時間。"]],
quote:"提供以下資料，取得私人行程報價",details:"船名／日期／港口／抵港時間／最晚登船時間／成人與兒童人數／語言／想去的景點",qr:"使用 LINE 聯繫在地團隊。",drive:"車程僅供規劃參考，受天氣、交通及港口手續影響。",review:"查看在地團隊評價"
}};
export function cruiseMetadata(m: keyof typeof copy): Metadata {
const c=copy[m];return {title:{absolute:c.title},description:c.desc,alternates:{canonical:base+paths[m],languages},robots:{index:true,follow:true},openGraph:{title:c.title,description:c.desc,url:base+paths[m],type:"website",locale:m==="cn"?"zh_CN":"zh_TW",siteName:"GoVietStay",images:[base+"/tour/cruise.jpg"]}};
}
export default function Cruise2027({market}:{market:keyof typeof copy}){
const c=copy[market],cn=market==="cn";
const wa="https://wa.me/84937762607?text="+encodeURIComponent(c.details);
const line="https://line.me/ti/p/VWxCn8-3Tz";
const schema={"@context":"https://schema.org","@type":"Service",name:c.hero,url:base+paths[market],provider:{"@id":base+"/#organization"},areaServed:["Hue","Da Nang","Hoi An","Ha Long","Ho Chi Minh City"],serviceType:c.desc};
return <main lang={cn?"zh-CN":"zh-TW"} className="min-h-screen bg-slate-950 text-white"><JsonLd data={schema}/>
<section className="relative overflow-hidden border-b border-white/10"><img src="/tour/cruise.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25"/><div className="relative mx-auto max-w-6xl px-5 py-16"><nav className="mb-10 flex flex-wrap items-center gap-5 text-sm"><a href={cn?"/cn":"/tw"}><img src="/brand/govietstay-official-logo.jpg" alt="GoVietStay" className="h-14 rounded-xl"/></a><a href={cn?"/cn":"/tw"}>{c.home}</a><a href={paths[cn?"tw":"cn"]}>{c.other}</a><a href="/en/cruise-port-shore-excursions">English</a><a href="/ru/cruise-port-shore-excursions">Русский</a></nav><p className="font-bold tracking-widest text-emerald-300">GOVIETSTAY · CRUISE SERVICES 2027</p><h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{c.hero}</h1><p className="mt-5 max-w-3xl text-lg leading-8">{c.lead}</p><div className="mt-6 flex flex-wrap gap-3">{c.tags.map(t=><span key={t} className="rounded-full border border-white/20 bg-slate-950/70 px-4 py-2">{t}</span>)}</div><div className="mt-8 flex flex-wrap gap-3"><a href="#contact" className="rounded-xl bg-emerald-400 px-6 py-3 font-bold text-slate-950">{c.contact}</a><a href="#routes" className="rounded-xl border border-white/30 px-6 py-3">{c.plans}</a></div></div></section>
<section className="mx-auto max-w-6xl px-5 py-12"><p className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 leading-7">{c.warning}</p><h2 className="mt-10 text-3xl font-bold">{c.ports}</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{c.cards.map(([t,d])=><article key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6"><h3 className="text-xl font-bold text-sky-300">{t}</h3><p className="mt-3 leading-7">{d}</p></article>)}</div><p className="mt-4 text-sm text-slate-300">{c.drive}</p></section>
<section id="routes" className="mx-auto max-w-6xl px-5 py-12"><h2 className="text-3xl font-bold">{c.routes}</h2><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{c.routeRows.map(([time,t,d])=><article key={time} className="rounded-2xl border border-white/10 bg-slate-900 p-6"><p className="text-sm font-bold text-emerald-300">{time}</p><h3 className="mt-2 text-xl font-bold">{t}</h3><p className="mt-3 leading-7 text-slate-300">{d}</p></article>)}</div></section>
<section className="mx-auto max-w-6xl px-5 py-12"><h2 className="text-3xl font-bold">{c.shipTitle}</h2><p className="mt-4 leading-8">{c.shipText}</p><p className="mt-3 leading-7 text-slate-300">{c.scheduleText}</p><a className="mt-4 inline-block text-sky-300 underline" href="https://www.chanmayport.com.vn/ke-hoach-tau-vao-cang">{c.schedule}</a></section>
<section className="mx-auto max-w-6xl px-5 py-12"><h2 className="text-3xl font-bold">FAQ</h2>{c.faq.map(([q,a])=><details key={q} className="mt-4 rounded-xl border border-white/10 p-5"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-3 leading-7 text-slate-300">{a}</p></details>)}</section>
<section id="contact" className="mx-auto max-w-6xl px-5 py-12"><div className="rounded-3xl bg-white p-7 text-slate-950"><h2 className="text-3xl font-bold">{c.quote}</h2><p className="mt-4 leading-8">{c.details}</p>{cn?<div className="mt-5"><img src={chinaMarketConfig.wechatQr} alt="GoVietStay 微信二维码" className="h-48 w-48 object-contain"/><p className="font-bold">WeChat ID: {chinaMarketConfig.wechatId}</p><p className="mt-2">{c.qr}</p></div>:<a href={line} className="mt-5 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white">{c.contact}</a>}<div className="mt-5 flex flex-wrap gap-5"><a href={wa} className="underline">WhatsApp +84 937 762 607</a><a href="mailto:govietstay@gmail.com" className="underline">govietstay@gmail.com</a><a href="https://maps.app.goo.gl/3n3Pa4ZMvbPsnY4PA" className="underline">{c.review}</a></div></div></section></main>;
}
