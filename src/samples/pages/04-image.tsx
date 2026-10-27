"use client";

import * as React from "react";
import {
  Check,
  CircuitBoard,
  Cog,
  Cpu,
  Download,
  Droplets,
  Fan,
  Filter,
  ImageOff,
  Images,
  Plug,
  RadioReceiver,
  Thermometer,
  Trash2,
  Upload,
  Wind,
  X,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/mock/shell";
import {
  Btn,
  Callout,
  Chip,
  Code,
  FloatingBar,
  KeyValue,
  PageHeader,
  PartThumb,
  SearchBox,
  Segmented,
  Tag,
} from "@/components/mock/kit";

const ICONS = [Cog, Cpu, Fan, CircuitBoard, Thermometer, Wind, Droplets, RadioReceiver, Plug, Cog, Cpu, Fan];

const IMAGES = [
  { code: "8-0213-4471", name: "压缩机总成", n: 3, who: "黄思敏", day: "10-26" },
  { code: "8-0213-4472", name: "主控板组件", n: 2, who: "林晓婷", day: "10-25" },
  { code: "6-1107-0035", name: "室外风机电机", n: 1, who: "周嘉豪", day: "10-24" },
  { code: "6-1107-0042", name: "四通换向阀", n: 4, who: "黄思敏", day: "10-22" },
  { code: "5-3301-1180", name: "电子膨胀阀线圈", n: 2, who: "罗文斌", day: "10-21" },
  { code: "5-3301-1192", name: "温度传感器", n: 1, who: "黄思敏", day: "10-20" },
  { code: "8-0213-4519", name: "变频模块", n: 3, who: "梁佩仪", day: "10-19" },
  { code: "7-2204-0911", name: "贯流风叶", n: 2, who: "周嘉豪", day: "10-18" },
  { code: "9-0001-7723", name: "遥控器", n: 1, who: "林晓婷", day: "10-17" },
  { code: "6-1107-0051", name: "电容 35μF", n: 2, who: "黄思敏", day: "10-16" },
  { code: "5-3301-1205", name: "排水泵", n: 1, who: "罗文斌", day: "10-15" },
  { code: "8-0213-4480", name: "主控板 V5.0", n: 3, who: "林晓婷", day: "10-14" },
];

export function A() {
  const [sel, setSel] = React.useState(1);
  const img = IMAGES[sel];
  return (
    <AppShell nav="image" fill>
      <div className="flex h-full flex-col overflow-y-auto xl:flex-row xl:overflow-hidden">
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3 border-b border-line bg-white px-4 py-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-[16px] font-semibold text-slate-900">实物图片</h1>
              <p className="text-xs text-slate-400">广州中心仓 · 1,284 个编码有图 · 86 个缺图</p>
            </div>
            <SearchBox placeholder="编码 / 名称" className="w-full sm:w-56" />
            <Segmented
              size="sm"
              value="all"
              options={[
                { value: "all", label: "全部" },
                { value: "miss", label: "缺图" },
                { value: "new", label: "近 7 天" },
              ]}
            />
            <Btn variant="primary" icon={Upload}>上传图片</Btn>
          </div>
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {IMAGES.map((im, i) => {
                const on = i === sel;
                return (
                  <button
                    key={im.code}
                    type="button"
                    onClick={() => setSel(i)}
                    className={cn("overflow-hidden rounded-xl bg-white text-left ring-1 transition-shadow", on ? "ring-2 ring-indigo-500" : "ring-line hover:shadow-card")}
                  >
                    <PartThumb i={i} icon={ICONS[i]} className="aspect-[4/3] rounded-none" />
                    <div className="px-2.5 py-2">
                      <Code className="text-[12px]">{im.code}</Code>
                      <div className="truncate text-xs text-slate-500">{im.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <aside className="scrollbar-thin shrink-0 border-line bg-white max-xl:border-t xl:w-[320px] xl:overflow-y-auto xl:border-l">
          <div className="space-y-4 p-4">
            <PartThumb i={sel} icon={ICONS[sel]} className="aspect-[4/3] rounded-xl ring-1 ring-line" />
            <div>
              <Code className="text-[14px] font-semibold">{img.code}</Code>
              <div className="text-[13px] text-slate-600">{img.name}</div>
              <div className="mt-1 text-xs text-slate-400">{img.n} 张 · {img.who} 上传于 {img.day}</div>
            </div>
            <div className="flex gap-2">
              {IMAGES.slice(0, img.n).map((_, i) => (
                <PartThumb key={i} i={sel + i} icon={ICONS[(sel + i) % ICONS.length]} className={cn("size-14 rounded-lg ring-1", i === 0 ? "ring-indigo-400" : "ring-line")} />
              ))}
            </div>
            <KeyValue
              items={[
                { k: "分辨率", v: "2400 × 1800" },
                { k: "大小", v: "1.8 MB" },
                { k: "用途", v: "实物 / 包装 / 铭牌" },
              ]}
            />
            <div className="flex gap-2">
              <Btn icon={ZoomIn} className="flex-1">预览</Btn>
              <Btn icon={Download}>下载</Btn>
              <Btn variant="ghost" icon={Trash2} className="text-rose-600">删除</Btn>
            </div>
            <Callout tone="neutral" icon={Images}>
              上传在页头，删除跟当前选中。对象存储关闭时，上传按钮会禁用并在这里说明原因。
            </Callout>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

const FACETS = [
  ["压缩机", 42],
  ["电控", 86],
  ["电机", 31],
  ["阀件", 24],
  ["传感器", 19],
  ["钣金", 14],
];

export function B() {
  const picked = new Set([1, 4, 7]);
  return (
    <AppShell
      nav="image"
      overlay={
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center">
          <FloatingBar className="pointer-events-auto">
            <span className="flex items-center gap-2 px-2">
              <span className="tnum grid size-5 place-items-center rounded-md bg-blue-500 text-[11px] font-semibold">3</span>
              已选图片
            </span>
            <span className="h-5 w-px bg-white/15" />
            <button type="button" className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-white/90 hover:bg-white/10">
              <Download className="size-4 text-white/60" />
              下载
            </button>
            <button type="button" className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-white/90 hover:bg-white/10">
              <Trash2 className="size-4 text-white/60" />
              删除
            </button>
            <button type="button" className="grid size-8 place-items-center rounded-lg text-white/60 hover:bg-white/10">
              <X className="size-4" />
            </button>
          </FloatingBar>
        </div>
      }
    >
      <div className="flex min-h-[720px] flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-line bg-white p-4 lg:w-[220px] lg:border-r">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-900">筛选</span>
            <Filter className="size-4 text-slate-400" />
          </div>
          <div className="text-xs font-medium text-slate-500">类目</div>
          <div className="mt-2 space-y-1">
            {FACETS.map(([n, c], i) => (
              <button key={n} type="button" className={cn("flex h-8 w-full items-center rounded-lg px-2 text-[13px]", i === 1 ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-50")}>
                <span className="flex-1 text-left">{n}</span>
                <span className="tnum text-[11px] text-slate-400">{c}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs font-medium text-slate-500">图片状态</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip active>有图</Chip>
            <Chip>缺图</Chip>
            <Chip>待审</Chip>
          </div>
        </aside>
        <section className="min-w-0 flex-1 p-4 pb-24">
          <PageHeader
            title="实物图片"
            desc="电控 · 86 个编码"
            actions={<Btn variant="primary" icon={Upload}>上传图片</Btn>}
          />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {IMAGES.slice(0, 8).map((im, i) => {
              const on = picked.has(i);
              return (
                <div key={im.code} className={cn("relative overflow-hidden rounded-xl bg-white ring-1", on ? "ring-2 ring-blue-500" : "ring-line")}>
                  <PartThumb i={i} icon={ICONS[i]} className="aspect-square rounded-none" />
                  <span className={cn("absolute top-2 left-2 grid size-5 place-items-center rounded-md ring-1", on ? "bg-blue-600 text-white ring-blue-600" : "bg-white/90 text-transparent ring-white")}>
                    <Check className="size-3.5" />
                  </span>
                  <div className="px-2.5 py-2">
                    <Code className="text-[12px]">{im.code}</Code>
                    <div className="truncate text-xs text-slate-500">{im.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function C() {
  const [sel, setSel] = React.useState(0);
  const img = IMAGES[sel];
  return (
    <AppShell nav="image" fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="flex shrink-0 flex-col border-line bg-white max-lg:max-h-80 max-lg:border-b lg:w-[300px] lg:border-r">
          <div className="border-b border-line p-3">
            <SearchBox placeholder="编码 / 名称" className="w-full" />
          </div>
          <ul className="scrollbar-thin min-h-0 flex-1 divide-y divide-line/70 overflow-y-auto">
            {IMAGES.map((im, i) => (
              <li key={im.code}>
                <button type="button" onClick={() => setSel(i)} className={cn("flex w-full items-center gap-3 px-3 py-2 text-left", i === sel ? "bg-indigo-50/70" : "hover:bg-slate-50")}>
                  <PartThumb i={i} icon={ICONS[i]} className="size-12 shrink-0 rounded-lg ring-1 ring-line" />
                  <span className="min-w-0 flex-1">
                    <Code className="text-[12px]">{im.code}</Code>
                    <span className="block truncate text-xs text-slate-500">{im.name}</span>
                  </span>
                  <Tag>{im.n} 张</Tag>
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-50">
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-300 ring-1 ring-dashed ring-slate-200">
                  <ImageOff className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <Code className="text-[12px] text-slate-400">7-2204-0938</Code>
                  <span className="block text-xs text-slate-400">接水盘组件 · 缺图</span>
                </span>
              </button>
            </li>
          </ul>
        </aside>
        <section className="scrollbar-thin flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
          <div className="flex items-center justify-between px-5 pt-4">
            <div>
              <Code className="text-[15px] font-semibold">{img.code}</Code>
              <div className="text-[13px] text-slate-500">{img.name} · {img.who} 上传于 {img.day}</div>
            </div>
            <div className="flex gap-2">
              <Btn icon={Upload}>补传</Btn>
              <Btn variant="primary" icon={Download}>下载原图</Btn>
            </div>
          </div>
          <div className="bg-dots m-5 grid min-h-[360px] flex-1 place-items-center rounded-2xl ring-1 ring-line">
            <PartThumb i={sel} icon={ICONS[sel]} className="size-56 rounded-2xl shadow-float ring-1 ring-white" />
          </div>
          <div className="flex items-center gap-2 px-5 pb-5">
            {Array.from({ length: img.n }).map((_, i) => (
              <PartThumb key={i} i={sel + i} icon={ICONS[(sel + i) % ICONS.length]} className={cn("size-16 rounded-lg ring-2", i === 0 ? "ring-indigo-500" : "ring-transparent")} />
            ))}
            <button type="button" className="grid size-16 place-items-center rounded-lg border border-dashed border-line-strong text-slate-400 hover:bg-slate-50">
              <Upload className="size-4" />
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
