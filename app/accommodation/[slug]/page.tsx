import { notFound } from "next/navigation";
import Link from "next/link";
import { getAccommodationBySlug } from "@/lib/schools";
import { formatUsd, formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AccommodationGallery } from "@/components/AccommodationGallery";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getAccommodationBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.nameAr} | نينو إديوكيشن`,
    description: a.descriptionAr,
    alternates: { canonical: `${SITE_URL}/accommodation/${a.slug}` },
  };
}

export default async function AccommodationProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getAccommodationBySlug(slug);
  if (!a || a.status !== "published") notFound();

  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.accommodationProfile;
  const images = a.imageUrls?.split(",").filter(Boolean) ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: a.nameAr,
    url: `${SITE_URL}/accommodation/${a.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: a.city,
      addressRegion: a.province,
      addressCountry: "ZA",
    },
    ...(images.length > 0 ? { image: images } : {}),
    priceRange: `$${formatUsd(a.priceMinUsd)}-$${formatUsd(a.priceMaxUsd)}/mo`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 pt-6">
          <Breadcrumbs
            items={[
              { label: dict.nav.home, href: "/" },
              { label: dict.nav.accommodation, href: "/accommodation" },
              { label: a.nameAr },
            ]}
          />
        </div>

        {images.length > 0 && (
          <div className="mx-auto max-w-4xl px-6 pt-6">
            <AccommodationGallery images={images} alt={a.nameAr} />
          </div>
        )}

        <section className="border-b border-nino-line bg-nino-cream">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <p className="text-xs text-nino-ink/50">
              {a.city} · {dict.provinces[a.province as keyof typeof dict.provinces] ?? a.province}
            </p>
            <h1 className="mt-3 font-display text-4xl text-nino-ink">{a.nameAr}</h1>
            <p className="mt-4 max-w-xl text-nino-ink/70">{a.descriptionAr}</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="grid gap-6 rounded-2xl border border-nino-line bg-nino-white p-8 md:grid-cols-3">
            <div>
              <div className="text-xs text-nino-ink/50">{t.monthlyPrice}</div>
              <div dir="ltr" className="mt-1 text-end font-display text-2xl text-nino-orange">
                {formatUsdRange(a.priceMinUsd, a.priceMaxUsd)}
              </div>
            </div>
            <div>
              <div className="text-xs text-nino-ink/50">{t.roomType}</div>
              <div className="mt-1">{dict.roomTypes[a.roomType as keyof typeof dict.roomTypes] ?? a.roomType}</div>
            </div>
            <div>
              <div className="text-xs text-nino-ink/50">{t.distanceToAirport}</div>
              <div className="mt-1">{a.distanceToAirport || t.notSpecified}</div>
            </div>
          </div>
          <Link
            href={`/apply`}
            className="mt-8 inline-block rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
          >
            {t.requestBookingHelp}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
