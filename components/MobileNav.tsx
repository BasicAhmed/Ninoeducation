"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

export function MobileNav({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const t = dictionaries[lang].nav;

  const links = [
    { href: "/schools", label: t.schools },
    { href: "/accommodation", label: t.accommodation },
    { href: "/quiz", label: t.quiz },
    { href: "/calculator", label: t.calculator },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-nino-ink/15 text-nino-ink"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-nino-line bg-nino-cream shadow-lg">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-nino-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-nino-ink px-4 py-3 text-center text-sm font-medium text-white"
            >
              {t.apply}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
