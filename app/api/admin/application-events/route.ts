import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { applicationEvents } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "المعرّف مطلوب" }, { status: 400 });
  }

  try {
    const events = await db
      .select()
      .from(applicationEvents)
      .where(eq(applicationEvents.applicationId, id))
      .orderBy(desc(applicationEvents.createdAt));

    return NextResponse.json({ events });
  } catch (err) {
    console.error("application-events fetch failed:", err);
    return NextResponse.json({ events: [] });
  }
}
