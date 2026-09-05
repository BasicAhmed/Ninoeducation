import { saveSchool } from "@/lib/admin-actions";

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
  priceMinZar: number;
  priceMaxZar: number;
  durationMonthsMin: number;
  durationMonthsMax: number;
  acceptsInternational: boolean;
  hasAccommodation: boolean;
  aircraftFleet: string;
  rating: number;
  ninoRanking: number;
  websiteUrl: string | null;
  nextIntakeDate?: string | null;
  seatsAvailable?: number | null;
  status: string;
};

export function SchoolForm({ school }: { school?: School }) {
  return (
    <form action={saveSchool} className="space-y-6">
      {school && <input type="hidden" name="id" value={school.id} />}

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="اسم المدرسة (عربي)" name="nameAr" defaultValue={school?.nameAr} required />
        <TextField label="اسم المدرسة (إنجليزي / للرابط)" name="nameEn" defaultValue={school?.nameEn} required />
      </div>

      <TextField label="الرابط (slug) — اتركه فارغًا للإنشاء التلقائي" name="slug" defaultValue={school?.slug} />

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="المقاطعة" name="province" defaultValue={school?.province} required />
        <TextField label="المدينة" name="city" defaultValue={school?.city} required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="اسم المطار" name="airportName" defaultValue={school?.airportName} required />
        <TextField label="رمز المطار (ICAO)" name="airportCode" defaultValue={school?.airportCode} required />
      </div>

      <TextAreaField label="وصف قصير" name="shortDescriptionAr" defaultValue={school?.shortDescriptionAr} rows={2} required />
      <TextAreaField label="الوصف الكامل" name="descriptionAr" defaultValue={school?.descriptionAr} rows={5} required />

      <TextField
        label="الرخص المتاحة (افصل بفاصلة: PPL,CPL,IR,ME,ATPL_THEORY)"
        name="licenses"
        defaultValue={school?.licenses}
        required
      />

      <div>
        <label className="block text-sm font-medium">نوع البرنامج</label>
        <select
          name="trainingType"
          defaultValue={school?.trainingType || "integrated"}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm md:w-1/2"
        >
          <option value="integrated">متكامل</option>
          <option value="modular">معياري</option>
          <option value="both">كلاهما</option>
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="السعر الأدنى (راند)" name="priceMinZar" type="number" defaultValue={school?.priceMinZar} required />
        <TextField label="السعر الأعلى (راند)" name="priceMaxZar" type="number" defaultValue={school?.priceMaxZar} required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="أقل مدة (أشهر)" name="durationMonthsMin" type="number" defaultValue={school?.durationMonthsMin} required />
        <TextField label="أطول مدة (أشهر)" name="durationMonthsMax" type="number" defaultValue={school?.durationMonthsMax} required />
      </div>

      <TextField label="الأسطول (افصل بفاصلة)" name="aircraftFleet" defaultValue={school?.aircraftFleet} required />

      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="التقييم (0-5)" name="rating" type="number" defaultValue={school?.rating ?? 4.5} />
        <TextField label="ترتيب نينو (رقم أقل = أعلى)" name="ninoRanking" type="number" defaultValue={school?.ninoRanking ?? 0} />
        <TextField label="رابط الموقع الرسمي" name="websiteUrl" defaultValue={school?.websiteUrl ?? ""} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          label="تاريخ الدفعة القادمة (اختياري — اتركه فارغًا إن لم يكن مؤكدًا)"
          name="nextIntakeDate"
          defaultValue={school?.nextIntakeDate ?? ""}
          placeholder="مثال: يناير 2027"
        />
        <TextField
          label="عدد المقاعد المتبقية (اختياري — رقم حقيقي فقط)"
          name="seatsAvailable"
          type="number"
          defaultValue={school?.seatsAvailable ?? ""}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="acceptsInternational" defaultChecked={school?.acceptsInternational ?? true} className="h-4 w-4 accent-orange-600" />
          يستقبل طلابًا دوليين
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="hasAccommodation" defaultChecked={school?.hasAccommodation ?? false} className="h-4 w-4 accent-orange-600" />
          يوفر سكنًا
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">الحالة</label>
        <select
          name="status"
          defaultValue={school?.status || "draft"}
          className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm md:w-1/2"
        >
          <option value="draft">مسودة (غير ظاهرة للطلاب)</option>
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

function TextField({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
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
  defaultValue,
  rows = 3,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-nino-line bg-nino-cream px-3 py-2.5 text-sm"
      />
    </div>
  );
}
