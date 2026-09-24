/** Content shapes for page sections. Fill the data in the section file,
 *  adjust the shape here when a design needs more. */

/** Any link that renders as a button or an anchor. */
export type Cta = {
  label: string;
  href: string;
};

export type Hero = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  client: string;
  title: string;
  /** Becomes a static-imported StaticImageData once the case-study art lands. */
  href?: string;
};

export type Contact = {
  heading: string;
  copy: string;
  email: string;
};
