"use client";

import { Boxes, Check, Eye, Megaphone, Printer, Search, ShieldCheck, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn, Callout, TextInput } from "@/components/mock/kit";

function BrandMark({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "grid size-9 place-items-center rounded-[10px] text-white",
          light ? "bg-white/15 ring-1 ring-white/20" : "bg-gradient-to-br from-blue-600 to-indigo-600",
        )}
      >
        <Boxes className="size-5" />
      </span>
      <span className={light ? "text-white" : "text-slate-900"}>
        <span className="block text-[15px] font-semibold leading-none">备件查询平台</span>
        <span className={`mt-1 block text-[10px] tracking-wide ${light ? "text-blue-100/70" : "text-slate-400"}`}>SPARE PARTS · WSS</span>
      </span>
    </div>
  );
}

function LoginForm({ title = "登录" }: { title?: string }) {
  return (
    <div className="w-full max-w-[360px]">
      <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-1 text-[13px] text-slate-500">使用工号登录。首次登录会要求修改初始密码。</p>
      <div className="mt-6 space-y-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-slate-600">工号</span>
          <TextInput value="chenlh" />
        </label>
        <label className="block space-y-1.5">
          <span className="flex items-center justify-between text-xs font-medium text-slate-600">
            密码
            <button type="button" className="font-normal text-blue-600">忘记密码</button>
          </span>
          <TextInput value="••••••••" suffix={<Eye className="size-4 text-slate-400" />} />
        </label>
        <label className="flex items-center gap-2 text-[13px] text-slate-600">
          <span className="grid size-4 place-items-center rounded-[4px] bg-blue-600 text-white">
            <Check className="size-3" />
          </span>
          在这台电脑记住工号
        </label>
        <Btn variant="primary" size="lg" className="w-full">
          登录
        </Btn>
        <p className="text-center text-[11px] text-slate-400">样卡仅示意，不收集、不提交任何凭据</p>
      </div>
    </div>
  );
}

const NOTICES = [
  { level: "维护", tone: "bg-amber-50 text-amber-800 ring-amber-200", title: "10/28 22:00–23:30 系统维护", body: "期间查询与打印暂停，请提前导出当日作业清单。", time: "生效至明天" },
  { level: "安全", tone: "bg-rose-50 text-rose-700 ring-rose-200", title: "请修改初始密码", body: "仍使用初始密码的账号将在 11 月 1 日起限制上传。", time: "长期" },
  { level: "更新", tone: "bg-blue-50 text-blue-700 ring-blue-200", title: "库位标签 60×40 模板上线", body: "支持二维码 + 库位大字，旧模板保留到 11 月底。", time: "10-24" },
];

export function A() {
  return (
    <div className="grid h-dvh bg-white lg:grid-cols-[1.15fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute -top-24 -left-16 size-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 size-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-60" />
        <BrandMark light />
        <div className="relative max-w-md">
          <h2 className="text-[34px] leading-tight font-semibold tracking-tight">查得到、对得上、打得出。</h2>
          <p className="mt-3 text-[14px] leading-6 text-blue-100/80">面向售后备件仓：批量查库存、核对替代件、现场打标签，同一套浅色工作台。</p>
          <ul className="mt-8 space-y-4">
            {[
              [Search, "批量查询", "粘贴整列编码，缺码、低库存、BO 一眼分开"],
              [Printer, "现场打印", "选模板、看预览、吸底打印，草稿不会丢"],
              [Warehouse, "按仓授权", "每人只看首选仓，范围在顶栏只读展示"],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Search;
              return (
                <li key={t as string} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium">{t as string}</span>
                    <span className="mt-0.5 block text-[13px] text-blue-100/70">{d as string}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
          <div className="flex items-center gap-2 text-[12px] font-medium text-amber-200">
            <Megaphone className="size-3.5" />
            系统公告
          </div>
          <div className="mt-1.5 text-[13.5px] font-medium">10/28 22:00–23:30 计划维护</div>
          <div className="mt-0.5 text-[12.5px] text-blue-100/70">维护窗口内查询与打印不可用。</div>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            当前服务正常 · 数据版本 v2026.10.27-01
          </div>
        </div>
      </section>
      <section className="flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 lg:justify-end">
          <div className="lg:hidden">
            <BrandMark />
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            内网环境 · offline 模式未开启
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}

export function B() {
  return (
    <div className="bg-dots relative flex h-dvh flex-col items-center justify-center bg-canvas px-4">
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[10px] bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <Boxes className="size-5" />
          </span>
          <span className="text-[16px] font-semibold text-slate-900">备件查询平台</span>
        </div>
      </div>
      <div className="mb-3 flex w-full max-w-[400px] items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12.5px] text-amber-900">
        <Megaphone className="size-4 shrink-0" />
        <span className="truncate">10/28 22:00–23:30 系统维护，查询与打印暂停</span>
      </div>
      <div className="w-full max-w-[400px] rounded-2xl border border-line bg-white p-7 shadow-[0_20px_50px_-24px_rgb(15_23_42/0.35)]">
        <LoginForm />
      </div>
      <p className="mt-6 text-[12px] text-slate-400">广州中心仓 · v3.8</p>
    </div>
  );
}

export function C() {
  return (
    <div className="grid h-dvh lg:grid-cols-[440px_1fr]">
      <section className="flex flex-col border-line bg-white lg:border-r">
        <div className="px-8 pt-8">
          <BrandMark />
        </div>
        <div className="flex flex-1 items-center px-8">
          <LoginForm title="欢迎回来" />
        </div>
        <div className="px-8 pb-6 text-[12px] text-slate-400">服务正常 · 数据 v2026.10.27-01</div>
      </section>
      <section className="scrollbar-thin hidden overflow-y-auto bg-canvas p-8 lg:block">
        <div className="mx-auto max-w-xl">
          <div className="text-[12px] font-semibold tracking-wide text-slate-400">登录前须知</div>
          <h2 className="mt-1 text-[20px] font-semibold text-slate-900">系统公告</h2>
          <div className="mt-5 space-y-3">
            {NOTICES.map((n) => (
              <article key={n.title} className="rounded-xl border border-line bg-white p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${n.tone}`}>{n.level}</span>
                  <span className="text-[11px] text-slate-400">{n.time}</span>
                </div>
                <h3 className="mt-2 text-[14px] font-semibold text-slate-900">{n.title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-slate-500">{n.body}</p>
              </article>
            ))}
          </div>
          <Callout tone="neutral" className="mt-4" icon={Megaphone}>
            公告由「系统公告」统一投放。登录页与应用内顶部可以分别开关。
          </Callout>
        </div>
      </section>
    </div>
  );
}
