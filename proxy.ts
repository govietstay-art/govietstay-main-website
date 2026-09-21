import { NextRequest, NextResponse } from "next/server";

const SOURCES: Record<string,string> = {
  threads: "threads",
  instagram: "instagram",
  x: "x",
  facebook: "facebook",
  tiktok: "tiktok",
  telegram: "telegram",
  zalo: "zalo",
  maps: "google_maps",
  googlemaps: "google_maps",
};

export function proxy(request: NextRequest) {
  // Keep /mn isolated: /go remains the original Russian attribution route.
  const pathname = request.nextUrl.pathname;
  if (pathname === "/mn" || pathname.startsWith("/mn/")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-govietstay-locale", "mn");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Keep the server-rendered language correct for both localized tour families.
  if (pathname.startsWith("/it/local-experiences/") || pathname.startsWith("/ru/local-experiences/")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-govietstay-locale", pathname.startsWith("/it/") ? "it" : "ru");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  const source = SOURCES[String(parts[1] || "").toLowerCase()];

  if (!source) {
    return NextResponse.redirect(new URL("/ru", request.url), 307);
  }

  const destination = request.nextUrl.clone();
  destination.pathname = "/ru";
  destination.search = "";

  const response = NextResponse.rewrite(destination);

  response.cookies.set(
    "gvs_marketing_attribution_v1",
    `${source}|organic|ru_profile|profile_link`,
    {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: true,
      httpOnly: false,
    }
  );

  return response;
}

export const config = {
  matcher: ["/go/:path*", "/mn", "/mn/:path*", "/it/local-experiences/:path*", "/ru/local-experiences/:path*"],
};