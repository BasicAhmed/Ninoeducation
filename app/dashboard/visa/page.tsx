import Link from "next/link";
import { headers } from "next/headers";
import { Mail, MapPin, ExternalLink, CheckCircle2, Circle, AlertTriangle, LocateFixed } from "lucide-react";
import { eq, asc } from "drizzle-orm";
import { db } from "@/db/client";
import { visaCountries } from "@/db/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { requireStudentEmail } from "@/lib/student-auth";
import {
  getMyVisaProgress,
  selectVisaCountry,
  toggleVisaStep,
  toggleVisaDocument,
  autoSaveDetectedCountry,
} from "@/lib/visa-progress";
import { STANDARD_VISA_DOCUMENTS } from "@/lib/visa-documents";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata() {
  const lang = await getLang();
  const t = dictionaries[lang].visaTracker;
  return {
    title: `${t.title} | نينو إديوكيشن`,
    alternates: { canonical: `${SITE_URL}/dashboard/visa` },
    robots: { index: false },
  };
}

function StepDot({ done }: { done: boolean }) {
  return done ? (
    <CheckCircle2 className="text-nino-orange" size={22} />
  ) : (
    <Circle className="text-nino-line" size={22} />
  );
}

export default async function VisaTrackerPage() {
  const lang = await getLang();
  const t = dictionaries[lang].visaTracker;
  await requireStudentEmail();

  const progress = await getMyVisaProgress();

  let countries: (typeof visaCountries.$inferSelect)[] = [];
  try {
    countries = await db
      .select()
      .from(visaCountries)
      .where(eq(visaCountries.status, "published"))
      .orderBy(asc(lang === "ar" ? visaCountries.countryNameAr : visaCountries.countryNameEn));
  } catch (err) {
    console.error("VisaTrackerPage countries lookup failed:", err);
  }

  let selectedCountry = progress?.countryId
    ? countries.find((c) => c.id === progress.countryId) ?? null
    : null;

  // Auto-detect: Vercel sets this header automatically on every
  // request based on the visitor's IP — no external API, no
  // permission prompt needed. Only kicks in if the student hasn't
  // already chosen (or previously been auto-assigned) a country.
  let autoDetected = false;
  if (!selectedCountry) {
    const detectedCode = (await headers()).get("x-vercel-ip-country");
    if (detectedCode) {
      const match = countries.find((c) => c.countryCode === detectedCode);
      if (match) {
        selectedCountry = match;
        autoDetected = true;
        await autoSaveDetectedCountry(match.id);
      }
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 pb-16 pt-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl">{t.title}</h1>
          <p className="mt-2 text-nino-ink/70">{t.subtitle}</p>

          {/* Country selection */}
          {!selectedCountry ? (
            <div className="mt-8 rounded-2xl border border-nino-line bg-white p-6">
              {countries.length === 0 ? (
                <p className="text-nino-ink/60">{t.noCountriesYet}</p>
              ) : (
                <form action={selectVisaCountry}>
                  <label className="block text-sm font-medium">{t.chooseCountryLabel}</label>
                  <select
                    name="countryId"
                    required
                    className="mt-2 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
                  >
                    <option value="">—</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === "ar" ? c.countryNameAr : c.countryNameEn}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="mt-4 rounded-full bg-nino-ink px-6 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
                  >
                    {t.chooseCountryCta}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              {autoDetected && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-nino-ink/50">
                  <LocateFixed size={13} />
                  {t.autoDetectedNote}
                </p>
              )}
              <form action={selectVisaCountry} className={autoDetected ? "mt-1" : "mt-4"}>
                <input type="hidden" name="countryId" value="" />
                <button type="submit" className="text-sm text-nino-orange hover:underline">
                  {lang === "ar" ? selectedCountry.countryNameAr : selectedCountry.countryNameEn} ·{" "}
                  {t.changeCountry}
                </button>
              </form>

              {/* Progress stepper */}
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-nino-line bg-white p-4">
                <StepDot done={progress?.step1AppointmentBooked ?? false} />
                <div className="h-0.5 flex-1 bg-nino-line" />
                <StepDot done={progress?.step2LocationConfirmed ?? false} />
                <div className="h-0.5 flex-1 bg-nino-line" />
                <StepDot
                  done={
                    (() => {
                      try {
                        return JSON.parse(progress?.documentsChecked || "[]").length === STANDARD_VISA_DOCUMENTS.length;
                      } catch {
                        return false;
                      }
                    })()
                  }
                />
              </div>

              {/* Step 1 */}
              <section className="mt-6 rounded-2xl border border-nino-line bg-white p-6">
                <h2 className="font-display text-xl">{t.step1Title}</h2>

                {selectedCountry.hasEmbassy && (
                  <div className="mt-3">
                    <p className="text-sm text-nino-ink/70">{t.hasEmbassyIntro}</p>
                    {selectedCountry.embassyName && (
                      <p className="mt-2 font-medium text-nino-ink">{selectedCountry.embassyName}</p>
                    )}
                    {selectedCountry.embassyEmail && (
                      <a
                        href={`mailto:${selectedCountry.embassyEmail}`}
                        className="mt-1 flex items-center gap-2 text-sm text-nino-orange hover:underline"
                        dir="ltr"
                      >
                        <Mail size={14} />
                        {selectedCountry.embassyEmail}
                      </a>
                    )}
                  </div>
                )}

                {selectedCountry.usesVfs && (
                  <div className="mt-3">
                    <p className="text-sm text-nino-ink/70">{t.usesVfsIntro}</p>
                    {selectedCountry.vfsWebsite && (
                      <a
                        href={selectedCountry.vfsWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center gap-2 text-sm text-nino-orange hover:underline"
                      >
                        <ExternalLink size={14} />
                        {t.vfsWebsiteLabel}
                      </a>
                    )}
                  </div>
                )}

                {selectedCountry.noDirectOption && (
                  <div className="mt-3">
                    <p className="flex items-center gap-2 text-sm text-amber-700">
                      <AlertTriangle size={14} />
                      {t.noDirectIntro}
                    </p>
                    {selectedCountry.alternativeCountryNote && (
                      <p className="mt-2 text-sm text-nino-ink/70">{selectedCountry.alternativeCountryNote}</p>
                    )}
                  </div>
                )}

                <form action={toggleVisaStep} className="mt-4">
                  <input type="hidden" name="step" value="1" />
                  <button
                    type="submit"
                    className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                      progress?.step1AppointmentBooked
                        ? "border border-nino-line text-nino-ink/60"
                        : "bg-nino-orange text-white hover:bg-nino-ink"
                    }`}
                  >
                    {progress?.step1AppointmentBooked ? t.markStep1Undo : t.markStep1Done}
                  </button>
                </form>
              </section>

              {/* Step 2 */}
              <section className="mt-6 rounded-2xl border border-nino-line bg-white p-6">
                <h2 className="font-display text-xl">{t.step2Title}</h2>
                {(selectedCountry.embassyMapsUrl || selectedCountry.vfsMapsUrl) && (
                  <a
                    href={selectedCountry.embassyMapsUrl || selectedCountry.vfsMapsUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-2 text-sm text-nino-orange hover:underline"
                  >
                    <MapPin size={14} />
                    {t.openInMaps}
                  </a>
                )}
                <form action={toggleVisaStep} className="mt-4">
                  <input type="hidden" name="step" value="2" />
                  <button
                    type="submit"
                    className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                      progress?.step2LocationConfirmed
                        ? "border border-nino-line text-nino-ink/60"
                        : "bg-nino-orange text-white hover:bg-nino-ink"
                    }`}
                  >
                    {progress?.step2LocationConfirmed ? t.markStep2Undo : t.markStep2Done}
                  </button>
                </form>
              </section>

              {/* Step 3 */}
              <section className="mt-6 rounded-2xl border border-nino-line bg-white p-6">
                <h2 className="font-display text-xl">{t.step3Title}</h2>
                {(() => {
                  let checked: string[] = [];
                  try {
                    checked = JSON.parse(progress?.documentsChecked || "[]");
                  } catch {
                    checked = [];
                  }
                  return (
                    <>
                      <p className="mt-1 text-sm text-nino-ink/50">
                        {t.documentsProgress(checked.length, STANDARD_VISA_DOCUMENTS.length)}
                      </p>
                      <div className="mt-4 space-y-2">
                        {STANDARD_VISA_DOCUMENTS.map((doc) => {
                          const isChecked = checked.includes(doc.id);
                          return (
                            <form key={doc.id} action={toggleVisaDocument}>
                              <input type="hidden" name="docId" value={doc.id} />
                              <button
                                type="submit"
                                className="flex w-full items-center gap-3 rounded-lg border border-nino-line px-4 py-3 text-start text-sm hover:border-nino-orange"
                              >
                                <StepDot done={isChecked} />
                                <span className={isChecked ? "text-nino-ink/50 line-through" : "text-nino-ink"}>
                                  {lang === "ar" ? doc.ar : doc.en}
                                </span>
                              </button>
                            </form>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
                {selectedCountry.additionalDocumentsNote && (
                  <p className="mt-4 rounded-lg bg-nino-cream p-3 text-sm text-nino-ink/70">
                    <strong>{t.additionalDocsNote}</strong> {selectedCountry.additionalDocumentsNote}
                  </p>
                )}
              </section>

              <p className="mt-6 text-xs text-nino-ink/40">
                {t.lastVerifiedNote}: {new Date(selectedCountry.lastVerifiedAt).toLocaleDateString(
                  lang === "ar" ? "ar-EG" : "en-US"
                )}
              </p>
            </>
          )}

          <Link href="/dashboard" className="mt-8 inline-block text-sm text-nino-ink/50 hover:text-nino-ink">
            ← {dictionaries[lang].dashboard.backToDashboard}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
