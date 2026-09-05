import { getPublishedSchools, PROVINCES, LICENSE_LABELS } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";

export const metadata = {
  title: "مدارس الطيران في جنوب أفريقيا | نينو إديوكيشن",
  description:
    "قارن أفضل مدارس تدريب الطيران في جنوب أفريقيا حسب الميزانية والرخصة والموقع.",
};

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<{
    province?: string;
    license?: string;
    maxBudget?: string;
    trainingType?: string;
    accommodation?: string;
  }>;
}) {
  const sp = await searchParams;
  const schools = await getPublishedSchools({
    province: sp.province || undefined,
    license: sp.license || undefined,
    maxBudget: sp.maxBudget ? Number(sp.maxBudget) : undefined,
    trainingType: sp.trainingType || undefined,
    accommodation: sp.accommodation === "1",
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="font-display text-4xl">مدارس الطيران</h1>
          <p className="mt-2 max-w-xl text-nino-ink/70">
            {schools.length} مدرسة متاحة حسب المعايير الحالية. جميع الأسعار
            تقديرية وقابلة للتحديث من المدرسة.
          </p>

          {/* Filters */}
          <form
            method="get"
            className="mt-8 grid gap-4 rounded-2xl border border-nino-line bg-nino-white p-6 md:grid-cols-5"
          >
            <select
              name="province"
              defaultValue={sp.province || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">كل المقاطعات</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              name="license"
              defaultValue={sp.license || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">كل الرخص</option>
              {Object.entries(LICENSE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>

            <select
              name="trainingType"
              defaultValue={sp.trainingType || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">متكامل أو معياري</option>
              <option value="integrated">متكامل</option>
              <option value="modular">معياري</option>
              <option value="both">كلاهما</option>
            </select>

            <select
              name="maxBudget"
              defaultValue={sp.maxBudget || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">أي ميزانية</option>
              <option value="250000">حتى 250,000 راند</option>
              <option value="400000">حتى 400,000 راند</option>
              <option value="600000">حتى 600,000 راند</option>
              <option value="900000">حتى 900,000 راند</option>
            </select>

            <label className="flex items-center gap-2 rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm">
              <input
                type="checkbox"
                name="accommodation"
                value="1"
                defaultChecked={sp.accommodation === "1"}
                className="h-4 w-4 accent-orange-600"
              />
              يشمل سكنًا
            </label>

            <div className="md:col-span-5">
              <button
                type="submit"
                className="rounded-full bg-nino-ink px-6 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </form>

          {/* Compare + results */}
          <form method="get" action="/schools/compare" className="mt-10">
            {schools.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
                لا توجد مدارس تطابق هذه المعايير حاليًا. جرّب توسيع نطاق البحث.
              </p>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-3">
                  {schools.map((s) => (
                    <SchoolCard key={s.id} school={s} selectable />
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-8 rounded-full border border-nino-ink px-6 py-2.5 text-sm font-medium hover:bg-nino-ink hover:text-white"
                >
                  قارن المدارس المحددة
                </button>
              </>
            )}
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
