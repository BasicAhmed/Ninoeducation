"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plane,
  Briefcase,
  CloudFog,
  Layers3,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  IdCard,
  TowerControl,
  Ticket,
  Wallet,
  Languages,
  PlaneTakeoff,
  Check,
  CheckCircle2,
  Users,
} from "lucide-react";
import { submitApplication } from "@/lib/actions";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneField, validatePhone } from "@/components/PhoneField";
import { COUNTRIES, PRIORITY_COUNTRY_CODES } from "@/lib/countries";
import { inputClass } from "@/lib/form-styles";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

const EASE = "cubic-bezier(0.65,0,0.35,1)";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ApplyWizard({
  schoolSlug,
  schoolName,
  schools,
  lang,
}: {
  schoolSlug: string;
  schoolName?: string;
  schools: { slug: string; nameAr: string }[];
  lang: Lang;
}) {
  const t = dictionaries[lang].apply;

  const LICENSE_OPTIONS = [
    { value: "PPL", label: t.licensePplLabel, hint: t.licensePplHint, icon: Plane },
    { value: "CPL", label: t.licenseCplLabel, hint: t.licenseCplHint, icon: Briefcase },
    { value: "IR", label: t.licenseIrLabel, hint: t.licenseIrHint, icon: CloudFog },
    { value: "ME", label: t.licenseMeLabel, hint: t.licenseMeHint, icon: Layers3 },
    { value: "ATPL_THEORY", label: t.licenseAtplLabel, hint: t.licenseAtplHint, icon: GraduationCap },
  ];

  const BUDGET_OPTIONS = [t.budget1, t.budget2, t.budget3, t.budget4, t.budget5, t.budget6];

  const FUNDING_OPTIONS = [
    { value: "personal_savings", label: t.fundingPersonal },
    { value: "family_support", label: t.fundingFamily },
    { value: "loan", label: t.fundingLoan },
    { value: "undecided", label: t.fundingUndecided },
  ];

  const ACCOMMODATION_BUDGET_OPTIONS = [
    { value: "yes", label: t.accBudgetYes },
    { value: "no", label: t.accBudgetNo },
    { value: "unsure", label: t.accBudgetUnsure },
  ];

  const ENGLISH_OPTIONS = [
    { value: "beginner", label: t.englishBeginner },
    { value: "intermediate", label: t.englishIntermediate },
    { value: "good", label: t.englishGood },
    { value: "fluent", label: t.englishFluent },
  ];

  const MEDICAL_OPTIONS = [
    { value: "no", label: t.medicalNo },
    { value: "unsure", label: t.medicalUnsure },
    { value: "yes", label: t.medicalYes },
  ];

  const APPLICANT_TYPE_OPTIONS = [
    { value: "student", label: t.applicantStudent },
    { value: "parent", label: t.applicantParent },
  ];

  const AGE_GROUP_OPTIONS = [
    { value: "under_18", label: t.ageUnder18 },
    { value: "18_24", label: t.age18to24 },
    { value: "25_34", label: t.age25to34 },
    { value: "35_plus", label: t.age35plus },
  ];

  const EDUCATION_OPTIONS = [
    { value: "high_school_student", label: t.eduHighSchoolStudent },
    { value: "high_school_grad", label: t.eduHighSchoolGrad },
    { value: "university_student", label: t.eduUniversityStudent },
    { value: "university_grad", label: t.eduUniversityGrad },
  ];

  const STEPS = [
    { key: "who", title: t.stepWhoTitle, kicker: t.stepWhoKicker, icon: IdCard },
    { key: "profile", title: t.stepProfileTitle, kicker: t.stepProfileKicker, icon: Users },
    { key: "contact", title: t.stepContactTitle, kicker: t.stepContactKicker, icon: TowerControl },
    { key: "money", title: t.stepMoneyTitle, kicker: t.stepMoneyKicker, icon: Wallet },
    { key: "readiness", title: t.stepReadinessTitle, kicker: t.stepReadinessKicker, icon: Languages },
    { key: "dream", title: t.stepDreamTitle, kicker: t.stepDreamKicker, icon: Plane },
    { key: "review", title: t.stepReviewTitle, kicker: t.stepReviewKicker, icon: Ticket },
  ];

  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [duplicate, setDuplicate] = useState<{
    referenceCode: string | null;
    fullName: string;
    statusLabel: string;
    schoolName: string | null;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hasMounted = useRef(false);
  const [data, setData] = useState({
    fullName: "",
    nationality: "",
    currentResidence: "",
    applicantType: "",
    ageGroup: "",
    educationStatus: "",
    phoneCountry: "",
    phoneNumber: "",
    whatsappCountry: "",
    whatsappNumber: "",
    email: "",
    estimatedBudget: "",
    fundingSource: "",
    accommodationBudgetOk: "",
    englishLevel: "",
    medicalConcern: "",
    currentLicense: "",
    desiredLicense: "PPL",
    schoolChoice: "",
    selectedSchool: "",
    preferredStart: "",
    notes: "",
  });

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function stepErrors(i: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (i === 0) {
      if (!data.fullName.trim()) e.fullName = t.errRequired;
      if (!data.nationality) e.nationality = t.errNationality;
      if (!data.currentResidence) e.currentResidence = t.errResidence;
    }
    if (i === 1) {
      if (!data.applicantType) e.applicantType = t.errChoose;
      if (!data.ageGroup) e.ageGroup = t.errChoose;
      if (!data.educationStatus) e.educationStatus = t.errChoose;
    }
    if (i === 2) {
      if (!validatePhone(data.phoneCountry, data.phoneNumber)) e.phone = t.errPhone;
      if (data.whatsappNumber.trim() && !validatePhone(data.whatsappCountry, data.whatsappNumber)) {
        e.whatsapp = t.errWhatsapp;
      }
      if (!EMAIL_RE.test(data.email.trim())) e.email = t.errEmail;
    }
    if (i === 3) {
      if (!data.estimatedBudget) e.estimatedBudget = t.errChoose;
      if (!data.fundingSource) e.fundingSource = t.errChoose;
      if (!data.accommodationBudgetOk) e.accommodationBudgetOk = t.errChoose;
    }
    if (i === 4) {
      if (!data.englishLevel) e.englishLevel = t.errChoose;
      if (!data.medicalConcern) e.medicalConcern = t.errChoose;
    }
    if (i === 5) {
      if (!data.desiredLicense) e.desiredLicense = t.errLicense;
      if (!schoolSlug) {
        if (!data.schoolChoice) e.schoolChoice = t.errChoose;
        if (data.schoolChoice === "specific" && !data.selectedSchool) e.selectedSchool = t.errChoose;
      }
    }
    return e;
  }

  const currentErrors = stepErrors(step);
  const isStepValid = Object.keys(currentErrors).length === 0;

  async function next() {
    if (!isStepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);

    // Check for a duplicate email right when leaving the contact
    // step — the earliest point we have their email — instead of
    // waiting until final submission and wasting their time on the
    // rest of the form.
    if (step === 2) {
      setCheckingEmail(true);
      try {
        const res = await fetch("/api/check-email", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: data.email, lang }),
        });
        const json = await res.json();
        if (json.exists) {
          setDuplicate({
            referenceCode: json.referenceCode,
            fullName: json.fullName,
            statusLabel: json.statusLabel,
            schoolName: json.schoolName,
          });
          setCheckingEmail(false);
          return;
        }
      } catch {
        // Fail open — a network hiccup on this convenience check
        // should never trap someone on this step.
      }
      setCheckingEmail(false);
    }

    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const progressPct = (step / (STEPS.length - 1)) * 100;
  const StepIcon = STEPS[step].icon;

  const phoneDial = COUNTRIES.find((c) => c.code === data.phoneCountry)?.dialCode;
  const whatsappDial = COUNTRIES.find((c) => c.code === data.whatsappCountry)?.dialCode;
  const formattedPhone = phoneDial ? `+${phoneDial}${data.phoneNumber.replace(/\s/g, "")}` : "";
  const formattedWhatsapp =
    whatsappDial && data.whatsappNumber.trim() ? `+${whatsappDial}${data.whatsappNumber.replace(/\s/g, "")}` : "";

  if (duplicate) {
    const trackHref = duplicate.referenceCode
      ? `/track?ref=${duplicate.referenceCode}&email=${encodeURIComponent(data.email)}&already=1`
      : `/track?email=${encodeURIComponent(data.email)}`;
    return (
      <div className="overflow-hidden rounded-2xl border border-nino-orange/30 bg-nino-orange/5">
        <div className="p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-nino-orange text-white">
            <Check size={20} strokeWidth={3} />
          </div>
          <h2 className="mt-4 font-display text-2xl">{t.duplicateTitle}</h2>
          <p className="mt-2 text-sm text-nino-ink/60">
            {t.duplicateBody}
          </p>
        </div>

        <div className="mx-6 mb-6 overflow-hidden rounded-xl border border-nino-ink bg-nino-ink text-white">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="font-display text-sm">{duplicate.referenceCode || t.yourApplication}</span>
            <PlaneTakeoff size={15} className="text-nino-orange" />
          </div>
          <div className="border-t border-dashed border-white/20 px-5 py-4 text-sm">
            <div className="text-xs text-white/40">{t.captain}</div>
            <div className="mt-0.5 font-medium">{duplicate.fullName}</div>
            {duplicate.schoolName && (
              <>
                <div className="mt-3 text-xs text-white/40">{t.destination}</div>
                <div className="mt-0.5 font-medium">{duplicate.schoolName}</div>
              </>
            )}
            <div className="mt-3 text-xs text-white/40">{t.currentStatus}</div>
            <div className="mt-0.5 flex items-center gap-1.5 font-medium text-nino-orange">
              <CheckCircle2 size={14} />
              {duplicate.statusLabel}
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 text-center">
          <a
            href={trackHref}
            className="inline-flex items-center gap-2 rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
          >
            {t.moreDetails}
          </a>
          <button
            type="button"
            onClick={() => setDuplicate(null)}
            className="mt-4 block w-full text-xs text-nino-ink/40 hover:text-nino-ink/60"
          >
            {t.notMyEmail}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="pb-24">
      <form ref={formRef} action={submitApplication} onKeyDown={(e) => {
        // Defense in depth: since every step's fields stay mounted
        // (just faded/translated off-screen) for reliable form
        // submission, a stray Enter key on ANY of them should never
        // implicitly submit the whole application early.
        if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
          e.preventDefault();
        }
      }}>
      <div className="rounded-3xl border border-nino-line/60 bg-white p-6 shadow-[0_8px_40px_rgba(11,13,15,0.07)] sm:p-8">
      {/* Flight-path progress tracker — icon dots only, no repeated text */}
      <div className="mb-10">
        <div className="relative h-1 rounded-full bg-nino-line">
          <div
            className="absolute inset-y-0 start-0 rounded-full bg-nino-orange/30"
            style={{ width: `${progressPct}%`, transition: `width 500ms ${EASE}` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              insetInlineStart: `${progressPct}%`,
              transform: "translate(50%, -50%)",
              transition: `inset-inline-start 500ms ${EASE}`,
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nino-orange text-white shadow-md shadow-nino-orange/30">
              <Plane size={15} style={{ transform: "rotate(-150deg)" }} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <div
                key={s.key}
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                  active
                    ? "bg-nino-orange text-white"
                    : done
                      ? "bg-nino-orange/20 text-nino-orange"
                      : "bg-nino-line/60 text-nino-ink/30"
                }`}
              >
                <Icon size={12} />
              </div>
            );
          })}
        </div>
      </div>

        <input type="hidden" name="schoolSlug" value={schoolSlug || (data.schoolChoice === "specific" ? data.selectedSchool : "")} />
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="fullName" value={data.fullName} />
        <input type="hidden" name="nationality" value={COUNTRIES.find((c) => c.code === data.nationality)?.name || ""} />
        <input type="hidden" name="currentResidence" value={COUNTRIES.find((c) => c.code === data.currentResidence)?.name || ""} />
        <input type="hidden" name="applicantType" value={data.applicantType} />
        <input type="hidden" name="ageGroup" value={data.ageGroup} />
        <input type="hidden" name="educationStatus" value={data.educationStatus} />
        <input type="hidden" name="phone" value={formattedPhone} />
        <input type="hidden" name="whatsapp" value={formattedWhatsapp} />
        <input type="hidden" name="email" value={data.email} />
        <input type="hidden" name="estimatedBudget" value={data.estimatedBudget} />
        <input type="hidden" name="fundingSource" value={data.fundingSource} />
        <input type="hidden" name="accommodationBudgetOk" value={data.accommodationBudgetOk} />
        <input type="hidden" name="englishLevel" value={data.englishLevel} />
        <input type="hidden" name="medicalConcern" value={data.medicalConcern} />
        <input type="hidden" name="currentLicense" value={data.currentLicense} />
        <input type="hidden" name="desiredLicense" value={data.desiredLicense} />
        <input type="hidden" name="preferredStart" value={data.preferredStart} />
        <input type="hidden" name="notes" value={data.notes} />

        {/* Carousel viewport — isolated to LTR so translateX math is predictable, each panel re-declares RTL/LTR for its content */}
        <div dir="ltr" className="overflow-hidden">
          <div
            className="flex motion-reduce:transition-none"
            style={{ transform: `translateX(-${step * 100}%)`, transition: `transform 500ms ${EASE}` }}
          >
            {/* Step 1: Captain's details */}
            <Panel active={step === 0} lang={lang}>
              <StepHeading icon={STEPS[0].icon} kicker={STEPS[0].kicker} title={STEPS[0].title} />
              <div className="space-y-5">
                <TextInput
                  id="fullNameInput"
                  label={t.fullNameLabel}
                  value={data.fullName}
                  onChange={(v) => set("fullName", v)}
                  error={showErrors ? currentErrors.fullName : undefined}
                />
                <CountrySelect
                  lang={lang}
                  id="nationalityInput"
                  label={t.nationalityLabel}
                  value={data.nationality}
                  onChange={(v) => set("nationality", v)}
                  error={showErrors ? currentErrors.nationality : undefined}
                  restrictTo={PRIORITY_COUNTRY_CODES}
                />
                <CountrySelect
                  lang={lang}
                  id="currentResidenceInput"
                  label={t.residenceLabel}
                  value={data.currentResidence}
                  onChange={(v) => set("currentResidence", v)}
                  error={showErrors ? currentErrors.currentResidence : undefined}
                />
              </div>
            </Panel>

            {/* Step 2: Who's applying, age group, education status */}
            <Panel active={step === 1} lang={lang}>
              <StepHeading icon={STEPS[1].icon} kicker={STEPS[1].kicker} title={STEPS[1].title} />
              <div className="space-y-6">
                <ChoiceGroup
                  label={t.applicantTypeLabel}
                  options={APPLICANT_TYPE_OPTIONS}
                  value={data.applicantType}
                  onChange={(v) => set("applicantType", v)}
                  columns={2}
                  error={showErrors ? currentErrors.applicantType : undefined}
                />
                <ChoiceGroup
                  label={t.ageGroupLabel}
                  options={AGE_GROUP_OPTIONS}
                  value={data.ageGroup}
                  onChange={(v) => set("ageGroup", v)}
                  columns={2}
                  error={showErrors ? currentErrors.ageGroup : undefined}
                />
                <ChoiceGroup
                  label={t.educationStatusLabel}
                  options={EDUCATION_OPTIONS}
                  value={data.educationStatus}
                  onChange={(v) => set("educationStatus", v)}
                  error={showErrors ? currentErrors.educationStatus : undefined}
                />
              </div>
            </Panel>

            {/* Step 3: Control tower / contact */}
            <Panel active={step === 2} lang={lang}>
              <StepHeading icon={STEPS[2].icon} kicker={STEPS[2].kicker} title={STEPS[2].title} />
              <p className="-mt-3 mb-6 text-sm text-nino-ink/60">
                {t.contactSubtitle}
              </p>
              <div className="space-y-5">
                <PhoneField
                  lang={lang}
                  label={t.phoneLabel}
                  required
                  countryCode={data.phoneCountry}
                  onCountryChange={(v) => set("phoneCountry", v)}
                  national={data.phoneNumber}
                  onNationalChange={(v) => set("phoneNumber", v)}
                  error={showErrors ? currentErrors.phone : undefined}
                />
                <PhoneField
                  lang={lang}
                  label={t.whatsappLabel}
                  countryCode={data.whatsappCountry || data.phoneCountry}
                  onCountryChange={(v) => set("whatsappCountry", v)}
                  national={data.whatsappNumber}
                  onNationalChange={(v) => set("whatsappNumber", v)}
                  error={showErrors ? currentErrors.whatsapp : undefined}
                />
                <TextInput
                  id="emailInput"
                  label={t.emailLabel}
                  type="email"
                  value={data.email}
                  onChange={(v) => set("email", v)}
                  dir="ltr"
                  error={showErrors ? currentErrors.email : undefined}
                />
              </div>
            </Panel>

            {/* Step 4: Financial readiness */}
            <Panel active={step === 3} lang={lang}>
              <StepHeading icon={STEPS[3].icon} kicker={STEPS[3].kicker} title={STEPS[3].title} />
              <p className="-mt-3 mb-6 text-sm text-nino-ink/60">
                {t.moneySubtitle}
              </p>
              <div className="space-y-6">
                <ChoiceGroup
                  label={t.budgetLabel}
                  options={BUDGET_OPTIONS.map((b) => ({ value: b, label: b }))}
                  value={data.estimatedBudget}
                  onChange={(v) => set("estimatedBudget", v)}
                  error={showErrors ? currentErrors.estimatedBudget : undefined}
                />
                <ChoiceGroup
                  label={t.fundingLabel}
                  options={FUNDING_OPTIONS}
                  value={data.fundingSource}
                  onChange={(v) => set("fundingSource", v)}
                  error={showErrors ? currentErrors.fundingSource : undefined}
                />
                <ChoiceGroup
                  label={t.accBudgetLabel}
                  options={ACCOMMODATION_BUDGET_OPTIONS}
                  value={data.accommodationBudgetOk}
                  onChange={(v) => set("accommodationBudgetOk", v)}
                  error={showErrors ? currentErrors.accommodationBudgetOk : undefined}
                />
              </div>
            </Panel>

            {/* Step 5: English & readiness */}
            <Panel active={step === 4} lang={lang}>
              <StepHeading icon={STEPS[4].icon} kicker={STEPS[4].kicker} title={STEPS[4].title} />
              <div className="space-y-6">
                <ChoiceGroup
                  label={t.englishLabel}
                  options={ENGLISH_OPTIONS}
                  value={data.englishLevel}
                  onChange={(v) => set("englishLevel", v)}
                  columns={2}
                  error={showErrors ? currentErrors.englishLevel : undefined}
                />
                <div>
                  <ChoiceGroup
                    label={t.medicalLabel}
                    options={MEDICAL_OPTIONS}
                    value={data.medicalConcern}
                    onChange={(v) => set("medicalConcern", v)}
                    error={showErrors ? currentErrors.medicalConcern : undefined}
                  />
                  <p className="mt-2 text-xs text-nino-ink/45">
                    {t.medicalNote}
                  </p>
                </div>
              </div>
            </Panel>

            {/* Step 6: The dream */}
            <Panel active={step === 5} lang={lang}>
              <StepHeading icon={STEPS[5].icon} kicker={STEPS[5].kicker} title={STEPS[5].title} />
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentLicenseSelect" className="block text-sm font-medium">{t.currentLicenseLabel}</label>
                  <select
                    id="currentLicenseSelect"
                    value={data.currentLicense}
                    onChange={(e) => set("currentLicense", e.target.value)}
                    className={`mt-1.5 w-full ${inputClass()}`}
                  >
                    <option value="">{t.currentLicenseNone}</option>
                    {LICENSE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">{t.desiredLicenseLabel}</label>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                    {LICENSE_OPTIONS.map((o) => {
                      const Icon = o.icon;
                      const active = data.desiredLicense === o.value;
                      return (
                        <button
                          type="button"
                          key={o.value}
                          onClick={() => set("desiredLicense", o.value)}
                          className={`relative flex items-center gap-3 rounded-xl border p-3.5 text-start transition-all duration-200 active:scale-[0.98] ${
                            active
                              ? "border-nino-orange bg-nino-orange/5 shadow-sm shadow-nino-orange/10"
                              : "border-nino-line/70 bg-nino-cream/40 hover:border-nino-ink/25 hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          {active && (
                            <span className="absolute -top-1.5 -end-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-nino-orange text-white">
                              <Check size={10} strokeWidth={3} />
                            </span>
                          )}
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              active ? "bg-nino-orange text-white" : "bg-nino-cream text-nino-ink/50"
                            }`}
                          >
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{o.label}</div>
                            <div className="text-xs text-nino-ink/50">{o.hint}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {!schoolSlug && (
                  <>
                    <ChoiceGroup
                      label={t.schoolChoiceLabel}
                      options={[
                        { value: "specific", label: t.schoolChoiceSpecific },
                        { value: "help", label: t.schoolChoiceHelp },
                      ]}
                      value={data.schoolChoice}
                      onChange={(v) => set("schoolChoice", v)}
                      columns={2}
                      error={showErrors ? currentErrors.schoolChoice : undefined}
                    />
                    {data.schoolChoice === "specific" && (
                      <div>
                        <label htmlFor="selectedSchoolInput" className="block text-sm font-medium">
                          {t.selectedSchoolLabel}
                        </label>
                        <select
                          id="selectedSchoolInput"
                          value={data.selectedSchool}
                          onChange={(e) => set("selectedSchool", e.target.value)}
                          className={`mt-1.5 w-full ${inputClass(!!(showErrors && currentErrors.selectedSchool))}`}
                        >
                          <option value="">{t.selectedSchoolPlaceholder}</option>
                          {schools.map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.nameAr}
                            </option>
                          ))}
                        </select>
                        {showErrors && currentErrors.selectedSchool && (
                          <p className="mt-1 text-xs text-red-500">{currentErrors.selectedSchool}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
                <TextInput id="preferredStart" label={t.preferredStartLabel} placeholder={t.preferredStartPlaceholder} value={data.preferredStart} onChange={(v) => set("preferredStart", v)} />
              </div>
            </Panel>

            {/* Step 7: Review (boarding pass) */}
            <Panel active={step === 6} lang={lang}>
              <StepHeading icon={STEPS[6].icon} kicker={STEPS[6].kicker} title={STEPS[6].title} />
              <div>
                <label htmlFor="notes" className="block text-sm font-medium">{t.notesLabel}</label>
                <textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  className={`mt-1.5 w-full resize-none ${inputClass()}`}
                />
              </div>

              <BoardingPass
                fullName={data.fullName}
                nationality={
                  (() => {
                    const c = COUNTRIES.find((c) => c.code === data.nationality);
                    return c ? (lang === "ar" ? c.name : c.nameEn) : "";
                  })()
                }
                desiredLicense={data.desiredLicense}
                preferredStart={data.preferredStart}
                schoolName={schoolName}
                licenseOptions={LICENSE_OPTIONS}
                t={t}
              />
            </Panel>
          </div>
        </div>
      </div>

        {/* Sticky navigation — always reachable, never buried at the bottom of a long step */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-nino-line/70 bg-white/90 px-6 py-4 shadow-[0_-8px_30px_rgba(11,13,15,0.06)] backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-1.5 rounded-full border border-nino-ink/20 px-5 py-3 text-sm font-medium text-nino-ink transition-transform hover:border-nino-ink active:scale-95"
              >
                <ChevronRight size={15} />
                {t.back}
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-nino-ink/40">
                <StepIcon size={14} />
                {step + 1} / {STEPS.length}
              </span>
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={checkingEmail}
                className="flex items-center gap-1.5 rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:bg-nino-orange active:scale-95 disabled:opacity-60"
              >
                {checkingEmail ? t.nextLoading : t.next}
                <ChevronLeft size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                className="flex items-center gap-2 rounded-full bg-nino-orange px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-nino-orange/30 transition-transform hover:bg-nino-ink active:scale-95"
              >
                {t.launch}
                <PlaneTakeoff size={16} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function Panel({ active, lang, children }: { active: boolean; lang: Lang; children: React.ReactNode }) {
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="w-full shrink-0 px-1"
      style={{ opacity: active ? 1 : 0.35, transition: `opacity 500ms ${EASE}` }}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function StepHeading({
  icon: Icon,
  kicker,
  title,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
        <Icon size={18} />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">{kicker}</p>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
    </div>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  dir,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className={`mt-1.5 w-full ${inputClass(!!error)}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  columns = 1,
  error,
  labelDir,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 1 | 2;
  error?: string;
  labelDir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <div className={`mt-2 grid gap-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange(o.value)}
              dir={labelDir}
              className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-start text-sm transition-all duration-200 active:scale-[0.98] ${
                active
                  ? "border-nino-orange bg-nino-orange/5 font-medium text-nino-ink shadow-sm shadow-nino-orange/10"
                  : error
                    ? "border-red-300 bg-white text-nino-ink/70"
                    : "border-nino-line/70 bg-nino-cream/40 text-nino-ink/70 hover:border-nino-ink/25 hover:bg-white hover:shadow-sm"
              }`}
            >
              <span>{o.label}</span>
              {active && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-nino-orange text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function BoardingPass({
  fullName,
  nationality,
  desiredLicense,
  preferredStart,
  schoolName,
  licenseOptions,
  t,
}: {
  fullName: string;
  nationality: string;
  desiredLicense: string;
  preferredStart: string;
  schoolName?: string;
  licenseOptions: { value: string; label: string }[];
  t: { [K in keyof (typeof dictionaries)["ar"]["apply"]]: string };
}) {
  const license = licenseOptions.find((o) => o.value === desiredLicense);
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-nino-ink bg-nino-ink text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-display text-sm">{t.boardingPassTitle}</span>
        <PlaneTakeoff size={16} className="text-nino-orange" />
      </div>
      <div className="grid grid-cols-2 gap-5 border-t border-dashed border-white/20 px-6 py-5 text-sm">
        <div>
          <div className="text-xs text-white/40">{t.captain}</div>
          <div className="mt-1 font-medium">{fullName || "—"}</div>
        </div>
        <div>
          <div className="text-xs text-white/40">{t.from}</div>
          <div className="mt-1 font-medium">{nationality || "—"}</div>
        </div>
        <div>
          <div className="text-xs text-white/40">{t.destination}</div>
          <div className="mt-1 font-medium">{schoolName || t.defaultDestination}</div>
        </div>
        <div>
          <div className="text-xs text-white/40">{t.license}</div>
          <div className="mt-1 font-medium">{license?.label}</div>
        </div>
        {preferredStart && (
          <div className="col-span-2">
            <div className="text-xs text-white/40">{t.preferredDate}</div>
            <div className="mt-1 font-medium">{preferredStart}</div>
          </div>
        )}
      </div>
      <div className="border-t border-dashed border-white/20 px-6 py-3 text-center text-xs text-white/40">
        {t.refNote}
      </div>
    </div>
  );
}
