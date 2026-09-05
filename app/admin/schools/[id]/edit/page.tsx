import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { flightSchools } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SchoolForm } from "@/components/SchoolForm";

export default async function EditSchoolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db.select().from(flightSchools).where(eq(flightSchools.id, id)).limit(1);
  const school = rows[0];
  if (!school) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">تعديل {school.nameAr}</h1>
      <div className="mt-8 max-w-2xl">
        <SchoolForm school={school} />
      </div>
    </div>
  );
}
