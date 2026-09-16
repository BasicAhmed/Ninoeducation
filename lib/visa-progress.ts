"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { visaProgress } from "@/db/schema";
import { requireStudentEmail } from "@/lib/student-auth";

async function getOrCreateProgress(email: string) {
  const rows = await db.select().from(visaProgress).where(eq(visaProgress.email, email)).limit(1);
  if (rows[0]) return rows[0];

  const now = new Date().toISOString();
  const fresh = {
    id: randomUUID(),
    email,
    countryId: null,
    step1AppointmentBooked: false,
    step2LocationConfirmed: false,
    documentsChecked: "[]",
    createdAt: now,
    updatedAt: now,
  };
  await db.insert(visaProgress).values(fresh);
  return fresh;
}

export async function getMyVisaProgress() {
  const email = await requireStudentEmail();
  try {
    return await getOrCreateProgress(email);
  } catch (err) {
    console.error("getMyVisaProgress failed:", err);
    return null;
  }
}

// Called once, automatically, the first time a student with no
// country chosen yet loads the tracker and their detected country
// (from Vercel's own geo-IP header, matched against an admin-entered
// country code) has a match — saves it so it sticks on future visits
// without the student needing to pick it manually. A no-op if
// they've already got a country set, so it never overwrites an
// explicit later change.
export async function autoSaveDetectedCountry(countryId: string) {
  const email = await requireStudentEmail();
  try {
    const now = new Date().toISOString();
    const existing = await db.select().from(visaProgress).where(eq(visaProgress.email, email)).limit(1);
    if (existing[0] && !existing[0].countryId) {
      await db.update(visaProgress).set({ countryId, updatedAt: now }).where(eq(visaProgress.email, email));
    }
  } catch (err) {
    console.error("autoSaveDetectedCountry failed:", err);
  }
}

export async function selectVisaCountry(formData: FormData) {
  const email = await requireStudentEmail();
  const countryId = String(formData.get("countryId") || "");
  const now = new Date().toISOString();

  await getOrCreateProgress(email);
  await db
    .update(visaProgress)
    .set({ countryId: countryId || null, updatedAt: now })
    .where(eq(visaProgress.email, email));

  redirect("/dashboard/visa");
}

export async function toggleVisaStep(formData: FormData) {
  const email = await requireStudentEmail();
  const step = String(formData.get("step") || "");
  const now = new Date().toISOString();

  await getOrCreateProgress(email);
  const current = await db.select().from(visaProgress).where(eq(visaProgress.email, email)).limit(1);
  const row = current[0];
  if (!row) redirect("/dashboard/visa");

  if (step === "1") {
    await db
      .update(visaProgress)
      .set({ step1AppointmentBooked: !row.step1AppointmentBooked, updatedAt: now })
      .where(eq(visaProgress.email, email));
  } else if (step === "2") {
    await db
      .update(visaProgress)
      .set({ step2LocationConfirmed: !row.step2LocationConfirmed, updatedAt: now })
      .where(eq(visaProgress.email, email));
  }

  redirect("/dashboard/visa");
}

export async function toggleVisaDocument(formData: FormData) {
  const email = await requireStudentEmail();
  const docId = String(formData.get("docId") || "");
  const now = new Date().toISOString();

  const row = await getOrCreateProgress(email);
  let checked: string[] = [];
  try {
    checked = JSON.parse(row.documentsChecked);
  } catch {
    checked = [];
  }

  const next = checked.includes(docId) ? checked.filter((d) => d !== docId) : [...checked, docId];

  await db
    .update(visaProgress)
    .set({ documentsChecked: JSON.stringify(next), updatedAt: now })
    .where(eq(visaProgress.email, email));

  redirect("/dashboard/visa");
}
