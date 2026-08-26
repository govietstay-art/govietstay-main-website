export type ChinaSeoPage = {
  slug: string;
  type: "product" | "private" | "transfer" | "guide" | "arrival";
  destination: string;
  priceKey: string | null;
  title: string;
  h1: string;
  desc: string;
  chips: string[];
  bullets: string[];
  faqs: [string,string][];
  officialUrl: string | null;
  updated: string;
};

export const chinaSeoPages: ChinaSeoPage[] = [
  {
    "slug": "vietnam-travel-guide",
    "type": "guide",
    "destination": "越南",
    "priceKey": null,
    "title": "中国游客越南自由行攻略 2026 | 岘港·会安·富国岛 | GoVietStay",
    "h1": "第一次来越南，哪些要提前订，哪些落地再决定？",
    "desc": "机票和酒店可以在中国自己选；落地后的接送、一日游、包车和临时调整，交给越南当地团队会更灵活。",
    "chips": [
      "中国游客",
      "自由行",
      "微信中文服务"
    ],
    "bullets": [
      "先确定目的地和酒店区域，再买当地活动。",
      "岘港适合城市+会安+巴拿山；富国岛适合度假村+海岛。",
      "热门日期、私人团和中文导游建议提前确认。"
    ],
    "faqs": [
      [
        "GoVietStay卖中国出发的机票套餐吗？",
        "目前核心是越南落地后的当地服务，不和中国旅行社抢机票酒店。"
      ],
      [
        "可以只订一天的团吗？",
        "可以，也可以只订机场接送或包车。"
      ],
      [
        "有中文服务吗？",
        "网站和微信用简体中文沟通；具体中文导游需按日期确认。"
      ],
      [
        "价格用什么货币？",
        "以VND为主，人民币仅作方便比较的约数。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "vietnam-evisa-chinese-passport",
    "type": "guide",
    "destination": "越南签证",
    "priceKey": null,
    "title": "中国护照去越南签证 2026 | 电子签与富国岛免签区别 | GoVietStay",
    "h1": "中国护照去越南：岘港要看签证，富国岛有30天免签政策",
    "desc": "去岘港、会安等越南大陆目的地要按最新入境规定准备合适签证；符合条件直接进入富国岛可享最长30天免签。",
    "chips": [
      "中国护照",
      "越南电子签",
      "富国岛30天免签"
    ],
    "bullets": [
      "越南电子签请使用官方 evisa.gov.vn。",
      "富国岛免签只适用于符合该政策条件的入境和停留安排。",
      "从富国岛继续去越南其他地区前要确认相应入境资格。"
    ],
    "faqs": [
      [
        "中国护照去岘港需要签证吗？",
        "通常需要准备符合当次入境条件的签证/电子签，请出发前以越南官方信息为准。"
      ],
      [
        "富国岛真的30天免签吗？",
        "越南外交部公开政策说明，外国护照符合条件进入富国岛可免签停留不超过30天。"
      ],
      [
        "富国岛免签后可以直接去岘港吗？",
        "不能简单理解为自动可以；前往越南其他地区前需要满足相应入境条件。"
      ],
      [
        "在哪里申请越南电子签？",
        "请使用越南官方电子签网站 evisa.gov.vn。"
      ]
    ],
    "officialUrl": "https://new.mofa.gov.vn/vi/tin-chi-tiet/chi-tiet/danh-muc-mien-thi-thuc-cua-viet-nam-voi-cac-nuoc-57162-172.html",
    "updated": "2026-08-26"
  },
  {
    "slug": "alipay-vietnam",
    "type": "guide",
    "destination": "越南支付",
    "priceKey": null,
    "title": "越南可以用支付宝吗 2026 | Alipay + VietQRGlobal | GoVietStay",
    "h1": "来越南可以用支付宝吗？可以，但要看商户是否支持 VietQRGlobal",
    "desc": "越南已扩展中国游客使用 Alipay 扫 VietQRGlobal 的跨境支付网络。具体能不能付，取决于店家是否属于支持网络。",
    "chips": [
      "支付宝",
      "VietQRGlobal",
      "中国游客支付"
    ],
    "bullets": [
      "不是每一个越南二维码都等于支付宝可用。",
      "看到 VietQRGlobal/参与商户标识时成功率更明确。",
      "GoVietStay直接收款方式以微信客服确认，不提前做未开通承诺。"
    ],
    "faqs": [
      [
        "所有VietQR都可以支付宝扫吗？",
        "不是，关键是商户是否在支持VietQRGlobal的参与网络。"
      ],
      [
        "GoVietStay现在能直接收支付宝吗？",
        "请在微信确认当前可用方式；网站不会在未确认merchant设置前做承诺。"
      ],
      [
        "还需要带现金吗？",
        "建议仍准备少量VND用于小店、市场或不支持跨境QR的场景。"
      ],
      [
        "支付宝支付会自动变成VND吗？",
        "跨境网络会处理币种结算，实际界面与汇率以支付应用显示为准。"
      ]
    ],
    "officialUrl": "https://cms.baochinhphu.vn/napas-mo-rong-thanh-toan-qr-viet-nam-trung-quoc-102260403151846831.htm",
    "updated": "2026-08-26"
  },
  {
    "slug": "wechat-pay-vietnam",
    "type": "guide",
    "destination": "越南支付",
    "priceKey": null,
    "title": "越南可以用微信支付吗 2026 | Weixin Pay + VietQRGlobal | GoVietStay",
    "h1": "来越南可以用微信支付吗？2026年跨境 VietQRGlobal 已继续扩展",
    "desc": "NAPAS、BIDV 与 Weixin Pay 已公布跨境QR连接；中国游客可在参与 VietQRGlobal 的越南商户使用 Weixin Pay。",
    "chips": [
      "微信支付",
      "Weixin Pay",
      "VietQRGlobal"
    ],
    "bullets": [
      "是否可用取决于具体商户是否接入支持网络。",
      "微信联系和微信支付是两件不同的事。",
      "GoVietStay当前直接收款方式请先在微信里确认。"
    ],
    "faqs": [
      [
        "微信支付在越南哪里都能用吗？",
        "不是。需要商户属于支持VietQRGlobal/Weixin Pay的网络。"
      ],
      [
        "这个网站上的微信二维码能直接付款吗？",
        "不是，它是联系/加好友二维码，不是付款码。"
      ],
      [
        "GoVietStay会开通微信支付吗？",
        "这是中国市场优先事项，但正式上线前以客服确认的收款方式为准。"
      ],
      [
        "还有什么支付方式？",
        "VND、银行卡或其他方式按具体booking确认。"
      ]
    ],
    "officialUrl": "https://baochinhphu.vn/thanh-toan-qr-viet-nam-trung-quoc-mo-rong-thuc-day-du-lich-va-thuong-mai-so-102260806175228148.htm",
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-free-travel",
    "type": "guide",
    "destination": "岘港",
    "priceKey": null,
    "title": "岘港自由行攻略 2026 | 中国游客 | GoVietStay",
    "h1": "岘港自由行：海滩、会安、巴拿山，一座城市可以玩很多种感觉",
    "desc": "岘港适合不想每天换酒店的人：海边住下来，再安排巴拿山、会安、占岛和顺化的一日行程。",
    "chips": [
      "岘港自由行",
      "海滩",
      "会安"
    ],
    "bullets": [
      "住宿区先选美溪海滩/市区，再排交通。",
      "大景点一天安排一个，别把行程塞满。",
      "会安最好下午去，晚上看灯笼。"
    ],
    "faqs": [
      [
        "岘港玩几天合适？",
        "第一次来通常3–5天比较舒服。"
      ],
      [
        "住海边还是市区？",
        "喜欢度假选海边；重视吃饭和城市移动可看市区/河边。"
      ],
      [
        "需要包车吗？",
        "会安、顺化或家庭出行包车更舒服；市区短途可灵活打车。"
      ],
      [
        "中文服务怎么联系？",
        "扫描页面上的微信二维码。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-first-trip",
    "type": "guide",
    "destination": "岘港",
    "priceKey": null,
    "title": "第一次去岘港怎么玩 2026 | 中国游客落地攻略 | GoVietStay",
    "h1": "第一次到岘港，第一天别急着去巴拿山",
    "desc": "长途飞行后先入住、吃饭、海边散步。真正的大行程从第二天开始，体验通常更好。",
    "chips": [
      "第一次岘港",
      "落地第一天",
      "轻松行程"
    ],
    "bullets": [
      "先解决SIM/eSIM、交通和VND小额现金。",
      "第一晚以海边、韩江或附近餐厅为主。",
      "第二天再安排巴拿山或会安。"
    ],
    "faqs": [
      [
        "落地当天可以去会安吗？",
        "如果航班早、体力好可以，但不建议把第一天排太满。"
      ],
      [
        "晚上岘港去哪里？",
        "韩江、龙桥周边、海边和夜市都比较轻松。"
      ],
      [
        "机场离市区远吗？",
        "岘港机场离主要旅游区不远，实际时间看酒店位置和交通。"
      ],
      [
        "可以让GoVietStay接机吗？",
        "可以，发航班号、人数、行李和酒店即可询价。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-4d3n-itinerary",
    "type": "guide",
    "destination": "岘港",
    "priceKey": null,
    "title": "岘港4天3晚攻略 2026 | 巴拿山+会安 | GoVietStay",
    "h1": "岘港4天3晚：够玩，也要留一点空白",
    "desc": "推荐节奏：第一天岘港轻松逛；一天巴拿山；一天下午椰子林+会安；最后半天按航班安排。",
    "chips": [
      "4天3晚",
      "巴拿山",
      "会安"
    ],
    "bullets": [
      "不建议4天里再硬塞太多远途。",
      "家庭客每天一个大项目最舒服。",
      "占岛受海况影响，若想去需留调整空间。"
    ],
    "faqs": [
      [
        "4天3晚要不要去顺化？",
        "可以，但会让整体更紧；第一次来通常先把岘港+会安玩舒服。"
      ],
      [
        "巴拿山和会安能同一天吗？",
        "技术上能，但体验会赶，不推荐。"
      ],
      [
        "占岛放哪天？",
        "留一个海况好的白天，并准备替代方案。"
      ],
      [
        "能定制吗？",
        "可以，微信发航班、酒店和人数。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "ba-na-hills-golden-bridge",
    "type": "product",
    "destination": "岘港",
    "priceKey": "bana",
    "title": "岘港巴拿山金桥一日游 2026 | 中国游客试运营价 | GoVietStay",
    "h1": "巴拿山 + 金桥：第一次来岘港最容易做决定的一日游",
    "desc": "酒店接送、门票/缆车和具体包含项目在微信确认后锁定。试运营价格只用于部分日期和组合。",
    "chips": [
      "巴拿山",
      "金桥",
      "试运营价"
    ],
    "bullets": [
      "测试起价低于部分大型OTA当前同类入门价。",
      "可选普通拼团或询问私人团。",
      "中文导游不是默认包含，必须在booking中确认。"
    ],
    "faqs": [
      [
        "页面上的起价每天都有吗？",
        "不保证。它是中国市场试运营起价，需按日期、人数和包含项目确认。"
      ],
      [
        "中文导游包含吗？",
        "只有在微信/booking中明确确认才包含。"
      ],
      [
        "儿童怎么算？",
        "按实际门票规则、年龄/身高和产品组合确认。"
      ],
      [
        "可以晚一点出发吗？",
        "私人团更灵活，但仍要看园区和缆车运营时间。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "hoi-an-coconut-forest",
    "type": "product",
    "destination": "会安",
    "priceKey": "hoian",
    "title": "会安古城+椰子林一日游 2026 | 中国游客 | GoVietStay",
    "h1": "下午坐椰子船，傍晚进会安，等灯笼亮起来",
    "desc": "这个组合很适合中国游客拍照和轻松体验：白天不必太早出发，晚上再看会安最有氛围的一面。",
    "chips": [
      "会安",
      "椰子林",
      "灯笼"
    ],
    "bullets": [
      "不强制玩刺激的篮子船旋转。",
      "家庭和情侣都适合。",
      "可升级包车/私人路线。"
    ],
    "faqs": [
      [
        "篮子船一定要转圈吗？",
        "不用，可以要求正常慢慢划。"
      ],
      [
        "晚餐包含吗？",
        "看你选择的组合，以微信确认内容为准。"
      ],
      [
        "中文导游有吗？",
        "可询问，需按日期确认。"
      ],
      [
        "几点回岘港？",
        "取决于是否晚餐、灯笼船和私人/拼团安排。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "cham-island-tour",
    "type": "product",
    "destination": "岘港·会安",
    "priceKey": "cham",
    "title": "占岛一日游 2026 | 快艇+浮潜 | 中国游客 | GoVietStay",
    "h1": "占岛：离岘港和会安很近的海岛日，但要先看海况",
    "desc": "快艇、海岛、浮潜和午餐类组合按当天海况确认。GoVietStay不会在海况不好时只为了成交硬推。",
    "chips": [
      "占岛",
      "快艇",
      "浮潜"
    ],
    "bullets": [
      "海况和官方运营决定能否出发。",
      "带小孩/老人先告诉年龄和身体情况。",
      "可询问私人快艇或更轻松方案。"
    ],
    "faqs": [
      [
        "下雨就一定停吗？",
        "不一定，关键是海况和主管部门/运营方安全安排。"
      ],
      [
        "儿童适合吗？",
        "要看年龄、身体情况和当天海况。"
      ],
      [
        "起价包含什么？",
        "具体快艇、接送、午餐/设备以当日微信确认套餐为准。"
      ],
      [
        "可以从会安出发吗？",
        "可以按酒店位置确认接送。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "hue-day-trip",
    "type": "product",
    "destination": "顺化",
    "priceKey": "hue",
    "title": "岘港去顺化一日游 2026 | 中国游客 | GoVietStay",
    "h1": "顺化一日游：路程更长，所以舒服比多打卡更重要",
    "desc": "皇城、历史和沿途景色适合真正想了解越南文化的客人。家庭可优先选择包车或更慢的节奏。",
    "chips": [
      "顺化",
      "皇城",
      "文化"
    ],
    "bullets": [
      "一天时间较长，不适合每个家庭。",
      "老人同行建议减少步行和停留点。",
      "中文导游需提前确认。"
    ],
    "faqs": [
      [
        "顺化离岘港远吗？",
        "比会安明显更远，是完整的一日行程。"
      ],
      [
        "适合老人吗？",
        "可以，但建议私人车和减量路线。"
      ],
      [
        "可以只包车吗？",
        "可以询问。"
      ],
      [
        "是否经过海云关？",
        "取决于具体路线、交通和当天安排。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-airport-transfer",
    "type": "transfer",
    "destination": "岘港",
    "priceKey": null,
    "title": "岘港机场接送 2026 | 中国游客微信预订 | GoVietStay",
    "h1": "岘港机场到酒店：下飞机以后别再现场比车",
    "desc": "把航班号、酒店、人数和行李发微信，GoVietStay按车型确认价格和接机信息。",
    "chips": [
      "岘港机场",
      "接送",
      "包车"
    ],
    "bullets": [
      "按真实行李数量选车型。",
      "可以直接去会安酒店。",
      "司机不一定会中文，中文客服在线支持。"
    ],
    "faqs": [
      [
        "航班延误怎么办？",
        "发准确航班号并保持微信联系。"
      ],
      [
        "司机会中文吗？",
        "不保证；中文客服可以在线协助。"
      ],
      [
        "能直接去会安吗？",
        "可以。"
      ],
      [
        "要提前多久订？",
        "越早越稳，尤其家庭、大车和深夜航班。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-private-car",
    "type": "private",
    "destination": "岘港·会安·顺化",
    "priceKey": null,
    "title": "岘港中文包车 2026 | 会安·顺化·巴拿山 | GoVietStay",
    "h1": "包车不是为了豪华，是为了少等、少绕路",
    "desc": "家庭、多人行李、老人或想自己控制时间时，包车往往比跟大团更合适。",
    "chips": [
      "包车",
      "家庭",
      "不拼陌生客"
    ],
    "bullets": [
      "报价按车型、时间和路线。",
      "临时加点可能需要重新报价。",
      "中文导游与中文客服不是同一个服务。"
    ],
    "faqs": [
      [
        "包车含导游吗？",
        "默认不等于含导游；需要中文导游请单独确认。"
      ],
      [
        "能去巴拿山吗？",
        "可以安排往返车，门票另按套餐确认。"
      ],
      [
        "能跨会安和顺化吗？",
        "可以，但不同路线按距离和时间报价。"
      ],
      [
        "儿童座椅有吗？",
        "需要提前提出并确认车型/库存。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-private-tour",
    "type": "private",
    "destination": "岘港·会安",
    "priceKey": null,
    "title": "岘港私人定制游 2026 | 中国家庭/情侣 | GoVietStay",
    "h1": "私人团：只和自己人走，不用跟陌生团赶时间",
    "desc": "把日期、人数、孩子年龄、酒店、喜欢什么和不喜欢什么发微信，再决定车、导游和路线。",
    "chips": [
      "私人团",
      "情侣",
      "家庭"
    ],
    "bullets": [
      "不拼陌生客。",
      "可减少购物点和不感兴趣的停留。",
      "门票、导游和用车分别确认。"
    ],
    "faqs": [
      [
        "私人团一定很贵吗？",
        "总价通常更高，但多人家庭按人均计算差距可能没有想象大。"
      ],
      [
        "可以睡晚一点吗？",
        "多数私人路线更灵活，但受景区运营时间限制。"
      ],
      [
        "可以不去购物点吗？",
        "可在确认路线时明确。"
      ],
      [
        "有中文导游吗？",
        "可按日期询问并确认。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-family-travel",
    "type": "guide",
    "destination": "岘港",
    "priceKey": null,
    "title": "岘港亲子游 2026 | 中国家庭 | GoVietStay",
    "h1": "带孩子来岘港：每天一个大项目，通常已经够了",
    "desc": "巴拿山、会安、海滩都能带孩子，但年龄、午睡、天气和身高票规则会直接影响体验。",
    "chips": [
      "亲子游",
      "孩子",
      "家庭"
    ],
    "bullets": [
      "孩子身高会影响部分门票。",
      "海岛行程先看年龄和海况。",
      "私人团更容易留午睡/休息时间。"
    ],
    "faqs": [
      [
        "小孩最适合哪个？",
        "按年龄不同；会安轻松版、海滩和部分巴拿山玩法都可考虑。"
      ],
      [
        "占岛适合幼儿吗？",
        "需要更谨慎评估海况和孩子状态。"
      ],
      [
        "巴拿山累吗？",
        "面积大、走路多，建议预留休息。"
      ],
      [
        "可以安排家庭私人团吗？",
        "可以。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-food-guide",
    "type": "guide",
    "destination": "岘港",
    "priceKey": null,
    "title": "岘港美食攻略 2026 | 中国游客 | GoVietStay",
    "h1": "岘港吃什么：别只找“网红店”，先看你住在哪一带",
    "desc": "海鲜、越南粉、米纸卷、烤肉和咖啡都值得试。真正好用的建议是离你酒店近、当天营业、价格透明。",
    "chips": [
      "岘港美食",
      "海鲜",
      "咖啡"
    ],
    "bullets": [
      "热门店不等于每个人都喜欢。",
      "点海鲜先确认计价单位。",
      "家庭或忌口可提前发微信说明。"
    ],
    "faqs": [
      [
        "海鲜怎么避免看不懂价格？",
        "下单前确认按份、按100g还是按公斤。"
      ],
      [
        "可以推荐中国胃更容易接受的店吗？",
        "可以按酒店和口味给建议。"
      ],
      [
        "有中文菜单吗？",
        "部分旅游区餐厅有，但不要默认。"
      ],
      [
        "需要给小费吗？",
        "越南没有统一强制小费习惯，具体看服务场景。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-spa-massage",
    "type": "guide",
    "destination": "岘港",
    "priceKey": null,
    "title": "岘港按摩SPA攻略 2026 | 中国游客 | GoVietStay",
    "h1": "岘港按摩很多，先看卫生、位置和真实评价",
    "desc": "不要只看最低价。接送、房间环境、疗程时间和是否有额外收费都要先看清。",
    "chips": [
      "按摩",
      "SPA",
      "岘港"
    ],
    "bullets": [
      "确认疗程净时长。",
      "先看Google/平台近期真实评价。",
      "价格异常低时更要确认附加项目。"
    ],
    "faqs": [
      [
        "需要提前预约吗？",
        "热门时间和多人同行建议预约。"
      ],
      [
        "酒店附近能推荐吗？",
        "可以发酒店位置后再选。"
      ],
      [
        "小费必须给吗？",
        "具体店家政策不同，提前确认是否已含服务费。"
      ],
      [
        "GoVietStay可以代问吗？",
        "可以通过微信协助询问。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-free-travel",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛自由行攻略 2026 | 中国游客 | GoVietStay",
    "h1": "富国岛自由行：先选度假村区域，再选你要玩的岛",
    "desc": "富国岛比地图看起来大。南岛、长滩、中部和北岛住哪里，会直接决定每天坐车多久。",
    "chips": [
      "富国岛",
      "自由行",
      "度假村"
    ],
    "bullets": [
      "先定酒店区域，再排三岛/四岛/乐园。",
      "海岛日不要放在夜航刚到后的第一天。",
      "家庭可以把活动减少一点，把度假村时间留足。"
    ],
    "faqs": [
      [
        "富国岛几天合适？",
        "4天3晚到5天4晚都常见，取决于想玩多少项目。"
      ],
      [
        "南岛还是北岛？",
        "看你更重视Sunset Town/Hon Thom还是VinWonders/Safari。"
      ],
      [
        "需要包车吗？",
        "跨区域或家庭出行很有价值。"
      ],
      [
        "微信怎么联系？",
        "页面可直接查看并保存二维码。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-visa-free-30-days",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "中国游客富国岛免签30天 2026 | 条件说明 | GoVietStay",
    "h1": "中国游客去富国岛：30天免签是最大优势之一，但条件要看清",
    "desc": "越南官方政策允许符合条件的外国护照进入富国岛免签停留不超过30天，包括在越南国际口岸过境区转机后继续前往富国岛的情况。",
    "chips": [
      "富国岛免签",
      "30天",
      "中国游客"
    ],
    "bullets": [
      "免签政策是富国岛特定政策，不要自动套到岘港/河内。",
      "离开富国岛去越南其他地区前要重新确认入境资格。",
      "出发前仍应检查护照和航空公司最新要求。"
    ],
    "faqs": [
      [
        "中国护照可以富国岛免签吗？",
        "该政策面向符合条件的外国护照持有人；实际登机/入境前请核对官方最新条件。"
      ],
      [
        "可以在富国岛停30天吗？",
        "政策上限为不超过30天，仍需符合入境条件。"
      ],
      [
        "从中国直飞最简单吗？",
        "通常最直观；若经越南其他国际口岸，要符合政策关于过境区域后继续前往富国岛的要求。"
      ],
      [
        "免签后能去岘港吗？",
        "不能把富国岛免签自动等同于可进入越南其他地区，需要相应入境资格。"
      ]
    ],
    "officialUrl": "https://new.mofa.gov.vn/vi/tin-chi-tiet/chi-tiet/danh-muc-mien-thi-thuc-cua-viet-nam-voi-cac-nuoc-57162-172.html",
    "updated": "2026-08-26"
  },
  {
    "slug": "chengdu-phu-quoc-direct-flight",
    "type": "arrival",
    "destination": "成都 → 富国岛",
    "priceKey": null,
    "title": "成都直飞富国岛 2026 | 航班+落地攻略 | GoVietStay",
    "h1": "成都直飞富国岛：不到4小时，落地后先去度假村",
    "desc": "Sun PhuQuoc Airways 已于2026年7月启动成都天府—富国岛定期直飞计划。航班频次会调整，请以航空公司实时信息为准。",
    "chips": [
      "成都",
      "富国岛直飞",
      "落地攻略"
    ],
    "bullets": [
      "官方公布计划为每周多班直飞。",
      "夜间抵达时第一晚不要安排海岛团。",
      "先发酒店区域，机场接送和第二天行程会更好排。"
    ],
    "faqs": [
      [
        "现在有成都直飞富国岛吗？",
        "Sun PhuQuoc Airways 2026年官方已发布并启动该定期直飞航线，具体班期以航空公司实时信息为准。"
      ],
      [
        "飞多久？",
        "航空公司公开信息称直飞时间缩短到4小时以内。"
      ],
      [
        "落地后适合马上去景点吗？",
        "夜间抵达更适合直接去酒店休息。"
      ],
      [
        "第二天玩什么？",
        "住南岛可考虑Hon Thom/岛游，住北岛则可先看VinWonders/Safari。"
      ]
    ],
    "officialUrl": "https://www.sunphuquocairways.com/vn/en/about-us/news/sun-phuquoc-airways-opens-two-new-routes-to-chengdu",
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-three-islands",
    "type": "product",
    "destination": "富国岛",
    "priceKey": "pq3",
    "title": "富国岛三岛一日游 2026 | 快艇浮潜 | 中国游客试运营价 | GoVietStay",
    "h1": "富国岛三岛：想看海、浮潜和白沙滩，这是一条最直接的路线",
    "desc": "中国市场试运营起价用于部分日期/组合。酒店接送、午餐、快艇和拍摄项目按当天套餐确认。",
    "chips": [
      "三岛",
      "快艇",
      "浮潜"
    ],
    "bullets": [
      "价格要和同样包含项目的OTA套餐比。",
      "海况可能调整停靠顺序。",
      "儿童请先发年龄/身高。"
    ],
    "faqs": [
      [
        "起价是不是每天都能买？",
        "不是保证价，需按日期和套餐确认。"
      ],
      [
        "接送包含吗？",
        "看酒店区域和选择的套餐。"
      ],
      [
        "有中文导游吗？",
        "默认不承诺，需按日期确认。"
      ],
      [
        "浮潜设备有吗？",
        "按最终确认套餐为准。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-four-islands-hon-thom",
    "type": "product",
    "destination": "富国岛",
    "priceKey": "pq4",
    "title": "富国岛四岛+香岛缆车 2026 | 中国游客 | GoVietStay",
    "h1": "四岛 + 香岛缆车：如果只想安排一个“玩很满”的海岛日",
    "desc": "快艇、浮潜、香岛缆车/水上乐园类组合在大型OTA价格跨度很大；GoVietStay按真实包含项目确认。",
    "chips": [
      "四岛",
      "香岛",
      "跨海缆车"
    ],
    "bullets": [
      "这是高价值但也更长的一日项目。",
      "Sea Walking等额外项目通常另付。",
      "试运营起价不自动代表所有日期。"
    ],
    "faqs": [
      [
        "缆车一定包含吗？",
        "只有最终booking明确写入才包含。"
      ],
      [
        "适合幼儿吗？",
        "整天较长，建议先发年龄评估。"
      ],
      [
        "Sea Walking包含吗？",
        "通常属于额外付费项目，最终看套餐。"
      ],
      [
        "为什么价格比部分OTA低？",
        "试运营阶段GoVietStay用直接获客价测试市场，但仍以当日成本和包含项目确认。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-airport-transfer",
    "type": "transfer",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛机场接送 2026 | 中国游客微信预订 | GoVietStay",
    "h1": "富国岛机场接送：先告诉我们酒店，因为岛真的很大",
    "desc": "同样是富国岛酒店，南岛、中部和北岛的距离差很多。发酒店全名、人数和行李再报价最准确。",
    "chips": [
      "富国岛机场",
      "接送",
      "度假村"
    ],
    "bullets": [
      "按酒店区域和车型报价。",
      "深夜航班建议提前确认。",
      "中文客服可在线协助。"
    ],
    "faqs": [
      [
        "为什么不能给一个统一价？",
        "因为不同resort距离差异很大。"
      ],
      [
        "司机会中文吗？",
        "不保证；微信中文客服协助。"
      ],
      [
        "可以中途停便利店吗？",
        "提前说，按路线确认。"
      ],
      [
        "大行李要说吗？",
        "一定要，车型取决于人+行李。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-private-car",
    "type": "private",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛包车 2026 | 南岛·北岛·日落小镇 | GoVietStay",
    "h1": "富国岛包车：同一天别南北来回跑",
    "desc": "把想去的地方发来，GoVietStay先按区域重排，再报价。少绕路，才是真正省时间。",
    "chips": [
      "包车",
      "南岛",
      "北岛"
    ],
    "bullets": [
      "按时长、车型、区域报价。",
      "不建议一天把南北岛塞满。",
      "景点门票和司机服务分开确认。"
    ],
    "faqs": [
      [
        "可以按小时吗？",
        "具体产品按路线和时长确认。"
      ],
      [
        "包车含门票吗？",
        "默认不等于含门票。"
      ],
      [
        "中文司机有吗？",
        "需按日期和车辆资源确认。"
      ],
      [
        "可以看日落后再送回酒店吗？",
        "可以按路线询价。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "phu-quoc-family-travel",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛亲子游 2026 | 中国家庭 | GoVietStay",
    "h1": "带孩子去富国岛：度假村时间本身就是行程",
    "desc": "不要每天都出门。Safari、VinWonders、Hon Thom和海岛团里选2–3个重点，孩子和父母都会更舒服。",
    "chips": [
      "亲子",
      "家庭",
      "度假村"
    ],
    "bullets": [
      "北岛住客去Safari/VinWonders最方便。",
      "南岛住客去Hon Thom/Sunset Town更顺。",
      "小孩参加快艇行程要看年龄和海况。"
    ],
    "faqs": [
      [
        "最适合孩子的景点？",
        "VinWonders、Safari和部分水上项目都适合，但按年龄不同选择。"
      ],
      [
        "三岛适合小孩吗？",
        "要看年龄、海况和孩子是否适应快艇。"
      ],
      [
        "住哪里最方便？",
        "看你更重视北岛乐园还是南岛Sunset Town/Hon Thom。"
      ],
      [
        "可以安排家庭包车吗？",
        "可以。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "vinwonders-phu-quoc",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛 VinWonders 攻略 2026 | 中国家庭 | GoVietStay",
    "h1": "VinWonders 富国岛：亲子全天项目，别再同一天排太多别的",
    "desc": "园区本身就能玩很久。住北岛最方便；住南岛则要提前算好往返时间。",
    "chips": [
      "VinWonders",
      "亲子",
      "北岛"
    ],
    "bullets": [
      "一整天更合理。",
      "门票和接送可分别询问。",
      "高峰期提前买票更稳。"
    ],
    "faqs": [
      [
        "需要一天吗？",
        "多数家庭会更舒服地安排大半天到一天。"
      ],
      [
        "和Safari同一天吗？",
        "能组合，但会很满；带小孩不一定必要。"
      ],
      [
        "GoVietStay卖票吗？",
        "可在微信询问当前可代订/可用方案。"
      ],
      [
        "住南岛可以去吗？",
        "可以，但通勤明显更长。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "vinpearl-safari-phu-quoc",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛 Safari 攻略 2026 | 中国亲子游 | GoVietStay",
    "h1": "Vinpearl Safari：有孩子的家庭，往往比再去一个海岛更合适",
    "desc": "北岛核心亲子项目。与VinWonders距离相对接近，但是否同一天玩两个要看孩子体力。",
    "chips": [
      "Safari",
      "亲子",
      "动物园"
    ],
    "bullets": [
      "适合家庭和不想坐快艇的客人。",
      "中午炎热时要注意休息。",
      "住南岛需计算来回交通。"
    ],
    "faqs": [
      [
        "适合几岁孩子？",
        "不同年龄都能体验，但婴幼儿需要考虑天气和休息。"
      ],
      [
        "和VinWonders一起买吗？",
        "可以比较组合票，但是否同一天玩完要看体力。"
      ],
      [
        "需要包车吗？",
        "如果酒店离北岛远，私人车更省事。"
      ],
      [
        "中文信息有吗？",
        "可通过微信咨询。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "sunset-town-phu-quoc",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛日落小镇攻略 2026 | Sunset Town | GoVietStay",
    "h1": "日落小镇：下午去，比大中午去更值得",
    "desc": "南岛拍照、餐厅、Kiss Bridge和夜间表演集中。最舒服的玩法是下午到，等日落，再决定是否看秀。",
    "chips": [
      "日落小镇",
      "Kiss Bridge",
      "南岛"
    ],
    "bullets": [
      "中午太阳强，拍照体验未必最好。",
      "住北岛往返距离较长。",
      "可与Hon Thom日间活动组合，但整天会更长。"
    ],
    "faqs": [
      [
        "几点去最好？",
        "通常下午到日落前更有氛围，实际按天气和表演时间调整。"
      ],
      [
        "要门票吗？",
        "不同区域/活动规则不同，具体票务按当日官方信息。"
      ],
      [
        "可以包车去吗？",
        "可以。"
      ],
      [
        "能和Kiss of the Sea一起吗？",
        "可以，需按演出日和时间安排。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "kiss-of-the-sea-phu-quoc",
    "type": "guide",
    "destination": "富国岛",
    "priceKey": null,
    "title": "富国岛 Kiss of the Sea 攻略 2026 | 中国游客 | GoVietStay",
    "h1": "Kiss of the Sea：适合把富国岛的一天收在一个夜间表演里",
    "desc": "如果白天已在南岛，晚上衔接表演很顺。是否演出、票种和时间都应按当天官方信息确认。",
    "chips": [
      "Kiss of the Sea",
      "夜间秀",
      "日落小镇"
    ],
    "bullets": [
      "先确认演出日。",
      "小孩和老人要考虑晚间结束时间。",
      "可与Sunset Town/Hon Thom组合。"
    ],
    "faqs": [
      [
        "每天都有吗？",
        "不要默认，按官方当天演出安排确认。"
      ],
      [
        "票可以代订吗？",
        "可微信询问当前可用方式。"
      ],
      [
        "看完怎么回酒店？",
        "住较远酒店建议提前安排车。"
      ],
      [
        "带小孩合适吗？",
        "可以，但要考虑晚间时间和音效。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  },
  {
    "slug": "danang-vs-phu-quoc",
    "type": "guide",
    "destination": "岘港 vs 富国岛",
    "priceKey": null,
    "title": "岘港还是富国岛 2026 | 中国游客怎么选 | GoVietStay",
    "h1": "岘港还是富国岛？别看谁照片更漂亮，看你想怎么度假",
    "desc": "想每天出去玩、看会安和文化，岘港更丰富；想住度假村、海岛和亲子乐园，富国岛通常更顺。",
    "chips": [
      "目的地对比",
      "岘港",
      "富国岛"
    ],
    "bullets": [
      "岘港：城市+海滩+会安+巴拿山+顺化。",
      "富国岛：resort+岛游+Hon Thom+Safari/VinWonders。",
      "航班、签证和季节也会改变最终选择。"
    ],
    "faqs": [
      [
        "情侣选哪个？",
        "都可以；喜欢城市/会安选岘港，喜欢resort/海岛选富国岛。"
      ],
      [
        "带孩子呢？",
        "富国岛的resort和大型亲子项目很强；岘港则行程种类更多。"
      ],
      [
        "中国护照签证方面呢？",
        "富国岛有特定30天免签政策；去岘港需按最新越南入境规定准备。"
      ],
      [
        "两个都去可以吗？",
        "可以，但短假会增加国内段移动成本。"
      ]
    ],
    "officialUrl": null,
    "updated": "2026-08-26"
  }
];

export const getChinaPage=(slug:string)=>chinaSeoPages.find(p=>p.slug===slug);

export const getChinaRelated=(page:ChinaSeoPage)=>[
  ...chinaSeoPages.filter(p=>p.slug!==page.slug && p.destination.split("·")[0]===page.destination.split("·")[0]),
  ...chinaSeoPages.filter(p=>p.slug!==page.slug && p.type===page.type),
].filter((p,i,a)=>a.findIndex(x=>x.slug===p.slug)===i).slice(0,4);
