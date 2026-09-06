"use client";

import { useMemo, useState } from "react";
import { updateApplicationStatus, deleteApplication } from "@/lib/admin-actions";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { Modal } from "@/components/Modal";

const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  documents_required: "مستندات مطلوبة",
  submitted_to_school: "أُرسل للمدرسة",
  accepted: "مقبول",
  rejected: "مرفوض",
  enrolled: "مسجَّل",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-nino-cream text-nino-ink/70",
  documents_required: "bg-amber-50 text-amber-700",
  submitted_to_school: "bg-purple-50 text-purple-700",
  accepted: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  enrolled: "bg-nino-orange/10 text-nino-orange",
};

const ENGLISH_LABELS: Record<string, string> = {
  beginner: "إنجليزي: مبتدئ",
  intermediate: "إنجليزي: متوسط",
  good: "إنجليزي: جيد",
  fluent: "إنجليزي: بطلاقة",
};

const FUNDING_LABELS: Record<string, string> = {
  personal_savings: "تمويل: مدخرات شخصية",
  family_support: "تمويل: دعم عائلي",
  loan: "تمويل: قرض بنكي",
  undecided: "تمويل: غير محدد",
};

const ACCOMMODATION_BUDGET_LABELS: Record<string, string> = {
  yes: "الميزانية تشمل السكن",
  no: "بحاجة تقدير سكن منفصل",
  unsure: "السكن: غير متأكد",
};

const MEDICAL_LABELS: Record<string, string> = {
  no: "لا استفسار طبي",
  unsure: "طبي: غير متأكد",
  yes: "⚠ لديه استفسار طبي",
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
  referenceCode: string | null;
  currentResidence: string | null;
  englishLevel: string | null;
  fundingSource: string | null;
  accommodationBudgetOk: string | null;
  medicalConcern: string | null;
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
  const [selected, setSelected] = useState<Application | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      return (
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        (a.referenceCode?.toLowerCase().includes(q) ?? false)
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

      <div className="mt-6 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-nino-ink/60">لا توجد نتائج مطابقة.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-nino-cream">
              <tr>
                <th className="p-4 text-start">الاسم</th>
                <th className="p-4 text-start">الجنسية</th>
                <th className="p-4 text-start">الحالة</th>
                <th className="p-4 text-start">رقم الرحلة</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-t [&>tr]:border-nino-line">
              {filtered.map((a) => (
                <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer hover:bg-nino-cream/60">
                  <td className="p-4 font-medium">{a.fullName}</td>
                  <td className="p-4 text-nino-ink/60">{a.nationality}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${STATUS_COLORS[a.status] ?? "bg-nino-cream text-nino-ink/70"}`}>
                      {STATUS_LABELS[a.status] ?? a.status}
                    </span>
                  </td>
                  <td dir="ltr" className="p-4 text-end text-xs text-nino-ink/50">
                    {a.referenceCode || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.fullName || ""}>
        {selected && (
          <ApplicationDetail
            app={selected}
            schoolName={selected.flightSchoolId ? schoolMap[selected.flightSchoolId] : undefined}
          />
        )}
      </Modal>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs text-nino-ink/40">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  );
}

function ApplicationDetail({
  app: a,
  schoolName,
}: {
  app: Application;
  schoolName?: string;
}) {
  return (
    <div className="space-y-6">
      {a.referenceCode && (
        <div dir="ltr" className="inline-block rounded-full bg-nino-cream px-3 py-1.5 text-xs font-medium text-nino-orange">
          {a.referenceCode}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="الجنسية" value={a.nationality} />
        <Field label="مقيم حاليًا في" value={a.currentResidence} />
        <Field label="البريد الإلكتروني" value={a.email} />
        <Field label="الهاتف" value={a.phone} />
        <Field label="الواتساب" value={a.whatsapp} />
        <Field label="الرخصة المطلوبة" value={a.desiredLicense} />
        <Field label="المدرسة المختارة" value={schoolName} />
        <Field label="الميزانية" value={a.estimatedBudget} />
      </div>

      {(a.englishLevel || a.fundingSource || a.accommodationBudgetOk || a.medicalConcern) && (
        <div>
          <div className="text-xs text-nino-ink/40">التقييم</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {a.englishLevel && (
              <span className="rounded-full bg-nino-cream px-2.5 py-1 text-xs text-nino-ink/70">
                {ENGLISH_LABELS[a.englishLevel] ?? a.englishLevel}
              </span>
            )}
            {a.fundingSource && (
              <span className="rounded-full bg-nino-cream px-2.5 py-1 text-xs text-nino-ink/70">
                {FUNDING_LABELS[a.fundingSource] ?? a.fundingSource}
              </span>
            )}
            {a.accommodationBudgetOk && (
              <span className="rounded-full bg-nino-cream px-2.5 py-1 text-xs text-nino-ink/70">
                {ACCOMMODATION_BUDGET_LABELS[a.accommodationBudgetOk] ?? a.accommodationBudgetOk}
              </span>
            )}
            {a.medicalConcern && a.medicalConcern !== "no" && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-700">
                {MEDICAL_LABELS[a.medicalConcern] ?? a.medicalConcern}
              </span>
            )}
          </div>
        </div>
      )}

      {a.notes && (
        <div>
          <div className="text-xs text-nino-ink/40">ملاحظات</div>
          <p className="mt-1 text-sm text-nino-ink/80">{a.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-nino-line pt-5">
        <form action={updateApplicationStatus} className="flex flex-1 items-center gap-2">
          <input type="hidden" name="id" value={a.id} />
          <select
            name="status"
            defaultValue={a.status}
            className="flex-1 rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          >
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-nino-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
          >
            تحديث
          </button>
        </form>
        <form
          action={deleteApplication}
          onSubmit={(e) => {
            if (!confirm("متأكد إنك تبي تحذف هذا الطلب؟ ما يرجع بعد الحذف.")) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={a.id} />
          <button type="submit" className="shrink-0 text-sm text-red-500 hover:underline">
            حذف
          </button>
        </form>
      </div>
    </div>
  );
}
