import { getSchoolBySlug, LICENSE_LABELS } from "@/lib/schools";
import { submitApplication } from "@/lib/actions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "قدّم الآن | نينو إديوكيشن",
  description: "قدّم طلبك للتدريب على الطيران في جنوب أفريقيا مجانًا عبر نينو إديوكيشن.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string }>;
}) {
  const sp = await searchParams;
  const school = sp.school ? await getSchoolBySlug(sp.school) : null;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-2xl px-6 py-14">
          <h1 className="font-display text-4xl">قدّم طلبك</h1>
          <p className="mt-2 text-nino-ink/70">
            {school
              ? `طلبك سيكون موجّهًا إلى ${school.nameAr}. سيتواصل معك مستشار نينو إديوكيشن خلال وقت قصير.`
              : "أخبرنا بأهدافك وميزانيتك، وسنرشح لك أفضل المدارس المناسبة."}
          </p>

          <form action={submitApplication} className="mt-8 space-y-5">
            <input type="hidden" name="schoolSlug" value={sp.school || ""} />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="الاسم الكامل" name="fullName" required />
              <Field label="الجنسية" name="nationality" required />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="رقم الهاتف" name="phone" type="tel" required />
              <Field label="رقم الواتساب" name="whatsapp" type="tel" />
            </div>
            <Field label="البريد الإلكتروني" name="email" type="email" required />

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">
                  الرخصة الحالية (إن وجدت)
                </label>
                <select
                  name="currentLicense"
                  className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-2.5 text-sm"
                >
                  <option value="">لا يوجد</option>
                  {Object.entries(LICENSE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  الرخصة المطلوبة
                </label>
                <select
                  name="desiredLicense"
                  required
                  className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-2.5 text-sm"
                >
                  {Object.entries(LICENSE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="الميزانية التقديرية (بالراند)" name="estimatedBudget" />
              <Field label="الموعد المفضل للبدء" name="preferredStart" placeholder="مثال: يناير 2027" />
            </div>

            <div>
              <label className="block text-sm font-medium">ملاحظات إضافية</label>
              <textarea
                name="notes"
                rows={4}
                className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-nino-ink py-3.5 text-sm font-medium text-white hover:bg-nino-orange"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-2.5 text-sm"
      />
    </div>
  );
}
