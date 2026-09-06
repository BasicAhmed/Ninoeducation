import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export async function FAQ() {
  const lang = await getLang();
  const t = dictionaries[lang].faq;

  return (
    <section className="bg-nino-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            {t.kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            {t.title}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-nino-line border-y border-nino-line">
          {t.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-nino-ink marker:content-none">
                {item.q}
                <span className="shrink-0 text-2xl font-light text-nino-orange transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-nino-ink/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
