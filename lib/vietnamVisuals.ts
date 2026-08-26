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
  { slug: "tour-ba-na-hills", image: "/tour/bana.jpg", tag: "NÚI · CHECK-IN", benefit: "Biết rõ vé, xe, buffet và điều kiện trước khi đặt" },
  { slug: "tour-cu-lao-cham", image: "/tour/cham-island/guest-on-island.jpg", tag: "BIỂN · SNORKELING", benefit: "Kiểm tra điều kiện biển sát ngày, có lựa chọn private" },
  { slug: "tour-hoi-an-rung-dua", image: "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp", tag: "VĂN HÓA · BUỔI TỐI", benefit: "Rừng Dừa trước, phố cổ và đèn lồng sau" },
  { slug: "tour-hue-tu-da-nang", image: "/tour/hue.jpg", tag: "DI SẢN · LỊCH SỬ", benefit: "Một ngày đủ thời gian để hiểu Huế, không chạy checklist" },
  { slug: "tour-3-dao-phu-quoc", image: "/tour/phuquoc/tour-01-1.jpg", tag: "PHÚ QUỐC · BIỂN", benefit: "Một ngày biển đúng nghĩa với lộ trình rõ ràng" },
  { slug: "tour-4-dao-phu-quoc-cap-treo", image: "/tour/phuquoc/tour-03-2.jpg", tag: "PHÚ QUỐC · HÒN THƠM", benefit: "So quyền lợi trước khi so giá: đảo + cáp treo + thời gian" },
];

export const vietnamComboVisuals = [
  { slug: "combo-da-nang-3-tour", image: "/tour/cham.jpg", kicker: "COMBO CHỦ LỰC", title: "Bà Nà + Hội An + Cù Lao Chàm", note: "Một booking · một đầu mối Zalo · dễ đổi thứ tự theo điều kiện" },
  { slug: "combo-da-nang-gia-dinh", image: "/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp", kicker: "FAMILY COMBO", title: "Đà Nẵng theo nhịp của gia đình", note: "Trẻ nhỏ · người lớn tuổi · giờ nghỉ · mức độ riêng tư" },
  { slug: "combo-phu-quoc-4n3d", image: "/tour/phuquoc/tour-05-3.jpg", kicker: "PHÚ QUỐC 4N3Đ", title: "Biển + resort + một ngày khám phá", note: "Không zig-zag cả đảo · tối ưu theo khu resort" },
];

export function getVietnamVisuals(slug: string, destination: string): VietnamVisualSet {
  if (slug.includes("ba-na") || slug.includes("bana")) {
    return {
      hero: "/tour/bana.jpg",
      gallery: [
        "/happy-travelers/Russian Banahill.jpg",
        "/tour/ba-na-hills/reviews/ryan-google.png",
        "/tour/ba-na-hills/reviews/dariga-google.png",
      ],
      label: "Bà Nà Hills · Golden Bridge",
    };
  }

  if (slug.includes("cu-lao") || slug.includes("cham")) {
    return {
      hero: "/tour/cham-island/guest-on-island.jpg",
      gallery: [
        "/tour/cham-island/guest-pickup.jpg",
        "/tour/cham.jpg",
        "/happy-travelers/02e412c4c634476a1e258.jpg",
      ],
      label: "Cù Lao Chàm · biển · snorkeling",
    };
  }

  if (slug.includes("hoi-an") || slug.includes("rung-dua")) {
    return {
      hero: "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
      gallery: [
        "/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp",
        "/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp",
        "/hero-hoian-new.png",
      ],
      label: "Hội An · Rừng Dừa · đèn lồng",
    };
  }

  if (slug.includes("hue")) {
    return {
      hero: "/tour/hue.jpg",
      gallery: [
        "/tour/haivan.jpg",
        "/tour/huebytrain.jpg",
        "/happy-travelers/Isreal Danang.jpg",
      ],
      label: "Huế · di sản · Hải Vân",
    };
  }

  if (slug.includes("phu-quoc")) {
    return {
      hero: "/tour/phuquoc/tour-01-1.jpg",
      gallery: [
        "/tour/phuquoc/tour-03-2.jpg",
        "/tour/phuquoc/tour-05-3.jpg",
        "/happy-travelers/Russian Phu Quoc.jpg",
      ],
      label: "Phú Quốc · biển · nghỉ dưỡng",
    };
  }

  if (slug.includes("san-bay") || slug.includes("thue-xe")) {
    return {
      hero: destination.includes("Phú Quốc")
        ? "/tour/phuquoc/tour-07-2.jpg"
        : "/tour/haivan.jpg",
      gallery: destination.includes("Phú Quốc")
        ? ["/tour/phuquoc/tour-01-2.jpg", "/tour/phuquoc/tour-08-2.jpg", "/happy-travelers/Russian Phu Quoc.jpg"]
        : ["/hero-hoian-new.png", "/tour/hoian.jpg", "/happy-travelers/Isreal Danang.jpg"],
      label: "Xe riêng · sân bay · gia đình",
    };
  }

  if (destination.includes("Phú Quốc")) {
    return {
      hero: "/tour/phuquoc/tour-01-1.jpg",
      gallery: [
        "/tour/phuquoc/tour-03-2.jpg",
        "/tour/phuquoc/tour-05-3.jpg",
        "/happy-travelers/Russian Phu Quoc.jpg",
      ],
      label: "Phú Quốc",
    };
  }

  return DEFAULT;
}
