import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackForm } from "@/components/TrackForm";
import { getLang } from "@/lib/i18n/get-lang";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "تتبّع طلبك | نينو إديوكيشن",
  description: "تتبّع حالة طلبك باستخدام رقم الرحلة والبريد الإلكتروني المستخدم عند التقديم.",
  alternates: { canonical: `${SITE_URL}/track` },
};

export default async function TrackPage() {
  const lang = await getLang();
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 pb-16 pt-28">
        <TrackForm lang={lang} />
      </main>
      <SiteFooter />
    </>
  );
}
