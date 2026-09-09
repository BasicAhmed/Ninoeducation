import { getPublishedSchools } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";
import { QuizFlow } from "@/components/QuizFlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ابحث عن مدرستي | نينو إديوكيشن",
  description: "أجب عن ثلاثة أسئلة لنرشح لك أفضل مدارس الطيران المناسبة لك.",
  alternates: { canonical: `${SITE_URL}/quiz` },
};

export default async function QuizPage() {
  const lang = await getLang();
  const t = dictionaries[lang].quiz;
  const schools = await getPublishedSchools();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-2xl px-6 pb-14 pt-28">
          <h1 className="font-display text-4xl">{t.title}</h1>
          <p className="mt-2 text-nino-ink/70">
            {t.subtitle}
          </p>
          <div className="mt-8">
            <QuizFlow schools={schools} lang={lang} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
