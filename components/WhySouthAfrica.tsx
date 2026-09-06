import Link from "next/link";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export async function WhySouthAfrica() {
  const lang = await getLang();
  const t = dictionaries[lang].whySouthAfrica;

  const points = [
    { title: t.point1Title, body: t.point1Body },
    { title: t.point2Title, body: t.point2Body },
    { title: t.point3Title, body: t.point3Body },
    { title: t.point4Title, body: t.point4Body },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* video background */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/VzqWO5EaSps?start=15&autoplay=1&mute=1&loop=1&playlist=VzqWO5EaSps&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
          title={t.kicker}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[100vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-nino-ink/90 via-nino-ink/70 to-nino-ink/40" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 text-white md:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
          {t.kicker}
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl md:text-4xl">
          {t.title}
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
          {t.watchFull}
        </a>
        <Link
          href="/guides/study-aviation-in-south-africa"
          className="mt-3 block text-sm text-white/60 underline underline-offset-4 hover:text-white"
        >
          {t.readFullGuide}
        </Link>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-nino-cream"
      />
    </section>
  );
}
