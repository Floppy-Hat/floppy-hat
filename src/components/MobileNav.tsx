"use client";

import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Phone navigation as a right-hand drawer.
 *
 * Client because the sheet needs state — and because the links are in-page
 * anchors, each one has to close the drawer as it navigates, or it would sit
 * open over the section it just scrolled to.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon-lg" aria-label="Open menu" />}
      >
        <IconMenu2 className="size-6" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-3/4 gap-0 rounded-none border-border bg-background p-6 sm:max-w-xs"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Main" className="mt-12">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-subheading font-medium tracking-tight text-foreground/70 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
