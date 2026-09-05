import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { asc } from "drizzle-orm";
import { SocialPostsGrid } from "@/components/SocialPostsGrid";

export default async function AdminSocialPage() {
  const posts = await db.select().from(socialPosts).orderBy(asc(socialPosts.displayOrder));
  return <SocialPostsGrid posts={posts} />;
}
