import { db } from "@/db/client";
import { applicationDrafts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { LICENSE_LABELS } from "@/lib/constants";
import { DismissDraftButton } from "@/components/admin/DismissDraftButton";

const STEP_NAMES = [
  "الهوية",
  "الملف الشخصي",
  "التواصل",
  "الجاهزية المالية",
  "الاستعداد",
  "الرخصة والمدرسة",
  "المراجعة النهائية",
];

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "أقل من ساعة";
  if (hours < 24) return `منذ ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

export default async function AbandonedApplicationsPage() {
  let drafts: (typeof applicationDrafts.$inferSelect)[] = [];
  try {
    drafts = await db
      .select()
      .from(applicationDrafts)
      .orderBy(desc(applicationDrafts.updatedAt));
  } catch (err) {
    console.error("AbandonedApplicationsPage lookup failed:", err);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">طلبات متروكة</h1>
          <p className="mt-1 text-sm text-nino-ink/60">
            زوار بدأوا التقديم بس ما كملوه — تواصل معهم قبل لا يسجلون في مكان ثاني.
          </p>
        </div>
        <span className="text-xs text-nino-ink/50">{drafts.length} طلب متروك</span>
      </div>

      <div className="mt-6 space-y-4">
        {drafts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/50">
            ما فيه طلبات متروكة حاليًا — كل الزوار إما كملوا طلبهم أو ما وصلوا لخطوة التواصل بعد.
          </p>
        )}
        {drafts.map((d) => {
          const waNumber = (d.whatsapp || d.phone || "").replace(/[^\d]/g, "");
          const firstName = (d.fullName || "").trim().split(/\s+/)[0] || "";
          const waMessage = firstName
            ? `هلا ${firstName}، شفت إنك بدأت طلبك معنا بس ما كملته — احتجت مساعدة في أي شي؟`
            : "هلا، شفت إنك بدأت طلبك معنا بس ما كملته — احتجت مساعدة في أي شي؟";
          const waLink = waNumber
            ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
            : null;

          return (
            <div
              key={d.id}
              className="rounded-2xl border border-nino-line bg-nino-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-nino-ink">
                    {d.fullName || "بدون اسم بعد"}
                  </p>
                  <p className="mt-0.5 text-sm text-nino-ink/60">
                    {d.email}
                    {d.phone ? ` · ${d.phone}` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                  وصل إلى: {STEP_NAMES[d.lastStep - 1] ?? `خطوة ${d.lastStep}`}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-nino-ink/50">
                {d.nationality && <span>الجنسية: {d.nationality}</span>}
                {d.desiredLicense && (
                  <span>الرخصة: {LICENSE_LABELS[d.desiredLicense] ?? d.desiredLicense}</span>
                )}
                {d.estimatedBudget && <span>الميزانية: {d.estimatedBudget}</span>}
                <span>آخر نشاط: {timeAgo(d.updatedAt)}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                  >
                    راسله على واتساب
                  </a>
                )}
                <a
                  href={`mailto:${d.email}`}
                  className="rounded-full border border-nino-line px-4 py-2 text-xs font-medium text-nino-ink hover:border-nino-ink"
                >
                  إرسال إيميل
                </a>
                <DismissDraftButton id={d.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
