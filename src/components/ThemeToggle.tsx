"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

/** Dark is `:root`, so switching is just adding or removing `.light`.
 *  Which icon shows is decided in CSS, not React state — nothing to hydrate
 *  and no flash of the wrong icon on first paint. */
export function ThemeToggle() {
  const toggle = () => {
    const isLight = document.documentElement.classList.toggle("light");
    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch {
      // Private browsing can throw on write; the toggle still works for now.
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label="Toggle light and dark theme"
      onClick={toggle}
      className="cursor-pointer"
    >
      <IconSun className="hidden size-5 dark:block" aria-hidden="true" />
      <IconMoon className="size-5 dark:hidden" aria-hidden="true" />
    </Button>
  );
}
