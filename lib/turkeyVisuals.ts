export type TurkeyVisual = {
  hero: string;
  label: string;
  gallery: [string, string, string];
};

export const turkeyHubVisuals = {
  heroSupport: "/travelers/germany.jpg",
  heroSea: "/tour/phuquoc/tour-05-1.jpg",
  daNang: "/tour/bana.jpg",
  hoiAn: "/tour/coconut.jpg",
  hue: "/tour/hue.jpg",
  cham: "/tour/cham.jpg",
  phuQuoc: "/tour/phuquoc/tour-05-1.jpg",
};

export const turkeyGuestPhotos = [
  "/travelers/germany.jpg",
  "/travelers/australia.jpg",
  "/travelers/india.jpg",
  "/travelers/korea.jpg",
  "/travelers/kazakhstan.jpg",
  "/travelers/india-2.jpg",
];

export function getTurkeyVisual(slug: string): TurkeyVisual {
  if (slug.includes("e-vize")) {
    return {
      hero: "/travelers/germany.jpg",
      label: "Vietnam e-vize",
      gallery: ["/travelers/germany.jpg", "/tour/bana.jpg", "/tour/coconut.jpg"],
    };
  }
  if (slug.includes("da-nang")) {
    return {
      hero: "/tour/bana.jpg",
      label: "Da Nang",
      gallery: ["/tour/bana.jpg", "/tour/coconut.jpg", "/tour/cham.jpg"],
    };
  }
  if (slug.includes("ba-na")) {
    return {
      hero: "/tour/bana.jpg",
      label: "Bà Nà Hills",
      gallery: ["/tour/bana.jpg", "/travelers/australia.jpg", "/tour/coconut.jpg"],
    };
  }
  if (slug.includes("hoi-an")) {
    return {
      hero: "/tour/coconut.jpg",
      label: "Hoi An",
      gallery: ["/tour/coconut.jpg", "/hero-hoian-new.png", "/travelers/germany.jpg"],
    };
  }
  if (slug.includes("ozel")) {
    return {
      hero: "/travelers/germany.jpg",
      label: "Özel tur",
      gallery: ["/travelers/germany.jpg", "/tour/hue.jpg", "/tour/phuquoc/tour-05-1.jpg"],
    };
  }
  return {
    hero: "/tour/phuquoc/tour-05-1.jpg",
    label: "Vietnam",
    gallery: ["/tour/phuquoc/tour-05-1.jpg", "/tour/bana.jpg", "/tour/coconut.jpg"],
  };
}
