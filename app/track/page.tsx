import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackForm } from "@/components/TrackForm";
import { getLang } from "@/lib/i18n/get-lang";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "ar" ? "تتبّع طلبك | نينو إديوكيشن" : "Track Your Application | Nino Education",
    description:
      lang === "ar"
        ? "تتبّع حالة طلبك باستخدام رقم الرحلة والبريد الإلكتروني المستخدم عند التقديم."
        : "Track your application status using your flight number and the email you applied with.",
    alternates: { canonical: `${SITE_URL}/track` },
  };
}

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
