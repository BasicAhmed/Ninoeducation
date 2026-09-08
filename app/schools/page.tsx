import { getPublishedSchools, PROVINCES } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مدارس الطيران في جنوب أفريقيا | نينو إديوكيشن",
  description:
    "قارن أفضل مدارس تدريب الطيران في جنوب أفريقيا حسب الميزانية والرخصة والموقع.",
  alternates: { canonical: `${SITE_URL}/schools` },
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
    q?: string;
  }>;
}) {
  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.schoolsPage;
  const sp = await searchParams;
  const schools = await getPublishedSchools({
    province: sp.province || undefined,
    license: sp.license || undefined,
    maxBudget: sp.maxBudget ? Number(sp.maxBudget) : undefined,
    trainingType: sp.trainingType || undefined,
    accommodation: sp.accommodation === "1",
    q: sp.q || undefined,
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="font-display text-4xl">{t.title}</h1>
          <p className="mt-2 max-w-xl text-nino-ink/70">
            {schools.length} {t.resultsSuffix}
          </p>

          {/* Filters */}
          <form
            method="get"
            className="mt-8 grid gap-4 rounded-2xl border border-nino-line bg-nino-white p-6 md:grid-cols-5"
          >
            <input
              type="text"
              name="q"
              defaultValue={sp.q || ""}
              placeholder={t.searchPlaceholder}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm md:col-span-5"
            />
            <select
              name="province"
              defaultValue={sp.province || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">{t.allProvinces}</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {dict.provinces[p as keyof typeof dict.provinces] ?? p}
                </option>
              ))}
            </select>

            <select
              name="license"
              defaultValue={sp.license || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">{t.allLicenses}</option>
              {Object.entries(dict.licenses).map(([k, v]) => (
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
              <option value="">{t.integratedOrModular}</option>
              <option value="integrated">{t.integrated}</option>
              <option value="modular">{t.modular}</option>
              <option value="both">{t.both}</option>
            </select>

            <select
              name="maxBudget"
              defaultValue={sp.maxBudget || ""}
              className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
            >
              <option value="">{t.anyBudget}</option>
              <option value="13500">{lang === "ar" ? "حتى $13,500" : "Up to $13,500"}</option>
              <option value="21600">{lang === "ar" ? "حتى $21,600" : "Up to $21,600"}</option>
              <option value="32400">{lang === "ar" ? "حتى $32,400" : "Up to $32,400"}</option>
              <option value="48600">{lang === "ar" ? "حتى $48,600" : "Up to $48,600"}</option>
            </select>

            <label className="flex items-center gap-2 rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm">
              <input
                type="checkbox"
                name="accommodation"
                value="1"
                defaultChecked={sp.accommodation === "1"}
                className="h-4 w-4 accent-orange-600"
              />
              {t.includesAccommodation}
            </label>

            <div className="md:col-span-5">
              <button
                type="submit"
                className="rounded-full bg-nino-ink px-6 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
              >
                {t.applyFilters}
              </button>
            </div>
          </form>

          {/* Compare + results */}
          <form method="get" action="/schools/compare" className="mt-10">
            {schools.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
                {t.noResults}
              </p>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-3">
                  {schools.map((s) => (
                    <SchoolCard key={s.id} school={s} lang={lang} selectable />
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-8 rounded-full border border-nino-ink px-6 py-2.5 text-sm font-medium hover:bg-nino-ink hover:text-white"
                >
                  {t.compareSelected}
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
