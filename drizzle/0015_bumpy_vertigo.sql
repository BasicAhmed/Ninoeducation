CREATE TABLE "visa_countries" (
	"id" text PRIMARY KEY NOT NULL,
	"country_name_ar" text NOT NULL,
	"country_name_en" text NOT NULL,
	"has_embassy" boolean DEFAULT false NOT NULL,
	"embassy_name" text,
	"embassy_email" text,
	"embassy_address" text,
	"embassy_maps_url" text,
	"uses_vfs" boolean DEFAULT false NOT NULL,
	"vfs_website" text,
	"vfs_address" text,
	"vfs_maps_url" text,
	"no_direct_option" boolean DEFAULT false NOT NULL,
	"alternative_country_note" text,
	"additional_documents_note" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"last_verified_at" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visa_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"country_id" text,
	"step1_appointment_booked" boolean DEFAULT false NOT NULL,
	"step2_location_confirmed" boolean DEFAULT false NOT NULL,
	"documents_checked" text DEFAULT '[]' NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	CONSTRAINT "visa_progress_email_unique" UNIQUE("email")
);
