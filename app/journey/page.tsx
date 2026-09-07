import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].journey;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}/journey` },
  };
}

export default async function JourneyPage() {
  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.journey;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream">
        <div className="mx-auto max-w-3xl px-6 pt-6">
          <Breadcrumbs items={[{ label: dict.nav.home, href: "/" }, { label: t.kicker }]} />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{t.title}</h1>
          <p className="mt-3 max-w-xl text-nino-ink/70">{t.subtitle}</p>

          <div className="mt-10">
            <JourneyTimeline lang={lang} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
