"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileEdit,
  Wallet,
  BadgeCheck,
  FileCheck2,
  Send,
  PlaneLanding,
  GraduationCap,
  MessagesSquare,
  Trophy,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

const ICONS = [
  FileEdit,
  Wallet,
  BadgeCheck,
  FileCheck2,
  Send,
  PlaneLanding,
  GraduationCap,
  MessagesSquare,
  Trophy,
];

const EASE = "cubic-bezier(0.65,0,0.35,1)";

export function JourneyTimeline({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].journey;
  const [step, setStep] = useState(0);
  const stages = t.stages;
  const total = stages.length;
  const current = stages[step];
  const Icon = ICONS[step];
  const isLast = step === total - 1;

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Flight-path progress — every stop is directly clickable, this is
          an exploration, not a gated form */}
      <div className="relative">
        <div className="h-1 rounded-full bg-nino-line">
          <div
            className="h-full rounded-full bg-nino-orange/40"
            style={{ width: `${(step / (total - 1)) * 100}%`, transition: `width 500ms ${EASE}` }}
          />
        </div>
        <div className="mt-4 flex justify-between">
          {stages.map((s, i) => {
            const StageIcon = ICONS[i];
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setStep(i)}
                aria-label={s.title}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all sm:h-9 sm:w-9 ${
                  active
                    ? "scale-110 bg-nino-orange text-white shadow-md shadow-nino-orange/30"
                    : done
                      ? "bg-nino-orange/15 text-nino-orange"
                      : "bg-nino-line/60 text-nino-ink/30 hover:bg-nino-line"
                }`}
              >
                <StageIcon size={15} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage card */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-nino-line/60 bg-white p-7 shadow-[0_8px_40px_rgba(11,13,15,0.06)] sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
            <Icon size={22} />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
              {t.stepOf} {step + 1} {t.of9}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl">{current.title}</h2>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-nino-ink/80 sm:text-lg">
          {current.narrative}
        </p>

        {"important" in current && current.important && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-900">{t.importantNote}</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800">{current.important}</p>
            </div>
          </div>
        )}

        {current.behindScenes && (
          <div className="mt-6 flex gap-3 rounded-2xl bg-nino-cream p-5">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-nino-orange" />
            <div>
              <p className="text-sm font-medium text-nino-ink">{t.behindScenes}</p>
              <p className="mt-1 text-sm leading-relaxed text-nino-ink/70">{current.behindScenes}</p>
            </div>
          </div>
        )}

        {isLast && (
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-nino-orange px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-nino-orange/30 transition-transform hover:bg-nino-ink active:scale-95"
            >
              {t.applyNow}
            </Link>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex items-center gap-1.5 rounded-full border border-nino-ink/20 px-6 py-3.5 text-sm font-medium text-nino-ink transition-transform hover:border-nino-ink active:scale-95"
            >
              <RotateCcw size={14} />
              {t.restart}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      {!isLast && (
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-full border border-nino-ink/20 px-5 py-3 text-sm font-medium text-nino-ink transition-transform hover:border-nino-ink active:scale-95 disabled:opacity-0"
          >
            {lang === "ar" ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            {lang === "ar" ? "السابق" : "Back"}
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, total - 1))}
            className="flex items-center gap-1.5 rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:bg-nino-orange active:scale-95"
          >
            {lang === "ar" ? "التالي" : "Next"}
            {lang === "ar" ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
          </button>
        </div>
      )}
    </div>
  );
}
