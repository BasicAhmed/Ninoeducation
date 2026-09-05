import { geoMercator, geoPath, geoBounds } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json";

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

const W = 800;
const H = 560;

const HIGHLIGHT = new Set([
  "Saudi Arabia",
  "Egypt",
  "United Arab Emirates",
  "Sudan",
  "South Africa",
]);

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - 70;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

export function WorldRouteMap() {
  const allCountries = (
    feature(
      worldTopology as unknown as Topology,
      (worldTopology as unknown as Topology).objects.countries as GeometryCollection
    ) as GeoJSON.FeatureCollection
  ).features;

  const countries = allCountries.filter((f) => {
    try {
      const [[minLon, minLat], [maxLon, maxLat]] = geoBounds(f);
      return maxLon >= -25 && minLon <= 70 && maxLat >= -40 && minLat <= 42;
    } catch {
      return false;
    }
  });

  const projection = geoMercator().fitSize([W, H], {
    type: "FeatureCollection",
    features: countries,
  } as GeoJSON.FeatureCollection);
  const pathGenerator = geoPath(projection);

  const project = (lon: number, lat: number) => {
    const p = projection([lon, lat]);
    return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 };
  };

  const dest = project(DEST.lon, DEST.lat);

  return (
    <div dir="ltr" className="relative overflow-hidden rounded-3xl border border-nino-line bg-[#eef2f6]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="خريطة توضح انطلاق الطلاب من عدة دول عربية نحو جنوب أفريقيا"
      >
        {/* land */}
        {countries.map((c, i) => {
          const name = (c.properties as { name?: string } | null)?.name ?? "";
          const d = pathGenerator(c);
          if (!d) return null;
          const isHighlighted = HIGHLIGHT.has(name);
          return (
            <path
              key={`${name}-${i}`}
              d={d}
              fill={isHighlighted ? "#ffe4d1" : "#ffffff"}
              stroke={isHighlighted ? "#fe5200" : "#c7cdd6"}
              strokeWidth={isHighlighted ? 1.5 : 0.75}
            />
          );
        })}

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
              strokeOpacity={0.7}
              className="flight-path"
            />
          );
        })}

        {/* origin markers + labels */}
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
                style={{ paintOrder: "stroke", stroke: "#eef2f6", strokeWidth: 4 }}
              >
                {c.nameAr}
              </text>
              <text
                x={p.x}
                y={p.y + 26}
                textAnchor="middle"
                fontSize="11"
                fill="#0b0d0f"
                opacity={0.6}
                style={{ paintOrder: "stroke", stroke: "#eef2f6", strokeWidth: 4 }}
              >
                {c.flightHours}
              </text>
            </g>
          );
        })}

        {/* destination marker */}
        <g>
          <circle cx={dest.x} cy={dest.y} r={12} fill="#fe5200" opacity={0.18} />
          <circle cx={dest.x} cy={dest.y} r={8} fill="#fe5200" stroke="#ffffff" strokeWidth={2} />
          <text
            x={dest.x}
            y={dest.y + 28}
            textAnchor="middle"
            fontSize="16"
            fontWeight={700}
            fill="#0b0d0f"
            style={{ paintOrder: "stroke", stroke: "#eef2f6", strokeWidth: 4 }}
          >
            جنوب أفريقيا
          </text>
        </g>
      </svg>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-nino-line bg-white/70 px-6 py-4 text-xs text-nino-ink/60" dir="rtl">
        {CITIES.map((c) => (
          <span key={c.code}>
            {c.nameAr} → جوهانسبرغ · {c.flightHours}
          </span>
        ))}
      </div>
    </div>
  );
}
