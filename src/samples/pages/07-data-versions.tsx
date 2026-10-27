"use client";

import { GitBranch, RotateCcw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body } from "@/components/mock/shell";
import {
  Btn,
  Callout,
  DataTable,
  Drawer,
  PageHeader,
  Panel,
  StickyBar,
  Tag,
} from "@/components/mock/kit";
import { VERSIONS } from "@/components/mock/data";

export function A() {
  return (
    <AppShell nav="data" fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="scrollbar-thin shrink-0 border-line bg-white max-lg:border-b lg:w-[300px] lg:overflow-y-auto lg:border-r">
          <div className="border-b border-line px-4 py-3 text-[13px] font-semibold text-slate-900">版本时间线</div>
          <ol>
            {VERSIONS.map((v) => (
              <li key={v.id}>
                <button type="button" className={cn("relative w-full px-4 py-3 text-left", v.current ? "bg-indigo-50/70" : "hover:bg-slate-50")}>
                  {v.current && <span className="absolute inset-y-0 left-0 w-[3px] bg-indigo-600" />}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] font-semibold text-slate-900">{v.id}</span>
                    {v.current && <Tag tone="indigo">当前</Tag>}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">{v.time} · {v.by}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{v.note} · {v.delta}</div>
                </button>
              </li>
            ))}
          </ol>
        </aside>
        <section className="scrollbar-thin min-w-0 flex-1 space-y-4 p-5 lg:overflow-y-auto">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-[18px] font-semibold text-slate-900">v2026.10.27-01</h2>
                <Tag tone="indigo" dot>当前指针</Tag>
              </div>
              <p className="mt-1 text-[13px] text-slate-500">陈立航 · 今天 09:12 · 全量覆盖 · 128,402 行</p>
            </div>
            <Btn icon={GitBranch}>去上传新版本</Btn>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["行数变化", "+41 / −6", "相对 10-26-02"],
              ["质量分", "98.6", "缺规格 12 · 库位异常 4"],
              ["覆盖仓库", "8 / 8", "无缺表"],
            ].map(([l, v, d]) => (
              <div key={l} className="rounded-xl border border-line bg-white p-3.5 shadow-card">
                <div className="text-xs text-slate-500">{l}</div>
                <div className="tnum mt-1 text-[20px] font-semibold text-slate-900">{v}</div>
                <div className="mt-0.5 text-xs text-slate-400">{d}</div>
              </div>
            ))}
          </div>
          <Panel title="与上一版的差异" flush>
            <DataTable
              dense
              zebra={false}
              stickyHeader={false}
              columns={[
                { key: "w", title: "仓库", render: (r: string[]) => r[0] },
                { key: "a", title: "新增", align: "right", render: (r) => <span className="tnum text-emerald-600">{r[1]}</span> },
                { key: "d", title: "删除", align: "right", render: (r) => <span className="tnum text-rose-600">{r[2]}</span> },
                { key: "q", title: "质量", align: "right", render: (r) => <span className="tnum">{r[3]}</span> },
              ]}
              rows={[
                ["深圳仓", "+41", "−6", "96.4"],
                ["广州中心仓", "0", "0", "99.1"],
                ["佛山仓", "0", "0", "98.8"],
                ["其余 5 仓", "0", "0", "98.6"],
              ]}
            />
          </Panel>
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-rose-700">
              <TriangleAlert className="size-4" />
              回退到上一版本
            </div>
            <p className="mt-1 text-[13px] leading-6 text-rose-900/70">
              将指针从 v2026.10.27-01 移回 v2026.10.26-02。查询立即生效，此操作记入审计，不会删除历史版本。
            </p>
            <Btn variant="danger" icon={RotateCcw} className="mt-3">回退到 10-26-02</Btn>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell
      nav="data"
      overlay={
        <Drawer
          title="v2026.10.26-02"
          desc="梁佩仪 · 昨天 17:40 · 深圳仓增量"
          width={400}
          footer={
            <>
              <Btn variant="ghost">关闭</Btn>
              <Btn variant="danger" icon={RotateCcw}>回退到此版本</Btn>
            </>
          }
        >
          <div className="space-y-3 text-[13px]">
            {[
              ["行数", "128,367"],
              ["相对上一版", "+12 / −3"],
              ["质量分", "97.9"],
              ["说明", "深圳仓增量"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-line py-2">
                <span className="text-slate-500">{k}</span>
                <span className="font-medium text-slate-900">{v}</span>
              </div>
            ))}
            <Callout tone="red" icon={TriangleAlert}>回退会立刻改变全站查询结果，需要再次确认。</Callout>
          </div>
        </Drawer>
      }
    >
      <Body wide>
        <PageHeader title="版本与质量" desc="点一行在右侧查看详情和回退。" actions={<Btn icon={GitBranch}>去上传</Btn>} />
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-indigo-200 bg-indigo-50/50 px-4 py-3">
          <Tag tone="indigo" dot>当前指针</Tag>
          <span className="font-mono text-[13px] font-semibold text-indigo-900">v2026.10.27-01</span>
          <span className="text-[13px] text-indigo-800/80">今天 09:12 · 128,402 行 · 质量 98.6</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <DataTable
            columns={[
              { key: "id", title: "版本", render: (v) => <span className="font-mono text-xs font-medium">{v.id}</span> },
              { key: "time", title: "发布时间", render: (v) => <span className="tnum text-xs text-slate-500">{v.time}</span> },
              { key: "by", title: "发布人", render: (v) => v.by },
              { key: "rows", title: "行数", align: "right", render: (v) => <span className="tnum">{v.rows.toLocaleString("zh-CN")}</span> },
              { key: "delta", title: "变化", render: (v) => <span className="tnum text-xs">{v.delta}</span> },
              { key: "q", title: "质量", align: "right", render: (v) => <span className={cn("tnum font-medium", v.quality < 95 ? "text-amber-600" : "text-slate-800")}>{v.quality}</span> },
              { key: "note", title: "说明", render: (v) => <span className="text-slate-500">{v.note}</span> },
              { key: "cur", title: "", render: (v) => (v.current ? <Tag tone="indigo">当前</Tag> : null) },
            ]}
            rows={VERSIONS}
            activeIndex={1}
          />
        </div>
      </Body>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell nav="data" fill>
      <div className="flex h-full flex-col">
        <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
          <Body>
            <PageHeader title="版本对比" desc="左为回退目标，右为当前指针。" />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["v2026.10.26-02", "回退目标", false],
                ["v2026.10.27-01", "当前指针", true],
              ].map(([id, role, cur]) => (
                <Panel key={id as string} title={id as string} desc={role as string} actions={cur ? <Tag tone="indigo">当前</Tag> : <Tag>目标</Tag>}>
                  <div className="space-y-2 text-[13px]">
                    {[
                      ["行数", cur ? "128,402" : "128,367"],
                      ["质量分", cur ? "98.6" : "97.9"],
                      ["发布", cur ? "今天 09:12 · 陈立航" : "昨天 17:40 · 梁佩仪"],
                      ["深圳仓", cur ? "12,036 行" : "11,995 行"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-line/70 py-1.5">
                        <span className="text-slate-500">{k}</span>
                        <span className="font-medium text-slate-800">{v}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
            <Panel title="差异摘要">
              <div className="flex flex-wrap gap-2">
                <Tag tone="green">新增 41 个编码</Tag>
                <Tag tone="red">删除 6 个编码</Tag>
                <Tag tone="amber">3 行规格沿用旧值</Tag>
                <Tag>单价变化 0</Tag>
              </div>
            </Panel>
          </Body>
        </div>
        <StickyBar>
          <span className="text-[13px] text-slate-600">回退到左侧版本后，查询立即改读 v2026.10.26-02</span>
          <Btn variant="danger" icon={RotateCcw} className="ml-auto">回退到左侧版本</Btn>
        </StickyBar>
      </div>
    </AppShell>
  );
}
