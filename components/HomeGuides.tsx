import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export function HomeGuides({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].guidesSection;

  return (
    <section className="bg-nino-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
              {t.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.title}</h2>
            <p className="mt-2 max-w-md text-nino-ink/70">{t.subtitle}</p>
          </div>
          <Link href="/guides" className="shrink-0 text-sm font-medium text-nino-orange hover:underline">
            {t.viewAll}
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Reveal key={g.href} delay={Math.min(i, 5) * 80}>
              <Link
                href={lang === "en" ? `/en${g.href}` : g.href}
                className="flex h-full flex-col rounded-2xl border border-nino-line bg-nino-white p-6 transition hover:border-nino-orange"
              >
                <h3 className="font-display text-base">{lang === "ar" ? g.titleAr : g.titleEn}</h3>
                <p className="mt-2 text-sm text-nino-ink/60">
                  {lang === "ar" ? g.descriptionAr : g.descriptionEn}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
