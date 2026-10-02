import type { MetadataRoute } from "next";
import { getPublishedSchools, getPublishedAccommodations } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages available in both languages. Accommodation is still
  // Arabic-only (no English names in the database), so it is listed
  // once.
  const bilingualPaths = [
    "",
    "/schools",
    "/apply",
    "/about",
    "/journey",
    "/scholarships",
    "/consultation",
    "/quiz",
    "/track",
    "/calculator",
    "/guides",
    "/guides/study-aviation-in-south-africa",
    "/guides/south-africa-study-visa",
    "/guides/ppl-vs-cpl",
    "/guides/flight-training-cost-south-africa",
    "/guides/sacaa-medical-requirements",
    "/guides/how-long-to-become-a-pilot",
    "/guides/student-accommodation-south-africa",
    "/guides/how-to-choose-a-flight-school",
    "/guides/common-challenges-flight-training",
    "/guides/tips-to-succeed-in-south-africa",
    "/guides/pilot-salary-and-jobs",
    "/guides/why-is-flight-training-expensive",
  ];

  // Every bilingual page is listed once per language, each entry
  // naming its other-language twin — the sitemap form of hreflang.
  const priority: Record<string, number> = {
    "": 1,
    "/schools": 0.9,
    "/guides/study-aviation-in-south-africa": 0.9,
    "/guides/flight-training-cost-south-africa": 0.9,
    "/scholarships": 0.85,
    "/apply": 0.8,
    "/guides": 0.8,
    "/track": 0.3,
  };
  const pair = (p: string, extra: Partial<MetadataRoute.Sitemap[number]> = {}): MetadataRoute.Sitemap => {
    const ar = `${SITE_URL}${p}`;
    const en = `${SITE_URL}/en${p}`;
    const alternates = { languages: { ar, en, "x-default": ar } };
    const base = { changeFrequency: "weekly" as const, priority: priority[p] ?? 0.7, alternates, ...extra };
    return [{ url: ar, ...base }, { url: en, ...base }];
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    ...bilingualPaths.flatMap((p) => pair(p)),
    { url: `${SITE_URL}/accommodation`, changeFrequency: "weekly", priority: 0.7 },
  ];

  // A failed DB connection here should never take down the sitemap
  // (or the build) — fall back to just the static routes.
  try {
    const [schools, accommodation] = await Promise.all([
      getPublishedSchools(),
      getPublishedAccommodations(),
    ]);

    const schoolRoutes: MetadataRoute.Sitemap = schools.flatMap((s) =>
      pair(`/schools/${s.slug}`, {
        lastModified: s.updatedAt ? new Date(s.updatedAt) : undefined,
        priority: 0.8,
      }),
    );

    const accommodationRoutes: MetadataRoute.Sitemap = accommodation.map((a) => ({
      url: `${SITE_URL}/accommodation/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...schoolRoutes, ...accommodationRoutes];
  } catch (err) {
    console.error("sitemap: failed to load dynamic routes:", err);
    return staticRoutes;
  }
}
