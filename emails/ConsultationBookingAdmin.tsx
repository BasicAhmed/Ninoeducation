import { Button, Hr, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { SITE_URL } from "@/lib/constants";

const TIME_LABELS: Record<string, string> = {
  morning: "صباحًا",
  afternoon: "بعد الظهر",
  evening: "مساءً",
};

type FieldDef = { label: string; value: string | null };

function Field({ label, value }: FieldDef) {
  if (!value) return null;
  return (
    <Section style={{ marginBottom: "12px" }}>
      <Text style={{ fontSize: "11px", color: "rgba(11,13,15,0.45)", margin: "0 0 2px" }}>
        {label}
      </Text>
      <Text style={{ fontSize: "14px", color: COLORS.ink, margin: 0 }}>{value}</Text>
    </Section>
  );
}

export function ConsultationBookingAdminEmail({
  name,
  email,
  whatsapp,
  referenceCode,
  hasMatchedApplication,
  preferredDate,
  preferredTime,
  topic,
}: {
  name: string;
  email: string;
  whatsapp: string;
  referenceCode: string | null;
  hasMatchedApplication: boolean;
  preferredDate: string;
  preferredTime: string;
  topic: string | null;
}) {
  const firstName = name.trim().split(/\s+/)[0] || name;
  const waNumber = whatsapp.replace(/[^\d]/g, "");
  const waMessage = `هلا ${firstName}، وصلني طلبك لحجز مكالمة استشارية 👋 خلني أأكد معك الموعد المناسب.`;
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}` : null;

  return (
    <EmailLayout
      lang="ar"
      previewText={`طلب حجز مكالمة من ${name}`}
      footerNote="إشعار تلقائي من لوحة تحكم نينو إديوكيشن."
    >
      <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.ink, margin: "0 0 4px" }}>
        طلب حجز مكالمة استشارية 📞
      </Text>
      {referenceCode && (
        <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.5)", margin: "0 0 8px" }} dir="ltr">
          {referenceCode} {hasMatchedApplication ? "· مطابق لطلب حالي" : "· رقم غير مطابق، تحقق يدويًا"}
        </Text>
      )}

      {waLink && (
        <Section style={{ margin: "8px 0" }}>
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
            راسله على واتساب لتأكيد الموعد
          </Button>
        </Section>
      )}

      <Hr style={{ borderColor: "rgba(11,13,15,0.08)", margin: "16px 0" }} />

      <Field label="الاسم" value={name} />
      <Field label="البريد الإلكتروني" value={email} />
      <Field label="الواتساب" value={whatsapp} />
      <Field label="التاريخ المفضل" value={preferredDate} />
      <Field label="الوقت المفضل" value={TIME_LABELS[preferredTime] ?? preferredTime} />
      {topic && <Field label="موضوع المكالمة" value={topic} />}

      {hasMatchedApplication && (
        <Section style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            href={`${SITE_URL}/admin/applications`}
            style={{
              backgroundColor: COLORS.ink,
              color: COLORS.white,
              borderRadius: "999px",
              padding: "10px 24px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            عرض طلبه الحالي
          </Button>
        </Section>
      )}

      <Section style={{ textAlign: "center", marginTop: "12px" }}>
        <Button
          href={`${SITE_URL}/admin/consultations`}
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
          افتح كل طلبات الحجز
        </Button>
      </Section>
    </EmailLayout>
  );
}
