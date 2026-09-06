import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackForm } from "@/components/TrackForm";

export default function TrackPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 py-16">
        <TrackForm />
      </main>
      <SiteFooter />
    </>
  );
}
