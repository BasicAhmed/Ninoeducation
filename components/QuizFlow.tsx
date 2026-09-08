"use client";

import { useState } from "react";
import { SchoolCard } from "@/components/SchoolCard";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

type School = {
  id: string;
  slug: string;
  nameAr: string;
  city: string;
  province: string;
  shortDescriptionAr: string;
  licenses: string;
  priceMinUsd: number;
  priceMaxUsd: number;
  rating: number;
  hasAccommodation: boolean;
  trainingType: string;
};

export function QuizFlow({ schools, lang }: { schools: School[]; lang: Lang }) {
  const t = dictionaries[lang].quiz;
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [needsAccommodation, setNeedsAccommodation] = useState<boolean | null>(
    null
  );

  const GOALS = [
    { key: "PPL", label: t.goalPpl },
    { key: "CPL", label: t.goalCpl },
    { key: "ATPL_THEORY", label: t.goalAtpl },
  ];

  const BUDGETS = [
    { key: 13500, label: t.budget1 },
    { key: 24000, label: t.budget2 },
    { key: 38000, label: t.budget3 },
    { key: 999999999, label: t.budget4 },
  ];

  const done = step === 3;

  const matches = done
    ? schools
        .filter((s) => (goal ? s.licenses.split(",").includes(goal) : true))
        .filter((s) => (budget ? s.priceMinUsd <= budget : true))
        .filter((s) => (needsAccommodation ? s.hasAccommodation : true))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
    : [];

  if (done) {
    return (
      <div>
        <h2 className="font-display text-2xl">{t.resultsTitle}</h2>
        {matches.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-nino-line bg-nino-white p-8 text-nino-ink/60">
            {t.noMatches}
          </p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {matches.map((s) => (
              <SchoolCard key={s.id} school={s} lang={lang} />
            ))}
          </div>
        )}
        <button
          onClick={() => setStep(0)}
          className="mt-8 text-sm font-medium text-nino-orange hover:underline"
        >
          {t.retake}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-nino-line bg-nino-white p-8">
      <div className="mb-6 text-xs text-nino-ink/40">
        {t.questionOf} {step + 1} {t.of3}
      </div>

      {step === 0 && (
        <Question
          title={t.goalQuestion}
          options={GOALS}
          onSelect={(v) => {
            setGoal(v as string);
            setStep(1);
          }}
        />
      )}

      {step === 1 && (
        <Question
          title={t.budgetQuestion}
          options={BUDGETS.map((b) => ({ key: String(b.key), label: b.label }))}
          onSelect={(v) => {
            setBudget(Number(v));
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Question
          title={t.accommodationQuestion}
          options={[
            { key: "yes", label: t.accommodationYes },
            { key: "no", label: t.accommodationNo },
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
