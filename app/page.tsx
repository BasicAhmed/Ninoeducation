import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ListChecks, Compass, PlaneTakeoff, Home as HomeIcon } from "lucide-react";
import { getPublishedSchools, getPublishedAccommodations } from "@/lib/schools";
import { WHATSAPP_NUMBER, SITE_URL } from "@/lib/constants";
import { formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";
import { WorldRouteMap } from "@/components/WorldRouteMap";
import { WhySouthAfrica } from "@/components/WhySouthAfrica";
import { InstagramGallery } from "@/components/InstagramGallery";
import { HomeGuides } from "@/components/HomeGuides";
import { TrustBar } from "@/components/TrustBar";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";
import { CountUpNumber } from "@/components/CountUpNumber";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

// This page reads from the database (schools, social posts). Force
// dynamic rendering so it's always fetched per-request, never attempted
// at build time — a missing table, a paused database, or a transient
// connection issue should 500 a single request, not fail the entire
// deployment build.
export const dynamic = "force-dynamic";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
      {children}
    </p>
  );
}

export default async function Home() {
  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.hero;
  const featured = (await getPublishedSchools()).slice(0, 3);
  const accommodation = (await getPublishedAccommodations()).slice(0, 3);

  const stats = [
    { value: "+30", label: dict.stats.stat1 },
    { value: "0", label: dict.stats.stat2 },
    { value: "PPL–ATPL", label: dict.stats.stat3 },
  ];

  const whyUs = [
    { icon: ShieldCheck, title: dict.whyUs.item1Title, body: dict.whyUs.item1Body },
    { icon: ListChecks, title: dict.whyUs.item2Title, body: dict.whyUs.item2Body },
    { icon: Compass, title: dict.whyUs.item3Title, body: dict.whyUs.item3Body },
    { icon: HomeIcon, title: dict.whyUs.item4Title, body: dict.whyUs.item4Body },
  ];

  const steps = [
    { icon: Compass, n: dict.howItWorks.step1, body: dict.howItWorks.step1Body },
    { icon: PlaneTakeoff, n: dict.howItWorks.step2, body: dict.howItWorks.step2Body },
    { icon: HomeIcon, n: dict.howItWorks.step3, body: dict.howItWorks.step3Body },
  ];

  // Accurate to what Nino Education actually is — an enrollment
  // consultancy connecting students to accredited flight schools, not
  // an accredited training provider itself. Misrepresenting the type
  // here would be the kind of structured-data spam Google penalizes.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "نينو إديوكيشن",
    alternateName: "Nino Education",
    url: SITE_URL,
    description:
      "استشارات مجانية للطلاب الدوليين لإيجاد ومقارنة والتقديم لأفضل مدارس الطيران المعتمدة في جنوب أفريقيا.",
    areaServed: "Arab world, India",
    knowsAbout: "Flight training enrollment, SACAA-licensed flight schools in South Africa",
  };

  // Enables Google's sitelinks search box for brand-name queries — a
  // small, low-risk technical SEO addition since /schools already
  // supports plain-text filtering via query params.
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "نينو إديوكيشن",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/schools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* 1. Hero — the dream, told through a real cockpit-lit moment instead of an abstract gradient */}
        <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-nino-ink sm:min-h-[92vh]">
          <div className="absolute inset-0">
            <Image
              src="/brand/hero-cessna.jpg"
              alt=""
              fill
              priority
              className="hero-kenburns object-cover"
            />
          </div>
          {/* Scrim: clear near the top so the plane and golden light read
              immediately, deepening toward the bottom where the text sits */}
          <div className="absolute inset-0 bg-gradient-to-t from-nino-ink via-nino-ink/55 to-nino-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-nino-ink/30 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-40 text-center text-white sm:pb-24">
            <p dir="ltr" className="font-mono text-xs uppercase tracking-widest text-nino-orange">
              {t.coords}
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.25] md:text-6xl">
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-white/80">
              {t.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/quiz"
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-white transition-transform hover:bg-white hover:text-nino-ink active:scale-95"
              >
                {t.ctaPrimary}
              </Link>
              <a
                href="#why-south-africa"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-transform hover:bg-white/10 active:scale-95"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* 2. Why South Africa — the destination that makes the dream possible */}
        <div id="why-south-africa">
          <WhySouthAfrica />
        </div>

        {/* 3. Route map — now that you know why, see how close it actually is */}
        <section className="bg-nino-cream">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Reveal className="text-center">
              <Kicker>{dict.routeMap.kicker}</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                {dict.routeMap.title}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-nino-ink/70">
                {dict.routeMap.subtitle}
              </p>
            </Reveal>
            <Reveal delay={150} className="mt-10">
              <WorldRouteMap lang={lang} />
            </Reveal>
          </div>
        </section>

        {/* 4. Trust bar — credibility markers, once you've seen why South Africa and how close it is */}
        <TrustBar />

        {/* 5. Why us — with 30+ schools out there, you need a guide */}
        <section id="why" className="bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
              <Reveal>
                <Kicker>{dict.whyUs.kicker}</Kicker>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">
                  {dict.whyUs.title}
                </h2>
                <p className="mt-3 text-nino-ink/70">
                  {dict.whyUs.subtitle}
                </p>
              </Reveal>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-nino-line bg-nino-line sm:grid-cols-2">
                {whyUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal
                      key={item.title}
                      delay={i * 100}
                      className={`group relative overflow-hidden p-7 transition hover:z-10 hover:shadow-xl ${
                        i % 2 === 0 ? "bg-nino-cream" : "bg-white"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-6 -left-3 font-display text-8xl text-nino-ink/[0.04] transition group-hover:text-nino-orange/10"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-nino-ink text-white transition group-hover:bg-nino-orange">
                        <Icon size={20} />
                      </div>
                      <h3 className="relative mt-5 font-display text-xl">{item.title}</h3>
                      <p className="relative mt-2 text-sm text-nino-ink/70">{item.body}</p>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Stats — proof, not promises */}
        <section className="relative overflow-hidden bg-nino-cream">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#0b0d0f_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6 pt-20 text-center">
            <Reveal>
              <Kicker>{dict.stats.kicker}</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{dict.stats.title}</h2>
            </Reveal>
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-8 px-6 pb-20 pt-10 md:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="rounded-2xl border border-nino-line bg-white/70 p-8 backdrop-blur-sm transition hover:border-nino-orange hover:bg-white">
                  <div dir="ltr" className="text-end font-display text-5xl text-nino-orange">
                    <CountUpNumber value={s.value} />
                  </div>
                  <p className="mt-3 text-sm text-nino-ink/70">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7. Featured schools — the real, concrete choices */}
        <section className="bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal className="text-center">
              <Kicker>{dict.schoolsSection.kicker}</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                {dict.schoolsSection.title}
              </h2>
            </Reveal>
            {featured.length > 0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {featured.map((s, i) => (
                  <Reveal key={s.id} delay={i * 100}>
                    <SchoolCard school={s} lang={lang} badge={i === 0 ? dict.schoolsSection.topRated : undefined} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* Prominent, unmissable browse-all banner */}
            <Reveal className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-nino-ink px-8 py-10 text-center text-white sm:flex-row sm:text-start">
              <div>
                <h3 className="font-display text-2xl">{dict.schoolsSection.browseTitle}</h3>
                <p className="mt-2 text-white/70">
                  {dict.schoolsSection.browseBody}
                </p>
              </div>
              <Link
                href="/schools"
                className="shrink-0 rounded-full bg-nino-orange px-8 py-3.5 text-sm font-medium hover:bg-white hover:text-nino-ink"
              >
                {dict.schoolsSection.browseCta}
              </Link>
            </Reveal>
          </div>
        </section>

        {/* 7.5 Accommodation — the next real worry after picking a school */}
        {accommodation.length > 0 && (
          <section className="bg-nino-cream">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <Reveal className="text-center">
                <Kicker>{dict.accommodationSection.kicker}</Kicker>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">
                  {dict.accommodationSection.title}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-nino-ink/70">
                  {dict.accommodationSection.subtitle}
                </p>
              </Reveal>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {accommodation.map((a, i) => {
                  const cover = a.imageUrls?.split(",").filter(Boolean)[0];
                  return (
                    <Reveal key={a.id} delay={i * 100}>
                      <Link
                        href={`/accommodation/${a.slug}`}
                        className="flex flex-col overflow-hidden rounded-2xl border border-nino-line bg-nino-white transition hover:border-nino-orange"
                      >
                        {cover ? (
                          <div className="relative h-36 w-full">
                            <Image src={cover} alt={a.nameAr} fill unoptimized className="object-cover" />
                          </div>
                        ) : (
                          <div className="h-36 w-full bg-nino-cream" />
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          <span className="text-xs text-nino-ink/50">
                            {a.city} · {a.province}
                          </span>
                          <h3 className="mt-3 font-display text-xl">{a.nameAr}</h3>
                          <div className="mt-5 flex items-end justify-between border-t border-nino-line pt-4">
                            <div dir="ltr" className="text-end text-sm font-medium">
                              {formatUsdRange(a.priceMinZar, a.priceMaxZar)} {dict.accommodationSection.perMonth}
                            </div>
                            {a.distanceToAirport && (
                              <span className="text-xs text-nino-ink/50">
                                {a.distanceToAirport} {dict.accommodationSection.fromAirport}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/accommodation"
                  className="inline-block rounded-full border border-nino-ink/20 px-8 py-3.5 text-sm font-medium text-nino-ink hover:border-nino-ink"
                >
                  {dict.accommodationSection.browseCta}
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 8. How it works — you've seen the schools, here's what happens next */}
        <section className="bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal className="text-center">
              <Kicker>{dict.howItWorks.kicker}</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{dict.howItWorks.title}</h2>
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-nino-line bg-nino-line md:grid-cols-3">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.n} delay={i * 100} className="relative overflow-hidden bg-nino-white p-8">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-6 end-4 font-display text-9xl text-nino-orange/[0.06]"
                    >
                      {i + 1}
                    </span>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-nino-orange text-nino-orange">
                      <Icon size={20} />
                    </div>
                    <h3 className="relative mt-6 font-display text-xl">{s.n}</h3>
                    <p className="relative mt-2 text-sm text-nino-ink/70">{s.body}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Testimonials />

        <FAQ />

        <HomeGuides lang={lang} />

        <InstagramGallery />

        {/* 9. Final CTA — close the story, but meet people where they are */}
        <section className="relative overflow-hidden bg-gradient-to-br from-nino-orange to-[#ff7a3d] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-nino-cream to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-nino-white to-transparent"
          />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
            <Reveal>
              <Kicker>
                <span className="text-white/70">{dict.finalCta.kicker}</span>
              </Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                {dict.finalCta.title}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/90">
                {dict.finalCta.subtitle}
              </p>

              <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
              <Link
                href="/apply"
                className="rounded-full bg-white px-6 py-4 text-sm font-medium text-nino-ink hover:bg-nino-ink hover:text-white"
              >
                {dict.finalCta.ctaApply}
              </Link>
              <Link
                href="/quiz"
                className="rounded-full border border-white/40 px-6 py-4 text-sm font-medium hover:bg-white/10"
              >
                {dict.finalCta.ctaQuiz}
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-4 text-sm font-medium hover:bg-white/10"
              >
                {dict.finalCta.ctaWhatsapp}
              </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
