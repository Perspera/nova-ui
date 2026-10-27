"use client";

import { ChevronDown } from "lucide-react";
import { AppShell, Body } from "@/components/mock/shell";
import { Chip, DataTable, PageHeader, Panel, Segmented, Stat, Tag, UnderlineTabs } from "@/components/mock/kit";
import { AUDIT } from "@/components/mock/data";

function EventTable({ expand }: { expand?: boolean }) {
  return (
    <DataTable
      dense
      columns={[
        { key: "time", title: "时间", render: (r) => <span className="tnum text-xs text-slate-500">{r.time}</span> },
        { key: "user", title: "账号", render: (r) => <span className="font-medium text-blue-700">{r.user}</span> },
        { key: "action", title: "动作", render: (r) => <span className="text-slate-800">{r.action}</span> },
        { key: "target", title: "对象", render: (r) => <span className="text-slate-600">{r.target}</span> },
        { key: "wh", title: "仓库", render: (r) => r.wh },
        { key: "ip", title: "IP", render: (r) => <span className="font-mono text-xs text-slate-400">{r.ip}</span> },
        {
          key: "result",
          title: "结果",
          render: (r) => <Tag tone={r.result.includes("错误") || r.result.includes("警告") ? "amber" : "green"} dot>{r.result}</Tag>,
        },
        ...(expand ? [{ key: "x", title: "", render: () => <ChevronDown className="size-3.5 text-slate-300" /> } as const] : []),
      ]}
      rows={AUDIT}
    />
  );
}

export function A() {
  return (
    <AppShell admin="audit">
      <Body wide>
        <PageHeader crumbs={["管理后台", "安全中心"]} title="操作审计" desc="登录统计和全量事件分开，避免上下叠在一起被忽略。" />
        <UnderlineTabs
          value="all"
          options={[
            { value: "all", label: "全量事件", count: 86 },
            { value: "login", label: "登录统计", count: 96 },
          ]}
        />
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400">续筛</span>
          <Chip active>今天</Chip>
          <Chip>动作 · 登录</Chip>
          <Chip>账号 · 林晓婷</Chip>
          <Chip>仓库 · 广州中心仓</Chip>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <EventTable expand />
        </div>
        <div className="rounded-xl border border-dashed border-line bg-white px-4 py-3 text-[13px] text-slate-500">
          展开一行可看变更前后。点账号、动作或仓库会追加到上面的筛选芯片。
        </div>
      </Body>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell admin="audit" fill>
      <div className="flex h-full flex-col overflow-y-auto xl:flex-row xl:overflow-hidden">
        <aside className="w-full shrink-0 space-y-4 border-line bg-white p-4 xl:w-[220px] xl:border-r">
          <div className="text-[13px] font-semibold text-slate-900">筛选</div>
          {[
            ["动作", ["登录", "打印", "上传", "改权限", "发布版本"]],
            ["结果", ["成功", "警告", "失败"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="mb-1.5 text-xs font-medium text-slate-500">{title as string}</div>
              <div className="flex flex-wrap gap-1.5">
                {(items as string[]).map((it, i) => (
                  <Chip key={it} active={i === 0}>{it}</Chip>
                ))}
              </div>
            </div>
          ))}
        </aside>
        <section className="min-w-0 flex-1 border-line xl:border-r">
          <div className="overflow-hidden">
            <EventTable />
          </div>
        </section>
        <aside className="w-full shrink-0 bg-white p-4 xl:w-[300px]">
          <div className="text-[13px] font-semibold text-slate-900">08:41:09 · 登录失败</div>
          <p className="mt-1 text-xs text-slate-400">wuzq · 上海仓 · 10.33.2.14</p>
          <div className="mt-4 space-y-2 text-[13px]">
            {[
              ["结果", "密码错误 ×5，账号锁定"],
              ["终端", "Chrome 130 · Windows"],
              ["前一次成功", "10-24 11:20"],
              ["策略", "5 次失败锁定 30 分钟"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-line/70 py-1.5">
                <span className="text-slate-500">{k}</span>
                <span className="text-right font-medium text-slate-800">{v}</span>
              </div>
            ))}
          </div>
          <Tag tone="red" className="mt-3">建议到账号管理复核</Tag>
        </aside>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell admin="audit">
      <Body wide>
        <PageHeader title="操作审计" desc="按天回看发生了什么，右侧是统计。" />
        <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
          <Panel title="今天" flush>
            <ol className="divide-y divide-line">
              {AUDIT.map((e) => (
                <li key={e.time} className="flex gap-3 px-4 py-3">
                  <span className="tnum w-16 shrink-0 text-xs text-slate-400">{e.time}</span>
                  <span className="min-w-0 flex-1">
                    <span className="text-[13px] font-medium text-slate-800">{e.user}</span>
                    <span className="text-[13px] text-slate-600"> {e.action} · {e.target}</span>
                    <span className="mt-0.5 block text-xs text-slate-400">{e.wh}</span>
                  </span>
                  <Tag tone={e.result.includes("错误") || e.result.includes("警告") ? "amber" : "green"}>{e.result.includes("成功") && e.result.length < 4 ? "成功" : e.result.slice(0, 6)}</Tag>
                </li>
              ))}
            </ol>
          </Panel>
          <div className="space-y-3">
            <Stat label="今日登录" value="96" delta="失败 3" deltaTone="red" />
            <Panel title="高频动作">
              <div className="space-y-2 text-[13px]">
                {[["查询导出", "28"], ["打印", "19"], ["登录", "96"], ["上传", "4"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-600">{k}</span>
                    <span className="tnum font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Segmented size="sm" value="today" options={[{ value: "today", label: "今天" }, { value: "7d", label: "7 天" }]} />
          </div>
        </div>
      </Body>
    </AppShell>
  );
}
