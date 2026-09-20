import { Hr, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const COPY = {
  ar: {
    subject: "استلمنا طلب حجز مكالمتك",
    preview: "استلمنا طلبك، وبنأكد معك الموعد قريبًا.",
    greeting: (name: string) => `أهلًا ${name} 👋`,
    body: "استلمنا طلبك لحجز مكالمة استشارية. فريقنا بيتواصل معك عبر واتساب أو الإيميل قريبًا لتأكيد الموعد المناسب.",
    detailsLabel: "تفاصيل طلبك",
    dateLabel: "التاريخ المفضل",
    timeLabel: "الوقت المفضل",
    timeValues: { morning: "صباحًا", afternoon: "بعد الظهر", evening: "مساءً" } as Record<string, string>,
    footer: "استلمت هذا الإيميل لأنك طلبت حجز مكالمة استشارية عبر نينو إديوكيشن.",
  },
  en: {
    subject: "We Received Your Call Booking Request",
    preview: "We got your request, and we'll confirm a time with you soon.",
    greeting: (name: string) => `Hi ${name} 👋`,
    body: "We received your request to book a consultation call. Our team will reach out via WhatsApp or email soon to confirm a suitable time.",
    detailsLabel: "Your Request Details",
    dateLabel: "Preferred Date",
    timeLabel: "Preferred Time",
    timeValues: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" } as Record<string, string>,
    footer: "You received this email because you requested a consultation call through Nino Education.",
  },
};

export function ConsultationBookingReceivedEmail({
  lang,
  name,
  preferredDate,
  preferredTime,
}: {
  lang: "ar" | "en";
  name: string;
  preferredDate: string;
  preferredTime: string;
}) {
  const t = COPY[lang];
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <EmailLayout lang={lang} previewText={t.preview} footerNote={t.footer}>
      <Text style={{ fontSize: "20px", fontWeight: 700, color: COLORS.ink, margin: "0 0 8px" }}>
        {t.greeting(firstName)}
      </Text>
      <Text style={{ fontSize: "14px", color: "rgba(11,13,15,0.7)", lineHeight: "1.6", margin: "0 0 24px" }}>
        {t.body}
      </Text>

      <Section
        style={{
          backgroundColor: COLORS.cream,
          borderRadius: "12px",
          padding: "18px 20px",
        }}
      >
        <Text style={{ fontSize: "11px", fontWeight: 700, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 10px" }}>
          {t.detailsLabel}
        </Text>
        <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.5)", margin: "0 0 2px" }}>{t.dateLabel}</Text>
        <Text style={{ fontSize: "14px", color: COLORS.ink, margin: "0 0 10px" }}>{preferredDate}</Text>
        <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.5)", margin: "0 0 2px" }}>{t.timeLabel}</Text>
        <Text style={{ fontSize: "14px", color: COLORS.ink, margin: 0 }}>
          {t.timeValues[preferredTime] ?? preferredTime}
        </Text>
      </Section>

      <Hr style={{ borderColor: "rgba(11,13,15,0.1)", margin: "24px 0 16px" }} />

      <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.6)", margin: 0 }}>
        {lang === "ar" ? "عندك سؤال بينتظر؟ راسلنا مباشرة:" : "Can't wait? Message us directly:"}{" "}
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} style={{ color: COLORS.orange }}>
          WhatsApp
        </a>
      </Text>
    </EmailLayout>
  );
}

export function consultationBookingReceivedSubject(lang: "ar" | "en") {
  return COPY[lang].subject;
}
