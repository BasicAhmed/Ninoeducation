"use client";

import type { Lang } from "@/lib/i18n/dictionaries";

export function LanguageToggle({ lang, className = "" }: { lang: Lang; className?: string }) {
  function switchTo(target: Lang) {
    if (target === lang) return;
    document.cookie = `lang=${target}; path=/; max-age=31536000`;
    // A full reload rather than router.refresh() — this is a deliberate,
    // infrequent action (not a normal navigation), and a real round
    // trip guarantees the server re-renders every component with the
    // new language rather than relying on the router's refresh timing.
    // Navigate to the URL WITHOUT any #hash — reload() re-requests the
    // current URL verbatim, and if a hash (e.g. #why-south-africa from
    // the in-page anchor link) was already in the address bar, that
    // makes the browser jump straight to that section on load instead
    // of staying at the top.
    window.location.href = window.location.pathname + window.location.search;
  }

  return (
    <div
      className={`flex items-center rounded-full border border-nino-ink/15 p-0.5 text-xs font-medium ${className}`}
    >
      <button
        type="button"
        onClick={() => switchTo("ar")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "ar" ? "bg-nino-ink text-white" : "text-nino-ink/60"
        }`}
      >
        عربي
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-nino-ink text-white" : "text-nino-ink/60"
        }`}
      >
        EN
      </button>
    </div>
  );
}
