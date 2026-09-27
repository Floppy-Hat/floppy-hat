import Link from "next/link";
import { nextShowcaseSlug, projectHref } from "@/lib/constants";

// Shared between the two bars. Plain concatenation rather than cn(): there are
// no conflicting classes to merge, and the text-* size tokens are exactly what
// cn's table has historically mistaken for colours.
const BAR =
  "flex min-h-32 items-center justify-center px-6 text-lead font-medium tracking-tight transition-opacity hover:opacity-90";

/**
 * Closes every brand page. Two equal bars flush under the last block, the way
 * the comp bands them.
 *
 * Stacks on phones — two targets side by side at 375px leaves neither room for
 * its label, and `min-h-32` keeps each one well past the 44px tap minimum.
 */
export function BrandPageNav({ slug }: { slug: string }) {
  return (
    <nav aria-label="More from Floppy Hat" className="grid sm:grid-cols-2">
      <Link href="/#contact" className={`${BAR} bg-primary text-primary-foreground`}>
        Contact Us
      </Link>
      <Link
        href={projectHref(nextShowcaseSlug(slug))}
        className={`${BAR} bg-accent text-accent-foreground`}
      >
        Next Work
      </Link>
    </nav>
  );
}
