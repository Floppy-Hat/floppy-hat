<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# floppy-hat — architecture

Marketing landing page. The stack, and the default for the next project:

| Concern    | Choice                                                      |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next 16 App Router, React 19, strict TS                      |
| Styling    | Tailwind v4, tokens in `globals.css`                         |
| Components | shadcn — **Base UI**, `base-vega` style                      |
| Icons      | `@tabler/icons-react`                                        |
| Fonts      | Inter via `next/font/google`                                 |
| Animation  | CSS first, `motion` (motion.dev) when CSS can't              |
| Theming    | dark default + `.light` class, header toggle, no library     |
| Email      | Resend, from a Server Action                                 |
| Testing    | Jest + React Testing Library via `next/jest`                 |
| Hooks      | Husky + lint-staged on pre-commit                            |
| Hosting    | Vercel                                                       |

## Not in this project

No auth, no `ProtectedRoute`, no API routes, no TanStack Query, no state manager,
no form library. It's a landing page — the only mutation is one email send.
If auth ever lands, it goes in `proxy.ts` (Next 16 renamed `middleware` → `proxy`),
not a client wrapper component.

## Layout

```
src/app/         routes only. page.tsx = metadata + one <XPage /> import. Server by default.
src/components/  shared across features. /ui is shadcn's — don't hand-edit, re-run the CLI.
src/features/    one folder per page: features/<name>/<Name>Page.tsx + components/
src/lib/         utils.ts, constants.ts, resend.ts
src/types/       cross-feature types only
```

Rules:

- A component used by one feature lives in that feature. It graduates to
  `src/components/` on the **second** consumer, not in anticipation of one.
- `features/<x>/components/` stays flat. The filename carries the kind
  (`ProductFilterDialog.tsx`), so never add `modals/` or `drawers/` folders —
  that groups by React primitive, which is the habit feature folders exist to break.
  Split only when the folder stops being scannable (~10 files), and split by
  sub-feature (`filters/`, `list/`) so a modal stays next to what it belongs to.
- Constants go in `src/lib/constants.ts` — a file, not a folder.
- Icons come from `@tabler/icons-react`, named imports only
  (`import { IconMail } from "@tabler/icons-react"`). Never hand-roll an SVG
  for something the set already has, and don't add a second icon library.
  Next optimizes this package's imports by default, so no config is needed.
  Icon-only buttons get `aria-label`; the icon itself gets `aria-hidden="true"`.
- No `index.ts` barrels. They break tree-shaking and cause import cycles.

## Components

**Check shadcn before writing markup.** If the registry has the primitive, use it:

```bash
npx shadcn@latest search           # what's available
npx shadcn@latest view <component> # read it without installing
npx shadcn@latest add <component>  # install
```

Only hand-roll with Tailwind when nothing in the registry fits. "Fits" is about
structure, not styling — restyling is expected. The service cards strip `Card`'s
radius, ring and shadow and still earn it, because `--card-spacing`,
`CardHeader` and its slot structure do real work. Reach for a plain element when
the component's *shape* is wrong for the job, not because you'd override classes.

- shadcn here is **Base UI**, not Radix. Swap the rendered element with the
  `render` prop, not `asChild`: `<Button render={<a href="…" />} />`.
- A `Button` rendering anything other than a native `<button>` also needs
  `nativeButton={false}`, or Base UI drops `role`, Space-key activation and
  disabled handling — and warns in dev.
- Files in `components/ui/` belong to the CLI. Never hand-edit them; re-run the
  CLI and restyle at the call site with `className`.
- The CLI writes `import { cn } from "cn"` (the `cn` package), not
  `@/lib/utils`. That's its convention for this project — leave it.

## Motion

CSS first, `motion` second. Reveals, hovers and scroll effects that CSS can
express stay in CSS — they cost no bundle, no `'use client'`, and run off the
main thread:

- scroll-linked: `animation-timeline: view()` (see `.parallax` in `globals.css`)
- enter/exit: `tw-animate-css` utilities, already installed
- state-driven: `transition`, `@starting-style`, `:target`, `group`/`peer`

Reach for **`motion`** (motion.dev — import from `motion/react`, *not*
`framer-motion`) when CSS genuinely can't do it: spring physics, gesture-driven
motion, `layoutId` shared-element transitions, `AnimatePresence` exits.

- Import `m` inside a `LazyMotion` with `domAnimation`, not `motion.div` — the
  full `motion` component pulls the whole feature set into the bundle.
- It's client-only. Put it on the **leaf**, never a section or page wrapper, or
  the whole subtree leaves server rendering.
- Honour `useReducedMotion()` on anything that moves, the same way the CSS is
  wrapped in `prefers-reduced-motion`.
- Animate `transform` and `opacity` only — never `width`/`height`/`top`/`left`.

One orchestrated moment beats a fade-and-slide-up on every section; the latter
is the clearest tell of a templated page, and this is a branding studio's own
site.

## Rendering

Server Components are the default; `'use client'` is opt-in and goes on the
**leaf** that needs it (the contact form, the mobile nav toggle), never on a
page or section wrapper. Pushing the boundary down is what keeps hydration cheap —
a client section drags its whole subtree into the bundle.

Prefer native over JS: `<a href="#pricing">` over scroll handlers, CSS
`:target`/`peer`/`group` over state, `<details>` over an accordion component.

## Responsive

**Mobile first, always.** Write the phone layout in unprefixed classes, then
add `sm:` / `md:` / `lg:` to grow it. A `lg:` that undoes a desktop-shaped base
is the tell you built it backwards — `flex-col md:flex-row`, never
`flex-row lg:flex-col`.

- 375px is the design target, not an afterthought. Nothing scrolls sideways there.
- One column on phones. `grid-cols-2` / `-3` only ever behind `sm:` / `lg:`.
- Type and rhythm scale **up**: `text-3xl lg:text-5xl`, `py-16 lg:py-24`,
  `px-6 lg:px-10`. Pick the phone value first, then the desktop one.
- Tap targets ≥ 44px. Icon-only buttons get `size-12` minimum.
- The nav collapses on phones — `<details>` + `<summary>`, no JS, no drawer
  library. Render the mobile and desktop nav as separate elements toggled with
  `hidden` / `lg:hidden`; `display: none` keeps the inactive one out of the
  accessibility tree, so only one is ever exposed.
- No `min-width` wider than the viewport. Tables, diagrams and code blocks get
  their own `overflow-x-auto` wrapper; the page body never does.

Comps arrive desktop-only. Deriving the phone layout is our job, not a question
for the designer: stack columns in reading order, drop decorative offsets (the
Services grid's `lg:col-start-2`), keep every piece of content.

## Theming

`src/app/globals.css` is the single source of truth — Tailwind v4 `@theme` plus
the `:root` (dark) and `.light` token blocks. There is no `src/styles/`.

### Brand

| Color | Hex       | Role                                              |
| ----- | --------- | ------------------------------------------------- |
| Blue  | `#012AFE` | `--primary` — CTAs, links, focus rings            |
| Gray  | `#1E1E1E` | body text in light; elevated surfaces in dark     |
| White | `#FFFFFF` | light page background; text on blue and on dark   |
| Black | `#000000` | dark page background                              |

### Use tokens, never the hex

Every color in a component is a semantic Tailwind class. The hex values appear
exactly once, in `globals.css`, and nowhere else in the repo.

```tsx
// ✅
<section className="bg-background text-foreground">
  <h2 className="text-foreground">Title</h2>
  <p className="text-muted-foreground">Supporting copy</p>
  <Button className="bg-primary text-primary-foreground">Get started</Button>
  <a className="text-primary underline-offset-4 hover:underline">Learn more</a>
  <div className="rounded-lg border border-border bg-card text-card-foreground" />
</section>

// ❌ never
<div className="bg-[#012AFE] text-[#FFFFFF]" />
<div style={{ color: '#1E1E1E' }} />
```

| Need                        | Class                                        |
| --------------------------- | -------------------------------------------- |
| Page surface                | `bg-background` + `text-foreground`          |
| Card / panel                | `bg-card text-card-foreground border-border` |
| Primary CTA                 | `bg-primary text-primary-foreground`         |
| Link / accent text          | `text-primary`                               |
| Secondary copy, captions    | `text-muted-foreground`                      |
| Subtle fill (badge, hover)  | `bg-muted` / `bg-accent`                     |
| Text/icons **on** brand blue | `text-primary-foreground`                   |
| Hairlines, dividers         | `border-border`                              |
| Focus ring                  | `ring-ring` (never remove the ring)          |

`--primary-foreground` is white in **both** themes — it means "content sitting
on brand blue", not "bright text". Using it on the page background looks right
in dark and turns invisible in light. Page text is always `text-foreground`.
Anything layered over a photo needs `scrim`, which is fixed in both themes.

Tints and shades come from the opacity modifier — `bg-primary/10`,
`border-primary/20` — not from new hex values. If a shade genuinely can't be
expressed that way, add a **named token** to `globals.css` first, then use it.

### Themes

**Dark is the designed theme and the default.** `:root` carries the dark tokens,
so a class-less first paint is already correct and there is no flash; `.light`
overrides them, and `color-scheme` follows so form controls and scrollbars match.

No theme library. Switching is `document.documentElement.classList.toggle("light")`
plus a localStorage write — `ThemeToggle` in the header. A server-rendered inline
script in `layout.tsx` re-applies the saved choice before paint, which is why
`<html>` carries `suppressHydrationWarning`.

`next-themes` was tried and removed: it renders its no-flash script inside the
provider, and React 19 warns every time that re-renders on the client. It earns
its keep when you need system sync or more than two themes — we need neither,
and the toggle is an explicit choice, not a mirror of the OS.

Because every colour is a semantic token, components need no `dark:` variants —
`bg-background` is already right in both. The `dark:` variant exists only
because shadcn's own files use it, and it's wired as
`@custom-variant dark (&:not(.light *))` so it matches when `.light` is absent.

Brand blue stays `#012AFE` in both themes. What changes is the **focus ring**:
`#012AFE` is only 2.8:1 on the dark background, so dark lifts `--ring` to
`#5488FE` (6.3:1). Light keeps the brand value at 7.4:1.

Check contrast ≥ 4.5:1 for text **in both themes** when changing any token.
A change that only gets checked in dark is how the light theme rots.

### The `cn` gotcha

`cn` merges conflicting Tailwind classes, and it decides what conflicts from a
**generated table**. Our `@theme` font sizes (`text-body`, `text-lead`, …) are
not stock Tailwind, so the default table reads them as text *colours* and drops
whatever colour they collide with — that is how the footer button silently lost
`text-primary-foreground` and rendered dark text on blue.

Fixed by compiling tables that know our theme. After adding or renaming any
`--text-*` token:

```bash
npm run cn:tables
```

`src/lib/cn-tables.ts` is generated — don't edit it. `tsconfig.json` maps the
bare `cn` specifier to `src/lib/utils.ts`, so the shadcn files in
`components/ui/` (which import from `"cn"`) get the project tables too, with no
hand-edits.

**Symptom to recognise:** a colour, padding or radius class from a component's
variant vanishing from the rendered `class` attribute when you pass a custom
token through `className`.

### Fonts

**Inter**, loaded once in `layout.tsx` via `next/font/google`. It's a variable
font, so one file covers every weight, and it carries both display and body —
`--font-heading` points at the same family.

`font-sans` is the default on `<html>`, so nothing needs a font class. Headings
use weight and size, not a second family.

Rules:

- `next/font` only — never a `<link>` to a font CDN, and never `@font-face` by
  hand. Next self-hosts the file and generates a size-matched fallback, which is
  what keeps CLS at zero.
- Adding a self-hosted face: `.woff2` only, and verify the magic bytes are
  `774f4632` (`wOF2`) first — foundry bundles often ship print formats under a
  `.woff2` filename, and the build fails with a confusing `unexpected data
  version`. One weight per file unless it's variable.
- **Licensing:** serving a font from a public domain is web embedding and needs
  a **webfont** licence. Confirm before launch.

Inter is the whole stack — headings included. An earlier direction had Menda
self-hosted in `src/app/fonts/`; those files were deleted unused, so there is no
`src/app/fonts/` and nothing to wire up.

### Type and spacing

Font sizes are **named tokens**, defined once in the `@theme` block of
`globals.css` and used by role, never by an abstract step:

| Token             | Size | Used for                                  |
| ----------------- | ---- | ----------------------------------------- |
| `text-display`    | 48px | hero `h1`, project names                  |
| `text-title`      | 40px | manifesto, footer heading                 |
| `text-heading`    | 36px | section headings                          |
| `text-subtitle`   | 32px | between a section heading and its phone size |
| `text-subheading` | 24px | those same headings on phones             |
| `text-lead`       | 20px | card titles, standout paragraphs          |
| `text-body`       | 16px | default paragraph                         |
| `text-caption`    | 14px | captions, labels, nav, card body          |

A comp measurement maps straight onto a class — 48px is `text-display`, not
`text-5xl`. These eight are the design's sizes, not a replacement for the whole
scale; anything smaller still uses Tailwind's `text-xs`. Each token carries its
own line-height, so `leading-*` is only for a deliberate override.

`text-caption` and Tailwind's `text-sm` are both 14px, but the line-heights
differ — 1.6 (22.4px) against `text-sm`'s 1.25rem (20px). Use `text-caption` for
copy meant to be read and `text-xs` for the rest; don't reach past them for
`text-sm`.

Spacing, radii and tracking still use Tailwind's built-in scales (`p-6`,
`tracking-tight`). No arbitrary values like `p-[19px]` — the exception is a
structural one with no scale equivalent, e.g. `grid-rows-[1fr_auto_auto]`.

### Removed on purpose

The shadcn scaffold's `--sidebar-*` and `--chart-*` tokens are gone — this site
has no sidebar and no charts. `shadcn add sidebar` (or `chart`) re-adds the
variables it needs, so nothing is lost.

## Contact form

Server Action + `useActionState`, no route handler:

- action lives in `src/features/contact/actions.ts` with `'use server'`
- validate server-side in the action (it's a trust boundary — the client
  `required` / `type="email"` attributes are UX, not validation)
- honeypot field for bots; Resend key from `process.env.RESEND_API_KEY`, never `NEXT_PUBLIC_`
- pending state from `useActionState`, errors rendered with `aria-live="polite"`
- reach for zod once the form exceeds ~4 fields

## Conventions

- shadcn files in `components/ui/` keep the CLI's kebab-case (`button.tsx`).
  Everything we write is PascalCase and matches its default export (`HeroSection.tsx`).
- Named exports everywhere except `app/**` route files, which Next requires to
  be default.
- Props: inline the type unless it's reused — `function Hero({ title }: { title: string })`.
  No `interface IHeroProps`.
- `type` over `interface` unless you need declaration merging.
- No `any`. No non-null `!`. If a value can be absent, handle it.

## Testing

Jest + React Testing Library, wired through `next/jest` so tests see what the
app sees — `next.config.ts`, `.env`, path aliases, and mocked CSS/image/font
imports.

```bash
npm test           # once
npm run test:watch # while working
```

**Tests are grouped in a `tests/` folder per module**, named after the file they
cover — so a feature's whole suite is one place to look, and `components/` stays
scannable:

```
src/features/home/
  components/ProjectShowcase.tsx
  tests/ProjectShowcase.test.tsx
src/lib/
  rate-limit.ts
  tests/rate-limit.test.ts
```

One `tests/` per module (`features/<x>/`, `lib/`, `components/`), never nested
deeper and never a single top-level `__tests__/` for the whole repo — that
just recreates the "group by kind" problem feature folders exist to solve.

What to test, in order of how much it pays:

1. **Logic with a branch, a loop, or arithmetic** — rate limiting, validation,
   anything that computes. These are cheap to test and fail silently in review.
2. **Client component behaviour** — what changes when a user hovers, types,
   focuses or submits. Render it, fire the event, assert what they'd see.
3. **Nothing else.** Don't test that a section renders its own copy, don't
   snapshot markup, and don't assert on Tailwind classes — those tests break on
   every design tweak and catch nothing.

Rules:

- Assert through the **accessibility tree** — `getByRole("link", { name })`,
  `getByLabelText`. If a query is hard to write, the markup usually has a real
  accessibility problem underneath.
- Need to observe state that isn't visible text? Add a `data-*` attribute to
  the component. `data-active` on the showcase links is the example — a stable
  hook beats asserting on `text-foreground/60`.
- **Async Server Components can't be unit tested** — React and Jest don't
  support it yet. Cover those end to end, or extract the logic and test that.
- Server Actions can't run in Jest either (they need a request context). Test
  the pure pieces they call, like `isRateLimited`.

## SEO

Next gives these for free — use the file conventions, don't hand-roll:

- `app/layout.tsx` — `metadata` with `metadataBase`, title template, OG defaults
- `app/opengraph-image.tsx` — generated OG image
- `app/sitemap.ts`, `app/robots.ts`
- JSON-LD via a `<script type="application/ld+json">` in the page (see
  `01-app/02-guides/json-ld.md`)

Every page exports its own `metadata`. A landing page that doesn't is a bug.

## Assets and env

- `next/image` for every image. Static-import from `src/` where you can, so
  width/height come for free. Brand artwork lives in `public/brandings/<brand>/`
  and is referenced by path, so those entries carry explicit `width`/`height` —
  they are not uniform, and a wrong pair is a layout shift on load, not a
  cosmetic slip. Check them against the file when artwork changes.
- The LCP image gets `preload` **and** `fetchPriority="high"`. In Next 16
  `priority` is deprecated, and `preload` on its own only emits the `<link>` —
  it does not set `fetchpriority`, which Lighthouse flags. Everything below the
  fold stays lazy, which is the default.

### Loaders

**A skeleton is a background colour, not a component.** An `<img>` paints its
own background until the image covers it, and `width`/`height` have already
reserved the box — so `bg-muted` on the image *is* the skeleton:

```tsx
<Image src={block.src} width={1130} height={700} className="h-auto w-full bg-muted" />
```

No wrapper, no `onLoad`, no client JS, and it covers every image automatically
including ones added later. Containers that size their own image (`fill`) put
`bg-muted` on the sized parent instead — see `ProjectList`'s cards.

Don't reach for an animated shimmer. Stopping one on load needs `onLoad`, which
makes the component a client component and drags its subtree out of server
rendering — a real cost for a spinner nobody asked for. Don't generate
per-image placeholder colours or blur data either: that is a second copy of
facts about the files, and it goes stale the moment artwork is renamed.

- Secrets in `.env.local` (gitignored); `NEXT_PUBLIC_` only for values that are
  genuinely public. `.env.example` lists the keys with empty values.

## Known cleanups

- None open.

## Working style

`ponytail` and `frontend-design` are enabled in `.claude/settings.json`.

- **ponytail** is always on — take the laziest thing that works, delete before you add.
- **frontend-design** — load it before building or reshaping any UI, so sections
  don't come out looking like default templates.

## Code standards

**Client JS.** `'use client'` on leaves only (see Rendering). The bundle is the
budget — every client component on a marketing page has to earn its bytes.

**Re-renders.** Control them structurally, not with memo hooks:

- state lives at the **lowest** component that needs it. Lifting state up to a
  section or page wrapper is what makes a re-render expensive — it drags every
  sibling along. A `useState` in a wrapper is a design smell; push it down.
- a client component that wraps static content takes it as `children` from a
  Server Component. Children passed in as props don't re-render when the client
  parent's state changes — this is the single highest-leverage pattern here.
- derive during render instead of mirroring props into `useState` + `useEffect`.
  Duplicated state is the most common cause of both extra renders and stale UI.
- keys on lists are stable ids, never array indices.

That structure is where the wins are, and it costs nothing. `memo` / `useMemo` /
`useCallback` are the *last* resort, added against a React DevTools Profiler
reading that names the component — never preemptively, because each one adds a
dependency array to keep correct and can itself slow things down. If hand-memoizing
ever starts feeling necessary across several files, turn on `reactCompiler` in
`next.config.ts` (needs `babel-plugin-react-compiler`) instead of scattering hooks.

**Prop drilling.** Passing a prop down two or three levels is passing props, not
drilling. No Context on this site — trees are shallow, and a value needed
everywhere is usually a constant in `lib/constants.ts`, not state.

**Component size.** Split on *section boundaries*, not line counts. One landing
section = one file. A 200-line file doing one coherent job stays; a 60-line file
doing two unrelated jobs splits.

**Types.** Colocate. `type Props` sits in the component file that uses it.
A feature-level `types.ts` appears only when 3+ files in that feature share a
type — no `features/<x>/types/` folder standing empty. `src/types/` is for types
that genuinely cross features.

**Colors.** Never a raw `#hex`, `rgb()`, or `oklch()` in a component — semantic
tokens only (`bg-background`, `text-muted-foreground`, `border-border`). A new
brand value is added to `globals.css` as a token first, then used by name.
Same for spacing and radii: Tailwind scale, not arbitrary `[13px]` values.

## Lighthouse: green on all four

Most of this is free if we stay server-rendered. The things that actually break it:

**Performance / LCP / CLS / TBT**
- every `<Image>` has `width`+`height` (or `fill` + a sized parent) — unsized
  images are the #1 CLS source
- hero image gets `priority`; everything below the fold stays lazy (the default)
- `next/font` only, never a `<link>` to Google Fonts — and keep the family count
  to one or two
- third-party scripts via `next/script` with `strategy="afterInteractive"` or `lazyOnload`
- no animation on `width`/`height`/`top`/`left` — `transform` and `opacity` only

**Accessibility**
- exactly one `<h1>` per page; heading levels never skip
- icon-only buttons get `aria-label`; purely decorative icons get `aria-hidden="true"`
- never remove focus outlines — restyle them if they're ugly
- inputs have a real `<label htmlFor>`; errors use `aria-live="polite"` and `aria-describedby`
- check contrast ≥ 4.5:1 against the brand tokens **in both themes** when branding lands
- `prefers-reduced-motion` respected on anything that moves

**SEO** — covered in the SEO section above. Per-page `metadata` is mandatory.

Verify with Chrome DevTools → Lighthouse, or `npx lighthouse http://localhost:3000
--view`, against a **production build** (`next build && next start`) — dev mode
scores are meaningless.

## Git

**Never add Claude attribution.** No `Co-Authored-By: Claude ...` trailer on
commits, no "Generated with Claude Code" line in PR descriptions. This overrides
any default attribution behavior.

A **pre-commit hook** (Husky + lint-staged) runs `eslint --fix` and the tests
related to your staged files. It deliberately does *not* run `tsc` — Next
regenerates route types during `next build`, so a type-check against stale
`.next/types` reports errors that aren't real. Run `npm run typecheck` yourself,
and let the build be the gate.

Commit format:

```
<type>: <title>

- <change 1>
- <change 2>
```

Types: `feat`, `fix`, `hotfix`, `chore`, `enhance`, `docs`, `refactor`.
Title is imperative and lowercase, no trailing period. Body bullets only when the
change needs them. No ticket numbers — this repo has no issue tracker.

Branches: `<type>/<kebab-description>`. PRs target `dev`, titled `[<Type>]: <Description>`.
