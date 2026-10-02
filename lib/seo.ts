import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

// Single source of truth for every indexable page's search title and
// description, in both languages.
//
// Rules these follow:
// - The exact phrase people type into Google comes FIRST. Google
//   weighs the start of a title most, and truncates around 60
//   characters, so a brand suffix on every page was spending the most
//   valuable space on a name nobody searches for yet.
// - The brand only appears on the homepage and About. Google already
//   shows the site name above each result on its own.
// - Each page targets a different phrase, so pages don't compete with
//   each other for the same search.
// - Descriptions are written as the answer + a reason to click
//   (free, real prices, compare), around 150 characters.

export const BRAND = { ar: "نينو إديوكيشن", en: "Nino Education" } as const;

type Entry = { title: string; description: string };
type Page = { ar: Entry; en: Entry };

export const SEO_PAGES = {
  "": {
    ar: {
      title: "دراسة الطيران في جنوب أفريقيا | مدارس الطيران — نينو إديوكيشن",
      description:
        "ادرس الطيران في جنوب أفريقيا بأقل تكلفة. قارن مدارس الطيران المعتمدة من SACAA بالأسعار الحقيقية، واحصل على رخصة PPL و CPL مع دعم مجاني في القبول والتأشيرة والسكن.",
    },
    en: {
      title: "Pilot Training in South Africa | Flight Schools — Nino Education",
      description:
        "Study aviation in South Africa for less. Compare SACAA-approved flight schools by real prices, and get free help with PPL and CPL admission, visa and housing.",
    },
  },
  "/schools": {
    ar: {
      title: "أفضل مدارس الطيران في جنوب أفريقيا 2026: الأسعار والمقارنة",
      description:
        "قائمة مدارس الطيران المعتمدة من SACAA في جنوب أفريقيا مع أسعار PPL و CPL، مدة الدراسة، الأسطول والموقع. قارن واختر المدرسة المناسبة لميزانيتك مجانًا.",
    },
    en: {
      title: "Best Flight Schools in South Africa 2026: Prices Compared",
      description:
        "SACAA-approved flight schools in South Africa with PPL and CPL prices, course length, fleet and location. Compare and shortlist the right school for your budget, free.",
    },
  },
  "/schools/compare": {
    ar: {
      title: "مقارنة مدارس الطيران في جنوب أفريقيا: السعر والمدة والرخص",
      description:
        "قارن مدارس الطيران في جنوب أفريقيا جنبًا إلى جنب: تكلفة CPL، مدة التدريب، الرخص المتاحة، الأسطول والسكن. مقارنة محايدة ومجانية.",
    },
    en: {
      title: "Compare Flight Schools in South Africa: Cost, Duration, Licences",
      description:
        "Compare South African flight schools side by side: CPL cost, training duration, licences offered, fleet and accommodation. Neutral and free.",
    },
  },
  "/accommodation": {
    ar: {
      title: "سكن طلاب الطيران في جنوب أفريقيا: الأسعار والخيارات القريبة من المطارات",
      description:
        "سكن طلابي مفروش قريب من مدارس الطيران في جنوب أفريقيا. أسعار شهرية حقيقية، غرف خاصة ومشتركة، والمسافة من المطار.",
    },
    en: {
      title: "Student Accommodation Near Flight Schools in South Africa",
      description:
        "Furnished student housing close to South African flight schools. Real monthly prices, private and shared rooms, and distance to the airfield.",
    },
  },
  "/apply": {
    ar: {
      title: "التقديم لدراسة الطيران في جنوب أفريقيا — قدّم مجانًا",
      description:
        "قدّم طلبك لدراسة الطيران في جنوب أفريقيا خلال دقائق. نرشح لك المدارس المناسبة لميزانيتك ونتابع قبولك وتأشيرتك وسكنك، بدون أي رسوم على الطالب.",
    },
    en: {
      title: "Apply for Pilot Training in South Africa — Free Application",
      description:
        "Apply to study aviation in South Africa in minutes. We match you to flight schools that fit your budget and handle admission, visa and housing, at no cost to you.",
    },
  },
  "/quiz": {
    ar: {
      title: "أي مدرسة طيران تناسبك؟ اختبار سريع لاختيار مدرستك في جنوب أفريقيا",
      description:
        "أجب عن ثلاثة أسئلة عن ميزانيتك ورخصتك وموقعك، ونرشح لك أفضل مدارس الطيران في جنوب أفريقيا المناسبة لك فورًا.",
    },
    en: {
      title: "Which Flight School Is Right for You? South Africa School Finder",
      description:
        "Answer three questions about your budget, licence and location, and get the South African flight schools that fit you best, instantly.",
    },
  },
  "/calculator": {
    ar: {
      title: "حاسبة تكلفة دراسة الطيران في جنوب أفريقيا (PPL و CPL)",
      description:
        "احسب تكلفة دراسة الطيران في جنوب أفريقيا بالدولار: رسوم التدريب، السكن، المعيشة والتأشيرة. تقدير واقعي لميزانيتك الكاملة خلال دقيقة.",
    },
    en: {
      title: "Pilot Training Cost Calculator South Africa (PPL & CPL)",
      description:
        "Calculate what pilot training in South Africa will cost you in USD: tuition, housing, living costs and visa. A realistic full budget in one minute.",
    },
  },
  "/guides": {
    ar: {
      title: "أدلة دراسة الطيران في جنوب أفريقيا: التكلفة، التأشيرة، الرخص",
      description:
        "كل ما يحتاجه الطالب الدولي لدراسة الطيران في جنوب أفريقيا: التكلفة، التأشيرة الدراسية، الفرق بين PPL و CPL، الفحص الطبي، المدة والرواتب.",
    },
    en: {
      title: "Pilot Training Guides: Cost, Visa, PPL, CPL in South Africa",
      description:
        "Everything an international student needs to study aviation in South Africa: cost, study visa, PPL vs CPL, medical, duration and pilot salaries.",
    },
  },
  "/scholarships": {
    ar: {
      title: "منح دراسة الطيران وخصومات مدارس الطيران في جنوب أفريقيا",
      description:
        "منح دراسية للطيران، خصومات من مدارس الطيران، وطرق تبدأ بها تدريبك بميزانية محدودة. سجّل لتصلك الفرص الجديدة أولًا.",
    },
    en: {
      title: "Pilot Scholarships & Flight School Discounts in South Africa",
      description:
        "Aviation scholarships, flight school discounts and ways to start pilot training on a limited budget. Sign up to hear about new opportunities first.",
    },
  },
  "/consultation": {
    ar: {
      title: "استشارة مجانية لدراسة الطيران في جنوب أفريقيا — احجز مكالمة",
      description:
        "احجز مكالمة مجانية مع مستشار طيران لمناقشة ميزانيتك، المدرسة المناسبة، التأشيرة والخطوات القادمة. بدون أي التزام.",
    },
    en: {
      title: "Free Pilot Training Consultation — Book a Call",
      description:
        "Book a free call with an aviation advisor to talk through your budget, the right flight school in South Africa, visa and next steps. No commitment.",
    },
  },
  "/journey": {
    ar: {
      title: "كيف تصبح طيارًا في جنوب أفريقيا: الخطوات من التقديم إلى الرخصة",
      description:
        "خطوات أن تصبح طيارًا في جنوب أفريقيا بالترتيب: اختيار المدرسة، القبول، التأشيرة، السفر، التدريب ثم رخصة CPL.",
    },
    en: {
      title: "How to Become a Pilot in South Africa: Step by Step",
      description:
        "The steps to becoming a pilot in South Africa, in order: choosing a school, admission, visa, arrival, training and your CPL.",
    },
  },
  "/about": {
    ar: {
      title: "من نحن — نينو إديوكيشن | مستشارو دراسة الطيران في جنوب أفريقيا",
      description:
        "نينو إديوكيشن أسسها طيارون محترفون عام 2022 لمساعدة الطلاب الدوليين على الالتحاق بمدارس طيران موثوقة في جنوب أفريقيا، مجانًا للطالب.",
    },
    en: {
      title: "About Nino Education | Pilot Training Advisors, South Africa",
      description:
        "Nino Education was founded by professional pilots in 2022 to help international students enrol at trusted flight schools in South Africa, free for students.",
    },
  },
  "/track": {
    ar: {
      title: "تتبّع طلب دراسة الطيران",
      description: "أدخل رقم طلبك لمعرفة حالة تقديمك لمدرسة الطيران خطوة بخطوة.",
    },
    en: {
      title: "Track Your Flight School Application",
      description: "Enter your reference code to see the status of your flight school application.",
    },
  },
  "/guides/study-aviation-in-south-africa": {
    ar: {
      title: "دراسة الطيران في جنوب أفريقيا 2026: التكلفة والشروط والمدة",
      description:
        "الدليل الشامل لدراسة الطيران في جنوب أفريقيا للطلاب العرب والدوليين: التكلفة، شروط القبول، المدة، التأشيرة، وأفضل مدارس الطيران.",
    },
    en: {
      title: "Study Aviation in South Africa 2026: Cost, Requirements, Duration",
      description:
        "The complete guide to pilot training in South Africa for international students: cost, entry requirements, duration, visa and the best flight schools.",
    },
  },
  "/guides/flight-training-cost-south-africa": {
    ar: {
      title: "تكلفة دراسة الطيران في جنوب أفريقيا 2026 (PPL و CPL بالدولار)",
      description:
        "كم تكلفة دراسة الطيران في جنوب أفريقيا؟ تفصيل كامل لأسعار PPL و CPL، السكن، المعيشة والتأشيرة، وكيف تخطط ميزانيتك بدون مفاجآت.",
    },
    en: {
      title: "Pilot Training Cost in South Africa 2026 (PPL & CPL Prices)",
      description:
        "How much does it cost to become a pilot in South Africa? Full breakdown of PPL and CPL fees, housing, living costs and visa for international students.",
    },
  },
  "/guides/why-is-flight-training-expensive": {
    ar: {
      title: "لماذا دراسة الطيران غالية؟ وطرق الدفع بالتقسيط",
      description:
        "لماذا تكلفة تدريب الطيران مرتفعة، وهل تدفعها كاملة من أول يوم؟ شرح الدفع حسب الساعات والباقات الثابتة، وكيف تبدأ بمبلغ أقل.",
    },
    en: {
      title: "Why Is Flight Training So Expensive? Payment Options Explained",
      description:
        "Why pilot training costs what it does, and whether you must pay it all upfront. Pay-as-you-fly vs fixed packages, and how to start with less.",
    },
  },
  "/guides/ppl-vs-cpl": {
    ar: {
      title: "الفرق بين رخصة PPL و CPL: التكلفة والساعات والشروط",
      description:
        "مقارنة بين رخصة الطيار الخاص PPL ورخصة الطيار التجاري CPL: عدد الساعات، التكلفة، الشروط، وما تسمح به كل رخصة.",
    },
    en: {
      title: "PPL vs CPL: Difference, Cost, Hours and Requirements",
      description:
        "Private Pilot Licence vs Commercial Pilot Licence compared: flight hours, cost, requirements and what each licence lets you do in South Africa.",
    },
  },
  "/guides/south-africa-study-visa": {
    ar: {
      title: "تأشيرة الدراسة في جنوب أفريقيا 2026: الأوراق والخطوات والمدة",
      description:
        "كيف تحصل على تأشيرة دراسية لجنوب أفريقيا كطالب طيران: الأوراق المطلوبة، الرسوم، مدة المعالجة، وأسباب الرفض الشائعة.",
    },
    en: {
      title: "South Africa Study Visa 2026: Requirements, Documents, Timeline",
      description:
        "How to get a South African study visa as a pilot student: required documents, fees, processing time and the common reasons for refusal.",
    },
  },
  "/guides/sacaa-medical-requirements": {
    ar: {
      title: "الفحص الطبي للطيارين وشروط SACAA: الدرجة الأولى والثانية",
      description:
        "شروط هيئة الطيران المدني الجنوب أفريقية SACAA والفحص الطبي للطيارين: الفرق بين Class 1 و Class 2، ما يُفحص، وما قد يمنعك.",
    },
    en: {
      title: "SACAA Medical Requirements: Class 1 & Class 2 Pilot Medical",
      description:
        "SACAA licence and aviation medical requirements in South Africa: Class 1 vs Class 2, what is tested, and what can disqualify you.",
    },
  },
  "/guides/how-long-to-become-a-pilot": {
    ar: {
      title: "كم سنة دراسة الطيران؟ مدة الحصول على رخصة CPL",
      description:
        "كم تستغرق دراسة الطيران في جنوب أفريقيا؟ جدول زمني واقعي من أول يوم تدريب حتى رخصة الطيار التجاري CPL.",
    },
    en: {
      title: "How Long Does It Take to Become a Pilot? CPL Timeline",
      description:
        "How long pilot training takes in South Africa: a realistic timeline from your first lesson to a Commercial Pilot Licence.",
    },
  },
  "/guides/how-to-choose-a-flight-school": {
    ar: {
      title: "كيف تختار مدرسة طيران في جنوب أفريقيا؟ 7 معايير مهمة",
      description:
        "معايير عملية لاختيار أفضل مدرسة طيران: اعتماد SACAA، الأسطول، الموقع والطقس، السعر الحقيقي، ونتائج الخريجين.",
    },
    en: {
      title: "How to Choose a Flight School in South Africa: What to Check",
      description:
        "Practical criteria for choosing the best flight school: SACAA approval, fleet, location and weather, true price and graduate outcomes.",
    },
  },
  "/guides/student-accommodation-south-africa": {
    ar: {
      title: "سكن الطلاب في جنوب أفريقيا: الأسعار والخيارات لطلاب الطيران",
      description:
        "خيارات سكن طلاب الطيران الدوليين في جنوب أفريقيا: الأسعار الشهرية، سكن المدرسة مقابل السكن الخاص، وتكلفة المعيشة.",
    },
    en: {
      title: "Student Accommodation in South Africa: Costs for Pilot Students",
      description:
        "Housing options for international pilot students in South Africa: monthly prices, school housing vs private rentals, and cost of living.",
    },
  },
  "/guides/common-challenges-flight-training": {
    ar: {
      title: "مشاكل دراسة الطيران في جنوب أفريقيا وكيف تتجنبها",
      description:
        "المشاكل الواقعية التي يواجهها طلاب الطيران: تأخير الطقس، تجاوز الميزانية، الغربة وتأخر الاختبارات، وكيف تستعد لها.",
    },
    en: {
      title: "Flight Training Problems in South Africa and How to Avoid Them",
      description:
        "The real problems pilot students face: weather delays, budget overruns, homesickness and exam backlogs, and how to prepare for each.",
    },
  },
  "/guides/tips-to-succeed-in-south-africa": {
    ar: {
      title: "نصائح لطلاب الطيران في جنوب أفريقيا: الحياة والدراسة والميزانية",
      description:
        "نصائح عملية من طلاب سابقين: كيف تتأقلم بسرعة، تدير ميزانيتك، وتنهي تدريب الطيران في جنوب أفريقيا في وقته.",
    },
    en: {
      title: "Tips for International Pilot Students in South Africa",
      description:
        "Practical advice from past students: how to settle in fast, manage your budget and finish pilot training in South Africa on time.",
    },
  },
  "/guides/pilot-salary-and-jobs": {
    ar: {
      title: "رواتب الطيارين وفرص العمل بعد رخصة CPL",
      description:
        "كم راتب الطيار بعد التخرج؟ نظرة واقعية على فرص العمل بعد رخصة CPL: من أين تبدأ، وكيف يتطور الراتب مع الخبرة.",
    },
    en: {
      title: "Pilot Salary and Jobs After a CPL: What to Expect",
      description:
        "How much do pilots earn after graduating? A realistic look at jobs after a CPL: where you start and how salary grows with hours.",
    },
  },
} satisfies Record<string, Page>;

export type SeoPath = keyof typeof SEO_PAGES;

const OG_IMAGE = "/brand/hero-cessna.jpg";

/**
 * Builds the complete metadata for a page from a title + description.
 *
 * `bilingual: false` is for pages whose body is still Arabic-only —
 * those keep a single canonical so Google isn't offered an "English"
 * URL that is mostly Arabic.
 */
export function buildMetadata({
  path,
  lang,
  title,
  description,
  bilingual = true,
  image = OG_IMAGE,
  type = "website",
}: {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  bilingual?: boolean;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const arUrl = `${SITE_URL}${path}` || SITE_URL;
  const enUrl = `${SITE_URL}/en${path}`;
  // Each language version is its own canonical. Pointing /en/* at the
  // Arabic URL told Google to drop the English page from its index.
  const canonical = bilingual && lang === "en" ? enUrl : arUrl;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      ...(bilingual ? { languages: { ar: arUrl, en: enUrl, "x-default": arUrl } } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND[lang],
      locale: lang === "ar" ? "ar_AR" : "en_US",
      alternateLocale: bilingual ? [lang === "ar" ? "en_US" : "ar_AR"] : undefined,
      type,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Metadata for a page registered in SEO_PAGES, in the visitor's language. */
export async function pageMetadata(
  path: SeoPath,
  opts: { type?: "website" | "article" } = {},
): Promise<Metadata> {
  const lang = await getLang();
  const entry = SEO_PAGES[path][lang];
  return buildMetadata({ path, lang, ...entry, ...opts });
}

// ---------------------------------------------------------------
// Schools: English text built from the school's own data.
//
// School descriptions in the database are Arabic-only. Rather than
// show Arabic paragraphs on the English pages (which makes Google
// treat them as mixed-language and rank them for neither), English
// pages describe each school from its factual fields. Nothing here is
// invented — every word comes from a column the school record has.
// ---------------------------------------------------------------

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

function usd(n: number) {
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

export function schoolMetadata(s: SchoolFull & { slug: string; heroImageUrl?: string | null; shortDescriptionAr: string }, lang: Lang) {
  const name = schoolName(s, lang);
  const en = lang === "en";
  const cityEn = placeEn(s).split(",")[0];
  return buildMetadata({
    path: `/schools/${s.slug}`,
    lang,
    title: en
      ? `${name}: Fees, Courses & Reviews | ${cityEn ? `${cityEn} ` : ""}Flight School`
      : `${name}: الرسوم والدورات والتقييم | مدرسة طيران في ${s.city}`,
    description: en
      ? `${name}: ${schoolShortEn(s)} Compare it with other South African flight schools and apply free.`
      : `${s.shortDescriptionAr} الأسعار من ${usd(s.priceMinUsd)} إلى ${usd(s.priceMaxUsd)}. قارنها مع مدارس الطيران الأخرى وقدّم مجانًا.`,
    image: s.heroImageUrl || undefined,
  });
}
