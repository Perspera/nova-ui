"use client";

import * as React from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  Settings2,
  SlidersHorizontal,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/mock/shell";
import {
  Btn,
  Callout,
  Chip,
  Dot,
  Field,
  IconBtn,
  Panel,
  Segmented,
  Select,
  Stepper,
  StickyBar,
  Tag,
  TextArea,
  TextInput,
} from "@/components/mock/kit";

function Bars({ className }: { className?: string }) {
  const widths = [2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  return (
    <div className={cn("flex h-12 items-stretch gap-px", className)}>
      {widths.map((w, i) => (
        <span key={i} className="bg-slate-900" style={{ width: w }} />
      ))}
    </div>
  );
}

function LabelCard({
  code = "8-0213-4472",
  name = "主控板组件",
  bin = "B-11-04",
  warn,
  className,
}: {
  code?: string;
  name?: string;
  bin?: string;
  warn?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-[280px] rounded-md bg-white p-3.5 shadow-[0_8px_24px_-12px_rgb(15_23_42/0.4)] ring-1", warn ? "ring-rose-300" : "ring-slate-200", className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] tracking-wide text-slate-400">备件库位标签 · 60×40</div>
          <div className="mt-1 font-mono text-[15px] font-semibold text-slate-900">{code}</div>
          <div className="text-[12px] text-slate-600">{name}</div>
        </div>
        <div className="grid size-10 grid-cols-5 gap-px bg-slate-900 p-0.5">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className={i % 3 === 0 || i % 7 === 0 ? "bg-white" : "bg-slate-900"} />
          ))}
        </div>
      </div>
      <Bars className="mt-3" />
      <div className="mt-2 flex items-end justify-between">
        <div>
          <div className="text-[10px] text-slate-400">库位</div>
          <div className="font-mono text-[18px] leading-none font-semibold tracking-wide text-slate-900">{bin}</div>
        </div>
        <div className="text-right text-[10px] text-slate-400">
          广州中心仓
          <br />
          10-27
        </div>
      </div>
    </div>
  );
}

const CODES = ["8-0213-4471", "8-0213-4472", "6-1107-0035", "6-1107-0042"];

export function A() {
  const [mode, setMode] = React.useState("batch");
  return (
    <AppShell nav="print" notice fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="flex shrink-0 flex-col border-line bg-white max-lg:border-b lg:w-[380px] lg:border-r">
          <div className="space-y-4 p-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-slate-900">标签打印</h2>
              <Tag tone="green" dot>打印机就绪</Tag>
            </div>
            <Segmented
              full
              value={mode}
              onChange={setMode}
              options={[
                { value: "single", label: "单张" },
                { value: "batch", label: "批量" },
              ]}
            />
            <Field label="标签模板">
              <Select value="库位标签 60×40" className="w-full" />
            </Field>
            <Field label="打印机" hint="佛山仓 2 号离线，已从列表置灰">
              <Select value="广州中心仓-1号 Zebra ZT411" className="w-full" />
            </Field>
            <Field label="编码" aside={<span className="tnum text-[11px] text-slate-400">4 行</span>}>
              <TextArea lines={CODES} rows={5} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="每码份数">
                <TextInput value="1" />
              </Field>
              <Field label="纸张">
                <Select value="60 × 40 mm" className="w-full" />
              </Field>
            </div>
            <button type="button" className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-800">
              <SlidersHorizontal className="size-4" />
              高级设置（偏移、浓度、切纸）
            </button>
          </div>
          <div className="space-y-2 border-t border-line bg-white p-3">
            <div className="flex items-center justify-between px-1 text-xs text-slate-500">
              <span>4 个编码 · 可打印 4 · 份数 1</span>
              <span className="text-emerald-600">草稿已保留</span>
            </div>
            <Btn variant="primary" size="lg" icon={Printer} className="w-full">
              打印 4 张
            </Btn>
          </div>
        </aside>
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2 border-b border-line bg-white px-4">
            <span className="text-[13px] font-medium text-slate-800">预览</span>
            <span className="text-xs text-slate-400">第 2 / 4 张</span>
            <div className="ml-auto flex items-center gap-1">
              <IconBtn icon={ChevronLeft} />
              <IconBtn icon={ChevronRight} />
              <span className="mx-1 h-5 w-px bg-line" />
              <Btn size="sm" variant="ghost" icon={RotateCcw}>重置缩放</Btn>
            </div>
          </div>
          <div className="bg-dots flex min-h-[360px] flex-1 items-center justify-center p-8">
            <LabelCard />
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-line bg-white px-4 py-3">
            {CODES.map((c, i) => (
              <button key={c} type="button" className={cn("rounded-md px-2 py-1 font-mono text-[11px] ring-1 ring-inset", i === 1 ? "bg-indigo-50 text-indigo-700 ring-indigo-200" : "text-slate-500 ring-line")}>
                {c}
              </button>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

const STEPS = [
  { title: "选模板", desc: "标签与打印机" },
  { title: "录入", desc: "编码与份数" },
  { title: "校对", desc: "逐张确认" },
  { title: "打印", desc: "下发任务" },
];

export function B() {
  return (
    <AppShell nav="print" fill>
      <div className="flex h-full flex-col">
        <div className="border-b border-line bg-white px-6 py-4">
          <Stepper steps={STEPS} current={2} />
        </div>
        <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-4 p-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900">校对 4 张标签</h2>
                <p className="mt-1 text-[13px] text-slate-500">模板「库位标签 60×40」· 广州中心仓-1号 · 每码 1 份</p>
              </div>
              <Tag tone="amber" dot>1 张需要处理</Tag>
            </div>
            <Callout tone="amber" icon={AlertTriangle} title="6-1107-0035 当前缺货">
              仍可打印库位标签。若只想打有货编码，回到上一步去掉这一行。
            </Callout>
            <div className="grid gap-4 sm:grid-cols-2">
              <LabelCard code="8-0213-4471" name="压缩机总成" bin="A-03-12" className="w-full" />
              <LabelCard className="w-full" />
              <LabelCard code="6-1107-0035" name="室外风机电机" bin="A-07-02" warn className="w-full" />
              <LabelCard code="6-1107-0042" name="四通换向阀" bin="C-02-09" className="w-full" />
            </div>
          </div>
        </div>
        <StickyBar>
          <Btn icon={ChevronLeft}>上一步</Btn>
          <span className="ml-auto text-xs text-slate-400">草稿已保留，切换步骤不会清空</span>
          <Btn variant="primary" iconRight={ChevronRight}>
            确认并打印
          </Btn>
        </StickyBar>
      </div>
    </AppShell>
  );
}

const QUEUE = [
  { name: "补货清单 48 张", who: "罗文斌", state: "打印中 12/48", tone: "blue" as const, on: false },
  { name: "主控板 ×4", who: "陈立航", state: "就绪", tone: "green" as const, on: true },
  { name: "佛山仓重打 12 张", who: "系统", state: "失败 · 网关离线", tone: "red" as const, on: false },
  { name: "盘点标签 80 张", who: "林晓婷", state: "排队", tone: "neutral" as const, on: false },
];

export function C() {
  return (
    <AppShell nav="print" fill>
      <div className="flex h-full flex-col overflow-y-auto xl:flex-row xl:overflow-hidden">
        <aside className="flex shrink-0 flex-col border-line bg-white max-xl:max-h-72 max-xl:border-b xl:w-[260px] xl:border-r">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-[13px] font-semibold text-slate-900">打印队列</span>
            <Tag>4</Tag>
          </div>
          <ul className="scrollbar-thin min-h-0 flex-1 divide-y divide-line/70 overflow-y-auto">
            {QUEUE.map((q) => (
              <li key={q.name}>
                <button type="button" className={cn("relative w-full px-4 py-3 text-left", q.on ? "bg-indigo-50/70" : "hover:bg-slate-50")}>
                  {q.on && <span className="absolute inset-y-0 left-0 w-[3px] bg-indigo-600" />}
                  <div className="text-[13px] font-medium text-slate-900">{q.name}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{q.who}</span>
                    <Tag tone={q.tone} dot>{q.state}</Tag>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="bg-dots flex min-h-[420px] min-w-0 flex-1 items-center justify-center p-8">
          <LabelCard />
        </section>
        <aside className="scrollbar-thin shrink-0 border-line bg-white max-xl:border-t xl:w-[300px] xl:overflow-y-auto xl:border-l">
          <div className="space-y-4 p-4">
            <div className="text-[13px] font-semibold text-slate-900">属性</div>
            <Field label="任务名称">
              <TextInput value="主控板 ×4" />
            </Field>
            <Field label="打印机">
              <div className="space-y-1.5">
                {[
                  ["广州中心仓-1号", true, true],
                  ["广州中心仓-2号 · 队列 3", false, true],
                  ["佛山仓-2号 · 离线", false, false],
                ].map(([n, on, up]) => (
                  <div key={n as string} className={cn("flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12.5px] ring-1 ring-inset", on ? "bg-blue-50 text-blue-800 ring-blue-200" : "text-slate-600 ring-line")}>
                    {up ? <Wifi className="size-3.5 text-emerald-500" /> : <WifiOff className="size-3.5 text-slate-300" />}
                    <span className="flex-1">{n as string}</span>
                    {on && <Check className="size-3.5" />}
                  </div>
                ))}
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="横向偏移">
                <TextInput value="0" suffix={<span className="text-[11px] text-slate-400">mm</span>} />
              </Field>
              <Field label="纵向偏移">
                <TextInput value="0" suffix={<span className="text-[11px] text-slate-400">mm</span>} />
              </Field>
            </div>
            <Field label="打印浓度">
              <div className="flex items-center gap-2">
                <IconBtn icon={Minus} className="size-7 ring-1 ring-line" />
                <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                  <div className="h-full w-3/5 rounded-full bg-blue-600" />
                </div>
                <IconBtn icon={Plus} className="size-7 ring-1 ring-line" />
                <span className="tnum w-6 text-xs text-slate-500">15</span>
              </div>
            </Field>
            <div className="flex items-center justify-between text-[13px] text-slate-700">
              <span className="flex items-center gap-1.5">
                <Settings2 className="size-4 text-slate-400" />
                打完切纸
              </span>
              <Chip active>开启</Chip>
            </div>
            <Btn variant="primary" icon={Printer} className="w-full">
              打印此任务
            </Btn>
            <Panel title="失败原因" className="shadow-none">
              <div className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                <Dot tone="red" className="mt-1.5" />
                佛山仓任务失败是网关离线，不是凭据错误。恢复在线后可从队列重打。
              </div>
            </Panel>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
