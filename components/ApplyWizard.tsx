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

const STEPS = [
  { key: "who", title: "بيانات القبطان", kicker: "بداية القصة", icon: IdCard },
  { key: "contact", title: "برج المراقبة", kicker: "خطوة أقرب", icon: TowerControl },
  { key: "dream", title: "صف حلمك", kicker: "أوشكت على الوصول", icon: Plane },
  { key: "review", title: "قبل الإقلاع", kicker: "آخر خطوة", icon: Ticket },
];

export function ApplyWizard({
  schoolSlug,
  schoolName,
}: {
  schoolSlug: string;
  schoolName?: string;
}) {
  const [step, setStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState({
    fullName: "",
    nationality: "",
    phone: "",
    whatsapp: "",
    email: "",
    currentLicense: "",
    desiredLicense: "PPL",
    estimatedBudget: "",
    preferredStart: "",
    notes: "",
  });

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function stepValid(i: number) {
    if (i === 0) return data.fullName.trim() && data.nationality.trim();
    if (i === 1) return data.phone.trim() && data.email.trim();
    if (i === 2) return data.desiredLicense;
    return true;
  }

  function next() {
    if (!stepValid(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const hasMounted = useRef(false);
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
      {/* Flight-path progress tracker */}
      <div className="mb-12">
        <div className="relative h-1 rounded-full bg-nino-line">
          <div
            className="absolute inset-y-0 start-0 rounded-full bg-nino-orange/30 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              insetInlineStart: `${progressPct}%`,
              transform: "translate(50%, -50%)",
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nino-orange text-white shadow-md shadow-nino-orange/30">
              <Plane size={15} style={{ transform: "rotate(-150deg)" }} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-xs">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`${i <= step ? "text-nino-orange" : "text-nino-ink/35"} ${
                i === step ? "font-medium" : ""
              }`}
            >
              {s.title}
            </span>
          ))}
        </div>
      </div>

      <form action={submitApplication}>
        <input type="hidden" name="schoolSlug" value={schoolSlug} />
        <input type="hidden" name="fullName" value={data.fullName} />
        <input type="hidden" name="nationality" value={data.nationality} />
        <input type="hidden" name="phone" value={data.phone} />
        <input type="hidden" name="whatsapp" value={data.whatsapp} />
        <input type="hidden" name="email" value={data.email} />
        <input type="hidden" name="currentLicense" value={data.currentLicense} />
        <input type="hidden" name="desiredLicense" value={data.desiredLicense} />
        <input type="hidden" name="estimatedBudget" value={data.estimatedBudget} />
        <input type="hidden" name="preferredStart" value={data.preferredStart} />
        <input type="hidden" name="notes" value={data.notes} />

        {/* Carousel viewport — isolated to LTR so translateX math is predictable, each panel re-declares RTL for its content */}
        <div dir="ltr" className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* Step 1: Captain's details */}
            <div dir="rtl" className="w-full shrink-0 px-1">
              <StepHeading icon={STEPS[0].icon} kicker={STEPS[0].kicker} title={STEPS[0].title} />
              <div className="space-y-5">
                <TextInput id="fullName" label="اسم القبطان الكامل" value={data.fullName} onChange={(v) => set("fullName", v)} />
                <TextInput id="nationality" label="بلد الانطلاق (الجنسية)" value={data.nationality} onChange={(v) => set("nationality", v)} />
                <div>
                  <label htmlFor="currentLicense" className="block text-sm font-medium">رخصتك الحالية (إن وجدت)</label>
                  <select
                    id="currentLicense"
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
              </div>
            </div>

            {/* Step 2: Control tower / contact */}
            <div dir="rtl" className="w-full shrink-0 px-1">
              <StepHeading icon={STEPS[1].icon} kicker={STEPS[1].kicker} title={STEPS[1].title} />
              <p className="-mt-3 mb-6 text-sm text-nino-ink/60">
                نحتاج طريقة نوصلك فيها بالأخبار الجيدة.
              </p>
              <div className="space-y-5">
                <TextInput id="phone" label="رقم الهاتف" type="tel" value={data.phone} onChange={(v) => set("phone", v)} dir="ltr" autoFocus={step === 1} />
                <TextInput id="whatsapp" label="رقم الواتساب (اختياري)" type="tel" value={data.whatsapp} onChange={(v) => set("whatsapp", v)} dir="ltr" />
                <TextInput id="email" label="البريد الإلكتروني" type="email" value={data.email} onChange={(v) => set("email", v)} dir="ltr" />
              </div>
            </div>

            {/* Step 3: Dream */}
            <div dir="rtl" className="w-full shrink-0 px-1">
              <StepHeading icon={STEPS[2].icon} kicker={STEPS[2].kicker} title={STEPS[2].title} />
              <div className="space-y-6">
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
                          className={`flex items-center gap-3 rounded-xl border p-3.5 text-start transition ${
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
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextInput id="estimatedBudget" label="الميزانية التقديرية (راند)" value={data.estimatedBudget} onChange={(v) => set("estimatedBudget", v)} />
                  <TextInput id="preferredStart" label="الموعد المفضل للبدء" placeholder="مثال: يناير 2027" value={data.preferredStart} onChange={(v) => set("preferredStart", v)} />
                </div>
              </div>
            </div>

            {/* Step 4: Review (boarding pass) */}
            <div dir="rtl" className="w-full shrink-0 px-1">
              <StepHeading icon={STEPS[3].icon} kicker={STEPS[3].kicker} title={STEPS[3].title} />
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
            </div>
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
  autoFocus,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  autoFocus?: boolean;
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
        autoFocus={autoFocus}
        className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-white px-3 py-3 text-sm"
      />
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
