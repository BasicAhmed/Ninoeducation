"use client";

import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n/dictionaries";

export function LanguageToggle({
  lang,
  className = "",
  tone = "dark",
}: {
  lang: Lang;
  className?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const active = light ? "bg-white text-nino-ink" : "bg-nino-ink text-white";
  const idle = light ? "text-white/70" : "text-nino-ink/60";
  const pathname = usePathname();

  function switchTo(target: Lang) {
    if (target === lang) return;
    document.cookie = `lang=${target}; path=/; max-age=31536000`;

    // Navigate to the matching URL in the other language space, not
    // just the same path — /en/* is a real, separate URL prefix now
    // (see middleware.ts), not just a cookie flag, so switching
    // language means actually moving to /en/schools or back to
    // /schools, not reloading the same URL with a different cookie.
    const isCurrentlyEn = pathname === "/en" || pathname.startsWith("/en/");
    let targetPath: string;
    if (target === "en") {
      targetPath = isCurrentlyEn ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;
    } else {
      targetPath = isCurrentlyEn ? (pathname === "/en" ? "/" : pathname.slice(3)) : pathname;
    }

    // A full reload rather than router.push() — this is a deliberate,
    // infrequent action (not a normal navigation), and a real round
    // trip guarantees the server re-renders every component with the
    // new language rather than relying on the router's refresh timing.
    // Deliberately drops any #hash already in the address bar, so
    // switching language doesn't also jump to whatever in-page anchor
    // happened to be there.
    window.location.href = targetPath + window.location.search;
  }

  return (
    <div
      className={`flex items-center rounded-full border p-0.5 text-xs font-medium ${
        light ? "border-white/30" : "border-nino-ink/15"
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => switchTo("ar")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "ar" ? active : idle
        }`}
      >
        عربي
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? active : idle
        }`}
      >
        EN
      </button>
    </div>
  );
}
