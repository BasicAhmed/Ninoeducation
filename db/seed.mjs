import Database from "better-sqlite3";
import path from "path";
import { randomUUID } from "crypto";

const db = new Database(path.join(process.cwd(), "nino.db"));
const now = new Date().toISOString();

const schools = [
  {
    slug: "highveld-flight-academy",
    nameAr: "أكاديمية هايفيلد للطيران",
    nameEn: "Highveld Flight Academy",
    province: "غاوتنغ",
    city: "كروغرسدورب",
    airportName: "مطار كيتي هوك",
    airportCode: "FAKT",
    shortDescriptionAr: "مدرسة تدريب متكاملة قرب جوهانسبرغ، تستقبل طلابًا دوليين منذ أكثر من 15 عامًا.",
    descriptionAr:
      "تقدم أكاديمية هايفيلد للطيران برامج تدريب متكاملة من الرخصة الخاصة حتى رخصة الطيار التجاري، مع أسطول حديث وتركيز خاص على استقبال الطلاب الدوليين. تقع المدرسة على بعد 40 دقيقة من مطار أو.آر.تامبو الدولي.",
    licenses: "PPL,CPL,IR,ME,ATPL_THEORY",
    trainingType: "integrated",
    priceMinZar: 480000,
    priceMaxZar: 720000,
    durationMonthsMin: 12,
    durationMonthsMax: 18,
    acceptsInternational: 1,
    hasAccommodation: 1,
    aircraftFleet: "Cessna 172,Piper Seneca,Cirrus SR20",
    rating: 4.6,
    ninoRanking: 1,
    status: "published",
  },
  {
    slug: "wonderboom-aviation-college",
    nameAr: "كلية وندربوم للطيران",
    nameEn: "Wonderboom Aviation College",
    province: "غاوتنغ",
    city: "بريتوريا",
    airportName: "مطار وندربوم",
    airportCode: "FAWB",
    shortDescriptionAr: "خيار اقتصادي بالقرب من بريتوريا مع برامج تدريب معيارية مرنة.",
    descriptionAr:
      "كلية وندربوم للطيران معروفة بمرونة برامجها المعيارية، مما يتيح للطالب البدء بالرخصة الخاصة ثم إكمال بقية الرخص حسب ميزانيته ووقته. تناسب الطلاب الذين يفضلون التحكم في وتيرة تدريبهم.",
    licenses: "PPL,CPL,IR",
    trainingType: "modular",
    priceMinZar: 350000,
    priceMaxZar: 520000,
    durationMonthsMin: 10,
    durationMonthsMax: 20,
    acceptsInternational: 1,
    hasAccommodation: 0,
    aircraftFleet: "Cessna 152,Cessna 172",
    rating: 4.3,
    ninoRanking: 2,
    status: "published",
  },
  {
    slug: "cape-winds-flight-training",
    nameAr: "كيب ويندز للتدريب الجوي",
    nameEn: "Cape Winds Flight Training",
    province: "الكيب الغربية",
    city: "كيب تاون",
    airportName: "مطار فيشوك",
    airportCode: "FAFK",
    shortDescriptionAr: "تدريب في بيئة ساحلية بمعايير طيران عالية على أطراف كيب تاون.",
    descriptionAr:
      "تجمع كيب ويندز بين جودة تدريب عالية وموقع ساحلي مميز قرب كيب تاون. تشتهر ببرنامج القياس الآلي القوي (Instrument Rating) وبيئة طيران متنوعة المناخ تُعِد الطالب لظروف تشغيل حقيقية.",
    licenses: "PPL,CPL,IR,ME",
    trainingType: "integrated",
    priceMinZar: 560000,
    priceMaxZar: 810000,
    durationMonthsMin: 13,
    durationMonthsMax: 17,
    acceptsInternational: 1,
    hasAccommodation: 1,
    aircraftFleet: "Cessna 172,Beechcraft Duchess",
    rating: 4.7,
    ninoRanking: 3,
    status: "published",
  },
  {
    slug: "eastern-cape-wings",
    nameAr: "إيسترن كيب وينغز",
    nameEn: "Eastern Cape Wings",
    province: "الكيب الشرقية",
    city: "بورت إليزابيث",
    airportName: "مطار بورت إليزابيث",
    airportCode: "FAPE",
    shortDescriptionAr: "أجواء تدريب هادئة بازدحام جوي منخفض، مثالية لبناء الساعات بسرعة.",
    descriptionAr:
      "بفضل انخفاض الازدحام الجوي في المنطقة، يحصل طلاب إيسترن كيب وينغز على ساعات طيران فعلية أكثر خلال فترة تدريب أقصر نسبيًا. المدرسة تدعم مسار بناء الساعات (Hour Building) بشكل خاص.",
    licenses: "PPL,CPL",
    trainingType: "both",
    priceMinZar: 310000,
    priceMaxZar: 470000,
    durationMonthsMin: 9,
    durationMonthsMax: 14,
    acceptsInternational: 1,
    hasAccommodation: 0,
    aircraftFleet: "Cessna 152,Cessna 172",
    rating: 4.1,
    ninoRanking: 4,
    status: "published",
  },
  {
    slug: "rand-executive-aviation",
    nameAr: "راند إكزيكيوتيف للطيران",
    nameEn: "Rand Executive Aviation",
    province: "غاوتنغ",
    city: "جوهانسبرغ",
    airportName: "مطار راند",
    airportCode: "FAGM",
    shortDescriptionAr: "مدرسة تدريب رفيعة المستوى قرب وسط جوهانسبرغ بأسطول حديث نسبيًا.",
    descriptionAr:
      "تقع راند إكزيكيوتيف داخل مجمع مطار راند التاريخي، وتوفر تدريبًا على مستوى عالٍ من الاحترافية مع أسطول يشمل طائرات تدريب متعددة المحركات لمرحلة الرخصة التجارية وما بعدها.",
    licenses: "PPL,CPL,IR,ME,ATPL_THEORY",
    trainingType: "integrated",
    priceMinZar: 610000,
    priceMaxZar: 890000,
    durationMonthsMin: 14,
    durationMonthsMax: 19,
    acceptsInternational: 1,
    hasAccommodation: 1,
    aircraftFleet: "Cessna 172,Piper Seneca,Beechcraft Baron",
    rating: 4.8,
    ninoRanking: 5,
    status: "published",
  },
  {
    slug: "sunbird-flying-school",
    nameAr: "صنبيرد لتعليم الطيران",
    nameEn: "Sunbird Flying School",
    province: "مبومالانغا",
    city: "نيلسبرويت",
    airportName: "مطار نيلسبرويت",
    airportCode: "FANS",
    shortDescriptionAr: "أرخص خيار متاح حاليًا لبرنامج الرخصة الخاصة، بدون سكن مدمج.",
    descriptionAr:
      "خيار ميسور التكلفة نسبيًا لمن يريد البدء برخصة الطيران الخاصة (PPL) دون التزام مالي كبير في البداية، مع إمكانية الانتقال لاحقًا إلى مدرسة أخرى لإكمال الرخصة التجارية.",
    licenses: "PPL",
    trainingType: "modular",
    priceMinZar: 180000,
    priceMaxZar: 260000,
    durationMonthsMin: 4,
    durationMonthsMax: 8,
    acceptsInternational: 1,
    hasAccommodation: 0,
    aircraftFleet: "Cessna 152",
    rating: 3.9,
    ninoRanking: 6,
    status: "published",
  },
];

const insertSchool = db.prepare(`
  INSERT OR REPLACE INTO flight_schools
  (id, slug, name_ar, name_en, province, city, airport_name, airport_code,
   description_ar, short_description_ar, licenses, training_type,
   price_min_zar, price_max_zar, duration_months_min, duration_months_max,
   accepts_international, has_accommodation, aircraft_fleet, rating,
   nino_ranking, website_url, hero_image_url, status, last_pricing_update,
   created_at, updated_at)
  VALUES (@id, @slug, @nameAr, @nameEn, @province, @city, @airportName, @airportCode,
   @descriptionAr, @shortDescriptionAr, @licenses, @trainingType,
   @priceMinZar, @priceMaxZar, @durationMonthsMin, @durationMonthsMax,
   @acceptsInternational, @hasAccommodation, @aircraftFleet, @rating,
   @ninoRanking, @websiteUrl, @heroImageUrl, @status, @lastPricingUpdate,
   @createdAt, @updatedAt)
`);

for (const s of schools) {
  insertSchool.run({
    id: randomUUID(),
    websiteUrl: null,
    heroImageUrl: null,
    lastPricingUpdate: now,
    createdAt: now,
    updatedAt: now,
    ...s,
  });
}

const accommodations = [
  {
    slug: "kroon-student-residence",
    nameAr: "سكن كرون للطلاب",
    city: "كروغرسدورب",
    province: "غاوتنغ",
    descriptionAr: "غرف مفروشة قريبة من مطار كيتي هوك، مع مطبخ ومناطق مشتركة.",
    monthlyPriceZar: 6500,
    roomType: "private",
    furnished: 1,
    distanceToAirport: "10 دقائق بالسيارة",
    wifi: 1,
    status: "published",
  },
  {
    slug: "wonderboom-shared-house",
    nameAr: "منزل مشترك - وندربوم",
    city: "بريتوريا",
    province: "غاوتنغ",
    descriptionAr: "غرف مشتركة اقتصادية لطلاب الطيران، على بعد دقائق من المدرسة.",
    monthlyPriceZar: 3800,
    roomType: "shared",
    furnished: 1,
    distanceToAirport: "8 دقائق بالسيارة",
    wifi: 1,
    status: "published",
  },
  {
    slug: "fish-hoek-seaview-studio",
    nameAr: "استوديو فيشوك بإطلالة بحرية",
    city: "كيب تاون",
    province: "الكيب الغربية",
    descriptionAr: "استوديو مستقل قريب من الساحل، مناسب لطالب واحد.",
    monthlyPriceZar: 8200,
    roomType: "studio",
    furnished: 1,
    distanceToAirport: "12 دقيقة بالسيارة",
    wifi: 1,
    status: "published",
  },
];

const insertAcc = db.prepare(`
  INSERT OR REPLACE INTO accommodations
  (id, slug, name_ar, city, province, description_ar, monthly_price_zar,
   room_type, furnished, distance_to_airport, wifi, status, created_at, updated_at)
  VALUES (@id, @slug, @nameAr, @city, @province, @descriptionAr, @monthlyPriceZar,
   @roomType, @furnished, @distanceToAirport, @wifi, @status, @createdAt, @updatedAt)
`);

for (const a of accommodations) {
  insertAcc.run({ id: randomUUID(), createdAt: now, updatedAt: now, ...a });
}

console.log(`Seeded ${schools.length} flight schools and ${accommodations.length} accommodations.`);
db.close();
