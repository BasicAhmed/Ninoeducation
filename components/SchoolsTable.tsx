"use client";

import { useState } from "react";
import { deleteSchool } from "@/lib/admin-actions";
import { Modal } from "@/components/Modal";
import { SchoolForm } from "@/components/SchoolForm";

type School = Parameters<typeof SchoolForm>[0]["school"];

export function SchoolsTable({ schools }: { schools: NonNullable<School>[] }) {
  const [selected, setSelected] = useState<NonNullable<School> | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">مدارس الطيران</h1>
        <button
          onClick={() => setCreating(true)}
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة مدرسة
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        <table className="w-full text-sm">
          <thead className="bg-nino-cream text-start">
            <tr>
              <th className="p-4 text-start">الاسم</th>
              <th className="p-4 text-start">المدينة</th>
              <th className="p-4 text-start">الحالة</th>
              <th className="p-4 text-start">السعر</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-nino-line">
            {schools.map((s) => (
              <tr
                key={s.id}
                onClick={() => setSelected(s)}
                className="cursor-pointer hover:bg-nino-cream/60"
              >
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
                  R{s.priceMinZar.toLocaleString()}–{s.priceMaxZar.toLocaleString()}
                </td>
                <td className="p-4 text-end" onClick={(e) => e.stopPropagation()}>
                  <form action={deleteSchool} className="inline-block">
                    <input type="hidden" name="id" value={s.id} />
                    <button className="text-red-500 hover:underline">حذف</button>
                  </form>
                </td>
              </tr>
            ))}
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
