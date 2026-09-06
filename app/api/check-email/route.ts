import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
import { type Lang } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<Lang, Record<string, string>> = {
  ar: {
    new: "تم استلام طلبك",
    contacted: "تم التواصل معك",
    documents_required: "بانتظار مستندات منك",
    submitted_to_school: "أُرسل طلبك للمدرسة",
    accepted: "تم قبولك",
    rejected: "لم يُقبل هذه المرة",
    enrolled: "تم تسجيلك",
  },
  en: {
    new: "Application received",
    contacted: "We've contacted you",
    documents_required: "Awaiting documents from you",
    submitted_to_school: "Sent to the school",
    accepted: "You've been accepted",
    rejected: "Not accepted this time",
    enrolled: "You're enrolled",
  },
};

export async function POST(req: NextRequest) {
  const { email, lang: rawLang } = await req.json().catch(() => ({ email: "" }));
  const lang: Lang = rawLang === "en" ? "en" : "ar";
  const clean = String(email || "").trim().toLowerCase();

  if (!clean) {
    return NextResponse.json({ exists: false });
  }

  try {
    const rows = await db
      .select()
      .from(applications)
      .where(sql`lower(${applications.email}) = ${clean}`)
      .limit(1);

    const app = rows[0];
    if (!app) {
      return NextResponse.json({ exists: false });
    }

    let schoolName: string | null = null;
    if (app.flightSchoolId) {
      const schoolRows = await db
        .select()
        .from(flightSchools)
        .where(eq(flightSchools.id, app.flightSchoolId))
        .limit(1);
      schoolName = schoolRows[0]?.nameAr ?? null;
    }

    // This shows a bit more than a bare existence check (name, status,
    // school) since the whole point is showing their current status
    // immediately rather than making them click through to /track.
    // Kept to non-sensitive fields only — no phone, budget, medical
    // flag, or notes here regardless of who typed the email.
    return NextResponse.json({
      exists: true,
      referenceCode: app.referenceCode,
      fullName: app.fullName,
      status: app.status,
      statusLabel: STATUS_LABELS[lang][app.status] ?? app.status,
      schoolName,
    });
  } catch (err) {
    console.error("check-email failed:", err);
    // Fail open — never block a real applicant from continuing just
    // because this convenience check errored.
    return NextResponse.json({ exists: false });
  }
}
