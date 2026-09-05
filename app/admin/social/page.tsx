import Link from "next/link";
import Image from "next/image";
import { db } from "@/db/client";
import { socialPosts } from "@/db/schema";
import { asc } from "drizzle-orm";
import { deleteSocialPost } from "@/lib/admin-actions";

export default async function AdminSocialPage() {
  const posts = await db.select().from(socialPosts).orderBy(asc(socialPosts.displayOrder));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">منشورات إنستقرام</h1>
          <p className="mt-1 text-sm text-nino-ink/60">
            أضف آخر 6 منشورات يدويًا لعرضها في قسم &quot;تابعنا&quot; على الصفحة الرئيسية.
          </p>
        </div>
        <Link
          href="/admin/social/new"
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة منشور
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
            <div className="relative aspect-square bg-nino-cream">
              {p.imageUrl && (
                <Image src={p.imageUrl} alt={p.caption} fill className="object-cover" unoptimized />
              )}
              <span
                className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-xs ${
                  p.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {p.status === "published" ? "منشور" : "مسودة"}
              </span>
            </div>
            <div className="p-4">
              <p className="line-clamp-2 text-sm text-nino-ink/70">{p.caption}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <Link href={`/admin/social/${p.id}/edit`} className="text-nino-orange hover:underline">
                  تعديل
                </Link>
                <form action={deleteSocialPost}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="text-red-500 hover:underline">حذف</button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
            لا توجد منشورات بعد.
          </p>
        )}
      </div>
    </div>
  );
}
