"use client";

import { AppShell, Body } from "@/components/mock/shell";
import { DataTable, PageHeader, Panel, Tag } from "@/components/mock/kit";
import { cn } from "@/lib/utils";

const CARDS = [
  { name: "应用服务", state: "正常", tone: "green" as const, detail: "单 worker · 运行 14 天" },
  { name: "打印网关", state: "1 台离线", tone: "amber" as const, detail: "佛山仓 GW-FS03 · 队列 12" },
  { name: "对象存储", state: "正常", tone: "green" as const, detail: "用量 62% · 凭据有效" },
  { name: "任务队列", state: "正常", tone: "green" as const, detail: "等待 0 · 失败 1（网关）" },
];

const GATEWAYS = [
  ["广州中心仓-1", "在线", "0", "正常", "green"],
  ["广州中心仓-2", "在线", "3", "正常", "green"],
  ["佛山仓-2", "离线", "12", "网关离线，不是凭据错误", "amber"],
];

export function A() {
  return (
    <AppShell admin="maintenance">
      <Body>
        <PageHeader crumbs={["管理后台", "运维"]} title="运维状态" desc="只读。先看结论，再看明细。容量问题和凭据错误分开写。" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((c) => (
            <div key={c.name} className="rounded-xl border border-line bg-white p-4 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{c.name}</span>
                <Tag tone={c.tone} dot>{c.state}</Tag>
              </div>
              <div className="mt-3 text-[13px] text-slate-700">{c.detail}</div>
            </div>
          ))}
        </div>
        <Panel title="打印网关" flush>
          <DataTable
            dense
            zebra={false}
            columns={[
              { key: "n", title: "网关", render: (r: string[]) => <span className="font-medium text-slate-800">{r[0]}</span> },
              { key: "s", title: "状态", render: (r) => <Tag tone={r[4] === "green" ? "green" : "amber"} dot>{r[1]}</Tag> },
              { key: "q", title: "队列", align: "right", render: (r) => <span className="tnum">{r[2]}</span> },
              { key: "d", title: "说明", render: (r) => <span className="text-slate-500">{r[3]}</span> },
            ]}
            rows={GATEWAYS}
          />
        </Panel>
        <Panel title="存储">
          <div className="grid gap-4 sm:grid-cols-2 text-[13px]">
            <div>
              <div className="text-xs text-slate-400">容量</div>
              <div className="mt-1 font-medium text-slate-900">62% · 未触发 503</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">凭据</div>
              <div className="mt-1 font-medium text-emerald-700">有效，到期 2027-01-15</div>
            </div>
          </div>
        </Panel>
      </Body>
    </AppShell>
  );
}

const TOC = ["总览", "应用服务", "打印网关", "对象存储", "任务队列"];

export function B() {
  return (
    <AppShell admin="maintenance" fill>
      <div className="flex h-full">
        <aside className="hidden w-[180px] shrink-0 border-r border-line bg-white p-3 lg:block">
          {TOC.map((t, i) => (
            <button key={t} type="button" className={cn("flex h-8 w-full items-center rounded-lg px-2 text-[13px]", i === 2 ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600")}>{t}</button>
          ))}
        </aside>
        <div className="scrollbar-thin min-w-0 flex-1 space-y-4 overflow-y-auto p-5">
          {["应用服务", "打印网关"].map((title, i) => (
            <Panel key={title} title={title} actions={<Tag tone={i === 1 ? "amber" : "green"} dot>{i === 1 ? "1 台离线" : "正常"}</Tag>}>
              <p className="text-[13px] leading-6 text-slate-600">
                {i === 0 ? "单 worker 运行 14 天，启动以来无重启。查询与上传共用该进程。" : "佛山仓 GW-FS03 从 10-26 17:10 起离线，队列积压 12。这是网关心跳丢失，凭据校验没有报错。"}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function C() {
  const tiles = [
    ["应用", "正常", true],
    ["广州-1", "在线", true],
    ["广州-2", "在线", true],
    ["佛山-2", "离线", false],
    ["存储", "62%", true],
    ["凭据", "有效", true],
    ["队列", "0 等待", true],
    ["失败任务", "1", false],
  ] as const;
  return (
    <AppShell admin="maintenance" fill>
      <div className="flex h-full flex-col">
        <div className="min-h-0 flex-1 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tiles.map(([n, s, ok]) => (
              <div key={n} className={cn("rounded-xl border bg-white p-4 shadow-card", ok ? "border-line" : "border-amber-300 bg-amber-50")}>
                <div className="text-xs text-slate-500">{n}</div>
                <div className={cn("mt-2 text-[18px] font-semibold", ok ? "text-slate-900" : "text-amber-800")}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-44 shrink-0 border-t border-line bg-slate-950 p-3 font-mono text-[12px] leading-5 text-slate-300">
          <div className="mb-1 text-[11px] text-slate-500">事件</div>
          <div>09:12 <span className="text-emerald-400">ok</span> data version published v2026.10.27-01</div>
          <div>08:41 <span className="text-amber-400">lock</span> user wuzq after 5 failures</div>
          <div>07:58 <span className="text-amber-400">warn</span> upload SZ02 3 rows</div>
          <div className="text-rose-400">10-26 17:10 gateway GW-FS03 heartbeat lost</div>
        </div>
      </div>
    </AppShell>
  );
}
