export type ItalyVisual={hero:string;gallery:[string,string,string];label:string};

const central:ItalyVisual={
  hero:"/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  gallery:["/happy-travelers/Russian Banahill.jpg","/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp","/tour/cham-island/guest-on-island.jpg"],
  label:"Vietnam centrale"
};
const phu:ItalyVisual={
  hero:"/tour/phuquoc/tour-01-1.jpg",
  gallery:["/tour/phuquoc/tour-03-2.jpg","/tour/phuquoc/tour-05-3.jpg","/happy-travelers/Russian Phu Quoc.jpg"],
  label:"Phu Quoc"
};

export const italyHubVisuals={
  hero:"/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  bana:"/tour/bana.jpg",
  hue:"/tour/hue.jpg",
  cham:"/tour/cham-island/guest-on-island.jpg",
  phu:"/tour/phuquoc/tour-01-1.jpg"
};

export const italyGuestPhotos=[
  "/happy-travelers/Russian Banahill.jpg",
  "/tour/cham-island/guest-on-island.jpg",
  "/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp",
  "/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",
  "/happy-travelers/Russian Phu Quoc.jpg"
];

export function getItalyVisual(slug:string,destination:string):ItalyVisual{
  if(slug.includes("ba-na"))return{hero:"/tour/bana.jpg",gallery:["/happy-travelers/Russian Banahill.jpg","/tour/ba-na-hills/reviews/ryan-google.png","/tour/ba-na-hills/reviews/dariga-google.png"],label:"Bà Nà Hills"};
  if(slug.includes("cham"))return{hero:"/tour/cham-island/guest-on-island.jpg",gallery:["/tour/cham-island/guest-pickup.jpg","/tour/cham.jpg","/happy-travelers/02e412c4c634476a1e258.jpg"],label:"Isole Cham"};
  if(slug.includes("hoi-an")||slug.includes("cocco")||slug.includes("my-son"))return{hero:"/tour/hoi-an-coconut-forest/gallery/lantern-boat-guests.webp",gallery:["/tour/hoi-an-coconut-forest/gallery/basket-boat-guests.webp","/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp","/hero-hoian-new.png"],label:"Hoi An"};
  if(slug.includes("hue"))return{hero:"/tour/hue.jpg",gallery:["/tour/haivan.jpg","/tour/huebytrain.jpg","/happy-travelers/Isreal Danang.jpg"],label:"Hue"};
  if(slug.includes("phu-quoc")||destination.includes("Phu Quoc"))return phu;
  return central;
}
