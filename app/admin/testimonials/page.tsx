import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import { TestimonialsGrid } from "@/components/TestimonialsGrid";

export default async function AdminTestimonialsPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.displayOrder));
  return <TestimonialsGrid testimonials={rows} />;
}
