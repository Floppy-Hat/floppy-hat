import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A coloured band you put content inside — the one block type that isn't
 * artwork.
 *
 * Colours are the *client's* brand, not ours, so they arrive as values rather
 * than semantic tokens. That's the single place this project uses a raw hex,
 * and only because a per-client colour can't be a design-system token without
 * globals.css growing one entry per project. Omit them and the panel falls
 * back to the site's own `bg-card` / `text-card-foreground`, which theme
 * normally.
 *
 * Exported on its own so a one-off page can compose it directly with whatever
 * children it needs, instead of going through the declarative block data.
 */
export function BrandPanel({
  background,
  foreground,
  align = "left",
  className,
  children,
}: {
  background?: string;
  foreground?: string;
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
}) {
  const branded = Boolean(background || foreground);

  return (
    <div
      className={cn(
        "px-6 py-24 lg:py-36",
        !branded && "bg-card text-card-foreground",
        className,
      )}
      style={
        branded ? { backgroundColor: background, color: foreground } : undefined
      }
    >
      <div
        className={cn("mx-auto max-w-2xl", align === "center" && "text-center")}
      >
        {children}
      </div>
    </div>
  );
}
