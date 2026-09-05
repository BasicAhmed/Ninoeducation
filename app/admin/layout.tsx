import { requireAdmin } from "@/lib/admin-auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div dir="rtl" className="min-h-screen bg-nino-cream">
      <AdminSidebar />
      <div className="md:ms-64">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </div>
    </div>
  );
}
