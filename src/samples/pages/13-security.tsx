"use client";

import { AppShell } from "@/components/mock/shell";
import { Btn, Drawer, PageHeader, StickyBar, Tag, TextInput, Toggle } from "@/components/mock/kit";
import { cn } from "@/lib/utils";

const SECTIONS = ["密码", "会话", "登录限制", "水印"];

function Effective({ children }: { children: React.ReactNode }) {
  return <Tag tone="green">当前生效 {children}</Tag>;
}

function PolicyRows() {
  const rows: [string, string, React.ReactNode][] = [
    ["最小长度", "8 位", <TextInput key="a" value="10" className="w-24" />],
    ["必须含数字", "开", <Toggle key="b" on />],
    ["90 天过期", "关", <Toggle key="c" />],
    ["禁止最近 3 次", "开", <Toggle key="d" on />],
  ];
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-white">
      {rows.map(([k, cur, edit]) => (
        <div key={k} className="flex flex-wrap items-center gap-3 px-4 py-3">
          <div className="min-w-40 flex-1 text-[13px] font-medium text-slate-800">{k}</div>
          <Effective>{cur}</Effective>
          {edit}
        </div>
      ))}
    </div>
  );
}

export function A() {
  return (
    <AppShell admin="security" fill>
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-[180px] shrink-0 border-r border-line bg-white p-3 lg:block">
            {SECTIONS.map((s, i) => (
              <button key={s} type="button" className={cn("flex h-9 w-full items-center rounded-lg px-3 text-[13px]", i === 0 ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600")}>
                {s}
                {i === 0 && <span className="ml-auto size-1.5 rounded-full bg-amber-500" />}
              </button>
            ))}
          </aside>
          <div className="scrollbar-thin min-w-0 flex-1 space-y-6 overflow-y-auto p-5">
            <div>
              <h1 className="text-[20px] font-semibold text-slate-900">安全策略</h1>
              <p className="mt-1 text-[13px] text-slate-500">绿色标签是线上正在生效的值，右侧是未发布的编辑。</p>
            </div>
            <section className="space-y-3">
              <h2 className="text-[14px] font-semibold text-slate-900">密码</h2>
              <PolicyRows />
            </section>
            <section className="space-y-3">
              <h2 className="text-[14px] font-semibold text-slate-900">会话</h2>
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
                <span className="flex-1 text-[13px] font-medium text-slate-800">空闲超时</span>
                <Effective>30 分钟</Effective>
                <TextInput value="20" suffix={<span className="text-[11px] text-slate-400">分钟</span>} className="w-28" />
              </div>
            </section>
          </div>
        </div>
        <StickyBar>
          <span className="text-[13px] text-slate-600">2 项与当前生效值不同</span>
          <Btn className="ml-auto">放弃修改</Btn>
          <Btn variant="primary">发布策略</Btn>
        </StickyBar>
      </div>
    </AppShell>
  );
}

const CARDS = [
  ["密码最小长度", "8 位", true],
  ["必须含数字", "开启", true],
  ["密码 90 天过期", "关闭", false],
  ["空闲超时", "30 分钟", true],
  ["失败 5 次锁定", "开启", true],
  ["页面水印", "开启", true],
] as const;

export function B() {
  return (
    <AppShell
      admin="security"
      overlay={
        <Drawer title="在线会话" desc="12 个会话 · 可强制下线" width={380} footer={<Btn variant="danger">下线所选</Btn>}>
          <div className="space-y-2">
            {[
              ["陈立航", "Chrome · 10.21.4.18", "刚刚"],
              ["林晓婷", "Chrome · 10.21.4.31", "8 分钟前"],
              ["周嘉豪", "企业微信 · 10.21.7.12", "22 分钟前"],
            ].map(([n, d, t]) => (
              <div key={n} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-slate-900">{n}</div>
                  <div className="text-xs text-slate-400">{d}</div>
                </div>
                <span className="text-[11px] text-slate-400">{t}</span>
              </div>
            ))}
          </div>
        </Drawer>
      }
    >
      <div className="mx-auto w-full max-w-[1100px] space-y-4 p-4 sm:p-6 lg:pr-[420px]">
        <PageHeader title="安全策略" desc="每张卡是一条策略。会话从右侧抽屉管理。" actions={<Btn>在线会话 12</Btn>} />
        <div className="grid gap-3 sm:grid-cols-2">
          {CARDS.map(([t, v, on]) => (
            <div key={t} className="rounded-xl border border-line bg-white p-4 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-slate-800">{t}</span>
                <Toggle on={on} />
              </div>
              <div className="mt-3"><Tag tone="green">当前生效 {v}</Tag></div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell admin="security" fill>
      <div className="flex h-full flex-col lg:flex-row">
        <section className="scrollbar-thin min-w-0 flex-1 space-y-4 overflow-y-auto p-5">
          <PageHeader title="安全策略" desc="右侧会话常驻，方便处置时对照。" />
          <PolicyRows />
        </section>
        <aside className="w-full shrink-0 border-line bg-white lg:w-[320px] lg:border-l">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-[13px] font-semibold text-slate-900">在线会话</span>
            <Tag>12</Tag>
          </div>
          <ul className="divide-y divide-line">
            {[
              ["陈立航", "10.21.4.18", "管理后台"],
              ["林晓婷", "10.21.4.31", "查询"],
              ["周嘉豪", "10.21.7.12", "打印"],
              ["梁佩仪", "10.21.7.40", "上传"],
              ["罗文斌", "10.21.9.66", "查询"],
            ].map(([n, ip, page]) => (
              <li key={n} className="flex items-center gap-3 px-4 py-3">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium text-slate-800">{n}</span>
                  <span className="font-mono text-[11px] text-slate-400">{ip} · {page}</span>
                </span>
                <Btn size="sm" variant="ghost">下线</Btn>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </AppShell>
  );
}
