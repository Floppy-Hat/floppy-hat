import { createCn } from "cn/engine";
import tables from "./cn-tables";

/**
 * Project-compiled merge tables. The stock `cn` doesn't know our `@theme`
 * font sizes, so it reads `text-body` / `text-lead` as a text *colour* and
 * drops the real colour class it collides with — which is how buttons lost
 * `text-primary-foreground`. Regenerate after adding a `--text-*` token:
 *
 *   npx cn build --content "src/**\/*.{ts,tsx}" --css src/app/globals.css -o src/lib/cn-tables.ts
 */
export const cn = createCn(tables);
