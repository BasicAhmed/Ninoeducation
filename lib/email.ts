import { Resend } from "resend";
import type { ReactElement } from "react";
import { EMAIL_FROM } from "@/lib/constants";

// Lazily constructed so the app doesn't crash at import time if
// RESEND_API_KEY isn't set yet — sendEmail() below checks for this
// and no-ops instead of throwing.
let resendClient: Resend | null = null;
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}): Promise<{ sent: boolean; error?: string }> {
  const client = getClient();

  if (!client) {
    // Not configured yet — log so it's visible in Vercel's function
    // logs during setup, but never throw. Email is a nice-to-have on
    // top of the core flow (application still gets saved either way),
    // not a dependency the rest of the app should break on.
    console.log(`[email] RESEND_API_KEY not set — skipped "${subject}" to ${to}`);
    return { sent: false, error: "not_configured" };
  }

  if (!to || !to.includes("@")) {
    console.error(`[email] refused to send "${subject}" — invalid recipient: ${to}`);
    return { sent: false, error: "invalid_recipient" };
  }

  try {
    const result = await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      react,
    });
    if (result.error) {
      console.error(`[email] Resend rejected "${subject}" to ${to}:`, result.error);
      return { sent: false, error: result.error.message };
    }
    return { sent: true };
  } catch (err) {
    console.error(`[email] failed to send "${subject}" to ${to}:`, err);
    return { sent: false, error: err instanceof Error ? err.message : "unknown_error" };
  }
}
