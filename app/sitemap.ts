import type { MetadataRoute } from "next";
import { getPublishedSchools, getPublishedAccommodations } from "@/lib/schools";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/schools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/quiz`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/track`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/apply`, changeFrequency: "monthly", priority: 0.8 },
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
