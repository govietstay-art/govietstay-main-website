export type TurkeyVisual={hero:string;gallery:[string,string,string];label:string};

const central:TurkeyVisual={
  hero:"/tour/coconut.jpg",
  gallery:["/tour/bana.jpg","/tour/coconut.jpg","/tour/hue.jpg"],
  label:"Orta Vietnam"
};

export const turkeyHubVisuals={
  hero:"/tour/coconut.jpg",
  bana:"/tour/bana.jpg",
  hoiAn:"/tour/coconut.jpg",
  hue:"/tour/hue.jpg",
  cham:"/tour/cham.jpg",
  phu:"/tour/phuquoc/tour-05-1.jpg"
};

export const turkeyGuestPhotos=[
  "/travelers/germany.jpg",
  "/travelers/australia.jpg",
  "/travelers/india.jpg",
  "/travelers/korea.jpg",
  "/travelers/kazakhstan.jpg",
  "/travelers/india-2.jpg"
];

export function getTurkeyVisual(slug:string,destination:string):TurkeyVisual{
  if(slug.includes("ba-na")){
    return{hero:"/tour/bana.jpg",gallery:["/tour/bana.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],label:"Bà Nà Hills"};
  }
  if(slug.includes("hoi-an")||slug.includes("hindistan-cevizi")){
    return{hero:"/tour/coconut.jpg",gallery:["/tour/coconut.jpg","/hero-hoian-new.png","/travelers/germany.jpg"],label:"Hoi An"};
  }
  if(slug.includes("e-vize")){
    return{hero:"/tour/coconut.jpg",gallery:["/hero-hoian-new.png","/tour/bana.jpg","/travelers/germany.jpg"],label:"Vietnam seyahati"};
  }
  if(slug.includes("ozel")){
    return{hero:"/tour/hue.jpg",gallery:["/tour/hue.jpg","/tour/cham.jpg","/tour/phuquoc/tour-05-1.jpg"],label:"Özel Vietnam turu"};
  }
  if(slug.includes("da-nang")){
    return{hero:"/tour/coconut.jpg",gallery:["/tour/bana.jpg","/tour/coconut.jpg","/tour/cham.jpg"],label:"Da Nang"};
  }
  if(destination.includes("Phu Quoc")){
    return{hero:"/tour/phuquoc/tour-05-1.jpg",gallery:["/tour/phuquoc/tour-05-1.jpg","/tour/phuquoc/tour-05-2.jpg","/tour/phuquoc/tour-05-3.jpg"],label:"Phu Quoc"};
  }
  return central;
}
