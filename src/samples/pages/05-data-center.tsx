"use client";

import { ArrowUpRight, Database, FileUp, GitBranch, Lock, ShieldCheck, TriangleAlert } from "lucide-react";
import { AppShell, Body } from "@/components/mock/shell";
import { Btn, PageHeader, Panel, Stat, Tag, UnderlineTabs } from "@/components/mock/kit";

function Health() {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      <Stat label="在用版本" value="10-27" unit=".01" icon={GitBranch} foot="今天 09:12 发布" deltaTone="neutral" />
      <Stat label="覆盖仓库" value="8" unit="/ 8" icon={Database} tone="green" delta="全部已同步" deltaTone="neutral" />
      <Stat label="质量分" value="98.6" icon={ShieldCheck} tone="indigo" delta="+0.7" foot="较上一版" />
      <Stat label="待处理警告" value="3" icon={TriangleAlert} tone="amber" delta="深圳仓" deltaTone="neutral" />
    </div>
  );
}

export function A() {
  return (
    <AppShell nav="data">
      <Body>
        <PageHeader title="数据中心" desc="上传面向全部有权限的人；版本与质量仅管理员可见。" meta={<Tag tone="indigo">广州中心仓</Tag>} />
        <UnderlineTabs
          value="upload"
          options={[
            { value: "upload", label: "上传", icon: FileUp },
            { value: "versions", label: "版本与质量", icon: GitBranch },
            { value: "locked", label: "质量报告", icon: Lock, locked: true },
          ]}
        />
        <Health />
        <Panel title="上传工作台" desc="从这里进入投放、体检和发布" actions={<Btn variant="primary" icon={FileUp}>去上传</Btn>}>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["最近上传", "深圳仓_1027.xlsx", "今天 07:58 · 警告 3 行"],
              ["当前指针", "v2026.10.27-01", "128,402 行 · 全量覆盖"],
              ["你的权限", "可上传 · 可查看版本", "回退需要超级管理员"],
            ].map(([k, v, d]) => (
              <div key={k} className="rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-inset ring-line">
                <div className="text-xs text-slate-400">{k}</div>
                <div className="mt-0.5 text-[13px] font-medium text-slate-900">{v}</div>
                <div className="text-xs text-slate-500">{d}</div>
              </div>
            ))}
          </div>
        </Panel>
      </Body>
    </AppShell>
  );
}

const NAV = [
  ["上传", FileUp, true],
  ["上传记录", Database, false],
  ["版本", GitBranch, false],
  ["质量报告", ShieldCheck, false],
] as const;

export function B() {
  return (
    <AppShell nav="data" fill>
      <div className="flex h-full flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-line bg-white p-3 lg:w-[200px] lg:border-r">
          <div className="px-2 py-1.5 text-[11px] font-medium text-slate-400">数据</div>
          {NAV.map(([l, I, on]) => (
            <button key={l} type="button" className={`flex h-8 w-full items-center gap-2 rounded-lg px-2 text-[13px] ${on ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600"}`}>
              <I className={`size-4 ${on ? "text-indigo-600" : "text-slate-400"}`} />
              {l}
            </button>
          ))}
        </aside>
        <div className="scrollbar-thin min-w-0 flex-1 overflow-y-auto">
          <Body>
            <PageHeader title="上传" desc="数据域内的二级导航，子页再多也不挤进顶栏。" actions={<Btn variant="primary" icon={FileUp}>新建上传</Btn>} />
            <Health />
          </Body>
        </div>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell nav="data">
      <Body>
        <PageHeader title="数据中心" desc="先看状态，再进入具体工作。" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [FileUp, "上传新数据", "选择目标仓、投放表格、体检后发布。适合日常增量。", "开始上传"],
            [GitBranch, "版本与质量", "查看指针、对比差异、在确认后回退。仅管理员。", "查看版本"],
          ].map(([I, t, d, a]) => {
            const Icon = I as typeof FileUp;
            return (
              <article key={t as string} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 text-[16px] font-semibold text-slate-900">{t as string}</h2>
                <p className="mt-1 text-[13px] leading-6 text-slate-500">{d as string}</p>
                <Btn className="mt-4" iconRight={ArrowUpRight}>
                  {a as string}
                </Btn>
              </article>
            );
          })}
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <div className="text-[13px] font-semibold text-slate-900">数据健康</div>
            <Health />
          </div>
          <Panel title="最近活动">
            <ol className="space-y-3 text-[13px]">
              {[
                ["09:12", "陈立航发布 v2026.10.27-01"],
                ["07:58", "梁佩仪上传深圳仓，3 行警告"],
                ["昨天", "林晓婷发布佛山仓增量"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="tnum w-12 shrink-0 text-xs text-slate-400">{t}</span>
                  <span className="text-slate-700">{d}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </Body>
    </AppShell>
  );
}
