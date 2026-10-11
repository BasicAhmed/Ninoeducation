"use client";

import { useEffect, useRef } from "react";

// A soft light that follows the pointer across its parent section.
// Touch devices get a gentle glow that settles where the finger last was.
export function PointerGlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function move(e: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host!.getBoundingClientRect();
        el!.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el!.style.setProperty("--gy", `${e.clientY - r.top}px`);
        el!.style.opacity = "1";
      });
    }
    function leave() {
      el!.style.opacity = "0";
    }
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${className}`}
      style={{
        background:
          "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(254,82,0,0.22), transparent 65%)",
      }}
    />
  );
}
