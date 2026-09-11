"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n/dictionaries";

const LICENSE_BASE_USD: Record<string, number> = {
  PPL: 12000,
  CPL: 30000,
  CPL_IR: 37000,
  ATPL_INTEGRATED: 42000,
};

const COPY = {
  ar: {
    licenseLabels: {
      PPL: "رخصة طيار خاص (PPL)",
      CPL: "رخصة طيار تجاري (CPL)",
      CPL_IR: "تجاري + تصنيف آلي (CPL + IR)",
      ATPL_INTEGRATED: "برنامج متكامل حتى ATPL نظري",
    } as Record<string, string>,
    programLabel: "برنامج التدريب",
    durationLabel: (m: number) => `مدة الإقامة المتوقعة (بالأشهر): ${m}`,
    accommodationLabel: (v: string) => `السكن الشهري (دولار): $${v}`,
    livingLabel: (v: string) => `المصاريف المعيشية الشهرية (دولار): $${v}`,
    extrasLabel: (v: string) => `تأشيرة، فحص طبي، مواد دراسية (دولار): $${v}`,
    estimatedBudget: "الميزانية التقديرية",
    trainingCost: "تكلفة التدريب",
    accommodation: "السكن",
    living: "المعيشة",
    otherExpenses: "مصاريف أخرى",
    total: "الإجمالي التقديري",
    disclaimer:
      "هذه الأرقام تقديرية بالدولار الأمريكي لأغراض التخطيط فقط، وتُدفع فعليًا بالراند الجنوب أفريقي. تختلف باختلاف المدرسة والمدينة — تواصل مع نينو إديوكيشن للحصول على تقدير دقيق حسب المدرسة المختارة.",
  },
  en: {
    licenseLabels: {
      PPL: "Private Pilot License (PPL)",
      CPL: "Commercial Pilot License (CPL)",
      CPL_IR: "Commercial + Instrument Rating (CPL + IR)",
      ATPL_INTEGRATED: "Integrated Program Through ATPL Theory",
    } as Record<string, string>,
    programLabel: "Training Program",
    durationLabel: (m: number) => `Expected Duration of Stay (Months): ${m}`,
    accommodationLabel: (v: string) => `Monthly Housing (USD): $${v}`,
    livingLabel: (v: string) => `Monthly Living Expenses (USD): $${v}`,
    extrasLabel: (v: string) => `Visa, Medical, Study Materials (USD): $${v}`,
    estimatedBudget: "Estimated Budget",
    trainingCost: "Training Cost",
    accommodation: "Housing",
    living: "Living Expenses",
    otherExpenses: "Other Expenses",
    total: "Estimated Total",
    disclaimer:
      "These figures are estimates in US dollars for planning purposes only, and are actually paid in South African Rand. They vary by school and city — contact Nino Education for an accurate estimate based on your chosen school.",
  },
};

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

export function CostCalculator({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [license, setLicense] = useState("CPL_IR");
  const [months, setMonths] = useState(14);
  const [monthlyAccommodation, setMonthlyAccommodation] = useState(330);
  const [monthlyLiving, setMonthlyLiving] = useState(250);
  const [extras, setExtras] = useState(1900); // visa, medical, admin, materials

  const training = LICENSE_BASE_USD[license];
  const accommodationTotal = monthlyAccommodation * months;
  const livingTotal = monthlyLiving * months;
  const total = useMemo(
    () => training + accommodationTotal + livingTotal + extras,
    [training, accommodationTotal, livingTotal, extras]
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6 rounded-2xl border border-nino-line bg-nino-white p-6">
        <div>
          <label className="block text-sm font-medium">{t.programLabel}</label>
          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          >
            {Object.entries(t.licenseLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">{t.durationLabel(months)}</label>
          <input
            type="range"
            min={4}
            max={22}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            {t.accommodationLabel(formatUsd(monthlyAccommodation))}
          </label>
          <input
            type="range"
            min={140}
            max={650}
            step={10}
            value={monthlyAccommodation}
            onChange={(e) => setMonthlyAccommodation(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{t.livingLabel(formatUsd(monthlyLiving))}</label>
          <input
            type="range"
            min={110}
            max={490}
            step={10}
            value={monthlyLiving}
            onChange={(e) => setMonthlyLiving(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{t.extrasLabel(formatUsd(extras))}</label>
          <input
            type="range"
            min={550}
            max={3800}
            step={100}
            value={extras}
            onChange={(e) => setExtras(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>
      </div>

      <div className="h-fit rounded-2xl border-2 border-nino-orange bg-nino-cream p-6">
        <h3 className="font-display text-xl text-nino-ink">{t.estimatedBudget}</h3>
        <dl className="mt-5 space-y-3 text-sm text-nino-ink/70">
          <Row label={t.trainingCost} value={training} />
          <Row label={t.accommodation} value={accommodationTotal} />
          <Row label={t.living} value={livingTotal} />
          <Row label={t.otherExpenses} value={extras} />
        </dl>
        <div className="mt-5 border-t border-nino-line pt-5" dir="ltr">
          <div className="text-end text-xs text-nino-ink/50">{t.total}</div>
          <div className="text-end font-display text-3xl text-nino-orange">${formatUsd(total)}</div>
        </div>
        <p className="mt-4 text-xs text-nino-ink/50">{t.disclaimer}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span dir="ltr">${formatUsd(value)}</span>
    </div>
  );
}
