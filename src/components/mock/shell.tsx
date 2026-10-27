"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  ChevronDown,
  Command,
  Database,
  Images,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquare,
  Palette,
  Printer,
  ScrollText,
  Search,
  Settings2,
  ShieldCheck,
  Tag as TagIcon,
  Users,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import { Avatar, IconBtn, Kbd } from "./kit";

export type NavKey = "query" | "print" | "image" | "data" | "messages" | "tutorial" | "admin" | null;

export type AdminKey =
  | "home"
  | "users"
  | "security"
  | "audit"
  | "messages"
  | "notices"
  | "versions"
  | "ops"
  | "branding"
  | "label"
  | "maintenance";

export const TOP_NAV: { key: Exclude<NavKey, null>; label: string; icon: LucideIcon }[] = [
  { key: "query", label: "查询", icon: Search },
  { key: "print", label: "打印", icon: Printer },
  { key: "image", label: "图片", icon: Images },
  { key: "data", label: "数据", icon: Database },
];

export const ADMIN_NAV: { group: string; items: { key: AdminKey; label: string; icon: LucideIcon; badge?: number }[] }[] = [
  { group: "概览", items: [{ key: "home", label: "后台首页", icon: LayoutDashboard }] },
  { group: "组织与账号", items: [{ key: "users", label: "账号管理", icon: Users }] },
  {
    group: "安全中心",
    items: [
      { key: "security", label: "安全策略", icon: ShieldCheck },
      { key: "audit", label: "操作审计", icon: ScrollText },
    ],
  },
  {
    group: "信息发布",
    items: [
      { key: "messages", label: "消息管理", icon: MessageSquare, badge: 2 },
      { key: "notices", label: "系统公告", icon: Megaphone },
    ],
  },
  {
    group: "数据与看板",
    items: [
      { key: "versions", label: "数据版本", icon: Database },
      { key: "ops", label: "运营看板", icon: BarChart3 },
    ],
  },
  {
    group: "外观与资源",
    items: [
      { key: "branding", label: "品牌配置", icon: Palette },
      { key: "label", label: "标签编辑", icon: TagIcon },
    ],
  },
  { group: "运维", items: [{ key: "maintenance", label: "运维状态", icon: Activity, badge: 1 }] },
];

export function Logo({ compact, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-[9px] bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_2px_6px_-1px_rgb(37_99_235/0.45),inset_0_1px_0_rgb(255_255_255/0.2)]">
        <Boxes className="size-[18px]" strokeWidth={2} />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[14px] font-semibold tracking-tight text-slate-900">备件查询平台</span>
          <span className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">SPARE PARTS · WSS</span>
        </span>
      )}
    </div>
  );
}

export function ScopeChip({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-8 items-center gap-2 rounded-lg border border-line bg-slate-50/80 px-2.5 text-[13px] text-slate-700 hover:bg-slate-100",
        className,
      )}
    >
      <Warehouse className="size-4 text-slate-400" />
      <span className="font-medium">广州中心仓</span>
      <span className="rounded bg-white px-1 text-[10px] text-slate-400 ring-1 ring-line">首选</span>
      <ChevronDown className="size-3.5 text-slate-400" />
    </button>
  );
}

export function CommandTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-8 items-center gap-2 rounded-lg border border-line bg-white px-2.5 text-[13px] text-slate-400 shadow-card hover:border-line-strong",
        className,
      )}
    >
      <Search className="size-4" />
      <span className="flex-1 text-left">搜索页面或备件…</span>
      <span className="flex items-center gap-0.5">
        <Kbd>
          <Command className="size-2.5" />
        </Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}

export function AppHeader({
  active,
  showNav = true,
  bellBadge = 3,
  className,
  children,
}: {
  active?: NavKey;
  showNav?: boolean;
  bellBadge?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("relative z-20 flex h-[52px] shrink-0 items-center gap-3 border-b border-line bg-white/95 px-3 backdrop-blur sm:px-4", className)}>
      <IconBtn icon={Menu} className="md:hidden" />
      <Logo className="max-sm:[&>span:last-child]:hidden" />
      {showNav && (
        <nav className="ml-4 hidden items-center gap-0.5 md:flex">
          {TOP_NAV.map((n) => {
            const on = n.key === active;
            return (
              <button
                key={n.key}
                type="button"
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors",
                  on ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <n.icon className={cn("size-4", on ? "text-indigo-600" : "text-slate-400")} />
                {n.label}
              </button>
            );
          })}
        </nav>
      )}
      {children}
      <div className="ml-auto flex items-center gap-1.5">
        <ScopeChip className="hidden lg:flex" />
        <CommandTrigger className="hidden w-52 xl:flex" />
        <IconBtn icon={Search} className="xl:hidden" />
        <IconBtn icon={BookOpen} className="hidden sm:inline-grid" />
        <IconBtn icon={Bell} badge={bellBadge || undefined} />
        <button
          type="button"
          className={cn(
            "hidden h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium sm:flex",
            active === "admin" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100",
          )}
        >
          <Settings2 className="size-4" />
          管理
        </button>
        <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <button type="button" className="flex items-center gap-2 rounded-lg py-1 pr-1.5 pl-1 hover:bg-slate-100">
          <Avatar name="陈立航" size={26} tone={0} />
          <span className="hidden text-left leading-tight lg:block">
            <span className="block text-[12px] font-medium text-slate-800">陈立航</span>
            <span className="block text-[10px] text-slate-400">超级管理员</span>
          </span>
        </button>
      </div>
    </header>
  );
}

export function NoticeSlot({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-9 shrink-0 items-center gap-2.5 border-b border-amber-200/80 bg-gradient-to-r from-amber-50 to-amber-50/40 px-4 text-[12.5px] text-amber-900", className)}>
      <span className="grid size-5 place-items-center rounded-md bg-amber-100 text-amber-700">
        <Megaphone className="size-3" />
      </span>
      <span className="truncate">
        <b className="font-semibold">10/28 22:00–23:30 系统维护</b>
        <span className="text-amber-800/80"> · 期间查询与打印暂停，请提前导出当日作业清单</span>
      </span>
      <button type="button" className="ml-auto hidden shrink-0 items-center gap-1 rounded-md bg-white/70 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-amber-200 hover:bg-white sm:flex">
        另有 1 条提醒：初始密码未修改
        <ChevronDown className="size-3" />
      </button>
      <IconBtn icon={X} className="size-6 shrink-0 text-amber-700 hover:bg-amber-100" />
    </div>
  );
}

export function AdminRail({ active, className, compact }: { active?: AdminKey; className?: string; compact?: boolean }) {
  return (
    <aside className={cn("scrollbar-thin hidden w-[216px] shrink-0 flex-col overflow-y-auto border-r border-line bg-white lg:flex", compact && "w-[64px]", className)}>
      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-[11px] font-semibold tracking-wider text-slate-400">管理后台</span>
          <span className="rounded bg-slate-100 px-1.5 text-[10px] text-slate-500">v3.8</span>
        </div>
      </div>
      <nav className="flex-1 space-y-4 px-3 pb-4">
        {ADMIN_NAV.map((g) => (
          <div key={g.group}>
            <div className="px-2 pb-1 text-[11px] font-medium text-slate-400">{g.group}</div>
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const on = it.key === active;
                return (
                  <button
                    key={it.key}
                    type="button"
                    className={cn(
                      "relative flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-[13px] transition-colors",
                      on ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    {on && <span className="absolute top-1.5 bottom-1.5 -left-3 w-[3px] rounded-r bg-indigo-600" />}
                    <it.icon className={cn("size-4", on ? "text-indigo-600" : "text-slate-400")} />
                    <span className="flex-1 text-left">{it.label}</span>
                    {it.badge && <span className="tnum rounded-full bg-rose-50 px-1.5 text-[10px] font-semibold text-rose-600 ring-1 ring-rose-100">{it.badge}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] text-slate-500">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          服务正常 · 数据 10-27 09:12
        </div>
      </div>
    </aside>
  );
}

/**
 * Standard app frame: header → optional notice slot → (admin rail) + main.
 * `overlay` renders inside main but outside its scroll area (for drawers, floating bars).
 */
export function AppShell({
  nav,
  admin,
  notice,
  fill,
  children,
  overlay,
  contentClassName,
  header,
  subbar,
}: {
  nav?: NavKey;
  admin?: AdminKey;
  notice?: boolean;
  fill?: boolean;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  contentClassName?: string;
  header?: React.ReactNode;
  subbar?: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-canvas text-slate-800">
      {header ?? <AppHeader active={admin ? "admin" : nav} />}
      {notice && <NoticeSlot />}
      {subbar}
      <div className="flex min-h-0 flex-1">
        {admin && <AdminRail active={admin} />}
        <main className="relative flex min-w-0 flex-1 flex-col">
          <div
            className={cn(
              "min-h-0 flex-1",
              fill ? "flex flex-col overflow-hidden" : "scrollbar-thin overflow-y-auto",
              contentClassName,
            )}
          >
            {children}
          </div>
          {overlay}
        </main>
      </div>
    </div>
  );
}

/** Page body padding wrapper for scrollable pages. */
export function Body({ children, className, wide }: { children: React.ReactNode; className?: string; wide?: boolean }) {
  return <div className={cn("mx-auto w-full space-y-5 p-4 sm:p-6", wide ? "max-w-[1600px]" : "max-w-[1360px]", className)}>{children}</div>;
}
