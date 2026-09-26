"use client";

import {
  animate,
  domAnimation,
  LazyMotion,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The animated digits are `aria-hidden` and the real figure is exposed once in
 * an `sr-only` span — a number ticking from 0 is noise to a screen reader, and
 * the pre-animation value would otherwise be announced as "0".
 */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  const count = useMotionValue(0);
  const text = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!inView) return;
    // Reading the preference inside the effect keeps it off the server render,
    // so there is no transform/text mismatch to hydrate.
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduced, count, value]);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        <LazyMotion features={domAnimation} strict>
          <m.span>{text}</m.span>
        </LazyMotion>
        {suffix}
      </span>
    </p>
  );
}
