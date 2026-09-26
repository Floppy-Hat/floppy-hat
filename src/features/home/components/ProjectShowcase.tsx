"use client";

import { IconCircleArrowDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectHref } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ShowcaseItem } from "@/types/content";

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

  const linkClass = (item: ShowcaseItem) =>
    cn(
      "block text-subheading font-medium tracking-tight sm:text-heading lg:text-display",
      item.slug === active.slug
        ? "text-foreground"
        : "text-foreground/60 hover:text-foreground",
    );

  // Hovering or focusing a name swaps the cover; clicking opens its page.
  const preview = (item: ShowcaseItem) => ({
    onMouseEnter: () => setActiveSlug(item.slug),
    onFocus: () => setActiveSlug(item.slug),
  });

  return (
    // Cover and list share row 1; the caption drops to row 2 under the cover
    // only, so the list column stretches to the image height and no further.
    <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
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
              <Link
                href={projectHref(project.slug)}
                {...preview(project)}
                data-active={project.slug === active.slug}
                className={linkClass(project)}
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-0">
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
                <Link
                  href={projectHref(collection.slug)}
                  {...preview(collection)}
                  data-active={collection.slug === active.slug}
                  className={linkClass(collection)}
                >
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
