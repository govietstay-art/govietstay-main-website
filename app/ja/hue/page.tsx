import type { Metadata } from "next";
import JapaneseLanding, { type JapaneseLandingConfig } from "../_shared/JapaneseLanding";
export const metadata: Metadata = {
  title:{absolute:"フエ旅行 日本語ガイド｜王宮・カイディン帝廟・ハイヴァン峠 | GoVietStay"},
  description:"ダナン発フエ旅行を日本語で計画。グエン朝王宮、カイディン帝廟、ティエンムー寺、ハイヴァン峠、ランコーを無理なく巡る方法。",
  alternates:{canonical:"https://www.govietstay.com/ja/hue"},robots:{index:true,follow:true},
  openGraph:{type:"article",locale:"ja_JP",url:"https://www.govietstay.com/ja/hue",title:"フエ旅行 日本語ガイド | GoVietStay",description:"ダナンからフエへ。歴史と景色を一日で無理なくつなぐ。",siteName:"GoVietStay"}
};
const config={
canonicalPath:"/ja/hue",eyebrow:"HUE · ベトナム王朝の歴史",title:"フエは、移動時間を含めて一日かける価値がある。",
lead:"グエン朝王宮、皇帝陵、ティエンムー寺。ダナンからフエへ向かう道にはハイヴァン峠、ランコー、ラップアンラグーンもあり、目的地だけでなく移動そのものが旅になります。",
highlights:["ダナンから日帰り可能","王宮・皇帝陵を中心に組む","ハイヴァン峠ルートを選択可能","専用車なら停車時間を調整しやすい"],
sections:[
{kicker:"王道ルート",title:"王宮と皇帝陵を中心に、欲張りすぎない",body:"フエは見どころが広く、すべてを一日で回ろうとすると移動と見学が慌ただしくなります。初めてなら王宮、カイディン帝廟、ティエンムー寺など軸を決めると理解しやすいです。"},
{kicker:"移動",title:"ハイヴァン峠を通るなら時間に余裕を",body:"トンネルを使えば速く移動できますが、景色を楽しみたい場合はハイヴァン峠、ランコー、ラップアンラグーンを組み込めます。",bullets:["写真停車を入れると移動時間は長くなる","雨・霧の日は眺望が変わる","帰路の時間まで含めて計画する"]},
{kicker:"食事とペース",title:"昼食を固定しすぎず、見学の流れに合わせる",body:"フエ料理を楽しむ場合も、見学順と混雑を見ながら時間を取ると一日が楽です。子どもや高齢者がいる場合は立ち寄り場所を減らし、歩く量を調整します。"}
],
faqs:[
{q:"ダナンからフエは日帰りできますか？",a:"はい。早めに出発すれば主要スポットを回れます。ハイヴァン峠経由の場合はさらに余裕を持つのがおすすめです。"},
{q:"ガイドなしでも行けますか？",a:"可能です。歴史背景を深く理解したい場合はガイドを付ける選択肢があります。言語は日程と空き状況を確認します。"},
{q:"雨季でも行けますか？",a:"道路状況と天気を確認しながら可能です。強雨時は山道や屋外見学を無理に固定しません。"}
],
related:[{href:"/ja/da-nang",title:"ダナン",text:"フエ日帰りの出発拠点として便利。"},{href:"/ja/hoi-an",title:"ホイアン",text:"同じ中部でも雰囲気がまったく違う旧市街。"},{href:"/ja",title:"日本語トップ",text:"中部ベトナム全体の旅程を確認。"}],
ctaTitle:"フエを「詰め込みツアー」にしない一日を組みます。",ctaText:"ホテル、人数、行きたい史跡、ハイヴァン峠の希望を送ってください。専用車とガイドの必要性を分けて考えられます。",whatsappText:"ダナンからフエ日帰りを相談したいです。日付：____ ホテル：____ 人数：____ 希望：王宮／カイディン帝廟／ティエンムー寺／ハイヴァン峠。"
} satisfies JapaneseLandingConfig;
export default function Page(){return <JapaneseLanding config={config}/>;}
