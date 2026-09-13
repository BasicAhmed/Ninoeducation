import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getPublishedTestimonials, extractYouTubeId } from "@/lib/testimonials";
import { Reveal } from "@/components/Reveal";
import { PlayCircle } from "lucide-react";

export async function Testimonials() {
  const lang = await getLang();
  const t = dictionaries[lang].testimonials;
  const dbTestimonials = await getPublishedTestimonials();

  // Until real testimonials are added via /admin/testimonials, fall
  // back to the existing hardcoded quotes rather than showing an
  // empty section — this should stop being reached once Ahmed adds
  // real ones, ideally video, since a short video from a real student
  // is far harder to dismiss as marketing copy than a text quote.
  const items =
    dbTestimonials.length > 0
      ? dbTestimonials.map((item) => ({
          name: item.name,
          origin: item.origin,
          quote: item.quote,
          videoId: item.videoUrl ? extractYouTubeId(item.videoUrl) : null,
        }))
      : t.items.map((item) => ({ ...item, videoId: null as string | null }));

  return (
    <section className="bg-nino-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            {t.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            {t.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.name + i}
              delay={i * 100}
              className="flex flex-col overflow-hidden rounded-2xl border border-nino-line bg-nino-white"
            >
              {item.videoId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video bg-nino-ink"
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt={item.name}
                    className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-75"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle
                      size={52}
                      className="text-white drop-shadow-lg transition-transform group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </span>
                </a>
              ) : (
                <span className="px-6 pt-6 font-display text-4xl leading-none text-nino-orange/30">
                  &ldquo;
                </span>
              )}
              <div className="flex flex-1 flex-col p-6">
                {item.quote && (
                  <p className="flex-1 text-sm leading-relaxed text-nino-ink/80">{item.quote}</p>
                )}
                <div className={`flex items-center gap-3 border-t border-nino-line pt-4 ${item.quote ? "mt-6" : "mt-0"}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 font-display text-sm text-nino-orange">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-nino-ink">{item.name}</div>
                    <div className="text-xs text-nino-ink/50">{item.origin}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
