UPDATE "accommodations" SET "price_min_usd" = ROUND("price_min_zar" * 0.054), "price_max_usd" = ROUND("price_max_zar" * 0.054) WHERE "price_min_usd" IS NULL;--> statement-breakpoint
UPDATE "flight_schools" SET "price_min_usd" = ROUND("price_min_zar" * 0.054), "price_max_usd" = ROUND("price_max_zar" * 0.054) WHERE "price_min_usd" IS NULL;--> statement-breakpoint
ALTER TABLE "accommodations" ALTER COLUMN "price_min_usd" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accommodations" ALTER COLUMN "price_max_usd" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flight_schools" ALTER COLUMN "price_min_usd" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flight_schools" ALTER COLUMN "price_max_usd" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accommodations" DROP COLUMN "price_min_zar";--> statement-breakpoint
ALTER TABLE "accommodations" DROP COLUMN "price_max_zar";--> statement-breakpoint
ALTER TABLE "flight_schools" DROP COLUMN "price_min_zar";--> statement-breakpoint
ALTER TABLE "flight_schools" DROP COLUMN "price_max_zar";