import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { logoutAdmin } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div dir="rtl" className="min-h-screen bg-nino-cream">
      <header className="border-b border-nino-line bg-nino-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="font-display text-lg">لوحة تحكم نينو</span>
            <nav className="flex gap-6 text-sm text-white/70">
              <Link href="/admin" className="hover:text-white">
                نظرة عامة
              </Link>
              <Link href="/admin/schools" className="hover:text-white">
                مدارس الطيران
              </Link>
              <Link href="/admin/accommodation" className="hover:text-white">
                السكن
              </Link>
              <Link href="/admin/applications" className="hover:text-white">
                الطلبات
              </Link>
            </nav>
          </div>
          <form action={logoutAdmin}>
            <button className="text-sm text-white/50 hover:text-white">
              تسجيل الخروج
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
