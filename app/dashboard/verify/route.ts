import type { NextRequest } from "next/server";
import { verifyLoginToken } from "@/lib/student-auth";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return Response.redirect(new URL("/dashboard/login?error=expired", request.url));
  }
  // verifyLoginToken sets the session cookie and issues its own
  // redirect() internally — valid here since Route Handlers, unlike
  // plain page components, are allowed to modify cookies.
  await verifyLoginToken(token);
  return Response.redirect(new URL("/dashboard/login?error=expired", request.url));
}
