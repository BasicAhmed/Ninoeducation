import Link from "next/link";
import { Plane, ShieldCheck, Languages, UserCheck, Heart } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].about;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}/about` },
  };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = dictionaries[lang].about;

  const sections = [
    { icon: Plane, title: t.foundingTitle, body: t.foundingBody },
    { icon: ShieldCheck, title: t.readinessTitle, body: t.readinessBody },
    { icon: Languages, title: t.englishTitle, body: t.englishBody },
    { icon: UserCheck, title: t.mentorshipTitle, body: t.mentorshipBody },
    { icon: Heart, title: t.valuesTitle, body: t.valuesBody },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-white">
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-28">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            {t.kicker}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{t.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-nino-ink/70">{t.intro}</p>

          <div className="mt-14 space-y-12">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-nino-ink">{s.title}</h2>
                    <p className="mt-2 leading-relaxed text-nino-ink/70">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl bg-nino-cream p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl">{t.ctaTitle}</h2>
            <p className="mt-2 text-nino-ink/70">{t.ctaBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-nino-orange px-7 py-3 text-sm font-medium text-white hover:bg-nino-ink"
              >
                {dictionaries[lang].nav.apply}
              </Link>
              <Link
                href="/guides"
                className="rounded-full border border-nino-ink/20 px-7 py-3 text-sm font-medium text-nino-ink hover:border-nino-ink"
              >
                {dictionaries[lang].nav.schools}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
