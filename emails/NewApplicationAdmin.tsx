import { Button, Column, Row, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { SITE_URL } from "@/lib/constants";

function Field({ label, value }: { label: string; value: string }) {
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

export function NewApplicationAdminEmail({
  fullName,
  referenceCode,
  nationality,
  email,
  phone,
  desiredLicense,
  estimatedBudget,
  schoolName,
}: {
  fullName: string;
  referenceCode: string;
  nationality: string;
  email: string;
  phone: string;
  desiredLicense: string;
  estimatedBudget: string | null;
  schoolName: string | null;
}) {
  return (
    <EmailLayout
      lang="ar"
      previewText={`طلب جديد من ${fullName}`}
      footerNote="إشعار تلقائي من لوحة تحكم نينو إديوكيشن."
    >
      <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.ink, margin: "0 0 4px" }}>
        طلب جديد وصل 🎯
      </Text>
      <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.5)", margin: "0 0 20px" }}>
        {referenceCode}
      </Text>

      <Field label="الاسم" value={fullName} />
      <Field label="الجنسية" value={nationality} />
      <Field label="البريد الإلكتروني" value={email} />
      <Field label="الهاتف" value={phone} />
      <Field label="الرخصة المطلوبة" value={desiredLicense} />
      {estimatedBudget && <Field label="الميزانية" value={estimatedBudget} />}
      {schoolName && <Field label="المدرسة المطلوبة" value={schoolName} />}

      <Section style={{ textAlign: "center", marginTop: "20px" }}>
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
