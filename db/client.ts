import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// Supabase's pooled connection (port 6543 / pgbouncer) is used here, which
// is required for serverless environments like Vercel. Transaction-mode
// pooling doesn't support prepared statements, hence `prepare: false`.
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add your Supabase connection string to .env (local) or your hosting provider's environment variables (production)."
  );
}

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
