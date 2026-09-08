import { Button, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { SITE_URL } from "@/lib/constants";
import { GUIDE_LINKS } from "./guideSuggestions";

const COPY = {
  ar: {
    subject: (name: string) => `وصلنا طلبك يا ${name} 🎉`,
    preview: "وصلنا طلبك! هذا رقم رحلتك للمتابعة.",
    greeting: (name: string) => `يلا يا ${name}، بدأنا! 🎉`,
    body: "استلمنا طلبك بنجاح. خلال 24–48 ساعة، بيتواصل معك أحد مستشارينا لفهم وضعك أكثر ونرشح لك أفضل المدارس المناسبة.",
    refLabel: "رقم رحلتك",
    keepIt: "خلّه عندك — فيك تتابع طلبك به في أي وقت",
    trackCta: "تابع طلبي",
    whileYouWait: "وانت تنتظر ردنا",
    whileYouWaitBody: "خلي وقت الانتظار مفيد. جهزنا لك شوي قراءة تفيدك:",
    footer: "استلمت هذا الإيميل لأنك قدّمت طلبًا عبر نينو إديوكيشن.",
  },
  en: {
    subject: (name: string) => `We got your application, ${name} 🎉`,
    preview: "We got your application! Here's your flight number.",
    greeting: (name: string) => `Let's go, ${name}, we're off! 🎉`,
    body: "We've received your application. Within 24-48 hours, one of our advisors will reach out to understand your situation better and recommend the best-fit schools.",
    refLabel: "Your Flight Number",
    keepIt: "Keep this — you can track your application with it anytime",
    trackCta: "Track My Application",
    whileYouWait: "While You Wait to Hear From Us",
    whileYouWaitBody: "Might as well make the wait useful. Here's a couple of things worth a read:",
    footer: "You received this email because you submitted an application through Nino Education.",
  },
};

export function ApplicationReceivedEmail({
  lang,
  fullName,
  referenceCode,
}: {
  lang: "ar" | "en";
  fullName: string;
  referenceCode: string;
}) {
  const t = COPY[lang];
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;
  const guides = [GUIDE_LINKS.chooseSchool, GUIDE_LINKS.pplVsCpl];

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
          backgroundColor: COLORS.ink,
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Text style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {t.refLabel}
        </Text>
        <Text
          dir="ltr"
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: COLORS.orange,
            letterSpacing: "0.05em",
            margin: "0 0 6px",
            fontFamily: "monospace",
          }}
        >
          {referenceCode}
        </Text>
        <Text style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
          {t.keepIt}
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

      <Hr style={{ borderColor: "rgba(11,13,15,0.1)", margin: "28px 0 20px" }} />

      <Text style={{ fontSize: "13px", fontWeight: 600, color: COLORS.ink, margin: "0 0 4px" }}>
        {t.whileYouWait}
      </Text>
      <Text style={{ fontSize: "13px", color: "rgba(11,13,15,0.6)", margin: "0 0 10px" }}>
        {t.whileYouWaitBody}
      </Text>
      {guides.map((g) => (
        <Text key={g.href} style={{ fontSize: "13px", margin: "0 0 6px" }}>
          <Link href={`${SITE_URL}${g.href}`} style={{ color: COLORS.orange }}>
            {lang === "ar" ? g.ar : g.en} ←
          </Link>
        </Text>
      ))}
    </EmailLayout>
  );
}

export function applicationReceivedSubject(lang: "ar" | "en", fullName: string) {
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;
  return COPY[lang].subject(firstName);
}
