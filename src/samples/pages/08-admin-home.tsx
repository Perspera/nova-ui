"use client";

import {
  Activity,
  ArrowUpRight,
  Database,
  Megaphone,
  MessageSquare,
  ScrollText,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";
import { AppShell, Body } from "@/components/mock/shell";
import { Btn, PageHeader, Panel, Stat, Tag } from "@/components/mock/kit";

const TODOS = [
  { tone: "red" as const, title: "吴志强连续 5 次密码错误，账号已锁定", meta: "安全 · 08:41", action: "去复核" },
  { tone: "amber" as const, title: "深圳仓上传有 3 行警告未确认", meta: "数据 · 07:58", action: "看问题" },
  { tone: "blue" as const, title: "2 条消息等待接收人确认", meta: "消息 · 今天", action: "去发布页" },
];

const LINKS = [
  [Users, "账号管理", "128 人"],
  [ShieldCheck, "安全策略", "会话 20 分钟"],
  [ScrollText, "操作审计", "今日 86 条"],
  [MessageSquare, "消息管理", "2 待确认"],
  [Megaphone, "系统公告", "3 条生效"],
  [Database, "数据版本", "10-27-01"],
  [Activity, "运维状态", "1 项异常"],
];

export function A() {
  return (
    <AppShell admin="home">
      <Body wide>
        <PageHeader
          crumbs={["管理后台"]}
          title="后台首页"
          desc="每 60 秒刷新。单个模块失败只降级该卡片。"
          actions={<Btn icon={ArrowUpRight}>打开命令面板</Btn>}
        />
        <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <Panel title="待办" desc="3 件需要人处理" actions={<Tag tone="amber">今天</Tag>}>
              <ul className="divide-y divide-line">
                {TODOS.map((t) => (
                  <li key={t.title} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className={`size-2 shrink-0 rounded-full ${t.tone === "red" ? "bg-rose-500" : t.tone === "amber" ? "bg-amber-500" : "bg-blue-500"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-slate-800">{t.title}</span>
                      <span className="text-[11px] text-slate-400">{t.meta}</span>
                    </span>
                    <Btn size="sm" variant="ghost">{t.action}</Btn>
                  </li>
                ))}
              </ul>
            </Panel>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="今日查询" value="1,284" delta="+12%" icon={Activity} />
              <Stat label="今日打印" value="326" unit="张" delta="+4%" icon={Activity} tone="indigo" />
              <Stat label="登录人数" value="96" delta="3 次失败" deltaTone="red" icon={Users} tone="green" />
              <Stat label="上传" value="4" unit="个文件" delta="1 个警告" deltaTone="neutral" icon={Database} tone="amber" />
            </div>
            <Panel title="数据源" actions={<Tag tone="green" dot>正常</Tag>}>
              <div className="grid gap-3 sm:grid-cols-3 text-[13px]">
                {[
                  ["当前版本", "v2026.10.27-01"],
                  ["行数", "128,402"],
                  ["最近发布", "今天 09:12 · 陈立航"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-slate-400">{k}</div>
                    <div className="mt-0.5 font-medium text-slate-900">{v}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <Panel title="快捷入口">
            <div className="space-y-1">
              {LINKS.map(([I, l, m]) => (
                <button key={l as string} type="button" className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-slate-50">
                  <I className="size-4 text-slate-400" />
                  <span className="flex-1 text-[13px] text-slate-800">{l as string}</span>
                  <span className="text-[11px] text-slate-400">{m as string}</span>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </Body>
    </AppShell>
  );
}

const GROUPS = [
  { name: "组织与账号", items: [["账号管理", "128", Users]] },
  { name: "安全中心", items: [["安全策略", "已发布", ShieldCheck], ["操作审计", "86", ScrollText]] },
  { name: "信息发布", items: [["消息管理", "2", MessageSquare], ["系统公告", "3", Megaphone]] },
  { name: "数据与运维", items: [["数据版本", "10-27", Database], ["运营看板", "7 天", Activity], ["运维状态", "1 异常", TriangleAlert]] },
];

export function B() {
  return (
    <AppShell admin="home">
      <Body>
        <PageHeader title="后台首页" desc="按分组找入口。角标是待处理数量，不是待办。" />
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-card text-[13px]">
          <Tag tone="green" dot>服务正常</Tag>
          <span className="text-slate-600">数据 v2026.10.27-01</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-600">打印网关 2/3 在线</span>
          <span className="text-slate-300">·</span>
          <span className="text-amber-700">佛山仓 GW-FS03 离线</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {GROUPS.map((g) => (
            <Panel key={g.name} title={g.name}>
              <div className="grid gap-2 sm:grid-cols-2">
                {g.items.map(([l, m, I]) => (
                  <button key={l as string} type="button" className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 text-left ring-1 ring-inset ring-line hover:bg-white">
                    <span className="grid size-9 place-items-center rounded-lg bg-white text-slate-500 shadow-card">
                      <I className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-medium text-slate-900">{l as string}</span>
                      <span className="text-xs text-slate-400">{m as string}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </Body>
    </AppShell>
  );
}

export function C() {
  const cols = [
    { title: "待办", tone: "text-rose-600", items: TODOS.map((t) => t.title) },
    { title: "今日", tone: "text-blue-600", items: ["查询 1,284 次", "打印 326 张", "登录 96 人", "上传 4 个文件"] },
    { title: "系统状态", tone: "text-emerald-600", items: ["服务正常", "数据版本 10-27-01", "网关：佛山仓离线", "存储 62%"] },
  ];
  return (
    <AppShell admin="home" fill>
      <div className="grid h-full gap-px bg-line lg:grid-cols-3">
        {cols.map((c) => (
          <section key={c.title} className="flex flex-col bg-canvas">
            <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3">
              <span className={`text-[13px] font-semibold ${c.tone}`}>{c.title}</span>
              <span className="text-[11px] text-slate-400">60 秒刷新</span>
            </header>
            <ul className="scrollbar-thin min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
              {c.items.map((it) => (
                <li key={it} className="rounded-xl border border-line bg-white px-3 py-3 text-[13px] text-slate-800 shadow-card">
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
