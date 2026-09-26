import Image from "next/image";
import { CountUp } from "./CountUp";
import type { Stat } from "@/types/content";

const STATS: Stat[] = [
  { id: "projects", value: 70, suffix: "+", label: "Projects completed" },
  { id: "experience", value: 5, suffix: "+", label: "Years of experience" },
];

export function HeroSection() {
  return (
    // One grid cell on phones — image, scrim and headline stack — and two rows
    // from md, where the image drops below the headline as the comp's band.
    <section className="grid">
      {/* aspect-[12/5] is the source's own 1440x600 ratio, so the band is
          the comp's framing exactly — nothing is cropped. */}
      <div className="col-start-1 row-start-1 overflow-hidden md:row-start-2 md:aspect-[12/5]">
        <Image
          src="/app/kid-hero.png"
          alt="A child in a homemade foil spacesuit holding up a paper plane against an overcast sky"
          width={1440}
          height={600}
          sizes="100vw"
          className="h-full w-full object-cover"
          loading="eager"
          preload
        />
      </div>

      {/* A gradient rather than a flat dim: the image stays visible up top and
          only darkens under the copy, which sits at the bottom. White text on
          the /70 band clears 8.6:1, so the headline survives whatever sky
          drifts beneath it. Phones only. */}
      <div
        className="col-start-1 row-start-1 bg-gradient-to-b from-scrim/25 via-scrim/70 to-scrim/95 md:hidden"
        aria-hidden="true"
      />

      <div className="col-start-1 row-start-1 flex min-h-96 flex-wrap items-end justify-between gap-x-12 gap-y-10 px-6 pt-12 pb-12 md:row-start-1 md:min-h-0 lg:px-10 lg:pt-40 lg:pb-16">
        <h1 className="max-w-3xl text-subheading font-medium tracking-tight text-primary-foreground sm:text-heading md:text-foreground lg:text-display">
          We Create Brands
          <br className="hidden lg:inline" /> That Look Different,
          <br className="hidden lg:inline" /> Feel Right, And Stay Memorable.
        </h1>
        <div className="flex gap-8 lg:gap-10">
          {STATS.map((stat) => (
            <div key={stat.id}>
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="text-subheading font-medium tracking-tight text-primary-foreground md:text-foreground"
              />
              <p className="mt-1 max-w-24 text-caption uppercase leading-tight tracking-wide text-primary-foreground md:text-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
