import { CostCalculator } from "@/components/CostCalculator";
import { SITE_URL } from "@/lib/constants";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";

const COPY = {
  ar: {
    metaTitle: "حاسبة تكلفة دراسة الطيران في جنوب أفريقيا | نينو إديوكيشن",
    metaDescription: "احسب الميزانية التقديرية لدراسة الطيران في جنوب أفريقيا.",
    title: "حاسبة التكلفة",
    subtitle: "قدّر ميزانيتك الإجمالية لدراسة الطيران والإقامة في جنوب أفريقيا.",
  },
  en: {
    metaTitle: "Aviation Training Cost Calculator for South Africa | Nino Education",
    metaDescription: "Estimate your total budget for studying aviation in South Africa.",
    title: "Cost Calculator",
    subtitle: "Estimate your total budget for flight training and living in South Africa.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  const t = COPY[lang];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}/calculator` },
  };
}

export default async function CalculatorPage() {
  const lang = await getLang();
  const t = COPY[lang];
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-4xl px-6 pb-14 pt-28">
          <h1 className="font-display text-4xl">{t.title}</h1>
          <p className="mt-2 max-w-xl text-nino-ink/70">{t.subtitle}</p>
          <div className="mt-8">
            <CostCalculator lang={lang} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
