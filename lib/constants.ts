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
  PPL: "رخصة طيار خاص",
  CPL: "رخصة طيار تجاري",
  IR: "تصنيف آلي",
  ME: "متعدد المحركات",
  ATPL_THEORY: "نظري رخصة النقل الجوي",
};

// Canonical site URL, used for sitemap.xml, robots.txt, and structured
// data. Set NEXT_PUBLIC_SITE_URL in Vercel to the real production
// domain (custom domain once bought, otherwise the *.vercel.app URL).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ninoeducation.vercel.app";
