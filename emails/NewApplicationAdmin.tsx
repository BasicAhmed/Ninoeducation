import { Button, Column, Hr, Row, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { SITE_URL } from "@/lib/constants";

// Small label maps duplicated here rather than imported from the admin
// UI (which is a client component) — matches the same pattern already
// used between /api/track and /api/check-email for the same reason.
const APPLICANT_TYPE_LABELS: Record<string, string> = {
  student: "الطالب نفسه",
  parent: "ولي الأمر/قريب",
};
const AGE_GROUP_LABELS: Record<string, string> = {
  under_18: "أقل من 18",
  "18_24": "18–24",
  "25_34": "25–34",
  "35_plus": "35 فأكثر",
};
const EDUCATION_LABELS: Record<string, string> = {
  high_school_student: "طالب ثانوية",
  high_school_grad: "خريج ثانوية",
  university_student: "طالب جامعي",
  university_grad: "خريج جامعي / يعمل",
};
const ENGLISH_LABELS: Record<string, string> = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  good: "جيد",
  fluent: "بطلاقة",
};
const FUNDING_LABELS: Record<string, string> = {
  personal_savings: "مدخرات شخصية",
  family_support: "دعم عائلي",
  loan: "قرض بنكي",
  undecided: "لم يحدد بعد",
};
const ACCOMMODATION_BUDGET_LABELS: Record<string, string> = {
  yes: "نعم، تشمل السكن",
  no: "لا، يحتاج تقدير سكن منفصل",
  unsure: "غير متأكد",
};
const MEDICAL_LABELS: Record<string, string> = {
  no: "لا يوجد",
  unsure: "غير متأكد",
  yes: "⚠ لديه استفسار طبي",
};
const LICENSE_LABELS: Record<string, string> = {
  PPL: "رخصة طيار خاص",
  CPL: "رخصة طيار تجاري",
  IR: "تصنيف آلي",
  ME: "متعدد المحركات",
  ATPL_THEORY: "نظري رخصة النقل الجوي",
};

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Column>
        <Text style={{ fontSize: "11px", color: "rgba(11,13,15,0.45)", margin: "0 0 2px" }}>
          {label}
        </Text>
        <Text style={{ fontSize: "14px", color: COLORS.ink, margin: 0 }}>{value}</Text>
      </Column>
    </Row>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: "11px",
        fontWeight: 700,
        color: COLORS.orange,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        margin: "18px 0 10px",
      }}
    >
      {children}
    </Text>
  );
}

export function NewApplicationAdminEmail({
  fullName,
  referenceCode,
  applicantType,
  ageGroup,
  educationStatus,
  nationality,
  currentResidence,
  email,
  phone,
  whatsapp,
  desiredLicense,
  currentLicense,
  estimatedBudget,
  fundingSource,
  accommodationBudgetOk,
  englishLevel,
  medicalConcern,
  preferredStart,
  notes,
  schoolName,
}: {
  fullName: string;
  referenceCode: string;
  applicantType: string | null;
  ageGroup: string | null;
  educationStatus: string | null;
  nationality: string;
  currentResidence: string | null;
  email: string;
  phone: string;
  whatsapp: string | null;
  desiredLicense: string;
  currentLicense: string | null;
  estimatedBudget: string | null;
  fundingSource: string | null;
  accommodationBudgetOk: string | null;
  englishLevel: string | null;
  medicalConcern: string | null;
  preferredStart: string | null;
  notes: string | null;
  schoolName: string | null;
}) {
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;
  const waNumber = (whatsapp || phone).replace(/[^\d]/g, "");
  const waMessage = `هلا ${firstName}، وصلني طلبك للتو 👋 كيف حالك؟ حاب أسألك عن بعض التفاصيل ونشوف كيف نبدأ صح من أول خطوة.`;
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}` : null;

  return (
    <EmailLayout
      lang="ar"
      previewText={`طلب جديد من ${fullName}`}
      footerNote="إشعار تلقائي من لوحة تحكم نينو إديوكيشن."
    >
      <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.ink, margin: "0 0 4px" }}>
        طلب جديد وصل 🎯
      </Text>
      <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.5)", margin: "0 0 8px" }}>
        {referenceCode}
      </Text>

      {waLink && (
        <Section style={{ margin: "0 0 8px" }}>
          <Button
            href={waLink}
            style={{
              backgroundColor: "#25D366",
              color: "#ffffff",
              borderRadius: "999px",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            راسله على واتساب الآن
          </Button>
        </Section>
      )}

      <Hr style={{ borderColor: "rgba(11,13,15,0.08)", margin: "16px 0" }} />

      <SectionLabel>الهوية</SectionLabel>
      <Field label="الاسم" value={fullName} />
      <Field label="من يقدّم الطلب" value={applicantType ? APPLICANT_TYPE_LABELS[applicantType] ?? applicantType : null} />
      <Field label="الفئة العمرية" value={ageGroup ? AGE_GROUP_LABELS[ageGroup] ?? ageGroup : null} />
      <Field label="الوضع التعليمي" value={educationStatus ? EDUCATION_LABELS[educationStatus] ?? educationStatus : null} />
      <Field label="الجنسية" value={nationality} />
      <Field label="مقيم حاليًا في" value={currentResidence} />

      <SectionLabel>التواصل</SectionLabel>
      <Field label="البريد الإلكتروني" value={email} />
      <Field label="الهاتف" value={phone} />
      <Field label="الواتساب" value={whatsapp} />

      <SectionLabel>الرخصة والمدرسة</SectionLabel>
      <Field label="الرخصة المطلوبة" value={LICENSE_LABELS[desiredLicense] ?? desiredLicense} />
      <Field label="الرخصة الحالية" value={currentLicense ? LICENSE_LABELS[currentLicense] ?? currentLicense : null} />
      <Field label="المدرسة المطلوبة" value={schoolName} />
      <Field label="الموعد المفضل للبدء" value={preferredStart} />

      <SectionLabel>الجاهزية المالية والتعليمية</SectionLabel>
      <Field label="الميزانية" value={estimatedBudget} />
      <Field label="مصدر التمويل" value={fundingSource ? FUNDING_LABELS[fundingSource] ?? fundingSource : null} />
      <Field label="الميزانية تشمل السكن؟" value={accommodationBudgetOk ? ACCOMMODATION_BUDGET_LABELS[accommodationBudgetOk] ?? accommodationBudgetOk : null} />
      <Field label="مستوى الإنجليزي" value={englishLevel ? ENGLISH_LABELS[englishLevel] ?? englishLevel : null} />
      <Field label="استفسار طبي" value={medicalConcern ? MEDICAL_LABELS[medicalConcern] ?? medicalConcern : null} />

      {notes && (
        <>
          <SectionLabel>ملاحظات الطالب</SectionLabel>
          <Text style={{ fontSize: "14px", color: COLORS.ink, margin: 0, lineHeight: "1.6" }}>{notes}</Text>
        </>
      )}

      <Section style={{ textAlign: "center", marginTop: "24px" }}>
        <Button
          href={`${SITE_URL}/admin/applications`}
          style={{
            backgroundColor: COLORS.orange,
            color: COLORS.white,
            borderRadius: "999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          افتح في لوحة التحكم
        </Button>
      </Section>
    </EmailLayout>
  );
}
