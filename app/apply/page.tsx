import { getSchoolBySlug } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyWizard } from "@/components/ApplyWizard";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "قدّم الآن | نينو إديوكيشن",
  description: "قدّم طلبك للتدريب على الطيران في جنوب أفريقيا مجانًا عبر نينو إديوكيشن.",
  alternates: { canonical: `${SITE_URL}/apply` },
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string }>;
}) {
  const lang = await getLang();
  const t = dictionaries[lang].applyPage;
  const sp = await searchParams;
  const school = sp.school ? await getSchoolBySlug(sp.school) : null;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-2xl px-6 py-14">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            {t.kicker}
          </p>
          <h1 className="mt-2 font-display text-4xl">{t.title}</h1>
          <p className="mt-2 text-nino-ink/70">
            {school
              ? t.subtitleSchoolTemplate.replace("{school}", school.nameAr)
              : t.subtitleGeneric}
          </p>

          <div className="mt-10">
            <ApplyWizard schoolSlug={sp.school || ""} schoolName={school?.nameAr} lang={lang} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
