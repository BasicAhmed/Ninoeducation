"use client";

import { useState } from "react";
import Image from "next/image";
import { saveSocialPost } from "@/lib/admin-actions";
import { supabaseBrowser, SOCIAL_BUCKET } from "@/lib/supabase-browser";

type SocialPost = {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  likes: number | null;
  displayOrder: number;
  status: string;
};

export function SocialPostForm({ post }: { post?: SocialPost }) {
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseBrowser.storage
      .from(SOCIAL_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError("فشل رفع الصورة: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabaseBrowser.storage.from(SOCIAL_BUCKET).getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <form action={saveSocialPost} className="max-w-xl space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="imageUrl" value={imageUrl} required />

      <div>
        <label className="block text-sm font-medium">الصورة</label>
        <div className="mt-1.5 flex items-center gap-4">
          {imageUrl ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-nino-line bg-nino-cream">
              <Image src={imageUrl} alt="معاينة" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-nino-line bg-nino-cream text-xs text-nino-ink/40">
              لا صورة
            </div>
          )}
          <div>
            <label className="cursor-pointer rounded-full border border-nino-ink/20 px-4 py-2 text-sm font-medium hover:border-nino-ink">
              {uploading ? "جارٍ الرفع..." : imageUrl ? "تغيير الصورة" : "اختر صورة"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">التعليق (Caption)</label>
        <textarea
          name="caption"
          defaultValue={post?.caption}
          rows={3}
          required
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">رابط المنشور على إنستقرام</label>
        <input
          name="permalink"
          defaultValue={post?.permalink}
          required
          placeholder="https://www.instagram.com/p/..."
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">عدد الإعجابات (اختياري)</label>
          <input
            type="number"
            name="likes"
            defaultValue={post?.likes ?? ""}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ترتيب العرض (0 = أول واحد)</label>
          <input
            type="number"
            name="displayOrder"
            defaultValue={post?.displayOrder ?? 0}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">الحالة</label>
        <select
          name="status"
          defaultValue={post?.status || "draft"}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm sm:w-1/2"
        >
          <option value="draft">مسودة</option>
          <option value="published">منشور</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={uploading || !imageUrl}
        className="rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange disabled:opacity-40"
      >
        حفظ
      </button>
    </form>
  );
}
