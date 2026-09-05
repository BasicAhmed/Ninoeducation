import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { flightSchools, accommodations, applications } from "@/db/schema";
import { or, ilike } from "drizzle-orm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const q = req.nextUrl.searchParams.get("q")?.trim() || "";
  if (q.length < 2) {
    return NextResponse.json({ schools: [], accommodation: [], applications: [] });
  }
  const like = `%${q}%`;

  try {
    const [schools, accommodationResults, applicationResults] = await Promise.all([
      db
        .select()
        .from(flightSchools)
        .where(or(ilike(flightSchools.nameAr, like), ilike(flightSchools.nameEn, like), ilike(flightSchools.city, like)))
        .limit(5),
      db
        .select()
        .from(accommodations)
        .where(or(ilike(accommodations.nameAr, like), ilike(accommodations.city, like)))
        .limit(5),
      db
        .select()
        .from(applications)
        .where(or(ilike(applications.fullName, like), ilike(applications.email, like), ilike(applications.phone, like)))
        .limit(5),
    ]);

    return NextResponse.json({
      schools: schools.map((s) => ({
        id: s.id,
        label: s.nameAr,
        sublabel: s.city,
        href: `/admin/schools/${s.id}/edit`,
      })),
      accommodation: accommodationResults.map((a) => ({
        id: a.id,
        label: a.nameAr,
        sublabel: a.city,
        href: `/admin/accommodation/${a.id}/edit`,
      })),
      applications: applicationResults.map((a) => ({
        id: a.id,
        label: a.fullName,
        sublabel: `${a.email} · ${a.phone}`,
        href: `/admin/applications?q=${encodeURIComponent(a.fullName)}`,
      })),
    });
  } catch (err) {
    console.error("admin search failed:", err);
    return NextResponse.json({ schools: [], accommodation: [], applications: [] });
  }
}
