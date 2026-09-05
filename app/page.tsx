import Image from "next/image";

const routes = [
  { from: "الرياض", code: "RUH", lat: "24.71°N", lon: "46.68°E" },
  { from: "القاهرة", code: "CAI", lat: "30.04°N", lon: "31.24°E" },
  { from: "دبي", code: "DXB", lat: "25.20°N", lon: "55.27°E" },
  { from: "الخرطوم", code: "KRT", lat: "15.60°N", lon: "32.55°E" },
];

const stats = [
  { value: "+30", label: "مدرسة طيران شريكة في جميع أنحاء جنوب أفريقيا" },
  { value: "0", label: "رسوم يدفعها الطالب، مهما كانت الخدمة" },
  { value: "PPL–ATPL", label: "كل مسارات التدريب، من الرخصة الخاصة حتى رخصة النقل الجوي" },
];

const steps = [
  {
    n: "قارِن",
    body: "صنّف جميع المدارس الشريكة حسب الميزانية، الرخصة، الأسطول، والموقع — وشاهد الأسعار الحقيقية جنبًا إلى جنب.",
  },
  {
    n: "قدِّم",
    body: "أرسل طلبًا واحدًا عبر نينو إديوكيشن، ونحن نتولى إيصاله للمدرسة والمتابعة نيابةً عنك.",
  },
  {
    n: "صِل",
    body: "سكن، استقبال من المطار، شريحة اتصال، وشخص تتواصل معه في أول أسبوع لك في جنوب أفريقيا.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Nav */}
      <header className="border-b border-nino-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Image
            src="/brand/nino-icon-color.svg"
            alt="نينو إديوكيشن"
            width={40}
            height={40}
            priority
          />
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#schools" className="hover:text-nino-orange">
              مدارس الطيران
            </a>
            <a href="#guide" className="hover:text-nino-orange">
              دليل الدراسة
            </a>
            <a href="#how" className="hover:text-nino-orange">
              كيف تعمل الخدمة
            </a>
          </nav>
          <a
            href="#apply"
            className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-nino-white transition hover:bg-nino-orange"
          >
            قدّم الآن
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-nino-line bg-nino-ink text-nino-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p dir="ltr" className="text-end font-mono text-xs uppercase tracking-widest text-nino-orange">
              OR Tambo · FAJS · 26.13°S, 28.24°E
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.25] md:text-6xl">
              طريقك إلى قمرة القيادة
              <br />
              يبدأ من هنا.
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              نينو إديوكيشن تساعد الطلاب العرب على إيجاد ومقارنة والتقديم
              لأفضل مدارس الطيران في جنوب أفريقيا — دون أي تكلفة عليك.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#schools"
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-nino-white hover:bg-white hover:text-nino-ink"
              >
                ابحث عن مدرستي
              </a>
              <a
                href="#how"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium hover:border-white"
              >
                كيف تعمل الخدمة
              </a>
            </div>
          </div>

          {/* Route board */}
          <div className="self-center rounded-2xl border border-white/15 bg-white/[0.04] p-6 font-mono text-sm" dir="ltr">
            <div className="mb-4 flex justify-between text-white/40">
              <span>المنشأ</span>
              <span>الوجهة</span>
            </div>
            {routes.map((r) => (
              <div
                key={r.code}
                className="flex items-center justify-between border-t border-white/10 py-3 first:border-t-0"
              >
                <div className="text-start">
                  <div>{r.from}</div>
                  <div className="text-white/40">
                    {r.lat} {r.lon}
                  </div>
                </div>
                <div className="h-px flex-1 mx-4 bg-white/15" />
                <div className="text-nino-orange">JNB</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-nino-line bg-nino-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <div dir="ltr" className="text-end font-display text-4xl text-nino-orange">
                {s.value}
              </div>
              <p className="mt-2 max-w-[26ch] text-sm text-nino-ink/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b border-nino-line bg-nino-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl">
            نحن لا نتقاضى أي رسوم من الطلاب. أبدًا.
          </h2>
          <p className="mt-3 max-w-xl text-nino-ink/70">
            نينو إديوكيشن تحصل على عمولتها من مدارس الطيران الشريكة، وليس
            منك. إليك كيف يبدو ذلك عمليًا.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-nino-ink pt-5">
                <h3 className="font-display text-xl">{s.n}</h3>
                <p className="mt-2 text-sm text-nino-ink/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="apply" className="bg-nino-ink text-nino-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl">
            هل أنت مستعد لبدء ملفك؟
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            أخبرنا بميزانيتك وأهدافك — وسنطابقك مع المدارس المناسبة اليوم.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-nino-orange px-8 py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
          >
            ابدأ طلبي
          </a>
        </div>
      </footer>
    </main>
  );
}
