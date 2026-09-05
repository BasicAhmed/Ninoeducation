const testimonials = [
  {
    name: "عبدالله",
    origin: "الرياض، السعودية",
    quote:
      "كنت خايف من موضوع الفيزا والسكن أكثر من التدريب نفسه. نينو تكفلت بكل التفاصيل الصغيرة اللي ما كنت أعرف حتى أسأل عنها.",
  },
  {
    name: "مريم",
    origin: "القاهرة، مصر",
    quote:
      "قارنت بين 4 مدارس بنفسي قبل ما أتواصل معهم، ووفروا علي وقت كبير في المقارنة والتفاوض على السعر مع المدرسة.",
  },
  {
    name: "يوسف",
    origin: "الخرطوم، السودان",
    quote:
      "التواصل كان سريع من أول يوم، وما حسيت اني بس رقم في نظام. كانوا يردون على استفساراتي حتى بعد ساعات العمل.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-nino-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            آراء حقيقية
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            ما يقوله الطلاب
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-nino-line bg-nino-white p-6"
            >
              <span className="font-display text-4xl leading-none text-nino-orange/30">
                &ldquo;
              </span>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-nino-ink/80">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-nino-line pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 font-display text-sm text-nino-orange">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-nino-ink">{t.name}</div>
                  <div className="text-xs text-nino-ink/50">{t.origin}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
