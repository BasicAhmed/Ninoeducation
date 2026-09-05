"use client";

import { useEffect, useRef, useState } from "react";

export function CountUpNumber({ value }: { value: string }) {
  const match = value.match(/^(\+)?(\d+)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    match ? `${match[1] ?? ""}0` : value
  );

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const target = parseInt(match[2], 10);
    const prefix = match[1] ?? "";
    let started = false;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          const duration = 1100;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(`${prefix}${Math.round(eased * target)}`);
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{display}</span>;
}
