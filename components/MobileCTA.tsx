"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function MobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // /admin has its own nav; /apply has its own step-navigation bar —
  // showing this generic bar on top of either would just clash.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/apply")) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-white/10 bg-gradient-to-r from-nino-ink via-[#1a0f0a] to-[#3d1608] px-4 py-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/quiz"
        className="flex-1 rounded-full border border-white/25 px-4 py-2.5 text-center text-sm font-medium text-white"
      >
        ابحث عن مدرستي
      </Link>
      <Link
        href="/apply"
        className="flex-[1.4] rounded-full bg-gradient-to-r from-nino-orange to-[#ff7a3d] px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-black/30"
      >
        قدّم الآن ←
      </Link>
    </div>
  );
}
