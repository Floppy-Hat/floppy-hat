import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="px-6 py-6 lg:px-10 lg:py-8">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Floppy Hat — home">
            <Logo eager />
          </Link>
          <ThemeToggle />
        </div>

        {/* Phones: native disclosure, no JS. Desktop: the list, always open.
            Only one is ever in the accessibility tree — the other is display:none. */}
        <details className="lg:hidden">
          <summary className="grid size-12 cursor-pointer list-none place-items-center">
            <IconMenu2 className="size-6" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </summary>
          <nav aria-label="Main" className="mt-2">
            <NavLinks className="flex-col items-end gap-x-0" />
          </nav>
        </details>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
