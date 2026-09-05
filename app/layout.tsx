import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "نينو إديوكيشن — ادرس الطيران في جنوب أفريقيا",
  description:
    "نينو إديوكيشن تساعد الطلاب العرب على إيجاد ومقارنة والتقديم لأفضل مدارس الطيران في جنوب أفريقيا، دون أي تكلفة على الطالب.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nino-cream text-nino-ink">
        {children}
      </body>
    </html>
  );
}
