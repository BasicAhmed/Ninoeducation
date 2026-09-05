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
};

export async function getPublishedSchools(filters: SchoolFilters = {}) {
  const rows = await db
    .select()
    .from(flightSchools)
    .where(eq(flightSchools.status, "published"))
    .orderBy(flightSchools.ninoRanking);

  return rows.filter((s) => {
    if (filters.province && s.province !== filters.province) return false;
    if (filters.license && !s.licenses.split(",").includes(filters.license))
      return false;
    if (filters.maxBudget && s.priceMinZar > filters.maxBudget) return false;
    if (filters.trainingType && s.trainingType !== filters.trainingType)
      return false;
    if (filters.accommodation && !s.hasAccommodation) return false;
    return true;
  });
}

export async function getSchoolBySlug(slug: string) {
  const rows = await db
    .select()
    .from(flightSchools)
    .where(eq(flightSchools.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getSchoolsBySlugs(slugs: string[]) {
  const rows = await db.select().from(flightSchools);
  return rows.filter((s) => slugs.includes(s.slug));
}

export async function getPublishedAccommodations() {
  return db
    .select()
    .from(accommodations)
    .where(eq(accommodations.status, "published"));
}

export async function getAccommodationBySlug(slug: string) {
  const rows = await db
    .select()
    .from(accommodations)
    .where(eq(accommodations.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getAllApplications() {
  return db.select().from(applications).orderBy(desc(applications.createdAt));
}
