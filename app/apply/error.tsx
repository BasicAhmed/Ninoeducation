"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function ApplyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Apply flow error:", error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-nino-cream px-6 py-24">
        <div className="max-w-sm text-center">
          <h1 className="font-display text-2xl">تعذّر إرسال طلبك</h1>
          <p className="mt-2 text-sm text-nino-ink/60">
            حدث خطأ أثناء إرسال طلبك. جرّب مرة أخرى، وإذا استمرت المشكلة تواصل معنا مباشرة عبر واتساب حتى لا تضيع بياناتك.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
          >
            حاول مرة أخرى
          </button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
