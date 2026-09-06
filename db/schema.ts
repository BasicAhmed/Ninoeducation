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
  priceMinZar: integer("price_min_zar").notNull(),
  priceMaxZar: integer("price_max_zar").notNull(),
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
  monthlyPriceZar: integer("monthly_price_zar").notNull(),
  roomType: text("room_type").notNull(), // private | shared | studio
  furnished: boolean("furnished").notNull().default(true),
  distanceToAirport: text("distance_to_airport"),
  wifi: boolean("wifi").notNull().default(true),
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
  referenceCode: text("reference_code").unique(), // e.g. NE26-4821 — the applicant's trackable "flight number". Nullable so this migrates safely onto existing rows; every new insert always sets it.
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
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
