import Link from "next/link";
import { ShieldCheck, ListChecks, Compass, PlaneTakeoff, Home as HomeIcon } from "lucide-react";
import { getPublishedSchools } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";
import { WorldRouteMap } from "@/components/WorldRouteMap";
import { WhySouthAfrica } from "@/components/WhySouthAfrica";
import { Reveal } from "@/components/Reveal";
import { CountUpNumber } from "@/components/CountUpNumber";

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

export default async function Home() {
  const featured = (await getPublishedSchools()).slice(0, 3);

  return (
    <>
      <SiteHeader transparent />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-nino-cream">
          <div
            aria-hidden
            className="ambient-glow-a absolute -right-1/4 -top-1/3 h-[560px] w-[560px] rounded-full bg-nino-orange/35 blur-3xl"
          />
          <div
            aria-hidden
            className="ambient-glow-b absolute -bottom-1/3 -left-1/4 h-[480px] w-[480px] rounded-full bg-nino-orange/25 blur-3xl"
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
                href="#why"
                className="rounded-full border border-nino-ink/20 px-6 py-3 text-sm font-medium text-nino-ink hover:border-nino-ink"
              >
                لماذا نينو إديوكيشن
              </a>
            </div>
          </div>

          <div className="h-24 md:h-32" />
        </section>

        {/* Route map */}
        <section className="border-b border-nino-line bg-nino-cream">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl">
                من أينما كنت، الوجهة واحدة
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-nino-ink/70">
                من الرياض إلى الخرطوم، كل رحلة تنتهي في جنوب أفريقيا.
              </p>
            </div>
            <div className="mt-10">
              <WorldRouteMap />
            </div>
          </div>
        </section>

        <WhySouthAfrica />

        {/* Stats */}
        <section className="relative overflow-hidden border-b border-nino-line bg-nino-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#0b0d0f_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="rounded-2xl border border-nino-line bg-nino-cream/60 p-8 backdrop-blur-sm transition hover:border-nino-orange hover:bg-white">
                  <div dir="ltr" className="text-end font-display text-5xl text-nino-orange">
                    <CountUpNumber value={s.value} />
                  </div>
                  <p className="mt-3 text-sm text-nino-ink/70">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Featured schools */}
        {featured.length > 0 && (
          <section className="border-b border-nino-line bg-nino-cream">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="flex items-end justify-between">
                <h2 className="font-display text-3xl md:text-4xl">
                  مدارس مقترحة لك
                </h2>
                <Link href="/schools" className="text-sm font-medium text-nino-orange hover:underline">
                  عرض كل المدارس ←
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {featured.map((s, i) => (
                  <SchoolCard key={s.id} school={s} badge={i === 0 ? "الأعلى تقييمًا" : undefined} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why us */}
        <section id="why" className="border-b border-nino-line bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">
                  لماذا نينو إديوكيشن
                </h2>
                <p className="mt-3 text-nino-ink/70">
                  أربعة أسباب يثق بها الطلاب في قرارهم الأهم.
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

        {/* How it works */}
        <section className="border-b border-nino-line bg-nino-cream">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-3xl md:text-4xl">كيف تعمل الخدمة</h2>
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

        {/* Footer CTA */}
        <section className="bg-gradient-to-br from-nino-orange to-[#ff7a3d] text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl">
              هل أنت مستعد لبدء ملفك؟
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/90">
              أخبرنا بميزانيتك وأهدافك — وسنطابقك مع المدارس المناسبة اليوم.
            </p>
            <Link
              href="/apply"
              className="mt-8 inline-block rounded-full bg-nino-ink px-8 py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
            >
              ابدأ طلبي
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
