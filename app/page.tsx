import Link from "next/link";
import { ShieldCheck, ListChecks, Compass, PlaneTakeoff, Home as HomeIcon } from "lucide-react";
import { getPublishedSchools } from "@/lib/schools";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SchoolCard } from "@/components/SchoolCard";
import { WorldRouteMap } from "@/components/WorldRouteMap";

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
                مرّر فوق أي مدينة لترى تفاصيل الرحلة نحو جنوب أفريقيا.
              </p>
            </div>
            <div className="mt-10">
              <WorldRouteMap />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-nino-line bg-nino-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-nino-line p-6 transition hover:border-nino-orange"
              >
                <div dir="ltr" className="text-end font-display text-4xl text-nino-orange">
                  {s.value}
                </div>
                <p className="mt-2 text-sm text-nino-ink/70">{s.label}</p>
              </div>
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
                {featured.map((s) => (
                  <SchoolCard key={s.id} school={s} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why us */}
        <section id="why" className="border-b border-nino-line bg-nino-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-3xl md:text-4xl">
              لماذا نينو إديوكيشن
            </h2>
            <p className="mt-3 max-w-xl text-nino-ink/70">
              أربعة أسباب يثق بها الطلاب في قرارهم الأهم.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {whyUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-nino-line p-7 transition hover:-translate-y-1 hover:border-nino-orange hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-nino-cream text-nino-ink transition group-hover:bg-nino-orange group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-nino-ink/70">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-nino-line bg-nino-cream">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-3xl md:text-4xl">كيف تعمل الخدمة</h2>
            <div className="relative mt-14 grid gap-10 md:grid-cols-3">
              <div
                aria-hidden
                className="absolute top-6 hidden h-px w-full bg-nino-line md:block"
              />
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.n} className="relative">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-nino-orange bg-nino-cream text-nino-orange">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-xl">
                      {i + 1}. {s.n}
                    </h3>
                    <p className="mt-2 text-sm text-nino-ink/70">{s.body}</p>
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
