"use client";

import { IconCircleArrowDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, ViewTransition } from "react";
import { projectHref, showcaseTransitionName } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ShowcaseItem } from "@/types/content";

/**
 * One name in the list. Hovering or focusing it swaps the cover; clicking
 * opens its page, and the name morphs into that page's h1 on the way.
 *
 * Module scope on purpose — defined inside ProjectShowcase it would be a new
 * component type on every render, so React would remount every link (and drop
 * focus) each time the active item changed.
 */
function ShowcaseLink({
  item,
  isActive,
  onPreview,
}: {
  item: ShowcaseItem;
  isActive: boolean;
  onPreview: () => void;
}) {
  return (
    <ViewTransition
      name={showcaseTransitionName(item.slug)}
      share="morph"
      default="none"
    >
      <Link
        href={projectHref(item.slug)}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        data-active={isActive}
        className={cn(
          "block text-subheading font-medium tracking-tight sm:text-heading lg:text-display",
          isActive
            ? "text-foreground"
            : "text-foreground/60 hover:text-foreground",
        )}
      >
        {item.title}
      </Link>
    </ViewTransition>
  );
}

export function ProjectShowcase({
  projects,
  collections,
}: {
  projects: ShowcaseItem[];
  collections: ShowcaseItem[];
}) {
  const items = [...projects, ...collections];
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const active = items.find((item) => item.slug === activeSlug) ?? projects[0];

  return (
    // From md only — touch gets ProjectList instead, since hover has no
    // equivalent there. Cover and list share row 1; the caption drops to row 2
    // under the cover only, so the list column stretches to the image height
    // and no further.
    <div className="hidden gap-x-10 gap-y-6 md:grid md:grid-cols-2">
      {/* Every cover is rendered and cross-faded, so a swap never waits on a
          network request. Only opacity animates. */}
      <div className="relative aspect-square w-full bg-muted md:col-start-1 md:row-start-1">
        {items.map((item) =>
          item.image ? (
            <Image
              key={item.slug}
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={cn(
                "object-cover motion-safe:transition-opacity motion-safe:duration-200",
                item.slug === active.slug ? "opacity-100" : "opacity-0",
              )}
            />
          ) : null,
        )}
        {!active.image ? (
          <span className="absolute inset-0 grid place-items-center px-6 text-center text-caption text-muted-foreground">
            {active.title}
          </span>
        ) : null}
      </div>

      <p className="ml-auto max-w-xs text-right text-lead text-foreground md:col-start-1 md:row-start-2">
        A Selection Of Work Built To Make Brands Stand Out.
      </p>

      <div className="flex flex-col justify-between md:col-start-2 md:row-start-1">
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <ShowcaseLink
                item={project}
                isActive={project.slug === active.slug}
                onPreview={() => setActiveSlug(project.slug)}
              />
            </li>
          ))}
        </ul>

        <div>
          <div className="flex items-center gap-6">
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
          <ul className="mt-6">
            {collections.map((collection) => (
              <li key={collection.slug}>
                <ShowcaseLink
                  item={collection}
                  isActive={collection.slug === active.slug}
                  onPreview={() => setActiveSlug(collection.slug)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
