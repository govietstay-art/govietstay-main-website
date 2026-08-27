export type ChinaVisual={hero:string;gallery:[string,string,string];label:string};

/*
  CHINA v2 IMAGE RULE
  -------------------
  Use only real image assets already used by the GoVietStay main homepage / homepage tour data.
  No AI images.
  No Russia-landing-specific visual selection.
*/

const danang:ChinaVisual={
  hero:"/tour/coconut.jpg",
  gallery:["/tour/bana.jpg","/tour/coconut.jpg","/tour/cham.jpg"],
  label:"岘港 · 会安"
};

const phu:ChinaVisual={
  hero:"/tour/phuquoc/tour-05-1.jpg",
  gallery:["/tour/phuquoc/tour-05-1.jpg","/tour/phuquoc/tour-05-2.jpg","/tour/phuquoc/tour-05-3.jpg"],
  label:"富国岛"
};

export const chinaHubVisuals={
  main:"/tour/coconut.jpg",
  hoiAn:"/tour/coconut.jpg",
  cham:"/tour/cham.jpg",
  phu:"/tour/phuquoc/tour-05-1.jpg"
};

/* Real traveler images used by the main homepage traveler section. */
export const chinaGuestPhotos=[
  "/travelers/germany.jpg",
  "/travelers/australia.jpg",
  "/travelers/india.jpg",
  "/travelers/korea.jpg",
  "/travelers/kazakhstan.jpg",
  "/travelers/india-2.jpg"
];

export function getChinaVisual(slug:string,destination:string):ChinaVisual{
  if(slug.includes("ba-na")){
    return{
      hero:"/tour/bana.jpg",
      gallery:["/tour/bana.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],
      label:"巴拿山"
    };
  }

  if(slug.includes("cham")){
    return{
      hero:"/tour/cham.jpg",
      gallery:["/tour/cham.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],
      label:"占岛"
    };
  }

  if(slug.includes("hoi-an")||slug.includes("food")||slug.includes("spa")){
    return{
      hero:"/tour/coconut.jpg",
      gallery:["/tour/coconut.jpg","/hero-hoian-new.png","/travelers/germany.jpg"],
      label:"会安 · 岘港"
    };
  }

  if(slug.includes("hue")){
    return{
      hero:"/tour/hue.jpg",
      gallery:["/tour/hue.jpg","/travelers/australia.jpg","/travelers/germany.jpg"],
      label:"顺化"
    };
  }

  if(slug.includes("phu-quoc-three-islands")){
    return{
      hero:"/tour/phuquoc/tour-05-1.jpg",
      gallery:["/tour/phuquoc/tour-05-1.jpg","/tour/phuquoc/tour-05-2.jpg","/tour/phuquoc/tour-05-3.jpg"],
      label:"富国岛三岛"
    };
  }

  if(slug.includes("phu-quoc-four-islands-hon-thom")){
    return{
      hero:"/tour/phuquoc/tour-06-1.jpg",
      gallery:["/tour/phuquoc/tour-06-1.jpg","/tour/phuquoc/tour-06-2.jpg","/tour/phuquoc/tour-06-3.jpg"],
      label:"富国岛四岛 · 香岛"
    };
  }

  if(slug.includes("sunset-town")){
    return{
      hero:"/tour/phuquoc/tour-07-1.jpg",
      gallery:["/tour/phuquoc/tour-07-1.jpg","/tour/phuquoc/tour-07-2.jpg","/tour/phuquoc/tour-07-3.jpg"],
      label:"富国岛日落小镇"
    };
  }

  if(slug.includes("phu-quoc")||destination.includes("富国岛")){
    return{
      hero:"/tour/phuquoc/tour-01-1.jpg",
      gallery:["/tour/phuquoc/tour-01-1.jpg","/tour/phuquoc/tour-03-1.jpg","/tour/phuquoc/tour-05-1.jpg"],
      label:"富国岛"
    };
  }

  return danang;
}
