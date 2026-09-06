import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { eq } from "drizzle-orm";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

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

const ERRORS: Record<Lang, { enterRef: string; notFound: string; emailMismatch: string; generic: string }> = {
  ar: {
    enterRef: "أدخل رقم الرحلة",
    notFound: "لم نجد رحلة بهذا الرقم",
    emailMismatch: "البريد الإلكتروني لا يطابق هذا الطلب",
    generic: "حدث خطأ، حاول مرة أخرى",
  },
  en: {
    enterRef: "Enter your flight number",
    notFound: "We couldn't find a flight with that number",
    emailMismatch: "That email doesn't match this application",
    generic: "Something went wrong, please try again",
  },
};

export async function POST(req: NextRequest) {
  const { referenceCode, email, lang: rawLang } = await req.json().catch(() => ({}));
  const lang: Lang = rawLang === "en" ? "en" : "ar";
  const err = ERRORS[lang];

  if (!referenceCode || typeof referenceCode !== "string") {
    return NextResponse.json({ error: err.enterRef }, { status: 400 });
  }

  try {
    const rows = await db
      .select()
      .from(applications)
      .where(eq(applications.referenceCode, referenceCode.trim().toUpperCase()))
      .limit(1);

    const app = rows[0];
    if (!app) {
      return NextResponse.json({ error: err.notFound }, { status: 404 });
    }

    // Light verification — require the email used at submission so a
    // guessed reference code can't leak someone else's application.
    if (!email || app.email.toLowerCase() !== String(email).trim().toLowerCase()) {
      return NextResponse.json({ error: err.emailMismatch }, { status: 403 });
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
      statusLabel: STATUS_LABELS[lang][app.status] ?? app.status,
      desiredLicense: app.desiredLicense,
      schoolName,
      createdAt: app.createdAt,
    });
  } catch (err2) {
    console.error("track lookup failed:", err2);
    return NextResponse.json({ error: err.generic }, { status: 500 });
  }
}
