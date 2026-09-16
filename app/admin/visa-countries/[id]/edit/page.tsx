import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { visaCountries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { VisaCountryForm } from "@/components/VisaCountryForm";

export default async function EditVisaCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db.select().from(visaCountries).where(eq(visaCountries.id, id)).limit(1);
  const country = rows[0];
  if (!country) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">تعديل الدولة</h1>
      <div className="mt-8">
        <VisaCountryForm country={country} />
      </div>
    </div>
  );
}
