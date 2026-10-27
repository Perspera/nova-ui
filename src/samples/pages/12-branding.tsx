"use client";

import * as React from "react";
import { Boxes, ImageIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/mock/shell";
import { Btn, Field, Segmented, StickyBar, Tag, TextInput, UnderlineTabs } from "@/components/mock/kit";

function LoginPreview({ name, color }: { name: string; color: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-100 ring-1 ring-line">
      <div className="grid sm:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-48 p-5 text-white" style={{ background: `linear-gradient(145deg, #0f172a, ${color})` }}>
          <div className="flex items-center gap-2 text-[12px] font-semibold">
            <span className="grid size-6 place-items-center rounded-md bg-white/15"><Boxes className="size-3.5" /></span>
            {name}
          </div>
          <div className="mt-8 text-[18px] leading-snug font-semibold">查得到、对得上、打得出。</div>
          <div className="mt-6 rounded-lg bg-white/10 px-3 py-2 text-[11px] text-white/80">10/28 系统维护公告</div>
        </div>
        <div className="flex flex-col justify-center bg-white p-5">
          <div className="text-[14px] font-semibold text-slate-900">登录</div>
          <div className="mt-3 h-7 rounded-md bg-slate-50 ring-1 ring-line" />
          <div className="mt-2 h-7 rounded-md bg-slate-50 ring-1 ring-line" />
          <div className="mt-3 h-8 rounded-lg text-center text-[12px] leading-8 text-white" style={{ background: color }}>登录</div>
        </div>
      </div>
    </div>
  );
}

function HeaderPreview({ name, color }: { name: string; color: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-line">
      <div className="flex h-12 items-center gap-3 border-b border-line px-3">
        <span className="grid size-7 place-items-center rounded-lg text-white" style={{ background: color }}><Boxes className="size-4" /></span>
        <span className="text-[13px] font-semibold text-slate-900">{name}</span>
        <span className="rounded-md px-2 py-1 text-[12px] text-white" style={{ background: color }}>查询</span>
        <span className="text-[12px] text-slate-400">打印 · 图片 · 数据</span>
      </div>
      <div className="h-24 bg-canvas" />
    </div>
  );
}

export function A() {
  const [face, setFace] = React.useState("login");
  const name = "备件查询平台";
  const color = "#2563eb";
  return (
    <AppShell admin="branding" fill>
      <div className="flex h-full flex-col">
        <div className="grid min-h-0 flex-1 lg:grid-cols-[380px_1fr]">
          <aside className="scrollbar-thin space-y-4 border-line bg-white p-5 lg:overflow-y-auto lg:border-r">
            <div>
              <h1 className="text-[18px] font-semibold text-slate-900">品牌配置</h1>
              <p className="mt-1 text-[13px] text-slate-500">改完右侧即时预览。发布前不影响线上。</p>
            </div>
            <Field label="产品名称" required>
              <TextInput value={name} />
            </Field>
            <Field label="主色">
              <div className="flex items-center gap-2">
                <span className="size-8 rounded-lg ring-1 ring-line" style={{ background: color }} />
                <TextInput value="#2563EB" mono className="flex-1" />
              </div>
            </Field>
            <Field label="Logo" hint="建议透明底 PNG，高度 64px">
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-line-strong px-3 py-3">
                <span className="grid size-10 place-items-center rounded-lg text-white" style={{ background: color }}><Boxes className="size-5" /></span>
                <div className="text-xs text-slate-500">logo.png · 已上传<div>替换</div></div>
              </div>
            </Field>
            <Field label="登录背景">
              <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-blue-800 text-xs text-white/70">
                <ImageIcon className="mr-1.5 size-4" /> 使用默认渐变
              </div>
            </Field>
          </aside>
          <section className="scrollbar-thin bg-canvas p-5 lg:overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-slate-800">预览</span>
              <Segmented
                size="sm"
                value={face}
                onChange={setFace}
                options={[
                  { value: "login", label: "登录页" },
                  { value: "header", label: "顶栏" },
                  { value: "label", label: "标签" },
                ]}
              />
            </div>
            {face === "header" ? <HeaderPreview name={name} color={color} /> : face === "label" ? (
              <div className="mx-auto w-[280px] rounded-md bg-white p-4 shadow-card ring-1 ring-slate-200">
                <div className="text-[11px]" style={{ color }}>库位标签</div>
                <div className="mt-1 font-mono text-lg font-semibold">A-03-12</div>
                <div className="text-xs text-slate-500">{name}</div>
              </div>
            ) : (
              <LoginPreview name={name} color={color} />
            )}
            <p className="mt-3 text-xs text-slate-400">预览使用草稿，线上仍是上一已发布版本。</p>
          </section>
        </div>
        <StickyBar>
          <Tag>草稿 · 基于 v12</Tag>
          <span className="text-xs text-slate-400">上次发布 10-02 · 陈立航</span>
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-400"><Lock className="size-3.5" />发布中会锁定表单</span>
          <Btn>保存草稿</Btn>
          <Btn variant="primary">保存并发布</Btn>
        </StickyBar>
      </div>
    </AppShell>
  );
}

export function B() {
  return (
    <AppShell admin="branding">
      <div className="mx-auto w-full max-w-[1100px] space-y-4 p-4 sm:p-6">
        <h1 className="text-[20px] font-semibold text-slate-900">品牌配置</h1>
        <UnderlineTabs
          value="history"
          options={[
            { value: "preview", label: "预览" },
            { value: "history", label: "历史", count: 12 },
            { value: "assets", label: "资源", count: 4 },
          ]}
        />
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
          {[
            ["v12", "10-02", "陈立航", "当前", true],
            ["v11", "08-19", "陈立航", "可回滚", false],
            ["v10", "06-01", "林晓婷", "可回滚", false],
            ["v9", "03-12", "陈立航", "可回滚", false],
          ].map(([v, d, u, s, on]) => (
            <div key={v as string} className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-0">
              <span className={cn("font-mono text-[13px] font-semibold", on ? "text-indigo-700" : "text-slate-800")}>{v as string}</span>
              <span className="text-[13px] text-slate-500">{d as string} · {u as string}</span>
              <Tag tone={on ? "indigo" : "neutral"} className="ml-auto">{s as string}</Tag>
              {!on && <Btn size="sm">回滚</Btn>}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function C() {
  return (
    <AppShell admin="branding" fill>
      <div className="flex h-full flex-col xl:flex-row">
        <aside className="w-full shrink-0 border-line bg-white p-3 xl:w-[180px] xl:border-r">
          <div className="px-2 py-1 text-[11px] font-medium text-slate-400">素材</div>
          {["Logo", "登录背景", "标签角标", "空态插图"].map((s, i) => (
            <button key={s} type="button" className={cn("flex h-8 w-full items-center rounded-lg px-2 text-[13px]", i === 0 ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600")}>{s}</button>
          ))}
        </aside>
        <section className="bg-dots grid min-h-[360px] flex-1 place-items-center p-6">
          <div className="w-full max-w-xl">
            <LoginPreview name="备件查询平台" color="#2563eb" />
            <div className="mt-2 text-center text-[11px] text-slate-400">点击画布上的 Logo、标题或按钮，在右侧改属性</div>
          </div>
        </section>
        <aside className="w-full shrink-0 space-y-4 border-line bg-white p-4 xl:w-[280px] xl:border-l">
          <div className="text-[13px] font-semibold text-slate-900">选中 · 主按钮</div>
          <Field label="文案"><TextInput value="登录" /></Field>
          <Field label="颜色">
            <div className="flex gap-2">{["#2563eb", "#4f46e5", "#0f172a", "#059669"].map((c, i) => (
              <span key={c} className={cn("size-8 rounded-lg ring-2 ring-offset-2", i === 0 ? "ring-blue-600" : "ring-transparent")} style={{ background: c }} />
            ))}</div>
          </Field>
          <Field label="圆角"><TextInput value="8" suffix={<span className="text-[11px] text-slate-400">px</span>} /></Field>
          <Btn variant="primary" className="w-full">应用到草稿</Btn>
        </aside>
      </div>
    </AppShell>
  );
}
