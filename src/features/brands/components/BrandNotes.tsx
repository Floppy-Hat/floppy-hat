import type { BrandBlock } from "@/types/content";

type Panel = Extract<BrandBlock, { kind: "panel" }>;

/**
 * The panel copy, set plainly on the page below the CTA bars. Phones only.
 *
 * `BrandBlocks` hides the coloured panels below lg and this takes over, which
 * is the same split the site header uses for its two navs: both are in the
 * markup, `display: none` keeps the inactive one out of the accessibility tree,
 * so the copy is only ever announced once.
 *
 * No panel colours here — the band is a desktop device, and on a phone the copy
 * reads better on the page itself.
 */
export function BrandNotes({ blocks }: { blocks: BrandBlock[] }) {
  const panels = blocks.filter((block): block is Panel => block.kind === "panel");

  if (panels.length === 0) return null;

  return (
    <div className="mt-16 lg:hidden">
      {panels.map((panel) => (
        <section key={panel.id} className="mt-12 first:mt-0">
          {panel.title ? (
            <h2 className="mb-8 text-subheading font-semibold tracking-tight">
              {panel.title}
            </h2>
          ) : null}
          {panel.body?.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-body">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
