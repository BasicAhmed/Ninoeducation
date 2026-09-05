import { db } from "@/db/client";
import { accommodations } from "@/db/schema";
import { AccommodationTable } from "@/components/AccommodationTable";

export default async function AdminAccommodationPage() {
  const listings = await db.select().from(accommodations);
  return <AccommodationTable listings={listings} />;
}
