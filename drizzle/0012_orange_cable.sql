CREATE TABLE "application_drafts" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"nationality" text,
	"phone" text,
	"whatsapp" text,
	"desired_license" text,
	"estimated_budget" text,
	"last_step" integer NOT NULL,
	"preferred_lang" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	CONSTRAINT "application_drafts_email_unique" UNIQUE("email")
);
