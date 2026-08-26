export type VietnamVisualSet = {
  hero: string;
  gallery: [string, string, string];
  label: string;
};

const DEFAULT: VietnamVisualSet = {
  hero: "/tour/bana.jpg",
  gallery: [
    "/tour/cham-island/guest-on-island.jpg",
    "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
    "/tour/phuquoc/tour-01-1.jpg",
  ],
  label: "Đà Nẵng · Hội An · Huế · Phú Quốc",
};

export const vietnamHubHero = {
  main: "/tour/bana.jpg",
  cham: "/tour/cham-island/guest-on-island.jpg",
  hoiAn: "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  phuQuoc: "/tour/phuquoc/tour-01-1.jpg",
};

export const vietnamRealGuests = [
  "/happy-travelers/Russian Banahill.jpg",
  "/tour/cham-island/guest-on-island.jpg",
  "/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp",
  "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  "/happy-travelers/Russian Phu Quoc.jpg",
  "/happy-travelers/02462467f09771c928865.jpg",
];

export const vietnamReviewScreenshots = [
  "/tour/ba-na-hills/reviews/dariga-google.png",
  "/tour/ba-na-hills/reviews/ryan-google.png",
  "/tour/ba-na-hills/reviews/russian-family-google.png",
];

export const vietnamFeaturedProducts = [
  { slug: "tour-ba-na-hills", image: "/tour/bana.jpg", tag: "BÀ NÀ HILLS", benefit: "Không phải tự lo vé và xe; giá được xác nhận rõ trước khi đi." },
  { slug: "tour-cu-lao-cham", image: "/tour/cham-island/guest-on-island.jpg", tag: "CÙ LAO CHÀM", benefit: "Có cano, snorkeling và kiểm tra tình hình biển sát ngày." },
  { slug: "tour-hoi-an-rung-dua", image: "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp", tag: "HỘI AN", benefit: "Đi Rừng Dừa buổi chiều, vào phố cổ đúng lúc lên đèn." },
  { slug: "tour-hue-tu-da-nang", image: "/tour/hue.jpg", tag: "HUẾ", benefit: "Một ngày vừa sức để xem di sản mà không phải chạy quá nhiều điểm." },
  { slug: "tour-3-dao-phu-quoc", image: "/tour/phuquoc/tour-01-1.jpg", tag: "PHÚ QUỐC 3 ĐẢO", benefit: "Dành trọn một ngày cho biển, cano và snorkeling." },
  { slug: "tour-4-dao-phu-quoc-cap-treo", image: "/tour/phuquoc/tour-03-2.jpg", tag: "4 ĐẢO + HÒN THƠM", benefit: "Xem rõ vé, cano và các quyền lợi trước khi chốt." },
];

export const vietnamComboVisuals = [
  { slug: "combo-da-nang-3-tour", image: "/tour/cham.jpg", kicker: "COMBO ĐÀ NẴNG", title: "Bà Nà + Hội An + Cù Lao Chàm", note: "Gom chung một booking để dễ xếp lịch và đỡ phải hỏi giá nhiều lần." },
  { slug: "combo-da-nang-gia-dinh", image: "/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp", kicker: "COMBO GIA ĐÌNH", title: "Đà Nẵng đi theo sức của cả nhà", note: "Có trẻ nhỏ hay người lớn tuổi thì lịch được sắp nhẹ hơn." },
  { slug: "combo-phu-quoc-4n3d", image: "/tour/phuquoc/tour-05-3.jpg", kicker: "PHÚ QUỐC 4N3Đ", title: "Có biển, có nghỉ, vẫn đủ thời gian khám phá", note: "Xếp điểm theo khu resort để bớt thời gian ngồi xe." },
];

export function getVietnamVisuals(slug: string, destination: string): VietnamVisualSet {
  if (slug.includes("ba-na") || slug.includes("bana")) {
    return { hero: "/tour/bana.jpg", gallery: ["/happy-travelers/Russian Banahill.jpg","/tour/ba-na-hills/reviews/ryan-google.png","/tour/ba-na-hills/reviews/dariga-google.png"], label: "Bà Nà Hills · Golden Bridge" };
  }
  if (slug.includes("cu-lao") || slug.includes("cham")) {
    return { hero: "/tour/cham-island/guest-on-island.jpg", gallery: ["/tour/cham-island/guest-pickup.jpg","/tour/cham.jpg","/happy-travelers/02e412c4c634476a1e258.jpg"], label: "Cù Lao Chàm · biển · snorkeling" };
  }
  if (slug.includes("hoi-an") || slug.includes("rung-dua")) {
    return { hero: "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp", gallery: ["/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp","/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp","/hero-hoian-new.png"], label: "Hội An · Rừng Dừa · đèn lồng" };
  }
  if (slug.includes("hue")) {
    return { hero: "/tour/hue.jpg", gallery: ["/tour/haivan.jpg","/tour/huebytrain.jpg","/happy-travelers/Isreal Danang.jpg"], label: "Huế · di sản · Hải Vân" };
  }
  if (slug.includes("phu-quoc")) {
    return { hero: "/tour/phuquoc/tour-01-1.jpg", gallery: ["/tour/phuquoc/tour-03-2.jpg","/tour/phuquoc/tour-05-3.jpg","/happy-travelers/Russian Phu Quoc.jpg"], label: "Phú Quốc · biển · nghỉ dưỡng" };
  }
  if (slug.includes("san-bay") || slug.includes("thue-xe")) {
    return destination.includes("Phú Quốc")
      ? { hero:"/tour/phuquoc/tour-07-2.jpg",gallery:["/tour/phuquoc/tour-01-2.jpg","/tour/phuquoc/tour-08-2.jpg","/happy-travelers/Russian Phu Quoc.jpg"],label:"Xe riêng · sân bay · gia đình" }
      : { hero:"/tour/haivan.jpg",gallery:["/hero-hoian-new.png","/tour/hoian.jpg","/happy-travelers/Isreal Danang.jpg"],label:"Xe riêng · sân bay · gia đình" };
  }
  return DEFAULT;
}
