import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import * as schema from "./schema";

// NOTE: file-based SQLite is great for local dev and small/self-hosted
// deployments (a VPS, Docker container, Railway/Render with a persistent
// disk), but will NOT persist data on serverless platforms like Vercel,
// where the filesystem resets on every deploy/cold start. Before going to
// production on Vercel, swap this file for a hosted Postgres connection
// (Neon/Supabase) — the Drizzle query code in the rest of the app does not
// need to change, only this client and the schema's column types.

const sqlite = new Database(path.join(process.cwd(), "nino.db"));
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
