import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { requestLoginLink } from "@/lib/student-auth";
import { inputClass } from "@/lib/form-styles";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].dashboard;
  return {
    title: `${t.loginTitle} | نينو إديوكيشن`,
    alternates: { canonical: `${SITE_URL}/dashboard/login` },
    robots: { index: false },
  };
}

export default async function DashboardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const lang = await getLang();
  const t = dictionaries[lang].dashboard;
  const sp = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 pb-16 pt-28">
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-3xl">{t.loginTitle}</h1>
          <p className="mt-2 text-nino-ink/70">{t.loginSubtitle}</p>

          <form action={requestLoginLink} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                {t.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                dir="ltr"
                className={`mt-1.5 w-full text-start ${inputClass(sp.error === "invalid")}`}
              />
              {sp.error === "invalid" && (
                <p className="mt-1 text-xs text-red-500">{t.invalidEmail}</p>
              )}
              {sp.error === "expired" && (
                <p className="mt-1 text-xs text-red-500">{t.expiredLink}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-white hover:bg-nino-ink"
            >
              {t.sendLinkCta}
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
