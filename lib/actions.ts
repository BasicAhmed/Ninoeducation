"use server";

import { db } from "@/db/client";
import { applications, flightSchools, applicationEvents, applicationDrafts } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";
import { ApplicationReceivedEmail, applicationReceivedSubject } from "@/emails/ApplicationReceived";
import { NewApplicationAdminEmail } from "@/emails/NewApplicationAdmin";
import { ADMIN_NOTIFICATION_EMAIL } from "@/lib/constants";

function generateReferenceCode() {
  const year = new Date().getFullYear().toString().slice(-2);
  const digits = Math.floor(1000 + Math.random() * 9000); // 4 digits, never starts with 0
  return `NE${year}-${digits}`;
}

// Called from the apply wizard as the visitor progresses past the
// contact step (and again on later steps, to enrich the draft with
// more context) — not on every keystroke, just on step transitions.
// Upserted by email so restarting or reloading the wizard updates the
// same draft rather than creating duplicates. Silently no-ops on
// failure (e.g. malformed email) since this is a best-effort recovery
// signal, not a step the visitor's own flow should ever be blocked by.
export async function saveApplicationDraft(data: {
  email: string;
  fullName: string;
  nationality: string;
  phone: string;
  whatsapp: string;
  desiredLicense: string;
  estimatedBudget: string;
  lastStep: number;
  preferredLang: string;
}) {
  const email = data.email.trim().toLowerCase();
  if (!email || !email.includes("@")) return;

  try {
    const now = new Date().toISOString();
    await db
      .insert(applicationDrafts)
      .values({
        id: randomUUID(),
        email,
        fullName: data.fullName || null,
        nationality: data.nationality || null,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        desiredLicense: data.desiredLicense || null,
        estimatedBudget: data.estimatedBudget || null,
        lastStep: data.lastStep,
        preferredLang: data.preferredLang || null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: applicationDrafts.email,
        set: {
          fullName: data.fullName || null,
          nationality: data.nationality || null,
          phone: data.phone || null,
          whatsapp: data.whatsapp || null,
          desiredLicense: data.desiredLicense || null,
          estimatedBudget: data.estimatedBudget || null,
          lastStep: data.lastStep,
          preferredLang: data.preferredLang || null,
          updatedAt: now,
        },
      });
  } catch (err) {
    console.error("saveApplicationDraft failed:", err);
  }
}

export async function submitApplication(formData: FormData) {
  const schoolSlug = String(formData.get("schoolSlug") || "");
  const email = String(formData.get("email") || "").trim();
  const lang = String(formData.get("lang") || "") === "en" ? "en" : "ar";
  let flightSchoolId: string | null = null;
  let schoolName: string | null = null;

  if (schoolSlug) {
    const rows = await db
      .select()
      .from(flightSchools)
      .where(eq(flightSchools.slug, schoolSlug))
      .limit(1);
    flightSchoolId = rows[0]?.id ?? null;
    schoolName = rows[0]?.nameAr ?? null;
  }

  // Same email can't apply twice — send them straight to their
  // existing application's status instead of creating a duplicate.
  // Match on email alone, regardless of what name they typed this
  // time — the person is who they say they are by email, not name.
  // Exact case-insensitive match via lower() rather than ilike, since
  // ilike treats "_" as a wildcard and emails can legitimately
  // contain underscores — ilike could false-positive-match a
  // different address that happens to share the same length/shape.
  const existing = email
    ? await db
        .select()
        .from(applications)
        .where(sql`lower(${applications.email}) = ${email.toLowerCase()}`)
        .limit(1)
    : [];

  if (existing[0]) {
    console.log(`submitApplication: duplicate email detected (${email}), redirecting to existing application ${existing[0].id}`);
    let refCode = existing[0].referenceCode;
    if (!refCode) {
      // Older row from before reference codes existed — backfill one
      // now instead of silently letting a duplicate through.
      refCode = generateReferenceCode();
      await db
        .update(applications)
        .set({ referenceCode: refCode, updatedAt: new Date().toISOString() })
        .where(eq(applications.id, existing[0].id));
    }
    redirect(`/track?ref=${refCode}&email=${encodeURIComponent(email)}&already=1`);
  }

  const now = new Date().toISOString();

  const values = {
    id: randomUUID(),
    fullName: String(formData.get("fullName") || ""),
    nationality: String(formData.get("nationality") || ""),
    phone: String(formData.get("phone") || ""),
    whatsapp: String(formData.get("whatsapp") || "") || null,
    email,
    currentLicense: String(formData.get("currentLicense") || "") || null,
    desiredLicense: String(formData.get("desiredLicense") || ""),
    estimatedBudget: String(formData.get("estimatedBudget") || "") || null,
    preferredStart: String(formData.get("preferredStart") || "") || null,
    notes: String(formData.get("notes") || "") || null,
    status: "new",
    flightSchoolId,
    currentResidence: String(formData.get("currentResidence") || "") || null,
    englishLevel: String(formData.get("englishLevel") || "") || null,
    fundingSource: String(formData.get("fundingSource") || "") || null,
    accommodationBudgetOk: String(formData.get("accommodationBudgetOk") || "") || null,
    medicalConcern: String(formData.get("medicalConcern") || "") || null,
    applicantType: String(formData.get("applicantType") || "") || null,
    ageGroup: String(formData.get("ageGroup") || "") || null,
    educationStatus: String(formData.get("educationStatus") || "") || null,
    preferredLang: lang,
    createdAt: now,
    updatedAt: now,
  };

  // Retry a handful of times on the rare chance two applicants land on
  // the same 4-digit code in the same year (unique constraint on
  // reference_code catches it — Postgres error code 23505).
  let referenceCode = "";
  for (let attempt = 0; attempt < 6; attempt++) {
    referenceCode = generateReferenceCode();
    try {
      await db.insert(applications).values({ ...values, referenceCode });
      break;
    } catch (err: unknown) {
      const isUniqueViolation =
        typeof err === "object" && err !== null && "code" in err && err.code === "23505";
      if (!isUniqueViolation || attempt === 5) throw err;
    }
  }

  // Clean up the draft now that it's a real application — best-effort,
  // never blocks submission if it fails.
  try {
    await db.delete(applicationDrafts).where(eq(applicationDrafts.email, email));
  } catch (err) {
    console.error("draft cleanup after submitApplication failed:", err);
  }

  await db.insert(applicationEvents).values({
    id: randomUUID(),
    applicationId: values.id,
    type: "created",
    message: "تم استلام الطلب",
    createdAt: now,
  });

  const firstName = values.fullName.trim().split(/\s+/)[0] || "";

  // Best-effort — sendEmail() never throws, so a Resend outage or a
  // missing API key can never block a real application from
  // completing. The application is already safely saved above either
  // way.
  await Promise.all([
    sendEmail({
      to: email,
      subject: applicationReceivedSubject(lang, values.fullName),
      react: ApplicationReceivedEmail({ lang, fullName: values.fullName, referenceCode }),
    }),
    sendEmail({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `طلب جديد: ${values.fullName} (${referenceCode})`,
      react: NewApplicationAdminEmail({
        fullName: values.fullName,
        referenceCode,
        applicantType: values.applicantType,
        ageGroup: values.ageGroup,
        educationStatus: values.educationStatus,
        nationality: values.nationality,
        currentResidence: values.currentResidence,
        email,
        phone: values.phone,
        whatsapp: values.whatsapp,
        desiredLicense: values.desiredLicense,
        currentLicense: values.currentLicense,
        estimatedBudget: values.estimatedBudget,
        fundingSource: values.fundingSource,
        accommodationBudgetOk: values.accommodationBudgetOk,
        englishLevel: values.englishLevel,
        medicalConcern: values.medicalConcern,
        preferredStart: values.preferredStart,
        notes: values.notes,
        schoolName,
      }),
    }),
  ]);

  redirect(`/apply/thank-you?ref=${referenceCode}&name=${encodeURIComponent(firstName)}`);
}
