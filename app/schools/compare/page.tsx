import Link from "next/link";
import { getSchoolsBySlugs } from "@/lib/schools";
import { formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "قارن مدارس الطيران | نينو إديوكيشن",
  description: "قارن أكثر من مدرسة طيران في جنوب أفريقيا جنبًا إلى جنب: السعر، المدة، الرخص، والأسطول.",
  alternates: { canonical: `${SITE_URL}/schools/compare` },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ slugs?: string | string[] }>;
}) {
  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.compare;
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
          <h1 className="font-display text-4xl">{t.title}</h1>

          {schools.length < 2 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-nino-line bg-nino-white p-10 text-center text-nino-ink/60">
              {t.pickAtLeastTwo}{" "}
              <Link href="/schools" className="text-nino-orange hover:underline">
                {t.schoolsLink}
              </Link>{" "}
              {t.toCompare}
            </p>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-nino-line bg-nino-white">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-nino-line text-start">
                    <th className="p-4 text-start font-medium text-nino-ink/50">
                      {t.criterion}
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
                    <td className="p-4 text-nino-ink/50">{t.location}</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.city}، {dict.provinces[s.province as keyof typeof dict.provinces] ?? s.province}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">{t.estimatedPrice}</td>
                    {schools.map((s) => (
                      <td key={s.id} dir="ltr" className="p-4 text-start">
                        {formatUsdRange(s.priceMinZar, s.priceMaxZar)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">{t.estimatedDuration}</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.durationMonthsMin}–{s.durationMonthsMax} {t.months}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">{t.availableLicenses}</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.licenses
                          .split(",")
                          .map((l) => dict.licenses[l as keyof typeof dict.licenses] ?? l)
                          .join(lang === "ar" ? "، " : ", ")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">{t.fleet}</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.aircraftFleet.split(",").join(lang === "ar" ? "، " : ", ")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">{t.accommodationAvailable}</td>
                    {schools.map((s) => (
                      <td key={s.id} className="p-4">
                        {s.hasAccommodation ? t.yes : t.no}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-nino-ink/50">{t.rating}</td>
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
                          {t.applyToSchool}
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
