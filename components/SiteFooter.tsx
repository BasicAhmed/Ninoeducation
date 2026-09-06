import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export async function SiteFooter() {
  const lang = await getLang();
  const t = dictionaries[lang].footer;
  const nav = dictionaries[lang].nav;

  return (
    <footer className="border-t border-nino-line bg-nino-white text-nino-ink/70">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-nino-ink">{t.brand}</p>
            <p className="mt-2 max-w-xs">{t.tagline}</p>
          </div>
          <div>
            <p className="font-medium text-nino-ink">{t.linksHeading}</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/schools" className="hover:text-nino-orange">
                  {nav.schools}
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-nino-orange">
                  {nav.accommodation}
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-nino-orange">
                  {nav.apply}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-nino-orange">
                  {t.track}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-nino-ink">{t.contactHeading}</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="mt-2 inline-block hover:text-nino-orange"
            >
              {t.whatsapp}
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-nino-line pt-6 text-xs text-nino-ink/40">
          © {new Date().getFullYear()} {t.rights}
        </p>
      </div>
    </footer>
  );
}
