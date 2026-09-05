import { loginAdmin } from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-nino-ink px-6" dir="rtl">
      <form
        action={loginAdmin}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-white"
      >
        <h1 className="font-display text-2xl">لوحة تحكم نينو إديوكيشن</h1>
        <p className="mt-2 text-sm text-white/50">أدخل كلمة المرور للمتابعة.</p>
        {sp.error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            كلمة المرور غير صحيحة.
          </p>
        )}
        <input
          type="password"
          name="password"
          required
          placeholder="كلمة المرور"
          className="mt-6 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2.5 text-sm"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-nino-orange py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
        >
          دخول
        </button>
      </form>
    </main>
  );
}
