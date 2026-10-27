"use client";

import {
  Bell,
  BookOpen,
  ChevronRight,
  Database,
  Images,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Printer,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body, Logo, CommandTrigger, ADMIN_NAV, TOP_NAV } from "@/components/mock/shell";
import { Avatar, IconBtn, Kbd, Panel, Stat, Tag } from "@/components/mock/kit";

function DemoBody() {
  return (
    <Body>
      <div>
        <h1 className="text-[20px] font-semibold tracking-tight text-slate-900">早上好，陈立航</h1>
        <p className="mt-1 text-[13px] text-slate-500">广州中心仓 · 数据版本 v2026.10.27-01 · 3 件待办</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="今日查询" value="1,284" delta="+12%" foot="较昨日" icon={Search} />
        <Stat label="今日打印" value="326" unit="张" delta="+4%" foot="较昨日" icon={Printer} tone="indigo" />
        <Stat label="待确认消息" value="3" delta="2 条系统" deltaTone="neutral" icon={Bell} tone="amber" />
      </div>
      <Panel title="内容区" desc="壳层之下是各路由页，本页只演示导航与通知槽">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ["查询 / 打印 / 图片 / 数据", "前台四个入口常驻顶栏，查询页不套侧栏，守住约 1310px 列宽"],
            ["管理", "仅 /admin/* 出现左侧分组导航，来源与顶栏「管理」同一份"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-inset ring-line">
              <div className="text-[13px] font-medium text-slate-800">{t}</div>
              <div className="mt-0.5 text-xs leading-5 text-slate-500">{d}</div>
            </div>
          ))}
        </div>
      </Panel>
    </Body>
  );
}

export function A() {
  return (
    <AppShell admin="home" notice>
      <DemoBody />
    </AppShell>
  );
}

const SIDE = [
  { group: "作业", items: TOP_NAV },
  {
    group: "管理",
    items: [
      { key: "home", label: "后台首页", icon: LayoutDashboard },
      { key: "users", label: "账号管理", icon: Users },
      { key: "security", label: "安全策略", icon: ShieldCheck },
      { key: "messages", label: "消息管理", icon: MessageSquare },
      { key: "data", label: "数据版本", icon: Database },
    ],
  },
];

export function B() {
  return (
    <div className="flex h-dvh overflow-hidden bg-canvas text-slate-800">
      <aside className="flex w-[216px] shrink-0 flex-col border-r border-line bg-white">
        <div className="flex h-[52px] items-center border-b border-line px-4">
          <Logo />
        </div>
        <nav className="scrollbar-thin min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-3">
          {SIDE.map((g) => (
            <div key={g.group}>
              <div className="px-2 pb-1 text-[11px] font-medium text-slate-400">{g.group}</div>
              {g.items.map((it, i) => {
                const on = g.group === "作业" && i === 0;
                return (
                  <button
                    key={it.label}
                    type="button"
                    className={cn(
                      "flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-[13px]",
                      on ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    <it.icon className={cn("size-4", on ? "text-indigo-600" : "text-slate-400")} />
                    {it.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2.5 border-t border-line px-4 py-3">
          <Avatar name="陈立航" size={28} tone={0} />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[12.5px] font-medium text-slate-800">陈立航</div>
            <div className="text-[11px] text-slate-400">超级管理员</div>
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line bg-white px-4">
          <div className="flex items-center gap-1 text-[13px] text-slate-400">
            作业
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-slate-800">查询</span>
          </div>
          <CommandTrigger className="ml-auto w-64" />
          <IconBtn icon={Bell} badge={3} />
        </header>
        <main className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
          <DemoBody />
        </main>
      </div>
    </div>
  );
}

const SUB = ["后台首页", "账号管理", "安全策略", "操作审计", "消息管理", "系统公告", "数据版本", "运营看板"];

export function C() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-canvas text-slate-800">
      <header className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line bg-white px-4">
        <Logo />
        <nav className="ml-4 hidden items-center gap-0.5 md:flex">
          {TOP_NAV.map((n, i) => (
            <button
              key={n.key}
              type="button"
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium",
                i === 3 ? "bg-indigo-50 text-indigo-700" : "text-slate-600",
              )}
            >
              <n.icon className={cn("size-4", i === 3 ? "text-indigo-600" : "text-slate-400")} />
              {n.label}
            </button>
          ))}
          <button type="button" className="flex h-8 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-[13px] font-medium text-white">
            <LayoutDashboard className="size-4" />
            管理
          </button>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <IconBtn icon={BookOpen} />
          <div className="relative">
            <IconBtn icon={Bell} badge={3} active />
            <div className="absolute top-10 right-0 z-30 w-80 rounded-xl border border-line bg-white p-2 shadow-float">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-[13px] font-semibold text-slate-900">通知</span>
                <span className="text-[11px] text-slate-400">2 条未读</span>
              </div>
              {[
                [Megaphone, "10/28 晚间维护，查询与打印暂停", "公告 · 刚刚", true],
                [ShieldCheck, "初始密码未修改，建议今日完成", "安全 · 今天", true],
                [Images, "3 张实物图待审核", "图片 · 昨天", false],
              ].map(([I, t, m, hot]) => {
                const Icon = I as typeof Bell;
                return (
                  <div key={t as string} className="flex items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-slate-50">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-medium text-slate-800">{t as string}</span>
                      <span className="text-[11px] text-slate-400">{m as string}</span>
                    </span>
                    {hot && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-500" />}
                  </div>
                );
              })}
              <button type="button" className="mt-1 w-full rounded-lg py-1.5 text-center text-xs font-medium text-blue-600 hover:bg-blue-50">
                查看全部
              </button>
            </div>
          </div>
          <span className="mx-1 h-5 w-px bg-line" />
          <Avatar name="陈立航" size={26} tone={0} />
        </div>
      </header>
      <div className="flex h-10 shrink-0 items-center gap-1 overflow-hidden border-b border-line bg-white pr-96 pl-4">
        {SUB.map((s, i) => (
          <button
            key={s}
            type="button"
            className={cn(
              "relative flex h-10 shrink-0 items-center px-3 text-[13px]",
              i === 1 ? "font-medium text-slate-900" : "text-slate-500",
            )}
          >
            {s}
            {i === 1 && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded bg-blue-600" />}
          </button>
        ))}
        <button type="button" className="ml-auto flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-xs text-slate-500 hover:bg-slate-100">
          更多
          <Kbd>8</Kbd>
        </button>
      </div>
      <main className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
        <Body>
          <div className="flex items-center gap-2">
            <Tag tone="indigo">管理</Tag>
            <ChevronRight className="size-3.5 text-slate-300" />
            <span className="text-[13px] font-medium text-slate-800">账号管理</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="账号" value="128" foot="启用 117 · 锁定 3" icon={Users} deltaTone="neutral" />
            <Stat label="本周登录" value="96" unit="人" delta="覆盖 75%" deltaTone="neutral" icon={ShieldCheck} tone="green" />
            <Stat label="待处理" value="3" foot="锁定账号需复核" icon={MessageSquare} tone="amber" deltaTone="neutral" />
          </div>
          <Panel title="二级标签替代侧栏" desc={`后台 ${ADMIN_NAV.reduce((n, g) => n + g.items.length, 0)} 个入口平铺在标签条，超出部分收入「更多」`}>
            <p className="text-[13px] leading-6 text-slate-500">
              公告和改密提醒不再占主区高度，收进右上角铃铛。内容区在所有页面保持同样宽度。
            </p>
          </Panel>
        </Body>
      </main>
    </div>
  );
}
