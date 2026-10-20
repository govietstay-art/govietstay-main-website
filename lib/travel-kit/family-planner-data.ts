import type { Lang } from "./types";

export type FamilyDestination = "danang" | "coast" | "heritage" | "phuquoc";
export type FamilyCity = "Da Nang" | "Hoi An" | "Hue" | "Phu Quoc";
export type Interest = "culture" | "food" | "nature" | "family";
export type Pace = "easy" | "balanced" | "active";
export type FoodStyle = "local" | "mixed" | "international";
export type FoodDiet = "any" | "vegetarian" | "no-seafood";
export type Localized = Record<Lang, string>;
export const tr = (v:Localized,lang:Lang) => v[lang];

export type FoodListing = {
  id:string; city:FamilyCity; name:string; address:string; category:"local"|"international";
  description:Localized;
  guideSource:"/local-food" | "editorial";
  /** Future paid placements must be manually verified and explicitly disclosed. No active sponsors yet. */
  sponsorship?: { active:boolean; campaignId:string; disclosure:Localized };
};
export const FOOD_LISTINGS:FoodListing[] = [
  {id:"da-nang-mi-quang",city:"Da Nang",name:"Mỳ Quảng Sứa Hồng Vân",address:"59 Lê Hồng Phong, Hải Châu, Đà Nẵng",category:"local",guideSource:"/local-food",
    description:{en:"A place to explore mì Quảng, a signature regional noodle dish.",ru:"Здесь можно попробовать местную лапшу ми куанг.",it:"Un locale dove scoprire il mì Quảng, tipica specialità regionale."}},
  {id:"da-nang-banh-xeo",city:"Da Nang",name:"Bánh Xèo Bà Dưỡng",address:"K280/23 Hoàng Diệu, Hải Châu, Đà Nẵng",category:"local",guideSource:"/local-food",
    description:{en:"Known for crispy Vietnamese pancakes in an alley setting.",ru:"Хрустящие вьетнамские блинчики в переулке.",it:"Frittelle vietnamite croccanti in un vicolo tipico."}},
  {id:"da-nang-cho-con",city:"Da Nang",name:"Chợ Cồn",address:"290 Hùng Vương, Hải Châu, Đà Nẵng",category:"local",guideSource:"/local-food",
    description:{en:"A lively market to discover Central Vietnamese food stalls.",ru:"Оживлённый рынок с блюдами Центрального Вьетнама.",it:"Mercato vivace con specialità del Vietnam centrale."}},
  {id:"da-nang-italian",city:"Da Nang",name:"Limoncello",address:"187 Trần Phú, Hải Châu, Đà Nẵng",category:"international",guideSource:"/local-food",
    description:{en:"An Italian option for families seeking a familiar meal.",ru:"Итальянский вариант для семей, которые хотят знакомую кухню.",it:"Un'opzione italiana per una cena familiare."}},
  {id:"hoi-an-cao-lau",city:"Hoi An",name:"Cao Lầu Thanh",address:"26 Thái Phiên, Hội An",category:"local",guideSource:"/local-food",
    description:{en:"An option for tasting Hoi An's signature cao lầu noodles.",ru:"Попробуйте знаменитую лапшу као лау в Хойане.",it:"Per assaggiare il cao lầu, piatto tipico di Hoi An."}},
  {id:"hoi-an-com-ga",city:"Hoi An",name:"Cơm Gà Bà Buội",address:"22 Phan Châu Trinh, Hội An",category:"local",guideSource:"/local-food",
    description:{en:"A local chicken-rice option near the Old Town.",ru:"Местный вариант куриного риса рядом со Старым городом.",it:"Un indirizzo per il riso con pollo vicino al centro storico."}},
  {id:"hoi-an-white-rose",city:"Hoi An",name:"White Rose Restaurant",address:"533 Hai Bà Trưng, Hội An",category:"local",guideSource:"/local-food",
    description:{en:"Discover the delicate white-rose dumpling associated with Hoi An.",ru:"Попробуйте нежные пельмени «белая роза», характерные для Хойана.",it:"Scopri i delicati ravioli «rosa bianca» di Hoi An."}}
];
export function foodMapUrl(item:FoodListing):string {
  return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(item.name+", "+item.address);
}
export function mealFor(city:FamilyCity,lang:Lang,diet:FoodDiet,style:FoodStyle):{dish:string;detail:string;venue:FoodListing|null} {
  const dishes:Record<FamilyCity,{local:Localized;vegetarian:Localized;noSeafood:Localized;detail:Localized}> = {
    "Da Nang":{
      local:{en:"mì Quảng, bánh xèo or local market dishes",ru:"ми куанг, бань сео или блюда на рынке",it:"mì Quảng, bánh xèo o specialità del mercato"},
      vegetarian:{en:"a vegetarian Vietnamese meal, with ingredients confirmed",ru:"вегетарианское блюдо с проверенным составом",it:"un pasto vegetariano vietnamita, verificando gli ingredienti"},
      noSeafood:{en:"a chicken, pork or vegetarian dish without seafood ingredients",ru:"блюдо из курицы, свинины или овощей без морепродуктов",it:"un piatto di pollo, maiale o verdure senza frutti di mare"},
      detail:{en:"Ask about spice levels, allergies and children's portions before ordering.",ru:"Уточняйте остроту, аллергены и детские порции до заказа.",it:"Chiedi piccantezza, allergeni e porzioni per bambini prima di ordinare."}},
    "Hoi An":{
      local:{en:"cao lầu, chicken rice or white-rose dumplings",ru:"као лау, куриный рис или пельмени «белая роза»",it:"cao lầu, riso con pollo o ravioli «rosa bianca»"},
      vegetarian:{en:"vegetarian noodles or local vegetable dishes, with ingredients confirmed",ru:"вегетарианскую лапшу или овощные блюда с проверенным составом",it:"noodle vegetariani o piatti di verdure, controllando gli ingredienti"},
      noSeafood:{en:"chicken rice or a confirmed seafood-free local dish",ru:"куриный рис или другое блюдо без морепродуктов",it:"riso con pollo o un piatto locale senza frutti di mare"},
      detail:{en:"Allow a relaxed meal away from the hottest part of the day.",ru:"Запланируйте спокойный обед в самое жаркое время дня.",it:"Concediti una pausa pranzo tranquilla nelle ore più calde."}},
    "Hue":{
      local:{en:"bún bò Huế, bánh bèo or other Hue-style specialties",ru:"бун бо Хюэ, бань бео и другие блюда Хюэ",it:"bún bò Huế, bánh bèo e altre specialità di Hue"},
      vegetarian:{en:"Hue-style vegetarian dishes with ingredients confirmed",ru:"вегетарианские блюда Хюэ с проверенным составом",it:"piatti vegetariani di Hue, verificando gli ingredienti"},
      noSeafood:{en:"a confirmed seafood-free Hue-style meal",ru:"блюдо Хюэ без морепродуктов после уточнения ингредиентов",it:"un piatto di Hue senza frutti di mare, dopo aver verificato gli ingredienti"},
      detail:{en:"Hue food can have strong flavors; ask for a milder choice for children.",ru:"В Хюэ яркие вкусы; детям можно попросить менее острое блюдо.",it:"I sapori di Hue sono intensi: chiedi una versione più delicata per i bambini."}},
    "Phu Quoc":{
      local:{en:"bún quậy, fresh island seafood or local street food",ru:"бун куай, свежие морепродукты или уличную кухню острова",it:"bún quậy, frutti di mare freschi o street food dell'isola"},
      vegetarian:{en:"a vegetarian island meal with ingredients confirmed",ru:"вегетарианский обед с проверенным составом",it:"un pasto vegetariano sull'isola, verificando gli ingredienti"},
      noSeafood:{en:"a confirmed seafood-free meal such as rice, vegetables or chicken",ru:"блюдо без морепродуктов, например рис, овощи или курицу",it:"riso, verdure o pollo senza frutti di mare, verificando gli ingredienti"},
      detail:{en:"On the island, check family access, food storage, and transport back to the hotel.",ru:"Проверьте удобство для семьи, свежесть продуктов и обратный транспорт.",it:"Verifica accessibilità per la famiglia, conservazione del cibo e rientro in hotel."}}
  };
  const d=dishes[city];
  const dish=tr(diet==="vegetarian"?d.vegetarian:diet==="no-seafood"?d.noSeafood:d.local,lang);
  const eligible=FOOD_LISTINGS.filter(x=>x.city===city&&(style==="mixed"||x.category===style));
  // Dietary-safe vendors are never inferred from restaurant name or cuisine.
  const venue=diet==="any"?eligible[0]??null:null;
  return {dish,detail:tr(d.detail,lang),venue};
}
export function dayCity(destination:FamilyDestination, duration:number,index:number):FamilyCity {
  if(destination==="phuquoc")return "Phu Quoc";
  if(destination==="danang")return "Da Nang";
  if(index===0||index===duration-1)return "Da Nang";
  if(destination==="coast")return index%2===0?"Hoi An":"Da Nang";
  if(duration<5)return index===1?"Hoi An":"Da Nang";
  if(index===duration-2&&duration>5)return "Hoi An";
  if(index===3)return "Hue";
  if(index===2)return "Hoi An";
  return "Da Nang";
}
type Experience = {heading:Localized;morning:Localized;afternoon:Localized;wet:Localized;transport:Localized};
const E=(en:string,ru:string,it:string):Localized=>({en,ru,it});
const EXPERIENCES:Record<FamilyCity,Record<Interest,Experience[]>> = {
 "Da Nang":{
  culture:[
   {heading:E("Cham culture and the riverside","Культура чамов и набережная","Cultura Cham e lungofiume"),
    morning:E("Visit the Cham Sculpture Museum at a comfortable pace. Pick a few highlights rather than trying to see everything, and let children ask questions about the sculptures.","Посетите музей чамской скульптуры в спокойном темпе. Выберите основные залы и делайте перерывы для детей.","Visita il Museo della Scultura Cham con calma. Scegli alcune opere importanti e lascia ai bambini il tempo di fare domande."),
    afternoon:E("After the meal and a proper rest, take an easy stroll by the Han River. Stop for photos and return to the hotel whenever the family needs a break.","После обеда и отдыха прогуляйтесь вдоль реки Хан, сделайте фото и возвращайтесь в отель, когда потребуется.","Dopo pranzo e una pausa, passeggia lungo il fiume Han. Fermati per le foto e rientra quando la famiglia ne ha bisogno."),
    wet:E("Keep the museum visit and shorten the riverside walk if the weather turns wet.","При дожде оставьте музей и сократите прогулку вдоль реки.","Se piove, mantieni il museo e accorcia la passeggiata sul fiume."),
    transport:E("Short city transfers; a private car is optional, not included.","Короткие переезды по городу; частный автомобиль по желанию, не включён.","Spostamenti brevi; auto privata facoltativa e non inclusa.")},
   {heading:E("Marble Mountains and local stories","Мраморные горы и местные истории","Montagne di Marmo e storie locali"),
    morning:E("Explore a carefully chosen part of the Marble Mountains. Some sections involve many steps and slippery paths; families with toddlers or reduced mobility should choose an easier alternative.","Посетите часть Мраморных гор с учётом лестниц и скользких участков. С маленькими детьми или при ограниченной подвижности выберите более лёгкую программу.","Scopri una parte selezionata delle Montagne di Marmo. Ci sono scale e sentieri scivolosi; con bambini piccoli o mobilità ridotta scegli un'alternativa."),
    afternoon:E("Enjoy a long lunch break and a gentle coastal drive or time back at your hotel rather than adding another strenuous climb.","После продолжительного обеда выберите лёгкую поездку вдоль побережья или отдых в отеле вместо новой нагрузки.","Dopo un pranzo lungo, scegli un giro panoramico sulla costa o riposo in hotel invece di un'altra salita."),
    wet:E("Avoid slippery mountain steps; switch to a museum or indoor craft experience.","При дожде избегайте скользких лестниц, лучше музей или мастерская.","Evita le scale scivolose e scegli un museo o laboratorio al coperto."),
    transport:E("Arrange suitable transport and check accessibility before departure.","Заранее уточните трансфер и доступность маршрута.","Organizza il trasporto e verifica l'accessibilità prima di partire.")}
  ],
  food:[{heading:E("Local market flavors","Вкусы местного рынка","Sapori dei mercati locali"),
    morning:E("Discover the atmosphere around a local market and sample a few regional dishes at your family's own pace. Confirm hygiene and ingredients before choosing a stall.","Познакомьтесь с рынком и попробуйте местные блюда в удобном темпе. Проверяйте ингредиенты и условия приготовления.","Scopri il mercato e assaggia qualche specialità con calma. Controlla ingredienti e igiene prima di scegliere."),
    afternoon:E("Choose a shaded café stop after lunch, then try a gentle neighborhood walk or enjoy family time near the river.","После обеда отдохните в кафе в тени, а затем прогуляйтесь по кварталу или у реки.","Dopo pranzo fermati in un caffè all'ombra, poi passeggia in quartiere o lungo il fiume."),
    wet:E("Stay under covered market areas or replace the market with a sit-down restaurant.","Оставайтесь под крышей рынка или выберите ресторан.","Resta nelle zone coperte del mercato o scegli un ristorante."),
    transport:E("Choose a convenient market near your accommodation; transfers are optional.","Выберите рынок недалеко от отеля; трансфер по желанию.","Scegli un mercato comodo rispetto all'hotel; trasferimento facoltativo.")}],
  nature:[{heading:E("Beach, sea breeze and Son Tra views","Пляж и виды Сон Тра","Spiaggia e panorami di Son Tra"),
    morning:E("Spend a gentle morning on My Khe Beach. Stay in designated swimming areas and heed local sea-condition warnings, especially with children.","Проведите спокойное утро на пляже Ми Кхе. Купайтесь только в разрешённых местах и следите за предупреждениями.","Trascorri una mattina tranquilla a My Khe. Nuota solo nelle zone consentite e segui gli avvisi sulle condizioni del mare."),
    afternoon:E("After lunch, enjoy a scenic viewpoint on Son Tra if roads and weather are suitable; otherwise return to the hotel pool or a shaded café.","После обеда при хорошей погоде посетите смотровую площадку Сон Тра, иначе отдохните в отеле или кафе.","Dopo pranzo, se meteo e strada lo permettono, ammira un belvedere a Son Tra; altrimenti riposa in hotel o al caffè."),
    wet:E("Avoid beaches and exposed viewpoints in storms; use a museum or indoor break.","При шторме избегайте пляжей и открытых площадок; выберите музей.","Con temporali evita spiagge e belvedere esposti; scegli un museo."),
    transport:E("Local vehicle recommended for the Son Tra area; check road access.","Для Сон Тра удобнее автомобиль; проверьте доступность дороги.","Per Son Tra è consigliata un'auto; verifica l'accesso stradale.")}],
  family:[{heading:E("An easy day for all generations","Лёгкий день для всей семьи","Una giornata tranquilla per tutti"),
    morning:E("Begin with a short, child-friendly waterfront walk and time for photos. Keep stops close together to avoid tiring younger or older travellers.","Начните с короткой прогулки у воды и фотографий. Не планируйте слишком много далёких остановок.","Inizia con una breve passeggiata sul lungofiume e foto. Tieni le tappe vicine per non stancare bambini e anziani."),
    afternoon:E("Leave the hottest hours free for lunch, naps or pool time, and add an optional museum only if everyone feels rested.","Оставьте жаркие часы для обеда, сна или бассейна; музей только по желанию.","Lascia le ore più calde a pranzo, sonnellino o piscina; il museo è facoltativo."),
    wet:E("Choose an indoor cultural activity and a comfortable lunch spot.","Выберите занятие в помещении и удобный ресторан.","Scegli un'attività al coperto e un ristorante comodo."),
    transport:E("Ask for a family-friendly vehicle and child seats where needed; confirm in advance.","Если нужны детские кресла, запросите и подтвердите их заранее.","Se servono seggiolini, richiedili e confermali in anticipo.")}]
 },
 "Hoi An":{
  culture:[{heading:E("Ancient Town and lantern heritage","Старый город и фонари","Centro storico e lanterne"),
    morning:E("Explore Hoi An Ancient Town on foot, including the Japanese Covered Bridge area. Pause often in the shade and make time for the little shops and heritage streets.","Прогуляйтесь по Старому городу Хойана и району Японского моста. Делайте остановки в тени и осматривайте уютные улочки.","Esplora a piedi il centro storico di Hoi An e il Ponte Giapponese. Fai pause all'ombra e scopri botteghe e vie storiche."),
    afternoon:E("After an unhurried lunch, consider a hands-on lantern or craft workshop. Reserve in advance if you want a private experience for the family.","После спокойного обеда можно посетить мастер-класс по фонарям или ремеслу. Для частного занятия бронируйте заранее.","Dopo pranzo, valuta un laboratorio di lanterne o artigianato. Prenota prima per un'esperienza privata."),
    wet:E("Shorten the outdoor walk and focus on sheltered heritage houses or workshops.","Сократите прогулку, выбрав крытые исторические дома или мастерские.","Riduci la passeggiata esterna e scegli case storiche coperte o laboratori."),
    transport:E("Plan the journey from Da Nang if staying there, and agree the return pickup point.","Если живёте в Дананге, заранее договоритесь о месте обратной встречи.","Se alloggi a Da Nang, concorda prima il punto di rientro.")}],
  food:[{heading:E("Hoi An cooking and local tastes","Кулинарные традиции Хойана","Cucina e sapori di Hoi An"),
    morning:E("Choose a family cooking activity or browse local produce before the busy part of the day. Tell the host about allergies and children's ages in advance.","Выберите семейный кулинарный мастер-класс или рынок. Заранее сообщите об аллергиях и возрасте детей.","Scegli un laboratorio di cucina per famiglie o un mercato. Comunica prima allergie ed età dei bambini."),
    afternoon:E("After tasting regional dishes at lunch, take time for a short rest, then enjoy a relaxed Old Town walk and perhaps a dessert stop.","После знакомства с местной кухней отдохните, затем прогуляйтесь по Старому городу и попробуйте десерт.","Dopo aver assaggiato i piatti locali, riposati e poi passeggia nel centro storico con una sosta dolce."),
    wet:E("A sheltered cooking session works well when rain makes walking uncomfortable.","Кулинарный мастер-класс под крышей отлично подходит для дождя.","Un laboratorio di cucina al coperto è ideale quando piove."),
    transport:E("Transfer from Da Nang can be arranged separately; activity tickets are not included.","Трансфер из Дананга и занятия оплачиваются отдельно.","Trasferimento da Da Nang e attività non inclusi.")}],
  nature:[{heading:E("Tra Que countryside and riverside","Деревня Ча Куэ и река","Campagna di Tra Que e fiume"),
    morning:E("Visit the garden landscapes near Tra Que for a slower look at everyday life. Walking is an easy alternative to cycling for families with younger children.","Побывайте в садах Ча Куэ. С маленькими детьми выбирайте пешую прогулку вместо велосипеда.","Visita gli orti di Tra Que. Con bambini piccoli puoi passeggiare invece di andare in bicicletta."),
    afternoon:E("Take a long lunch break, then return toward the Old Town for a gentle riverside walk and family photos.","После обеда вернитесь в Старый город для спокойной прогулки вдоль реки.","Dopo una pausa pranzo, torna verso il centro storico per una passeggiata lungo il fiume."),
    wet:E("Swap countryside paths for a sheltered craft activity.","В дождь замените сельские тропы крытой мастерской.","Con pioggia sostituisci i sentieri con un laboratorio al coperto."),
    transport:E("Check paths and bicycle suitability first; private driver optional.","Сначала оцените дорожки и безопасность велосипедов; водитель по желанию.","Verifica sentieri e idoneità delle bici; autista facoltativo.")}],
  family:[{heading:E("Hoi An for little explorers","Хойан для детей и взрослых","Hoi An per piccoli esploratori"),
    morning:E("Keep the Old Town visit short and playful, with lantern shops and photo stops. Make a comfortable meeting point for the whole family.","Прогуляйтесь по Старому городу с остановками у фонарей и для фото. Назначьте удобное место встречи.","Visita il centro storico con soste tra lanterne e fotografie. Scegli un punto d'incontro comodo per tutti."),
    afternoon:E("Choose one easy workshop or family activity after a proper lunch break, and let children help decide what to do next.","После обеда выберите одно простое занятие и позвольте детям участвовать в выборе.","Dopo pranzo scegli un solo laboratorio semplice e lascia che i bambini partecipino alla scelta."),
    wet:E("Prefer covered workshops rather than long outdoor walks.","Лучше крытые мастерские, а не длинная прогулка.","Preferisci laboratori coperti alle passeggiate lunghe."),
    transport:E("Arrange an easy drop-off and pickup rather than extended walking between sites.","Выберите удобные точки высадки и посадки.","Organizza fermate comode per arrivo e rientro.")}]
 },
 "Hue":{
  culture:[{heading:E("Hue's Imperial heritage","Императорское наследие Хюэ","Il patrimonio imperiale di Hue"),
    morning:E("Discover a focused part of Hue's Imperial City. The grounds are extensive, so choose a manageable route and take breaks in the shade.","Посетите часть Императорского города Хюэ. Территория большая — выбирайте короткий маршрут и отдыхайте в тени.","Visita una parte selezionata della Città Imperiale di Hue. Gli spazi sono grandi: scegli un percorso gestibile e fai pause all'ombra."),
    afternoon:E("After lunch, enjoy a relaxed heritage street or riverside stop rather than fitting in multiple distant tombs on the same day.","После обеда прогуляйтесь по исторической улице или набережной вместо нескольких далёких гробниц.","Dopo pranzo scegli una passeggiata storica o lungo il fiume invece di aggiungere più tombe lontane."),
    wet:E("Rain can make open courtyards slippery; consider indoor heritage stops or shorten the visit.","При дожде открытые дворы скользкие: сократите посещение или выберите крытые объекты.","Con pioggia i cortili diventano scivolosi: accorcia la visita o scegli tappe coperte."),
    transport:E("Hue is a substantial journey from Da Nang. A separate driver and an early start may be helpful.","Переезд из Дананга в Хюэ долгий. Возможно, удобнее отдельный водитель и ранний выезд.","Da Nang–Hue richiede un viaggio lungo: valuta un autista e una partenza anticipata.")}],
  food:[{heading:E("A taste of Hue and the riverside","Вкусы Хюэ и набережная","Sapori di Hue e lungofiume"),
    morning:E("Experience a gentle local-food exploration, looking for regional dishes and a suitable sit-down venue for the family.","Познакомьтесь с кухней Хюэ и найдите удобный ресторан для всей семьи.","Scopri i piatti regionali di Hue e scegli un ristorante confortevole per la famiglia."),
    afternoon:E("After lunch, visit a relaxed riverside spot and keep the rest of the afternoon open for resting or sightseeing nearby.","После обеда отдохните у реки и оставьте свободное время для небольшой прогулки.","Dopo pranzo rilassati sul fiume e lascia il resto del pomeriggio libero per una passeggiata."),
    wet:E("Choose a comfortable indoor restaurant and avoid exposed riverside areas.","Выберите закрытый ресторан и избегайте открытой набережной.","Scegli un ristorante al coperto ed evita aree esposte sul fiume."),
    transport:E("Plan additional travel time if coming from Da Nang; no restaurant reservation is included.","Учитывайте дорогу из Дананга; бронирование ресторана не включено.","Considera il trasferimento da Da Nang; nessuna prenotazione inclusa.")}],
  nature:[{heading:E("A gentle Hue riverside day","Спокойный день у реки в Хюэ","Hue lungo il fiume con calma"),
    morning:E("Explore a pleasant section of the Perfume River promenade, with time for photos and small stops rather than a rushed tour.","Прогуляйтесь вдоль Ароматной реки, делайте фото и небольшие остановки.","Passeggia lungo il Fiume dei Profumi, con foto e piccole soste senza fretta."),
    afternoon:E("Choose a garden-house area or a quiet cultural stop after lunch, depending on weather and the family's energy.","После обеда выберите садовый дом или тихое культурное место в зависимости от погоды и сил семьи.","Dopo pranzo scegli una casa-giardino o una tappa culturale tranquilla in base al tempo e alle energie."),
    wet:E("Replace open-air activities with a sheltered heritage stop.","В дождь замените прогулки крытым культурным объектом.","Con pioggia sostituisci le passeggiate con una tappa coperta."),
    transport:E("Check return transport to Da Nang or stay overnight if preferred.","Уточните обратный транспорт в Дананг или ночёвку.","Organizza il rientro a Da Nang oppure una notte a Hue.")}],
  family:[{heading:E("Hue at a family-friendly pace","Хюэ в семейном темпе","Hue a misura di famiglia"),
    morning:E("Choose a short Imperial City route with frequent rests. Bring water and consider avoiding the hottest hours with young children.","Пройдите короткий маршрут Императорского города с частыми паузами. Возьмите воду и избегайте жары.","Scegli un percorso breve nella Città Imperiale con frequenti pause, acqua e attenzione al caldo."),
    afternoon:E("Enjoy a family lunch and one easy riverside stop, leaving the schedule open rather than pushing for extra monuments.","После семейного обеда выберите одну спокойную остановку у реки, не перегружая день.","Dopo il pranzo in famiglia scegli una sola tappa sul fiume, senza riempire troppo la giornata."),
    wet:E("Look for indoor options and avoid slippery courtyards.","Ищите крытые варианты и избегайте скользких дворов.","Scegli attività al coperto ed evita cortili scivolosi."),
    transport:E("For a Da Nang day trip, allow ample time for the long drive and breaks.","Для поездки из Дананга выделите достаточно времени на дорогу и остановки.","Da Da Nang calcola tempi abbondanti per tragitto e soste.")}]
 },
 "Phu Quoc":{
  culture:[{heading:E("Duong Dong and island life","Зыонг Донг и жизнь острова","Duong Dong e vita dell'isola"),
    morning:E("Explore a manageable part of Duong Dong town and the Dinh Cau area, noticing everyday island life without rushing between distant stops.","Побывайте в Зыонг Донг и районе Динь Кау, наблюдая за жизнью острова без спешки.","Esplora Duong Dong e l'area di Dinh Cau, scoprendo la vita dell'isola senza fretta."),
    afternoon:E("After a local lunch and a hotel break, enjoy a gentle coastal stroll where public access and weather permit.","После обеда и отдыха прогуляйтесь вдоль побережья, если погода и доступ позволяют.","Dopo pranzo e una pausa in hotel, passeggia sul mare se meteo e accesso lo consentono."),
    wet:E("Keep to sheltered town stops and skip slippery rocks or exposed shorelines.","При дожде выбирайте крытые места в городе, избегайте скользких камней и берега.","Con pioggia resta in città al coperto ed evita rocce e coste esposte."),
    transport:E("Distances across the island can be long: group stops by area and plan your return.","Расстояния по острову большие: объединяйте близкие остановки и продумайте возвращение.","Le distanze sull'isola sono importanti: raggruppa le tappe e organizza il rientro.")}],
  food:[{heading:E("Phu Quoc island flavors","Островные вкусы Фукуока","Sapori dell'isola di Phu Quoc"),
    morning:E("Browse a local food area in Duong Dong and learn about Phu Quoc specialties. Keep a flexible schedule and confirm ingredients before tasting unfamiliar dishes.","Прогуляйтесь по гастрономическим местам Зыонг Донга, познакомьтесь с блюдами Фукуока и уточняйте ингредиенты.","Esplora i sapori locali di Duong Dong, scopri le specialità di Phu Quoc e verifica gli ingredienti."),
    afternoon:E("Enjoy an unhurried lunch and then take a hotel rest before an optional sunset outing, weather permitting.","После обеда отдохните в отеле, а позже, если погода позволяет, встретьте закат.","Dopo un pranzo tranquillo riposa in hotel, poi valuta un'uscita al tramonto se il tempo permette."),
    wet:E("Avoid open-air food areas during heavy rain; choose an established indoor venue.","При сильном дожде избегайте открытых фуд-кортов, выбирайте помещение.","Con forti piogge evita mercati all'aperto e scegli locali al coperto."),
    transport:E("Stay within one area per half-day to reduce travel fatigue.","Планируйте одну зону на полдня, чтобы меньше ездить.","Resta nella stessa zona per mezza giornata per ridurre gli spostamenti.")}],
  nature:[{heading:E("A peaceful Phu Quoc beach day","Спокойный пляжный день на Фукуоке","Una giornata tranquilla in spiaggia a Phu Quoc"),
    morning:E("Choose a suitable accessible beach, such as the Sao Beach area if conditions allow. Children should only swim where sea conditions and local guidance make it safe.","Выберите подходящий пляж, например район Бай Сао, если погода позволяет. Купание детей — только в безопасных условиях.","Scegli una spiaggia adatta, come la zona di Sao Beach se il meteo lo consente. I bambini nuotano solo in condizioni sicure."),
    afternoon:E("After lunch, enjoy quiet beach time in the shade or return to the hotel pool. Water excursions are optional and require safety and weather checks.","После обеда отдохните в тени на пляже или у бассейна. Морские экскурсии только после проверки погоды и безопасности.","Dopo pranzo riposa all'ombra o in piscina. Le escursioni in mare sono facoltative e richiedono verifiche meteo e sicurezza."),
    wet:E("Do not schedule boat trips, swimming or exposed beaches during dangerous weather; choose indoor activities.","В опасную погоду не планируйте лодки, плавание и открытые пляжи — выберите занятия внутри.","Con meteo pericoloso evita barche, nuoto e spiagge esposte; scegli attività al coperto."),
    transport:E("Confirm beach access and travel time from your hotel before choosing a driver.","Уточните дорогу и доступ на пляж перед заказом машины.","Verifica accesso e percorso dalla struttura prima di scegliere un autista.")}],
  family:[{heading:E("Slow island moments for the whole family","Спокойный островной отдых для семьи","Momenti tranquilli sull'isola"),
    morning:E("Start with a relaxed beachfront morning, shade breaks and time for children to play. Avoid overloading the first full day.","Начните с спокойного утра на пляже, перерывов в тени и игр с детьми. Не перегружайте день.","Inizia con calma vicino al mare, pause all'ombra e tempo per i bambini. Evita una giornata troppo piena."),
    afternoon:E("After lunch choose hotel pool time, an easy coastal viewpoint or a brief town stop, based on everyone's energy.","После обеда выберите бассейн, смотровую площадку или короткую прогулку по городу по настроению.","Dopo pranzo scegli piscina, un belvedere o una breve visita in città secondo le energie di tutti."),
    wet:E("Choose a sheltered café, hotel activities or a dry indoor alternative.","Выберите кафе, развлечения в отеле или крытую альтернативу.","Scegli un caffè coperto, attività in hotel o un'opzione al chiuso."),
    transport:E("Avoid long back-and-forth driving across the island with small children.","С маленькими детьми избегайте длинных переездов туда-обратно.","Con bambini piccoli evita lunghi spostamenti avanti e indietro.")}]
 }
};
export type PlannerChoices = {destination:FamilyDestination;duration:3|5|7|10;adults:number;children:number;seniors:boolean;pace:Pace;interest:Interest;foodStyle:FoodStyle;diet:FoodDiet;startDate:string};
export type RichDay = {city:FamilyCity;dayTitle:string;overview:string;morning:string;lunch:string;afternoon:string;evening:string;note:string;transport:string;food:{dish:string;detail:string;venue:FoodListing|null}};
export function buildFamilyItinerary(input:PlannerChoices,lang:Lang):RichDay[] {
 const langs:{
  [K in Lang]:{arrival:string;departure:string;arrivalNote:string;departureNote:string;overview:(place:string,pace:string,group:string)=>string;family:string;older:string;early:string;last:string;evening:string;sunset:string;lunch:string;transportArrival:string;transportDeparture:string;weather:string;easy:string;balanced:string;active:string;child:string;senior:string;near:string;check:string}
 } = {
 en:{
  arrival:"Arrive, settle in and feel at home",departure:"An easy farewell and your onward journey",
  arrivalNote:"Keep the arrival day light. Allow time for the airport, getting to your accommodation, check-in, food and rest.",
  departureNote:"Allow extra time for traffic, luggage, airport check-in and unexpected delays. Avoid prepaid activities close to your flight.",
  overview:(place,pace,group)=>"A private-tour-style day in "+place+" for "+group+". "+pace+" Every stop is a suggestion: you decide what to keep, change or skip.",
  family:"your family",older:"a multi-generation family",early:"Your first day is for recovery after travelling.",
  last:"The last day is built around your transfer, not a tight sightseeing schedule.",
  evening:"Choose an easy evening walk near your accommodation, with time for photos and a flexible return.",
  sunset:"If weather permits, enjoy the sunset or a calm waterfront walk after a relaxed dinner.",
  lunch:"Enjoy an unhurried lunch featuring ",transportArrival:"Airport pickup or local transfer can be requested separately. Confirm child seats if needed.",
  transportDeparture:"Arrange a suitable vehicle and confirm departure details in advance.",
  weather:"Adapt the day to real weather, opening conditions and the family's energy.",
  easy:"Expect one main experience, a long lunch break and space to rest.",
  balanced:"Enjoy a balanced day with a main attraction and a gentle second stop.",
  active:"Explore at a fuller pace but keep rest and family needs in mind.",
  child:"Make time for toilets, shade and snacks; never assume every activity is suitable for young children.",
  senior:"Choose accessible routes, frequent seated breaks and minimal stairs where possible.",
  near:"Dinner can be close to the hotel; no venue is booked.",
  check:"Check operating hours, menus, travel conditions and accessibility before leaving."
 },
 ru:{
  arrival:"Приезд, размещение и спокойный отдых",departure:"Спокойное завершение поездки",
  arrivalNote:"Не перегружайте день прилёта: дорога, заселение, еда и отдых требуют времени.",
  departureNote:"Заложите запас времени на дорогу, багаж, регистрацию в аэропорту и задержки.",
  overview:(place,pace,group)=>"Индивидуальный семейный маршрут в "+place+" для "+group+". "+pace+" Любые остановки можно заменить или пропустить.",
  family:"вашей семьи",older:"семьи разных поколений",early:"Первый день посвятите восстановлению после дороги.",
  last:"Последний день зависит от трансфера, а не от плотной экскурсионной программы.",
  evening:"Выберите спокойную вечернюю прогулку рядом с отелем, фотографии и свободное время.",
  sunset:"Если погода позволяет, посмотрите закат или прогуляйтесь у воды после ужина.",
  lunch:"Неспешно пообедайте, попробовав ",transportArrival:"Трансфер из аэропорта можно заказать отдельно. При необходимости уточните детские кресла.",
  transportDeparture:"Договоритесь об удобном автомобиле и заранее подтвердите время отправления.",
  weather:"Учитывайте настоящую погоду, часы работы и силы участников.",
  easy:"Одна основная экскурсия, длинный обед и достаточно отдыха.",
  balanced:"Основная достопримечательность и ещё одна спокойная остановка.",
  active:"Активнее исследуйте город, не забывая об отдыхе и семье.",
  child:"Планируйте туалет, тень и перекусы; проверяйте пригодность занятий для детей.",
  senior:"Выбирайте доступные маршруты, больше пауз сидя и меньше лестниц.",
  near:"Ужин возможен рядом с отелем; бронирования нет.",
  check:"Уточняйте расписание, меню, дорогу и доступность заранее."
 },
 it:{
  arrival:"Arrivo, sistemazione e un inizio tranquillo",departure:"Un saluto rilassato e la partenza",
  arrivalNote:"Mantieni leggero il giorno di arrivo: aeroporto, trasferimento, check-in, cibo e riposo richiedono tempo.",
  departureNote:"Lascia tempo per traffico, bagagli, check-in in aeroporto e imprevisti.",
  overview:(place,pace,group)=>"Una giornata in stile tour privato a "+place+" per "+group+". "+pace+" Ogni tappa è facoltativa e modificabile.",
  family:"la tua famiglia",older:"una famiglia di più generazioni",early:"Il primo giorno è dedicato al recupero dopo il viaggio.",
  last:"L'ultimo giorno ruota attorno al trasferimento, non a un programma troppo fitto.",
  evening:"Scegli una passeggiata serale comoda vicino all'alloggio, con foto e rientro flessibile.",
  sunset:"Se il meteo permette, ammira il tramonto o fai una passeggiata sul lungomare dopo cena.",
  lunch:"Pranzo senza fretta, assaggiando ",transportArrival:"Il trasferimento aeroportuale può essere richiesto a parte. Verifica eventuali seggiolini.",
  transportDeparture:"Organizza un mezzo adatto e conferma in anticipo i dettagli della partenza.",
  weather:"Adatta la giornata al meteo reale, agli orari di apertura e alle energie di tutti.",
  easy:"Una sola esperienza importante, pranzo lungo e tempo per riposare.",
  balanced:"Attrazione principale e una seconda tappa leggera.",
  active:"Programma più attivo, sempre con pause e attenzione alla famiglia.",
  child:"Prevedi bagni, ombra e spuntini; verifica sempre l'idoneità delle attività ai bambini.",
  senior:"Preferisci percorsi accessibili, soste seduti e poche scale.",
  near:"Cena vicino all'hotel, senza alcuna prenotazione.",
  check:"Controlla sempre orari, menù, strada e accessibilità."
 }};
 const c=langs[lang];const group=input.seniors?c.older:c.family;
 const pace=input.seniors?c.easy:input.pace==="easy"?c.easy:input.pace==="balanced"?c.balanced:c.active;
 return Array.from({length:input.duration},(_,i)=>{
  const city=dayCity(input.destination,input.duration,i);
  const arrival=i===0,departure=i===input.duration-1;
  const examples=EXPERIENCES[city][input.interest];const activity=examples[(i+input.duration)%examples.length];
  const meal=mealFor(city,lang,input.diet,input.foodStyle);
  const evening=arrival||departure?c.near:i%2===0?c.sunset:c.evening;
  const familyNote=[c.weather,input.children>0?c.child:"",input.seniors?c.senior:"",!arrival&&!departure?tr(activity.wet,lang):"",c.check].filter(Boolean).join(" ");
  return {
   city,
   dayTitle:arrival?c.arrival:departure?c.departure:tr(activity.heading,lang),
   overview:c.overview(city,pace,group)+" "+(arrival?c.early:departure?c.last:""),
   morning:arrival?c.arrivalNote:departure?c.departureNote:tr(activity.morning,lang),
   lunch:c.lunch+meal.dish+". "+meal.detail,
   afternoon:arrival?c.arrivalNote:departure?c.departureNote:tr(activity.afternoon,lang),
   evening,
   note:familyNote,
   transport:arrival?c.transportArrival:departure?c.transportDeparture:tr(activity.transport,lang),
   food:meal
  };
 });
}
