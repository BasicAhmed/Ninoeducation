"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PlaneTakeoff, Search, CheckCircle2, Clock } from "lucide-react";

const STATUS_ORDER = [
  "new",
  "contacted",
  "documents_required",
  "submitted_to_school",
  "accepted",
  "enrolled",
];

type Result = {
  referenceCode: string;
  fullName: string;
  status: string;
  statusLabel: string;
  desiredLicense: string;
  schoolName: string | null;
  createdAt: string;
};

export function TrackForm() {
  return (
    <Suspense fallback={null}>
      <TrackFormInner />
    </Suspense>
  );
}

function TrackFormInner() {
  const searchParams = useSearchParams();
  const alreadyApplied = searchParams.get("already") === "1";
  const [referenceCode, setReferenceCode] = useState(() => searchParams.get("ref") || "");
  const [email, setEmail] = useState(() => searchParams.get("email") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const runLookup = useCallback(async (ref: string, mail: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ referenceCode: ref, email: mail }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "حدث خطأ");
        return;
      }
      setResult(json);
    } catch {
      setError("تعذر الاتصال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  }, []);

  // Coming from "you already applied" — both ref and email are
  // already known, so show the status immediately without making
  // them type anything again.
  useEffect(() => {
    const ref = searchParams.get("ref");
    const mail = searchParams.get("email");
    if (ref && mail) {
      const t = setTimeout(() => runLookup(ref, mail), 0);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runLookup(referenceCode, email);
  }

  const currentIndex = result ? STATUS_ORDER.indexOf(result.status) : -1;
  const isRejected = result?.status === "rejected";

  return (
    <div className="mx-auto max-w-md">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-nino-orange">
        {alreadyApplied ? "قدّمت طلبك من قبل" : "تتبّع رحلتك"}
      </p>
      <h1 className="mt-2 text-center font-display text-3xl">
        {alreadyApplied ? "لقيناك! خذ آخر تحديث" : "وين وصل طلبك؟"}
      </h1>
      <p className="mt-2 text-center text-sm text-nino-ink/60">
        {alreadyApplied
          ? "هذا البريد قدّم طلب قبل كذا — ما نبي نسوي لك طلب مكرر، فهذا آخر وضعك."
          : "أدخل رقم الرحلة اللي وصلك بعد التقديم، مع نفس الإيميل."}
      </p>

      {alreadyApplied && loading && (
        <p className="mt-8 text-center text-sm text-nino-ink/50">جارٍ إحضار آخر تحديث...</p>
      )}

      {!(alreadyApplied && loading) && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="referenceCode" className="block text-sm font-medium">رقم الرحلة</label>
            <input
              id="referenceCode"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              dir="ltr"
              placeholder="NE26-4821"
              required
              className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-3 text-center text-sm tracking-wider"
            />
          </div>
          <div>
            <label htmlFor="trackEmail" className="block text-sm font-medium">الإيميل اللي قدّمت فيه</label>
            <input
              id="trackEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              required
              className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-3 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-nino-ink py-3.5 text-sm font-medium text-white hover:bg-nino-orange disabled:opacity-50"
          >
            <Search size={15} />
            {loading ? "جارٍ البحث..." : "شوف وضعي"}
          </button>
        </form>
      )}

      {error && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-nino-ink bg-nino-ink text-white">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-sm">{result.referenceCode}</span>
            <PlaneTakeoff size={16} className="text-nino-orange" />
          </div>
          <div className="border-t border-dashed border-white/20 px-6 py-5">
            <div className="text-xs text-white/40">القبطان</div>
            <div className="mt-1 font-medium">{result.fullName}</div>
            {result.schoolName && (
              <>
                <div className="mt-4 text-xs text-white/40">الوجهة</div>
                <div className="mt-1 font-medium">{result.schoolName}</div>
              </>
            )}
          </div>
          <div className="border-t border-dashed border-white/20 px-6 py-5">
            <div className="flex items-center gap-2">
              {isRejected ? (
                <Clock size={16} className="text-white/60" />
              ) : (
                <CheckCircle2 size={16} className="text-nino-orange" />
              )}
              <span className="font-medium">{result.statusLabel}</span>
            </div>
            {!isRejected && currentIndex >= 0 && (
              <div className="mt-4 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-nino-orange transition-all"
                  style={{
                    width: `${((currentIndex + 1) / STATUS_ORDER.length) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
