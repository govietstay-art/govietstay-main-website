import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./AgarwoodLanding.module.css";

export type AgarwoodLanguage = "en" | "zh-CN";

type Copy = {
  lang: AgarwoodLanguage;
  topLabel: string;
  topHome: string;
  topGuide: string;
  languageSwitchLabel: string;
  languageSwitchHref: string;
  eyebrow: string;
  h1: ReactNode;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  pills: string[];
  checkTitle: string;
  checks: Array<[string, string, string]>;
  wiifmEyebrow: string;
  wiifmTitle: string;
  wiifmLead: string;
  benefits: Array<[string, string]>;
  useEyebrow: string;
  useTitle: string;
  uses: Array<[string, string, string, string]>;
  priceEyebrow: string;
  priceTitle: string;
  priceLead: string;
  tableHeaders: string[];
  tableRows: string[][];
  priceNote: string;
  beforeEyebrow: string;
  beforeTitle: string;
  buyerChecks: Array<[string, string]>;
  travelEyebrow: string;
  travelTitle: string;
  travelP1: ReactNode;
  travelP2: string;
  travelSmall: string;
  shopEyebrow: string;
  shopIntro: string;
  addressLabel: string;
  phoneLabel: string;
  updatedLabel: string;
  callShop: string;
  openZalo: string;
  directions: string;
  disclosure: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<[string, string]>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  footer: string;
};

const en: Copy = {
  lang: "en",
  topLabel: "GoVietStay · Trusted Local Support",
  topHome: "Home",
  topGuide: "Da Nang Travel Guide",
  languageSwitchLabel: "中文",
  languageSwitchHref: "/cn/agarwood-da-nang",
  eyebrow: "DA NANG AGARWOOD GUIDE · PRICE REFERENCE · BUY SMARTER BEFORE YOU PAY",
  h1: <>Buying Agarwood in Da Nang? <em>Check the Price, Product Type and Travel Rules Before You Buy</em></>,
  lead:
    "A practical GoVietStay guide for travelers looking for agarwood in Da Nang, including incense, bracelets, 108-bead pieces and burning wood. Compare the product type, understand the price reference, ask the right questions, and avoid travel-home surprises before you spend.",
  primaryCta: "Ask GoVietStay Before You Buy",
  secondaryCta: "See Agarwood Price Reference",
  pills: [
    "See a local price reference first",
    "Understand what each product is for",
    "Know what to ask before paying",
    "Check travel-home concerns",
  ],
  checkTitle: "Four questions save most of the confusion.",
  checks: [
    ["01 · USE", "What is it for?", "Home fragrance, wearing, gifting, prayer/ceremony or burning."],
    ["02 · FORMAT", "What exactly are you buying?", "Box, jar, bracelet size, bead count, bead diameter or weight."],
    ["03 · MATERIAL", "Ask what it is made from.", "Solid wood, powder/compressed material, treated material, species and source."],
    ["04 · TRAVEL", "Can you take it home?", "Check CITES/export paperwork and your destination-country import rules."],
  ],
  wiifmEyebrow: "WIIFM · WHAT'S IN IT FOR ME?",
  wiifmTitle:
    "This page helps you save time, reduce price confusion, ask better questions and avoid airport surprises.",
  wiifmLead: "GoVietStay starts with the decision you need to make, not with a sales pitch.",
  benefits: [
    ["Faster choice", "Know the main product formats and published prices before you visit."],
    ["Clearer comparison", "Compare item, unit, size, weight and bead format instead of only hearing one number."],
    ["Smarter questions", "Ask about material, source, processing, documentation and measurable details."],
    ["Safer trip home", "Agarwood can fall under CITES controls. Check before you pack it."],
  ],
  useEyebrow: "CHOOSE BY USE, NOT BY PRESSURE",
  useTitle: "Start with what you actually want the agarwood for.",
  uses: [
    ["Home scent", "Incense sticks", "Easy everyday format. Ask how many sticks are included and what the material composition is.", "Reference: 500,000 VND / box"],
    ["Home scent", "Cloud-pattern / coreless incense", "Jar format. Confirm weight, burn method and whether the product is compressed/powder-based.", "Reference: 300,000 VND / jar"],
    ["Wearable", "Agarwood bracelet", "Choose by bead size and fit, not only color. Published sizes here are 12 mm, 14 mm and 16 mm.", "Reference: 1,000,000–1,500,000 VND"],
    ["Prayer / gift", "108-bead bracelet", "Published bead diameters are 6 mm and 8 mm. Confirm count and material before purchase.", "Reference: 1,000,000–1,200,000 VND"],
    ["Burning", "Agarwood for burning", "Sold by weight. Ask whether the material is chips, pieces or processed material and what documents are available.", "Reference: 1,000,000 VND / 100 g"],
  ],
  priceEyebrow: "MERCHANT-PROVIDED PRICE REFERENCE",
  priceTitle: "Happy Agarwood Business House · Published Product List",
  priceLead: "Reference received 7 September 2026. Confirm the exact item and current price before payment.",
  tableHeaders: ["No.", "Product", "Unit", "Published price"],
  tableRows: [
    ["1", "Bud Incense", "Box", "500,000 VND"],
    ["2", "Incense Sticks", "Box", "500,000 VND"],
    ["3", "Cloud-Pattern Incense", "Jar", "300,000 VND"],
    ["4", "Coreless Incense", "Jar", "300,000 VND"],
    ["5", "12 mm Agarwood Bracelet", "Bracelet", "1,000,000 VND"],
    ["6", "14 mm Agarwood Bracelet", "Bracelet", "1,200,000 VND"],
    ["7", "16 mm Agarwood Bracelet", "Bracelet", "1,500,000 VND"],
    ["8", "108-Bead Agarwood Bracelet, 6 mm", "Bracelet", "1,000,000 VND"],
    ["9", "108-Bead Agarwood Bracelet, 8 mm", "Bracelet", "1,200,000 VND"],
    ["10", "Agarwood for Burning", "100 g", "1,000,000 VND"],
  ],
  priceNote:
    "Price note: this is a merchant-provided price reference, not a guarantee by GoVietStay. Availability, specification and price can change.",
  beforeEyebrow: "BEFORE YOU PAY",
  beforeTitle: "Ask these questions out loud.",
  buyerChecks: [
    ["What exactly is the material?", "Solid wood, powdered/compressed material, treated material, incense blend, or another format?"],
    ["What are the measurable details?", "Weight, bead diameter, bead count, box quantity or jar weight."],
    ["What species and source information is available?", "Ask the seller to explain the declared origin and any available documentation."],
    ["Can I receive an invoice or receipt?", "Useful for price clarity and for any later questions about the purchase."],
    ["Can I smell or inspect the exact item?", "For incense or burning wood, ask how the sample relates to the product you are purchasing."],
    ["What paperwork is available for international travel?", "This matters especially for wood chips, beads, prayer beads and carvings."],
  ],
  travelEyebrow: "IMPORTANT IF YOU FLY HOME WITH IT",
  travelTitle: "Agarwood is not just a souvenir category — some forms are internationally regulated.",
  travelP1: <><strong>Aquilaria spp.</strong> and <strong>Gyrinops spp.</strong> are listed in CITES Appendix II. The current CITES retail exemption does <strong>not</strong> apply to wood chips, beads, prayer beads or carvings.</>,
  travelP2:
    "Do not assume a bracelet or 108-bead item is automatically document-free. Ask what species/material is being sold and what export paperwork is available, then check the import rules of the country you are flying to.",
  travelSmall: "GoVietStay provides practical travel guidance, not customs or legal advice.",
  shopEyebrow: "FEATURED LOCAL MERCHANT · DA NANG",
  shopIntro: "Use the guide above first, then visit or contact the shop with the exact product format you want to compare.",
  addressLabel: "Address",
  phoneLabel: "Phone / Zalo",
  updatedLabel: "Price list last received",
  callShop: "Call shop",
  openZalo: "Open Zalo",
  directions: "Directions",
  disclosure:
    "Independent-information note: product names, prices, address and contact details on this page are based on merchant-provided material. GoVietStay has not independently certified agarwood grade, species, origin or authenticity. Confirm the exact product and documentation before purchase.",
  faqEyebrow: "FAQ",
  faqTitle: "Questions a traveler should ask before buying agarwood in Da Nang.",
  faqs: [
    ["Does darker wood automatically mean better agarwood?", "No. Appearance alone is not enough to establish quality or value. Ask about material, origin, processing, size/weight and documentation."],
    ["Why can two agarwood bracelets have very different prices?", "Pricing can depend on declared material, resin characteristics, size, weight, workmanship, origin and seller grading. Ask which measurable or documented factors explain the difference."],
    ["Can I take a bracelet or 108-bead piece out of Vietnam?", "Do not assume it is automatically exempt. CITES rules may apply, and your destination country can have separate import requirements."],
    ["Are the prices above guaranteed?", "No. They are merchant-provided reference prices received on 7 September 2026. Confirm the current price and exact item before payment."],
  ],
  ctaEyebrow: "GOVIETSTAY · LOCAL SUPPORT BEFORE YOU SPEND",
  ctaTitle: "Send us the item you're considering before you buy it.",
  ctaText: "Product type + price + photo + destination country. We'll help you organize the practical questions first.",
  ctaButton: "Ask GoVietStay on WhatsApp",
  footer: "English buyer guide · Updated 07 Sep 2026",
};

const zh: Copy = {
  lang: "zh-CN",
  topLabel: "GoVietStay · Trusted Local Support",
  topHome: "中文首页",
  topGuide: "岘港旅行指南",
  languageSwitchLabel: "English",
  languageSwitchHref: "/travel/agarwood-da-nang",
  eyebrow: "岘港沉香购买指南 · 价格参考 · 购买前先看清楚",
  h1: <>准备在岘港买沉香？<em>先看价格、产品类型和携带回国注意事项</em></>,
  lead:
    "这是 GoVietStay 为旅客准备的实用指南，帮助你在岘港购买沉香前先了解线香、手串、108 颗念珠和熏烧沉香的产品形式、价格参考、购买前要问的问题，以及带回国前需要注意的事项。",
  primaryCta: "购买前先咨询 GoVietStay",
  secondaryCta: "查看沉香价格参考",
  pills: ["先看本地价格参考", "先了解不同产品用途", "先知道付款前该问什么", "先确认出境与回国注意事项"],
  checkTitle: "先问这四个问题，能减少大部分误判。",
  checks: [
    ["01 · 用途", "你买来做什么？", "家用香、佩戴、送礼、礼佛/念珠，还是熏烧。"],
    ["02 · 规格", "你买的具体是什么？", "盒装、罐装、手串尺寸、珠子数量、珠径还是重量。"],
    ["03 · 材质", "先问清楚材质。", "实木、压制粉料、处理材、具体品种与来源。"],
    ["04 · 出境", "能否带回国？", "先确认 CITES/出口文件，以及目的地国家的入境要求。"],
  ],
  wiifmEyebrow: "WIIFM · 对你有什么好处？",
  wiifmTitle: "这页内容主要帮你节省时间、减少价格不透明、避免买错，也降低出境时的麻烦。",
  wiifmLead: "不是先叫你“买”，而是先帮你“看懂再决定”。",
  benefits: [
    ["更快做选择", "去店里之前，先了解常见产品形式和价格参考。"],
    ["价格更清楚", "比较单位、尺寸、重量和珠子规格，而不是只听一个报价。"],
    ["提问更专业", "先问材质、来源、工艺、文件和可量化参数。"],
    ["回国更安心", "沉香可能涉及 CITES 规定，出境前一定要先确认。"],
  ],
  useEyebrow: "先按用途来选",
  useTitle: "先确定你真正想买来做什么。",
  uses: [
    ["家用香", "沉香线香", "日常容易使用。购买前先问清楚每盒数量，以及具体材质组成。", "参考价：500,000 越南盾 / 盒"],
    ["家用香", "云纹香 / 无竹签香", "罐装产品。先确认净重、使用方式，以及是否为粉料压制。", "参考价：300,000 越南盾 / 罐"],
    ["佩戴", "沉香手串", "不要只看颜色，先看珠径和佩戴是否合适。现有规格：12mm、14mm、16mm。", "参考价：1,000,000–1,500,000 越南盾"],
    ["礼佛 / 送礼", "108颗沉香手串", "现有规格：6mm 和 8mm。购买前先确认珠数与材质。", "参考价：1,000,000–1,200,000 越南盾"],
    ["熏烧", "熏烧沉香", "按重量出售。请确认是木片、木料还是处理材，并询问可提供哪些文件。", "参考价：1,000,000 越南盾 / 100克"],
  ],
  priceEyebrow: "商家提供的价格参考",
  priceTitle: "Happy Agarwood Business House / 幸福沉香商行",
  priceLead: "价格资料收于 2026 年 9 月 7 日。付款前请再次确认当天价格和具体产品。",
  tableHeaders: ["序号", "产品", "单位", "参考价格"],
  tableRows: [
    ["1", "沉香塔香", "盒", "500,000 越南盾"],
    ["2", "沉香线香", "盒", "500,000 越南盾"],
    ["3", "沉香云纹香", "罐", "300,000 越南盾"],
    ["4", "无竹签沉香", "罐", "300,000 越南盾"],
    ["5", "12毫米沉香手串", "串", "1,000,000 越南盾"],
    ["6", "14毫米沉香手串", "串", "1,200,000 越南盾"],
    ["7", "16毫米沉香手串", "串", "1,500,000 越南盾"],
    ["8", "108颗6毫米沉香手串", "串", "1,000,000 越南盾"],
    ["9", "108颗8毫米沉香手串", "串", "1,200,000 越南盾"],
    ["10", "熏烧沉香", "100克", "1,000,000 越南盾"],
  ],
  priceNote: "价格说明：以上为商家提供的参考价，不代表 GoVietStay 的价格保证。产品、规格和价格可能调整。",
  beforeEyebrow: "付款前先问",
  beforeTitle: "这些问题最好当场问清楚。",
  buyerChecks: [
    ["这到底是什么材质？", "是实木、压制粉料、混合香、处理材，还是其他形式？"],
    ["可以量化的规格是什么？", "重量、珠径、珠数、每盒数量或每罐净重。"],
    ["来源信息和说明有哪些？", "请商家说明来源、品种，以及是否有相关文件。"],
    ["能否提供收据或发票？", "有助于价格确认和后续沟通。"],
    ["能否看/闻到实际产品？", "尤其是线香和熏烧沉香，最好确认你买到的和展示的是同一规格。"],
    ["出境可提供什么文件？", "木片、珠子、念珠、雕件尤其需要先问清楚。"],
  ],
  travelEyebrow: "如果你要带回国，这点很重要",
  travelTitle: "沉香不只是“纪念品”类别，有些形式可能受到国际规定限制。",
  travelP1: <><strong>Aquilaria spp.</strong> 和 <strong>Gyrinops spp.</strong> 被列入 CITES Appendix II。当前的零售成品豁免 <strong>不适用于</strong> 木片、珠子、念珠或雕件。</>,
  travelP2:
    "所以不要默认“沉香手串/108 颗手串”就一定能直接带出境。请先确认材质/品种、商家可提供的文件，以及你回程目的地国家的入境要求。",
  travelSmall: "GoVietStay 提供的是实用出行建议，不构成法律或海关意见。",
  shopEyebrow: "岘港本地商家",
  shopIntro: "建议先用上面的指南看清楚，再带着你想比较的产品类型去咨询或到店。",
  addressLabel: "地址",
  phoneLabel: "电话 / Zalo",
  updatedLabel: "价格资料接收日期",
  callShop: "拨打电话",
  openZalo: "打开 Zalo",
  directions: "导航",
  disclosure:
    "独立信息说明：本页中的产品名称、价格、地址和联系方式来自商家提供的信息。GoVietStay 并未独立鉴定沉香等级、来源、品种或真伪，购买前请再次确认具体产品和文件。",
  faqEyebrow: "常见问题",
  faqTitle: "旅客在岘港购买沉香前，最值得先问的几个问题。",
  faqs: [
    ["颜色越深，就一定越好吗？", "不一定。只看外观并不足以判断价值。应同时确认材质、来源、处理方式、重量/尺寸和文件情况。"],
    ["为什么不同沉香手串价格差异很大？", "价格可能与商家所说明的材质、树脂特征、尺寸、重量、工艺、来源和等级有关。重点是问清楚价格差异对应哪些可量化或有文件支持的因素。"],
    ["沉香手串或 108 颗手串可以直接带回国吗？", "不要想当然。请先确认材质/品种、商家可提供的文件，以及目的地国家的入境要求。"],
    ["页面上的价格是保证价吗？", "不是。这里只是 2026 年 9 月 7 日收到的商家参考价，最终价格以商家当天实际确认为准。"],
  ],
  ctaEyebrow: "GoVietStay · 先帮你看懂，再决定要不要买",
  ctaTitle: "先把你想买的沉香发给我们，我们帮你整理问题。",
  ctaText: "发送：产品类型 + 价格 + 图片 + 你要飞回哪个国家。我们先帮你从实用角度把重点问清楚。",
  ctaButton: "WhatsApp 咨询 GoVietStay",
  footer: "中文购买指南 · 更新日期 2026-09-07",
};

export default function AgarwoodLanding({ language }: { language: AgarwoodLanguage }) {
  // marker: agarwood-danang-v1
  const c = language === "zh-CN" ? zh : en;
  const goVietStayWhatsApp =
    "https://wa.me/84937762607?text=Hi%20GoVietStay%2C%20I%20am%20considering%20an%20agarwood%20purchase%20in%20Da%20Nang.%20Here%20is%20the%20product%2C%20price%20and%20my%20destination%20country%3A";
  const mapHref =
    "https://www.google.com/maps/search/?api=1&query=Lot%2010%20Hoang%20Ke%20Viem%20Street%2C%20Ngu%20Hanh%20Son%20Ward%2C%20Da%20Nang%20City";

  return (
    <div className={styles.page} lang={c.lang}>
      <div className={styles.topbar}>
        <div className={styles.wrap}>
          <strong>{c.topLabel}</strong>
          <nav>
            <a href={language === "zh-CN" ? "/cn" : "/"}>{c.topHome}</a>
            <a href={language === "zh-CN" ? "/cn/da-nang-travel-guide" : "/travel"}>{c.topGuide}</a>
          </nav>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.wrap}>
          <a className={styles.brand} href="/">
            <Image
              src="/govietstay-logo.jpg"
              alt="GoVietStay logo"
              width={180}
              height={180}
              className={styles.logo}
              priority
            />
            <span className={styles.brandText}>
              <strong>GoVietStay</strong>
              <small>Trusted Local Support</small>
            </span>
          </a>
          <div className={styles.headerActions}>
            <a className={styles.languageButton} href={c.languageSwitchHref}>{c.languageSwitchLabel}</a>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href={goVietStayWhatsApp}>{c.primaryCta}</a>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroGrid}`}>
            <div>
              <div className={styles.eyebrow}>{c.eyebrow}</div>
              <h1>{c.h1}</h1>
              <p className={styles.lead}>{c.lead}</p>
              <div className={styles.heroActions}>
                <a className={`${styles.button} ${styles.buttonPrimary}`} href={goVietStayWhatsApp}>{c.primaryCta}</a>
                <a className={`${styles.button} ${styles.buttonSecondary}`} href="#price">{c.secondaryCta}</a>
              </div>
              <div className={styles.pillRow}>
                {c.pills.map((pill) => <span key={pill}>{pill}</span>)}
              </div>
            </div>

            <aside className={styles.checkCard}>
              <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>30 SEC / 30秒</div>
              <h2>{c.checkTitle}</h2>
              <div className={styles.checkGrid}>
                {c.checks.map(([num, title, text]) => (
                  <div className={styles.check} key={num}>
                    <small>{num}</small>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>{c.wiifmEyebrow}</div>
              <h2>{c.wiifmTitle}</h2>
              <p>{c.wiifmLead}</p>
            </div>
            <div className={styles.benefitGrid}>
              {c.benefits.map(([title, text]) => (
                <article className={styles.card} key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.cream}`}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>{c.useEyebrow}</div>
              <h2>{c.useTitle}</h2>
            </div>
            <div className={styles.useGrid}>
              {c.uses.map(([tag, title, text, price]) => (
                <article className={styles.useCard} key={title}>
                  <small>{tag}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <strong>{price}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="price">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>{c.priceEyebrow}</div>
              <h2>{c.priceTitle}</h2>
              <p>{c.priceLead}</p>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>{c.tableHeaders.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {c.tableRows.map((row) => (
                    <tr key={row[0]}>{row.map((cell, i) => <td key={`${row[0]}-${i}`}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.notice}>{c.priceNote}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.cream}`} id="before">
          <div className={`${styles.wrap} ${styles.beforeGrid}`}>
            <article className={styles.listCard}>
              <div className={styles.eyebrow}>{c.beforeEyebrow}</div>
              <h3>{c.beforeTitle}</h3>
              <ul>
                {c.buyerChecks.map(([title, text]) => (
                  <li key={title}>
                    <span>✓</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <aside className={styles.travelCard}>
              <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{c.travelEyebrow}</div>
              <h3>{c.travelTitle}</h3>
              <p>{c.travelP1}</p>
              <p>{c.travelP2}</p>
              <p className={styles.small}>{c.travelSmall}</p>
              <div className={styles.sourceLinks}>
                <a href="https://vnforest.gov.vn/wp-content/uploads/2026/04/E-Appendices-2026-03-05.pdf" target="_blank" rel="noreferrer">CITES 2026</a>
                <a href="https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=5574" target="_blank" rel="noreferrer">Vietnam CITES</a>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section} id="shop">
          <div className={`${styles.wrap} ${styles.shopGrid}`}>
            <article className={styles.shopCard}>
              <div className={styles.eyebrow}>{c.shopEyebrow}</div>
              <h2>Happy Agarwood Business House</h2>
              <div className={styles.chineseName}>幸福沉香商行</div>
              <p>{c.shopIntro}</p>
              <div className={styles.facts}>
                <div><small>{c.addressLabel}</small><strong>Lot 10 Hoang Ke Viem Street, Ngu Hanh Son Ward, Da Nang City</strong></div>
                <div><small>{c.phoneLabel}</small><strong>+84 91 487 51 59</strong></div>
                <div><small>{c.updatedLabel}</small><strong>7 September 2026</strong></div>
              </div>
              <div className={styles.shopActions}>
                <a className={`${styles.button} ${styles.buttonGold}`} href="tel:+84914875159">{c.callShop}</a>
                <a className={`${styles.button} ${styles.buttonSecondary}`} href="https://zalo.me/84914875159" target="_blank" rel="noreferrer">{c.openZalo}</a>
                <a className={`${styles.button} ${styles.buttonPrimary}`} href={mapHref} target="_blank" rel="noreferrer">{c.directions}</a>
              </div>
              <div className={styles.disclosure}>{c.disclosure}</div>
            </article>

            <figure className={styles.priceImage}>
              <Image
                src="/agarwood/happy-agarwood-da-nang-price-list.png"
                alt="Happy Agarwood Business House Da Nang product price list"
                width={1024}
                height={1536}
                sizes="(max-width: 900px) 100vw, 54vw"
              />
              <figcaption>{language === "zh-CN" ? "商家提供给 GoVietStay 的原始价格表。" : "Original merchant price list supplied to GoVietStay."}</figcaption>
            </figure>
          </div>
        </section>

        <section className={`${styles.section} ${styles.cream}`}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div className={styles.eyebrow}>{c.faqEyebrow}</div>
              <h2>{c.faqTitle}</h2>
            </div>
            <div className={styles.faq}>
              {c.faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.cta}>
              <div>
                <div className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{c.ctaEyebrow}</div>
                <h2>{c.ctaTitle}</h2>
                <p>{c.ctaText}</p>
              </div>
              <a className={`${styles.button} ${styles.buttonGold}`} href={goVietStayWhatsApp}>{c.ctaButton}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <span><strong>GoVietStay</strong> · Trusted Local Support · Da Nang · Hoi An · Hue · Phu Quoc</span>
          <span>{c.footer}</span>
        </div>
      </footer>

      <div className={styles.mobileCta}>
        <a href="tel:+84914875159">{c.callShop}</a>
        <a href={mapHref}>{c.directions}</a>
        <a href={goVietStayWhatsApp}>{c.primaryCta}</a>
      </div>
    </div>
  );
}
