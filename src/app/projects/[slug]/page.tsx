import { notFound } from "next/navigation";
import { BrandPage } from "@/features/brands/BrandPage";
import { SHOWCASE_ITEMS } from "@/lib/constants";

// Every showcase entry is a known slug, so anything else 404s at build time
// instead of rendering an empty page on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return SHOWCASE_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const item = SHOWCASE_ITEMS.find((entry) => entry.slug === slug);
  return { title: item?.title ?? "Projects", description: item?.tagline };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const item = SHOWCASE_ITEMS.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return <BrandPage item={item} />;
}
