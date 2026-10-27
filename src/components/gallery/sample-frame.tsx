"use client";

import { SAMPLES } from "@/samples";
import type { VariantKey } from "@/samples/registry";

export function SampleFrame({ slug, variant }: { slug: string; variant: VariantKey }) {
  const Comp = SAMPLES[slug]?.[variant];
  if (!Comp) return null;
  return <Comp />;
}
