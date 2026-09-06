"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PlaneTakeoff, Search, CheckCircle2, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

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

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackPageInner />
    </Suspense>
  );
}

function TrackPageInner() {
  const searchParams = useSearchParams();
  const [referenceCode, setReferenceCode] = useState(() => searchParams.get("ref") || "");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ referenceCode, email }),
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
  }

  const currentIndex = result ? STATUS_ORDER.indexOf(result.status) : -1;
  const isRejected = result?.status === "rejected";

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 py-16">
        <div className="mx-auto max-w-md">
          <p className="text-center font-mono text-xs uppercase tracking-widest text-nino-orange">
            تتبّع رحلتك
          </p>
          <h1 className="mt-2 text-center font-display text-3xl">وين وصل طلبك؟</h1>
          <p className="mt-2 text-center text-sm text-nino-ink/60">
            أدخل رقم الرحلة الذي استلمته بعد التقديم، مع البريد الإلكتروني نفسه.
          </p>

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
              <label htmlFor="trackEmail" className="block text-sm font-medium">البريد الإلكتروني المستخدم عند التقديم</label>
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
              {loading ? "جارٍ البحث..." : "تتبّع الرحلة"}
            </button>
          </form>

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
      </main>
      <SiteFooter />
    </>
  );
}
