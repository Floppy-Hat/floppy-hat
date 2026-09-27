import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Served at /robots.txt.
 *
 * Preview deployments are left alone: Vercel already sends
 * `x-robots-tag: noindex` on them, which outranks anything written here, and
 * `siteUrl` resolves to the branch host so the sitemap link still points at the
 * deployment the crawler is looking at rather than production.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
