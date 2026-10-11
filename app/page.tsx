import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Plane,
  Wallet,
  PhoneCall,
  ShieldCheck,
  ListChecks,
  Home as HomeIcon,
  X,
  Check,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { getPublishedSchools, getPublishedAccommodations } from "@/lib/schools";
import { WHATSAPP_NUMBER, WHATSAPP_COMMUNITY_LINK, SITE_URL } from "@/lib/constants";
import { formatUsdRange } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";
import { WorldRouteMap } from "@/components/WorldRouteMap";
import { WhySouthAfrica } from "@/components/WhySouthAfrica";
import { InstagramGallery } from "@/components/InstagramGallery";
import { HomeGuides } from "@/components/HomeGuides";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";
import { CountUpNumber } from "@/components/CountUpNumber";
import { JourneyHub } from "@/components/home/JourneyHub";
import { AuroraBackdrop } from "@/components/motion/AuroraBackdrop";
import { PointerGlow } from "@/components/motion/PointerGlow";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

// This page reads from the database (schools, social posts). Force
// dynamic rendering so it's always fetched per-request, never attempted
// at build time — a missing table, a paused database, or a transient
// connection issue should 500 a single request, not fail the entire
// deployment build.
export const dynamic = "force-dynamic";

// Page plan (the order a visitor's questions come in):
// 1. Hero: the dream, plus the four most common next steps
// 2. Journey hub: every part of the site, grouped by where you are
// 3. Why Nino, 4. Schools, 5. Why South Africa + how close it is,
// 6. Going alone vs with us, 7. Housing, 8. Proof and answers, 9. Final call

function SectionHeading({
  title,
  subtitle,
  center = false,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className={`font-display text-3xl leading-snug md:text-[2.6rem] ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 ${dark ? "text-white/60" : "text-nino-ink/65"}`}>{subtitle}</p>
      )}
    </div>
  );
}

export default async function Home() {
  const lang = await getLang();
  const dict = dictionaries[lang];
  const t = dict.hero;
  const h = dict.home;
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const [schools, accommodations] = await Promise.all([
    getPublishedSchools(),
    getPublishedAccommodations(),
  ]);
  const featured = schools.slice(0, 3);
  const accommodation = accommodations.slice(0, 3);

  const quick = [
    { href: "/quiz", icon: Compass },
    { href: "/schools", icon: Plane },
    { href: "/calculator", icon: Wallet },
    { href: "/consultation", icon: PhoneCall },
  ].map((q, i) => ({ ...q, ...h.quick[i] }));

  const w = dict.whyNotAlone;
  const compare: [string, string][] = [
    [w.row1Alone, w.row1WithUs],
    [w.row3Alone, w.row3WithUs],
    [w.row6Alone, w.row6WithUs],
    [w.row8Alone, w.row8WithUs],
    [w.row2Alone, w.row2WithUs],
    [w.row4Alone, w.row4WithUs],
    [w.row5Alone, w.row5WithUs],
    [w.row7Alone, w.row7WithUs],
    [w.row9Alone, w.row9WithUs],
  ];

  // Accurate to what Nino Education actually is — an enrollment
  // consultancy connecting students to accredited flight schools, not
  // an accredited training provider itself. Misrepresenting the type
  // here would be the kind of structured-data spam Google penalizes.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: lang === "en" ? "Nino Education" : "نينو إديوكيشن",
    alternateName: lang === "en" ? "نينو إديوكيشن" : "Nino Education",
    url: SITE_URL,
    // Without this, Google has no structured signal for which image
    // is the official brand mark — it's what can surface as the small
    // icon next to search results and in a knowledge panel. Needs a
    // stable absolute URL, not a relative path.
    logo: `${SITE_URL}/brand/nino-logo-schema.png`,
    description:
      lang === "en"
        ? "Free advisory service helping international students study aviation in South Africa: find, compare and apply to SACAA-approved flight schools."
        : "استشارات مجانية تساعد الطلاب الدوليين على دراسة الطيران في جنوب أفريقيا، من خلال إيجاد ومقارنة والتقديم لأفضل مدارس الطيران المعتمدة من SACAA.",
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
    name: lang === "en" ? "Nino Education" : "نينو إديوكيشن",
    alternateName: ["Nino Education", "نينو إديوكيشن", "Nino"],
    inLanguage: ["ar", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/schools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const card =
    "rounded-[26px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(11,13,15,0.3)] sm:p-6";

  // Headline words animate in one after another
  const line1 = t.titleLine1.split(" ");
  const line2 = t.titleLine2.split(" ");

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
      <SiteHeader tone="light" />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-nino-ink text-white">
          {/* Moving gradient sky with a runway grid rolling toward the horizon */}
          <AuroraBackdrop runway className="-z-30" />
          <PointerGlow className="-z-20" />

          {/* Motion graphic: a dashed flight trail with a plane flying along it */}
          <svg
            aria-hidden
            viewBox="0 0 1400 800"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full ltr:-scale-x-100"
          >
            <path
              d="M1500 220 C 1150 200, 900 520, 420 420 S -50 620, -200 700"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1.5}
              strokeDasharray="3 10"
            />
            <path
              d="M1500 120 C 1100 80, 800 420, 360 300 S -100 520, -200 600"
              fill="none"
              stroke="var(--nino-orange)"
              strokeWidth={2}
              opacity={0.75}
              className="hero-trail"
            />
            <g className="hero-plane">
              <path
                d="M14 0 L-10 -9 L-6 0 L-10 9 Z M-2 0 L-8 -18 L-3 -18 L6 0 L-3 18 L-8 18 Z"
                fill="#fff"
              />
            </g>
          </svg>

          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-9 pt-32 sm:px-6">
            <span
              className="fade-up inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[13px] text-white/80 backdrop-blur-sm"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="live-ping h-2 w-2 rounded-full bg-nino-orange" />
              {h.heroTag}
            </span>
            <h1
              aria-label={`${t.titleLine1} ${t.titleLine2}`}
              className="mt-5 max-w-[14ch] font-display text-[2.6rem] leading-[1.15] sm:text-6xl md:text-7xl"
            >
              <span aria-hidden>
                {line1.map((word, i) => (
                  <span key={i}>
                    <span className="word-in" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                      {word}
                    </span>{" "}
                  </span>
                ))}
                <br />
                {line2.map((word, i) => (
                  <span key={i}>
                    <span
                      className="word-in text-nino-orange"
                      style={{ animationDelay: `${0.25 + (line1.length + i) * 0.08}s` }}
                    >
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </span>
            </h1>
            <p
              className="fade-up mt-5 max-w-[52ch] text-lg text-white/80"
              style={{ animationDelay: "0.85s" }}
            >
              {t.subtitle}
            </p>

            {/* Quick access: the four most common next steps */}
            <nav aria-label={h.quickAria} className="mt-8 grid max-w-[880px] grid-cols-2 gap-2.5 md:grid-cols-4">
              {quick.map((q, i) => {
                const Icon = q.icon;
                const main = i === 0;
                return (
                  <Link
                    key={q.href}
                    href={q.href}
                    className={`fade-up group relative flex flex-col gap-3.5 overflow-hidden rounded-[18px] border p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 ${
                      main
                        ? "border-nino-orange bg-nino-orange hover:bg-[#ff6a24]"
                        : "border-white/15 bg-white/[0.07] hover:border-nino-orange/60 hover:bg-white/[0.14]"
                    }`}
                    style={{ animationDelay: `${1 + i * 0.08}s` }}
                  >
                    <span
                      className={`flex h-[38px] w-[38px] items-center justify-center rounded-xl ${
                        main ? "bg-white/20" : "bg-white/[0.12]"
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <span>
                      <strong className="block text-[15px] font-semibold">{q.title}</strong>
                      <small className={`mt-0.5 block text-xs ${main ? "text-white/85" : "text-white/65"}`}>
                        {q.desc}
                      </small>
                    </span>
                    <Arrow
                      size={16}
                      className="absolute end-4 top-4 opacity-60 transition group-hover:opacity-100 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                );
              })}
            </nav>
            <p className="fade-up mt-4 text-sm text-white/70" style={{ animationDelay: "1.35s" }}>
              {h.returningLead}{" "}
              <Link href="/track" className="border-b border-white/50 text-white hover:border-nino-orange hover:text-nino-orange">
                {h.returningTrack}
              </Link>{" "}
              {h.returningOr}{" "}
              <Link href="/dashboard" className="border-b border-white/50 text-white hover:border-nino-orange hover:text-nino-orange">
                {h.returningLogin}
              </Link>
            </p>
          </div>

          {/* Facts ticker */}
          <div aria-hidden className="overflow-hidden whitespace-nowrap border-t border-white/[0.08] py-4 text-sm font-medium">
            <div className="marquee-track inline-flex">
              {[...h.marquee, ...h.marquee].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-9 pe-9">
                  {item}
                  <span className="text-nino-orange">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Journey hub: every part of the site, by stage */}
        <section id="journey" className="bg-nino-cream py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <SectionHeading title={h.hubTitle} subtitle={h.hubBody} />
            </Reveal>
            <Reveal delay={100}>
              <JourneyHub t={h} lang={lang} />
            </Reveal>
          </div>
        </section>

        {/* 3. Why Nino: bento */}
        <section id="why" className="bg-nino-cream pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <SectionHeading title={dict.whyUs.title} subtitle={dict.whyUs.subtitle} />
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 lg:auto-rows-[minmax(200px,auto)] lg:grid-cols-4">
              {/* Reveal handles the entrance; the inner card handles hover,
                  so hover doesn't inherit the entrance delay */}
              <Reveal className="col-span-2 lg:row-span-2">
                <div data-spotlight="light" className={`${card} relative h-full overflow-hidden bg-nino-ink text-white sm:p-7`}>
                  <span aria-hidden className="absolute -bottom-28 h-64 w-64 rounded-full border border-nino-orange/35 ltr:-right-20 rtl:-left-20">
                    <span className="slow-spin absolute inset-10 rounded-full border border-dashed border-nino-orange/35" />
                  </span>
                  <div className="font-display text-7xl leading-none text-nino-orange md:text-8xl">
                    <CountUpNumber value="0" />
                  </div>
                  <h3 className="mt-4 font-display text-xl">{dict.whyUs.item1Title}</h3>
                  <p className="relative mt-1.5 max-w-md text-sm text-white/65">{dict.whyUs.item1Body}</p>
                  <Link href="/about" className="relative mt-5 inline-block border-b-2 border-current text-sm font-semibold hover:text-nino-orange">
                    {h.aboutLink}
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div data-spotlight className={`${card} h-full border border-nino-line bg-white`}>
                  <div className="font-display text-6xl leading-none text-nino-orange">
                    <CountUpNumber value="+30" />
                  </div>
                  <h3 className="mt-4 font-display text-lg">{h.schoolsCountLabel}</h3>
                  <p className="mt-1 text-[13px] text-nino-ink/60 sm:text-sm">{dict.trustBar.schoolsSub}</p>
                </div>
              </Reveal>
              {[
                { icon: ShieldCheck, title: dict.whyUs.item2Title, body: dict.whyUs.item2Body },
                { icon: ListChecks, title: dict.whyUs.item3Title, body: dict.whyUs.item3Body },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={160 + i * 80}>
                    <div data-spotlight className={`${card} h-full border border-nino-line bg-white`}>
                      <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-nino-cream text-nino-orange">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-3.5 font-display text-lg">{item.title}</h3>
                      <p className="mt-1 text-[13px] text-nino-ink/60 sm:text-sm">{item.body}</p>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={320} className="col-span-2 lg:col-span-1">
                <div className={`${card} h-full bg-nino-orange text-white`}>
                  <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-white/20">
                    <HomeIcon size={20} />
                  </span>
                  <h3 className="mt-3.5 font-display text-lg">{dict.whyUs.item4Title}</h3>
                  <p className="mt-1 text-sm text-white/85">{dict.whyUs.item4Body}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Featured schools: swipe on mobile, grid on desktop */}
        <section className="bg-nino-white py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <SectionHeading title={h.schoolsTitle} subtitle={dict.schoolsSection.browseBody} />
              </Reveal>
              <Link
                href="/schools"
                className="rounded-full bg-nino-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-nino-orange active:scale-95"
              >
                {dict.schoolsSection.browseCta}
              </Link>
            </div>
            {featured.length > 0 ? (
              <div className="-mx-5 mt-10 grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto px-5 pb-4 pt-3 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid-flow-row md:grid-cols-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
                {featured.map((s, i) => (
                  <Reveal key={s.id} delay={i * 100} className="snap-start">
                    <SchoolCard
                      school={s}
                      lang={lang}
                      badge={i === 0 ? dict.schoolsSection.topRated : undefined}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Link
                href="/schools"
                className="mt-10 block rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60 hover:border-nino-orange"
              >
                {dict.schoolsSection.browseTitle}
              </Link>
            )}
          </div>
        </section>

        {/* 5. Why South Africa (video) and how close it is */}
        <div id="why-south-africa">
          <WhySouthAfrica />
        </div>
        <section className="bg-nino-cream">
          <div className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-6">
            <Reveal>
              <SectionHeading center title={dict.routeMap.title} subtitle={dict.routeMap.subtitle} />
            </Reveal>
            <Reveal delay={150} className="mt-10">
              <WorldRouteMap lang={lang} />
            </Reveal>
          </div>
        </section>

        {/* 6. Going alone vs with us */}
        <section className="bg-nino-ink py-24 text-white">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <SectionHeading dark center title={w.title} subtitle={w.subtitle} />
            </Reveal>
            <Reveal delay={100} className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[26px] border border-white/10">
              <div className="grid grid-cols-2 divide-x divide-white/10 rtl:divide-x-reverse">
                <div className="bg-white/[0.03] p-4 text-center text-sm font-semibold text-white/50 sm:p-5">
                  {w.aloneLabel}
                </div>
                <div className="bg-nino-orange/10 p-4 text-center text-sm font-semibold text-nino-orange sm:p-5">
                  {w.withUsLabel}
                </div>
              </div>
              {compare.slice(0, 4).map(([alone, withUs], i) => (
                <CompareRow key={i} alone={alone} withUs={withUs} />
              ))}
              <details className="smooth-details group/more">
                <summary className="flex cursor-pointer list-none items-center justify-center gap-2 border-t border-white/10 p-4 text-sm text-white/60 hover:text-white [&::-webkit-details-marker]:hidden">
                  {w.showMore}
                  <ChevronDown size={16} className="transition group-open/more:rotate-180" />
                </summary>
                {compare.slice(4).map(([alone, withUs], i) => (
                  <CompareRow key={i} alone={alone} withUs={withUs} />
                ))}
              </details>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-center font-display text-xl md:text-2xl">{w.closingNote}</p>
            </Reveal>
          </div>
        </section>

        {/* 7. Housing */}
        {accommodation.length > 0 && (
          <section className="bg-nino-cream py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <Reveal>
                  <SectionHeading
                    title={dict.accommodationSection.title}
                    subtitle={dict.accommodationSection.subtitle}
                  />
                </Reveal>
                <Link
                  href="/accommodation"
                  className="border-b-2 border-nino-orange pb-0.5 text-sm font-semibold hover:text-nino-orange"
                >
                  {dict.accommodationSection.browseCta}
                </Link>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {accommodation.map((a, i) => {
                  const cover = a.imageUrls?.split(",").filter(Boolean)[0];
                  return (
                    <Reveal key={a.id} delay={i * 100}>
                      <Link
                        href={`/accommodation/${a.slug}`}
                        data-spotlight
                        className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-nino-line bg-white transition duration-300 hover:-translate-y-1 hover:border-nino-orange"
                      >
                        {cover && (
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={cover}
                              alt={a.nameAr}
                              fill
                              unoptimized
                              className="object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <span className="text-xs text-nino-ink/55">
                            {a.city} · {a.province}
                          </span>
                          <h3 className="mt-1 font-display text-lg">{a.nameAr}</h3>
                          <div className="mt-auto flex items-end justify-between gap-3 border-t border-nino-line pt-3.5 text-[13px] text-nino-ink/55">
                            <span dir="ltr" className="text-[15px] font-semibold text-nino-ink">
                              {formatUsdRange(a.priceMinUsd, a.priceMaxUsd)}{" "}
                              <span className="text-[13px] font-normal text-nino-ink/55">
                                {dict.accommodationSection.perMonth}
                              </span>
                            </span>
                            {a.distanceToAirport && (
                              <span>
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
            </div>
          </section>
        )}

        {/* 8. Proof, answers, reading */}
        <Testimonials />
        <FAQ />
        <HomeGuides lang={lang} />
        <InstagramGallery />

        {/* 9. Final call */}
        <section className="bg-nino-white px-5 pb-24 pt-4 sm:px-6">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-nino-orange px-6 py-16 text-center text-white md:py-20">
            <span
              aria-hidden
              className="glow-drift pointer-events-none absolute -top-36 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl md:text-5xl">{dict.finalCta.title}</h2>
              <p className="mx-auto mt-3 max-w-md text-white/90">{dict.finalCta.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                <Link
                  href="/apply"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-nino-ink transition hover:bg-nino-ink hover:text-white active:scale-95"
                >
                  {dict.finalCta.ctaApply}
                </Link>
                <Link
                  href="/quiz"
                  className="rounded-full border border-white/55 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10 active:scale-95"
                >
                  {dict.finalCta.ctaQuiz}
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/55 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10 active:scale-95"
                >
                  {dict.finalCta.ctaWhatsapp}
                </a>
              </div>
              <p className="mt-7 text-sm text-white/85">
                {h.communityLine}{" "}
                <a
                  href={WHATSAPP_COMMUNITY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-white/60 font-semibold text-white"
                >
                  {h.communityCta}
                </a>
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function CompareRow({ alone, withUs }: { alone: string; withUs: string }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 rtl:divide-x-reverse">
      <div className="flex items-start gap-2.5 p-4 text-sm text-white/55 sm:p-5">
        <X size={16} className="mt-0.5 shrink-0 text-white/30" />
        <span>{alone}</span>
      </div>
      <div className="flex items-start gap-2.5 bg-white/[0.02] p-4 text-sm sm:p-5">
        <Check size={16} className="mt-0.5 shrink-0 text-nino-orange" />
        <span>{withUs}</span>
      </div>
    </div>
  );
}
