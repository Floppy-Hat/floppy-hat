import Image from "next/image";
import Link from "next/link";
import { projectHref } from "@/lib/constants";
import type { ShowcaseItem } from "@/types/content";

/**
 * The phone half of Our Projects: a two-up grid of covers.
 *
 * Hover has no touch equivalent, so rather than one shared cover that never
 * matches the name you're about to tap, every item carries its own — the
 * preview becomes the list. No state, no client JS.
 *
 * `sizes` says 50vw because the cards are half-width here.
 */
function Card({ item }: { item: ShowcaseItem }) {
  return (
    <Link href={projectHref(item.slug)} className="block">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {item.image ? <Image src={item.image} alt="" fill sizes="50vw" className="object-cover" /> : null}
      </div>
      {/* Deliberately NOT wrapped in <ViewTransition>. This list and
          ProjectShowcase are both always mounted — only their CSS differs — and
          React rejects two mounted ViewTransitions sharing a name. The brand
          page has one h1 to pair with, so the name lives on the showcase.
          Re-adding it here brings back "two components with the same name". */}
      <h3 className="mt-2 text-subheading font-medium tracking-tight">{item.title}</h3>
    </Link>
  );
}

export function ProjectList({ projects, collections }: { projects: ShowcaseItem[]; collections: ShowcaseItem[] }) {
  // One flat grid — on phones the collections are just more cards, so the
  // "Browse Our Logo & Webfolio" divider the desktop column uses would only
  // interrupt the run.
  const items = [...projects, ...collections];

  return (
    <div className="md:hidden">
      <p className="mb-6 max-w-xs text-lead ">A Selection Of Work Built To Make Brands Stand Out.</p>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
        {items.map((item) => (
          <li key={item.slug}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
