"use client";

import { useEffect } from "react";

/** Backwards-compatible /admin?seo=center bookmark, including after login. */
export default function SeoDeepLink() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("seo") !== "center") return;
    let done = false;
    const tryOpen = () => {
      if (done) return;
      const button = document.querySelector<HTMLButtonElement>(".gva-nav > .gva-unified-seo-button");
      if (!button) return;
      done = true;
      observer.disconnect();
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
