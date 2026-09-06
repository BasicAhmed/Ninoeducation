import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackForm } from "@/components/TrackForm";
import { getLang } from "@/lib/i18n/get-lang";

export default async function TrackPage() {
  const lang = await getLang();
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 py-16">
        <TrackForm lang={lang} />
      </main>
      <SiteFooter />
    </>
  );
}
