import type { ShowcaseItem } from "@/types/content";

/** One-pager: every link but Home scrolls to a section. The leading "/" keeps
 *  them working from the collection pages too, not just from home. */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const CONTACT = {
  /** Shown in the footer exactly as the design writes it. */
  label: "info@floppyhat.agency",
  email: "info@floppyhat.agency",
  // ponytail: number pending — append it to the wa.me URL when the client sends one.
  whatsapp: "https://wa.me/",
} as const;

const COVERS = "/brandings/our-projects-brand";

/** Case studies — hovering one swaps the cover, clicking opens its page. */
export const PROJECTS: ShowcaseItem[] = [
  {
    slug: "hardline-dept",
    title: "Hardline Dept.",
    image: `${COVERS}/hardline-dept.png`,
    tagline: "A Bold Identity Built For Strength.",
    description:
      "Hardline Dept. Is A Gym Brand Built Around Discipline, Strength, And Relentless Progress. We Developed A Strong Visual Identity That Reflects The Intensity Of Training And The Mindset Behind Pushing Beyond Your Limits.",
  },
  {
    slug: "brasa-steak-house",
    title: "Brasa Steak House",
    tagline: "A bold identity for a modern steakhouse.",
    description:
      "Brasa Steak House brings together premium cuts, bold flavors, and a refined dining experience. We created a strong visual identity that captures the warmth, character, and craft behind every plate.",
    image: `${COVERS}/brasa-steak-house.png`,
  },
  {
    slug: "orro-buns-coffee",
    title: "Orro Buns & Coffee",
    image: `${COVERS}/orro-buns-coffee.png`,
    tagline: "A Fresh Take On Everyday Coffee And Baked Favorites.",
    description:
      "Orro Buns & Coffee Brings Together Freshly Baked Buns, Quality Coffee, And A Warm, Inviting Atmosphere. We Created A Visual Identity That Feels Playful, Approachable, And Memorable While Capturing The Brand's Love For Good Food And Good Coffee.",
  },
  {
    slug: "travellite-footwear",
    title: "Travellite Footwear",
    tagline: "Comfort made for every step.",
    description:
      "Travellite Footwear creates comfortable, versatile shoes designed to keep up with everyday movement. We developed a clean and approachable brand identity that reflects the freedom, comfort, and ease of going wherever life takes you.",
    image: `${COVERS}/travellite-footwear.png`,
  },
  {
    slug: "raphael-renard",
    title: "Raphael Renard",
    tagline: "A refined identity for a modern barbershop.",
    description:
      "Raphael Renard brings classic barbering together with a modern, refined experience. We created a distinctive visual identity that reflects precision, confidence, and timeless style.",
    image: `${COVERS}/raphael-renard.png`,
  },
];

/** Collections — same hover behaviour, but each has its own hand-built page. */
export const COLLECTIONS: ShowcaseItem[] = [
  {
    slug: "logofolio",
    title: "Logofolio",
    tagline: "A collection of identities built to be remembered.",
    description:
      "A selection of logos created for brands across different industries, each designed with a distinct visual language, purpose, and personality.",
    image: `${COVERS}/logofolio.png`,
  },
  {
    slug: "web-design-showcase",
    title: "Web Design Showcase",
    tagline: "Websites built to make an impression.",
    description:
      "A selection of websites designed for brands across different industries, each crafted with a clear visual direction, intuitive structure, and a distinct digital experience.",
    // No dedicated 555x555 cover was exported for this one, so it borrows the
    // first webfolio band. The showcase crops covers square and the laptop is
    // centred, so it survives the crop.
    image: "/brandings/webfolio/WEBFOLIO 1.png",
  },
];

export const projectHref = (slug: string) => `/projects/${slug}`;

/** Showcase order — projects then collections, the order the home page lists
 *  them and the order "Next Work" walks. */
export const SHOWCASE_ITEMS: ShowcaseItem[] = [...PROJECTS, ...COLLECTIONS];

/** The slug after `slug`, wrapping past the last one. An unknown slug falls
 *  through to the first item rather than throwing — a brand page only renders
 *  for a slug in this list, so there is nothing better to point at. */
export function nextShowcaseSlug(slug: string) {
  const index = SHOWCASE_ITEMS.findIndex((item) => item.slug === slug);
  return SHOWCASE_ITEMS[(index + 1) % SHOWCASE_ITEMS.length].slug;
}

/** Ties a showcase name to its brand page title so the browser morphs one into
 *  the other across the navigation. Both ends must agree on this string. */
export const showcaseTransitionName = (slug: string) => `showcase-${slug}`;
