import { cookies, headers } from "next/headers";
import type { Lang } from "./dictionaries";

export async function getLang(): Promise<Lang> {
  // /en/* URLs (rewritten by middleware.ts) always render English,
  // regardless of any cookie — this is what makes English content
  // reachable at a stable, crawlable URL instead of only existing
  // behind a cookie Googlebot never sends. Bare paths keep the
  // original cookie-based behavior unchanged.
  const h = await headers();
  if (h.get("x-nino-lang") === "en") return "en";

  const jar = await cookies();
  return jar.get("lang")?.value === "en" ? "en" : "ar";
}
