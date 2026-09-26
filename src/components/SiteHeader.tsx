import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
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

        {/* Phones: drawer. Desktop: the inline list. */}
        <div className="lg:hidden">
          <MobileNav />
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
