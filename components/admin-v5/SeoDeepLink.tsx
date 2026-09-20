"use client";

import { useEffect } from "react";

/** Preserve legacy SEO bookmark and add a GEO entry within the authenticated Admin navigation. */
export default function SeoDeepLink() {
  useEffect(() => {
    let done = false;
    const tryOpen = () => {
      const nav = document.querySelector<HTMLElement>(".gva-nav");
      if (nav && !nav.querySelector(".gva-geo-link")) {
        const existingSeo = Array.from(nav.querySelectorAll("button")).find(b => b.textContent?.trim() === "SEO Intelligence");
        if (existingSeo) {
          existingSeo.textContent = "MASTER SEO & GEO · SEO Performance";
          const link = document.createElement("a");
          link.className = "gva-geo-link";
          link.href = "/admin/geo";
          link.textContent = "GEO Audit / AI Visibility";
          link.style.cssText = "display:block;padding:11px 16px;margin:2px 0;color:inherit;text-decoration:none;border-radius:8px;font:inherit";
          existingSeo.insertAdjacentElement("afterend", link);
        }
      }
      if (done || new URLSearchParams(window.location.search).get("seo") !== "center") return;
      const button = document.querySelector<HTMLButtonElement>(".gva-nav > .gva-unified-seo-button") || Array.from(document.querySelectorAll<HTMLButtonElement>(".gva-nav button")).find(b => b.textContent?.includes("MASTER SEO"));
      if (!button) return;
      done = true;
      button.click();
      const url = new URL(window.location.href);
      url.searchParams.delete("seo");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    };
    const observer = new MutationObserver(tryOpen);
    observer.observe(document.body, { childList: true, subtree: true });
    tryOpen();
    return () => { done = true; observer.disconnect(); };
  }, []);
  return null;
}
