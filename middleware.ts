import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The site's language used to be controlled purely by a cookie, which
// means Googlebot — which never carries a cookie — could only ever see
// the Arabic version of every page, no matter how much English content
// existed. Every guide, every page: invisible to English search.
//
// This middleware makes /en and /en/* real, crawlable URLs. A request
// to /en/schools is rewritten internally to the same /schools route
// (no duplicate page files needed) with a header set that tells
// getLang() to render English regardless of any cookie. Bare paths
// (/schools) are completely unaffected — they keep working exactly as
// they did before, cookie and all, so nothing about the existing
// Arabic experience or any already-indexed Arabic URL changes.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const strippedPath = pathname === "/en" ? "/" : pathname.slice(3);
    const url = request.nextUrl.clone();
    url.pathname = strippedPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nino-lang", "en");

    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  // Runs on every path except static assets, images, and API/admin
  // internals that don't need language rewriting.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|api/).*)"],
};
