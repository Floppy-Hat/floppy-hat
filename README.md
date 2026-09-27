# Floppy Hat

Marketing site for Floppy Hat — a branding studio. One landing page plus a
brand page per project.

Live at [floppy-hat.vercel.app](https://floppy-hat.vercel.app).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the keys below
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Script                | What it does                                              |
| --------------------- | --------------------------------------------------------- |
| `npm run dev`         | Dev server                                                 |
| `npm run build`       | Production build — the real gate, it regenerates route types |
| `npm start`           | Serve the production build                                 |
| `npm test`            | Jest once                                                  |
| `npm run test:watch`  | Jest in watch mode                                         |
| `npm run typecheck`   | `tsc --noEmit`                                             |
| `npm run lint`        | ESLint                                                     |
| `npm run cn:tables`   | Regenerate `src/lib/cn-tables.ts` — run after adding or renaming any `--text-*` token |

A Husky pre-commit hook runs `eslint --fix` and the tests related to your
staged files. It deliberately does **not** run `tsc`: Next regenerates route
types during `next build`, so a type-check against stale `.next/types` reports
errors that aren't real. Run `npm run typecheck` yourself and let the build be
the gate.

## Environment

Copy `.env.example` to `.env.local` (gitignored):

| Variable               | Notes                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`       | Contact form delivery. Server-only — never `NEXT_PUBLIC_`     |
| `CONTACT_TO_EMAIL`     | Where the contact form sends                                  |
| `NEXT_PUBLIC_SITE_URL` | Absolute base for OG images and canonicals. Optional on Vercel — `src/lib/site.ts` derives it from the branch/production host |

## Stack

| Concern    | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next 16 App Router, React 19, strict TS         |
| Styling    | Tailwind v4, tokens in `src/app/globals.css`    |
| Components | shadcn — Base UI, `base-vega` style             |
| Icons      | `@tabler/icons-react`                           |
| Fonts      | Inter via `next/font/google`                    |
| Animation  | CSS first, `motion` when CSS can't              |
| Theming    | Dark default + `.light` class, no library       |
| Email      | Resend, from a Server Action                    |
| Testing    | Jest + React Testing Library via `next/jest`    |
| Hosting    | Vercel                                          |

## Layout

```
src/app/         routes only. page.tsx = metadata + one <XPage />. Server by default.
src/components/  shared across features. /ui is shadcn's — re-run the CLI, don't hand-edit.
src/features/    one folder per page: features/<name>/<Name>Page.tsx + components/
src/lib/         utils.ts, constants.ts, site.ts, rate-limit.ts
src/types/       cross-feature types only
public/brandings/<brand>/   brand page artwork, in page order
```

The contact form's Server Action is `src/features/home/api/contact.ts`.

Tests live in a `tests/` folder per module (`src/lib/tests/`,
`src/features/home/tests/`), named after the file they cover.

## Brand pages

`/projects/<slug>` renders from data, not per-page markup. Each page is a
header (name, tagline, blurb) followed by a list of blocks.

Blocks live in `src/features/brands/blocks.ts`, keyed by showcase slug, and
render flush in array order. Three kinds:

```ts
// Artwork. width/height are required — they are what keep CLS at zero, and
// they are not uniform (most bands are 1130×700, a couple are 1130×1382).
{ kind: "image", id: "brasa-1", src: "/brandings/brasa/BRASA 1.png", width: 1130, height: 700 }

// A coloured container for copy. Omit the colours to fall back to the site's
// card tokens. `align: "center"` centres the text.
{ kind: "panel", id: "brasa-intro", background: "#FFFFFF", foreground: "#555555",
  title: "Brasa", body: ["First paragraph.", "Second."] }

// One logo mark centred in its own band. Logo bands sit apart; the other two
// kinds stack flush.
{ kind: "logo", id: "logofolio-1", src: "/brandings/logofolio/1.svg", width: 70, height: 70 }
```

Adding artwork is one entry plus the file. Panel colours are the *client's*
brand, so they are raw values rather than semantic tokens — the one sanctioned
exception, since a per-client colour can't be a design-system token without
`globals.css` growing an entry per project. Check any new pair for ≥ 4.5:1
contrast.

For a one-off that the block data can't express, `BrandPanel` is exported on
its own and takes arbitrary `children`.

Every brand page closes with the same two CTA bars; "Next Work" walks the
showcase order and wraps (`nextShowcaseSlug` in `src/lib/constants.ts`).

## Conventions

The full architecture and house style is in [`AGENTS.md`](./AGENTS.md) —
theming tokens, the type scale, responsive rules, the `cn` gotcha, commit
format. Read it before changing anything visual. `CLAUDE.md` just points at it.

The short version:

- Semantic tokens only — never a raw hex in a component
- Mobile first; `lg:` grows the layout, never undoes a desktop-shaped base
- `'use client'` on leaves, never on a page or section wrapper
- Named exports everywhere except `app/**` route files
- No `any`, no non-null `!`, no `index.ts` barrels

## Deploying

Vercel, on push. Only `dev` and `production` build — every other branch is
skipped by the `ignoreCommand` in `vercel.json`.

Verify Lighthouse against a production build (`npm run build && npm start`) —
dev-mode scores are meaningless.
