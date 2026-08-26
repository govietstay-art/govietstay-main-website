/**
 * GoVietStay Unified Tracking V6
 * Server-side geo + source + device/browser/OS + WhatsApp + partner attribution.
 * No IP, customer name, phone or WhatsApp message is stored by analytics.
 */
(function(){
"use strict";
var ATTR="gvs_partner_attribution_v2",COOKIE="gvs_partner_ref",VISITOR="gvs_visitor_id_v1",SESSION="gvs_session_id_v1";
var FIRST="gvs_first_seen_v1",LANDING="gvs_session_landing_v1",DAYS=90,lastUrl="";
var PARTNERS={DUYTINH01:{code:"DUYTINH01",name:"Duy Tịnh Rooftop – Dragon Bridge",city:"Da Nang",privilege:"Скидка 5% на услуги GoVietStay"}};

function s(v,n){return String(v==null?"":v).trim().slice(0,n||500)}
function ref(v){var x=s(v,80).toUpperCase();return /^[A-Z0-9_-]{2,80}$/.test(x)?x:""}
function rid(p){try{if(crypto&&crypto.randomUUID)return p+"_"+crypto.randomUUID()}catch(e){}return p+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,12)}
function visitor(){
 try{var x=localStorage.getItem(VISITOR);if(!x){x=rid("v");localStorage.setItem(VISITOR,x)}return s(x,120)}
 catch(e){return rid("v")}
}
function session(){
 try{var x=sessionStorage.getItem(SESSION);if(!x){x=rid("s");sessionStorage.setItem(SESSION,x)}return s(x,120)}
 catch(e){return rid("s")}
}
function returning(){
 try{
   var seen=localStorage.getItem(FIRST);
   if(!seen){localStorage.setItem(FIRST,String(Date.now()));return false}
   return true
 }catch(e){return false}
}
function landing(){
 try{var x=sessionStorage.getItem(LANDING);if(!x){x=location.pathname||"/";sessionStorage.setItem(LANDING,x)}return s(x,500)}
 catch(e){return s(location.pathname||"/",500)}
}
function setCookie(x){try{document.cookie=COOKIE+"="+encodeURIComponent(x)+"; Max-Age="+(DAYS*86400)+"; Path=/; SameSite=Lax; Secure"}catch(e){}}
function getCookie(){try{var a=document.cookie.split("; ");for(var i=0;i<a.length;i++)if(a[i].indexOf(COOKIE+"=")===0)return ref(decodeURIComponent(a[i].substring(COOKIE.length+1)))}catch(e){}return ""}
function loadAttr(){
 try{var raw=localStorage.getItem(ATTR);if(raw){var d=JSON.parse(raw);if(d&&d.expiresAt>Date.now()&&ref(d.lastRef))return d;localStorage.removeItem(ATTR)}}catch(e){}
 var r=getCookie();return r?{firstRef:r,lastRef:r,firstSeenAt:Date.now(),lastSeenAt:Date.now(),expiresAt:Date.now()+DAYS*86400000}:null
}
function saveAttr(r){
 r=ref(r);if(!r)return null;var o=loadAttr(),d={firstRef:o&&ref(o.firstRef)?ref(o.firstRef):r,lastRef:r,firstSeenAt:o&&o.firstSeenAt?o.firstSeenAt:Date.now(),lastSeenAt:Date.now(),expiresAt:Date.now()+DAYS*86400000};
 try{localStorage.setItem(ATTR,JSON.stringify(d))}catch(e){}setCookie(r);return d
}
function activeRef(){var d=loadAttr();return d?ref(d.lastRef):""}
function params(){
 try{var p=new URLSearchParams(location.search);return{ref:ref(p.get("ref")),utm_source:s(p.get("utm_source"),200),utm_medium:s(p.get("utm_medium"),200),utm_campaign:s(p.get("utm_campaign"),200)}}
 catch(e){return{ref:"",utm_source:"",utm_medium:"",utm_campaign:""}}
}
function pageUrl(){
 try{var u=new URL(location.href),p=params(),q=new URLSearchParams();if(p.ref)q.set("ref",p.ref);if(p.utm_source)q.set("utm_source",p.utm_source);if(p.utm_medium)q.set("utm_medium",p.utm_medium);if(p.utm_campaign)q.set("utm_campaign",p.utm_campaign);return u.origin+u.pathname+(q.toString()?"?"+q.toString():"")}
 catch(e){return s(location.pathname,500)}
}
function referrer(){try{if(!document.referrer)return "";var u=new URL(document.referrer);return s(u.origin+u.pathname,1500)}catch(e){return ""}}
function device(){var w=innerWidth||0;return w<768?"mobile":w<1100?"tablet":"desktop"}
function browser(){
 var u=navigator.userAgent||"";
 if(/Edg\//.test(u))return"Edge";
 if(/OPR\//.test(u))return"Opera";
 if(/Chrome\//.test(u))return"Chrome";
 if(/Firefox\//.test(u))return"Firefox";
 if(/Safari\//.test(u)&&!/Chrome\//.test(u))return"Safari";
 return"Other"
}
function os(){
 var u=navigator.userAgent||"";
 if(/Windows NT/.test(u))return"Windows";
 if(/Android/.test(u))return"Android";
 if(/iPhone|iPad|iPod/.test(u))return"iOS";
 if(/Mac OS X/.test(u))return"macOS";
 if(/Linux/.test(u))return"Linux";
 return"Other"
}
function source(){
 var q=params(),r=referrer().toLowerCase();
 if(activeRef()||q.ref)return"partner";
 if(q.utm_source)return q.utm_source.toLowerCase();
 if(r.indexOf("google.")>=0)return"google";
 if(r.indexOf("naver.")>=0)return"naver";
 if(r.indexOf("yandex.")>=0)return"yandex";
 if(r.indexOf("bing.")>=0)return"bing";
 if(r.indexOf("tiktok.")>=0)return"tiktok";
 if(r.indexOf("facebook.")>=0||r.indexOf("fb.com")>=0)return"facebook";
 if(r.indexOf("instagram.")>=0)return"instagram";
 if(r.indexOf("telegram.")>=0||r.indexOf("t.me")>=0)return"telegram";
 if(r.indexOf("kakao.")>=0)return"kakao";
 if(r.indexOf("x.com")>=0||r.indexOf("twitter.")>=0)return"x";
 if(!r||r.indexOf("govietstay.com")>=0)return"direct";
 return"referral"
}
function allowed(){var p=location.pathname||"/";return !(p==="/admin"||p.indexOf("/admin/")===0||p==="/secret"||p.indexOf("/secret/")===0)}
function payload(name,extra){
 var q=params(),r=ref((extra&&extra.ref_code)||q.ref||activeRef());
 return{
   event_name:s(name,80),session_id:session(),visitor_id:visitor(),ref_code:r||null,
   path:s(location.pathname||"/",500),page_url:s(pageUrl(),1500),referrer:referrer()||null,
   utm_source:q.utm_source||null,utm_medium:q.utm_medium||null,utm_campaign:q.utm_campaign||null,
   locale:s(document.documentElement.lang||navigator.language||"",30)||null,
   device_type:device(),browser:browser(),os:os(),traffic_source:source(),
   landing_path:landing(),is_returning:returning(),
   metadata:Object.assign({title:s(document.title,300),source:"govietstay_tracking_v6"},extra&&extra.metadata?extra.metadata:{})
 }
}
function send(name,extra){
 if(!allowed())return;
 try{fetch("/api/track",{method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},body:JSON.stringify(payload(name,extra||{}))}).catch(function(){})}
 catch(e){}
}
function capture(){var q=params();if(q.ref){saveAttr(q.ref);send("partner_visit",{ref_code:q.ref,metadata:{attribution:"url_ref"}})}}
function view(){if(!allowed())return;var u=pageUrl();if(u===lastUrl)return;lastUrl=u;send("page_view",{ref_code:activeRef(),metadata:{route_change:"true"}})}
function isWA(h){h=String(h||"").toLowerCase();return h.indexOf("wa.me/")>=0||h.indexOf("api.whatsapp.com/send")>=0||h.indexOf("whatsapp.com/send")>=0}
function partner(r){r=ref(r);if(!r)return null;return PARTNERS[r]||{code:r,name:"GoVietStay Partner",city:"Vietnam",privilege:"Partner privilege — please confirm with GoVietStay"}}
function block(p){return ["","──────────────","GoVietStay Partner","Источник: "+p.name+(p.city?", "+p.city:""),"Код партнёра: "+p.code,"Привилегия: "+p.privilege,"──────────────"].join("\n")}
function patch(a){
 if(!a||!isWA(a.href))return;var r=activeRef();if(!r)return;var p=partner(r);if(!p)return;
 try{var u=new URL(a.href,location.href),old=u.searchParams.get("text")||"";if(old.indexOf("Код партнёра: "+p.code)>=0)return;var msg=old.trim()?old.trim()+"\n"+block(p):"Здравствуйте! Я хотел(а) бы узнать больше об услугах GoVietStay.\n"+block(p);u.searchParams.set("text",msg);a.href=u.toString();a.setAttribute("data-gvs-partner-ref",p.code)}catch(e){}
}
function patchAll(root){var z=(root||document).querySelectorAll?(root||document).querySelectorAll('a[href*="wa.me"],a[href*="whatsapp.com"]'):[];for(var i=0;i<z.length;i++)patch(z[i])}
function nav(){
 ["pushState","replaceState"].forEach(function(n){try{var o=history[n];history[n]=function(){var x=o.apply(this,arguments);setTimeout(function(){capture();patchAll(document);view()},50);return x}}catch(e){}});
 addEventListener("popstate",function(){setTimeout(function(){capture();patchAll(document);view()},50)})
}
function init(){
 landing();returning();capture();patchAll(document);view();nav();
 document.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a"):null;if(!a||!isWA(a.href))return;patch(a);var r=activeRef();send("whatsapp_click",{ref_code:r,metadata:{link_text:s(a.textContent||a.getAttribute("aria-label")||"",200)}});if(r)send("partner_whatsapp_click",{ref_code:r,metadata:{link_text:s(a.textContent||a.getAttribute("aria-label")||"",200)}})},true);
 if(window.MutationObserver)new MutationObserver(function(){patchAll(document)}).observe(document.documentElement,{childList:true,subtree:true});
 window.GoVietStayTracking={pageView:view,event:send,attribution:loadAttr};
 window.GoVietStayPartner={get:loadAttr,partner:function(){return partner(activeRef())}};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
