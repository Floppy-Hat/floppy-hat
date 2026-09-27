import Image from "next/image";
import { BrandPanel } from "./BrandPanel";
import { cn } from "@/lib/utils";
import type { BrandBlock } from "@/types/content";

/**
 * Renders a brand page body from its block list. Images and panels stack flush
 * in array order, the way the comp bands them — no gaps, no dividers.
 *
 * Logo bands are the exception: they sit apart, so the page background reads
 * as a hairline between each mark.
 *
 * Adding a block is one entry in `blocks.ts`; there is nothing to wire here.
 */
function Block({ block, first }: { block: BrandBlock; first: boolean }) {
  switch (block.kind) {
    case "image":
      return (
        <Image
          src={block.src}
          alt={block.alt ?? ""}
          width={block.width}
          height={block.height}
          sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
          // bg-muted is the skeleton. The box is already sized by width/height,
          // so the band fills with a surface colour the moment it lays out and
          // the opaque image covers it on load — no wrapper, no client JS.
          className="h-auto w-full bg-muted"
          // The first band is the LCP on these pages, same as the home hero.
          preload={first}
          fetchPriority={first ? "high" : undefined}
        />
      );

    case "panel":
      return (
        // Desktop only. On a phone a full-bleed tinted band becomes a wall of
        // coloured text, so the copy is lifted out and set plainly below the
        // CTA bars instead — see BrandNotes, which renders the same blocks.
        <BrandPanel
          className="hidden lg:block"
          background={block.background}
          foreground={block.foreground}
          align={block.align}
        >
          {block.title ? (
            <h2 className="mb-12 text-subheading font-semibold tracking-tight">
              {block.title}
            </h2>
          ) : null}
          {block.body?.map((paragraph) => (
            <p key={paragraph} className="mt-7 text-body">
              {paragraph}
            </p>
          ))}
        </BrandPanel>
      );

    case "logo":
      return (
        // 7/3 is the comp's band — a small mark with a lot of air around it.
        // Structural, so it has no place on the spacing scale.
        <div
          className={cn(
            "flex aspect-7/3 items-center justify-center px-6",
            // Gap between marks only — never above the first, which would
            // double up with the run's own top margin.
            !first && "mt-2",
            !block.background && "bg-card",
          )}
          style={
            block.background ? { backgroundColor: block.background } : undefined
          }
        >
          <Image
            src={block.src}
            alt={block.alt ?? ""}
            width={block.width}
            height={block.height}
            // Vectors gain nothing from the optimizer, and it blocks SVG
            // outright unless dangerouslyAllowSVG is on. This sidesteps both.
            unoptimized
          />
        </div>
      );
  }
}

export function BrandBlocks({ blocks }: { blocks: BrandBlock[] }) {
  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => (
        <Block key={block.id} block={block} first={index === 0} />
      ))}
    </>
  );
}
