import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TestimonialForm } from "@/components/TestimonialForm";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  const testimonial = rows[0];
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">تعديل الرأي</h1>
      <div className="mt-8">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
