import { ViewTransition } from "react";
import { showcaseTransitionName } from "@/lib/constants";
import { BRAND_BLOCKS } from "./blocks";
import { BrandBlocks } from "./components/BrandBlocks";
import { BrandNotes } from "./components/BrandNotes";
import { BrandPageNav } from "./components/BrandPageNav";
import type { ShowcaseItem } from "@/types/content";

/**
 * The header every brand page opens with: a centred band holding the name on
 * its own row, then the tagline and blurb indented a third of the way across.
 *
 * At max-w-2xl the copy column (8 of 12) is 448px, but the comp measures both
 * the tagline and the blurb at 379px — max-w-94.75 (94.75 × 4px) caps the whole
 * block, so they share a left edge and break the same way. It applies at every
 * width, which is also what shapes the measure on phones, where the grid is off
 * and the indent drops away.
 */
export function BrandPage({ item }: { item: ShowcaseItem }) {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <header className="mx-auto max-w-2xl lg:grid lg:grid-cols-12">
        {/* Pairs with the showcase name on the home page. */}
        <ViewTransition
          name={showcaseTransitionName(item.slug)}
          share="morph"
          default="none"
        >
          <h1 className="text-subheading font-medium tracking-tight sm:text-heading lg:col-span-12 lg:text-display">
            {item.title}
          </h1>
        </ViewTransition>

        {item.tagline || item.description ? (
          <div className="mt-8 max-w-94.75 lg:col-span-8 lg:col-start-5 lg:mt-12">
            {item.tagline ? (
              // The size token ships a 1.5 line-height; the comp sets the
              // tagline as a tight two-line stack, so leading-snug is a
              // deliberate override.
              <p className="text-subheading font-medium leading-snug tracking-tight">{item.tagline}</p>
            ) : null}
            {item.description ? <p className="mt-4 text-caption ">{item.description}</p> : null}
          </div>
        ) : (
          <p className="mt-8 text-body lg:col-span-8 lg:col-start-5 lg:mt-12">Design pending.</p>
        )}
      </header>

      {/* Blocks and the closing CTA bars band together flush — the gap belongs
          above the run, not between its pieces. */}
      <div className="mt-16 lg:mt-24">
        <BrandBlocks blocks={BRAND_BLOCKS[item.slug] ?? []} />
        <BrandPageNav slug={item.slug} />
      </div>

      <BrandNotes blocks={BRAND_BLOCKS[item.slug] ?? []} />
    </article>
  );
}
