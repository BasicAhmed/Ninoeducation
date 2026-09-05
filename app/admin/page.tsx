import Link from "next/link";
import { db } from "@/db/client";
import { flightSchools, accommodations, applications } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plane, Home, ClipboardList, TrendingUp } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  documents_required: "مستندات مطلوبة",
  submitted_to_school: "أُرسل للمدرسة",
  accepted: "مقبول",
  rejected: "مرفوض",
  enrolled: "مسجَّل",
};

export default async function AdminOverviewPage() {
  const [allSchools, allAcc, allApps] = await Promise.all([
    db.select().from(flightSchools),
    db.select().from(accommodations),
    db.select().from(applications).orderBy(desc(applications.createdAt)),
  ]);

  const newApps = allApps.filter((a) => a.status === "new").length;
  const enrolled = allApps.filter((a) => a.status === "enrolled").length;
  const recentApps = allApps.slice(0, 6);

  const cards = [
    {
      label: "مدارس الطيران",
      value: allSchools.length,
      sub: `${allSchools.filter((s) => s.status === "published").length} منشورة`,
      href: "/admin/schools",
      icon: Plane,
    },
    {
      label: "خيارات السكن",
      value: allAcc.length,
      sub: `${allAcc.filter((a) => a.status === "published").length} منشورة`,
      href: "/admin/accommodation",
      icon: Home,
    },
    {
      label: "إجمالي الطلبات",
      value: allApps.length,
      sub: `${newApps} جديدة`,
      href: "/admin/applications",
      icon: ClipboardList,
    },
    {
      label: "طلاب مسجَّلون",
      value: enrolled,
      sub: "تم تسجيلهم فعليًا",
      href: "/admin/applications",
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl">نظرة عامة</h1>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-2xl border border-nino-line bg-nino-white p-6 transition hover:-translate-y-0.5 hover:border-nino-orange hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
                  <Icon size={17} />
                </div>
                <div className="font-display text-3xl text-nino-ink">{c.value}</div>
              </div>
              <div className="mt-3 text-sm font-medium text-nino-ink">{c.label}</div>
              <div className="mt-0.5 text-xs text-nino-ink/50">{c.sub}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl">أحدث الطلبات</h2>
        <Link href="/admin/applications" className="text-sm text-nino-orange hover:underline">
          عرض الكل ←
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        {recentApps.length === 0 ? (
          <p className="p-8 text-center text-sm text-nino-ink/50">لا توجد طلبات بعد.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody className="[&>tr]:border-t [&>tr]:border-nino-line [&>tr:first-child]:border-t-0">
              {recentApps.map((a) => (
                <tr key={a.id}>
                  <td className="p-4 font-medium">{a.fullName}</td>
                  <td className="p-4 text-nino-ink/60">{a.nationality}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-nino-cream px-2.5 py-1 text-xs">
                      {STATUS_LABELS[a.status] ?? a.status}
                    </span>
                  </td>
                  <td dir="ltr" className="p-4 text-end text-xs text-nino-ink/40">
                    {new Date(a.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/schools"
          className="rounded-2xl border border-dashed border-nino-line p-5 text-center text-sm hover:border-nino-orange hover:text-nino-orange"
        >
          + إضافة مدرسة جديدة
        </Link>
        <Link
          href="/admin/accommodation"
          className="rounded-2xl border border-dashed border-nino-line p-5 text-center text-sm hover:border-nino-orange hover:text-nino-orange"
        >
          + إضافة خيار سكن
        </Link>
        <Link
          href="/admin/social"
          className="rounded-2xl border border-dashed border-nino-line p-5 text-center text-sm hover:border-nino-orange hover:text-nino-orange"
        >
          + إضافة منشور إنستقرام
        </Link>
      </div>
    </div>
  );
}
