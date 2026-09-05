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
