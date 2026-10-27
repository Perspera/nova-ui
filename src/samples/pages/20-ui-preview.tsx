"use client";

import type { ReactNode } from "react";
import { AppShell, Body } from "@/components/mock/shell";
import { Btn, PageHeader, Tag, Toggle } from "@/components/mock/kit";

const ROWS = [
  ["主按钮", <Btn key="a" variant="primary">发布</Btn>, <Btn key="b" variant="primary" className="bg-blue-700">发布</Btn>, <Btn key="c" variant="primary" disabled>发布</Btn>],
  ["次按钮", <Btn key="a">导出</Btn>, <Btn key="b" className="bg-slate-50">导出</Btn>, <Btn key="c" disabled>导出</Btn>],
  ["危险", <Btn key="a" variant="danger">回退</Btn>, <Btn key="b" variant="danger" className="bg-rose-700">回退</Btn>, <Btn key="c" variant="danger" disabled>回退</Btn>],
  ["状态", <Tag key="a" tone="green" dot>有货</Tag>, <Tag key="b" tone="amber" dot>低库存</Tag>, <Tag key="c" tone="red" dot>缺货</Tag>],
  ["开关", <Toggle key="a" on />, <Toggle key="b" />, <Toggle key="c" on />],
];

export function A() {
  return (
    <AppShell nav={null}>
      <Body>
        <PageHeader title="组件矩阵" desc="DEV only。生产环境不注册这条路由。" meta={<Tag tone="amber">DEV</Tag>} />
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <div className="grid grid-cols-4 border-b border-line bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
            <span>组件</span><span>默认</span><span>悬停</span><span>禁用</span>
          </div>
          {ROWS.map(([name, a, b, c]) => (
            <div key={name as string} className="grid grid-cols-4 items-center border-b border-line/70 px-4 py-3 last:border-0">
              <span className="text-[13px] font-medium text-slate-700">{name as string}</span>
              <span>{a as ReactNode}</span>
              <span>{b as ReactNode}</span>
              <span>{c as ReactNode}</span>
            </div>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-8">
          {["#2563EB", "#4F46E5", "#0F172A", "#64748B", "#10B981", "#F59E0B", "#E11D48", "#F6F8FC"].map((c) => (
            <div key={c} className="overflow-hidden rounded-lg ring-1 ring-line">
              <div className="h-10" style={{ background: c }} />
              <div className="bg-white px-1.5 py-1 font-mono text-[10px] text-slate-500">{c}</div>
            </div>
          ))}
        </div>
      </Body>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell nav={null} fill>
      <div className="flex h-full">
        <aside className="w-[200px] shrink-0 border-r border-line bg-white p-3">
          <div className="px-2 py-1 text-[11px] font-medium text-slate-400">组件</div>
          {["Button", "Tag", "Input", "Table", "Drawer", "Stat"].map((n, i) => (
            <button key={n} type="button" className={`flex h-8 w-full items-center rounded-lg px-2 text-[13px] ${i === 0 ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600"}`}>{n}</button>
          ))}
        </aside>
        <section className="bg-dots grid flex-1 place-items-center">
          <div className="flex gap-2 rounded-xl bg-white p-6 shadow-card ring-1 ring-line">
            <Btn variant="primary">发布</Btn>
            <Btn>取消</Btn>
            <Btn variant="danger">删除</Btn>
          </div>
        </section>
        <aside className="hidden w-[240px] shrink-0 space-y-3 border-l border-line bg-white p-4 lg:block">
          <div className="text-[13px] font-semibold">Button</div>
          {["variant", "size", "disabled", "icon"].map((k) => (
            <div key={k} className="flex items-center justify-between text-[13px]">
              <span className="font-mono text-xs text-slate-500">{k}</span>
              <span className="text-slate-800">{k === "variant" ? "primary" : k === "disabled" ? "false" : "default"}</span>
            </div>
          ))}
        </aside>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell nav={null}>
      <Body className="max-w-3xl">
        <PageHeader title="令牌" desc="颜色、字号、间距。组件以这套为准。" />
        <section>
          <h2 className="text-[13px] font-semibold text-slate-800">颜色</h2>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["画布", "#F6F8FC"],
              ["卡片", "#FFFFFF"],
              ["主操作", "#2563EB"],
              ["选中", "#4F46E5"],
              ["文字", "#0F172A"],
              ["次文字", "#64748B"],
              ["线", "#E6EAF1"],
              ["危险", "#E11D48"],
            ].map(([n, c]) => (
              <div key={n} className="flex items-center gap-2 rounded-lg border border-line bg-white px-2 py-2">
                <span className="size-8 rounded-md ring-1 ring-line" style={{ background: c }} />
                <span>
                  <span className="block text-[12px] font-medium text-slate-800">{n}</span>
                  <span className="font-mono text-[10px] text-slate-400">{c}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-[13px] font-semibold text-slate-800">字号</h2>
          <div className="mt-2 space-y-2 rounded-xl border border-line bg-white p-4">
            <div className="text-[22px] font-semibold">页标题 22 / 600</div>
            <div className="text-[16px] font-semibold">区块标题 16 / 600</div>
            <div className="text-[13px] text-slate-700">正文 13 / 400 · 备件编码、库位、数量</div>
            <div className="text-xs text-slate-500">说明 12 / 400</div>
          </div>
        </section>
        <section>
          <h2 className="text-[13px] font-semibold text-slate-800">圆角与间距</h2>
          <div className="mt-2 flex items-end gap-3">
            {[8, 12, 16].map((r) => (
              <div key={r} className="grid h-16 w-20 place-items-center border border-line bg-white text-xs text-slate-500" style={{ borderRadius: r }}>{r}</div>
            ))}
          </div>
        </section>
      </Body>
    </AppShell>
  );
}
