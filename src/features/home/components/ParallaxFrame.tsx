"use client";

import {
  domAnimation,
  LazyMotion,
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Clipping frame that drifts its contents as the page scrolls.
 *
 * Client leaf by necessity — `useScroll` needs the DOM — but the image itself
 * is passed in as `children` from a Server Component, so nothing else in the
 * hero crosses the boundary. Reduced motion is handled in CSS rather than a
 * `useReducedMotion()` branch, which would render a different transform on the
 * server than on the client and trip a hydration mismatch.
 */
export function ParallaxFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Progress is 0 while the frame's top is at or below the viewport top, which
  // is where it sits on page load — so the image rests at its true framing.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Both start at identity: at rest the image is exactly its source framing,
  // uncropped. The zoom grows with the drift so there is always more overhang
  // (scale-1)/2 than travel — 20% against 15% at the end of the pass.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {/* `strict` rejects `motion.*`, so the full feature bundle can't sneak in. */}
      <LazyMotion features={domAnimation} strict>
        <m.div
          style={{ y, scale }}
          className="h-full motion-reduce:!transform-none"
        >
          {children}
        </m.div>
      </LazyMotion>
    </div>
  );
}
