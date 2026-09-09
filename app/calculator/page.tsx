import { CostCalculator } from "@/components/CostCalculator";
import { SITE_URL } from "@/lib/constants";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "حاسبة تكلفة دراسة الطيران في جنوب أفريقيا | نينو إديوكيشن",
  description: "احسب الميزانية التقديرية لدراسة الطيران في جنوب أفريقيا.",
  alternates: { canonical: `${SITE_URL}/calculator` },
};

export default function CalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-28">
          <h1 className="font-display text-4xl">حاسبة التكلفة</h1>
          <p className="mt-2 max-w-xl text-nino-ink/70">
            قدّر ميزانيتك الإجمالية لدراسة الطيران والإقامة في جنوب أفريقيا.
          </p>
          <div className="mt-8">
            <CostCalculator />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
