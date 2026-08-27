export function getIsraelVisual(slug:string,destination:string){
 if(slug.includes("bana"))return{hero:"/tour/bana.jpg",gallery:["/tour/bana.jpg","/travelers/germany.jpg","/travelers/australia.jpg"]};
 if(slug.includes("cham"))return{hero:"/tour/cham.jpg",gallery:["/tour/cham.jpg","/travelers/australia.jpg","/travelers/germany.jpg"]};
 if(slug.includes("hoi-an")||slug.includes("coconut")||slug.includes("my-son"))return{hero:"/tour/coconut.jpg",gallery:["/tour/coconut.jpg","/hero-hoian-new.png","/travelers/germany.jpg"]};
 if(slug.includes("hue"))return{hero:"/tour/hue.jpg",gallery:["/tour/hue.jpg","/travelers/australia.jpg","/travelers/germany.jpg"]};
 if(slug.includes("phu-quoc-3"))return{hero:"/tour/phuquoc/tour-05-1.jpg",gallery:["/tour/phuquoc/tour-05-1.jpg","/tour/phuquoc/tour-05-2.jpg","/tour/phuquoc/tour-05-3.jpg"]};
 if(slug.includes("phu-quoc-4"))return{hero:"/tour/phuquoc/tour-06-1.jpg",gallery:["/tour/phuquoc/tour-06-1.jpg","/tour/phuquoc/tour-06-2.jpg","/tour/phuquoc/tour-06-3.jpg"]};
 if(slug.includes("phu-quoc")||destination.includes("פו קווק"))return{hero:"/tour/phuquoc/tour-01-1.jpg",gallery:["/tour/phuquoc/tour-01-1.jpg","/tour/phuquoc/tour-03-1.jpg","/tour/phuquoc/tour-05-1.jpg"]};
 return{hero:"/tour/coconut.jpg",gallery:["/tour/bana.jpg","/tour/coconut.jpg","/tour/cham.jpg"]};
}
export const israelGuests=["/travelers/germany.jpg","/travelers/australia.jpg","/travelers/india.jpg","/travelers/korea.jpg","/travelers/kazakhstan.jpg"];