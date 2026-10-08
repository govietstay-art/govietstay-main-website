import type { Metadata } from "next";
import JapaneseLanding, { type JapaneseLandingConfig } from "../_shared/JapaneseLanding";
export const metadata: Metadata = {
  title:{absolute:"ホイアン旅行 日本語ガイド｜旧市街・ココナッツ村・夜観光 | GoVietStay"},
  description:"ホイアン旅行を日本語で計画。旧市街、ランタン、ホアイ川、ココナッツ村、ダナンからの移動、雨季の注意点を現地チームが案内。",
  alternates:{canonical:"https://www.govietstay.com/ja/hoi-an"},robots:{index:true,follow:true},
  openGraph:{type:"article",locale:"ja_JP",url:"https://www.govietstay.com/ja/hoi-an",title:"ホイアン旅行 日本語ガイド | GoVietStay",description:"旧市街と夜の雰囲気を中心に、無理のないホイアン旅程を作る。",siteName:"GoVietStay"}
};
const config={
canonicalPath:"/ja/hoi-an",eyebrow:"HOI AN · 夕方から夜が主役",title:"ホイアンは、昼に急ぐより夕方からゆっくり歩く。",
lead:"ランタンが灯る旧市街、ホアイ川、ローカルフード。ダナンから近いホイアンは、ココナッツ村などを午後に組み合わせ、夕方から旧市街へ入ると流れが自然です。",
highlights:["ダナンから車でアクセス","旧市街は夕方〜夜が人気","ココナッツ村と組み合わせ可能","専用車なら帰り時間を調整しやすい"],
sections:[
{kicker:"時間帯",title:"旧市街は夕方から夜に時間を残す",body:"昼の暑さを避けながら、夕方の街歩き、夕食、ランタン、川沿いの雰囲気を楽しむとホイアンらしさを感じやすくなります。"},
{kicker:"組み合わせ",title:"ココナッツ村を入れるなら午後スタートが自然",body:"バスケットボート体験を先にしてから旧市街へ移動すると、同じエリアを無駄に往復せずに済みます。",bullets:["ホテル出発時間を暑さ・雨に合わせる","子ども連れは体験を詰め込みすぎない","帰りの車を決めておくと夜も安心"]},
{kicker:"天候",title:"雨季のホイアンは、道路状況を当日に確認",body:"中部ベトナムの雨季は短時間の雨から強い雨まで変化します。旧市街周辺は水位の影響を受けることもあるため、当日の状況に応じて開始時間や内容を調整します。"}
],
faqs:[
{q:"ダナンからホイアンは日帰りできますか？",a:"はい。多くの旅行者がダナンのホテルから午後に出発し、夜に戻る形で訪れます。"},
{q:"ホイアンは何時間あれば楽しめますか？",a:"旧市街だけなら3〜4時間でも可能ですが、ココナッツ村や食事を入れるなら半日程度あると余裕があります。"},
{q:"専用車で行くメリットは？",a:"ホテル送迎と帰り時間を自分たちのペースで決めやすく、家族や小グループでは待ち時間を減らせます。"}
],
related:[{href:"/ja/da-nang",title:"ダナン",text:"ホイアン旅行の拠点として使いやすい都市。"},{href:"/ja/hue",title:"フエ",text:"中部ベトナムの歴史を深く知りたい方向け。"},{href:"/ja",title:"日本語トップ",text:"中部ベトナムとフーコックの全体像を確認。"}],
ctaTitle:"ホイアンの夜を急がず楽しめる時間配分を作ります。",ctaText:"ホテル、人数、子どもの年齢、ココナッツ村の希望有無を送ってください。出発時間と戻り時間を現実的に組みます。",whatsappText:"ホイアン旅行を相談したいです。日付：____ ダナンのホテル：____ 人数：____ ココナッツ村：希望する／しない。夕方〜夜を中心に旅程を組みたいです。"
} satisfies JapaneseLandingConfig;
export default function Page(){return <JapaneseLanding config={config}/>;}
