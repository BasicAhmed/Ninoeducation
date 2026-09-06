CREATE TABLE "accommodations" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_ar" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"description_ar" text NOT NULL,
	"monthly_price_zar" integer NOT NULL,
	"room_type" text NOT NULL,
	"furnished" boolean DEFAULT true NOT NULL,
	"distance_to_airport" text,
	"wifi" boolean DEFAULT true NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	CONSTRAINT "accommodations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"nationality" text NOT NULL,
	"phone" text NOT NULL,
	"whatsapp" text,
	"email" text NOT NULL,
	"current_license" text,
	"desired_license" text NOT NULL,
	"estimated_budget" text,
	"preferred_start" text,
	"notes" text,
	"status" text DEFAULT 'new' NOT NULL,
	"flight_school_id" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flight_schools" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_ar" text NOT NULL,
	"name_en" text NOT NULL,
	"province" text NOT NULL,
	"city" text NOT NULL,
	"airport_name" text NOT NULL,
	"airport_code" text NOT NULL,
	"description_ar" text NOT NULL,
	"short_description_ar" text NOT NULL,
	"licenses" text NOT NULL,
	"training_type" text NOT NULL,
	"price_min_zar" integer NOT NULL,
	"price_max_zar" integer NOT NULL,
	"duration_months_min" integer NOT NULL,
	"duration_months_max" integer NOT NULL,
	"accepts_international" boolean DEFAULT true NOT NULL,
	"has_accommodation" boolean DEFAULT false NOT NULL,
	"aircraft_fleet" text NOT NULL,
	"rating" real DEFAULT 4.5 NOT NULL,
	"nino_ranking" integer DEFAULT 0 NOT NULL,
	"website_url" text,
	"hero_image_url" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"last_pricing_update" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	CONSTRAINT "flight_schools_slug_unique" UNIQUE("slug")
);
INSERT INTO flight_schools (id, slug, name_ar, name_en, province, city, airport_name, airport_code, description_ar, short_description_ar, licenses, training_type, price_min_zar, price_max_zar, duration_months_min, duration_months_max, accepts_international, has_accommodation, aircraft_fleet, rating, nino_ranking, website_url, hero_image_url, status, last_pricing_update, created_at, updated_at) VALUES ('e04512cc-0535-41be-b761-25d7621b71c7', 'highveld-flight-academy', 'أكاديمية هايفيلد للطيران', 'Highveld Flight Academy', 'غاوتنغ', 'كروغرسدورب', 'مطار كيتي هوك', 'FAKT', 'تقدم أكاديمية هايفيلد للطيران برامج تدريب متكاملة من الرخصة الخاصة حتى رخصة الطيار التجاري، مع أسطول حديث وتركيز خاص على استقبال الطلاب الدوليين. تقع المدرسة على بعد 40 دقيقة من مطار أو.آر.تامبو الدولي.', 'مدرسة تدريب متكاملة قرب جوهانسبرغ، تستقبل طلابًا دوليين منذ أكثر من 15 عامًا.', 'PPL,CPL,IR,ME,ATPL_THEORY', 'integrated', 480000, 720000, 12, 18, true, true, 'Cessna 172,Piper Seneca,Cirrus SR20', 4.6, 1, NULL, NULL, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO flight_schools (id, slug, name_ar, name_en, province, city, airport_name, airport_code, description_ar, short_description_ar, licenses, training_type, price_min_zar, price_max_zar, duration_months_min, duration_months_max, accepts_international, has_accommodation, aircraft_fleet, rating, nino_ranking, website_url, hero_image_url, status, last_pricing_update, created_at, updated_at) VALUES ('97fb8d1e-6c45-4f02-b8fa-13536ba4574b', 'wonderboom-aviation-college', 'كلية وندربوم للطيران', 'Wonderboom Aviation College', 'غاوتنغ', 'بريتوريا', 'مطار وندربوم', 'FAWB', 'كلية وندربوم للطيران معروفة بمرونة برامجها المعيارية، مما يتيح للطالب البدء بالرخصة الخاصة ثم إكمال بقية الرخص حسب ميزانيته ووقته. تناسب الطلاب الذين يفضلون التحكم في وتيرة تدريبهم.', 'خيار اقتصادي بالقرب من بريتوريا مع برامج تدريب معيارية مرنة.', 'PPL,CPL,IR', 'modular', 350000, 520000, 10, 20, true, false, 'Cessna 152,Cessna 172', 4.3, 2, NULL, NULL, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO flight_schools (id, slug, name_ar, name_en, province, city, airport_name, airport_code, description_ar, short_description_ar, licenses, training_type, price_min_zar, price_max_zar, duration_months_min, duration_months_max, accepts_international, has_accommodation, aircraft_fleet, rating, nino_ranking, website_url, hero_image_url, status, last_pricing_update, created_at, updated_at) VALUES ('d9c8bdba-4668-4187-9c0a-02ef5c78d097', 'cape-winds-flight-training', 'كيب ويندز للتدريب الجوي', 'Cape Winds Flight Training', 'الكيب الغربية', 'كيب تاون', 'مطار فيشوك', 'FAFK', 'تجمع كيب ويندز بين جودة تدريب عالية وموقع ساحلي مميز قرب كيب تاون. تشتهر ببرنامج القياس الآلي القوي (Instrument Rating) وبيئة طيران متنوعة المناخ تُعِد الطالب لظروف تشغيل حقيقية.', 'تدريب في بيئة ساحلية بمعايير طيران عالية على أطراف كيب تاون.', 'PPL,CPL,IR,ME', 'integrated', 560000, 810000, 13, 17, true, true, 'Cessna 172,Beechcraft Duchess', 4.7, 3, NULL, NULL, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO flight_schools (id, slug, name_ar, name_en, province, city, airport_name, airport_code, description_ar, short_description_ar, licenses, training_type, price_min_zar, price_max_zar, duration_months_min, duration_months_max, accepts_international, has_accommodation, aircraft_fleet, rating, nino_ranking, website_url, hero_image_url, status, last_pricing_update, created_at, updated_at) VALUES ('fff3f99c-1b87-436e-83d6-e21acb997b78', 'eastern-cape-wings', 'إيسترن كيب وينغز', 'Eastern Cape Wings', 'الكيب الشرقية', 'بورت إليزابيث', 'مطار بورت إليزابيث', 'FAPE', 'بفضل انخفاض الازدحام الجوي في المنطقة، يحصل طلاب إيسترن كيب وينغز على ساعات طيران فعلية أكثر خلال فترة تدريب أقصر نسبيًا. المدرسة تدعم مسار بناء الساعات (Hour Building) بشكل خاص.', 'أجواء تدريب هادئة بازدحام جوي منخفض، مثالية لبناء الساعات بسرعة.', 'PPL,CPL', 'both', 310000, 470000, 9, 14, true, false, 'Cessna 152,Cessna 172', 4.1, 4, NULL, NULL, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO flight_schools (id, slug, name_ar, name_en, province, city, airport_name, airport_code, description_ar, short_description_ar, licenses, training_type, price_min_zar, price_max_zar, duration_months_min, duration_months_max, accepts_international, has_accommodation, aircraft_fleet, rating, nino_ranking, website_url, hero_image_url, status, last_pricing_update, created_at, updated_at) VALUES ('a1d78354-abb4-41a1-b77b-27abbb3918c9', 'rand-executive-aviation', 'راند إكزيكيوتيف للطيران', 'Rand Executive Aviation', 'غاوتنغ', 'جوهانسبرغ', 'مطار راند', 'FAGM', 'تقع راند إكزيكيوتيف داخل مجمع مطار راند التاريخي، وتوفر تدريبًا على مستوى عالٍ من الاحترافية مع أسطول يشمل طائرات تدريب متعددة المحركات لمرحلة الرخصة التجارية وما بعدها.', 'مدرسة تدريب رفيعة المستوى قرب وسط جوهانسبرغ بأسطول حديث نسبيًا.', 'PPL,CPL,IR,ME,ATPL_THEORY', 'integrated', 610000, 890000, 14, 19, true, true, 'Cessna 172,Piper Seneca,Beechcraft Baron', 4.8, 5, NULL, NULL, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO flight_schools (id, slug, name_ar, name_en, province, city, airport_name, airport_code, description_ar, short_description_ar, licenses, training_type, price_min_zar, price_max_zar, duration_months_min, duration_months_max, accepts_international, has_accommodation, aircraft_fleet, rating, nino_ranking, website_url, hero_image_url, status, last_pricing_update, created_at, updated_at) VALUES ('1a7be076-0e99-4e48-bbfd-1c57d53dbe54', 'sunbird-flying-school', 'صنبيرد لتعليم الطيران', 'Sunbird Flying School', 'مبومالانغا', 'نيلسبرويت', 'مطار نيلسبرويت', 'FANS', 'خيار ميسور التكلفة نسبيًا لمن يريد البدء برخصة الطيران الخاصة (PPL) دون التزام مالي كبير في البداية، مع إمكانية الانتقال لاحقًا إلى مدرسة أخرى لإكمال الرخصة التجارية.', 'أرخص خيار متاح حاليًا لبرنامج الرخصة الخاصة، بدون سكن مدمج.', 'PPL', 'modular', 180000, 260000, 4, 8, true, false, 'Cessna 152', 3.9, 6, NULL, NULL, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO accommodations (id, slug, name_ar, city, province, description_ar, monthly_price_zar, room_type, furnished, distance_to_airport, wifi, status, created_at, updated_at) VALUES ('bb4dd249-fd8e-4b36-9c58-259970b160fc', 'kroon-student-residence', 'سكن كرون للطلاب', 'كروغرسدورب', 'غاوتنغ', 'غرف مفروشة قريبة من مطار كيتي هوك، مع مطبخ ومناطق مشتركة.', 6500, 'private', true, '10 دقائق بالسيارة', true, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO accommodations (id, slug, name_ar, city, province, description_ar, monthly_price_zar, room_type, furnished, distance_to_airport, wifi, status, created_at, updated_at) VALUES ('c3851701-dd67-4233-8da5-553a5672968b', 'wonderboom-shared-house', 'منزل مشترك - وندربوم', 'بريتوريا', 'غاوتنغ', 'غرف مشتركة اقتصادية لطلاب الطيران، على بعد دقائق من المدرسة.', 3800, 'shared', true, '8 دقائق بالسيارة', true, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;
INSERT INTO accommodations (id, slug, name_ar, city, province, description_ar, monthly_price_zar, room_type, furnished, distance_to_airport, wifi, status, created_at, updated_at) VALUES ('b84949b6-20f5-4ae4-9625-c140b8c9b220', 'fish-hoek-seaview-studio', 'استوديو فيشوك بإطلالة بحرية', 'كيب تاون', 'الكيب الغربية', 'استوديو مستقل قريب من الساحل، مناسب لطالب واحد.', 8200, 'studio', true, '12 دقيقة بالسيارة', true, 'published', '2026-09-05T13:25:15.796Z', '2026-09-05T13:25:15.796Z') ON CONFLICT (slug) DO NOTHING;

-- Added: social_posts table (Instagram feed section, manually curated)
CREATE TABLE "social_posts" (
	"id" text PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"caption" text NOT NULL,
	"permalink" text NOT NULL,
	"likes" integer,
	"display_order" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);

-- Added: storage policies for the "social" bucket (Instagram photo uploads).
-- First create the bucket in the dashboard: Storage -> New bucket -> name
-- it "social" -> toggle "Public bucket" on. Then run this to allow the
-- admin panel (using the anon key) to upload into it:
create policy "Public read access on social bucket"
on storage.objects for select
using ( bucket_id = 'social' );

create policy "Allow uploads to social bucket"
on storage.objects for insert
with check ( bucket_id = 'social' );

-- Added: optional intake-date / seats-available fields on flight_schools
-- (real urgency signals — leave NULL until a school confirms actual data;
-- the UI only shows these when they're set, never invented numbers)
ALTER TABLE "flight_schools" ADD COLUMN "next_intake_date" text;
ALTER TABLE "flight_schools" ADD COLUMN "seats_available" integer;

-- Added: trackable "flight number" reference code per application
-- (nullable so it migrates safely onto existing rows — every new
-- submission from now on always sets one)
ALTER TABLE "applications" ADD COLUMN "reference_code" text;
ALTER TABLE "applications" ADD CONSTRAINT "applications_reference_code_unique" UNIQUE("reference_code");

-- Added: deeper lead-qualification fields on applications (all
-- nullable — safe on existing rows)
ALTER TABLE "applications" ADD COLUMN "current_residence" text;
ALTER TABLE "applications" ADD COLUMN "english_level" text;
ALTER TABLE "applications" ADD COLUMN "funding_source" text;
ALTER TABLE "applications" ADD COLUMN "accommodation_budget_ok" text;
ALTER TABLE "applications" ADD COLUMN "medical_concern" text;
