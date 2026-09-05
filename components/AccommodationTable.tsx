"use client";

import { useMemo, useState } from "react";
import { deleteAccommodation } from "@/lib/admin-actions";
import { Modal } from "@/components/Modal";
import { AccommodationForm } from "@/components/AccommodationForm";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";

type Accommodation = Parameters<typeof AccommodationForm>[0]["item"];

export function AccommodationTable({ listings }: { listings: NonNullable<Accommodation>[] }) {
  const [selected, setSelected] = useState<NonNullable<Accommodation> | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(
      (a) => a.nameAr.toLowerCase().includes(q) || a.city.toLowerCase().includes(q)
    );
  }, [listings, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">السكن الطلابي</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة سكن
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <AdminSearchBar value={query} onChange={setQuery} placeholder="ابحث بالاسم أو المدينة..." />
        <span className="shrink-0 text-xs text-nino-ink/50">{filtered.length} من {listings.length}</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        <table className="w-full text-sm">
          <thead className="bg-nino-cream">
            <tr>
              <th className="p-4 text-start">الاسم</th>
              <th className="p-4 text-start">المدينة</th>
              <th className="p-4 text-start">السعر الشهري</th>
              <th className="p-4 text-start">الحالة</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-nino-line">
            {filtered.map((a) => (
              <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer hover:bg-nino-cream/60">
                <td className="p-4">{a.nameAr}</td>
                <td className="p-4">{a.city}</td>
                <td dir="ltr" className="p-4 text-start">
                  R{a.monthlyPriceZar.toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      a.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {a.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td className="p-4 text-end" onClick={(e) => e.stopPropagation()}>
                  <form action={deleteAccommodation} className="inline-block">
                    <input type="hidden" name="id" value={a.id} />
                    <button className="text-red-500 hover:underline">حذف</button>
                  </form>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-nino-ink/50">
                  لا توجد نتائج مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.nameAr || ""}>
        {selected && <AccommodationForm item={selected} />}
      </Modal>

      <Modal open={creating} onClose={() => setCreating(false)} title="إضافة سكن جديد">
        <AccommodationForm />
      </Modal>
    </div>
  );
}
