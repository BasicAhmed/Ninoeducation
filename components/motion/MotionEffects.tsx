"use client";

import { useEffect } from "react";

// One listener for the whole site: any element marked data-spotlight
// gets --mx / --my set to the pointer position inside it, which the
// CSS in globals.css turns into a soft light following the cursor.
export function MotionEffects() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let frame = 0;
    function onMove(e: PointerEvent) {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${e.clientX - r.left}px`);
        target.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
