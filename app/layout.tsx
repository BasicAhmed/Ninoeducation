import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { MobileCTA } from "@/components/MobileCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import { BRAND, SEO_PAGES, buildMetadata } from "@/lib/seo";

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

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    metadataBase: new URL(SITE_URL),
    // The homepage's own title/description/canonical/hreflang. Every
    // other page overrides these through lib/seo.ts.
    ...buildMetadata({ path: "", lang, ...SEO_PAGES[""][lang] }),
    applicationName: BRAND[lang],
    // Set GOOGLE_SITE_VERIFICATION in Vercel once you add the property
    // in Google Search Console (Settings > Ownership verification >
    // HTML tag method) — paste just the content value, not the full
    // meta tag.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
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
