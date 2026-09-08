import Link from "next/link";
import Image from "next/image";
import { getPublishedAccommodations } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";
import { formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "السكن الطلابي في جنوب أفريقيا | نينو إديوكيشن",
  description: "خيارات سكن قريبة من مدارس الطيران في جنوب أفريقيا.",
  alternates: { canonical: `${SITE_URL}/accommodation` },
};

export default async function AccommodationPage() {
  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.accommodationPage;
  const listings = await getPublishedAccommodations();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="font-display text-4xl">{t.title}</h1>
          <p className="mt-2 max-w-xl text-nino-ink/70">
            {t.subtitle}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {listings.map((a) => {
              const cover = a.imageUrls?.split(",").filter(Boolean)[0];
              return (
                <div
                  key={a.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-nino-line bg-nino-white"
                >
                  {cover ? (
                    <div className="relative h-40 w-full">
                      <Image src={cover} alt={a.nameAr} fill unoptimized className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center bg-nino-cream text-xs text-nino-ink/30">
                      {t.noPhoto}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs text-nino-ink/50">
                      {a.city} · {dict.provinces[a.province as keyof typeof dict.provinces] ?? a.province}
                    </span>
                    <h3 className="mt-3 font-display text-xl">{a.nameAr}</h3>
                    <p className="mt-2 text-sm text-nino-ink/70">
                      {a.descriptionAr}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-nino-line px-2.5 py-1">
                        {dict.roomTypes[a.roomType as keyof typeof dict.roomTypes] ?? a.roomType}
                      </span>
                      {a.furnished && (
                        <span className="rounded-full border border-nino-line px-2.5 py-1">
                          {t.furnished}
                        </span>
                      )}
                      {a.wifi && (
                        <span className="rounded-full border border-nino-line px-2.5 py-1">
                          {t.wifi}
                        </span>
                      )}
                    </div>
                    <div className="mt-5 flex items-end justify-between border-t border-nino-line pt-4">
                      <div dir="ltr" className="text-end text-sm">
                        <div className="font-medium">
                          {formatUsdRange(a.priceMinUsd, a.priceMaxUsd)} {t.perMonth}
                        </div>
                        {a.distanceToAirport && (
                          <div className="text-xs text-nino-ink/50">
                            {a.distanceToAirport} {t.fromAirport}
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/accommodation/${a.slug}`}
                        className="rounded-full bg-nino-ink px-4 py-2 text-xs font-medium text-white hover:bg-nino-orange"
                      >
                        {t.details}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
