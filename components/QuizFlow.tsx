"use client";

import { useState } from "react";
import { SchoolCard } from "@/components/SchoolCard";

type School = {
  id: string;
  slug: string;
  nameAr: string;
  city: string;
  province: string;
  shortDescriptionAr: string;
  licenses: string;
  priceMinZar: number;
  priceMaxZar: number;
  rating: number;
  hasAccommodation: boolean;
  trainingType: string;
};

const GOALS = [
  { key: "PPL", label: "الحصول على رخصة طيار خاص فقط" },
  { key: "CPL", label: "أن أصبح طيارًا محترفًا (تجاري)" },
  { key: "ATPL_THEORY", label: "مسار كامل نحو شركات الطيران" },
];

const BUDGETS = [
  { key: 250000, label: "أقل من $13,500" },
  { key: 450000, label: "$13,500 – $24,000" },
  { key: 700000, label: "$24,000 – $38,000" },
  { key: 999999999, label: "أكثر من $38,000" },
];

export function QuizFlow({ schools }: { schools: School[] }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [needsAccommodation, setNeedsAccommodation] = useState<boolean | null>(
    null
  );

  const done = step === 3;

  const matches = done
    ? schools
        .filter((s) => (goal ? s.licenses.split(",").includes(goal) : true))
        .filter((s) => (budget ? s.priceMinZar <= budget : true))
        .filter((s) => (needsAccommodation ? s.hasAccommodation : true))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
    : [];

  if (done) {
    return (
      <div>
        <h2 className="font-display text-2xl">أفضل المدارس المناسبة لك</h2>
        {matches.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-nino-line bg-nino-white p-8 text-nino-ink/60">
            لم نجد تطابقًا دقيقًا بهذه المعايير. جرّب توسيع الميزانية أو تصفح
            كل المدارس مباشرة.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {matches.map((s) => (
              <SchoolCard key={s.id} school={s} />
            ))}
          </div>
        )}
        <button
          onClick={() => setStep(0)}
          className="mt-8 text-sm font-medium text-nino-orange hover:underline"
        >
          إعادة الإجابة
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-nino-line bg-nino-white p-8">
      <div className="mb-6 text-xs text-nino-ink/40">
        السؤال {step + 1} من 3
      </div>

      {step === 0 && (
        <Question
          title="ما هدفك من التدريب؟"
          options={GOALS}
          onSelect={(v) => {
            setGoal(v as string);
            setStep(1);
          }}
        />
      )}

      {step === 1 && (
        <Question
          title="ما ميزانيتك التقريبية؟"
          options={BUDGETS.map((b) => ({ key: String(b.key), label: b.label }))}
          onSelect={(v) => {
            setBudget(Number(v));
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Question
          title="هل تحتاج إلى سكن توفره المدرسة؟"
          options={[
            { key: "yes", label: "نعم، أفضّل أن يكون السكن متوفرًا" },
            { key: "no", label: "لا، سأرتب سكني بنفسي" },
          ]}
          onSelect={(v) => {
            setNeedsAccommodation(v === "yes");
            setStep(3);
          }}
        />
      )}
    </div>
  );
}

function Question({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: { key: string; label: string }[];
  onSelect: (key: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-6 grid gap-3">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => onSelect(o.key)}
            className="rounded-xl border border-nino-line px-5 py-4 text-start text-sm hover:border-nino-orange hover:bg-nino-cream"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
