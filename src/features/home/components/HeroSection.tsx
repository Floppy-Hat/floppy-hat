import type { Hero } from "@/types/content";

const HERO: Hero = {
  eyebrow: "Branding studio",
  headline: "Your competitor has better branding.",
  subhead: "Placeholder subhead. Replace when the copy lands.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See our work", href: "#work" },
};

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-heading text-sm uppercase tracking-tight text-primary">
        {HERO.eyebrow}
      </p>
      <h1 className="font-heading mt-4 text-5xl uppercase tracking-tight">
        {HERO.headline}
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{HERO.subhead}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={HERO.primaryCta.href}
          className="font-heading rounded-lg bg-primary px-6 py-3 text-sm uppercase tracking-tight text-primary-foreground"
        >
          {HERO.primaryCta.label}
        </a>
        {HERO.secondaryCta ? (
          <a
            href={HERO.secondaryCta.href}
            className="font-heading rounded-lg border border-border px-6 py-3 text-sm uppercase tracking-tight"
          >
            {HERO.secondaryCta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
