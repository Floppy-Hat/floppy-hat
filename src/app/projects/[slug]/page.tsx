import { notFound } from "next/navigation";
import { COLLECTIONS, PROJECTS } from "@/lib/constants";

const ITEMS = [...PROJECTS, ...COLLECTIONS];

// Every showcase entry is a known slug, so anything else 404s at build time
// instead of rendering an empty page on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const item = ITEMS.find((entry) => entry.slug === slug);
  return { title: item?.title ?? "Projects" };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const item = ITEMS.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <h1 className="text-subheading font-medium tracking-tight lg:text-heading">
        {item.title}
      </h1>
      <p className="mt-4 text-body text-muted-foreground">Design pending.</p>
    </section>
  );
}
