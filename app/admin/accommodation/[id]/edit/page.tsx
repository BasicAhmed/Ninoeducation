import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { accommodations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccommodationForm } from "@/components/AccommodationForm";

export default async function EditAccommodationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db.select().from(accommodations).where(eq(accommodations.id, id)).limit(1);
  const item = rows[0];
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">تعديل {item.nameAr}</h1>
      <div className="mt-8 max-w-2xl">
        <AccommodationForm item={item} />
      </div>
    </div>
  );
}
