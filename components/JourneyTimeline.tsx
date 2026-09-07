"use client";

import { useRef, useState } from "react";
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
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
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
const SWIPE_THRESHOLD = 60;

export function JourneyTimeline({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].journey;
  const [step, setStep] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const stages = t.stages;
  const total = stages.length;
  const current = stages[step];
  const Icon = ICONS[step];
  const isLast = step === total - 1;
  const isFirst = step === 0;

  function goNext() {
    setStep((s) => Math.min(s + 1, total - 1));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  // Swipe is universal-direction (left = next, right = back) regardless
  // of language, matching the gesture convention every story/reel app
  // already trained people on — not tied to RTL/LTR reading direction.
  function onPointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    startX.current = e.clientX;
    cardRef.current?.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    // Resist dragging past the first/last chapter instead of a hard stop
    const clamped =
      (isFirst && delta > 0) || (isLast && delta < 0) ? delta * 0.25 : delta;
    setDragX(clamped);
  }
  function onPointerUp() {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX <= -SWIPE_THRESHOLD && !isLast) goNext();
    else if (dragX >= SWIPE_THRESHOLD && !isFirst) goBack();
    setDragX(0);
  }

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Story-style progress segments — tap any segment to jump directly */}
      <div className="flex gap-1.5">
        {stages.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setStep(i)}
            aria-label={s.title}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-nino-line"
          >
            <span
              className="block h-full rounded-full bg-nino-orange transition-all"
              style={{ width: i <= step ? "100%" : "0%", transitionDuration: i === step ? "300ms" : "150ms" }}
            />
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-xs uppercase tracking-widest text-nino-orange">
        {t.stepOf} {step + 1} {t.of9}
      </p>

      {/* Swipeable card */}
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mt-4 cursor-grab touch-pan-y select-none overflow-hidden rounded-3xl border border-nino-line/60 bg-white p-7 shadow-[0_8px_40px_rgba(11,13,15,0.06)] active:cursor-grabbing sm:p-10"
        style={{
          transform: `translateX(${dragX}px) rotate(${dragX / 60}deg)`,
          transition: isDragging ? "none" : `transform 400ms ${EASE}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
            <Icon size={22} />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl">{current.title}</h2>
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

      {!isLast && (
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-nino-ink/40">
          <ChevronRight size={13} className="rtl:hidden" />
          <ChevronLeft size={13} className="hidden rtl:block" />
          <span>{t.swipeHint}</span>
          <ChevronLeft size={13} className="rtl:hidden" />
          <ChevronRight size={13} className="hidden rtl:block" />
        </div>
      )}
    </div>
  );
}
