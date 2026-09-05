import { db } from "@/db/client";
import { applications, flightSchools } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ApplicationsList } from "@/components/ApplicationsList";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const apps = await db.select().from(applications).orderBy(desc(applications.createdAt));
  const schools = await db.select().from(flightSchools);
  const schoolMap = Object.fromEntries(schools.map((s) => [s.id, s.nameAr]));

  return <ApplicationsList apps={apps} schoolMap={schoolMap} initialQuery={q || ""} />;
}
