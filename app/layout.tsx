import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { MobileCTA } from "@/components/MobileCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

// Used for English content instead of leaning on Plex Arabic's Latin
// fallback glyphs — Inter reads as more natural, purpose-built English
// UI type, while still pairing cleanly with Plex Arabic's proportions.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const COPY = {
  ar: {
    title: "نينو إديوكيشن | كيف تصبح طيارًا في جنوب أفريقيا",
    description:
      "نينو إديوكيشن تساعد الطلاب الدوليين على أن يصبحوا طيارين معتمدين في جنوب أفريقيا — إيجاد ومقارنة والتقديم لأفضل مدارس الطيران، دون أي تكلفة على الطالب.",
    locale: "ar_AR",
  },
  en: {
    title: "Nino Education | How to Become a Pilot in South Africa",
    description:
      "Nino Education helps international students become certified pilots in South Africa — find, compare, and apply to the best flight schools, at no cost to the student.",
    locale: "en_US",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = COPY[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    // Tells Google these two URLs are the same page in different
    // languages, rather than two separate/duplicate pages — this only
    // covers the homepage (every other page sets its own canonical via
    // its own generateMetadata, and this is the one Next.js falls back
    // to for routes that don't). x-default points search engines
    // unsure of the visitor's language to the Arabic version, since
    // that's the site's actual primary audience and existing indexed
    // URL.
    alternates: {
      languages: { ar: SITE_URL, en: `${SITE_URL}/en`, "x-default": SITE_URL },
    },
    // Set GOOGLE_SITE_VERIFICATION in Vercel once you add the property
    // in Google Search Console (Settings > Ownership verification >
    // HTML tag method) — paste just the content value, not the full
    // meta tag.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: {
      title: t.title,
      description: t.description,
      url: SITE_URL,
      siteName: "نينو إديوكيشن",
      locale: t.locale,
      type: "website",
      images: [{ url: "/brand/hero-cessna.jpg", width: 2400, height: 1600 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/brand/hero-cessna.jpg"],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${plexArabic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nino-cream text-nino-ink pb-16 md:pb-0">
        {children}
        <WhatsAppButton lang={lang} />
        <MobileCTA lang={lang} />
      </body>
    </html>
  );
}
