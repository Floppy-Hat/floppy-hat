import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** No active state: the nav scrolls to sections on one page, so the pathname
 *  never distinguishes them. Server Component — the header ships no JS. */
export function NavLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-x-8", className)}>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="block py-2 text-caption uppercase tracking-wide text-foreground/70 underline-offset-8 hover:text-foreground hover:underline focus-visible:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
