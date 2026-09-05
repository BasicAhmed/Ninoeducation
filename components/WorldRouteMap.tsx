type City = {
  code: string;
  nameAr: string;
  lon: number;
  lat: number;
  flightHours: string;
};

const CITIES: City[] = [
  { code: "RUH", nameAr: "الرياض", lon: 46.7, lat: 24.7, flightHours: "≈ 8 ساعات" },
  { code: "CAI", nameAr: "القاهرة", lon: 31.2, lat: 30.0, flightHours: "≈ 9 ساعات" },
  { code: "DXB", nameAr: "دبي", lon: 55.3, lat: 25.2, flightHours: "≈ 8.5 ساعة" },
  { code: "KRT", nameAr: "الخرطوم", lon: 32.5, lat: 15.6, flightHours: "≈ 6 ساعات" },
];

const DEST = { code: "JNB", nameAr: "جوهانسبرغ", lon: 28.0, lat: -26.2 };

const LON_MIN = 15;
const LON_MAX = 60;
const LAT_MIN = -32;
const LAT_MAX = 35;
const W = 800;
const H = 520;

function project(lon: number, lat: number) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return { x, y };
}

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - 60;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

export function WorldRouteMap() {
  const dest = project(DEST.lon, DEST.lat);

  return (
    <div dir="ltr" className="relative overflow-hidden rounded-3xl border border-nino-line bg-[#fbf8f4]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="خريطة توضح انطلاق الطلاب من عدة دول عربية نحو جنوب أفريقيا"
      >
        {/* graticule */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i * W) / 8}
            y1={0}
            x2={(i * W) / 8}
            y2={H}
            stroke="#0b0d0f"
            strokeOpacity={0.04}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(i * H) / 5}
            x2={W}
            y2={(i * H) / 5}
            stroke="#0b0d0f"
            strokeOpacity={0.04}
          />
        ))}

        {/* flight paths */}
        {CITIES.map((c) => {
          const p = project(c.lon, c.lat);
          return (
            <g key={c.code} className="group">
              <path
                d={arcPath(p, dest)}
                fill="none"
                stroke="#fe5200"
                strokeWidth={1.5}
                strokeOpacity={0.35}
                className="flight-path transition-all duration-300 group-hover:stroke-[2.5] group-hover:stroke-opacity-90"
              />

              {/* origin marker */}
              <circle cx={p.x} cy={p.y} r={5} fill="#0b0d0f" />
              <circle
                cx={p.x}
                cy={p.y}
                r={5}
                fill="none"
                stroke="#0b0d0f"
                strokeOpacity={0.5}
                className="pulse-ring"
              />

              {/* label, shown on hover */}
              <g className="opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                <text
                  x={p.x}
                  y={p.y - 14}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight={600}
                  fill="#0b0d0f"
                >
                  {c.nameAr}
                </text>
                <text
                  x={p.x}
                  y={p.y + 22}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#0b0d0f"
                  opacity={0}
                  className="transition-opacity duration-200 group-hover:opacity-60"
                >
                  {c.flightHours}
                </text>
              </g>
            </g>
          );
        })}

        {/* destination marker */}
        <g>
          <circle cx={dest.x} cy={dest.y} r={7} fill="#fe5200" />
          <circle
            cx={dest.x}
            cy={dest.y}
            r={7}
            fill="none"
            stroke="#fe5200"
            strokeOpacity={0.6}
            className="pulse-ring"
          />
          <text
            x={dest.x}
            y={dest.y + 26}
            textAnchor="middle"
            fontSize="14"
            fontWeight={700}
            fill="#0b0d0f"
          >
            جنوب أفريقيا
          </text>
        </g>
      </svg>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-nino-line bg-white/60 px-6 py-4 text-xs text-nino-ink/60" dir="rtl">
        {CITIES.map((c) => (
          <span key={c.code}>
            {c.nameAr} → جوهانسبرغ · {c.flightHours}
          </span>
        ))}
      </div>
    </div>
  );
}
