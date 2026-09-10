import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db/client";
import { applications } from "@/db/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { requireStudentEmail, logoutStudent } from "@/lib/student-auth";
import { LICENSE_LABELS, WHATSAPP_NUMBER, SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].dashboard;
  return {
    title: `${t.welcomeBack} | نينو إديوكيشن`,
    alternates: { canonical: `${SITE_URL}/dashboard` },
    robots: { index: false },
  };
}

const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  documents_required: "مستندات مطلوبة",
  submitted_to_school: "أُرسل للمدرسة",
  accepted: "مقبول",
  rejected: "مرفوض",
  enrolled: "مسجَّل",
};

const STATUS_ORDER = [
  "new",
  "contacted",
  "documents_required",
  "submitted_to_school",
  "accepted",
  "enrolled",
];

export default async function DashboardPage() {
  const lang = await getLang();
  const t = dictionaries[lang].dashboard;
  const email = await requireStudentEmail();

  let rows: (typeof applications.$inferSelect)[] = [];
  try {
    rows = await db
      .select()
      .from(applications)
      .where(eq(applications.email, email))
      .orderBy(desc(applications.createdAt));
  } catch (err) {
    console.error("dashboard applications lookup failed:", err);
  }

  const firstName = rows[0]?.fullName?.trim().split(/\s+/)[0] || "";

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 pb-16 pt-28">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-3xl">
              {t.welcomeBack}
              {firstName ? `، ${firstName}` : ""}
            </h1>
            <form action={logoutStudent}>
              <button className="text-sm text-nino-ink/50 hover:text-nino-ink hover:underline">
                {t.logout}
              </button>
            </form>
          </div>

          {rows.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
              <p>{t.noApplications}</p>
              <Link href="/" className="mt-3 inline-block text-sm text-nino-orange hover:underline">
                {t.backHome}
              </Link>
            </div>
          )}

          <div className="mt-8 space-y-5">
            {rows.map((app) => {
              const isRejected = app.status === "rejected";
              const currentIndex = STATUS_ORDER.indexOf(app.status);
              const waMessage = `مرحبًا، رقم رحلتي هو ${app.referenceCode} — أريد الاستفسار عن طلبي.`;

              return (
                <div key={app.id} className="rounded-2xl border border-nino-line bg-white p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-nino-ink/50">{t.yourReference}</p>
                      <p dir="ltr" className="font-mono text-lg font-semibold text-nino-ink">
                        {app.referenceCode}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-nino-cream px-3 py-1.5 text-sm">
                      {isRejected ? (
                        <Clock size={15} className="text-nino-ink/50" />
                      ) : (
                        <CheckCircle2 size={15} className="text-nino-orange" />
                      )}
                      <span className="font-medium">
                        {STATUS_LABELS[app.status] ?? app.status}
                      </span>
                    </div>
                  </div>

                  {!isRejected && currentIndex >= 0 && (
                    <div className="mt-4 h-1.5 rounded-full bg-nino-line">
                      <div
                        className="h-full rounded-full bg-nino-orange transition-all"
                        style={{ width: `${((currentIndex + 1) / STATUS_ORDER.length) * 100}%` }}
                      />
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-nino-ink/50">{t.yourLicense}</p>
                      <p className="mt-0.5">{LICENSE_LABELS[app.desiredLicense] ?? app.desiredLicense}</p>
                    </div>
                    <div>
                      <p className="text-xs text-nino-ink/50">{t.appliedOn}</p>
                      <p className="mt-0.5">{new Date(app.createdAt).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`}
                    className="mt-5 inline-block rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    {t.contactUs}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
