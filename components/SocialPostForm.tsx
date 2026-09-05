import { saveSocialPost } from "@/lib/admin-actions";

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
  return (
    <form action={saveSocialPost} className="max-w-xl space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label className="block text-sm font-medium">رابط الصورة</label>
        <input
          name="imageUrl"
          defaultValue={post?.imageUrl}
          required
          placeholder="https://..."
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
        <p className="mt-1 text-xs text-nino-ink/50">
          ارفع الصورة إلى أي مستضيف صور (مثل Supabase Storage) والصق الرابط هنا.
        </p>
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
        className="rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange"
      >
        حفظ
      </button>
    </form>
  );
}
