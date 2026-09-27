import { IconCircleArrowDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { projectHref } from "@/lib/constants";
import type { ShowcaseItem } from "@/types/content";

/**
 * The phone half of Our Projects. Hover has no touch equivalent, so rather
 * than one cover that never matches the name you're about to tap, every item
 * carries its own — the preview becomes the list. No state, no client JS.
 *
 * `sizes` matches ProjectShowcase's exactly so both resolve to the same
 * optimized URL at a given width; the hidden desktop stack costs no extra
 * request here.
 */
function Card({ item }: { item: ShowcaseItem }) {
  return (
    <Link href={projectHref(item.slug)} className="block">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      {/* Deliberately NOT wrapped in <ViewTransition>. This list and
          ProjectShowcase are both always mounted — only their CSS differs — and
          React rejects two mounted ViewTransitions sharing a name. The brand
          page has one h1 to pair with, so the name lives on the showcase.
          Re-adding it here brings back "two components with the same name". */}
      <h3 className="mt-3 text-subheading font-medium tracking-tight">
        {item.title}
      </h3>
    </Link>
  );
}

export function ProjectList({
  projects,
  collections,
}: {
  projects: ShowcaseItem[];
  collections: ShowcaseItem[];
}) {
  return (
    <div className="md:hidden">
      <p className="mb-8 max-w-xs text-lead text-foreground">
        A Selection Of Work Built To Make Brands Stand Out.
      </p>

      <ul className="space-y-10">
        {projects.map((project) => (
          <li key={project.slug}>
            <Card item={project} />
          </li>
        ))}
      </ul>

      {/* The arrow points at the collections, which now genuinely sit below. */}
      <div className="mt-16 flex items-center gap-6">
        <p className="text-caption leading-tight text-foreground">
          Browse Our
          <br />
          Logo &amp; Webfolio
        </p>
        <IconCircleArrowDown
          className="size-12 shrink-0 stroke-1 text-foreground"
          aria-hidden="true"
        />
      </div>

      <ul className="mt-10 space-y-10">
        {collections.map((collection) => (
          <li key={collection.slug}>
            <Card item={collection} />
          </li>
        ))}
      </ul>
    </div>
  );
}
