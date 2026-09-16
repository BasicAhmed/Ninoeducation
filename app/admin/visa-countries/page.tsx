import { db } from "@/db/client";
import { visaCountries } from "@/db/schema";
import { asc } from "drizzle-orm";
import { VisaCountriesGrid } from "@/components/VisaCountriesGrid";

export default async function AdminVisaCountriesPage() {
  const rows = await db.select().from(visaCountries).orderBy(asc(visaCountries.countryNameAr));
  return <VisaCountriesGrid countries={rows} />;
}
