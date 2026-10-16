const BASE = "/govietstay-main-website";
const CITIES = { danang: 1, hoian: 1, hue: 1, phuquoc: 1 };
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (event) { event.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (event) {
  if (event.request.mode !== "navigate") return;
  var url = new URL(event.request.url);
  if (url.pathname.indexOf(BASE + "/") !== 0) return;
  var rel = url.pathname.slice(BASE.length);
  if (rel.indexOf("/__snap/") !== -1) return;
  if (!/^\/(en|ru|it)\/travel-kit(\/|$)/.test(rel)) return;
  var city = url.searchParams.get("city") || "danang";
  if (!CITIES[city]) city = "danang";
  if (rel.charAt(rel.length - 1) === "/") rel = rel.slice(0, -1);
  var snap = BASE + rel + "/__snap/" + city + ".html";
  event.respondWith(fetch(snap).then(function (res) {
    return res.ok ? res : fetch(event.request);
  }).catch(function () { return fetch(event.request); }));
});
