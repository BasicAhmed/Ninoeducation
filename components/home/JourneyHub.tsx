"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Wallet,
  Clock,
  MapPin,
  Compass,
  Plane,
  Calculator,
  Gift,
  Send,
  PhoneCall,
  Search,
  Stamp,
  Heart,
  Home,
  UserCheck,
  Star,
  Users,
  Info,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { WHATSAPP_COMMUNITY_LINK } from "@/lib/constants";

type Dest = { href: string; icon: LucideIcon; external?: boolean };

// Where each link in each stage goes. The text for these lives in the
// dictionary (home.stages[i].links[j]) in the same order. Between them,
// the five stages reach every public part of the site.
const STAGE_LINKS: Dest[][] = [
  [
    { href: "/guides/study-aviation-in-south-africa", icon: GraduationCap },
    { href: "/guides/pilot-salary-and-jobs", icon: Wallet },
    { href: "/guides/how-long-to-become-a-pilot", icon: Clock },
    { href: "/journey", icon: MapPin },
  ],
  [
    { href: "/quiz", icon: Compass },
    { href: "/schools", icon: Plane },
    { href: "/calculator", icon: Calculator },
    { href: "/scholarships", icon: Gift },
  ],
  [
    { href: "/apply", icon: Send },
    { href: "/consultation", icon: PhoneCall },
    { href: "/track", icon: Search },
    { href: "/guides/how-to-choose-a-flight-school", icon: GraduationCap },
  ],
  [
    { href: "/dashboard/visa", icon: Stamp },
    { href: "/guides/south-africa-study-visa", icon: GraduationCap },
    { href: "/guides/sacaa-medical-requirements", icon: Heart },
    { href: "/accommodation", icon: Home },
  ],
  [
    { href: "/dashboard", icon: UserCheck },
    { href: "/guides/tips-to-succeed-in-south-africa", icon: Star },
    { href: WHATSAPP_COMMUNITY_LINK, icon: Users, external: true },
    { href: "/about", icon: Info },
  ],
];

export function JourneyHub({ t, lang }: { t: Dictionary["home"]; lang: Lang }) {
  // Most visitors are deciding which school, so open on stage 2.
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = t.stages.length;
  const stage = t.stages[active];
  const Next = lang === "ar" ? ArrowLeft : ArrowRight;
  // Guides have English versions under /en; other pages pick up the
  // language from the cookie set by the language toggle.
  const localize = (href: string) =>
    lang === "en" && href.startsWith("/guides/") ? `/en${href}` : href;

  function select(i: number, focus = false) {
    const next = Math.max(0, Math.min(total - 1, i));
    setActive(next);
    const el = tabs.current[next];
    if (focus) el?.focus();
    el?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  return (
    <div className="mt-11 grid gap-7 lg:grid-cols-[300px_1fr] lg:gap-10">
      {/* Stage picker: chips on mobile, a vertical route with progress on desktop */}
      <div
        role="tablist"
        aria-label={t.hubAria}
        className="relative -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <span
          aria-hidden
          className="absolute bottom-7 top-7 hidden w-0.5 rounded bg-nino-line ltr:left-[21px] rtl:right-[21px] lg:block"
        >
          <span
            className="block w-full rounded bg-nino-orange transition-[height] duration-500 ease-out"
            style={{ height: `${(active / (total - 1)) * 100}%` }}
          />
        </span>
        {t.stages.map((s, i) => {
          const selected = i === active;
          const done = i < active;
          return (
            <button
              key={s.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`stage-tab-${i}`}
              aria-selected={selected}
              aria-controls="stage-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                const forward = ["ArrowDown", lang === "ar" ? "ArrowLeft" : "ArrowRight"];
                const back = ["ArrowUp", lang === "ar" ? "ArrowRight" : "ArrowLeft"];
                if (forward.includes(e.key)) {
                  e.preventDefault();
                  select(i + 1, true);
                } else if (back.includes(e.key)) {
                  e.preventDefault();
                  select(i - 1, true);
                }
              }}
              className={`relative flex shrink-0 snap-start items-center gap-3.5 rounded-full border px-4 py-2.5 text-start transition-colors lg:rounded-2xl lg:border-0 lg:px-2.5 lg:py-3 ${
                selected
                  ? "border-nino-ink bg-nino-ink text-white lg:bg-white lg:text-nino-ink lg:shadow-[0_10px_30px_-12px_rgba(11,13,15,0.25)]"
                  : "border-nino-line bg-white hover:border-nino-orange lg:bg-transparent"
              }`}
            >
              <span
                className={`relative z-10 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 lg:flex ${
                  selected || done
                    ? "border-nino-orange bg-nino-orange text-white"
                    : "border-nino-line bg-white text-nino-ink/60"
                }`}
              >
                {i + 1}
              </span>
              <span>
                <b className="block whitespace-nowrap text-[15px] font-semibold">{s.title}</b>
                <small className="hidden text-[13px] text-nino-ink/60 lg:block">{s.short}</small>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active stage */}
      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active}`}
        className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-nino-line bg-white p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl">{stage.heading}</h3>
            <p className="mt-1 text-[15px] text-nino-ink/60">{stage.body}</p>
          </div>
          <span aria-hidden dir="ltr" className="font-display text-6xl leading-none text-nino-orange/15">
            {String(active + 1).padStart(2, "0")}
          </span>
        </div>

        {/* key forces a remount so the links cascade in on every change */}
        <div key={active} className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {stage.links.map((l, j) => {
            const dest = STAGE_LINKS[active][j];
            if (!dest) return null;
            const Icon = dest.icon;
            const primary = j === 0;
            const className = `hub-link group flex items-start gap-3.5 rounded-[18px] border p-4 transition-colors ${
              primary
                ? "border-nino-ink bg-nino-ink text-white hover:bg-[#1a1d21]"
                : "border-transparent bg-nino-cream hover:border-nino-orange hover:bg-white"
            }`;
            const inner = (
              <>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    primary
                      ? "bg-nino-orange text-white"
                      : "bg-white text-nino-orange group-hover:bg-nino-orange group-hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                </span>
                <span>
                  <strong className="block text-[15px] font-semibold">{l.title}</strong>
                  <small className={`mt-0.5 block text-[13px] ${primary ? "text-white/65" : "text-nino-ink/60"}`}>
                    {l.desc}
                  </small>
                </span>
              </>
            );
            const style = { animationDelay: `${j * 70}ms` };
            const spotlight = primary ? "light" : "";
            return dest.external ? (
              <a
                key={l.title}
                href={dest.href}
                target="_blank"
                rel="noopener noreferrer"
                data-spotlight={spotlight}
                className={className}
                style={style}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={l.title}
                href={localize(dest.href)}
                data-spotlight={spotlight}
                className={className}
                style={style}
              >
                {inner}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-nino-ink/60">
          <span>
            {t.hubStep.replace("{n}", String(active + 1)).replace("{total}", String(total))}
          </span>
          {active < total - 1 ? (
            <button
              type="button"
              onClick={() => select(active + 1)}
              className="inline-flex items-center gap-1.5 font-semibold text-nino-ink hover:text-nino-orange"
            >
              {t.hubNext} {t.stages[active + 1].title}
              <Next size={16} />
            </button>
          ) : (
            <Link
              href="/apply"
              className="border-b-2 border-nino-orange pb-0.5 font-semibold text-nino-ink hover:text-nino-orange"
            >
              {t.hubDone}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
