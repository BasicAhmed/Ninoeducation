CREATE TABLE "consultation_bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp" text NOT NULL,
	"reference_code" text,
	"application_id" text,
	"preferred_date" text NOT NULL,
	"preferred_time" text NOT NULL,
	"topic" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"admin_notes" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
