/**
 * Absolute base for metadata URLs (OG images, canonicals).
 *
 * Resolved at build time, so every deployment advertises itself: preview builds
 * point at their own URL instead of a production domain that may not exist yet.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const SITE = {
  name: "Floppy Hat",
  title: "Floppy Hat — Brand, Social And Website Design",
  description:
    "We create brands that look different, feel right, and stay memorable. Brand identity, social media graphics and websites for businesses that want to be noticed.",
} as const;
