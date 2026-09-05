import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getPublishedSocialPosts(limit = 6) {
  try {
    const rows = await db
      .select()
      .from(socialPosts)
      .where(eq(socialPosts.status, "published"))
      .orderBy(asc(socialPosts.displayOrder));
    return rows.slice(0, limit);
  } catch (err) {
    // Don't let a missing table, a DB hiccup, or a stale build-time
    // connection take down the whole homepage — the Instagram section
    // is decorative, not critical. Log it so it's still visible in
    // Vercel's function logs.
    console.error("getPublishedSocialPosts failed:", err);
    return [];
  }
}
