import type { Metadata } from "next";
import JapaneseLanding, { type JapaneseLandingConfig } from "../_shared/JapaneseLanding";
export const metadata: Metadata = {
  title: { absolute: "ダナン旅行 日本語ガイド｜観光・空港送迎・プライベートツアー | GoVietStay" },
  description: "ダナン旅行を日本語で計画。空港送迎、バーナーヒルズ、ミーケービーチ、ホイアン・フエへの移動、雨季の過ごし方を現地チームが案内。",
  alternates:{canonical:"https://www.govietstay.com/ja/da-nang"},robots:{index:true,follow:true},
  openGraph:{type:"article",locale:"ja_JP",url:"https://www.govietstay.com/ja/da-nang",title:"ダナン旅行 日本語ガイド | GoVietStay",description:"ダナンを拠点に中部ベトナムを無理なく回るための実用ガイド。",siteName:"GoVietStay"}
};
const config={
canonicalPath:"/ja/da-nang",eyebrow:"DA NANG · 中部ベトナムの拠点",title:"ダナンは「見る街」だけでなく、旅を動かしやすい街。",
lead:"空港、ビーチ、街、山が近く、ホイアンやフエにもつなげやすいダナン。日本からの旅行では、ホテル位置と移動時間を先に決めるだけで旅程がかなり楽になります。",
highlights:["ダナン空港から市内へ短時間","ホイアンと組み合わせやすい","バーナーヒルズは天候確認が重要","専用車・送迎を手配可能"],
sections:[
{kicker:"到着日",title:"空港到着日は詰め込みすぎない",body:"ダナン国際空港から市内ホテルは比較的近いですが、入国、荷物、SIM/eSIM、両替などで時間を使います。夜到着なら食事と休息を優先し、観光は翌日から始める方が安定します。"},
{kicker:"観光",title:"バーナーヒルズは「何時に行くか」と天候で満足度が変わる",body:"ゴールデンブリッジだけを目的にせず、ケーブルカー、山頂の気温、霧や雨を含めて一日を考えます。雨季は出発前の天気確認が重要です。",bullets:["朝は混雑を避けやすい日がある","山頂は市内より涼しい","強雨・雷時は無理に固定日程にしない"]},
{kicker:"周辺都市",title:"ホイアンは夕方から、フエは一日で考える",body:"ホイアンは夕方〜夜の雰囲気が魅力。フエは距離があるため、ハイヴァン峠やランコーを含める場合は一日を確保すると無理が少なくなります。"}
],
faqs:[
{q:"ダナンには何泊がおすすめですか？",a:"ホイアンやフエも日帰りで組み合わせるなら3〜5泊が考えやすいです。海を楽しみたい場合はさらに余裕を持たせます。"},
{q:"ダナン空港送迎は事前予約できますか？",a:"はい。到着便、ホテル、人数、荷物量を確認して専用車を手配できます。"},
{q:"雨の日でも観光できますか？",a:"可能ですが、山・海・屋外中心の予定は柔軟に変更できるようにしておくのがおすすめです。"}
],
related:[{href:"/ja/hoi-an",title:"ホイアン",text:"ダナンから夕方〜夜に組み合わせやすい街。"},{href:"/ja/hue",title:"フエ",text:"王宮と歴史を一日でじっくり見る。"},{href:"/ja/phu-quoc",title:"フーコック",text:"中部観光後の海・リゾート滞在候補。"}],
ctaTitle:"ダナン到着便が決まったら、移動と観光の順番を一緒に確認できます。",ctaText:"便名、ホテル、人数、希望スポットを送ってください。空港送迎だけでも、数日間の専用車プランでも対応できます。",whatsappText:"ダナン旅行を計画しています。到着日：____ 便名：____ ホテル：____ 人数：____ 行きたい場所：____。旅程と送迎を相談したいです。"
} satisfies JapaneseLandingConfig;
export default function Page(){return <JapaneseLanding config={config}/>;}
