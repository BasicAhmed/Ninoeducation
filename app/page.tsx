import Link from "next/link";
import { ShieldCheck, ListChecks, Compass, PlaneTakeoff, Home as HomeIcon } from "lucide-react";
import { getPublishedSchools, getPublishedAccommodations } from "@/lib/schools";
import { formatUsd } from "@/lib/currency";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";
import { WorldRouteMap } from "@/components/WorldRouteMap";
import { WhySouthAfrica } from "@/components/WhySouthAfrica";
import { InstagramGallery } from "@/components/InstagramGallery";
import { Reveal } from "@/components/Reveal";
import { CountUpNumber } from "@/components/CountUpNumber";

// This page reads from the database (schools, social posts). Force
// dynamic rendering so it's always fetched per-request, never attempted
// at build time — a missing table, a paused database, or a transient
// connection issue should 500 a single request, not fail the entire
// deployment build.
export const dynamic = "force-dynamic";

const stats = [
  { value: "+30", label: "مدرسة طيران شريكة في جميع أنحاء جنوب أفريقيا" },
  { value: "0", label: "رسوم يدفعها الطالب، مهما كانت الخدمة" },
  { value: "PPL–ATPL", label: "كل مسارات التدريب، من الرخصة الخاصة حتى رخصة النقل الجوي" },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "بلا رسوم على الإطلاق",
    body: "نينو إديوكيشن تتقاضى عمولتها من مدارس الطيران الشريكة، وليس منك. لا رسوم خفية، ولا اشتراك.",
  },
  {
    icon: ListChecks,
    title: "مدارس تم التحقق منها",
    body: "كل مدرسة على المنصة تمت مراجعتها يدويًا من فريقنا قبل نشرها، مع تحديث دوري للأسعار والتفاصيل.",
  },
  {
    icon: Compass,
    title: "مقارنة حقيقية بالأرقام",
    body: "قارن الأسعار، المدة، والأسطول جنبًا إلى جنب بدل التنقل بين عشرات المواقع والمجموعات.",
  },
  {
    icon: HomeIcon,
    title: "دعم كامل بعد القبول",
    body: "سكن، استقبال من المطار، شريحة اتصال، ومتابعة مستمرة من أول يوم حتى تخرجك.",
  },
];

const steps = [
  {
    icon: Compass,
    n: "قارِن",
    body: "صنّف جميع المدارس الشريكة حسب الميزانية، الرخصة، الأسطول، والموقع.",
  },
  {
    icon: PlaneTakeoff,
    n: "قدِّم",
    body: "أرسل طلبًا واحدًا عبر نينو إديوكيشن، ونحن نتولى إيصاله للمدرسة والمتابعة.",
  },
  {
    icon: HomeIcon,
    n: "صِل",
    body: "سكن، استقبال من المطار، وشخص تتواصل معه في أول أسبوع لك في جنوب أفريقيا.",
  },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
      {children}
    </p>
  );
}

export default async function Home() {
  const featured = (await getPublishedSchools()).slice(0, 3);
  const accommodation = (await getPublishedAccommodations()).slice(0, 3);

  return (
    <>
      <SiteHeader transparent />
      <main className="flex-1">
        {/* 1. Hero — the dream */}
        <section className="relative overflow-hidden bg-nino-cream">
          <div
            aria-hidden
            className="ambient-glow-a absolute -right-1/4 -top-1/4 h-64 w-64 rounded-full bg-nino-orange/40 blur-2xl sm:-top-1/3 sm:h-96 sm:w-96 sm:blur-3xl lg:h-[560px] lg:w-[560px] lg:bg-nino-orange/35"
          />
          <div
            aria-hidden
            className="ambient-glow-b absolute -bottom-1/4 -left-1/4 h-56 w-56 rounded-full bg-nino-orange/30 blur-2xl sm:-bottom-1/3 sm:h-80 sm:w-80 sm:blur-3xl lg:h-[480px] lg:w-[480px] lg:bg-nino-orange/25"
          />

          <div className="relative mx-auto max-w-3xl px-6 pt-24 text-center md:pt-32">
            <p dir="ltr" className="font-mono text-xs uppercase tracking-widest text-nino-orange">
              OR Tambo · FAJS · 26.13°S, 28.24°E
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.25] text-nino-ink md:text-6xl">
              طريقك إلى قمرة القيادة
              <br />
              يبدأ من هنا.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-nino-ink/70">
              نينو إديوكيشن تساعد الطلاب العرب على إيجاد ومقارنة والتقديم
              لأفضل مدارس الطيران في جنوب أفريقيا — دون أي تكلفة عليك.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/quiz"
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-white hover:bg-nino-ink"
              >
                ابحث عن مدرستي
              </Link>
              <a
                href="#why-south-africa"
                className="rounded-full border border-nino-ink/20 px-6 py-3 text-sm font-medium text-nino-ink hover:border-nino-ink"
              >
                لماذا جنوب أفريقيا؟
              </a>
            </div>
          </div>

          <div className="h-24 md:h-32" />
        </section>

        {/* 2. Why South Africa — the destination that makes the dream possible */}
        <div id="why-south-africa">
          <WhySouthAfrica />
        </div>

        {/* 3. Route map — now that you know why, see how close it actually is */}
        <section className="bg-nino-cream">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center">
              <Kicker>من بلدك إلى هناك</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                المسافة أقرب مما تتخيل
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-nino-ink/70">
                من الرياض إلى الخرطوم، كل رحلة تنتهي في نفس المكان: جنوب
                أفريقيا.
              </p>
            </div>
            <div className="mt-10">
              <WorldRouteMap />
            </div>
          </div>
        </section>

        {/* 4. Why us — with 30+ schools out there, you need a guide */}
        <section id="why" className="bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
              <div>
                <Kicker>+30 مدرسة، خيار واحد صحيح</Kicker>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">
                  لماذا نينو إديوكيشن
                </h2>
                <p className="mt-3 text-nino-ink/70">
                  لست وحدك في هذا القرار. إليك كيف نساعدك تختار بثقة.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-nino-line bg-nino-line sm:grid-cols-2">
                {whyUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Stats — proof, not promises */}
        <section className="relative overflow-hidden bg-nino-cream">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#0b0d0f_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6 pt-20 text-center">
            <Kicker>لا تصدّق كلامنا فقط</Kicker>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">أرقام، لا وعود</h2>
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

        {/* 6. Featured schools — the real, concrete choices */}
        <section className="bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <Kicker>من الأرقام إلى الواقع</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                هذه ليست كل المدارس — إنها البداية فقط
              </h2>
            </div>
            {featured.length > 0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {featured.map((s, i) => (
                  <SchoolCard key={s.id} school={s} badge={i === 0 ? "الأعلى تقييمًا" : undefined} />
                ))}
              </div>
            )}

            {/* Prominent, unmissable browse-all banner */}
            <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-nino-ink px-8 py-10 text-center text-white sm:flex-row sm:text-start">
              <div>
                <h3 className="font-display text-2xl">تصفّح كل المدارس المتاحة</h3>
                <p className="mt-2 text-white/70">
                  فلترة حسب الميزانية، الرخصة، الموقع، ومقارنة أكثر من مدرسة
                  في نفس الوقت.
                </p>
              </div>
              <Link
                href="/schools"
                className="shrink-0 rounded-full bg-nino-orange px-8 py-3.5 text-sm font-medium hover:bg-white hover:text-nino-ink"
              >
                عرض جميع مدارس الطيران ←
              </Link>
            </div>
          </div>
        </section>

        {/* 6.5 Accommodation — the next real worry after picking a school */}
        {accommodation.length > 0 && (
          <section className="bg-nino-cream">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <Kicker>وين هسكن؟</Kicker>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">
                  السكن جاهز قبل ما توصل
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-nino-ink/70">
                  خيارات سكن قريبة من المدرسة، ننسقها معك من الرياض أو
                  القاهرة أو أي بلد — قبل أن تحجز تذكرتك حتى.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {accommodation.map((a) => (
                  <Link
                    key={a.id}
                    href={`/accommodation/${a.slug}`}
                    className="flex flex-col rounded-2xl border border-nino-line bg-nino-white p-6 transition hover:border-nino-orange"
                  >
                    <span className="text-xs text-nino-ink/50">
                      {a.city} · {a.province}
                    </span>
                    <h3 className="mt-3 font-display text-xl">{a.nameAr}</h3>
                    <div className="mt-5 flex items-end justify-between border-t border-nino-line pt-4">
                      <div dir="ltr" className="text-end text-sm font-medium">
                        ${formatUsd(a.monthlyPriceZar)} / شهريًا
                      </div>
                      {a.distanceToAirport && (
                        <span className="text-xs text-nino-ink/50">
                          {a.distanceToAirport} من المطار
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/accommodation"
                  className="inline-block rounded-full border border-nino-ink/20 px-8 py-3.5 text-sm font-medium text-nino-ink hover:border-nino-ink"
                >
                  عرض كل خيارات السكن ←
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 7. How it works — you've seen the schools, here's what happens next */}
        <section className="bg-nino-cream">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <Kicker>اخترت مدرستك؟</Kicker>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">إليك ما يحدث بعد ذلك</h2>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-nino-line bg-nino-line md:grid-cols-3">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.n} className="relative overflow-hidden bg-nino-white p-8">
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <InstagramGallery />

        {/* 8. Final CTA — close the story, but meet people where they are */}
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
            <Kicker>
              <span className="text-white/70">من الحلم إلى قمرة القيادة</span>
            </Kicker>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              هل أنت مستعد لبدء ملفك؟
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/90">
              أخبرنا بميزانيتك وأهدافك — وسنطابقك مع المدارس المناسبة اليوم.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
              <Link
                href="/apply"
                className="rounded-full bg-nino-ink px-6 py-4 text-sm font-medium hover:bg-white hover:text-nino-ink"
              >
                ابدأ طلبي الآن
              </Link>
              <Link
                href="/quiz"
                className="rounded-full border border-white/40 px-6 py-4 text-sm font-medium hover:bg-white/10"
              >
                لست متأكدًا؟ ابحث عن مدرستي
              </Link>
              <a
                href="https://wa.me/000000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-4 text-sm font-medium hover:bg-white/10"
              >
                تحدث معنا واتساب
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
