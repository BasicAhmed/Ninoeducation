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
  PPL: "رخصة طيار خاص (PPL)",
  CPL: "رخصة طيار تجاري (CPL)",
  IR: "تصنيف آلي (IR)",
  ME: "متعدد المحركات (ME)",
  ATPL_THEORY: "نظري رخصة النقل الجوي (ATPL)",
};

type FieldDef = { label: string; value: string | null };

// Renders up to two fields side by side in one row — halves the
// email's length compared to one field per line, which is the whole
// point given how many fields this form collects.
function FieldPair({ fields }: { fields: FieldDef[] }) {
  const visible = fields.filter((f) => f.value);
  if (visible.length === 0) return null;
  return (
    <Row style={{ marginBottom: "12px" }}>
      {visible.map((f, i) => (
        <Column key={f.label} style={{ width: "50%", paddingInlineEnd: i === 0 ? "10px" : 0 }}>
          <Text style={{ fontSize: "11px", color: "rgba(11,13,15,0.45)", margin: "0 0 2px" }}>
            {f.label}
          </Text>
          <Text style={{ fontSize: "14px", color: COLORS.ink, margin: 0 }}>{f.value}</Text>
        </Column>
      ))}
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
      <FieldPair
        fields={[
          { label: "الاسم", value: fullName },
          { label: "من يقدّم الطلب", value: applicantType ? APPLICANT_TYPE_LABELS[applicantType] ?? applicantType : null },
        ]}
      />
      <FieldPair
        fields={[
          { label: "الفئة العمرية", value: ageGroup ? AGE_GROUP_LABELS[ageGroup] ?? ageGroup : null },
          { label: "الوضع التعليمي", value: educationStatus ? EDUCATION_LABELS[educationStatus] ?? educationStatus : null },
        ]}
      />
      <FieldPair
        fields={[
          { label: "الجنسية", value: nationality },
          { label: "مقيم حاليًا في", value: currentResidence },
        ]}
      />

      <SectionLabel>التواصل</SectionLabel>
      <FieldPair
        fields={[
          { label: "البريد الإلكتروني", value: email },
          { label: "الهاتف", value: phone },
        ]}
      />
      {whatsapp && (
        <FieldPair fields={[{ label: "الواتساب", value: whatsapp }]} />
      )}

      <SectionLabel>الرخصة والمدرسة</SectionLabel>
      <FieldPair
        fields={[
          { label: "الرخصة المطلوبة", value: LICENSE_LABELS[desiredLicense] ?? desiredLicense },
          { label: "الرخصة الحالية", value: currentLicense ? LICENSE_LABELS[currentLicense] ?? currentLicense : null },
        ]}
      />
      <FieldPair
        fields={[
          { label: "المدرسة المطلوبة", value: schoolName },
          { label: "الموعد المفضل للبدء", value: preferredStart },
        ]}
      />

      <SectionLabel>الجاهزية المالية والتعليمية</SectionLabel>
      <FieldPair
        fields={[
          { label: "الميزانية", value: estimatedBudget },
          { label: "مصدر التمويل", value: fundingSource ? FUNDING_LABELS[fundingSource] ?? fundingSource : null },
        ]}
      />
      <FieldPair
        fields={[
          { label: "الميزانية تشمل السكن؟", value: accommodationBudgetOk ? ACCOMMODATION_BUDGET_LABELS[accommodationBudgetOk] ?? accommodationBudgetOk : null },
          { label: "مستوى الإنجليزي", value: englishLevel ? ENGLISH_LABELS[englishLevel] ?? englishLevel : null },
        ]}
      />
      {medicalConcern && (
        <FieldPair
          fields={[{ label: "استفسار طبي", value: MEDICAL_LABELS[medicalConcern] ?? medicalConcern }]}
        />
      )}

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
