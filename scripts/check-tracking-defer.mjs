import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
const root=await readFile("app/layout.tsx","utf8");
const yandex=await readFile("components/YandexMetrika.tsx","utf8");
const tracking=await readFile("public/govietstay-partner-tracking.js","utf8");
const home=await readFile("app/HomeClient.tsx","utf8");
assert.ok(root.includes('strategy="lazyOnload"'),"GTM must not block initial rendering");
assert.ok(yandex.includes('strategy="lazyOnload"'),"Yandex script must load when browser is idle");
assert.ok(tracking.includes('window.__gvsLoadGtm()'),"WhatsApp conversions must activate GTM immediately");
assert.ok(home.includes('new IntersectionObserver(')&&home.includes('id="happy-travelers"'),"Happy travelers are not lazy loaded");
const snippet=root.match(/const gtmBootstrap = String\.raw`([\s\S]*?)`;/)?.[1];
assert.ok(snippet,"GTM bootstrap missing");
const listeners={};const inserted=[];const dataLayer=[];
const window={dataLayer};const document={
 addEventListener:(name,fn)=>{listeners[name]=fn;},
 createElement:()=>({}),
 head:{appendChild:node=>inserted.push(node)},
};
vm.runInNewContext(snippet,{window,document,Date});
assert.equal(inserted.length,0,"GTM should not load during initial parse");
dataLayer.push({event:"whatsapp_click"});
listeners.pointerdown({target:{closest:()=>({href:"https://wa.me/84937762607"})}});
assert.equal(inserted.length,1,"Early WhatsApp intent should immediately trigger GTM");
assert.equal(inserted[0].async,true,"GTM script should be async");
assert.equal(dataLayer[0].event,"whatsapp_click","Queued WhatsApp event lost");
window.__gvsLoadGtm();
assert.equal(inserted.length,1,"GTM inserted twice");
console.log("PASS: lazy Google/Yandex analytics; early WhatsApp event queued and immediate GTM startup; gallery deferred.");
