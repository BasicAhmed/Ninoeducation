import { db } from "@/db/client";
import { flightSchools, applications, accommodations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export { PROVINCES, LICENSE_LABELS } from "@/lib/constants";

export type SchoolFilters = {
  province?: string;
  license?: string; // PPL | CPL | IR | ME | ATPL_THEORY
  maxBudget?: number;
  trainingType?: string;
  accommodation?: boolean;
  q?: string; // free-text match against name/city — backs the sitelinks search box
};

export async function getPublishedSchools(filters: SchoolFilters = {}) {
  try {
    const rows = await db
      .select()
      .from(flightSchools)
      .where(eq(flightSchools.status, "published"))
      .orderBy(flightSchools.ninoRanking);

    return rows.filter((s) => {
      if (filters.province && s.province !== filters.province) return false;
      if (filters.license && !s.licenses.split(",").includes(filters.license))
        return false;
      if (filters.maxBudget && s.priceMinUsd > filters.maxBudget) return false;
      if (filters.trainingType && s.trainingType !== filters.trainingType)
        return false;
      if (filters.accommodation && !s.hasAccommodation) return false;
      if (filters.q) {
        const q = filters.q.trim().toLowerCase();
        const haystack = `${s.nameAr} ${s.city} ${s.province}`.toLowerCase();
        if (q && !haystack.includes(q)) return false;
      }
      return true;
    });
  } catch (err) {
    // A DB hiccup or a pending migration should show "no schools yet",
    // not crash every page that lists schools (homepage included).
    console.error("getPublishedSchools failed:", err);
    return [];
  }
}

export async function getSchoolBySlug(slug: string) {
  try {
    const rows = await db
      .select()
      .from(flightSchools)
      .where(eq(flightSchools.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("getSchoolBySlug failed:", err);
    return null;
  }
}

export async function getSchoolsBySlugs(slugs: string[]) {
  try {
    const rows = await db.select().from(flightSchools);
    return rows.filter((s) => slugs.includes(s.slug));
  } catch (err) {
    console.error("getSchoolsBySlugs failed:", err);
    return [];
  }
}

export async function getPublishedAccommodations() {
  try {
    return await db
      .select()
      .from(accommodations)
      .where(eq(accommodations.status, "published"));
  } catch (err) {
    console.error("getPublishedAccommodations failed:", err);
    return [];
  }
}

export async function getAccommodationBySlug(slug: string) {
  try {
    const rows = await db
      .select()
      .from(accommodations)
      .where(eq(accommodations.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.error("getAccommodationBySlug failed:", err);
    return null;
  }
}

export async function getAllApplications() {
  // Not wrapped in try/catch on purpose: this is admin-only, and a
  // silent empty list here could make Ahmed think there are zero
  // leads when the query is actually broken. Fail loud for admin.
  return db.select().from(applications).orderBy(desc(applications.createdAt));
}
