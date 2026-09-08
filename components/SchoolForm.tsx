"use client";

import { useState } from "react";
import Image from "next/image";
import { saveSchool } from "@/lib/admin-actions";
import { supabaseBrowser, SOCIAL_BUCKET } from "@/lib/supabase-browser";

type School = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  province: string;
  city: string;
  airportName: string;
  airportCode: string;
  descriptionAr: string;
  shortDescriptionAr: string;
  licenses: string;
  trainingType: string;
  priceMinUsd: number;
  priceMaxUsd: number;
  durationMonthsMin: number;
  durationMonthsMax: number;
  acceptsInternational: boolean;
  hasAccommodation: boolean;
  aircraftFleet: string;
  rating: number;
  ninoRanking: number;
  websiteUrl: string | null;
  heroImageUrl?: string | null;
  nextIntakeDate?: string | null;
  seatsAvailable?: number | null;
  status: string;
};

const emptyForm = {
  nameAr: "",
  nameEn: "",
  slug: "",
  province: "",
  city: "",
  airportName: "",
  airportCode: "",
  shortDescriptionAr: "",
  descriptionAr: "",
  licenses: "",
  trainingType: "integrated",
  priceMinUsd: "",
  priceMaxUsd: "",
  durationMonthsMin: "",
  durationMonthsMax: "",
  aircraftFleet: "",
  rating: "4.5",
  ninoRanking: "0",
  websiteUrl: "",
  heroImageUrl: "",
  nextIntakeDate: "",
  seatsAvailable: "",
  acceptsInternational: true,
  hasAccommodation: false,
  status: "draft",
};

type FormState = typeof emptyForm;

function schoolToForm(school?: School): FormState {
  if (!school) return emptyForm;
  return {
    nameAr: school.nameAr,
    nameEn: school.nameEn,
    slug: school.slug,
    province: school.province,
    city: school.city,
    airportName: school.airportName,
    airportCode: school.airportCode,
    shortDescriptionAr: school.shortDescriptionAr,
    descriptionAr: school.descriptionAr,
    licenses: school.licenses,
    trainingType: school.trainingType,
    priceMinUsd: String(school.priceMinUsd ?? ""),
    priceMaxUsd: String(school.priceMaxUsd ?? ""),
    durationMonthsMin: String(school.durationMonthsMin ?? ""),
    durationMonthsMax: String(school.durationMonthsMax ?? ""),
    aircraftFleet: school.aircraftFleet,
    rating: String(school.rating ?? "4.5"),
    ninoRanking: String(school.ninoRanking ?? "0"),
    websiteUrl: school.websiteUrl ?? "",
    heroImageUrl: school.heroImageUrl ?? "",
    nextIntakeDate: school.nextIntakeDate ?? "",
    seatsAvailable: school.seatsAvailable != null ? String(school.seatsAvailable) : "",
    acceptsInternational: school.acceptsInternational,
    hasAccommodation: school.hasAccommodation,
    status: school.status,
  };
}

export function SchoolForm({ school }: { school?: School }) {
  const [data, setData] = useState<FormState>(() => schoolToForm(school));
  const [uploading, setUploading] = useState(false);
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupNote, setLookupNote] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `schools/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabaseBrowser.storage
      .from(SOCIAL_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (!error) {
      const { data: pub } = supabaseBrowser.storage.from(SOCIAL_BUCKET).getPublicUrl(path);
      set("heroImageUrl", pub.publicUrl);
    }
    setUploading(false);
  }

  async function handleLookup() {
    const name = data.nameEn.trim() || data.nameAr.trim();
    if (!name) return;
    setLooking(true);
    setLookupError(null);
    setLookupNote(null);
    try {
      const res = await fetch("/api/admin/lookup-school", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok) {
        setLookupError(json.error || "تعذر البحث");
        return;
      }
      const r = json.result as Partial<Record<keyof FormState, string>>;
      setData((d) => ({
        ...d,
        nameAr: r.nameAr || d.nameAr,
        nameEn: r.nameEn || d.nameEn,
        province: r.province || d.province,
        city: r.city || d.city,
        airportName: r.airportName || d.airportName,
        airportCode: r.airportCode || d.airportCode,
        shortDescriptionAr: r.shortDescriptionAr || d.shortDescriptionAr,
        descriptionAr: r.descriptionAr || d.descriptionAr,
        licenses: r.licenses || d.licenses,
        trainingType: r.trainingType || d.trainingType,
        aircraftFleet: r.aircraftFleet || d.aircraftFleet,
        websiteUrl: r.websiteUrl || d.websiteUrl,
      }));
      setLookupNote(
        "تم ملء الحقول تلقائيًا من نتائج بحث — راجعها بعناية قبل النشر، قد تحتوي على معلومات غير دقيقة أو قديمة."
      );
    } catch {
      setLookupError("تعذر الاتصال بخدمة البحث");
    } finally {
      setLooking(false);
    }
  }

  return (
    <form action={saveSchool} className="space-y-6">
      {school && <input type="hidden" name="id" value={school.id} />}
      <input type="hidden" name="heroImageUrl" value={data.heroImageUrl} />

      <div>
        <label className="block text-sm font-medium">صورة المدرسة</label>
        <div className="mt-1.5 flex items-center gap-4">
          {data.heroImageUrl ? (
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-nino-line bg-nino-cream">
              <Image src={data.heroImageUrl} alt="معاينة" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-xl border border-dashed border-nino-line bg-nino-cream text-xs text-nino-ink/40">
              لا صورة
            </div>
          )}
          <label className="cursor-pointer rounded-full border border-nino-ink/20 px-4 py-2 text-sm font-medium hover:border-nino-ink">
            {uploading ? "جارٍ الرفع..." : data.heroImageUrl ? "تغيير الصورة" : "اختر صورة"}
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="اسم المدرسة (عربي)" name="nameAr" value={data.nameAr} onChange={(v) => set("nameAr", v)} required />
        <TextField label="اسم المدرسة (إنجليزي / للرابط)" name="nameEn" value={data.nameEn} onChange={(v) => set("nameEn", v)} required dir="ltr" />
      </div>

      <div className="rounded-xl border border-nino-orange/30 bg-nino-orange/5 p-4">
        <button
          type="button"
          onClick={handleLookup}
          disabled={looking || (!data.nameEn.trim() && !data.nameAr.trim())}
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange disabled:opacity-40"
        >
          {looking ? "جارٍ البحث..." : "🔍 ابحث تلقائيًا واملأ الباقي"}
        </button>
        <p className="mt-2 text-xs text-nino-ink/60">
          يبحث عن المدرسة بالاسم ويملأ الموقع والوصف والرخص والأسطول تلقائيًا. راجع دائمًا قبل النشر.
        </p>
        {lookupError && <p className="mt-2 text-xs text-red-600">{lookupError}</p>}
        {lookupNote && <p className="mt-2 text-xs font-medium text-nino-orange">{lookupNote}</p>}
      </div>

      <TextField label="الرابط (slug) — اتركه فارغًا للإنشاء التلقائي" name="slug" value={data.slug} onChange={(v) => set("slug", v)} dir="ltr" />

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="المقاطعة" name="province" value={data.province} onChange={(v) => set("province", v)} required />
        <TextField label="المدينة" name="city" value={data.city} onChange={(v) => set("city", v)} required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="اسم المطار" name="airportName" value={data.airportName} onChange={(v) => set("airportName", v)} required />
        <TextField label="رمز المطار (ICAO)" name="airportCode" value={data.airportCode} onChange={(v) => set("airportCode", v)} required dir="ltr" />
      </div>

      <TextAreaField label="وصف قصير" name="shortDescriptionAr" value={data.shortDescriptionAr} onChange={(v) => set("shortDescriptionAr", v)} rows={2} required />
      <TextAreaField label="الوصف الكامل" name="descriptionAr" value={data.descriptionAr} onChange={(v) => set("descriptionAr", v)} rows={5} required />

      <TextField
        label="الرخص المتاحة (افصل بفاصلة: PPL,CPL,IR,ME,ATPL_THEORY)"
        name="licenses"
        value={data.licenses}
        onChange={(v) => set("licenses", v)}
        required
        dir="ltr"
      />

      <div>
        <label className="block text-sm font-medium">نوع البرنامج</label>
        <select
          name="trainingType"
          value={data.trainingType}
          onChange={(e) => set("trainingType", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm md:w-1/2"
        >
          <option value="integrated">متكامل</option>
          <option value="modular">معياري</option>
          <option value="both">كلاهما</option>
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="السعر الأدنى (دولار)" name="priceMinUsd" type="number" value={data.priceMinUsd} onChange={(v) => set("priceMinUsd", v)} required />
        <TextField label="السعر الأعلى (دولار)" name="priceMaxUsd" type="number" value={data.priceMaxUsd} onChange={(v) => set("priceMaxUsd", v)} required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="أقل مدة (أشهر)" name="durationMonthsMin" type="number" value={data.durationMonthsMin} onChange={(v) => set("durationMonthsMin", v)} required />
        <TextField label="أطول مدة (أشهر)" name="durationMonthsMax" type="number" value={data.durationMonthsMax} onChange={(v) => set("durationMonthsMax", v)} required />
      </div>

      <TextField label="الأسطول (افصل بفاصلة)" name="aircraftFleet" value={data.aircraftFleet} onChange={(v) => set("aircraftFleet", v)} required dir="ltr" />

      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="التقييم (0-5)" name="rating" type="number" value={data.rating} onChange={(v) => set("rating", v)} />
        <TextField label="ترتيب نينو (رقم أقل = أعلى)" name="ninoRanking" type="number" value={data.ninoRanking} onChange={(v) => set("ninoRanking", v)} />
        <TextField label="رابط الموقع الرسمي" name="websiteUrl" value={data.websiteUrl} onChange={(v) => set("websiteUrl", v)} dir="ltr" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          label="تاريخ الدفعة القادمة (اختياري — اتركه فارغًا إن لم يكن مؤكدًا)"
          name="nextIntakeDate"
          value={data.nextIntakeDate}
          onChange={(v) => set("nextIntakeDate", v)}
          placeholder="مثال: يناير 2027"
        />
        <TextField
          label="عدد المقاعد المتبقية (اختياري — رقم حقيقي فقط)"
          name="seatsAvailable"
          type="number"
          value={data.seatsAvailable}
          onChange={(v) => set("seatsAvailable", v)}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="acceptsInternational"
            checked={data.acceptsInternational}
            onChange={(e) => set("acceptsInternational", e.target.checked)}
            className="h-4 w-4 accent-orange-600"
          />
          يستقبل طلابًا دوليين
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="hasAccommodation"
            checked={data.hasAccommodation}
            onChange={(e) => set("hasAccommodation", e.target.checked)}
            className="h-4 w-4 accent-orange-600"
          />
          يوفر سكنًا
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">الحالة</label>
        <select
          name="status"
          value={data.status}
          onChange={(e) => set("status", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm md:w-1/2"
        >
          <option value="draft">مسودة (غير ظاهرة للطلاب)</option>
          <option value="published">منشور</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="rounded-full bg-nino-ink px-6 py-3 text-sm font-medium text-white hover:bg-nino-orange disabled:opacity-40"
      >
        حفظ
      </button>
    </form>
  );
}

function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        dir={dir}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows = 3,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
      />
    </div>
  );
}
