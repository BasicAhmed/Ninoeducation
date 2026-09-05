import { getPublishedSchools } from "@/lib/schools";
import { QuizFlow } from "@/components/QuizFlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ابحث عن مدرستي | نينو إديوكيشن",
  description: "أجب عن ثلاثة أسئلة لنرشح لك أفضل مدارس الطيران المناسبة لك.",
};

export default async function QuizPage() {
  const schools = await getPublishedSchools();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-2xl px-6 py-14">
          <h1 className="font-display text-4xl">ابحث عن مدرستي</h1>
          <p className="mt-2 text-nino-ink/70">
            ثلاثة أسئلة سريعة، ونرشح لك أفضل المدارس المناسبة لأهدافك.
          </p>
          <div className="mt-8">
            <QuizFlow schools={schools} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
