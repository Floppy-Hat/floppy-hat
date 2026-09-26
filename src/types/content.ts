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
};

export type Service = {
  id: string;
  title: string;
  description: string;
};
