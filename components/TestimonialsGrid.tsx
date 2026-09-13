"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { deleteTestimonial } from "@/lib/admin-actions";

type Testimonial = {
  id: string;
  name: string;
  origin: string;
  quote: string | null;
  videoUrl: string | null;
  status: string;
};

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">آراء الطلاب</h1>
          <p className="mt-1 text-sm text-nino-ink/60">
            تظهر في قسم &quot;ما يقوله الطلاب&quot; على الصفحة الرئيسية — الفيديو الحقيقي أقوى بكثير من النص.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة رأي
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-nino-line bg-nino-white p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {t.videoUrl && <PlayCircle size={16} className="text-nino-orange" />}
                <p className="font-medium text-nino-ink">{t.name}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${
                  t.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {t.status === "published" ? "منشور" : "مسودة"}
              </span>
            </div>
            <p className="mt-1 text-xs text-nino-ink/50">{t.origin}</p>
            {t.quote && <p className="mt-3 line-clamp-3 text-sm text-nino-ink/70">{t.quote}</p>}
            <div className="mt-4 flex items-center justify-between text-xs">
              <Link href={`/admin/testimonials/${t.id}/edit`} className="text-nino-orange hover:underline">
                تعديل
              </Link>
              <form
                action={deleteTestimonial}
                onSubmit={(e) => {
                  if (!confirm("حذف هذا الرأي؟")) e.preventDefault();
                }}
              >
                <input type="hidden" name="id" value={t.id} />
                <button className="text-red-500 hover:underline">حذف</button>
              </form>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
            لا توجد آراء بعد.
          </p>
        )}
      </div>
    </div>
  );
}
