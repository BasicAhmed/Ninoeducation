import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getPublishedTestimonials(limit = 6) {
  try {
    const rows = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.status, "published"))
      .orderBy(asc(testimonials.displayOrder));
    return rows.slice(0, limit);
  } catch (err) {
    // A DB hiccup here should degrade to showing nothing, not take
    // down the whole homepage — testimonials are trust-building, not
    // critical path.
    console.error("getPublishedTestimonials failed:", err);
    return [];
  }
}

// Extracts an 11-character YouTube video ID from any common share/
// embed/watch URL shape, so admin can paste whatever link format
// they copied without needing to know the "correct" one.
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}
