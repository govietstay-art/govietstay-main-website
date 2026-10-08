import type { Metadata } from "next";
import JapaneseLanding, { type JapaneseLandingConfig } from "../_shared/JapaneseLanding";
export const metadata: Metadata = {
  title:{absolute:"フーコック旅行 日本語ガイド｜島ツアー・ホントム・空港送迎 | GoVietStay"},
  description:"フーコック旅行を日本語で計画。乾季と雨季、3島・4島ツアー、ホントム、ホテルエリア、空港送迎、家族旅行のポイントを現地チームが案内。",
  alternates:{canonical:"https://www.govietstay.com/ja/phu-quoc"},robots:{index:true,follow:true},
  openGraph:{type:"article",locale:"ja_JP",url:"https://www.govietstay.com/ja/phu-quoc",title:"フーコック旅行 日本語ガイド | GoVietStay",description:"海、島、リゾート滞在を詰め込みすぎずに楽しむための実用ガイド。",siteName:"GoVietStay"}
};
const config={
canonicalPath:"/ja/phu-quoc",eyebrow:"PHU QUOC · 海とリゾートの島",title:"フーコックは、観光日と何もしない日を分ける。",
lead:"南部の島々、ホントム、サンセットタウン、北部のビーチ、グランドワールド。島が広いからこそ、ホテルの場所と移動時間を先に理解すると滞在が楽になります。",
highlights:["3島・4島ツアーを比較","ホントムを別日にする選択肢","空港送迎・専用車","家族旅行は移動を少なく"],
sections:[
{kicker:"滞在エリア",title:"ホテルを決める前に、島のどこに泊まるかを確認",body:"フーコックは北・中心部・南で移動距離が大きくなります。毎日反対側へ移動する旅程は疲れやすいため、やりたいこととホテル位置を合わせます。"},
{kicker:"海ツアー",title:"3島と4島は「数」ではなく内容で選ぶ",body:"立ち寄り数が多いほど良いとは限りません。シュノーケリング時間、移動、食事、ホントムとの組み合わせを見て、自分たちのペースに合う方を選びます。",bullets:["家族連れは移動回数を減らす", "海況でルートが変わることがある", "プライベートボートは人数と希望で判断"]},
{kicker:"季節",title:"ベストシーズンでも、海況は当日に確認",body:"一般に乾季は海を楽しみやすい時期ですが、風や波は日ごとに変わります。海ツアーは安全を最優先に、直前の状況を確認して判断します。",note:"雨季でも一日中雨とは限りませんが、海アクティビティは天候・波・運航状況に左右されます。"}
],
faqs:[
{q:"フーコックは何泊がおすすめですか？",a:"4〜7泊あると、海ツアー、島内観光、自由日を分けやすくなります。短期滞在なら行きたい場所を絞るのがおすすめです。"},
{q:"3島と4島ツアーはどちらがいいですか？",a:"ゆっくり海を楽しみたいなら立ち寄りを絞る方が合う場合があります。ホントムも同日に入れたいかで選び方が変わります。"},
{q:"空港送迎は予約できますか？",a:"はい。到着便、ホテル、人数、荷物量を確認して専用車を手配できます。"}
],
related:[{href:"/ja",title:"日本語トップ",text:"中部ベトナムとフーコックをどう組み合わせるか確認。"},{href:"/ja/da-nang",title:"ダナン",text:"街・ビーチ・中部観光を組み合わせる拠点。"},{href:"/ja/hoi-an",title:"ホイアン",text:"中部旅行に文化と夜の街歩きを加える。"}],
ctaTitle:"ホテルが決まっていれば、移動の無駄がないフーコック旅程を作れます。",ctaText:"宿泊エリア、泊数、人数、子どもの年齢、海ツアーの希望を送ってください。自由日を残しながら組み立てます。",whatsappText:"フーコック旅行を相談したいです。日付：____ ホテル：____ 泊数：____ 人数：____ 子どもの年齢：____ 希望：島ツアー／ホントム／空港送迎／島内観光。"
} satisfies JapaneseLandingConfig;
export default function Page(){return <JapaneseLanding config={config}/>;}
