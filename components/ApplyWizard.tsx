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
} from "lucide-react";
import { submitApplication } from "@/lib/actions";

const LICENSE_OPTIONS = [
  { value: "PPL", label: "رخصة طيار خاص", hint: "أول خطوة نحو السماء", icon: Plane },
  { value: "CPL", label: "رخصة طيار تجاري", hint: "للعمل كطيار محترف", icon: Briefcase },
  { value: "IR", label: "تصنيف آلي", hint: "الطيران في كل الأجواء", icon: CloudFog },
  { value: "ME", label: "متعدد المحركات", hint: "طائرات بمحركين", icon: Layers3 },
  { value: "ATPL_THEORY", label: "نظري رخصة النقل الجوي", hint: "أعلى مستوى نظري", icon: GraduationCap },
];

const BUDGET_OPTIONS = [
  "أقل من 300,000 راند",
  "300,000 – 500,000 راند",
  "500,000 – 800,000 راند",
  "أكثر من 800,000 راند",
  "غير متأكد بعد",
];

const FUNDING_OPTIONS = [
  { value: "personal_savings", label: "مدخرات شخصية" },
  { value: "family_support", label: "دعم عائلي" },
  { value: "loan", label: "قرض بنكي" },
  { value: "undecided", label: "لم أحدد بعد" },
];

const ACCOMMODATION_BUDGET_OPTIONS = [
  { value: "yes", label: "نعم، ميزانيتي تشمل السكن" },
  { value: "no", label: "لا، أحتاج تقدير سكن منفصل" },
  { value: "unsure", label: "غير متأكد" },
];

const ENGLISH_OPTIONS = [
  { value: "beginner", label: "مبتدئ" },
  { value: "intermediate", label: "متوسط" },
  { value: "good", label: "جيد" },
  { value: "fluent", label: "بطلاقة" },
];

const MEDICAL_OPTIONS = [
  { value: "no", label: "لا يوجد" },
  { value: "unsure", label: "غير متأكد" },
  { value: "yes", label: "نعم، لدي استفسار" },
];

const STEPS = [
  { key: "who", title: "بيانات القبطان", kicker: "بداية القصة", icon: IdCard },
  { key: "contact", title: "برج المراقبة", kicker: "خطوة أقرب", icon: TowerControl },
  { key: "money", title: "الجاهزية المالية", kicker: "لنكن واقعيين", icon: Wallet },
  { key: "readiness", title: "اللغة والجاهزية", kicker: "التفاصيل المهمة", icon: Languages },
  { key: "dream", title: "صف حلمك", kicker: "أوشكت على الوصول", icon: Plane },
  { key: "review", title: "قبل الإقلاع", kicker: "آخر خطوة", icon: Ticket },
];

const EASE = "cubic-bezier(0.65,0,0.35,1)";

export function ApplyWizard({
  schoolSlug,
  schoolName,
}: {
  schoolSlug: string;
  schoolName?: string;
}) {
  const [step, setStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);
  const [data, setData] = useState({
    fullName: "",
    nationality: "",
    currentResidence: "",
    phone: "",
    whatsapp: "",
    email: "",
    estimatedBudget: "",
    fundingSource: "",
    accommodationBudgetOk: "",
    englishLevel: "",
    medicalConcern: "",
    currentLicense: "",
    desiredLicense: "PPL",
    preferredStart: "",
    notes: "",
  });

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function stepValid(i: number) {
    if (i === 0) return data.fullName.trim() && data.nationality.trim() && data.currentResidence.trim();
    if (i === 1) return data.phone.trim() && data.email.trim();
    if (i === 2) return data.estimatedBudget && data.fundingSource && data.accommodationBudgetOk;
    if (i === 3) return data.englishLevel && data.medicalConcern;
    if (i === 4) return data.desiredLicense;
    return true;
  }

  function next() {
    if (!stepValid(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
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

  return (
    <div ref={rootRef} className="pb-24">
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

      <form action={submitApplication}>
        <input type="hidden" name="schoolSlug" value={schoolSlug} />
        <input type="hidden" name="fullName" value={data.fullName} />
        <input type="hidden" name="nationality" value={data.nationality} />
        <input type="hidden" name="currentResidence" value={data.currentResidence} />
        <input type="hidden" name="phone" value={data.phone} />
        <input type="hidden" name="whatsapp" value={data.whatsapp} />
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

        {/* Carousel viewport — isolated to LTR so translateX math is predictable, each panel re-declares RTL for its content */}
        <div dir="ltr" className="overflow-hidden">
          <div
            className="flex motion-reduce:transition-none"
            style={{ transform: `translateX(-${step * 100}%)`, transition: `transform 500ms ${EASE}` }}
          >
            {/* Step 1: Captain's details */}
            <Panel active={step === 0}>
              <StepHeading icon={STEPS[0].icon} kicker={STEPS[0].kicker} title={STEPS[0].title} />
              <div className="space-y-5">
                <TextInput id="fullName" label="اسم القبطان الكامل" value={data.fullName} onChange={(v) => set("fullName", v)} />
                <TextInput id="nationality" label="الجنسية" value={data.nationality} onChange={(v) => set("nationality", v)} />
                <TextInput
                  id="currentResidence"
                  label="أين تقيم حاليًا؟ (المدينة والدولة)"
                  value={data.currentResidence}
                  onChange={(v) => set("currentResidence", v)}
                  placeholder="مثال: جدة، السعودية"
                />
              </div>
            </Panel>

            {/* Step 2: Control tower / contact */}
            <Panel active={step === 1}>
              <StepHeading icon={STEPS[1].icon} kicker={STEPS[1].kicker} title={STEPS[1].title} />
              <p className="-mt-3 mb-6 text-sm text-nino-ink/60">
                نحتاج طريقة نوصلك فيها بالأخبار الجيدة.
              </p>
              <div className="space-y-5">
                <TextInput id="phone" label="رقم الهاتف" type="tel" value={data.phone} onChange={(v) => set("phone", v)} dir="ltr" />
                <TextInput id="whatsapp" label="رقم الواتساب (اختياري)" type="tel" value={data.whatsapp} onChange={(v) => set("whatsapp", v)} dir="ltr" />
                <TextInput id="email" label="البريد الإلكتروني" type="email" value={data.email} onChange={(v) => set("email", v)} dir="ltr" />
              </div>
            </Panel>

            {/* Step 3: Financial readiness */}
            <Panel active={step === 2}>
              <StepHeading icon={STEPS[2].icon} kicker={STEPS[2].kicker} title={STEPS[2].title} />
              <p className="-mt-3 mb-6 text-sm text-nino-ink/60">
                هذا يساعدنا نرشح لك مدارس تناسب وضعك الحقيقي، بدون مفاجآت لاحقًا.
              </p>
              <div className="space-y-6">
                <ChoiceGroup
                  label="ميزانيتك الإجمالية التقديرية"
                  options={BUDGET_OPTIONS.map((b) => ({ value: b, label: b }))}
                  value={data.estimatedBudget}
                  onChange={(v) => set("estimatedBudget", v)}
                />
                <ChoiceGroup
                  label="مصدر التمويل"
                  options={FUNDING_OPTIONS}
                  value={data.fundingSource}
                  onChange={(v) => set("fundingSource", v)}
                />
                <ChoiceGroup
                  label="هل ميزانيتك تشمل تكاليف السكن أيضًا؟"
                  options={ACCOMMODATION_BUDGET_OPTIONS}
                  value={data.accommodationBudgetOk}
                  onChange={(v) => set("accommodationBudgetOk", v)}
                />
              </div>
            </Panel>

            {/* Step 4: English & readiness */}
            <Panel active={step === 3}>
              <StepHeading icon={STEPS[3].icon} kicker={STEPS[3].kicker} title={STEPS[3].title} />
              <div className="space-y-6">
                <ChoiceGroup
                  label="مستوى لغتك الإنجليزية"
                  options={ENGLISH_OPTIONS}
                  value={data.englishLevel}
                  onChange={(v) => set("englishLevel", v)}
                  columns={2}
                />
                <div>
                  <ChoiceGroup
                    label="هل تعتقد أن لديك ما قد يؤثر على شهادتك الطبية للطيران؟"
                    options={MEDICAL_OPTIONS}
                    value={data.medicalConcern}
                    onChange={(v) => set("medicalConcern", v)}
                  />
                  <p className="mt-2 text-xs text-nino-ink/45">
                    لسنا بحاجة لتفاصيل الآن — فقط لنعرف إن كان يجب مناقشة هذا مبكرًا.
                  </p>
                </div>
              </div>
            </Panel>

            {/* Step 5: The dream */}
            <Panel active={step === 4}>
              <StepHeading icon={STEPS[4].icon} kicker={STEPS[4].kicker} title={STEPS[4].title} />
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentLicenseSelect" className="block text-sm font-medium">رخصتك الحالية (إن وجدت)</label>
                  <select
                    id="currentLicenseSelect"
                    value={data.currentLicense}
                    onChange={(e) => set("currentLicense", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-3 text-sm"
                  >
                    <option value="">لا يوجد بعد</option>
                    {LICENSE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">الرخصة التي تطمح لها</label>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                    {LICENSE_OPTIONS.map((o) => {
                      const Icon = o.icon;
                      const active = data.desiredLicense === o.value;
                      return (
                        <button
                          type="button"
                          key={o.value}
                          onClick={() => set("desiredLicense", o.value)}
                          className={`flex items-center gap-3 rounded-xl border p-3.5 text-start transition-colors ${
                            active
                              ? "border-nino-orange bg-nino-orange/5"
                              : "border-nino-line bg-nino-white hover:border-nino-ink/30"
                          }`}
                        >
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
                <TextInput id="preferredStart" label="الموعد المفضل للبدء" placeholder="مثال: يناير 2027" value={data.preferredStart} onChange={(v) => set("preferredStart", v)} />
              </div>
            </Panel>

            {/* Step 6: Review (boarding pass) */}
            <Panel active={step === 5}>
              <StepHeading icon={STEPS[5].icon} kicker={STEPS[5].kicker} title={STEPS[5].title} />
              <div>
                <label htmlFor="notes" className="block text-sm font-medium">ملاحظات إضافية (اختياري)</label>
                <textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-2.5 text-sm"
                />
              </div>

              <BoardingPass data={data} schoolName={schoolName} />
            </Panel>
          </div>
        </div>

        {/* Sticky navigation — always reachable, never buried at the bottom of a long step */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-nino-line bg-nino-cream/95 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-1.5 rounded-full border border-nino-ink/20 px-5 py-3 text-sm font-medium text-nino-ink hover:border-nino-ink"
              >
                <ChevronRight size={15} />
                رجوع
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
                disabled={!stepValid(step)}
                className="flex items-center gap-1.5 rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange disabled:opacity-30"
              >
                التالي
                <ChevronLeft size={15} />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-nino-orange px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-nino-orange/30 hover:bg-nino-ink"
              >
                أطلق طلبي
                <PlaneTakeoff size={16} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function Panel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
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
        className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-3 text-sm"
      />
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  columns = 1,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 1 | 2;
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
              className={`rounded-lg border px-3.5 py-2.5 text-start text-sm transition-colors ${
                active
                  ? "border-nino-orange bg-nino-orange/5 font-medium text-nino-ink"
                  : "border-nino-line bg-nino-white text-nino-ink/70 hover:border-nino-ink/30"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BoardingPass({
  data,
  schoolName,
}: {
  data: { fullName: string; nationality: string; desiredLicense: string; preferredStart: string };
  schoolName?: string;
}) {
  const license = LICENSE_OPTIONS.find((o) => o.value === data.desiredLicense);
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-nino-ink bg-nino-ink text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-display text-sm">بطاقة صعود نينو إديوكيشن</span>
        <PlaneTakeoff size={16} className="text-nino-orange" />
      </div>
      <div className="grid grid-cols-2 gap-5 border-t border-dashed border-white/20 px-6 py-5 text-sm">
        <div>
          <div className="text-xs text-white/40">القبطان</div>
          <div className="mt-1 font-medium">{data.fullName || "—"}</div>
        </div>
        <div>
          <div className="text-xs text-white/40">من</div>
          <div className="mt-1 font-medium">{data.nationality || "—"}</div>
        </div>
        <div>
          <div className="text-xs text-white/40">الوجهة</div>
          <div className="mt-1 font-medium">{schoolName || "قمرة القيادة، جنوب أفريقيا"}</div>
        </div>
        <div>
          <div className="text-xs text-white/40">الرخصة</div>
          <div className="mt-1 font-medium">{license?.label}</div>
        </div>
        {data.preferredStart && (
          <div className="col-span-2">
            <div className="text-xs text-white/40">موعد الإقلاع المفضل</div>
            <div className="mt-1 font-medium">{data.preferredStart}</div>
          </div>
        )}
      </div>
      <div className="border-t border-dashed border-white/20 px-6 py-3 text-center text-xs text-white/40">
        رقم رحلتك سيصدر فور الإقلاع — اضغط &quot;أطلق طلبي&quot; للتأكيد
      </div>
    </div>
  );
}
