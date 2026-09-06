export function inputClass(hasError?: boolean) {
  // Deliberately no width utility here — most callers want the
  // default full-width block behavior of a bare <input>/<select>, but
  // PhoneField needs custom widths (w-28 / flex-1) for its two-part
  // layout, and a baked-in w-full would fight those.
  return `rounded-xl border bg-nino-cream/60 px-3.5 py-3 text-sm shadow-sm outline-none transition-all duration-200 focus:border-nino-orange focus:bg-white focus:ring-4 focus:ring-nino-orange/10 ${
    hasError ? "border-red-400" : "border-nino-line/70 hover:border-nino-ink/20"
  }`;
}
