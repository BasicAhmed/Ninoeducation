"use client";

import { useMemo, useState } from "react";

const LICENSE_BASE_ZAR: Record<string, number> = {
  PPL: 220000,
  CPL: 550000,
  CPL_IR: 680000,
  ATPL_INTEGRATED: 780000,
};

const LICENSE_LABELS: Record<string, string> = {
  PPL: "رخصة طيار خاص (PPL)",
  CPL: "رخصة طيار تجاري (CPL)",
  CPL_IR: "تجاري + تصنيف آلي (CPL + IR)",
  ATPL_INTEGRATED: "برنامج متكامل حتى ATPL نظري",
};

function formatZar(n: number) {
  return new Intl.NumberFormat("en-ZA").format(Math.round(n));
}

export function CostCalculator() {
  const [license, setLicense] = useState("CPL_IR");
  const [months, setMonths] = useState(14);
  const [monthlyAccommodation, setMonthlyAccommodation] = useState(6000);
  const [monthlyLiving, setMonthlyLiving] = useState(4500);
  const [extras, setExtras] = useState(35000); // visa, medical, admin, materials

  const training = LICENSE_BASE_ZAR[license];
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
          <label className="block text-sm font-medium">برنامج التدريب</label>
          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          >
            {Object.entries(LICENSE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            مدة الإقامة المتوقعة (بالأشهر): {months}
          </label>
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
            السكن الشهري (راند): {formatZar(monthlyAccommodation)}
          </label>
          <input
            type="range"
            min={2500}
            max={12000}
            step={500}
            value={monthlyAccommodation}
            onChange={(e) => setMonthlyAccommodation(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            المصاريف المعيشية الشهرية (راند): {formatZar(monthlyLiving)}
          </label>
          <input
            type="range"
            min={2000}
            max={9000}
            step={500}
            value={monthlyLiving}
            onChange={(e) => setMonthlyLiving(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            تأشيرة، فحص طبي، مواد دراسية (راند): {formatZar(extras)}
          </label>
          <input
            type="range"
            min={10000}
            max={70000}
            step={2500}
            value={extras}
            onChange={(e) => setExtras(Number(e.target.value))}
            className="mt-2 w-full accent-orange-600"
          />
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-nino-line bg-nino-ink p-6 text-white">
        <h3 className="font-display text-xl">الميزانية التقديرية</h3>
        <dl className="mt-5 space-y-3 text-sm text-white/70">
          <Row label="تكلفة التدريب" value={training} />
          <Row label="السكن" value={accommodationTotal} />
          <Row label="المعيشة" value={livingTotal} />
          <Row label="مصاريف أخرى" value={extras} />
        </dl>
        <div className="mt-5 border-t border-white/15 pt-5" dir="ltr">
          <div className="text-end text-xs text-white/50">
            الإجمالي التقديري
          </div>
          <div className="text-end font-display text-3xl text-nino-orange">
            R{formatZar(total)}
          </div>
        </div>
        <p className="mt-4 text-xs text-white/40">
          هذه الأرقام تقديرية لأغراض التخطيط فقط، وتختلف باختلاف المدرسة
          والمدينة. تواصل مع نينو إديوكيشن للحصول على تقدير دقيق حسب المدرسة
          المختارة.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span dir="ltr">R{formatZar(value)}</span>
    </div>
  );
}
