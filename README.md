# Nino Education — Web Platform

Aviation education platform for Nino Education, helping Arab and Indian
students find, compare, and apply to flight schools in South Africa.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Drizzle ORM over Postgres (Supabase), via `postgres` (pure JS driver — no
  native binaries, works everywhere including serverless)
- Brand tokens: `#fe5200` (Nino Orange), `#0b0d0f` (ink), `#f6f4f1` (cream), white
- IBM Plex Sans Arabic, full RTL — site is Arabic-first

## Database setup (Supabase)
1. Create a Supabase project.
2. In the SQL Editor, run `supabase/setup.sql` once — it creates all tables
   and inserts placeholder seed data (6 sample flight schools, 3 sample
   accommodation listings). Replace the seed data with real partner info
   before launch via the admin dashboard.
3. Copy `.env.example` to `.env` and set `DATABASE_URL` to your Supabase
   **transaction pooler** connection string (port 6543) and a real
   `ADMIN_PASSWORD`.
4. In production (Vercel etc.), set the same two env vars in the hosting
   provider's dashboard.

## Local dev
```
npm install
npm run dev
```

To re-seed locally (only needed once against a fresh database — the SQL
editor route above is the primary path):
```
npm run db:seed
```

## Status
Built: flight school directory + filters + comparison, school profiles,
accommodation directory + profiles, application system, cost calculator,
"Find My School" quiz, full admin dashboard (schools/accommodation CRUD,
applications with status workflow), cookie-gated admin auth.

Not yet built: auto-fetch school info by name (admin), programmatic SEO
pages per city/course, structured data/schema markup, sitemap.xml,
English locale for Indian students, real authentication for admin (current
cookie-password gate is fine for internal use only, not production-grade).

Known limitations:
- Admin auth is a simple password cookie — replace with real auth before
  handling real student data at scale.
- WhatsApp links use a placeholder number — search/replace
  `000000000000` in `components/SiteFooter.tsx` and
  `app/schools/[slug]/page.tsx` with the real number.
