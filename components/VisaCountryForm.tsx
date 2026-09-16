"use client";

import { useState } from "react";
import { saveVisaCountry } from "@/lib/admin-actions";

type VisaCountry = {
  id: string;
  countryNameAr: string;
  countryNameEn: string;
  hasEmbassy: boolean;
  embassyName: string | null;
  embassyEmail: string | null;
  embassyAddress: string | null;
  embassyMapsUrl: string | null;
  usesVfs: boolean;
  vfsWebsite: string | null;
  vfsAddress: string | null;
  vfsMapsUrl: string | null;
  noDirectOption: boolean;
  alternativeCountryNote: string | null;
  additionalDocumentsNote: string | null;
  status: string;
  lastVerifiedAt: string;
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm";

export function VisaCountryForm({ country }: { country?: VisaCountry }) {
  const [hasEmbassy, setHasEmbassy] = useState(country?.hasEmbassy ?? false);
  const [usesVfs, setUsesVfs] = useState(country?.usesVfs ?? false);
  const [noDirectOption, setNoDirectOption] = useState(country?.noDirectOption ?? false);

  return (
    <form action={saveVisaCountry} className="max-w-2xl space-y-8">
      {country && <input type="hidden" name="id" value={country.id} />}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        هذي المعلومات تظهر مباشرة للطلاب لمعرفة كيف يقدّمون على التأشيرة — تأكد من دقتها قبل النشر،
        وحدّث تاريخ آخر مراجعة كل ما تتأكد إنها لسه صحيحة.
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">اسم الدولة (عربي)</label>
          <input name="countryNameAr" defaultValue={country?.countryNameAr} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium">اسم الدولة (إنجليزي)</label>
          <input name="countryNameEn" defaultValue={country?.countryNameEn} required dir="ltr" className={inputClass} />
        </div>
      </div>

      {/* Embassy section */}
      <div className="rounded-2xl border border-nino-line p-5">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="hasEmbassy"
            defaultChecked={hasEmbassy}
            onChange={(e) => setHasEmbassy(e.target.checked)}
            className="h-4 w-4"
          />
          يوجد سفارة/قنصلية جنوب أفريقية في هذي الدولة
        </label>
        {hasEmbassy && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">اسم السفارة</label>
              <input name="embassyName" defaultValue={country?.embassyName ?? ""} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium">إيميل حجز الموعد</label>
              <input
                name="embassyEmail"
                defaultValue={country?.embassyEmail ?? ""}
                dir="ltr"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">العنوان الكامل</label>
              <textarea
                name="embassyAddress"
                defaultValue={country?.embassyAddress ?? ""}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">رابط الموقع على Google Maps</label>
              <input
                name="embassyMapsUrl"
                defaultValue={country?.embassyMapsUrl ?? ""}
                dir="ltr"
                placeholder="https://www.google.com/maps/search/?api=1&query=..."
                className={inputClass}
              />
            </div>
          </div>
        )}
      </div>

      {/* VFS section */}
      <div className="rounded-2xl border border-nino-line p-5">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="usesVfs"
            defaultChecked={usesVfs}
            onChange={(e) => setUsesVfs(e.target.checked)}
            className="h-4 w-4"
          />
          التقديم يتم عبر مركز VFS Global (بدل السفارة مباشرة)
        </label>
        {usesVfs && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">رابط موقع VFS للحجز</label>
              <input name="vfsWebsite" defaultValue={country?.vfsWebsite ?? ""} dir="ltr" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium">عنوان مركز VFS</label>
              <textarea
                name="vfsAddress"
                defaultValue={country?.vfsAddress ?? ""}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">رابط الموقع على Google Maps</label>
              <input name="vfsMapsUrl" defaultValue={country?.vfsMapsUrl ?? ""} dir="ltr" className={inputClass} />
            </div>
          </div>
        )}
      </div>

      {/* No direct option */}
      <div className="rounded-2xl border border-nino-line p-5">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="noDirectOption"
            defaultChecked={noDirectOption}
            onChange={(e) => setNoDirectOption(e.target.checked)}
            className="h-4 w-4"
          />
          لا يوجد سفارة ولا VFS — الطالب يحتاج يقدّم من دولة ثانية
        </label>
        {noDirectOption && (
          <div className="mt-4">
            <label className="block text-sm font-medium">وضّح للطالب وين يقدّم بدلًا من ذلك</label>
            <textarea
              name="alternativeCountryNote"
              defaultValue={country?.alternativeCountryNote ?? ""}
              rows={3}
              placeholder="مثلًا: يمكنك التقديم من السفارة الجنوب أفريقية في الإمارات..."
              className={inputClass}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">ملاحظات مستندات إضافية خاصة بهذي الدولة (اختياري)</label>
        <textarea
          name="additionalDocumentsNote"
          defaultValue={country?.additionalDocumentsNote ?? ""}
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">تاريخ آخر مراجعة للمعلومات</label>
          <input
            type="date"
            name="lastVerifiedAt"
            defaultValue={country?.lastVerifiedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">الحالة</label>
          <select name="status" defaultValue={country?.status || "draft"} className={inputClass}>
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>
        </div>
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
