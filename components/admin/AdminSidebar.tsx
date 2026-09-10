"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plane, Home, ClipboardList, AtSign, LogOut, Menu, X, Hourglass } from "lucide-react";
import { logoutAdmin } from "@/lib/admin-auth";
import { CommandPalette } from "@/components/admin/CommandPalette";

const NAV = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/schools", label: "مدارس الطيران", icon: Plane },
  { href: "/admin/accommodation", label: "السكن", icon: Home },
  { href: "/admin/applications", label: "الطلبات", icon: ClipboardList },
  { href: "/admin/abandoned", label: "طلبات متروكة", icon: Hourglass },
  { href: "/admin/social", label: "إنستقرام", icon: AtSign },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 space-y-1 px-3">
      {NAV.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              active ? "bg-nino-orange text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-nino-ink px-4 py-3 md:hidden">
        <button onClick={() => setDrawerOpen(true)} aria-label="القائمة" className="text-white">
          <Menu size={22} />
        </button>
        <span className="font-display text-sm text-white">لوحة تحكم نينو</span>
        <div className="w-[22px]" />
      </div>
      <div className="border-b border-white/10 bg-nino-ink px-4 py-2.5 md:hidden">
        <CommandPalette />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[150] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="relative flex h-full w-64 flex-col bg-nino-ink py-4">
            <div className="flex items-center justify-between px-4 pb-4">
              <span className="font-display text-white">لوحة تحكم نينو</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="إغلاق" className="text-white/60">
                <X size={20} />
              </button>
            </div>
            <NavLinks onNavigate={() => setDrawerOpen(false)} />
            <div className="px-3 pt-4">
              <form action={logoutAdmin}>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 hover:bg-white/10 hover:text-white">
                  <LogOut size={17} />
                  تسجيل الخروج
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed top-0 hidden h-screen w-64 flex-col border-e border-white/10 bg-nino-ink py-5 md:flex">
        <div className="px-4 pb-5">
          <span className="font-display text-lg text-white">لوحة تحكم نينو</span>
        </div>
        <div className="px-3 pb-4">
          <CommandPalette />
        </div>
        <NavLinks />
        <div className="px-3 pt-4">
          <form action={logoutAdmin}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 hover:bg-white/10 hover:text-white">
              <LogOut size={17} />
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
