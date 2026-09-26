/**
 * Absolute base for metadata URLs (OG images, canonicals).
 *
 * Deliberately NOT `VERCEL_URL`: that is the per-deployment hostname, which
 * Deployment Protection puts behind a login — so crawlers fetching the OG image
 * get a 302 to an auth page and the link preview renders with no image.
 *
 * Production uses the project's stable production domain; previews use the
 * branch alias, which stays the same across pushes to that branch.
 */
const vercelHost =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : (process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL);

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const SITE = {
  name: "Floppy Hat",
  title: "Floppy Hat — Brand, Social And Website Design",
  description:
    "We create brands that look different, feel right, and stay memorable. Brand identity, social media graphics and websites for businesses that want to be noticed.",
} as const;
