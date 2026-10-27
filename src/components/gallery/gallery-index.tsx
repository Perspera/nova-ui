"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ClipboardCopy, Layers, RotateCcw, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GROUPS, PAGES, VARIANT_KEYS, type GroupKey } from "@/samples/registry";
import { Glyph } from "./glyph";
import { buildPickList, usePicks } from "./picks";

const LEGEND: { cls: string; label: string }[] = [
  { cls: "bg-slate-200", label: "顶栏" },
  { cls: "bg-slate-100 ring-1 ring-inset ring-slate-200", label: "侧栏 / 次要区" },
  { cls: "bg-white ring-1 ring-inset ring-slate-200", label: "主内容" },
  { cls: "bg-blue-100 ring-1 ring-inset ring-blue-300", label: "重点区" },
  { cls: "bg-white ring-1 ring-inset ring-indigo-300", label: "抽屉" },
  { cls: "bg-slate-700", label: "底栏" },
];

export function GalleryIndex() {
  const [group, setGroup] = React.useState<GroupKey | "all">("all");
  const { pickOf, isExplicit, setPick, reset, picks } = usePicks();
  const [copied, setCopied] = React.useState(false);
  const changed = PAGES.filter((p) => pickOf(p.slug) !== p.recommended).length;
  const confirmed = Object.keys(picks).length;
  const list = buildPickList(pickOf);

  const copy = async () => {
    await navigator.clipboard.writeText(`备件系统 UI 布局 · 落地清单\n${list}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const shown = group === "all" ? GROUPS : GROUPS.filter((g) => g.key === group);

  return (
    <div className="min-h-dvh bg-[#f4f6fa] text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1480px] items-center gap-3 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-[9px] bg-slate-900 text-white">
            <Layers className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-[14px] font-semibold text-slate-900">备件系统 · 布局样卡</div>
            <div className="text-[11px] text-slate-400">v2 · 21 页 × A/B/C</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-[12px] text-slate-500 sm:inline">
              已确认 <b className="tnum text-slate-800">{confirmed}</b> / {PAGES.length} 页 · 改选 <b className="tnum text-slate-800">{changed}</b> 页
            </span>
            <button
              type="button"
              onClick={copy}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgb(79_70_229/0.4)] hover:bg-indigo-700"
            >
              {copied ? <Check className="size-4" /> : <ClipboardCopy className="size-4" />}
              {copied ? "已复制" : "复制落地清单"}
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto grid max-w-[1480px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[12px] font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">
              <Star className="size-3.5 fill-amber-400 text-amber-500" />
              每页推荐默认已标注
            </div>
            <h1 className="mt-4 text-[28px] font-semibold tracking-tight text-slate-900 sm:text-[32px]">备件查询平台 · UI 布局样卡</h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-7 text-slate-500">
              壳层 + 20 个路由页，每页三套真实可看的布局：左右分栏、三栏主从、画布 + 属性、横向步骤、底栏、筛选抽屉……
              点卡片进入预览，顶部切 A/B/C、切桌面 / 平板 / 手机宽度。只是样卡，不改仓库代码。选好后点「复制落地清单」发给我即可。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-inset ring-slate-200/70">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400">缩略图图例</span>
            {LEGEND.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 text-[12px] text-slate-600">
                <span className={cn("h-3 w-4 rounded-[3px]", l.cls)} />
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6">
        <div className="scrollbar-thin -mx-1 mb-8 flex gap-1 overflow-x-auto px-1">
          {[{ key: "all" as const, label: "全部" }, ...GROUPS].map((g) => {
            const on = group === g.key;
            const n = g.key === "all" ? PAGES.length : PAGES.filter((p) => p.group === g.key).length;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => setGroup(g.key)}
                className={cn(
                  "flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors",
                  on ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50",
                )}
              >
                {g.label}
                <span className={cn("tnum text-[11px]", on ? "text-white/60" : "text-slate-400")}>{n}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-10">
          {shown.map((g) => (
            <section key={g.key}>
              <h2 className="mb-4 flex items-baseline gap-2 text-[15px] font-semibold text-slate-900">
                {g.label}
                <span className="text-[12px] font-normal text-slate-400">{PAGES.filter((p) => p.group === g.key).length} 页</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {PAGES.filter((p) => p.group === g.key).map((p) => {
                  const v = pickOf(p.slug);
                  const meta = p.variants[v];
                  return (
                    <article
                      key={p.slug}
                      className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_28px_-12px_rgb(15_23_42/0.2)]"
                    >
                      <Link href={`/s/${p.slug}/${v}`} className="relative block rounded-xl bg-slate-50 p-3 ring-1 ring-inset ring-slate-100">
                        <Glyph rects={meta.glyph} className="shadow-[0_6px_16px_-8px_rgb(15_23_42/0.25)]" />
                        <span className="absolute top-5 right-5 flex items-center gap-1 rounded-md bg-white/95 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                          <span className="font-mono text-indigo-600">{v}</span>
                          {v === p.recommended && <Star className="size-3 fill-amber-400 text-amber-500" />}
                        </span>
                        <span className="absolute inset-0 grid place-items-center rounded-xl bg-slate-900/0 opacity-0 transition-all group-hover:bg-slate-900/5 group-hover:opacity-100">
                          <span className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-[12px] font-medium text-white shadow-lg">
                            打开预览
                            <ArrowUpRight className="size-3.5" />
                          </span>
                        </span>
                      </Link>
                      <div className="flex items-start justify-between gap-2 px-1 pt-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold text-slate-400">{p.no}</span>
                            <h3 className="truncate text-[14px] font-semibold text-slate-900">{p.title}</h3>
                          </div>
                          <code className="mt-0.5 block truncate font-mono text-[11px] text-slate-400">{p.route}</code>
                        </div>
                        {isExplicit(p.slug) && (
                          <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/70">
                            <Check className="size-3" />
                            已确认
                          </span>
                        )}
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-1 px-1 pb-1">
                        {VARIANT_KEYS.map((k) => {
                          const on = k === v;
                          return (
                            <button
                              key={k}
                              type="button"
                              onClick={() => setPick(p.slug, k)}
                              title={p.variants[k].summary}
                              className={cn(
                                "min-w-0 rounded-lg px-2 py-1.5 text-left ring-1 ring-inset transition-colors",
                                on ? "bg-indigo-50 ring-indigo-200" : "ring-slate-200 hover:bg-slate-50",
                              )}
                            >
                              <span className="flex items-center gap-1">
                                <span className={cn("font-mono text-[11px] font-bold", on ? "text-indigo-600" : "text-slate-400")}>{k}</span>
                                {k === p.recommended && <Star className="size-2.5 fill-amber-400 text-amber-500" />}
                              </span>
                              <span className={cn("mt-0.5 block truncate text-[11.5px]", on ? "font-medium text-indigo-800" : "text-slate-600")}>{p.variants[k].name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04)]">
          <header className="flex flex-wrap items-center gap-3 border-b border-slate-200/80 px-5 py-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold text-slate-900">落地清单</h2>
              <p className="mt-0.5 text-[12.5px] text-slate-500">未手动选择的页面按推荐默认计入。复制后直接发给我，我按清单逐页给出实施范围。</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            >
              <RotateCcw className="size-3.5" />
              全部恢复推荐
            </button>
            <button
              type="button"
              onClick={copy}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-slate-900 px-3 text-[13px] font-semibold text-white hover:bg-slate-800"
            >
              {copied ? <Check className="size-3.5" /> : <ClipboardCopy className="size-3.5" />}
              {copied ? "已复制" : "复制"}
            </button>
          </header>
          <div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-y-0">
            {[PAGES.slice(0, 11), PAGES.slice(11)].map((col, ci) => (
              <ul key={ci} className={cn("divide-y divide-slate-100", ci === 1 && "md:border-l md:border-slate-100")}>
                {col.map((p) => {
                  const v = pickOf(p.slug);
                  const diff = v !== p.recommended;
                  return (
                    <li key={p.slug} className="flex items-center gap-3 px-5 py-2.5 text-[13px]">
                      <span className="w-6 font-mono text-[11px] text-slate-400">{p.no}</span>
                      <span className="w-24 shrink-0 truncate font-medium text-slate-800">{p.title}</span>
                      <span className={cn("rounded-md px-1.5 font-mono text-[12px] font-bold", diff ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700")}>{v}</span>
                      <span className="min-w-0 flex-1 truncate text-slate-600">{p.variants[v].name}</span>
                      {diff ? (
                        <span className="shrink-0 text-[11px] text-indigo-600">改选 · 推荐 {p.recommended}</span>
                      ) : (
                        <span className="flex shrink-0 items-center gap-0.5 text-[11px] text-amber-600">
                          <Star className="size-3 fill-amber-400 text-amber-500" />
                          推荐
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
