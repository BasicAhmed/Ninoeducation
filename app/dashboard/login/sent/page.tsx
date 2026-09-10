import Link from "next/link";
import { Mail } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].dashboard;
  return {
    title: `${t.sentTitle} | نينو إديوكيشن`,
    alternates: { canonical: `${SITE_URL}/dashboard/login/sent` },
    robots: { index: false },
  };
}

export default async function LoginLinkSentPage() {
  const lang = await getLang();
  const t = dictionaries[lang].dashboard;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 pb-16 pt-28">
        <div className="mx-auto max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
            <Mail size={26} />
          </div>
          <h1 className="mt-5 font-display text-2xl">{t.sentTitle}</h1>
          <p className="mt-2 text-nino-ink/70">{t.sentBody}</p>
          <Link
            href="/dashboard/login"
            className="mt-6 inline-block text-sm font-medium text-nino-orange hover:underline"
          >
            {t.backToLogin}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
