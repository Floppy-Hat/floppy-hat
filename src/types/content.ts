/** Content shapes for page sections. Fill the data in the section file,
 *  adjust the shape here when a design needs more. */

/** Any link that renders as a button or an anchor. */
export type Cta = {
  label: string;
  href: string;
};

export type Stat = {
  id: string;
  /** Numeric so it can be counted up; the "+" lives in `suffix`. */
  value: number;
  suffix?: string;
  label: string;
};

/** A piece of work in the Our Projects showcase. The slug is both the cover
 *  filename and the route, so adding a project is one entry plus one image. */
export type ShowcaseItem = {
  slug: string;
  title: string;
  /** Omit while the artwork is pending — the cover falls back to a placeholder. */
  image?: string;
  /** Project page header copy. Omit while it's still being written. */
  tagline?: string;
  description?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

/** One band in a brand page body. Blocks stack flush, in array order.
 *
 *  `image` is artwork straight from `public/brandings/<brand>/`; `panel` is a
 *  coloured container you put your own content in — either the declarative
 *  `title`/`body` below, or arbitrary children by composing `<BrandPanel>`
 *  directly in a page. */
export type BrandBlock =
  | {
      kind: "image";
      /** Stable key. The asset folder plus its sequence number. */
      id: string;
      src: string;
      /** Intrinsic pixels — they vary (most are 1130×700, some are taller). */
      width: number;
      height: number;
      /** Decorative by default; describe it when it carries real information. */
      alt?: string;
    }
  | {
      kind: "panel";
      id: string;
      /** Client brand colours. Omit both to fall back to the site's own
       *  `bg-card` / `text-card-foreground` tokens. */
      background?: string;
      foreground?: string;
      align?: "left" | "center";
      title?: string;
      /** One string per paragraph. */
      body?: string[];
    }
  | {
      /** A single logo mark centred in its own band — the logofolio shape. */
      kind: "logo";
      id: string;
      src: string;
      /** Intrinsic pixels. The marks are not a uniform size. */
      width: number;
      height: number;
      /** Defaults to the site's `bg-card`. */
      background?: string;
      alt?: string;
    };
