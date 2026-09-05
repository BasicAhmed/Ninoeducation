import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getPublishedSocialPosts(limit = 6) {
  const rows = await db
    .select()
    .from(socialPosts)
    .where(eq(socialPosts.status, "published"))
    .orderBy(asc(socialPosts.displayOrder));
  return rows.slice(0, limit);
}
