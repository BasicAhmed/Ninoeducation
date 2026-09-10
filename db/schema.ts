import { pgTable, text, integer, real, boolean } from "drizzle-orm/pg-core";

export const flightSchools = pgTable("flight_schools", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  province: text("province").notNull(),
  city: text("city").notNull(),
  airportName: text("airport_name").notNull(),
  airportCode: text("airport_code").notNull(),
  descriptionAr: text("description_ar").notNull(),
  shortDescriptionAr: text("short_description_ar").notNull(),
  licenses: text("licenses").notNull(), // comma-separated: PPL,CPL,IR,ME,ATPL_THEORY
  trainingType: text("training_type").notNull(), // integrated | modular | both
  priceMinUsd: integer("price_min_usd").notNull(),
  priceMaxUsd: integer("price_max_usd").notNull(),
  durationMonthsMin: integer("duration_months_min").notNull(),
  durationMonthsMax: integer("duration_months_max").notNull(),
  acceptsInternational: boolean("accepts_international").notNull().default(true),
  hasAccommodation: boolean("has_accommodation").notNull().default(false),
  aircraftFleet: text("aircraft_fleet").notNull(), // comma-separated
  rating: real("rating").notNull().default(4.5),
  ninoRanking: integer("nino_ranking").notNull().default(0),
  websiteUrl: text("website_url"),
  heroImageUrl: text("hero_image_url"),
  status: text("status").notNull().default("draft"), // draft | published
  lastPricingUpdate: text("last_pricing_update").notNull(),
  nextIntakeDate: text("next_intake_date"), // optional — only shown if the school confirms a real date
  seatsAvailable: integer("seats_available"), // optional — only shown if the school confirms a real count
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const accommodations = pgTable("accommodations", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  descriptionAr: text("description_ar").notNull(),
  priceMinUsd: integer("price_min_usd").notNull(),
  priceMaxUsd: integer("price_max_usd").notNull(),
  roomType: text("room_type").notNull(), // private | shared | studio
  furnished: boolean("furnished").notNull().default(true),
  distanceToAirport: text("distance_to_airport"),
  wifi: boolean("wifi").notNull().default(true),
  imageUrls: text("image_urls"), // comma-separated gallery image URLs, first is the cover
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const applications = pgTable("applications", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  nationality: text("nationality").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp"),
  email: text("email").notNull(),
  currentLicense: text("current_license"),
  desiredLicense: text("desired_license").notNull(),
  estimatedBudget: text("estimated_budget"),
  preferredStart: text("preferred_start"),
  notes: text("notes"),
  status: text("status").notNull().default("new"),
  flightSchoolId: text("flight_school_id"),
  accommodationId: text("accommodation_id"), // assigned by admin from the real accommodations list
  referenceCode: text("reference_code").unique(), // e.g. NE26-4821 — the applicant's trackable "flight number". Nullable so this migrates safely onto existing rows; every new insert always sets it.
  currentResidence: text("current_residence"), // city/country they currently live in — distinct from nationality
  englishLevel: text("english_level"), // beginner | intermediate | good | fluent
  fundingSource: text("funding_source"), // personal_savings | family_support | loan | undecided
  accommodationBudgetOk: text("accommodation_budget_ok"), // yes | no | unsure — does their budget also cover accommodation
  medicalConcern: text("medical_concern"), // no | unsure | yes — self-reported flag for aviation medical fitness, not details
  applicantType: text("applicant_type"), // student | parent — who is filling out the form
  ageGroup: text("age_group"), // under_18 | 18_24 | 25_34 | 35_plus
  educationStatus: text("education_status"), // high_school_student | high_school_grad | university_student | university_grad
  preferredLang: text("preferred_lang"), // ar | en — the language they filled out the apply form in, so status-update emails match
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Audit trail per application — every status change, school/accommodation
// assignment, and creation gets a row here. This is the foundation for
// future automation (e.g. an automated email triggered when status
// changes to "accepted"), not just a display feature: anything that
// wants to react to application changes can read from this table
// instead of polling for diffs.
export const applicationEvents = pgTable("application_events", {
  id: text("id").primaryKey(),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // created | status_change | school_assigned | accommodation_assigned
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

// Captures an in-progress apply-wizard session once the visitor has
// given us enough to act on (contact info), before they necessarily
// finish. This is deliberately a separate table from `applications`
// rather than relaxing that table's NOT NULL constraints — a draft
// is a fundamentally different kind of record (transient, partial,
// pre-conversion) and shouldn't weaken the integrity guarantees the
// admin panel relies on for real submitted applications. One row per
// email (upserted as the wizard progresses); deleted the moment the
// visitor actually completes submitApplication, so this table always
// represents "currently abandoned, not yet submitted" — no separate
// converted/abandoned flag needed.
export const applicationDrafts = pgTable("application_drafts", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  nationality: text("nationality"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  desiredLicense: text("desired_license"),
  estimatedBudget: text("estimated_budget"),
  lastStep: integer("last_step").notNull(), // wizard step index reached, for admin context ("got to step 4 of 7")
  preferredLang: text("preferred_lang"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Magic-link tokens for the student dashboard's passwordless login.
// A token is single-use (usedAt gets set on consumption) and
// short-lived (expiresAt) — the dashboard itself only ever trusts the
// signed session cookie set after a token is verified, never the
// token itself past that point.
export const loginTokens = pgTable("login_tokens", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: text("expires_at").notNull(),
  usedAt: text("used_at"),
  createdAt: text("created_at").notNull(),
});

export const socialPosts = pgTable("social_posts", {
  id: text("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption").notNull(),
  permalink: text("permalink").notNull(), // link to the actual Instagram post
  likes: integer("likes"),
  displayOrder: integer("display_order").notNull().default(0),
  status: text("status").notNull().default("draft"), // draft | published
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
