const points = [
  {
    title: "اعتماد دولي",
    body: "هيئة الطيران المدني الجنوب أفريقية (SACAA) معتمدة من منظمة الطيران المدني الدولي (ICAO)، ورخصتك قابلة للتحويل عالميًا.",
  },
  {
    title: "طقس يسمح بالتدريب طوال السنة",
    body: "أكثر من 300 يوم مشمس سنويًا في معظم مناطق التدريب، ما يعني تدريبًا أسرع وساعات طيران فعلية أكثر.",
  },
  {
    title: "تكلفة أقل بكثير",
    body: "تدريب بجودة عالمية بجزء من تكلفة أمريكا أو أوروبا أو حتى بعض الدول العربية.",
  },
  {
    title: "بيئة إنجليزية جاهزة",
    body: "التدريب والاختبارات بالكامل باللغة الإنجليزية، دون الحاجة لتعلم لغة جديدة.",
  },
];

export function WhySouthAfrica() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* video background */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/VzqWO5EaSps?autoplay=1&mute=1&loop=1&playlist=VzqWO5EaSps&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
          title="لماذا جنوب أفريقيا"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[100vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-nino-ink/90 via-nino-ink/70 to-nino-ink/40" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 text-white md:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
          لماذا جنوب أفريقيا
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl">
          وجهة التدريب الأولى للطلاب العرب منذ سنوات
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="border-t border-white/20 pt-4">
              <h3 className="font-display text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-white/75">{p.body}</p>
            </div>
          ))}
        </div>
        <a
          href="https://youtu.be/VzqWO5EaSps"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block text-sm text-white/60 underline underline-offset-4 hover:text-white"
        >
          شاهد الفيديو الكامل
        </a>
      </div>
    </section>
  );
}
