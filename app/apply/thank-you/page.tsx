import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = { title: "تم استلام طلبك | نينو إديوكيشن" };

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-nino-cream px-6 py-24">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl">شكرًا لك.</h1>
          <p className="mt-3 text-nino-ink/70">
            استلمنا طلبك بنجاح. سيقوم أحد مستشاري نينو إديوكيشن بمراجعته
            والتواصل معك قريبًا.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
