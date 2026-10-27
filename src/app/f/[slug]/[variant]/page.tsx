import { notFound } from "next/navigation";
import { SampleFrame } from "@/components/gallery/sample-frame";
import { PAGES, VARIANT_KEYS, getPage, isVariant } from "@/samples/registry";

export const instant = false;

export function generateStaticParams() {
  return PAGES.flatMap((p) => VARIANT_KEYS.map((v) => ({ slug: p.slug, variant: v })));
}

export default async function FramePage({ params }: PageProps<"/f/[slug]/[variant]">) {
  const { slug, variant } = await params;
  if (!getPage(slug) || !isVariant(variant)) notFound();
  return <SampleFrame slug={slug} variant={variant} />;
}
