export type ItalyVisual={hero:string;gallery:[string,string,string];label:string};

/*
  ITALY v2 IMAGE RULE
  -------------------
  Use only real image assets already used by the GoVietStay main homepage / homepage tour data.
  Do not reuse Russia-landing-specific image selections.
  Do not generate AI images.
*/

const central:ItalyVisual={
  hero:"/tour/coconut.jpg",
  gallery:["/tour/bana.jpg","/tour/coconut.jpg","/tour/cham.jpg"],
  label:"Vietnam centrale"
};

const phu:ItalyVisual={
  hero:"/tour/phuquoc/tour-05-1.jpg",
  gallery:["/tour/phuquoc/tour-05-1.jpg","/tour/phuquoc/tour-05-2.jpg","/tour/phuquoc/tour-05-3.jpg"],
  label:"Phu Quoc"
};

export const italyHubVisuals={
  hero:"/tour/coconut.jpg",
  bana:"/tour/bana.jpg",
  hue:"/tour/hue.jpg",
  cham:"/tour/cham.jpg",
  phu:"/tour/phuquoc/tour-05-1.jpg"
};

/* Real traveler images used by the main homepage traveler section. */
export const italyGuestPhotos=[
  "/travelers/germany.jpg",
  "/travelers/australia.jpg",
  "/travelers/india.jpg",
  "/travelers/korea.jpg",
  "/travelers/kazakhstan.jpg",
  "/travelers/india-2.jpg"
];

export function getItalyVisual(slug:string,destination:string):ItalyVisual{
  if(slug.includes("ba-na")){
    return{
      hero:"/tour/bana.jpg",
      gallery:["/tour/bana.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],
      label:"Bà Nà Hills"
    };
  }

  if(slug.includes("cham")){
    return{
      hero:"/tour/cham.jpg",
      gallery:["/tour/cham.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],
      label:"Isole Cham"
    };
  }

  if(slug.includes("hoi-an")||slug.includes("cocco")||slug.includes("my-son")){
    return{
      hero:"/tour/coconut.jpg",
      gallery:["/tour/coconut.jpg","/hero-hoian-new.png","/travelers/germany.jpg"],
      label:"Hoi An"
    };
  }

  if(slug.includes("hue")){
    return{
      hero:"/tour/hue.jpg",
      gallery:["/tour/hue.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],
      label:"Hue"
    };
  }

  if(slug.includes("tour-3-isole")){
    return{
      hero:"/tour/phuquoc/tour-05-1.jpg",
      gallery:["/tour/phuquoc/tour-05-1.jpg","/tour/phuquoc/tour-05-2.jpg","/tour/phuquoc/tour-05-3.jpg"],
      label:"Phu Quoc · 3 isole"
    };
  }

  if(slug.includes("tour-4-isole")){
    return{
      hero:"/tour/phuquoc/tour-06-1.jpg",
      gallery:["/tour/phuquoc/tour-06-1.jpg","/tour/phuquoc/tour-06-2.jpg","/tour/phuquoc/tour-06-3.jpg"],
      label:"Phu Quoc · 4 isole + Hon Thom"
    };
  }

  if(slug.includes("phu-quoc")||destination.includes("Phu Quoc")){
    return{
      hero:"/tour/phuquoc/tour-01-1.jpg",
      gallery:["/tour/phuquoc/tour-01-1.jpg","/tour/phuquoc/tour-03-1.jpg","/tour/phuquoc/tour-05-1.jpg"],
      label:"Phu Quoc"
    };
  }

  return central;
}
