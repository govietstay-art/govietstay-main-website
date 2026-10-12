/** Use verified existing GoVietStay destination media, not one unrelated image for every article. */
export function getIndiaSeoVisual(slug:string):string {
 if(slug.includes("airport-transfer"))return "/tour/bana.jpg";
 if(slug.includes("cham-island"))return "/tour/cham.jpg";
 if(slug.includes("honeymoon")||slug.includes("basket-boat"))return "/hero-hoian-new.png";
 if(slug.includes("ba-na"))return "/tour/bana.jpg";
 if(slug.includes("food"))return "/tour/coconut.jpg";
 return "/tour/bana.jpg";
}
