import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export async function SiteHeader() {
  const lang = await getLang();
  const t = dictionaries[lang].nav;

  return (
    <header className="absolute inset-x-0 top-0 z-20 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/">
          <Image
            src="/brand/nino-icon-color.svg"
            alt="نينو إديوكيشن"
            width={52}
            height={52}
            priority
          />
        </Link>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <Link href="/schools" className="hover:text-nino-orange">
            {t.schools}
          </Link>
          <Link href="/accommodation" className="hover:text-nino-orange">
            {t.accommodation}
          </Link>
          <Link href="/quiz" className="hover:text-nino-orange">
            {t.quiz}
          </Link>
          <Link href="/calculator" className="hover:text-nino-orange">
            {t.calculator}
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle lang={lang} />
          <MobileNav lang={lang} />
          <Link
            href="/apply"
            className="rounded-full bg-nino-orange px-4 py-2.5 text-xs font-medium text-nino-white transition hover:bg-nino-ink sm:px-5 sm:text-sm"
          >
            {t.apply}
          </Link>
        </div>
      </div>
    </header>
  );
}
