import Link from "next/link";
import { getSchoolsBySlugs, LICENSE_LABELS } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function formatZar(n: number) {
  return new Intl.NumberFormat("en-ZA").format(n);
}

export const metadata = {
  title: "قارن مدارس الطيران | نينو إديوكيشن",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ slugs?: string | string[] }>;
}) {
  const sp = await searchParams;
  const slugs = sp.slugs
    ? Array.isArray(sp.slugs)
      ? sp.slugs
      : [sp.slugs]
    : [];
  const schools = await getSchoolsBySlugs(slugs);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="font-display text-4xl">مقارنة المدارس</h1>

          {schools.length < 2 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-nino-line bg-nino-white p-10 text-center text-nino-ink/60">
              اختر مدرستين على الأقل من صفحة{" "}
              <Link href="/schools" className="text-nino-orange hover:underline">
                مدارس الطيران
              </Link>{" "}
              لمقارنتها هنا.
            </p>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-nino-line bg-nino-white">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-nino-line text-start">
                    <th className="p-4 text-start font-medium text-nino-ink/50">
                      المعيار
                    </th>
                    {schools.map((s) => (
                      <th key={s.id} className="p-4 text-start">
                        {s.nameAr}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b [&>tr]:border-nino-line">
                  <tr>
                    <td className="p-4 text-nino-ink/50">الموقع</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.city}، {s.province}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">السعر التقديري</td>
                    {schools.map((s) => (
                      <td key={s.id} dir="ltr" className="p-4 text-start">
                        R{formatZar(s.priceMinZar)}–{formatZar(s.priceMaxZar)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">المدة التقديرية</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.durationMonthsMin}–{s.durationMonthsMax} شهرًا
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">الرخص المتاحة</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.licenses
                          .split(",")
                          .map((l) => LICENSE_LABELS[l] ?? l)
                          .join("، ")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">الأسطول</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.aircraftFleet.split(",").join("، ")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">سكن متاح</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.hasAccommodation ? "نعم" : "لا"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">التقييم</td>
                    {schools.map((s) => (
                      <td key={s.id} dir="ltr" className="p-4 text-start">
                        ★ {s.rating.toFixed(1)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4"></td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        <Link
                          href={`/apply?school=${s.slug}`}
                          className="rounded-full bg-nino-ink px-4 py-2 text-xs font-medium text-white hover:bg-nino-orange"
                        >
                          قدّم إلى هذه المدرسة
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
