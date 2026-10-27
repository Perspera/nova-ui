"use client";

import * as React from "react";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body } from "@/components/mock/shell";
import { Btn, Chip, PageHeader, Tag } from "@/components/mock/kit";
import { MESSAGES } from "@/components/mock/data";

const TONE = { 系统: "red", 数据: "blue", 通知: "indigo", 打印: "green" } as const;

export function A() {
  const [id, setId] = React.useState(1);
  const msg = MESSAGES.find((m) => m.id === id)!;
  return (
    <AppShell nav={null} fill>
      <div className="flex h-full flex-col overflow-y-auto md:flex-row md:overflow-hidden">
        <aside className="flex w-full shrink-0 flex-col border-line bg-white md:w-[360px] md:border-r">
          <div className="border-b border-line px-4 py-3">
            <h1 className="text-[16px] font-semibold text-slate-900">消息中心</h1>
            <p className="text-xs text-slate-400">打开即已读。带「待确认」的要再点一次。</p>
          </div>
          <ul className="scrollbar-thin min-h-0 flex-1 divide-y divide-line/70 overflow-y-auto">
            {MESSAGES.map((m) => (
              <li key={m.id}>
                <button type="button" onClick={() => setId(m.id)} className={cn("flex w-full gap-3 px-4 py-3 text-left", m.id === id ? "bg-indigo-50/70" : "hover:bg-slate-50")}>
                  <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", m.unread ? "bg-blue-600" : "bg-transparent")} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className={cn("truncate text-[13px]", m.unread ? "font-semibold text-slate-900" : "text-slate-700")}>{m.title}</span>
                    </span>
                    <span className="mt-1 flex items-center gap-1.5">
                      <Tag tone={TONE[m.tag as keyof typeof TONE]}>{m.tag}</Tag>
                      {m.confirm && <Tag tone="amber" dot>待确认</Tag>}
                      {!m.unread && !m.confirm && <Tag>已读</Tag>}
                      <span className="ml-auto text-[11px] text-slate-400">{m.time}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="scrollbar-thin min-w-0 flex-1 p-6 md:overflow-y-auto">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone={TONE[msg.tag as keyof typeof TONE]}>{msg.tag}</Tag>
              {msg.confirm ? <Tag tone="amber" dot>待确认</Tag> : <Tag dot tone="green">已读</Tag>}
              <span className="text-xs text-slate-400">{msg.from} · {msg.time}</span>
            </div>
            <h2 className="mt-3 text-[22px] font-semibold tracking-tight text-slate-900">{msg.title}</h2>
            <p className="mt-4 text-[14px] leading-7 text-slate-600">{msg.excerpt}</p>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">
              广州中心仓、深圳仓、佛山仓请在今天下班前完成导出。维护结束后版本号不变，无需重新登录。如打印队列里有失败任务，网关恢复后会自动重试。
            </p>
            {msg.confirm && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <span className="text-[13px] text-amber-900">这条需要你确认已知晓</span>
                <Btn variant="primary" icon={CheckCheck}>确认已知晓</Btn>
              </div>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell nav={null} fill>
      <div className="flex h-full">
        <aside className="hidden w-[180px] shrink-0 border-r border-line bg-white p-3 md:block">
          {[
            ["全部", 6, true],
            ["待确认", 2, false],
            ["系统", 2, false],
            ["数据", 1, false],
            ["打印", 2, false],
          ].map(([l, n, on]) => (
            <button key={l as string} type="button" className={cn("flex h-8 w-full items-center rounded-lg px-2 text-[13px]", on ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600")}>
              <span className="flex-1 text-left">{l as string}</span>
              <span className="tnum text-[11px] text-slate-400">{n as number}</span>
            </button>
          ))}
        </aside>
        <section className="w-[300px] shrink-0 border-r border-line bg-white">
          {MESSAGES.map((m, i) => (
            <button key={m.id} type="button" className={cn("block w-full border-b border-line px-4 py-3 text-left", i === 0 && "bg-indigo-50/60")}>
              <div className="truncate text-[13px] font-medium text-slate-900">{m.title}</div>
              <div className="mt-1 text-[11px] text-slate-400">{m.time}{m.confirm ? " · 待确认" : ""}</div>
            </button>
          ))}
        </section>
        <section className="hidden min-w-0 flex-1 p-6 lg:block">
          <h2 className="text-[20px] font-semibold text-slate-900">{MESSAGES[0].title}</h2>
          <p className="mt-3 text-[14px] leading-7 text-slate-600">{MESSAGES[0].excerpt}</p>
          <Btn variant="primary" icon={CheckCheck} className="mt-6">确认已知晓</Btn>
        </section>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell nav={null}>
      <Body className="max-w-2xl">
        <PageHeader title="消息" desc="单列阅读，适合手机。" />
        <div className="flex gap-1.5">
          <Chip active>全部</Chip>
          <Chip>待确认 2</Chip>
          <Chip>未读 2</Chip>
        </div>
        <div className="space-y-3">
          {MESSAGES.map((m) => (
            <article key={m.id} className="rounded-xl border border-line bg-white p-4 shadow-card">
              <div className="flex items-center gap-1.5">
                {m.unread && <span className="size-1.5 rounded-full bg-blue-600" />}
                <Tag tone={TONE[m.tag as keyof typeof TONE]}>{m.tag}</Tag>
                {m.confirm && <Tag tone="amber" dot>待确认</Tag>}
                <span className="ml-auto text-[11px] text-slate-400">{m.time}</span>
              </div>
              <h3 className="mt-2 text-[14px] font-semibold text-slate-900">{m.title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-slate-500">{m.excerpt}</p>
              {m.confirm && <Btn size="sm" variant="primary" className="mt-3" icon={CheckCheck}>确认已知晓</Btn>}
            </article>
          ))}
        </div>
      </Body>
    </AppShell>
  );
}
