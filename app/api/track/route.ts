import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  new: "تم استلام طلبك",
  contacted: "تم التواصل معك",
  documents_required: "بانتظار مستندات منك",
  submitted_to_school: "أُرسل طلبك للمدرسة",
  accepted: "تم قبولك",
  rejected: "لم يُقبل هذه المرة",
  enrolled: "تم تسجيلك",
};

export async function POST(req: NextRequest) {
  const { referenceCode, email } = await req.json().catch(() => ({}));

  if (!referenceCode || typeof referenceCode !== "string") {
    return NextResponse.json({ error: "أدخل رقم الرحلة" }, { status: 400 });
  }

  try {
    const rows = await db
      .select()
      .from(applications)
      .where(eq(applications.referenceCode, referenceCode.trim().toUpperCase()))
      .limit(1);

    const app = rows[0];
    if (!app) {
      return NextResponse.json({ error: "لم نجد رحلة بهذا الرقم" }, { status: 404 });
    }

    // Light verification — require the email used at submission so a
    // guessed reference code can't leak someone else's application.
    if (!email || app.email.toLowerCase() !== String(email).trim().toLowerCase()) {
      return NextResponse.json(
        { error: "البريد الإلكتروني لا يطابق هذا الطلب" },
        { status: 403 }
      );
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

    return NextResponse.json({
      referenceCode: app.referenceCode,
      fullName: app.fullName,
      status: app.status,
      statusLabel: STATUS_LABELS[app.status] ?? app.status,
      desiredLicense: app.desiredLicense,
      schoolName,
      createdAt: app.createdAt,
    });
  } catch (err) {
    console.error("track lookup failed:", err);
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
