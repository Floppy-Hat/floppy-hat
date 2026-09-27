import { getImageProps } from "next/image";
import Link from "next/link";
import { CountUp } from "./CountUp";
import { Button } from "@/components/ui/button";
import type { Stat } from "@/types/content";

const STATS: Stat[] = [
  { id: "projects", value: 70, suffix: "+", label: "Projects completed" },
  { id: "experience", value: 5, suffix: "+", label: "Years of experience" },
];

/**
 * Two crops of the same shot: a 390x743 portrait for phones and the 1440x600
 * landscape from lg.
 *
 * `<picture>` rather than two `<Image>`s toggled with `hidden` — the browser
 * resolves one `<source>` and fetches only that file, where display:none still
 * downloads both. This is Next's own art-direction guidance; `<Image>` can't
 * take a `<source>`, which is why getImageProps exists.
 */
function HeroPhoto() {
  const common = {
    alt: "A child in a homemade foil spacesuit holding up a paper plane against an overcast sky",
    sizes: "100vw",
    fetchPriority: "high" as const,
    // Safe here, unlike the two-<Image> pattern Next warns about: a <picture>
    // has one <img> and the browser resolves a single <source>, so eager
    // fetches one file. Lazy-loading the LCP element would cost more.
    loading: "eager" as const,
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/app/kid-hero.png",
    width: 1440,
    height: 600,
  });

  const {
    props: { srcSet: mobile, alt, ...rest },
  } = getImageProps({
    ...common,
    src: "/app/kid-hero-mobile.png",
    width: 390,
    height: 743,
  });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <img
        {...rest}
        alt={alt}
        srcSet={mobile}
        // Fills the section at every width. The portrait crop is 390x743, so
        // on a phone that is close to a 1:1 match and barely crops at all.
        className="absolute inset-0 h-full w-full bg-muted object-cover"
      />
    </picture>
  );
}

export function HeroSection() {
  return (
    // The photo is the section at every width, with the copy sitting on it —
    // no separate band, so the headline and CTA read as part of the scene the
    // way the comp frames them.
    <section className="relative isolate flex min-h-svh flex-col">
      {/* Behind the copy. Declared first so the copy needs no z-index of its
          own — it simply paints later in the same stacking context. */}
      <div className="absolute inset-0 -z-10">
        <HeroPhoto />

        {/* Gives the copy something to sit on, and blends the sky into the
            page. `background` rather than a fixed white is the point: white in
            light, black in dark, so it syncs either way and the copy stays on
            plain `text-foreground`. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-background via-background/70 to-transparent"
        />
      </div>

      {/* Sits low enough to land on the sky rather than floating above it —
          the comp drops the headline roughly a fifth of the way down. */}
      <div className="px-6 pt-20 text-center lg:pt-24">
        {/* The breaks hold at every width, so the wrap is the comp's rather
            than whatever the viewport decides. */}
        <h1 className="mx-auto max-w-4xl text-display font-medium tracking-tight sm:text-heading lg:text-display">
          We Create Brands
          <br /> That Look Different,
          <br /> Feel Right, And Stay Memorable.
        </h1>

        {/* Base UI swaps the element with `render`, and anything that isn't a
            native button also needs `nativeButton={false}` or it loses role
            and Space-key activation. */}
        <Button
          render={<Link href="/#projects" />}
          nativeButton={false}
          className="mt-8 h-auto rounded-full border-none px-8 py-4 text-body shadow-hard lg:mt-10"
        >
          See What We Do
        </Button>
      </div>

      {/* Bottom-right of the photo, which is now the whole section. */}
      <div className="absolute right-4 bottom-4 flex gap-2 lg:right-10 lg:bottom-14 lg:gap-3">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            // Tinted dark rather than light: white on a light frost over this
            // photo measures ~2.4:1, against 8.3:1 here.
            className="rounded-lg border border-glass/25 bg-scrim/45 px-3 py-2 backdrop-blur-md lg:min-w-44 lg:p-5"
          >
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              className="text-heading font-medium tracking-tight text-glass lg:text-title"
            />
            <p className="mt-0.5 max-w-24 text-xs uppercase leading-tight tracking-wide text-glass/85 lg:mt-1 lg:max-w-none">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
