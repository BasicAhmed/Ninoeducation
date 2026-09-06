import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "أدلة الطيران: كل ما تحتاج معرفته | نينو إديوكيشن",
  description:
    "أدلة شاملة حول دراسة الطيران في جنوب أفريقيا: التكلفة، التأشيرة، أنواع الرخص، المتطلبات الطبية، والمدة الزمنية.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-4xl px-6 pt-6">
          <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "أدلة الطيران" }]} />
        </div>
        <div className="mx-auto max-w-4xl px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            كل أسئلتك، في مكان واحد
          </p>
          <h1 className="mt-3 font-display text-4xl">أدلة الطيران</h1>
          <p className="mt-3 max-w-xl text-nino-ink/70">
            أدلة مفصّلة تغطي كل خطوة من رحلتك — من أول سؤال عن التكلفة حتى ما
            يحدث بعد تخرجك.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="flex flex-col rounded-2xl border border-nino-line bg-nino-white p-6 transition hover:border-nino-orange"
              >
                <h2 className="font-display text-lg">{g.title}</h2>
                <p className="mt-2 text-sm text-nino-ink/60">{g.description}</p>
                <span className="mt-4 text-sm font-medium text-nino-orange">اقرأ الدليل ←</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
