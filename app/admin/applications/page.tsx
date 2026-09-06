import { db } from "@/db/client";
import { applications, flightSchools, accommodations } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ApplicationsList } from "@/components/ApplicationsList";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [apps, schools, accommodationList] = await Promise.all([
    db.select().from(applications).orderBy(desc(applications.createdAt)),
    db.select().from(flightSchools),
    db.select().from(accommodations),
  ]);

  return (
    <ApplicationsList
      apps={apps}
      schools={schools.map((s) => ({ id: s.id, nameAr: s.nameAr }))}
      accommodations={accommodationList.map((a) => ({ id: a.id, nameAr: a.nameAr }))}
      initialQuery={q || ""}
    />
  );
}
