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
  label: "info@floppyhat.com",
  email: "info@floppyhat.com",
  // ponytail: number pending — append it to the wa.me URL when the client sends one.
  whatsapp: "https://wa.me/",
} as const;

const COVERS = "/brandings/our-projects-brand";

/** Case studies — hovering one swaps the cover, clicking opens its page. */
export const PROJECTS: ShowcaseItem[] = [
  { slug: "hardline-dept", title: "Hardline Dept.", image: `${COVERS}/hardline-dept.png` },
  { slug: "brasa-steak-house", title: "Brasa Steak House", image: `${COVERS}/brasa-steak-house.png` },
  { slug: "orro-buns-coffee", title: "Orro Buns & Coffee", image: `${COVERS}/orro-buns-coffee.png` },
  { slug: "travellite-footwear", title: "Travellite Footwear", image: `${COVERS}/travellite-footwear.png` },
  { slug: "raphael-renard", title: "Raphael Renard", image: `${COVERS}/raphael-renard.png` },
];

/** Collections — same hover behaviour, but each has its own hand-built page. */
export const COLLECTIONS: ShowcaseItem[] = [
  { slug: "logofolio", title: "Logofolio", image: `${COVERS}/logofolio.png` },
  { slug: "web-design-showcase", title: "Web Design Showcase" },
];

export const projectHref = (slug: string) => `/projects/${slug}`;
