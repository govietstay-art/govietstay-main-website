import type { Metadata } from "next";
import JapaneseLanding, { type JapaneseLandingConfig } from "./_shared/JapaneseLanding";

export const metadata: Metadata = {
  title: { absolute: "ベトナム旅行 日本語ガイド｜ダナン・ホイアン・フエ・フーコック | GoVietStay" },
  description: "日本からベトナム旅行を計画する方向けの現地ガイド。ダナン、ホイアン、フエ、フーコックの移動、天候、旅程、プライベートツアー、空港送迎を現地チームが案内します。",
  alternates: { canonical: "https://www.govietstay.com/ja" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "ja_JP", url: "https://www.govietstay.com/ja", title: "GoVietStay 日本語｜ベトナム現地旅行サポート", description: "ダナン・ホイアン・フエ・フーコックを無理なくつなぐ日本語旅行ガイド。", siteName: "GoVietStay", images: [{ url: "https://www.govietstay.com/brand/govietstay-official-logo.jpg", alt: "GoVietStay" }] }
};

const config = {
  canonicalPath: "/ja",
  eyebrow: "日本からベトナムへ · 現地で迷わないための旅行ガイド",
  title: "ベトナム旅行を、移動時間と天候まで考えて組み立てる。",
  lead: "ダナン、ホイアン、フエ、フーコックを日本語で整理。観光地を並べるだけではなく、何日必要か、どこに泊まるか、雨季にどう動くか、家族旅行で何を減らすかまで現地目線で案内します。",
  highlights: ["現地チームが旅程を確認", "プライベートツアー・空港送迎", "ガイド言語は日程ごとに確認", "WhatsAppで相談可能"],
  sections: [
    { kicker: "旅の組み立て方", title: "中部ベトナムは「ダナンを拠点」にすると考えやすい", body: "ダナンには国際空港があり、ホイアンやフエへ車で移動しやすいのが特徴です。ホテルを毎日変えず、日帰りで周辺都市を組み合わせる方法もあります。", bullets: ["ダナン：海、街、空港アクセス", "ホイアン：旧市街、夜景、食文化", "フエ：王宮、歴史、ハイヴァン峠"] },
    { kicker: "リゾート滞在", title: "フーコックは観光を詰め込みすぎない", body: "フーコックは島が広く、北・中心部・南で雰囲気が大きく変わります。ホテルの場所を先に確認し、海のツアーと自由時間を分けると移動疲れを減らせます。", bullets: ["3島・4島ツアーは内容と時間を比較", "ホントムは家族旅行なら単独日程も検討", "乾季・雨季で海況が変わるため直前確認"] },
    { kicker: "GoVietStay", title: "売る前に、旅程が現実的かを確認します", body: "フライト、ホテル、人数、行きたい場所を共有いただければ、まず移動時間と順番を確認します。必要な部分だけ、専用車、送迎、チケット、プライベートツアーなどを手配できます。", note: "日本語でメッセージを送ることはできます。日本語ガイドを含むガイド言語は、日程・場所・空き状況を確認してからご案内します。" }
  ],
  faqs: [
    { q: "日本語で問い合わせできますか？", a: "はい。日本語で旅行日程や希望を送ってください。ガイド言語が必要な場合は、日程と空き状況を確認してご案内します。" },
    { q: "ダナン、ホイアン、フエは何日必要ですか？", a: "一般的には3〜5日あると組みやすいです。到着・出発時刻、子どもや高齢者の同行、雨季かどうかで調整します。" },
    { q: "フーコックと中部ベトナムを同じ旅行で回れますか？", a: "可能です。中部を文化・街歩き、フーコックを海・リゾート滞在として組み合わせると役割が分かりやすくなります。" }
  ],
  related: [
    { href: "/ja/da-nang", title: "ダナン旅行ガイド", text: "空港、ビーチ、バーナーヒルズ、周辺都市への移動を整理。" },
    { href: "/ja/hoi-an", title: "ホイアン旅行ガイド", text: "旧市街、夜の散策、ココナッツ村を無理なく組み合わせる。" },
    { href: "/ja/phu-quoc", title: "フーコック旅行ガイド", text: "島内エリア、海ツアー、滞在日数を先に確認。" }
  ],
  ctaTitle: "航空券とホテルが決まっていれば、旅程チェックから始められます。",
  ctaText: "旅行日、人数、ホテル、行きたい場所を送ってください。予約を急がせる前に、移動が無理なくつながるかを確認します。",
  whatsappText: "GoVietStayへ。日本からベトナム旅行を計画しています。旅行日：____ 人数：____ ホテル：____ 行きたい場所：____。無理のない旅程を相談したいです。"
} satisfies JapaneseLandingConfig;

export default function Page(){ return <JapaneseLanding config={config}/>; }
