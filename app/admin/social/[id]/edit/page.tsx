import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SocialPostForm } from "@/components/SocialPostForm";

export default async function EditSocialPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await db.select().from(socialPosts).where(eq(socialPosts.id, id)).limit(1);
  const post = rows[0];
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">تعديل المنشور</h1>
      <div className="mt-8">
        <SocialPostForm post={post} />
      </div>
    </div>
  );
}
