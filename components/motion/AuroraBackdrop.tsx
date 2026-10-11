// Moving brand-colour gradient used behind heroes. Pure CSS (see the
// aurora-* keyframes in globals.css), so it costs nothing on the server
// and stops for visitors who prefer reduced motion.
export function AuroraBackdrop({
  tone = "dark",
  runway = false,
  className = "",
}: {
  tone?: "dark" | "light";
  runway?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      aria-hidden
      className={`grain pointer-events-none absolute inset-0 overflow-hidden ${
        dark ? "bg-nino-ink" : "bg-nino-cream"
      } ${className}`}
    >
      <div
        className={`aurora-a absolute -top-1/4 h-[70%] w-[70%] rounded-full blur-[110px] ltr:-left-1/4 rtl:-right-1/4 ${
          dark ? "bg-nino-orange/55" : "bg-nino-orange/25"
        }`}
      />
      <div
        className={`aurora-b absolute -bottom-1/3 h-[75%] w-[65%] rounded-full blur-[120px] ltr:-right-1/4 rtl:-left-1/4 ${
          dark ? "bg-[#ff9a3d]/35" : "bg-[#ffb36b]/30"
        }`}
      />
      <div
        className={`aurora-c absolute left-1/3 top-1/4 h-[55%] w-[45%] rounded-full blur-[120px] ${
          dark ? "bg-[#5b3bff]/25" : "bg-[#ff7aa8]/15"
        }`}
      />
      {runway && (
        <div className="absolute inset-x-[-50%] bottom-[-10%] h-[60%]">
          <div className="runway-grid h-full w-full" />
        </div>
      )}
      {dark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,13,15,0.75)_100%)]" />
      )}
    </div>
  );
}
