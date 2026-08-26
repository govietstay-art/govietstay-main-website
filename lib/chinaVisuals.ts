export type ChinaVisual={hero:string;gallery:[string,string,string];label:string};

const danang:ChinaVisual={
  hero:"/tour/bana.jpg",
  gallery:["/happy-travelers/Russian Banahill.jpg","/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp","/tour/cham-island/guest-on-island.jpg"],
  label:"岘港 · 会安"
};
const phu:ChinaVisual={
  hero:"/tour/phuquoc/tour-01-1.jpg",
  gallery:["/tour/phuquoc/tour-03-2.jpg","/tour/phuquoc/tour-05-3.jpg","/happy-travelers/Russian Phu Quoc.jpg"],
  label:"富国岛"
};

export const chinaHubVisuals={
  main:"/tour/bana.jpg",
  hoiAn:"/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  cham:"/tour/cham-island/guest-on-island.jpg",
  phu:"/tour/phuquoc/tour-01-1.jpg"
};

export const chinaGuestPhotos=[
  "/happy-travelers/Russian Banahill.jpg",
  "/tour/cham-island/guest-on-island.jpg",
  "/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp",
  "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  "/happy-travelers/Russian Phu Quoc.jpg"
];

export function getChinaVisual(slug:string,destination:string):ChinaVisual{
  if(slug.includes("ba-na"))return{hero:"/tour/bana.jpg",gallery:["/happy-travelers/Russian Banahill.jpg","/tour/ba-na-hills/reviews/ryan-google.png","/tour/ba-na-hills/reviews/dariga-google.png"],label:"巴拿山"};
  if(slug.includes("cham"))return{hero:"/tour/cham-island/guest-on-island.jpg",gallery:["/tour/cham-island/guest-pickup.jpg","/tour/cham.jpg","/happy-travelers/02e412c4c634476a1e258.jpg"],label:"占岛"};
  if(slug.includes("hoi-an")||slug.includes("food")||slug.includes("spa"))return{hero:"/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",gallery:["/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp","/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp","/hero-hoian-new.png"],label:"会安 · 岘港"};
  if(slug.includes("hue"))return{hero:"/tour/hue.jpg",gallery:["/tour/haivan.jpg","/tour/huebytrain.jpg","/happy-travelers/Isreal Danang.jpg"],label:"顺化"};
  if(slug.includes("phu-quoc")||destination.includes("富国岛"))return phu;
  return danang;
}
