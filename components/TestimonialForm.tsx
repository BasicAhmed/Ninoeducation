"use client";

import { saveTestimonial } from "@/lib/admin-actions";

type Testimonial = {
  id: string;
  name: string;
  origin: string;
  quote: string | null;
  videoUrl: string | null;
  displayOrder: number;
  status: string;
};

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <form action={saveTestimonial} className="max-w-xl space-y-6">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <div>
        <label className="block text-sm font-medium">الاسم</label>
        <input
          name="name"
          defaultValue={testimonial?.name}
          required
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">المدينة والبلد</label>
        <input
          name="origin"
          defaultValue={testimonial?.origin}
          required
          placeholder="الرياض، السعودية"
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">رابط فيديو من يوتيوب (اختياري)</label>
        <input
          name="videoUrl"
          defaultValue={testimonial?.videoUrl ?? ""}
          placeholder="https://youtu.be/... أو https://youtube.com/watch?v=..."
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          dir="ltr"
        />
        <p className="mt-1.5 text-xs text-nino-ink/50">
          شهادة فيديو حقيقية من طالب أقوى بكثير من نص مكتوب — إذا عندك حتى فيديو واحد، ابدأ فيه.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium">النص المكتوب (اختياري إذا فيه فيديو)</label>
        <textarea
          name="quote"
          defaultValue={testimonial?.quote ?? ""}
          rows={3}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">ترتيب العرض (0 = أول واحد)</label>
          <input
            type="number"
            name="displayOrder"
            defaultValue={testimonial?.displayOrder ?? 0}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">الحالة</label>
          <select
            name="status"
            defaultValue={testimonial?.status || "draft"}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          >
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
      >
        حفظ
      </button>
    </form>
  );
}
