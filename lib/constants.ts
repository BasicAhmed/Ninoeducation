export const PROVINCES = [
  "غاوتنغ",
  "الكيب الغربية",
  "الكيب الشرقية",
  "مبومالانغا",
];

// TODO(Ahmed): replace with the real WhatsApp number, in international
// format with no + or spaces (e.g. "966501234567"). Every wa.me link
// on the site pulls from this single constant.
export const WHATSAPP_NUMBER = "000000000000";

export const LICENSE_LABELS: Record<string, string> = {
  PPL: "رخصة طيار خاص (PPL)",
  CPL: "رخصة طيار تجاري (CPL)",
  IR: "تصنيف آلي (IR)",
  ME: "متعدد المحركات (ME)",
  ATPL_THEORY: "نظري رخصة النقل الجوي (ATPL)",
};

// Canonical site URL, used for sitemap.xml, robots.txt, and structured
// data. Set NEXT_PUBLIC_SITE_URL in Vercel to the real production
// domain (custom domain once bought, otherwise the *.vercel.app URL).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ninoeducation.vercel.app";

// The address transactional emails are sent FROM. Requires the domain
// to be verified in Resend first (SPF/DKIM/DMARC records added at
// your DNS provider) — sending from an unverified domain gets
// rejected or lands in spam. Until that's done, keep this on
// Resend's shared onboarding domain for testing.
// TODO(Ahmed): once ninoeducation.com is verified in Resend, change
// this to something like "نينو إديوكيشن <hello@ninoeducation.com>".
export const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL || "Nino Education <onboarding@resend.dev>";

// Where new-application and other internal notifications get sent.
// TODO(Ahmed): replace with your real inbox.
export const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "ahmed@example.com";
