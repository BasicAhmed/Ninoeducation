import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GuidesSearch } from "@/components/GuidesSearch";
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
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-28">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            كل أسئلتك، في مكان واحد
          </p>
          <h1 className="mt-3 font-display text-4xl">أدلة الطيران</h1>
          <p className="mt-3 max-w-xl text-nino-ink/70">
            أدلة مفصّلة تغطي كل خطوة من رحلتك — من أول سؤال عن التكلفة حتى ما
            يحدث بعد تخرجك.
          </p>

          <GuidesSearch guides={GUIDES} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
