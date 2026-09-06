import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSchoolBySlug } from "@/lib/schools";
import { WHATSAPP_NUMBER, SITE_URL } from "@/lib/constants";
import { formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) return {};
  const lang = await getLang();
  const t = dictionaries[lang].schoolProfile;
  return {
    title: `${school.nameAr} — ${t.metaTitleSuffix} | نينو إديوكيشن`,
    description: school.shortDescriptionAr,
    alternates: { canonical: `${SITE_URL}/schools/${school.slug}` },
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

  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.schoolProfile;

  const licenses = school.licenses.split(",");
  const fleet = school.aircraftFleet.split(",");
  const updated = new Date(school.lastPricingUpdate).toLocaleDateString(
    lang === "ar" ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // EducationalOrganization + a Course per license offered — genuine
  // structured data since these are real training programs the school
  // runs, not a generic page wrapper.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.nameAr,
    url: `${SITE_URL}/schools/${school.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: school.city,
      addressRegion: school.province,
      addressCountry: "ZA",
    },
    ...(school.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: school.rating,
            bestRating: 5,
          },
        }
      : {}),
    hasCourse: licenses.map((l) => ({
      "@type": "Course",
      name: dict.licenses[l as keyof typeof dict.licenses] ?? l,
      provider: { "@type": "EducationalOrganization", name: school.nameAr },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 pt-6">
          <Breadcrumbs
            items={[
              { label: dict.nav.home, href: "/" },
              { label: dict.nav.schools, href: "/schools" },
              { label: school.nameAr },
            ]}
          />
        </div>
        {/* Hero */}
        <section className="border-b border-nino-line bg-nino-cream">
          {school.heroImageUrl && (
            <div className="relative h-56 w-full md:h-72">
              <Image src={school.heroImageUrl} alt={school.nameAr} fill unoptimized className="object-cover" />
            </div>
          )}
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="text-xs text-nino-ink/50">
              {school.city} · {dict.provinces[school.province as keyof typeof dict.provinces] ?? school.province} · {school.airportName} (
              <span dir="ltr">{school.airportCode}</span>)
            </p>
            <h1 className="mt-3 font-display text-4xl text-nino-ink md:text-5xl">
              {school.nameAr}
            </h1>
            <p className="mt-4 max-w-2xl text-nino-ink/70">
              {school.shortDescriptionAr}
            </p>
            {(school.nextIntakeDate || school.seatsAvailable != null) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {school.nextIntakeDate && (
                  <span className="rounded-full bg-nino-orange/10 px-3 py-1.5 text-sm font-medium text-nino-orange">
                    {dict.schoolCard.nextIntake}: {school.nextIntakeDate}
                  </span>
                )}
                {school.seatsAvailable != null && (
                  <span className="rounded-full bg-nino-orange/10 px-3 py-1.5 text-sm font-medium text-nino-orange">
                    {school.seatsAvailable} {dict.schoolCard.seatsLeft}
                  </span>
                )}
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/apply?school=${school.slug}`}
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-white hover:bg-nino-ink"
              >
                {t.applyTo} {school.nameAr}
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `${t.whatsappTemplate} ${school.nameAr}`
                )}`}
                className="rounded-full border border-nino-ink/20 px-6 py-3 text-sm font-medium text-nino-ink hover:border-nino-ink"
              >
                {t.askViaWhatsapp}
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-3">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-display text-2xl">{t.overview}</h2>
              <p className="mt-3 leading-relaxed text-nino-ink/80">
                {school.descriptionAr}
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">{t.programs}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {licenses.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-nino-line px-3 py-1.5 text-sm"
                  >
                    {dict.licenses[l as keyof typeof dict.licenses] ?? l}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-nino-ink/60">
                {t.programType}:{" "}
                {school.trainingType === "integrated"
                  ? dict.schoolsPage.integrated
                  : school.trainingType === "modular"
                  ? dict.schoolsPage.modular
                  : t.integratedAndModular}{" "}
                — {t.estimatedDuration} {school.durationMonthsMin}–
                {school.durationMonthsMax} {t.months}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl">{t.fleet}</h2>
              <ul className="mt-3 list-inside list-disc text-nino-ink/80">
                {fleet.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl">{t.internationalAndHousing}</h2>
              <p className="mt-3 text-nino-ink/80">
                {school.acceptsInternational ? t.acceptsIntl : t.noAcceptsIntl}{" "}
                {school.hasAccommodation ? t.hasHousing : t.noHousing}
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
              {t.estimatedFullProgram} {updated}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-nino-line pt-4 text-sm">
              <span className="text-nino-ink/60">{t.rating}</span>
              <span dir="ltr">★ {school.rating.toFixed(1)} / 5</span>
            </div>
            <Link
              href={`/apply?school=${school.slug}`}
              className="mt-6 block rounded-full bg-nino-ink py-3 text-center text-sm font-medium text-white hover:bg-nino-orange"
            >
              {t.apply}
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
