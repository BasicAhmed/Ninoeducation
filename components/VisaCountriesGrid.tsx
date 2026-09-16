"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { deleteVisaCountry } from "@/lib/admin-actions";

type VisaCountry = {
  id: string;
  countryNameAr: string;
  countryNameEn: string;
  hasEmbassy: boolean;
  usesVfs: boolean;
  noDirectOption: boolean;
  status: string;
  lastVerifiedAt: string;
};

function isStale(dateStr: string) {
  const months = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 30);
  return months > 6;
}

export function VisaCountriesGrid({ countries }: { countries: VisaCountry[] }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">دول تأشيرة جنوب أفريقيا</h1>
          <p className="mt-1 text-sm text-nino-ink/60">
            معلومات كل دولة تظهر مباشرة للطلاب في متابعة التأشيرة على حسابهم — راجعها دوريًا.
          </p>
        </div>
        <Link
          href="/admin/visa-countries/new"
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة دولة
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => {
          const path = c.hasEmbassy ? "سفارة مباشرة" : c.usesVfs ? "عبر VFS" : "بدون خيار مباشر";
          const stale = isStale(c.lastVerifiedAt);
          return (
            <div key={c.id} className="rounded-2xl border border-nino-line bg-nino-white p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-nino-ink">{c.countryNameAr}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${
                    c.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {c.status === "published" ? "منشور" : "مسودة"}
                </span>
              </div>
              <p className="mt-1 text-xs text-nino-ink/50">{c.countryNameEn}</p>
              <p className="mt-3 text-sm text-nino-ink/70">{path}</p>
              {stale && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-600">
                  <AlertTriangle size={13} />
                  آخر مراجعة قديمة — تأكد إنها لسه صحيحة
                </p>
              )}
              <div className="mt-4 flex items-center justify-between text-xs">
                <Link href={`/admin/visa-countries/${c.id}/edit`} className="text-nino-orange hover:underline">
                  تعديل
                </Link>
                <form
                  action={deleteVisaCountry}
                  onSubmit={(e) => {
                    if (!confirm("حذف هذي الدولة؟")) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={c.id} />
                  <button className="text-red-500 hover:underline">حذف</button>
                </form>
              </div>
            </div>
          );
        })}
        {countries.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
            لا توجد دول مضافة بعد.
          </p>
        )}
      </div>
    </div>
  );
}
