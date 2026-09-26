"use client";

import { domAnimation, LazyMotion, m } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals its children by sliding a page-coloured panel off them, left to
 * right — ink being laid down rather than a fade-and-slide.
 *
 * The panel is the only thing that moves, and it moves on `transform`, so the
 * whole effect stays on the compositor. Children are passed in from a Server
 * Component, so wrapping a card costs no client JS beyond this panel.
 */
export function WipeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <LazyMotion features={domAnimation} strict>
        <m.div
          aria-hidden="true"
          // Reduced motion never renders the panel, so the card is simply there.
          className="pointer-events-none absolute inset-0 bg-background motion-reduce:hidden"
          initial={{ x: "0%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </LazyMotion>
    </div>
  );
}
