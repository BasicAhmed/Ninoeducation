import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

const COLORS = {
  orange: "#fe5200",
  ink: "#0b0d0f",
  cream: "#f6f4f1",
  white: "#ffffff",
};

export function EmailLayout({
  lang,
  previewText,
  children,
  footerNote,
}: {
  lang: "ar" | "en";
  previewText: string;
  children: ReactNode;
  footerNote: string;
}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <Html dir={dir} lang={lang}>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: COLORS.cream, fontFamily: "Tahoma, Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 24px" }}>
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Text
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: COLORS.ink,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              نينو إديوكيشن
              <span style={{ color: COLORS.orange }}> ✈</span>
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: COLORS.white,
              borderRadius: "16px",
              padding: "32px 28px",
              textAlign: dir === "rtl" ? "right" : "left",
            }}
          >
            {children}
          </Section>

          <Section style={{ marginTop: "24px", textAlign: "center" }}>
            <Hr style={{ borderColor: "rgba(11,13,15,0.1)", margin: "0 0 16px" }} />
            <Text style={{ fontSize: "12px", color: "rgba(11,13,15,0.45)", margin: 0 }}>
              {footerNote}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export { COLORS };
