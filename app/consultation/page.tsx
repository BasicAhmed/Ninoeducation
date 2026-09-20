import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { submitConsultationBooking } from "@/lib/consultation-actions";
import { inputClass } from "@/lib/form-styles";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].consultation;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `${SITE_URL}/consultation` },
  };
}

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; error?: string }>;
}) {
  const lang = await getLang();
  const t = dictionaries[lang].consultation;
  const sp = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 pb-16 pt-28">
        <div className="mx-auto max-w-lg">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">{t.kicker}</p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">{t.title}</h1>
          <p className="mt-3 text-nino-ink/70">{t.subtitle}</p>

          <form action={submitConsultationBooking} className="mt-8 space-y-5 rounded-2xl border border-nino-line bg-white p-6">
            <input type="hidden" name="lang" value={lang} />

            {sp.error === "missing" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{t.errorMissing}</p>
            )}
            {sp.error === "failed" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{t.errorFailed}</p>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                {t.nameLabel}
              </label>
              <input id="name" name="name" type="text" required className={`mt-1.5 w-full ${inputClass()}`} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                {t.emailLabel}
              </label>
              <input id="email" name="email" type="email" required dir="ltr" className={`mt-1.5 w-full text-start ${inputClass()}`} />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium">
                {t.whatsappLabel}
              </label>
              <input id="whatsapp" name="whatsapp" type="tel" required dir="ltr" className={`mt-1.5 w-full text-start ${inputClass()}`} />
            </div>

            <div>
              <label htmlFor="referenceCode" className="block text-sm font-medium">
                {t.referenceCodeLabel}
              </label>
              <input
                id="referenceCode"
                name="referenceCode"
                type="text"
                defaultValue={sp.ref ?? ""}
                dir="ltr"
                className={`mt-1.5 w-full text-start ${inputClass()}`}
              />
              <p className="mt-1.5 text-xs text-nino-ink/45">{t.referenceCodeHint}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium">
                  {t.dateLabel}
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  required
                  className={`mt-1.5 w-full ${inputClass()}`}
                />
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium">
                  {t.timeLabel}
                </label>
                <select id="preferredTime" name="preferredTime" required className={`mt-1.5 w-full ${inputClass()}`}>
                  <option value="morning">{t.timeMorning}</option>
                  <option value="afternoon">{t.timeAfternoon}</option>
                  <option value="evening">{t.timeEvening}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium">
                {t.topicLabel}
              </label>
              <textarea
                id="topic"
                name="topic"
                rows={3}
                placeholder={t.topicPlaceholder}
                className={`mt-1.5 w-full ${inputClass()}`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-white hover:bg-nino-ink"
            >
              {t.submitCta}
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
