"use client";

import { useEffect, useMemo, useState } from "react";
import {
  updateApplicationStatus,
  deleteApplication,
  assignApplicationSchool,
  assignApplicationAccommodation,
} from "@/lib/admin-actions";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { Modal } from "@/components/Modal";
import { History, Building2, Home } from "lucide-react";

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

type Option = { id: string; nameAr: string };

type Application = {
  id: string;
  fullName: string;
  nationality: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  desiredLicense: string;
  flightSchoolId: string | null;
  accommodationId: string | null;
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
  schools,
  accommodations,
  initialQuery = "",
}: {
  apps: Application[];
  schools: Option[];
  accommodations: Option[];
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
            schools={schools}
            accommodations={accommodations}
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

type EventRow = { id: string; type: string; message: string; createdAt: string };

function ApplicationDetail({
  app: a,
  schools,
  accommodations,
}: {
  app: Application;
  schools: Option[];
  accommodations: Option[];
}) {
  const [events, setEvents] = useState<EventRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/application-events?id=${a.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setEvents(json.events || []);
      })
      .catch(() => {
        if (!cancelled) setEvents([]);
      });
    return () => {
      cancelled = true;
    };
  }, [a.id]);

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

      {/* School & accommodation assignment — real options from the system, not free text */}
      <div className="grid gap-4 border-t border-nino-line pt-5 sm:grid-cols-2">
        <form action={assignApplicationSchool} className="space-y-1.5">
          <input type="hidden" name="id" value={a.id} />
          <label className="flex items-center gap-1.5 text-xs font-medium text-nino-ink/60">
            <Building2 size={13} />
            المدرسة المختارة
          </label>
          <div className="flex gap-2">
            <select
              name="flightSchoolId"
              defaultValue={a.flightSchoolId || ""}
              className="flex-1 rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
            >
              <option value="">بدون مدرسة</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameAr}
                </option>
              ))}
            </select>
            <button type="submit" className="shrink-0 rounded-lg bg-nino-ink px-3 py-2.5 text-xs font-medium text-white hover:bg-nino-orange">
              حفظ
            </button>
          </div>
        </form>

        <form action={assignApplicationAccommodation} className="space-y-1.5">
          <input type="hidden" name="id" value={a.id} />
          <label className="flex items-center gap-1.5 text-xs font-medium text-nino-ink/60">
            <Home size={13} />
            السكن المختار
          </label>
          <div className="flex gap-2">
            <select
              name="accommodationId"
              defaultValue={a.accommodationId || ""}
              className="flex-1 rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
            >
              <option value="">بدون سكن</option>
              {accommodations.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.nameAr}
                </option>
              ))}
            </select>
            <button type="submit" className="shrink-0 rounded-lg bg-nino-ink px-3 py-2.5 text-xs font-medium text-white hover:bg-nino-orange">
              حفظ
            </button>
          </div>
        </form>
      </div>

      {/* Status update + delete */}
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

      {/* Activity history — the audit trail future automation can hook into */}
      <div className="border-t border-nino-line pt-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-nino-ink/60">
          <History size={13} />
          سجل النشاط
        </div>
        <div className="mt-3 space-y-3">
          {events === null && <p className="text-xs text-nino-ink/40">جارٍ التحميل...</p>}
          {events && events.length === 0 && <p className="text-xs text-nino-ink/40">لا يوجد سجل بعد.</p>}
          {events &&
            events.map((e) => (
              <div key={e.id} className="flex items-start gap-3 text-sm">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nino-orange" />
                <div>
                  <div className="text-nino-ink/80">{e.message}</div>
                  <div dir="ltr" className="text-end text-xs text-nino-ink/40">
                    {new Date(e.createdAt).toLocaleString("ar-EG")}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
