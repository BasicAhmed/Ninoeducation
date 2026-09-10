"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID, createHmac, timingSafeEqual } from "crypto";
import { eq, and, gt, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import { loginTokens, applications } from "@/db/schema";
import { sendEmail } from "@/lib/email";
import { LoginLinkEmail, loginLinkSubject } from "@/emails/LoginLink";
import { SITE_URL } from "@/lib/constants";

const COOKIE_NAME = "nino_student_session";
const TOKEN_TTL_MINUTES = 30;
const SESSION_MAX_AGE_DAYS = 30;

// Falls back to a fixed dev-only value so local/sandbox testing works
// without the env var set — TODO(Ahmed): set a real SESSION_SECRET in
// Vercel before launch. Unlike ADMIN_PASSWORD, this never needs to be
// typed by a human, so it should just be a long random string.
function secret() {
  return process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function makeSessionCookieValue(email: string) {
  const encoded = Buffer.from(email).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function readSessionCookieValue(raw: string): string | null {
  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return Buffer.from(encoded, "base64url").toString("utf-8");
  } catch {
    return null;
  }
}

// Step 1: visitor enters their email on /dashboard/login. Only sends
// a link if that email actually has an application on file — this
// isn't a general account-creation flow, it's access to an existing
// application, so there's no reason to email someone who's never
// applied. Lightly rate-limited by refusing a new token while a
// previous one for the same email is still unexpired and unused,
// rather than a full request-rate limiter — proportionate to this
// being a low-volume, invite-only-in-practice flow, not a public
// signup form that needs hardening against abuse at scale.
export async function requestLoginLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    redirect("/dashboard/login?error=invalid");
  }

  // Everything below is best-effort: a DB hiccup or email-send failure
  // should never surface as a crash to the visitor, and should never
  // let the response timing/shape reveal whether this email actually
  // has an application on file. redirect() works by throwing, so it's
  // deliberately kept outside this try/catch — the single redirect
  // below always runs, success or failure.
  try {
    const hasApplication = await db
      .select({ id: applications.id, preferredLang: applications.preferredLang })
      .from(applications)
      .where(eq(applications.email, email))
      .limit(1);

    if (hasApplication.length > 0) {
      const now = new Date();
      const existing = await db
        .select({ id: loginTokens.id })
        .from(loginTokens)
        .where(
          and(
            eq(loginTokens.email, email),
            isNull(loginTokens.usedAt),
            gt(loginTokens.expiresAt, now.toISOString())
          )
        )
        .limit(1);

      if (existing.length === 0) {
        const token = randomUUID().replace(/-/g, "");
        const expiresAt = new Date(now.getTime() + TOKEN_TTL_MINUTES * 60_000).toISOString();
        await db.insert(loginTokens).values({
          id: randomUUID(),
          email,
          token,
          expiresAt,
          createdAt: now.toISOString(),
        });

        const lang = hasApplication[0].preferredLang === "en" ? "en" : "ar";
        const link = `${SITE_URL}/dashboard/verify?token=${token}`;
        await sendEmail({
          to: email,
          subject: loginLinkSubject(lang),
          react: LoginLinkEmail({ lang, link }),
        });
      }
    }
  } catch (err) {
    console.error("requestLoginLink failed:", err);
  }

  redirect("/dashboard/login/sent");
}

// Step 2: visitor clicks the emailed link, which hits this with the
// token as a query param. A DB failure here genuinely can't succeed
// (there's no way to verify a token without reading it), so on error
// it fails closed to the same "expired/invalid" redirect a visitor
// would see for a bad token — never a raw crash — while logging the
// real cause server-side.
export async function verifyLoginToken(token: string) {
  let row: typeof loginTokens.$inferSelect | undefined;
  const now = new Date();

  try {
    const rows = await db
      .select()
      .from(loginTokens)
      .where(eq(loginTokens.token, token))
      .limit(1);
    row = rows[0];
  } catch (err) {
    console.error("verifyLoginToken lookup failed:", err);
    redirect("/dashboard/login?error=expired");
  }

  if (!row || row.usedAt || new Date(row.expiresAt) < now) {
    redirect("/dashboard/login?error=expired");
  }

  try {
    await db.update(loginTokens).set({ usedAt: now.toISOString() }).where(eq(loginTokens.id, row.id));
  } catch (err) {
    console.error("verifyLoginToken consume failed:", err);
    redirect("/dashboard/login?error=expired");
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, makeSessionCookieValue(row.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_MAX_AGE_DAYS,
  });
  redirect("/dashboard");
}

export async function logoutStudent() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/dashboard/login");
}

// Returns the authenticated student's email, or null — does not
// redirect, for pages that want to branch (e.g. show a login prompt
// vs the dashboard) rather than force a navigation.
export async function getStudentEmail(): Promise<string | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return readSessionCookieValue(raw);
}

export async function requireStudentEmail(): Promise<string> {
  const email = await getStudentEmail();
  if (!email) redirect("/dashboard/login");
  return email;
}
