"use client";

import { Hammer } from "lucide-react";
import { getPage, type VariantKey } from "@/samples/registry";
import { AppShell, Body } from "./shell";
import { Empty, Panel } from "./kit";

export function Placeholder({ slug, variant }: { slug: string; variant: VariantKey }) {
  const page = getPage(slug);
  const meta = page?.variants[variant];
  return (
    <AppShell nav="query">
      <Body>
        <Panel>
          <Empty icon={Hammer} title={`${page?.title} · 方案 ${variant}「${meta?.name}」绘制中`} desc={meta?.summary} />
        </Panel>
      </Body>
    </AppShell>
  );
}
