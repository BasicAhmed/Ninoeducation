UPDATE "accommodations" SET "price_min_zar" = "monthly_price_zar", "price_max_zar" = "monthly_price_zar" WHERE "price_min_zar" IS NULL;--> statement-breakpoint
ALTER TABLE "accommodations" ALTER COLUMN "price_min_zar" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accommodations" ALTER COLUMN "price_max_zar" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accommodations" DROP COLUMN "monthly_price_zar";