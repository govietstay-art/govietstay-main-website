export type ChinaPrice = {
  fromVnd:number;
  approxCny:number;
  label:string;
  compare:string;
};

export const chinaMarketConfig = {
  wechatQr:"/china/wechat-go-viet-station.png",
  wechatName:"Go Viet Station",
  wechatId:"GovietStation",
  wechatOpen:"weixin://",
  brand:"GoVietStay",
  pricingMode:"trial-confirm-before-payment",
  prices:{
  "bana": {
    "fromVnd": 1290000,
    "approxCny": 331,
    "label": "巴拿山试运营起价",
    "compare": "部分大型OTA同类入门产品约 1.4M VND 起"
  },
  "cham": {
    "fromVnd": 899000,
    "approxCny": 231,
    "label": "占岛试运营起价",
    "compare": "海况/快艇/午餐组合需按日期确认"
  },
  "hoian": {
    "fromVnd": 1090000,
    "approxCny": 279,
    "label": "会安+椰子林试运营起价",
    "compare": "介于纯用车和全包私人团之间"
  },
  "hue": {
    "fromVnd": 1390000,
    "approxCny": 356,
    "label": "顺化试运营起价",
    "compare": "长途日游，家庭可升级私人车"
  },
  "pq3": {
    "fromVnd": 899000,
    "approxCny": 231,
    "label": "富国岛三岛试运营起价",
    "compare": "与OTA低价产品竞争，包含项目必须对齐比较"
  },
  "pq4": {
    "fromVnd": 1690000,
    "approxCny": 433,
    "label": "四岛+香岛试运营起价",
    "compare": "部分OTA四岛+缆车当前可见约 CNY 558 起"
  }
} as Record<string,ChinaPrice>,
  priceDisclaimer:"中国市场试运营起价：仅适用于部分日期/人数/套餐。人民币为方便比较的约数。最终价格与包含项目必须在微信确认，确认前请勿转账。",
  payments:{
    directAlipayConfirmed:false,
    directWeixinPayConfirmed:false,
    note:"越南已有 VietQRGlobal 与 Alipay / Weixin Pay 的跨境网络，但 GoVietStay 是否能直接通过该网络收款，以客服确认的merchant/payment设置为准。"
  }
} as const;
