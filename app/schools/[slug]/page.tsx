import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, LICENSE_LABELS } from "@/lib/schools";
import { formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) return {};
  return {
    title: `${school.nameAr} — التدريب والأسعار والتفاصيل | نينو إديوكيشن`,
    description: school.shortDescriptionAr,
  };
}

export default async function SchoolProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school || school.status !== "published") notFound();

  const licenses = school.licenses.split(",");
  const fleet = school.aircraftFleet.split(",");
  const updated = new Date(school.lastPricingUpdate).toLocaleDateString(
    "ar-EG",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-nino-line bg-nino-cream">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="text-xs text-nino-ink/50">
              {school.city} · {school.province} · {school.airportName} (
              <span dir="ltr">{school.airportCode}</span>)
            </p>
            <h1 className="mt-3 font-display text-4xl text-nino-ink md:text-5xl">
              {school.nameAr}
            </h1>
            <p className="mt-4 max-w-2xl text-nino-ink/70">
              {school.shortDescriptionAr}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/apply?school=${school.slug}`}
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-white hover:bg-nino-ink"
              >
                قدّم إلى {school.nameAr}
              </Link>
              <a
                href={`https://wa.me/000000000000?text=${encodeURIComponent(
                  `مرحبًا، أريد الاستفسار عن ${school.nameAr}`
                )}`}
                className="rounded-full border border-nino-ink/20 px-6 py-3 text-sm font-medium text-nino-ink hover:border-nino-ink"
              >
                اسأل عن هذه المدرسة عبر واتساب
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-3">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-display text-2xl">نظرة عامة</h2>
              <p className="mt-3 leading-relaxed text-nino-ink/80">
                {school.descriptionAr}
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">برامج التدريب</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {licenses.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-nino-line px-3 py-1.5 text-sm"
                  >
                    {LICENSE_LABELS[l] ?? l}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-nino-ink/60">
                نوع البرنامج:{" "}
                {school.trainingType === "integrated"
                  ? "متكامل"
                  : school.trainingType === "modular"
                  ? "معياري"
                  : "متكامل ومعياري"}{" "}
                — المدة التقديرية {school.durationMonthsMin}–
                {school.durationMonthsMax} شهرًا.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">الأسطول</h2>
              <ul className="mt-3 list-inside list-disc text-nino-ink/80">
                {fleet.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl">الطلاب الدوليون والسكن</h2>
              <p className="mt-3 text-nino-ink/80">
                {school.acceptsInternational
                  ? "تستقبل هذه المدرسة طلابًا دوليين."
                  : "لا تستقبل هذه المدرسة طلابًا دوليين حاليًا."}{" "}
                {school.hasAccommodation
                  ? "تتوفر خيارات سكن مرتبطة بالمدرسة."
                  : "لا يوجد سكن مباشر من المدرسة، لكن نينو إديوكيشن يساعدك في إيجاد سكن قريب."}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-nino-line bg-nino-white p-6">
            <div dir="ltr" className="text-end">
              <div className="font-display text-3xl text-nino-orange">
                {formatUsdRange(school.priceMinZar, school.priceMaxZar)}
              </div>
            </div>
            <p className="mt-1 text-xs text-nino-ink/50">
              سعر تقديري لكامل البرنامج — آخر تحديث: {updated}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-nino-line pt-4 text-sm">
              <span className="text-nino-ink/60">التقييم</span>
              <span dir="ltr">★ {school.rating.toFixed(1)} / 5</span>
            </div>
            <Link
              href={`/apply?school=${school.slug}`}
              className="mt-6 block rounded-full bg-nino-ink py-3 text-center text-sm font-medium text-white hover:bg-nino-orange"
            >
              قدّم الآن
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
