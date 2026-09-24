<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# floppy-hat — architecture

Marketing landing page. Next 16 App Router, React 19, strict TS, Tailwind v4,
shadcn (Base UI, `base-vega` style), Resend for the contact form, Vercel.

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
- No `index.ts` barrels. They break tree-shaking and cause import cycles.

## Rendering

Server Components are the default; `'use client'` is opt-in and goes on the
**leaf** that needs it (the contact form, the mobile nav toggle), never on a
page or section wrapper. Pushing the boundary down is what keeps hydration cheap —
a client section drags its whole subtree into the bundle.

Prefer native over JS: `<a href="#pricing">` over scroll handlers, CSS
`:target`/`peer`/`group` over state, `<details>` over an accordion component.

## Theming

`src/app/globals.css` is the single source of truth — Tailwind v4 `@theme` +
the `:root` / `.dark` token blocks shadcn generates. There is no `src/styles/`.

Use Tailwind's built-in type scale (`text-4xl`, `tracking-tight`, …). Don't invent
heading/size tokens; only brand colors and fonts get overridden.

Dark mode is CSS-only via `prefers-color-scheme`. Add `next-themes` **only** if a
manual toggle is actually requested.

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

## SEO

Next gives these for free — use the file conventions, don't hand-roll:

- `app/layout.tsx` — `metadata` with `metadataBase`, title template, OG defaults
- `app/opengraph-image.tsx` — generated OG image
- `app/sitemap.ts`, `app/robots.ts`
- JSON-LD via a `<script type="application/ld+json">` in the page (see
  `01-app/02-guides/json-ld.md`)

Every page exports its own `metadata`. A landing page that doesn't is a bug.

## Assets and env

- `next/image` for every image, static-imported from `src/` so width/height and
  blur placeholder come for free. Hero image gets `priority`.
- Secrets in `.env.local` (gitignored); `NEXT_PUBLIC_` only for values that are
  genuinely public. `.env.example` lists the keys with empty values.

## Known cleanups

- `app/layout.tsx` loads three Google fonts (Geist, Geist Mono, Inter) and applies
  `geistSans.variable` while `--font-sans` points at Inter. Cut to the one or two
  the brand actually uses — each family is a render-blocking download.
- `.dark` tokens exist in `globals.css` but nothing ever sets the class, so dark
  mode is currently dead. Wire it to `prefers-color-scheme` when brand colors land.

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
