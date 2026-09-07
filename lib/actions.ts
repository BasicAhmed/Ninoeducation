"use server";

import { db } from "@/db/client";
import { applications, flightSchools, applicationEvents } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

function generateReferenceCode() {
  const year = new Date().getFullYear().toString().slice(-2);
  const digits = Math.floor(1000 + Math.random() * 9000); // 4 digits, never starts with 0
  return `NE${year}-${digits}`;
}

export async function submitApplication(formData: FormData) {
  const schoolSlug = String(formData.get("schoolSlug") || "");
  const email = String(formData.get("email") || "").trim();
  let flightSchoolId: string | null = null;

  if (schoolSlug) {
    const rows = await db
      .select()
      .from(flightSchools)
      .where(eq(flightSchools.slug, schoolSlug))
      .limit(1);
    flightSchoolId = rows[0]?.id ?? null;
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

  await db.insert(applicationEvents).values({
    id: randomUUID(),
    applicationId: values.id,
    type: "created",
    message: "تم استلام الطلب",
    createdAt: now,
  });

  const firstName = values.fullName.trim().split(/\s+/)[0] || "";
  redirect(`/apply/thank-you?ref=${referenceCode}&name=${encodeURIComponent(firstName)}`);
}
