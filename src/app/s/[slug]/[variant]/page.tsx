import { notFound } from "next/navigation";
import { Viewer } from "@/components/gallery/viewer";
import { PAGES, VARIANT_KEYS, getPage, isVariant } from "@/samples/registry";

export function generateStaticParams() {
  return PAGES.flatMap((p) => VARIANT_KEYS.map((v) => ({ slug: p.slug, variant: v })));
}

export default async function ViewerPage({ params }: PageProps<"/s/[slug]/[variant]">) {
  const { slug, variant } = await params;
  if (!getPage(slug) || !isVariant(variant)) notFound();
  return <Viewer initialSlug={slug} initialVariant={variant} />;
}
