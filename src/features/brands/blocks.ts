import type { BrandBlock } from "@/types/content";

/**
 * Brand page bodies, keyed by showcase slug.
 *
 * Adding artwork is one `image` entry — drop the file in
 * `public/brandings/<brand>/` and copy a line. Intrinsic `width`/`height` are
 * required (they are what keep CLS at zero) and they are not uniform: most
 * bands are 1130×700, but BRASA 5 and RAPHAEL 5 are 1130×1382.
 *
 * A `panel` is a coloured container for your own copy. It takes the client's
 * `background`/`foreground`; leave them out and it uses the site's card
 * tokens. `align: "center"` centres the text inside it.
 *
 * Order here is page order. Panels sit wherever you put them between images.
 */
/** Panel palettes. Client brand colours, so they are values rather than
 *  semantic tokens — see BrandPanel. Both clear WCAG AA comfortably:
 *  #555555 on white is 7.5:1, #D4D9B9 on #133324 is 9.5:1. */
const LIGHT_PANEL = { background: "#FFFFFF", foreground: "#555555" } as const;
const ORRO_PANEL = { background: "#133324", foreground: "#D4D9B9" } as const;

export const BRAND_BLOCKS: Record<string, BrandBlock[]> = {
  "hardline-dept": [
    { kind: "image", id: "hardline-dept-1", src: "/brandings/hardline-dept/HARDLINE 1.png", width: 1130, height: 700 },
    {
      kind: "panel",
      id: "hardline-dept-intro",
      ...LIGHT_PANEL,
      title: "Hardline Dept.",
      body: [
        "Hardline Department is a training brand built on discipline, consistency, and the work it takes to get stronger. No shortcuts, no empty motivation, and no focus on looking the part. It's about showing up, putting in the work, and becoming better with every session.",
        "At the heart of the brand is the idea of a “department” — a place where training is treated with purpose and discipline. The identity combines bold typography, strong geometric forms, and a stripped-back visual system to create a look that feels direct, powerful, and unapologetic.",
        "The visual language uses a restrained color palette, sharp layouts, and high-contrast photography to capture movement, intensity, and focus. Every element is designed to feel functional and intentional, reflecting the mindset behind Hardline Department: train hard, stay disciplined, keep moving.",
      ],
    },
    { kind: "image", id: "hardline-dept-2", src: "/brandings/hardline-dept/HARDLINE 2.png", width: 3000, height: 2000 },
    { kind: "image", id: "hardline-dept-3", src: "/brandings/hardline-dept/HARDLINE 3.png", width: 1519, height: 1902 },
    { kind: "image", id: "hardline-dept-4", src: "/brandings/hardline-dept/HARDLINE 4.png", width: 1130, height: 700 },
    { kind: "image", id: "hardline-dept-5", src: "/brandings/hardline-dept/HARDLINE 5.png", width: 1130, height: 700 },
    { kind: "image", id: "hardline-dept-6", src: "/brandings/hardline-dept/HARDLINE 6.png", width: 1130, height: 700 },
    { kind: "image", id: "hardline-dept-7", src: "/brandings/hardline-dept/HARDLINE 7.png", width: 1130, height: 700 },
  ],

  "orro-buns-coffee": [
    { kind: "image", id: "orro-1", src: "/brandings/orro/ORRO 1.png", width: 1130, height: 700 },
    {
      kind: "panel",
      id: "orro-intro",
      ...ORRO_PANEL,
      title: "Orro Buns & Coffee",
      body: [
        "Orro Buns & Coffee is a neighborhood café built around the simple things that make a day better — fresh buns, good coffee, and a place worth coming back to. It's a brand that feels warm, approachable, and easygoing, bringing a little comfort into the everyday.",
        "At the heart of the identity is the idea of pairing freshly baked buns with thoughtfully made coffee. The visual system balances playful details with a clean, contemporary foundation, creating a personality that feels friendly without losing its character.",
        "The identity uses soft forms, expressive typography, and a warm visual language to reflect the comfort and craft behind the brand. From the packaging to the in-store experience, every element works together to make Orro feel familiar, inviting, and memorable.",
      ],
    },
    { kind: "image", id: "orro-2", src: "/brandings/orro/ORRO 2.png", width: 1130, height: 700 },
    { kind: "image", id: "orro-3", src: "/brandings/orro/ORRO 3.png", width: 1130, height: 700 },
    { kind: "image", id: "orro-4", src: "/brandings/orro/ORRO 4.png", width: 1130, height: 700 },
    { kind: "image", id: "orro-6", src: "/brandings/orro/ORRO 6.png", width: 1130, height: 700 },
  ],

  "brasa-steak-house": [
    { kind: "image", id: "brasa-1", src: "/brandings/brasa/BRASA 1.png", width: 1130, height: 700 },
    {
      kind: "panel",
      id: "brasa-steak-house-intro",
      ...LIGHT_PANEL,
      title: "Brasa Steak House",
      body: [
        "Brasa Steak House is built around the art of fire, premium cuts, and the experience of gathering around a great meal. More than a place for steak, Brasa brings together bold flavors, warm hospitality, and a dining experience designed to leave an impression.",
        "The identity takes inspiration from the fire behind the grill. Strong forms and a distinctive mark create a visual language that feels confident and timeless, while subtle details add warmth and character to the brand.",
        "Bold typography, earthy tones, and striking graphic elements come together to give Brasa a strong and sophisticated presence. From the logo to the menus and other brand touchpoints, every detail reflects the heat, craft, and character of the steakhouse.",
      ],
    },
    { kind: "image", id: "brasa-2", src: "/brandings/brasa/BRASA 2.png", width: 1130, height: 700 },
    { kind: "image", id: "brasa-3", src: "/brandings/brasa/BRASA 3.png", width: 1130, height: 700 },
    { kind: "image", id: "brasa-4", src: "/brandings/brasa/BRASA 4.png", width: 1130, height: 700 },
    { kind: "image", id: "brasa-5", src: "/brandings/brasa/BRASA 5.png", width: 1130, height: 1382 },
    { kind: "image", id: "brasa-6", src: "/brandings/brasa/BRASA 6.png", width: 1130, height: 700 },
  ],

  "travellite-footwear": [
    { kind: "image", id: "travellite-1", src: "/brandings/travellite/TRAVELLITE 1.png", width: 1130, height: 700 },
    {
      kind: "panel",
      id: "travellite-footwear-intro",
      ...LIGHT_PANEL,
      title: "Travellite Footwear",
      body: [
        "Travellite Footwear is made for people who keep moving. Designed with comfort at the forefront, each pair is built to make everyday steps feel easier, whether you're heading to work, exploring somewhere new, or simply going about your day.",
        "The brand takes its name from the feeling it aims to deliver — footwear that feels light, comfortable, and ready to go wherever you are. We shaped the identity around this sense of movement, creating a visual direction that feels approachable, practical, and effortless.",
        "Clean typography, soft forms, and a lightweight visual system give Travellite a fresh and comfortable personality. The identity works across footwear, packaging, and digital touchpoints, creating a consistent brand experience that feels as easy as the shoes themselves.",
      ],
    },
    { kind: "image", id: "travellite-2", src: "/brandings/travellite/TRAVELLITE 2.png", width: 1130, height: 700 },
    { kind: "image", id: "travellite-3", src: "/brandings/travellite/TRAVELLITE 3.png", width: 1130, height: 700 },
    { kind: "image", id: "travellite-4", src: "/brandings/travellite/TRAVELLITE 4.png", width: 1130, height: 700 },
    { kind: "image", id: "travellite-5", src: "/brandings/travellite/TRAVELLITE 5.png", width: 1130, height: 700 },
    { kind: "image", id: "travellite-6", src: "/brandings/travellite/TRAVELLITE 6.png", width: 1130, height: 700 },
  ],

  "raphael-renard": [
    { kind: "image", id: "raphael-renard-1", src: "/brandings/raphael-renard/RAPHAEL 1.png", width: 1130, height: 700 },
    {
      kind: "panel",
      id: "raphael-renard-intro",
      ...LIGHT_PANEL,
      title: "Raphael Renard",
      body: [
        "Raphael Renard is a premium barbershop built around precision, craftsmanship, and personal style. Every cut is treated with intention, creating an experience that feels polished without losing the character of traditional barbering.",
        "The brand draws from the timeless culture of the gentleman's barbershop, reimagined through a more contemporary lens. We developed an identity that feels sophisticated and confident, giving Raphael Renard a presence that stands apart from the typical barbershop aesthetic.",
        "Refined typography, elegant details, and a carefully considered visual system create a premium yet approachable identity. From the storefront to the smallest brand touchpoint, every element is designed to communicate quality, precision, and timeless style.",
      ],
    },
    { kind: "image", id: "raphael-renard-2", src: "/brandings/raphael-renard/RAPHAEL 2.png", width: 1130, height: 700 },
    { kind: "image", id: "raphael-renard-3", src: "/brandings/raphael-renard/RAPHAEL 3.png", width: 1130, height: 700 },
    { kind: "image", id: "raphael-renard-4", src: "/brandings/raphael-renard/RAPHAEL 4.png", width: 1130, height: 700 },
    {
      kind: "image",
      id: "raphael-renard-5",
      src: "/brandings/raphael-renard/RAPHAEL 5.png",
      width: 1130,
      height: 1382,
    },
    { kind: "image", id: "raphael-renard-6", src: "/brandings/raphael-renard/RAPHAEL 6.png", width: 1130, height: 700 },
  ],

  // Logofolio is marks only — no panel, no copy. One band each.
  logofolio: [
    { kind: "logo", id: "logofolio-1", src: "/brandings/logofolio/1.svg", width: 70, height: 70 },
    { kind: "logo", id: "logofolio-2", src: "/brandings/logofolio/2.svg", width: 70, height: 34 },
    { kind: "logo", id: "logofolio-3", src: "/brandings/logofolio/3.svg", width: 70, height: 56 },
    { kind: "logo", id: "logofolio-4", src: "/brandings/logofolio/4.svg", width: 70, height: 71 },
    { kind: "logo", id: "logofolio-5", src: "/brandings/logofolio/5.svg", width: 70, height: 70 },
    { kind: "logo", id: "logofolio-6", src: "/brandings/logofolio/6.svg", width: 70, height: 70 },
    { kind: "logo", id: "logofolio-7", src: "/brandings/logofolio/7.svg", width: 129, height: 70 },
    { kind: "logo", id: "logofolio-8", src: "/brandings/logofolio/8.svg", width: 70, height: 70 },
    { kind: "logo", id: "logofolio-9", src: "/brandings/logofolio/9.svg", width: 134, height: 38 },
  ],

  // web-design-showcase takes the same shape as logofolio — logo bands, no
  // panel — but its assets do not exist yet, so it stays empty and the page
  // renders header + CTA bars only.
};
