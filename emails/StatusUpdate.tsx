import { Button, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { SITE_URL } from "@/lib/constants";

const COPY = {
  ar: {
    subject: (status: string) => `تحديث على طلبك: ${status}`,
    preview: "في تحديث جديد على حالة طلبك",
    greeting: (name: string) => `وضع جديد لطلبك يا ${name}`,
    statusLabel: "الحالة الآن",
    trackCta: "شوف كل التفاصيل",
    footer: "استلمت هذا الإيميل لأن لديك طلبًا مسجّلاً لدى نينو إديوكيشن.",
  },
  en: {
    subject: (status: string) => `Update on your application: ${status}`,
    preview: "There's a new update on your application status",
    greeting: (name: string) => `New status for your application, ${name}`,
    statusLabel: "Current Status",
    trackCta: "See Full Details",
    footer: "You received this email because you have an application registered with Nino Education.",
  },
};

export function StatusUpdateEmail({
  lang,
  fullName,
  referenceCode,
  statusLabel,
}: {
  lang: "ar" | "en";
  fullName: string;
  referenceCode: string;
  statusLabel: string;
}) {
  const t = COPY[lang];
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;

  return (
    <EmailLayout lang={lang} previewText={t.preview} footerNote={t.footer}>
      <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.ink, margin: "0 0 4px" }}>
        {t.greeting(firstName)}
      </Text>
      <Text dir="ltr" style={{ fontSize: "13px", color: "rgba(11,13,15,0.5)", margin: "0 0 20px" }}>
        {referenceCode}
      </Text>

      <Section
        style={{
          backgroundColor: COLORS.cream,
          borderRadius: "12px",
          padding: "18px 20px",
        }}
      >
        <Text style={{ fontSize: "11px", color: "rgba(11,13,15,0.5)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {t.statusLabel}
        </Text>
        <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.orange, margin: 0 }}>
          {statusLabel}
        </Text>
      </Section>

      <Section style={{ textAlign: "center", marginTop: "24px" }}>
        <Button
          href={`${SITE_URL}/track?ref=${referenceCode}`}
          style={{
            backgroundColor: COLORS.ink,
            color: COLORS.white,
            borderRadius: "999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {t.trackCta}
        </Button>
      </Section>
    </EmailLayout>
  );
}

export function statusUpdateSubject(lang: "ar" | "en", statusLabel: string) {
  return COPY[lang].subject(statusLabel);
}
