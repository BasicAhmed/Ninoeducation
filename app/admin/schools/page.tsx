import { db } from "@/db/client";
import { flightSchools } from "@/db/schema";
import { SchoolsTable } from "@/components/SchoolsTable";

export default async function AdminSchoolsPage() {
  const schools = await db.select().from(flightSchools).orderBy(flightSchools.ninoRanking);

  return <SchoolsTable schools={schools} />;
}
