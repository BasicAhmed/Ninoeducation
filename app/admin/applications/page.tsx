import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { updateApplicationStatus } from "@/lib/admin-actions";

const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  documents_required: "مستندات مطلوبة",
  submitted_to_school: "أُرسل للمدرسة",
  accepted: "مقبول",
  rejected: "مرفوض",
  enrolled: "مسجَّل",
};

export default async function AdminApplicationsPage() {
  const apps = await db.select().from(applications).orderBy(desc(applications.createdAt));
  const schools = await db.select().from(flightSchools);
  const schoolMap = new Map(schools.map((s) => [s.id, s.nameAr]));

  return (
    <div>
      <h1 className="font-display text-3xl">طلبات الطلاب</h1>

      <div className="mt-8 space-y-4">
        {apps.length === 0 && (
          <p className="rounded-2xl border border-dashed border-nino-line bg-nino-white p-8 text-center text-nino-ink/60">
            لا توجد طلبات بعد.
          </p>
        )}
        {apps.map((a) => (
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
                  {a.flightSchoolId
                    ? ` · المدرسة: ${schoolMap.get(a.flightSchoolId) ?? "غير معروفة"}`
                    : ""}
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
