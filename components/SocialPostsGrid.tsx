"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteSocialPost } from "@/lib/admin-actions";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";

type Post = {
  id: string;
  imageUrl: string;
  caption: string;
  status: string;
};

export function SocialPostsGrid({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.caption.toLowerCase().includes(q));
  }, [posts, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
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

      {posts.length > 4 && (
        <div className="mt-6">
          <AdminSearchBar value={query} onChange={setQuery} placeholder="ابحث في التعليقات..." />
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
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
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-nino-line p-10 text-center text-nino-ink/60">
            {posts.length === 0 ? "لا توجد منشورات بعد." : "لا توجد نتائج مطابقة"}
          </p>
        )}
      </div>
    </div>
  );
}
