import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { applications } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  const clean = String(email || "").trim().toLowerCase();

  if (!clean) {
    return NextResponse.json({ exists: false });
  }

  try {
    const rows = await db
      .select({ referenceCode: applications.referenceCode })
      .from(applications)
      .where(sql`lower(${applications.email}) = ${clean}`)
      .limit(1);

    if (!rows[0]) {
      return NextResponse.json({ exists: false });
    }

    // Only ever return the reference code, never name/phone/notes/etc —
    // this endpoint is unauthenticated by design (called mid-form,
    // before we know this really is the same person), so it must stay
    // minimal. Full details still require the matching email on /track.
    return NextResponse.json({ exists: true, referenceCode: rows[0].referenceCode });
  } catch (err) {
    console.error("check-email failed:", err);
    // Fail open — never block a real applicant from continuing just
    // because this convenience check errored.
    return NextResponse.json({ exists: false });
  }
}
