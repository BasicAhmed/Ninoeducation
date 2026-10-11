import type { Lang } from "@/lib/i18n/dictionaries";

// Pure text helpers for school names and English descriptions. Kept
// apart from lib/seo.ts on purpose: seo.ts reads cookies/headers (server
// only), and these are also used by SchoolCard, which renders inside
// client components like the quiz. Importing seo.ts there broke the build.

// ---------------------------------------------------------------
// Schools: English text built from the school's own data.
//
// School descriptions in the database are Arabic-only. Rather than
// show Arabic paragraphs on the English pages (which makes Google
// treat them as mixed-language and rank them for neither), English
// pages describe each school from its factual fields. Nothing here is
// invented — every word comes from a column the school record has.
// ---------------------------------------------------------------

export type { SchoolBasics, SchoolFull };

const LICENCE_EN: Record<string, string> = {
  PPL: "PPL",
  CPL: "CPL",
  IR: "Instrument Rating",
  ME: "Multi-Engine",
  ATPL_THEORY: "ATPL theory",
};

// Province and city are stored in Arabic. Anything not in these maps
// is simply left out of the English sentence rather than shown in
// Arabic script.
const PROVINCE_EN: Record<string, string> = {
  "غاوتنغ": "Gauteng",
  "الكيب الغربية": "Western Cape",
  "الكيب الشرقية": "Eastern Cape",
  "مبومالانغا": "Mpumalanga",
  "كوازولو ناتال": "KwaZulu-Natal",
  "كوازولو-ناتال": "KwaZulu-Natal",
  "فري ستيت": "Free State",
  "ليمبوبو": "Limpopo",
  "الشمال الغربي": "North West",
  "الكيب الشمالية": "Northern Cape",
};

const CITY_EN: Record<string, string> = {
  "جوهانسبرغ": "Johannesburg",
  "جوهانسبورغ": "Johannesburg",
  "بريتوريا": "Pretoria",
  "كيب تاون": "Cape Town",
  "ديربان": "Durban",
  "دوربان": "Durban",
  "بورت إليزابيث": "Port Elizabeth (Gqeberha)",
  "غكيبيرها": "Gqeberha",
  "كروغرسدورب": "Krugersdorp",
  "نيلسبرويت": "Nelspruit (Mbombela)",
  "لانسيريا": "Lanseria",
  "جيرمستون": "Germiston",
  "ميدراند": "Midrand",
  "سنتوريون": "Centurion",
  "بلومفونتين": "Bloemfontein",
  "جورج": "George",
  "ستيلينبوش": "Stellenbosch",
  "بورت ألفريد": "Port Alfred",
  "إيست لندن": "East London",
  "بولوكواني": "Polokwane",
  "سبرينغز": "Springs",
  "بيتوريا": "Pretoria",
  "فيرينيجينغ": "Vereeniging",
  "بريتس": "Brits",
  "موسل باي": "Mossel Bay",
  "بيترماريتزبرغ": "Pietermaritzburg",
};

const LATIN = /^[\x20-\x7E]+$/;

/** English place name for a school, or "" when we can't say it in English. */
export function placeEn(s: { city: string; province: string }) {
  const city = CITY_EN[s.city.trim()] ?? (LATIN.test(s.city) ? s.city.trim() : "");
  const province = PROVINCE_EN[s.province.trim()] ?? (LATIN.test(s.province) ? s.province.trim() : "");
  return [city, province].filter(Boolean).join(", ");
}

function list(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function usd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

type SchoolBasics = {
  nameAr: string;
  nameEn?: string | null;
  city: string;
  province: string;
  licenses: string;
  priceMinUsd: number;
  priceMaxUsd: number;
};

type SchoolFull = SchoolBasics & {
  airportName: string;
  airportCode: string;
  durationMonthsMin: number;
  durationMonthsMax: number;
  aircraftFleet: string;
  hasAccommodation: boolean;
  acceptsInternational: boolean;
};

export function schoolName(s: { nameAr: string; nameEn?: string | null }, lang: Lang) {
  return lang === "en" && s.nameEn ? s.nameEn : s.nameAr;
}

function licencesEn(s: SchoolBasics) {
  return list(
    s.licenses
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => LICENCE_EN[l] ?? l),
  );
}

/** One line, for cards and meta descriptions. */
export function schoolShortEn(s: SchoolBasics) {
  return `${licencesEn(s)} training${placeEn(s) ? ` in ${placeEn(s)}` : ""}, South Africa. Programmes from ${usd(s.priceMinUsd)} to ${usd(s.priceMaxUsd)}.`;
}

/** A full paragraph, for the profile overview. */
export function schoolLongEn(s: SchoolFull) {
  const name = s.nameEn || s.nameAr;
  const fleet = s.aircraftFleet
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);
  const duration =
    s.durationMonthsMin === s.durationMonthsMax
      ? `${s.durationMonthsMin} months`
      : `${s.durationMonthsMin} to ${s.durationMonthsMax} months`;
  return [
    `${name} is a flight school based at ${s.airportCode} airfield${placeEn(s) ? ` in ${placeEn(s)}` : ""}, South Africa.`,
    `It offers ${licencesEn(s)} training under the South African Civil Aviation Authority (SACAA).`,
    `Programmes cost between ${usd(s.priceMinUsd)} and ${usd(s.priceMaxUsd)} and take ${duration} to complete.`,
    fleet.length ? `Students train on the ${list(fleet)}.` : "",
    s.acceptsInternational ? "The school accepts international students." : "",
    s.hasAccommodation ? "Student accommodation is available through the school." : "",
  ]
    .filter(Boolean)
    .join(" ");
}

