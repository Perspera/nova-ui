"use client";

import * as React from "react";
import {
  Building2,
  ChevronDown,
  Download,
  Info,
  KeyRound,
  LogOut,
  MoreHorizontal,
  Plus,
  Printer,
  Search,
  ShieldCheck,
  Upload,
  UserCog,
  UserMinus,
  UserPlus,
  Users,
  Warehouse,
  X,
  Database,
  Settings2,
  Columns3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body } from "@/components/mock/shell";
import {
  Avatar,
  Btn,
  Callout,
  Check,
  Chip,
  DataTable,
  Divider,
  Drawer,
  Field,
  FloatingBar,
  IconBtn,
  KeyValue,
  PageHeader,
  Pagination,
  Panel,
  Radio,
  SearchBox,
  SectionTitle,
  Segmented,
  Select,
  Tag,
  TextInput,
  Toggle,
  UnderlineTabs,
  type Column,
  type Tone,
} from "@/components/mock/kit";
import { USERS, type Role } from "@/components/mock/data";

type U = (typeof USERS)[number];

const ROLE_TONE: Record<Role, Tone> = {
  超级管理员: "violet",
  仓库管理员: "indigo",
  仓管员: "blue",
  现场工程师: "sky",
  只读: "neutral",
};

const STATUS_TONE: Record<U["status"], Tone> = { 启用: "green", 停用: "neutral", 锁定: "red" };

function ScopeChips({ scope }: { scope: string[] }) {
  return (
    <span className="flex items-center gap-1">
      <span className="inline-flex h-5 items-center gap-1 rounded-md bg-slate-100 px-1.5 text-[11px] text-slate-700">
        <Warehouse className="size-3 text-slate-400" />
        {scope[0]}
      </span>
      {scope.length > 1 && (
        <span className="inline-flex h-5 items-center rounded-md bg-white px-1.5 text-[11px] font-medium text-slate-500 ring-1 ring-inset ring-line-strong">
          +{scope.length - 1}
        </span>
      )}
    </span>
  );
}

function userCol(): Column<U> {
  return {
    key: "user",
    title: "账号",
    render: (u) => (
      <span className="flex items-center gap-2.5">
        <Avatar name={u.name} size={28} />
        <span className="leading-tight">
          <span className="block text-[13px] font-medium text-slate-900">{u.name}</span>
          <span className="block font-mono text-[11px] text-slate-400">{u.account}</span>
        </span>
      </span>
    ),
  };
}

const COLUMNS: Column<U>[] = [
  userCol(),
  { key: "role", title: "角色", render: (u) => <Tag tone={ROLE_TONE[u.role]}>{u.role}</Tag> },
  { key: "scope", title: "仓库范围", render: (u) => <ScopeChips scope={u.scope} /> },
  { key: "status", title: "状态", render: (u) => <Tag tone={STATUS_TONE[u.status]} dot>{u.status}</Tag> },
  { key: "last", title: "最近登录", render: (u) => <span className="tnum text-xs text-slate-500">{u.last}</span> },
  { key: "phone", title: "手机", render: (u) => <span className="tnum text-xs text-slate-500">{u.phone}</span> },
  {
    key: "op",
    title: "",
    align: "right",
    render: () => (
      <span className="flex items-center justify-end gap-1">
        <Btn size="sm" variant="ghost">编辑</Btn>
        <IconBtn icon={MoreHorizontal} className="size-7" />
      </span>
    ),
  },
];

/* ═════════════════════════ A · 表格 + 编辑抽屉 ═════════════════════════ */

export function A() {
  const [open, setOpen] = React.useState(true);
  return (
    <AppShell
      admin="users"
      overlay={
        open && (
          <Drawer
            title="编辑账号 · 林晓婷"
            desc="linxt · 创建于 2025-03-12 · 最近登录 今天 08:47"
            width={440}
            onClose={() => setOpen(false)}
            footer={
              <>
                <span className="mr-auto text-xs text-slate-400">2 项未保存</span>
                <Btn variant="ghost" onClick={() => setOpen(false)}>取消</Btn>
                <Btn variant="primary">保存修改</Btn>
              </>
            }
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <Field label="姓名" required>
                  <TextInput value="林晓婷" />
                </Field>
                <Field label="手机">
                  <TextInput value="139 8812 0418" />
                </Field>
              </div>

              <div>
                <SectionTitle>角色</SectionTitle>
                <div className="mt-2.5 space-y-2">
                  {[
                    ["仓库管理员", "管理所属仓的账号、上传与打印配置", true],
                    ["仓管员", "查询、打印、上传本仓数据", false],
                    ["现场工程师", "查询与打印，不可上传", false],
                  ].map(([r, d, on]) => (
                    <div
                      key={r as string}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-3 transition-colors",
                        on ? "border-indigo-300 bg-indigo-50/50 ring-3 ring-indigo-50" : "border-line hover:bg-slate-50",
                      )}
                    >
                      <Radio on={on as boolean} />
                      <div className="-mt-0.5">
                        <div className="text-[13px] font-medium text-slate-900">{r as string}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{d as string}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle hint="首选仓决定查询范围">仓库范围</SectionTitle>
                <div className="mt-2.5 space-y-3">
                  <Field label="首选仓">
                    <Select value="广州中心仓 · GZ01" icon={Warehouse} className="w-full" />
                  </Field>
                  <Field label="成员仓">
                    <div className="flex flex-wrap gap-1.5 rounded-lg border border-line-strong bg-white p-1.5">
                      {["佛山仓", "东莞仓"].map((w) => (
                        <span key={w} className="inline-flex h-6 items-center gap-1 rounded-md bg-slate-100 pr-1 pl-2 text-xs text-slate-700">
                          {w}
                          <X className="size-3 text-slate-400" />
                        </span>
                      ))}
                      <button type="button" className="inline-flex h-6 items-center gap-1 rounded-md px-2 text-xs text-blue-600 hover:bg-blue-50">
                        <Plus className="size-3" />
                        添加
                      </button>
                    </div>
                  </Field>
                  <Callout tone="amber" icon={Info}>
                    成员仓仅作组织记录，<b>不进入查询范围</b>；查询始终只命中首选仓。
                  </Callout>
                </div>
              </div>

              <div>
                <SectionTitle>安全</SectionTitle>
                <div className="mt-2.5 divide-y divide-line rounded-xl border border-line">
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div>
                      <div className="text-[13px] font-medium text-slate-800">账号启用</div>
                      <div className="text-xs text-slate-400">停用后立即下线所有会话</div>
                    </div>
                    <Toggle on />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div>
                      <div className="text-[13px] font-medium text-slate-800">重置密码</div>
                      <div className="text-xs text-slate-400">生成一次性初始密码，首次登录强制修改</div>
                    </div>
                    <Btn size="sm" icon={KeyRound}>重置</Btn>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div>
                      <div className="text-[13px] font-medium text-slate-800">在线会话 2 个</div>
                      <div className="text-xs text-slate-400">Chrome · 10.21.4.31 / 企业微信</div>
                    </div>
                    <Btn size="sm" icon={LogOut}>全部下线</Btn>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        )
      }
    >
      <Body wide>
        <PageHeader
          crumbs={["管理后台", "组织与账号"]}
          title="账号管理"
          desc="共 128 个账号 · 启用 117 · 停用 8 · 锁定 3"
          actions={
            <>
              <Btn icon={Upload}>批量导入</Btn>
              <Btn variant="primary" icon={UserPlus}>新建账号</Btn>
            </>
          }
        />
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
            <SearchBox placeholder="姓名 / 账号 / 手机号" className="w-full sm:w-64" />
            <Select label="角色" value="全部" className="w-32" />
            <Select label="仓库" value="全部仓" className="w-36" />
            <Select label="状态" value="全部" className="w-28" />
            <div className="ml-auto flex items-center gap-1">
              <IconBtn icon={Columns3} />
              <Btn size="sm" icon={Download}>导出</Btn>
            </div>
          </div>
          <DataTable columns={COLUMNS} rows={USERS} activeIndex={1} onRowClick={() => setOpen(true)} />
          <div className="border-t border-line px-4 py-2.5">
            <Pagination total={128} pages={15} />
          </div>
        </div>
      </Body>
    </AppShell>
  );
}

/* ═════════════════════════ B · 仓库树 · 列表 · 详情 ═════════════════════════ */

const TREE = [
  { region: "华南", items: [["广州中心仓", 32], ["深圳仓", 21], ["佛山仓", 15], ["东莞仓", 12]] },
  { region: "华东", items: [["上海仓", 18], ["杭州仓", 11]] },
  { region: "西南 / 华中", items: [["成都仓", 9], ["武汉仓", 10]] },
] as const;

export function B() {
  const [sel, setSel] = React.useState(1);
  const u = USERS[sel];
  return (
    <AppShell admin="users" fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="scrollbar-thin shrink-0 border-line bg-white max-lg:border-b lg:w-[220px] lg:overflow-y-auto lg:border-r">
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[13px] font-semibold text-slate-900">组织</span>
              <IconBtn icon={Plus} className="size-7" />
            </div>
            <button type="button" className="flex h-8 w-full items-center gap-2 rounded-lg px-2 text-[13px] text-slate-700 hover:bg-slate-50">
              <Building2 className="size-4 text-slate-400" />
              <span className="flex-1 text-left">全部仓</span>
              <span className="tnum text-[11px] text-slate-400">128</span>
            </button>
            {TREE.map((g) => (
              <div key={g.region} className="mt-1">
                <div className="flex h-7 items-center gap-1 px-2 text-xs font-medium text-slate-500">
                  <ChevronDown className="size-3.5" />
                  {g.region}
                </div>
                {g.items.map(([n, c]) => {
                  const on = n === "广州中心仓";
                  return (
                    <button
                      key={n}
                      type="button"
                      className={cn(
                        "flex h-8 w-full items-center gap-2 rounded-lg pr-2 pl-6 text-[13px]",
                        on ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-50",
                      )}
                    >
                      <Warehouse className={cn("size-3.5", on ? "text-indigo-500" : "text-slate-400")} />
                      <span className="flex-1 text-left">{n}</span>
                      <span className={cn("tnum text-[11px]", on ? "text-indigo-500" : "text-slate-400")}>{c}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        <section className="flex shrink-0 flex-col border-line bg-white max-lg:border-b lg:w-[340px] lg:border-r">
          <div className="space-y-2.5 border-b border-line p-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <div className="text-[13px] font-semibold text-slate-900">广州中心仓</div>
                <div className="text-[11px] text-slate-400">32 个账号 · 首选仓成员</div>
              </div>
              <Btn size="sm" variant="primary" icon={UserPlus}>新建</Btn>
            </div>
            <SearchBox placeholder="搜索姓名或账号" className="w-full" />
          </div>
          <ul className="scrollbar-thin divide-y divide-line/70 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            {USERS.map((x, i) => {
              const on = i === sel;
              return (
                <li key={x.account}>
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    className={cn("relative flex w-full items-center gap-3 px-4 py-2.5 text-left", on ? "bg-indigo-50/70" : "hover:bg-slate-50")}
                  >
                    {on && <span className="absolute inset-y-0 left-0 w-[3px] bg-indigo-600" />}
                    <Avatar name={x.name} size={32} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[13px] font-medium text-slate-900">{x.name}</span>
                        {x.status !== "启用" && <Tag tone={STATUS_TONE[x.status]}>{x.status}</Tag>}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {x.role} · <span className="font-mono">{x.account}</span>
                      </span>
                    </span>
                    <span className="tnum shrink-0 text-[11px] text-slate-400">{x.last.replace("今天 ", "")}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="scrollbar-thin min-w-0 flex-1 lg:overflow-y-auto">
          <div className="space-y-5 p-6">
            <div className="flex flex-wrap items-start gap-4">
              <Avatar name={u.name} size={56} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[20px] font-semibold text-slate-900">{u.name}</h2>
                  <Tag tone={ROLE_TONE[u.role]}>{u.role}</Tag>
                  <Tag tone={STATUS_TONE[u.status]} dot>{u.status}</Tag>
                </div>
                <p className="mt-1 text-[13px] text-slate-500">
                  <span className="font-mono">{u.account}</span> · {u.phone} · 最近登录 {u.last}
                </p>
              </div>
              <div className="flex gap-2">
                <Btn icon={KeyRound}>重置密码</Btn>
                <Btn variant="primary" icon={UserCog}>编辑</Btn>
              </div>
            </div>
            <UnderlineTabs
              value="perm"
              options={[
                { value: "overview", label: "概览" },
                { value: "perm", label: "权限与范围" },
                { value: "login", label: "登录记录", count: 24 },
              ]}
            />
            <div className="grid gap-4 xl:grid-cols-2">
              <Panel title="仓库范围" icon={Warehouse}>
                <div className="space-y-2">
                  {u.scope.map((s, i) => (
                    <div key={s} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-inset ring-line">
                      <span className="flex items-center gap-2 text-[13px] font-medium text-slate-800">
                        <Warehouse className="size-4 text-slate-400" />
                        {s}
                      </span>
                      {i === 0 ? <Tag tone="indigo">首选 · 参与查询</Tag> : <Tag>组织记录</Tag>}
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel title="功能权限" icon={ShieldCheck}>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["查询", Search, true],
                    ["打印", Printer, true],
                    ["上传数据", Upload, true],
                    ["账号管理", Users, true],
                    ["数据版本回退", Database, false],
                    ["安全策略", Settings2, false],
                  ].map(([l, I, on]) => {
                    const Ico = I as typeof Search;
                    return (
                      <div
                        key={l as string}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] ring-1 ring-inset",
                          on ? "bg-emerald-50/50 text-slate-800 ring-emerald-100" : "bg-slate-50 text-slate-400 ring-line",
                        )}
                      >
                        <Ico className={cn("size-4", on ? "text-emerald-600" : "text-slate-300")} />
                        {l as string}
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </div>
            <Panel title="最近登录" flush icon={LogOut}>
              <DataTable
                dense
                zebra={false}
                stickyHeader={false}
                columns={[
                  { key: "t", title: "时间", render: (r: string[]) => <span className="tnum text-xs text-slate-600">{r[0]}</span> },
                  { key: "c", title: "终端", render: (r) => r[1] },
                  { key: "ip", title: "IP", render: (r) => <span className="font-mono text-xs text-slate-500">{r[2]}</span> },
                  { key: "s", title: "结果", render: (r) => <Tag tone={r[3] === "成功" ? "green" : "red"} dot>{r[3]}</Tag> },
                ]}
                rows={[
                  ["今天 08:47", "Chrome 130 · Windows", "10.21.4.31", "成功"],
                  ["昨天 18:02", "企业微信 · iOS", "10.21.9.12", "成功"],
                  ["昨天 08:31", "Chrome 130 · Windows", "10.21.4.31", "成功"],
                  ["10-25 08:29", "Chrome 130 · Windows", "10.21.4.31", "密码错误"],
                ]}
              />
            </Panel>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

/* ═════════════════════════ C · 筛选侧栏 + 批量栏 ═════════════════════════ */

export function C() {
  const [selected, setSelected] = React.useState<number[]>([2, 4, 8]);
  const toggle = (i: number) => setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  return (
    <AppShell
      admin="users"
      overlay={
        selected.length > 0 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-4">
            <FloatingBar className="pointer-events-auto animate-in slide-in-from-bottom-4 fade-in">
              <span className="flex items-center gap-2 pr-2 pl-2">
                <span className="tnum grid size-5 place-items-center rounded-md bg-blue-500 text-[11px] font-semibold">{selected.length}</span>
                已选账号
              </span>
              <span className="h-5 w-px bg-white/15" />
              {[
                [KeyRound, "重置密码"],
                [UserCog, "调整角色"],
                [Warehouse, "调整首选仓"],
                [UserMinus, "停用"],
              ].map(([I, l]) => {
                const Ico = I as typeof KeyRound;
                return (
                  <button key={l as string} type="button" className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px] text-white/90 hover:bg-white/10">
                    <Ico className="size-4 text-white/60" />
                    <span className="hidden sm:inline">{l as string}</span>
                  </button>
                );
              })}
              <span className="h-5 w-px bg-white/15" />
              <button type="button" onClick={() => setSelected([])} className="grid size-8 place-items-center rounded-lg text-white/60 hover:bg-white/10">
                <X className="size-4" />
              </button>
            </FloatingBar>
          </div>
        )
      }
    >
      <Body wide className="pb-24">
        <PageHeader
          crumbs={["管理后台", "组织与账号"]}
          title="账号管理"
          desc="多选后底部出现批量操作栏"
          actions={
            <>
              <Btn icon={Upload}>批量导入</Btn>
              <Btn variant="primary" icon={UserPlus}>新建账号</Btn>
            </>
          }
        />
        <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit space-y-5 rounded-xl border border-line bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-slate-900">筛选</span>
              <button type="button" className="text-xs text-slate-400 hover:text-slate-600">重置</button>
            </div>
            <div>
              <div className="mb-2 text-xs font-medium text-slate-500">角色</div>
              <div className="space-y-1">
                {([
                  ["超级管理员", 2, false],
                  ["仓库管理员", 11, false],
                  ["仓管员", 46, true],
                  ["现场工程师", 58, true],
                  ["只读", 11, false],
                ] as const).map(([r, n, on]) => (
                  <label key={r} className="flex items-center gap-2.5 rounded-md px-1 py-1 text-[13px] text-slate-700 hover:bg-slate-50">
                    <Check on={on} />
                    <span className="flex-1">{r}</span>
                    <span className="tnum text-[11px] text-slate-400">{n}</span>
                  </label>
                ))}
              </div>
            </div>
            <Divider />
            <div>
              <div className="mb-2 text-xs font-medium text-slate-500">首选仓</div>
              <div className="flex flex-wrap gap-1.5">
                {["广州中心仓", "深圳仓", "佛山仓", "东莞仓", "上海仓", "杭州仓", "成都仓", "武汉仓"].map((w, i) => (
                  <Chip key={w} active={i < 3} className="h-6 px-2 text-[11px]">
                    {w}
                  </Chip>
                ))}
              </div>
            </div>
            <Divider />
            <div>
              <div className="mb-2 text-xs font-medium text-slate-500">状态</div>
              <Segmented
                full
                size="sm"
                value="all"
                options={[
                  { value: "all", label: "全部" },
                  { value: "on", label: "启用" },
                  { value: "lock", label: "锁定" },
                  { value: "off", label: "停用" },
                ]}
              />
            </div>
            <div>
              <div className="mb-2 text-xs font-medium text-slate-500">最近登录</div>
              <Select value="30 天内未登录" className="w-full" />
            </div>
          </aside>
          <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-white shadow-card">
            <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
              <SearchBox placeholder="姓名 / 账号 / 手机号" className="w-full sm:w-72" />
              <div className="flex flex-wrap items-center gap-1.5">
                <Chip active onRemove>仓管员</Chip>
                <Chip active onRemove>现场工程师</Chip>
                <Chip active onRemove>华南 3 仓</Chip>
              </div>
              <span className="ml-auto text-xs text-slate-400">
                匹配 <b className="tnum text-slate-700">87</b> 个
              </span>
            </div>
            <DataTable
              columns={COLUMNS.slice(0, 6)}
              rows={USERS}
              selectable
              selected={selected}
              onRowClick={toggle}
            />
            <div className="border-t border-line px-4 py-2.5">
              <Pagination total={87} pages={10} />
            </div>
          </div>
        </div>
      </Body>
    </AppShell>
  );
}

