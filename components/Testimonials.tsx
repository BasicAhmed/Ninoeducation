import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/Reveal";

export async function Testimonials() {
  const lang = await getLang();
  const t = dictionaries[lang].testimonials;

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
          {t.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 100}
              className="flex flex-col rounded-2xl border border-nino-line bg-nino-white p-6"
            >
              <span className="font-display text-4xl leading-none text-nino-orange/30">
                &ldquo;
              </span>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-nino-ink/80">
                {item.quote}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-nino-line pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 font-display text-sm text-nino-orange">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-nino-ink">{item.name}</div>
                  <div className="text-xs text-nino-ink/50">{item.origin}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
