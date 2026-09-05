"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/schools", label: "مدارس الطيران" },
  { href: "/accommodation", label: "السكن الطلابي" },
  { href: "/quiz", label: "ابحث عن مدرستي" },
  { href: "/calculator", label: "حاسبة التكلفة" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
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
              قدّم الآن
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
