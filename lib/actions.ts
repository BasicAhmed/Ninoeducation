"use server";

import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq, ilike } from "drizzle-orm";
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
  const existing = await db
    .select()
    .from(applications)
    .where(ilike(applications.email, email))
    .limit(1);

  if (existing[0]?.referenceCode) {
    redirect(
      `/track?ref=${existing[0].referenceCode}&email=${encodeURIComponent(email)}&already=1`
    );
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

  const firstName = values.fullName.trim().split(/\s+/)[0] || "";
  redirect(`/apply/thank-you?ref=${referenceCode}&name=${encodeURIComponent(firstName)}`);
}
