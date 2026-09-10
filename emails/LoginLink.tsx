import { Button, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";

const COPY = {
  ar: {
    subject: "رابط الدخول لحسابك في نينو إديوكيشن",
    preview: "اضغط للدخول ومتابعة طلبك",
    heading: "رابط دخولك جاهز",
    body: "اضغط على الزر تحت عشان تدخل لحسابك وتشوف آخر تحديثات طلبك. الرابط صالح لمدة 30 دقيقة فقط.",
    cta: "الدخول لحسابي",
    ignoreNote: "إذا ما طلبت هذا الرابط، تجاهل هذا الإيميل ببساطة.",
    footer: "استلمت هذا الإيميل لأن لديك طلبًا مسجّلاً لدى نينو إديوكيشن.",
  },
  en: {
    subject: "Your Nino Education Login Link",
    preview: "Click to sign in and check your application",
    heading: "Your Login Link Is Ready",
    body: "Click the button below to sign in and see the latest updates on your application. This link is valid for 30 minutes only.",
    cta: "Sign In to My Account",
    ignoreNote: "If you didn't request this link, you can simply ignore this email.",
    footer: "You received this email because you have an application registered with Nino Education.",
  },
};

export function LoginLinkEmail({ lang, link }: { lang: "ar" | "en"; link: string }) {
  const t = COPY[lang];
  return (
    <EmailLayout lang={lang} previewText={t.preview} footerNote={t.footer}>
      <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.ink, margin: "0 0 12px" }}>
        {t.heading}
      </Text>
      <Text style={{ fontSize: "14px", color: "rgba(11,13,15,0.7)", lineHeight: "1.6", margin: "0 0 24px" }}>
        {t.body}
      </Text>
      <Section style={{ textAlign: "center", margin: "0 0 24px" }}>
        <Button
          href={link}
          style={{
            backgroundColor: COLORS.orange,
            color: COLORS.white,
            borderRadius: "999px",
            padding: "12px 32px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {t.cta}
        </Button>
      </Section>
      <Text style={{ fontSize: "12px", color: "rgba(11,13,15,0.45)", margin: 0 }}>
        {t.ignoreNote}
      </Text>
    </EmailLayout>
  );
}

export function loginLinkSubject(lang: "ar" | "en") {
  return COPY[lang].subject;
}
