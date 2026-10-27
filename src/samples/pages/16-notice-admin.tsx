"use client";

import { AppShell, Body } from "@/components/mock/shell";
import { Btn, Chip, DataTable, Drawer, Field, PageHeader, Tag, TextArea, TextInput } from "@/components/mock/kit";
import { NOTICES } from "@/components/mock/data";
import { cn } from "@/lib/utils";

function Editor() {
  return (
    <div className="space-y-4">
      <Field label="标题" required><TextInput value="10/28 晚间系统维护" /></Field>
      <Field label="正文"><TextArea numbered={false} rows={3} lines={["10 月 28 日 22:00–23:30 暂停查询与打印。"]} /></Field>
      <Field label="级别">
        <div className="flex gap-1.5"><Chip>信息</Chip><Chip active>提醒</Chip><Chip>紧急</Chip></div>
      </Field>
      <Field label="生效期">
        <div className="grid grid-cols-2 gap-2">
          <TextInput value="2026-10-27" />
          <TextInput value="2026-10-28" />
        </div>
      </Field>
      <Field label="投放位置">
        <div className="flex gap-1.5"><Chip active>登录页</Chip><Chip active>应用内顶部</Chip></div>
      </Field>
    </div>
  );
}

function MiniLogin() {
  return (
    <div className="overflow-hidden rounded-lg bg-slate-100 ring-1 ring-line">
      <div className="bg-gradient-to-br from-slate-900 to-blue-800 px-3 py-4 text-[10px] text-white/80">登录页</div>
      <div className="bg-amber-50 px-2 py-1 text-[10px] text-amber-800">10/28 晚间系统维护</div>
      <div className="h-10 bg-white" />
    </div>
  );
}

function MiniApp() {
  return (
    <div className="overflow-hidden rounded-lg bg-white ring-1 ring-line">
      <div className="h-6 border-b border-line bg-white" />
      <div className="bg-amber-50 px-2 py-1 text-[10px] text-amber-800">10/28 晚间系统维护 · 查询与打印暂停</div>
      <div className="h-8 bg-canvas" />
    </div>
  );
}

export function A() {
  return (
    <AppShell admin="notices" fill>
      <div className="flex h-full flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-line bg-white lg:w-[280px] lg:border-r">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-[13px] font-semibold">公告</span>
            <Btn size="sm" variant="primary">新建</Btn>
          </div>
          {NOTICES.map((n, i) => (
            <button key={n.title} type="button" className={cn("block w-full border-b border-line px-4 py-3 text-left", i === 0 && "bg-indigo-50/70")}>
              <div className="truncate text-[13px] font-medium text-slate-900">{n.title}</div>
              <div className="mt-1 flex items-center gap-1.5">
                <Tag tone={n.status === "生效中" ? "green" : n.status === "已排期" ? "blue" : "neutral"}>{n.status}</Tag>
                <span className="text-[11px] text-slate-400">{n.place.join(" / ")}</span>
              </div>
            </button>
          ))}
        </aside>
        <section className="scrollbar-thin min-w-0 flex-1 space-y-4 p-5 lg:overflow-y-auto">
          <h2 className="text-[16px] font-semibold text-slate-900">编辑公告</h2>
          <Editor />
          <div className="flex justify-end gap-2"><Btn>保存</Btn><Btn variant="primary">发布</Btn></div>
        </section>
        <aside className="w-full shrink-0 space-y-3 border-line bg-canvas p-4 lg:w-[240px] lg:border-l">
          <div className="text-[12px] font-semibold text-slate-500">投放预览</div>
          <div>
            <div className="mb-1 text-[11px] text-slate-400">登录页</div>
            <MiniLogin />
          </div>
          <div>
            <div className="mb-1 text-[11px] text-slate-400">应用内顶部</div>
            <MiniApp />
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

export function B() {
  const bars = [
    { title: "初始密码提醒", start: 8, w: 70, tone: "bg-rose-400" },
    { title: "库位标签上线", start: 28, w: 42, tone: "bg-blue-500" },
    { title: "晚间维护", start: 48, w: 10, tone: "bg-amber-500" },
    { title: "Q4 盘点", start: 62, w: 22, tone: "bg-indigo-400" },
  ];
  return (
    <AppShell admin="notices">
      <Body wide>
        <PageHeader title="公告排期" desc="重叠的色条表示同一时间有多条公告在投。" actions={<Btn variant="primary">新建公告</Btn>} />
        <div className="rounded-xl border border-line bg-white p-4 shadow-card">
          <div className="mb-3 flex justify-between font-mono text-[11px] text-slate-400">
            {["10-01", "10-08", "10-15", "10-22", "10-29", "11-05"].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="space-y-2">
            {bars.map((b) => (
              <div key={b.title} className="relative h-9 rounded-lg bg-slate-50">
                <div className={cn("absolute top-1.5 bottom-1.5 flex items-center rounded-md px-2 text-[12px] font-medium text-white", b.tone)} style={{ left: `${b.start}%`, width: `${b.w}%` }}>
                  <span className="truncate">{b.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Body>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell admin="notices" overlay={<Drawer title="编辑公告" width={420} footer={<Btn variant="primary">发布</Btn>}><Editor /></Drawer>}>
      <Body wide>
        <PageHeader title="系统公告" desc="标准表 + 抽屉。投放效果要打开抽屉才看得到。" actions={<Btn variant="primary">新建公告</Btn>} />
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          <DataTable
            columns={[
              { key: "t", title: "标题", render: (n) => <span className="font-medium text-slate-900">{n.title}</span> },
              { key: "p", title: "投放", render: (n) => <span className="text-slate-600">{n.place.join("、")}</span> },
              { key: "r", title: "生效期", render: (n) => <span className="tnum text-xs text-slate-500">{n.range}</span> },
              { key: "s", title: "状态", render: (n) => <Tag tone={n.status === "生效中" ? "green" : n.status === "已排期" ? "blue" : "neutral"} dot>{n.status}</Tag> },
            ]}
            rows={NOTICES}
            activeIndex={0}
          />
        </div>
      </Body>
    </AppShell>
  );
}
