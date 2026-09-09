"use client";

import { useMemo, useState } from "react";
import { deleteAccommodation, deleteAccommodations } from "@/lib/admin-actions";
import { Modal } from "@/components/Modal";
import { AccommodationForm } from "@/components/AccommodationForm";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";

type Accommodation = Parameters<typeof AccommodationForm>[0]["item"];

export function AccommodationTable({ listings }: { listings: NonNullable<Accommodation>[] }) {
  const [selected, setSelected] = useState<NonNullable<Accommodation> | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(
      (a) => a.nameAr.toLowerCase().includes(q) || a.city.toLowerCase().includes(q)
    );
  }, [listings, query]);

  const allFilteredChecked = filtered.length > 0 && filtered.every((a) => checkedIds.has(a.id));

  function toggleOne(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setCheckedIds((prev) => {
      if (allFilteredChecked) {
        const next = new Set(prev);
        filtered.forEach((a) => next.delete(a.id));
        return next;
      }
      const next = new Set(prev);
      filtered.forEach((a) => next.add(a.id));
      return next;
    });
  }

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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <AdminSearchBar value={query} onChange={setQuery} placeholder="ابحث بالاسم أو المدينة..." />
        <div className="flex shrink-0 items-center gap-3">
          {checkedIds.size > 0 && (
            <form
              action={deleteAccommodations}
              onSubmit={(e) => {
                if (!confirm(`متأكد إنك تبي تحذف ${checkedIds.size} سكن؟ ما يمكن التراجع.`)) {
                  e.preventDefault();
                }
              }}
            >
              {Array.from(checkedIds).map((id) => (
                <input key={id} type="hidden" name="ids" value={id} />
              ))}
              <button className="rounded-full bg-red-50 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100">
                حذف المحدد ({checkedIds.size})
              </button>
            </form>
          )}
          <span className="text-xs text-nino-ink/50">{filtered.length} من {listings.length}</span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        <table className="w-full text-sm">
          <thead className="bg-nino-cream">
            <tr>
              <th className="w-10 p-4">
                <input
                  type="checkbox"
                  checked={allFilteredChecked}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-orange-600"
                  aria-label="تحديد الكل"
                />
              </th>
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
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={checkedIds.has(a.id)}
                    onChange={() => toggleOne(a.id)}
                    className="h-4 w-4 accent-orange-600"
                    aria-label={`تحديد ${a.nameAr}`}
                  />
                </td>
                <td className="p-4">{a.nameAr}</td>
                <td className="p-4">{a.city}</td>
                <td dir="ltr" className="p-4 text-start">
                  ${a.priceMinUsd.toLocaleString()}–{a.priceMaxUsd.toLocaleString()}
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
                  <form
                    action={deleteAccommodation}
                    className="inline-block"
                    onSubmit={(e) => {
                      if (!confirm(`متأكد إنك تبي تحذف "${a.nameAr}"؟ ما يمكن التراجع.`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={a.id} />
                    <button className="text-red-500 hover:underline">حذف</button>
                  </form>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-nino-ink/50">
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
