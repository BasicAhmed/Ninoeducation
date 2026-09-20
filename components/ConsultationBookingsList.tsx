"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { updateConsultationBooking, deleteConsultationBooking } from "@/lib/admin-actions";

type Booking = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  referenceCode: string | null;
  applicationId: string | null;
  preferredDate: string;
  preferredTime: string;
  topic: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "بانتظار التأكيد",
  confirmed: "مؤكد",
  completed: "تمت المكالمة",
  cancelled: "ملغى",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const TIME_LABELS: Record<string, string> = {
  morning: "صباحًا",
  afternoon: "بعد الظهر",
  evening: "مساءً",
};

export function ConsultationBookingsList({ bookings }: { bookings: Booking[] }) {
  return (
    <div>
      <h1 className="font-display text-3xl">حجوزات المكالمات</h1>
      <p className="mt-1 text-sm text-nino-ink/60">{bookings.length} طلب حجز</p>

      <div className="mt-8 space-y-4">
        {bookings.map((b) => {
          const waNumber = b.whatsapp.replace(/[^\d]/g, "");
          return (
            <div key={b.id} className="rounded-2xl border border-nino-line bg-nino-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-nino-ink">{b.name}</p>
                    {b.applicationId && (
                      <span className="flex items-center gap-1 rounded-full bg-nino-orange/10 px-2 py-0.5 text-xs text-nino-orange">
                        <CheckCircle2 size={11} />
                        مطابق لطلب حالي
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-nino-ink/50" dir="ltr">
                    {b.email} · {b.whatsapp}
                  </p>
                  {b.referenceCode && (
                    <p className="mt-0.5 font-mono text-xs text-nino-ink/50" dir="ltr">
                      {b.referenceCode}
                    </p>
                  )}
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${STATUS_COLORS[b.status] ?? ""}`}>
                  {STATUS_LABELS[b.status] ?? b.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs text-nino-ink/50">الموعد المفضل</p>
                  <p className="mt-0.5">
                    {b.preferredDate} · {TIME_LABELS[b.preferredTime] ?? b.preferredTime}
                  </p>
                </div>
                {b.topic && (
                  <div>
                    <p className="text-xs text-nino-ink/50">الموضوع</p>
                    <p className="mt-0.5">{b.topic}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                >
                  راسله على واتساب
                </a>
                {b.applicationId && (
                  <Link
                    href="/admin/applications"
                    className="rounded-full border border-nino-line px-4 py-2 text-xs font-medium text-nino-ink hover:border-nino-orange"
                  >
                    عرض طلبه
                  </Link>
                )}
              </div>

              <form action={updateConsultationBooking} className="mt-5 space-y-3 border-t border-nino-line pt-4">
                <input type="hidden" name="id" value={b.id} />
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    name="status"
                    defaultValue={b.status}
                    className="rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  name="adminNotes"
                  defaultValue={b.adminNotes ?? ""}
                  placeholder="ملاحظات داخلية (اختياري)"
                  rows={2}
                  className="w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-full bg-nino-ink px-5 py-2 text-xs font-medium text-white hover:bg-nino-orange"
                >
                  حفظ
                </button>
              </form>

              <form
                action={deleteConsultationBooking}
                className="mt-3 text-end"
                onSubmit={(e) => {
                  if (!confirm("حذف هذا الطلب؟")) e.preventDefault();
                }}
              >
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" className="text-xs text-red-500 hover:underline">
                  حذف
                </button>
              </form>
            </div>
          );
        })}
        {bookings.length === 0 && (
          <p className="rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
            لا توجد طلبات حجز بعد.
          </p>
        )}
      </div>
    </div>
  );
}
