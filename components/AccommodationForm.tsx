import { saveAccommodation } from "@/lib/admin-actions";

type Accommodation = {
  id: string;
  slug: string;
  nameAr: string;
  city: string;
  province: string;
  descriptionAr: string;
  monthlyPriceZar: number;
  roomType: string;
  furnished: boolean;
  distanceToAirport: string | null;
  wifi: boolean;
  status: string;
};

export function AccommodationForm({ item }: { item?: Accommodation }) {
  return (
    <form action={saveAccommodation} className="space-y-6">
      {item && <input type="hidden" name="id" value={item.id} />}

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

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">السعر الشهري (راند)</label>
          <input
            type="number"
            name="monthlyPriceZar"
            defaultValue={item?.monthlyPriceZar}
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
