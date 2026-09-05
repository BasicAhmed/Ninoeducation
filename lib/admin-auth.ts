"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

const COOKIE_NAME = "nino_admin_session";

function expectedToken() {
  const pw = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(pw).digest("hex");
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (password && password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies();
    jar.set(COOKIE_NAME, expectedToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token || token !== expectedToken()) {
    redirect("/admin/login");
  }
}

// Like requireAdmin, but returns a boolean instead of redirecting —
// for API routes that need to return JSON, not a redirect response.
export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  return Boolean(token) && token === expectedToken();
}
