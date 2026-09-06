import { getSchoolBySlug } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyWizard } from "@/components/ApplyWizard";

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
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            من الحلم إلى قمرة القيادة
          </p>
          <h1 className="mt-2 font-display text-4xl">قدّم طلبك</h1>
          <p className="mt-2 text-nino-ink/70">
            {school
              ? `طلبك سيكون موجّهًا إلى ${school.nameAr}. سيتواصل معك مستشار نينو إديوكيشن خلال وقت قصير.`
              : "بضع خطوات قصيرة، وأنت أقرب لأول تحليق لك."}
          </p>

          <div className="mt-10">
            <ApplyWizard schoolSlug={sp.school || ""} schoolName={school?.nameAr} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
