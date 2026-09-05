import Link from "next/link";
import { getPublishedAccommodations } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function formatZar(n: number) {
  return new Intl.NumberFormat("en-ZA").format(n);
}

const roomTypeLabel: Record<string, string> = {
  private: "غرفة خاصة",
  shared: "غرفة مشتركة",
  studio: "استوديو",
};

export const metadata = {
  title: "السكن الطلابي في جنوب أفريقيا | نينو إديوكيشن",
  description: "خيارات سكن قريبة من مدارس الطيران في جنوب أفريقيا.",
};

export default async function AccommodationPage() {
  const listings = await getPublishedAccommodations();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="font-display text-4xl">السكن الطلابي</h1>
          <p className="mt-2 max-w-xl text-nino-ink/70">
            خيارات سكن بالقرب من مدارس الطيران الشريكة. نينو إديوكيشن يساعدك
            في الحجز والتنسيق قبل وصولك.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {listings.map((a) => (
              <div
                key={a.id}
                className="flex flex-col rounded-2xl border border-nino-line bg-nino-white p-6"
              >
                <span className="text-xs text-nino-ink/50">
                  {a.city} · {a.province}
                </span>
                <h3 className="mt-3 font-display text-xl">{a.nameAr}</h3>
                <p className="mt-2 text-sm text-nino-ink/70">
                  {a.descriptionAr}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-nino-line px-2.5 py-1">
                    {roomTypeLabel[a.roomType] ?? a.roomType}
                  </span>
                  {a.furnished && (
                    <span className="rounded-full border border-nino-line px-2.5 py-1">
                      مفروشة
                    </span>
                  )}
                  {a.wifi && (
                    <span className="rounded-full border border-nino-line px-2.5 py-1">
                      واي فاي
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-end justify-between border-t border-nino-line pt-4">
                  <div dir="ltr" className="text-end text-sm">
                    <div className="font-medium">
                      R{formatZar(a.monthlyPriceZar)} / شهريًا
                    </div>
                    {a.distanceToAirport && (
                      <div className="text-xs text-nino-ink/50">
                        {a.distanceToAirport} من المطار
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/accommodation/${a.slug}`}
                    className="rounded-full bg-nino-ink px-4 py-2 text-xs font-medium text-white hover:bg-nino-orange"
                  >
                    التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
