import type { MetadataRoute } from "next";
import { projectHref, SHOWCASE_ITEMS } from "@/lib/constants";
import { siteUrl } from "@/lib/site";

/**
 * Served at /sitemap.xml.
 *
 * Built from SHOWCASE_ITEMS, the same list that drives `generateStaticParams`,
 * so a brand page cannot exist without appearing here — or linger here after
 * being removed.
 *
 * `lastModified` is build time. The content is static and ships with the
 * deploy, so a deploy is genuinely when these pages last changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SHOWCASE_ITEMS.map((item) => ({
      url: new URL(projectHref(item.slug), siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
