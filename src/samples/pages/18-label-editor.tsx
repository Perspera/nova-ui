"use client";

import { Copy, Grid3x3, Image as ImageIcon, Minus, MousePointer2, QrCode, Redo2, Square, Type, Undo2, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/mock/shell";
import { Btn, Field, Segmented, TextInput } from "@/components/mock/kit";

function Canvas() {
  return (
    <div className="bg-dots relative grid flex-1 place-items-center">
      <div className="relative h-[220px] w-[330px] bg-white shadow-[0_12px_30px_-16px_rgb(15_23_42/0.45)] ring-1 ring-slate-300">
        <div className="absolute -top-4 left-0 text-[10px] text-slate-400">0</div>
        <div className="absolute -top-4 left-1/2 text-[10px] text-slate-400">30mm</div>
        <div className="absolute top-3 left-3 text-[10px] text-slate-400">备件</div>
        <div className="absolute top-7 left-3 font-mono text-[18px] font-semibold ring-1 ring-indigo-400 ring-offset-2">A-03-12</div>
        <div className="absolute right-3 bottom-3 grid size-12 grid-cols-5 gap-px bg-slate-900 p-0.5">
          {Array.from({ length: 25 }).map((_, i) => <span key={i} className={i % 3 ? "bg-slate-900" : "bg-white"} />)}
        </div>
        <div className="absolute bottom-3 left-3 font-mono text-[11px] text-slate-500">8-0213-4471</div>
      </div>
    </div>
  );
}

function ToolRow() {
  return (
    <div className="flex h-11 shrink-0 items-center gap-1 border-b border-line bg-white px-2">
      <span className="px-2 text-[13px] font-medium text-slate-800">库位标签 60×40</span>
      <span className="rounded bg-slate-100 px-1.5 text-[10px] text-slate-500">未保存</span>
      <span className="mx-1 h-5 w-px bg-line" />
      {[Undo2, Redo2].map((I, i) => <button key={i} type="button" className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100"><I className="size-4" /></button>)}
      <span className="mx-1 h-5 w-px bg-line" />
      <span className="px-2 text-xs text-slate-500">100%</span>
      <div className="ml-auto flex items-center gap-2">
        <Btn size="sm">预览</Btn>
        <Btn size="sm" variant="primary">保存</Btn>
      </div>
    </div>
  );
}

const LAYERS = [
  ["库位号", Type, true],
  ["编码", Type, false],
  ["二维码", QrCode, false],
  ["分隔线", Minus, false],
] as const;

export function A() {
  return (
    <div className="flex h-dvh flex-col bg-canvas">
      <AppHeader active={null} />
      <ToolRow />
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[200px] shrink-0 flex-col border-r border-line bg-white sm:flex">
          <div className="border-b border-line px-3 py-2 text-[12px] font-semibold text-slate-500">图层</div>
          {LAYERS.map(([n, I, on]) => (
            <button key={n} type="button" className={cn("flex h-9 items-center gap-2 px-3 text-[13px]", on ? "bg-indigo-50 text-indigo-700" : "text-slate-600")}>
              <I className="size-3.5" />{n}
            </button>
          ))}
        </aside>
        <Canvas />
        <aside className="hidden w-[240px] shrink-0 space-y-3 border-l border-line bg-white p-3 lg:block">
          <div className="text-[13px] font-semibold text-slate-900">库位号</div>
          <Field label="内容"><TextInput value="{bin}" mono /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="字号"><TextInput value="18" /></Field>
            <Field label="字重"><TextInput value="600" /></Field>
          </div>
          <Field label="颜色"><TextInput value="#0F172A" mono /></Field>
          <p className="text-[11px] leading-5 text-slate-400">后台壳下这条工具条只有 44px，不再叠第二套页头。</p>
        </aside>
      </div>
    </div>
  );
}

export function B() {
  return (
    <div className="flex h-dvh flex-col bg-canvas">
      <AppHeader active={null} />
      <ToolRow />
      <div className="flex min-h-0 flex-1">
        <div className="relative flex min-w-0 flex-1">
          <Canvas />
          <div className="absolute top-3 left-3 w-44 rounded-xl border border-line bg-white p-2 shadow-float">
            <div className="px-1 pb-1 text-[11px] font-medium text-slate-400">图层</div>
            {LAYERS.map(([n, I, on]) => (
              <div key={n} className={cn("flex h-7 items-center gap-2 rounded-md px-1.5 text-[12px]", on ? "bg-indigo-50 text-indigo-700" : "text-slate-600")}>
                <I className="size-3.5" />{n}
              </div>
            ))}
          </div>
        </div>
        <aside className="hidden w-[240px] shrink-0 space-y-3 border-l border-line bg-white p-3 md:block">
          <div className="text-[13px] font-semibold">属性</div>
          <Field label="绑定字段"><TextInput value="{bin}" mono /></Field>
          <Field label="对齐">
            <Segmented size="sm" full value="left" options={[{ value: "left", label: "左" }, { value: "center", label: "中" }, { value: "right", label: "右" }]} />
          </Field>
        </aside>
      </div>
    </div>
  );
}

const PALETTE = [
  [Type, "文本"],
  [QrCode, "二维码"],
  [ImageIcon, "图片"],
  [Square, "线框"],
  [Minus, "直线"],
  [Grid3x3, "条码"],
] as const;

export function C() {
  return (
    <div className="flex h-dvh flex-col bg-canvas">
      <AppHeader active={null} />
      <ToolRow />
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[72px] shrink-0 flex-col items-center gap-1 border-r border-line bg-white py-2 sm:flex">
          <button type="button" className="grid size-10 place-items-center rounded-lg text-slate-400"><MousePointer2 className="size-4" /></button>
          {PALETTE.map(([I, n], i) => (
            <button key={n} type="button" title={n} className={cn("grid size-10 place-items-center rounded-lg", i === 0 ? "bg-indigo-50 text-indigo-600" : "text-slate-500")}>
              <I className="size-4" />
            </button>
          ))}
        </aside>
        <Canvas />
      </div>
      <div className="flex h-16 shrink-0 items-center gap-4 border-t border-line bg-white px-4">
        <span className="text-[12px] font-semibold text-slate-500">库位号</span>
        <label className="text-[11px] text-slate-400">X <TextInput value="12" className="ml-1 inline-flex w-16" /></label>
        <label className="text-[11px] text-slate-400">Y <TextInput value="18" className="ml-1 inline-flex w-16" /></label>
        <label className="text-[11px] text-slate-400">字号 <TextInput value="18" className="ml-1 inline-flex w-16" /></label>
        <span className="ml-auto flex items-center gap-1 text-slate-400"><ZoomIn className="size-4" /><Copy className="size-4" /></span>
      </div>
    </div>
  );
}
