import { notFound } from "next/navigation";
import Link from "next/link";
import { getAccommodationBySlug } from "@/lib/schools";
import { formatUsd } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

const roomTypeLabel: Record<string, string> = {
  private: "غرفة خاصة",
  shared: "غرفة مشتركة",
  studio: "استوديو",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getAccommodationBySlug(slug);
  if (!a) return {};
  return { title: `${a.nameAr} | نينو إديوكيشن` };
}

export default async function AccommodationProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getAccommodationBySlug(slug);
  if (!a || a.status !== "published") notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-nino-line bg-nino-cream">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <p className="text-xs text-nino-ink/50">
              {a.city} · {a.province}
            </p>
            <h1 className="mt-3 font-display text-4xl text-nino-ink">{a.nameAr}</h1>
            <p className="mt-4 max-w-xl text-nino-ink/70">{a.descriptionAr}</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="grid gap-6 rounded-2xl border border-nino-line bg-nino-white p-8 md:grid-cols-3">
            <div>
              <div className="text-xs text-nino-ink/50">السعر الشهري</div>
              <div dir="ltr" className="mt-1 text-end font-display text-2xl text-nino-orange">
                ${formatUsd(a.monthlyPriceZar)}
              </div>
            </div>
            <div>
              <div className="text-xs text-nino-ink/50">نوع الغرفة</div>
              <div className="mt-1">{roomTypeLabel[a.roomType] ?? a.roomType}</div>
            </div>
            <div>
              <div className="text-xs text-nino-ink/50">المسافة إلى المطار</div>
              <div className="mt-1">{a.distanceToAirport || "غير محدد"}</div>
            </div>
          </div>
          <Link
            href={`/apply`}
            className="mt-8 inline-block rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
          >
            اطلب المساعدة في الحجز
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
