import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { MobileCTA } from "@/components/MobileCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/constants";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nino-cream text-nino-ink pb-16 md:pb-0">
        {children}
        <WhatsAppButton />
        <MobileCTA />
      </body>
    </html>
  );
}
