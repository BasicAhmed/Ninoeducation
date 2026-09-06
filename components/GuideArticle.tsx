import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/constants";

export type FaqItem = { q: string; a: string };
export type RelatedGuide = { title: string; href: string };

export function GuideArticle({
  path,
  kicker,
  title,
  intro,
  faqItems,
  related,
  children,
}: {
  path: string;
  kicker: string;
  title: string;
  intro: string;
  faqItems: FaqItem[];
  related?: RelatedGuide[];
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: intro,
    author: { "@type": "Organization", name: "نينو إديوكيشن" },
    publisher: { "@type": "Organization", name: "نينو إديوكيشن" },
    mainEntityOfPage: url,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteHeader />
      <main className="flex-1 bg-nino-white">
        <div className="mx-auto max-w-3xl px-6 pt-6">
          <Breadcrumbs
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "أدلة الطيران", href: "/guides/study-aviation-in-south-africa" },
              { label: title },
            ]}
          />
        </div>

        <article className="mx-auto max-w-3xl px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">{kicker}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-nino-ink/70">{intro}</p>

          <div className="mt-10 space-y-14 leading-relaxed text-nino-ink/80">{children}</div>

          {/* FAQ */}
          <section className="mt-16 border-t border-nino-line pt-10">
            <h2 className="font-display text-2xl">أسئلة شائعة</h2>
            <div className="mt-6 divide-y divide-nino-line">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-nino-ink marker:content-none">
                    {item.q}
                    <span className="shrink-0 text-xl font-light text-nino-orange transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-nino-ink/70">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related guides — the internal linking backbone of the cluster */}
          {related && related.length > 0 && (
            <section className="mt-12 border-t border-nino-line pt-10">
              <h2 className="font-display text-xl">أدلة ذات صلة</h2>
              <ul className="mt-4 space-y-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="text-nino-orange hover:underline">
                      {r.title} ←
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Final CTA */}
          <div className="mt-16 rounded-2xl bg-nino-ink px-8 py-10 text-center text-white">
            <h2 className="font-display text-2xl">جاهز تبدأ ملفك؟</h2>
            <p className="mt-2 text-white/70">
              قدّم طلبك مجانًا اليوم، ونرشح لك أفضل المدارس المناسبة لميزانيتك وأهدافك.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
              >
                قدّم الآن
              </Link>
              <Link
                href="/schools"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium hover:bg-white/10"
              >
                تصفح المدارس
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export function GuideH2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl text-nino-ink">{children}</h2>;
}
