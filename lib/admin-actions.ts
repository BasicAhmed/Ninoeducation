"use server";

import { db } from "@/db/client";
import { flightSchools, accommodations, applications, socialPosts, applicationEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { sendEmail } from "@/lib/email";
import { StatusUpdateEmail, statusUpdateSubject } from "@/emails/StatusUpdate";

async function logEvent(applicationId: string, type: string, message: string) {
  await db.insert(applicationEvents).values({
    id: randomUUID(),
    applicationId,
    type,
    message,
    createdAt: new Date().toISOString(),
  });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function saveSchool(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const now = new Date().toISOString();
  const nameEn = String(formData.get("nameEn") || "");

  const values = {
    slug: String(formData.get("slug") || slugify(nameEn)),
    nameAr: String(formData.get("nameAr") || ""),
    nameEn,
    province: String(formData.get("province") || ""),
    city: String(formData.get("city") || ""),
    airportName: String(formData.get("airportName") || ""),
    airportCode: String(formData.get("airportCode") || ""),
    descriptionAr: String(formData.get("descriptionAr") || ""),
    shortDescriptionAr: String(formData.get("shortDescriptionAr") || ""),
    licenses: String(formData.get("licenses") || ""),
    trainingType: String(formData.get("trainingType") || "integrated"),
    priceMinUsd: Number(formData.get("priceMinUsd") || 0),
    priceMaxUsd: Number(formData.get("priceMaxUsd") || 0),
    durationMonthsMin: Number(formData.get("durationMonthsMin") || 0),
    durationMonthsMax: Number(formData.get("durationMonthsMax") || 0),
    acceptsInternational: formData.get("acceptsInternational") === "on",
    hasAccommodation: formData.get("hasAccommodation") === "on",
    aircraftFleet: String(formData.get("aircraftFleet") || ""),
    rating: Number(formData.get("rating") || 4.5),
    ninoRanking: Number(formData.get("ninoRanking") || 0),
    websiteUrl: String(formData.get("websiteUrl") || "") || null,
    heroImageUrl: String(formData.get("heroImageUrl") || "") || null,
    nextIntakeDate: String(formData.get("nextIntakeDate") || "") || null,
    seatsAvailable: formData.get("seatsAvailable")
      ? Number(formData.get("seatsAvailable"))
      : null,
    status: String(formData.get("status") || "draft"),
    lastPricingUpdate: now,
    updatedAt: now,
  };

  if (id) {
    await db.update(flightSchools).set(values).where(eq(flightSchools.id, id));
  } else {
    await db.insert(flightSchools).values({ id: randomUUID(), createdAt: now, ...values });
  }

  redirect("/admin/schools");
}

export async function deleteSchool(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await db.delete(flightSchools).where(eq(flightSchools.id, id));
  redirect("/admin/schools");
}

export async function saveAccommodation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const now = new Date().toISOString();
  const nameAr = String(formData.get("nameAr") || "");

  const values = {
    slug: String(formData.get("slug") || slugify(nameAr)),
    nameAr,
    city: String(formData.get("city") || ""),
    province: String(formData.get("province") || ""),
    descriptionAr: String(formData.get("descriptionAr") || ""),
    priceMinUsd: Number(formData.get("priceMinUsd") || 0),
    priceMaxUsd: Number(formData.get("priceMaxUsd") || 0),
    imageUrls: String(formData.get("imageUrls") || "") || null,
    roomType: String(formData.get("roomType") || "private"),
    furnished: formData.get("furnished") === "on",
    distanceToAirport: String(formData.get("distanceToAirport") || "") || null,
    wifi: formData.get("wifi") === "on",
    status: String(formData.get("status") || "draft"),
    updatedAt: now,
  };

  if (id) {
    await db.update(accommodations).set(values).where(eq(accommodations.id, id));
  } else {
    await db.insert(accommodations).values({ id: randomUUID(), createdAt: now, ...values });
  }

  redirect("/admin/accommodation");
}

export async function deleteAccommodation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await db.delete(accommodations).where(eq(accommodations.id, id));
  redirect("/admin/accommodation");
}

const STATUS_LABELS: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  documents_required: "مستندات مطلوبة",
  submitted_to_school: "أُرسل للمدرسة",
  accepted: "مقبول",
  rejected: "مرفوض",
  enrolled: "مسجَّل",
};

export async function updateApplicationStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");

  const before = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  const previousStatus = before[0]?.status;

  await db
    .update(applications)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(eq(applications.id, id));

  if (previousStatus && previousStatus !== status) {
    await logEvent(
      id,
      "status_change",
      `تغيّرت الحالة من "${STATUS_LABELS[previousStatus] ?? previousStatus}" إلى "${STATUS_LABELS[status] ?? status}"`
    );

    const app = before[0];
    if (app?.email) {
      const lang = app.preferredLang === "en" ? "en" : "ar";
      const statusLabel = STATUS_LABELS[status] ?? status;
      await sendEmail({
        to: app.email,
        subject: statusUpdateSubject(lang, status, app.fullName),
        react: StatusUpdateEmail({
          lang,
          fullName: app.fullName,
          referenceCode: app.referenceCode || "",
          status,
          statusLabel,
        }),
      });
    }
  }

  redirect("/admin/applications");
}

export async function assignApplicationSchool(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const flightSchoolId = String(formData.get("flightSchoolId") || "") || null;

  const school = flightSchoolId
    ? (await db.select().from(flightSchools).where(eq(flightSchools.id, flightSchoolId)).limit(1))[0]
    : null;

  await db
    .update(applications)
    .set({ flightSchoolId, updatedAt: new Date().toISOString() })
    .where(eq(applications.id, id));

  await logEvent(
    id,
    "school_assigned",
    school ? `تم تحديد المدرسة: ${school.nameAr}` : "تم إلغاء تحديد المدرسة"
  );

  redirect("/admin/applications");
}

export async function assignApplicationAccommodation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const accommodationId = String(formData.get("accommodationId") || "") || null;

  const acc = accommodationId
    ? (await db.select().from(accommodations).where(eq(accommodations.id, accommodationId)).limit(1))[0]
    : null;

  await db
    .update(applications)
    .set({ accommodationId, updatedAt: new Date().toISOString() })
    .where(eq(applications.id, id));

  await logEvent(
    id,
    "accommodation_assigned",
    acc ? `تم تحديد السكن: ${acc.nameAr}` : "تم إلغاء تحديد السكن"
  );

  redirect("/admin/applications");
}

export async function deleteApplication(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await db.delete(applications).where(eq(applications.id, id));
  redirect("/admin/applications");
}

export async function saveSocialPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const now = new Date().toISOString();

  const values = {
    imageUrl: String(formData.get("imageUrl") || ""),
    caption: String(formData.get("caption") || ""),
    permalink: String(formData.get("permalink") || ""),
    likes: formData.get("likes") ? Number(formData.get("likes")) : null,
    displayOrder: Number(formData.get("displayOrder") || 0),
    status: String(formData.get("status") || "draft"),
    updatedAt: now,
  };

  if (id) {
    await db.update(socialPosts).set(values).where(eq(socialPosts.id, id));
  } else {
    await db.insert(socialPosts).values({ id: randomUUID(), createdAt: now, ...values });
  }

  redirect("/admin/social");
}

export async function deleteSocialPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await db.delete(socialPosts).where(eq(socialPosts.id, id));
  redirect("/admin/social");
}
