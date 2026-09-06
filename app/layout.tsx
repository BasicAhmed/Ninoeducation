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

const title = "نينو إديوكيشن — ادرس الطيران في جنوب أفريقيا";
const description =
  "نينو إديوكيشن تساعد الطلاب العرب على إيجاد ومقارنة والتقديم لأفضل مدارس الطيران في جنوب أفريقيا، دون أي تكلفة على الطالب.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "نينو إديوكيشن",
    locale: "ar_AR",
    type: "website",
    images: [{ url: "/brand/hero-cessna.jpg", width: 2400, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/hero-cessna.jpg"],
  },
};

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
