"use server";

import { db } from "@/db/client";
import { applications, consultationBookings } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq, sql, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";
import { ConsultationBookingAdminEmail } from "@/emails/ConsultationBookingAdmin";
import {
  ConsultationBookingReceivedEmail,
  consultationBookingReceivedSubject,
} from "@/emails/ConsultationBookingReceived";
import { ADMIN_NOTIFICATION_EMAIL } from "@/lib/constants";

export async function submitConsultationBooking(formData: FormData) {
  const lang = String(formData.get("lang") || "ar") === "en" ? "en" : "ar";
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const referenceCodeRaw = String(formData.get("referenceCode") || "").trim();
  const referenceCode = referenceCodeRaw || null;
  const preferredDate = String(formData.get("preferredDate") || "").trim();
  const preferredTime = String(formData.get("preferredTime") || "").trim();
  const topic = String(formData.get("topic") || "").trim() || null;

  if (!name || !email || !whatsapp || !preferredDate || !preferredTime) {
    redirect("/consultation?error=missing");
  }

  const now = new Date().toISOString();
  const id = randomUUID();

  // Best-effort match against an existing application — by the exact
  // reference code if one was given, otherwise by email, so a
  // returning applicant's context shows up in admin automatically
  // instead of needing to be searched for. Never blocks submission if
  // this lookup fails.
  let applicationId: string | null = null;
  let hasMatchedApplication = false;
  try {
    const conditions = referenceCode
      ? or(eq(applications.referenceCode, referenceCode), sql`lower(${applications.email}) = ${email}`)
      : sql`lower(${applications.email}) = ${email}`;
    const match = await db.select({ id: applications.id }).from(applications).where(conditions).limit(1);
    if (match[0]) {
      applicationId = match[0].id;
      hasMatchedApplication = true;
    }
  } catch (err) {
    console.error("consultation booking application match failed:", err);
  }

  try {
    await db.insert(consultationBookings).values({
      id,
      name,
      email,
      whatsapp,
      referenceCode,
      applicationId,
      preferredDate,
      preferredTime,
      topic,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  } catch (err) {
    console.error("submitConsultationBooking insert failed:", err);
    redirect("/consultation?error=failed");
  }

  // Best-effort emails — never block the visitor's confirmation on
  // email delivery succeeding.
  try {
    await sendEmail({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `طلب حجز مكالمة من ${name}`,
      react: ConsultationBookingAdminEmail({
        name,
        email,
        whatsapp,
        referenceCode,
        hasMatchedApplication,
        preferredDate,
        preferredTime,
        topic,
      }),
    });
  } catch (err) {
    console.error("consultation booking admin email failed:", err);
  }

  try {
    await sendEmail({
      to: email,
      subject: consultationBookingReceivedSubject(lang),
      react: ConsultationBookingReceivedEmail({ lang, name, preferredDate, preferredTime }),
    });
  } catch (err) {
    console.error("consultation booking confirmation email failed:", err);
  }

  redirect("/consultation/thank-you");
}
