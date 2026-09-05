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
            strokeOpacity={0.06}
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
            strokeOpacity={0.06}
          />
        ))}

        {/* flight paths */}
        {CITIES.map((c) => {
          const p = project(c.lon, c.lat);
          return (
            <path
              key={`path-${c.code}`}
              d={arcPath(p, dest)}
              fill="none"
              stroke="#fe5200"
              strokeWidth={2}
              strokeOpacity={0.55}
              className="flight-path"
            />
          );
        })}

        {/* origin markers + labels (always visible) */}
        {CITIES.map((c) => {
          const p = project(c.lon, c.lat);
          return (
            <g key={`marker-${c.code}`}>
              <circle cx={p.x} cy={p.y} r={7} fill="#ffffff" stroke="#0b0d0f" strokeWidth={2} />
              <circle cx={p.x} cy={p.y} r={3} fill="#0b0d0f" />
              <text
                x={p.x}
                y={p.y - 16}
                textAnchor="middle"
                fontSize="15"
                fontWeight={700}
                fill="#0b0d0f"
              >
                {c.nameAr}
              </text>
              <text x={p.x} y={p.y + 26} textAnchor="middle" fontSize="11" fill="#0b0d0f" opacity={0.55}>
                {c.flightHours}
              </text>
            </g>
          );
        })}

        {/* destination marker */}
        <g>
          <circle cx={dest.x} cy={dest.y} r={11} fill="#fe5200" opacity={0.18} />
          <circle cx={dest.x} cy={dest.y} r={8} fill="#fe5200" stroke="#ffffff" strokeWidth={2} />
          <text
            x={dest.x}
            y={dest.y + 28}
            textAnchor="middle"
            fontSize="16"
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
