/**
 * GoVietStay Partner Tracking
 * DUYTINH01 - Duy Tịnh Rooftop, Dragon Bridge, Da Nang
 */
(function () {
  "use strict";

  var KEY = "gvs_partner_attribution_v1";
  var COOKIE = "gvs_partner_ref";
  var DAYS = 90;

  var PARTNERS = {
    DUYTINH01: {
      code: "DUYTINH01",
      name: "Duy Tịnh Rooftop – Dragon Bridge",
      city: "Da Nang",
      privilege: "Скидка 5% на услуги GoVietStay"
    }
  };

  function clean(v) {
    return String(v || "").trim().toUpperCase();
  }

  function cookieSet(ref) {
    try {
      document.cookie = COOKIE + "=" + encodeURIComponent(ref) +
        "; Max-Age=" + (DAYS * 86400) + "; Path=/; SameSite=Lax; Secure";
    } catch (e) {}
  }

  function cookieGet() {
    try {
      var parts = document.cookie.split("; ");
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(COOKIE + "=") === 0) {
          return clean(decodeURIComponent(parts[i].substring(COOKIE.length + 1)));
        }
      }
    } catch (e) {}
    return "";
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && d.expiresAt && d.expiresAt > Date.now()) return d;
        localStorage.removeItem(KEY);
      }
    } catch (e) {}

    var ref = cookieGet();
    if (PARTNERS[ref]) {
      return {
        firstRef: ref,
        lastRef: ref,
        expiresAt: Date.now() + DAYS * 86400000
      };
    }
    return null;
  }

  function save(ref) {
    if (!PARTNERS[ref]) return;
    var old = load();
    var d = {
      firstRef: old && old.firstRef ? old.firstRef : ref,
      lastRef: ref,
      firstSeenAt: old && old.firstSeenAt ? old.firstSeenAt : Date.now(),
      lastSeenAt: Date.now(),
      expiresAt: Date.now() + DAYS * 86400000
    };
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
    cookieSet(ref);
    eventGA("partner_visit", ref);
  }

  function eventGA(name, ref) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, { partner_ref: ref });
      }
    } catch (e) {}
  }

  function active() {
    var d = load();
    if (!d) return null;
    return PARTNERS[d.lastRef] || null;
  }

  function capture() {
    try {
      var ref = clean(new URLSearchParams(window.location.search).get("ref"));
      if (PARTNERS[ref]) save(ref);
    } catch (e) {}
  }

  function isWA(href) {
    return !!href && (
      href.indexOf("wa.me/") >= 0 ||
      href.indexOf("api.whatsapp.com/send") >= 0 ||
      href.indexOf("whatsapp.com/send") >= 0
    );
  }

  function partnerBlock(p) {
    return [
      "",
      "──────────────",
      "Привилегия партнёра GoVietStay",
      "Источник: " + p.name + ", " + p.city,
      "Код партнёра: " + p.code,
      "Привилегия: " + p.privilege,
      "──────────────"
    ].join("\n");
  }

  function patchLink(a) {
    if (!a || !isWA(a.href)) return;
    var p = active();
    if (!p) return;

    try {
      var u = new URL(a.href, window.location.href);
      var oldText = u.searchParams.get("text") || "";
      if (oldText.indexOf("Код партнёра: " + p.code) >= 0) return;

      var msg = oldText.trim()
        ? oldText.trim() + "\n" + partnerBlock(p)
        : "Здравствуйте! Я хотел(а) бы узнать больше об услугах GoVietStay.\n" + partnerBlock(p);

      u.searchParams.set("text", msg);
      a.href = u.toString();
      a.setAttribute("data-gvs-partner-ref", p.code);
    } catch (e) {}
  }

  function patchAll(root) {
    var scope = root || document;
    if (!scope.querySelectorAll) return;
    var links = scope.querySelectorAll(
      'a[href*="wa.me"],a[href*="whatsapp.com"]'
    );
    for (var i = 0; i < links.length; i++) patchLink(links[i]);
  }

  function init() {
    capture();
    patchAll(document);

    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a || !isWA(a.href)) return;
      patchLink(a);
      var p = active();
      if (p) eventGA("partner_whatsapp_click", p.code);
    }, true);

    if (window.MutationObserver) {
      new MutationObserver(function () {
        patchAll(document);
      }).observe(document.documentElement, { childList: true, subtree: true });
    }

    window.GoVietStayPartner = {
      get: load,
      partner: active,
      clear: function () {
        try { localStorage.removeItem(KEY); } catch (e) {}
        try {
          document.cookie = COOKIE + "=; Max-Age=0; Path=/; SameSite=Lax; Secure";
        } catch (e) {}
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
