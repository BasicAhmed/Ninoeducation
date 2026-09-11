import Link from "next/link";
import { GraduationCap, Tag, Rocket, Users, HeartHandshake } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].scholarships;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}/scholarships` },
  };
}

export default async function ScholarshipsPage() {
  const lang = await getLang();
  const t = dictionaries[lang].scholarships;

  const paths = [
    { icon: GraduationCap, title: t.scholarshipsTitle, body: t.scholarshipsBody },
    { icon: Tag, title: t.discountsTitle, body: t.discountsBody },
    { icon: Rocket, title: t.startSmallTitle, body: t.startSmallBody },
    { icon: Users, title: t.workshopsTitle, body: t.workshopsBody },
  ];

  const faqItems = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.metaDescription,
    author: { "@type": "Organization", name: "نينو إديوكيشن" },
    publisher: { "@type": "Organization", name: "نينو إديوكيشن" },
    mainEntityOfPage: `${SITE_URL}/scholarships`,
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

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteHeader />
      <main className="flex-1 bg-nino-white">
        {/* Hero */}
        <div className="mx-auto max-w-3xl px-6 pb-4 pt-28 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">{t.kicker}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-nino-ink/70">{t.intro}</p>
        </div>

        {/* Honest acknowledgment */}
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-3xl bg-nino-cream p-8">
            <h2 className="font-display text-xl">{t.honestyTitle}</h2>
            <p className="mt-2 leading-relaxed text-nino-ink/70">{t.honestyBody}</p>
            <Link
              href="/guides/why-is-flight-training-expensive"
              className="mt-3 inline-block text-sm font-medium text-nino-orange hover:underline"
            >
              {t.honestyLink} ←
            </Link>
          </div>
        </div>

        {/* The paths */}
        <div className="mx-auto max-w-3xl px-6 py-6">
          <h2 className="text-center font-display text-2xl md:text-3xl">{t.pathsTitle}</h2>
          <div className="mt-10 space-y-8">
            {paths.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-nino-ink">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-nino-ink/70">{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Register interest CTA */}
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-3xl bg-nino-ink p-8 text-center text-white sm:p-10">
            <HeartHandshake className="mx-auto text-nino-orange" size={32} />
            <h2 className="mt-4 font-display text-2xl">{t.registerInterestTitle}</h2>
            <p className="mx-auto mt-2 max-w-lg text-white/70">{t.registerInterestBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#25D366] px-7 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                {t.whatsappCta}
              </a>
              <Link
                href="/apply"
                className="rounded-full border border-white/30 px-7 py-3 text-sm font-medium text-white hover:border-white"
              >
                {t.applyAnywayCta}
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="font-display text-2xl">{t.faqTitle}</h2>
          <div className="mt-6 divide-y divide-nino-line">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between text-start font-medium text-nino-ink">
                  {item.q}
                  <span className="ms-4 shrink-0 text-nino-orange transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-nino-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
