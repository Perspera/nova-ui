"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Body } from "@/components/mock/shell";
import { Btn, Chip, DataTable, Drawer, Field, PageHeader, Progress, Segmented, Tag, TextArea, TextInput, Toggle } from "@/components/mock/kit";

const ITEMS = [
  { title: "10 月 28 日系统维护", status: "草稿", read: "—", confirm: "需确认", on: true },
  { title: "主控板 V4.1 停产通知", status: "已发布", read: "86%", confirm: "待确认 14", on: false },
  { title: "深圳仓库存已发布", status: "已发布", read: "100%", confirm: "无需确认", on: false },
  { title: "Q4 盘点安排", status: "已发布", read: "71%", confirm: "无需确认", on: false },
  { title: "打印网关恢复", status: "已发布", read: "64%", confirm: "无需确认", on: false },
];

function Editor() {
  return (
    <div className="space-y-4">
      <Field label="标题" required>
        <TextInput value="10 月 28 日系统维护" />
      </Field>
      <Field label="正文">
        <TextArea numbered={false} rows={5} lines={["维护时间：10 月 28 日 22:00–23:30。", "期间查询与打印不可用。", "请各仓提前导出当日作业清单。"]} />
      </Field>
      <Field label="投放范围">
        <div className="flex flex-wrap gap-1.5">
          <Chip active>全部仓</Chip>
          <Chip>仅仓库管理员</Chip>
          <Chip>指定仓</Chip>
        </div>
      </Field>
      <div className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
        <div>
          <div className="text-[13px] font-medium text-slate-800">需要确认</div>
          <div className="text-xs text-slate-400">接收人打开后仍保持「待确认」，点按钮才算完成</div>
        </div>
        <Toggle on />
      </div>
      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-inset ring-line">
        <div className="text-[11px] font-medium text-slate-400">接收人看到的状态</div>
        <div className="mt-2 flex gap-2">
          <Tag tone="blue" dot>未读</Tag>
          <Tag>已读</Tag>
          <Tag tone="amber" dot>待确认</Tag>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">与消息中心同一套词：已读不等于已确认。</p>
      </div>
    </div>
  );
}

export function A() {
  const [i, setI] = React.useState(0);
  return (
    <AppShell admin="messages" fill>
      <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="flex w-full shrink-0 flex-col border-line bg-white lg:w-[340px] lg:border-r">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-[13px] font-semibold text-slate-900">消息</span>
            <Btn size="sm" variant="primary">新建</Btn>
          </div>
          <div className="flex gap-3 border-b border-line px-4 py-2 text-[11px] text-slate-400">
            <span>草稿 1</span><span>已发布 4</span><span className="text-amber-600">待确认 14 人</span>
          </div>
          <ul className="scrollbar-thin min-h-0 flex-1 divide-y divide-line/70 overflow-y-auto">
            {ITEMS.map((m, idx) => (
              <li key={m.title}>
                <button type="button" onClick={() => setI(idx)} className={cn("w-full px-4 py-3 text-left", idx === i && "bg-indigo-50/70")}>
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[13px] font-medium text-slate-900">{m.title}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Tag tone={m.status === "草稿" ? "neutral" : "green"}>{m.status}</Tag>
                    <span className="text-[11px] text-slate-400">已读 {m.read}</span>
                    {m.confirm.startsWith("待") && <Tag tone="amber">{m.confirm}</Tag>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="scrollbar-thin min-w-0 flex-1 p-5 lg:overflow-y-auto">
          <div className="mx-auto max-w-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-slate-900">编辑草稿</h2>
              <Tag>未发布</Tag>
            </div>
            <Editor />
            <div className="flex justify-end gap-2">
              <Btn>保存草稿</Btn>
              <Btn variant="primary" icon={Send}>发布</Btn>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell
      admin="messages"
      overlay={<Drawer title="编辑消息" desc="草稿 · 尚未投放" width={440} footer={<><Btn variant="ghost">保存草稿</Btn><Btn variant="primary" icon={Send}>发布</Btn></>}><Editor /></Drawer>}
    >
      <Body wide>
        <PageHeader crumbs={["管理后台", "信息发布"]} title="消息管理" desc="送达和确认进度在表里，编辑在右侧。" actions={<Btn variant="primary">新建消息</Btn>} />
        <div className="grid grid-cols-3 gap-3">
          {[
            ["已发布", "4"],
            ["平均已读", "80%"],
            ["待确认人次", "14"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line bg-white px-4 py-3 shadow-card">
              <div className="text-xs text-slate-500">{k}</div>
              <div className="tnum mt-1 text-[20px] font-semibold text-slate-900">{v}</div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <DataTable
            columns={[
              { key: "t", title: "标题", render: (m) => <span className="font-medium text-slate-900">{m.title}</span> },
              { key: "s", title: "状态", render: (m) => <Tag tone={m.status === "草稿" ? "neutral" : "green"} dot>{m.status}</Tag> },
              { key: "r", title: "已读", render: (m) => m.read === "—" ? <span className="text-slate-300">—</span> : <span className="flex items-center gap-2"><Progress value={parseInt(m.read)} className="w-16" /><span className="tnum text-xs">{m.read}</span></span> },
              { key: "c", title: "确认", render: (m) => <span className={m.confirm.startsWith("待") ? "text-amber-700" : "text-slate-500"}>{m.confirm}</span> },
            ]}
            rows={ITEMS}
            activeIndex={0}
          />
        </div>
      </Body>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell admin="messages" fill>
      <div className="flex h-full flex-col xl:flex-row">
        <aside className="w-full shrink-0 border-line bg-white p-3 xl:w-[160px] xl:border-r">
          {["草稿 1", "已排期 0", "已发布 4", "已撤回 0"].map((s, i) => (
            <button key={s} type="button" className={cn("flex h-8 w-full items-center rounded-lg px-2 text-[13px]", i === 0 ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600")}>{s}</button>
          ))}
        </aside>
        <section className="min-w-0 flex-1 border-line xl:border-r">
          {ITEMS.map((m, i) => (
            <button key={m.title} type="button" className={cn("block w-full border-b border-line px-4 py-3 text-left", i === 0 && "bg-indigo-50/60")}>
              <div className="text-[13px] font-medium text-slate-900">{m.title}</div>
              <div className="mt-1 text-[11px] text-slate-400">{m.status} · {m.confirm}</div>
            </button>
          ))}
        </section>
        <section className="scrollbar-thin w-full shrink-0 p-4 xl:w-[380px] xl:overflow-y-auto">
          <Segmented size="sm" value="edit" options={[{ value: "edit", label: "编辑" }, { value: "phone", label: "手机预览" }]} />
          <div className="mt-4"><Editor /></div>
        </section>
      </div>
    </AppShell>
  );
}
