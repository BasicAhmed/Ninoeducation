import type { MetadataRoute } from "next";
import { getPublishedSchools, getPublishedAccommodations } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages confirmed fully bilingual — no hardcoded Arabic left in
  // either their metadata or their actual rendered content, verified
  // directly (not assumed) by loading each one at its /en/* URL and
  // checking the actual rendered text. School and accommodation
  // listings/profiles still have Arabic-only descriptions in the
  // database (only the name field is bilingual), so those stay
  // excluded until that content gets translated too.
  const bilingualPaths = [
    "",
    "/apply",
    "/about",
    "/journey",
    "/scholarships",
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

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/schools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/quiz`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/track`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/apply`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/journey`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/scholarships`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/guides`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/study-aviation-in-south-africa`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/guides/south-africa-study-visa`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/ppl-vs-cpl`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/flight-training-cost-south-africa`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/sacaa-medical-requirements`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/how-long-to-become-a-pilot`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/student-accommodation-south-africa`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/how-to-choose-a-flight-school`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/common-challenges-flight-training`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/tips-to-succeed-in-south-africa`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/pilot-salary-and-jobs`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/why-is-flight-training-expensive`, changeFrequency: "monthly", priority: 0.8 },
    ...bilingualPaths.map((p) => ({
      url: `${SITE_URL}/en${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 0.9 : 0.7,
    })),
  ];

  // A failed DB connection here should never take down the sitemap
  // (or the build) — fall back to just the static routes.
  try {
    const [schools, accommodation] = await Promise.all([
      getPublishedSchools(),
      getPublishedAccommodations(),
    ]);

    const schoolRoutes: MetadataRoute.Sitemap = schools.map((s) => ({
      url: `${SITE_URL}/schools/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

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
