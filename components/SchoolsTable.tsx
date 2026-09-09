"use client";

import { useMemo, useState } from "react";
import { deleteSchool, deleteSchools } from "@/lib/admin-actions";
import { Modal } from "@/components/Modal";
import { SchoolForm } from "@/components/SchoolForm";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";

type School = Parameters<typeof SchoolForm>[0]["school"];

export function SchoolsTable({ schools }: { schools: NonNullable<School>[] }) {
  const [selected, setSelected] = useState<NonNullable<School> | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter(
      (s) =>
        s.nameAr.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.province.toLowerCase().includes(q)
    );
  }, [schools, query]);

  const allFilteredChecked = filtered.length > 0 && filtered.every((s) => checkedIds.has(s.id));

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
        filtered.forEach((s) => next.delete(s.id));
        return next;
      }
      const next = new Set(prev);
      filtered.forEach((s) => next.add(s.id));
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">مدارس الطيران</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة مدرسة
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <AdminSearchBar value={query} onChange={setQuery} placeholder="ابحث بالاسم أو المدينة..." />
        <div className="flex shrink-0 items-center gap-3">
          {checkedIds.size > 0 && (
            <form
              action={deleteSchools}
              onSubmit={(e) => {
                if (!confirm(`متأكد إنك تبي تحذف ${checkedIds.size} مدرسة؟ ما يمكن التراجع.`)) {
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
          <span className="text-xs text-nino-ink/50">{filtered.length} من {schools.length}</span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        <table className="w-full text-sm">
          <thead className="bg-nino-cream text-start">
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
              <th className="p-4 text-start">الحالة</th>
              <th className="p-4 text-start">السعر</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-nino-line">
            {filtered.map((s) => (
              <tr
                key={s.id}
                onClick={() => setSelected(s)}
                className="cursor-pointer hover:bg-nino-cream/60"
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={checkedIds.has(s.id)}
                    onChange={() => toggleOne(s.id)}
                    className="h-4 w-4 accent-orange-600"
                    aria-label={`تحديد ${s.nameAr}`}
                  />
                </td>
                <td className="p-4">{s.nameAr}</td>
                <td className="p-4">{s.city}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      s.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td dir="ltr" className="p-4 text-start">
                  ${s.priceMinUsd.toLocaleString()}–{s.priceMaxUsd.toLocaleString()}
                </td>
                <td className="p-4 text-end" onClick={(e) => e.stopPropagation()}>
                  <form
                    action={deleteSchool}
                    className="inline-block"
                    onSubmit={(e) => {
                      if (!confirm(`متأكد إنك تبي تحذف "${s.nameAr}"؟ ما يمكن التراجع.`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={s.id} />
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
        {selected && <SchoolForm school={selected} />}
      </Modal>

      <Modal open={creating} onClose={() => setCreating(false)} title="إضافة مدرسة جديدة">
        <SchoolForm />
      </Modal>
    </div>
  );
}
