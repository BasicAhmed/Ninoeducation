ALTER TABLE "applications" ADD COLUMN "reference_code" text;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_reference_code_unique" UNIQUE("reference_code");