import Link from "next/link";
import { db } from "@/db/client";
import { flightSchools, accommodations, applications } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AdminOverviewPage() {
  const allSchools = await db.select().from(flightSchools);
  const allAcc = await db.select().from(accommodations);
  const allApps = await db.select().from(applications);
  const newApps = allApps.filter((a) => a.status === "new");

  const cards = [
    { label: "مدارس الطيران", value: allSchools.length, href: "/admin/schools" },
    {
      label: "منشور منها",
      value: allSchools.filter((s) => s.status === "published").length,
      href: "/admin/schools",
    },
    { label: "خيارات السكن", value: allAcc.length, href: "/admin/accommodation" },
    { label: "طلبات جديدة", value: newApps.length, href: "/admin/applications" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl">نظرة عامة</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-nino-line bg-nino-white p-6 hover:border-nino-orange"
          >
            <div className="font-display text-3xl text-nino-orange">
              {c.value}
            </div>
            <div className="mt-1 text-sm text-nino-ink/60">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
