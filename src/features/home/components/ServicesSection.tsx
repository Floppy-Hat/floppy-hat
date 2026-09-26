import { WipeIn } from "./WipeIn";
import { Logo } from "@/components/Logo";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/types/content";

const SERVICES: Service[] = [
  {
    id: "brand-design",
    title: "Brand Design",
    description:
      "Logos, Visual Identities, Color Systems, Typography, And The Pieces That Make Your Brand Recognizable.",
  },
  {
    id: "social-media-graphics",
    title: "Social Media Graphics",
    description: "Posts, Carousels, Campaigns, And Visual Content Built Around Your Brand.",
  },
  {
    id: "website-design",
    title: "Website Design",
    description: "Websites That Look Sharp, Feel Intentional, And Give Your Brand A Proper Place Online.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 pt-16 lg:pt-24">
        <h2 className="text-subheading font-medium tracking-tight lg:text-title">What We Do</h2>
      </div>

      {/* The card block breaks out of the content container and runs to the
          page gutter, as in the comp. The copy below sits inside the same block
          so it starts at the cards' left edge. */}
      <div className="px-6 pb-16 lg:px-10 lg:pb-24">
        {/* Width is capped rather than the tracks being pinned: 1015px across
            three columns with 20px gaps makes each card exactly the comp's
            325px at xl, and shrink gracefully below it instead of overflowing. */}
        <div className="mt-10 lg:mt-16 lg:ml-auto lg:max-w-4xl xl:max-w-[1015px]">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <li key={service.id}>
                {/* Left to right, ~90ms apart — the page's one orchestrated moment. */}
                <WipeIn delay={index * 0.09} className="h-full">
                {/* --card-spacing drives Card's py and CardHeader's px, so the
                    comp's 14px padding is set once. The rest strips Card's
                    panel chrome: no radius, no ring, no shadow, solid brand. */}
                <Card className="h-full gap-0 rounded-none bg-primary text-primary-foreground shadow-none ring-0 [--card-spacing:--spacing(3.5)] lg:min-h-80">
                  <CardHeader className="gap-0">
                    <Logo className="w-24 justify-self-end" />
                  </CardHeader>
                  {/* CardTitle renders a div, so the heading level is declared.
                      Two lines are reserved from lg up, where the narrower card
                      wraps "Social Media Graphics" — that keeps every card's
                      description starting on the same line. */}
                  <CardTitle
                    role="heading"
                    aria-level={3}
                    className="mt-12 px-(--card-spacing) text-subheading tracking-tight lg:mt-22 lg:min-h-16"
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription className="mt-3 px-(--card-spacing) text-body leading-relaxed text-primary-foreground">
                    {service.description}
                  </CardDescription>
                </Card>
                </WipeIn>
              </li>
            ))}
          </ul>

          {/* Same timing as the cards — starts with the first one rather than
              trailing the sequence. */}
          <WipeIn className="mt-10">
            <p className="max-w-lg text-subheading font-medium tracking-tight">
              Three Things. One Clear Goal: Make Your Brand Impossible To Overlook.
            </p>
            <p className="mt-6 max-w-md text-body leading-relaxed lg:pl-24">
              We Build The Visual Side Of Your Business From The Ground Up &mdash; From A Memorable Identity To A
              Website And Social Presence That Feel Like One Brand.
            </p>
          </WipeIn>
        </div>
      </div>
    </section>
  );
}
