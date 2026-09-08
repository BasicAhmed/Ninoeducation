"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { saveAccommodation } from "@/lib/admin-actions";
import { supabaseBrowser, SOCIAL_BUCKET } from "@/lib/supabase-browser";

type Accommodation = {
  id: string;
  slug: string;
  nameAr: string;
  city: string;
  province: string;
  descriptionAr: string;
  priceMinUsd: number;
  priceMaxUsd: number;
  roomType: string;
  furnished: boolean;
  distanceToAirport: string | null;
  wifi: boolean;
  imageUrls?: string | null;
  status: string;
};

export function AccommodationForm({ item }: { item?: Accommodation }) {
  const [images, setImages] = useState<string[]>(() =>
    item?.imageUrls ? item.imageUrls.split(",").filter(Boolean) : []
  );
  const [uploading, setUploading] = useState(false);

  async function handleImageAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `accommodation/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabaseBrowser.storage
        .from(SOCIAL_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (!error) {
        const { data: pub } = supabaseBrowser.storage.from(SOCIAL_BUCKET).getPublicUrl(path);
        uploaded.push(pub.publicUrl);
      }
    }
    setImages((imgs) => [...imgs, ...uploaded]);
    setUploading(false);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((imgs) => imgs.filter((u) => u !== url));
  }

  return (
    <form action={saveAccommodation} className="space-y-6">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="imageUrls" value={images.join(",")} />

      <div>
        <label className="block text-sm font-medium">معرض الصور</label>
        <p className="mt-1 text-xs text-nino-ink/50">
          الصورة الأولى هي صورة الغلاف المعروضة في القوائم.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-nino-line bg-nino-cream">
              <Image src={url} alt="" fill unoptimized className="object-cover" />
              {i === 0 && (
                <span className="absolute bottom-1 start-1 rounded-full bg-nino-ink/80 px-2 py-0.5 text-[10px] text-white">
                  غلاف
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute end-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-nino-ink/70 text-white hover:bg-red-500"
              >
                <X size={13} />
              </button>
            </div>
          ))}
          <label className="flex h-24 w-32 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-nino-line bg-nino-cream text-xs text-nino-ink/50 hover:border-nino-orange hover:text-nino-orange">
            {uploading ? "جارٍ الرفع..." : "+ إضافة صور"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageAdd}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">اسم السكن</label>
          <input
            name="nameAr"
            defaultValue={item?.nameAr}
            required
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">الرابط (slug)</label>
          <input
            name="slug"
            defaultValue={item?.slug}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">المدينة</label>
          <input
            name="city"
            defaultValue={item?.city}
            required
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">المقاطعة</label>
          <input
            name="province"
            defaultValue={item?.province}
            required
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">الوصف</label>
        <textarea
          name="descriptionAr"
          defaultValue={item?.descriptionAr}
          rows={3}
          required
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium">أقل سعر شهري (دولار)</label>
          <input
            type="number"
            name="priceMinUsd"
            defaultValue={item?.priceMinUsd}
            required
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">أعلى سعر شهري (دولار)</label>
          <input
            type="number"
            name="priceMaxUsd"
            defaultValue={item?.priceMaxUsd}
            required
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">نوع الغرفة</label>
          <select
            name="roomType"
            defaultValue={item?.roomType || "private"}
            className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
          >
            <option value="private">غرفة خاصة</option>
            <option value="shared">غرفة مشتركة</option>
            <option value="studio">استوديو</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">المسافة إلى المطار</label>
        <input
          name="distanceToAirport"
          defaultValue={item?.distanceToAirport ?? ""}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="furnished" defaultChecked={item?.furnished ?? true} className="h-4 w-4 accent-orange-600" />
          مفروشة
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="wifi" defaultChecked={item?.wifi ?? true} className="h-4 w-4 accent-orange-600" />
          واي فاي
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">الحالة</label>
        <select
          name="status"
          defaultValue={item?.status || "draft"}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm md:w-1/2"
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
