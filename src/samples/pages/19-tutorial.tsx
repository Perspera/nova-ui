"use client";

import { Check, Clock, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body } from "@/components/mock/shell";
import { Chip, PageHeader, Progress, SearchBox, Tag } from "@/components/mock/kit";

const CHAPTERS = [
  ["开始", "角色与范围", true],
  ["查询", "批量查库存", true],
  ["查询", "缺码与替代件", false],
  ["打印", "打一张库位标签", false],
  ["数据", "上传并发布", false],
  ["管理", "账号与首选仓", false],
] as const;

export function A() {
  return (
    <AppShell nav={null} fill>
      <div className="flex h-full">
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-line bg-white md:flex">
          <div className="border-b border-line px-4 py-3">
            <div className="text-[13px] font-semibold text-slate-900">教程</div>
            <div className="mt-2"><Progress value={33} /></div>
            <div className="mt-1 text-[11px] text-slate-400">2 / 6 节完成</div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto p-2">
            {CHAPTERS.map(([g, t, done], i) => (
              <button key={t} type="button" className={cn("flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left", i === 2 && "bg-indigo-50")}>
                <span className={cn("mt-0.5 grid size-4 shrink-0 place-items-center rounded-full", done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400")}>
                  {done ? <Check className="size-3" /> : <span className="text-[10px]">{i + 1}</span>}
                </span>
                <span>
                  <span className="block text-[10px] text-slate-400">{g}</span>
                  <span className={cn("block text-[13px]", i === 2 ? "font-medium text-indigo-700" : "text-slate-700")}>{t}</span>
                </span>
              </button>
            ))}
          </nav>
        </aside>
        <article className="scrollbar-thin min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-8">
            <Tag tone="indigo">查询</Tag>
            <h1 className="mt-3 text-[26px] font-semibold tracking-tight text-slate-900">缺码与替代件</h1>
            <p className="mt-2 text-[14px] leading-7 text-slate-500">查不到的编码不要反复重试。结果里的「缺码」可以直接提交，有替代件的行会给出可替换编码。</p>
            <div className="mt-6 space-y-4 text-[14px] leading-7 text-slate-700">
              <p><b>1.</b> 在左侧贴入编码，查询后看摘要芯片里的「缺码」数量。</p>
              <p><b>2.</b> 点缺码行的「提交」，填写机型。管理员在数据版本里收录后，下次查询就能命中。</p>
              <p><b>3.</b> 若行上出现蓝色替代件编码，点它可直接改查新编码。停产说明写在详情里。</p>
            </div>
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-[13px] text-blue-900">
              现场常用列已经包含替代件和 BO，不必切到「全部列」。
            </div>
          </div>
        </article>
        <aside className="hidden w-[180px] shrink-0 border-l border-line bg-white p-4 xl:block">
          <div className="text-[11px] font-semibold tracking-wide text-slate-400">本页</div>
          <div className="mt-2 space-y-1.5 text-[13px]">
            <div className="border-l-2 border-indigo-600 pl-2 font-medium text-slate-900">识别缺码</div>
            <div className="border-l-2 border-transparent pl-2 text-slate-500">提交收录</div>
            <div className="border-l-2 border-transparent pl-2 text-slate-500">使用替代件</div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

export function B() {
  const paths = [
    ["现场工程师", "查询 → 打印", "4 节 · 约 15 分钟"],
    ["仓管员", "查询 → 图片 → 上传", "6 节 · 约 25 分钟"],
    ["管理员", "账号 → 版本 → 安全", "5 节 · 约 20 分钟"],
  ];
  return (
    <AppShell nav={null}>
      <Body>
        <PageHeader title="按角色开始" desc="选一条路线。查具体问题时再用左侧目录。" />
        <div className="grid gap-3 md:grid-cols-3">
          {paths.map(([r, p, t], i) => (
            <button key={r} type="button" className={cn("rounded-2xl border bg-white p-4 text-left shadow-card", i === 0 ? "border-indigo-300 ring-3 ring-indigo-50" : "border-line")}>
              <div className="text-[11px] text-slate-400">路线 {i + 1}</div>
              <div className="mt-1 text-[15px] font-semibold text-slate-900">{r}</div>
              <div className="mt-2 text-[13px] text-slate-600">{p}</div>
              <div className="mt-3 text-xs text-slate-400">{t}</div>
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-white p-4 shadow-card">
          <div className="text-[13px] font-semibold text-slate-900">现场工程师 · 第 2 节</div>
          <div className="mt-3 flex items-center gap-2">
            {["认识范围", "批量查询", "打标签", "提交缺码"].map((s, i) => (
              <div key={s} className="flex min-w-0 flex-1 items-center gap-2">
                <span className={cn("grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold", i < 1 ? "bg-emerald-500 text-white" : i === 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>{i + 1}</span>
                <span className={cn("truncate text-[12px]", i === 1 ? "font-medium text-slate-900" : "text-slate-500")}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </Body>
    </AppShell>
  );
}

const COURSES = [
  ["批量查询", "查询", "6 分钟", true],
  ["库位标签", "打印", "8 分钟", true],
  ["缺码提交", "查询", "4 分钟", false],
  ["上传发布", "数据", "10 分钟", false],
  ["账号与首选仓", "管理", "7 分钟", false],
  ["安全策略", "管理", "5 分钟", false],
] as const;

export function C() {
  return (
    <AppShell nav={null}>
      <Body>
        <PageHeader title="教程" desc="全部课程。完成状态记在这台浏览器。" actions={<SearchBox placeholder="搜索课程" className="w-52" />} />
        <div className="flex gap-1.5"><Chip active>全部</Chip><Chip>查询</Chip><Chip>打印</Chip><Chip>数据</Chip><Chip>管理</Chip></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(([t, g, time, done]) => (
            <article key={t} className="rounded-xl border border-line bg-white p-4 shadow-card">
              <div className="flex items-center justify-between">
                <Tag tone="indigo">{g}</Tag>
                {done ? <Tag tone="green" icon={Check}>已完成</Tag> : <Play className="size-4 text-slate-300" />}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-slate-900">{t}</h3>
              <div className="mt-2 flex items-center gap-1 text-xs text-slate-400"><Clock className="size-3.5" />{time}</div>
            </article>
          ))}
        </div>
      </Body>
    </AppShell>
  );
}
