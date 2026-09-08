import { Button, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout, COLORS } from "./EmailLayout";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { GUIDE_LINKS, type GuideLink } from "./guideSuggestions";

type StatusCopy = {
  subject: (name: string) => string;
  greeting: (name: string) => string;
  guides: GuideLink[];
  note?: string; // extra supportive line, used for the rejected case
};

const STATUS_COPY: Record<string, Record<"ar" | "en", StatusCopy>> = {
  contacted: {
    ar: {
      subject: (n) => `${n}، تواصلنا معك اليوم 📞`,
      greeting: (n) => `هلا ${n}، كلمناك اليوم!`,
      guides: [GUIDE_LINKS.chooseSchool],
    },
    en: {
      subject: (n) => `${n}, we reached out to you today 📞`,
      greeting: (n) => `Hey ${n}, we called you today!`,
      guides: [GUIDE_LINKS.chooseSchool],
    },
  },
  documents_required: {
    ar: {
      subject: (n) => `${n}، نحتاج منك شي بسيط 📋`,
      greeting: (n) => `${n}، احتجنا شوي مستندات منك`,
      guides: [GUIDE_LINKS.visa],
    },
    en: {
      subject: (n) => `${n}, we need something small from you 📋`,
      greeting: (n) => `${n}, we need a few documents from you`,
      guides: [GUIDE_LINKS.visa],
    },
  },
  submitted_to_school: {
    ar: {
      subject: (n) => `طلبك عند المدرسة الآن يا ${n} ✈️`,
      greeting: (n) => `${n}، طلبك وصل المدرسة!`,
      guides: [GUIDE_LINKS.timeline],
    },
    en: {
      subject: (n) => `Your application is with the school now, ${n} ✈️`,
      greeting: (n) => `${n}, your application reached the school!`,
      guides: [GUIDE_LINKS.timeline],
    },
  },
  accepted: {
    ar: {
      subject: (n) => `مبروك يا ${n}! تم قبولك 🎉`,
      greeting: (n) => `مبروووك يا ${n}! 🎉`,
      guides: [GUIDE_LINKS.visa, GUIDE_LINKS.accommodation],
    },
    en: {
      subject: (n) => `Congrats, ${n}! You're accepted 🎉`,
      greeting: (n) => `Congratulations, ${n}! 🎉`,
      guides: [GUIDE_LINKS.visa, GUIDE_LINKS.accommodation],
    },
  },
  rejected: {
    ar: {
      subject: (n) => `تحديث على طلبك يا ${n}`,
      greeting: (n) => `${n}، عندنا تحديث نبي نقوله لك بصراحة`,
      guides: [],
      note: "هذا مو نهاية الطريق. عندنا مدارس ثانية ممكن تناسبك أكثر — كلمنا وخلنا نشوف الخيار الأفضل لك.",
    },
    en: {
      subject: (n) => `An update on your application, ${n}`,
      greeting: (n) => `${n}, we have an update we want to be honest about`,
      guides: [],
      note: "This isn't the end of the road. We have other schools that might be a better fit — talk to us and let's find the right option for you.",
    },
  },
  enrolled: {
    ar: {
      subject: (n) => `بدأت رحلتك يا ${n}! ✈️🎓`,
      greeting: (n) => `${n}، رسميًا صرت مسجّل! 🎓`,
      guides: [GUIDE_LINKS.tips, GUIDE_LINKS.challenges],
    },
    en: {
      subject: (n) => `Your journey has started, ${n}! ✈️🎓`,
      greeting: (n) => `${n}, you're officially enrolled! 🎓`,
      guides: [GUIDE_LINKS.tips, GUIDE_LINKS.challenges],
    },
  },
  new: {
    ar: {
      subject: (n) => `تحديث على طلبك يا ${n}`,
      greeting: (n) => `${n}، عندك تحديث جديد`,
      guides: [GUIDE_LINKS.chooseSchool],
    },
    en: {
      subject: (n) => `An update on your application, ${n}`,
      greeting: (n) => `${n}, you have a new update`,
      guides: [GUIDE_LINKS.chooseSchool],
    },
  },
};

const FALLBACK: Record<"ar" | "en", StatusCopy> = {
  ar: {
    subject: (n) => `تحديث على طلبك يا ${n}`,
    greeting: (n) => `${n}، عندك تحديث جديد`,
    guides: [GUIDE_LINKS.chooseSchool],
  },
  en: {
    subject: (n) => `An update on your application, ${n}`,
    greeting: (n) => `${n}, you have a new update`,
    guides: [GUIDE_LINKS.chooseSchool],
  },
};

const STATIC = {
  ar: {
    preview: "في تحديث جديد على حالة طلبك",
    statusLabel: "الحالة الآن",
    trackCta: "شوف كل التفاصيل",
    whatsappCta: "تواصل معنا على واتساب",
    footer: "استلمت هذا الإيميل لأن لديك طلبًا مسجّلاً لدى نينو إديوكيشن.",
  },
  en: {
    preview: "There's a new update on your application status",
    statusLabel: "Current Status",
    trackCta: "See Full Details",
    whatsappCta: "Message Us on WhatsApp",
    footer: "You received this email because you have an application registered with Nino Education.",
  },
};

export function StatusUpdateEmail({
  lang,
  fullName,
  referenceCode,
  status,
  statusLabel,
}: {
  lang: "ar" | "en";
  fullName: string;
  referenceCode: string;
  status: string;
  statusLabel: string;
}) {
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;
  const copy = STATUS_COPY[status]?.[lang] ?? FALLBACK[lang];
  const s = STATIC[lang];

  return (
    <EmailLayout lang={lang} previewText={s.preview} footerNote={s.footer}>
      <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.ink, margin: "0 0 4px" }}>
        {copy.greeting(firstName)}
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
          {s.statusLabel}
        </Text>
        <Text style={{ fontSize: "18px", fontWeight: 700, color: COLORS.orange, margin: 0 }}>
          {statusLabel}
        </Text>
      </Section>

      {copy.note && (
        <Text style={{ fontSize: "14px", color: "rgba(11,13,15,0.75)", lineHeight: "1.6", margin: "16px 0 0" }}>
          {copy.note}
        </Text>
      )}

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
          {s.trackCta}
        </Button>
      </Section>

      {status === "rejected" && (
        <Section style={{ textAlign: "center", marginTop: "12px" }}>
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            style={{ fontSize: "13px", color: COLORS.orange }}
          >
            {s.whatsappCta}
          </Link>
        </Section>
      )}

      {copy.guides.length > 0 && (
        <>
          <Hr style={{ borderColor: "rgba(11,13,15,0.1)", margin: "28px 0 16px" }} />
          {copy.guides.map((g) => (
            <Text key={g.href} style={{ fontSize: "13px", margin: "0 0 6px" }}>
              <Link href={`${SITE_URL}${g.href}`} style={{ color: COLORS.orange }}>
                {lang === "ar" ? g.ar : g.en} ←
              </Link>
            </Text>
          ))}
        </>
      )}
    </EmailLayout>
  );
}

export function statusUpdateSubject(lang: "ar" | "en", status: string, fullName: string) {
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;
  const copy = STATUS_COPY[status]?.[lang] ?? FALLBACK[lang];
  return copy.subject(firstName);
}
