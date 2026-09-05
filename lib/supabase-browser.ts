import { createClient } from "@supabase/supabase-js";

// Client-side only. Uses the public anon key — safe to expose in the
// browser bundle. Storage access is scoped by bucket policies in
// Supabase (see supabase/setup.sql), not by this key.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const SOCIAL_BUCKET = "social";
