"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HtmlLanguageSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang =
      pathname === "/ru" || pathname.startsWith("/ru/")
        ? "ru"
        : pathname === "/kz" || pathname.startsWith("/kz/")
          ? "ru-KZ"
          : pathname === "/vi" || pathname.startsWith("/vi/")
            ? "vi"
            : pathname === "/cn" || pathname.startsWith("/cn/")
              ? "zh-CN"
              : pathname === "/tw" || pathname.startsWith("/tw/")
                ? "zh-TW"
                : pathname === "/ko" || pathname.startsWith("/ko/")
                  ? "ko-KR"
                  : pathname === "/in" || pathname.startsWith("/in/")
                    ? "en-IN"
                    : "en";
  }, [pathname]);

  return null;
}
