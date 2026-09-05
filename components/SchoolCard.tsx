import Link from "next/link";
import { LICENSE_LABELS } from "@/lib/constants";

type School = {
  slug: string;
  nameAr: string;
  city: string;
  province: string;
  shortDescriptionAr: string;
  licenses: string;
  priceMinZar: number;
  priceMaxZar: number;
  rating: number;
  hasAccommodation: boolean;
};

function formatZar(n: number) {
  return new Intl.NumberFormat("en-ZA").format(n);
}

export function SchoolCard({
  school,
  selectable = false,
}: {
  school: School;
  selectable?: boolean;
}) {
  const licenses = school.licenses.split(",").slice(0, 3);
  return (
    <div className="group relative flex flex-col rounded-2xl border border-nino-line bg-nino-cream p-6 transition hover:border-nino-orange">
      {selectable && (
        <label className="absolute left-4 top-4 flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            name="slugs"
            value={school.slug}
            className="h-4 w-4 accent-orange-600"
          />
        </label>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-nino-ink/50">
          {school.city} · {school.province}
        </span>
        <span dir="ltr" className="font-mono text-xs text-nino-orange">
          ★ {school.rating.toFixed(1)}
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl">{school.nameAr}</h3>
      <p className="mt-2 text-sm text-nino-ink/70">
        {school.shortDescriptionAr}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {licenses.map((l) => (
          <span
            key={l}
            className="rounded-full border border-nino-line px-2.5 py-1 text-xs"
          >
            {LICENSE_LABELS[l] ?? l}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-nino-line pt-4">
        <div dir="ltr" className="text-end text-sm">
          <div className="font-medium">
            R{formatZar(school.priceMinZar)} – R{formatZar(school.priceMaxZar)}
          </div>
          <div className="text-xs text-nino-ink/50">تقديري</div>
        </div>
        <Link
          href={`/schools/${school.slug}`}
          className="rounded-full bg-nino-ink px-4 py-2 text-xs font-medium text-white group-hover:bg-nino-orange"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}
