import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GuidesSearch } from "@/components/GuidesSearch";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";

const COPY = {
  ar: {
    metaTitle: "أدلة الطيران: كل ما تحتاج معرفته | نينو إديوكيشن",
    metaDescription:
      "أدلة شاملة حول دراسة الطيران في جنوب أفريقيا: التكلفة، التأشيرة، أنواع الرخص، المتطلبات الطبية، والمدة الزمنية.",
    kicker: "كل أسئلتك، في مكان واحد",
    title: "أدلة الطيران",
    subtitle: "أدلة مفصّلة تغطي كل خطوة من رحلتك — من أول سؤال عن التكلفة حتى ما يحدث بعد تخرجك.",
  },
  en: {
    metaTitle: "Aviation Guides: Everything You Need to Know | Nino Education",
    metaDescription:
      "Comprehensive guides on studying aviation in South Africa: cost, visa, license types, medical requirements, and timeline.",
    kicker: "Every Question You Have, in One Place",
    title: "Aviation Guides",
    subtitle: "Detailed guides covering every step of your journey — from your first question about cost to what happens after you graduate.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  const t = COPY[lang];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}/guides` },
  };
}

export default async function GuidesIndexPage() {
  const lang = await getLang();
  const t = COPY[lang];
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-28">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">{t.kicker}</p>
          <h1 className="mt-3 font-display text-4xl">{t.title}</h1>
          <p className="mt-3 max-w-xl text-nino-ink/70">{t.subtitle}</p>

          <GuidesSearch guides={GUIDES} lang={lang} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
