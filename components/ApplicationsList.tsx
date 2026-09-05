"use client";

import { useMemo, useState } from "react";
import { updateApplicationStatus } from "@/lib/admin-actions";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";

const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  documents_required: "مستندات مطلوبة",
  submitted_to_school: "أُرسل للمدرسة",
  accepted: "مقبول",
  rejected: "مرفوض",
  enrolled: "مسجَّل",
};

type Application = {
  id: string;
  fullName: string;
  nationality: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  desiredLicense: string;
  flightSchoolId: string | null;
  estimatedBudget: string | null;
  notes: string | null;
  status: string;
};

export function ApplicationsList({
  apps,
  schoolMap,
  initialQuery = "",
}: {
  apps: Application[];
  schoolMap: Record<string, string>;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      return (
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q)
      );
    });
  }, [apps, query, statusFilter]);

  return (
    <div>
      <h1 className="font-display text-3xl">طلبات الطلاب</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <AdminSearchBar value={query} onChange={setQuery} placeholder="ابحث بالاسم أو الإيميل أو الهاتف..." />
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-nino-line bg-nino-white px-4 py-2.5 text-sm"
          >
            <option value="all">كل الحالات</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <span className="shrink-0 text-xs text-nino-ink/50">{filtered.length} من {apps.length}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-nino-line bg-nino-white p-8 text-center text-nino-ink/60">
            لا توجد نتائج مطابقة.
          </p>
        )}
        {filtered.map((a) => (
          <div key={a.id} className="rounded-2xl border border-nino-line bg-nino-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg">{a.fullName}</h3>
                <p className="text-sm text-nino-ink/60">
                  {a.nationality} · {a.email} · {a.phone}
                  {a.whatsapp ? ` · واتساب: ${a.whatsapp}` : ""}
                </p>
                <p className="mt-1 text-sm text-nino-ink/60">
                  الرخصة المطلوبة: {a.desiredLicense}
                  {a.flightSchoolId ? ` · المدرسة: ${schoolMap[a.flightSchoolId] ?? "غير معروفة"}` : ""}
                  {a.estimatedBudget ? ` · الميزانية: ${a.estimatedBudget}` : ""}
                </p>
                {a.notes && <p className="mt-2 text-sm text-nino-ink/70">{a.notes}</p>}
              </div>
              <form action={updateApplicationStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={a.id} />
                <select
                  name="status"
                  defaultValue={a.status}
                  className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
                >
                  {Object.entries(STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-full bg-nino-ink px-4 py-2 text-xs font-medium text-white hover:bg-nino-orange"
                >
                  تحديث
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
