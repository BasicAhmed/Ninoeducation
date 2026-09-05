"use server";

import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function submitApplication(formData: FormData) {
  const schoolSlug = String(formData.get("schoolSlug") || "");
  let flightSchoolId: string | null = null;

  if (schoolSlug) {
    const rows = await db
      .select()
      .from(flightSchools)
      .where(eq(flightSchools.slug, schoolSlug))
      .limit(1);
    flightSchoolId = rows[0]?.id ?? null;
  }

  const now = new Date().toISOString();

  await db.insert(applications).values({
    id: randomUUID(),
    fullName: String(formData.get("fullName") || ""),
    nationality: String(formData.get("nationality") || ""),
    phone: String(formData.get("phone") || ""),
    whatsapp: String(formData.get("whatsapp") || "") || null,
    email: String(formData.get("email") || ""),
    currentLicense: String(formData.get("currentLicense") || "") || null,
    desiredLicense: String(formData.get("desiredLicense") || ""),
    estimatedBudget: String(formData.get("estimatedBudget") || "") || null,
    preferredStart: String(formData.get("preferredStart") || "") || null,
    notes: String(formData.get("notes") || "") || null,
    status: "new",
    flightSchoolId,
    createdAt: now,
    updatedAt: now,
  });

  redirect("/apply/thank-you");
}
