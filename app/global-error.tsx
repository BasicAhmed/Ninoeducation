"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen items-center justify-center bg-nino-cream px-6">
        <div className="max-w-sm text-center">
          <h1 className="font-display text-2xl text-nino-ink">حدث خطأ غير متوقع</h1>
          <p className="mt-2 text-sm text-nino-ink/60">
            لم نتمكن من إتمام العملية. جرّب مرة أخرى، وإذا استمرت المشكلة تواصل معنا.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
          >
            حاول مرة أخرى
          </button>
        </div>
      </body>
    </html>
  );
}
